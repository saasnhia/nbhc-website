"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import Logo from "../../../components/Logo";
import JsonLd from "../../../components/JsonLd";
import { faqPageSchema, breadcrumbSchema } from "../../../lib/schema";

const faqFr = [
  { question: "NBHC est une agence ou un éditeur de logiciels ?", answer: "Les deux. On développe nos propres produits : Devizly, déjà en production, puis Vlogyz et internbullet, qui ne sont pas encore ouverts. Et on construit des outils sur mesure pour des entreprises. Ce qu’on apprend sur les premiers sert aux seconds." },
  { question: "Comment fonctionne Devizly ?", answer: "L’indépendant ou l’artisan décrit sa prestation en langage courant. Devizly rédige le devis, le client le signe en ligne et peut régler par Stripe. Les factures sortent au format Factur-X." },
  { question: "Que fait Vlogyz qu’un éditeur vidéo ne fait pas ?", answer: "Un éditeur vidéo vous laisse monter à la main. Vlogyz part du rush : il transcrit, coupe les silences, pose des sous-titres synchronisés, du b-roll et des titres animés. Il n’est pas encore ouvert au public." },
  { question: "Qu’est-ce qu’internbullet ?", answer: "Un outil de candidature directe pour un stage, une alternance ou un emploi. Vous apportez une entreprise ou une offre, l’outil lit son site, prépare un mail appuyé sur ce qu’il y a lu, et vous le relisez avant tout envoi. Il est en préparation ; écrivez à contact@nbhc.fr pour être prévenu de l’ouverture." },
  { question: "Qu’est-ce qu’un outil sur mesure, concrètement ?", answer: "Un logiciel construit autour de vos règles : vos tarifs, vos cas particuliers, votre façon de préparer un devis ou une facture. Il s’appuie sur vos données existantes et vos conseillers gardent la main sur chaque décision." },
  { question: "Combien ça coûte ?", answer: "Le premier échange de 30 minutes est gratuit. Ensuite, le périmètre et le prix sont écrits avant de commencer : vous savez ce qui sera construit et ce que vous paierez." },
  { question: "À qui appartient l’outil une fois livré ?", answer: "À vous. Ce qu’on construit pour vous vous appartient, et vous le gardez si la collaboration s’arrête." },
  { question: "Par où passent mes données ?", answer: "Cela dépend de l’outil. Les fournisseurs par lesquels passent vos données se précisent avec vous, projet par projet, avant de construire." },
  { question: "Et si un outil n’est pas la bonne réponse ?", answer: "On vous le dit au premier échange. Un tableur bien tenu ou un logiciel du marché suffit parfois, et dans ce cas on ne construit rien." },
  { question: "Quelles technologies utilisez-vous ?", answer: "Le plus souvent : Next.js (React), TypeScript, Tailwind CSS, Postgres, Stripe pour les paiements, Mistral AI pour les modèles de langue. Pour la vidéo : FFmpeg, Whisper pour la transcription, Remotion pour le rendu." },
];

const faqEn = [
  { question: "Is NBHC an agency or a software publisher?", answer: "Both. We develop our own products: Devizly, already live, then Vlogyz and internbullet, which are not open yet. And we build custom tools for companies. What we learn on the former serves the latter." },
  { question: "How does Devizly work?", answer: "The freelancer or tradesperson describes the job in plain language. Devizly drafts the quote, the client signs online and can pay through Stripe. Invoices come out in Factur-X format." },
  { question: "What does Vlogyz do that a video editor doesn’t?", answer: "A video editor lets you cut by hand. Vlogyz starts from raw footage: it transcribes, cuts silences, adds synced subtitles, b-roll and animated titles. It is not open to the public yet." },
  { question: "What is internbullet?", answer: "A direct-application tool for an internship, a work-study contract or a job. You bring a company or a job posting, the tool reads its website, drafts an email grounded in what it read there, and you review it before anything is sent. It is in preparation; write to contact@nbhc.fr to be notified at opening." },
  { question: "What is a custom tool, concretely?", answer: "Software built around your rules: your prices, your special cases, your way of preparing a quote or an invoice. It builds on your existing data and your advisors keep control of every decision." },
  { question: "How much does it cost?", answer: "The first 30-minute call is free. After that, scope and price are written down before we start: you know what will be built and what you will pay." },
  { question: "Who owns the tool once delivered?", answer: "You do. What we build for you belongs to you, and you keep it if the collaboration ends." },
  { question: "Where does my data go?", answer: "It depends on the tool. The providers your data goes through are settled with you, project by project, before we build." },
  { question: "What if a tool is not the right answer?", answer: "We tell you during the first call. A well-kept spreadsheet or off-the-shelf software is sometimes enough, and in that case we build nothing." },
  { question: "What technologies do you use?", answer: "Most often: Next.js (React), TypeScript, Tailwind CSS, Postgres, Stripe for payments, Mistral AI for language models. For video: FFmpeg, Whisper for transcription, Remotion for rendering." },
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
