"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoIcon from "../../../public/images/icon.png";
import { ArrowRight } from "./Icons";

const navLinks = [
  { label: "Features", id: "features" },
  { label: "How it works", id: "howitworks" },
  { label: "Pricing", id: "pricing" },
  { label: "Testimonials", id: "testimonials" },
  { label: "FAQ", id: "faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Highlight the link for whichever section sits in the middle of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    // Sections are loaded with next/dynamic, so look for them once the page settles.
    const timer = window.setTimeout(() => {
      document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    }, 300);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const raised = scrolled || menuOpen;

  return (
    <header className="nav-wrapper">
      <nav className={`nav ${raised ? "is-raised" : ""} ${scrolled ? "is-scrolled" : ""}`} aria-label="Main">
        <a href="#home" onClick={closeMenu} className="nav-brand" aria-label="HabitFlow home">
          <Image src={logoIcon} alt="" width={32} height={32} style={{ objectFit: "contain" }} />
          <span>HabitFlow</span>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={closeMenu}
                className={`nav-link ${active === link.id ? "is-active" : ""}`}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="#pricing" onClick={closeMenu} className="btn btn-primary btn-sm nav-cta">
            Get started
            <ArrowRight className="btn-arrow" />
          </a>

          <button
            type="button"
            className="nav-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={menuOpen ? "is-open" : ""} />
            <span className={menuOpen ? "is-open" : ""} />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`nav-mobile ${menuOpen ? "is-open" : ""}`}>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} onClick={closeMenu} className={active === link.id ? "is-active" : ""}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#pricing" onClick={closeMenu} className="btn btn-primary btn-lg btn-block">
          Get started
          <ArrowRight className="btn-arrow" />
        </a>
      </div>

      <style>{`
        .nav-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px;
          pointer-events: none;
        }
        .nav {
          pointer-events: auto;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 8px 8px 8px 16px;
          border: 1px solid transparent;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0);
          transition: max-width 0.6s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .nav.is-scrolled {
          max-width: 980px;
        }
        .nav.is-raised {
          background: rgba(255, 255, 255, 0.82);
          border-color: rgba(226, 232, 240, 0.9);
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -12px rgba(15, 23, 42, 0.12);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          font-family: var(--font-brand);
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          color: var(--ink);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .nav-link {
          display: block;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--muted);
          transition: color 0.2s ease, background-color 0.2s ease;
        }
        .nav-link:hover {
          color: var(--ink);
          background: rgba(15, 23, 42, 0.04);
        }
        .nav-link.is-active {
          color: var(--ink);
          background: rgba(15, 23, 42, 0.06);
        }
        .nav-link:focus-visible,
        .nav-brand:focus-visible,
        .nav-toggle:focus-visible {
          outline: 2px solid var(--brand);
          outline-offset: 2px;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-toggle {
          display: none;
          position: relative;
          width: 40px;
          height: 40px;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: #ffffff;
          cursor: pointer;
        }
        .nav-toggle span {
          position: absolute;
          left: 12px;
          width: 14px;
          height: 1.5px;
          background: var(--ink);
          border-radius: 2px;
          transition: transform 0.3s ease, top 0.3s ease;
        }
        .nav-toggle span:first-child { top: 16px; }
        .nav-toggle span:last-child { top: 22px; }
        .nav-toggle span.is-open:first-child { top: 19px; transform: rotate(45deg); }
        .nav-toggle span.is-open:last-child { top: 19px; transform: rotate(-45deg); }

        .nav-mobile {
          pointer-events: none;
          position: absolute;
          top: calc(100% - 4px);
          left: 16px;
          right: 16px;
          padding: 12px;
          border: 1px solid var(--line);
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 24px 48px -16px rgba(15, 23, 42, 0.18);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.25s;
        }
        .nav-mobile.is-open {
          pointer-events: auto;
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .nav-mobile ul {
          list-style: none;
          margin: 0 0 12px;
          padding: 0;
        }
        .nav-mobile li a {
          display: block;
          padding: 14px 12px;
          border-radius: 14px;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--ink-2);
        }
        .nav-mobile li a.is-active,
        .nav-mobile li a:hover {
          color: var(--ink);
          background: var(--surface-2);
        }

        @media (max-width: 992px) {
          .nav-links,
          .nav-cta {
            display: none;
          }
          .nav-toggle {
            display: block;
          }
          .nav.is-scrolled {
            max-width: 1200px;
          }
        }
        @media (min-width: 993px) {
          .nav-mobile {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
