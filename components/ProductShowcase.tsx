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
  score?: number;
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
   SVG Icons (16px, stroke 1.5, currentColor)
   ═══════════════════════════════════════ */

const icons: Record<string, JSX.Element> = {
  mic: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0014 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  ),
  scissors: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  flame: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c.5 4-2 6-2 10a4 4 0 008 0c0-4-2.5-6-2-10" />
      <path d="M12 18a2 2 0 01-2-2c0-2 2-3 2-5 0 2 2 3 2 5a2 2 0 01-2 2z" />
    </svg>
  ),
  check: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3 5-5" />
    </svg>
  ),
  doc: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  ),
  card: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  refresh: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10" />
      <path d="M20.49 15a9 9 0 01-14.85 3.36L1 14" />
    </svg>
  ),
};

const iconMap: Record<string, string> = {
  "🎙": "mic",
  "✂️": "scissors",
  "🔥": "flame",
  "✅": "check",
  "📄": "doc",
  "💳": "card",
  "⚠️": "warning",
  "🔄": "refresh",
};

function CalloutIcon({ emoji, accent }: { emoji: string; accent: string }) {
  const key = iconMap[emoji];
  const svg = key ? icons[key] : null;

  return (
    <span
      className="flex items-center justify-center flex-shrink-0"
      style={{ width: 20, height: 20, color: accent }}
    >
      {svg ?? <span className="text-[14px]">{emoji}</span>}
    </span>
  );
}

/* ═══════════════════════════════════════
   Animation sub-components
   ═══════════════════════════════════════ */

function CountUp({ target, suffix, inView, decimals = 2 }: { target: number; suffix: string; inView: boolean; decimals?: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => new Intl.NumberFormat("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(v));
  const [display, setDisplay] = useState(decimals === 0 ? "0" : "0,00");
  useEffect(() => {
    if (!inView) return;
    const unsub = rounded.on("change", setDisplay);
    const ctrl = motionAnimate(mv, target, { duration: 1.5, ease: [0.16, 1, 0.3, 1] });
    return () => { ctrl.stop(); unsub(); };
  }, [inView, mv, rounded, target, decimals]);
  return <span className="font-bold" style={{ color: "#F0EDE6" }}>{display} {suffix}</span>;
}

function ProgressBar({ targetPct, color, inView, label, width = 140 }: { targetPct: number; color: string; inView: boolean; label?: string; width?: number }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let p = 0;
    const t = setInterval(() => { p += 4; if (p >= targetPct) { p = targetPct; clearInterval(t); } setPct(p); }, 30);
    return () => clearInterval(t);
  }, [inView, targetPct]);
  return (
    <div className="flex items-center gap-2">
      <div style={{ width, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2, transition: "width 0.08s linear" }} />
      </div>
      {label && <span className="text-[9px] font-mono" style={{ color }}>{pct}%</span>}
    </div>
  );
}

function WaveformAnimation({ accent, inView }: { accent: string; inView: boolean }) {
  const h = [12,22,8,28,18,14,32,10,24,16,8,26,20,12,30,14,22,8,18,28,10,24,14,20,8,26,16,12,22,18];
  return (
    <div className="relative" style={{ width: 160, height: 28 }}>
      <svg width="160" height="28" viewBox="0 0 180 32">
        {h.map((v, i) => (
          <motion.rect key={i} x={i * 6} y={32 - v} width="3" height={v} rx="1" fill={accent} opacity="0.75"
            initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.25, delay: 0.02 * i, ease: "easeOut" }} style={{ transformOrigin: "bottom" }} />
        ))}
      </svg>
      <motion.div className="absolute top-0 bottom-0" style={{ width: 1.5, background: "#ef4444", boxShadow: "0 0 4px #ef4444" }}
        initial={{ left: 0, opacity: 0 }} animate={inView ? { left: [0, 158], opacity: [0, 1, 1, 0] } : { left: 0, opacity: 0 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }} />
    </div>
  );
}

function TimelineCuts({ inView }: { inView: boolean }) {
  const cuts = [{ left: "12%", width: "18%" }, { left: "45%", width: "14%" }, { left: "72%", width: "22%" }];
  return (
    <div className="relative" style={{ width: 160, height: 16 }}>
      <div className="absolute inset-0" style={{ background: "#1a1a1f", borderRadius: 3 }} />
      {cuts.map((c, i) => (
        <motion.div key={i} className="absolute top-0 bottom-0"
          style={{ transformOrigin: "left", left: c.left, width: c.width, background: "rgba(239,68,68,0.4)", borderRadius: 2 }}
          initial={{ opacity: 0, scaleX: 0 }} animate={inView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.3, ease: "easeOut" }} />
      ))}
    </div>
  );
}

function ScoreCircle({ score, accent, inView }: { score: number; accent: string; inView: boolean }) {
  const r = 18; const c = 2 * Math.PI * r;
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const t = setInterval(() => { v += 2; if (v >= score) { v = score; clearInterval(t); } setVal(v); }, 25);
    return () => clearInterval(t);
  }, [inView, score]);
  return (
    <div className="flex items-center gap-2">
      <svg width="44" height="44" viewBox="0 0 44 44" className="flex-shrink-0">
        <circle cx="22" cy="22" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <motion.circle cx="22" cy="22" r={r} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round"
          transform="rotate(-90 22 22)" strokeDasharray={c}
          initial={{ strokeDashoffset: c }} animate={inView ? { strokeDashoffset: c * (1 - score / 100) } : { strokeDashoffset: c }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} />
        <text x="22" y="22" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="800" fill="#F0EDE6" fontFamily="Syne,sans-serif">{val}</text>
      </svg>
      <span className="text-[10px]" style={{ color: "#6b7280" }}>/100</span>
    </div>
  );
}

function SignatureDraw({ inView }: { inView: boolean }) {
  return (
    <div>
      <div style={{ width: 140, height: 36, background: "#111116", borderRadius: 6, overflow: "hidden" }}>
        <svg viewBox="0 0 140 36" width="140" height="36" fill="none">
          <motion.path d="M8 24 C 20 4, 35 30, 48 18 S 75 6, 92 22 S 115 30, 130 16"
            stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round"
            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} />
        </svg>
      </div>
      <motion.div className="mt-1 text-[9px] font-semibold" style={{ color: "#4ade80" }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.8, duration: 0.4 }}>
        ● Signé ✓
      </motion.div>
    </div>
  );
}

function DevisLines({ inView }: { inView: boolean }) {
  return (
    <div className="space-y-0.5">
      {[80, 60, 70].map((w, i) => (
        <motion.div key={i} style={{ height: 2.5, borderRadius: 1, background: "rgba(255,255,255,0.12)", width: w }}
          initial={{ scaleX: 0, opacity: 0 }} animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 + i * 0.2 }} className="origin-left" />
      ))}
      <motion.div className="text-[9px] font-semibold mt-1" style={{ color: "#4ade80" }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.2, duration: 0.4 }}>
        ✓ Conforme CGI
      </motion.div>
    </div>
  );
}

function StripeCountUp({ inView }: { inView: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div style={{ width: 16, height: 16, background: "#5B5BD6", color: "white", borderRadius: 3, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>S</div>
        <CountUp target={4978.8} suffix="€" inView={inView} />
      </div>
      <ProgressBar targetPct={100} color="#4ade80" inView={inView} width={140} />
      <motion.div className="mt-1 text-[9px]" style={{ color: "#4ade80" }}
        initial={{ opacity: 0, x: -4 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }} transition={{ delay: 1.8, duration: 0.4 }}>
        ✓ Viré sur votre compte
      </motion.div>
    </div>
  );
}

function FecImport({ inView }: { inView: boolean }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1 text-[10px]" style={{ color: "#d1d5db" }}>
        <span style={{ color: "#22c55e" }}>📄</span> FEC_2025.txt
      </div>
      <ProgressBar targetPct={100} color="#22c55e" inView={inView} label="pct" width={130} />
      <motion.div className="mt-1 text-[9px] font-semibold" style={{ color: "#4ade80" }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.5, duration: 0.4 }}>
        ✓ 12 458 écritures
      </motion.div>
    </div>
  );
}

function MiniLedger({ inView }: { inView: boolean }) {
  const rows = [
    { code: "401000", label: "Achat Lyreco", error: false },
    { code: "512000", label: "Écrit. orpheline", error: true },
    { code: "445000", label: "TVA collectée", error: false },
  ];
  return (
    <div>
      <div className="space-y-0.5">
        {rows.map((r, i) => (
          <motion.div key={r.code} className="flex items-center gap-1.5 text-[9px] px-1.5 py-0.5 rounded"
            style={{ background: r.error ? "rgba(239,68,68,0.08)" : "transparent", border: r.error ? "1px solid rgba(239,68,68,0.25)" : "1px solid transparent" }}
            initial={{ opacity: 0, x: -4 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.25 }}>
            <span className="font-mono" style={{ color: r.error ? "#f87171" : "#6b7280" }}>{r.code}</span>
            <span style={{ color: r.error ? "#fca5a5" : "#9ca3af" }}>{r.label}</span>
          </motion.div>
        ))}
      </div>
      <motion.div className="mt-1 text-[9px] font-semibold" style={{ color: "#fb923c" }}
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.2, duration: 0.4 }}>
        ⚠ 3 anomalies
      </motion.div>
    </div>
  );
}

function TvaCa3({ inView }: { inView: boolean }) {
  return (
    <div>
      <div className="mb-1"><CountUp target={8036} suffix="€" inView={inView} decimals={0} /></div>
      <div className="text-[9px] mb-0.5" style={{ color: "#6b7280" }}>Rapprochement</div>
      <ProgressBar targetPct={95} color="#22c55e" inView={inView} label="pct" width={120} />
      <motion.div className="mt-1 text-[9px] font-medium px-1.5 py-0.5 rounded inline-block"
        style={{ background: "#22c55e", color: "#06100a" }}
        initial={{ opacity: 0, y: 3 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 3 }} transition={{ delay: 1.8, duration: 0.4 }}>
        Générer le rapport →
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════
   CalloutContent (switch on type)
   ═══════════════════════════════════════ */

function CalloutContent({ callout, accent, inView }: { callout: Callout; accent: string; inView: boolean }) {
  switch (callout.type) {
    case "waveform": return <WaveformAnimation accent={accent} inView={inView} />;
    case "timeline-cuts": return <TimelineCuts inView={inView} />;
    case "score-circle": return <ScoreCircle score={callout.score ?? 87} accent={accent} inView={inView} />;
    case "signature-draw": return <SignatureDraw inView={inView} />;
    case "devis-lines": return <DevisLines inView={inView} />;
    case "stripe-countup": return <StripeCountUp inView={inView} />;
    case "fec-import": return <FecImport inView={inView} />;
    case "mini-ledger": return <MiniLedger inView={inView} />;
    case "tva-ca3": return <TvaCa3 inView={inView} />;
    default: return <div className="text-[10px]" style={{ color: "#6b7280" }}>{callout.subtitle}</div>;
  }
}

/* ═══════════════════════════════════════
   CalloutCard — refined glassmorphism with accent top bar
   ═══════════════════════════════════════ */

function CalloutCard({ callout, index, accent, inView }: { callout: Callout; index: number; accent: string; inView: boolean }) {
  return (
    <motion.div
      className="absolute hidden lg:block pointer-events-none"
      style={{
        ...callout.position,
        background: "rgba(10, 10, 15, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.04)",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
        zIndex: 5,
        minWidth: 180,
        maxWidth: 240,
      }}
      initial={{ opacity: 0, y: 15, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.92 }}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent top bar */}
      <div style={{ height: 2, background: accent, borderRadius: "12px 12px 0 0" }} />

      <div style={{ padding: "10px 14px" }}>
        <div className="flex items-center gap-1.5 mb-2" style={{ fontWeight: 700, fontSize: 12, color: "#F0EDE6", fontFamily: "var(--font-dm-sans)" }}>
          <CalloutIcon emoji={callout.icon} accent={accent} />
          {callout.title}
        </div>
        <CalloutContent callout={callout} accent={accent} inView={inView} />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   ProductShowcase
   ═══════════════════════════════════════ */

export default function ProductShowcase({
  screenshot, screenshotW, screenshotH, maxWidth, rotateY: rotY, accentColor, callouts,
}: ProductShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const hoverRotY = rotY > 0 ? 3 : -3;
  const [hovering, setHovering] = useState(false);

  return (
    <div ref={ref} className="relative w-full flex items-center justify-center" style={{ overflow: "visible" }}>
      <div className="relative" style={{ maxWidth, width: "100%", perspective: "1200px" }}>

        {/* Glow backdrop — behind screenshot */}
        <div
          className="absolute pointer-events-none hidden lg:block"
          aria-hidden
          style={{
            inset: "-10%",
            background: `radial-gradient(circle, ${accentColor}${hovering ? "40" : "26"} 0%, transparent 70%)`,
            filter: "blur(80px)",
            zIndex: -1,
            transition: "background 0.4s ease-out",
          }}
        />

        {/* Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotateY: hoverRotY, rotateX: 1, scale: 1.015 }}
          onHoverStart={() => setHovering(true)}
          onHoverEnd={() => setHovering(false)}
          className="relative screenshot-3d"
          style={{
            transform: `rotateY(${rotY}deg) rotateX(3deg)`,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            willChange: "transform",
            borderRadius: 14,
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
            style={{ width: "100%", height: "auto", display: "block", imageRendering: "auto" }}
          />
        </motion.div>

        {/* Callout overlays */}
        {callouts.map((c, i) => (
          <CalloutCard key={i} callout={c} index={i} accent={accentColor} inView={inView} />
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          :global(.screenshot-3d) { transform: none !important; }
        }
      `}</style>
    </div>
  );
}
