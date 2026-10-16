"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const DynamicIllustration = ({ 
  type, 
  color, 
  height = "160px", 
  scale = 1 
}: { 
  type: string, 
  color: string, 
  height?: string, 
  scale?: number 
}) => {
  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: height,
    width: "100%",
    marginBottom: "30px",
    overflow: "hidden",
    borderRadius: "24px",
    background: color,
    boxShadow: `0 20px 40px ${color}30`,
    transform: `scale(${scale})`
  };

  if (type === "momentum") {
    return (
      <div className="illus-container" style={containerStyle}>
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-end" }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="vortex-bar" style={{ width: "18px", height: `${25 * i}px`, background: "#ffffff", borderRadius: "20px", opacity: 0.4 + i * 0.1 }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === "tracking") {
    return (
      <div className="illus-container" style={containerStyle}>
        <div className="radar-circle" style={{ position: "absolute", width: "180px", height: "180px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%" }} />
        <div className="radar-hand" style={{ position: "absolute", width: "3px", height: "90px", background: "linear-gradient(to top, #ffffff, transparent)", transformOrigin: "bottom center", bottom: "50%" }} />
        <div style={{ width: "16px", height: "16px", background: "#ffffff", borderRadius: "50%", zIndex: 2 }} />
      </div>
    );
  }

  if (type === "analytics") {
    return (
      <div className="illus-container" style={containerStyle}>
        <svg viewBox="0 0 200 100" style={{ width: "80%", height: "70%", overflow: "visible" }}>
          <path d="M0,80 Q40,10 80,60 T160,30 T200,70" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          {[0, 80, 160, 200].map((x, i) => (
            <circle key={i} className="peak-node" cx={x} cy={i % 2 === 0 ? 80 : 30} r="12" fill="#ffffff" />
          ))}
        </svg>
      </div>
    );
  }

  if (type === "objectives") {
    return (
      <div className="illus-container" style={containerStyle}>
        <div style={{ display: "flex", gap: "15px", width: "100%", padding: "0 30px" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, height: "100px", background: "rgba(255,255,255,0.1)", borderRadius: "15px", position: "relative", overflow: "hidden" }}>
              <div className="strategic-fill" style={{ position: "absolute", bottom: 0, width: "100%", height: "40%", background: "#ffffff" }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "alerts") {
    return (
      <div className="illus-container" style={containerStyle}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", width: "80%" }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="pulse-bar" style={{ flex: 1, height: `${20 + Math.sin(i) * 30}px`, background: "#ffffff", borderRadius: "8px", opacity: 0.7 }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === "global") {
    return (
      <div className="illus-container" style={containerStyle}>
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="global-node" style={{ width: "15px", height: "15px", background: "#ffffff", borderRadius: "50%", zIndex: 2 }} />
          ))}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1 }}>
            <path className="global-line" d="M0,50 Q150,0 300,50 T600,50" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />
          </svg>
        </div>
      </div>
    );
  }
  return null;
};

export default function Features() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.children;
      if (!cards) return;

      Array.from(cards).forEach((card) => {
        const cardEl = card as HTMLElement;
        const vortex = cardEl.querySelectorAll(".vortex-bar");
        const pulse = cardEl.querySelectorAll(".pulse-bar");
        const nodes = cardEl.querySelectorAll(".peak-node, .global-node");
        const fills = cardEl.querySelectorAll(".strategic-fill");
        const radar = cardEl.querySelector(".radar-hand");
        const line = cardEl.querySelector(".global-line");

        if (vortex.length) gsap.to(vortex, { height: "+=40", stagger: 0.1, repeat: -1, yoyo: true, duration: 1 });
        if (pulse.length) gsap.to(pulse, { height: "80px", stagger: 0.05, repeat: -1, yoyo: true, duration: 0.6 });
        if (nodes.length) gsap.to(nodes, { scale: 1.3, opacity: 0.6, stagger: 0.2, repeat: -1, yoyo: true, duration: 1 });
        if (fills.length) gsap.to(fills, { height: "90%", stagger: 0.3, repeat: -1, yoyo: true, duration: 1.5, ease: "sine.inOut" });
        if (radar) gsap.to(radar, { rotate: 360, repeat: -1, duration: 2, ease: "none" });
        if (line) gsap.to(line, { strokeDashoffset: 100, repeat: -1, duration: 2, ease: "none" });

        gsap.fromTo(cardEl, { y: 30, opacity: 0 }, { y: 0, opacity: 1, scrollTrigger: { trigger: cardEl, start: "top 90%" } });
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
    if (window.innerWidth > 992) {
      gsap.to(e.currentTarget, { y: -10, borderColor: color, boxShadow: `0 30px 60px ${color}20`, duration: 0.4 });
    }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, borderColor: "#f1f5f9", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", duration: 0.4 });
  };

  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "40px",
    border: "1px solid #f1f5f9",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    cursor: "pointer",
    transition: "all 0.4s ease",
    position: "relative",
    overflow: "hidden"
  };

  return (
    <section id="features" style={{ padding: "160px 24px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 600, color: "#0f172a", marginBottom: 80, letterSpacing: "-0.04em" }}>
          Mastery Through <span style={{ color: "#1b1cc2" }}>Precision.</span>
        </h2>

        <div ref={gridRef} className="features-grid">
          
          <div 
            className="f-card f-card-1"
            style={{ ...cardStyle, gridArea: "span 1 / span 2" }} 
            onMouseEnter={(e) => handleMouseEnter(e, "#1b1cc2")}
            onMouseLeave={handleMouseLeave}
          >
            <DynamicIllustration type="momentum" color="#1b1cc2" height="300px" />
            <div>
              <h3 style={{ fontSize: "2rem", fontWeight: 600, color: "#0f172a", marginBottom: 16 }}>Elite Momentum Engine</h3>
              <p style={{ fontSize: "1.1rem", color: "#64748b", lineHeight: 1.7 }}>Forge unbreakable streaks with our precision-engineered momentum engine.</p>
            </div>
          </div>

          <div 
            className="f-card f-card-2"
            style={{ ...cardStyle, gridArea: "span 1 / span 1" }}
            onMouseEnter={(e) => handleMouseEnter(e, "#fd643b")}
            onMouseLeave={handleMouseLeave}
          >
            <DynamicIllustration type="tracking" color="#fd643b" height="300px" />
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Radar Precision</h3>
              <p style={{ color: "#64748b" }}>High-fidelity monitoring for every habit.</p>
            </div>
          </div>

          <div 
            className="f-card f-card-3"
            style={{ ...cardStyle, gridArea: "span 1 / span 1" }}
            onMouseEnter={(e) => handleMouseEnter(e, "#1b1cc2")}
            onMouseLeave={handleMouseLeave}
          >
            <DynamicIllustration type="analytics" color="#1b1cc2" height="160px" />
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Peak Analytics</h3>
              <p style={{ color: "#64748b" }}>Visualize patterns and optimize your path.</p>
            </div>
          </div>

          <div 
            className="f-card f-card-4"
            style={{ ...cardStyle, gridArea: "span 1 / span 2" }}
            onMouseEnter={(e) => handleMouseEnter(e, "#fd643b")}
            onMouseLeave={handleMouseLeave}
          >
            <DynamicIllustration type="objectives" color="#fd643b" height="160px" />
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Strategic Constellation</h3>
              <p style={{ color: "#64748b" }}>Align every action with your vision.</p>
            </div>
          </div>

          <div 
            className="f-card f-card-5"
            style={{ ...cardStyle, gridArea: "span 1 / span 2" }}
            onMouseEnter={(e) => handleMouseEnter(e, "#1b1cc2")}
            onMouseLeave={handleMouseLeave}
          >
            <DynamicIllustration type="alerts" color="#1b1cc2" height="160px" />
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Smart Pulse</h3>
              <p style={{ color: "#64748b" }}>Intelligent adaptive notifications.</p>
            </div>
          </div>

          <div 
            className="f-card f-card-6"
            style={{ ...cardStyle, gridArea: "span 1 / span 1" }}
            onMouseEnter={(e) => handleMouseEnter(e, "#fd643b")}
            onMouseLeave={handleMouseLeave}
          >
            <DynamicIllustration type="global" color="#fd643b" height="160px" />
            <div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Global Network</h3>
              <p style={{ color: "#64748b" }}>Join an elite community worldwide.</p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: minmax(300px, auto);
          gap: 24px;
        }

        /* MEDIA QUERY HANYA UNTUK MOBILE/TABLET */
        @media (max-width: 992px) {
          .features-grid { 
            grid-template-columns: repeat(2, 1fr); 
          }
          .f-card { 
            grid-area: auto !important; 
            padding: 30px !important;
          }
          .f-card-1 { grid-column: span 2; }
          .f-card-5 { grid-column: span 2; }
        }

        @media (max-width: 640px) {
          .features-grid { 
            grid-template-columns: 1fr; 
          }
          .f-card-1, .f-card-5 { grid-column: span 1; }
        }
      `}</style>
    </section>
  );
}
