"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const rows = [
  { text: "Show up · Check in · Repeat · ", from: "0%", to: "-25%", solid: true },
  { text: "Small steps · Every day · ", from: "-25%", to: "0%", solid: false },
];

// Oversized text rows that slide sideways as the page scrolls.
export default function ScrollText() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".st-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { xPercent: parseFloat(rows[i].from) },
          {
            xPercent: parseFloat(rows[i].to),
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    }, sectionRef);

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      style={{ padding: "clamp(40px, 8vw, 100px) 0", overflow: "hidden" }}
    >
      {rows.map((row) => (
        <div
          key={row.text}
          className="st-row"
          style={{
            whiteSpace: "nowrap",
            fontFamily: "var(--font-brand)",
            fontSize: "clamp(3rem, 11vw, 9.5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: row.solid ? "#0f172a" : "transparent",
            WebkitTextStroke: row.solid ? "0" : "1.5px #1b1cc2",
            willChange: "transform",
          }}
        >
          {row.text.repeat(4)}
        </div>
      ))}
    </section>
  );
}
