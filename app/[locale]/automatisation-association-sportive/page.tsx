import { setRequestLocale } from "next-intl/server";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";

const contentFr: SectorContent = {
  eyebrow: "ASSOCIATIONS SPORTIVES · LOI 1901",
  h1: "Libérez du temps à vos bénévoles, pas votre budget",
  intro:
    "Un club sportif tourne sur des bénévoles qui gèrent l'administratif en plus de leur travail. On automatise les tâches répétitives de rentrée et de suivi — sans jamais remplacer le lien humain qui fait vivre le club.",
  painTitle: "Ce qui épuise un bureau associatif",
  painIntro:
    "La plupart des clubs sportifs gèrent encore leurs licences et leurs cotisations avec un mélange de fichiers Excel, d'e-mails manuels et de feuilles de papier lors des entraînements — une approche qui montre vite ses limites dès que le club dépasse une cinquantaine de licenciés.",
  painPoints: [
    {
      title: "La course aux certificats à chaque rentrée",
      description:
        "Récupérer les questionnaires de santé et certificats médicaux (pour les disciplines à contraintes particulières) auprès de dizaines de familles, un par un, par SMS ou par mail.",
    },
    {
      title: "Les cotisations relancées à la main",
      description:
        "Relancer un impayé de cotisation est souvent vécu comme la pire tâche du trésorier bénévole : ça prend du temps, c'est irrégulier, et ça crée une gêne entre le club et des familles qu'on connaît personnellement.",
    },
    {
      title: "Les convocations envoyées une par une",
      description:
        "Matchs, entraînements, compétitions : sans automatisation, chaque convocation ou changement de planning se refait manuellement pour chaque section, chaque catégorie d'âge.",
    },
    {
      title: "Un bureau bénévole, pas un service administratif",
      description:
        "Les dirigeants d'association gèrent le club sur leur temps libre, en plus de leur activité professionnelle — le temps passé sur l'administratif est du temps qui ne va pas à l'encadrement sportif.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "Pensées pour un bureau bénévole, pas pour un service RH d'entreprise : simples à valider, sans jargon technique à apprendre.",
  automations: [
    {
      code: "W-SPORT-06",
      title: "Gestion des inscriptions + certificats/licences",
      description:
        "Formulaire d'inscription centralisé pour la rentrée, relance automatique des dossiers incomplets (questionnaire de santé, certificat médical, licence fédérale), tableau de bord pour le bureau avec une vue d'ensemble en temps réel.",
    },
    {
      code: "W-SPORT-09",
      title: "Relance des cotisations impayées",
      description:
        "Séquence de relance automatique à J+15 puis J+30, avec un message pré-validé par le trésorier avant chaque envoi. Objectif : sortir de la relance manuelle gênante entre bénévoles qui connaissent personnellement les familles concernées.",
    },
    {
      code: "W-SPORT-07",
      title: "Convocations et communication membres/parents",
      description:
        "Envoi automatique des convocations aux matchs, entraînements et événements, avec communication groupée aux parents pour les catégories jeunes — sans qu'un bénévole n'ait à relancer un par un.",
    },
  ],
  geoTitle: "Vernon et sa périphérie (Eure)",
  geoText:
    "NBHC a rencontré et échangé avec plusieurs clubs et associations sportives de Vernon et de sa périphérie (Pacy-sur-Eure, Gaillon, Les Andelys, Ézy-sur-Eure) — judo, tennis, natation, escalade, rugby, basket. Les problématiques de gestion bénévole y sont les mêmes que partout en France, et l'offre s'adresse à tout club loi 1901, quelle que soit sa discipline ou sa localisation.",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, sans engagement, quelle que soit la taille du club. Le format standard (Quick Win à partir de 2 000 € HT, Standard à partir de 4 000 € HT + performance fee) reste accessible, mais on sait qu'un club amateur n'a pas le budget d'une entreprise.",
  pricingNote:
    "Offre asso/solidaire à partir de 1 000 € HT, pensée spécifiquement pour les associations loi 1901 à petit budget.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "On est un petit club, on n'a clairement pas de budget pour ça.",
      answer:
        "C'est justement pour ça qu'existe l'offre asso/solidaire à partir de 1 000 € HT. Le diagnostic de 30 minutes est gratuit dans tous les cas — on regarde ensemble ce qui est réaliste pour votre budget avant de s'engager sur quoi que ce soit.",
    },
    {
      question: "Notre trésorier n'est pas du tout technique, il va s'y retrouver ?",
      answer:
        "Les automatisations tournent seules une fois configurées. Le bureau valide simplement les messages type au démarrage et reçoit un tableau de bord simple — pas besoin de compétences techniques pour l'utiliser au quotidien.",
    },
    {
      question: "Ça remplace le rôle du bureau ou des bénévoles ?",
      answer:
        "Non. L'automatisation prend en charge les tâches répétitives (relances, convocations, suivi de dossiers) pour libérer du temps aux bénévoles sur ce qui compte vraiment : l'encadrement sportif et la vie du club.",
    },
  ],
  ctaText:
    "30 minutes pour voir ce qu'on peut automatiser dans la gestion de votre club, et si l'offre asso/solidaire est adaptée à votre budget.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Salles de sport & instituts bien-être", href: "/fr/automatisation-salle-de-sport" },
    { label: "Garages et carrosseries", href: "/fr/automatisation-garage-automobile" },
    { label: "Artisans et BTP", href: "/fr/automatisation-artisan-btp" },
  ],
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "SPORTS ASSOCIATIONS · NON-PROFIT",
  h1: "Free up your volunteers' time, not your budget",
  intro:
    "A sports club runs on volunteers who handle admin work on top of their day job. We automate the repetitive sign-up-season and follow-up tasks — without ever replacing the human connection that keeps the club alive.",
  painTitle: "What wears out a volunteer board",
  painIntro:
    "Most sports clubs still manage licenses and dues with a mix of spreadsheets, manual emails and paper sheets at practice — an approach that quickly shows its limits once a club passes about fifty registered members.",
  painPoints: [
    {
      title: "The certificate chase every sign-up season",
      description:
        "Collecting health questionnaires and medical certificates (for disciplines with specific requirements) from dozens of families, one by one, by text or email.",
    },
    {
      title: "Dues chased by hand",
      description:
        "Following up on an unpaid membership fee is often the volunteer treasurer's least favorite task: it takes time, it's inconsistent, and it creates awkwardness between the club and families they know personally.",
    },
    {
      title: "Match notices sent one at a time",
      description:
        "Matches, practices, competitions: without automation, every notice or schedule change gets redone manually for each section, each age group.",
    },
    {
      title: "A volunteer board, not an admin department",
      description:
        "Association leaders run the club on their free time, on top of their day job — time spent on admin work is time not spent coaching.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "Designed for a volunteer board, not a corporate HR department: simple to validate, no technical jargon to learn.",
  automations: [
    {
      code: "W-SPORT-06",
      title: "Sign-up management + certificates/licenses",
      description:
        "Centralized sign-up form for the season, automatic follow-up on incomplete files (health questionnaire, medical certificate, federation license), real-time dashboard for the board.",
    },
    {
      code: "W-SPORT-09",
      title: "Unpaid dues follow-up",
      description:
        "Automatic follow-up sequence at day 15 and day 30, with a message pre-approved by the treasurer before each send. Goal: get out of the awkward manual follow-up between volunteers who know the families personally.",
    },
    {
      code: "W-SPORT-07",
      title: "Notices and member/parent communication",
      description:
        "Automatic sending of match, practice and event notices, with grouped communication to parents for youth categories — without a volunteer having to follow up one by one.",
    },
  ],
  geoTitle: "Vernon and its surrounding area (Eure, France)",
  geoText:
    "NBHC has met and talked with several sports clubs and associations in Vernon and its surroundings (Pacy-sur-Eure, Gaillon, Les Andelys, Ézy-sur-Eure) — judo, tennis, swimming, climbing, rugby, basketball. Volunteer management challenges are the same everywhere in France, and this offer is open to any non-profit sports club, whatever its discipline or location.",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, no commitment, whatever the size of the club. The standard format (Quick Win from €2,000 excl. VAT, Standard from €4,000 excl. VAT + performance fee) remains available, but we know an amateur club doesn't have a business-sized budget.",
  pricingNote:
    "Solidarity/non-profit offer from €1,000 excl. VAT, designed specifically for non-profit sports clubs on a tight budget.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "We're a small club, we clearly don't have the budget for this.",
      answer:
        "That's exactly why the solidarity offer from €1,000 excl. VAT exists. The 30-minute diagnostic is free either way — we look together at what's realistic for your budget before committing to anything.",
    },
    {
      question: "Our treasurer isn't technical at all, will they manage?",
      answer:
        "Automations run on their own once configured. The board simply approves template messages at launch and receives a simple dashboard — no technical skills needed for day-to-day use.",
    },
    {
      question: "Does this replace the board or volunteers?",
      answer:
        "No. Automation handles repetitive tasks (follow-ups, notices, file tracking) to free up volunteer time for what really matters: coaching and club life.",
    },
  ],
  ctaText:
    "30 minutes to see what can be automated in your club's management, and whether the solidarity offer fits your budget.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Gyms & wellness centers", href: "/en/automatisation-salle-de-sport" },
    { label: "Garages and auto body shops", href: "/en/automatisation-garage-automobile" },
    { label: "Tradespeople and construction", href: "/en/automatisation-artisan-btp" },
  ],
  backLabel: "Back",
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === "fr";
  const content = isFr ? contentFr : contentEn;
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-association-sportive`;

  return (
    <>
      <SectorPageContent locale={locale} content={content} />
      <JsonLd
        data={[
          serviceSchema(locale as "fr" | "en", [
            {
              name: isFr ? "Offre asso/solidaire" : "Solidarity offer",
              price: "1000",
              description: isFr
                ? "Automatisation ciblée pour association sportive loi 1901 à petit budget"
                : "Targeted automation for non-profit sports clubs on a tight budget",
              url: pageUrl,
            },
            {
              name: "Quick Win",
              price: "2000",
              description: isFr
                ? "1 automatisation ciblée livrée en 2-3 semaines"
                : "1 targeted automation delivered in 2-3 weeks",
              url: pageUrl,
            },
          ]),
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: `https://nbhc.fr/${locale}` },
            {
              name: isFr ? "Associations sportives" : "Sports associations",
              url: pageUrl,
            },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
