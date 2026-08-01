// Contenu des 6 secteurs dont l'automatisation N'EST PAS un appel.
//
// Chacun garde sa mise en scène — quatre familles, pas une seule :
//   liste     : pharmacie, opticien  (parcourir un fichier, proposer, trier)
//   assemblage: formation, cosmétique (rattacher des pièces, constater les manques)
//   devis     : btp                   (des lignes qui s'additionnent)
//   planning  : sport                 (une place qui se libère, une file d'attente)
//
// Véracité, partout : la machine propose, l'humain tranche, et le plan de
// validation est le même bloc partagé. Pharmacie : initiales seules, aucune
// donnée médicale, aucun envoi sans accord. Cosmétique : le dossier est
// préparé, jamais soumis. Qualiopi : numérotation générique, jamais les
// libellés officiels du référentiel.

export type Close =
  | { type: "video"; file: string }
  | { type: "motion" };

export type ListSpec = {
  kind: "list";
  id: string;
  guard?: string;
  guardValidation?: string;
  listTitle: string;
  rows: { initials: string; meta?: string; eligible: boolean }[];
  criterion: string;
  proposalTitle: string;
  /** Cases cochées par l'humain, dans l'ordre des lignes retenues.
   *  Des `false` volontaires : la sélection est un choix, pas un automatisme. */
  ticked: boolean[];
  captions: string[]; // 7 plans
  awaitingLabel: string;
  validatedLabel: string;
  buttonLabel: string;
  benefit: string;
  close: Close;
};

export type AssemblySpec = {
  kind: "assembly";
  id: string;
  itemsTitle: string;
  items: string[];
  targetsTitle: string;
  targets: string[];
  /** Index des cibles qui restent NON couvertes : l'outil montre les manques. */
  gaps: number[];
  gapCaption: string;
  readyLabel: string;
  captions: string[];
  awaitingLabel: string;
  validatedLabel: string;
  buttonLabel: string;
  guardValidation?: string;
  benefit: string;
  close: Close;
};

export type QuoteSpec = {
  kind: "quote";
  id: string;
  request: [string, string];
  title: string;
  exampleTag: string;
  /** Montants numeriques : le total du plan 3 est un vrai compteur anime,
   *  pas une suite de paliers. Les chaines sont formatees a l'affichage. */
  lines: { label: string; amount: number }[];
  subtotal: number;
  discountValue: number;
  discountLabel: string;
  draftLabel: string;
  draftNote: string;
  correctedIndex: number;
  correctedAmount: number;
  captions: string[];
  awaitingLabel: string;
  validatedLabel: string;
  buttonLabel: string;
  benefit: string;
  close: Close;
};

export type ScheduleSpec = {
  kind: "schedule";
  id: string;
  columns: string[];
  rows: string[];
  fullRow: number;
  fullCol: number;
  fullLabel: string;
  /** Libelle lisible du creneau : « Mercredi, 18 h » plutot que « 18 h — Mer ». */
  fullSlotLabel: string;
  waitlist: string[];
  proposalTitle: string;
  proposalRow: string;
  captions: string[];
  awaitingLabel: string;
  validatedLabel: string;
  buttonLabel: string;
  benefit: string;
  close: Close;
};

export type DemoSpec = ListSpec | AssemblySpec | QuoteSpec | ScheduleSpec;

// ---------------------------------------------------------------------------

export const PHARMACIE: ListSpec = {
  kind: "list",
  id: "pharmacie",
  guard: "Initiales uniquement — aucune donnée médicale affichée",
  guardValidation: "Aucun message envoyé sans votre accord",
  listTitle: "Votre patientèle",
  // Aucune métadonnée : sur un sujet santé, les initiales suffisent à faire
  // comprendre le mécanisme.
  rows: [
    { initials: "M. L.", eligible: true },
    { initials: "A. D.", eligible: false },
    { initials: "R. B.", eligible: true },
    { initials: "S. K.", eligible: true },
    { initials: "J. P.", eligible: false },
    { initials: "T. M.", eligible: true },
    { initials: "C. V.", eligible: false },
    { initials: "N. F.", eligible: true },
  ],
  criterion: "Critère : patients concernés par le bilan partagé de médication",
  proposalTitle: "Proposition",
  ticked: [true, true, false, true, false],
  captions: [
    "Votre patientèle",
    "Le critère d'éligibilité",
    "L'IA parcourt la liste",
    "Repère les patients éligibles",
    "Une proposition, pas une décision",
    "Le pharmacien choisit",
    "Le pharmacien valide",
  ],
  awaitingLabel: "En attente de validation",
  validatedLabel: "Validé par le pharmacien",
  buttonLabel: "Valider la sélection",
  benefit: "Vous repérez les patients concernés, sans chercher.",
  close: { type: "motion" },
};

export const OPTICIEN: ListSpec = {
  kind: "list",
  id: "opticien",
  guardValidation: "Aucun message envoyé sans votre accord",
  listTitle: "Votre fichier clients",
  rows: [
    { initials: "B. R.", meta: "Ordonnance 03/2023", eligible: true },
    { initials: "L. M.", meta: "Ordonnance 11/2024", eligible: false },
    { initials: "F. C.", meta: "Ordonnance 01/2023", eligible: true },
    { initials: "H. D.", meta: "Ordonnance 09/2024", eligible: false },
    { initials: "P. A.", meta: "Ordonnance 05/2023", eligible: true },
    { initials: "V. T.", meta: "Ordonnance 02/2023", eligible: true },
    { initials: "G. S.", meta: "Ordonnance 12/2024", eligible: false },
    { initials: "K. N.", meta: "Ordonnance 04/2023", eligible: true },
  ],
  criterion: "Critère : équipement arrivant à échéance de renouvellement",
  proposalTitle: "Rappels proposés",
  ticked: [true, false, true, true, false],
  captions: [
    "Votre fichier clients",
    "Le critère de renouvellement",
    "L'IA parcourt le fichier",
    "Repère les équipements à renouveler",
    "Une liste de rappels proposée",
    "L'opticien choisit qui contacter",
    "L'opticien valide",
  ],
  awaitingLabel: "En attente de validation",
  validatedLabel: "Validé par l'opticien",
  buttonLabel: "Valider les rappels",
  benefit: "Vous rappelez au bon moment.",
  close: { type: "video", file: "demos/opticien_close_treated.mp4" },
};

export const FORMATION: AssemblySpec = {
  kind: "assembly",
  id: "formation",
  itemsTitle: "Vos preuves",
  items: [
    "Convocation",
    "Feuille d'émargement",
    "Programme",
    "Évaluation",
    "CV du formateur",
    "Attestation",
    "Livret d'accueil",
  ],
  // Numérotation générique : reprendre les libellés officiels du référentiel
  // exposerait à en affirmer une lecture inexacte.
  targetsTitle: "Indicateurs du référentiel",
  targets: [
    "Indicateur 1",
    "Indicateur 2",
    "Indicateur 3",
    "Indicateur 4",
    "Indicateur 5",
    "Indicateur 6",
    "Indicateur 7",
  ],
  gaps: [4, 6],
  gapCaption: "Ce qui manque encore",
  readyLabel: "Dossier prêt pour l'audit",
  captions: [
    "Vos preuves, éparpillées",
    "Les indicateurs du référentiel",
    "Chaque preuve trouve son indicateur",
    "Le dossier se constitue",
    "Ce qui manque encore",
    "Vous complétez",
    "L'organisme valide",
  ],
  awaitingLabel: "En attente de validation",
  validatedLabel: "Validé par l'organisme",
  buttonLabel: "Valider le dossier",
  benefit: "Votre dossier d'audit est prêt.",
  close: { type: "video", file: "demos/formation_close_treated.mp4" },
};

export const COSMETIQUE: AssemblySpec = {
  kind: "assembly",
  id: "cosmetique",
  itemsTitle: "La formule",
  items: [
    "Base lavante",
    "Agent hydratant",
    "Conservateur",
    "Parfum",
    "Colorant",
    "Agent épaississant",
  ],
  targetsTitle: "Pièces du dossier",
  targets: [
    "Formule",
    "Données toxicologiques",
    "Étiquetage",
    "Stabilité",
    "Évaluation de sécurité",
    "Traçabilité",
  ],
  gaps: [3, 5],
  gapCaption: "Ce qui demande un arbitrage",
  readyLabel: "Dossier prêt à être soumis",
  captions: [
    "La formule du produit",
    "Les pièces du dossier",
    "Le dossier s'assemble",
    "Contrôle de conformité",
    "Ce qui demande un arbitrage",
    "Le responsable arbitre",
    "Le responsable valide",
  ],
  awaitingLabel: "En attente de validation",
  validatedLabel: "Validé par le responsable",
  buttonLabel: "Valider avant soumission",
  guardValidation: "Aucune soumission sans votre validation",
  benefit: "Votre dossier est prêt à être soumis.",
  close: { type: "motion" },
};

export const BTP: QuoteSpec = {
  kind: "quote",
  id: "btp",
  request: ["« Réfection complète", "d'une salle de bains. »"],
  title: "Devis",
  exampleTag: "Exemple",
  lines: [
    { label: "Dépose de l'ancien carrelage", amount: 480 },
    { label: "Reprise de la plomberie", amount: 1250 },
    { label: "Faïence murale", amount: 890 },
    { label: "Revêtement de sol PVC", amount: 610 },
    { label: "Main-d'œuvre", amount: 1400 },
  ],
  subtotal: 4630,
  discountLabel: "Remise commerciale",
  discountValue: 230,
  draftLabel: "Brouillon",
  draftNote: "à relire par l'artisan",
  correctedIndex: 3,
  correctedAmount: 660,
  captions: [
    "La demande client",
    "Le devis se remplit",
    "Le total se calcule",
    "Remise appliquée",
    "Un brouillon, pas un envoi",
    "L'artisan relit",
    "L'artisan valide avant envoi",
  ],
  awaitingLabel: "En attente de validation",
  validatedLabel: "Validé par l'artisan",
  buttonLabel: "Valider et envoyer",
  benefit: "Vos devis partent le jour même.",
  close: { type: "video", file: "demos/btp_close_treated.mp4" },
};

export const SPORT: ScheduleSpec = {
  kind: "schedule",
  id: "sport",
  columns: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
  rows: ["12 h", "18 h", "19 h 30"],
  fullRow: 1,
  fullCol: 2,
  fullLabel: "Complet",
  fullSlotLabel: "Mercredi, 18 h",
  waitlist: ["D. R.", "M. A.", "S. B."],
  proposalTitle: "Place libérée",
  proposalRow: "D. R.",
  captions: [
    "Le planning des cours",
    "Un cours complet",
    "Les rappels aux inscrits",
    "Une place se libère",
    "Le suivant sur la liste",
    "Une proposition, pas un envoi",
    "Le gérant valide",
  ],
  awaitingLabel: "En attente de validation",
  validatedLabel: "Validé par le gérant",
  buttonLabel: "Valider la proposition",
  benefit: "Vos cours se remplissent.",
  close: { type: "video", file: "demos/sport_close_treated.mp4" },
};

export const DEMO_SECTORS: Record<string, DemoSpec> = {
  pharmacie: PHARMACIE,
  opticien: OPTICIEN,
  formation: FORMATION,
  cosmetique: COSMETIQUE,
  btp: BTP,
  sport: SPORT,
};
