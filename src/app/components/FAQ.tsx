"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import SplitHeading from "./SplitHeading";

const faqs = [
  { question: "Is HabitFlow really free to start?", answer: "Yes. The Free plan covers up to 5 habits with streaks and reminders, and it stays free. You don't need a card to sign up." },
  { question: "Can I track any type of habit?", answer: "Pretty much. Habits can be daily, weekly, or on a custom schedule, so workouts, reading, drinking water, or anything else works." },
  { question: "How does the streak system work?", answer: "A streak counts the days in a row you complete a habit. Miss a day and it resets. On Pro you get a streak shield that covers one missed day a month." },
  { question: "Is my data private and secure?", answer: "Your data is encrypted in transit and at rest, and we don't sell it. You can export or delete everything from your settings at any time." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.children;
      if (items) {
        gsap.fromTo(items, 
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={containerRef}
      style={{
        padding: "120px 24px",
        background: "#ffffff",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <SplitHeading className="section-title section-title--sm">
            Questions you <span className="muted">might have</span>
          </SplitHeading>
        </div>

        <div ref={itemsRef} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #f1f5f9",
                  background: isOpen ? "#f8fafc" : "white",
                  transition: "all 0.4s ease",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "24px 32px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 20,
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: "1.05rem", color: isOpen ? "#fd643b" : "#0f172a" }}>{faq.question}</span>
                  <div style={{ width: 32, height: 32, borderRadius: "100px", background: isOpen ? "#fd643b" : "#f1f5f9", color: isOpen ? "white" : "#64748b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.3s ease", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                  </div>
                </button>
                <div style={{ maxHeight: isOpen ? "300px" : "0", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <p style={{ padding: "0 32px 32px", fontSize: "0.95rem", color: "#64748b", lineHeight: 1.7, fontWeight: 500 }}>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
