"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";

type UseCase = {
  id: string;
  label: string;
  agents: { icon: string; name: string; desc: string; badge: string }[];
  output: string;
};

const useCases: UseCase[] = [
  {
    id: "compta",
    label: "Comptabilité",
    agents: [
      { icon: "📥", name: "Agent FEC", desc: "Importe et analyse les écritures", badge: "Mistral AI" },
      { icon: "🔍", name: "Agent Anomalies", desc: "Détecte les incohérences", badge: "Groq" },
      { icon: "📋", name: "Agent CA3", desc: "Pré-remplit la déclaration TVA", badge: "Resend" },
    ],
    output: "Rapport de révision prêt",
  },
  {
    id: "devis",
    label: "Devis & Facturation",
    agents: [
      { icon: "✍", name: "Agent Génération", desc: "Crée le devis depuis description", badge: "Mistral AI" },
      { icon: "✓", name: "Agent Conformité", desc: "Vérifie mentions légales", badge: "Groq" },
      { icon: "📨", name: "Agent Relance", desc: "Envoie rappels automatiques", badge: "Resend" },
    ],
    output: "Devis signé + acompte encaissé",
  },
  {
    id: "contenu",
    label: "Contenu",
    agents: [
      { icon: "🎙", name: "Agent Transcription", desc: "Convertit audio en texte", badge: "Whisper" },
      { icon: "✂", name: "Agent Montage", desc: "Coupe silences et fillers", badge: "Remotion" },
      { icon: "💬", name: "Agent Sous-titres", desc: "Synchronise mot par mot", badge: "FFmpeg" },
    ],
    output: "Vidéo prête à publier",
  },
  {
    id: "custom",
    label: "Sur mesure",
    agents: [
      { icon: "🗺", name: "Agent Analyse", desc: "Cartographie vos flux", badge: "Mistral AI" },
      { icon: "⚙", name: "Agent Métier", desc: "Adapté à votre secteur", badge: "Custom" },
      { icon: "🔌", name: "Agent Intégration", desc: "Connecté à vos outils", badge: "API" },
    ],
    output: "Workflow automatisé",
  },
];

export default function AgentFlowIllustration() {
  const [active, setActive] = useState(0);
  const flowRef = useRef<HTMLDivElement>(null);
  const arrowRefs = useRef<(SVGPathElement | null)[]>([]);

  const current = useCases[active];

  // Fade transition on use case change
  useEffect(() => {
    const el = flowRef.current?.querySelectorAll("[data-agent-card]");
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
    );
  }, [active]);

  // Animated dashed arrows (flowing effect)
  useEffect(() => {
    const tweens: gsap.core.Tween[] = [];
    arrowRefs.current.forEach((path) => {
      if (!path) return;
      gsap.set(path, { strokeDashoffset: 0 });
      tweens.push(
        gsap.to(path, {
          strokeDashoffset: -16,
          duration: 0.8,
          repeat: -1,
          ease: "none",
        })
      );
    });
    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <div className="w-full" style={{ maxWidth: 920, margin: "0 auto" }}>
      {/* Use case selector */}
      <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
        {useCases.map((uc, i) => (
          <button
            key={uc.id}
            onClick={() => setActive(i)}
            data-cursor="link"
            className="text-[12px] font-medium px-4 py-2 rounded-full border cursor-pointer transition-all duration-200"
            style={{
              background: active === i ? "var(--gold-dim)" : "transparent",
              color: active === i ? "var(--gold-light)" : "var(--text-muted)",
              borderColor: active === i ? "var(--gold-border)" : "var(--border)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {uc.label}
          </button>
        ))}
      </div>

      {/* Flow diagram — hidden on mobile to prevent horizontal overflow */}
      <div
        ref={flowRef}
        className="hidden md:grid items-center gap-3"
        style={{
          gridTemplateColumns: "minmax(140px, 1.2fr) auto repeat(3, minmax(0, 1fr) auto) minmax(140px, 1.2fr)",
        }}
      >
        {/* Entreprise */}
        <div
          data-agent-card
          className="p-4 text-center"
          style={{
            background: "#161619",
            border: "1px solid var(--gold-border)",
            borderRadius: 12,
          }}
        >
          <div className="text-2xl mb-1">🏢</div>
          <div
            className="text-[12px] font-bold mb-0.5"
            style={{ color: "var(--text)", fontFamily: "var(--font-syne)" }}
          >
            Vos données
          </div>
          <div className="text-[10px]" style={{ color: "var(--text-dim)" }}>
            emails, docs, factures
          </div>
        </div>

        {/* Arrow 1 */}
        <Arrow refCb={(el) => (arrowRefs.current[0] = el)} />

        {/* 3 Agents */}
        {current.agents.map((agent, i) => (
          <Fragment key={`${current.id}-${i}`}>
            <div
              data-agent-card
              className="p-3 text-center"
              style={{
                background: "#111113",
                border: "1px solid var(--gold-border)",
                borderRadius: 12,
                minHeight: 96,
              }}
            >
              <div className="text-xl mb-1">{agent.icon}</div>
              <div
                className="text-[11px] font-bold mb-0.5 leading-tight"
                style={{ color: "var(--text)", fontFamily: "var(--font-syne)" }}
              >
                {agent.name}
              </div>
              <div
                className="text-[9px] leading-tight mb-1.5"
                style={{ color: "var(--text-dim)" }}
              >
                {agent.desc}
              </div>
              <span
                className="inline-block text-[8px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: "var(--gold-dim)",
                  color: "var(--gold-light)",
                  border: "1px solid var(--gold-border)",
                }}
              >
                {agent.badge}
              </span>
            </div>
            <Arrow refCb={(el) => (arrowRefs.current[i + 1] = el)} />
          </Fragment>
        ))}

        {/* Output */}
        <div
          data-agent-card
          className="p-4 text-center"
          style={{
            background: "rgba(34,197,94,0.06)",
            border: "1px solid rgba(34,197,94,0.35)",
            borderRadius: 12,
          }}
        >
          <div className="text-2xl mb-1">✅</div>
          <div
            className="text-[12px] font-bold mb-0.5 leading-tight"
            style={{ color: "#4ade80", fontFamily: "var(--font-syne)" }}
          >
            {current.output}
          </div>
          <div className="text-[10px]" style={{ color: "rgba(74,222,128,0.6)" }}>
            en quelques secondes
          </div>
        </div>
      </div>
    </div>
  );
}

function Arrow({ refCb }: { refCb: (el: SVGPathElement | null) => void }) {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      className="max-[900px]:rotate-90 max-[900px]:mx-auto"
    >
      <path
        ref={refCb}
        d="M2 10 L24 10"
        stroke="#C4973A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <path d="M20 5 L26 10 L20 15" stroke="#C4973A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
