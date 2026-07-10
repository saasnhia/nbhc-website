import { setRequestLocale, getTranslations } from "next-intl/server";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { zipFlowSteps, type FlowStepKind } from "../../../components/AutomationFlow";
import ChatMockup, { type ChatBubbleData } from "../../../components/ChatMockup";
import CallBookingMockup, { type CallBookingMockupContent } from "../../../components/CallBookingMockup";

const FLOW_KINDS: Record<string, FlowStepKind[]> = {
  "W-AUTO-02": ["trigger", "validation", "action"],
  "W-AUTO-08": ["trigger", "process", "action", "validation"],
  "W-AUTO-05": ["trigger", "process", "action"],
};
const FLOW_MSG_KEY: Record<string, string> = {
  "W-AUTO-02": "w0102",
  "W-AUTO-08": "w0108",
  "W-AUTO-05": "w0105",
};

const contentFr: SectorContent = {
  eyebrow: "GARAGES · CARROSSERIES INDÉPENDANTES",
  h1: "Ne perdez plus un client parce que vous étiez sous une voiture",
  intro:
    "Le patron d'un garage indépendant est à l'atelier, pas au téléphone. Chaque appel raté pendant une intervention est un client qui essaie le garage d'à côté. On automatise l'accueil téléphonique, les relances de devis et les rappels d'entretien pour que rien ne se perde entre deux interventions.",
  painTitle: "Ce qui fait fuir du chiffre d'affaires dans un garage indépendant",
  painIntro:
    "Un garage indépendant de quelques salariés n'a ni standard dédié, ni service commercial. Le gérant fait tout : l'atelier, l'accueil, les devis, la facturation. Ce sont les tâches répétitives entre deux interventions qui finissent par coûter le plus cher.",
  painPoints: [
    {
      title: "Les appels manqués pendant l'atelier",
      description:
        "Impossible de décrocher les mains dans le moteur. Un client qui tombe sur un répondeur ou qui sonne dans le vide rappelle rarement — il essaie le garage suivant sur sa recherche.",
    },
    {
      title: "Les devis envoyés puis jamais relancés",
      description:
        "Un devis pour une distribution ou un embrayage qui traîne sans relance a statistiquement beaucoup moins de chances d'être signé qu'un devis suivi à J+3, J+7 et J+14.",
    },
    {
      title: "Les révisions et contrôles techniques jamais rappelés",
      description:
        "Sans rappel systématique basé sur le kilométrage ou la date de la dernière intervention, une bonne partie de la base client ne revient tout simplement pas au bon moment.",
    },
    {
      title: "Les avis Google jamais sollicités",
      description:
        "Un client satisfait qui ne laisse pas d'avis, c'est de la visibilité locale perdue face aux garages concurrents mieux référencés.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "On choisit 2 à 3 briques du catalogue selon votre volume d'appels, votre activité (mécanique, carrosserie, ou les deux) et vos outils déjà en place — jamais les 10 en même temps.",
  automations: [
    {
      code: "W-AUTO-01",
      title: "IA téléphonique après 3 sonneries + adaptation de planning",
      description:
        "Quand personne ne décroche, un assistant vocal prend le relais : il se présente au nom de votre garage, qualifie la demande (RDV, devis, urgence), propose un créneau réel depuis votre planning, et vous transmet une fiche de rappel priorisée. Chaque prise de RDV reste validée par vous avant confirmation au client.",
    },
    {
      code: "W-AUTO-02",
      title: "Relance automatique des devis non signés",
      description:
        "Séquence de relance à J+3, J+7 et J+14, avec un message adapté au type d'intervention (mécanique courante, carrosserie, gros travaux). Vous validez le modèle de message une fois, ensuite les relances partent seules.",
    },
    {
      code: "W-AUTO-03",
      title: "Rappels intelligents révision, contrôle technique et entretien",
      description:
        "À partir du kilométrage et de la date de la dernière intervention de chaque véhicule, l'automatisation calcule les échéances prévisibles et envoie un rappel SMS au bon moment — sans que vous ayez à surveiller votre fichier client.",
    },
    {
      code: "W-AUTO-08",
      title: "Suivi satisfaction et avis Google post-intervention",
      description:
        "SMS automatique après restitution du véhicule demandant une note rapide. Bonne note → lien direct vers votre fiche Google. Note basse → alerte immédiate pour un rappel personnel avant qu'un avis négatif ne soit publié.",
    },
    {
      code: "W-AUTO-05",
      title: "Suivi des dossiers assurance et flottes B2B",
      description:
        "Pour une activité carrosserie, suivi de chaque dossier assurance (expert assigné, franchise, délais) avec relance automatique des experts qui traînent. Pour la clientèle flotte entreprise, suivi des révisions par véhicule et facturation consolidée.",
    },
  ],
  geoTitle: "Toulouse et sa métropole",
  geoText:
    "NBHC a mené un travail de terrain approfondi auprès des garages et carrosseries indépendants de Toulouse et de sa métropole. Si vous êtes dans ce secteur, on connaît déjà les réseaux d'indépendants locaux (Motrio, AD Expert, Bosch Car Service, Axial...) — mais l'offre s'adresse à tout garage ou carrosserie indépendant en France, quel que soit le réseau d'affiliation.",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, systématique et sans engagement. Quick Win à partir de 2 000 € HT pour une première automatisation (l'IA téléphonique, par exemple) livrée en 2-3 semaines, ou Standard à partir de 4 000 € HT + performance fee de 30 % du ROI mesuré (plafonnée à 2× le prix du build) pour combiner plusieurs automatisations. Vous restez propriétaire de votre stack.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "L'IA téléphonique va rendre mon garage impersonnel ?",
      answer:
        "Non — elle prend le relais uniquement quand vous êtes occupé à l'atelier. Elle se présente au nom de votre garage et vous transmet chaque demande. La plupart des clients ne se rendent même pas compte qu'ils ont parlé à un assistant automatisé.",
    },
    {
      question: "Ça marche avec mon logiciel de gestion garage actuel ?",
      answer:
        "On se connecte à l'outil que vous utilisez déjà pour le planning et le suivi client — l'objectif est de compléter votre organisation actuelle, pas de vous en faire changer.",
    },
    {
      question: "Je suis seul dans mon garage, j'ai vraiment le temps de gérer ça en plus ?",
      answer:
        "C'est l'inverse : une fois configurée, l'automatisation tourne sans vous. Vous validez simplement les rendez-vous proposés et les cas particuliers. Le diagnostic de 30 minutes sert justement à évaluer ce qui est réaliste pour votre rythme.",
    },
  ],
  ctaText:
    "30 minutes pour évaluer combien d'appels, de devis ou de rappels d'entretien vous laissez filer aujourd'hui, et si une automatisation ciblée vaut le coup pour votre garage.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Salles de sport & instituts bien-être", href: "/fr/automatisation-salle-de-sport" },
    { label: "Associations sportives (loi 1901)", href: "/fr/automatisation-association-sportive" },
    { label: "Artisans et BTP", href: "/fr/automatisation-artisan-btp" },
  ],
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "INDEPENDENT GARAGES & BODY SHOPS",
  h1: "Stop losing customers because you were under a car",
  intro:
    "An independent garage owner is in the shop, not on the phone. Every missed call during a repair is a customer trying the garage down the street. We automate phone reception, quote follow-ups and service reminders so nothing gets lost between two jobs.",
  painTitle: "What drains revenue in an independent garage",
  painIntro:
    "A small independent garage has no dedicated front desk, no sales team. The owner does it all: the shop floor, reception, quotes, invoicing. It's the repetitive tasks between two jobs that end up costing the most.",
  painPoints: [
    {
      title: "Missed calls during shop work",
      description:
        "Impossible to pick up with your hands in an engine. A customer who hits voicemail or lets it ring rarely calls back — they try the next garage on their search.",
    },
    {
      title: "Quotes sent and never followed up",
      description:
        "A quote for a timing belt or clutch job left without follow-up has statistically much lower odds of being signed than one followed up at day 3, 7 and 14.",
    },
    {
      title: "Service and inspection reminders never sent",
      description:
        "Without a systematic reminder based on mileage or last service date, a good chunk of the customer base simply doesn't come back at the right time.",
    },
    {
      title: "Google reviews never requested",
      description:
        "A satisfied customer who doesn't leave a review is lost local visibility against better-reviewed competing garages.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "We pick 2-3 catalog building blocks based on your call volume, your activity (mechanical, body work, or both) and the tools you already use — never all 10 at once.",
  automations: [
    {
      code: "W-AUTO-01",
      title: "AI phone agent after 3 rings + real-time schedule adaptation",
      description:
        "When nobody picks up, a voice assistant takes over: it introduces itself as your garage, qualifies the request (appointment, quote, emergency), proposes a real slot from your schedule, and sends you a prioritized callback note. Every booking stays validated by you before confirmation to the customer.",
    },
    {
      code: "W-AUTO-02",
      title: "Automatic follow-up on unsigned quotes",
      description:
        "Follow-up sequence at day 3, 7 and 14, with a message adapted to the type of job (routine mechanical, body work, major repairs). You approve the message template once, then follow-ups go out on their own.",
    },
    {
      code: "W-AUTO-03",
      title: "Smart service, inspection and maintenance reminders",
      description:
        "Based on each vehicle's mileage and last service date, the automation calculates predictable due dates and sends an SMS reminder at the right time — without you having to monitor your customer file.",
    },
    {
      code: "W-AUTO-08",
      title: "Satisfaction tracking and Google reviews after service",
      description:
        "Automatic SMS after the vehicle is returned, asking for a quick rating. Good rating → direct link to your Google listing. Low rating → immediate alert for a personal follow-up before a negative review gets published.",
    },
    {
      code: "W-AUTO-05",
      title: "Insurance claim and B2B fleet tracking",
      description:
        "For body shop activity, tracking of each insurance claim (assigned expert, deductible, timelines) with automatic follow-up on slow-moving experts. For fleet clients, per-vehicle service tracking and consolidated invoicing.",
    },
  ],
  geoTitle: "Toulouse and its metro area",
  geoText:
    "NBHC has done in-depth field work with independent garages and body shops in Toulouse and its metro area. If you're in this area, we already know the local independent networks (Motrio, AD Expert, Bosch Car Service, Axial...) — but this offer is open to any independent garage or body shop in France, whatever its affiliation network.",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, systematic and with no commitment. Quick Win from €2,000 excl. VAT for a first automation (the AI phone agent, for instance) delivered in 2-3 weeks, or Standard from €4,000 excl. VAT + a 30% performance fee on measured ROI (capped at 2x the build price) to combine several automations. You keep ownership of your stack.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "Will the AI phone agent make my garage feel impersonal?",
      answer:
        "No — it only takes over when you're busy in the shop. It introduces itself as your garage and passes every request on to you. Most customers don't even realize they spoke to an automated assistant.",
    },
    {
      question: "Does it work with my current garage management software?",
      answer:
        "We connect to the tool you already use for scheduling and customer tracking — the goal is to complete your current setup, not make you switch.",
    },
    {
      question: "I run my garage alone, do I really have time to manage this too?",
      answer:
        "It's the opposite: once configured, the automation runs without you. You simply approve proposed appointments and edge cases. The 30-minute diagnostic is exactly there to assess what's realistic for your pace.",
    },
  ],
  ctaText:
    "30 minutes to assess how many calls, quotes or service reminders you're currently letting slip, and whether a targeted automation is worth it for your garage.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Gyms & wellness centers", href: "/en/automatisation-salle-de-sport" },
    { label: "Sports associations (non-profit)", href: "/en/automatisation-association-sportive" },
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
  const baseContent = isFr ? contentFr : contentEn;
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-garage-automobile`;

  const t = await getTranslations({ locale, namespace: "automationFlows.garage" });
  const content: SectorContent = {
    ...baseContent,
    automations: baseContent.automations.map((a) => {
      if (a.code === "W-AUTO-01") {
        const callBooking = t.raw("callBooking") as CallBookingMockupContent;
        return {
          ...a,
          customFlow: <CallBookingMockup ariaLabel={a.title} content={callBooking} />,
        };
      }
      if (a.code === "W-AUTO-03") {
        const chat = t.raw("rappelChat") as {
          contactName: string;
          contactSubtitle: string;
          bubbles: ChatBubbleData[];
          inputPlaceholder: string;
          validateButtonLabel: string;
          validateCaption: string;
        };
        return {
          ...a,
          customFlow: <ChatMockup ariaLabel={a.title} content={chat} />,
        };
      }
      const kinds = FLOW_KINDS[a.code];
      const msgKey = FLOW_MSG_KEY[a.code];
      if (!kinds || !msgKey) return a;
      return { ...a, flowSteps: zipFlowSteps(kinds, t.raw(msgKey)) };
    }),
  };

  return (
    <>
      <SectorPageContent locale={locale} content={content} />
      <JsonLd
        data={[
          serviceSchema(locale as "fr" | "en", [
            {
              name: "Quick Win",
              price: "2000",
              description: isFr
                ? "1 automatisation ciblée pour garage ou carrosserie, livrée en 2-3 semaines"
                : "1 targeted automation for garages or body shops, delivered in 2-3 weeks",
              url: pageUrl,
            },
            {
              name: "Standard",
              price: "4000",
              description: isFr
                ? "2-3 automatisations combinées + performance fee 30% du ROI mesuré"
                : "2-3 combined automations + 30% performance fee on measured ROI",
              url: pageUrl,
            },
          ]),
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: `https://nbhc.fr/${locale}` },
            {
              name: isFr ? "Garages & carrosseries" : "Garages & body shops",
              url: pageUrl,
            },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
