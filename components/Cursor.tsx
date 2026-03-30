"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

type CursorMode = "hidden" | "link" | "card" | "drag";

export default function Cursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const modeRef = useRef<CursorMode>("hidden");
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  const setMode = useCallback((mode: CursorMode) => {
    if (modeRef.current === mode) return;
    modeRef.current = mode;

    const el = containerRef.current;
    if (!el) return;

    const circle = el.querySelector("[data-cursor-circle]") as HTMLElement;
    const label = el.querySelector("[data-cursor-label]") as HTMLElement;
    const dot = el.querySelector("[data-cursor-dot]") as HTMLElement;

    if (mode === "hidden") {
      gsap.to(circle, { scale: 0, opacity: 0, duration: 0.2 });
      return;
    }

    // Reset rotation
    gsap.killTweensOf(circle, "rotation");

    if (mode === "link") {
      gsap.to(circle, {
        width: 44,
        height: 44,
        scale: 1,
        opacity: 1,
        background: "transparent",
        border: "1.5px solid #C4973A",
        rotation: 0,
        duration: 0.25,
      });
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    } else if (mode === "card") {
      gsap.to(circle, {
        width: 64,
        height: 64,
        scale: 1,
        opacity: 1,
        background: "rgba(196,151,58,0.08)",
        border: "1px solid rgba(196,151,58,0.4)",
        rotation: 0,
        duration: 0.25,
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.15 });
      label.textContent = "VOIR";
      gsap.to(label, { opacity: 1, duration: 0.2 });
    } else if (mode === "drag") {
      gsap.to(circle, {
        width: 56,
        height: 56,
        scale: 1,
        opacity: 1,
        background: "transparent",
        border: "1.5px solid #C4973A",
        duration: 0.25,
      });
      gsap.to(circle, {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
      });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.15 });
      label.textContent = "DRAG";
      gsap.to(label, { opacity: 1, duration: 0.2 });
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const el = containerRef.current;
    if (!el) return;

    xTo.current = gsap.quickTo(el, "left", { duration: 0.12, ease: "power2" });
    yTo.current = gsap.quickTo(el, "top", { duration: 0.12, ease: "power2" });

    const onMove = (e: MouseEvent) => {
      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const mode = target.getAttribute("data-cursor") as CursorMode;
        setMode(mode);
      } else {
        setMode("hidden");
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled, setMode]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        data-cursor-circle
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1.5px solid #C4973A",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "scale(0)",
          opacity: 0,
          willChange: "width, height, transform, opacity",
        }}
      >
        <div
          data-cursor-dot
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#C4973A",
            position: "absolute",
          }}
        />
        <span
          data-cursor-label
          style={{
            fontSize: 10,
            fontFamily: "var(--font-syne), Syne, sans-serif",
            fontWeight: 600,
            color: "#C4973A",
            letterSpacing: "1px",
            opacity: 0,
            userSelect: "none",
          }}
        />
      </div>
    </div>
  );
}
