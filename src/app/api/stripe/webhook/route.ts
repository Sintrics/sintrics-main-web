import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { constructWebhookEvent, getTierFromPriceId } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/server";
import {
  sendSubscriptionConfirmation,
  sendSubscriptionCancelled,
} from "@/lib/email";

/**
 * Stripe webhook endpoint.
 *
 * Register in Stripe Dashboard → Webhooks → Add endpoint:
 *   URL: https://sintrics.ai/api/stripe/webhook
 *   Events: customer.subscription.created, .updated, .deleted,
 *            checkout.session.completed, invoice.payment_failed
 *
 * For local development:
 *   stripe listen --forward-to localhost:3000/api/stripe/webhook
 */

// Disable body parsing — Stripe needs the raw body for signature verification
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(body, signature);
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createAdminClient();

  try {
    switch (event.type) {
      // ── Checkout completed ─────────────────────────────────────────
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode !== "subscription") break;

        const userId = session.metadata?.supabase_user_id;
        if (!userId) break;

        await supabase
          .from("profiles")
          .update({ stripe_customer_id: session.customer as string })
          .eq("id", userId);

        break;
      }

      // ── Subscription created or updated ───────────────────────────
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const priceId = subscription.items.data[0]?.price.id;
        const tier = priceId ? getTierFromPriceId(priceId) : null;
        // Stripe v17+: period end lives on each subscription item
        const periodEndTs = subscription.items.data[0]?.current_period_end
          ?? (subscription as any).current_period_end;
        const periodEnd = new Date((periodEndTs ?? 0) * 1000);

        const { data: profile } = await supabase
          .from("profiles")
          .update({
            subscription_status: subscription.status as any,
            subscription_tier: tier as any,
            subscription_period_end: periodEnd.toISOString(),
          })
          .eq("stripe_customer_id", customerId)
          .select("email, full_name")
          .single();

        // Send confirmation on new active subscription
        if (
          event.type === "customer.subscription.created" &&
          subscription.status === "active" &&
          profile?.email &&
          tier
        ) {
          sendSubscriptionConfirmation({
            to: profile.email,
            name: profile.full_name ?? undefined,
            tier,
            periodEnd,
          }).catch(console.error);
        }

        break;
      }

      // ── Subscription deleted ───────────────────────────────────────
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const customerId = subscription.customer as string;
        const periodEndTs2 = subscription.items.data[0]?.current_period_end
          ?? (subscription as any).current_period_end;
        const periodEnd = new Date((periodEndTs2 ?? 0) * 1000);

        const { data: profile } = await supabase
          .from("profiles")
          .update({
            subscription_status: "canceled",
            subscription_tier: null,
          })
          .eq("stripe_customer_id", customerId)
          .select("email, full_name")
          .single();

        if (profile?.email) {
          sendSubscriptionCancelled({
            to: profile.email,
            name: profile.full_name ?? undefined,
            periodEnd,
          }).catch(console.error);
        }

        break;
      }

      // ── Payment failed ─────────────────────────────────────────────
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;

        await supabase
          .from("profiles")
          .update({ subscription_status: "past_due" })
          .eq("stripe_customer_id", customerId);

        break;
      }

      default:
        // Unhandled event — acknowledge receipt
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`[webhook] Error processing ${event.type}:`, err);
    // Return 200 to prevent Stripe retrying events we've partially processed
    return NextResponse.json({ received: true, error: "Processing error" });
  }
}
