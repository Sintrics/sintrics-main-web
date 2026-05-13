"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col px-6 md:px-12 pt-12">
      {/* Top meta row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-20">
        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-5 text-muted">
            Our design philosophy
          </h3>
          <p className="text-[14px] font-light leading-[1.75] max-w-xs" style={{ color: "var(--ink-muted)" }}>
            We approach design through logic, systems, and human emotion. Every
            detail we craft carries clarity, intention, and quiet confidence.
            That&apos;s how we design and build websites that work — and feel right.
          </p>
        </motion.div>

        <motion.div
          className="md:col-span-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
        >
          <p className="text-[14px] font-medium" style={{ color: "var(--ink)" }}>
            Based in Bratislava · Worldwide
          </p>
          <p className="text-[13px] mt-1" style={{ color: "var(--ink-faint)" }}>Slovakia</p>

          <div className="flex items-center gap-2 mt-5">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--ink)" }}
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.15em]" style={{ color: "var(--ink-muted)" }}>
              Available for new projects
            </span>
          </div>
        </motion.div>

        <motion.div
          className="md:col-span-4 flex justify-start md:justify-end items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
        >
          <span
            className="text-7xl font-light tracking-tighter select-none"
            style={{ color: "var(--ink-faint)", fontFamily: "'DM Serif Display', serif" }}
          >
            01
          </span>
        </motion.div>
      </div>

      {/* Hero headline */}
      <div
        className="mt-auto pt-10 md:pt-14 pb-16 md:pb-24"
        style={{ borderTop: "0.5px solid var(--border-strong)" }}
      >
        <motion.h1
          className="leading-[0.88] tracking-[-0.03em]"
          style={{
            fontSize: "clamp(3.2rem, 11vw, 13rem)",
            fontFamily: "'DM Serif Display', serif",
            color: "var(--ink)",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.05, ease }}
        >
          Design as balance<br />
          <em>between structure</em><br />
          and emotion
        </motion.h1>

        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-end mt-10 md:mt-14 gap-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
        >
          <p
            className="text-[14px] font-light leading-[1.75] max-w-sm"
            style={{ color: "var(--ink-muted)" }}
          >
            Synthesizing advanced AI engineering with bespoke design to build
            high-performance digital ecosystems. Available for new projects.
          </p>

          <a
            href="#contact"
            className="group/cta flex items-center gap-2 text-[13px] font-medium"
            style={{ color: "var(--ink)" }}
          >
            <span
              className="pb-0.5 group-hover/cta:opacity-40 transition-opacity duration-300"
              style={{ borderBottom: "0.5px solid var(--ink)" }}
            >
              Start a project
            </span>
            <motion.span className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-200">
              <ArrowUpRight size={16} strokeWidth={1.5} />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
