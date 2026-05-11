import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/email";

/**
 * Supabase auth callback.
 * Handles:
 *   - OAuth sign-in (Google, GitHub, etc.)
 *   - Magic link clicks
 *   - Email verification
 *
 * Set this URL in Supabase Dashboard → Auth → URL Configuration:
 *   Redirect URLs: https://sintrics.ai/api/auth/callback
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
  const next = redirectTo.startsWith("/") ? redirectTo : "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      const isNewUser =
        data.session.user.created_at === data.session.user.last_sign_in_at;

      // Send welcome email to new signups (fire-and-forget)
      if (isNewUser) {
        sendWelcomeEmail({
          to: data.session.user.email!,
          name:
            data.session.user.user_metadata?.full_name ??
            data.session.user.user_metadata?.name,
        }).catch(console.error);
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth failed — redirect to error page
  return NextResponse.redirect(`${origin}/auth-error`);
}
