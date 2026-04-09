"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRevealWords, useClipReveal } from "../hooks/useReveal";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: "\uD83E\uDD16",
    name: "Agents IA métier",
    desc: "Conception et déploiement d'agents IA connectés à vos données internes — traitement de documents, classification automatique, génération de rapports, assistants conversationnels sectoriels.",
    tags: ["Mistral / GPT-4o", "RAG", "Webhooks", "API custom"],
  },
  {
    icon: "\u2699\uFE0F",
    name: "Automatisation de flux",
    desc: "Remplacement des tâches manuelles répétitives par des pipelines automatisés — synchronisation entre outils, traitement de fichiers en masse, génération de contenu à la volée, relances automatiques.",
    tags: ["Next.js API", "Cron jobs", "Workers", "PM2"],
  },
  {
    icon: "\uD83E\uDDFE",
    name: "SaaS B2B sur mesure",
    desc: "Conception et développement full-stack d'un SaaS dédié à votre secteur — architecture Supabase, authentification, plans tarifaires Stripe, tableau de bord, gestion multi-utilisateurs.",
    tags: ["Next.js", "Supabase", "Stripe", "RGPD"],
  },
  {
    icon: "\uD83C\uDFAC",
    name: "Traitement média IA",
    desc: "Pipelines de traitement vidéo, audio et documents — transcription, résumé automatique, extraction d'informations clés, génération de sous-titres, montage automatisé à grande échelle.",
    tags: ["FFmpeg", "Whisper", "Remotion", "Hetzner"],
  },
];

const aaasOffer = {
  icon: "\uD83E\uDD16",
  name: "Agentic AI as a Service",
  desc: "Des équipes d'agents IA déployées et opérées pour votre entreprise. Automatisation complète de vos flux métier — comptabilité, commercial, contenu, support.",
  tags: ["Multi-agents", "Opéré par NBHC", "Sur mesure", "RGPD EU"],
  href: "/agentic-ai",
};

export default function Services() {
  const titleRef = useRevealWords("h2");
  const clipRef = useClipReveal();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const cards = el.querySelectorAll("[data-reveal-card]");
    gsap.set(cards, { opacity: 0, y: 60 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="services"
      ref={(el) => {
        (titleRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (clipRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      <div
        data-clip-reveal
        className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
        style={{ color: "var(--gold)" }}
      >
        <span
          className="block w-4 h-px"
          style={{ background: "var(--gold)" }}
        />
        Services
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
        Ce qu&apos;on peut construire pour vous.
      </h2>
      <p
        className="text-[17px] font-light mb-16"
        style={{
          color: "var(--text-muted)",
          maxWidth: 500,
          lineHeight: 1.7,
        }}
      >
        Vous avez un problème métier. Nous avons la stack pour le résoudre.
      </p>

      <div ref={cardsRef} className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-5">
        {services.map((s) => (
          <div
            key={s.name}
            data-reveal-card
            data-cursor="card"
            className="p-9 relative overflow-hidden transition-colors duration-300 group hover:bg-[var(--card-hover)]"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            <span
              className="absolute top-0 left-0 w-[3px] h-0 transition-all duration-300 group-hover:h-full"
              style={{ background: "var(--gold)" }}
            />
            <span className="text-2xl block mb-5">{s.icon}</span>
            <div
              className="text-xl font-bold mb-2.5"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--text)",
                letterSpacing: "-0.5px",
              }}
            >
              {s.name}
            </div>
            <p
              className="text-sm font-light mb-5"
              style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
            >
              {s.desc}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "var(--gold-dim)",
                    border: "1px solid var(--gold-border)",
                    color: "var(--gold-light)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AaaS — Featured hero card full-width */}
      <a
        href={aaasOffer.href}
        data-reveal-card
        data-cursor="link"
        className="block mt-5 p-12 max-[900px]:p-8 relative overflow-hidden no-underline group transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, rgba(196,151,58,0.10) 0%, rgba(196,151,58,0.04) 60%, rgba(196,151,58,0.02) 100%)",
          border: "1px solid var(--gold-border)",
          borderRadius: "var(--radius)",
        }}
      >
        {/* Gold accent left bar */}
        <span
          className="absolute top-0 left-0 w-[4px] h-full"
          style={{ background: "var(--gold)" }}
        />
        {/* Decorative dot grid */}
        <svg
          className="absolute pointer-events-none opacity-[0.07]"
          width="240"
          height="240"
          viewBox="0 0 240 240"
          style={{ right: "-40px", bottom: "-40px" }}
        >
          <defs>
            <pattern id="aaas-dots" width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.4" fill="#C4973A" />
            </pattern>
          </defs>
          <rect width="240" height="240" fill="url(#aaas-dots)" />
        </svg>

        <div className="relative grid items-center gap-10 max-[900px]:gap-6" style={{ gridTemplateColumns: "minmax(0, 1.5fr) auto" }}>
          <div className="max-[900px]:col-span-full">
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <span className="text-3xl">{aaasOffer.icon}</span>
              <span
                className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest uppercase"
                style={{
                  background: "var(--gold)",
                  color: "#0a0a0b",
                }}
              >
                Offre phare
              </span>
            </div>
            <div
              className="text-3xl max-[900px]:text-2xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--text)",
                letterSpacing: "-1px",
                lineHeight: 1.1,
              }}
            >
              {aaasOffer.name}
            </div>
            <p
              className="text-base font-light mb-6"
              style={{ color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 640 }}
            >
              {aaasOffer.desc}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-7">
              {aaasOffer.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "var(--gold-dim)",
                    border: "1px solid var(--gold-border)",
                    color: "var(--gold-light)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="max-[900px]:col-span-full">
            <span
              className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md transition-all duration-200 group-hover:opacity-90 group-hover:translate-x-1 whitespace-nowrap"
              style={{
                background: "var(--gold)",
                color: "#0a0a0b",
                border: "none",
              }}
            >
              Découvrir l&apos;offre
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
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
        </div>
      </a>
    </section>
  );
}
