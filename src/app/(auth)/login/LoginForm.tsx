"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";

  const [mode, setMode] = useState<"signin" | "magic">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicSent, setMagicSent] = useState(false);

  const supabase = createClient();

  async function handleEmailPassword(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push(redirectTo);
    router.refresh();
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/api/auth/callback?redirectTo=${redirectTo}` },
    });
    if (error) { setError(error.message); } else { setMagicSent(true); }
    setLoading(false);
  }

  async function handleOAuth(provider: "google" | "github") {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/api/auth/callback?redirectTo=${redirectTo}` },
    });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b-[0.5px] border-black h-16 flex items-center px-6 md:px-12">
        <a href="/" className="text-xl font-black tracking-[-0.05em]">SINTRICS</a>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {magicSent ? (
            <div>
              <h1 className="text-4xl font-black tracking-[-0.04em] uppercase mb-4">Check your inbox.</h1>
              <p className="text-sm text-secondary leading-relaxed">
                We sent a sign-in link to <strong>{email}</strong>. Click it to continue.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-4xl font-black tracking-[-0.04em] uppercase mb-2">Sign in.</h1>
                <p className="text-sm text-secondary">
                  Don&apos;t have an account?{" "}
                  <a href="/signup" className="text-black underline underline-offset-2 hover:opacity-60 transition-opacity">
                    Sign up
                  </a>
                </p>
              </div>

              <div className="flex border-[0.5px] border-black mb-8">
                {(["signin", "magic"] as const).map((m) => (
                  <button key={m} onClick={() => { setMode(m); setError(null); }}
                    className={`flex-1 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 ${
                      mode === m ? "bg-black text-white" : "bg-white text-black hover:bg-black/5"
                    }`}>
                    {m === "signin" ? "Password" : "Magic Link"}
                  </button>
                ))}
              </div>

              {error && (
                <p className="text-xs text-red-600 mb-6 border border-red-200 px-3 py-2 bg-red-50">{error}</p>
              )}

              <form onSubmit={mode === "signin" ? handleEmailPassword : handleMagicLink} className="space-y-5">
                <div className="field-line border-b-[0.5px] border-black/30">
                  <input type="email" placeholder="Email address" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent outline-none py-3 text-sm font-medium placeholder:text-black/30 uppercase" />
                </div>

                {mode === "signin" && (
                  <div className="field-line border-b-[0.5px] border-black/30 flex items-center">
                    <input type={showPassword ? "text" : "password"} placeholder="Password" required
                      value={password} onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 bg-transparent outline-none py-3 text-sm font-medium placeholder:text-black/30 uppercase" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-black/40 hover:text-black transition-colors">
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                )}

                <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
                  className="w-full bg-black text-white py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-50">
                  {loading ? "..." : mode === "signin" ? "Sign In" : "Send Magic Link"}
                </motion.button>
              </form>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-[0.5px] bg-black/20" />
                <span className="text-[10px] uppercase tracking-widest text-black/40">or</span>
                <div className="flex-1 h-[0.5px] bg-black/20" />
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { provider: "google" as const, label: "Continue with Google" },
                  { provider: "github" as const, label: "Continue with GitHub" },
                ].map(({ provider, label }) => (
                  <motion.button key={provider} onClick={() => handleOAuth(provider)} disabled={loading}
                    whileTap={{ scale: 0.97 }}
                    className="group w-full border-[0.5px] border-black py-3.5 text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2">
                    {label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
