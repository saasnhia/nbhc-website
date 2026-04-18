"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Logo from "../../../components/Logo";
import JsonLd from "../../../components/JsonLd";
import { faqPageSchema, breadcrumbSchema } from "../../../lib/schema";

const faqFr = [
  { question: "Combien coute une solution IA sur mesure ?", answer: "Chaque projet est unique. Nos tarifs dependent de la complexite, du perimetre fonctionnel et du delai. Un MVP SaaS demarre generalement entre 5 000 \u20ac et 15 000 \u20ac. Nous fournissons un chiffrage detaille sous 48h apres votre premier echange." },
  { question: "Quelle est la difference entre Vlogyz et CapCut ?", answer: "CapCut est un editeur video grand public. Vlogyz est un outil de montage IA automatise : il transcrit, detecte les silences et fillers, genere des sous-titres synchronises dans 13 styles, ajoute du B-Roll automatiquement et calcule un score de viralite. Vlogyz est heberge en France et conforme RGPD." },
  { question: "Comment fonctionne Devizly ?", answer: "L\u2019artisan ou le freelance decrit sa prestation en langage naturel. L\u2019IA genere un devis conforme a la loi francaise (mentions obligatoires, TVA, conditions). Le client peut signer electroniquement (eIDAS) et payer un acompte via Stripe, le tout en moins de 2 minutes." },
  { question: "Worthifast est-il compatible avec Sage, EBP ou Cegid ?", answer: "Worthifast importe les FEC (Fichier des Ecritures Comptables), le format standard exportable depuis tous les logiciels comptables francais : Sage, EBP, Cegid, ACD, Quadratus, etc. Aucune integration directe n\u2019est necessaire." },
  { question: "Vos solutions sont-elles conformes RGPD ?", answer: "Oui. Toutes nos donnees sont hebergees en Europe (Supabase Frankfurt, Hetzner Allemagne). Nous utilisons Mistral AI, un LLM francais, pour le traitement IA. Aucune donnee personnelle n\u2019est envoyee a des serveurs hors UE. Nous anonymisons les donnees avant tout traitement LLM." },
  { question: "Ou sont hebergees les donnees ?", answer: "Base de donnees : Supabase (Frankfurt, Allemagne). Fichiers et medias : Hetzner (Falkenstein, Allemagne). Application : Vercel (reseau mondial, edge functions en Europe). Toutes les donnees sensibles restent sur des serveurs europeens." },
  { question: "Proposez-vous un support apres deploiement ?", answer: "Oui. Chaque projet inclut 30 jours de support post-deploiement. Au-dela, nous proposons des contrats de maintenance mensuels incluant monitoring, mises a jour de securite et evolutions mineures." },
  { question: "Peut-on integrer vos outils a nos logiciels existants ?", answer: "Tous nos SaaS exposent des API REST documentees. Nous pouvons egalement developper des integrations sur mesure avec vos outils internes (CRM, ERP, outils comptables, etc.)." },
  { question: "Combien de temps pour deployer une solution ?", answer: "Un MVP est generalement livre en 4 a 8 semaines. Un projet plus complexe (multi-utilisateurs, integrations, IA avancee) prend 8 a 16 semaines. Nous travaillons en sprints courts avec des demos regulieres." },
  { question: "Quelles technologies utilisez-vous ?", answer: "Notre stack principale : Next.js (React), TypeScript, Tailwind CSS, Supabase (PostgreSQL + Auth), Stripe (paiements), Mistral AI (LLM francais), Vercel (deploiement). Pour le media : FFmpeg, Whisper (transcription), Remotion (rendu video)." },
];

const faqEn = [
  { question: "How much does a custom AI solution cost?", answer: "Every project is unique. Our pricing depends on complexity, scope and timeline. A SaaS MVP typically starts between €5,000 and €15,000. We provide a detailed quote within 48h of your first call." },
  { question: "What's the difference between Vlogyz and CapCut?", answer: "CapCut is a general-purpose video editor. Vlogyz is an automated AI editing tool: it transcribes, detects silences and fillers, generates synchronized subtitles in 13 styles, adds B-Roll automatically and computes a virality score. Vlogyz is hosted in France and GDPR-compliant." },
  { question: "How does Devizly work?", answer: "The tradesperson or freelancer describes their service in natural language. The AI generates a quote compliant with French law (mandatory notices, VAT, terms). The client can sign electronically (eIDAS) and pay a deposit via Stripe — all in under 2 minutes." },
  { question: "Is Worthifast compatible with Sage, EBP or Cegid?", answer: "Worthifast imports FEC files (Fichier des Écritures Comptables), the standard format exportable from all French accounting software: Sage, EBP, Cegid, ACD, Quadratus, etc. No direct integration is required." },
  { question: "Are your solutions GDPR-compliant?", answer: "Yes. All our data is hosted in Europe (Supabase Frankfurt, Hetzner Germany). We use Mistral AI, a French LLM, for AI processing. No personal data is sent to servers outside the EU. We anonymize data before any LLM processing." },
  { question: "Where is the data hosted?", answer: "Database: Supabase (Frankfurt, Germany). Files and media: Hetzner (Falkenstein, Germany). Application: Vercel (global network, edge functions in Europe). All sensitive data stays on European servers." },
  { question: "Do you offer post-deployment support?", answer: "Yes. Every project includes 30 days of post-deployment support. Beyond that, we offer monthly maintenance contracts including monitoring, security updates and minor iterations." },
  { question: "Can you integrate your tools with our existing software?", answer: "All our SaaS products expose documented REST APIs. We can also develop custom integrations with your internal tools (CRM, ERP, accounting, etc.)." },
  { question: "How long does it take to deploy a solution?", answer: "An MVP is typically delivered in 4 to 8 weeks. A more complex project (multi-user, integrations, advanced AI) takes 8 to 16 weeks. We work in short sprints with regular demos." },
  { question: "What technologies do you use?", answer: "Our main stack: Next.js (React), TypeScript, Tailwind CSS, Supabase (PostgreSQL + Auth), Stripe (payments), Mistral AI (French LLM), Vercel (deployment). For media: FFmpeg, Whisper (transcription), Remotion (video rendering)." },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const locale = useLocale();
  const faqItems = locale === "en" ? faqEn : faqFr;

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <main
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "80px 40px",
        background: "var(--bg)",
        color: "var(--text-muted)",
        lineHeight: 1.8,
      }}
    >
      <style>{`
        @media (max-width: 600px) {
          main { padding: 60px 20px !important; }
        }
        .faq-item { border-bottom: 1px solid var(--border); }
        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-syne);
          font-size: 16px;
          font-weight: 600;
          color: var(--text);
          line-height: 1.5;
          transition: color 0.2s;
        }
        .faq-question:hover { color: var(--gold); }
        .faq-answer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.3s ease, padding 0.3s ease;
          padding: 0 0;
        }
        .faq-answer.open {
          max-height: 500px;
          padding: 0 0 20px 0;
        }
        .faq-chevron {
          flex-shrink: 0;
          margin-left: 16px;
          transition: transform 0.3s ease;
          color: var(--gold);
        }
        .faq-chevron.open { transform: rotate(180deg); }
      `}</style>

      <Link
        href={`/${locale}`}
        style={{
          color: "var(--gold)",
          textDecoration: "none",
          fontSize: 14,
          display: "inline-block",
          marginBottom: 32,
        }}
      >
        &larr; {locale === "en" ? "Back" : "Retour"}
      </Link>

      <div style={{ marginBottom: 48 }}>
        <Logo variant="footer" />
      </div>

      <h1
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          color: "var(--gold)",
          marginBottom: 48,
        }}
      >
        {locale === "en" ? "Frequently asked questions" : "Foire aux questions"}
      </h1>

      <div>
        {faqItems.map((item, i) => (
          <div key={i} className="faq-item">
            <button className="faq-question" onClick={() => toggle(i)}>
              <span>{item.question}</span>
              <svg
                className={`faq-chevron${openIndex === i ? " open" : ""}`}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={`faq-answer${openIndex === i ? " open" : ""}`}>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 15 }}>
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <JsonLd
        data={[
          faqPageSchema(faqItems),
          breadcrumbSchema([
            {
              name: locale === "en" ? "Home" : "Accueil",
              url: `https://nbhc.fr/${locale}`,
            },
            { name: "FAQ", url: `https://nbhc.fr/${locale}/faq` },
          ]),
        ]}
      />
    </main>
  );
}
