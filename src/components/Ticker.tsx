"use client";

const clients = [
  "VOLTA",
  "QUANTUM",
  "NEXUS",
  "ORACLE.AI",
  "KINETIC",
  "MERIDIAN",
  "APEX",
  "VERTEX",
];

export default function Ticker() {
  // Duplicate for seamless loop
  const items = [...clients, ...clients];

  return (
    <section className="border-y-[0.5px] border-black py-10 overflow-hidden">
      <div className="ticker-track">
        {items.map((client, i) => (
          <span
            key={i}
            className="text-[11px] font-black uppercase tracking-[0.4em] px-10 whitespace-nowrap text-black"
          >
            {client}
            <span className="ml-10 mr-0 opacity-20">—</span>
          </span>
        ))}
      </div>
    </section>
  );
}
