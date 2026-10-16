"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading";
import { Check } from "./Icons";

const plans = [
  { name: "Free", monthlyPrice: 0, yearlyPrice: 0, description: "For getting started.", features: ["Up to 5 habits", "Streaks and reminders", "7-day history"], cta: "Start for free", highlight: false, speed: 0.8 },
  { name: "Pro", monthlyPrice: 9, yearlyPrice: 7, description: "For people who track a lot.", features: ["Unlimited habits", "Full history", "Charts and heatmaps", "Export your data", "Custom themes"], cta: "Try Pro", highlight: true, speed: 1.2 },
  { name: "Team", monthlyPrice: 19, yearlyPrice: 15, description: "For groups and small teams.", features: ["Everything in Pro", "Shared challenges", "Team dashboard", "API access"], cta: "Contact us", highlight: false, speed: 0.6 },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
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
        <div style={{ textAlign: "left", marginBottom: 72, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "40px" }}>
          <div>
            <SplitHeading style={{ marginBottom: 0 }}>
              Free to start. <br /><span className="muted">Fair after that.</span>
            </SplitHeading>
          </div>
          
          <div className="billing-toggle" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
            <button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>
              Yearly <span className="billing-save">−20%</span>
            </button>
          </div>
        </div>

        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                padding: "40px 32px",
                borderRadius: "32px",
                background: plan.highlight ? "var(--brand)" : "#ffffff",
                color: plan.highlight ? "white" : "var(--ink)",
                border: plan.highlight ? "1px solid var(--brand)" : "1px solid var(--line)",
                boxShadow: plan.highlight ? "0 40px 80px -24px rgba(27, 28, 194, 0.45)" : "0 1px 2px rgba(15, 23, 42, 0.04)",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.4s ease",
              }}
            >
              <div style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <h3 style={{ fontFamily: "var(--font-brand)", fontSize: "1.35rem", fontWeight: 600, letterSpacing: "-0.02em" }}>{plan.name}</h3>
                  {plan.highlight && <span className="plan-badge">Most picked</span>}
                </div>
                <p style={{ color: plan.highlight ? "rgba(255,255,255,0.72)" : "var(--muted)", fontSize: "0.95rem" }}>{plan.description}</p>
              </div>

              <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: plan.highlight ? "1px solid rgba(255,255,255,0.16)" : "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontFamily: "var(--font-brand)", fontSize: "3.25rem", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>${yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                  <span style={{ fontWeight: 500, color: plan.highlight ? "rgba(255,255,255,0.72)" : "var(--muted)" }}>/ month</span>
                </div>
                <div style={{ fontSize: "0.85rem", marginTop: 10, color: plan.highlight ? "rgba(255,255,255,0.6)" : "var(--subtle)" }}>
                  {plan.monthlyPrice === 0 ? "No card needed" : yearly ? "Billed yearly" : "Billed monthly"}
                </div>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: 40, flex: 1, fontSize: "0.95rem" }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 20, height: 20, flexShrink: 0, borderRadius: "100px", background: plan.highlight ? "rgba(255,255,255,0.16)" : "#eef0ff", color: plan.highlight ? "#ffffff" : "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Check />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`btn btn-lg btn-block ${plan.highlight ? "btn-light" : "btn-secondary"}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
