// Contenu par secteur pour le moule téléphonique (GROUPE 1).
//
// Le moule est identique — 8 plans, même grammaire visuelle — parce que
// l'automatisation EST la même : une IA qui décroche, comprend, consulte un
// planning, propose, rédige, et attend la validation du professionnel.
// Seuls changent les mots, la grille consultée et le plan humain de clôture.
//
// Véracité : chaque secteur se termine sur SA validation humaine, avec SON
// intitulé de métier. Aucun chiffre, aucun logiciel tiers nommé.

export type SectorSpec = {
  id: string;
  /** Deux lignes : le masque de révélation est appliqué ligne par ligne. */
  quote: [string, string];
  tags: { k: string; v: string }[];
  /** Grille consultée par l'IA. Colonnes et lignes portent des libellés réels. */
  grid: {
    columns: string[];
    rows: string[];
    freeRow: number;
    freeCol: number;
    freeLabel: string;
  };
  /** Créneau retenu, affiché en gros au plan 5. */
  chip: string;
  dialogue: { ia: string; client: string };
  fiche: { title: string; rows: { k: string; v: string }[] };
  captions: {
    appel: string;
    repond: string;
    comprend: string;
    planning: string;
    creneau: string;
    fiche: string;
    validation: string;
  };
  awaitingLabel: string;
  validatedLabel: string;
  benefit: string;
  /** Nom du fichier dans public/ — plan humain propre au secteur. */
  closeVideo: string;
};

export const GARAGE: SectorSpec = {
  id: "garage",
  quote: ["« Je voudrais un rendez-vous", "pour une révision. »"],
  tags: [
    { k: "Intention", v: "prise de RDV" },
    { k: "Motif", v: "révision" },
  ],
  grid: {
    columns: ["Lun", "Mar", "Mer", "Jeu", "Ven"],
    rows: ["8 h", "10 h", "14 h", "16 h"],
    freeRow: 2,
    freeCol: 3,
    freeLabel: "Libre",
  },
  chip: "Jeudi — 14 h 00",
  dialogue: { ia: "Jeudi 14 h, ça vous convient ?", client: "Parfait." },
  fiche: {
    title: "Fiche rendez-vous",
    rows: [
      { k: "Client", v: "M. Lefèvre" },
      { k: "Véhicule", v: "Berline — 5 portes" },
      { k: "Motif", v: "Révision" },
      { k: "Créneau", v: "Jeudi, 14 h 00" },
    ],
  },
  captions: {
    appel: "Appel entrant",
    repond: "L'assistant répond",
    comprend: "L'IA comprend la demande",
    planning: "Vérifie le planning",
    creneau: "Propose un créneau",
    fiche: "Rédige la fiche",
    validation: "Le garagiste valide",
  },
  awaitingLabel: "En attente de validation",
  validatedLabel: "Validé par le garagiste",
  benefit: "Vous ne ratez plus un appel.",
  closeVideo: "demos/garage_close_treated.mp4",
};

export const RESTAURANT: SectorSpec = {
  id: "restaurant",
  quote: ["« Une table pour 4", "ce soir. »"],
  tags: [
    { k: "Intention", v: "réservation" },
    { k: "Couverts", v: "4" },
  ],
  // Un restaurant ne consulte pas un planning de jours mais un plan de salle :
  // tables x services. Plaquer la grille du garage aurait été un contresens.
  grid: {
    columns: ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5"],
    rows: ["19 h", "19 h 30", "20 h", "20 h 30"],
    freeRow: 3,
    freeCol: 3,
    freeLabel: "Libre",
  },
  chip: "20 h 30 — table pour 4",
  dialogue: { ia: "20 h 30, ça vous convient ?", client: "Parfait." },
  fiche: {
    title: "Fiche réservation",
    rows: [
      { k: "Nom", v: "M. Bertrand" },
      { k: "Couverts", v: "4" },
      { k: "Horaire", v: "20 h 30" },
      { k: "Service", v: "Dîner" },
    ],
  },
  captions: {
    appel: "Appel entrant",
    repond: "L'assistant répond",
    comprend: "L'IA comprend la demande",
    planning: "Vérifie le plan de salle",
    creneau: "Propose un horaire",
    fiche: "Enregistre la réservation",
    validation: "Le restaurateur valide",
  },
  awaitingLabel: "En attente de validation",
  validatedLabel: "Validé par le restaurateur",
  benefit: "Plus aucune réservation manquée.",
  closeVideo: "demos/restaurant_close_treated.mp4",
};

export const COIFFURE: SectorSpec = {
  id: "coiffure",
  quote: ["« Un rendez-vous coupe", "pour samedi. »"],
  tags: [
    { k: "Intention", v: "prise de RDV" },
    { k: "Prestation", v: "coupe" },
  ],
  grid: {
    columns: ["Mar", "Mer", "Jeu", "Ven", "Sam"],
    rows: ["9 h", "11 h", "14 h", "16 h"],
    freeRow: 1,
    freeCol: 4,
    freeLabel: "Libre",
  },
  chip: "Samedi — 11 h 00",
  dialogue: { ia: "Samedi 11 h, ça vous convient ?", client: "Parfait." },
  fiche: {
    title: "Fiche rendez-vous",
    rows: [
      { k: "Client", v: "Mme Roux" },
      { k: "Prestation", v: "Coupe" },
      { k: "Jour", v: "Samedi" },
      { k: "Heure", v: "11 h 00" },
    ],
  },
  captions: {
    appel: "Appel entrant",
    repond: "L'assistant répond",
    comprend: "L'IA comprend la demande",
    planning: "Vérifie le planning",
    creneau: "Propose un créneau",
    fiche: "Rédige la fiche",
    validation: "Le salon valide",
  },
  awaitingLabel: "En attente de validation",
  validatedLabel: "Validé par le salon",
  benefit: "Vous ne ratez plus un client.",
  closeVideo: "demos/coiffure_close_treated.mp4",
};

export const PHONE_SECTORS = { garage: GARAGE, restaurant: RESTAURANT, coiffure: COIFFURE };
