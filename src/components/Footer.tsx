"use client";

const footerLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn",  href: "#" },
  { label: "Clutch",    href: "#" },
  { label: "Privacy",   href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="w-full px-6 md:px-12 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4"
      style={{
        borderTop: "0.5px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      <div
        className="text-[17px] font-medium tracking-[-0.03em] hover:opacity-40 transition-opacity duration-300 cursor-default"
        style={{ fontFamily: "'DM Serif Display', serif", color: "var(--ink)" }}
      >
        SINTRICS
      </div>

      <p
        className="tracking-[0.1em] uppercase text-[11px] text-center"
        style={{ color: "var(--ink-faint)" }}
      >
        © {new Date().getFullYear()} SINTRICS. BRATISLAVA / GLOBAL.
      </p>

      <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="tracking-[0.08em] text-[12px] transition-colors duration-200 hover:underline underline-offset-4"
            style={{ color: "var(--ink-muted)" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
