"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" },
  { name: "Figma", logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
  { name: "Notion", logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" },
];

export default function TrustBar() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      if (marquee) {
        const singleSetWidth = marquee.scrollWidth / 4; 
      
        const loop = gsap.to(marquee, {
          x: -singleSetWidth,
          duration: 25, 
          ease: "none",
          repeat: -1,
        });

        // Speed the marquee up while the page is being scrolled, then ease back.
        ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = Math.min(Math.abs(self.getVelocity()) / 300, 5);
            gsap.to(loop, { timeScale: 1 + boost, duration: 0.2, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1, delay: 0.2, ease: "power2.out" });
          },
        });
      }
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        padding: "clamp(40px, 8vw, 80px) 0",
        background: "#ffffff",
        borderTop: "1px solid #f1f5f9",
        borderBottom: "1px solid #f1f5f9",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", textAlign: "center", marginBottom: "clamp(20px, 4vw, 40px)" }}>
        <span style={{ fontSize: "clamp(0.7rem, 2vw, 0.8rem)", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.15em" }}>
          Used by people at
        </span>
      </div>

      <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
        <div
          ref={marqueeRef}
          style={{
            display: "flex",
            gap: "clamp(40px, 8vw, 100px)", 
            width: "fit-content",
            alignItems: "center",
          }}
        >
          {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
                opacity: 0.4,
                filter: "grayscale(100%)",
                transition: "all 0.5s ease",
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.filter = "grayscale(0%)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.4";
                e.currentTarget.style.filter = "grayscale(100%)";
              }}
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={28}
                style={{
                  height: "clamp(20px, 4vw, 36px)", 
                  width: "auto",
                  objectFit: "contain",
                }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
