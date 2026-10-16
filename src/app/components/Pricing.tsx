"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const plans = [
  { name: "Standard", monthlyPrice: 0, yearlyPrice: 0, description: "Precision tracking for individuals.", features: ["5 Active Habits", "Streak Methodology", "7-Day Archive", "Smart Alerts"], highlight: false, speed: 0.8 },
  { name: "Professional", monthlyPrice: 9, yearlyPrice: 7, description: "Optimized for elite goal setters.", features: ["Unlimited Habits", "Deep Analytics", "Lifetime Archive", "Priority Support", "Custom Themes"], highlight: true, speed: 1.2 },
  { name: "Enterprise", monthlyPrice: 19, yearlyPrice: 15, description: "Engineered for high performance teams.", features: ["Everything in Pro", "Team Challenges", "Org Management", "API Access"], highlight: false, speed: 0.6 },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gridRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card, i) => {
        const speed = (plans[i].speed - 1) * 100;
        gsap.to(card, {
          y: speed,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }
  }, []);

  return (
    <section
      id="pricing"
      ref={containerRef}
      style={{
        padding: "160px 24px",
        background: "#ffffff",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "left", marginBottom: 100, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "40px" }}>
          <div>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.2rem)", fontWeight: 600, color: "#0f172a", marginBottom: 24, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
              Invest in Your <br /><span style={{ color: "#1b1cc2" }}>Potential.</span>
            </h2>
          </div>
          
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, background: "#f1f5f9", padding: "6px", borderRadius: "100px", marginBottom: "10px" }}>
            <button onClick={() => setYearly(false)} style={{ padding: "12px 32px", borderRadius: "100px", border: "none", cursor: "pointer", fontWeight: 600, background: !yearly ? "#1b1cc2" : "transparent", color: !yearly ? "white" : "#64748b", transition: "all 0.3s ease" }}>Monthly</button>
            <button onClick={() => setYearly(true)} style={{ padding: "12px 32px", borderRadius: "100px", border: "none", cursor: "pointer", fontWeight: 600, background: yearly ? "#1b1cc2" : "transparent", color: yearly ? "white" : "#64748b", transition: "all 0.3s ease" }}>Yearly</button>
          </div>
        </div>

        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                padding: "60px 40px",
                borderRadius: "40px",
                background: plan.highlight ? "#1b1cc2" : "#ffffff",
                color: plan.highlight ? "white" : "#1b1cc2",
                border: "1px solid #f1f5f9",
                boxShadow: plan.highlight ? "0 40px 80px rgba(27, 28, 194, 0.15)" : "0 20px 40px rgba(0,0,0,0.02)",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.4s ease",
              }}
            >
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: 12 }}>{plan.name}</h3>
                <p style={{ color: plan.highlight ? "#94a3b8" : "#64748b", fontWeight: 500 }}>{plan.description}</p>
              </div>

              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontSize: "3.5rem", fontWeight: 600 }}>${yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                  <span style={{ fontWeight: 600, color: plan.highlight ? "#94a3b8" : "#64748b" }}>/mo</span>
                </div>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 20, marginBottom: 56, flex: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 14, fontWeight: 500 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "100px", background: plan.highlight ? "#fd643b" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "18px",
                  borderRadius: "100px",
                  background: plan.highlight ? "#fd643b" : "#1b1cc2",
                  color: "white",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
