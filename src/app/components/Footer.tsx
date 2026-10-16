"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoIcon from "../../../public/images/icon.png";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Documentation", "Help Center", "Community", "API"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

const socials = [
  { name: "Twitter", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        brandRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
          },
        },
      );

      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 90%",
            },
          },
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="ft-root">
      {/* ── Dark brand section ── */}
      <div className="ft-hero">
        <div className="ft-hero-inner">
          <div ref={brandRef} className="ft-brand">
            <div className="ft-brand-row">
              <div className="ft-brand-logo">
                <Image
                  src={logoIcon}
                  alt="HabitFlow"
                  width={44}
                  height={44}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <span className="ft-brand-name">HabitFlow</span>
            </div>
            <p className="ft-tagline">
              Build better habits, one day at a time.
            </p>
          </div>

          <div className="ft-newsletter">
            <span className="ft-newsletter-label">Stay in the loop</span>
            <form className="ft-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="ft-input"
                required
              />
              <button type="submit" className="ft-btn" aria-label="Subscribe">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
            <div className="ft-status">
              <span className="ft-dot" />
              All systems operational
            </div>
          </div>
        </div>
      </div>

      {/* ── Light navigation section ── */}
      <div className="ft-nav-section">
        <div className="ft-links" ref={linksRef}>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="ft-col">
              <h4 className="ft-col-title">{category}</h4>
              <ul className="ft-col-list">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="ft-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ft-bottom">
          <div className="ft-socials">
            {socials.map((s) => (
              <a key={s.name} href={s.href} className="ft-social">
                {s.name}
              </a>
            ))}
          </div>
          <p className="ft-legal">
            © {new Date().getFullYear()} HabitFlow Inc. All rights reserved.
          </p>
        </div>
      </div>

      <style>{`
        .ft-root {
          background: #ffffff;
        }

        /* ═══ Hero / Brand section ═══ */
        .ft-hero {
          background: #f8fafc;
          padding: 80px 24px 72px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid #e2e8f0;
        }
        .ft-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 50%, rgba(27,28,194,0.06) 0%, transparent 100%),
            radial-gradient(ellipse 50% 40% at 80% 30%, rgba(253,100,59,0.04) 0%, transparent 100%);
          pointer-events: none;
        }
        .ft-hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 64px;
          flex-wrap: wrap;
        }

        .ft-brand-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }
        .ft-brand-logo {
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }
        .ft-brand-name {
          font-family: var(--font-brand);
          font-weight: 600;
          font-size: clamp(2rem, 4vw, 3rem);
          color: #0f172a;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .ft-tagline {
          color: #64748b;
          font-size: 1.05rem;
          font-weight: 500;
          line-height: 1.6;
          max-width: 360px;
          margin: 0;
        }

        .ft-newsletter {
          flex-shrink: 0;
        }
        .ft-newsletter-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #475569;
          margin-bottom: 12px;
        }
        .ft-form {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
        }
        .ft-input {
          width: 260px;
          padding: 13px 20px;
          border: 1px solid #e2e8f0;
          border-radius: 100px;
          background: #ffffff;
          color: #0f172a;
          font-size: 0.875rem;
          font-family: var(--font-poppins);
          font-weight: 500;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .ft-input::placeholder {
          color: #94a3b8;
        }
        .ft-input:focus {
          border-color: #1b1cc2;
        }
        .ft-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          border: none;
          background: #fd643b;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }
        .ft-btn:hover {
          background: #e55a32;
          transform: scale(1.05);
        }
        .ft-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
        }
        .ft-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34,197,94,0.5);
          animation: ft-pulse 2s ease-in-out infinite;
        }
        @keyframes ft-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* ═══ Light navigation section ═══ */
        .ft-nav-section {
          background: #ffffff;
          padding: 56px 24px 36px;
        }
        .ft-links {
          max-width: 1200px;
          margin: 0 auto 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .ft-col-title {
          font-weight: 600;
          font-size: 0.75rem;
          color: #0f172a;
          margin: 0 0 18px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .ft-col-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .ft-link {
          text-decoration: none;
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .ft-link:hover {
          color: #1b1cc2;
        }

        /* ═══ Bottom bar ═══ */
        .ft-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding-top: 28px;
          border-top: 1px solid #f1f5f9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }
        .ft-socials {
          display: flex;
          gap: 24px;
        }
        .ft-social {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .ft-social:hover {
          color: #1b1cc2;
        }
        .ft-legal {
          color: #94a3b8;
          font-size: 0.85rem;
          font-weight: 500;
          margin: 0;
        }

        /* ═══ Responsive ═══ */
        @media (max-width: 768px) {
          .ft-hero {
            padding: 56px 20px 48px;
          }
          .ft-hero-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 40px;
          }
          .ft-input {
            width: 200px;
          }
          .ft-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px 24px;
            margin-bottom: 36px;
          }
          .ft-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (max-width: 480px) {
          .ft-input {
            width: 100%;
            min-width: 0;
          }
          .ft-form {
            width: 100%;
          }
          .ft-newsletter {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
}
