"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import Image from "next/image";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import dashboardPhoto from "../../../public/images/management_dashboard_photo.png";

const phrases = ["Morning Routine", "Deep Work", "Reading 30 mins", "Daily Gratitude"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const tiltWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [typedText, setTypedText] = useState("");
  
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const b1Ref = useRef<HTMLDivElement>(null);
  const b2Ref = useRef<HTMLDivElement>(null);
  const b3Ref = useRef<HTMLDivElement>(null);
  const b4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50;
      } else {
        setTypedText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 150;
      }

      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }
      setTimeout(type, typingSpeed);
    };
    const typeTimeout = setTimeout(type, 1000);

    if (titleRef.current) {
      const words = titleRef.current.innerText.split(" ");
      titleRef.current.innerHTML = words.map(word => `<span class="word-wrapper" style="display:inline-block; overflow:hidden; padding-bottom:0.1em; margin-bottom:-0.1em;"><span class="word" style="display:inline-block;">${word}&nbsp;</span></span>`).join("");
      
      gsap.from(".word", {
        y: 100, opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.2
      });
    }

    const tl = gsap.timeline();
      tl.from(".hero-description, .cta-group", {
        y: 30, opacity: 0, stagger: 0.2, duration: 1, ease: "power3.out", delay: 0.5
      }).from(scrollWrapperRef.current, {
        y: 60, opacity: 0, duration: 1.2, ease: "expo.out",
      }, "-=0.6");

    const floatingBadges = [b1Ref, b2Ref, b3Ref, b4Ref];
    floatingBadges.forEach((ref, i) => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: -15, duration: 2 + i * 0.5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.2
        });
      }
    });

    if (scrollWrapperRef.current && tiltWrapperRef.current) {
      gsap.to(scrollWrapperRef.current, {
        y: 0,
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "5% top", scrub: 1 }
      });

      const handleTilt = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const rotateX = (clientY - centerY) / 60;
        const rotateY = (centerX - clientX) / 60;

        gsap.to(tiltWrapperRef.current, {
          rotateX: rotateX, rotateY: rotateY, duration: 1.2, ease: "power2.out", force3D: true
        });
      };

      window.addEventListener("mousemove", handleTilt);
      return () => window.removeEventListener("mousemove", handleTilt);
    }

    const parallaxContainers = [p1Ref, p2Ref, p3Ref, p4Ref];
    parallaxContainers.forEach((ref, i) => {
      if (ref.current) {
        gsap.to(ref.current, {
          y: -(140 + i * 70),
          scrollTrigger: { trigger: heroRef.current, start: "top top", scrub: 1.5 + i * 0.2 }
        });
      }
    });

    return () => clearTimeout(typeTimeout);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      style={{
        paddingTop: "clamp(130px, 16vh, 180px)",
        paddingBottom: 24,
        background: "transparent",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }} className="hero-content">
        <h1 
          ref={titleRef}
          style={{ fontSize: "clamp(2.25rem, 6.5vw, 5rem)", fontWeight: 600, color: "#0f172a", lineHeight: 1.16, letterSpacing: "-0.02em", marginBottom: 24 }}
        >
          Take Control of Your Future. Architect Your Habits.
        </h1>

        <p className="hero-description" style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "#64748b", maxWidth: 650, margin: "0 auto 40px", fontWeight: 500, lineHeight: 1.6 }}>
          The world&apos;s most advanced habit tracking system designed for high performers who demand precision and growth.
        </p>

        <div className="cta-group" style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 36, flexWrap: "wrap" }}>
          <Magnetic>
            <a href="#pricing" style={{ display: "inline-block", padding: "18px 40px", background: "#1b1cc2", color: "white", borderRadius: "100px", fontWeight: 600, textDecoration: "none", fontSize: "1.05rem" }}>Get Started Free</a>
          </Magnetic>
          <Magnetic>
            <a href="#howitworks" style={{ display: "inline-block", padding: "18px 40px", background: "white", color: "#1b1cc2", border: "1px solid #e2e8f0", borderRadius: "100px", fontWeight: 600, textDecoration: "none", fontSize: "1.05rem" }}>Watch Demo</a>
          </Magnetic>
        </div>
      </div>

      <div className="hero-peek" style={{ position: "relative", maxWidth: "1100px", margin: "0 auto", padding: "0 24px", transform: "translateY(-12px)" }}>
          <div ref={scrollWrapperRef} style={{ willChange: "transform", transformStyle: "preserve-3d" }}>
            <div ref={tiltWrapperRef} style={{ background: "#ffffff", borderRadius: "32px", boxShadow: "none", border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden", transformStyle: "preserve-3d", willChange: "transform" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "40px", background: "#f8fafc", display: "flex", alignItems: "center", padding: "0 20px", gap: 20, zIndex: 3, borderBottom: "1px solid #f1f5f9" }}>
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f56" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#27c93f" }} />
                </div>
                <div style={{ flex: 1, height: "24px", background: "#ffffff", borderRadius: "6px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 10px", gap: 8, maxWidth: "400px", margin: "0 auto" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <div style={{ fontSize: "0.75rem", color: "#475569", fontWeight: 500, textAlign: "left", flex: 1, position: "relative" }}>
                    {typedText}
                    <span className="cursor" style={{ borderLeft: "2px solid #1b1cc2", marginLeft: "2px", animation: "blink 1s infinite" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "4px", background: "#e2e8f0" }} />
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#e2e8f0" }} />
                </div>
              </div>
              <div style={{ borderRadius: "0 0 32px 32px", overflow: "hidden", marginTop: "40px" }}>
                <Suspense fallback={<div style={{ width: "100%", height: "500px", background: "#f1f5f9" }} />}>
                  <Image src={dashboardPhoto} alt="HabitFlow" style={{ width: "100%", height: "auto", display: "block" }} sizes="(max-width: 1200px) 100vw, 1200px" loading="lazy" />
                </Suspense>
              </div>
            </div>
          </div>

          <div ref={p1Ref} className="hero-badge-container badge-1" style={{ position: "absolute", top: "14%", left: "-10%", zIndex: 10 }}>
            <div ref={b1Ref} style={{ background: "white", padding: "16px 24px", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fd643b20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fd643b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#0f172a" }}>Habit Streak</div>
                <div style={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 500 }}>45 Days Active</div>
              </div>
            </div>
          </div>

          <div ref={p2Ref} className="hero-badge-container badge-2" style={{ position: "absolute", top: "50%", right: "-10%", zIndex: 10 }}>
            <div ref={b2Ref} style={{ background: "white", padding: "16px 24px", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1b1cc220", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1cc2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#0f172a" }}>Growth Score</div>
                <div style={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 500 }}>+24% Weekly</div>
              </div>
            </div>
          </div>

          <div ref={p3Ref} className="hero-badge-container badge-3" style={{ position: "absolute", top: "50%", left: "-10%", zIndex: 10 }}>
            <div ref={b3Ref} style={{ background: "white", padding: "16px 24px", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fd643b20", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fd643b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#0f172a" }}>Focus Level</div>
                <div style={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 500 }}>98% Monthly</div>
              </div>
            </div>
          </div>

          <div ref={p4Ref} className="hero-badge-container badge-4" style={{ position: "absolute", top: "14%", right: "-10%", zIndex: 10 }}>
            <div ref={b4Ref} style={{ background: "white", padding: "16px 24px", borderRadius: "24px", boxShadow: "0 20px 40px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#1b1cc220", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1b1cc2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem", color: "#0f172a" }}>Milestones</div>
                <div style={{ color: "#64748b", fontSize: "0.8rem", fontWeight: 500 }}>12 Won</div>
              </div>
            </div>
          </div>
        </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 992px) {
          .hero-badge-container { scale: 0.8; }
          .badge-1 { left: -8% !important; top: 12% !important; }
          .badge-4 { right: -8% !important; top: 12% !important; }
          .badge-3 { left: -8% !important; top: 50% !important; display: flex !important; }
          .badge-2 { right: -8% !important; top: 50% !important; }
        }
        @media (max-width: 640px) {
          .hero-badge-container { scale: 0.55; }
          .badge-1 { left: -3% !important; top: 12% !important; }
          .badge-4 { right: -3% !important; top: 12% !important; }
          .badge-3 { left: -3% !important; top: 46% !important; display: flex !important; }
          .badge-2 { right: -3% !important; top: 46% !important; }
        }
      `}</style>
    </section>
  );
}
