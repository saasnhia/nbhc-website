import { setRequestLocale, getTranslations } from "next-intl/server";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { zipFlowSteps, type FlowStepKind } from "../../../components/AutomationFlow";
import ChatMockup, { type ChatBubbleData } from "../../../components/ChatMockup";
import CallBookingMockup, { type CallBookingMockupContent } from "../../../components/CallBookingMockup";

const FLOW_KINDS: Record<string, FlowStepKind[]> = {
  "W-COIF-03": ["trigger", "process", "action", "validation"],
  "W-COIF-04": ["trigger", "process", "action", "validation"],
  "W-COIF-05": ["trigger", "process", "action", "validation"],
};
const FLOW_MSG_KEY: Record<string, string> = {
  "W-COIF-03": "ficheCliente",
  "W-COIF-04": "carteCadeau",
  "W-COIF-05": "noshow",
};

const contentFr: SectorContent = {
  eyebrow: "SALONS DE COIFFURE",
  h1: "Le salon qui ne décroche jamais, ce n'est plus une cliente qui raccroche",
  intro:
    "Décrocher pendant une prestation, relancer une cliente au bon moment, retrouver la formule couleur, suivre les cartes cadeaux : ce sont des tâches qui se font entre deux clientes — c'est-à-dire rarement dans le bon timing. On les automatise — vous restez la coiffeuse ou le salon qui décide, valide et reçoit. On détecte, on prépare, on propose — jamais on ne s'engage à votre place.",
  painTitle: "Ce qui échappe entre deux prestations",
  painIntro:
    "Sur un salon qui enchaîne les rendez-vous, ces tâches ne se font pas systématiquement — pas par manque de soin, par manque de temps entre deux clientes.",
  painPoints: [
    {
      title: "Un appel raté pendant une prestation, c'est un RDV perdu",
      description: "Sans personne de libre pour décrocher, l'appel tombe dans le vide — la cliente réserve ailleurs.",
    },
    {
      title: "La relance se fait au hasard, pas au bon moment du cycle",
      description:
        "Sans suivi structuré, la relance à ~6 semaines (le rythme habituel entre deux coupes ou colorations) se fait de mémoire, ou pas du tout.",
    },
    {
      title: "La formule couleur se reconstitue à chaque fois",
      description: "Sans fiche centralisée, la formule technique dépend du carnet papier ou de la mémoire de l'équipe.",
    },
    {
      title: "Un créneau non confirmé reste bloqué pour rien",
      description: "Sans rappel automatique, un RDV auquel la cliente ne vient pas immobilise un créneau qui aurait pu être repris.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "On choisit 3 à 5 automatisations selon votre profil (salon indépendant ou plusieurs coiffeuses, avec ou sans logiciel de prise de RDV) — jamais l'ensemble d'un coup.",
  automations: [
    {
      code: "W-COIF-01",
      title: "IA téléphonique de prise de RDV",
      description:
        "Décroche quand personne au salon ne peut répondre — en pleine prestation ou en dehors des horaires — propose un créneau disponible, ou une alternative si l'agenda est complet, et confirme par SMS. L'agenda reste le vôtre : vous le consultez et le modifiez à tout moment, l'IA ne fait que remplir les créneaux que vous avez ouverts.",
    },
    {
      code: "W-COIF-02",
      title: "Relance et rappel WhatsApp",
      description:
        "Connecte votre base clientes à WhatsApp Business pour un rappel avant chaque RDV et une relance personnalisée à l'échéance du cycle (~6 semaines), avec une remise fidélité ciblée si pertinent. Les campagnes nécessitent l'accord préalable de la cliente (opt-in), conformément aux règles de l'API WhatsApp Business — on ne contourne jamais cette exigence. Vous validez chaque prise de RDV qui en découle.",
    },
    {
      code: "W-COIF-03",
      title: "Fiche cliente et formule couleur",
      description:
        "Centralise et rappelle la formule technique utilisée pour chaque cliente, disponible avant le RDV suivant. Vous validez et ajustez la formule à chaque prestation ; l'automatisation ne prend jamais de décision technique à votre place.",
    },
    {
      code: "W-COIF-04",
      title: "Suivi des cartes cadeaux",
      description:
        "Suit l'émission, l'utilisation et la date d'expiration de chaque carte cadeau, et prépare une relance si une carte approche de l'expiration sans avoir été utilisée. Vous gardez la main sur chaque relance envoyée.",
    },
    {
      code: "W-COIF-05",
      title: "Anti no-show",
      description:
        "Demande une confirmation avant le RDV et alerte en l'absence de réponse, pour libérer le créneau à temps et le reproposer à une autre cliente plutôt que de le perdre au dernier moment.",
    },
  ],
  geoTitle: "Partout en France",
  geoText:
    "L'offre s'adresse à tout salon de coiffure indépendant en France, quel que soit son format (salon seul, plusieurs coiffeuses, spécialisé coloration ou coupe). Le diagnostic de 30 minutes permet d'identifier les tâches précises qui vous coûtent le plus de temps, quel que soit votre secteur géographique.",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, systématique et sans engagement. Quick Win à partir de 2 000 € HT pour une première automatisation (l'IA téléphonique, par exemple) livrée en 2-3 semaines, ou Standard à partir de 4 000 € HT + performance fee de 30 % du ROI mesuré (plafonnée à 2× le prix du build) pour combiner plusieurs automatisations. Vous restez propriétaire de votre stack.",
  pricingNote: "Aucun résultat chiffré n'est promis : NBHC n'a aucune référence client salon de coiffure à ce jour.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Est-ce que l'IA téléphonique remplace complètement l'accueil ?",
      answer:
        "Non. Elle prend le relais quand personne ne peut décrocher — en pleine prestation ou en dehors des horaires. Vous gardez la main sur l'agenda à tout moment et pouvez reprendre l'appel si besoin.",
    },
    {
      question: "Est-ce que je peux envoyer des messages WhatsApp à toute ma base sans accord préalable ?",
      answer:
        "Non — l'API WhatsApp Business impose un accord préalable (opt-in) de la cliente pour les campagnes. On respecte cette règle strictement ; l'automatisation ne contourne jamais cette exigence.",
    },
    {
      question: "Ça marche avec mon logiciel de prise de RDV actuel ?",
      answer: "On se connecte à l'outil que vous utilisez déjà quand c'est possible — l'objectif est de compléter votre organisation, pas de vous en faire changer.",
    },
  ],
  ctaText:
    "30 minutes pour identifier ce qui vous prend le plus de temps entre les appels ratés, les relances et le suivi clientèle, et voir si une automatisation vaut le coup pour votre salon.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Restaurants", href: "/fr/automatisation-restaurant" },
    { label: "Salles de sport & instituts bien-être", href: "/fr/automatisation-salle-de-sport" },
    { label: "Marques de cosmétique & parfumerie", href: "/fr/automatisation-marque-cosmetique" },
  ],
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "HAIR SALONS",
  h1: "A salon that never misses a call means clients who never hang up",
  intro:
    "Answering during a service, following up a client at the right time, finding the color formula, tracking gift cards: these are tasks that happen between two clients — which is rarely the right timing. We automate them — you stay the hairdresser or salon that decides, approves and welcomes. We detect, prepare, propose — we never commit on your behalf.",
  painTitle: "What slips through between two services",
  painIntro:
    "In a salon booked back to back, these tasks don't happen systematically — not for lack of care, for lack of time between two clients.",
  painPoints: [
    {
      title: "A missed call during a service is a lost appointment",
      description: "With no one free to answer, the call goes unanswered — the client books elsewhere.",
    },
    {
      title: "Follow-up happens at random, not at the right point in the cycle",
      description:
        "Without structured tracking, the ~6-week follow-up (the usual rhythm between two cuts or colors) relies on memory, or doesn't happen at all.",
    },
    {
      title: "The color formula gets reconstructed every time",
      description: "Without a centralized file, the technical formula depends on a paper notebook or the team's memory.",
    },
    {
      title: "An unconfirmed slot stays blocked for nothing",
      description: "Without an automatic reminder, an appointment the client doesn't show up for blocks a slot that could have been rebooked.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "We pick 3-5 automations based on your profile (independent salon or several hairdressers, with or without booking software) — never all at once.",
  automations: [
    {
      code: "W-COIF-01",
      title: "AI phone booking assistant",
      description:
        "Answers when no one at the salon can pick up — mid-service or outside opening hours — proposes an available slot, or an alternative if the schedule is full, and confirms by SMS. The schedule stays yours: you check and edit it anytime, the AI only fills the slots you've opened.",
    },
    {
      code: "W-COIF-02",
      title: "WhatsApp follow-up and reminders",
      description:
        "Connects your client base to WhatsApp Business for a reminder before each appointment and a personalized follow-up at the cycle's due date (~6 weeks), with a targeted loyalty discount if relevant. Campaigns require the client's prior consent (opt-in), per WhatsApp Business API rules — we never bypass that requirement. You approve every booking that results from it.",
    },
    {
      code: "W-COIF-03",
      title: "Client file and color formula",
      description:
        "Centralizes and recalls the technical formula used for each client, available before the next appointment. You approve and adjust the formula at every service; the automation never makes a technical decision on your behalf.",
    },
    {
      code: "W-COIF-04",
      title: "Gift card tracking",
      description:
        "Tracks the issuance, use and expiry date of each gift card, and prepares a reminder if a card nears expiry without being used. You keep control of every reminder sent.",
    },
    {
      code: "W-COIF-05",
      title: "No-show prevention",
      description:
        "Requests confirmation before the appointment and alerts if there's no reply, so the slot can be freed up in time and offered to another client instead of being lost at the last minute.",
    },
  ],
  geoTitle: "Anywhere in France",
  geoText:
    "The offer is open to any independent hair salon in France, whatever its format (solo salon, several hairdressers, color or cut specialist). The 30-minute diagnostic identifies the specific tasks costing you the most time, whatever your region.",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, systematic and with no commitment. Quick Win from €2,000 excl. VAT for a first automation (the AI phone assistant, for instance) delivered in 2-3 weeks, or Standard from €4,000 excl. VAT + a 30% performance fee on measured ROI (capped at 2x the build price) to combine several automations. You keep ownership of your stack.",
  pricingNote: "No numeric result is promised: NBHC has no hair salon client reference to date.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "Does the AI phone assistant fully replace answering the phone?",
      answer:
        "No. It steps in when no one can pick up — mid-service or outside opening hours. You keep control of the schedule at all times and can take over the call if needed.",
    },
    {
      question: "Can I message my whole client base on WhatsApp without prior consent?",
      answer:
        "No — the WhatsApp Business API requires the client's prior consent (opt-in) for campaigns. We follow that rule strictly; the automation never bypasses this requirement.",
    },
    {
      question: "Does this work with my current booking software?",
      answer: "We connect to the tool you already use when possible — the goal is to complete your setup, not make you switch.",
    },
  ],
  ctaText:
    "30 minutes to identify what's taking up the most of your time between missed calls, follow-ups and client tracking, and see whether automation is worth it for your salon.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Restaurants", href: "/en/automatisation-restaurant" },
    { label: "Gyms & wellness centers", href: "/en/automatisation-salle-de-sport" },
    { label: "Cosmetics & fragrance brands", href: "/en/automatisation-marque-cosmetique" },
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
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-salon-de-coiffure`;

  const t = await getTranslations({ locale, namespace: "automationFlows.salonCoiffure" });

  const content: SectorContent = {
    ...baseContent,
    automations: baseContent.automations.map((a) => {
      if (a.code === "W-COIF-01") {
        const callBooking = t.raw("callBooking") as CallBookingMockupContent;
        return {
          ...a,
          customFlow: <CallBookingMockup ariaLabel={a.title} content={callBooking} />,
        };
      }
      if (a.code === "W-COIF-02") {
        const chat = t.raw("relanceChat") as {
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
                ? "1 automatisation ciblée pour salon de coiffure, livrée en 2-3 semaines"
                : "1 targeted automation for hair salons, delivered in 2-3 weeks",
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
            { name: isFr ? "Salons de coiffure" : "Hair salons", url: pageUrl },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
