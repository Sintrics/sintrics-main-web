import Stripe from "stripe";

/**
 * Returns a Stripe client instance.
 * Called lazily inside each function so the module can be imported
 * during Next.js build without requiring STRIPE_SECRET_KEY at that point.
 */
function client(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
    apiVersion: "2026-04-22.dahlia",
    typescript: true,
  });
}

// ── Price → tier mapping ─────────────────────────────────────────────

export function getTierFromPriceId(priceId: string): string | null {
  const map: Record<string, string> = {
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER ?? ""]: "starter",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO ?? ""]: "pro",
    [process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE ?? ""]: "enterprise",
  };
  return map[priceId] ?? null;
}

// ── Checkout ─────────────────────────────────────────────────────────

export async function createCheckoutSession({
  priceId,
  customerId,
  customerEmail,
  userId,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  customerId?: string;
  customerEmail?: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<Stripe.Checkout.Session> {
  return client().checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    ...(customerId
      ? { customer: customerId }
      : { customer_email: customerEmail }),
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    subscription_data: { metadata: { supabase_user_id: userId } },
    metadata: { supabase_user_id: userId },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });
}

// ── Customer Portal ──────────────────────────────────────────────────

export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}): Promise<Stripe.BillingPortal.Session> {
  return client().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
}

// ── Customer helpers ─────────────────────────────────────────────────

export async function getOrCreateCustomer({
  email,
  name,
  userId,
}: {
  email: string;
  name?: string;
  userId: string;
}): Promise<string> {
  const stripe = client();

  const existing = await stripe.customers.search({
    query: `metadata['supabase_user_id']:'${userId}'`,
    limit: 1,
  });

  if (existing.data.length > 0) return existing.data[0].id;

  const customer = await stripe.customers.create({
    email,
    name: name ?? undefined,
    metadata: { supabase_user_id: userId },
  });

  return customer.id;
}

// ── Webhook signature verification ───────────────────────────────────

export function constructWebhookEvent(
  body: string,
  signature: string
): Stripe.Event {
  return client().webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET ?? "whsec_placeholder"
  );
}
