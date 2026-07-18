import { setRequestLocale, getTranslations } from "next-intl/server";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { zipFlowSteps, type FlowStepKind } from "../../../components/AutomationFlow";
import ChatMockup, { type ChatBubbleData } from "../../../components/ChatMockup";
import DocMockup, { type DocMockupContent } from "../../../components/DocMockup";

const FLOW_KINDS: Record<string, FlowStepKind[]> = {
  "W-BTP-03": ["trigger", "process", "validation", "action"],
  "W-BTP-04": ["trigger", "process", "action"],
};
const FLOW_MSG_KEY: Record<string, string> = {
  "W-BTP-03": "w0103",
  "W-BTP-04": "w0104",
};

const contentFr: SectorContent = {
  eyebrow: "ARTISANS · TPE DU BÂTIMENT",
  h1: "Le soir, vous devriez être chez vous — pas sur vos devis",
  intro:
    "Plombier, électricien, peintre, menuisier : le temps passé sur les devis, les relances et la facturation est du temps non facturé, souvent pris le soir ou le week-end. On automatise ces tâches précises pour que votre temps aille au chantier, pas à la paperasse.",
  painTitle: "Ce qui grignote la rentabilité d'un artisan",
  painIntro:
    "Ce n'est pas le métier qui prend du temps en trop — c'est tout ce qui l'entoure : rédiger un devis conforme, relancer un client qui ne répond pas, courir après une facture impayée.",
  painPoints: [
    {
      title: "Les devis rédigés à la main, le soir",
      description:
        "Détailler chaque prestation, calculer les matériaux, appliquer les marges, vérifier les mentions légales obligatoires — un travail fastidieux qui s'ajoute à une journée déjà pleine de chantiers.",
    },
    {
      title: "Les relances de devis jamais faites",
      description:
        "Un devis envoyé et jamais relancé a beaucoup moins de chances d'être signé qu'un devis suivi au bon moment — mais qui a le temps de relancer entre deux chantiers ?",
    },
    {
      title: "Les factures qui traînent",
      description:
        "Sans relance systématique, un impayé se découvre souvent trop tard — une fois que la trésorerie du mois est déjà sous tension.",
    },
    {
      title: "La communication client fragmentée",
      description:
        "Un client qui contacte par mail, puis WhatsApp, puis SMS, puis rappelle pour ajouter un détail : sans un point central, on finit par perdre le fil de qui a dit quoi.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "On choisit 2 à 3 automatisations selon votre activité et vos outils actuels — jamais un système complexe qui vous ferait perdre plus de temps qu'il n'en fait gagner.",
  automations: [
    {
      code: "W-BTP-01",
      title: "Génération de devis assistée par IA",
      description:
        "Vous décrivez la prestation en langage naturel (type d'intervention, matériaux, contexte), l'automatisation prépare un devis structuré avec les mentions légales obligatoires (SIRET, TVA, conditions de paiement, pénalités de retard). Vous ajustez et validez avant envoi.",
    },
    {
      code: "W-BTP-02",
      title: "Relance automatique des devis non signés",
      description:
        "Séquence de relance à J+3, J+7 et J+14 avec un message adapté à la nature des travaux. Vous validez le modèle une fois, les relances partent ensuite sans intervention de votre part.",
    },
    {
      code: "W-BTP-03",
      title: "Facturation et relance des impayés",
      description:
        "Génération automatique des factures après validation de l'intervention, suivi des paiements, relance à J+15 et J+30 avec un brouillon que vous validez avant envoi — pour détecter un impayé tôt, pas une fois la trésorerie sous tension.",
    },
    {
      code: "W-BTP-04",
      title: "Centralisation de la communication client",
      description:
        "Regroupement des échanges client (mail, SMS, WhatsApp) par dossier, pour ne plus avoir à chercher sur quel canal une information a été donnée.",
    },
  ],
  geoTitle: "Une offre nationale",
  geoText:
    "Le catalogue BTP s'adresse aux artisans et TPE du bâtiment partout en France — plomberie, électricité, peinture, menuiserie, maçonnerie et métiers connexes. Le diagnostic de 30 minutes permet d'identifier les tâches précises qui vous coûtent le plus de temps, quel que soit votre secteur géographique.",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, systématique et sans engagement. Les devis, par exemple, démarrent à 2 000 € HT — une automatisation sur mesure, configurée pour votre activité.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Les devis générés sont-ils vraiment conformes à la loi française ?",
      answer:
        "Le modèle intègre les mentions obligatoires (identification de l'entreprise, détail des prestations, TVA, conditions de paiement, pénalités de retard). Vous restez responsable de la validation finale de chaque devis avant envoi.",
    },
    {
      question: "Je suis tout seul dans mon entreprise, j'ai le temps de gérer ça en plus ?",
      answer:
        "L'automatisation est justement pensée pour libérer du temps, pas en prendre. Une fois configurée, elle tourne seule — vous validez simplement les cas particuliers.",
    },
    {
      question: "Ça remplace mon logiciel de facturation actuel ?",
      answer:
        "Non, on se connecte à ce que vous utilisez déjà quand c'est possible. L'objectif est de compléter votre organisation, pas de tout changer.",
    },
  ],
  ctaText:
    "30 minutes pour identifier ce qui vous prend le plus de temps entre les devis, les relances et la facturation, et voir si une automatisation vaut le coup pour vous.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Salles de sport & instituts bien-être", href: "/fr/automatisation-salle-de-sport" },
    { label: "Associations sportives (loi 1901)", href: "/fr/automatisation-association-sportive" },
    { label: "Garages et carrosseries", href: "/fr/automatisation-garage-automobile" },
  ],
  relatedArticle: {
    label: "Lire : Devis automatique par IA, le guide complet pour artisans",
    href: "/fr/blog/devis-automatique-artisans",
  },
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "TRADESPEOPLE · CONSTRUCTION SMES",
  h1: "Your evenings should be yours — not spent on quotes",
  intro:
    "Plumber, electrician, painter, carpenter: time spent on quotes, follow-ups and invoicing is unbilled time, often done in the evening or on weekends. We automate these specific tasks so your time goes to the job site, not the paperwork.",
  painTitle: "What eats into a tradesperson's profitability",
  painIntro:
    "It's not the trade itself that takes too much time — it's everything around it: drafting a compliant quote, following up with an unresponsive client, chasing an unpaid invoice.",
  painPoints: [
    {
      title: "Quotes handwritten in the evening",
      description:
        "Detailing each service, calculating materials, applying margins, checking mandatory legal notices — tedious work added to an already full day of job sites.",
    },
    {
      title: "Quote follow-ups that never happen",
      description:
        "A quote sent and never followed up has much lower odds of being signed than one followed up at the right time — but who has time to follow up between two job sites?",
    },
    {
      title: "Invoices that drag on",
      description:
        "Without systematic follow-up, an unpaid invoice is often discovered too late — once the month's cash flow is already under pressure.",
    },
    {
      title: "Fragmented client communication",
      description:
        "A client who contacts you by email, then WhatsApp, then text, then calls to add a detail: without a central point, you end up losing track of who said what.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "We pick 2-3 automations based on your trade and current tools — never a complex system that would cost you more time than it saves.",
  automations: [
    {
      code: "W-BTP-01",
      title: "AI-assisted quote generation",
      description:
        "You describe the job in plain language (type of work, materials, context), the automation drafts a structured quote with mandatory legal notices (business registration, VAT, payment terms, late penalties). You adjust and approve before sending.",
    },
    {
      code: "W-BTP-02",
      title: "Automatic follow-up on unsigned quotes",
      description:
        "Follow-up sequence at day 3, 7 and 14 with a message adapted to the type of work. You approve the template once, follow-ups then go out without further action from you.",
    },
    {
      code: "W-BTP-03",
      title: "Invoicing and unpaid invoice follow-up",
      description:
        "Automatic invoice generation after job validation, payment tracking, follow-up at day 15 and 30 with a draft you approve before sending — to catch an unpaid invoice early, not once cash flow is already tight.",
    },
    {
      code: "W-BTP-04",
      title: "Centralized client communication",
      description:
        "Client exchanges (email, SMS, WhatsApp) grouped by job file, so you never have to search which channel a piece of information came through.",
    },
  ],
  geoTitle: "A nationwide offer",
  geoText:
    "The construction catalog is open to tradespeople and construction SMEs anywhere in France — plumbing, electrical, painting, carpentry, masonry and related trades. The 30-minute diagnostic identifies the specific tasks costing you the most time, whatever your region.",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, systematic and with no commitment. Quotes, for instance, start at €2,000 excl. VAT — a custom automation, configured for your business.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "Are the generated quotes really compliant with French law?",
      answer:
        "The template includes mandatory notices (business identification, service details, VAT, payment terms, late penalties). You remain responsible for the final approval of each quote before sending.",
    },
    {
      question: "I run my business alone, do I have time to manage this too?",
      answer:
        "Automation is designed precisely to free up time, not take more. Once configured, it runs on its own — you simply approve edge cases.",
    },
    {
      question: "Does this replace my current invoicing software?",
      answer:
        "No, we connect to what you already use whenever possible. The goal is to complete your setup, not overhaul it.",
    },
  ],
  ctaText:
    "30 minutes to identify what's taking up the most of your time between quotes, follow-ups and invoicing, and see whether automation is worth it for you.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Gyms & wellness centers", href: "/en/automatisation-salle-de-sport" },
    { label: "Sports associations (non-profit)", href: "/en/automatisation-association-sportive" },
    { label: "Garages and auto body shops", href: "/en/automatisation-garage-automobile" },
  ],
  relatedArticle: {
    label: "Read: AI quote automation, the complete guide for tradespeople",
    href: "/fr/blog/devis-automatique-artisans",
  },
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
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-artisan-btp`;

  const t = await getTranslations({ locale, namespace: "automationFlows.btp" });
  const content: SectorContent = {
    ...baseContent,
    automations: baseContent.automations.map((a) => {
      if (a.code === "W-BTP-01") {
        const doc = t.raw("docMockup") as DocMockupContent;
        return {
          ...a,
          customFlow: <DocMockup ariaLabel={a.title} content={doc} />,
        };
      }
      if (a.code === "W-BTP-02") {
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
              name: "Sur Mesure Léger",
              price: "2000",
              description: isFr
                ? "Automatisation sur mesure pour artisan ou TPE du bâtiment, configurée pour votre activité"
                : "Custom automation for tradespeople or construction SMEs, configured for your business",
              url: pageUrl,
            },
          ]),
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: `https://nbhc.fr/${locale}` },
            {
              name: isFr ? "Artisans & BTP" : "Tradespeople & construction",
              url: pageUrl,
            },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
