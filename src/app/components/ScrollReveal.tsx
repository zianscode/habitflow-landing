"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  parallax?: boolean;
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = "up", 
  distance = 50,
  parallax = false
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    gsap.fromTo(
      content,
      {
        y: direction === "up" ? distance : direction === "down" ? -distance : 0,
        x: direction === "left" ? distance : direction === "right" ? -distance : 0,
        opacity: 0,
        scale: 0.98,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: delay,
        ease: "expo.out",
        force3D: true,
        scrollTrigger: {
          trigger: container,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );

    if (parallax) {
      gsap.to(container, {
        y: -40, 
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1, 
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === container) st.kill();
      });
    };
  }, [direction, distance, delay, parallax]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: "100%", 
        position: "relative",
        willChange: parallax ? "transform" : "auto" 
      }}
    >
      <div 
        ref={contentRef} 
        style={{ 
          width: "100%",
          willChange: "transform, opacity"
        }}
      >
        {children}
      </div>
    </div>
  );
}
