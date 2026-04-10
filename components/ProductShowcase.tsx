"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate as motionAnimate,
} from "framer-motion";

/* ─── Types ─── */

export interface Callout {
  icon: string;
  title: string;
  subtitle: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  /** Optional: renders an animated SVG score circle instead of plain subtitle */
  score?: number;
  /** Optional: renders a count-up number instead of plain subtitle */
  countUp?: number;
  countUpSuffix?: string;
}

export interface ProductShowcaseProps {
  screenshot: string;
  screenshotW: number;
  screenshotH: number;
  maxWidth: number;
  rotateY: number;
  accentColor: string;
  callouts: Callout[];
}

/* ─── CountUp hook ─── */

function CountUpValue({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v)
  );
  const [display, setDisplay] = useState("0,00");

  useEffect(() => {
    if (!inView) return;
    const unsub = rounded.on("change", setDisplay);
    const ctrl = motionAnimate(mv, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => {
      ctrl.stop();
      unsub();
    };
  }, [inView, mv, rounded, target]);

  return (
    <span>
      {display} {suffix}
    </span>
  );
}

/* ─── Score circle ─── */

function ScoreCircle({
  score,
  accent,
  inView,
}: {
  score: number;
  accent: string;
  inView: boolean;
}) {
  const r = 15;
  const c = 2 * Math.PI * r;

  return (
    <svg width="36" height="36" viewBox="0 0 36 36" className="flex-shrink-0">
      <circle
        cx="18"
        cy="18"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="3"
      />
      <motion.circle
        cx="18"
        cy="18"
        r={r}
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        transform="rotate(-90 18 18)"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={inView ? { strokeDashoffset: c * (1 - score / 100) } : { strokeDashoffset: c }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <text
        x="18"
        y="18"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="9"
        fontWeight="800"
        fill="#F0EDE6"
        fontFamily="Syne, sans-serif"
      >
        {score}
      </text>
    </svg>
  );
}

/* ─── CalloutCard ─── */

function CalloutCard({
  callout,
  index,
  accent,
  inView,
}: {
  callout: Callout;
  index: number;
  accent: string;
  inView: boolean;
}) {
  return (
    <motion.div
      className="absolute hidden lg:flex items-center gap-2.5 pointer-events-none"
      style={{
        ...callout.position,
        background: "rgba(10, 10, 15, 0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 12,
        padding: "12px 16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        whiteSpace: "nowrap",
        zIndex: 5,
      }}
      initial={{ opacity: 0, y: 15, scale: 0.92 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 15, scale: 0.92 }
      }
      transition={{
        duration: 0.7,
        delay: 0.4 + index * 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Icon or score circle */}
      {callout.score != null ? (
        <ScoreCircle score={callout.score} accent={accent} inView={inView} />
      ) : (
        <span className="text-[18px] flex-shrink-0">{callout.icon}</span>
      )}

      <div>
        <div
          className="font-semibold"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 13,
            color: "#F0EDE6",
          }}
        >
          {callout.title}
        </div>
        <div style={{ fontSize: 11, color: "#8C8880" }}>
          {callout.countUp != null ? (
            <CountUpValue
              target={callout.countUp}
              suffix={callout.countUpSuffix ?? ""}
              inView={inView}
            />
          ) : (
            callout.subtitle
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── ProductShowcase ─── */

export default function ProductShowcase({
  screenshot,
  screenshotW,
  screenshotH,
  maxWidth,
  rotateY: rotY,
  accentColor,
  callouts,
}: ProductShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const hoverRotY = rotY > 0 ? 3 : -3;

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center justify-center"
      style={{ overflow: "visible" }}
    >
      <div
        className="relative"
        style={{ maxWidth, width: "100%", perspective: "1200px" }}
      >
        {/* Screenshot with 3D tilt — flat on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            rotateY: hoverRotY,
            rotateX: 1,
            scale: 1.02,
          }}
          className="relative"
          style={{
            transform: `rotateY(${rotY}deg) rotateX(3deg)`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
            borderRadius: 16,
            boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
            overflow: "hidden",
          }}
        >
          <Image
            src={screenshot}
            alt="Interface produit"
            width={screenshotW}
            height={screenshotH}
            unoptimized
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              imageRendering: "auto",
            }}
          />
        </motion.div>

        {/* Callout overlays — desktop only */}
        {callouts.map((c, i) => (
          <CalloutCard
            key={i}
            callout={c}
            index={i}
            accent={accentColor}
            inView={inView}
          />
        ))}
      </div>

      {/* Mobile: reset 3D transform via global class override */}
      <style jsx>{`
        @media (max-width: 1023px) {
          div :global([style*="rotateY"]) {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
