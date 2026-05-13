"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
      className="py-24 md:py-32 px-6 md:px-12 bg-white border-t-[0.5px] border-black"
      ref={ref}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-[0.8] mb-10 md:mb-12 text-black">
            LET&apos;S CREATE THE MONOLITH.
          </h2>
          <div className="space-y-8 md:space-y-12">
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest mb-2">Inquiries</p>
              <a
                href="mailto:sintrics@sintrics.com"
                className="group/email inline-flex items-center gap-2 text-xl md:text-2xl font-bold hover:opacity-50 transition-opacity duration-200"
              >
                sintrics@sintrics.com
                <ArrowUpRight size={16} className="opacity-0 group-hover/email:opacity-100 transition-opacity duration-200" />
              </a>
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest mb-2">Location</p>
              <p className="text-xl md:text-2xl font-bold">Bratislava, Slovakia</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="h-full flex flex-col items-start justify-center gap-4 py-20"
            >
              <p className="text-5xl font-black uppercase tracking-[-0.04em]">Received.</p>
              <p className="text-sm font-medium text-secondary">
                We&apos;ll be in touch shortly. Check your inbox for a confirmation.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {error && (
                <p className="text-xs text-red-600 border border-red-200 px-3 py-2 bg-red-50">
                  {error}
                </p>
              )}
              {[
                { key: "name", placeholder: "Your Name", type: "text" },
                { key: "email", placeholder: "Email Address", type: "email" },
              ].map((field) => (
                <div key={field.key} className="field-line border-b-[0.5px] border-black/30">
                  <input
                    className="w-full bg-transparent border-0 outline-none py-4 text-xl font-medium placeholder:text-black/20 uppercase focus:ring-0"
                    placeholder={field.placeholder}
                    type={field.type}
                    required
                    value={formState[field.key as keyof typeof formState]}
                    onChange={(e) => setFormState((s) => ({ ...s, [field.key]: e.target.value }))}
                  />
                </div>
              ))}
              <div className="field-line border-b-[0.5px] border-black/30">
                <textarea
                  className="w-full bg-transparent border-0 outline-none py-4 text-xl font-medium placeholder:text-black/20 resize-none uppercase focus:ring-0"
                  placeholder="Project Description"
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
                className="bg-black text-white w-full py-5 md:py-6 font-black uppercase tracking-widest text-base md:text-lg disabled:opacity-60 transition-opacity"
              >
                {loading ? "Sending..." : "Send Transmission"}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
