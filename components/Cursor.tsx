"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

type CursorState = "default" | "link" | "card" | "drag" | "contact";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const stateRef = useRef<CursorState>("default");

  const updateCursor = useCallback((state: CursorState) => {
    if (stateRef.current === state) return;
    const prev = stateRef.current;
    stateRef.current = state;

    const label = labelRef.current;
    if (!label) return;

    if (state === "default") {
      gsap.to(label, { opacity: 0, scale: 0.8, duration: 0.2, ease: "power2.out" });
      return;
    }

    const config: Record<string, { text: string; bg: string; color: string; border: string }> = {
      link: { text: "CLIQUER", bg: "#C4973A", color: "#09090b", border: "none" },
      card: { text: "VOIR \u2192", bg: "#C4973A", color: "#09090b", border: "none" },
      drag: { text: "DRAG", bg: "rgba(196,151,58,0.2)", color: "#C4973A", border: "1px solid #C4973A" },
      contact: { text: "\u00C9CRIRE", bg: "#C4973A", color: "#09090b", border: "none" },
    };

    const c = config[state];

    if (prev !== "default") {
      gsap.to(label, {
        opacity: 0,
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out",
        onComplete: () => {
          label.textContent = c.text;
          label.style.background = c.bg;
          label.style.color = c.color;
          label.style.border = c.border;
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.15, ease: "power2.out" });
        },
      });
    } else {
      label.textContent = c.text;
      label.style.background = c.bg;
      label.style.color = c.color;
      label.style.border = c.border;
      gsap.to(label, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    if (mq.matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const el = cursorRef.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 2);
      yTo(e.clientY - 2);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("[data-cursor]");
      if (target) {
        const mode = target.getAttribute("data-cursor") as CursorState;
        updateCursor(mode);
      } else {
        updateCursor("default");
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled, updateCursor]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        gap: 6,
        willChange: "transform",
      }}
    >
      {/* Pointeur SVG flèche style Figma */}
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
        <path
          d="M0 0 L0 20 L5 15 L9 23 L12 22 L8 14 L15 14 Z"
          fill="#C4973A"
          stroke="#09090b"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Label pill */}
      <div
        ref={labelRef}
        style={{
          background: "#C4973A",
          color: "#09090b",
          fontSize: 11,
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 20,
          whiteSpace: "nowrap",
          marginTop: 2,
          opacity: 0,
          transform: "scale(0.8)",
        }}
      >
        NBHC
      </div>
    </div>
  );
}
