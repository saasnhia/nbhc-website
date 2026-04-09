"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

/* ─── Product data ─── */

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
  accent: string; // hex color
  bg: string;
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
    bg: "#0a0a10",
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
    bg: "#080f08",
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

/* ─── BrowserFrame — premium macOS-style window with real screenshot ─── */

function BrowserFrame({ product }: { product: Product }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, amount: 0.3 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  // Parallax on inner image
  const { scrollYProgress } = useScroll({
    target: inViewRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const parallaxYSpring = useSpring(parallaxY, { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 16 });
  };

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => {
    setHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  // Shadow: base + dynamic glow on hover using product accent
  const restShadow =
    "0 0 0 1px rgba(255,255,255,0.04), 0 50px 100px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.3)";
  const hoverShadow = `0 0 0 1px ${product.accent}33, 0 30px 80px ${product.accent}4D, 0 50px 100px rgba(0,0,0,0.5), 0 20px 40px rgba(0,0,0,0.3)`;

  return (
    <div
      ref={inViewRef}
      style={{ perspective: "1200px" }}
      className="w-full"
    >
      <motion.div
        ref={frameRef}
        initial={{ opacity: 0, y: 80, rotateX: 15, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
            : { opacity: 0, y: 80, rotateX: 15, scale: 0.9 }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden"
        style={{
          background: "#0d0d18",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: hovering ? hoverShadow : restShadow,
          transformStyle: "preserve-3d",
          transition: "box-shadow 0.4s ease-out",
          rotateX: tilt.x,
          rotateY: tilt.y,
          willChange: "transform",
        }}
      >
        {/* Subtle floating idle animation on the whole frame */}
        <motion.div
          animate={
            !hovering
              ? { y: [0, -6, 0] }
              : { y: 0 }
          }
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Browser title bar */}
          <div
            className="flex items-center gap-2 px-4"
            style={{
              height: 38,
              background: "linear-gradient(180deg, #1a1a2e 0%, #14142a 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* macOS dots */}
            {[
              { c: "#ff5f57" },
              { c: "#febc2e" },
              { c: "#28c840" },
            ].map((d, i) => (
              <span
                key={i}
                className="block rounded-full"
                style={{
                  width: 12,
                  height: 12,
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, ${d.c} 60%)`,
                }}
              />
            ))}
            {/* URL bar */}
            <div
              className="flex-1 flex items-center justify-center gap-1.5 mx-4 rounded-full"
              style={{
                height: 20,
                background: "rgba(255,255,255,0.06)",
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
              height: 400,
              background: "linear-gradient(180deg, #0a0a0f 0%, #161619 100%)",
              overflow: "hidden",
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ y: parallaxYSpring, willChange: "transform" }}
            >
              <Image
                src={product.image}
                alt={`Capture d'écran ${product.name}`}
                fill
                sizes="(max-width: 900px) 100vw, 1000px"
                className="object-cover object-top"
                priority={false}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Accent glow overlay on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${product.accent}1A 0%, transparent 60%)`,
            opacity: hovering ? 1 : 0,
            transition: "opacity 0.4s ease-out",
          }}
        />
      </motion.div>

      {/* Mobile: drop height to 240 */}
      <style jsx>{`
        @media (max-width: 900px) {
          .w-full :global(div[style*="height: 400"]) {
            height: 240px !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ─── ProductSection — one full product row ─── */

function ProductSection({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isExternal = product.href !== "#";

  return (
    <div
      ref={sectionRef}
      className="py-32 px-10 max-[900px]:py-20 max-[900px]:px-5 relative"
      style={{ background: product.bg }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header row — badges + title + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-[900px]:mb-10"
        >
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
          <h3
            className="font-bold mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              color: "var(--text)",
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-[17px] font-light"
            style={{
              color: "var(--text-muted)",
              maxWidth: 640,
              lineHeight: 1.6,
            }}
          >
            {product.tagline}
          </p>
        </motion.div>

        {/* Browser frame — the hero visual */}
        <BrowserFrame product={product} />

        {/* Footer row — agents + stack + link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 max-[900px]:mt-10"
        >
          {/* Agents row */}
          <div className="mb-8">
            <div
              className="text-[10px] font-bold tracking-widest uppercase mb-4"
              style={{ color: product.accent }}
            >
              Ce que les agents font
            </div>
            <div className="flex flex-wrap gap-3">
              {product.agents.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${product.accent}33`,
                    color: "var(--text)",
                  }}
                >
                  <span style={{ color: product.accent, fontSize: 10 }}>◆</span>
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Stack + link row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-wrap gap-1.5">
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
            <a
              href={product.href}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              data-cursor="link"
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold no-underline group"
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Portfolio Section ─── */

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  // Left progression line — scales with scroll inside the whole section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const progressScale = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  return (
    <section
      id="produits"
      ref={sectionRef}
      className="relative"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Vertical progression line on the left */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          left: "max(20px, calc((100vw - 1200px) / 2 - 20px))",
          top: 0,
          bottom: 0,
          width: 1,
          background: "rgba(196,151,58,0.1)",
          pointerEvents: "none",
          zIndex: 1,
        }}
        className="max-[900px]:hidden"
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#C4973A",
            transformOrigin: "top",
            scaleY: progressScale,
          }}
        />
      </motion.div>

      {/* Section header */}
      <div
        className="pt-24 pb-8 px-10 max-[900px]:pt-16 max-[900px]:pb-6 max-[900px]:px-5"
        style={{ background: "#09090b" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
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
                lineHeight: 1.7,
              }}
            >
              Trois équipes d&apos;agents IA que nous avons conçues, déployées
              et opérons nous-mêmes. Chaque capture est une interface réelle en
              production.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Product sections stacked */}
      {products.map((p) => (
        <ProductSection key={p.id} product={p} />
      ))}

      {/* Final CTA */}
      <div
        className="px-10 max-[900px]:px-5 pb-24 pt-8 max-[900px]:pb-16"
        style={{ background: "#09090b" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-[60px] max-[900px]:p-8 text-center relative overflow-hidden"
            style={{
              background: "rgba(196,151,58,0.05)",
              border: "1px solid rgba(196,151,58,0.2)",
              borderRadius: 16,
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
