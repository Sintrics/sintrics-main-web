"use client";

const items = [
  "ORACLE.AI", "KINETIC", "MERIDIAN", "APEX", "VERTEX", "VOLTA", "QUANTUM", "NEXUS",
  "ORACLE.AI", "KINETIC", "MERIDIAN", "APEX", "VERTEX", "VOLTA", "QUANTUM", "NEXUS",
];

export default function Ticker() {
  return (
    <div
      className="overflow-hidden py-5"
      style={{ borderTop: "0.5px solid var(--border)", borderBottom: "0.5px solid var(--border)" }}
    >
      <div className="ticker-track">
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <span
              className="text-[11px] font-semibold tracking-[0.25em] uppercase px-8 whitespace-nowrap"
              style={{ color: "var(--ink-muted)" }}
            >
              {item}
            </span>
            <span style={{ color: "var(--ink-faint)", fontSize: "6px" }}>●</span>
          </div>
        ))}
      </div>
    </div>
  );
}
