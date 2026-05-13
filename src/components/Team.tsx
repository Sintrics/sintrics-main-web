"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const team = [
  { name: "Andrej Lovecký", role: "Founder", initials: "AL" },
  { name: "Lukas Balaska",  role: "Systems Architect", initials: "LB" },
];

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="process"
      className="py-24 md:py-32 px-6 md:px-12"
      style={{ borderTop: "0.5px solid var(--border)" }}
      ref={ref}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 md:mb-24 gap-10">
        <motion.h2
          className="leading-[0.85] tracking-[-0.02em]"
          style={{
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontFamily: "'DM Serif Display', serif",
            color: "var(--ink)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          Team made<br />
          <em>visible</em>
        </motion.h2>

        <motion.p
          className="max-w-sm text-[14px] font-light leading-[1.8]"
          style={{ color: "var(--ink-muted)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          Small team. Clear intent. An open view into a small design team.
          Structure, rhythm, and emotion expressed through clarity and control.
        </motion.p>
      </div>

      {/* Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-[0.5px]"
        style={{ background: "var(--border)" }}
      >
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 + 0.15, ease }}
            whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } }}
            className="team-card p-6 md:p-8 cursor-default"
            style={{ background: "var(--bg)" }}
          >
            {/* Portrait placeholder */}
            <div
              className="w-full aspect-[4/5] mb-6 overflow-hidden relative portrait-bg"
            >
              <div className="absolute inset-0 flex items-end justify-center pb-8">
                <div
                  className="text-[80px] font-light leading-none select-none"
                  style={{
                    color: "rgba(15,15,14,0.08)",
                    fontFamily: "'DM Serif Display', serif",
                  }}
                >
                  {member.initials}
                </div>
              </div>
              {/* Corner markers */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="w-3 h-3" style={{ borderTop: "0.5px solid var(--border-strong)", borderLeft: "0.5px solid var(--border-strong)" }} />
                <div className="w-3 h-3" style={{ borderTop: "0.5px solid var(--border-strong)", borderRight: "0.5px solid var(--border-strong)" }} />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="w-3 h-3" style={{ borderBottom: "0.5px solid var(--border-strong)", borderLeft: "0.5px solid var(--border-strong)" }} />
                <div className="w-3 h-3" style={{ borderBottom: "0.5px solid var(--border-strong)", borderRight: "0.5px solid var(--border-strong)" }} />
              </div>
            </div>

            <h4
              className="text-[17px] font-medium tracking-[-0.02em]"
              style={{ fontFamily: "'DM Serif Display', serif", color: "var(--ink)" }}
            >
              {member.name}
            </h4>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.15em] mt-1"
              style={{ color: "var(--ink-muted)" }}
            >
              {member.role}
            </p>
          </motion.div>
        ))}
        {/* Empty cells to fill grid */}
        <div style={{ background: "var(--bg)" }} className="hidden md:block" />
        <div style={{ background: "var(--bg)" }} className="hidden md:block" />
      </div>
    </section>
  );
}
