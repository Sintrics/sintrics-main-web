"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Sparkles, Cpu, ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Embedding Large Language Models and custom neural networks directly into your product workflow.",
    tags: ["LLM", "Predictive"],
  },
  {
    icon: Sparkles,
    title: "Bespoke UI/UX",
    description:
      "Crafting editorial-grade interfaces that prioritize clarity, emotion, and tactile digital interaction.",
    tags: ["Art Direction", "Visuals"],
  },
  {
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
    <section id="services" className="py-16 md:py-24 px-6 md:px-12" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-20">
        <motion.div
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] uppercase leading-none text-black">
            SERVICES ENGINEERED
            <br />
            FOR SUPREMACY
          </h2>
        </motion.div>

        <motion.div
          className="lg:col-span-4 flex items-end"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className="text-sm font-medium leading-relaxed text-secondary">
            Architecting sensory experiences that leverage cognitive computing
            and high-fidelity design primitives.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t-[0.5px] border-black">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease }}
              className={`group p-8 md:p-12 border-b md:border-b-0 border-black ${
                i < 2 ? "md:border-r-[0.5px]" : ""
              } hover:bg-black hover:text-white transition-colors duration-400 cursor-default`}
              style={{ transition: "background 0.35s ease, color 0.35s ease" }}
            >
              <div className="mb-10 md:mb-12">
                <Icon
                  size={32}
                  strokeWidth={1}
                  className="service-icon"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-[-0.03em] mb-4 md:mb-6">
                {service.title}
              </h3>
              <p className="text-sm font-medium text-secondary group-hover:text-white/60 mb-10 md:mb-12"
                style={{ transition: "color 0.35s ease" }}>
                {service.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold tracking-widest uppercase flex gap-3">
                  {service.tags.map((tag, j) => (
                    <span key={tag}>
                      {tag}
                      {j < service.tags.length - 1 && <span className="ml-3">•</span>}
                    </span>
                  ))}
                </div>
                <ArrowUpRight
                  size={14}
                  className="opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0 transition-all duration-300"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
