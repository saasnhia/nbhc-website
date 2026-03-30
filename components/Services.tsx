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
    </section>
  );
}
