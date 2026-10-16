"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading";
import { ArrowRight } from "./Icons";

const suggestions = [
  "Read 10 pages",
  "Walk after lunch",
  "Drink 2L of water",
  "No phone in bed",
  "Stretch for 5 min",
  "Write 3 lines",
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState(suggestions[1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-fade", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="final-cta" ref={sectionRef} className="cta">
      <div className="cta-inner">
        <div className="cta-copy">
          <SplitHeading className="section-title section-title--light cta-title">
            Start with <span className="muted">one habit.</span>
          </SplitHeading>
          <p className="cta-fade cta-lead">
            Pick something small enough that you can&apos;t say no to it, then check in tomorrow. Free for up to 5 habits, no card needed.
          </p>
        </div>

        <div className="cta-picker">
          <div className="cta-fade cta-picker-label" id="cta-picker-label">Pick your first one</div>
          <div className="cta-chips" role="radiogroup" aria-labelledby="cta-picker-label">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={picked === s}
                className={`cta-fade cta-chip ${picked === s ? "is-picked" : ""}`}
                onClick={() => setPicked(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <a href="#pricing" className="cta-fade btn btn-light btn-lg cta-go">
            <span>Start with &ldquo;{picked}&rdquo;</span>
            <ArrowRight className="btn-arrow" />
          </a>
        </div>
      </div>

      <style>{`
        .cta {
          margin: clamp(48px, 8vw, 96px) 16px 0;
          padding: clamp(72px, 10vw, 128px) 24px clamp(56px, 8vw, 96px);
          border-radius: 32px 32px 0 0;
          /* globals.css makes every section transparent, so this one needs !important */
          background: var(--night) !important;
          color: #ffffff;
        }
        .cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: clamp(40px, 6vw, 96px);
          align-items: end;
        }
        .cta-title {
          font-size: clamp(2.75rem, 6vw, 5rem);
          line-height: 1;
          margin-bottom: 24px;
        }
        .cta-lead {
          max-width: 440px;
          font-size: 1.05rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.62);
        }
        .cta-picker-label {
          margin-bottom: 14px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
        }
        .cta-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .cta-chip {
          height: 40px;
          padding: 0 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.78);
          font-family: inherit;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }
        .cta-chip:hover {
          border-color: rgba(255, 255, 255, 0.32);
          color: #ffffff;
        }
        .cta-chip.is-picked {
          background: #ffffff;
          border-color: #ffffff;
          color: var(--ink);
        }
        .cta-chip:focus-visible {
          outline: 2px solid #ffffff;
          outline-offset: 2px;
        }
        .cta-go {
          max-width: 100%;
        }
        .cta-go span {
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 900px) {
          .cta-inner {
            grid-template-columns: 1fr;
            align-items: start;
          }
        }
        @media (max-width: 640px) {
          .cta {
            margin: 48px 8px 0;
            border-radius: 24px 24px 0 0;
          }
          .cta-go {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
