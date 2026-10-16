"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading";

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

const features = [
  { type: "momentum", color: "#1b1cc2", title: "Streaks", desc: "See how many days in a row you've kept a habit. Miss one and you'll know right away." },
  { type: "tracking", color: "#fd643b", title: "Daily check-in", desc: "Tick off today's habits in a few seconds. One tap per habit, then get on with your day." },
  { type: "analytics", color: "#1b1cc2", title: "Progress charts", desc: "Weekly and monthly views that show which habits hold up and which ones fade." },
  { type: "objectives", color: "#fd643b", title: "Goals", desc: "Group habits under something bigger, like running a 10K or reading 20 books this year." },
  { type: "alerts", color: "#1b1cc2", title: "Reminders", desc: "A nudge at the time you pick. Snooze it, or turn it off when you no longer need it." },
  { type: "global", color: "#fd643b", title: "Shared challenges", desc: "Invite a friend to the same habit and keep each other honest." },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      Array.from(track.children).forEach((card) => {
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
      });
    }, section);

    const mm = gsap.matchMedia();

    // Desktop: pin the section and move the cards sideways while scrolling down.
    mm.add("(min-width: 993px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.offsetLeft + track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => "+=" + distance(),
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(track, { x: () => -distance(), ease: "none" }, 0)
        .fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
    });

    // Mobile / reduced motion: plain fade-up per card.
    mm.add("(max-width: 992px), (prefers-reduced-motion: reduce)", () => {
      gsap.utils.toArray<HTMLElement>(".f-card", section).forEach((card) => {
        gsap.fromTo(card, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 90%" } });
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
    if (window.innerWidth > 992) {
      gsap.to(e.currentTarget, { y: -10, borderColor: color, boxShadow: `0 30px 60px ${color}20`, duration: 0.4 });
    }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, borderColor: "#f1f5f9", boxShadow: "0 10px 30px rgba(0,0,0,0.02)", duration: 0.4 });
  };

  return (
    <section id="features" ref={sectionRef} className="features-section">
      <div className="features-head">
        <div>
          <SplitHeading style={{ marginBottom: 0 }}>
            The basics, <span className="muted">done well.</span>
          </SplitHeading>
        </div>
        <p className="features-intro section-lead">
          Six tools that cover how most people actually build a habit. Keep scrolling to see each one.
        </p>
      </div>

      <div className="features-viewport">
        <div ref={trackRef} className="features-track">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="f-card"
              onMouseEnter={(e) => handleMouseEnter(e, f.color)}
              onMouseLeave={handleMouseLeave}
            >
              <DynamicIllustration type={f.type} color={f.color} height="clamp(160px, 30vh, 300px)" />
              <div>
                <span style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#94a3b8", marginBottom: 12 }}>
                  {String(i + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                </span>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 600, color: "#0f172a", marginBottom: 12, letterSpacing: "-0.02em" }}>{f.title}</h3>
                <p style={{ fontSize: "1rem", color: "#64748b", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="features-progress">
        <div ref={progressRef} className="features-progress-bar" />
      </div>

      <style>{`
        .features-section {
          position: relative;
          padding: 120px 24px;
          overflow: hidden;
        }
        .features-head {
          max-width: 1200px;
          margin: 0 auto 56px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
          flex-wrap: wrap;
        }
        .features-intro {
          max-width: 340px;
        }
        .features-viewport {
          max-width: 1200px;
          margin: 0 auto;
        }
        .features-track {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .f-card {
          background: #ffffff;
          padding: 32px;
          border-radius: 32px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }
        .features-progress { display: none; }

        @media (min-width: 993px) {
          .features-section {
            height: 100vh;
            padding: clamp(96px, 14vh, 140px) 0 48px;
            display: flex;
            flex-direction: column;
          }
          .features-head {
            width: 100%;
            padding: 0 24px;
            margin-bottom: clamp(24px, 4vh, 48px);
          }
          .features-viewport {
            max-width: none;
            margin: 0;
            width: 100%;
            flex: 1;
            min-height: 0;
            padding-left: max(24px, calc((100vw - 1200px) / 2 + 24px));
          }
          .features-track {
            display: flex;
            gap: 24px;
            height: 100%;
            width: max-content;
            padding-right: max(24px, calc((100vw - 1200px) / 2 + 24px));
          }
          .f-card {
            width: clamp(340px, 30vw, 440px);
            height: 100%;
            padding: 36px;
          }
          .features-progress {
            display: block;
            max-width: 1152px;
            width: calc(100% - 48px);
            margin: 32px auto 0;
            height: 2px;
            background: #e2e8f0;
            border-radius: 2px;
            overflow: hidden;
          }
          .features-progress-bar {
            height: 100%;
            background: #1b1cc2;
            transform-origin: left;
            transform: scaleX(0);
          }
        }

        @media (max-width: 640px) {
          .features-section { padding: 80px 16px; }
          .features-track { grid-template-columns: 1fr; }
          .f-card { padding: 24px; }
        }
      `}</style>
    </section>
  );
}
