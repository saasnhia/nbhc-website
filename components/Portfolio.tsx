"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ─── Types ─── */

type TextSide = "left" | "right";

type FloatingBadge = {
  text: string;
  icon?: string;
  /** Tailwind-ish positional class to place the badge around the mockup */
  position: React.CSSProperties;
  color?: string;
  /** Vertical float amplitude in px */
  amp: number;
  duration: number;
  delay: number;
};

type Product = {
  id: string;
  badge: { label: string; type: "live" | "beta" | "dev" };
  name: string;
  tagline: string;
  image: string;
  agents: string[];
  stack: string[];
  link: string;
  href: string;
  accent: string;
  textSide: TextSide;
  floating: FloatingBadge[];
};

/* ─── Products ─── */

const products: Product[] = [
  {
    id: "vlogyz",
    badge: { label: "MVP live", type: "beta" },
    name: "Vlogyz",
    tagline:
      "Équipe d'agents IA pour le montage vidéo automatisé. Alternative française à CapCut.",
    image: "/portfolio/vlogyz.png",
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
    floating: [
      {
        icon: "🎬",
        text: "Sous-titres générés — 2m 34s",
        position: { top: "8%", left: "-6%" },
        amp: 6,
        duration: 3,
        delay: 0,
      },
      {
        icon: "⚡",
        text: "Score viralité : 87/100",
        position: { bottom: "10%", right: "-4%" },
        amp: 8,
        duration: 4,
        delay: 0.5,
        color: "#818cf8",
      },
      {
        icon: "✓",
        text: "1m 23s supprimés automatiquement",
        position: { top: "42%", left: "-12%" },
        amp: 5,
        duration: 3.5,
        delay: 1,
        color: "#4ade80",
      },
    ],
  },
  {
    id: "devizly",
    badge: { label: "Live", type: "live" },
    name: "Devizly",
    tagline:
      "Équipe d'agents IA pour la génération de devis et l'encaissement automatique.",
    image: "/portfolio/devizly.png",
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
    floating: [
      {
        icon: "✓",
        text: "Signature reçue — il y a 2 min",
        position: { top: "6%", right: "-6%" },
        amp: 7,
        duration: 3.5,
        delay: 0,
        color: "#4ade80",
      },
      {
        icon: "S",
        text: "Acompte Stripe — 4 978,80 €",
        position: { bottom: "12%", left: "-4%" },
        amp: 6,
        duration: 4,
        delay: 0.8,
        color: "#8b8bff",
      },
      {
        icon: "📄",
        text: "Devis DEV-0020 — Conforme CGI",
        position: { top: "46%", right: "-10%" },
        amp: 5,
        duration: 3,
        delay: 0.3,
      },
    ],
  },
  {
    id: "worthifast",
    badge: { label: "En développement", type: "dev" },
    name: "Worthifast",
    tagline:
      "Équipe d'agents IA pour l'automatisation comptable et la révision FEC.",
    image: "/portfolio/worthifast.png",
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
    floating: [
      {
        icon: "⚠",
        text: "3 anomalies détectées — FEC",
        position: { top: "8%", left: "-6%" },
        amp: 6,
        duration: 3.5,
        delay: 0,
        color: "#fb923c",
      },
      {
        icon: "✓",
        text: "TVA CA3 pré-remplie — 8 036 €",
        position: { bottom: "10%", right: "-8%" },
        amp: 8,
        duration: 4,
        delay: 0.6,
        color: "#4ade80",
      },
      {
        icon: "🔄",
        text: "Rapprochement 95% — 12 tx",
        position: { top: "44%", right: "-10%" },
        amp: 5,
        duration: 3,
        delay: 1.2,
      },
    ],
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

/* ─── FloatingBadge component ─── */

function FloatingBadgeView({
  badge,
  index,
}: {
  badge: FloatingBadge;
  index: number;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none hidden md:flex"
      style={{
        ...badge.position,
        background: "rgba(15,15,20,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 10,
        padding: "10px 14px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        fontSize: 12,
        color: "#F0EDE6",
        fontFamily: "var(--font-dm-sans)",
        whiteSpace: "nowrap",
        alignItems: "center",
        gap: 8,
        zIndex: 3,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.5,
        delay: 0.3 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={{ y: [0, -badge.amp, 0] }}
        transition={{
          duration: badge.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: badge.delay,
        }}
      >
        {badge.icon && (
          <span
            className="inline-flex items-center justify-center"
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              background: badge.color ? `${badge.color}26` : "rgba(255,255,255,0.06)",
              color: badge.color ?? "#F0EDE6",
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            {badge.icon}
          </span>
        )}
        <span style={{ fontWeight: 500 }}>{badge.text}</span>
      </motion.div>
    </motion.div>
  );
}

/* ─── FloatingMockup — 3D tilted screenshot with floating badges ─── */

function FloatingMockup({ product }: { product: Product }) {
  const tiltY = product.textSide === "left" ? -15 : 15;
  const hoverRotY = product.textSide === "left" ? -8 : 8;

  return (
    <div
      className="relative w-full flex items-center justify-center"
      style={{
        perspective: "1200px",
        minHeight: 460,
      }}
    >
      <motion.div
        className="relative"
        style={{
          width: "100%",
          maxWidth: 580,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* The tilted screenshot */}
        <motion.div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `0 50px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06), 0 0 80px ${product.accent}1F`,
            // Initial 3D tilt (md+ only — reset on mobile via className override below)
            transform: `rotateY(${tiltY}deg) rotateX(5deg)`,
          }}
          whileHover={{
            rotateY: hoverRotY,
            rotateX: 2,
            scale: 1.02,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <div
            className="relative"
            style={{
              width: "100%",
              aspectRatio: "16 / 10",
              background: "#0a0a0f",
            }}
          >
            <Image
              src={product.image}
              alt={`Capture d'écran ${product.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 580px"
              className="object-cover object-top"
              priority={false}
            />
          </div>
        </motion.div>

        {/* Floating badges around the mockup */}
        {product.floating.map((b, i) => (
          <FloatingBadgeView key={i} badge={b} index={i} />
        ))}
      </motion.div>

      {/* Disable 3D tilt on mobile */}
      <style jsx>{`
        @media (max-width: 767px) {
          .relative > div > div[style*="rotateY"] {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

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

  return (
    <div className="py-16 md:py-20">
      <div
        className="grid gap-10 md:gap-16 items-center"
        style={{
          gridTemplateColumns: "minmax(0, 1fr)",
        }}
      >
        <div
          className="grid gap-10 md:gap-16 items-center md:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]"
        >
          <div style={{ order: textOnLeft ? 0 : 1 }} className="max-md:order-2">
            <TextColumn product={product} />
          </div>
          <div
            style={{ order: textOnLeft ? 1 : 0 }}
            className="max-md:order-1"
          >
            <FloatingMockup product={product} />
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
      <div
        className="mx-auto py-24 md:py-32 px-6"
        style={{ maxWidth: 1200 }}
      >
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
            Chaque interface est en production.
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
