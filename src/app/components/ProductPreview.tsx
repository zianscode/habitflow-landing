"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ProductPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current, 
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );

    gsap.to(mockupRef.current, {
      y: -100, 
      rotation: -2,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }, []);

  return (
    <section
      id="preview"
      ref={sectionRef}
      style={{
        padding: "120px 24px",
        background: "#ffffff",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "100px",
          alignItems: "center",
        }}
      >
        <div ref={contentRef}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, color: "#0f172a", marginBottom: 24, letterSpacing: "-0.03em" }}>
            Precision Analytics for <br /><span style={{ color: "#1b1cc2" }}>Serious Growth</span>
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#64748b", lineHeight: 1.6, marginBottom: 40, fontWeight: 500 }}>
            Our dashboard provides an unrivaled level of detail into your behavioral patterns.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { title: "Velocity Tracking", desc: "Measure the speed of your habit formation over time." },
              { title: "Behavioral Heatmaps", desc: "Visualize when your discipline is strongest." },
            ].map(item => (
              <div key={item.title}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>{item.title}</h4>
                <p style={{ color: "#64748b", fontWeight: 500, fontSize: "0.95rem" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={mockupRef} style={{ position: "relative" }}>
          <div style={{ position: "absolute", width: "120%", height: "120%", background: "radial-gradient(circle, rgba(27, 28, 194,0.06) 0%, transparent 70%)", top: "-10%", left: "-10%", zIndex: 0 }} />
          
          <div style={{ position: "relative", zIndex: 1, borderRadius: "32px", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.12)", border: "1px solid rgba(0,0,0,0.05)", background: "white" }}>
            <div style={{ background: "#1b1cc2", padding: "16px 24px", display: "flex", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fd643b" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fd643b" }} />
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fd643b" }} />
            </div>
            <div style={{ padding: "40px" }}>
              <div style={{ height: 10, width: "40%", background: "#f1f5f9", borderRadius: "100px", marginBottom: 24 }} />
              <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
                <div style={{ height: 100, width: "100%", background: "#f8fafc", borderRadius: "20px" }} />
                <div style={{ height: 100, width: "100%", background: "#f8fafc", borderRadius: "20px" }} />
              </div>
              <div style={{ height: 6, width: "100%", background: "#f1f5f9", borderRadius: "100px", marginBottom: 12 }} />
              <div style={{ height: 6, width: "80%", background: "#f1f5f9", borderRadius: "100px", marginBottom: 12 }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
