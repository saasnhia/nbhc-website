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
    <svg width="380" height="240" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 240 }}>
      <rect width="380" height="240" fill="#0a0b14" />
      {/* Player zone — left */}
      <rect x="16" y="16" width="170" height="140" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.4)" strokeWidth="1" />
      <line x1="16" y1="16" x2="186" y2="156" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
      <line x1="186" y1="16" x2="16" y2="156" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
      {/* Play button */}
      <circle cx="101" cy="78" r="22" fill="rgba(99,102,241,0.2)" stroke="#6366f1" strokeWidth="1.5" />
      <path d="M94 68 L94 88 L114 78 Z" fill="#6366f1" />
      {/* Badge IA */}
      <rect x="160" y="20" width="22" height="14" rx="3" fill="#6366f1" />
      <text x="171" y="30" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">IA</text>
      {/* Sous-titre */}
      <rect x="24" y="138" width="154" height="14" rx="7" fill="#1a1b2e" />
      <rect x="24" y="138" width="70" height="14" rx="7" fill="#6366f1" opacity="0.9" />
      <text x="59" y="148" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">On autom</text>
      <text x="130" y="148" textAnchor="middle" fontSize="9" fill="#94a3b8">atise</text>
      {/* Score viralité — right */}
      <rect x="196" y="16" width="168" height="140" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.2)" strokeWidth="0.5" />
      <text x="280" y="34" textAnchor="middle" fontSize="8" fill="#6366f1" opacity="0.6" letterSpacing="1">SCORE VIRALITÉ</text>
      {/* Ring */}
      <circle cx="280" cy="82" r="32" fill="none" stroke="#1a1b2e" strokeWidth="7" />
      <circle cx="280" cy="82" r="32" fill="none" stroke="#6366f1" strokeWidth="7" strokeDasharray="140 201" strokeLinecap="round" transform="rotate(-90 280 82)" />
      <text x="280" y="77" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="Syne, sans-serif" fill="#e2e8f0">87</text>
      <text x="280" y="91" textAnchor="middle" fontSize="9" fill="#6366f1" opacity="0.7">/100</text>
      {/* 4 mini badges */}
      <rect x="202" y="120" width="36" height="18" rx="4" fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.3)" strokeWidth="0.5" />
      <text x="220" y="132" textAnchor="middle" fontSize="8" fill="#4ade80">H 92</text>
      <rect x="244" y="120" width="36" height="18" rx="4" fill="rgba(251,191,36,0.1)" stroke="rgba(251,191,36,0.3)" strokeWidth="0.5" />
      <text x="262" y="132" textAnchor="middle" fontSize="8" fill="#fbbf24">P 84</text>
      <rect x="286" y="120" width="36" height="18" rx="4" fill="rgba(249,115,22,0.1)" stroke="rgba(249,115,22,0.3)" strokeWidth="0.5" />
      <text x="304" y="132" textAnchor="middle" fontSize="8" fill="#f97316">C 78</text>
      <rect x="328" y="120" width="36" height="18" rx="4" fill="rgba(192,132,252,0.1)" stroke="rgba(192,132,252,0.3)" strokeWidth="0.5" />
      <text x="346" y="132" textAnchor="middle" fontSize="8" fill="#c084fc">CL 91</text>
      {/* Timeline */}
      <rect x="16" y="166" width="348" height="58" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
      <text x="28" y="180" fontSize="7" fill="#6366f1" opacity="0.5" letterSpacing="1">TIMELINE — CUTS &amp; FILLERS</text>
      <rect x="24" y="186" width="336" height="5" rx="2.5" fill="#1a1b2e" />
      <rect x="24" y="186" width="150" height="5" rx="2.5" fill="#6366f1" />
      <rect x="184" y="186" width="100" height="5" rx="2.5" fill="#6366f1" />
      <rect x="296" y="186" width="64" height="5" rx="2.5" fill="#6366f1" />
      <rect x="174" y="184" width="10" height="9" rx="2" fill="#f43f5e" opacity="0.8" />
      <rect x="285" y="184" width="10" height="9" rx="2" fill="#f43f5e" opacity="0.8" />
      <text x="174" y="210" fontSize="7" fill="#f43f5e" opacity="0.6">silence</text>
      <text x="285" y="210" fontSize="7" fill="#f43f5e" opacity="0.6">filler</text>
      {/* Watermark */}
      <text x="356" y="218" textAnchor="end" fontSize="8" fill="#6366f1" opacity="0.3">Vlogyz.com</text>
    </svg>
  );
}

function DevizlyVisual() {
  return (
    <svg width="380" height="240" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 240 }}>
      <rect width="380" height="240" fill="#0d0d18" />
      {/* Document */}
      <rect x="50" y="12" width="280" height="216" rx="10" fill="#13131f" stroke="rgba(91,91,214,0.35)" strokeWidth="1" />
      {/* Header violet */}
      <rect x="50" y="12" width="280" height="38" rx="10" fill="rgba(91,91,214,0.2)" />
      <rect x="50" y="36" width="280" height="14" rx="0" fill="rgba(91,91,214,0.2)" />
      <text x="70" y="36" fontSize="14" fontFamily="Syne, sans-serif" fontWeight="800" fill="#8b8bff">DEVIZLY</text>
      <text x="320" y="36" textAnchor="end" fontSize="9" fill="#5b5bd6" opacity="0.8">DEVIS #089</text>
      {/* Badge statut */}
      <circle cx="318" cy="22" r="5" fill="#22c55e" />
      {/* Lignes prestation */}
      <rect x="68" y="60" width="120" height="4" rx="2" fill="#252535" />
      <rect x="210" y="60" width="68" height="4" rx="2" fill="rgba(91,91,214,0.6)" />
      <rect x="68" y="72" width="100" height="4" rx="2" fill="#252535" />
      <rect x="218" y="72" width="60" height="4" rx="2" fill="#252535" />
      <rect x="68" y="84" width="110" height="4" rx="2" fill="#252535" />
      <rect x="214" y="84" width="64" height="4" rx="2" fill="#252535" />
      <line x1="68" y1="100" x2="312" y2="100" stroke="#252535" strokeWidth="0.5" />
      {/* TVA */}
      <text x="68" y="115" fontSize="9" fill="#6b6b8a">TVA 20%</text>
      <text x="312" y="115" textAnchor="end" fontSize="11" fill="#6b6b8a">480,00 €</text>
      <line x1="68" y1="122" x2="312" y2="122" stroke="#3a3a4e" strokeWidth="0.5" />
      {/* Total */}
      <text x="68" y="137" fontSize="9" fill="#8b8bcc" fontWeight="600">TOTAL TTC</text>
      <text x="312" y="139" textAnchor="end" fontSize="20" fontWeight="800" fontFamily="Syne, sans-serif" fill="#7c7cf8">2 880 €</text>
      {/* Bouton signature */}
      <rect data-sign-btn x="68" y="152" width="244" height="30" rx="15" fill="rgba(91,91,214,0.12)" stroke="#5b5bd6" strokeWidth="0.5" />
      <text x="190" y="171" textAnchor="middle" fontSize="11" fill="#8b8bcc">✍  Signer électroniquement</text>
      {/* Mentions légales */}
      <text x="190" y="200" textAnchor="middle" fontSize="7" fill="#3a3a4e">Facture conforme CGI art. 289 · TVA 20%</text>
      <text x="190" y="212" textAnchor="middle" fontSize="7" fill="#3a3a4e">Cachet électronique eIDAS inclus</text>
    </svg>
  );
}

function WorthifastVisual() {
  return (
    <svg width="380" height="240" viewBox="0 0 380 240" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 240 }}>
      <rect width="380" height="240" fill="#0b120a" />
      {/* Sidebar */}
      <rect x="0" y="0" width="80" height="240" rx="0" fill="#080f07" />
      <circle cx="20" cy="18" r="7" fill="#22c55e" opacity="0.9" />
      <text x="32" y="22" fontSize="10" fontFamily="Syne, sans-serif" fontWeight="800" fill="#22c55e">W</text>
      <text x="12" y="44" fontSize="8" fill="#4ade80" opacity="0.4">Dashboard</text>
      <text x="12" y="58" fontSize="8" fill="#94a3b8" opacity="0.5">Clients</text>
      <text x="12" y="72" fontSize="8" fill="#94a3b8" opacity="0.5">Factures</text>
      <rect x="0" y="80" width="80" height="1" fill="rgba(34,197,94,0.1)" />
      <text x="12" y="96" fontSize="7" fill="#4ade80" opacity="0.3">COMPTABILITÉ</text>
      <text x="12" y="110" fontSize="8" fill="#22c55e">FEC</text>
      <text x="12" y="124" fontSize="8" fill="#94a3b8" opacity="0.5">Banques</text>
      <text x="12" y="138" fontSize="8" fill="#94a3b8" opacity="0.5">TVA / CA3</text>
      <text x="12" y="152" fontSize="8" fill="#94a3b8" opacity="0.5">Agents IA</text>
      {/* Avatar */}
      <circle cx="20" cy="224" r="8" fill="rgba(34,197,94,0.2)" />
      <text x="20" y="228" textAnchor="middle" fontSize="8" fill="#22c55e" fontWeight="700">MF</text>
      <text x="36" y="222" fontSize="7" fill="#94a3b8">Marie F.</text>
      <text x="36" y="231" fontSize="6" fill="#4ade80" opacity="0.5">Plan Cabinet</text>
      {/* Main zone */}
      <rect x="84" y="0" width="296" height="240" fill="#0d150b" />
      <text x="96" y="16" fontSize="10" fontFamily="Syne, sans-serif" fontWeight="700" fill="#f0ede6">Tableau de bord</text>
      <text x="96" y="26" fontSize="8" fill="#4ade80" opacity="0.4">Mars 2026 — Cabinet Moreau &amp; Associés</text>
      {/* 4 KPI cards */}
      <rect x="88" y="32" width="64" height="44" rx="6" fill="#0f1a0e" stroke="rgba(34,197,94,0.2)" strokeWidth="0.5" />
      <text x="120" y="46" textAnchor="middle" fontSize="7" fill="#4ade80" opacity="0.5">CA MOIS</text>
      <text x="120" y="60" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="Syne, sans-serif" fill="#22c55e">47.3k</text>
      <text x="120" y="70" textAnchor="middle" fontSize="6" fill="#22c55e" opacity="0.5">+12.4%</text>
      <rect x="158" y="32" width="64" height="44" rx="6" fill="#1f0f0a" stroke="rgba(249,115,22,0.2)" strokeWidth="0.5" />
      <text x="190" y="46" textAnchor="middle" fontSize="7" fill="#fb923c" opacity="0.5">TVA DUE</text>
      <text x="190" y="60" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="Syne, sans-serif" fill="#f97316">8 036€</text>
      <text x="190" y="70" textAnchor="middle" fontSize="6" fill="#f97316" opacity="0.6">Éch. 20/04</text>
      <rect x="228" y="32" width="64" height="44" rx="6" fill="#0f111f" stroke="rgba(99,102,241,0.2)" strokeWidth="0.5" />
      <text x="260" y="46" textAnchor="middle" fontSize="7" fill="#818cf8" opacity="0.5">FACTURES</text>
      <text x="260" y="60" textAnchor="middle" fontSize="12" fontWeight="800" fontFamily="Syne, sans-serif" fill="#6366f1">14</text>
      <text x="260" y="70" textAnchor="middle" fontSize="6" fill="#f97316" opacity="0.6">3 en retard</text>
      <rect x="298" y="32" width="72" height="44" rx="6" fill="#0f1a0e" stroke="rgba(34,197,94,0.15)" strokeWidth="0.5" />
      <text x="334" y="46" textAnchor="middle" fontSize="7" fill="#4ade80" opacity="0.5">TRÉSORIE</text>
      <text x="334" y="60" textAnchor="middle" fontSize="10" fontWeight="800" fontFamily="Syne, sans-serif" fill="#22c55e">124k€</text>
      <text x="334" y="70" textAnchor="middle" fontSize="6" fill="#22c55e" opacity="0.5">Stable</text>
      {/* Dernières écritures */}
      <rect x="88" y="82" width="282" height="76" rx="6" fill="#0a0f09" stroke="rgba(34,197,94,0.1)" strokeWidth="0.5" />
      <text x="96" y="95" fontSize="8" fill="#4ade80" opacity="0.5">DERNIÈRES ÉCRITURES</text>
      <text x="96" y="107" fontSize="7" fill="#4ade80" opacity="0.3">DATE</text>
      <text x="124" y="107" fontSize="7" fill="#4ade80" opacity="0.3">LIBELLÉ</text>
      <text x="270" y="107" fontSize="7" fill="#4ade80" opacity="0.3">DÉBIT</text>
      <text x="314" y="107" fontSize="7" fill="#4ade80" opacity="0.3">CRÉDIT</text>
      <text x="96" y="119" fontSize="7" fill="#64748b">22/03</text>
      <text x="124" y="119" fontSize="7" fill="#94a3b8">Achat Lyreco</text>
      <text x="270" y="119" fontSize="7" fill="#f97316">1 440</text>
      <text x="314" y="119" fontSize="7" fill="#64748b">—</text>
      <text x="96" y="131" fontSize="7" fill="#64748b">21/03</text>
      <text x="124" y="131" fontSize="7" fill="#94a3b8">Honoraires SAS Dupont</text>
      <text x="270" y="131" fontSize="7" fill="#64748b">—</text>
      <text x="314" y="131" fontSize="7" fill="#22c55e">3 600</text>
      <text x="96" y="143" fontSize="7" fill="#64748b">20/03</text>
      <text x="124" y="143" fontSize="7" fill="#94a3b8">Loyer bureau</text>
      <text x="270" y="143" fontSize="7" fill="#f97316">2 200</text>
      <text x="314" y="143" fontSize="7" fill="#64748b">—</text>
      <text x="190" y="152" textAnchor="middle" fontSize="6" fill="#22c55e" opacity="0.4">6 écritures · Solde équilibré ✓</text>
      {/* Alertes */}
      <rect x="88" y="162" width="282" height="64" rx="6" fill="#0a0f09" stroke="rgba(34,197,94,0.1)" strokeWidth="0.5" />
      <text x="96" y="175" fontSize="8" fill="#4ade80" opacity="0.5">ALERTES</text>
      <rect x="96" y="180" width="3" height="12" rx="1" fill="#f97316" />
      <text x="104" y="190" fontSize="7" fill="#94a3b8">TVA CA3 à déposer — Échéance 20 avril</text>
      <rect x="96" y="196" width="3" height="12" rx="1" fill="#f97316" />
      <text x="104" y="206" fontSize="7" fill="#94a3b8">3 factures &gt; 60j — Relance auto disponible</text>
      <rect x="96" y="212" width="3" height="12" rx="1" fill="#22c55e" />
      <text x="104" y="222" fontSize="7" fill="#94a3b8">12 tx non rapprochés — Suggestion IA dispo</text>
      {/* Watermark */}
      <text x="357" y="232" textAnchor="end" fontSize="7" fill="#22c55e" opacity="0.3">Worthifast</text>
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
      <div className="relative overflow-hidden" style={{ height: 240 }}>
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
