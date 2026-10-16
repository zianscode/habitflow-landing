"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const steps = [
  {
    id: "01",
    title: "Architect Your Habits",
    desc: "Design custom routines engineered for your specific life objectives. Build the foundation of your success.",
    color: "#1b1cc2",
    lightColor: "#1b1cc215",
  },
  {
    id: "02",
    title: "Precision Execution",
    desc: "Log your progress with high-fidelity interactions. Every action is a vote for the person you want to become.",
    color: "#fd643b",
    lightColor: "#fd643b15",
  },
  {
    id: "03",
    title: "Master Your Future",
    desc: "Review deep analytics and sustain your peak performance. Turn consistency into permanent excellence.",
    color: "#1b1cc2",
    lightColor: "#1b1cc215",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (lineRef.current) {
      const pathLength = lineRef.current.getTotalLength();
      
      gsap.set(lineRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 80%",
          scrub: 1.5,
        },
      });
    }

    const bgNumbers = document.querySelectorAll(".bg-number");
    bgNumbers.forEach((num) => {
      gsap.to(num, {
        y: -120,
        force3D: true,
        scrollTrigger: {
          trigger: num,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="howitworks" 
      style={{ 
        padding: "160px 24px", 
        background: "#ffffff",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: 100 }}>
          <span style={{ 
            color: "#0f172a", 
            fontWeight: 600, 
            fontSize: "0.9rem", 
            textTransform: "uppercase", 
            letterSpacing: "0.2em",
            display: "block",
            marginBottom: 16
          }}>
            The Process
          </span>
          <h2 style={{ 
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)", 
            fontWeight: 600, 
            color: "#0f172a", 
            letterSpacing: "-0.04em",
            lineHeight: 1.1
          }}>
            From Ambition to <span style={{ color: "#1b1cc2" }}>Automated.</span>
          </h2>
        </div>

        <div style={{ position: "relative" }}>
          <svg 
            style={{ 
              position: "absolute", 
              top: "60px", 
              left: 0, 
              width: "100%", 
              height: "40px", 
              zIndex: 0,
              display: "block"
            }} 
            viewBox="0 0 1200 40" 
            fill="none"
          >
            <path 
              ref={lineRef}
              d="M150 20 C 400 20, 800 20, 1050 20" 
              stroke="url(#lineGradient)" 
              strokeWidth="2" 
              strokeLinecap="round"
              strokeDasharray="10 10"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1b1cc2" />
                <stop offset="50%" stopColor="#1b1cc2" />
                <stop offset="100%" stopColor="#fd643b" />
              </linearGradient>
            </defs>
          </svg>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
            gap: "40px",
            position: "relative",
            zIndex: 1
          }}>
            {steps.map((step) => (
              <div 
                key={step.id} 
                style={{ 
                  position: "relative", 
                  padding: "40px 20px",
                  textAlign: "center"
                }}
              >
                <div 
                  className="bg-number"
                  style={{ 
                    position: "absolute", 
                    top: "-20px", 
                    left: "50%", 
                    transform: "translateX(-50%)", 
                    fontSize: "12rem", 
                    fontWeight: 800, 
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(27, 28, 194, 0.03)",
                    zIndex: -1,
                    pointerEvents: "none",
                    userSelect: "none"
                  }}
                >
                  {step.id}
                </div>

                <div style={{ 
                  width: "56px", 
                  height: "56px", 
                  background: step.color, 
                  color: "white", 
                  borderRadius: "18px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: "1.1rem", 
                  fontWeight: 700, 
                  margin: "0 auto 32px",
                  boxShadow: `0 20px 40px ${step.color}30`,
                  position: "relative"
                }}>
                  {step.id}
                </div>

                <h3 style={{ 
                  fontSize: "1.5rem", 
                  fontWeight: 600, 
                  color: "#0f172a", 
                  marginBottom: 16,
                  letterSpacing: "-0.02em"
                }}>
                  {step.title}
                </h3>
                
                <p style={{ 
                  fontSize: "1.05rem", 
                  color: "#64748b", 
                  lineHeight: 1.7,
                  maxWidth: "320px",
                  margin: "0 auto"
                }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
