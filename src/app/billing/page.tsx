import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import BillingClient from "./BillingClient";

export const metadata = { title: "Billing — SINTRICS" };

export default async function BillingPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?redirectTo=/billing");

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status, subscription_tier, stripe_customer_id, subscription_period_end")
    .eq("id", user.id)
    .single();

  return <BillingClient user={user} profile={profile} />;
}
