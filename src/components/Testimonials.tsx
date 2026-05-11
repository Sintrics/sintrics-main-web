"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
    <section className="py-24 md:py-32 px-6 md:px-12 bg-white" ref={ref}>
      <div className="stark-line pb-4 mb-16 md:mb-20 flex justify-between items-baseline">
        <h2 className="text-[11px] font-black uppercase tracking-[0.5em]">The Verdict</h2>
        <p className="text-xs font-medium uppercase">Testimonials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12, ease }}
            className="group"
          >
            <blockquote className="text-2xl md:text-4xl font-black tracking-[-0.04em] uppercase leading-[0.9] mb-10 md:mb-12 text-black group-hover:opacity-80 transition-opacity duration-300">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-4">
              {/* Avatar — lifts slightly on hover */}
              <motion.div
                className="w-12 h-12 bg-black flex items-center justify-center flex-shrink-0"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <span className="text-white text-xs font-black tracking-wider">
                  {t.initials}
                </span>
              </motion.div>
              <div>
                <p className="text-xs font-black uppercase">{t.name}</p>
                <p className="text-[10px] uppercase text-secondary">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
