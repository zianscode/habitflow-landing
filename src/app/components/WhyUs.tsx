"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading";

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
      });

      gsap.utils.toArray<HTMLElement>(".stat-value").forEach((el) => {
        const target = parseFloat(el.dataset.value ?? "0");
        const decimals = Number(el.dataset.decimals ?? 0);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = counter.v.toFixed(decimals);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
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
          <SplitHeading>
            Small steps <br /><span className="muted">add up.</span>
          </SplitHeading>
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
            <div style={{ fontSize: "clamp(4rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "#fd643b" }}><span className="stat-value" data-value="90">90</span>%</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>Still checking in after 30 days</div>
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
            <div style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "white" }}><span className="stat-value" data-value="3.5" data-decimals="1">3.5</span>M</div>
            <div style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>Check-ins logged</div>
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
            <div style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)", fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "#1b1cc2" }}><span className="stat-value" data-value="10">10</span>K+</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>People tracking habits</div>
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
            <div style={{ fontSize: "clamp(4rem, 8vw, 6rem)", fontWeight: 700, lineHeight: 1, marginBottom: 16, color: "#fd643b" }}><span className="stat-value" data-value="4.9" data-decimals="1">4.9</span>★</div>
            <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>Average app rating</div>
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
