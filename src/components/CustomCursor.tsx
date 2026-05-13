"use client";

import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const onEnter = () => cursor.classList.add("cursor-hover");
    const onLeave = () => cursor.classList.remove("cursor-hover");

    const targets = () =>
      document.querySelectorAll("a, button, [role=button], input, textarea, select");

    const attachListeners = () => {
      targets().forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    // Dark sections invert cursor
    const darkSections = () => document.querySelectorAll(".dark-section");
    const checkDark = (e: MouseEvent) => {
      let onDark = false;
      darkSections().forEach((sec) => {
        const r = sec.getBoundingClientRect();
        if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
          onDark = true;
        }
      });
      if (onDark) cursor.classList.add("cursor-inverted");
      else cursor.classList.remove("cursor-inverted");
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mousemove", checkDark);
    attachListeners();

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mousemove", checkDark);
      targets().forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return <div id="custom-cursor" />;
}
