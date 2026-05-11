"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
    };

    const onEnterInteractive = () => cursor.classList.add("cursor-hover");
    const onLeaveInteractive = () => cursor.classList.remove("cursor-hover");

    const onEnterDark = () => cursor.classList.add("cursor-inverted");
    const onLeaveDark = () => cursor.classList.remove("cursor-inverted");

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    const darkSections = document.querySelectorAll(".dark-section");
    darkSections.forEach((el) => {
      el.addEventListener("mouseenter", onEnterDark);
      el.addEventListener("mouseleave", onLeaveDark);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div id="custom-cursor" ref={cursorRef} />;
}
