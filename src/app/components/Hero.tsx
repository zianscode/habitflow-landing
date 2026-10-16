"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Magnetic from "./Magnetic";
import { ArrowRight, Check } from "./Icons";
import dashboardPhoto from "../../../public/images/management_dashboard_photo.png";

const titleWords = "Build habits that actually stick.".split(" ");

const week = ["M", "T", "W", "T", "F", "S", "S"];
const weekBars = [42, 58, 50, 66, 61, 74, 88];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const tiltWrapperRef = useRef<HTMLDivElement>(null);
  const [stretchDone, setStretchDone] = useState(false);

  useEffect(() => {
    // The last habit in the "Today" card gets ticked off shortly after load.
    const checkTimer = window.setTimeout(() => setStretchDone(true), 2600);

    const ctx = gsap.context(() => {
      gsap.from(".word", {
        y: 100, opacity: 0, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.2
      });

      const tl = gsap.timeline();
      tl.from(".hero-description, .cta-group", {
        y: 30, opacity: 0, stagger: 0.2, duration: 1, ease: "power3.out", delay: 0.5
      })
        .from(peekRef.current, { y: 60, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=0.6")
        .from(".hb", { y: 24, opacity: 0, duration: 0.9, stagger: 0.12, ease: "expo.out" }, "-=0.8");

      gsap.utils.toArray<HTMLElement>(".hb").forEach((card, i) => {
        gsap.to(card, { y: -8, duration: 2.4 + i * 0.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.6 + i * 0.2 });
      });

      gsap.utils.toArray<HTMLElement>(".hb-slot").forEach((slot, i) => {
        gsap.to(slot, {
          y: -(80 + i * 30),
          ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 + i * 0.2 }
        });
      });
    }, heroRef);

    const tiltWrapper = tiltWrapperRef.current;
    const handleTilt = (e: MouseEvent) => {
      if (!tiltWrapper) return;
      const rotateX = (e.clientY - window.innerHeight / 2) / 90;
      const rotateY = (window.innerWidth / 2 - e.clientX) / 90;
      gsap.to(tiltWrapper, { rotateX, rotateY, duration: 1.2, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleTilt);

    return () => {
      window.clearTimeout(checkTimer);
      window.removeEventListener("mousemove", handleTilt);
      if (tiltWrapper) gsap.killTweensOf(tiltWrapper);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          {titleWords.map((word, i) => (
            <span key={i} className="word-wrapper" style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
              <span className="word" style={{ display: "inline-block" }}>{word}&nbsp;</span>
            </span>
          ))}
        </h1>

        <p className="hero-description section-lead" style={{ fontSize: "clamp(1.05rem, 2.2vw, 1.2rem)", maxWidth: 560, margin: "0 auto 36px" }}>
          HabitFlow keeps your daily routines in one place, shows you what&apos;s working, and nudges you when you slip. Nothing more.
        </p>

        <div className="cta-group" style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 56, flexWrap: "wrap" }}>
          <Magnetic>
            <a href="#pricing" className="btn btn-primary btn-lg">
              Start for free
              <ArrowRight className="btn-arrow" />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#howitworks" className="btn btn-secondary btn-lg">See how it works</a>
          </Magnetic>
        </div>
      </div>

      <div className="hero-peek">
        <div ref={peekRef} className="hero-stage">
          <div ref={tiltWrapperRef} className="hero-bezel">
            <div className="hero-screen">
              <Image
                src={dashboardPhoto}
                alt="The HabitFlow dashboard showing active habits, reminders and weekly progress"
                style={{ width: "100%", height: "auto", display: "block" }}
                sizes="(max-width: 1200px) 100vw, 1100px"
                placeholder="blur"
                preload
              />
            </div>
          </div>
        </div>

        {/* Streak: last seven days */}
        <div className="hb-slot hb-slot--tl">
          <div className="hb" style={{ width: 216 }}>
            <div className="hb-label">Morning run</div>
            <div className="hb-value">45 <span>days in a row</span></div>
            <div className="hb-week">
              {week.map((d, i) => (
                <div key={i} className="hb-day">
                  <span className={i === 6 ? "is-today" : "is-done"} />
                  <small>{d}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Today's checklist */}
        <div className="hb-slot hb-slot--bl">
          <div className="hb" style={{ width: 228 }}>
            <div className="hb-row">
              <div className="hb-label">Today</div>
              <div className="hb-count">{stretchDone ? 5 : 4}/5</div>
            </div>
            <ul className="hb-list">
              {[
                { name: "Read 20 pages", done: true },
                { name: "Drink 2L water", done: true },
                { name: "Stretch 10 min", done: stretchDone },
              ].map((h) => (
                <li key={h.name} className={h.done ? "is-done" : ""}>
                  <span className="hb-check">{h.done && <Check />}</span>
                  {h.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Goal progress */}
        <div className="hb-slot hb-slot--tr">
          <div className="hb" style={{ width: 208 }}>
            <div className="hb-row">
              <div className="hb-label">Read 20 books</div>
              <div className="hb-count">12/20</div>
            </div>
            <div className="hb-bar"><span style={{ width: "60%" }} /></div>
            <div className="hb-foot">On track for December</div>
          </div>
        </div>

        {/* Weekly check-ins */}
        <div className="hb-slot hb-slot--br">
          <div className="hb" style={{ width: 200 }}>
            <div className="hb-row">
              <div className="hb-label">Check-ins</div>
              <div className="hb-delta">+24%</div>
            </div>
            <div className="hb-chart">
              {weekBars.map((h, i) => (
                <span key={i} style={{ height: `${h}%` }} className={i === weekBars.length - 1 ? "is-now" : ""} />
              ))}
            </div>
            <div className="hb-foot">vs. last week</div>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          overflow: hidden;
          padding: clamp(130px, 16vh, 180px) 0 24px;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          text-align: center;
        }
        .hero-title {
          font-family: var(--font-brand);
          font-size: clamp(2.75rem, 7vw, 5.5rem);
          font-weight: 600;
          line-height: 1.02;
          letter-spacing: -0.045em;
          color: var(--ink);
          margin-bottom: 24px;
          text-wrap: balance;
        }

        /* Dashboard preview */
        .hero-peek {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .hero-stage {
          perspective: 1800px;
        }
        .hero-bezel {
          padding: 8px;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 48px 96px -40px rgba(15, 23, 42, 0.28);
          transform-style: preserve-3d;
          will-change: transform;
          -webkit-mask-image: linear-gradient(to bottom, #000 62%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 62%, transparent 100%);
        }
        .hero-screen {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(15, 23, 42, 0.06);
          background: #ffffff;
        }

        /* Floating product cards */
        .hb-slot {
          position: absolute;
          z-index: 10;
        }
        .hb-slot--tl { top: 10%; left: -4%; }
        .hb-slot--bl { top: 46%; left: -6%; }
        .hb-slot--tr { top: 8%; right: -5%; }
        .hb-slot--br { top: 44%; right: -4%; }

        .hb {
          padding: 14px 16px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid rgba(15, 23, 42, 0.07);
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 18px 36px -14px rgba(15, 23, 42, 0.2);
          text-align: left;
          font-size: 0.8rem;
          color: var(--ink);
          font-variant-numeric: tabular-nums;
        }
        .hb-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .hb-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--muted);
        }
        .hb-count {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--ink);
        }
        .hb-delta {
          font-size: 0.75rem;
          font-weight: 600;
          color: #16a34a;
        }
        .hb-value {
          margin: 4px 0 12px;
          font-family: var(--font-brand);
          font-size: 1.6rem;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .hb-value span {
          font-family: var(--font-poppins);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0;
          color: var(--muted);
        }
        .hb-week {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }
        .hb-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .hb-day span {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 6px;
        }
        .hb-day span.is-done { background: var(--brand); }
        .hb-day span.is-today {
          background: transparent;
          border: 1.5px dashed rgba(27, 28, 194, 0.45);
        }
        .hb-day small {
          font-size: 0.65rem;
          color: var(--subtle);
        }
        .hb-list {
          list-style: none;
          margin: 10px 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .hb-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--ink);
          transition: color 0.3s ease;
        }
        .hb-list li.is-done { color: var(--muted); }
        .hb-check {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          border: 1.5px solid var(--line);
          color: #ffffff;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .hb-list li.is-done .hb-check {
          background: var(--brand);
          border-color: var(--brand);
        }
        .hb-bar {
          height: 6px;
          margin: 10px 0 8px;
          border-radius: 999px;
          background: var(--surface-2);
          overflow: hidden;
        }
        .hb-bar span {
          display: block;
          height: 100%;
          border-radius: 999px;
          background: var(--accent);
        }
        .hb-foot {
          font-size: 0.7rem;
          color: var(--subtle);
        }
        .hb-chart {
          display: flex;
          align-items: flex-end;
          gap: 5px;
          height: 44px;
          margin: 10px 0 8px;
        }
        .hb-chart span {
          flex: 1;
          border-radius: 4px;
          background: #e0e3ff;
        }
        .hb-chart span.is-now { background: var(--brand); }

        @media (max-width: 1180px) {
          .hb-slot--tl, .hb-slot--bl { left: 0; }
          .hb-slot--tr, .hb-slot--br { right: 0; }
        }
        @media (max-width: 992px) {
          .hb-slot { scale: 0.85; }
          .hb-slot--tl, .hb-slot--bl { transform-origin: left top; }
          .hb-slot--tr, .hb-slot--br { transform-origin: right top; }
          .hb-slot--bl, .hb-slot--tr { display: none; }
        }
        @media (max-width: 640px) {
          .hb-slot { display: none; }
          .hero-peek { padding: 0 16px; }
          .hero-bezel { padding: 6px; border-radius: 20px; }
          .hero-screen { border-radius: 14px; }
        }
      `}</style>
    </section>
  );
}
