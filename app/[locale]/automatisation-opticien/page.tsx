import { setRequestLocale, getTranslations } from "next-intl/server";
import SceneSecteur from "../../../components/SceneSecteur";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { zipFlowSteps, type FlowStepKind } from "../../../components/AutomationFlow";

const FLOW_KINDS: Record<string, FlowStepKind[]> = {
  "W-OPT-01": ["trigger", "process", "action", "validation"],
  "W-OPT-02": ["trigger", "process", "action", "validation"],
  "W-OPT-03": ["trigger", "process", "action", "validation"],
  "W-OPT-04": ["trigger", "process", "action", "validation"],
};
const FLOW_MSG_KEY: Record<string, string> = {
  "W-OPT-01": "wopt01",
  "W-OPT-02": "wopt02",
  "W-OPT-03": "wopt03",
  "W-OPT-04": "wopt04",
};

const contentFr: SectorContent = {
  eyebrow: "MAGASINS D'OPTIQUE · RÉSEAUX MULTI-BOUTIQUES",
  h1: "Le client qui ne revient jamais renouveler, ce n'est pas une fatalité",
  intro:
    "Un client équipé il y a deux ans qu'on ne relance jamais, une commande prête que personne n'a prévenu, un stock qui ne dit pas la même chose d'une boutique à l'autre : ce sont des tâches de fond, répétitives, qui n'ont rien à voir avec l'examen de vue ou le conseil en magasin. On les automatise — vous restez l'opticien qui examine, conseille et vend. NBHC n'est ni opticien-optométriste ni professionnel de santé : on détecte, on prépare, on rappelle — jamais on ne réalise l'examen ni ne facture à votre place.",
  painTitle: "Ce qui fait fuir du chiffre d'affaires sans que personne ne le voie",
  painIntro:
    "Sur une base de plusieurs milliers de clients équipés, ces tâches ne se font pas systématiquement sans un outil dédié — pas par manque de sérieux, par manque de temps.",
  painPoints: [
    {
      title: "Le renouvellement se fait au hasard, pas à échéance",
      description:
        "93 % des achats de lunettes sont des renouvellements, mais 10 % des porteurs n'ont pas renouvelé depuis 2020 ou avant, et 13 % réutilisent la même ordonnance qu'à leur achat précédent (étude ROF/Galliléo Business Consulting, déc. 2025, 3 001 porteurs). Sans détection automatique, cette base dort — jusqu'à ce qu'un concurrent la relance le premier.",
    },
    {
      title: "Le \"c'est prêt ?\" sature l'accueil",
      description:
        "Sans notification automatique dès la fin de fabrication, le client appelle ou repasse pour rien, et l'équipe perd du temps à vérifier le statut commande par commande.",
    },
    {
      title: "Le stock ne dit pas la même chose d'une boutique à l'autre",
      description:
        "Sans synchronisation continue, une monture vendue en boutique A reste affichée disponible en boutique B — le client se déplace pour rien, ou le réassort part trop tard.",
    },
    {
      title: "Les dossiers mutuelle s'accumulent en attente",
      description:
        "Un dossier de prise en charge complémentaire bloqué sur une pièce manquante retarde le règlement — le tri manuel des motifs prend du temps à une équipe déjà au comptoir.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "On choisit 2 à 4 automatisations selon votre profil (boutique indépendante ou réseau multi-sites) — jamais l'ensemble d'un coup.",
  automations: [
    {
      code: "W-OPT-01",
      title: "Détection et relance des clients à renouveler",
      description:
        "Croise la base clients avec la date du dernier achat ou contrôle pour identifier qui arrive à échéance de renouvellement (lunettes, lentilles), et prépare un message personnalisé de relance. Vous ou votre équipe recevez le client en boutique pour l'examen et la vente — l'automatisation ne réalise jamais l'examen de vue et ne prescrit rien.",
    },
    {
      code: "W-OPT-02",
      title: "Notification automatique \"commande prête\"",
      description:
        "Suit le statut de fabrication chez le façonnier et envoie un SMS dès que la commande (monture, verres) est prête à récupérer — pour éliminer les appels \"c'est prêt ?\" et les déplacements inutiles.",
    },
    {
      code: "W-OPT-03",
      title: "Synchronisation du stock multi-boutiques",
      description:
        "Chaque vente, dans n'importe quelle boutique du réseau, met à jour un stock partagé, avec une alerte de réassort dès qu'une référence passe sous un seuil que vous définissez. Vous validez chaque commande de réassort ; l'automatisation ne passe jamais commande à votre place.",
    },
    {
      code: "W-OPT-04",
      title: "Suivi et relance des dossiers mutuelle",
      description:
        "Suit chaque dossier de prise en charge complémentaire (100% Santé ou hors panier) et prépare une relance en cas de pièce manquante ou de délai anormal. Vous validez et envoyez chaque relance ; l'automatisation ne transmet rien directement à la mutuelle.",
    },
  ],
  geoTitle: "Une offre nationale, pensée pour les réseaux multi-boutiques",
  geoText:
    "L'offre s'adresse à tout magasin d'optique en France, qu'il soit indépendant ou intégré à un réseau de plusieurs boutiques — la synchronisation de stock et la relance client prennent tout leur sens à partir de 2 points de vente. Le diagnostic de 30 minutes permet d'identifier les tâches précises qui vous coûtent le plus de temps.",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, systématique et sans engagement. La détection des clients à renouveler, par exemple, démarre à 2 000 € HT — une automatisation sur mesure, connectée à votre logiciel de gestion.",
  pricingNote:
    "Aucun résultat chiffré n'est promis : NBHC n'a aucune référence client dans le secteur de l'optique à ce jour.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Est-ce que l'IA fait l'examen de vue ou prescrit des lunettes ?",
      answer:
        "Non, jamais. L'automatisation détecte qui arrive à échéance et prépare la relance ; l'examen de vue et toute prescription restent la responsabilité de l'opticien-optométriste ou de l'ophtalmologiste, exactement comme aujourd'hui.",
    },
    {
      question: "Ça marche avec mon logiciel de caisse ou de gestion actuel ?",
      answer:
        "On se connecte au logiciel métier que vous utilisez déjà quand c'est possible — l'objectif est de compléter votre organisation, pas de vous en faire changer.",
    },
    {
      question: "Comment ça se passe pour un réseau de plusieurs boutiques ?",
      answer:
        "Le stock et les données clients sont centralisés au niveau du réseau, mais chaque boutique garde son autonomie de vente et de conseil. Le réassort et les relances sont simplement coordonnés pour que l'information soit la même partout.",
    },
  ],
  ctaText:
    "30 minutes pour identifier ce qui vous prend le plus de temps entre le renouvellement client, le suivi fabrication et le stock multi-boutiques, et voir si une automatisation vaut le coup pour votre enseigne.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Marques de cosmétique & parfumerie", href: "/fr/automatisation-marque-cosmetique" },
    { label: "Officines de pharmacie", href: "/fr/automatisation-pharmacie" },
    { label: "Salons de coiffure", href: "/fr/automatisation-salon-de-coiffure" },
  ],
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "OPTICAL STORES · MULTI-STORE NETWORKS",
  h1: "The client who never comes back to renew isn't inevitable",
  intro:
    "A client fitted two years ago who's never followed up, a ready order nobody flagged, stock that doesn't match from one store to another: these are recurring background tasks with nothing to do with the eye exam or in-store advice. We automate them — you stay the optician who examines, advises and sells. NBHC is neither an optician-optometrist nor a healthcare professional: we detect, prepare, remind — we never perform the exam or bill on your behalf.",
  painTitle: "What quietly costs a store revenue",
  painIntro:
    "On a base of several thousand fitted clients, these tasks don't happen systematically without a dedicated tool — not for lack of care, for lack of time.",
  painPoints: [
    {
      title: "Renewal happens by chance, not on schedule",
      description:
        "93% of glasses purchases are renewals, but 10% of wearers haven't renewed since 2020 or earlier, and 13% reuse the same prescription as their last purchase (ROF/Galliléo Business Consulting study, Dec. 2025, 3,001 wearers, France). Without automatic detection, that base stays dormant — until a competitor follows up first.",
    },
    {
      title: "\"Is it ready?\" floods the front desk",
      description:
        "Without an automatic notification once manufacturing is done, the client calls or stops by for nothing, and the team loses time checking order status one by one.",
    },
    {
      title: "Stock doesn't match from one store to another",
      description:
        "Without continuous sync, a frame sold in store A still shows available in store B — the client travels for nothing, or restocking happens too late.",
    },
    {
      title: "Insurance files pile up in limbo",
      description:
        "A supplementary coverage file stuck on a missing document delays payment — manually sorting reasons takes time from an already busy front desk.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "We pick 2-4 automations based on your profile (independent store or multi-site network) — never all at once.",
  automations: [
    {
      code: "W-OPT-01",
      title: "Detecting and following up clients due for renewal",
      description:
        "Cross-checks the client base against the last purchase or exam date to identify who's due for renewal (glasses, contact lenses), and prepares a personalized follow-up message. You or your team welcome the client in-store for the exam and the sale — the automation never performs the eye exam or prescribes anything.",
    },
    {
      code: "W-OPT-02",
      title: "Automatic \"order ready\" notification",
      description:
        "Tracks manufacturing status with the lab and sends an SMS as soon as the order (frame, lenses) is ready to pick up — eliminating \"is it ready?\" calls and pointless trips.",
    },
    {
      code: "W-OPT-03",
      title: "Multi-store stock synchronization",
      description:
        "Every sale, in any store of the network, updates a shared stock, with a restock alert once a reference drops below a threshold you define. You approve each restock order; the automation never orders on your behalf.",
    },
    {
      code: "W-OPT-04",
      title: "Tracking and following up insurance files",
      description:
        "Tracks each supplementary coverage file and prepares a follow-up when a document is missing or a delay is unusual. You approve and send each follow-up; the automation never transmits anything directly to the insurer.",
    },
  ],
  geoTitle: "A national offer, built for multi-store networks",
  geoText:
    "The offer is open to any optical store in France, independent or part of a multi-store network — stock sync and client follow-up matter most from 2 locations on. The 30-minute diagnostic identifies the specific tasks costing you the most time.",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, systematic and with no commitment. Detecting clients due for renewal, for instance, starts at €2,000 excl. VAT — a custom automation, connected to your management software.",
  pricingNote:
    "No numeric result is promised: NBHC has no optical-sector client reference to date.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "Does the AI perform the eye exam or prescribe glasses?",
      answer:
        "No, never. The automation detects who's due for renewal and prepares the follow-up; the eye exam and any prescription stay the responsibility of the optician-optometrist or ophthalmologist, exactly as today.",
    },
    {
      question: "Does this work with my current point-of-sale or management software?",
      answer:
        "We connect to the software you already use when possible — the goal is to complete your setup, not make you switch.",
    },
    {
      question: "How does this work for a multi-store network?",
      answer:
        "Stock and client data are centralized at the network level, but each store keeps its own autonomy for sales and advice. Restocking and follow-ups are simply coordinated so the information matches everywhere.",
    },
  ],
  ctaText:
    "30 minutes to identify what's taking up the most of your time between client renewal, order tracking and multi-store stock, and see whether automation is worth it for your stores.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Cosmetics & fragrance brands", href: "/en/automatisation-marque-cosmetique" },
    { label: "Pharmacies", href: "/en/automatisation-pharmacie" },
    { label: "Hair salons", href: "/en/automatisation-salon-de-coiffure" },
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
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-opticien`;

  const t = await getTranslations({ locale, namespace: "automationFlows.opticien" });
  const content: SectorContent = {
    ...baseContent,
    automations: baseContent.automations.map((a) => {
      if (a.code === "W-OPT-02") {
        /* La scene 3D remplace le diagramme AutomationFlow — le jumeau
           SIMPLE de la carte (detecte -> SMS) : paquet a coche d'or (la
           commande prete), boite d'envoi actee, lunettes muettes. Gate du
           protocole gate 69 : comprehension en releve, bloquants choix +
           fidelite + ASP. Ancres re-emises (secteur-opt-commande). */
        return {
          ...a,
          customFlow: (
            <SceneSecteur
              fichier="secteur-opt-commande"
              alt={t("commandeSceneAlt")}
              etiquettes={[
                { texte: t("commandeLabelPrete"), x: 0.02, y: 0.3, cx: 0.2084, cy: 0.5888, largeurMax: 0.3 },
                { texte: t("commandeLabelSms"), x: 0.5, y: 0.2, cx: 0.7448, cy: 0.3501, largeurMax: 0.26 },
                { texte: t("commandeLabelRetrait"), x: 0.98, y: 0.26, cx: 0.8539, cy: 0.408, largeurMax: 0.3 },
              ]}
            />
          ),
        };
      }
      /* W-OPT-03 — LA SCENE 3D N'ENTRE PAS : VERDICT « N RESTE » (gate 71).
         Deux iterations, douze lecteurs, CHOIX FINAL N 12/12. It.1 : deux
         presentoirs jumeaux relies par un aller-retour — quatre objets sur
         cinq n'etaient pas nommes. It.2 : un seul stock, flux convergents,
         lunettes a l'echelle actee — les objets SE NOMMENT enfin, et la
         scene perd quand meme, sur un motif neuf : le triangle place entre
         deux paires symetriques se lit « pivot de balance », donc
         « arbitrage entre boutiques », le contresens exact du bloc. La
         scene et son depouillement restent dans nbhc-broll
         (scene_secteur_opt_stock.py, fid-sos01 / fid-sos02,
         verbatims_sos_gate71.md). Ne pas la re-integrer sans un nouveau gate. */
      /* W-OPT-01 — LA SCENE 3D N'ENTRE PAS : VERDICT « N RESTE » (gate 70).
         Deux iterations, douze lecteurs, CHOIX FINAL N 12/12. La scene
         gagnait l'esthetique et l'ASP, elle perdait le bloquant a chaque
         fois pour le meme motif : ses objets ne se nomment pas sans leurs
         etiquettes, et une image qu'il faut legender redit le texte du bloc
         au lieu de l'aider. Le diagramme AutomationFlow garde le slot ; la
         scene est conservee dans nbhc-broll (scene_secteur_opt_relance.py,
         sceaux fid-sor01 / fid-sor02) avec son depouillement complet dans
         verbatims_sor_gate70.md. Ne pas la re-integrer sans un nouveau gate. */
      if (a.code === "W-OPT-04") {
        /* La scene 3D remplace le diagramme AutomationFlow (N-qui-ENONCE,
           carte du gate 66 — le jumeau le plus fort : mutuelle ≡ assurance,
           scene 2 du garage ACTEE, transposee avec les LUNETTES en ancre de
           metier muette). Ancres re-emises (secteur-opt-mutuelle.ancres.
           json) ; l'etiquette des delais est a x 0,48 pour que son trait ne
           croise pas les lunettes (bord droit mesure a 0,443 ecran). */
        return {
          ...a,
          customFlow: (
            <SceneSecteur
              fichier="secteur-opt-mutuelle"
              alt={t("mutuelleSceneAlt")}
              etiquettes={[
                { texte: t("mutuelleLabelDossier"), x: 0.02, y: 0.3, cx: 0.2313, cy: 0.5386, largeurMax: 0.26 },
                { texte: t("mutuelleLabelDelais"), x: 0.5, y: 0.2, cx: 0.4299, cy: 0.4576, largeurMax: 0.26 },
                { texte: t("mutuelleLabelDetecte"), x: 0.48, y: 0.85, cx: 0.5415, cy: 0.6539, sousLeSocle: true, largeurMax: 0.36 },
                { texte: t("mutuelleLabelRelance"), x: 0.98, y: 0.26, cx: 0.7448, cy: 0.3501, largeurMax: 0.34 },
              ]}
            />
          ),
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
                ? "Automatisation sur mesure pour magasin d'optique, connectée à votre logiciel de gestion"
                : "Custom automation for optical stores, connected to your management software",
              url: pageUrl,
            },
          ]),
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: `https://nbhc.fr/${locale}` },
            {
              name: isFr ? "Opticiens" : "Opticians",
              url: pageUrl,
            },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
