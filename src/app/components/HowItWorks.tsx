"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading";

const steps = [
  {
    id: "01",
    title: "Pick your habits",
    desc: "Start with one or two. Set how often you want to do them: daily, a few times a week, whatever fits.",
    color: "#1b1cc2",
  },
  {
    id: "02",
    title: "Check in each day",
    desc: "Open the app and tap what you did. It takes less than a minute.",
    color: "#fd643b",
  },
  {
    id: "03",
    title: "Watch the pattern",
    desc: "After a few weeks you'll see what sticks, and the days you tend to drop off.",
    color: "#1b1cc2",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // Desktop: pin the section and light up one step at a time as you scroll.
    mm.add("(min-width: 993px) and (prefers-reduced-motion: no-preference)", () => {
      const stepEls = gsap.utils.toArray<HTMLElement>(".hiw-step");
      gsap.set(stepEls, { opacity: 0.2, y: 24 });
      gsap.set(lineRef.current, { scaleX: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=150%",
          scrub: 1,
        },
      });

      stepEls.forEach((step, i) => {
        tl.to(step, { opacity: 1, y: 0, duration: 1 }, i * 1.2);
        tl.fromTo(step.querySelector(".hiw-badge"), { scale: 0.6 }, { scale: 1, duration: 1, ease: "back.out(2)" }, i * 1.2);
      });
      tl.to(lineRef.current, { scaleX: 1, duration: (stepEls.length - 1) * 1.2 + 1, ease: "none" }, 0);
      tl.to({}, { duration: 0.6 });
    }, section);

    mm.add("(max-width: 992px), (prefers-reduced-motion: reduce)", () => {
      gsap.utils.toArray<HTMLElement>(".hiw-step").forEach((step) => {
        gsap.from(step, { y: 30, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: step, start: "top 88%" } });
      });
    }, section);

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} id="howitworks" className="hiw-section">
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: "clamp(56px, 10vh, 96px)" }}>
          <SplitHeading>
            Three steps. <span className="muted">That&apos;s it.</span>
          </SplitHeading>
        </div>

        <div style={{ position: "relative" }}>
          <div className="hiw-track" aria-hidden="true">
            <div ref={lineRef} className="hiw-line" />
          </div>

          <div className="hiw-grid">
            {steps.map((step) => (
              <div key={step.id} className="hiw-step">
                <div
                  className="hiw-badge"
                  style={{ background: step.color, boxShadow: `0 20px 40px ${step.color}30` }}
                >
                  {step.id}
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#0f172a", marginBottom: 12, letterSpacing: "-0.02em" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "1.05rem", color: "#64748b", lineHeight: 1.7, maxWidth: 320, margin: "0 auto" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hiw-section {
          position: relative;
          padding: 120px 24px;
          overflow: hidden;
        }
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          position: relative;
          z-index: 1;
        }
        .hiw-step { padding: 0 12px; }
        .hiw-badge {
          width: 56px;
          height: 56px;
          color: white;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 auto 32px;
        }
        .hiw-track {
          position: absolute;
          top: 27px;
          left: 16.66%;
          right: 16.66%;
          height: 2px;
          background: #e2e8f0;
          border-radius: 2px;
          z-index: 0;
        }
        .hiw-line {
          height: 100%;
          background: linear-gradient(90deg, #1b1cc2, #fd643b);
          transform-origin: left;
          border-radius: 2px;
        }

        @media (min-width: 993px) {
          .hiw-section {
            height: 100vh;
            display: flex;
            align-items: center;
          }
        }
        @media (max-width: 992px) {
          .hiw-grid { grid-template-columns: 1fr; gap: 56px; }
          .hiw-track { display: none; }
        }
      `}</style>
    </section>
  );
}
