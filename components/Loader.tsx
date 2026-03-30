"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<SVGRectElement>(null);
  const textRef = useRef<SVGTextElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if already loaded this session
    if (sessionStorage.getItem("nbhc-loaded")) {
      setVisible(false);
      onComplete();
      return;
    }

    const overlay = overlayRef.current;
    const rect = rectRef.current;
    const text = textRef.current;
    if (!overlay || !rect || !text) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("nbhc-loaded", "1");
        setVisible(false);
        onComplete();
      },
    });

    // 1. Golden square appears
    tl.fromTo(
      rect,
      { scale: 0, transformOrigin: "center center" },
      { scale: 1, duration: 0.4, ease: "power2.out" }
    );

    // 2. "NBHC" text slides from right
    tl.fromTo(
      text,
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
      0.2
    );

    // 3. Pause then overlay slides up
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.6,
      ease: "power3.inOut",
    }, "+=0.2");
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        background: "#09090b",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        height={28}
        viewBox="0 0 80 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          ref={rectRef}
          x={0}
          y={10}
          width={8}
          height={8}
          rx={2}
          fill="#C4973A"
        />
        <text
          ref={textRef}
          x={14}
          y={20}
          fill="#F0EDE6"
          fontFamily="var(--font-syne), Syne, sans-serif"
          fontWeight={800}
          fontSize={22}
          letterSpacing="-0.5px"
        >
          NBHC
        </text>
      </svg>
    </div>
  );
}
