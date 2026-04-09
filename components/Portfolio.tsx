"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
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
    image: "/portfolio/vlogyz.png",
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
    badge: { label: "Live", type: "live" as const },
    name: "Devizly",
    image: "/portfolio/devizly.png",
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
    badge: { label: "En développement", type: "dev" as const },
    name: "Worthifast",
    image: "/portfolio/worthifast.png",
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


/* ─── ProductCard ─── */

function ProductCard({ p, isMobile }: { p: (typeof products)[number]; isMobile: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const screenshotRef = useRef<HTMLDivElement>(null);

  // Scroll-in 3D reveal + parallax on screenshot
  useEffect(() => {
    const card = cardRef.current;
    const shot = screenshotRef.current;
    if (!card) return;

    // Initial 3D state
    gsap.set(card, { rotateY: -8, opacity: 0, y: 20 });
    const reveal = ScrollTrigger.create({
      trigger: card,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(card, {
          rotateY: 0,
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
        });
      },
    });

    let parallax: ScrollTrigger | undefined;
    if (shot) {
      parallax = ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          gsap.set(shot, { y: -20 + self.progress * 40 });
        },
      });
    }

    return () => {
      reveal.kill();
      parallax?.kill();
    };
  }, []);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 12;
    const rotateX = ((y / rect.height) - 0.5) * -12;

    gsap.to(el, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      boxShadow: "0 30px 60px -20px rgba(196,151,58,0.25)",
    });
    gsap.to(glow, {
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15) 0%, transparent 60%)`,
      opacity: 1,
      duration: 0.3,
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
    });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
  };

  const isExternal = p.href !== "#";

  return (
    <a
      ref={cardRef}
      href={p.href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-cursor="card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="flex flex-col overflow-hidden no-underline group cursor-pointer"
      style={{
        width: isMobile ? "100%" : 380,
        minWidth: isMobile ? "unset" : 380,
        maxWidth: isMobile ? "100%" : 380,
        flexShrink: 0,
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        perspective: 1000,
        transformStyle: "preserve-3d",
        textDecoration: "none",
        color: "inherit",
        willChange: "transform",
      }}
    >
      {/* Real screenshot with parallax */}
      <div
        className="relative overflow-hidden"
        style={{
          height: 240,
          background: "linear-gradient(180deg, #0a0a0f 0%, #161619 100%)",
        }}
      >
        <div
          ref={screenshotRef}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          {p.image && (
            <Image
              src={p.image}
              alt={`Capture d'écran ${p.name}`}
              fill
              sizes="(max-width: 900px) 100vw, 380px"
              className="object-cover object-top"
              priority={false}
            />
          )}
        </div>
        {/* Subtle gradient overlay for legibility */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: 60,
            background:
              "linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,0.8) 100%)",
          }}
        />
      </div>

      <div className="p-7 flex-1 flex flex-col relative">
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: 0 }}
        />
        <div className="flex items-center gap-2 mb-3.5">
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
            style={badgeStyles[p.badge.type]}
          >
            {p.badge.label}
          </span>
        </div>
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
          className="text-sm font-light mb-5"
          style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
        >
          {p.desc}
        </p>
        {p.agents && (
          <div
            className="mb-5 p-4"
            style={{
              background: "rgba(196,151,58,0.04)",
              border: "1px solid var(--gold-border)",
              borderRadius: 8,
            }}
          >
            <div
              className="text-[10px] font-bold tracking-widest uppercase mb-2"
              style={{ color: "var(--gold)" }}
            >
              Ce que les agents font
            </div>
            <ul className="space-y-1.5">
              {p.agents.map((a) => (
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
        )}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
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
        <span
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
        </span>
      </div>
    </a>
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
          className="text-[17px] font-light mb-16"
          style={{
            color: "var(--text-muted)",
            maxWidth: 640,
            lineHeight: 1.7,
          }}
        >
          Ces 3 produits sont des équipes d&apos;agents IA que nous avons construits
          et opérons nous-mêmes. Votre solution sur mesure peut ressembler à ça.
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

          {/* CTA card "Votre secteur n'est pas là ?" */}
          <a
            href="/contact"
            data-cursor="link"
            className="flex flex-col justify-between p-8 no-underline transition-all duration-300 group"
            style={{
              width: isMobile ? "100%" : 380,
              minWidth: isMobile ? "unset" : 380,
              maxWidth: isMobile ? "100%" : 380,
              flexShrink: 0,
              background: "rgba(196,151,58,0.04)",
              border: "1px solid var(--gold-border)",
              borderRadius: "var(--radius)",
            }}
          >
            <div>
              <span
                className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-5 tracking-widest uppercase"
                style={{
                  background: "var(--gold-dim)",
                  color: "var(--gold-light)",
                  border: "1px solid var(--gold-border)",
                }}
              >
                Sur mesure
              </span>
              <div
                className="text-[26px] font-bold mb-3"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "var(--text)",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.15,
                }}
              >
                Votre secteur n&apos;est pas là&nbsp;?
              </div>
              <p
                className="text-[15px] font-light mb-6"
                style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
              >
                On construit des équipes d&apos;agents IA pour n&apos;importe quel
                métier. Comptabilité, juridique, e-commerce, RH — si la tâche se
                répète, on peut l&apos;automatiser.
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 text-[14px] font-semibold pt-4 transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: "var(--gold)", borderTop: "1px solid var(--gold-border)" }}
            >
              Parlez-nous de votre cas
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M8 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>
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
