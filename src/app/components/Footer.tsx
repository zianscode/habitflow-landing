"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logoIcon from "../../../public/images/icon.png";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#howitworks" },
      { label: "Pricing", href: "#pricing" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Cookies", href: "#" },
    ],
  },
];

const socials = [
  { name: "X", href: "#" },
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ft-fade", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer ref={footerRef} className="ft">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-fade ft-about">
            <a href="#home" className="ft-brand" aria-label="HabitFlow home">
              <Image src={logoIcon} alt="" width={28} height={28} style={{ objectFit: "contain" }} />
              <span>HabitFlow</span>
            </a>
            <p className="ft-tagline">A habit tracker that stays out of your way.</p>

            {subscribed ? (
              <p className="ft-thanks" role="status">You&apos;re on the list. One email a month, no more.</p>
            ) : (
              <form className="ft-form" onSubmit={onSubmit}>
                <label htmlFor="ft-email" className="ft-form-label">Product updates, once a month</label>
                <div className="ft-form-row">
                  <input id="ft-email" type="email" placeholder="you@example.com" className="ft-input" autoComplete="email" required />
                  <button type="submit" className="btn btn-light btn-sm">Subscribe</button>
                </div>
              </form>
            )}
          </div>

          <nav className="ft-cols" aria-label="Footer">
            {footerLinks.map((col) => (
              <div key={col.title} className="ft-fade ft-col">
                <h4 className="ft-col-title">{col.title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="ft-link">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="ft-bottom">
          <p className="ft-legal">© {new Date().getFullYear()} HabitFlow</p>
          <div className="ft-socials">
            {socials.map((s) => (
              <a key={s.name} href={s.href} className="ft-link">{s.name}</a>
            ))}
          </div>
          <a href="#home" className="ft-link ft-top-link">
            Back to top
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        .ft {
          margin: 0 16px 16px;
          padding: 0 24px;
          border-radius: 0 0 32px 32px;
          background: var(--night);
          color: #ffffff;
        }
        .ft-inner {
          max-width: 1200px;
          margin: 0 auto;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .ft-top {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
          gap: 64px;
          padding: 64px 0 56px;
        }
        .ft-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-brand);
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: #ffffff;
        }
        .ft-tagline {
          margin: 12px 0 32px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.55);
        }
        .ft-form-label {
          display: block;
          margin-bottom: 10px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.55);
        }
        .ft-form-row {
          display: flex;
          gap: 6px;
          max-width: 380px;
          padding: 4px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          transition: border-color 0.2s ease;
        }
        .ft-form-row:focus-within {
          border-color: rgba(255, 255, 255, 0.4);
        }
        .ft-input {
          flex: 1;
          min-width: 0;
          padding: 0 14px;
          border: none;
          background: transparent;
          color: #ffffff;
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
        }
        .ft-input::placeholder {
          color: rgba(255, 255, 255, 0.35);
        }
        .ft-thanks {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }
        .ft-cols {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 32px;
        }
        .ft-col-title {
          margin: 0 0 16px;
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.45);
        }
        .ft-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ft-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.78);
          transition: color 0.2s ease;
        }
        .ft-link:hover {
          color: #ffffff;
        }
        .ft-link:focus-visible,
        .ft-brand:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 3px;
          border-radius: 4px;
        }
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          padding: 24px 0 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .ft-legal {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.45);
        }
        .ft-socials {
          display: flex;
          gap: 24px;
        }
        .ft-socials .ft-link,
        .ft-top-link {
          font-size: 0.85rem;
        }

        @media (max-width: 900px) {
          .ft-top {
            grid-template-columns: minmax(0, 1fr);
            gap: 48px;
          }
        }
        @media (max-width: 640px) {
          .ft {
            margin: 0 8px 8px;
            padding: 0 16px;
            border-radius: 0 0 24px 24px;
          }
          .ft-cols {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .ft-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
