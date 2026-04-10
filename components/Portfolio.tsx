"use client";

import React, { ComponentType, useRef } from "react";
import { motion, useInView } from "framer-motion";
import VlogyzMockup from "./mockups/VlogyzMockup";
import DevizlyMockup from "./mockups/DevizlyMockup";
import WorthifastMockup from "./mockups/WorthifastMockup";

/* ─── SVG Icons (16px stroke 1.5) ─── */

const svgIcons: Record<string, React.ReactNode> = {
  mic: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0"/><line x1="12" y1="17" x2="12" y2="22"/></svg>,
  scissors: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>,
  flame: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c.5 4-2 6-2 10a4 4 0 008 0c0-4-2.5-6-2-10"/></svg>,
  check: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>,
  doc: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><polyline points="14 2 14 8 20 8"/></svg>,
  card: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  warning: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  refresh: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/><path d="M20.49 15a9 9 0 01-14.85 3.36L1 14"/></svg>,
};

/* ─── Types ─── */

type CalloutDef = {
  svgKey: string;
  title: string;
  subtitle: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
};

type Product = {
  id: string;
  badge: { label: string; type: "live" | "beta" | "dev" };
  name: string;
  tagline: string;
  Mockup: ComponentType;
  agents: string[];
  stack: string[];
  link: string;
  href: string;
  accent: string;
  textSide: "left" | "right";
  callouts: CalloutDef[];
};

/* ─── Products ─── */

const products: Product[] = [
  {
    id: "vlogyz",
    badge: { label: "MVP live", type: "beta" },
    name: "Vlogyz",
    tagline: "Équipe d'agents IA pour le montage vidéo automatisé. Alternative française à CapCut.",
    Mockup: VlogyzMockup,
    agents: ["Agent Transcription", "Agent Montage", "Agent Sous-titres", "Agent Score viralité"],
    stack: ["Next.js 16", "Groq Whisper", "Mistral", "Remotion", "FFmpeg"],
    link: "vlogyz.vercel.app",
    href: "https://vlogyz.vercel.app",
    accent: "#6366f1",
    textSide: "left",
    callouts: [
      { svgKey: "mic", title: "Transcription IA", subtitle: "502 mots en 12s", position: { top: "-4%", left: "-2%" } },
      { svgKey: "scissors", title: "Coupes intelligentes", subtitle: "1m23s supprimés", position: { top: "45%", left: "-14%" } },
      { svgKey: "flame", title: "Score viralité", subtitle: "87/100", position: { bottom: "-4%", right: "-2%" } },
    ],
  },
  {
    id: "devizly",
    badge: { label: "Live", type: "live" },
    name: "Devizly",
    tagline: "Équipe d'agents IA pour la génération de devis et l'encaissement automatique.",
    Mockup: DevizlyMockup,
    agents: ["Agent Génération", "Agent Conformité", "Agent Signature", "Agent Paiement"],
    stack: ["Next.js 14", "Mistral", "Stripe", "Supabase", "Resend"],
    link: "devizly.fr",
    href: "https://devizly.fr",
    accent: "#5B5BD6",
    textSide: "right",
    callouts: [
      { svgKey: "check", title: "Signature reçue", subtitle: "il y a 2 min", position: { top: "-3%", right: "-18%" } },
      { svgKey: "doc", title: "Devis DEV-0020", subtitle: "Conforme CGI", position: { top: "42%", right: "-22%" } },
      { svgKey: "card", title: "Acompte Stripe", subtitle: "4 978,80 €", position: { bottom: "6%", left: "-14%" } },
    ],
  },
  {
    id: "worthifast",
    badge: { label: "En développement", type: "dev" },
    name: "Worthifast",
    tagline: "Équipe d'agents IA pour l'automatisation comptable et la révision FEC.",
    Mockup: WorthifastMockup,
    agents: ["Agent FEC", "Agent Anomalies", "Agent CA3", "Agent Rapprochement"],
    stack: ["Next.js 16", "Mistral", "Supabase", "Stripe", "PostgreSQL"],
    link: "Bêta à venir",
    href: "#",
    accent: "#22c55e",
    textSide: "left",
    callouts: [
      { svgKey: "warning", title: "3 anomalies détectées", subtitle: "FEC 2025", position: { top: "-4%", left: "-2%" } },
      { svgKey: "refresh", title: "Rapprochement 95%", subtitle: "12 tx", position: { top: "42%", right: "-10%" } },
      { svgKey: "check", title: "TVA CA3 pré-remplie", subtitle: "8 036 €", position: { bottom: "-4%", right: "-2%" } },
    ],
  },
];

const statusBadge: Record<string, React.CSSProperties> = {
  live: { background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" },
  beta: { background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" },
  dev: { background: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" },
};

/* ─── CalloutCard ─── */

function CalloutCard({ c, accent, index, inView }: { c: CalloutDef; accent: string; index: number; inView: boolean }) {
  return (
    <motion.div
      className="absolute hidden lg:block pointer-events-none"
      style={{
        ...c.position,
        background: "rgba(10,10,15,0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        zIndex: 5,
      }}
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 12, scale: 0.94 }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ height: 2, background: accent }} />
      <div className="flex items-center gap-2.5" style={{ padding: "10px 14px" }}>
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: `${accent}26`,
            color: accent,
          }}
        >
          {svgIcons[c.svgKey]}
        </div>
        <div>
          <div className="text-[12px] font-bold" style={{ color: "#F0EDE6", fontFamily: "var(--font-dm-sans)" }}>{c.title}</div>
          <div className="text-[10px]" style={{ color: "#8C8880" }}>{c.subtitle}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── TextColumn ─── */

function TextColumn({ p }: { p: Product }) {
  const isExternal = p.href !== "#";
  return (
    <motion.div
      initial={{ opacity: 0, x: p.textSide === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="flex flex-col justify-center"
    >
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span className="inline-block text-[11px] font-bold px-2.5 py-1 tracking-[1px] uppercase" style={{ background: `${p.accent}26`, color: p.accent, border: `1px solid ${p.accent}40`, borderRadius: 6 }}>Preuve de concept</span>
        <span className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full tracking-wide" style={statusBadge[p.badge.type]}>{p.badge.label}</span>
      </div>
      <h3 className="font-extrabold mb-3" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px,3vw,42px)", lineHeight: 1.0, letterSpacing: "-1.5px", color: "var(--text)" }}>{p.name}</h3>
      <p className="text-[15px] font-light mb-6" style={{ color: "#8C8880", lineHeight: 1.6, maxWidth: 420 }}>{p.tagline}</p>
      <div className="mb-6" style={{ height: 1, background: "rgba(196,151,58,0.2)", maxWidth: 420 }} />
      <div className="mb-6" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 8, padding: 16, maxWidth: 420 }}>
        <div className="text-[11px] font-bold tracking-[0.15em] uppercase mb-3" style={{ color: p.accent }}>Ce que les agents font</div>
        <ul className="grid grid-cols-1 gap-y-1.5">
          {p.agents.map((a) => (
            <li key={a} className="text-[13px] font-light flex items-start gap-2" style={{ color: "var(--text)" }}>
              <span style={{ color: p.accent, fontSize: 9, marginTop: 4 }}>◆</span><span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-6" style={{ maxWidth: 420 }}>
        {p.stack.map((t) => (
          <span key={t} className="text-[12px] px-2.5 py-1" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, color: "var(--text-muted)" }}>{t}</span>
        ))}
      </div>
      <a href={p.href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} data-cursor="link" className="inline-flex items-center gap-1.5 text-[14px] no-underline w-fit group" style={{ color: p.accent, fontWeight: 600 }}>
        {p.link}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </a>
    </motion.div>
  );
}

/* ─── MockupColumn ─── */

function MockupColumn({ p }: { p: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Mockup = p.Mockup;

  return (
    <div ref={ref} className="relative" style={{ overflow: "visible" }}>
      {/* Glow */}
      <div className="absolute pointer-events-none hidden lg:block" aria-hidden style={{ inset: "-8%", background: `radial-gradient(circle, ${p.accent}1F 0%, transparent 70%)`, filter: "blur(60px)", zIndex: -1 }} />
      {/* Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Mockup />
      </motion.div>
      {/* Callouts */}
      {p.callouts.map((c, i) => (
        <CalloutCard key={i} c={c} accent={p.accent} index={i} inView={inView} />
      ))}
    </div>
  );
}

/* ─── ProductSection ─── */

function ProductSection({ p }: { p: Product }) {
  const textOnLeft = p.textSide === "left";
  return (
    <div className="py-20 lg:py-28">
      <div className="grid gap-12 lg:gap-16 items-center lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
        <div style={{ order: textOnLeft ? 0 : 1 }} className="max-lg:order-2"><TextColumn p={p} /></div>
        <div style={{ order: textOnLeft ? 1 : 0 }} className="max-lg:order-1"><MockupColumn p={p} /></div>
      </div>
    </div>
  );
}

/* ─── Portfolio ─── */

export default function Portfolio() {
  return (
    <section id="produits" className="relative" style={{ background: "#09090b", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="mx-auto py-24 md:py-32 px-6" style={{ maxWidth: 1200 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-16 md:mb-20">
          <div className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2" style={{ color: "var(--gold)" }}>
            <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />Nos preuves
          </div>
          <h2 className="font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-1.5px", color: "var(--text)" }}>On l&apos;a déjà fait.</h2>
          <p className="text-[17px] font-light" style={{ color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.65 }}>Trois équipes d&apos;agents IA construites et opérées par NBHC. Chaque interface est en production.</p>
        </motion.div>

        {products.map((p, i) => (
          <div key={p.id}>
            <ProductSection p={p} />
            {i < products.length - 1 && <div aria-hidden style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)" }} />}
          </div>
        ))}

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mt-20 md:mt-24 text-center" style={{ background: "rgba(196,151,58,0.04)", border: "1px solid rgba(196,151,58,0.2)", borderRadius: 12, padding: "60px 40px" }}>
          <div className="text-[11px] font-medium tracking-[3px] uppercase mb-3" style={{ color: "var(--gold)" }}>Sur mesure</div>
          <h3 className="font-bold mb-4" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(28px,3.5vw,42px)", letterSpacing: "-1px", color: "var(--text)", lineHeight: 1.1 }}>Votre secteur n&apos;est pas là&nbsp;?</h3>
          <p className="text-[16px] font-light mb-8 mx-auto" style={{ color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 560 }}>On construit des équipes d&apos;agents IA pour n&apos;importe quel métier.</p>
          <a href="/contact" data-cursor="link" className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 hover:opacity-90" style={{ background: "var(--gold)", color: "#0a0a0b", border: "none" }}>
            Parlez-nous de votre cas
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
