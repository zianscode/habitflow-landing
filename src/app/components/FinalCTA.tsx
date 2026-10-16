"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current, 
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    const blobs = blobsRef.current?.children;
    if (blobs) {
      gsap.to(blobs[0], {
        y: -150,
        x: 50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1.5
        }
      });
      gsap.to(blobs[1], {
        y: 100,
        x: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 2
        }
      });
    }
  }, []);

  return (
    <section
      id="final-cta"
      ref={sectionRef}
      style={{
        padding: "120px 24px",
        background: "#ffffff",
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          background: "#1b1cc2",
          borderRadius: "48px",
          padding: "100px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 40px 80px rgba(27, 28, 194, 0.15)"
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 600, color: "white", marginBottom: 24, letterSpacing: "-0.03em" }}>
            The Best Time to Start <br />Was Yesterday.
          </h2>
          <p style={{ fontSize: "1.15rem", color: "#94a3b8", maxWidth: 600, margin: "0 auto 48px", fontWeight: 500, lineHeight: 1.6 }}>
            The second best time is now. Architect your future with HabitFlow. Join the circle of elite performers today.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#pricing" style={{ padding: "20px 56px", background: "white", color: "#1b1cc2", borderRadius: "100px", fontWeight: 600, textDecoration: "none", fontSize: "1.05rem", transition: "all 0.3s ease" }}>Get Started Free</a>
            <a href="#contact" style={{ padding: "20px 56px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", borderRadius: "100px", fontWeight: 600, textDecoration: "none", fontSize: "1.05rem", transition: "all 0.3s ease" }}>Speak to Sales</a>
          </div>
        </div>

        <div ref={blobsRef}>
          <div style={{ position: "absolute", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(27, 28, 194,0.15) 0%, transparent 70%)", top: "-20%", left: "-10%", zIndex: 1 }} />
          <div style={{ position: "absolute", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(253, 100, 59,0.1) 0%, transparent 70%)", bottom: "-10%", right: "-5%", zIndex: 1 }} />
        </div>
      </div>
    </section>
  );
}
