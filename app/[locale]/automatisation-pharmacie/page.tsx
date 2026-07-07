import { setRequestLocale, getTranslations } from "next-intl/server";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { zipFlowSteps, type FlowStepKind } from "../../../components/AutomationFlow";

const FLOW_KINDS: Record<string, FlowStepKind[]> = {
  "W-PH-01": ["trigger", "process", "action", "validation"],
  "W-PH-04": ["trigger", "process", "action", "validation"],
  "W-PH-03": ["trigger", "process", "action", "validation"],
  "W-PH-06": ["trigger", "process", "action", "validation"],
  "W-PH-05": ["trigger", "process", "action", "validation"],
};
const FLOW_MSG_KEY: Record<string, string> = {
  "W-PH-01": "wph01",
  "W-PH-04": "wph04",
  "W-PH-03": "wph03",
  "W-PH-06": "wph06",
  "W-PH-05": "wph05",
};

const contentFr: SectorContent = {
  eyebrow: "OFFICINES DE PHARMACIE",
  h1: "Le back-office qui vous fait perdre du temps, pas les patients",
  intro:
    "Détecter les patients éligibles au Bilan Partagé de Médication, relancer un rejet de tiers-payant, préparer une inspection qualité : ce sont des tâches de fond, répétitives, qui n'ont rien à voir avec le conseil au comptoir. On les automatise — vous restez le pharmacien qui décide, mène l'entretien et facture. NBHC n'est ni professionnel de santé ni éditeur de logiciel agréé Assurance Maladie : on détecte, on prépare, on rappelle — jamais on ne soumet ou ne facture à votre place.",
  painTitle: "Ce qui pèse sur le back-office d'une officine",
  painIntro:
    "Sur une patientèle de plusieurs milliers de patients actifs, ces tâches ne se font pas systématiquement sans un outil dédié — pas par manque de compétence, par manque de temps.",
  painPoints: [
    {
      title: "La détection des patients éligibles reste manuelle",
      description:
        "Sans outil dédié, identifier qui est éligible au Bilan Partagé de Médication ou à un entretien pharmaceutique dépend de la mémoire ou de la vigilance ponctuelle de l'équipe.",
    },
    {
      title: "Une rupture découverte au comptoir, c'est un patient qui hésite à revenir",
      description:
        "Sans anticipation, le patient découvre l'absence de son traitement sur place — une occasion de proposer une alternative en amont qui se perd.",
    },
    {
      title: "Les rejets de tiers-payant s'accumulent",
      description:
        "Un rejet Noémie ou mutuelle non contesté à temps est une perte de trésorerie sèche ; le tri manuel des motifs prend du temps à une équipe déjà chargée.",
    },
    {
      title: "La préparation d'une inspection qualité se fait dans l'urgence",
      description:
        "Registre de température, traçabilité, rondes qualité : une charge de compilation documentaire récurrente, comparable à la préparation d'un audit Qualiopi pour un organisme de formation.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "On choisit 3 à 5 automatisations selon votre profil (titulaire seul, plusieurs pharmaciens, groupement) — jamais l'ensemble d'un coup.",
  automations: [
    {
      code: "W-PH-01",
      title: "Détection des patients potentiellement éligibles au BPM",
      description:
        "Identifie dans la base patients les profils correspondant aux critères d'éligibilité du Bilan Partagé de Médication (65 ans et plus, au moins 5 molécules remboursées en cours), pour vous aider à cibler qui solliciter. Le patient doit donner son consentement écrit via le formulaire d'adhésion officiel avant tout entretien — l'automatisation ne peut ni présumer ni obtenir ce consentement à votre place. Vous menez l'entretien ; la facturation à l'Assurance Maladie se fait via votre propre logiciel agréé, sous votre carte de professionnel de santé.",
    },
    {
      code: "W-PH-04",
      title: "Suivi des entretiens pharmaceutiques (AVK, AOD, asthme)",
      description:
        "Identifie les patients potentiellement concernés par un entretien pharmaceutique selon leur traitement en cours, et prépare les rappels d'échéance annuelle avec une fiche de préparation pré-remplie. Consentement écrit du patient requis avant tout entretien facturé ; vous menez l'entretien et facturez via votre propre système.",
    },
    {
      code: "W-PH-03",
      title: "Alerte sur les ruptures d'approvisionnement détectées",
      description:
        "Croise le stock de l'officine avec les informations de rupture ou tension d'approvisionnement disponibles, pour alerter tôt et préparer une proposition d'alternative. Toute substitution reste une décision pharmaceutique : l'automatisation signale et propose, elle ne substitue et ne communique jamais au patient sans votre validation.",
    },
    {
      code: "W-PH-06",
      title: "Tri des rejets de tiers-payant et préparation des contestations",
      description:
        "Classe automatiquement les retours de rejets (Noémie, mutuelles) par motif probable, et prépare un brouillon de courrier de contestation pour les cas récupérables. Vous validez et envoyez chaque contestation ; l'automatisation ne transmet rien directement aux organismes tiers.",
    },
    {
      code: "W-PH-05",
      title: "Centralisation des preuves qualité pour une inspection",
      description:
        "Centralise en continu les documents de traçabilité déjà produits (relevés de température, rondes qualité, registres) dans un classement consultable avant une inspection ARS ou Ordre. Cette automatisation aide à documenter — elle ne certifie rien : c'est vous qui jugez de la suffisance des preuves.",
    },
  ],
  geoTitle: "Marseille et sa région, et au-delà",
  geoText:
    "NBHC a mené un travail de terrain sur les officines de Marseille et de sa région — une métropole avec une forte densité d'officines et une concurrence qui pousse chaque titulaire à chercher des services différenciants. L'offre s'adresse cependant à toute officine en France, quel que soit son profil (titulaire seul, plusieurs pharmaciens, groupement).",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, systématique et sans engagement. Quick Win à partir de 2 000 € HT pour une première automatisation (la détection BPM, par exemple) livrée en 2-3 semaines, ou Standard à partir de 4 000 € HT + performance fee de 30 % du ROI mesuré (plafonnée à 2× le prix du build) pour combiner plusieurs automatisations. Vous restez propriétaire de votre stack.",
  pricingNote:
    "Les montants d'actes mentionnés ci-dessus (BPM, entretiens pharmaceutiques) sont des barèmes conventionnels publics de l'Assurance Maladie — pas un gain que NBHC produit ou garantit. Aucun résultat chiffré n'est promis : NBHC n'a aucune référence client officine à ce jour.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Est-ce que vous facturez la CPAM à ma place ?",
      answer:
        "Non, et ce n'est techniquement pas possible : seul le pharmacien, authentifié par sa carte de professionnel de santé, peut télétransmettre via un logiciel agréé. NBHC prépare le dossier ; c'est vous qui facturez, via votre propre système.",
    },
    {
      question: "Est-ce que vous accédez au dossier médical de mes patients ?",
      answer:
        "Non. Nos automatisations travaillent sur les données déjà accessibles dans votre propre logiciel officine (LGO). L'accès à Mon Espace Santé ou au Dossier Pharmaceutique reste conditionné au consentement du patient et passe par vos propres outils certifiés — jamais par un accès tiers de notre part.",
    },
    {
      question: "Ça marche avec mon logiciel de gestion officinale actuel ?",
      answer:
        "On se connecte au LGO que vous utilisez déjà quand c'est possible (Winpharma, LGPI, Alliance+, Périphar, Everys...) — l'objectif est de compléter votre organisation, pas de vous en faire changer.",
    },
  ],
  ctaText:
    "30 minutes pour identifier ce qui vous prend le plus de temps entre la détection des patients éligibles, les ruptures et le tiers-payant, et voir si une automatisation vaut le coup pour votre officine.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Organismes de formation", href: "/fr/automatisation-organisme-formation" },
    { label: "Salles de sport & instituts bien-être", href: "/fr/automatisation-salle-de-sport" },
    { label: "Garages et carrosseries", href: "/fr/automatisation-garage-automobile" },
  ],
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "PHARMACIES",
  h1: "The back-office work that wastes your time, not your patients",
  intro:
    "Detecting patients eligible for a shared medication review, following up a third-party payer rejection, preparing a quality inspection: these are recurring background tasks with nothing to do with counter advice. We automate them — you stay the pharmacist who decides, leads the consultation and bills. NBHC is neither a healthcare professional nor an approved health-insurance software vendor: we detect, prepare, remind — we never submit or bill on your behalf.",
  painTitle: "What weighs on a pharmacy's back office",
  painIntro:
    "On a patient base of several thousand active patients, these tasks don't happen systematically without a dedicated tool — not for lack of skill, for lack of time.",
  painPoints: [
    {
      title: "Detecting eligible patients stays manual",
      description:
        "Without a dedicated tool, identifying who's eligible for a shared medication review or a pharmacist consultation depends on memory or occasional team vigilance.",
    },
    {
      title: "A shortage discovered at the counter is a patient who hesitates to come back",
      description:
        "Without anticipation, the patient discovers their treatment is unavailable on the spot — a missed opportunity to propose an alternative in advance.",
    },
    {
      title: "Third-party payer rejections pile up",
      description:
        "An uncontested rejection is a straight cash-flow loss; manually sorting rejection reasons takes time from an already busy team.",
    },
    {
      title: "Quality inspection prep happens under pressure",
      description:
        "Temperature logs, traceability, quality rounds: a recurring documentation burden, comparable to preparing a Qualiopi audit for a training organization.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "We pick 3-5 automations based on your profile (single pharmacist, several pharmacists, group) — never all at once.",
  automations: [
    {
      code: "W-PH-01",
      title: "Detecting patients potentially eligible for a shared medication review",
      description:
        "Identifies patient profiles matching eligibility criteria (65+, at least 5 reimbursed molecules) to help you decide who to reach out to. The patient must give written consent via the official enrollment form before any consultation — the automation cannot assume or obtain that consent on your behalf. You lead the consultation; billing to health insurance goes through your own approved software, under your professional health card.",
    },
    {
      code: "W-PH-04",
      title: "Tracking pharmacist consultations (AVK, DOAC, asthma)",
      description:
        "Identifies patients potentially eligible for a pharmacist consultation based on their current treatment, and prepares annual due-date reminders with a pre-filled preparation sheet. Written patient consent required before any billed consultation; you lead it and bill through your own system.",
    },
    {
      code: "W-PH-03",
      title: "Alerting on detected supply shortages",
      description:
        "Cross-checks pharmacy stock against available shortage or tension information, to alert early and prepare an alternative proposal. Any substitution stays a pharmacist decision: the automation flags and proposes, it never substitutes or communicates to the patient without your approval.",
    },
    {
      code: "W-PH-06",
      title: "Sorting third-party payer rejections and preparing contestations",
      description:
        "Automatically classifies rejection returns by likely reason, and prepares a draft contestation letter for recoverable cases. You approve and send each contestation; the automation never transmits anything directly to third-party organizations.",
    },
    {
      code: "W-PH-05",
      title: "Centralizing quality evidence for an inspection",
      description:
        "Continuously centralizes already-produced traceability documents (temperature logs, quality rounds, registers) into a filing system ready before an ARS or Order inspection. This automation helps document — it certifies nothing: you judge whether the evidence is sufficient.",
    },
  ],
  geoTitle: "Marseille and its region, and beyond",
  geoText:
    "NBHC has done field work with pharmacies in Marseille and its region — a metro area with a high density of pharmacies and competition that pushes every owner to look for differentiating services. The offer is open to any pharmacy in France though, whatever its profile (single pharmacist, several pharmacists, group).",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, systematic and with no commitment. Quick Win from €2,000 excl. VAT for a first automation (BPM detection, for instance) delivered in 2-3 weeks, or Standard from €4,000 excl. VAT + a 30% performance fee on measured ROI (capped at 2x the build price) to combine several automations. You keep ownership of your stack.",
  pricingNote:
    "The act amounts mentioned above (BPM, pharmacist consultations) are public conventional rates from French health insurance — not a gain NBHC produces or guarantees. No numeric result is promised: NBHC has no pharmacy client reference to date.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "Do you bill health insurance on my behalf?",
      answer:
        "No, and it's technically not possible: only the pharmacist, authenticated with their professional health card, can transmit claims through approved software. NBHC prepares the file; you're the one who bills, through your own system.",
    },
    {
      question: "Do you access my patients' medical records?",
      answer:
        "No. Our automations work on data already accessible in your own pharmacy software (LGO). Access to the national health record or pharmaceutical file stays conditioned on patient consent and goes through your own certified tools — never a third-party access from us.",
    },
    {
      question: "Does this work with my current pharmacy management software?",
      answer:
        "We connect to the LGO you already use when possible (Winpharma, LGPI, Alliance+, Périphar, Everys...) — the goal is to complete your setup, not make you switch.",
    },
  ],
  ctaText:
    "30 minutes to identify what's taking up the most of your time between detecting eligible patients, shortages and third-party payer follow-up, and see whether automation is worth it for your pharmacy.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Training organizations", href: "/en/automatisation-organisme-formation" },
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
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-pharmacie`;

  const t = await getTranslations({ locale, namespace: "automationFlows.pharmacie" });
  const content: SectorContent = {
    ...baseContent,
    automations: baseContent.automations.map((a) => {
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
                ? "1 automatisation ciblée pour officine, livrée en 2-3 semaines"
                : "1 targeted automation for pharmacies, delivered in 2-3 weeks",
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
            {
              name: isFr ? "Pharmacies" : "Pharmacies",
              url: pageUrl,
            },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
