"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  computeAccompagnement,
  computeBuildTier,
  type AccompagnementReason,
  type AutomationsCount,
  type AutomationType,
  type Sector,
  type SimulatorInputs,
  type StructureSize,
} from "../lib/pricing";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

type SectorMeta = {
  hrefSlug: string | null;
  suggested: boolean;
  labelKey: string;
  autoKeys: readonly [string, string, string];
};

const SECTOR_META: Record<Sector, SectorMeta> = {
  sport: {
    hrefSlug: "automatisation-salle-de-sport",
    suggested: false,
    labelKey: "sectorLabelSport",
    autoKeys: ["sectorAutoSport1", "sectorAutoSport2", "sectorAutoSport3"],
  },
  asso: {
    hrefSlug: "automatisation-association-sportive",
    suggested: false,
    labelKey: "sectorLabelAsso",
    autoKeys: ["sectorAutoAsso1", "sectorAutoAsso2", "sectorAutoAsso3"],
  },
  garage: {
    hrefSlug: "automatisation-garage-automobile",
    suggested: false,
    labelKey: "sectorLabelGarage",
    autoKeys: ["sectorAutoGarage1", "sectorAutoGarage2", "sectorAutoGarage3"],
  },
  btp: {
    hrefSlug: "automatisation-artisan-btp",
    suggested: false,
    labelKey: "sectorLabelBtp",
    autoKeys: ["sectorAutoBtp1", "sectorAutoBtp2", "sectorAutoBtp3"],
  },
  formation: {
    hrefSlug: "automatisation-organisme-formation",
    suggested: false,
    labelKey: "sectorLabelFormation",
    autoKeys: ["sectorAutoFormation1", "sectorAutoFormation2", "sectorAutoFormation3"],
  },
  pharma: {
    hrefSlug: "automatisation-pharmacie",
    suggested: false,
    labelKey: "sectorLabelPharma",
    autoKeys: ["sectorAutoPharma1", "sectorAutoPharma2", "sectorAutoPharma3"],
  },
  resto: {
    hrefSlug: "automatisation-restaurant",
    suggested: false,
    labelKey: "sectorLabelResto",
    autoKeys: ["sectorAutoResto1", "sectorAutoResto2", "sectorAutoResto3"],
  },
  coiffure: {
    hrefSlug: "automatisation-salon-de-coiffure",
    suggested: false,
    labelKey: "sectorLabelCoiffure",
    autoKeys: ["sectorAutoCoiffure1", "sectorAutoCoiffure2", "sectorAutoCoiffure3"],
  },
  boutique: {
    hrefSlug: null,
    suggested: true,
    labelKey: "sectorLabelBoutique",
    autoKeys: ["sectorAutoBoutique1", "sectorAutoBoutique2", "sectorAutoBoutique3"],
  },
  immobilier: {
    hrefSlug: null,
    suggested: true,
    labelKey: "sectorLabelImmobilier",
    autoKeys: ["sectorAutoImmobilier1", "sectorAutoImmobilier2", "sectorAutoImmobilier3"],
  },
  autre: { hrefSlug: null, suggested: false, labelKey: "", autoKeys: ["", "", ""] },
};

const SIZE_OPTIONS: { value: StructureSize; key: string }[] = [
  { value: "indep", key: "sizeIndep" },
  { value: "tpe", key: "sizeTpe" },
  { value: "pme", key: "sizePme" },
  { value: "50plus", key: "size50plus" },
];

const SECTOR_OPTIONS: { value: Sector; key: string }[] = [
  { value: "sport", key: "sectorSport" },
  { value: "asso", key: "sectorAsso" },
  { value: "garage", key: "sectorGarage" },
  { value: "btp", key: "sectorBtp" },
  { value: "formation", key: "sectorFormation" },
  { value: "pharma", key: "sectorPharma" },
  { value: "resto", key: "sectorResto" },
  { value: "coiffure", key: "sectorCoiffure" },
  { value: "boutique", key: "sectorBoutique" },
  { value: "immobilier", key: "sectorImmobilier" },
  { value: "autre", key: "sectorAutre" },
];

const AUTOMATIONS_OPTIONS: { value: AutomationsCount; key: string }[] = [
  { value: "1", key: "automationsOne" },
  { value: "2-3", key: "automationsTwoThree" },
  { value: "4plus", key: "automationsFourPlus" },
  { value: "dontknow", key: "automationsDontKnow" },
];

const TYPE_OPTIONS: { value: AutomationType; key: string }[] = [
  { value: "standard", key: "typeStandard" },
  { value: "mesure", key: "typeMesure" },
  { value: "dontknow", key: "typeDontKnow" },
];

const REASON_KEY: Record<AccompagnementReason, string> = {
  socle: "reasonSocle",
  pme: "reasonPme",
  automations2to3: "reasonAutomations2to3",
  volume4plus: "reasonVolume4plus",
  mesureSolo: "reasonMesureSolo",
  perimetreReel: "reasonPerimetreReel",
  multiSite: "reasonMultiSite",
  regulatedSector: "reasonRegulatedSector",
  mesureMultiple: "reasonMesureMultiple",
  "50plus": "reason50plus",
};

const ACC_TIER_KEY: Record<string, string> = {
  socle: "accTierSocle",
  suivi: "accTierSuivi",
  suiviPlus: "accTierSuiviPlus",
  suiviRenforce: "accTierSuiviRenforce",
  suiviRenforcePlus: "accTierSuiviRenforcePlus",
  etendu: "accTierEtendu",
  etenduRenforce: "accTierEtenduRenforce",
  etenduMaximal: "accTierEtenduMaximal",
  surDevis: "accTierSurDevis",
};

function PillGroup<T extends string>({
  name,
  options,
  value,
  onChange,
  t,
}: {
  name: string;
  options: { value: T; key: string }[];
  value: T;
  onChange: (v: T) => void;
  t: (key: string) => string;
}) {
  const uid = useId();
  return (
    <div className="pt-pillgroup">
      {options.map((opt) => {
        const id = `${uid}-${opt.value}`;
        return (
          <span key={opt.value}>
            <input
              type="radio"
              name={name}
              id={id}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <label htmlFor={id}>{t(opt.key)}</label>
          </span>
        );
      })}
    </div>
  );
}

export default function PricingSimulator() {
  const t = useTranslations("tarifs.simulator");
  const locale = useLocale();
  const [size, setSize] = useState<StructureSize>("tpe");
  const [sector, setSector] = useState<Sector>("sport");
  const [automations, setAutomations] = useState<AutomationsCount>("1");
  const [type, setType] = useState<AutomationType>("standard");
  const [multiSite, setMultiSite] = useState(false);
  const [accompagnementOn, setAccompagnementOn] = useState(true);
  const accompagnementCheckboxId = useId();

  const inputs: SimulatorInputs = { size, sector, automations, type, multiSite };
  const build = computeBuildTier(inputs);
  const accompagnement = build.kind === "tier" ? computeAccompagnement(inputs) : null;
  const sectorMeta = SECTOR_META[sector];

  let badge = "";
  let price = "";
  let priceStruck: string | null = null;
  let message = "";
  let features: string[] = [];
  let feeText: string | null = null;

  if (build.kind === "fallback") {
    if (build.reason === "dontknowAutomations") {
      badge = t("fallbackDontknowAutomationsBadge");
      message = t("fallbackDontknowAutomationsMessage");
    } else if (build.reason === "dontknowType") {
      badge = t("fallbackDontknowTypeBadge");
      message = t("fallbackDontknowTypeMessage");
    } else {
      badge = t("fallbackAssoMesureMultipleBadge");
      message = t("fallbackAssoMesureMultipleMessage");
    }
  } else if (build.tier === "essentiel") {
    badge = t("tierEssentielBadge");
    if (build.priceKey === "essentielSingle") {
      price = t("priceEssentielSingle");
      message = t("tierEssentielSingleMessage");
    } else {
      price = t("priceEssentielRange");
      message = t("tierEssentielRangeMessage");
    }
    features = [
      t("featuresEssentiel1"),
      t("featuresEssentiel2"),
      t("featuresEssentiel3"),
      t("featuresEssentiel4"),
    ];
  } else if (build.tier === "surMesureLeger") {
    if (build.priceKey === "surMesureLegerAssoSolidaire") {
      badge = t("tierSurMesureLegerAssoBadge");
      price = t("priceSurMesureLegerAssoFinal");
      priceStruck = t("priceSurMesureLegerAssoStruck");
      message = t("tierSurMesureLegerAssoMessage");
      features = [t("featuresAsso1"), t("featuresAsso2"), t("featuresAsso3")];
    } else {
      badge = t("tierSurMesureLegerBadge");
      if (build.priceKey === "surMesureLegerSingle") {
        price = t("priceSurMesureLegerSingle");
        message = t("tierSurMesureLegerSingleMessage");
      } else {
        price = t("priceSurMesureLegerRange");
        message = t("tierSurMesureLegerRangeMessage");
      }
      features = [
        t("featuresSurMesureLeger1"),
        t("featuresSurMesureLeger2"),
        t("featuresSurMesureLeger3"),
        t("featuresSurMesureLeger4"),
        t("featuresSurMesureLeger5"),
      ];
    }
  } else {
    badge = t("tierSurDevisBadge");
    price = t("priceSurDevis");
    message =
      build.triggerReason === "50plus"
        ? t("tierSurDevisMessage50plus")
        : build.triggerReason === "automations4plus"
          ? t("tierSurDevisMessageAutomations4plus")
          : t("tierSurDevisMessageMultiSitePme");
    features = [
      t("featuresSurDevis1"),
      t("featuresSurDevis2"),
      t("featuresSurDevis3"),
      t("featuresSurDevis4"),
      t("featuresSurDevis5"),
    ];
    if (build.feeReason) {
      feeText = t("feeNote");
    }
  }

  const accompagnementReasonText = accompagnement
    ? accompagnement.reasons.map((r) => t(REASON_KEY[r])).join(" + ") + "."
    : "";
  const accompagnementTierLabel = accompagnement ? t(ACC_TIER_KEY[accompagnement.tier]) : "";
  const accompagnementPriceText = accompagnement
    ? accompagnement.price === null
      ? t("priceSurDevis")
      : `${accompagnement.price} €/mois`
    : "";

  const isFallback = build.kind === "fallback";
  const showRecurring = build.kind === "tier";
  const showMultiSiteNote = build.kind === "tier" && build.showMultiSiteNote;

  const lostItems = [t("lost1"), t("lost2"), t("lost3")];
  if (sector === "pharma" || sector === "formation" || sector === "btp") {
    lostItems.push(t("lost4Regulated"));
  }

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-accent)",
        borderRadius: "var(--radius)",
        padding: 32,
      }}
      className="max-[760px]:!p-[22px]"
    >
      <style>{`
        .pt-sim-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 32px; }
        .pt-pillgroup { display: flex; flex-wrap: wrap; gap: 8px; }
        .pt-pillgroup input { position: absolute; opacity: 0; width: 1px; height: 1px; }
        .pt-pillgroup label {
          position: relative; cursor: pointer; font-size: 13px; color: var(--text-muted);
          background: var(--card); border: 1px solid var(--border); border-radius: 999px;
          padding: 9px 16px; transition: border-color .15s ease, color .15s ease, background .15s ease;
          display: inline-block;
        }
        .pt-pillgroup input:checked + label {
          border-color: var(--gold); color: var(--gold-light); background: var(--gold-dim);
        }
        .pt-pillgroup input:focus-visible + label {
          outline: 2px solid var(--gold-light); outline-offset: 2px;
        }
        .pt-toggle-row {
          display: flex; align-items: flex-start; gap: 12px; cursor: pointer;
          background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-sm);
          padding: 14px 16px;
        }
        .pt-toggle-row.is-on { border-color: var(--gold-border); background: rgba(196,151,58,.05); }
        .pt-toggle-row input { margin-top: 3px; width: 16px; height: 16px; accent-color: var(--gold); flex-shrink: 0; }
        .pt-result-included { list-style: none; margin: 18px 0 0; padding: 16px 0 0; border-top: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; }
        .pt-result-included li { font-size: 13.5px; color: var(--text-muted); display: flex; gap: 8px; }
        .pt-result-included li::before { content: "✓"; color: var(--gold); font-weight: 700; flex-shrink: 0; }
        .pt-recurring-lost ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .pt-recurring-lost li { font-size: 13px; color: var(--text-muted); line-height: 1.6; display: flex; gap: 9px; }
        .pt-recurring-lost li::before { content: "–"; color: #D98C5F; font-weight: 700; flex-shrink: 0; }
        .pt-sector-list { list-style: none; margin: 0 0 12px; padding: 0; font-size: 13.5px; color: var(--text-muted); }
        .pt-sector-list li { padding: 4px 0; }
        .pt-sector-list li::before { content: "→ "; color: var(--gold); }
        @media (max-width: 760px) {
          .pt-sim-grid { grid-template-columns: 1fr; gap: 24px; }
          .pt-result-included { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="pt-sim-grid">
        <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
          <legend style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>
            {t("q1Legend")}
          </legend>
          <PillGroup name="size" options={SIZE_OPTIONS} value={size} onChange={setSize} t={t} />
        </fieldset>

        <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
          <legend style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>
            {t("q2Legend")}
          </legend>
          <PillGroup name="sector" options={SECTOR_OPTIONS} value={sector} onChange={setSector} t={t} />
        </fieldset>

        <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
          <legend style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>
            {t("q3Legend")}
          </legend>
          <PillGroup
            name="automations"
            options={AUTOMATIONS_OPTIONS}
            value={automations}
            onChange={setAutomations}
            t={t}
          />
        </fieldset>

        <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
          <legend style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>
            {t("q4Legend")}
          </legend>
          <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6, margin: "0 0 10px" }}>
            {t("q4Hint")}
          </p>
          <PillGroup name="type" options={TYPE_OPTIONS} value={type} onChange={setType} t={t} />
        </fieldset>

        <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
          <legend style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>
            {t("q5Legend")}
          </legend>
          <div className="pt-pillgroup">
            <span>
              <input
                type="radio"
                name="multiSite"
                id="multiSite-non"
                checked={!multiSite}
                onChange={() => setMultiSite(false)}
              />
              <label htmlFor="multiSite-non">{t("multiSiteNon")}</label>
            </span>
            <span>
              <input
                type="radio"
                name="multiSite"
                id="multiSite-oui"
                checked={multiSite}
                onChange={() => setMultiSite(true)}
              />
              <label htmlFor="multiSite-oui">{t("multiSiteOui")}</label>
            </span>
          </div>
        </fieldset>

        <fieldset style={{ border: "none", margin: 0, padding: 0 }}>
          <legend style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 10 }}>
            {t("accompagnementLegend")}
          </legend>
          <label
            className={`pt-toggle-row${accompagnementOn ? " is-on" : ""}`}
            htmlFor={accompagnementCheckboxId}
          >
            <input
              type="checkbox"
              id={accompagnementCheckboxId}
              checked={accompagnementOn}
              onChange={(e) => setAccompagnementOn(e.target.checked)}
            />
            <span>
              <span style={{ fontSize: 13.5, color: "var(--text)", fontWeight: 600, display: "block" }}>
                {t("accompagnementLabel")}
              </span>
              <span style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2, display: "block" }}>
                {t("accompagnementSub")}
              </span>
            </span>
          </label>
        </fieldset>

        <div style={{ gridColumn: "1/-1", borderTop: "1px solid var(--border)", margin: "4px 0" }} />

        <div
          style={{
            gridColumn: "1/-1",
            marginTop: 8,
            padding: 28,
            borderRadius: "var(--radius)",
            background: "var(--card)",
            border: isFallback ? "1px solid var(--border-accent)" : "1px solid var(--gold-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 6,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: isFallback ? "var(--text-muted)" : "var(--gold-light)",
                background: isFallback ? "rgba(255,255,255,.04)" : "var(--gold-dim)",
                border: isFallback ? "1px solid var(--border-accent)" : "1px solid var(--gold-border)",
                borderRadius: 999,
                padding: "5px 12px",
              }}
            >
              {badge}
            </span>
            {price && (
              <span
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--gold-light)",
                }}
              >
                {priceStruck && (
                  <s style={{ fontSize: "0.65em", fontWeight: 400, color: "var(--text-dim)" }}>
                    {priceStruck}
                  </s>
                )}{" "}
                {price}
              </span>
            )}
          </div>
          <p style={{ fontSize: 15, color: "var(--text)", lineHeight: 1.7, margin: "14px 0 0" }}>
            {message}
          </p>

          {features.length > 0 && (
            <ul className="pt-result-included">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}

          {feeText && (
            <p
              style={{
                fontSize: 13,
                color: "var(--text-muted)",
                lineHeight: 1.6,
                margin: "14px 0 0",
                padding: "10px 14px",
                background: "rgba(255,255,255,.02)",
                border: "1px solid var(--border)",
                borderLeft: "2px solid #D98C5F",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {feeText}
            </p>
          )}

          {showRecurring && (
            <div
              style={{
                marginTop: 20,
                paddingTop: 18,
                borderTop: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13.5 }}>
                <span style={{ color: "var(--text-muted)" }}>
                  {t("infraLabel")}
                  <span style={{ display: "block", fontSize: 11.5, color: "var(--text-dim)", marginTop: 2 }}>
                    {t("infraSub")}
                  </span>
                </span>
                <span style={{ color: "var(--text)", fontWeight: 600 }}>{t("infraValue")}</span>
              </div>

              {accompagnementOn && accompagnement ? (
                <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13.5 }}>
                  <span style={{ color: "var(--text-muted)" }}>
                    {t("accompagnementLinePrefix")} {accompagnementTierLabel}
                    <span
                      style={{ display: "block", fontSize: 11.5, color: "var(--text-dim)", marginTop: 2 }}
                    >
                      {accompagnementReasonText}
                    </span>
                  </span>
                  <span style={{ color: "var(--gold-light)", fontWeight: 600 }}>
                    {accompagnementPriceText}
                  </span>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 16, fontSize: 13.5 }}>
                    <span style={{ color: "var(--text-muted)" }}>{t("accompagnementLegend")}</span>
                    <span style={{ color: "var(--text)", fontWeight: 600 }}>
                      {t("accompagnementNotRetained")}
                    </span>
                  </div>
                  <div
                    className="pt-recurring-lost"
                    style={{
                      padding: "16px 18px",
                      background: "rgba(217,140,95,.06)",
                      border: "1px solid rgba(217,140,95,.3)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: "#D98C5F",
                        textTransform: "uppercase",
                        letterSpacing: 0.6,
                        marginBottom: 10,
                      }}
                    >
                      {t("lostTitle")}
                    </div>
                    <ul>
                      {lostItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div
                      style={{
                        marginTop: 12,
                        paddingTop: 12,
                        borderTop: "1px solid rgba(217,140,95,.2)",
                        fontSize: 12.5,
                        color: "var(--text-dim)",
                        lineHeight: 1.6,
                      }}
                    >
                      {t("lostKept")}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {showMultiSiteNote && (
            <p
              style={{
                fontSize: 13,
                color: "var(--gold-light)",
                background: "rgba(196,151,58,.05)",
                border: "1px solid var(--gold-border)",
                borderRadius: "var(--radius-sm)",
                padding: "10px 14px",
                marginTop: 16,
              }}
            >
              {t("multiSiteNote")}
            </p>
          )}

          {sectorMeta.labelKey && (
            <div style={{ marginTop: 22, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
              <h4
                style={{
                  fontSize: 12.5,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  color: "var(--text-dim)",
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                {sectorMeta.suggested ? t("sectorSuggestedTitle") : t("sectorRelevantTitle")}
              </h4>
              <ul className="pt-sector-list">
                {sectorMeta.autoKeys.map((key) => (
                  <li key={key}>{t(key)}</li>
                ))}
              </ul>
              {sectorMeta.hrefSlug ? (
                <a
                  href={`/${locale}/${sectorMeta.hrefSlug}`}
                  style={{ color: "var(--gold-light)", textDecoration: "none", fontSize: 13.5, fontWeight: 600 }}
                >
                  {t("sectorLinkPrefix")} {t(sectorMeta.labelKey)} →
                </a>
              ) : sectorMeta.suggested ? (
                <p style={{ fontSize: 12.5, color: "var(--text-dim)", margin: 0 }}>
                  {t("sectorSuggestedNote")}
                </p>
              ) : null}
            </div>
          )}

          <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 18, fontStyle: "italic" }}>
            {t("disclaimer")}
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 20,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14.5,
              fontWeight: 600,
              padding: "13px 26px",
              borderRadius: 6,
              background: "var(--gold)",
              color: "#0a0a0b",
              textDecoration: "none",
            }}
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>
    </div>
  );
}
