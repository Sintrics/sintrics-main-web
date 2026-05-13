"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "AI Lab", href: "#ai-lab" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 h-16 flex justify-between items-center px-6 md:px-12 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(242,240,235,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "0.5px solid rgba(15,15,14,0.12)" : "0.5px solid transparent",
        }}
      >
        <a
          href="#"
          className="text-xl font-semibold tracking-[-0.04em] select-none hover:opacity-50 transition-opacity duration-300"
          style={{ color: "var(--ink)" }}
        >
          SINTRICS
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-[13px] font-medium"
              style={{ color: "var(--ink-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="btn-press hidden md:block text-[12px] font-medium tracking-wide px-5 py-2 border transition-colors duration-300 hover:bg-[var(--ink)] hover:text-[var(--bg)]"
            style={{ borderColor: "var(--border-strong)", color: "var(--ink)" }}
          >
            Start Project
          </a>

          <button
            className="btn-press md:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 10 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-40 px-6 py-10 flex flex-col gap-6"
            style={{
              background: "var(--bg)",
              borderBottom: "0.5px solid var(--border-strong)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-light tracking-[-0.03em] hover:opacity-40 transition-opacity duration-150"
                style={{ fontFamily: "'DM Serif Display', serif", color: "var(--ink)" }}
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-press mt-4 text-[12px] font-medium tracking-widest uppercase text-center py-4"
              style={{ background: "var(--ink)", color: "var(--bg)" }}
            >
              Start Project
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
