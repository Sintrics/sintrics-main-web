"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const supabase = createClient();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setDone(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b-[0.5px] border-black h-16 flex items-center px-6 md:px-12">
        <a href="/" className="text-xl font-black tracking-[-0.05em]">SINTRICS</a>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <motion.div className="w-full max-w-sm"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}>
          {done ? (
            <div>
              <h1 className="text-4xl font-black tracking-[-0.04em] uppercase mb-4">Confirm your email.</h1>
              <p className="text-sm text-secondary leading-relaxed">
                We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-4xl font-black tracking-[-0.04em] uppercase mb-2">Create account.</h1>
                <p className="text-sm text-secondary">
                  Already have one?{" "}
                  <a href="/login" className="text-black underline underline-offset-2 hover:opacity-60 transition-opacity">Sign in</a>
                </p>
              </div>

              {error && (
                <p className="text-xs text-red-600 mb-6 border border-red-200 px-3 py-2 bg-red-50">{error}</p>
              )}

              <form onSubmit={handleSignup} className="space-y-5">
                {[
                  { key: "name", placeholder: "Full Name", type: "text", value: name, set: setName },
                  { key: "email", placeholder: "Email Address", type: "email", value: email, set: setEmail },
                ].map((f) => (
                  <div key={f.key} className="field-line border-b-[0.5px] border-black/30">
                    <input type={f.type} placeholder={f.placeholder} required value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      className="w-full bg-transparent outline-none py-3 text-sm font-medium placeholder:text-black/30 uppercase" />
                  </div>
                ))}

                <div className="field-line border-b-[0.5px] border-black/30 flex items-center">
                  <input type={showPassword ? "text" : "password"} placeholder="Password (8+ characters)"
                    required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 bg-transparent outline-none py-3 text-sm font-medium placeholder:text-black/30 uppercase" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-black/40 hover:text-black transition-colors">
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>

                <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.97 }}
                  className="w-full bg-black text-white py-4 text-[11px] font-black uppercase tracking-widest hover:bg-black/80 transition-colors disabled:opacity-50">
                  {loading ? "Creating..." : "Create Account"}
                </motion.button>

                <p className="text-[10px] text-black/40 text-center leading-relaxed">
                  By signing up you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
