"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const products = [
  {
    logo: "VLOGYZ",
    visualClass: "pv-vlogyz",
    badge: { label: "MVP live", type: "beta" as const },
    name: "Vlogyz",
    desc: "Montage vidéo IA français — alternative à CapCut. Pipeline complet : upload TUS, transcription Whisper, détection de fillers, sous-titres synchronisés (13 styles), B-Roll automatique, score de viralité, rendu Remotion.",
    stack: ["Next.js 16", "Groq Whisper", "Mistral", "Remotion", "FFmpeg", "Hetzner"],
    link: "vlogyz.vercel.app",
  },
  {
    logo: "DEVIZLY",
    visualClass: "pv-devizly",
    badge: { label: "Live", type: "live" as const },
    name: "Devizly",
    desc: "Générateur de devis IA pour artisans et freelances. L'utilisateur décrit sa prestation en langage naturel → devis conforme loi française → signature eIDAS → paiement acompte Stripe intégré.",
    stack: ["Next.js 14", "Mistral", "Stripe", "Supabase", "Resend", "Upstash"],
    link: "devizly.fr",
  },
  {
    logo: "WORTHIFAST",
    visualClass: "pv-worthifast",
    badge: { label: "En développement", type: "dev" as const },
    name: "Worthifast",
    desc: "Automatisation des tâches comptables et d'audit pour cabinets experts. Import FEC/CSV/Excel, détection d'anomalies IA, rapports de révision, tableau de bord multi-missions. Cible : PME et cabinets 5–50 personnes.",
    stack: ["Next.js 16", "Mistral", "Supabase", "Stripe", "PostgreSQL"],
    link: "Bêta à venir",
  },
];

const visualStyles: Record<string, React.CSSProperties> = {
  "pv-vlogyz": { background: "#0d1117", color: "#6366f1" },
  "pv-devizly": { background: "#0d0d14", color: "#5B5BD6" },
  "pv-worthifast": { background: "#0d1209", color: "#22c55e" },
};

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

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="produits"
      ref={ref}
      style={{
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
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
          Portfolio
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
          Nos produits en production.
        </h2>
        <p
          className="text-[17px] font-light mb-16"
          style={{
            color: "var(--text-muted)",
            maxWidth: 500,
            lineHeight: 1.7,
          }}
        >
          Trois SaaS conçus et opérés par NBHC — chacun comme preuve concrète de
          notre capacité à livrer.
        </p>

        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-5">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex flex-col overflow-hidden no-underline transition-all duration-300 group cursor-default"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
            >
              <div
                className="h-[200px] flex items-center justify-center relative overflow-hidden"
                style={visualStyles[p.visualClass]}
              >
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, currentColor 45%, currentColor 55%, transparent 55%)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <span
                  className="relative z-10 text-[28px] font-extrabold"
                  style={{
                    fontFamily: "var(--font-syne)",
                    letterSpacing: "-1px",
                  }}
                >
                  {p.logo}
                </span>
              </div>

              <div className="p-7 flex-1 flex flex-col">
                <span
                  className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-3.5 tracking-wide w-fit"
                  style={badgeStyles[p.badge.type]}
                >
                  {p.badge.label}
                </span>
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
                  className="text-sm font-light mb-6 flex-1"
                  style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
                >
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
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
                <div
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
