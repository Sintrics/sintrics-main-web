"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ borderTop: "0.5px solid var(--border)", background: "var(--bg)" }}
      ref={ref}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <h2
            className="leading-[0.88] tracking-[-0.02em] mb-12 md:mb-16"
            style={{
              fontSize: "clamp(3rem, 7vw, 8rem)",
              fontFamily: "'DM Serif Display', serif",
              color: "var(--ink)",
            }}
          >
            Let&apos;s start<br />
            <em>a conversation</em>
          </h2>

          <div className="space-y-8 md:space-y-10">
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2"
                style={{ color: "var(--ink-muted)" }}
              >
                Inquiries
              </p>
              <a
                href="mailto:sintrics@sintrics.com"
                className="group/email inline-flex items-center gap-2 text-[18px] font-medium hover:opacity-40 transition-opacity duration-300"
                style={{ color: "var(--ink)" }}
              >
                sintrics@sintrics.com
                <ArrowUpRight size={16} strokeWidth={1.5} className="opacity-0 group-hover/email:opacity-100 transition-opacity duration-200" />
              </a>
            </div>
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-2"
                style={{ color: "var(--ink-muted)" }}
              >
                Location
              </p>
              <p className="text-[18px] font-medium" style={{ color: "var(--ink)" }}>
                Bratislava, Slovakia
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="h-full flex flex-col items-start justify-center gap-4 py-20"
            >
              <p
                className="leading-none tracking-[-0.03em]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  fontFamily: "'DM Serif Display', serif",
                  color: "var(--ink)",
                }}
              >
                Received.
              </p>
              <p className="text-[14px] font-light" style={{ color: "var(--ink-muted)" }}>
                We&apos;ll be in touch shortly. Check your inbox for a confirmation.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {error && (
                <p className="text-[12px] px-3 py-2" style={{ color: "#b91c1c", background: "#fef2f2", border: "0.5px solid #fca5a5" }}>
                  {error}
                </p>
              )}

              {[
                { key: "name",  placeholder: "Your Name",  type: "text" },
                { key: "email", placeholder: "Email Address", type: "email" },
              ].map((field) => (
                <div
                  key={field.key}
                  className="field-line"
                  style={{ borderBottom: "0.5px solid var(--border-strong)" }}
                >
                  <input
                    className="w-full bg-transparent border-0 outline-none py-4 text-[17px] font-light focus:ring-0"
                    style={{ color: "var(--ink)" }}
                    placeholder={field.placeholder}
                    type={field.type}
                    required
                    value={formState[field.key as keyof typeof formState]}
                    onChange={(e) => setFormState((s) => ({ ...s, [field.key]: e.target.value }))}
                  />
                </div>
              ))}

              <div
                className="field-line"
                style={{ borderBottom: "0.5px solid var(--border-strong)" }}
              >
                <textarea
                  className="w-full bg-transparent border-0 outline-none py-4 text-[17px] font-light resize-none focus:ring-0"
                  style={{ color: "var(--ink)" }}
                  placeholder="Project description"
                  rows={4}
                  required
                  minLength={10}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.005 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                className="w-full py-5 md:py-6 text-[13px] font-semibold uppercase tracking-[0.15em] disabled:opacity-60 transition-opacity"
                style={{ background: "var(--ink)", color: "var(--bg)" }}
              >
                {loading ? "Sending…" : "Send Transmission"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
