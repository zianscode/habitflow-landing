"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading";

const testimonials = [
  {
    quote: "I've tried four habit apps. This is the first one I still open after three months.",
    author: "Sarah Chen",
    role: "Product designer",
    habit: "Morning pages",
    since: "3 months",
  },
  {
    quote: "It doesn't nag. I check in, close it, and get on with my day. That's all I wanted.",
    author: "Marcus Johnson",
    role: "Software engineer",
    habit: "Daily walk",
    since: "8 months",
  },
  {
    quote: "The heatmap showed me I skip workouts every Monday. Small thing, but it changed how I plan my week.",
    author: "Priya Sharma",
    role: "Founder",
    habit: "Gym, 3× a week",
    since: "5 months",
  },
  {
    quote: "I work shifts, so daily habits never fit. Custom schedules are what finally made this stick for me.",
    author: "Daniel Okafor",
    role: "ER nurse",
    habit: "In bed by 11",
    since: "1 year",
  },
  {
    quote: "Seeing a 60-day streak on the screen is a weirdly good reason not to skip.",
    author: "Lena Fischer",
    role: "Student",
    habit: "Spanish, 15 min",
    since: "4 months",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".tm-panel", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ".tm-layout", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Fade the quote in whenever the selected person changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const tween = gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
    return () => {
      tween.kill();
    };
  }, [active]);

  const next = () => setActive((i) => (i + 1) % testimonials.length);
  const current = testimonials[active];

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => (i + 1) % testimonials.length);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
    }
  };

  return (
    <section ref={sectionRef} id="testimonials" className="tm-section">
      <div className="tm-inner">
        <div className="tm-head">
          <SplitHeading style={{ marginBottom: 0 }}>
            What people <span className="muted">tell us.</span>
          </SplitHeading>
          <p className="section-lead" style={{ maxWidth: 340 }}>
            Notes from people who check in with HabitFlow every day.
          </p>
        </div>

        <div
          className={`tm-layout ${paused ? "is-paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <figure className="tm-panel tm-feature" id="tm-quote" role="tabpanel" aria-live="polite">
            <div ref={quoteRef}>
              <blockquote className="tm-quote">{current.quote}</blockquote>
              <figcaption className="tm-meta">
                <div>
                  <div className="tm-name">{current.author}</div>
                  <div className="tm-role">{current.role}</div>
                </div>
                <dl className="tm-facts">
                  <div>
                    <dt>Tracks</dt>
                    <dd>{current.habit}</dd>
                  </div>
                  <div>
                    <dt>Using it for</dt>
                    <dd>{current.since}</dd>
                  </div>
                </dl>
              </figcaption>
            </div>
          </figure>

          <div className="tm-panel tm-list" role="tablist" aria-label="Testimonials" aria-orientation="vertical" onKeyDown={onKeyDown}>
            {testimonials.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.author}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="tm-quote"
                  tabIndex={isActive ? 0 : -1}
                  className={`tm-person ${isActive ? "is-active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className="tm-avatar" aria-hidden="true">{initials(t.author)}</span>
                  <span className="tm-person-text">
                    <span className="tm-person-name">{t.author}</span>
                    <span className="tm-person-role">{t.role}</span>
                  </span>
                  {isActive && (
                    <span className="tm-progress" aria-hidden="true">
                      <span key={active} onAnimationEnd={next} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .tm-section {
          position: relative;
          padding: clamp(96px, 12vw, 160px) 24px;
        }
        .tm-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .tm-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 32px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .tm-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
          gap: 16px;
        }
        .tm-panel {
          margin: 0;
          border-radius: 28px;
          background: #ffffff;
          border: 1px solid var(--line);
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
        }
        .tm-feature {
          padding: clamp(32px, 4vw, 56px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 420px;
        }
        .tm-feature > div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          gap: 48px;
        }
        .tm-quote {
          margin: 0;
          font-family: var(--font-brand);
          font-size: clamp(1.6rem, 2.8vw, 2.35rem);
          font-weight: 500;
          line-height: 1.22;
          letter-spacing: -0.025em;
          color: var(--ink);
          text-wrap: pretty;
        }
        .tm-meta {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 24px;
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid var(--line);
        }
        .tm-name {
          font-weight: 600;
          color: var(--ink);
        }
        .tm-role {
          font-size: 0.9rem;
          color: var(--muted);
        }
        .tm-facts {
          display: flex;
          gap: 32px;
          margin: 0;
        }
        .tm-facts dt {
          font-size: 0.75rem;
          color: var(--subtle);
          margin-bottom: 2px;
        }
        .tm-facts dd {
          margin: 0;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--ink);
        }

        .tm-list {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .tm-person {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 14px 16px;
          border: none;
          border-radius: 20px;
          background: transparent;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          overflow: hidden;
          transition: background-color 0.2s ease;
        }
        .tm-person:hover {
          background: var(--surface-2);
        }
        .tm-person.is-active {
          background: var(--surface-2);
        }
        .tm-person:focus-visible {
          outline: 2px solid var(--brand);
          outline-offset: -2px;
        }
        .tm-avatar {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #eef0ff;
          color: var(--brand);
          font-size: 0.8rem;
          font-weight: 600;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .tm-person.is-active .tm-avatar {
          background: var(--brand);
          color: #ffffff;
        }
        .tm-person-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .tm-person-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--ink-2);
        }
        .tm-person.is-active .tm-person-name {
          color: var(--ink);
        }
        .tm-person-role {
          font-size: 0.8rem;
          color: var(--subtle);
        }
        .tm-progress {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 0;
          height: 2px;
          border-radius: 2px;
          background: var(--line);
          overflow: hidden;
        }
        .tm-progress span {
          display: block;
          height: 100%;
          background: var(--brand);
          transform-origin: left;
          animation: tm-fill 7s linear forwards;
        }
        .tm-layout.is-paused .tm-progress span {
          animation-play-state: paused;
        }
        @keyframes tm-fill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .tm-progress { display: none; }
        }

        @media (max-width: 900px) {
          .tm-layout {
            grid-template-columns: 1fr;
          }
          .tm-feature {
            min-height: 0;
          }
          .tm-list {
            flex-direction: row;
            overflow-x: auto;
            scrollbar-width: none;
          }
          .tm-list::-webkit-scrollbar { display: none; }
          .tm-person {
            width: auto;
            flex-shrink: 0;
          }
        }
      `}</style>
    </section>
  );
}
