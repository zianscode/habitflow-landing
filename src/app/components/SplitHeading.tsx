"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface SplitHeadingProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

// Section heading that reveals line by line from a mask when it scrolls into view.
export default function SplitHeading({ children, style, className = "section-title" }: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            stagger: 0.12,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <h2 ref={ref} style={style} className={className}>
      {children}
    </h2>
  );
}
