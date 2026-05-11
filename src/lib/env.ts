/**
 * Environment variable validation.
 * Import from here instead of process.env directly so misconfiguration
 * surfaces immediately at startup rather than at runtime.
 */

function require(key: string, isPublic = false): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing environment variable: ${key}\n` +
        `Check .env.local.example for setup instructions.`
    );
  }
  return value;
}

// ── Public (exposed to browser) ──────────────────────────────────────
export const env = {
  supabase: {
    url: require("NEXT_PUBLIC_SUPABASE_URL", true),
    anonKey: require("NEXT_PUBLIC_SUPABASE_ANON_KEY", true),
  },
  stripe: {
    publishableKey: require("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", true),
    prices: {
      starter: require("NEXT_PUBLIC_STRIPE_PRICE_STARTER", true),
      pro: require("NEXT_PUBLIC_STRIPE_PRICE_PRO", true),
      enterprise: require("NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE", true),
    },
  },
  appUrl: require("NEXT_PUBLIC_APP_URL", true),
} as const;

// ── Server-only (never sent to browser) ──────────────────────────────
export function serverEnv() {
  return {
    supabase: {
      serviceRoleKey: require("SUPABASE_SERVICE_ROLE_KEY"),
    },
    stripe: {
      secretKey: require("STRIPE_SECRET_KEY"),
      webhookSecret: require("STRIPE_WEBHOOK_SECRET"),
    },
    resend: {
      apiKey: require("RESEND_API_KEY"),
      fromEmail: require("RESEND_FROM_EMAIL"),
    },
  } as const;
}
