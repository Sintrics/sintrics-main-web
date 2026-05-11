"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/database";
import { Check, ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "€49",
    period: "/mo",
    priceKey: "NEXT_PUBLIC_STRIPE_PRICE_STARTER",
    features: [
      "1 active project",
      "UI/UX consultation (2h/mo)",
      "Email support",
      "Design system access",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "€149",
    period: "/mo",
    priceKey: "NEXT_PUBLIC_STRIPE_PRICE_PRO",
    featured: true,
    features: [
      "3 active projects",
      "UI/UX + dev (10h/mo)",
      "Priority support",
      "AI Lab access",
      "Custom components",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "€499",
    period: "/mo",
    priceKey: "NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE",
    features: [
      "Unlimited projects",
      "Dedicated team (40h/mo)",
      "24h support SLA",
      "Full-stack development",
      "Analytics dashboard",
      "Custom integrations",
    ],
  },
];

export default function BillingClient({
  user,
  profile,
}: {
  user: User;
  profile: Partial<Profile> | null;
}) {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeTier = profile?.subscription_status === "active"
    ? profile?.subscription_tier
    : null;

  async function handleSubscribe(planId: string) {
    setLoadingPlan(planId);
    setError(null);

    const priceEnvKey = PLANS.find((p) => p.id === planId)?.priceKey;
    const priceId = process.env[priceEnvKey as keyof typeof process.env];

    if (!priceId) {
      setError("Price configuration error. Please contact support.");
      setLoadingPlan(null);
      return;
    }

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        setLoadingPlan(null);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setLoadingPlan(null);
    }
  }

  async function handleManageBilling() {
    setPortalLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b-[0.5px] border-black h-16 flex items-center justify-between px-6 md:px-12">
        <a href="/" className="text-xl font-black tracking-[-0.05em]">SINTRICS</a>
        <a href="/dashboard" className="text-[11px] font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors">
          ← Dashboard
        </a>
      </nav>

      <main className="px-6 md:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-[11px] font-black uppercase tracking-widest text-secondary mb-2">Billing</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-[-0.04em] uppercase mb-4">
            Choose your plan.
          </h1>
          <p className="text-sm text-secondary mb-12 max-w-md">
            All plans include a 14-day free trial. Cancel anytime from the billing portal.
          </p>

          {error && (
            <p className="text-xs text-red-600 mb-8 border border-red-200 px-4 py-3 bg-red-50 max-w-lg">
              {error}
            </p>
          )}

          {/* Active plan manager */}
          {activeTier && profile?.stripe_customer_id && (
            <div className="border-[0.5px] border-black p-6 mb-12 max-w-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-secondary mb-1">Current plan</p>
                  <p className="text-lg font-black uppercase tracking-tight">
                    {activeTier.charAt(0).toUpperCase() + activeTier.slice(1)}
                  </p>
                  {profile?.subscription_period_end && (
                    <p className="text-xs text-secondary mt-1">
                      Renews{" "}
                      {new Date(profile.subscription_period_end).toLocaleDateString("en-GB", {
                        day: "numeric", month: "long", year: "numeric",
                      })}
                    </p>
                  )}
                </div>
                <motion.button
                  onClick={handleManageBilling}
                  disabled={portalLoading}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 border-[0.5px] border-black px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-50"
                >
                  {portalLoading ? "Loading..." : "Manage"}
                  <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </div>
            </div>
          )}

          {/* Pricing grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t-[0.5px] border-black max-w-4xl">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className={`p-8 border-b md:border-b-0 ${
                  i < 2 ? "md:border-r-[0.5px]" : ""
                } border-black ${plan.featured ? "bg-black text-white" : ""}`}
              >
                {plan.featured && (
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest bg-white text-black px-2 py-1 mb-4">
                    Most popular
                  </span>
                )}

                <h3 className="text-xl font-black uppercase tracking-[-0.03em] mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-3xl font-black tracking-[-0.04em]">{plan.price}</span>
                  <span className={`text-sm ${plan.featured ? "text-white/60" : "text-secondary"}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check size={14} className={`mt-0.5 flex-shrink-0 ${plan.featured ? "text-white/60" : "text-black"}`} />
                      <span className={plan.featured ? "text-white/80" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={!!loadingPlan || activeTier === plan.id}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full py-3.5 text-[11px] font-black uppercase tracking-widest transition-colors disabled:opacity-50 ${
                    plan.featured
                      ? "bg-white text-black hover:bg-white/90"
                      : "bg-black text-white hover:bg-black/80"
                  }`}
                >
                  {activeTier === plan.id
                    ? "Current plan"
                    : loadingPlan === plan.id
                    ? "Loading..."
                    : "Get started"}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
