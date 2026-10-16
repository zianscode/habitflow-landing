"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(".stat-card", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
    });
  }, []);

  const cardStyle: React.CSSProperties = {
    padding: "60px 40px",
    borderRadius: "40px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.4s ease"
  };

  return (
    <section
      id="whyus"
      ref={sectionRef}
      style={{
        padding: "clamp(80px, 12vw, 160px) 24px",
        background: "#ffffff",
        overflow: "hidden",
        position: "relative"
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "clamp(60px, 10vw, 100px)" }}>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.2rem)", fontWeight: 600, color: "#0f172a", marginBottom: 24, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Unrivaled Metrics <br /><span style={{ color: "#1b1cc2" }}>for Unstoppable Growth.</span>
          </h2>
        </div>

        <div 
          ref={gridRef}
          className="stats-grid"
        >
          <div
            className="stat-card"
            style={{ 
              ...cardStyle, 
              gridArea: "s1",
              background: "#f8fafc",
              border: "1px solid #f1f5f9"
            }}
          >
            <div style={{ fontSize: "clamp(4rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "#fd643b" }}>90%</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>Consistency</div>
          </div>

          <div
            className="stat-card"
            style={{ 
              ...cardStyle, 
              gridArea: "s2",
              background: "#1b1cc2",
              color: "white"
            }}
          >
            <div style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "white" }}>3.5×</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>Productivity Boost</div>
          </div>

          <div
            className="stat-card"
            style={{ 
              ...cardStyle, 
              gridArea: "s3",
              background: "#f8fafc",
              border: "1px solid #f1f5f9"
            }}
          >
            <div style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "#1b1cc2" }}>10K+</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>Global Achievers</div>
          </div>

          <div
            className="stat-card"
            style={{ 
              ...cardStyle, 
              gridArea: "s4",
              background: "#f8fafc",
              border: "1px solid #f1f5f9"
            }}
          >
            <div style={{ fontSize: "clamp(4rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "#fd643b" }}>4.9★</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>User Rating</div>
          </div>
        </div>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-areas: 
            "s1 s1 s2"
            "s3 s4 s4";
          gap: 24px;
        }

        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-areas: 
              "s1 s1"
              "s2 s3"
              "s4 s4";
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
            grid-template-areas: 
              "s1"
              "s2"
              "s3"
              "s4";
          }
          .stat-card {
            padding: 40px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
