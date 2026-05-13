"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const testimonials = [
  {
    quote: "Sintrics didn't just build a website; they constructed a digital fortress for our brand.",
    name: "Marcus Thorne",
    role: "CTO, VOLTA CORP",
    initials: "MT",
  },
  {
    quote: "Their design philosophy is unmatched. Minimalist luxury while maintaining technical complexity.",
    name: "Helena Vance",
    role: "Creative Director, NEXUS",
    initials: "HV",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ background: "var(--bg)" }}
      ref={ref}
    >
      <div
        className="flex justify-between items-baseline pb-4 mb-16 md:mb-20"
        style={{ borderBottom: "0.5px solid var(--border-strong)" }}
      >
        <h2
          className="text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--ink-muted)" }}
        >
          The Verdict
        </h2>
        <p
          className="text-[11px] font-medium uppercase tracking-[0.15em]"
          style={{ color: "var(--ink-faint)" }}
        >
          Testimonials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.12, ease }}
            className="group"
          >
            <blockquote
              className="leading-[1.1] tracking-[-0.02em] mb-10 md:mb-12 group-hover:opacity-70 transition-opacity duration-400"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.8rem)",
                fontFamily: "'DM Serif Display', serif",
                color: "var(--ink)",
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <motion.div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--ink)" }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <span
                  className="text-[11px] font-semibold tracking-wider"
                  style={{ color: "var(--bg)" }}
                >
                  {t.initials}
                </span>
              </motion.div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.1em]" style={{ color: "var(--ink)" }}>
                  {t.name}
                </p>
                <p className="text-[11px] uppercase tracking-[0.1em]" style={{ color: "var(--ink-faint)" }}>
                  {t.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
