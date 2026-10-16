"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const orbs = document.querySelectorAll('.parallax-orb');
    const handleScroll = () => {
      const scrolled = window.scrollY;
      orbs.forEach(orb => {
        const speed = (orb as HTMLElement).dataset.speed;
        if (speed) {
          (orb as HTMLElement).style.transform = `translateY(${scrolled * parseFloat(speed)}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none", overflow: "hidden" }}>
        <div 
          className="parallax-orb"
          data-speed="0.1"
          style={{ 
            position: "absolute", 
            top: "10%", 
            left: "5%", 
            width: "40vw",  
            height: "40vw", 
            background: "radial-gradient(circle, rgba(27, 28, 194, 0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
            borderRadius: "50%"
          }} 
        />
        <div 
          className="parallax-orb"
          data-speed="0.2"
          style={{ 
            position: "absolute", 
            top: "50%", 
            right: "-10%", 
            width: "50vw", 
            height: "50vw", 
            background: "radial-gradient(circle, rgba(253, 100, 59, 0.05) 0%, transparent 70%)",
            filter: "blur(100px)",
            borderRadius: "50%"
          }} 
        />
        <div 
          className="parallax-orb"
          data-speed="0.15"
          style={{ 
            position: "absolute", 
            bottom: "-10%", 
            left: "20%", 
            width: "45vw", 
            height: "45vw", 
            background: "radial-gradient(circle, rgba(253, 100, 59, 0.06) 0%, transparent 70%)",
            filter: "blur(90px)",
            borderRadius: "50%"
          }} 
        />
      </div>

      {children}
    </>
  );
}
