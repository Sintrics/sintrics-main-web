"use client";

const footerLinks = [
  { label: "INSTAGRAM", href: "#" },
  { label: "LINKEDIN", href: "#" },
  { label: "CLUTCH", href: "#" },
  { label: "PRIVACY", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t-[0.5px] border-black bg-white px-6 md:px-12 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="text-lg font-black tracking-[-0.04em] hover:opacity-50 transition-opacity duration-200 cursor-default">
        SINTRICS
      </div>
      <p className="tracking-[0.1em] uppercase text-[11px] text-black/50 text-center">
        © {new Date().getFullYear()} SINTRICS. BRATISLAVA / GLOBAL.
      </p>
      <div className="flex items-center gap-6 md:gap-8 flex-wrap justify-center">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="tracking-[0.1em] uppercase text-[11px] text-black/50 hover:text-black transition-colors duration-200 underline-offset-4 hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
