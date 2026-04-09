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

const ACCENT = "#5B5BD6";

/* ── Step 01 — Terminal with typewriter ── */

function Step01() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [typed, setTyped] = useState("");
  const [showResult, setShowResult] = useState(false);
  const target = "Rénovation cuisine 12m²";

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(timer);
        setTimeout(() => setShowResult(true), 400);
      }
    }, 55);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        background: "#07070a",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Terminal chrome */}
      <div
        className="flex items-center gap-1.5 px-3"
        style={{
          height: 22,
          background: "#0f0f14",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span className="block rounded-full" style={{ width: 8, height: 8, background: "#ff5f57" }} />
        <span className="block rounded-full" style={{ width: 8, height: 8, background: "#febc2e" }} />
        <span className="block rounded-full" style={{ width: 8, height: 8, background: "#28c840" }} />
      </div>
      {/* Body */}
      <div
        className="px-3.5 py-3 font-mono"
        style={{ fontSize: 11, lineHeight: 1.6, color: "#c7c9d1" }}
      >
        <div style={{ color: "#6b7280" }}>
          <span style={{ color: ACCENT }}>$</span> décrire votre prestation...
        </div>
        <div style={{ minHeight: 18 }}>
          <span style={{ color: "#e5e7eb", fontStyle: "italic" }}>{typed}</span>
          <span
            className="inline-block"
            style={{
              width: 6,
              height: 10,
              background: ACCENT,
              marginLeft: 2,
              verticalAlign: "middle",
              animation: "blink 1s infinite",
            }}
          />
        </div>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ color: "#4ade80", marginTop: 4 }}
          >
            ✓ Devis généré — 7 lignes, 16 596 € TTC
          </motion.div>
        )}
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Step 02 — Signature SVG draw ── */

function Step02() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

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
        Signature du client
      </div>
      <div
        className="relative"
        style={{
          background: "#ffffff",
          borderRadius: 6,
          height: 62,
          border: "1px dashed rgba(91,91,214,0.3)",
        }}
      >
        <svg
          viewBox="0 0 280 60"
          width="100%"
          height="100%"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <motion.path
            d="M20 40 C 35 10, 55 60, 75 30 S 110 15, 135 35 S 170 55, 195 25 S 235 45, 255 28"
            stroke="#1a1a2e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
      </div>
      <motion.div
        className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full"
        style={{
          background: "rgba(34,197,94,0.12)",
          color: "#4ade80",
          border: "1px solid rgba(34,197,94,0.25)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, delay: 1.5 }}
      >
        <span>●</span>
        Signé ✓
      </motion.div>
    </div>
  );
}

/* ── Step 03 — Stripe count-up ── */

function Step03() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const amount = useMotionValue(0);
  const rounded = useTransform(amount, (latest) =>
    new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(latest)
  );
  const [display, setDisplay] = useState("0,00");

  useEffect(() => {
    if (!inView) return;
    const unsub = rounded.on("change", (v) => setDisplay(v));
    const controls = motionAnimate(amount, 4978.8, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => {
      controls.stop();
      unsub();
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
          Acompte 30% — Stripe
        </div>
        <div
          className="flex items-center justify-center font-bold"
          style={{
            width: 20,
            height: 20,
            background: ACCENT,
            color: "white",
            borderRadius: 4,
            fontSize: 11,
            fontFamily: "var(--font-syne)",
          }}
        >
          S
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
      <motion.div
        className="mt-3 flex items-center gap-2 text-[11px]"
        style={{ color: "#4ade80" }}
        initial={{ opacity: 0, x: -8 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.5, delay: 1.6 }}
      >
        <span>✓</span>
        Reçu — Viré sur votre compte
      </motion.div>
    </div>
  );
}

export default function DevizlyFlow() {
  return (
    <div className="flex flex-col gap-4">
      <FlowCard step="01" title="Décrivez votre prestation" accent={ACCENT} delay={0}>
        <Step01 />
      </FlowCard>
      <FlowCard step="02" title="Envoyez, faites signer" accent={ACCENT} delay={0.12}>
        <Step02 />
      </FlowCard>
      <FlowCard step="03" title="Encaissez immédiatement" accent={ACCENT} delay={0.24}>
        <Step03 />
      </FlowCard>
    </div>
  );
}
