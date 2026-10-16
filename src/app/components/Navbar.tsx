"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Magnetic from "./Magnetic";
import logoIcon from "../../../public/images/icon.png";

const navLinks = ["Home", "Features", "Pricing", "Testimonials", "FAQ"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const handleMount = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(handleMount);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    if (id.toLowerCase() === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMenuOpen(false);
      return;
    }
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      const offset = scrolled ? 90 : 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMenuOpen(false);
    }
  };

  const isScrolled = isMounted ? scrolled : false;

  return (
    <div
      className="nav-wrapper"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        padding: isScrolled ? "20px" : "0px",
        transition: "padding 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        pointerEvents: "none",
      }}
    >
      <nav
        className="main-nav"
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: isScrolled ? "1000px" : "1400px",
          background:
            isScrolled || (isMounted && menuOpen)
              ? "rgba(255, 255, 255, 0.85)"
              : "rgba(255, 255, 255, 0)",
          backdropFilter:
            isScrolled || (isMounted && menuOpen) ? "blur(15px)" : "blur(0px)",
          borderRadius: isScrolled ? "100px" : "0px",
          border:
            isScrolled || (isMounted && menuOpen)
              ? "1px solid rgba(241, 245, 249, 0.8)"
              : "1px solid rgba(241, 245, 249, 0)",
          boxShadow: isScrolled ? "0 15px 35px rgba(0,0,0,0.05)" : "none",
          padding: isScrolled ? "8px 10px 8px 24px" : "24px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Link
          href="/"
          onClick={(e) => scrollToSection(e, "home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div style={{ position: "relative", width: 48, height: 48 }}>
            <Image
              src={logoIcon}
              alt="HabitFlow"
              fill
              sizes="48px"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-brand)",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "#1b1cc2",
              letterSpacing: "-0.03em",
            }}
          >
            HabitFlow
          </span>
        </Link>

        <div
          className="nav-desktop-links"
          style={{ display: "flex", gap: 4, alignItems: "center" }}
        >
          {navLinks.map((link) => (
            <Magnetic key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, link)}
                style={{
                  padding: "8px 16px",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "#475569",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                className="nav-link"
              >
                {link}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="nav-action" style={{ flexShrink: 0 }}>
          <Magnetic>
            <a
              href="#pricing"
              onClick={(e) => scrollToSection(e, "pricing")}
              style={{
                display: "inline-block",
                padding: isScrolled ? "12px 24px" : "14px 35px",
                background: "#1b1cc2",
                color: "white",
                borderRadius: "100px",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.4s ease",
              }}
            >
              Get Started
            </a>
          </Magnetic>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            zIndex: 1001,
          }}
          className="mobile-toggle"
        >
          <div
            style={{
              width: 24,
              height: 16,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                width: "24px",
                height: "2px",
                background: "#1b1cc2",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "rotate(45deg) translate(5px, 5px)"
                  : "none",
              }}
            />
            <span
              style={{
                width: "24px",
                height: "2px",
                background: "#1b1cc2",
                transition: "all 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: "24px",
                height: "2px",
                background: "#1b1cc2",
                transition: "all 0.3s ease",
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "none",
              }}
            />
          </div>
        </button>
      </nav>

      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "15px",
          right: "15px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          pointerEvents: isMounted && menuOpen ? "auto" : "none",
          opacity: isMounted && menuOpen ? 1 : 0,
          transform: isMounted && menuOpen ? "translateY(10px)" : "translateY(-20px)",
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          visibility: isMounted && menuOpen ? "visible" : "hidden",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={(e) => scrollToSection(e, link)}
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "#1b1cc2",
              textDecoration: "none",
            }}
          >
            {link}
          </a>
        ))}
        <a
          href="#pricing"
          onClick={(e) => scrollToSection(e, "pricing")}
          style={{
            marginTop: 10,
            padding: "14px 32px",
            background: "#1b1cc2",
            color: "white",
            borderRadius: "100px",
            fontSize: "1rem",
            fontWeight: 600,
            textDecoration: "none",
            width: "100%",
            textAlign: "center"
          }}
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
