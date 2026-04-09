"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
 * 1. AgentAnatomyIllustration
 *    "Agent IA = LLM + Outils + Mémoire + Boucle de décision"
 *    Autoportant : compréhensible sans lire le texte autour.
 * ────────────────────────────────────────────────────────────────── */
export function AgentAnatomyIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parts = el.querySelectorAll("[data-anatomy-part]");
    gsap.set(parts, { opacity: 0, scale: 0.92 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(parts, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div ref={ref} className="w-full" style={{ maxWidth: 720, margin: "0 auto" }}>
      <svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
        <defs>
          <linearGradient id="agt-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C4973A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C4973A" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Connections (drawn before nodes so they sit behind) */}
        <g stroke="#C4973A" strokeWidth="1.2" fill="none" opacity="0.4">
          <line x1="360" y1="180" x2="160" y2="100" strokeDasharray="3 4" />
          <line x1="360" y1="180" x2="560" y2="100" strokeDasharray="3 4" />
          <line x1="360" y1="180" x2="160" y2="260" strokeDasharray="3 4" />
          <line x1="360" y1="180" x2="560" y2="260" strokeDasharray="3 4" />
        </g>

        {/* Central agent core */}
        <g data-anatomy-part>
          <circle cx="360" cy="180" r="64" fill="url(#agt-core)" stroke="#C4973A" strokeWidth="1.5" />
          <circle cx="360" cy="180" r="50" fill="none" stroke="#C4973A" strokeWidth="0.5" opacity="0.5" />
          <text x="360" y="172" textAnchor="middle" fontSize="13" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            AGENT IA
          </text>
          <text x="360" y="190" textAnchor="middle" fontSize="9" fill="#C4973A" opacity="0.7">
            cerveau autonome
          </text>
        </g>

        {/* Top-left: LLM */}
        <g data-anatomy-part>
          <rect x="80" y="60" width="160" height="80" rx="10" fill="#0d0f1c" stroke="#C4973A" strokeWidth="1" />
          <text x="160" y="86" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            LLM
          </text>
          <text x="160" y="103" textAnchor="middle" fontSize="9" fill="#8C8880">
            comprend &amp; raisonne
          </text>
          {/* Mini neuron icon */}
          <g transform="translate(140 110)">
            <circle cx="0" cy="8" r="2.5" fill="#C4973A" />
            <circle cx="10" cy="4" r="2.5" fill="#C4973A" />
            <circle cx="20" cy="10" r="2.5" fill="#C4973A" />
            <circle cx="30" cy="6" r="2.5" fill="#C4973A" />
            <line x1="0" y1="8" x2="10" y2="4" stroke="#C4973A" strokeWidth="0.8" />
            <line x1="10" y1="4" x2="20" y2="10" stroke="#C4973A" strokeWidth="0.8" />
            <line x1="20" y1="10" x2="30" y2="6" stroke="#C4973A" strokeWidth="0.8" />
          </g>
        </g>

        {/* Top-right: Outils */}
        <g data-anatomy-part>
          <rect x="480" y="60" width="160" height="80" rx="10" fill="#0d0f1c" stroke="#C4973A" strokeWidth="1" />
          <text x="560" y="86" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            OUTILS
          </text>
          <text x="560" y="103" textAnchor="middle" fontSize="9" fill="#8C8880">
            email · API · DB · CRM
          </text>
          {/* Mini API blocks */}
          <g transform="translate(525 110)">
            <rect x="0" y="0" width="14" height="12" rx="2" fill="none" stroke="#C4973A" strokeWidth="0.8" />
            <rect x="18" y="0" width="14" height="12" rx="2" fill="none" stroke="#C4973A" strokeWidth="0.8" />
            <rect x="36" y="0" width="14" height="12" rx="2" fill="none" stroke="#C4973A" strokeWidth="0.8" />
            <rect x="54" y="0" width="14" height="12" rx="2" fill="none" stroke="#C4973A" strokeWidth="0.8" />
          </g>
        </g>

        {/* Bottom-left: Mémoire */}
        <g data-anatomy-part>
          <rect x="80" y="220" width="160" height="80" rx="10" fill="#0d0f1c" stroke="#C4973A" strokeWidth="1" />
          <text x="160" y="246" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            MÉMOIRE
          </text>
          <text x="160" y="263" textAnchor="middle" fontSize="9" fill="#8C8880">
            historique &amp; contexte
          </text>
          {/* Mini DB icon */}
          <g transform="translate(150 274)">
            <ellipse cx="10" cy="0" rx="10" ry="3" fill="none" stroke="#C4973A" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="0" y2="10" stroke="#C4973A" strokeWidth="0.8" />
            <line x1="20" y1="0" x2="20" y2="10" stroke="#C4973A" strokeWidth="0.8" />
            <ellipse cx="10" cy="10" rx="10" ry="3" fill="none" stroke="#C4973A" strokeWidth="0.8" />
          </g>
        </g>

        {/* Bottom-right: Boucle décision */}
        <g data-anatomy-part>
          <rect x="480" y="220" width="160" height="80" rx="10" fill="#0d0f1c" stroke="#C4973A" strokeWidth="1" />
          <text x="560" y="244" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            BOUCLE
          </text>
          <text x="560" y="258" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            DE DÉCISION
          </text>
          {/* Mini loop icon */}
          <g transform="translate(545 268)" fill="none" stroke="#C4973A" strokeWidth="1">
            <path d="M2 8 a8 8 0 1 1 16 0" />
            <path d="M18 8 l-3 -3 M18 8 l-3 3" strokeLinecap="round" />
          </g>
        </g>

        {/* Animated pulse on connections */}
        <g>
          <circle cx="260" cy="140" r="2.5" fill="#C4973A">
            <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="460" cy="140" r="2.5" fill="#C4973A">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="260" cy="220" r="2.5" fill="#C4973A">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="460" cy="220" r="2.5" fill="#C4973A">
            <animate attributeName="opacity" values="0;1;0" dur="2s" begin="1.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>

      {/* Caption */}
      <p
        className="text-[12px] text-center mt-4"
        style={{ color: "var(--text-dim)", fontFamily: "var(--font-dm-sans)" }}
      >
        Un agent IA = un cerveau autonome qui combine 4 briques pour exécuter
        une tâche de bout en bout.
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * 2. MultiAgentWorkflowIllustration
 *    "Workflow multi-agents : 4 agents qui se passent des données"
 * ────────────────────────────────────────────────────────────────── */
export function MultiAgentWorkflowIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-flow-item]");
    gsap.set(items, { opacity: 0, x: -20 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power3.out",
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div ref={ref} className="w-full" style={{ maxWidth: 880, margin: "0 auto" }}>
      <svg viewBox="0 0 880 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
        {/* Input */}
        <g data-flow-item>
          <rect x="20" y="100" width="120" height="80" rx="10" fill="#161619" stroke="#C4973A" strokeWidth="1.2" />
          <text x="80" y="128" textAnchor="middle" fontSize="14">📨</text>
          <text x="80" y="148" textAnchor="middle" fontSize="10" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            INPUT
          </text>
          <text x="80" y="162" textAnchor="middle" fontSize="8" fill="#8C8880">
            email reçu
          </text>
        </g>

        {/* Arrow 1 */}
        <g data-flow-item>
          <line x1="148" y1="140" x2="178" y2="140" stroke="#C4973A" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M174 135 L182 140 L174 145" stroke="#C4973A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Agent 1 — Lecture */}
        <g data-flow-item>
          <rect x="186" y="100" width="130" height="80" rx="10" fill="#0d0f1c" stroke="#C4973A" strokeWidth="1" />
          <text x="251" y="124" textAnchor="middle" fontSize="14">🔍</text>
          <text x="251" y="142" textAnchor="middle" fontSize="10" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            AGENT 1
          </text>
          <text x="251" y="156" textAnchor="middle" fontSize="8" fill="#8C8880">
            lit &amp; classifie
          </text>
          <rect x="206" y="166" width="90" height="6" rx="3" fill="#C4973A" opacity="0.15" />
          <rect x="206" y="166" width="62" height="6" rx="3" fill="#C4973A" />
        </g>

        {/* Arrow 2 with passed data */}
        <g data-flow-item>
          <line x1="324" y1="140" x2="354" y2="140" stroke="#C4973A" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M350 135 L358 140 L350 145" stroke="#C4973A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="320" y="76" width="42" height="14" rx="3" fill="#0d0f1c" stroke="#C4973A" strokeWidth="0.6" />
          <text x="341" y="86" textAnchor="middle" fontSize="7" fill="#C4973A">données</text>
          <line x1="341" y1="90" x2="341" y2="120" stroke="#C4973A" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
        </g>

        {/* Agent 2 — Analyse */}
        <g data-flow-item>
          <rect x="362" y="100" width="130" height="80" rx="10" fill="#0d0f1c" stroke="#C4973A" strokeWidth="1" />
          <text x="427" y="124" textAnchor="middle" fontSize="14">⚙</text>
          <text x="427" y="142" textAnchor="middle" fontSize="10" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            AGENT 2
          </text>
          <text x="427" y="156" textAnchor="middle" fontSize="8" fill="#8C8880">
            analyse &amp; décide
          </text>
          <rect x="382" y="166" width="90" height="6" rx="3" fill="#C4973A" opacity="0.15" />
          <rect x="382" y="166" width="78" height="6" rx="3" fill="#C4973A" />
        </g>

        {/* Arrow 3 */}
        <g data-flow-item>
          <line x1="500" y1="140" x2="530" y2="140" stroke="#C4973A" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M526 135 L534 140 L526 145" stroke="#C4973A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="496" y="190" width="42" height="14" rx="3" fill="#0d0f1c" stroke="#C4973A" strokeWidth="0.6" />
          <text x="517" y="200" textAnchor="middle" fontSize="7" fill="#C4973A">décision</text>
          <line x1="517" y1="180" x2="517" y2="190" stroke="#C4973A" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.5" />
        </g>

        {/* Agent 3 — Action */}
        <g data-flow-item>
          <rect x="538" y="100" width="130" height="80" rx="10" fill="#0d0f1c" stroke="#C4973A" strokeWidth="1" />
          <text x="603" y="124" textAnchor="middle" fontSize="14">⚡</text>
          <text x="603" y="142" textAnchor="middle" fontSize="10" fontFamily="Syne, sans-serif" fontWeight="800" fill="#F0EDE6">
            AGENT 3
          </text>
          <text x="603" y="156" textAnchor="middle" fontSize="8" fill="#8C8880">
            exécute action
          </text>
          <rect x="558" y="166" width="90" height="6" rx="3" fill="#C4973A" opacity="0.15" />
          <rect x="558" y="166" width="90" height="6" rx="3" fill="#C4973A" />
        </g>

        {/* Arrow 4 */}
        <g data-flow-item>
          <line x1="676" y1="140" x2="706" y2="140" stroke="#C4973A" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M702 135 L710 140 L702 145" stroke="#C4973A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Output */}
        <g data-flow-item>
          <rect x="714" y="100" width="146" height="80" rx="10" fill="rgba(34,197,94,0.06)" stroke="#22c55e" strokeWidth="1.2" />
          <text x="787" y="128" textAnchor="middle" fontSize="14">✅</text>
          <text x="787" y="148" textAnchor="middle" fontSize="10" fontFamily="Syne, sans-serif" fontWeight="800" fill="#4ade80">
            RÉSULTAT
          </text>
          <text x="787" y="162" textAnchor="middle" fontSize="8" fill="#4ade80" opacity="0.7">
            tâche accomplie
          </text>
        </g>

        {/* Title bar */}
        <text x="440" y="32" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800" fill="#C4973A" letterSpacing="2">
          WORKFLOW MULTI-AGENTS
        </text>
        <text x="440" y="48" textAnchor="middle" fontSize="9" fill="#8C8880">
          Le résultat d&apos;un agent devient l&apos;input du suivant — sans intervention humaine
        </text>

        {/* Animated dots flowing through the chain */}
        <circle r="3" fill="#C4973A">
          <animateMotion dur="4s" repeatCount="indefinite" path="M150 140 L860 140" />
        </circle>
      </svg>

      <p
        className="text-[12px] text-center mt-4"
        style={{ color: "var(--text-dim)", fontFamily: "var(--font-dm-sans)" }}
      >
        Plusieurs agents s&apos;enchaînent automatiquement — chacun reçoit le travail
        du précédent et passe son output au suivant.
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * 3. WithoutVsWithAgentsIllustration
 *    Comparatif "Sans agents (humain × 100) vs Avec agents (humain → supervision)"
 * ────────────────────────────────────────────────────────────────── */
export function WithoutVsWithAgentsIllustration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sides = el.querySelectorAll("[data-comparison]");
    gsap.set(sides, { opacity: 0, y: 30 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(sides, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.2,
          ease: "power3.out",
        });
      },
    });
    return () => st.kill();
  }, []);

  // Stick figures grid for "Sans agents" — 5 rows x 6 cols = 30 humans
  const humans: { x: number; y: number }[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 6; c++) {
      humans.push({ x: 30 + c * 28, y: 80 + r * 38 });
    }
  }

  return (
    <div ref={ref} className="w-full" style={{ maxWidth: 880, margin: "0 auto" }}>
      <svg viewBox="0 0 880 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
        {/* SANS AGENTS — left side */}
        <g data-comparison>
          <rect x="10" y="20" width="420" height="280" rx="12" fill="#1a1212" stroke="#7f1d1d" strokeWidth="0.8" opacity="0.5" />
          <text x="220" y="48" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800" fill="#f87171" letterSpacing="2">
            SANS AGENTS
          </text>
          <text x="220" y="64" textAnchor="middle" fontSize="9" fill="#fca5a5" opacity="0.7">
            humain · tâche × 100
          </text>

          {/* 30 stick figures */}
          {humans.map((h, i) => (
            <g key={i} transform={`translate(${h.x} ${h.y})`}>
              <circle cx="0" cy="0" r="3" fill="#fca5a5" opacity="0.85" />
              <line x1="0" y1="3" x2="0" y2="14" stroke="#fca5a5" strokeWidth="1.2" opacity="0.85" />
              <line x1="-4" y1="8" x2="4" y2="8" stroke="#fca5a5" strokeWidth="1.2" opacity="0.85" />
              <line x1="0" y1="14" x2="-3" y2="20" stroke="#fca5a5" strokeWidth="1.2" opacity="0.85" />
              <line x1="0" y1="14" x2="3" y2="20" stroke="#fca5a5" strokeWidth="1.2" opacity="0.85" />
            </g>
          ))}

          {/* Stat */}
          <text x="220" y="290" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="Syne, sans-serif" fill="#f87171">
            ≈ 80h / mois
          </text>
        </g>

        {/* VS pill in middle */}
        <g data-comparison>
          <circle cx="440" cy="160" r="22" fill="#0a0a0b" stroke="#C4973A" strokeWidth="1.2" />
          <text x="440" y="166" textAnchor="middle" fontSize="13" fontFamily="Syne, sans-serif" fontWeight="800" fill="#C4973A">
            VS
          </text>
        </g>

        {/* AVEC AGENTS — right side */}
        <g data-comparison>
          <rect x="450" y="20" width="420" height="280" rx="12" fill="rgba(34,197,94,0.04)" stroke="#22c55e" strokeWidth="0.8" opacity="0.7" />
          <text x="660" y="48" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800" fill="#4ade80" letterSpacing="2">
            AVEC AGENTS NBHC
          </text>
          <text x="660" y="64" textAnchor="middle" fontSize="9" fill="#86efac" opacity="0.7">
            humain · supervise · agents font
          </text>

          {/* 1 human at left supervising */}
          <g transform="translate(490 130)">
            <circle cx="0" cy="0" r="6" fill="#86efac" />
            <line x1="0" y1="6" x2="0" y2="28" stroke="#86efac" strokeWidth="2" />
            <line x1="-8" y1="14" x2="8" y2="14" stroke="#86efac" strokeWidth="2" />
            <line x1="0" y1="28" x2="-6" y2="40" stroke="#86efac" strokeWidth="2" />
            <line x1="0" y1="28" x2="6" y2="40" stroke="#86efac" strokeWidth="2" />
            <text x="0" y="54" textAnchor="middle" fontSize="8" fill="#86efac" opacity="0.7">vous</text>
          </g>

          {/* Connecting beam */}
          <g>
            <line x1="510" y1="148" x2="560" y2="148" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M556 143 L564 148 L556 153" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="535" y="138" textAnchor="middle" fontSize="7" fill="#4ade80">supervise</text>
          </g>

          {/* 6 agent boxes (replacing the human grid) */}
          {[
            { x: 580, y: 90 },
            { x: 660, y: 90 },
            { x: 740, y: 90 },
            { x: 580, y: 150 },
            { x: 660, y: 150 },
            { x: 740, y: 150 },
          ].map((a, i) => (
            <g key={i} transform={`translate(${a.x} ${a.y})`}>
              <rect x="0" y="0" width="60" height="40" rx="6" fill="#0d0f1c" stroke="#C4973A" strokeWidth="0.8" />
              <text x="30" y="18" textAnchor="middle" fontSize="9" fontFamily="Syne, sans-serif" fontWeight="700" fill="#F0EDE6">
                AGENT
              </text>
              <text x="30" y="30" textAnchor="middle" fontSize="7" fill="#C4973A">
                ✓ actif
              </text>
            </g>
          ))}

          {/* Big stat */}
          <text x="660" y="240" textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="Syne, sans-serif" fill="#4ade80">
            ≈ 4h / mois
          </text>
          <text x="660" y="258" textAnchor="middle" fontSize="9" fill="#86efac" opacity="0.7">
            uniquement supervision
          </text>
          <text x="660" y="290" textAnchor="middle" fontSize="11" fontFamily="Syne, sans-serif" fontWeight="800" fill="#C4973A">
            −95% de temps humain
          </text>
        </g>
      </svg>

      <p
        className="text-[12px] text-center mt-4"
        style={{ color: "var(--text-dim)", fontFamily: "var(--font-dm-sans)" }}
      >
        Sans agents : 30 personnes-heures sur la même tâche répétée. Avec
        agents : une personne supervise une équipe d&apos;agents qui font le
        travail.
      </p>
    </div>
  );
}
