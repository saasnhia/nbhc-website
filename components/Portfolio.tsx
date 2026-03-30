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

const waveHeights = [12, 20, 28, 16, 24, 8, 32, 18, 26, 14, 22, 30, 10, 28, 16, 24, 20, 12, 28, 18, 24, 8, 20, 16];

function VlogyzVisual() {
  return (
    <svg width="380" height="200" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="hidden" style={{ display: "block", width: "100%", height: 200 }}>
      <rect width="380" height="200" fill="#0a0b14" />
      {/* Score viralité pill */}
      <rect x="16" y="16" width="80" height="28" rx="14" fill="rgba(99,102,241,0.2)" stroke="#6366f1" strokeWidth="0.5" />
      <text x="56" y="24" textAnchor="middle" fontSize="8" fill="#6366f1" opacity="0.7">VIRALITÉ</text>
      <text x="56" y="34" textAnchor="middle" fontSize="11" fill="#818cf8" fontWeight="600">87 / 100</text>
      {/* Waveform */}
      {waveHeights.map((h, i) => (
        <rect key={i} x={40 + i * 12.5} y={90 - h / 2} width="3" height={h} rx="1.5" fill="#6366f1" opacity={0.4 + (h / 32) * 0.6} />
      ))}
      {/* Sous-titres */}
      <rect x="20" y="134" width="260" height="24" rx="12" fill="#1a1b2e" />
      <rect x="20" y="134" width="90" height="24" rx="12" fill="#6366f1" opacity="0.9" />
      <text x="65" y="150" textAnchor="middle" fontSize="11" fill="white" fontWeight="600">On automat...</text>
      <text x="210" y="150" textAnchor="middle" fontSize="11" fill="#94a3b8">ce qui vous freine</text>
      {/* Timeline */}
      <rect x="20" y="169" width="340" height="4" rx="2" fill="#1a1b2e" />
      <rect x="20" y="169" width="160" height="4" rx="2" fill="#6366f1" />
      <rect x="86" y="167" width="8" height="8" rx="1" fill="#f43f5e" opacity="0.8" />
      <line data-playhead x1="178" y1="158" x2="178" y2="182" stroke="white" strokeWidth="1.5" opacity="0.5" />
      <circle data-playhead-dot cx="178" cy="158" r="5" fill="#f43f5e" />
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
      <rect width="380" height="200" fill="#0b120a" />
      {/* Section label */}
      <text x="20" y="24" fontSize="9" fontFamily="Syne, sans-serif" fill="#4ade80" opacity="0.5" letterSpacing="2">RÉVISION COMPTABLE — FY 2025</text>
      {/* Card Écritures */}
      <rect x="20" y="34" width="100" height="56" rx="8" fill="#0f1f0c" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" />
      <text x="70" y="54" textAnchor="middle" fontSize="8" fill="#4ade80" opacity="0.6">ÉCRITURES</text>
      <text x="70" y="78" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="Syne, sans-serif" fill="#22c55e">1,247</text>
      {/* Card Anomalies */}
      <rect x="130" y="34" width="100" height="56" rx="8" fill="#1f0f0c" stroke="rgba(249,115,22,0.3)" strokeWidth="0.5" />
      <text x="180" y="54" textAnchor="middle" fontSize="8" fill="#fb923c" opacity="0.6">ANOMALIES</text>
      <text x="180" y="78" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="Syne, sans-serif" fill="#f97316">3</text>
      {/* Card Progression */}
      <rect x="240" y="34" width="120" height="56" rx="8" fill="#0f1a1f" stroke="rgba(56,189,248,0.3)" strokeWidth="0.5" />
      <text x="300" y="54" textAnchor="middle" fontSize="8" fill="#7dd3fc" opacity="0.6">PROGRESSION</text>
      <text x="300" y="78" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="Syne, sans-serif" fill="#38bdf8">94%</text>
      {/* Barre progression */}
      <text x="20" y="104" fontSize="8" fill="#4ade80" opacity="0.4">Avancement mission</text>
      <rect x="20" y="108" width="340" height="5" rx="2.5" fill="#1a2f17" />
      <rect data-progress-bar x="20" y="108" width="320" height="5" rx="2.5" fill="#22c55e" />
      <text x="366" y="114" textAnchor="end" fontSize="8" fill="#22c55e">94%</text>
      {/* Anomalies log */}
      <circle cx="28" cy="130" r="3.5" fill="#f97316" />
      <text x="38" y="134" fontSize="9" fill="#5a7a5a" fontFamily="DM Sans, sans-serif">Écriture orpheline — Cpte 401</text>
      <circle cx="28" cy="150" r="3.5" fill="#f97316" />
      <text x="38" y="154" fontSize="9" fill="#5a7a5a" fontFamily="DM Sans, sans-serif">Déséquilibre Journal OD — 0.02€</text>
      <circle cx="28" cy="170" r="3.5" fill="#22c55e" />
      <text x="38" y="174" fontSize="9" fill="#5a7a5a" fontFamily="DM Sans, sans-serif">TVA collectée — Vérifiée ✓</text>
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

    if (p.id === "vlogyz") {
      const playhead = el.querySelector("[data-playhead]");
      const dot = el.querySelector("[data-playhead-dot]");
      if (playhead) svgTweensRef.current.push(gsap.to(playhead, { attr: { x1: 200, x2: 200 }, duration: 0.6, ease: "power2.out" }));
      if (dot) svgTweensRef.current.push(gsap.to(dot, { attr: { cx: 200, cy: 155 }, duration: 0.6, ease: "power2.out" }));
    } else if (p.id === "devizly") {
      const btn = el.querySelector("[data-sign-btn]");
      if (btn) svgTweensRef.current.push(gsap.to(btn, { opacity: 0.3, duration: 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" }));
    } else if (p.id === "worthifast") {
      const bar = el.querySelector("[data-progress-bar]");
      if (bar) svgTweensRef.current.push(gsap.to(bar, { attr: { width: 340 }, duration: 0.6, ease: "power2.out" }));
    }
  };

  const onMouseLeave = () => {
    const el = cardRef.current;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });

    svgTweensRef.current.forEach((t) => t.kill());
    svgTweensRef.current = [];

    if (!el) return;
    if (p.id === "vlogyz") {
      const playhead = el.querySelector("[data-playhead]");
      const dot = el.querySelector("[data-playhead-dot]");
      if (playhead) gsap.to(playhead, { attr: { x1: 178, x2: 178 }, duration: 0.4, ease: "power2.out" });
      if (dot) gsap.to(dot, { attr: { cx: 178, cy: 158 }, duration: 0.4, ease: "power2.out" });
    } else if (p.id === "devizly") {
      const btn = el.querySelector("[data-sign-btn]");
      if (btn) gsap.to(btn, { opacity: 0.15, duration: 0.3 });
    } else if (p.id === "worthifast") {
      const bar = el.querySelector("[data-progress-bar]");
      if (bar) gsap.to(bar, { attr: { width: 320 }, duration: 0.4, ease: "power2.out" });
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
