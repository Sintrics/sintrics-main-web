"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col px-6 md:px-12 pt-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <h3 className="text-[11px] font-bold uppercase tracking-widest mb-6">
            Our design philosophy
          </h3>
          <p className="text-sm font-medium leading-relaxed max-w-xs text-black">
            We approach design through logic, systems, and human emotion. Every
            detail we craft carries clarity, intention, and quiet confidence.
            That&apos;s how we design and build websites that work — and feel right.
          </p>
        </motion.div>

        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          <p className="text-sm font-medium">Based in Bratislava • Worldwide</p>
          <p className="text-xs text-secondary mt-1">Slovakia</p>
        </motion.div>

        <motion.div
          className="md:col-span-4 flex justify-start md:justify-end items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span className="text-7xl font-light tracking-tighter text-black/20 select-none">
            01
          </span>
        </motion.div>
      </div>

      <div className="mt-auto border-t-[0.5px] border-black pt-10 md:pt-12 pb-16 md:pb-24">
        <motion.h1
          className="text-[clamp(3.5rem,12vw,15rem)] leading-[0.85] font-black tracking-[-0.04em] uppercase text-black"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease }}
        >
          UI/UX &amp;<br />WEB DESIGN
        </motion.h1>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mt-10 md:mt-12 gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          <p className="text-sm font-medium max-w-sm text-black">
            Synthesizing advanced AI engineering with bespoke design to build
            high-performance digital ecosystems. Available for new projects.
          </p>

          <div className="flex items-center gap-6 md:gap-8">
            <a
              href="#contact"
              className="group/cta flex items-center gap-2 text-sm font-black uppercase tracking-tighter"
            >
              <span className="border-b border-black pb-0.5 group-hover/cta:opacity-50 transition-opacity duration-200">
                Start a project
              </span>
              <motion.span
                className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-200"
              >
                <ArrowUpRight size={20} strokeWidth={2} />
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
