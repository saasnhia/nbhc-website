import { setRequestLocale, getTranslations } from "next-intl/server";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { zipFlowSteps, type FlowStepKind } from "../../../components/AutomationFlow";
import DocMockup, { type DocMockupContent } from "../../../components/DocMockup";
import StockTableMockup, { type StockTableMockupContent } from "../../../components/StockTableMockup";

const FLOW_KINDS: Record<string, FlowStepKind[]> = {
  "W-LUXE-03": ["trigger", "process", "action", "validation"],
  "W-LUXE-04": ["trigger", "process", "action", "validation"],
  "W-LUXE-05": ["trigger", "process", "action", "validation"],
};
const FLOW_MSG_KEY: Record<string, string> = {
  "W-LUXE-03": "avisMultiplateformes",
  "W-LUXE-04": "echantillonsInfluenceurs",
  "W-LUXE-05": "commandesB2B",
};

const contentFr: SectorContent = {
  eyebrow: "MARQUES DE COSMÉTIQUE & PARFUMERIE",
  h1: "Le dossier réglementaire qui traîne, ce n'est plus un lancement qui attend",
  intro:
    "Préparer un dossier CPNP à chaque nouvelle référence, garder le stock synchronisé entre boutiques et e-shop, suivre les avis sur plusieurs plateformes, gérer les échantillons envoyés aux créateurs de contenu : ce sont des tâches opérationnelles répétitives, qui n'ont rien à voir avec la création ou la stratégie de marque. On les automatise — vous restez la marque qui décide, valide et déclare. On détecte, on prépare, on propose — jamais on ne déclare ou ne facture à votre place.",
  painTitle: "Ce qui ralentit une marque entre deux lancements",
  painIntro:
    "Sur une marque qui gère plusieurs canaux (boutiques, e-shop, revendeurs), ces tâches ne se font pas systématiquement sans un outil dédié — pas par manque de rigueur, par manque de temps.",
  painPoints: [
    {
      title: "Le dossier réglementaire se prépare dans l'urgence à chaque référence",
      description: "Sans processus dédié, la préparation du dossier CPNP/DIP (formule INCI, allergènes, allégations) ralentit chaque nouveau lancement.",
    },
    {
      title: "Le stock se désynchronise entre les canaux",
      description: "Sans mise à jour continue, une vente en boutique n'est pas toujours répercutée sur l'e-shop — rupture en ligne malgré du stock ailleurs, ou l'inverse.",
    },
    {
      title: "Les avis se dispersent sur plusieurs plateformes",
      description: "Sans suivi centralisé, une tendance qui se dessine dans les avis (positive ou négative) passe inaperçue plus longtemps qu'elle ne le devrait.",
    },
    {
      title: "Le suivi des échantillons et des commandes B2B se fait sur tableur",
      description: "Sans outil dédié, les relances aux créateurs de contenu et les commandes des revendeurs s'accumulent en parallèle du e-commerce, au fil de l'eau.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "On choisit 3 à 5 automatisations selon votre profil (marque mono-canal ou multi-canal, avec ou sans réseau de revendeurs) — jamais l'ensemble d'un coup. Cette page est générique : elle ne repose sur aucune référence client nominative.",
  automations: [
    {
      code: "W-LUXE-01",
      title: "Dossier réglementaire cosmétique préparé (CPNP/DIP)",
      description:
        "Pour chaque nouvelle référence, l'IA lit la formule INCI, identifie les allergènes à déclarer et vérifie les allégations par rapport au dossier existant, puis prépare un dossier PDF prêt. Le dossier est validé et déclaré par votre toxicologue ou responsable conformité — jamais par NBHC, qui n'est ni évaluateur de sécurité ni organisme déclarant.",
    },
    {
      code: "W-LUXE-02",
      title: "Synchro stock boutiques/e-shop",
      description:
        "Chaque vente, en boutique ou sur l'e-shop, met à jour un stock global partagé, avec un réassort déclenché automatiquement sous un seuil que vous définissez. Vous validez chaque commande de réassort ; l'automatisation ne passe jamais commande à votre place.",
    },
    {
      code: "W-LUXE-03",
      title: "Synthèse des avis clients multi-plateformes",
      description:
        "Centralise les avis publiés sur vos différents canaux (Google, revendeurs, site propre) et prépare une synthèse des points récurrents, positifs et négatifs. Vous décidez des actions à mener ; l'automatisation ne répond jamais à un avis à votre place.",
    },
    {
      code: "W-LUXE-04",
      title: "Suivi des échantillons envoyés aux influenceurs",
      description:
        "Suit chaque envoi d'échantillon à un créateur de contenu et prépare une relance si le retour attendu (post, story) n'arrive pas dans le délai convenu. Votre équipe valide et envoie chaque relance.",
    },
    {
      code: "W-LUXE-05",
      title: "Commandes B2B revendeurs",
      description:
        "Centralise les commandes reçues de vos revendeurs, vérifie le stock disponible et prépare un bon de commande ou une facture proforma. Vous validez avant tout envoi au revendeur.",
    },
  ],
  geoTitle: "Partout en France",
  geoText:
    "L'offre s'adresse à toute marque de cosmétique ou de parfumerie en France, quel que soit son canal de distribution (boutiques en propre, e-shop, réseau de revendeurs, ou une combinaison des trois). Le diagnostic de 30 minutes permet d'identifier les tâches précises qui vous coûtent le plus de temps.",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, systématique et sans engagement. Le dossier réglementaire, par exemple, démarre à 200 € HT — une automatisation standardisée, configurée pour votre marque.",
  pricingNote: "Aucun résultat chiffré n'est promis : NBHC n'a aucune référence client dans le secteur cosmétique/parfumerie à ce jour.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Est-ce que NBHC déclare le dossier CPNP à ma place ?",
      answer:
        "Non. NBHC prépare le dossier (lecture de formule, identification des allergènes, vérification des allégations) ; la validation et la déclaration restent celles de votre toxicologue ou responsable conformité. NBHC n'est ni évaluateur de sécurité cosmétique ni organisme déclarant.",
    },
    {
      question: "Est-ce que l'automatisation passe commande de réassort toute seule ?",
      answer:
        "Non. Elle détecte qu'un seuil de stock est atteint et prépare la commande de réassort ; c'est vous qui validez et déclenchez chaque commande.",
    },
    {
      question: "Ça marche avec mon outil de gestion de stock ou mon CMS e-commerce actuel ?",
      answer: "On se connecte aux outils que vous utilisez déjà quand c'est possible — l'objectif est de compléter votre organisation, pas de vous en faire changer.",
    },
  ],
  ctaText:
    "30 minutes pour identifier ce qui vous prend le plus de temps entre la conformité réglementaire, la synchronisation du stock et le suivi des revendeurs, et voir si une automatisation vaut le coup pour votre marque.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Salons de coiffure", href: "/fr/automatisation-salon-de-coiffure" },
    { label: "Officines de pharmacie", href: "/fr/automatisation-pharmacie" },
    { label: "Salles de sport & instituts bien-être", href: "/fr/automatisation-salle-de-sport" },
  ],
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "COSMETICS & FRAGRANCE BRANDS",
  h1: "A lagging regulatory file shouldn't mean a launch left waiting",
  intro:
    "Preparing a CPNP file for every new reference, keeping stock in sync between stores and your e-shop, tracking reviews across platforms, managing samples sent to content creators: these are repetitive operational tasks that have nothing to do with creating or steering the brand. We automate them — you stay the brand that decides, validates and files. We detect, prepare, propose — we never file or bill on your behalf.",
  painTitle: "What slows a brand down between two launches",
  painIntro:
    "For a brand running several channels (stores, e-shop, resellers), these tasks don't happen systematically without a dedicated tool — not for lack of rigor, for lack of time.",
  painPoints: [
    {
      title: "The regulatory file gets prepared under pressure for every reference",
      description: "Without a dedicated process, preparing the CPNP/PIF file (INCI formula, allergens, claims) slows down every new launch.",
    },
    {
      title: "Stock drifts out of sync across channels",
      description: "Without continuous updates, an in-store sale isn't always reflected on the e-shop — an online shortage despite stock elsewhere, or the reverse.",
    },
    {
      title: "Reviews scatter across several platforms",
      description: "Without centralized tracking, a trend forming in reviews (positive or negative) goes unnoticed longer than it should.",
    },
    {
      title: "Sample tracking and B2B orders live in a spreadsheet",
      description: "Without a dedicated tool, follow-ups with content creators and reseller orders pile up alongside e-commerce, handled as they come.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "We pick 3-5 automations based on your profile (single-channel or multi-channel brand, with or without a reseller network) — never all at once. This page is generic: it relies on no named client reference.",
  automations: [
    {
      code: "W-LUXE-01",
      title: "Cosmetic regulatory file prepared (CPNP/PIF)",
      description:
        "For every new reference, the AI reads the INCI formula, identifies allergens to declare and checks claims against the existing file, then prepares a ready PDF file. The file is validated and filed by your toxicologist or compliance lead — never by NBHC, which is neither a cosmetic safety assessor nor a filing body.",
    },
    {
      code: "W-LUXE-02",
      title: "Multi-store/e-shop stock sync",
      description:
        "Every sale, in-store or on the e-shop, updates a shared global stock, with restocking triggered automatically below a threshold you define. You approve every restock order; the automation never places an order on your behalf.",
    },
    {
      code: "W-LUXE-03",
      title: "Multi-platform review summary",
      description:
        "Centralizes reviews published across your channels (Google, resellers, own site) and prepares a summary of recurring points, positive and negative. You decide on the actions to take; the automation never replies to a review on your behalf.",
    },
    {
      code: "W-LUXE-04",
      title: "Influencer sample tracking",
      description:
        "Tracks every sample sent to a content creator and prepares a follow-up if the expected return (post, story) doesn't arrive within the agreed timeframe. Your team approves and sends every follow-up.",
    },
    {
      code: "W-LUXE-05",
      title: "B2B reseller orders",
      description:
        "Centralizes orders received from your resellers, checks available stock and prepares a purchase order or proforma invoice. You approve before anything is sent to the reseller.",
    },
  ],
  geoTitle: "Anywhere in France",
  geoText:
    "The offer is open to any cosmetics or fragrance brand in France, whatever its distribution channel (own stores, e-shop, reseller network, or a mix of the three). The 30-minute diagnostic identifies the specific tasks costing you the most time.",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, systematic and with no commitment. The regulatory file, for instance, starts at €200 excl. VAT — a standardized automation, configured for your brand.",
  pricingNote: "No numeric result is promised: NBHC has no client reference in the cosmetics/fragrance sector to date.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "Does NBHC file the CPNP dossier on my behalf?",
      answer:
        "No. NBHC prepares the file (formula reading, allergen identification, claim checking); validation and filing remain your toxicologist's or compliance lead's. NBHC is neither a cosmetic safety assessor nor a filing body.",
    },
    {
      question: "Does the automation place restock orders on its own?",
      answer: "No. It detects that a stock threshold has been reached and prepares the restock order; you approve and trigger every order.",
    },
    {
      question: "Does this work with my current stock management tool or e-commerce CMS?",
      answer: "We connect to the tools you already use when possible — the goal is to complete your setup, not make you switch.",
    },
  ],
  ctaText:
    "30 minutes to identify what's taking up the most of your time between regulatory compliance, stock sync and reseller tracking, and see whether automation is worth it for your brand.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Hair salons", href: "/en/automatisation-salon-de-coiffure" },
    { label: "Pharmacies", href: "/en/automatisation-pharmacie" },
    { label: "Gyms & wellness centers", href: "/en/automatisation-salle-de-sport" },
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
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-marque-cosmetique`;

  const t = await getTranslations({ locale, namespace: "automationFlows.marqueCosmetique" });

  const content: SectorContent = {
    ...baseContent,
    automations: baseContent.automations.map((a) => {
      if (a.code === "W-LUXE-01") {
        const doc = t.raw("docMockup") as DocMockupContent;
        return {
          ...a,
          customFlow: <DocMockup ariaLabel={a.title} content={doc} />,
        };
      }
      if (a.code === "W-LUXE-02") {
        const stock = t.raw("stockTable") as StockTableMockupContent;
        return {
          ...a,
          customFlow: <StockTableMockup ariaLabel={a.title} content={stock} />,
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
              name: "Essentiel",
              price: "200",
              description: isFr
                ? "Automatisation standardisée pour marque de cosmétique, configurée pour votre activité"
                : "Standardized automation for cosmetics brands, configured for your business",
              url: pageUrl,
            },
          ]),
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: `https://nbhc.fr/${locale}` },
            { name: isFr ? "Marques de cosmétique & parfumerie" : "Cosmetics & fragrance brands", url: pageUrl },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
