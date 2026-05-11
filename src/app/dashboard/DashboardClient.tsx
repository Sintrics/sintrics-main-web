"use client";

import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/types/database";
import { LogOut, CreditCard, User as UserIcon } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const TIER_LABELS: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  enterprise: "Enterprise",
};

const STATUS_COLORS: Record<string, string> = {
  active: "text-green-700 bg-green-50",
  trialing: "text-blue-700 bg-blue-50",
  past_due: "text-amber-700 bg-amber-50",
  canceled: "text-red-700 bg-red-50",
  incomplete: "text-gray-700 bg-gray-50",
};

export default function DashboardClient({
  user,
  profile,
}: {
  user: User;
  profile: Profile | null;
}) {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const tier = profile?.subscription_tier;
  const status = profile?.subscription_status;
  const periodEnd = profile?.subscription_period_end
    ? new Date(profile.subscription_period_end).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b-[0.5px] border-black h-16 flex items-center justify-between px-6 md:px-12">
        <a href="/" className="text-xl font-black tracking-[-0.05em]">SINTRICS</a>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </nav>

      <main className="px-6 md:px-12 py-16 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-[11px] font-black uppercase tracking-widest text-secondary mb-2">Dashboard</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-[-0.04em] uppercase mb-12">
            {profile?.full_name
              ? `Hello, ${profile.full_name.split(" ")[0]}.`
              : "Hello."}
          </h1>

          {/* Profile card */}
          <div className="border-[0.5px] border-black p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <UserIcon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tight">
                    {profile?.full_name ?? "—"}
                  </p>
                  <p className="text-[11px] text-secondary">{user.email}</p>
                </div>
              </div>
            </div>
            <div className="border-t-[0.5px] border-black/10 pt-4">
              <a
                href="/account"
                className="text-[11px] font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors underline underline-offset-4"
              >
                Edit profile
              </a>
            </div>
          </div>

          {/* Subscription card */}
          <div className="border-[0.5px] border-black p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center">
                  <CreditCard size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-tight">
                    {tier ? TIER_LABELS[tier] : "No active plan"}
                  </p>
                  {status && (
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 mt-0.5 ${
                        STATUS_COLORS[status] ?? "text-gray-700 bg-gray-50"
                      }`}
                    >
                      {status}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {periodEnd && (
              <p className="text-xs text-secondary mb-4">
                {status === "canceled" ? "Access until" : "Next billing"}: {periodEnd}
              </p>
            )}

            <div className="border-t-[0.5px] border-black/10 pt-4">
              <a
                href="/billing"
                className="text-[11px] font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors underline underline-offset-4"
              >
                {tier ? "Manage billing" : "View plans"}
              </a>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
