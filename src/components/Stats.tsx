"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function Counter({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (v) => Math.round(v) + suffix);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(count, to, { duration: 1.6, ease: "easeOut" });
    }
  }, [isInView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 98, suffix: "%", label: "Client satisfaction" },
  { value: 6, suffix: "yrs", label: "In the field" },
  { value: 40, suffix: "+", label: "Global clients" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 md:py-24 px-6 md:px-12 border-t-[0.5px] border-black" ref={ref}>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
            className={`stat-cell py-8 px-4 md:px-10 ${
              i < stats.length - 1 ? "border-r-[0.5px] border-black" : ""
            } ${i >= 2 ? "border-t-[0.5px] md:border-t-0 border-black" : ""}`}
          >
            <p className="text-4xl md:text-5xl font-black tracking-[-0.04em] mb-2">
              <Counter from={0} to={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-[11px] font-bold uppercase tracking-widest text-secondary">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
