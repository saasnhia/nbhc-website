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
    <svg width="380" height="260" viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 260 }}>
      <rect width="380" height="260" fill="#0a0a0f" />
      {/* Border */}
      <rect x="0.5" y="0.5" width="379" height="259" rx="11" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="1" />
      {/* Header bar */}
      <rect x="12" y="10" width="356" height="24" rx="6" fill="#0d0f1c" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
      <text x="22" y="26" fontSize="9" fill="#6366f1" opacity="0.6" fontFamily="monospace">01:24 / 01:32</text>
      <rect x="320" y="14" width="28" height="16" rx="4" fill="#6366f1" />
      <text x="334" y="25" textAnchor="middle" fontSize="9" fill="white" fontWeight="800">IA</text>
      <text x="290" y="26" textAnchor="end" fontSize="8" fill="#818cf8" opacity="0.4">Montage auto</text>
      {/* Player zone — left 60% */}
      <rect x="12" y="40" width="216" height="130" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
      <defs>
        <linearGradient id="vz-vid2" x1="12" y1="40" x2="228" y2="170">
          <stop offset="0%" stopColor="rgba(99,102,241,0.06)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0.01)" />
        </linearGradient>
      </defs>
      <rect x="12" y="40" width="216" height="130" rx="8" fill="url(#vz-vid2)" />
      {/* Diagonal cross */}
      <line x1="12" y1="40" x2="228" y2="170" stroke="rgba(99,102,241,0.04)" strokeWidth="1" />
      <line x1="228" y1="40" x2="12" y2="170" stroke="rgba(99,102,241,0.04)" strokeWidth="1" />
      {/* Play button */}
      <circle cx="120" cy="95" r="24" fill="rgba(99,102,241,0.2)" />
      <circle cx="120" cy="95" r="24" fill="none" stroke="#6366f1" strokeWidth="1.5" />
      <path d="M113 83 L113 107 L133 95 Z" fill="white" opacity="0.9" />
      {/* Subtitle bar */}
      <rect x="26" y="142" width="188" height="20" rx="10" fill="#12132a" />
      <rect x="26" y="142" width="90" height="20" rx="10" fill="rgba(99,102,241,0.85)" />
      <text x="71" y="156" textAnchor="middle" fontSize="11" fill="white" fontWeight="700">On autom</text>
      <text x="158" y="156" textAnchor="middle" fontSize="11" fill="#64668a">atise tout</text>
      <rect x="116" y="144" width="1.5" height="14" rx="0.75" fill="white" opacity="0.7" />
      {/* Score viralité — right 40% */}
      <rect x="236" y="40" width="132" height="130" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.18)" strokeWidth="0.5" />
      <text x="302" y="58" textAnchor="middle" fontSize="8" fill="#6366f1" opacity="0.5" letterSpacing="2" fontWeight="600">SCORE VIRALITÉ</text>
      {/* Ring */}
      <circle cx="302" cy="92" r="28" fill="none" stroke="#151728" strokeWidth="6" />
      <defs>
        <linearGradient id="vz-ring2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <circle cx="302" cy="92" r="28" fill="none" stroke="url(#vz-ring2)" strokeWidth="6" strokeDasharray="153 176" strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 302 92)" />
      <text x="302" y="89" textAnchor="middle" fontSize="24" fontWeight="800" fontFamily="Syne, sans-serif" fill="#e2e8f0">87</text>
      <text x="302" y="104" textAnchor="middle" fontSize="10" fill="#6366f1" opacity="0.6">/100</text>
      {/* Breakdown mini-badges */}
      <rect x="244" y="126" width="30" height="24" rx="5" fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.2)" strokeWidth="0.5" />
      <text x="259" y="136" textAnchor="middle" fontSize="7" fill="#4ade80" opacity="0.8">HOOK</text>
      <text x="259" y="146" textAnchor="middle" fontSize="10" fontWeight="700" fill="#4ade80">92</text>
      <rect x="278" y="126" width="30" height="24" rx="5" fill="rgba(96,165,250,0.1)" stroke="rgba(96,165,250,0.2)" strokeWidth="0.5" />
      <text x="293" y="136" textAnchor="middle" fontSize="7" fill="#60a5fa" opacity="0.8">PACE</text>
      <text x="293" y="146" textAnchor="middle" fontSize="10" fontWeight="700" fill="#60a5fa">84</text>
      <rect x="312" y="126" width="26" height="24" rx="5" fill="rgba(251,146,36,0.1)" stroke="rgba(251,146,36,0.2)" strokeWidth="0.5" />
      <text x="325" y="136" textAnchor="middle" fontSize="7" fill="#fb923c" opacity="0.8">CTA</text>
      <text x="325" y="146" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fb923c">78</text>
      <rect x="342" y="126" width="26" height="24" rx="5" fill="rgba(192,132,252,0.1)" stroke="rgba(192,132,252,0.2)" strokeWidth="0.5" />
      <text x="355" y="136" textAnchor="middle" fontSize="7" fill="#c084fc" opacity="0.8">CLAR</text>
      <text x="355" y="146" textAnchor="middle" fontSize="10" fontWeight="700" fill="#c084fc">91</text>
      {/* Timeline panel */}
      <rect x="12" y="178" width="356" height="70" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.1)" strokeWidth="0.5" />
      <text x="24" y="194" fontSize="8" fill="#6366f1" opacity="0.45" letterSpacing="1.5" fontWeight="600">TIMELINE — CUTS SILENCES &amp; FILLERS</text>
      {/* Track */}
      <rect x="20" y="202" width="340" height="8" rx="4" fill="#151728" />
      {/* Kept segments (indigo) */}
      <rect x="20" y="202" width="62" height="8" rx="2" fill="#6366f1" />
      <rect x="98" y="202" width="82" height="8" rx="2" fill="#6366f1" />
      <rect x="200" y="202" width="100" height="8" rx="2" fill="#6366f1" />
      <rect x="318" y="202" width="42" height="8" rx="2" fill="#6366f1" />
      {/* Cut segments (red) */}
      <rect x="82" y="200" width="16" height="12" rx="3" fill="#f43f5e" opacity="0.55" />
      <rect x="180" y="200" width="20" height="12" rx="3" fill="#f43f5e" opacity="0.55" />
      <rect x="300" y="200" width="18" height="12" rx="3" fill="#f43f5e" opacity="0.55" />
      {/* Cut labels */}
      <text x="84" y="224" fontSize="7" fill="#f43f5e" opacity="0.6">silence</text>
      <text x="182" y="224" fontSize="7" fill="#f43f5e" opacity="0.6">filler</text>
      <text x="300" y="224" fontSize="7" fill="#f43f5e" opacity="0.6">-2.3s</text>
      {/* Waveform */}
      {[20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,220,224,228,232,236,240,244,248,252,256,260,264,268,272,276,280,284,288,292,296,300,304,308,312,316,320,324,328,332,336,340,344,348,352,356].map((x, i) => {
        const h = [3,6,10,5,12,7,4,8,14,6,5,11,7,4,9,13,6,8,5,12,7,4,10,6,9,5,8,13,7,4,6,11,5,8,12,6,4,9,7,5,13,8,6,4,11,7,9,5,12,6,8,4,7,13,5,9,6,11,4,8,12,7,5,6,10,4,13,8,11,6,5,7,12,9,4,8,6,13,5,11,7,10,4,6][i];
        return <rect key={`wf-${i}`} x={x} y={240 - h} width="2.5" height={h} rx="1" fill="#6366f1" opacity="0.2" />;
      })}
      {/* Playhead */}
      <rect x="220" y="198" width="2" height="20" rx="1" fill="#a78bfa" />
      <circle cx="221" cy="198" r="3.5" fill="#a78bfa" />
      {/* Watermark */}
      <text x="360" y="254" textAnchor="end" fontSize="9" fill="rgba(99,102,241,0.4)" fontFamily="Syne, sans-serif" fontWeight="700">Vlogyz.com</text>
    </svg>
  );
}

function DevizlyVisual() {
  return (
    <svg width="380" height="260" viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 260 }}>
      <rect width="380" height="260" fill="#0d0d18" />
      {/* Document */}
      <rect x="40" y="16" width="300" height="228" rx="10" fill="#13131f" stroke="rgba(91,91,214,0.3)" strokeWidth="1" />
      {/* Header band */}
      <rect x="40" y="16" width="300" height="40" rx="10" fill="rgba(91,91,214,0.25)" />
      <rect x="40" y="42" width="300" height="14" rx="0" fill="rgba(91,91,214,0.25)" />
      <text x="60" y="44" fontSize="14" fontFamily="Syne, sans-serif" fontWeight="800" fill="#8b8bff">DEVIZLY</text>
      <text x="330" y="44" textAnchor="end" fontSize="10" fill="#5b5bd6" opacity="0.7">DEVIS #089</text>
      {/* Badge statut */}
      <circle cx="332" cy="28" r="6" fill="#22c55e" />
      {/* Lignes prestation */}
      <rect x="60" y="72" width="130" height="5" rx="2.5" fill="#252535" />
      <rect x="250" y="72" width="70" height="5" rx="2.5" fill="rgba(91,91,214,0.5)" />
      <rect x="60" y="86" width="100" height="5" rx="2.5" fill="#252535" />
      <rect x="258" y="86" width="62" height="5" rx="2.5" fill="#252535" />
      <rect x="60" y="100" width="120" height="5" rx="2.5" fill="#252535" />
      <rect x="254" y="100" width="66" height="5" rx="2.5" fill="#252535" />
      <rect x="60" y="114" width="80" height="5" rx="2.5" fill="#252535" />
      <rect x="262" y="114" width="58" height="5" rx="2.5" fill="#252535" />
      {/* Séparateur */}
      <line x1="60" y1="132" x2="320" y2="132" stroke="#252535" strokeWidth="0.5" />
      {/* TVA */}
      <text x="60" y="150" fontSize="10" fill="#4b4b6a">TVA 20%</text>
      <text x="320" y="150" textAnchor="end" fontSize="12" fontWeight="600" fill="#5b5bd6">480,00 €</text>
      {/* Total */}
      <text x="60" y="172" fontSize="10" fill="#6b6b8a">TOTAL TTC</text>
      <text x="320" y="174" textAnchor="end" fontSize="22" fontWeight="800" fontFamily="Syne, sans-serif" fill="#7c7cf8">2 880 €</text>
      {/* Séparateur */}
      <line x1="60" y1="184" x2="320" y2="184" stroke="#252535" strokeWidth="0.5" />
      {/* Bouton signature */}
      <rect data-sign-btn x="60" y="196" width="260" height="34" rx="17" fill="rgba(91,91,214,0.15)" stroke="#5b5bd6" strokeWidth="0.5" />
      <text x="190" y="218" textAnchor="middle" fontSize="13" fill="#8b8bcc">✍  Signer électroniquement</text>
    </svg>
  );
}

function WorthifastVisual() {
  return (
    <svg width="380" height="260" viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 260 }}>
      <rect width="380" height="260" fill="#0a1a0a" />
      {/* Border */}
      <rect x="0.5" y="0.5" width="379" height="259" rx="11" fill="none" stroke="rgba(0,200,150,0.1)" strokeWidth="1" />
      {/* Dot grid */}
      <defs>
        <pattern id="wf-dots2" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.5" fill="rgba(0,200,150,0.035)" />
        </pattern>
      </defs>
      <rect width="380" height="260" fill="url(#wf-dots2)" />
      {/* Header mission bar */}
      <rect x="12" y="10" width="356" height="32" rx="7" fill="rgba(0,200,150,0.04)" stroke="rgba(0,200,150,0.15)" strokeWidth="0.5" />
      {/* Folder icon */}
      <rect x="20" y="18" width="16" height="12" rx="2.5" fill="rgba(0,200,150,0.2)" />
      <rect x="20" y="16" width="9" height="5" rx="1.5" fill="rgba(0,200,150,0.3)" />
      <text x="42" y="31" fontSize="10" fontFamily="Syne, sans-serif" fill="#4ade80" fontWeight="600">Mission — Cabinet Dupont &amp; Associés</text>
      {/* Badge EN COURS */}
      <rect x="292" y="16" width="70" height="20" rx="10" fill="rgba(0,200,150,0.12)" stroke="rgba(0,200,150,0.3)" strokeWidth="0.5" />
      <circle cx="304" cy="26" r="3.5" fill="#00C896" />
      <text x="338" y="30" textAnchor="middle" fontSize="9" fill="#4ade80" fontWeight="600">EN COURS</text>
      {/* KPI Card - FEC importé */}
      <rect x="12" y="52" width="114" height="72" rx="8" fill="#0c140b" stroke="rgba(0,200,150,0.2)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="wf-fec2" x1="12" y1="52" x2="126" y2="124">
          <stop offset="0%" stopColor="rgba(0,200,150,0.06)" />
          <stop offset="100%" stopColor="rgba(0,200,150,0)" />
        </linearGradient>
      </defs>
      <rect x="12" y="52" width="114" height="72" rx="8" fill="url(#wf-fec2)" />
      <text x="69" y="70" textAnchor="middle" fontSize="8" fill="#4ade80" opacity="0.5" letterSpacing="1.5" fontWeight="600">FEC IMPORTÉ</text>
      <text x="69" y="100" textAnchor="middle" fontSize="26" fontWeight="800" fontFamily="Syne, sans-serif" fill="#22c55e">FEC</text>
      <text x="69" y="116" textAnchor="middle" fontSize="9" fill="#00C896" opacity="0.55" fontWeight="500">1 247 lignes</text>
      {/* KPI Card - Anomalies */}
      <rect x="134" y="52" width="114" height="72" rx="8" fill="#140d08" stroke="rgba(249,115,22,0.2)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="wf-anom2" x1="134" y1="52" x2="248" y2="124">
          <stop offset="0%" stopColor="rgba(249,115,22,0.06)" />
          <stop offset="100%" stopColor="rgba(249,115,22,0)" />
        </linearGradient>
      </defs>
      <rect x="134" y="52" width="114" height="72" rx="8" fill="url(#wf-anom2)" />
      <text x="191" y="70" textAnchor="middle" fontSize="8" fill="#fb923c" opacity="0.5" letterSpacing="1.5" fontWeight="600">ANOMALIES</text>
      <text x="191" y="102" textAnchor="middle" fontSize="32" fontWeight="800" fontFamily="Syne, sans-serif" fill="#f97316">3</text>
      <text x="191" y="118" textAnchor="middle" fontSize="9" fill="#f97316" opacity="0.5">à vérifier</text>
      {/* KPI Card - Avancement */}
      <rect x="256" y="52" width="112" height="72" rx="8" fill="#0c1018" stroke="rgba(56,189,248,0.2)" strokeWidth="0.5" />
      <defs>
        <linearGradient id="wf-prog2" x1="256" y1="52" x2="368" y2="124">
          <stop offset="0%" stopColor="rgba(56,189,248,0.06)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </linearGradient>
      </defs>
      <rect x="256" y="52" width="112" height="72" rx="8" fill="url(#wf-prog2)" />
      <text x="312" y="70" textAnchor="middle" fontSize="8" fill="#7dd3fc" opacity="0.5" letterSpacing="1.5" fontWeight="600">AVANCEMENT</text>
      <text x="312" y="100" textAnchor="middle" fontSize="32" fontWeight="800" fontFamily="Syne, sans-serif" fill="#38bdf8">94<tspan fontSize="16" fill="#7dd3fc">%</tspan></text>
      {/* Progress bar */}
      <rect x="268" y="110" width="88" height="6" rx="3" fill="#152030" />
      <defs>
        <linearGradient id="wf-pbar2" x1="268" y1="0" x2="356" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect x="268" y="110" width="82" height="6" rx="3" fill="url(#wf-pbar2)" />
      {/* Anomalies list panel */}
      <rect x="12" y="134" width="356" height="112" rx="8" fill="#0a1009" stroke="rgba(0,200,150,0.08)" strokeWidth="0.5" />
      <text x="24" y="152" fontSize="8" fill="#4ade80" opacity="0.4" letterSpacing="2" fontWeight="600">ANOMALIES DÉTECTÉES</text>
      {/* Column headers */}
      <text x="32" y="168" fontSize="7" fill="#4b5563" fontWeight="600">COMPTE</text>
      <text x="104" y="168" fontSize="7" fill="#4b5563" fontWeight="600">DESCRIPTION</text>
      <text x="246" y="168" fontSize="7" fill="#4b5563" fontWeight="600">DATE</text>
      <text x="316" y="168" fontSize="7" fill="#4b5563" fontWeight="600">MONTANT</text>
      <line x1="24" y1="172" x2="356" y2="172" stroke="rgba(0,200,150,0.06)" strokeWidth="0.5" />
      {/* Row 1 */}
      <rect x="22" y="178" width="3" height="18" rx="1.5" fill="#f43f5e" />
      <text x="32" y="191" fontSize="10" fill="#e2e8f0" fontWeight="600">401000</text>
      <text x="104" y="191" fontSize="10" fill="#94a3b8">Écriture orpheline</text>
      <text x="246" y="191" fontSize="9" fill="#64748b">12/03/2025</text>
      <text x="354" y="191" textAnchor="end" fontSize="10" fontWeight="600" fill="#f43f5e">2 340,00 €</text>
      {/* Row 2 */}
      <rect x="22" y="200" width="3" height="18" rx="1.5" fill="#f97316" />
      <text x="32" y="213" fontSize="10" fill="#e2e8f0" fontWeight="600">512000</text>
      <text x="104" y="213" fontSize="10" fill="#94a3b8">Déséquilibre journal OD</text>
      <text x="246" y="213" fontSize="9" fill="#64748b">08/03/2025</text>
      <text x="354" y="213" textAnchor="end" fontSize="10" fontWeight="600" fill="#f97316">0,02 €</text>
      {/* Row 3 */}
      <rect x="22" y="222" width="3" height="18" rx="1.5" fill="#00C896" />
      <text x="32" y="235" fontSize="10" fill="#e2e8f0" fontWeight="600">445000</text>
      <text x="104" y="235" fontSize="10" fill="#94a3b8">TVA collectée</text>
      <text x="246" y="235" fontSize="9" fill="#64748b">Vérifiée</text>
      <rect x="326" y="226" width="32" height="16" rx="8" fill="rgba(0,200,150,0.12)" stroke="rgba(0,200,150,0.25)" strokeWidth="0.5" />
      <text x="342" y="237" textAnchor="middle" fontSize="9" fontWeight="600" fill="#00C896">OK</text>
      {/* Watermark */}
      <text x="360" y="254" textAnchor="end" fontSize="9" fill="rgba(0,200,150,0.4)" fontFamily="Syne, sans-serif" fontWeight="700">Worthifast</text>
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
      <div className="relative overflow-hidden" style={{ height: 260 }}>
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
