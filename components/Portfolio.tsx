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

const waveHeights = [18, 26, 12, 22, 28, 14, 24, 10, 20, 26, 16, 22, 8, 28, 18, 12, 24, 20, 14, 22];
const waveOpacities = [0.6, 0.9, 0.4, 0.7, 0.8, 0.5, 0.9, 0.4, 0.7, 0.6, 0.5, 0.8, 0.4, 0.9, 0.6, 0.5, 0.7, 0.8, 0.4, 0.7];

function VlogyzVisual() {
  return (
    <svg width="380" height="200" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: 200 }}>
      <rect width="380" height="200" fill="#0d0f1a" />
      {/* Score viralité */}
      <rect x="16" y="16" width="72" height="32" rx="8" fill="rgba(99,102,241,0.15)" stroke="#6366f1" strokeWidth="0.5" />
      <text x="52" y="28" textAnchor="middle" fontSize="9" fill="#818cf8" fontFamily="DM Sans, sans-serif">VIRALITÉ</text>
      <text x="52" y="41" textAnchor="middle" fontSize="13" fill="#6366f1" fontWeight="700" fontFamily="DM Sans, sans-serif">87/100</text>
      {/* Label */}
      <text x="364" y="28" textAnchor="end" fontSize="18" fontFamily="Syne, sans-serif" fontWeight="800" fill="#6366f1">VLOGYZ</text>
      {/* Waveform */}
      {waveHeights.map((h, i) => (
        <rect key={i} x={100 + i * 9.5} y={85 - h / 2} width="3" height={h} rx="1" fill="#6366f1" opacity={waveOpacities[i]} />
      ))}
      {/* Sous-titres pill */}
      <rect x="60" y="112" width="260" height="22" rx="11" fill="#1e2235" />
      <text x="190" y="127" textAnchor="middle" fontSize="11" fill="#e2e8f0" fontFamily="DM Sans, sans-serif">On automatise ce qui vous</text>
      <rect x="60" y="112" width="80" height="22" rx="11" fill="#6366f1" opacity="0.8" />
      <text x="100" y="127" textAnchor="middle" fontSize="11" fill="white" fontWeight="600" fontFamily="DM Sans, sans-serif">On automat</text>
      {/* Timeline */}
      <rect x="20" y="155" width="340" height="4" rx="2" fill="#1e2235" />
      <rect x="20" y="155" width="80" height="4" rx="2" fill="#6366f1" />
      <rect x="108" y="153" width="12" height="8" rx="1" fill="#f43f5e" opacity="0.8" />
      <rect x="128" y="155" width="120" height="4" rx="2" fill="#6366f1" />
      <line data-playhead x1="168" y1="140" x2="168" y2="175" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
      <circle data-playhead-dot cx="168" cy="140" r="4" fill="#f43f5e" />
    </svg>
  );
}

function DevizlyVisual() {
  return (
    <svg width="380" height="200" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: 200 }}>
      <rect width="380" height="200" fill="#0d0d14" />
      {/* Label */}
      <text x="364" y="28" textAnchor="end" fontSize="18" fontFamily="Syne, sans-serif" fontWeight="800" fill="#5B5BD6">DEVIZLY</text>
      {/* Document */}
      <rect x="80" y="20" width="220" height="155" rx="8" fill="#13131f" stroke="#5B5BD6" strokeWidth="0.5" />
      {/* Header */}
      <rect x="80" y="20" width="220" height="32" rx="8" fill="#5B5BD6" opacity="0.2" />
      <text x="96" y="41" fontSize="12" fontFamily="Syne, sans-serif" fontWeight="700" fill="#5B5BD6">NB</text>
      <text x="290" y="41" textAnchor="end" fontSize="9" fill="#8b8bcc" fontFamily="DM Sans, sans-serif">DEVIS #2024-089</text>
      {/* Lignes prestation */}
      <rect x="96" y="62" width="130" height="4" rx="2" fill="#1e1e2e" />
      <rect x="240" y="62" width="48" height="4" rx="2" fill="#5B5BD6" opacity="0.6" />
      <rect x="96" y="74" width="100" height="4" rx="2" fill="#1e1e2e" />
      <rect x="240" y="74" width="40" height="4" rx="2" fill="#1e1e2e" />
      <rect x="96" y="86" width="115" height="4" rx="2" fill="#1e1e2e" />
      <rect x="240" y="86" width="44" height="4" rx="2" fill="#1e1e2e" />
      {/* Séparateur */}
      <line x1="96" y1="100" x2="284" y2="100" stroke="#2a2a3e" strokeWidth="0.5" />
      {/* Total */}
      <text x="96" y="118" fontSize="9" fill="#6b6b8a" fontFamily="DM Sans, sans-serif">TOTAL HT</text>
      <text x="284" y="118" textAnchor="end" fontSize="15" fontWeight="700" fill="#5B5BD6" fontFamily="Syne, sans-serif">2 400 €</text>
      {/* Bouton signature */}
      <rect data-sign-btn x="96" y="132" width="188" height="28" rx="14" fill="#5B5BD6" opacity="0.15" stroke="#5B5BD6" strokeWidth="0.5" />
      <text x="190" y="150" textAnchor="middle" fontSize="10" fill="#8b8bcc" fontFamily="DM Sans, sans-serif">✍ Signer électroniquement</text>
      {/* Badge statut */}
      <rect x="284" y="20" width="16" height="16" rx="8" fill="#22c55e" opacity="0.9" />
    </svg>
  );
}

function WorthifastVisual() {
  return (
    <svg width="380" height="200" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%", height: 200 }}>
      <rect width="380" height="200" fill="#0d120a" />
      {/* Titre */}
      <text x="20" y="28" fontSize="10" fill="#4ade80" opacity="0.6" fontFamily="DM Sans, sans-serif">RÉVISION COMPTABLE — FY 2025</text>
      {/* Label */}
      <text x="364" y="28" textAnchor="end" fontSize="18" fontFamily="Syne, sans-serif" fontWeight="800" fill="#22c55e">WORTHIFAST</text>
      {/* Card 1 - Écritures */}
      <rect x="20" y="36" width="96" height="52" rx="6" fill="#0f1f0c" stroke="#22c55e" strokeWidth="0.5" />
      <text x="68" y="54" textAnchor="middle" fontSize="8" fill="#4ade80" opacity="0.7" fontFamily="DM Sans, sans-serif">ÉCRITURES OK</text>
      <text x="68" y="72" textAnchor="middle" fontSize="16" fontWeight="700" fill="#22c55e" fontFamily="Syne, sans-serif">1,247</text>
      {/* Card 2 - Anomalies */}
      <rect x="124" y="36" width="96" height="52" rx="6" fill="#1f0f0c" stroke="#f97316" strokeWidth="0.5" />
      <text x="172" y="54" textAnchor="middle" fontSize="8" fill="#fb923c" opacity="0.7" fontFamily="DM Sans, sans-serif">ANOMALIES</text>
      <text x="172" y="72" textAnchor="middle" fontSize="16" fontWeight="700" fill="#f97316" fontFamily="Syne, sans-serif">3</text>
      {/* Card 3 - Progression */}
      <rect x="228" y="36" width="96" height="52" rx="6" fill="#0f1a1f" stroke="#38bdf8" strokeWidth="0.5" />
      <text x="276" y="54" textAnchor="middle" fontSize="8" fill="#7dd3fc" opacity="0.7" fontFamily="DM Sans, sans-serif">PROGRESSION</text>
      <text x="276" y="72" textAnchor="middle" fontSize="16" fontWeight="700" fill="#38bdf8" fontFamily="Syne, sans-serif">94%</text>
      {/* Barre progression */}
      <text x="20" y="108" fontSize="9" fill="#4ade80" opacity="0.5" fontFamily="DM Sans, sans-serif">Avancement mission</text>
      <rect x="20" y="115" width="304" height="6" rx="3" fill="#1a2f17" />
      <rect data-progress-bar x="20" y="115" width="286" height="6" rx="3" fill="#22c55e" />
      <text x="330" y="122" fontSize="9" fill="#22c55e" fontFamily="DM Sans, sans-serif">94%</text>
      {/* Anomalies log */}
      <circle cx="28" cy="140" r="3" fill="#f97316" />
      <text x="36" y="143" fontSize="8" fill="#6b7a6b" fontFamily="DM Sans, sans-serif">Écriture orpheline — Cpte 401 — 12/03</text>
      <circle cx="28" cy="155" r="3" fill="#f97316" />
      <text x="36" y="158" fontSize="8" fill="#6b7a6b" fontFamily="DM Sans, sans-serif">Déséquilibre — Journal OD — 0.02€</text>
      <circle cx="28" cy="170" r="3" fill="#22c55e" />
      <text x="36" y="173" fontSize="8" fill="#6b7a6b" fontFamily="DM Sans, sans-serif">TVA collectée — Vérifiée ✓</text>
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
      if (playhead) svgTweensRef.current.push(gsap.to(playhead, { attr: { x1: 178, x2: 178 }, duration: 0.6, ease: "power2.out" }));
      if (dot) svgTweensRef.current.push(gsap.to(dot, { attr: { cx: 178, cy: 137 }, duration: 0.6, ease: "power2.out" }));
    } else if (p.id === "devizly") {
      const btn = el.querySelector("[data-sign-btn]");
      if (btn) svgTweensRef.current.push(gsap.to(btn, { opacity: 0.3, duration: 0.5, repeat: -1, yoyo: true, ease: "sine.inOut" }));
    } else if (p.id === "worthifast") {
      const bar = el.querySelector("[data-progress-bar]");
      if (bar) svgTweensRef.current.push(gsap.to(bar, { attr: { width: 300 }, duration: 0.6, ease: "power2.out" }));
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
      if (playhead) gsap.to(playhead, { attr: { x1: 168, x2: 168 }, duration: 0.4, ease: "power2.out" });
      if (dot) gsap.to(dot, { attr: { cx: 168, cy: 140 }, duration: 0.4, ease: "power2.out" });
    } else if (p.id === "devizly") {
      const btn = el.querySelector("[data-sign-btn]");
      if (btn) gsap.to(btn, { opacity: 0.15, duration: 0.3 });
    } else if (p.id === "worthifast") {
      const bar = el.querySelector("[data-progress-bar]");
      if (bar) gsap.to(bar, { attr: { width: 286 }, duration: 0.4, ease: "power2.out" });
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
