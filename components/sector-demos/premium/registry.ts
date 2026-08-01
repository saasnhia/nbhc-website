// Registre des 9 démos pilotables.
//
// Deux moules seulement : les automatisations téléphoniques partagent
// PremiumDemo (le récit est le même), les six autres passent par DemoGroup2
// avec leur mise en scène propre. Le découpage en 8 étapes et l'instant de la
// validation sont identiques partout — c'est ce qui permet un seul lecteur.
import { PremiumDemo } from "./PremiumDemo";
import { DemoGroup2 } from "./DemoGroup2";
import { COIFFURE, GARAGE, RESTAURANT } from "./sectors";
import { BTP, COSMETIQUE, FORMATION, OPTICIEN, PHARMACIE, SPORT, type DemoSpec } from "./sectors2";
import type { SectorSpec } from "./sectors";

export type DemoKey =
  | "garage"
  | "restaurant"
  | "pharmacie"
  | "coiffure"
  | "opticien"
  | "btp"
  | "formation"
  | "cosmetique"
  | "sport";

type Entry =
  | { kind: "phone"; component: typeof PremiumDemo; props: { sector: SectorSpec } }
  | { kind: "other"; component: typeof DemoGroup2; props: { spec: DemoSpec } };

export const DEMO_REGISTRY: Record<DemoKey, Entry> = {
  garage: { kind: "phone", component: PremiumDemo, props: { sector: GARAGE } },
  restaurant: { kind: "phone", component: PremiumDemo, props: { sector: RESTAURANT } },
  coiffure: { kind: "phone", component: PremiumDemo, props: { sector: COIFFURE } },
  pharmacie: { kind: "other", component: DemoGroup2, props: { spec: PHARMACIE } },
  opticien: { kind: "other", component: DemoGroup2, props: { spec: OPTICIEN } },
  formation: { kind: "other", component: DemoGroup2, props: { spec: FORMATION } },
  cosmetique: { kind: "other", component: DemoGroup2, props: { spec: COSMETIQUE } },
  btp: { kind: "other", component: DemoGroup2, props: { spec: BTP } },
  sport: { kind: "other", component: DemoGroup2, props: { spec: SPORT } },
};

/** Clés de traduction des 8 étapes, par secteur. */
export const STEP_KEYS = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
  "step6",
  "step7",
  "step8",
] as const;
