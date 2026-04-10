"use client";

import { motion } from "framer-motion";
import ProductShowcase from "./ProductShowcase";
import type { Callout } from "./ProductShowcase";

/* ─── Types ─── */

type TextSide = "left" | "right";

type Product = {
  id: string;
  badge: { label: string; type: "live" | "beta" | "dev" };
  name: string;
  tagline: string;
  agents: string[];
  stack: string[];
  link: string;
  href: string;
  accent: string;
  textSide: TextSide;
  showcase: {
    screenshot: string;
    screenshotW: number;
    screenshotH: number;
    maxWidth: number;
    rotateY: number;
    callouts: Callout[];
  };
};

/* ─── Products ─── */

const products: Product[] = [
  {
    id: "vlogyz",
    badge: { label: "MVP live", type: "beta" },
    name: "Vlogyz",
    tagline:
      "Équipe d'agents IA pour le montage vidéo automatisé. Alternative française à CapCut.",
    agents: [
      "Agent Transcription",
      "Agent Montage",
      "Agent Sous-titres",
      "Agent Score viralité",
    ],
    stack: ["Next.js 16", "Groq Whisper", "Mistral", "Remotion", "FFmpeg"],
    link: "vlogyz.vercel.app",
    href: "https://vlogyz.vercel.app",
    accent: "#6366f1",
    textSide: "left",
    showcase: {
      screenshot: "/portfolio/vlogyz.png",
      screenshotW: 1918,
      screenshotH: 912,
      maxWidth: 650,
      rotateY: -8,
      callouts: [
        {
          icon: "🎙",
          title: "Transcription IA",
          subtitle: "502 mots détectés en 12s",
          type: "waveform",
          position: { top: "-5%", left: "-3%" },
        },
        {
          icon: "✂️",
          title: "Coupes intelligentes",
          subtitle: "1m23s de silences supprimés",
          type: "timeline-cuts",
          position: { top: "45%", left: "-15%" },
        },
        {
          icon: "🔥",
          title: "Score viralité",
          subtitle: "87/100",
          type: "score-circle",
          score: 87,
          position: { bottom: "-5%", right: "-3%" },
        },
      ],
    },
  },
  {
    id: "devizly",
    badge: { label: "Live", type: "live" },
    name: "Devizly",
    tagline:
      "Équipe d'agents IA pour la génération de devis et l'encaissement automatique.",
    agents: [
      "Agent Génération",
      "Agent Conformité",
      "Agent Signature",
      "Agent Paiement",
    ],
    stack: ["Next.js 14", "Mistral", "Stripe", "Supabase", "Resend"],
    link: "devizly.fr",
    href: "https://devizly.fr",
    accent: "#5B5BD6",
    textSide: "right",
    showcase: {
      screenshot: "/portfolio/deviss.png",
      screenshotW: 475,
      screenshotH: 656,
      maxWidth: 380,
      rotateY: 8,
      callouts: [
        {
          icon: "✅",
          title: "Signature reçue",
          subtitle: "il y a 2 min",
          type: "signature-draw",
          position: { top: "-3%", right: "-20%" },
        },
        {
          icon: "📄",
          title: "Devis DEV-0020",
          subtitle: "Conforme CGI",
          type: "devis-lines",
          position: { top: "40%", right: "-25%" },
        },
        {
          icon: "💳",
          title: "Acompte Stripe",
          subtitle: "4 978,80 €",
          type: "stripe-countup",
          position: { bottom: "5%", left: "-15%" },
        },
      ],
    },
  },
  {
    id: "worthifast",
    badge: { label: "En développement", type: "dev" },
    name: "Worthifast",
    tagline:
      "Équipe d'agents IA pour l'automatisation comptable et la révision FEC.",
    agents: [
      "Agent FEC",
      "Agent Anomalies",
      "Agent CA3",
      "Agent Rapprochement",
    ],
    stack: ["Next.js 16", "Mistral", "Supabase", "Stripe", "PostgreSQL"],
    link: "Bêta à venir",
    href: "#",
    accent: "#22c55e",
    textSide: "left",
    showcase: {
      screenshot: "/portfolio/worthifast.png",
      screenshotW: 1912,
      screenshotH: 908,
      maxWidth: 650,
      rotateY: -8,
      callouts: [
        {
          icon: "📄",
          title: "Import FEC",
          subtitle: "12 458 écritures",
          type: "fec-import",
          position: { top: "-5%", left: "-3%" },
        },
        {
          icon: "⚠️",
          title: "Anomalies détectées",
          subtitle: "3 anomalies",
          type: "mini-ledger",
          position: { top: "40%", right: "-10%" },
        },
        {
          icon: "✅",
          title: "TVA CA3",
          subtitle: "8 036 €",
          type: "tva-ca3",
          position: { bottom: "-5%", right: "-3%" },
        },
      ],
    },
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

/* ─── TextColumn ─── */

function TextColumn({ product }: { product: Product }) {
  const isExternal = product.href !== "#";

  return (
    <motion.div
      initial={{ opacity: 0, x: product.textSide === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="flex flex-col justify-center"
    >
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span
          className="inline-block text-[11px] font-bold px-2.5 py-1 tracking-[1px] uppercase"
          style={{
            background: `${product.accent}26`,
            color: product.accent,
            border: `1px solid ${product.accent}40`,
            borderRadius: 6,
          }}
        >
          Preuve de concept
        </span>
        <span
          className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full tracking-wide"
          style={badgeStyles[product.badge.type]}
        >
          {product.badge.label}
        </span>
      </div>

      <h3
        className="font-bold mb-3"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: 44,
          lineHeight: 1.0,
          letterSpacing: "-2px",
          color: "var(--text)",
        }}
      >
        {product.name}
      </h3>

      <p
        className="text-[16px] font-light mb-6"
        style={{ color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 420 }}
      >
        {product.tagline}
      </p>

      <div
        className="mb-6"
        style={{ height: 1, background: "rgba(196,151,58,0.2)", maxWidth: 420 }}
      />

      <div
        className="mb-6"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 8,
          padding: 16,
          maxWidth: 420,
        }}
      >
        <div
          className="text-[10px] font-bold tracking-[1.5px] uppercase mb-3"
          style={{ color: product.accent }}
        >
          Ce que les agents font
        </div>
        <ul className="grid grid-cols-1 gap-y-1.5">
          {product.agents.map((a) => (
            <li
              key={a}
              className="text-[13px] font-light flex items-start gap-2"
              style={{ color: "var(--text)" }}
            >
              <span style={{ color: product.accent, fontSize: 9, marginTop: 4 }}>◆</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6" style={{ maxWidth: 420 }}>
        {product.stack.map((t) => (
          <span
            key={t}
            className="text-[12px] px-2.5 py-1"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20,
              color: "var(--text-muted)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <a
        href={product.href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-cursor="link"
        className="inline-flex items-center gap-1.5 text-[14px] no-underline w-fit group"
        style={{ color: product.accent, fontWeight: 600 }}
      >
        {product.link}
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
      </a>
    </motion.div>
  );
}

/* ─── ProductSection ─── */

function ProductSection({ product }: { product: Product }) {
  const textOnLeft = product.textSide === "left";

  return (
    <div className="py-16 md:py-20" style={{ overflow: "hidden" }}>
      <div className="grid gap-10 lg:gap-16 items-center lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
        <div style={{ order: textOnLeft ? 0 : 1 }} className="max-lg:order-2">
          <TextColumn product={product} />
        </div>
        <div
          style={{ order: textOnLeft ? 1 : 0, overflow: "visible" }}
          className="max-lg:order-1"
        >
          <ProductShowcase
            screenshot={product.showcase.screenshot}
            screenshotW={product.showcase.screenshotW}
            screenshotH={product.showcase.screenshotH}
            maxWidth={product.showcase.maxWidth}
            rotateY={product.showcase.rotateY}
            accentColor={product.accent}
            callouts={product.showcase.callouts}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Portfolio ─── */

export default function Portfolio() {
  return (
    <section
      id="produits"
      className="relative"
      style={{
        background: "#09090b",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto py-24 md:py-32 px-6" style={{ maxWidth: 1200 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-20"
        >
          <div
            className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
            style={{ color: "var(--gold)" }}
          >
            <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
            Nos preuves
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
            On l&apos;a déjà fait.
          </h2>
          <p
            className="text-[17px] font-light"
            style={{ color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.65 }}
          >
            Trois équipes d&apos;agents IA construites et opérées par NBHC.
            Chaque interface est en production.
          </p>
        </motion.div>

        {products.map((p, i) => (
          <div key={p.id}>
            <ProductSection product={p} />
            {i < products.length - 1 && (
              <div
                aria-hidden
                style={{
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(196,151,58,0.2) 50%, transparent 100%)",
                  margin: "40px 0",
                }}
              />
            )}
          </div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-24 text-center"
          style={{
            background: "rgba(196,151,58,0.04)",
            border: "1px solid rgba(196,151,58,0.2)",
            borderRadius: 12,
            padding: "60px 40px",
          }}
        >
          <div
            className="text-[11px] font-medium tracking-[3px] uppercase mb-3"
            style={{ color: "var(--gold)" }}
          >
            Sur mesure
          </div>
          <h3
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 3.5vw, 42px)",
              letterSpacing: "-1px",
              color: "var(--text)",
              lineHeight: 1.1,
            }}
          >
            Votre secteur n&apos;est pas là&nbsp;?
          </h3>
          <p
            className="text-[16px] font-light mb-8 mx-auto"
            style={{ color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 560 }}
          >
            On construit des équipes d&apos;agents IA pour n&apos;importe quel métier.
          </p>
          <a
            href="/contact"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--gold)", color: "#0a0a0b", border: "none" }}
          >
            Parlez-nous de votre cas
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
