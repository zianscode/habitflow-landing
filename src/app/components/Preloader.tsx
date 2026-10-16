"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import logoIcon from "../../../public/images/icon.png";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      if (!containerRef.current || !contentRef.current) return;

      const tl = gsap.timeline({
        onComplete: () => setLoading(false)
      });

      tl.to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.inOut"
      })
      .to(".preloader-bg-layer", {
        height: 0,
        duration: 0.8,
        ease: "expo.inOut",
        stagger: 0.1
      });
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const timeout = setTimeout(handleLoad, 3000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  if (!loading) return null;

  return (
    <div ref={containerRef} style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>

      <div className="preloader-bg-layer" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#fd643b", zIndex: 1 }} />
      <div className="preloader-bg-layer" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#1b1cc2", zIndex: 0 }} />

      <div 
        ref={contentRef}
        style={{ 
          position: "absolute", 
          inset: 0, 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center", 
          zIndex: 2,
          color: "white"
        }}
      >
        <div style={{ position: "relative", width: "80px", height: "80px", marginBottom: "24px" }}>
          <Image
            src={logoIcon}
            alt="Logo"
            fill
            sizes="80px"
            style={{ objectFit: "contain" }}
            className="pulse-animation"
            priority
          />
        </div>
        <h2 style={{ fontWeight: 600, fontSize: "1.5rem", letterSpacing: "-0.02em" }}>HabitFlow</h2>
        <div style={{ marginTop: "16px", width: "40px", height: "2px", background: "rgba(255,255,255,0.2)", borderRadius: "2px", overflow: "hidden" }}>
          <div className="loader-bar" style={{ width: "100%", height: "100%", background: "white" }} />
        </div>
      </div>

      <style>{`
        .pulse-animation {
          animation: pulse 2s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
        .loader-bar {
          animation: loading 2s infinite ease-in-out;
          transform-origin: left;
        }
        @keyframes loading {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  );
}
