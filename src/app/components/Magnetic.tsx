"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Magnetic({ children }: { children: React.ReactNode }) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magneticRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magneticRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magneticRef.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const element = magneticRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
        gsap.killTweensOf(element);
      }
    };
  }, []);

  return (
    <div ref={magneticRef} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
