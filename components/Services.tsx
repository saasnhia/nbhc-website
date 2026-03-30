"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: "🤖",
    name: "Agents IA métier",
    desc: "Conception et déploiement d'agents IA connectés à vos données internes — traitement de documents, classification automatique, génération de rapports, assistants conversationnels sectoriels.",
    tags: ["Mistral / GPT-4o", "RAG", "Webhooks", "API custom"],
  },
  {
    icon: "⚙️",
    name: "Automatisation de flux",
    desc: "Remplacement des tâches manuelles répétitives par des pipelines automatisés — synchronisation entre outils, traitement de fichiers en masse, génération de contenu à la volée, relances automatiques.",
    tags: ["Next.js API", "Cron jobs", "Workers", "PM2"],
  },
  {
    icon: "🧾",
    name: "SaaS B2B sur mesure",
    desc: "Conception et développement full-stack d'un SaaS dédié à votre secteur — architecture Supabase, authentification, plans tarifaires Stripe, tableau de bord, gestion multi-utilisateurs.",
    tags: ["Next.js", "Supabase", "Stripe", "RGPD"],
  },
  {
    icon: "🎬",
    name: "Traitement média IA",
    desc: "Pipelines de traitement vidéo, audio et documents — transcription, résumé automatique, extraction d'informations clés, génération de sous-titres, montage automatisé à grande échelle.",
    tags: ["FFmpeg", "Whisper", "Remotion", "Hetzner"],
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 px-10 max-md:px-5 max-md:py-16"
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
        Ce qu&apos;on peut
        <br />
        construire pour vous.
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

      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-9 relative overflow-hidden transition-all duration-300 group"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            {/* Gold bar on hover */}
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
