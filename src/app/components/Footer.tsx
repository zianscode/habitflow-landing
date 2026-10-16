"use client";
import React from "react";
import Image from "next/image";
import logoIcon from "../../../public/images/icon.png";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Help Center", "Community", "API"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "#ffffff",
        padding: "120px 24px 64px",
        borderTop: "1px solid #f1f5f9",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "64px",
            marginBottom: "100px",
          }}
        >
          <div style={{ gridColumn: "span 1", minWidth: "260px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ position: "relative", width: 32, height: 32 }}>
                <Image
                  src={logoIcon}
                  alt="HabitFlow"
                  fill
                  sizes="32px"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span style={{ fontWeight: 600, fontSize: "1.2rem", color: "#0f172a", letterSpacing: "-0.02em" }}>HabitFlow</span>
            </div>
            <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: 1.8, maxWidth: "240px", fontWeight: 500 }}>
              Master your daily routines and architect your future with the world&apos;s most elegant productivity platform.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 style={{ fontWeight: 600, fontSize: "0.8rem", color: "#0f172a", marginBottom: 32, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {category}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 16 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        textDecoration: "none",
                        color: "#64748b",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#1b1cc2")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            paddingTop: "48px",
            borderTop: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div style={{ color: "#94a3b8", fontSize: "0.9rem", fontWeight: 600 }}>
            © 2026 HabitFlow Inc. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {["Twitter", "GitHub", "LinkedIn", "Instagram"].map((social) => (
              <a
                key={social}
                href="#"
                style={{
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#1b1cc2")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
