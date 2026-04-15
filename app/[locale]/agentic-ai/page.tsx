"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  AgentAnatomyIllustration,
  MultiAgentWorkflowIllustration,
  WithoutVsWithAgentsIllustration,
} from "../../../components/AgenticIllustrations";

const FOUNDER_SPOTS_LEFT = 10;

const teams = [
  {
    color: "#22c55e",
    badge: "Basé sur Worthifast",
    title: "Équipe Comptabilité & Audit",
    agents: [
      "Agent FEC — import et analyse des écritures",
      "Agent Anomalies — détection et classification",
      "Agent TVA — pré-remplissage CA3 automatique",
      "Agent Rapprochement — matching bancaire 95%",
    ],
    ideal: "cabinets comptables, DAF, TPE/PME",
    cta: "Voir la démo →",
    href: "/#produits",
  },
  {
    color: "#5B5BD6",
    badge: "Basé sur Devizly",
    title: "Équipe Commercial & Devis",
    agents: [
      "Agent Devis — génération depuis description naturelle",
      "Agent Conformité — vérification mentions légales",
      "Agent Relance — séquences automatiques J+2/J+5/J+7",
      "Agent Paiement — acomptes et suivi encaissements",
    ],
    ideal: "artisans, freelances, agences, ESN",
    cta: "Voir la démo →",
    href: "/#produits",
  },
  {
    color: "#6366f1",
    badge: "Basé sur Vlogyz",
    title: "Équipe Création de Contenu",
    agents: [
      "Agent Transcription — speech-to-text précis",
      "Agent Montage — coupures intelligentes silences/fillers",
      "Agent Sous-titres — 13 styles, synchronisation mot/mot",
      "Agent Distribution — description, hashtags, chapitres",
    ],
    ideal: "créateurs, agences médias, marques",
    cta: "Voir la démo →",
    href: "/#produits",
  },
  {
    color: "#C4973A",
    badge: "Custom",
    title: "Équipe Personnalisée",
    description:
      "Votre problème ne rentre dans aucune case ? Nous analysons vos flux et concevons une équipe d'agents 100% adaptée à votre secteur et vos outils existants.",
    agentsList: "traitement documents, emails, CRM, ERP, e-commerce, RH, juridique...",
    cta: "Nous contacter →",
    href: "/contact",
  },
];

const steps = [
  {
    n: "01",
    duration: "1 semaine",
    title: "Diagnostic",
    desc: "Nous cartographions vos flux de travail, identifions les tâches répétitives et définissons le périmètre des agents.",
  },
  {
    n: "02",
    duration: "1-2 semaines",
    title: "Conception",
    desc: "Nous architecturons le système multi-agents, choisissons les modèles IA adaptés et définissons les KPIs de performance.",
  },
  {
    n: "03",
    duration: "2-4 semaines",
    title: "Déploiement",
    desc: "Développement, tests, intégration à vos outils existants (API, webhooks, exports). Livraison sur votre infrastructure ou la nôtre.",
  },
  {
    n: "04",
    duration: "Continu",
    title: "Opération continue",
    desc: "Monitoring des agents, amélioration des prompts, ajout de nouveaux agents selon l'évolution de vos besoins. Facturation mensuelle.",
  },
];

type Plan = {
  key: "starter" | "growth" | "enterprise";
  name: string;
  priceOld?: string;
  priceNew: string;
  period: string;
  subtitle?: string;
  features: string[];
  recommended: boolean;
  hasFounderRate: boolean;
};

const plans: Plan[] = [
  {
    key: "starter",
    name: "Starter",
    priceOld: "590€",
    priceNew: "490€",
    period: "/mois",
    features: [
      "1 équipe d'agents (3-4 agents)",
      "Infrastructure hébergée par NBHC",
      "5 000 opérations/mois (Mistral Large) · 50 000 (Mistral Small)",
      "Support email",
      "Idéal pour tester",
    ],
    recommended: false,
    hasFounderRate: true,
  },
  {
    key: "growth",
    name: "Growth",
    priceOld: "1 690€",
    priceNew: "1 290€",
    period: "/mois",
    features: [
      "2 équipes d'agents (6-8 agents)",
      "Infrastructure dédiée",
      "50 000 opérations/mois",
      "Support prioritaire + 1 call mensuel",
      "Onboarding accompagné",
    ],
    recommended: true,
    hasFounderRate: true,
  },
  {
    key: "enterprise",
    name: "Enterprise",
    priceNew: "Sur devis",
    period: "",
    features: [
      "Équipes illimitées",
      "Agents sur mesure",
      "Infrastructure on-premise possible",
      "SLA 99.9%, support dédié",
      "Intégrations ERP/CRM",
    ],
    recommended: false,
    hasFounderRate: false,
  },
];

const faq = [
  {
    q: "Quelle différence avec ChatGPT ou Copilot ?",
    a: "ChatGPT répond à vos questions. Nos agents exécutent des tâches de bout en bout, s'intègrent à vos outils et produisent des outputs exploitables (documents, données, actions) sans intervention humaine.",
  },
  {
    q: "Faut-il des compétences techniques ?",
    a: "Non. Vous définissez vos objectifs en langage naturel, nous gérons toute la partie technique. Vous accédez aux résultats via un dashboard simple.",
  },
  {
    q: "Vos agents sont-ils conformes RGPD ?",
    a: "Oui. Tous nos agents tournent sur infrastructure européenne (Hetzner Allemagne, Supabase Frankfurt). Vos données ne quittent jamais l'Union Européenne.",
  },
];

export default function AgenticAIPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const locale = useLocale();
  const tp = useTranslations("pricing");
  const isEn = locale === "en";
  const tr = (fr: string, en: string) => (isEn ? en : fr);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      {/* SECTION 1 — Hero */}
      <section
        className="pt-36 pb-24 px-10 max-[900px]:px-5 max-[900px]:pt-28 max-[900px]:pb-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-7"
          style={{ color: "var(--gold)" }}
        >
          <span className="block w-6 h-px" style={{ background: "var(--gold)" }} />
          AGENTIC AI AS A SERVICE
        </div>
        <h1
          className="font-extrabold leading-none mb-7"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(34px, 7vw, 84px)",
            letterSpacing: "-3px",
            color: "var(--text)",
            maxWidth: 900,
          }}
        >
          {tr("Une équipe d'agents IA ", "An AI agent team ")}
          <span style={{ color: "var(--gold)" }}>
            {tr("dédiée à votre métier.", "dedicated to your trade.")}
          </span>
        </h1>
        <p
          className="text-lg font-light mb-10"
          style={{ color: "var(--text-muted)", maxWidth: 640, lineHeight: 1.7 }}
        >
          {tr(
            "Nous concevons, déployons et opérons des systèmes multi-agents IA qui automatisent vos flux de travail — du devis à la comptabilité, du contenu au support client.",
            "We design, deploy and operate multi-agent AI systems that automate your workflows — from quotes to accounting, from content to customer support."
          )}
        </p>
        <a
          href={`/${locale}/contact`}
          data-cursor="link"
          className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--gold)", color: "#0a0a0b" }}
        >
          {tr("Discuter de mon projet", "Discuss my project")}
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
      </section>

      {/* SECTION 2 — Qu'est-ce que l'AaaS ? */}
      <section
        className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
            style={{ color: "var(--gold)" }}
          >
            <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
            {tr("Concept", "Concept")}
          </div>
          <h2
            className="font-bold leading-tight mb-10"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-1.5px",
              color: "var(--text)",
              maxWidth: 800,
            }}
          >
            {tr("Pas un chatbot. Une équipe qui travaille pour vous.", "Not a chatbot. A team that works for you.")}
          </h2>

          {/* Illustration 1 — Agent anatomy */}
          <div className="mb-16">
            <AgentAnatomyIllustration />
          </div>

          <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-6">
            {[
              {
                icon: "⚙",
                title: "Agent spécialisé",
                desc: "Chaque agent maîtrise une tâche précise : analyser un document, générer un contenu, détecter une anomalie, envoyer une relance.",
              },
              {
                icon: "◈",
                title: "Orchestration multi-agents",
                desc: "Les agents communiquent entre eux et s'enchaînent automatiquement. Le résultat d'un agent devient l'entrée du suivant.",
              },
              {
                icon: "◉",
                title: "Opéré et maintenu",
                desc: "NBHC opère l'infrastructure, surveille les outputs et améliore les agents en continu. Vous consommez le résultat.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="p-8"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                }}
              >
                <div
                  className="text-3xl mb-5"
                  style={{ color: "var(--gold)" }}
                >
                  {c.icon}
                </div>
                <div
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-syne)",
                    color: "var(--text)",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {c.title}
                </div>
                <p
                  className="text-sm font-light"
                  style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Équipes d'agents par métier */}
      <section
        className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
          style={{ color: "var(--gold)" }}
        >
          <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
          {tr("Équipes", "Teams")}
        </div>
        <h2
          className="font-bold leading-tight mb-4"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-1.5px",
            color: "var(--text)",
          }}
        >
          {tr("Choisissez votre équipe.", "Choose your team.")}
        </h2>
        <p
          className="text-[17px] font-light mb-12"
          style={{ color: "var(--text-muted)", maxWidth: 600, lineHeight: 1.7 }}
        >
          Quatre équipes packagées prêtes à déployer, ou une équipe sur mesure
          conçue pour votre métier.
        </p>

        {/* Illustration 2 — Multi-agent workflow */}
        <div className="mb-16">
          <MultiAgentWorkflowIllustration />
        </div>

        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-5">
          {teams.map((t) => (
            <div
              key={t.title}
              data-cursor="card"
              className="p-9 relative overflow-hidden transition-all duration-300 group"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
            >
              <span
                className="absolute top-0 left-0 w-[3px] h-full"
                style={{ background: t.color, opacity: 0.7 }}
              />
              <span
                className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full mb-4 tracking-wide"
                style={{
                  background: `${t.color}1a`,
                  color: t.color,
                  border: `1px solid ${t.color}33`,
                }}
              >
                {t.badge}
              </span>
              <div
                className="text-xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "var(--text)",
                  letterSpacing: "-0.5px",
                }}
              >
                {t.title}
              </div>
              {t.agents && (
                <ul className="mb-5 space-y-2">
                  {t.agents.map((a) => (
                    <li
                      key={a}
                      className="text-sm font-light flex items-start gap-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <span style={{ color: t.color, marginTop: 2 }}>›</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              )}
              {t.description && (
                <p
                  className="text-sm font-light mb-3"
                  style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
                >
                  {t.description}
                </p>
              )}
              {t.agentsList && (
                <p
                  className="text-xs font-light mb-5 italic"
                  style={{ color: "var(--text-dim)" }}
                >
                  Agents possibles : {t.agentsList}
                </p>
              )}
              {t.ideal && (
                <p
                  className="text-xs mb-5"
                  style={{ color: "var(--text-dim)" }}
                >
                  <span style={{ color: t.color }}>Idéal pour :</span> {t.ideal}
                </p>
              )}
              <a
                href={t.href}
                data-cursor="link"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium no-underline transition-all duration-200 hover:gap-2.5"
                style={{ color: t.color }}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — Comment ça marche */}
      <section
        className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
            style={{ color: "var(--gold)" }}
          >
            <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
            {tr("Process", "Process")}
          </div>
          <h2
            className="font-bold leading-tight mb-10"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-1.5px",
              color: "var(--text)",
              maxWidth: 800,
            }}
          >
            {tr("De votre problème à vos agents opérationnels.", "From your problem to agents in production.")}
          </h2>

          {/* Illustration 3 — Sans vs Avec agents */}
          <div className="mb-16">
            <WithoutVsWithAgentsIllustration />
          </div>

          <div className="grid grid-cols-4 max-[900px]:grid-cols-1 gap-5">
            {steps.map((s) => (
              <div
                key={s.n}
                className="p-7"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                }}
              >
                <div
                  className="text-3xl font-extrabold mb-3"
                  style={{
                    fontFamily: "var(--font-syne)",
                    color: "var(--gold)",
                    letterSpacing: "-1px",
                  }}
                >
                  {s.n}
                </div>
                <div
                  className="text-[11px] font-medium tracking-widest uppercase mb-2"
                  style={{ color: "var(--text-dim)" }}
                >
                  {s.duration}
                </div>
                <div
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-syne)",
                    color: "var(--text)",
                  }}
                >
                  {s.title}
                </div>
                <p
                  className="text-sm font-light"
                  style={{ color: "var(--text-muted)", lineHeight: 1.65 }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Tarification */}
      <section
        id="pricing"
        className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
          style={{ color: "var(--gold)" }}
        >
          <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
          {tr("Tarification", "Pricing")}
        </div>
        <h2
          className="font-bold leading-tight mb-10"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-1.5px",
            color: "var(--text)",
          }}
        >
          {tr("Un modèle simple et transparent.", "A simple, transparent pricing model.")}
        </h2>

        {/* Founder offer banner */}
        <Link
          href={`/${locale}/contact`}
          aria-label={tp("founderBannerAria", { spots: FOUNDER_SPOTS_LEFT })}
          className="founder-banner group block mb-12 mx-auto"
          style={{
            maxWidth: 800,
            background: "linear-gradient(135deg, #C4973A 0%, #B8862E 100%)",
            borderRadius: 8,
            padding: "14px 20px",
            minHeight: 56,
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s ease-out",
            boxShadow: "0 4px 16px rgba(196,151,58,0.25)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            className="font-semibold"
            style={{
              color: "#09090b",
              fontSize: "clamp(13px, 1.3vw, 15px)",
              lineHeight: 1.4,
            }}
          >
            {tp("founderBanner", { spots: FOUNDER_SPOTS_LEFT })}
          </span>
        </Link>

        <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-5">
          {plans.map((p) => (
            <div
              key={p.key}
              className="p-9 relative flex flex-col"
              style={{
                background: p.recommended ? "var(--card-hover)" : "var(--card)",
                border: p.recommended
                  ? "1px solid var(--gold-border)"
                  : "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
            >
              {p.recommended && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase"
                  style={{ background: "var(--gold)", color: "#0a0a0b" }}
                >
                  Recommandé
                </span>
              )}
              <div
                className="text-sm font-medium tracking-widest uppercase mb-3"
                style={{ color: "var(--gold)" }}
              >
                {p.name}
              </div>

              {p.hasFounderRate && (
                <span
                  className="inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-2 tracking-widest uppercase w-fit"
                  style={{
                    background: "rgba(196,151,58,0.15)",
                    color: "var(--gold)",
                    border: "1px solid rgba(196,151,58,0.4)",
                  }}
                >
                  {tp("founderBadge")}
                </span>
              )}

              <div
                className="font-extrabold mb-1"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "var(--text)",
                  letterSpacing: "-1.5px",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {p.priceNew}
                <span
                  className="text-sm font-normal"
                  style={{ color: "var(--text-dim)" }}
                >
                  {p.period}
                </span>
              </div>

              {p.priceOld && (
                <div
                  className="text-xs mb-1"
                  style={{
                    color: "var(--text-dim)",
                    textDecoration: "line-through",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.priceOld}{p.period}
                </div>
              )}

              {p.hasFounderRate && (
                <div
                  className="text-[11px] mb-5"
                  style={{ color: "var(--gold)", opacity: 0.8 }}
                >
                  {tp("lifetimeLocked")}
                </div>
              )}

              {p.key === "enterprise" && (
                <div
                  className="text-[12px] mb-5"
                  style={{ color: "var(--text-dim)" }}
                >
                  {tp("enterpriseFrom")}
                </div>
              )}

              <ul className="space-y-3 mb-6 flex-1">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="text-sm font-light flex items-start gap-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span style={{ color: "var(--gold)" }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={`/${locale}/contact?plan=${p.key}`}
                data-cursor="link"
                className="inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold px-5 py-3 rounded-md no-underline transition-all duration-200 hover:opacity-90 mt-auto"
                style={{
                  background: p.recommended ? "var(--gold)" : "var(--gold-dim)",
                  color: p.recommended ? "#0a0a0b" : "var(--gold-light)",
                  border: p.recommended ? "none" : "1px solid var(--gold-border)",
                }}
              >
                {p.key === "enterprise" ? tp("ctaEnterprise") : tp("ctaButton")}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M7 2l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        <p
          className="text-sm font-light text-center mt-10"
          style={{ color: "var(--text-dim)", maxWidth: 640, margin: "40px auto 0", lineHeight: 1.6 }}
        >
          {tp("note")}
        </p>
        <style jsx>{`
          .founder-banner:hover {
            background: linear-gradient(135deg, #d1a947 0%, #c4973a 100%) !important;
            transform: scale(1.01);
            box-shadow: 0 8px 28px rgba(196,151,58,0.4);
          }
          @media (max-width: 768px) {
            .founder-banner {
              padding: 14px 16px !important;
            }
          }
        `}</style>
      </section>

      {/* SECTION 6 — FAQ */}
      <section
        className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
            style={{ color: "var(--gold)" }}
          >
            <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
            {tr("FAQ", "FAQ")}
          </div>
          <h2
            className="font-bold leading-tight mb-12"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-1.5px",
              color: "var(--text)",
            }}
          >
            Questions fréquentes.
          </h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div
                key={i}
                className="p-6"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-cursor="link"
                  className="w-full flex items-center justify-between text-left bg-transparent border-none cursor-pointer p-0"
                >
                  <span
                    className="text-base font-bold pr-4"
                    style={{
                      fontFamily: "var(--font-syne)",
                      color: "var(--text)",
                    }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="text-xl font-light shrink-0"
                    style={{
                      color: "var(--gold)",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0)",
                      transition: "transform 0.3s",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <p
                    className="text-sm font-light mt-4"
                    style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
                  >
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — CTA final */}
      <section
        id="contact"
        className="py-32 px-10 max-[900px]:px-5 max-[900px]:py-20"
        style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}
      >
        <h2
          className="font-extrabold leading-none mb-6"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(34px, 5vw, 64px)",
            letterSpacing: "-2px",
            color: "var(--text)",
          }}
        >
          Prêt à <span style={{ color: "var(--gold)" }}>automatiser</span> ?
        </h2>
        <p
          className="text-lg font-light mb-10"
          style={{
            color: "var(--text-muted)",
            maxWidth: 600,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Diagnostic gratuit de 30 minutes. On analyse vos flux et on vous dit
          exactement ce que des agents IA peuvent faire pour vous.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="mailto:contact@nbhc.fr?subject=Diagnostic%20AaaS%20NBHC"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--gold)", color: "#0a0a0b" }}
          >
            Réserver mon diagnostic →
          </a>
          <Link
            href="/#produits"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-[15px] font-normal px-7 py-3.5 rounded-md no-underline transition-all duration-200"
            style={{
              background: "transparent",
              color: "var(--text-muted)",
              border: "1px solid var(--border-accent)",
            }}
          >
            Voir nos produits →
          </Link>
        </div>
      </section>
    </main>
  );
}
