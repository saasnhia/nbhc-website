"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealWords } from "../hooks/useReveal";

gsap.registerPlugin(ScrollTrigger);

/* ─── Product data ─── */

const products = [
  {
    id: "vlogyz",
    badge: { label: "MVP live", type: "beta" as const },
    name: "Vlogyz",
    desc: "Montage vidéo IA français — alternative à CapCut. Pipeline complet : upload TUS, transcription Whisper, détection de fillers, sous-titres synchronisés (13 styles), B-Roll automatique, score de viralité, rendu Remotion.",
    stack: ["Next.js 16", "Groq Whisper", "Mistral", "Remotion", "FFmpeg", "Hetzner"],
    link: "vlogyz.vercel.app",
  },
  {
    id: "devizly",
    badge: { label: "Live", type: "live" as const },
    name: "Devizly",
    desc: "Générateur de devis IA pour artisans et freelances. L'utilisateur décrit sa prestation en langage naturel → devis conforme loi française → signature eIDAS → paiement acompte Stripe intégré.",
    stack: ["Next.js 14", "Mistral", "Stripe", "Supabase", "Resend", "Upstash"],
    link: "devizly.fr",
  },
  {
    id: "worthifast",
    badge: { label: "En développement", type: "dev" as const },
    name: "Worthifast",
    desc: "Automatisation des tâches comptables et d'audit pour cabinets experts. Import FEC/CSV/Excel, détection d'anomalies IA, rapports de révision, tableau de bord multi-missions. Cible : PME et cabinets 5–50 personnes.",
    stack: ["Next.js 16", "Mistral", "Supabase", "Stripe", "PostgreSQL"],
    link: "Bêta à venir",
  },
];

const badgeStyles: Record<string, React.CSSProperties> = {
  live: {
    background: "rgba(34,197,94,0.12)",
    color: "#4ade80",
    border: "1px solid rgba(34,197,94,0.2)",
  },
  beta: {
    background: "rgba(99,102,241,0.12)",
    color: "#818cf8",
    border: "1px solid rgba(99,102,241,0.2)",
  },
  dev: {
    background: "rgba(251,191,36,0.1)",
    color: "#fbbf24",
    border: "1px solid rgba(251,191,36,0.2)",
  },
};

/* ─── SVG Visuals ─── */

function VlogyzVisual() {
  return (
    <svg width="380" height="200" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 200 }}>
      <rect width="380" height="200" fill="#0a0a0f" />
      {/* Subtle grid pattern */}
      <defs>
        <pattern id="vz-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="none" />
          <rect width="1" height="1" x="0" y="0" fill="rgba(99,102,241,0.03)" />
        </pattern>
      </defs>
      <rect width="380" height="200" fill="url(#vz-grid)" />
      {/* Lecteur vidéo principal */}
      <rect x="16" y="12" width="192" height="112" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.35)" strokeWidth="1" />
      {/* Video thumbnail gradient */}
      <defs>
        <linearGradient id="vz-vid" x1="16" y1="12" x2="208" y2="124">
          <stop offset="0%" stopColor="rgba(99,102,241,0.08)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0.02)" />
        </linearGradient>
      </defs>
      <rect x="16" y="12" width="192" height="112" rx="8" fill="url(#vz-vid)" />
      {/* Diagonal lines */}
      <line x1="16" y1="12" x2="208" y2="124" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
      <line x1="208" y1="12" x2="16" y2="124" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
      {/* Play button */}
      <circle cx="112" cy="62" r="20" fill="rgba(99,102,241,0.25)" />
      <circle cx="112" cy="62" r="20" fill="none" stroke="#6366f1" strokeWidth="1.5" />
      <path d="M106 52 L106 72 L122 62 Z" fill="#6366f1" />
      {/* Badge IA */}
      <rect x="180" y="16" width="24" height="16" rx="4" fill="#6366f1" />
      <text x="192" y="27" textAnchor="middle" fontSize="8" fill="white" fontWeight="800">IA</text>
      {/* Timecode */}
      <text x="24" y="26" fontSize="8" fill="#6366f1" opacity="0.5" fontFamily="monospace">01:24 / 03:12</text>
      {/* Sous-titre animé */}
      <rect x="32" y="100" width="164" height="18" rx="9" fill="#1a1b2e" />
      <rect x="32" y="100" width="78" height="18" rx="9" fill="rgba(99,102,241,0.85)" />
      <text x="71" y="113" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">On autom</text>
      <text x="148" y="113" textAnchor="middle" fontSize="10" fill="#64668a">atise tout</text>
      {/* Curseur clignotant */}
      <rect x="110" y="102" width="1.5" height="12" rx="0.5" fill="#6366f1" opacity="0.8" />
      {/* Score viralité panel */}
      <rect x="218" y="12" width="148" height="112" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.2)" strokeWidth="0.5" />
      <text x="292" y="29" textAnchor="middle" fontSize="7" fill="#6366f1" opacity="0.5" letterSpacing="2" fontWeight="600">SCORE VIRALITÉ</text>
      {/* Score ring */}
      <circle cx="292" cy="64" r="26" fill="none" stroke="#151728" strokeWidth="5" />
      <circle cx="292" cy="64" r="26" fill="none" stroke="url(#vz-score-grad)" strokeWidth="5" strokeDasharray="142 164" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 292 64)" />
      <defs>
        <linearGradient id="vz-score-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <text x="292" y="61" textAnchor="middle" fontSize="22" fontWeight="800" fontFamily="Syne, sans-serif" fill="#e2e8f0">87</text>
      <text x="292" y="75" textAnchor="middle" fontSize="9" fill="#6366f1" opacity="0.6">/100</text>
      {/* Score breakdown */}
      <rect x="226" y="96" width="28" height="22" rx="4" fill="rgba(74,222,128,0.08)" />
      <text x="240" y="105" textAnchor="middle" fontSize="6" fill="#4ade80" opacity="0.7">HOOK</text>
      <text x="240" y="114" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4ade80">92</text>
      <rect x="258" y="96" width="28" height="22" rx="4" fill="rgba(251,191,36,0.08)" />
      <text x="272" y="105" textAnchor="middle" fontSize="6" fill="#fbbf24" opacity="0.7">PACE</text>
      <text x="272" y="114" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fbbf24">84</text>
      <rect x="290" y="96" width="28" height="22" rx="4" fill="rgba(96,165,250,0.08)" />
      <text x="304" y="105" textAnchor="middle" fontSize="6" fill="#60a5fa" opacity="0.7">CTA</text>
      <text x="304" y="114" textAnchor="middle" fontSize="9" fontWeight="700" fill="#60a5fa">78</text>
      <rect x="322" y="96" width="28" height="22" rx="4" fill="rgba(192,132,252,0.08)" />
      <text x="336" y="105" textAnchor="middle" fontSize="6" fill="#c084fc" opacity="0.7">CLAR</text>
      <text x="336" y="114" textAnchor="middle" fontSize="9" fontWeight="700" fill="#c084fc">91</text>
      {/* Timeline panel */}
      <rect x="16" y="132" width="350" height="56" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.12)" strokeWidth="0.5" />
      <text x="28" y="146" fontSize="7" fill="#6366f1" opacity="0.4" letterSpacing="1.5" fontWeight="600">TIMELINE — CUTS SILENCES &amp; FILLERS</text>
      {/* Track background */}
      <rect x="24" y="152" width="334" height="6" rx="3" fill="#151728" />
      {/* Green segments (kept) */}
      <rect x="24" y="152" width="58" height="6" rx="1" fill="#6366f1" />
      <rect x="96" y="152" width="76" height="6" rx="1" fill="#6366f1" />
      <rect x="190" y="152" width="96" height="6" rx="1" fill="#6366f1" />
      <rect x="304" y="152" width="54" height="6" rx="1" fill="#6366f1" />
      {/* Red segments (removed) */}
      <rect x="82" y="150" width="14" height="10" rx="2" fill="#f43f5e" opacity="0.6" />
      <rect x="172" y="150" width="18" height="10" rx="2" fill="#f43f5e" opacity="0.6" />
      <rect x="286" y="150" width="18" height="10" rx="2" fill="#f43f5e" opacity="0.6" />
      {/* Waveform audio */}
      {[24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,220,224,228,232,236,240,244,248,252,256,260,264,268,272,276,280,284,288,292,296,300,304,308,312,316,320,324,328,332,336,340,344,348,352,356].map((x, i) => {
        const h = [3,5,8,4,10,6,3,7,12,5,4,9,6,3,8,11,5,7,4,10,6,3,9,5,8,4,7,11,6,3,5,9,4,7,10,5,3,8,6,4,11,7,5,3,9,6,8,4,10,5,7,3,6,11,4,8,5,9,3,7,10,6,4,5,8,3,11,7,9,5,4,6,10,8,3,7,5,11,4,9,6,8,3,5][i];
        return <rect key={`wf-${i}`} x={x} y={176 - h} width="2" height={h} rx="1" fill="#6366f1" opacity="0.25" />;
      })}
      {/* Labels */}
      <text x="82" y="172" fontSize="6" fill="#f43f5e" opacity="0.5">silence</text>
      <text x="172" y="172" fontSize="6" fill="#f43f5e" opacity="0.5">filler</text>
      <text x="286" y="172" fontSize="6" fill="#f43f5e" opacity="0.5">-2.3s</text>
      {/* Playhead */}
      <rect x="210" y="148" width="2" height="16" rx="1" fill="#818cf8" />
      <circle cx="211" cy="148" r="3" fill="#818cf8" />
      {/* Watermark */}
      <text x="358" y="194" textAnchor="end" fontSize="8" fill="rgba(99,102,241,0.15)" fontFamily="Syne, sans-serif" fontWeight="700">Vlogyz.com</text>
    </svg>
  );
}

function DevizlyVisual() {
  return (
    <svg width="380" height="200" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 200 }}>
      <rect width="380" height="200" fill="#0d0d18" />
      {/* Document */}
      <rect x="60" y="20" width="260" height="160" rx="10" fill="#13131f" stroke="rgba(91,91,214,0.3)" strokeWidth="1" />
      {/* Header band */}
      <rect x="60" y="20" width="260" height="36" rx="10" fill="rgba(91,91,214,0.25)" />
      <rect x="60" y="42" width="260" height="14" rx="0" fill="rgba(91,91,214,0.25)" />
      <text x="80" y="44" fontSize="13" fontFamily="Syne, sans-serif" fontWeight="800" fill="#8b8bff">DEVIZLY</text>
      <text x="310" y="44" textAnchor="end" fontSize="9" fill="#5b5bd6" opacity="0.7">DEVIS #089</text>
      {/* Lignes prestation */}
      <rect x="80" y="70" width="110" height="4" rx="2" fill="#252535" />
      <rect x="240" y="70" width="60" height="4" rx="2" fill="rgba(91,91,214,0.5)" />
      <rect x="80" y="82" width="90" height="4" rx="2" fill="#252535" />
      <rect x="248" y="82" width="52" height="4" rx="2" fill="#252535" />
      <rect x="80" y="94" width="100" height="4" rx="2" fill="#252535" />
      <rect x="244" y="94" width="56" height="4" rx="2" fill="#252535" />
      {/* Séparateur */}
      <line x1="80" y1="108" x2="300" y2="108" stroke="#252535" strokeWidth="0.5" />
      {/* Total */}
      <text x="80" y="125" fontSize="9" fill="#6b6b8a">TOTAL HT</text>
      <text x="300" y="127" textAnchor="end" fontSize="18" fontWeight="800" fontFamily="Syne, sans-serif" fill="#7c7cf8">2 400 €</text>
      {/* Bouton signature */}
      <rect data-sign-btn x="80" y="140" width="220" height="28" rx="14" fill="rgba(91,91,214,0.15)" stroke="#5b5bd6" strokeWidth="0.5" />
      <text x="190" y="159" textAnchor="middle" fontSize="11" fill="#8b8bcc">✍  Signer électroniquement</text>
      {/* Badge statut */}
      <circle cx="312" cy="30" r="5" fill="#22c55e" />
    </svg>
  );
}

function WorthifastVisual() {
  return (
    <svg width="380" height="200" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 200 }}>
      <rect width="380" height="200" fill="#080d08" />
      {/* Subtle dot grid */}
      <defs>
        <pattern id="wf-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="rgba(0,200,150,0.04)" />
        </pattern>
      </defs>
      <rect width="380" height="200" fill="url(#wf-dots)" />
      {/* Header mission bar */}
      <rect x="14" y="10" width="352" height="30" rx="6" fill="rgba(0,200,150,0.04)" stroke="rgba(0,200,150,0.15)" strokeWidth="0.5" />
      {/* Folder icon */}
      <rect x="22" y="17" width="14" height="11" rx="2" fill="rgba(0,200,150,0.2)" />
      <rect x="22" y="15" width="8" height="4" rx="1" fill="rgba(0,200,150,0.3)" />
      <text x="42" y="29" fontSize="9" fontFamily="Syne, sans-serif" fill="#4ade80" fontWeight="600">Mission — Cabinet Dupont &amp; Associés</text>
      {/* Badge EN COURS */}
      <rect x="296" y="16" width="64" height="18" rx="9" fill="rgba(0,200,150,0.12)" stroke="rgba(0,200,150,0.3)" strokeWidth="0.5" />
      <circle cx="306" cy="25" r="3" fill="#00C896" />
      <text x="336" y="29" textAnchor="middle" fontSize="8" fill="#4ade80" fontWeight="600">EN COURS</text>
      {/* KPI Card - FEC importé */}
      <rect x="14" y="48" width="110" height="58" rx="8" fill="#0c140b" stroke="rgba(0,200,150,0.2)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="wf-fec-bg" x1="14" y1="48" x2="124" y2="106">
          <stop offset="0%" stopColor="rgba(0,200,150,0.06)" />
          <stop offset="100%" stopColor="rgba(0,200,150,0)" />
        </linearGradient>
      </defs>
      <rect x="14" y="48" width="110" height="58" rx="8" fill="url(#wf-fec-bg)" />
      <text x="69" y="64" textAnchor="middle" fontSize="7" fill="#4ade80" opacity="0.5" letterSpacing="1" fontWeight="600">FEC IMPORTÉ</text>
      {/* Upload icon */}
      <rect x="52" y="70" width="34" height="22" rx="4" fill="rgba(0,200,150,0.08)" />
      <path d="M65 86V76M60 80l5-5 5 5" stroke="#00C896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="69" y="101" textAnchor="middle" fontSize="8" fill="#00C896" opacity="0.6" fontWeight="500">1 247 lignes</text>
      {/* KPI Card - Anomalies */}
      <rect x="132" y="48" width="110" height="58" rx="8" fill="#140d08" stroke="rgba(249,115,22,0.2)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="wf-anom-bg" x1="132" y1="48" x2="242" y2="106">
          <stop offset="0%" stopColor="rgba(249,115,22,0.06)" />
          <stop offset="100%" stopColor="rgba(249,115,22,0)" />
        </linearGradient>
      </defs>
      <rect x="132" y="48" width="110" height="58" rx="8" fill="url(#wf-anom-bg)" />
      <text x="187" y="64" textAnchor="middle" fontSize="7" fill="#fb923c" opacity="0.5" letterSpacing="1" fontWeight="600">ANOMALIES</text>
      <text x="187" y="86" textAnchor="middle" fontSize="28" fontWeight="800" fontFamily="Syne, sans-serif" fill="#f97316">3</text>
      <text x="187" y="101" textAnchor="middle" fontSize="8" fill="#f97316" opacity="0.5">à vérifier</text>
      {/* KPI Card - Avancement */}
      <rect x="250" y="48" width="116" height="58" rx="8" fill="#0c1018" stroke="rgba(56,189,248,0.2)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="wf-prog-bg" x1="250" y1="48" x2="366" y2="106">
          <stop offset="0%" stopColor="rgba(56,189,248,0.06)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </linearGradient>
      </defs>
      <rect x="250" y="48" width="116" height="58" rx="8" fill="url(#wf-prog-bg)" />
      <text x="308" y="64" textAnchor="middle" fontSize="7" fill="#7dd3fc" opacity="0.5" letterSpacing="1" fontWeight="600">AVANCEMENT</text>
      <text x="308" y="86" textAnchor="middle" fontSize="28" fontWeight="800" fontFamily="Syne, sans-serif" fill="#38bdf8">94<tspan fontSize="14" fill="#7dd3fc">%</tspan></text>
      {/* Progress bar */}
      <rect x="262" y="96" width="92" height="5" rx="2.5" fill="#152030" />
      <rect x="262" y="96" width="86" height="5" rx="2.5" fill="url(#wf-prog-bar)" />
      <defs>
        <linearGradient id="wf-prog-bar" x1="262" y1="0" x2="348" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      {/* Anomalies list panel */}
      <rect x="14" y="114" width="352" height="76" rx="8" fill="#0a1009" stroke="rgba(0,200,150,0.08)" strokeWidth="0.5" />
      <text x="26" y="128" fontSize="7" fill="#4ade80" opacity="0.35" letterSpacing="1.5" fontWeight="600">ANOMALIES DÉTECTÉES</text>
      {/* Row 1 */}
      <rect x="22" y="134" width="3" height="14" rx="1.5" fill="#f97316" />
      <text x="32" y="144" fontSize="9" fill="#cbd5e1" fontFamily="DM Sans, sans-serif">401000 · Écriture orpheline</text>
      <text x="226" y="144" fontSize="8" fill="#64748b">12/03/2025</text>
      <text x="354" y="144" textAnchor="end" fontSize="9" fontWeight="600" fill="#f97316">2 340,00 €</text>
      {/* Row 2 */}
      <rect x="22" y="152" width="3" height="14" rx="1.5" fill="#f97316" />
      <text x="32" y="162" fontSize="9" fill="#cbd5e1">512000 · Déséquilibre journal OD</text>
      <text x="226" y="162" fontSize="8" fill="#64748b">08/03/2025</text>
      <text x="354" y="162" textAnchor="end" fontSize="9" fontWeight="600" fill="#f97316">0,02 €</text>
      {/* Row 3 - verified */}
      <rect x="22" y="170" width="3" height="14" rx="1.5" fill="#00C896" />
      <text x="32" y="180" fontSize="9" fill="#cbd5e1">445000 · TVA collectée</text>
      <text x="226" y="180" fontSize="8" fill="#64748b">Vérifiée</text>
      <rect x="326" y="173" width="28" height="14" rx="7" fill="rgba(0,200,150,0.1)" />
      <text x="340" y="183" textAnchor="middle" fontSize="8" fontWeight="600" fill="#00C896">OK</text>
      {/* Watermark */}
      <text x="356" y="196" textAnchor="end" fontSize="7" fill="rgba(0,200,150,0.1)" fontFamily="Syne, sans-serif" fontWeight="700">Worthifast</text>
    </svg>
  );
}

const visualMap: Record<string, () => React.ReactNode> = {
  vlogyz: () => <VlogyzVisual />,
  devizly: () => <DevizlyVisual />,
  worthifast: () => <WorthifastVisual />,
};

/* ─── ProductCard ─── */

function ProductCard({ p, isMobile }: { p: (typeof products)[number]; isMobile: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const svgTweensRef = useRef<gsap.core.Tween[]>([]);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = ((y / rect.height) - 0.5) * -16;

    gsap.to(el, { rotateX, rotateY, duration: 0.4, ease: "power2.out" });
    gsap.to(glow, {
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`,
      opacity: 1,
      duration: 0.3,
    });
  };

  const onMouseEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    svgTweensRef.current.forEach((t) => t.kill());
    svgTweensRef.current = [];

    if (p.id === "devizly") {
      const btn = el.querySelector("[data-sign-btn]");
      if (btn) svgTweensRef.current.push(gsap.to(btn, { opacity: 0.3, duration: 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" }));
    }
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });

    svgTweensRef.current.forEach((t) => t.kill());
    svgTweensRef.current = [];

    if (!el) return;
    if (p.id === "devizly") {
      const btn = el.querySelector("[data-sign-btn]");
      if (btn) gsap.to(btn, { opacity: 0.15, duration: 0.3 });
    }
  };

  return (
    <div
      ref={cardRef}
      data-cursor="card"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="flex flex-col overflow-hidden no-underline transition-all duration-300 group cursor-default"
      style={{
        width: isMobile ? "100%" : 380,
        minWidth: isMobile ? "unset" : 380,
        maxWidth: isMobile ? "100%" : 380,
        flexShrink: 0,
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* SVG Visual */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        {visualMap[p.id]()}
      </div>

      <div className="p-7 flex-1 flex flex-col relative">
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0 }}
        />
        <span
          className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-3.5 tracking-wide w-fit"
          style={badgeStyles[p.badge.type]}
        >
          {p.badge.label}
        </span>
        <div
          className="text-[22px] font-bold mb-2"
          style={{
            fontFamily: "var(--font-syne)",
            color: "var(--text)",
            letterSpacing: "-0.5px",
          }}
        >
          {p.name}
        </div>
        <p
          className="text-sm font-light mb-6 flex-1"
          style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
        >
          {p.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {p.stack.map((t) => (
            <span
              key={t}
              className="text-[11px] px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border-accent)",
                color: "var(--text-muted)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          className="flex items-center gap-1.5 text-[13px] font-medium pt-4 mt-auto"
          style={{
            color: "var(--gold)",
            borderTop: "1px solid var(--border)",
          }}
        >
          {p.link}
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <path
              d="M2 7h10M7 2l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Portfolio Section ─── */

export default function Portfolio() {
  const titleRef = useRevealWords("h2");
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const track = trackRef.current;
    const wrap = scrollWrapRef.current;
    const progress = progressRef.current;
    if (!track || !wrap || !progress) return;

    const totalWidth = track.scrollWidth;
    const viewportWidth = wrap.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth;

    if (scrollDistance <= 0) return;

    const st = ScrollTrigger.create({
      trigger: wrap,
      pin: true,
      scrub: 0.5,
      start: "top top",
      end: `+=${scrollDistance + 200}`,
      onUpdate: (self) => {
        gsap.set(track, { x: -self.progress * scrollDistance });
        gsap.set(progress, { scaleX: self.progress });
      },
    });

    return () => st.kill();
  }, [isMobile]);

  return (
    <section
      id="produits"
      ref={(el) => {
        sectionRef.current = el;
        (titleRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
          style={{ color: "var(--gold)" }}
        >
          <span
            className="block w-4 h-px"
            style={{ background: "var(--gold)" }}
          />
          Portfolio
        </div>
        <h2
          className="font-bold leading-tight mb-4"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(32px, 4vw, 52px)",
            letterSpacing: "-1.5px",
            color: "var(--text)",
          }}
        >
          Nos produits en production.
        </h2>
        <p
          className="text-[17px] font-light mb-16"
          style={{
            color: "var(--text-muted)",
            maxWidth: 500,
            lineHeight: 1.7,
          }}
        >
          Trois SaaS conçus et opérés par NBHC — chacun comme preuve concrète de
          notre capacité à livrer.
        </p>
      </div>

      {/* Horizontal scroll wrapper */}
      <div
        ref={scrollWrapRef}
        className="relative"
        style={{ overflow: isMobile ? "visible" : "hidden" }}
      >
        <div
          ref={trackRef}
          className={isMobile ? "flex flex-col gap-5 px-5 pb-16" : "px-10"}
          style={
            isMobile
              ? {}
              : { display: "flex", flexDirection: "row" as const, gap: 24, width: "max-content", paddingRight: 40 }
          }
        >
          {products.map((p) => (
            <ProductCard key={p.name} p={p} isMobile={isMobile} />
          ))}
        </div>

        {/* Progress bar */}
        {!isMobile && (
          <div
            ref={progressRef}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: 2,
              background: "var(--gold)",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        )}
      </div>
    </section>
  );
}
