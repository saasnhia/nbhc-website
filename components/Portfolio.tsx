"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* ─── Product data ─── */

type TextSide = "left" | "right";

type Product = {
  id: string;
  badge: { label: string; type: "live" | "beta" | "dev" };
  name: string;
  tagline: string;
  image: string;
  domain: string;
  agents: string[];
  stack: string[];
  link: string;
  href: string;
  accent: string;
  bg: string;
  textSide: TextSide;
};

const products: Product[] = [
  {
    id: "vlogyz",
    badge: { label: "MVP live", type: "beta" },
    name: "Vlogyz",
    tagline:
      "Équipe d'agents IA pour le montage vidéo automatisé. Alternative française à CapCut.",
    image: "/portfolio/vlogyz.png",
    domain: "vlogyz.vercel.app",
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
    bg: "#09090b",
    textSide: "left",
  },
  {
    id: "devizly",
    badge: { label: "Live", type: "live" },
    name: "Devizly",
    tagline:
      "Équipe d'agents IA pour la génération de devis et l'encaissement automatique.",
    image: "/portfolio/devizly.png",
    domain: "devizly.fr",
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
    bg: "#08090e",
    textSide: "right",
  },
  {
    id: "worthifast",
    badge: { label: "En développement", type: "dev" },
    name: "Worthifast",
    tagline:
      "Équipe d'agents IA pour l'automatisation comptable et la révision FEC.",
    image: "/portfolio/worthifast.png",
    domain: "worthifast.fr",
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
    bg: "#080e09",
    textSide: "left",
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

/* ─── BrowserFrame ─── */

function BrowserFrame({ product }: { product: Product }) {
  const restShadow = `0 0 0 1px rgba(255,255,255,0.06), 0 30px 60px rgba(0,0,0,0.5), 0 0 80px ${product.accent}1F`;
  const hoverShadow = `0 0 0 1px ${product.accent}40, 0 40px 80px rgba(0,0,0,0.6), 0 0 100px ${product.accent}33`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden w-full"
      style={{
        background: "#0d0d18",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: restShadow,
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = hoverShadow;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = restShadow;
      }}
    >
      {/* macOS title bar */}
      <div
        className="flex items-center gap-2 px-4"
        style={{
          height: 36,
          background: "#1c1c2e",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span
          className="block rounded-full"
          style={{
            width: 11,
            height: 11,
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, #ff5f57 60%)",
          }}
        />
        <span
          className="block rounded-full"
          style={{
            width: 11,
            height: 11,
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, #febc2e 60%)",
          }}
        />
        <span
          className="block rounded-full"
          style={{
            width: 11,
            height: 11,
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, #28c840 60%)",
          }}
        />
        <div
          className="flex-1 flex items-center justify-center gap-1.5 mx-4 rounded-full"
          style={{
            height: 20,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: 11,
            color: "#8C8880",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <rect
              x="2"
              y="4.5"
              width="6"
              height="4"
              rx="0.8"
              stroke="#8C8880"
              strokeWidth="0.8"
            />
            <path
              d="M3.5 4.5V3a1.5 1.5 0 013 0v1.5"
              stroke="#8C8880"
              strokeWidth="0.8"
            />
          </svg>
          {product.domain}
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Screenshot */}
      <div
        className="relative"
        style={{
          height: 440,
          background: "linear-gradient(180deg, #0a0a0f 0%, #161619 100%)",
          overflow: "hidden",
        }}
      >
        <Image
          src={product.image}
          alt={`Capture d'écran ${product.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          className="object-cover object-top"
        />
      </div>
    </motion.div>
  );
}

/* ─── TextColumn ─── */

function TextColumn({ product }: { product: Product }) {
  const isExternal = product.href !== "#";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: product.textSide === "left" ? -40 : 40,
      }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col justify-center"
    >
      {/* Badges */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span
          className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase"
          style={{
            background: `${product.accent}1A`,
            color: product.accent,
            border: `1px solid ${product.accent}33`,
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
          fontSize: 40,
          lineHeight: 1.05,
          letterSpacing: "-1.5px",
          color: "var(--text)",
        }}
      >
        {product.name}
      </h3>

      {/* Tagline */}
      <p
        className="text-[15px] font-light mb-6"
        style={{
          color: "var(--text-muted)",
          lineHeight: 1.6,
          maxWidth: 440,
        }}
      >
        {product.tagline}
      </p>

      {/* Agents block */}
      <div
        className="mb-6 p-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${product.accent}26`,
          borderRadius: 8,
          maxWidth: 440,
        }}
      >
        <div
          className="text-[10px] font-bold tracking-widest uppercase mb-3"
          style={{ color: product.accent }}
        >
          Ce que les agents font
        </div>
        <ul className="grid grid-cols-2 gap-y-1.5 gap-x-3">
          {product.agents.map((a) => (
            <li
              key={a}
              className="text-[12px] font-light flex items-start gap-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              <span
                style={{ color: product.accent, fontSize: 8, marginTop: 3 }}
              >
                ◆
              </span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 mb-6" style={{ maxWidth: 440 }}>
        {product.stack.map((t) => (
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

      {/* Link */}
      <a
        href={product.href}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        data-cursor="link"
        className="inline-flex items-center gap-1.5 text-[14px] font-semibold no-underline w-fit group"
        style={{ color: product.accent }}
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

/* ─── ProductSection — 2 columns side by side ─── */

function ProductSection({ product }: { product: Product }) {
  const textOnLeft = product.textSide === "left";

  return (
    <div
      className="px-10 max-[768px]:px-5 py-20 max-[768px]:py-12"
      style={{ background: product.bg }}
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto" }}
        className="grid items-center gap-12 max-[768px]:gap-8"
      >
        <div
          className="grid gap-12 max-[768px]:gap-8 items-center"
          style={{
            gridTemplateColumns: "minmax(0, 45fr) minmax(0, 55fr)",
            minHeight: 520,
          }}
        >
          {/* Desktop: alternating via order. Mobile: stack, frame first. */}
          <div
            className="max-[768px]:col-span-full"
            style={{ order: textOnLeft ? 0 : 1 }}
          >
            <div className="max-[768px]:hidden">
              <TextColumn product={product} />
            </div>
          </div>
          <div
            className="max-[768px]:col-span-full"
            style={{ order: textOnLeft ? 1 : 0 }}
          >
            <BrowserFrame product={product} />
          </div>
          {/* Mobile text column — rendered after the frame */}
          <div className="hidden max-[768px]:block col-span-full">
            <TextColumn product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Portfolio Section ─── */

export default function Portfolio() {
  return (
    <section
      id="produits"
      className="relative"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Section header */}
      <div
        className="pt-24 pb-12 px-10 max-[768px]:pt-16 max-[768px]:pb-8 max-[768px]:px-5"
        style={{ background: "#09090b" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
              Trois équipes d&apos;agents IA que nous avons conçues, déployées
              et opérons nous-mêmes. Chaque capture est une interface réelle en
              production.
            </p>
          </motion.div>
        </div>
      </div>

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
                  "linear-gradient(90deg, transparent 0%, rgba(196,151,58,0.15) 50%, transparent 100%)",
              }}
            />
          )}
        </div>
      ))}

      {/* Final CTA */}
      <div
        className="px-10 max-[768px]:px-5 pt-12 pb-24 max-[768px]:pb-16"
        style={{ background: "#09090b" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative overflow-hidden"
            style={{
              background: "rgba(196,151,58,0.04)",
              border: "1px solid rgba(196,151,58,0.15)",
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
      </div>
    </section>
  );
}
