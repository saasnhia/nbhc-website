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

const REGULATED_SECTORS: Sector[] = ["pharma", "formation", "btp"];

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

export type AccompagnementTier =
  | "socle"
  | "suivi"
  | "suiviPlus"
  | "suiviRenforce"
  | "suiviRenforcePlus"
  | "etendu"
  | "etenduRenforce"
  | "etenduMaximal"
  | "surDevis";

export type AccompagnementReason =
  | "socle"
  | "pme"
  | "automations2to3"
  | "volume4plus"
  | "mesureSolo"
  | "perimetreReel"
  | "multiSite"
  | "regulatedSector"
  | "mesureMultiple"
  | "50plus";

export type AccompagnementResult = {
  tier: AccompagnementTier;
  /** Monthly price in euros, or null for "sur devis" (50+ salariés). */
  price: number | null;
  reasons: AccompagnementReason[];
};

/**
 * Ported 1:1 from the validated mockup. The price is never a summed formula
 * shown to the visitor — each combination maps to one of a fixed set of
 * round numbers, chosen because a single signal (PME size, sur-mesure
 * fragility, automation volume, regulated-sector monitoring burden) stacks
 * with the others rather than being computed live in front of the visitor.
 */
export function computeAccompagnement(
  inputs: SimulatorInputs
): AccompagnementResult {
  const { size, sector, automations, type, multiSite } = inputs;

  if (size === "50plus") {
    return { tier: "surDevis", price: null, reasons: ["50plus"] };
  }

  const regulated = REGULATED_SECTORS.includes(sector);
  const pmeSignal = size === "pme";
  const strongReasons: AccompagnementReason[] = [];
  if (multiSite) strongReasons.push("multiSite");
  if (regulated) strongReasons.push("regulatedSector");
  if (type === "mesure" && (automations === "2-3" || automations === "4plus")) {
    strongReasons.push("mesureMultiple");
  }

  if (strongReasons.length >= 1) {
    const count = Math.min(strongReasons.length, 3);
    const basePrices = [700, 1200, 2000];
    const pmePrices = [1000, 1600, 2000];
    const tiers: AccompagnementTier[] = ["etendu", "etenduRenforce", "etenduMaximal"];
    const price = (pmeSignal ? pmePrices : basePrices)[count - 1];
    const reasons = pmeSignal ? [...strongReasons, "pme" as const] : strongReasons;
    return { tier: tiers[count - 1], price, reasons };
  }

  const volumeSignal = automations === "4plus";
  const mesureSoloSignal = type === "mesure" && automations === "1";
  const stdBaseSignal =
    type === "standard" && (automations === "2-3" || automations === "4plus");
  const qualifies = pmeSignal || stdBaseSignal || mesureSoloSignal;

  if (!qualifies) {
    return { tier: "socle", price: 90, reasons: ["socle"] };
  }

  if (pmeSignal) {
    if (volumeSignal) {
      return { tier: "suiviRenforcePlus", price: 350, reasons: ["pme", "volume4plus"] };
    }
    if (mesureSoloSignal) {
      return { tier: "suiviRenforce", price: 290, reasons: ["pme", "mesureSolo"] };
    }
    if (stdBaseSignal) {
      return { tier: "suiviRenforce", price: 290, reasons: ["pme", "perimetreReel"] };
    }
    return { tier: "suivi", price: 190, reasons: ["pme"] };
  }

  if (volumeSignal) {
    return { tier: "suiviPlus", price: 250, reasons: ["volume4plus"] };
  }
  if (mesureSoloSignal) {
    return { tier: "suiviPlus", price: 250, reasons: ["mesureSolo"] };
  }
  return { tier: "suivi", price: 190, reasons: ["automations2to3"] };
}
