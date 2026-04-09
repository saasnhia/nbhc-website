"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate as motionAnimate,
} from "framer-motion";
import { FlowCard } from "./FlowCard";

const ACCENT = "#22c55e";

/* ── Step 01 — FEC import progress ── */

function Step01() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let p = 0;
    const timer = setInterval(() => {
      p += 5;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(() => setDone(true), 200);
      }
      setProgress(p);
    }, 28);
    return () => clearInterval(timer);
  }, [inView]);

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
      <div className="flex items-center gap-3 mb-3">
        {/* File icon */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: 30,
            height: 36,
            background: "rgba(34,197,94,0.1)",
            border: `1px solid ${ACCENT}40`,
            borderRadius: 4,
          }}
        >
          <span
            className="text-[8px] font-bold"
            style={{ color: ACCENT, letterSpacing: "0.5px" }}
          >
            FEC
          </span>
          <span
            className="absolute -top-[1px] -right-[1px]"
            style={{
              width: 8,
              height: 8,
              background: "#0d0d0f",
              borderLeft: `1px solid ${ACCENT}40`,
              borderBottom: `1px solid ${ACCENT}40`,
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-medium" style={{ color: "#e5e7eb" }}>
            FEC_2025.txt
          </div>
          <div className="text-[10px]" style={{ color: "#6b7280" }}>
            Analyse en cours...
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
            background: `linear-gradient(90deg, ${ACCENT}, #4ade80)`,
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
          ✓ 12 458 écritures importées
        </motion.div>
      )}
    </div>
  );
}

/* ── Step 02 — Anomalies list ── */

function Step02() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const rows = [
    { account: "401000", label: "Achat Lyreco", amount: "1 440,00 €", anomaly: false },
    { account: "512000", label: "Écriture orpheline", amount: "2 340,00 €", anomaly: true },
    { account: "445000", label: "TVA collectée", amount: "3 600,00 €", anomaly: false },
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
        Grand Livre — Analyse IA
      </div>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <motion.div
            key={r.account}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.2 }}
            className="flex items-center justify-between text-[11px] px-2 py-1.5 rounded"
            style={{
              background: r.anomaly
                ? "rgba(244,63,94,0.08)"
                : "rgba(255,255,255,0.02)",
              border: r.anomaly
                ? "1px solid rgba(244,63,94,0.25)"
                : "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="font-mono font-semibold"
                style={{ color: r.anomaly ? "#f87171" : "#9ca3af" }}
              >
                {r.account}
              </span>
              <span style={{ color: "#9ca3af" }}>{r.label}</span>
            </div>
            <span
              className="font-mono"
              style={{ color: r.anomaly ? "#f87171" : "#9ca3af" }}
            >
              {r.amount}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.4, delay: 1.2 }}
        className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full"
        style={{
          background: "rgba(244,63,94,0.12)",
          color: "#f87171",
          border: "1px solid rgba(244,63,94,0.25)",
        }}
      >
        ⚠ 3 anomalies détectées
      </motion.div>
    </div>
  );
}

/* ── Step 03 — TVA CA3 count-up + report button ── */

function Step03() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const amount = useMotionValue(0);
  const rounded = useTransform(amount, (latest) =>
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(latest)
  );
  const [display, setDisplay] = useState("0");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const unsub = rounded.on("change", (v) => setDisplay(v));
    const controls = motionAnimate(amount, 8036, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    // Progress bar
    let p = 0;
    const timer = setInterval(() => {
      p += 5;
      if (p >= 95) {
        p = 95;
        clearInterval(timer);
      }
      setProgress(p);
    }, 40);
    return () => {
      controls.stop();
      unsub();
      clearInterval(timer);
    };
  }, [inView, amount, rounded]);

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
      <div className="flex items-center justify-between mb-2">
        <div
          className="text-[10px] uppercase tracking-widest"
          style={{ color: "#6b7280", letterSpacing: "1.5px" }}
        >
          TVA CA3 — Pré-remplie
        </div>
        <div
          className="text-[9px] font-semibold px-1.5 py-0.5 rounded"
          style={{
            background: `${ACCENT}1A`,
            color: ACCENT,
            border: `1px solid ${ACCENT}33`,
          }}
        >
          MARS 2026
        </div>
      </div>
      <div
        className="font-bold"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: 26,
          color: "#ffffff",
          letterSpacing: "-0.8px",
          lineHeight: 1,
        }}
      >
        {display} €
      </div>
      <div className="mt-3">
        <div
          className="flex items-center justify-between text-[10px] mb-1"
          style={{ color: "#6b7280" }}
        >
          <span>Rapprochement bancaire</span>
          <span style={{ color: ACCENT }}>{progress}%</span>
        </div>
        <div
          className="relative overflow-hidden"
          style={{
            height: 3,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2,
          }}
        >
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: `${progress}%`,
              background: ACCENT,
              borderRadius: 2,
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 6 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.5, delay: 1.6 }}
        className="mt-3 w-full text-[11px] font-semibold py-1.5 rounded"
        style={{
          background: ACCENT,
          color: "#06100a",
          border: "none",
          cursor: "default",
        }}
      >
        Générer le rapport →
      </motion.button>
    </div>
  );
}

export default function WorthifastFlow() {
  return (
    <div className="flex flex-col gap-4">
      <FlowCard step="01" title="Importez le FEC" accent={ACCENT} delay={0}>
        <Step01 />
      </FlowCard>
      <FlowCard step="02" title="IA détecte les anomalies" accent={ACCENT} delay={0.12}>
        <Step02 />
      </FlowCard>
      <FlowCard step="03" title="Rapprochement & CA3" accent={ACCENT} delay={0.24}>
        <Step03 />
      </FlowCard>
    </div>
  );
}
