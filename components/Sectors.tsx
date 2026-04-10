"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectors = [
  {
    icon: "📊",
    name: "Comptabilité & Finance",
    problem: "Révision FEC, anomalies, TVA, rapprochement — automatisés",
    gain: "−3 jours/mois de révision",
  },
  {
    icon: "🔨",
    name: "Artisans & BTP",
    problem: "Devis automatiques, relances clients, suivi chantier",
    gain: "+2h/jour récupérées",
  },
  {
    icon: "🎬",
    name: "Créateurs & Médias",
    problem: "Montage vidéo, sous-titres, distribution multi-canal",
    gain: "10h de travail → 2 minutes",
  },
  {
    icon: "🛒",
    name: "E-commerce & Retail",
    problem: "Fiches produits, service client, gestion des retours",
    gain: "Support client 24/7",
  },
  {
    icon: "⚖️",
    name: "Juridique & RH",
    problem: "Analyse de contrats, onboarding, génération de documents",
    gain: "0 document oublié",
  },
  {
    icon: "✨",
    name: "Votre secteur",
    problem: "Votre métier n'est pas dans la liste ?",
    gain: "On construit sur mesure",
    custom: true,
  },
];

export default function Sectors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-sector-card]");
    gsap.set(cards, { opacity: 0, y: 40 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        });
      },
    });

    // Hover lift
    cards.forEach((card) => {
      const c = card as HTMLElement;
      const onEnter = () =>
        gsap.to(c, { y: -4, duration: 0.3, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(c, { y: 0, duration: 0.3, ease: "power2.out" });
      c.addEventListener("mouseenter", onEnter);
      c.addEventListener("mouseleave", onLeave);
      (c as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
        c.removeEventListener("mouseenter", onEnter);
        c.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      st.kill();
      cards.forEach((card) => {
        const c = card as HTMLElement & { _cleanup?: () => void };
        c._cleanup?.();
      });
    };
  }, []);

  return (
    <section
      id="secteurs"
      ref={sectionRef}
      className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
        style={{ color: "var(--gold)" }}
      >
        <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
        Secteurs
      </div>
      <h2
        className="font-bold leading-tight mb-4"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 52px)",
          letterSpacing: "-1.5px",
          color: "var(--text)",
        }}
      >
        Des agents pour chaque métier.
      </h2>
      <p
        className="text-[17px] font-light mb-16"
        style={{ color: "var(--text-muted)", maxWidth: 600, lineHeight: 1.7 }}
      >
        Des équipes packagées prêtes à déployer ou des agents 100% sur mesure
        adaptés à votre secteur.
      </p>

      <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1 gap-5">
        {sectors.map((s) => {
          const isCustom = s.custom;
          const Tag = isCustom ? "a" : "div";
          const props = isCustom
            ? { href: "/contact", "data-cursor": "link" as const, className: "no-underline" }
            : { "data-cursor": "card" as const };
          return (
            <Tag
              key={s.name}
              data-sector-card
              {...props}
              className={`p-7 transition-colors duration-300 block ${isCustom ? "no-underline" : ""}`}
              style={{
                background: isCustom ? "var(--gold-dim)" : "var(--card)",
                border: isCustom
                  ? "1px solid var(--gold-border)"
                  : "1px solid var(--border)",
                borderRadius: "var(--radius)",
                cursor: isCustom ? "pointer" : "default",
              }}
            >
              <div className="text-3xl mb-4">{s.icon}</div>
              <div
                className="text-lg font-bold mb-3"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: isCustom ? "var(--gold-light)" : "var(--text)",
                  letterSpacing: "-0.5px",
                }}
              >
                {s.name}
              </div>
              <p
                className="text-sm font-light mb-4"
                style={{ color: "var(--text-muted)", lineHeight: 1.65 }}
              >
                {s.problem}
              </p>
              <div
                className="text-[12px] font-bold tracking-wide"
                style={{ color: isCustom ? "var(--gold)" : "#4ade80" }}
              >
                {isCustom ? `${s.gain} →` : `↗ ${s.gain}`}
              </div>
            </Tag>
          );
        })}
      </div>
    </section>
  );
}
