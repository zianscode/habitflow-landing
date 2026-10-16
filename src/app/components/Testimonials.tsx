"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const testimonials = [
  {
    quote: "HabitFlow completely transformed my morning architecture. The precision of the analytics is unmatched.",
    author: "Sarah Chen",
    role: "Designer @ Figma",
    image: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    quote: "Finally, a habit tracker that respects professional aesthetics. The interface is as smooth as the logic.",
    author: "Marcus Johnson",
    role: "Engineer @ Stripe",
    image: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    quote: "Strategic goal setting has never felt this intuitive. It's the essential tool for any serious entrepreneur.",
    author: "Priya Sharma",
    role: "Founder @ TechStart",
    image: "https://i.pravatar.cc/150?u=priya"
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".testimonial-card", {
        y: (i) => 100 + i * 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".testimonial-grid",
          start: "top 85%",
        }
      });

      gsap.to(".testimonial-bg-shape", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <section 
      ref={sectionRef}
      id="testimonials"
      style={{ 
        padding: "160px 24px", 
        background: "#fcfcfd", 
        overflow: "hidden",
        position: "relative" 
      }}
    >
      <div className="testimonial-bg-shape" style={{ 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)", 
        width: "800px", 
        height: "800px", 
        background: "radial-gradient(circle, rgba(27, 28, 194,0.02) 0%, transparent 70%)", 
        zIndex: 0 
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 100 }}>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.2rem)", fontWeight: 600, color: "#0f172a", marginBottom: 24, letterSpacing: "-0.04em" }}>
            The Global Standard for <span style={{ color: "#1b1cc2" }}>Achievers.</span>
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#64748b" }}>Discover how professionals are architecting their success.</p>
        </div>

        <div className="testimonial-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", 
          gap: "40px",
          perspective: "1000px" 
        }}>
          {testimonials.map((t, i) => (
            <div 
              key={i}
              className="testimonial-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ 
                background: "white", 
                padding: "50px", 
                borderRadius: "40px", 
                boxShadow: "0 20px 60px rgba(0,0,0,0.03)", 
                border: "1px solid #f1f5f9",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transformStyle: "preserve-3d",
                marginTop: i % 2 === 0 ? "0" : "60px" 
              }}
            >
              <div style={{ marginBottom: "40px" }}>
                <div style={{ color: "#0f172a", fontSize: "3rem", lineHeight: 1, marginBottom: 20, opacity: 0.2 }}>“</div>
                <p style={{ fontSize: "1.25rem", color: "#0f172a", fontWeight: 500, lineHeight: 1.6, fontStyle: "italic" }}>
                  {t.quote}
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ position: "relative", width: 48, height: 48, borderRadius: "50%", overflow: "hidden" }}>
                  <Image src={t.image} alt={t.author} fill style={{ objectFit: "cover" }} unoptimized />
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "1rem" }}>{t.author}</div>
                  <div style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 600 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .testimonial-card { margin-top: 0 !important; padding: 40px !important; }
        }
      `}</style>
    </section>
  );
}
