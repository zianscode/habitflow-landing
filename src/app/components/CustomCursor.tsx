"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    if (window.innerWidth <= 992) {
      cursor.style.display = "none";
      follower.style.display = "none";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "none",
      });

      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.7, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.2 });
    };

    const onMouseEnter = () => {
      gsap.to(follower, {
        scale: 2.5,
        backgroundColor: "rgba(27, 28, 194, 0.12)",
        borderColor: "transparent",
        duration: 0.3
      });
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };

    const onMouseLeave = () => {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(27, 28, 194, 0.2)",
        duration: 0.3
      });
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const interactiveElements = document.querySelectorAll("a, button, .f-card, .price-card, [role='button']");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <>
      <div 
        ref={cursorRef}
        className="custom-cursor" 
        style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "8px", 
          height: "8px", 
          background: "#1b1cc2", 
          borderRadius: "50%", 
          zIndex: 10000, 
          pointerEvents: "none",
          transform: "translate(-50%, -50%)"
        }} 
      />
      <div 
        ref={followerRef}
        className="custom-cursor" 
        style={{ 
          position: "fixed", 
          top: 0, 
          left: 0, 
          width: "40px", 
          height: "40px", 
          border: "1px solid rgba(27, 28, 194, 0.2)", 
          borderRadius: "50%", 
          zIndex: 9999, 
          pointerEvents: "none",
          transform: "translate(-50%, -50%)"
        }} 
      />
    </>
  );
}
