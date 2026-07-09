import { setRequestLocale, getTranslations } from "next-intl/server";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { zipFlowSteps, type FlowStepKind } from "../../../components/AutomationFlow";
import ChatMockup, { type ChatBubbleData } from "../../../components/ChatMockup";
import CallBookingMockup, { type CallBookingMockupContent } from "../../../components/CallBookingMockup";

const FLOW_KINDS: Record<string, FlowStepKind[]> = {
  "W-REST-03": ["trigger", "process", "action", "validation"],
  "W-REST-04": ["trigger", "process", "action", "validation"],
  "W-REST-05": ["trigger", "process", "action", "validation"],
};
const FLOW_MSG_KEY: Record<string, string> = {
  "W-REST-03": "noshow",
  "W-REST-04": "avis",
  "W-REST-05": "menuDuJour",
};

const contentFr: SectorContent = {
  eyebrow: "RESTAURANTS",
  h1: "Le téléphone qui sonne pendant le coup de feu ne doit plus être un client perdu",
  intro:
    "Décrocher pendant le service, relancer les no-show, répondre aux avis, recontacter la base clients par WhatsApp : ce sont des tâches qui se font quand la salle a le temps — c'est-à-dire rarement. On les automatise — vous restez le restaurateur qui décide, valide et sert. On détecte, on prépare, on propose — jamais on ne s'engage à votre place.",
  painTitle: "Ce qui se perd entre deux services",
  painIntro:
    "Sur un restaurant qui tourne à plein régime, ces tâches ne se font pas systématiquement — pas par manque de volonté, par manque de mains disponibles au bon moment.",
  painPoints: [
    {
      title: "Un appel raté en plein coup de feu, c'est une réservation perdue",
      description:
        "Sans personne pour décrocher pendant le service, l'appel tombe dans le vide — le client essaie ailleurs.",
    },
    {
      title: "La relation client se fait au feeling, pas au canal structuré",
      description:
        "Sans base clients connectée à un canal comme WhatsApp, les campagnes de fidélisation ou les remises ciblées restent occasionnelles, pas systématiques.",
    },
    {
      title: "Un no-show découvert au moment du service coûte une table",
      description:
        "Sans rappel automatique avant le service, la table reste bloquée pour un client qui ne vient pas — et personne d'autre n'a pu la réserver.",
    },
    {
      title: "Les avis s'accumulent sans réponse",
      description:
        "Sans suivi dédié, un avis négatif reste sans réponse plusieurs jours — et un avis positif aussi.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "On choisit 3 à 5 automatisations selon votre profil (un seul point de vente ou plusieurs, avec ou sans service de réservation en ligne) — jamais l'ensemble d'un coup.",
  automations: [
    {
      code: "W-REST-01",
      title: "IA téléphonique de réservation",
      description:
        "Décroche quand personne en salle ne peut répondre — pendant le service ou en dehors des horaires d'ouverture — prend la réservation, et propose un autre créneau si le service est complet. Une confirmation est envoyée par SMS ou e-mail. Le planning reste le vôtre : vous le consultez et le modifiez à tout moment, l'IA ne fait que remplir les créneaux que vous avez ouverts.",
    },
    {
      code: "W-REST-02",
      title: "WhatsApp commande + remise ciblée",
      description:
        "Connecte votre base clients à WhatsApp Business pour des campagnes de contact et une prise de commande directement dans la conversation, avec une remise exclusive ciblée par segment. Les campagnes nécessitent l'accord préalable du client (opt-in), conformément aux règles de l'API WhatsApp Business — on ne contourne jamais cette exigence. Vous validez chaque commande avant préparation.",
    },
    {
      code: "W-REST-03",
      title: "Rappel de réservation anti no-show",
      description:
        "Envoie un rappel SMS ou WhatsApp avant le service, avec confirmation ou annulation en un geste. Un client qui annule à temps libère la table pour quelqu'un d'autre, plutôt que de la bloquer jusqu'au service.",
    },
    {
      code: "W-REST-04",
      title: "Gestion des avis clients Google",
      description:
        "Détecte les nouveaux avis, analyse leur ton et prépare un brouillon de réponse adapté, en priorisant les avis négatifs à traiter rapidement. Vous validez et publiez chaque réponse ; l'automatisation ne répond jamais à votre place.",
    },
    {
      code: "W-REST-05",
      title: "Diffusion du menu ou de la promo du jour",
      description:
        "Vous renseignez le menu ou la promo du jour une fois ; la diffusion est programmée automatiquement sur les canaux choisis (site, réseaux, WhatsApp) à l'heure que vous définissez. Vous gardez la main sur le calendrier de diffusion à tout moment.",
    },
  ],
  geoTitle: "Partout en France",
  geoText:
    "L'offre s'adresse à tout restaurant indépendant en France, quel que soit son format (bistrot, restaurant gastronomique, brasserie, restauration rapide avec service à table). Le diagnostic de 30 minutes permet d'identifier les tâches précises qui vous coûtent le plus de temps, quel que soit votre secteur géographique.",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, systématique et sans engagement. Quick Win à partir de 2 000 € HT pour une première automatisation (l'IA téléphonique, par exemple) livrée en 2-3 semaines, ou Standard à partir de 4 000 € HT + performance fee de 30 % du ROI mesuré (plafonnée à 2× le prix du build) pour combiner plusieurs automatisations. Vous restez propriétaire de votre stack.",
  pricingNote: "Aucun résultat chiffré n'est promis : NBHC n'a aucune référence client restaurant à ce jour.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Est-ce que l'IA téléphonique remplace complètement l'accueil ?",
      answer:
        "Non. Elle prend le relais quand personne ne peut décrocher — pendant le coup de feu ou en dehors des horaires. Vous gardez la main sur le planning à tout moment et pouvez reprendre l'appel si besoin.",
    },
    {
      question: "Est-ce que je peux envoyer des messages WhatsApp à toute ma base sans accord préalable ?",
      answer:
        "Non — l'API WhatsApp Business impose un accord préalable (opt-in) du client pour les campagnes. On respecte cette règle strictement ; l'automatisation ne contourne jamais cette exigence.",
    },
    {
      question: "Ça marche avec mon système de réservation actuel ?",
      answer:
        "On se connecte à l'outil que vous utilisez déjà quand c'est possible — l'objectif est de compléter votre organisation, pas de vous en faire changer.",
    },
  ],
  ctaText:
    "30 minutes pour identifier ce qui vous prend le plus de temps entre les appels ratés, les no-show et la relation client, et voir si une automatisation vaut le coup pour votre restaurant.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Salons de coiffure", href: "/fr/automatisation-salon-de-coiffure" },
    { label: "Salles de sport & instituts bien-être", href: "/fr/automatisation-salle-de-sport" },
    { label: "Garages et carrosseries", href: "/fr/automatisation-garage-automobile" },
  ],
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "RESTAURANTS",
  h1: "A phone ringing during the rush shouldn't mean a lost customer",
  intro:
    "Answering during service, following up no-shows, replying to reviews, reaching out to your customer base on WhatsApp: these are tasks that get done when the floor has time — which is rarely. We automate them — you stay the restaurant owner who decides, approves and serves. We detect, prepare, propose — we never commit on your behalf.",
  painTitle: "What gets lost between two services",
  painIntro:
    "In a restaurant running at full capacity, these tasks don't happen systematically — not for lack of will, for lack of free hands at the right moment.",
  painPoints: [
    {
      title: "A missed call during the rush is a lost booking",
      description: "With no one free to answer during service, the call goes unanswered — the customer tries elsewhere.",
    },
    {
      title: "Customer relations run on feeling, not a structured channel",
      description:
        "Without a customer base connected to a channel like WhatsApp, loyalty campaigns or targeted discounts stay occasional, not systematic.",
    },
    {
      title: "A no-show discovered at service time costs a table",
      description:
        "Without an automatic reminder before service, the table stays blocked for a customer who doesn't show — and no one else could book it.",
    },
    {
      title: "Reviews pile up unanswered",
      description: "Without dedicated follow-up, a negative review goes unanswered for days — and so does a positive one.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "We pick 3-5 automations based on your profile (a single location or several, with or without an online booking tool) — never all at once.",
  automations: [
    {
      code: "W-REST-01",
      title: "AI phone booking assistant",
      description:
        "Answers when no one on the floor can pick up — during service or outside opening hours — takes the booking, and proposes another slot if service is full. A confirmation is sent by SMS or email. The schedule stays yours: you check and edit it anytime, the AI only fills the slots you've opened.",
    },
    {
      code: "W-REST-02",
      title: "WhatsApp ordering + targeted discount",
      description:
        "Connects your customer base to WhatsApp Business for outreach campaigns and orders taken directly in the conversation, with an exclusive discount targeted by segment. Campaigns require the customer's prior consent (opt-in), per WhatsApp Business API rules — we never bypass that requirement. You approve every order before preparation.",
    },
    {
      code: "W-REST-03",
      title: "No-show reminder",
      description:
        "Sends an SMS or WhatsApp reminder before service, with one-tap confirm or cancel. A customer who cancels in time frees the table for someone else, instead of it staying blocked until service.",
    },
    {
      code: "W-REST-04",
      title: "Google review management",
      description:
        "Detects new reviews, analyzes their tone and prepares a draft reply, prioritizing negative reviews for quick handling. You approve and publish every reply; the automation never answers on your behalf.",
    },
    {
      code: "W-REST-05",
      title: "Daily menu or promo distribution",
      description:
        "You enter the daily menu or promo once; distribution is scheduled automatically across the channels you choose (website, social, WhatsApp) at the time you set. You keep control of the publishing calendar at any time.",
    },
  ],
  geoTitle: "Anywhere in France",
  geoText:
    "The offer is open to any independent restaurant in France, whatever its format (bistro, fine dining, brasserie, table-service fast-casual). The 30-minute diagnostic identifies the specific tasks costing you the most time, whatever your region.",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, systematic and with no commitment. Quick Win from €2,000 excl. VAT for a first automation (the AI phone assistant, for instance) delivered in 2-3 weeks, or Standard from €4,000 excl. VAT + a 30% performance fee on measured ROI (capped at 2x the build price) to combine several automations. You keep ownership of your stack.",
  pricingNote: "No numeric result is promised: NBHC has no restaurant client reference to date.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "Does the AI phone assistant fully replace answering the phone?",
      answer:
        "No. It steps in when no one can pick up — during the rush or outside opening hours. You keep control of the schedule at all times and can take over the call if needed.",
    },
    {
      question: "Can I message my whole customer base on WhatsApp without prior consent?",
      answer:
        "No — the WhatsApp Business API requires the customer's prior consent (opt-in) for campaigns. We follow that rule strictly; the automation never bypasses this requirement.",
    },
    {
      question: "Does this work with my current booking system?",
      answer: "We connect to the tool you already use when possible — the goal is to complete your setup, not make you switch.",
    },
  ],
  ctaText:
    "30 minutes to identify what's taking up the most of your time between missed calls, no-shows and customer relations, and see whether automation is worth it for your restaurant.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Hair salons", href: "/en/automatisation-salon-de-coiffure" },
    { label: "Gyms & wellness centers", href: "/en/automatisation-salle-de-sport" },
    { label: "Garages and body shops", href: "/en/automatisation-garage-automobile" },
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
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-restaurant`;

  const t = await getTranslations({ locale, namespace: "automationFlows.restaurant" });

  const content: SectorContent = {
    ...baseContent,
    automations: baseContent.automations.map((a) => {
      if (a.code === "W-REST-01") {
        const callBooking = t.raw("callBooking") as CallBookingMockupContent;
        return {
          ...a,
          customFlow: <CallBookingMockup ariaLabel={a.title} content={callBooking} />,
        };
      }
      if (a.code === "W-REST-02") {
        const chat = t.raw("whatsappChat") as {
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
                ? "1 automatisation ciblée pour restaurant, livrée en 2-3 semaines"
                : "1 targeted automation for restaurants, delivered in 2-3 weeks",
              url: pageUrl,
            },
            {
              name: "Standard",
              price: "4000",
              description: isFr
                ? "3-5 automatisations combinées + performance fee 30% du ROI mesuré"
                : "3-5 combined automations + 30% performance fee on measured ROI",
              url: pageUrl,
            },
          ]),
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: `https://nbhc.fr/${locale}` },
            { name: isFr ? "Restaurants" : "Restaurants", url: pageUrl },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
