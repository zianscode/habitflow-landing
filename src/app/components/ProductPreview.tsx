"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading";

export default function ProductPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".pp-fade",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          }
        }
      );

      gsap.fromTo(mockupRef.current, { y: 60, scale: 0.9, rotation: 2 }, {
        y: -60,
        scale: 1,
        rotation: -2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
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
          <SplitHeading>
            Your week, <br /><span className="muted">at a glance.</span>
          </SplitHeading>
          <p className="pp-fade section-lead" style={{ marginBottom: 40 }}>
            One screen shows today&apos;s list, your current streaks, and the last twelve weeks of check-ins.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              { title: "Heatmap", desc: "Spot the days you usually skip, so you can plan around them." },
              { title: "Trends", desc: "See whether a habit is getting easier or slowly slipping." },
            ].map(item => (
              <div key={item.title} className="pp-fade">
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
