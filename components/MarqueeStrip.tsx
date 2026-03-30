"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const items = [
  "Next.js 16",
  "Supabase",
  "Mistral AI",
  "Stripe",
  "TypeScript",
  "Groq Whisper",
  "Remotion",
  "FFmpeg",
  "Vercel",
  "Tailwind CSS",
  "Hetzner",
  "PostgreSQL",
  "React",
  "Resend",
];

export default function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      x: "-50%",
      duration: 30,
      ease: "none",
      repeat: -1,
    });
    tweenRef.current = tween;

    return () => {
      tween.kill();
    };
  }, []);

  const onEnter = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 0.3, duration: 0.5 });
  };

  const onLeave = () => {
    if (tweenRef.current) gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
  };

  return (
    <div
      className="overflow-hidden py-3.5"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      data-cursor="drag"
    >
      <div
        ref={trackRef}
        className="flex gap-12"
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-xs font-medium tracking-widest uppercase whitespace-nowrap flex items-center gap-3"
            style={{ color: "var(--text-dim)" }}
          >
            <span className="text-[8px]" style={{ color: "var(--gold)" }}>
              ◆
            </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
