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
      <rect width="380" height="200" fill="#0a0b14" />
      {/* Lecteur vidéo */}
      <rect x="20" y="16" width="180" height="108" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.4)" strokeWidth="1" />
      <line x1="20" y1="16" x2="200" y2="124" stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
      <line x1="200" y1="16" x2="20" y2="124" stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
      <circle cx="110" cy="70" r="18" fill="rgba(99,102,241,0.2)" stroke="#6366f1" strokeWidth="1" />
      <path d="M104 62 L104 78 L120 70 Z" fill="#6366f1" />
      <rect x="178" y="20" width="20" height="14" rx="3" fill="#6366f1" />
      <text x="188" y="30" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">IA</text>
      {/* Sous-titre stylisé */}
      <rect x="30" y="102" width="160" height="14" rx="7" fill="#1a1b2e" />
      <rect x="30" y="102" width="72" height="14" rx="7" fill="#6366f1" opacity="0.85" />
      <text x="66" y="112" textAnchor="middle" fontSize="9" fill="white" fontWeight="600">On autom...</text>
      <text x="145" y="112" textAnchor="middle" fontSize="9" fill="#94a3b8">atise</text>
      {/* Score viralité */}
      <rect x="212" y="16" width="152" height="108" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.2)" strokeWidth="0.5" />
      <text x="288" y="34" textAnchor="middle" fontSize="8" fill="#6366f1" opacity="0.6" letterSpacing="1">SCORE VIRALITÉ</text>
      <circle cx="288" cy="72" r="28" fill="none" stroke="#1a1b2e" strokeWidth="6" />
      <circle cx="288" cy="72" r="28" fill="none" stroke="#6366f1" strokeWidth="6" strokeDasharray="123 176" strokeDashoffset="31" strokeLinecap="round" transform="rotate(-90 288 72)" />
      <text x="288" y="68" textAnchor="middle" fontSize="18" fontWeight="800" fontFamily="Syne, sans-serif" fill="#e2e8f0">87</text>
      <text x="288" y="82" textAnchor="middle" fontSize="9" fill="#6366f1" opacity="0.7">/100</text>
      <text x="220" y="104" fontSize="8" fill="#4ade80">Hook 92</text>
      <text x="256" y="104" fontSize="8" fill="#fbbf24">Pace 84</text>
      <text x="292" y="104" fontSize="8" fill="#60a5fa">CTA 78</text>
      <text x="328" y="104" fontSize="8" fill="#c084fc">Clar 91</text>
      {/* Timeline cuts */}
      <rect x="20" y="136" width="344" height="52" rx="8" fill="#0d0f1c" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
      <text x="32" y="152" fontSize="8" fill="#6366f1" opacity="0.5">TIMELINE — CUTS SILENCES &amp; FILLERS</text>
      <rect x="28" y="158" width="328" height="6" rx="3" fill="#1a1b2e" />
      <rect x="28" y="158" width="60" height="6" rx="1" fill="#6366f1" />
      <rect x="100" y="158" width="80" height="6" rx="1" fill="#6366f1" />
      <rect x="196" y="158" width="100" height="6" rx="1" fill="#6366f1" />
      <rect x="310" y="158" width="46" height="6" rx="1" fill="#6366f1" />
      <rect x="88" y="156" width="12" height="10" rx="2" fill="#f43f5e" opacity="0.7" />
      <rect x="180" y="156" width="16" height="10" rx="2" fill="#f43f5e" opacity="0.7" />
      <rect x="296" y="156" width="14" height="10" rx="2" fill="#f43f5e" opacity="0.7" />
      <text x="88" y="176" fontSize="7" fill="#f43f5e" opacity="0.6">silence</text>
      <text x="178" y="176" fontSize="7" fill="#f43f5e" opacity="0.6">filler</text>
      <text x="295" y="176" fontSize="7" fill="#f43f5e" opacity="0.6">-2.3s</text>
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
      <rect width="380" height="200" fill="#0b110a" />
      {/* Header mission */}
      <rect x="16" y="14" width="348" height="28" rx="6" fill="rgba(34,197,94,0.06)" stroke="rgba(34,197,94,0.15)" strokeWidth="0.5" />
      <rect x="24" y="20" width="14" height="10" rx="2" fill="#22c55e" opacity="0.4" />
      <text x="44" y="30" fontSize="9" fontFamily="Syne, sans-serif" fill="#4ade80" fontWeight="600">Mission — Cabinet Dupont &amp; Associés</text>
      <rect x="306" y="19" width="52" height="14" rx="7" fill="rgba(34,197,94,0.15)" />
      <text x="332" y="29" textAnchor="middle" fontSize="8" fill="#4ade80">● EN COURS</text>
      {/* KPI Card - FEC */}
      <rect x="16" y="52" width="106" height="60" rx="8" fill="#0f1a0e" stroke="rgba(34,197,94,0.25)" strokeWidth="0.5" />
      <text x="69" y="70" textAnchor="middle" fontSize="8" fill="#4ade80" opacity="0.6">FEC IMPORTÉ</text>
      <text x="69" y="92" textAnchor="middle" fontSize="22" fontWeight="800" fontFamily="Syne, sans-serif" fill="#22c55e">FEC</text>
      <text x="69" y="106" textAnchor="middle" fontSize="8" fill="#22c55e" opacity="0.5">1 247 lignes</text>
      {/* KPI Card - Anomalies */}
      <rect x="130" y="52" width="106" height="60" rx="8" fill="#1a0f0a" stroke="rgba(249,115,22,0.25)" strokeWidth="0.5" />
      <text x="183" y="70" textAnchor="middle" fontSize="8" fill="#fb923c" opacity="0.6">ANOMALIES</text>
      <text x="183" y="92" textAnchor="middle" fontSize="28" fontWeight="800" fontFamily="Syne, sans-serif" fill="#f97316">3</text>
      <text x="183" y="106" textAnchor="middle" fontSize="8" fill="#f97316" opacity="0.5">à vérifier</text>
      {/* KPI Card - Avancement */}
      <rect x="244" y="52" width="120" height="60" rx="8" fill="#0f161f" stroke="rgba(56,189,248,0.25)" strokeWidth="0.5" />
      <text x="304" y="70" textAnchor="middle" fontSize="8" fill="#7dd3fc" opacity="0.6">AVANCEMENT</text>
      <text x="304" y="92" textAnchor="middle" fontSize="28" fontWeight="800" fontFamily="Syne, sans-serif" fill="#38bdf8">94%</text>
      <rect x="258" y="100" width="92" height="4" rx="2" fill="#1a2535" />
      <rect x="258" y="100" width="86" height="4" rx="2" fill="#38bdf8" />
      {/* Log anomalies */}
      <rect x="16" y="124" width="348" height="64" rx="8" fill="#0d130c" stroke="rgba(34,197,94,0.1)" strokeWidth="0.5" />
      <text x="28" y="138" fontSize="8" fill="#4ade80" opacity="0.4" letterSpacing="1">ANOMALIES DÉTECTÉES</text>
      <rect x="24" y="144" width="2" height="12" rx="1" fill="#f97316" />
      <text x="32" y="154" fontSize="9" fill="#94a3b8" fontFamily="DM Sans, sans-serif">401000 · Écriture orpheline · 12/03/2025</text>
      <text x="350" y="154" textAnchor="end" fontSize="9" fill="#f97316">2 340,00 €</text>
      <rect x="24" y="160" width="2" height="12" rx="1" fill="#f97316" />
      <text x="32" y="170" fontSize="9" fill="#94a3b8">512000 · Déséquilibre journal OD</text>
      <text x="350" y="170" textAnchor="end" fontSize="9" fill="#f97316">0,02 €</text>
      <rect x="24" y="176" width="2" height="8" rx="1" fill="#22c55e" />
      <text x="32" y="183" fontSize="9" fill="#94a3b8">445000 · TVA collectée · Vérifiée ✓</text>
      <text x="350" y="183" textAnchor="end" fontSize="9" fill="#22c55e">OK</text>
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
