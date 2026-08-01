// Découpage en étapes pilotables d'une démo premium.
//
// Les bornes viennent directement de SHOTS (theme.ts) : ce sont les mêmes
// plans que la vidéo rendue, donc aucune dérive possible entre les deux.
//
// L'étape de validation est la seule à porter une `gateAt` : la lecture
// s'arrête là et attend le clic du prospect. Rien ne s'auto-valide.
import { SHOTS } from "./theme";

export type DemoStep = {
  key: string;
  /** Frame de départ, incluse. */
  from: number;
  /** Frame de fin, exclue. */
  to: number;
  /**
   * Frame où la lecture s'interrompt pour attendre une action de
   * l'utilisateur. Absent partout sauf sur l'étape de validation.
   */
  gateAt?: number;
};

// La composition place le clic à la frame locale 30 du plan de validation.
const VALIDATION_CLICK_LOCAL = 30;

export const PHONE_STEPS: DemoStep[] = [
  { key: "appel", ...bounds(SHOTS.appel) },
  { key: "repond", ...bounds(SHOTS.repond) },
  { key: "comprend", ...bounds(SHOTS.comprend) },
  { key: "planning", ...bounds(SHOTS.planning) },
  { key: "creneau", ...bounds(SHOTS.creneau) },
  { key: "fiche", ...bounds(SHOTS.fiche) },
  {
    key: "validation",
    ...bounds(SHOTS.validation),
    gateAt: SHOTS.validation.from + VALIDATION_CLICK_LOCAL,
  },
  { key: "benefice", ...bounds(SHOTS.benefice) },
];

function bounds(shot: { from: number; dur: number }) {
  return { from: shot.from, to: shot.from + shot.dur };
}

/**
 * Position du bouton « Valider » dans le repère de la composition
 * (1920 x 1080), en pourcentage — l'overlay HTML se cale dessus quelle que
 * soit la taille du lecteur, puisque la composition est mise à l'échelle
 * uniformément.
 *
 * Dérivé de la mise en page de la fiche : rangée de validation large de
 * 1280 centrée, bouton aligné à droite (~218 px), échelle caméra ~0,99 au
 * moment du clic.
 */
// Valeurs relevées sur capture : la dérivation théorique plaçait l'overlay
// 21 px trop haut et le bouton de la composition dépassait en dessous.
export const VALIDATE_BUTTON_POSITION = { xPct: 77.5, yPct: 74.1, wPct: 10.9, hPct: 10.1 };
