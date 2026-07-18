"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Logo from "../../../components/Logo";
import JsonLd from "../../../components/JsonLd";
import { faqPageSchema, breadcrumbSchema } from "../../../lib/schema";

const faqFr = [
  { question: "Combien coute une solution IA sur mesure ?", answer: "Ca depend de ce que vous cherchez. Une automatisation ciblee sur votre metier (n8n + Mistral, ex. relance de devis, IA telephonique) suit la grille Essentiel/Sur Mesure Leger, de 200 a 4 000 \u20ac HT : voir /tarifs pour le detail et un simulateur. Un produit SaaS complet et sur mesure (comme Devizly ou Vlogyz) est un projet plus large, generalement entre 5 000 \u20ac et 15 000 \u20ac, chiffre sous 48h apres votre premier echange." },
  { question: "Quelle est la difference entre Vlogyz et CapCut ?", answer: "CapCut est un editeur video grand public. Vlogyz est un outil de montage IA automatise : il transcrit, detecte les silences et fillers, genere des sous-titres synchronises dans 13 styles, ajoute du B-Roll automatiquement et calcule un score de viralite. Vlogyz est heberge en Europe et conforme RGPD." },
  { question: "Comment fonctionne Devizly ?", answer: "L\u2019artisan ou le freelance decrit sa prestation en langage naturel. L\u2019IA genere un devis conforme a la loi francaise (mentions obligatoires, TVA, conditions). Le client peut signer electroniquement (eIDAS) et payer un acompte via Stripe, le tout en moins de 2 minutes." },
  { question: "Vos workflows sont-ils compatibles avec Sage, EBP, Cegid ou Pennylane ?", answer: "Oui. Nous travaillons avec les FEC (Fichier des Ecritures Comptables), le format standard exportable depuis tous les logiciels comptables francais : Sage, EBP, Cegid, Pennylane, ACD, Quadratus, etc. Pour les outils modernes, nous nous connectons via API." },
  { question: "Vos solutions sont-elles conformes RGPD ?", answer: "Oui. Toutes nos donnees sont hebergees en Europe (Supabase Frankfurt, Hetzner Allemagne). Nous utilisons Mistral AI, un LLM francais, pour le traitement IA. Aucune donnee personnelle n\u2019est envoyee a des serveurs hors UE. Nous anonymisons les donnees avant tout traitement LLM." },
  { question: "Ou sont hebergees les donnees ?", answer: "Celles du site nbhc.fr : base de donnees sur Supabase (Frankfurt, Allemagne), fichiers et medias sur Hetzner (Falkenstein, Allemagne), application sur Vercel. Celles de votre automatisation dependent de l’architecture retenue avec vous au diagnostic : n8n et Mistral AI sont heberges en UE, le detail se precise projet par projet." },
  { question: "Proposez-vous un support apres deploiement ?", answer: "Oui. Chaque projet inclut 30 jours de support post-deploiement. Au-dela, nous proposons des contrats de maintenance mensuels incluant monitoring, mises a jour de securite et evolutions mineures." },
  { question: "Peut-on integrer vos outils a nos logiciels existants ?", answer: "Tous nos SaaS exposent des API REST documentees. Nous pouvons egalement developper des integrations sur mesure avec vos outils internes (CRM, ERP, outils comptables, etc.)." },
  { question: "Combien de temps pour deployer une solution ?", answer: "Un MVP est generalement livre en 4 a 8 semaines. Un projet plus complexe (multi-utilisateurs, integrations, IA avancee) prend 8 a 16 semaines. Nous travaillons en sprints courts avec des demos regulieres." },
  { question: "Quelles technologies utilisez-vous ?", answer: "Notre stack principale : Next.js (React), TypeScript, Tailwind CSS, Supabase (PostgreSQL + Auth), Stripe (paiements), Mistral AI (LLM francais), Vercel (deploiement). Pour le media : FFmpeg, Whisper (transcription), Remotion (rendu video)." },
];

const faqEn = [
  { question: "How much does a custom AI solution cost?", answer: "It depends on what you're after. A targeted automation for your business (n8n + Mistral, e.g. quote follow-ups, an AI phone agent) follows the Essentiel/Sur Mesure Leger grid, from €200 to €4,000 excl. VAT: see /tarifs for details and a simulator. A full custom SaaS product (like Devizly or Vlogyz) is a bigger project, typically €5,000 to €15,000, quoted within 48h of your first call." },
  { question: "What's the difference between Vlogyz and CapCut?", answer: "CapCut is a general-purpose video editor. Vlogyz is an automated AI editing tool: it transcribes, detects silences and fillers, generates synchronized subtitles in 13 styles, adds B-Roll automatically and computes a virality score. Vlogyz is hosted in Europe and GDPR-compliant." },
  { question: "How does Devizly work?", answer: "The tradesperson or freelancer describes their service in natural language. The AI generates a quote compliant with French law (mandatory notices, VAT, terms). The client can sign electronically (eIDAS) and pay a deposit via Stripe — all in under 2 minutes." },
  { question: "Are your workflows compatible with Sage, EBP, Cegid or Pennylane?", answer: "Yes. We work with FEC files (Fichier des Écritures Comptables), the standard format exportable from all French accounting software: Sage, EBP, Cegid, Pennylane, ACD, Quadratus, etc. For modern tools, we integrate via API." },
  { question: "Are your solutions GDPR-compliant?", answer: "Yes. All our data is hosted in Europe (Supabase Frankfurt, Hetzner Germany). We use Mistral AI, a French LLM, for AI processing. No personal data is sent to servers outside the EU. We anonymize data before any LLM processing." },
  { question: "Where is the data hosted?", answer: "For the nbhc.fr website: database on Supabase (Frankfurt, Germany), files and media on Hetzner (Falkenstein, Germany), application on Vercel. For your automation, it depends on the architecture agreed with you during the diagnostic: n8n and Mistral AI are hosted in the EU, with specifics settled project by project." },
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
