"use client";

import { ComponentType } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import DevizlyFlow from "./illustrations/DevizlyFlow";
import VlogyzFlow from "./illustrations/VlogyzFlow";
import WorthifastFlow from "./illustrations/WorthifastFlow";

/* ─── Types ─── */

type TextSide = "left" | "right";

type Product = {
  id: string;
  badge: { label: string; type: "live" | "beta" | "dev" };
  name: string;
  tagline: string;
  Flow: ComponentType;
  agents: string[];
  stack: string[];
  link: string;
  href: string;
  accent: string;
  textSide: TextSide;
  /** Screenshot for 3D tilt display alongside the flow */
  screenshot: { src: string; w: number; h: number; maxW: number; rotY: number };
};

/* ─── Products ─── */

const products: Product[] = [
  {
    id: "vlogyz",
    badge: { label: "MVP live", type: "beta" },
    name: "Vlogyz",
    tagline:
      "Équipe d'agents IA pour le montage vidéo automatisé. Alternative française à CapCut.",
    Flow: VlogyzFlow,
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
    screenshot: { src: "/portfolio/vlogyz.png", w: 1918, h: 912, maxW: 340, rotY: -12 },
  },
  {
    id: "devizly",
    badge: { label: "Live", type: "live" },
    name: "Devizly",
    tagline:
      "Équipe d'agents IA pour la génération de devis et l'encaissement automatique.",
    Flow: DevizlyFlow,
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
    screenshot: { src: "/portfolio/deviss.png", w: 475, h: 656, maxW: 280, rotY: 12 },
  },
  {
    id: "worthifast",
    badge: { label: "En développement", type: "dev" },
    name: "Worthifast",
    tagline:
      "Équipe d'agents IA pour l'automatisation comptable et la révision FEC.",
    Flow: WorthifastFlow,
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
    screenshot: { src: "/portfolio/worthifast.png", w: 1912, h: 908, maxW: 320, rotY: -12 },
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
      initial={{
        opacity: 0,
        x: product.textSide === "left" ? -30 : 30,
      }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="flex flex-col justify-center"
    >
      {/* Badges row */}
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

      {/* Title */}
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

      {/* Tagline */}
      <p
        className="text-[16px] font-light mb-6"
        style={{
          color: "var(--text-muted)",
          lineHeight: 1.6,
          maxWidth: 420,
        }}
      >
        {product.tagline}
      </p>

      {/* Separator */}
      <div
        className="mb-6"
        style={{
          height: 1,
          background: "rgba(196,151,58,0.2)",
          maxWidth: 420,
        }}
      />

      {/* Agents block */}
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
              <span
                style={{ color: product.accent, fontSize: 9, marginTop: 4 }}
              >
                ◆
              </span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack */}
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

      {/* Link */}
      <a
        href={product.href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
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
  const Flow = product.Flow;

  return (
    <div className="py-16 md:py-20">
      <div className="grid gap-10 md:gap-16 items-start md:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
        <div style={{ order: textOnLeft ? 0 : 1 }} className="max-md:order-2">
          <TextColumn product={product} />
        </div>
        <div style={{ order: textOnLeft ? 1 : 0 }} className="max-md:order-1">
          <div className="flex gap-6 items-center">
            <div className="flex-1 min-w-0">
              <Flow />
            </div>
            {/* 3D screenshot — hidden on mobile + tablet, visible on lg+ */}
            <div
              className="hidden lg:block flex-shrink-0"
              style={{ perspective: "1200px" }}
            >
              <motion.div
                whileHover={{
                  rotateY: product.screenshot.rotY > 0 ? 4 : -4,
                  rotateX: 2,
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
              >
                <Image
                  src={product.screenshot.src}
                  alt={`${product.name} interface`}
                  width={product.screenshot.w}
                  height={product.screenshot.h}
                  unoptimized
                  style={{
                    maxWidth: product.screenshot.maxW,
                    height: "auto",
                    transform: `rotateY(${product.screenshot.rotY}deg) rotateX(4deg)`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    willChange: "transform",
                    borderRadius: 16,
                    boxShadow: "0 25px 60px rgba(0,0,0,0.35)",
                    imageRendering: "auto",
                  }}
                />
              </motion.div>
            </div>
          </div>
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
        {/* Section header */}
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
            <span
              className="block w-4 h-px"
              style={{ background: "var(--gold)" }}
            />
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
            style={{
              color: "var(--text-muted)",
              maxWidth: 640,
              lineHeight: 1.65,
            }}
          >
            Trois équipes d&apos;agents IA construites et opérées par NBHC.
            Chaque étape est un agent en production.
          </p>
        </motion.div>

        {/* Product sections with dividers */}
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

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-24 text-center relative overflow-hidden"
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
            style={{
              color: "var(--text-muted)",
              lineHeight: 1.65,
              maxWidth: 560,
            }}
          >
            On construit des équipes d&apos;agents IA pour n&apos;importe quel
            métier.
          </p>
          <a
            href="/contact"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 hover:opacity-90"
            style={{
              background: "var(--gold)",
              color: "#0a0a0b",
              border: "none",
            }}
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
