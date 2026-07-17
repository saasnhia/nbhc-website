import { setRequestLocale, getTranslations } from "next-intl/server";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { zipFlowSteps, type FlowStepKind } from "../../../components/AutomationFlow";
import DocMockup, { type DocMockupContent } from "../../../components/DocMockup";
import ChecklistMockup, { type ChecklistMockupContent } from "../../../components/ChecklistMockup";

const FLOW_KINDS: Record<string, FlowStepKind[]> = {
  "W-FORMATION-02": ["trigger", "process", "action", "validation"],
  "W-FORMATION-04": ["trigger", "process", "action", "validation"],
};
const FLOW_MSG_KEY: Record<string, string> = {
  "W-FORMATION-02": "w0102",
  "W-FORMATION-04": "w0104",
};

const contentFr: SectorContent = {
  eyebrow: "ORGANISMES DE FORMATION · FORMATEURS INDÉPENDANTS · CFA",
  h1: "Moins de temps sur la paperasse Qualiopi, plus de temps sur la pédagogie",
  intro:
    "Émargements à archiver, dossiers OPCO à relancer, convocations à envoyer, preuves à rassembler avant l'audit Qualiopi : la charge administrative d'un organisme de formation ne vient pas du métier, elle vient de tout ce qui l'entoure. On automatise ces tâches précises — vous restez la personne qui décide, qui valide et qui facture.",
  painTitle: "Ce qui pèse sur un organisme de formation",
  painIntro:
    "Que vous soyez formateur indépendant, organisme généraliste ou CFA, les obligations administratives sont les mêmes pour tous — seul le volume change.",
  painPoints: [
    {
      title: "Les dossiers OPCO bloquent sur des pièces manquantes",
      description:
        "Chaque pièce manquante remet le compteur de traitement à zéro (10 à 30 jours ouvrés selon l'OPCO), et le règlement intervient 2 à 4 semaines après validation du dossier. La charge de relance retombe sur vous.",
    },
    {
      title: "L'émargement papier ou mal archivé est fragile",
      description:
        "Signature obligatoire par demi-journée, archivage 6 ans, vérifiable par les financeurs — une irrégularité peut faire rejeter tout un dossier de financement.",
    },
    {
      title: "La préparation d'un audit Qualiopi devient chronophage",
      description:
        "Plus le volume de sessions augmente, plus on passe de temps à reconstituer les preuves à la main — indicateur par indicateur — qu'à former.",
    },
    {
      title: "La convocation stagiaire est une obligation méconnue",
      description:
        "Un envoi individuel avec des mentions précises est requis pour chaque participant — la simple confirmation d'inscription ne suffit pas légalement.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "On choisit 3 à 4 automatisations selon votre volume et votre profil (indépendant, organisme généraliste, CFA) — jamais un système qui demande plus de gestion qu'il n'en économise.",
  automations: [
    {
      code: "W-FORMATION-07",
      title: "Centralisation des preuves pour l'audit Qualiopi",
      description:
        "Chaque document déjà produit (émargement, questionnaire de satisfaction, attestation) est classé automatiquement dans le dossier correspondant à l'indicateur Qualiopi concerné, avec un tableau de bord des indicateurs incomplets. Cette automatisation aide à documenter — elle n'audite pas et ne garantit aucune conformité : c'est vous (ou votre référent qualité) qui jugez de la suffisance des preuves, l'auditeur tranche in fine.",
    },
    {
      code: "W-FORMATION-02",
      title: "Suivi et relance des dossiers de financement OPCO",
      description:
        "Suivi de chaque dossier (programme, convention, devis, émargement) avec relance automatique en cas de pièce manquante ou de délai anormalement long. Vous validez le modèle de relance une fois ; la relation avec l'OPCO reste pilotée par vous.",
    },
    {
      code: "W-FORMATION-03",
      title: "Génération, envoi et archivage des feuilles d'émargement",
      description:
        "La feuille d'émargement conforme est générée pour chaque session, mise à disposition pour signature, puis archivée automatiquement pendant la durée légale de 6 ans, classée par dossier stagiaire ou financeur.",
    },
    {
      code: "W-FORMATION-04",
      title: "Envoi automatique des convocations stagiaires",
      description:
        "Dès l'inscription confirmée, la convocation est générée avec toutes les mentions obligatoires et envoyée au moins 2 semaines avant la session. Le modèle est validé par vous une fois ; en cas de session modifiée en urgence, l'automatisation vous alerte plutôt que d'envoyer automatiquement.",
    },
  ],
  geoTitle: "Une offre nationale, adaptée à votre profil",
  geoText:
    "Ce catalogue s'adresse aux organismes de formation partout en France, quel que soit le profil : formateur indépendant, organisme généraliste ou centre de formation d'apprentis (CFA). On se connecte à l'outil métier que vous utilisez déjà (Digiforma, Dendreo, Ypareo ou autre) plutôt que d'en proposer un nouveau — l'automatisation complète votre organisation actuelle, elle ne la remplace pas. Le diagnostic de 30 minutes permet d'identifier les tâches précises qui vous coûtent le plus de temps.",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, systématique et sans engagement. La centralisation des preuves pour l'audit Qualiopi, par exemple, démarre à 2 000 € HT — une automatisation sur mesure, avec intégration à votre outil métier existant quand une API ou un export est disponible.",
  pricingNote:
    "Point d'attention : le bilan pédagogique et financier (BPF) est une échéance annuelle obligatoire pour tout organisme avec un numéro de déclaration d'activité — deux BPF manquants consécutifs entraînent la caducité automatique de ce numéro. Ce n'est pas une automatisation à part sur cette page, mais un rappel d'échéance que nous pouvons intégrer selon votre diagnostic.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Est-ce que ça garantit ma certification Qualiopi ?",
      answer:
        "Non. NBHC n'est ni organisme certificateur ni cabinet de conseil Qualiopi. Nos automatisations aident à documenter, tracer et relancer — la conformité relève de l'audit et de la décision de l'auditeur, pas d'un outil.",
    },
    {
      question: "Est-ce que vous soumettez des dossiers à ma place sur EDOF ?",
      answer:
        "Non. EDOF est un portail sensible (anti-fraude CPF). Notre rôle se limite au suivi interne du statut des dossiers et à la génération de rappels — la saisie sur les portails officiels reste un geste humain, le vôtre.",
    },
    {
      question: "Ça marche avec mon logiciel de gestion formation actuel ?",
      answer:
        "On se connecte à l'outil que vous utilisez déjà (Digiforma, Dendreo, Ypareo ou autre) quand une intégration est possible — l'objectif est de compléter votre organisation, pas de vous en faire changer.",
    },
  ],
  ctaText:
    "30 minutes pour identifier ce qui vous prend le plus de temps entre l'administratif OPCO, l'émargement et la préparation d'audit, et voir si une automatisation vaut le coup pour vous.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Salles de sport & instituts bien-être", href: "/fr/automatisation-salle-de-sport" },
    { label: "Garages et carrosseries", href: "/fr/automatisation-garage-automobile" },
    { label: "Officines de pharmacie", href: "/fr/automatisation-pharmacie" },
  ],
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "TRAINING ORGANIZATIONS · INDEPENDENT TRAINERS · APPRENTICESHIP CENTERS",
  h1: "Less time on Qualiopi paperwork, more time on teaching",
  intro:
    "Attendance sheets to archive, OPCO funding files to follow up, notices to send, evidence to gather before a Qualiopi audit: the administrative load of a training organization doesn't come from the trade itself, it comes from everything around it. We automate these specific tasks — you stay the one who decides, approves and bills.",
  painTitle: "What weighs on a training organization",
  painIntro:
    "Whether you're an independent trainer, a general training organization or an apprenticeship center (CFA), the administrative obligations are the same for everyone — only the volume changes.",
  painPoints: [
    {
      title: "OPCO funding files get stuck on missing documents",
      description:
        "Every missing document resets the processing clock to zero (10 to 30 business days depending on the OPCO), and payment comes 2 to 4 weeks after the file is approved. The follow-up burden falls back on you.",
    },
    {
      title: "Paper or poorly archived attendance sheets are fragile",
      description:
        "Mandatory signature per half-day, 6-year archiving, auditable by funders — an irregularity can get an entire funding file rejected.",
    },
    {
      title: "Preparing a Qualiopi audit becomes time-consuming",
      description:
        "The more sessions you run, the more time gets spent reconstructing evidence by hand — indicator by indicator — instead of teaching.",
    },
    {
      title: "The trainee notice is an under-known obligation",
      description:
        "An individual notice with precise mandatory mentions is required for every participant — a simple enrollment confirmation isn't legally enough.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "We pick 3-4 automations based on your volume and profile (independent, general organization, CFA) — never a system that demands more management than it saves.",
  automations: [
    {
      code: "W-FORMATION-07",
      title: "Centralizing evidence for the Qualiopi audit",
      description:
        "Every document already produced (attendance sheet, satisfaction survey, certificate) is automatically filed under the relevant Qualiopi indicator, with a dashboard of incomplete indicators. This automation helps document — it doesn't audit and guarantees no compliance: you (or your quality officer) judge whether the evidence is sufficient, the auditor decides in the end.",
    },
    {
      code: "W-FORMATION-02",
      title: "Tracking and following up OPCO funding files",
      description:
        "Tracking of each file (program, agreement, quote, attendance sheet) with automatic follow-up if a document is missing or the delay is abnormally long. You approve the follow-up template once; the OPCO relationship stays in your hands.",
    },
    {
      code: "W-FORMATION-03",
      title: "Generating, sending and archiving attendance sheets",
      description:
        "A compliant attendance sheet is generated for each session, made available for signature, then automatically archived for the legal 6-year duration, filed by trainee or funder record.",
    },
    {
      code: "W-FORMATION-04",
      title: "Automatic sending of trainee notices",
      description:
        "As soon as enrollment is confirmed, the notice is generated with all mandatory mentions and sent at least 2 weeks before the session. You approve the template once; if a session changes urgently, the automation alerts you rather than sending automatically.",
    },
  ],
  geoTitle: "A nationwide offer, adapted to your profile",
  geoText:
    "This catalog is open to training organizations anywhere in France, whatever the profile: independent trainer, general training organization or apprenticeship center (CFA). We connect to the tool you already use (Digiforma, Dendreo, Ypareo or other) rather than proposing a new one — automation completes your current setup, it doesn't replace it. The 30-minute diagnostic identifies the specific tasks costing you the most time.",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, systematic and with no commitment. Centralizing evidence for the Qualiopi audit, for instance, starts at €2,000 excl. VAT — a custom automation, with integration to your existing tool when an API or export is available.",
  pricingNote:
    "Worth noting: the annual pedagogical and financial report (BPF) is a mandatory yearly deadline for any organization with an activity declaration number — two consecutive missing BPFs cause automatic lapse of that number. It's not a standalone automation on this page, but a deadline reminder we can include based on your diagnostic.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "Does this guarantee my Qualiopi certification?",
      answer:
        "No. NBHC is neither a certification body nor a Qualiopi consultancy. Our automations help document, track and follow up — compliance is a matter for the audit and the auditor's decision, not a tool.",
    },
    {
      question: "Do you submit files on my behalf on EDOF?",
      answer:
        "No. EDOF is a sensitive platform (anti-CPF-fraud). Our role is limited to internal tracking of file status and generating reminders — entering data on official portals remains a human action, yours.",
    },
    {
      question: "Does this work with my current training management software?",
      answer:
        "We connect to the tool you already use (Digiforma, Dendreo, Ypareo or other) when integration is possible — the goal is to complete your setup, not make you switch.",
    },
  ],
  ctaText:
    "30 minutes to identify what's taking up the most of your time between OPCO admin, attendance tracking and audit prep, and see whether automation is worth it for you.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Gyms & wellness centers", href: "/en/automatisation-salle-de-sport" },
    { label: "Garages and body shops", href: "/en/automatisation-garage-automobile" },
    { label: "Pharmacies", href: "/en/automatisation-pharmacie" },
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
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-organisme-formation`;

  const t = await getTranslations({ locale, namespace: "automationFlows.formation" });
  const content: SectorContent = {
    ...baseContent,
    automations: baseContent.automations.map((a) => {
      if (a.code === "W-FORMATION-03") {
        const doc = t.raw("docMockup") as DocMockupContent;
        return {
          ...a,
          customFlow: <DocMockup ariaLabel={a.title} content={doc} />,
        };
      }
      if (a.code === "W-FORMATION-07") {
        const checklist = t.raw("checklist") as ChecklistMockupContent;
        return {
          ...a,
          customFlow: <ChecklistMockup ariaLabel={a.title} content={checklist} />,
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
                ? "Automatisation sur mesure (centralisation des preuves pour l'audit Qualiopi) pour organisme de formation"
                : "Custom automation (centralizing evidence for the Qualiopi audit) for training organizations",
              url: pageUrl,
            },
          ]),
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: `https://nbhc.fr/${locale}` },
            {
              name: isFr ? "Organismes de formation" : "Training organizations",
              url: pageUrl,
            },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
