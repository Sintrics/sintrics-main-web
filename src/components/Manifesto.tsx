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
      className="dark-section bg-black text-white py-24 md:py-32 px-6 md:px-12"
      ref={ref}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-black tracking-[-0.04em] uppercase italic leading-[0.9] mb-10 md:mb-12 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            &ldquo;Technology is most powerful when it becomes invisible.&rdquo;
          </motion.h2>

          <motion.p
            className="text-base md:text-lg font-light mb-10 md:mb-12 text-white/70 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Our flagship platform showcases the synergy between human intuition
            and machine precision. Every interaction is calculated, every pixel is purposeful.
          </motion.p>

          <ul className="space-y-5 md:space-y-6">
            {features.map((f, i) => (
              <motion.li
                key={f.num}
                initial={{ opacity: 0, x: -16 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.08, ease }}
                className="group/feat flex items-center gap-6 border-b border-white/15 pb-4 hover:border-white/30 transition-colors duration-200"
              >
                <span className="text-xs font-bold tracking-widest text-white/30 group-hover/feat:text-white/50 transition-colors duration-200">
                  {f.num}
                </span>
                <span className="text-sm uppercase tracking-[-0.02em] font-bold text-white">
                  {f.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: abstract visual */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="w-full aspect-square max-w-md relative">
            <div className="absolute inset-0 border-[0.5px] border-white/15" />
            <div className="absolute inset-[12%] border-[0.5px] border-white/10" />
            <div className="absolute inset-[24%] border-[0.5px] border-white/8" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[0.5px] h-full bg-white/8 absolute" />
              <div className="h-[0.5px] w-full bg-white/8 absolute" />
            </div>

            <motion.div
              className="absolute w-2.5 h-2.5 bg-white rounded-full"
              animate={{
                x: [0, 70, 70, 0, -70, -70, 0],
                y: [0, 70, -70, 0, -70, 70, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              style={{ top: "50%", left: "50%", marginTop: -5, marginLeft: -5 }}
            />

            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/25">
                Neural mesh v2.4
              </p>
            </div>

            {[
              "top-0 left-0",
              "top-0 right-0",
              "bottom-0 left-0",
              "bottom-0 right-0",
            ].map((cls, i) => (
              <div key={i} className={`absolute w-5 h-5 ${cls}`}>
                <div className="w-full h-[0.5px] bg-white/30" />
                <div className="w-[0.5px] h-full bg-white/30" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
