"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const features = [
  { num: "01", label: "Adaptive Real-time Rendering" },
  { num: "02", label: "Low-Latency Data Streaming" },
  { num: "03", label: "Context-Aware AI Assistants" },
];

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="ai-lab"
      className="dark-section py-28 md:py-36 px-6 md:px-12"
      style={{ background: "var(--bg-dark)", color: "var(--bg)" }}
      ref={ref}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-32 items-center">
        <div>
          {/* Label */}
          <motion.p
            className="text-[11px] font-semibold uppercase tracking-[0.2em] mb-8 opacity-40"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.4 } : {}}
            transition={{ duration: 0.6 }}
          >
            AI Lab · Philosophy
          </motion.p>

          <motion.h2
            className="leading-[0.9] tracking-[-0.02em] mb-10 md:mb-12"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 5rem)",
              fontFamily: "'DM Serif Display', serif",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            &ldquo;Technology is most powerful when it becomes
            <em> invisible.</em>&rdquo;
          </motion.h2>

          <motion.p
            className="text-[14px] font-light leading-[1.85] mb-12 md:mb-14 opacity-60"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.6 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Our flagship platform showcases the synergy between human intuition
            and machine precision. Every interaction is calculated, every pixel
            is purposeful.
          </motion.p>

          <ul className="space-y-0">
            {features.map((f, i) => (
              <motion.li
                key={f.num}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease }}
                className="group/feat flex items-center gap-6 py-5"
                style={{ borderBottom: "0.5px solid rgba(242,240,235,0.12)" }}
              >
                <span className="text-[11px] font-semibold tracking-[0.15em] opacity-25 group-hover/feat:opacity-50 transition-opacity duration-200">
                  {f.num}
                </span>
                <span className="text-[13px] font-medium uppercase tracking-[0.06em]">
                  {f.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Abstract geometric visual */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="w-full aspect-square max-w-md relative">
            {/* Nested squares */}
            <div className="absolute inset-0 border-[0.5px]" style={{ borderColor: "rgba(242,240,235,0.1)" }} />
            <div className="absolute inset-[10%] border-[0.5px]" style={{ borderColor: "rgba(242,240,235,0.08)" }} />
            <div className="absolute inset-[20%] border-[0.5px]" style={{ borderColor: "rgba(242,240,235,0.06)" }} />
            <div className="absolute inset-[30%] border-[0.5px]" style={{ borderColor: "rgba(242,240,235,0.05)" }} />

            {/* Cross lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[0.5px] h-full absolute" style={{ background: "rgba(242,240,235,0.06)" }} />
              <div className="h-[0.5px] w-full absolute" style={{ background: "rgba(242,240,235,0.06)" }} />
            </div>

            {/* Orbiting dot */}
            <motion.div
              className="absolute w-2 h-2 rounded-full"
              style={{ background: "var(--bg)", top: "50%", left: "50%", marginTop: -4, marginLeft: -4 }}
              animate={{
                x: [0, 60, 60, 0, -60, -60, 0],
                y: [0, 60, -60, 0, -60, 60, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Label */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.4em] opacity-20">
                Neural mesh v2.4
              </p>
            </div>

            {/* Corner markers */}
            {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((cls, i) => (
              <div key={i} className={`absolute w-4 h-4 ${cls}`}>
                <div className="w-full h-[0.5px]" style={{ background: "rgba(242,240,235,0.25)" }} />
                <div className="w-[0.5px] h-full" style={{ background: "rgba(242,240,235,0.25)" }} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
