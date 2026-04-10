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

/* ═══════════════════════════════════════
   Types
   ═══════════════════════════════════════ */

export type CalloutType =
  | "waveform"
  | "timeline-cuts"
  | "score-circle"
  | "signature-draw"
  | "devis-lines"
  | "stripe-countup"
  | "fec-import"
  | "mini-ledger"
  | "tva-ca3"
  | "text";

export interface Callout {
  icon: string;
  title: string;
  subtitle: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  type?: CalloutType;
  /** For score-circle */
  score?: number;
  /** For stripe-countup */
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

/* ═══════════════════════════════════════
   Reusable animation sub-components
   ═══════════════════════════════════════ */

/* ── CountUp ── */

function CountUp({
  target,
  suffix,
  inView,
  decimals = 2,
}: {
  target: number;
  suffix: string;
  inView: boolean;
  decimals?: number;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) =>
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(v)
  );
  const [display, setDisplay] = useState(decimals === 0 ? "0" : "0,00");

  useEffect(() => {
    if (!inView) return;
    const unsub = rounded.on("change", setDisplay);
    const ctrl = motionAnimate(mv, target, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => { ctrl.stop(); unsub(); };
  }, [inView, mv, rounded, target, decimals]);

  return (
    <span className="font-bold" style={{ color: "#F0EDE6" }}>
      {display} {suffix}
    </span>
  );
}

/* ── ProgressBar ── */

function ProgressBar({
  targetPct,
  color,
  inView,
  label,
  width = 150,
}: {
  targetPct: number;
  color: string;
  inView: boolean;
  label?: string;
  width?: number;
}) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let p = 0;
    const t = setInterval(() => {
      p += 4;
      if (p >= targetPct) { p = targetPct; clearInterval(t); }
      setPct(p);
    }, 30);
    return () => clearInterval(t);
  }, [inView, targetPct]);

  return (
    <div className="flex items-center gap-2">
      <div
        className="relative overflow-hidden"
        style={{
          width,
          height: 5,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 3,
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 3,
            transition: "width 0.08s linear",
          }}
        />
      </div>
      {label && (
        <span className="text-[10px] font-mono" style={{ color }}>
          {pct}%
        </span>
      )}
    </div>
  );
}

/* ── WaveformAnimation ── */

function WaveformAnimation({ accent, inView }: { accent: string; inView: boolean }) {
  const heights = [12,22,8,28,18,14,32,10,24,16,8,26,20,12,30,14,22,8,18,28,10,24,14,20,8,26,16,12,22,18];

  return (
    <div className="relative" style={{ width: 180, height: 32 }}>
      <svg width="180" height="32" viewBox="0 0 180 32">
        {heights.map((h, i) => (
          <motion.rect
            key={i}
            x={i * 6}
            y={32 - h}
            width="3"
            height={h}
            rx="1"
            fill={accent}
            opacity="0.8"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.3, delay: 0.02 * i, ease: "easeOut" }}
            style={{ transformOrigin: "bottom" }}
          />
        ))}
      </svg>
      {/* Scanning cursor */}
      <motion.div
        className="absolute top-0 bottom-0"
        style={{ width: 2, background: "#ef4444", boxShadow: "0 0 6px #ef4444" }}
        initial={{ left: 0, opacity: 0 }}
        animate={inView ? { left: [0, 178], opacity: [0, 1, 1, 0] } : { left: 0, opacity: 0 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
      />
    </div>
  );
}

/* ── TimelineCuts ── */

function TimelineCuts({ inView }: { inView: boolean }) {
  const cuts = [
    { left: "12%", width: "18%" },
    { left: "45%", width: "14%" },
    { left: "72%", width: "22%" },
  ];

  return (
    <div className="relative" style={{ width: 180, height: 20 }}>
      <div
        className="absolute inset-0"
        style={{ background: "#1a1a1f", borderRadius: 4 }}
      />
      {cuts.map((c, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            transformOrigin: "left",
            left: c.left,
            width: c.width,
            background: "rgba(239,68,68,0.4)",
            borderRadius: 2,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.3, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ── ScoreCircle (enriched — bigger, with count-up) ── */

function ScoreCircle({
  score,
  accent,
  inView,
}: {
  score: number;
  accent: string;
  inView: boolean;
}) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const t = setInterval(() => {
      v += 2;
      if (v >= score) { v = score; clearInterval(t); }
      setVal(v);
    }, 25);
    return () => clearInterval(t);
  }, [inView, score]);

  return (
    <div className="flex items-center gap-2">
      <svg width="48" height="48" viewBox="0 0 48 48" className="flex-shrink-0">
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
        <motion.circle
          cx="24" cy="24" r={r} fill="none" stroke={accent} strokeWidth="4" strokeLinecap="round"
          transform="rotate(-90 24 24)"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={inView ? { strokeDashoffset: c * (1 - score / 100) } : { strokeDashoffset: c }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <text x="24" y="24" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="800" fill="#F0EDE6" fontFamily="Syne, sans-serif">
          {val}
        </text>
      </svg>
      <span className="text-[11px]" style={{ color: "#8C8880" }}>/100</span>
    </div>
  );
}

/* ── SignatureDraw ── */

function SignatureDraw({ inView }: { inView: boolean }) {
  return (
    <div>
      <div
        className="relative"
        style={{
          width: 160,
          height: 40,
          background: "#111116",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <svg viewBox="0 0 160 40" width="160" height="40" fill="none">
          <motion.path
            d="M10 28 C 25 5, 40 35, 55 20 S 85 8, 105 25 S 130 35, 148 18"
            stroke="#6b7280"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>
      <motion.div
        className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-semibold"
        style={{ color: "#4ade80" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.8, duration: 0.4 }}
      >
        <span>●</span> Signé ✓
      </motion.div>
    </div>
  );
}

/* ── DevisLines ── */

function DevisLines({ inView }: { inView: boolean }) {
  return (
    <div className="space-y-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            height: 3,
            borderRadius: 2,
            background: "rgba(255,255,255,0.15)",
            width: [90, 70, 80][i],
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.2, ease: "easeOut" }}
          className="origin-left"
        />
      ))}
      <motion.div
        className="flex items-center gap-1 text-[10px] font-semibold mt-1"
        style={{ color: "#4ade80" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        ✓ Conforme CGI
      </motion.div>
    </div>
  );
}

/* ── StripeCountUp ── */

function StripeCountUp({ inView }: { inView: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5">
        <div
          className="flex items-center justify-center font-bold"
          style={{
            width: 18, height: 18, background: "#5B5BD6",
            color: "white", borderRadius: 3, fontSize: 10,
          }}
        >
          S
        </div>
        <CountUp target={4978.8} suffix="€" inView={inView} />
      </div>
      <ProgressBar targetPct={100} color="#4ade80" inView={inView} width={160} />
      <motion.div
        className="mt-1 text-[10px]"
        style={{ color: "#4ade80" }}
        initial={{ opacity: 0, x: -6 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
        transition={{ delay: 1.8, duration: 0.4 }}
      >
        ✓ Viré sur votre compte
      </motion.div>
    </div>
  );
}

/* ── FecImport ── */

function FecImport({ inView }: { inView: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1.5 text-[11px]" style={{ color: "#e5e7eb" }}>
        <span>📄</span>
        <span className="font-medium">FEC_2025.txt</span>
      </div>
      <ProgressBar targetPct={100} color="#22c55e" inView={inView} label="pct" width={150} />
      <motion.div
        className="mt-1.5 text-[10px] font-semibold"
        style={{ color: "#4ade80" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        ✓ 12 458 écritures
      </motion.div>
    </div>
  );
}

/* ── MiniLedger ── */

function MiniLedger({ inView }: { inView: boolean }) {
  const rows = [
    { code: "401000", label: "Achat Lyreco", error: false },
    { code: "512000", label: "Écriture orpheline", error: true },
    { code: "445000", label: "TVA collectée", error: false },
  ];

  return (
    <div>
      <div className="space-y-1">
        {rows.map((r, i) => (
          <motion.div
            key={r.code}
            className="flex items-center gap-2 text-[10px] px-1.5 py-1 rounded"
            style={{
              background: r.error ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.03)",
              border: r.error ? "1px solid rgba(239,68,68,0.3)" : "1px solid transparent",
            }}
            initial={{ opacity: 0, x: -6 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.3 }}
          >
            <span className="font-mono" style={{ color: r.error ? "#f87171" : "#6b7280" }}>
              {r.code}
            </span>
            <span style={{ color: r.error ? "#fca5a5" : "#9ca3af" }}>{r.label}</span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-1.5 text-[10px] font-semibold"
        style={{ color: "#fb923c" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.4, duration: 0.4 }}
      >
        ⚠ 3 anomalies
      </motion.div>
    </div>
  );
}

/* ── TvaCa3 ── */

function TvaCa3({ inView }: { inView: boolean }) {
  return (
    <div>
      <div className="mb-1.5">
        <CountUp target={8036} suffix="€" inView={inView} decimals={0} />
      </div>
      <div className="flex items-center gap-1 mb-1 text-[10px]" style={{ color: "#9ca3af" }}>
        <span>Rapprochement</span>
      </div>
      <ProgressBar targetPct={95} color="#22c55e" inView={inView} label="pct" width={140} />
      <motion.div
        className="mt-1.5 text-[10px] font-medium px-2 py-0.5 rounded inline-block"
        style={{ background: "#22c55e", color: "#06100a" }}
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ delay: 1.8, duration: 0.4 }}
      >
        Générer le rapport →
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════
   CalloutCard — renders the right animation based on type
   ═══════════════════════════════════════ */

function CalloutContent({
  callout,
  accent,
  inView,
}: {
  callout: Callout;
  accent: string;
  inView: boolean;
}) {
  switch (callout.type) {
    case "waveform":
      return <WaveformAnimation accent={accent} inView={inView} />;
    case "timeline-cuts":
      return <TimelineCuts inView={inView} />;
    case "score-circle":
      return <ScoreCircle score={callout.score ?? 87} accent={accent} inView={inView} />;
    case "signature-draw":
      return <SignatureDraw inView={inView} />;
    case "devis-lines":
      return <DevisLines inView={inView} />;
    case "stripe-countup":
      return <StripeCountUp inView={inView} />;
    case "fec-import":
      return <FecImport inView={inView} />;
    case "mini-ledger":
      return <MiniLedger inView={inView} />;
    case "tva-ca3":
      return <TvaCa3 inView={inView} />;
    default:
      return (
        <div style={{ fontSize: 11, color: "#8C8880" }}>
          {callout.subtitle}
        </div>
      );
  }
}

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
      className="absolute hidden lg:block pointer-events-none"
      style={{
        ...callout.position,
        background: "rgba(10, 10, 15, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 14,
        padding: "14px 18px",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
        zIndex: 5,
        minWidth: 200,
        maxWidth: 260,
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
      <div
        className="flex items-center gap-1.5 mb-2"
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: "#F0EDE6",
          fontFamily: "var(--font-dm-sans)",
        }}
      >
        <span className="text-[16px]">{callout.icon}</span>
        {callout.title}
      </div>
      <CalloutContent callout={callout} accent={accent} inView={inView} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   ProductShowcase
   ═══════════════════════════════════════ */

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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotateY: hoverRotY, rotateX: 1, scale: 1.02 }}
          className="relative screenshot-3d"
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

      <style jsx>{`
        @media (max-width: 1023px) {
          :global(.screenshot-3d) {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
