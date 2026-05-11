"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "AI LAB", href: "#ai-lab" },
  { label: "PROCESS", href: "#process" },
  { label: "CONTACT", href: "#contact" },
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
        className={`fixed top-0 w-full z-50 bg-white h-16 flex justify-between items-center px-6 md:px-12 border-b-[0.5px] border-black transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-100"
        }`}
      >
        <a
          href="#"
          className="text-2xl font-black tracking-[-0.05em] text-black select-none hover:opacity-60 transition-opacity duration-200"
        >
          SINTRICS
        </a>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link font-bold tracking-tighter uppercase text-[11px] text-black opacity-50 hover:opacity-100 transition-opacity duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="btn-press hidden md:block font-bold tracking-tighter uppercase text-[11px] text-black border-[0.5px] border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-200"
          >
            START PROJECT
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
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
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
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b-[0.5px] border-black px-6 py-8 flex flex-col gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMobileOpen(false)}
                className="font-black tracking-tighter uppercase text-2xl text-black hover:opacity-50 transition-opacity duration-150"
              >
                {link.label}
              </motion.a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-press mt-4 font-bold tracking-widest uppercase text-[11px] text-white bg-black px-6 py-4 text-center"
            >
              START PROJECT
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
