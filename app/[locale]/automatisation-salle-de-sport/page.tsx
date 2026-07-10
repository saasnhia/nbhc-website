import { setRequestLocale, getTranslations } from "next-intl/server";
import SectorPageContent, { type SectorContent } from "../../../components/SectorPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema, faqPageSchema } from "../../../lib/schema";
import { zipFlowSteps, type FlowStepKind } from "../../../components/AutomationFlow";
import ChatMockup, { type ChatBubbleData } from "../../../components/ChatMockup";
import CallBookingMockup, { type CallBookingMockupContent } from "../../../components/CallBookingMockup";

// Structural shape of each automation's mechanism diagram (trigger -> ... ->
// validation). Not translatable — the labels come from
// messages/*.json (automationFlows.sport.*) via getTranslations below.
const FLOW_KINDS: Record<string, FlowStepKind[]> = {
  "W-SPORT-01": ["trigger", "process", "action", "action"],
  "W-SPORT-05": ["trigger", "process", "action", "validation"],
  "W-SPORT-08": ["trigger", "process", "action"],
};
const FLOW_MSG_KEY: Record<string, string> = {
  "W-SPORT-01": "w0101",
  "W-SPORT-05": "w0105",
  "W-SPORT-08": "w0108",
};

const contentFr: SectorContent = {
  eyebrow: "SALLES DE SPORT · STUDIOS · INSTITUTS BIEN-ÊTRE",
  h1: "Automatisez les tâches qui vous font perdre des adhérents",
  intro:
    "Entre les cours à donner, l'accueil et les soins, personne n'a le temps de relancer un abonnement à échéance ou de reprendre une place libérée par un no-show. On automatise ces tâches précises pour que rien ne se perde.",
  painTitle: "Ce qui coûte réellement de l'argent dans une salle ou un institut",
  painIntro:
    "Ce ne sont pas les grandes décisions stratégiques qui plombent le chiffre d'affaires d'une salle de sport ou d'un institut indépendant — ce sont les petites tâches répétitives qu'on n'a jamais le temps de faire systématiquement.",
  painPoints: [
    {
      title: "Les no-shows sur les cours collectifs",
      description:
        "Un cours plein sur le planning mais à moitié vide en vrai, parce que personne n'a relancé les inscrits ni proposé la place à la liste d'attente au bon moment.",
    },
    {
      title: "Les adhérents qui décrochent en silence",
      description:
        "Le secteur fitness affiche un taux de résiliation moyen de 28,6 % par an, et les adhérents inactifs représentent 50 à 60 % du chiffre d'affaires d'une salle classique (Smart Health Clubs, 2025) — sans relance, cette base dort.",
    },
    {
      title: "L'accueil téléphonique saturé pendant les soins",
      description:
        "Impossible de décrocher pendant une séance en cabine ou un cours en cours. Chaque appel manqué à ce moment-là est une demande de RDV qui part ailleurs.",
    },
    {
      title: "Les forfaits et cures qui ne se renouvellent pas",
      description:
        "Sans relance au bon moment — ni trop tôt, ni trop tard — un client en fin de forfait a toutes les chances de ne pas revenir de lui-même.",
    },
  ],
  automationsTitle: "Les automatisations qu'on met en place",
  automationsIntro:
    "On ne déploie jamais les 10 briques du catalogue en même temps. On choisit 2 à 3 automatisations selon vos signaux réels — volume de cours, taille d'équipe, type d'activité — et on les construit avec vous.",
  automations: [
    {
      code: "W-SPORT-01",
      title: "Rappels automatiques de cours + liste d'attente dynamique",
      description:
        "SMS de rappel 24h avant chaque cours réservé. En cas d'annulation, la place libérée est proposée automatiquement aux inscrits en liste d'attente, dans l'ordre, jusqu'à ce qu'elle soit reprise — sans que personne n'ait à s'en occuper.",
    },
    {
      code: "W-SPORT-02",
      title: "Prise de RDV intelligente qui décharge l'accueil",
      description:
        "Quand personne ne peut décrocher (séance en cours, cabine occupée), la demande de RDV est prise en charge automatiquement : qualification, proposition de créneaux réels depuis votre planning, confirmation par SMS, validation finale par vous avant que le client ne soit confirmé.",
    },
    {
      code: "W-SPORT-03",
      title: "Relance des abonnements à échéance + réactivation des inactifs",
      description:
        "Détection automatique des adhérents à échéance ou inactifs depuis plusieurs semaines, relance personnalisée et progressive. Une séquence de relance automatisée (email + SMS) récupère en moyenne 42% des paiements échoués, contre 70% de l'ensemble des impayés \"involontaires\" une fois toutes les méthodes de recouvrement combinées (Churnkey, State of Retention 2025).",
    },
    {
      code: "W-SPORT-05",
      title: "Suivi satisfaction et avis Google post-séance",
      description:
        "SMS automatique après une séance ou un cours d'essai demandant une note rapide. Bonne note → lien direct vers votre fiche Google. Note basse → alerte immédiate pour un rappel personnel avant qu'un avis négatif ne soit publié.",
    },
    {
      code: "W-SPORT-08",
      title: "Relance des cures et forfaits non renouvelés",
      description:
        "Suivi du nombre de séances consommées sur un forfait, relance proactive avant la dernière séance pour proposer le renouvellement — au bon moment, ni trop tôt ni trop tard.",
    },
  ],
  geoTitle: "Vernon et sa périphérie (Eure)",
  geoText:
    "NBHC a mené un travail de terrain approfondi auprès des salles, studios et instituts indépendants de Vernon et de sa périphérie proche (Saint-Marcel, Pacy-sur-Eure, Gaillon, Les Andelys). Si vous êtes dans ce secteur, on connaît déjà les problématiques concrètes du bassin — mais l'offre s'adresse à toute salle ou institut indépendant en France.",
  pricingTitle: "Tarification",
  pricingIntro:
    "Diagnostic gratuit de 30 minutes, systématique et sans engagement. Ensuite, deux formats : Quick Win à partir de 2 000 € HT pour une première automatisation ciblée livrée en 2-3 semaines, ou Standard à partir de 4 000 € HT + performance fee de 30 % du ROI mesuré (plafonnée à 2× le prix du build) pour 2 à 3 automatisations combinées. Vous restez propriétaire de votre stack : si vous partez, vous gardez tout.",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Vous remplacez mon logiciel de gestion (Resamania, Deciplus, Planity) ?",
      answer:
        "Non. On se connecte à l'outil que vous utilisez déjà pour les rappels, les relances et le suivi. Vous ne changez rien à vos habitudes de planning.",
    },
    {
      question: "Mes adhérents vont trouver ça froid, une relance automatique ?",
      answer:
        "Le ton des messages est calibré avec vous avant le lancement, et vous validez les offres commerciales proposées dans les relances. L'automatisation prend le relais uniquement là où personne n'a le temps de le faire systématiquement — elle ne remplace pas votre relation client.",
    },
    {
      question: "On est une petite structure, est-ce que c'est fait pour nous ?",
      answer:
        "Oui — le format Quick Win à partir de 2 000 € HT est justement pensé pour tester une première automatisation sans engager un gros budget. Le diagnostic de 30 minutes permet de voir concrètement ce qui vaut le coup pour votre taille de structure.",
    },
  ],
  ctaText:
    "30 minutes suffisent pour identifier où vous perdez du temps et de l'argent sur des tâches répétitives, et voir si une automatisation vaut le coup pour vous.",
  ctaButton: "Réserver mon diagnostic gratuit →",
  diagnosticNote: "30 minutes, gratuit, sans engagement.",
  relatedSectorsTitle: "Autres secteurs accompagnés",
  relatedSectors: [
    { label: "Associations sportives (loi 1901)", href: "/fr/automatisation-association-sportive" },
    { label: "Garages et carrosseries", href: "/fr/automatisation-garage-automobile" },
    { label: "Artisans et BTP", href: "/fr/automatisation-artisan-btp" },
  ],
  backLabel: "Retour",
};

const contentEn: SectorContent = {
  eyebrow: "GYMS · STUDIOS · WELLNESS CENTERS",
  h1: "Automate the tasks that are quietly costing you members",
  intro:
    "Between classes, front-desk duty and treatments, nobody has time to chase an expiring membership or refill a spot freed up by a no-show. We automate these specific tasks so nothing falls through the cracks.",
  painTitle: "What actually costs money in an independent gym or wellness center",
  painIntro:
    "It's rarely the big strategic calls that hurt an independent gym or wellness center's revenue — it's the small repetitive tasks nobody ever has time to do consistently.",
  painPoints: [
    {
      title: "No-shows on group classes",
      description:
        "A class that looks full on the schedule but is half-empty in reality, because nobody followed up with registrants or offered the freed-up spot to the waitlist in time.",
    },
    {
      title: "Members who quietly churn",
      description:
        "The fitness sector shows an average annual churn rate of 28.6%, and inactive members represent 50-60% of a typical gym's revenue (Smart Health Clubs, 2025) — without follow-up, that base just sits there.",
    },
    {
      title: "Front desk overwhelmed during treatments",
      description:
        "Impossible to pick up the phone during a treatment or a class in session. Every missed call at that moment is a booking request that goes elsewhere.",
    },
    {
      title: "Packages and treatment plans that don't renew",
      description:
        "Without a well-timed follow-up — not too early, not too late — a client finishing a package has every chance of not coming back on their own.",
    },
  ],
  automationsTitle: "The automations we set up",
  automationsIntro:
    "We never deploy all 10 catalog building blocks at once. We pick 2-3 automations based on your real signals — class volume, team size, activity type — and build them with you.",
  automations: [
    {
      code: "W-SPORT-01",
      title: "Automatic class reminders + dynamic waitlist",
      description:
        "SMS reminder 24h before every booked class. If someone cancels, the freed-up spot is automatically offered to waitlisted members, in order, until it's taken — with nobody needing to manage it.",
    },
    {
      code: "W-SPORT-02",
      title: "Smart booking that takes the load off your front desk",
      description:
        "When nobody can pick up (a session in progress, a treatment room occupied), the booking request is handled automatically: qualification, real slot suggestions from your calendar, SMS confirmation, final validation by you before the client is confirmed.",
    },
    {
      code: "W-SPORT-03",
      title: "Membership renewal follow-up + inactive member reactivation",
      description:
        "Automatic detection of members nearing renewal or inactive for several weeks, personalized progressive follow-up. An automated follow-up sequence (email + SMS) recovers 42% of failed payments on average, versus 70% of all involuntary churn once every recovery method is combined (Churnkey, State of Retention 2025).",
    },
    {
      code: "W-SPORT-05",
      title: "Satisfaction tracking and Google reviews after each session",
      description:
        "Automatic SMS after a session or trial class asking for a quick rating. Good rating → direct link to your Google listing. Low rating → immediate alert for a personal follow-up before a negative review gets published.",
    },
    {
      code: "W-SPORT-08",
      title: "Follow-up on unrenewed packages and treatment plans",
      description:
        "Tracking of sessions used within a package, proactive follow-up before the last session to offer renewal — at the right time, neither too early nor too late.",
    },
  ],
  geoTitle: "Vernon and its surrounding area (Eure, France)",
  geoText:
    "NBHC has done in-depth field work with independent gyms, studios and wellness centers in Vernon and its immediate surroundings (Saint-Marcel, Pacy-sur-Eure, Gaillon, Les Andelys). If you're in this area, we already know the concrete challenges of the local market — but this offer is open to any independent gym or wellness center in France.",
  pricingTitle: "Pricing",
  pricingIntro:
    "Free 30-minute diagnostic, systematic and with no commitment. Then two formats: Quick Win from €2,000 excl. VAT for a first targeted automation delivered in 2-3 weeks, or Standard from €4,000 excl. VAT + a 30% performance fee on the measured ROI (capped at 2x the build price) for 2-3 combined automations. You keep ownership of your stack: if you leave, you keep everything.",
  faqTitle: "Frequently asked questions",
  faq: [
    {
      question: "Do you replace my booking software (Resamania, Deciplus, Planity)?",
      answer:
        "No. We connect to the tool you already use for reminders, follow-ups and tracking. You don't change your scheduling habits.",
    },
    {
      question: "Won't automated follow-ups feel cold to my members?",
      answer:
        "Message tone is calibrated with you before launch, and you validate any commercial offers proposed in follow-ups. Automation only takes over where nobody has time to do it consistently — it doesn't replace your client relationship.",
    },
    {
      question: "We're a small structure, is this for us?",
      answer:
        "Yes — the Quick Win format from €2,000 excl. VAT is designed precisely to test a first automation without committing a large budget. The 30-minute diagnostic shows concretely what's worth it for your size of structure.",
    },
  ],
  ctaText:
    "30 minutes is enough to identify where you're losing time and money on repetitive tasks, and see whether automation is worth it for you.",
  ctaButton: "Book my free diagnostic →",
  diagnosticNote: "30 minutes, free, no commitment.",
  relatedSectorsTitle: "Other sectors we support",
  relatedSectors: [
    { label: "Sports associations (non-profit)", href: "/en/automatisation-association-sportive" },
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
  const baseContent = isFr ? contentFr : contentEn;
  const pageUrl = `https://nbhc.fr/${locale}/automatisation-salle-de-sport`;

  const t = await getTranslations({ locale, namespace: "automationFlows.sport" });
  const content: SectorContent = {
    ...baseContent,
    automations: baseContent.automations.map((a) => {
      if (a.code === "W-SPORT-02") {
        const callBooking = t.raw("callBooking") as CallBookingMockupContent;
        return {
          ...a,
          customFlow: <CallBookingMockup ariaLabel={a.title} content={callBooking} />,
        };
      }
      if (a.code === "W-SPORT-03") {
        const chat = t.raw("renewalChat") as {
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
              name: isFr ? "Quick Win" : "Quick Win",
              price: "2000",
              description: isFr
                ? "1 automatisation ciblée pour salle de sport ou institut, livrée en 2-3 semaines"
                : "1 targeted automation for gyms or wellness centers, delivered in 2-3 weeks",
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
              name: isFr ? "Salles de sport & bien-être" : "Gyms & wellness",
              url: pageUrl,
            },
          ]),
          faqPageSchema(content.faq ?? []),
        ]}
      />
    </>
  );
}
