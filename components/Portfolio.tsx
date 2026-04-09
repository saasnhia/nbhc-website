"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealWords } from "../hooks/useReveal";

gsap.registerPlugin(ScrollTrigger);

/* ─── Product data ─── */

type Product = {
  id: string;
  badge: { label: string; type: "live" | "beta" | "dev" };
  name: string;
  image: string;
  domain: string;
  desc: string;
  agents: string[];
  stack: string[];
  link: string;
  href: string;
};

const products: Product[] = [
  {
    id: "vlogyz",
    badge: { label: "MVP live", type: "beta" },
    name: "Vlogyz",
    image: "/portfolio/vlogyz.png",
    domain: "vlogyz.vercel.app",
    desc: "Équipe d'agents IA pour le montage vidéo automatisé — alternative française à CapCut.",
    agents: [
      "Agent Transcription — Whisper en français",
      "Agent Montage — coupes silences/fillers",
      "Agent Sous-titres — 13 styles synchronisés",
      "Agent Score — viralité Hook/Pace/CTA/Clar",
    ],
    stack: ["Next.js 16", "Groq Whisper", "Mistral", "Remotion", "FFmpeg"],
    link: "vlogyz.vercel.app",
    href: "https://vlogyz.vercel.app",
  },
  {
    id: "devizly",
    badge: { label: "Live", type: "live" },
    name: "Devizly",
    image: "/portfolio/devizly.png",
    domain: "devizly.fr",
    desc: "Équipe d'agents IA pour la génération de devis et l'encaissement automatique.",
    agents: [
      "Agent Génération — devis depuis description",
      "Agent Conformité — mentions légales FR",
      "Agent Signature — eIDAS intégré",
      "Agent Paiement — acompte Stripe automatique",
    ],
    stack: ["Next.js 14", "Mistral", "Stripe", "Supabase", "Resend"],
    link: "devizly.fr",
    href: "https://devizly.fr",
  },
  {
    id: "worthifast",
    badge: { label: "En développement", type: "dev" },
    name: "Worthifast",
    image: "/portfolio/worthifast.png",
    domain: "worthifast.fr",
    desc: "Équipe d'agents IA pour l'automatisation comptable et la révision FEC.",
    agents: [
      "Agent FEC — import et analyse",
      "Agent Anomalies — détection IA",
      "Agent CA3 — pré-remplissage TVA",
      "Agent Rapprochement — matching bancaire",
    ],
    stack: ["Next.js 16", "Mistral", "Supabase", "Stripe", "PostgreSQL"],
    link: "Bêta à venir",
    href: "#",
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

/* ─── BrowserFrame — the 3D window containing the screenshot ─── */

function BrowserFrame({
  product,
  textOnLeft,
}: {
  product: Product;
  textOnLeft: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const frame = frameRef.current;
    const img = imageRef.current;
    if (!wrapper || !frame) return;

    // Initial 3D state — tilt depends on which side the text sits on
    const initialRotateY = textOnLeft ? -18 : 18;
    const initialRotateZ = textOnLeft ? 2 : -2;

    gsap.set(frame, {
      rotateX: 12,
      rotateY: initialRotateY,
      rotateZ: initialRotateZ,
      y: 60,
      opacity: 0,
      scale: 0.92,
      transformPerspective: 1200,
    });

    const reveal = ScrollTrigger.create({
      trigger: wrapper,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(frame, {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        });
      },
    });

    // Parallax on the inner image
    let parallax: ScrollTrigger | undefined;
    if (img) {
      parallax = ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(img, { y: -15 + self.progress * 30 });
        },
      });
    }

    return () => {
      reveal.kill();
      parallax?.kill();
    };
  }, [textOnLeft]);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      rotateX: -mouseY * 0.008,
      rotateY: mouseX * 0.012,
      duration: 0.5,
      ease: "power2.out",
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.6), 0 0 120px rgba(196,151,58,0.18), 0 0 80px rgba(196,151,58,0.15)",
    });
  };

  const onMouseLeave = () => {
    const el = frameRef.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.6), 0 0 120px rgba(196,151,58,0.08)",
    });
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ perspective: "1200px" }}
      className="w-full"
    >
      <div
        ref={frameRef}
        className="relative overflow-hidden"
        style={{
          background: "#111118",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px rgba(0,0,0,0.6), 0 0 120px rgba(196,151,58,0.08)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {/* Browser bar */}
        <div
          className="flex items-center gap-2 px-3"
          style={{
            height: 28,
            background: "#1a1a2e",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <span
            className="block rounded-full"
            style={{ width: 10, height: 10, background: "#ff5f56" }}
          />
          <span
            className="block rounded-full"
            style={{ width: 10, height: 10, background: "#ffbd2e" }}
          />
          <span
            className="block rounded-full"
            style={{ width: 10, height: 10, background: "#27c93f" }}
          />
          <div
            className="flex-1 flex items-center justify-center text-[10px] rounded-sm mx-3"
            style={{
              background: "#0d0d18",
              color: "#8C8880",
              height: 16,
              fontFamily: "var(--font-dm-sans)",
              letterSpacing: "0.2px",
            }}
          >
            {product.domain}
          </div>
          <div style={{ width: 30 }} />
        </div>

        {/* Screenshot */}
        <div
          ref={imageRef}
          className="relative"
          style={{
            height: 380,
            background: "linear-gradient(180deg, #0a0a0f 0%, #161619 100%)",
            willChange: "transform",
          }}
        >
          <Image
            src={product.image}
            alt={`Capture d'écran ${product.name}`}
            fill
            sizes="(max-width: 900px) 100vw, 560px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── ProductBlock — one product row (2 cols alternating) ─── */

function ProductBlock({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const textOnLeft = index % 2 === 0;
  const isExternal = product.href !== "#";

  const TextColumn = (
    <div className="flex flex-col justify-center">
      {/* Badges */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span
          className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase"
          style={{
            background: "var(--gold-dim)",
            color: "var(--gold-light)",
            border: "1px solid var(--gold-border)",
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
      <div
        className="mb-3 font-bold"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: 32,
          lineHeight: 1.1,
          letterSpacing: "-1px",
          color: "var(--text)",
        }}
      >
        {product.name}
      </div>

      {/* Description */}
      <p
        className="text-[15px] font-light mb-6"
        style={{ color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 460 }}
      >
        {product.desc}
      </p>

      {/* Agents */}
      <div
        className="mb-6 p-4"
        style={{
          background: "rgba(196,151,58,0.04)",
          border: "1px solid var(--gold-border)",
          borderRadius: 8,
          maxWidth: 460,
        }}
      >
        <div
          className="text-[10px] font-bold tracking-widest uppercase mb-2.5"
          style={{ color: "var(--gold)" }}
        >
          Ce que les agents font
        </div>
        <ul className="space-y-1.5">
          {product.agents.map((a) => (
            <li
              key={a}
              className="text-[12px] font-light flex items-start gap-2"
              style={{ color: "var(--text-muted)" }}
            >
              <span style={{ color: "var(--gold)", marginTop: 1 }}>›</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 mb-6" style={{ maxWidth: 460 }}>
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
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-cursor="link"
        className="inline-flex items-center gap-1.5 text-[14px] font-semibold no-underline w-fit group"
        style={{ color: "var(--gold)" }}
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
  );

  const FrameColumn = (
    <div className="flex items-center justify-center">
      <BrowserFrame product={product} textOnLeft={textOnLeft} />
    </div>
  );

  return (
    <div
      className="grid gap-12 max-[900px]:gap-8 items-center"
      style={{
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
      }}
    >
      {/* Mobile: always text then frame. Desktop: alternate via order. */}
      <div
        className="max-[900px]:col-span-full"
        style={{ order: textOnLeft ? 0 : 1 }}
      >
        {TextColumn}
      </div>
      <div
        className="max-[900px]:col-span-full"
        style={{ order: textOnLeft ? 1 : 0 }}
      >
        {FrameColumn}
      </div>
    </div>
  );
}

/* ─── Portfolio Section ─── */

export default function Portfolio() {
  const titleRef = useRevealWords("h2");
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="produits"
      ref={(el) => {
        sectionRef.current = el;
        (titleRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      style={{
        background: "#09090b",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {/* Section header */}
        <div className="mb-20 max-[900px]:mb-14">
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
            Ces 3 produits sont des équipes d&apos;agents IA que nous avons
            construits et opérons nous-mêmes. Votre solution sur mesure peut
            ressembler à ça.
          </p>
        </div>

        {/* Vertical stack of products with dividers */}
        {products.map((p, i) => (
          <div key={p.id}>
            <ProductBlock product={p} index={i} />
            {i < products.length - 1 && (
              <div
                aria-hidden
                style={{
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent, rgba(196,151,58,0.2), transparent)",
                  margin: "80px 0",
                }}
                className="max-[900px]:!my-14"
              />
            )}
          </div>
        ))}

        {/* Final CTA block */}
        <div
          className="mt-24 max-[900px]:mt-16 p-[60px] max-[900px]:p-8 text-center relative overflow-hidden"
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
        </div>
      </div>
    </section>
  );
}
