"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FlowCard } from "./FlowCard";

const ACCENT = "#6366f1";

/* ── Step 01 — Upload progress ── */

function Step01() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let p = 0;
    const timer = setInterval(() => {
      p += 4;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(() => setDone(true), 200);
      }
      setProgress(p);
    }, 30);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        background: "#07070a",
        borderRadius: 8,
        border: "1px dashed rgba(99,102,241,0.3)",
        padding: 14,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex items-center justify-center"
          style={{
            width: 34,
            height: 34,
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 6,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6 L14 6 L14 18 L4 18 Z"
              stroke={ACCENT}
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M14 10 L20 6 L20 18 L14 14 Z"
              stroke={ACCENT}
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="rgba(99,102,241,0.15)"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="text-[12px] font-medium truncate"
            style={{ color: "#e5e7eb" }}
          >
            vlog-tokyo.mp4
          </div>
          <div className="text-[10px]" style={{ color: "#6b7280" }}>
            142 MB — {Math.round((progress * 142) / 100)} MB
          </div>
        </div>
        <div
          className="text-[11px] font-semibold font-mono"
          style={{ color: ACCENT }}
        >
          {progress}%
        </div>
      </div>
      <div
        className="relative overflow-hidden"
        style={{
          height: 4,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 2,
        }}
      >
        <div
          className="absolute inset-y-0 left-0"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg, ${ACCENT}, #818cf8)`,
            borderRadius: 2,
            transition: "width 0.1s linear",
          }}
        />
      </div>
      {done && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(34,197,94,0.12)",
            color: "#4ade80",
            border: "1px solid rgba(34,197,94,0.25)",
          }}
        >
          ✓ Upload terminé
        </motion.div>
      )}
    </div>
  );
}

/* ── Step 02 — Waveform + scanning cursor ── */

function Step02() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const heights = [
    8, 14, 10, 18, 22, 12, 6, 16, 20, 14, 10, 24, 18, 8, 12, 20, 26, 16, 10,
    14, 22, 18, 12, 8, 16, 24, 20, 14, 10, 18, 14, 8, 22, 16, 10, 20, 26, 18,
    12, 14,
  ];

  return (
    <div
      ref={ref}
      style={{
        background: "#07070a",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.06)",
        padding: 14,
      }}
    >
      <div
        className="text-[10px] uppercase tracking-widest mb-2"
        style={{ color: "#6b7280", letterSpacing: "1.5px" }}
      >
        Timeline — Cuts silences & fillers
      </div>
      <div className="relative" style={{ height: 40 }}>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center gap-[3px]">
          {heights.map((h, i) => {
            // Mark some as "removed" (red) — indexes 6, 15, 28
            const removed = i === 6 || i === 15 || i === 28;
            return (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.02 * i,
                  ease: "easeOut",
                }}
                style={{
                  width: 4,
                  height: h,
                  background: removed ? "#f43f5e" : ACCENT,
                  opacity: removed ? 0.5 : 0.85,
                  borderRadius: 1,
                  transformOrigin: "center",
                }}
              />
            );
          })}
        </div>
        {/* Scanning cursor */}
        <motion.div
          className="absolute top-0 bottom-0"
          style={{
            width: 2,
            background: "#f43f5e",
            boxShadow: "0 0 8px #f43f5e",
          }}
          initial={{ left: "0%", opacity: 0 }}
          animate={
            inView
              ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }
              : { left: "0%", opacity: 0 }
          }
          transition={{ duration: 1.8, delay: 0.4, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.4, delay: 2.2 }}
        className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full"
        style={{
          background: "rgba(99,102,241,0.12)",
          color: "#818cf8",
          border: "1px solid rgba(99,102,241,0.25)",
        }}
      >
        ⚡ 1m 23s supprimés
      </motion.div>
    </div>
  );
}

/* ── Step 03 — Subtitle + circular score ── */

function Step03() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const targetScore = 87;

  return (
    <div
      ref={ref}
      style={{
        background: "#07070a",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.06)",
        padding: 14,
      }}
    >
      <div className="flex items-center gap-3">
        {/* Mini video preview */}
        <div
          className="relative flex items-center justify-center"
          style={{
            flex: 1,
            height: 68,
            background: "linear-gradient(135deg, #1a1a2e, #0d0f1c)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          {/* Karaoke subtitle */}
          <div className="absolute left-2 right-2 bottom-2 text-center">
            <motion.div
              className="inline-flex gap-1 text-[11px] font-bold px-2 py-0.5 rounded"
              style={{ background: "rgba(0,0,0,0.6)", color: "#f0ede6" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {["JAPON,", "SHIBUYA"].map((w, i) => (
                <motion.span
                  key={w}
                  animate={inView ? { color: ["#f0ede6", ACCENT, "#f0ede6"] } : {}}
                  transition={{
                    duration: 1.2,
                    delay: 0.6 + i * 0.6,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                  }}
                >
                  {w}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Score circle */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: 68, height: 68 }}
        >
          <svg width="68" height="68" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="4"
            />
            <motion.circle
              cx="30"
              cy="30"
              r={radius}
              fill="none"
              stroke={ACCENT}
              strokeWidth="4"
              strokeLinecap="round"
              transform="rotate(-90 30 30)"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={
                inView
                  ? { strokeDashoffset: circumference * (1 - targetScore / 100) }
                  : { strokeDashoffset: circumference }
              }
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <span style={{ fontSize: 18, fontWeight: 800, color: "#ffffff" }}>
              87
            </span>
            <span style={{ fontSize: 8, color: ACCENT, marginTop: -2 }}>
              /100
            </span>
          </div>
        </div>
      </div>
      <div
        className="mt-2 text-[10px] uppercase tracking-widest flex items-center justify-between"
        style={{ color: "#6b7280", letterSpacing: "1.5px" }}
      >
        <span>Sous-titres karaoké</span>
        <span>Score viralité</span>
      </div>
    </div>
  );
}

export default function VlogyzFlow() {
  return (
    <div className="flex flex-col gap-4">
      <FlowCard step="01" title="Uploadez votre vidéo" accent={ACCENT} delay={0}>
        <Step01 />
      </FlowCard>
      <FlowCard step="02" title="IA transcrit & coupe" accent={ACCENT} delay={0.12}>
        <Step02 />
      </FlowCard>
      <FlowCard step="03" title="Sous-titres + score viralité" accent={ACCENT} delay={0.24}>
        <Step03 />
      </FlowCard>
    </div>
  );
}
