"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const initialIntegrations = [
  { name: "Google Calendar", logo: "https://cdn.worldvectorlogo.com/logos/google-calendar-6.svg" },
  { name: "Notion", logo: "https://cdn.worldvectorlogo.com/logos/notion-2.svg" },
  { name: "Slack", logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" },
  { name: "Apple Health", logo: "https://v1.indie-inventory.com/icons/apple-health.svg" },
  { name: "Zapier", logo: "https://cdn.worldvectorlogo.com/logos/zapier.svg" },
  { name: "Spotify", logo: "https://cdn.worldvectorlogo.com/logos/spotify-1.svg" },
  { name: "GitHub", logo: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg" },
  { name: "Figma", logo: "https://cdn.worldvectorlogo.com/logos/figma-1.svg" },
];

export default function Integrations() {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const handleImageError = (name: string) => {
    setIntegrations(prev => prev.filter(item => item.name !== name));
  };

  useEffect(() => {
    const items = itemsRef.current?.children;
    if (items) {
      gsap.fromTo(items, 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          }
        }
      );
    }
  }, [integrations]);

  return (
    <section
      id="integrations"
      ref={containerRef}
      style={{
        padding: "100px 24px",
        background: "#ffffff",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 600, color: "#0f172a", marginBottom: 24, letterSpacing: "-0.02em" }}>
          Connected to Your Ecosystem
        </h2>
        <p style={{ fontSize: "1.05rem", color: "#64748b", maxWidth: 600, margin: "0 auto 80px", fontWeight: 500 }}>
          Seamlessly synchronize your habit data with the applications you already rely on.
        </p>

        <div
          ref={itemsRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {integrations.map((app) => (
            <div
              key={app.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                transition: "transform 0.4s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1) translateY(-5px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1) translateY(0)")}
            >
              <div style={{ position: "relative", width: "56px", height: "56px" }}>
                <Image 
                  src={app.logo} 
                  alt={app.name} 
                  fill
                  style={{ 
                    objectFit: "contain",
                    filter: "grayscale(100%) opacity(0.4)",
                    transition: "all 0.4s ease"
                  }} 
                  onError={() => handleImageError(app.name)} 
                  unoptimized
                  onMouseEnter={(e) => (e.currentTarget.style.filter = "grayscale(0%) opacity(1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = "grayscale(100%) opacity(0.4)")}
                />
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{app.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
