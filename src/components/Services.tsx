"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Sparkles, Cpu } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    num: "01",
    icon: Brain,
    title: "AI Integration",
    description:
      "Embedding Large Language Models and custom neural networks directly into your product workflow.",
    tags: ["LLM", "Predictive"],
  },
  {
    num: "02",
    icon: Sparkles,
    title: "Bespoke UI/UX",
    description:
      "Crafting editorial-grade interfaces that prioritize clarity, emotion, and tactile digital interaction.",
    tags: ["Art Direction", "Visuals"],
  },
  {
    num: "03",
    icon: Cpu,
    title: "Creative Engineering",
    description:
      "Building robust, scalable architectures to ensure performance is never compromised.",
    tags: ["React", "Cloud Native"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-12" ref={ref}>
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-6"
            style={{ color: "var(--ink-muted)" }}
          >
            Core services
          </p>
          <h2
            className="leading-[0.9] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 6rem)",
              fontFamily: "'DM Serif Display', serif",
              color: "var(--ink)",
            }}
          >
            Our core disciplines —<br />
            <em>where thinking becomes design.</em>
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-5 flex items-end"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <p
            className="text-[14px] font-light leading-[1.75]"
            style={{ color: "var(--ink-muted)" }}
          >
            Architecting sensory experiences that leverage cognitive computing
            and high-fidelity design primitives. Each service represents a
            distinct area of responsibility.
          </p>
        </motion.div>
      </div>

      {/* Service cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ borderTop: "0.5px solid var(--border-strong)" }}
      >
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
              className="service-card group p-8 md:p-10 cursor-default"
              style={{
                borderBottom: "0.5px solid var(--border)",
                borderRight: i < 2 ? "0.5px solid var(--border)" : undefined,
              }}
            >
              {/* Number + icon */}
              <div className="flex items-start justify-between mb-10 md:mb-12">
                <Icon size={28} strokeWidth={1} style={{ color: "var(--ink-muted)" }}
                  className="group-hover:text-[var(--bg)] transition-colors duration-400"
                />
                <span
                  className="text-[11px] font-semibold tracking-[0.15em]"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {service.num}
                </span>
              </div>

              <h3
                className="text-[20px] font-medium tracking-[-0.02em] mb-4 leading-snug"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {service.title}
              </h3>

              <p
                className="text-[13px] font-light leading-[1.8] mb-10 md:mb-12"
                style={{ color: "var(--ink-muted)" }}
              >
                {service.description}
              </p>

              <div
                className="text-[10px] font-semibold tracking-[0.2em] uppercase flex gap-4"
                style={{ color: "var(--ink-faint)" }}
              >
                {service.tags.map((tag, j) => (
                  <span key={tag} className="flex items-center gap-2">
                    {tag}
                    {j < service.tags.length - 1 && <span>·</span>}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
