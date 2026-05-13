"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const team = [
  { name: "Andrej Lovecký", role: "Founder", initials: "AL" },
  { name: "Lukas Balaska", role: "Systems Architect", initials: "LB" },
];

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="process"
      className="py-24 md:py-32 px-6 md:px-12 border-t-[0.5px] border-black"
      ref={ref}
    >
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 md:mb-24 gap-10">
        <motion.h2
          className="text-5xl md:text-7xl font-black tracking-[-0.04em] uppercase leading-[0.8] text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          TEAM MADE
          <br />
          VISIBLE
        </motion.h2>
        <motion.p
          className="max-w-md text-sm font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Small team. Clear intent. An open view into a small design team.
          Structure, rhythm, and emotion expressed through clarity and control.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-[0.5px] bg-black">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.08 + 0.15, ease }}
            // Card lifts on hover
            whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] } }}
            className="team-card bg-white p-6 md:p-8 cursor-default"
          >
            {/* Portrait */}
            <div className="w-full aspect-[4/5] bg-black/5 mb-6 overflow-hidden relative">
              <div className="team-portrait absolute inset-0 flex items-end justify-center pb-8">
                <div className="text-[80px] font-black text-black/10 leading-none select-none">
                  {member.initials}
                </div>
              </div>
              {/* Corner markers */}
              <div className="absolute top-4 left-4 right-4 flex justify-between">
                <div className="w-3 h-3 border-t border-l border-black/20" />
                <div className="w-3 h-3 border-t border-r border-black/20" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="w-3 h-3 border-b border-l border-black/20" />
                <div className="w-3 h-3 border-b border-r border-black/20" />
              </div>
            </div>
            <h4 className="text-lg font-black uppercase tracking-[-0.03em] text-black">
              {member.name}
            </h4>
            <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mt-1">
              {member.role}
            </p>
          </motion.div>
        ))}
        <div className="bg-white hidden md:block" />
        <div className="bg-white hidden md:block" />
      </div>
    </section>
  );
}
