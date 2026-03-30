"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01 — Diagnostic",
    icon: "🔍",
    name: "Cartographier l'existant",
    desc: "Nous analysons vos flux de travail, vos outils actuels et vos points de friction. L'objectif : identifier précisément ce qui peut être automatisé et ce qui génère le plus de valeur.",
  },
  {
    number: "02 — Conception",
    icon: "⚡",
    name: "Architecturer la solution",
    desc: "On conçoit une solution sur mesure — SaaS, API, agent IA ou pipeline de traitement — adaptée à votre secteur et à votre taille d'équipe, sans sur-ingénierie inutile.",
  },
  {
    number: "03 — Déploiement",
    icon: "🚀",
    name: "Livrer et opérer",
    desc: "Déploiement en production sur infrastructure européenne (Vercel, Hetzner, Supabase Frankfurt), avec monitoring, documentation et accompagnement sur la durée.",
  },
];

export default function Approche() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="approche"
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
        Notre méthode
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
        De votre problème
        <br />à la solution opérationnelle.
      </h2>
      <p
        className="text-[17px] font-light mb-16"
        style={{
          color: "var(--text-muted)",
          maxWidth: 500,
          lineHeight: 1.7,
        }}
      >
        On ne vend pas des heures de consulting. On livre des outils qui
        fonctionnent.
      </p>

      <div
        className="grid grid-cols-3 max-md:grid-cols-1 overflow-hidden"
        style={{
          gap: 1,
          background: "var(--border)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="p-12 max-md:p-8 transition-colors duration-300 hover:bg-[var(--card-hover)]"
            style={{ background: "var(--card)" }}
          >
            <div
              className="text-[11px] font-semibold tracking-[3px] uppercase mb-6 flex items-center gap-2"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--gold)",
              }}
            >
              {step.number}
              <span
                className="flex-1 h-px"
                style={{ background: "var(--gold-border)" }}
              />
            </div>
            <div
              className="w-12 h-12 rounded-md flex items-center justify-center mb-5 text-xl"
              style={{
                background: "var(--gold-dim)",
                border: "1px solid var(--gold-border)",
              }}
            >
              {step.icon}
            </div>
            <div
              className="text-[22px] font-bold mb-3"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--text)",
                letterSpacing: "-0.5px",
              }}
            >
              {step.name}
            </div>
            <p
              className="text-sm font-light leading-relaxed"
              style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
            >
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
