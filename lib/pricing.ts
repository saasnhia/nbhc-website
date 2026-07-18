export type StructureSize = "indep" | "tpe" | "pme" | "50plus";
export type Sector =
  | "sport"
  | "asso"
  | "garage"
  | "btp"
  | "formation"
  | "pharma"
  | "resto"
  | "coiffure"
  | "cosmetique"
  | "boutique"
  | "immobilier"
  | "autre";
export type AutomationsCount = "1" | "2-3" | "4plus" | "dontknow";
export type AutomationType = "standard" | "mesure" | "dontknow";

export type SimulatorInputs = {
  size: StructureSize;
  sector: Sector;
  automations: AutomationsCount;
  type: AutomationType;
  multiSite: boolean;
};

export type BuildFallbackReason =
  | "dontknowAutomations"
  | "dontknowType"
  | "assoMesureMultiple";

export type BuildTier = "essentiel" | "surMesureLeger" | "surDevis";

export type BuildPriceKey =
  | "essentielSingle" // 1 automatisation standardisée : "à partir de 200 €"
  | "essentielRange" // 2-3 ou 4+ standardisées : "de 200 € à 2 000 €"
  | "surMesureLegerSingle" // 1 automatisation sur mesure : "à partir de 2 000 €"
  | "surMesureLegerRange" // 2-3 sur mesure : "de 2 000 € à 4 000 €"
  | "surMesureLegerAssoSolidaire" // asso + mesure + 1 : 1 000 € (2 000 € barré)
  | "surDevis"; // "sur devis"

export type BuildFeeReason = "50plus" | "automations4plus" | "multiSitePme";

export type BuildResult =
  | { kind: "fallback"; reason: BuildFallbackReason }
  | {
      kind: "tier";
      tier: BuildTier;
      priceKey: BuildPriceKey;
      priceStruck: boolean;
      /** Why Sur Devis triggered, regardless of whether a fee applies. Only set when tier === "surDevis". */
      triggerReason: BuildFeeReason | null;
      feeReason: BuildFeeReason | null; // non-null only when a fee actually applies
      showMultiSiteNote: boolean;
    };

/**
 * Ported 1:1 from the validated mockup (scratchpad/tarifs-mockup.html, v9).
 * The performance fee only ever applies within the Sur Devis branch, and only
 * when the trigger is a sur-mesure scenario — a 50+ headcount org that is
 * 100% standardisée reaches Sur Devis without a fee.
 */
export function computeBuildTier(inputs: SimulatorInputs): BuildResult {
  const { size, sector, automations, type, multiSite } = inputs;

  if (automations === "dontknow") {
    return { kind: "fallback", reason: "dontknowAutomations" };
  }
  if (type === "dontknow") {
    return { kind: "fallback", reason: "dontknowType" };
  }
  if (
    sector === "asso" &&
    type === "mesure" &&
    (automations === "2-3" || automations === "4plus")
  ) {
    return { kind: "fallback", reason: "assoMesureMultiple" };
  }

  const surDevisTriggered =
    size === "50plus" ||
    (type === "mesure" &&
      (automations === "4plus" || (multiSite && size === "pme")));

  if (surDevisTriggered) {
    const triggerReason: BuildFeeReason =
      size === "50plus"
        ? "50plus"
        : automations === "4plus"
          ? "automations4plus"
          : "multiSitePme";
    return {
      kind: "tier",
      tier: "surDevis",
      priceKey: "surDevis",
      priceStruck: false,
      triggerReason,
      feeReason: type === "mesure" ? triggerReason : null,
      showMultiSiteNote: false,
    };
  }

  // `size` can no longer be "50plus" here: that branch always returns above.
  // No `size !== "pme"` guard: a PME+multiSite only skips this branch when
  // type === "mesure" (caught by the Sur Devis check above) — a PME with
  // multiSite and a standardised automation reaches this point and still
  // needs the note.
  const showMultiSiteNote = multiSite;

  if (type === "standard") {
    return {
      kind: "tier",
      tier: "essentiel",
      priceKey: automations === "1" ? "essentielSingle" : "essentielRange",
      priceStruck: false,
      triggerReason: null,
      feeReason: null,
      showMultiSiteNote,
    };
  }

  // type === "mesure" from here on (2-3 or 1 automation only — 4plus was
  // already intercepted by the Sur Devis check above).
  if (sector === "asso" && automations === "1") {
    return {
      kind: "tier",
      tier: "surMesureLeger",
      priceKey: "surMesureLegerAssoSolidaire",
      priceStruck: true,
      triggerReason: null,
      feeReason: null,
      showMultiSiteNote,
    };
  }

  return {
    kind: "tier",
    tier: "surMesureLeger",
    priceKey: automations === "1" ? "surMesureLegerSingle" : "surMesureLegerRange",
    priceStruck: false,
    triggerReason: null,
    feeReason: null,
    showMultiSiteNote,
  };
}

export type AccompagnementReason =
  | "standard1"
  | "pme"
  | "automations2to3"
  | "volume4plus"
  | "mesureSolo"
  | "mesure2to3"
  | "mesure4plus"
  | "50plus";

export type AccompagnementResult = {
  /** Monthly price in euros, or null for "sur devis" (50+ salariés). */
  price: number | null;
  reasons: AccompagnementReason[];
};

type AccompagnementCellReason = Exclude<AccompagnementReason, "pme" | "50plus">;

/**
 * Direct lookup table, no multiplier, no cap: price = base(taille, type, nombre).
 * 6 automation profiles × 2 size rows = 12 cells. 50+ is a separate early return.
 */
const ACCOMPAGNEMENT_TABLE: Record<AccompagnementCellReason, { base: number; pme: number }> = {
  standard1: { base: 90, pme: 190 },
  automations2to3: { base: 190, pme: 290 },
  volume4plus: { base: 250, pme: 350 },
  mesureSolo: { base: 250, pme: 350 },
  mesure2to3: { base: 500, pme: 600 },
  mesure4plus: { base: 700, pme: 800 },
};

export function computeAccompagnement(
  inputs: SimulatorInputs
): AccompagnementResult {
  const { size, automations, type } = inputs;

  if (size === "50plus") {
    return { price: null, reasons: ["50plus"] };
  }

  const cellReason: AccompagnementCellReason =
    type === "standard"
      ? automations === "1"
        ? "standard1"
        : automations === "2-3"
          ? "automations2to3"
          : "volume4plus"
      : automations === "1"
        ? "mesureSolo"
        : automations === "2-3"
          ? "mesure2to3"
          : "mesure4plus";

  const cell = ACCOMPAGNEMENT_TABLE[cellReason];
  const pmeSignal = size === "pme";
  const price = pmeSignal ? cell.pme : cell.base;
  const reasons: AccompagnementReason[] = pmeSignal ? ["pme", cellReason] : [cellReason];

  return { price, reasons };
}
