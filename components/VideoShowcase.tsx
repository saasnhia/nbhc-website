"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AutomationFlow, { zipFlowSteps, type FlowStepKind } from "./AutomationFlow";
import PremiumDemoSection from "./sector-demos/premium/PremiumDemoSection";
import type { DemoKey } from "./sector-demos/premium/registry";

type ShowcaseKey =
  | "garage"
  | "restaurant"
  | "pharmacie"
  | "coiffure"
  | "opticien"
  | "btp"
  | "formation"
  | "cosmetique"
  | "sport";

// Order drives the tab strip. Sectors with a filmed demo lead — they're the
// most immediately convincing — new/text-only sectors follow.
const SHOWCASE_KEYS: ShowcaseKey[] = [
  "garage",
  "restaurant",
  "pharmacie",
  "coiffure",
  "opticien",
  "btp",
  "formation",
  "cosmetique",
  "sport",
];

const TAB_ICONS: Record<ShowcaseKey, string> = {
  garage: "🔧",
  restaurant: "🍽️",
  pharmacie: "💊",
  coiffure: "✂️",
  opticien: "👓",
  btp: "🏗️",
  formation: "🎓",
  cosmetique: "💄",
  sport: "🏋️",
};

// Les 9 secteurs sont desormais des demonstrations PILOTABLES : la
// composition Remotion est montee dans la page via @remotion/player, et le
// prospect avance lui-meme etape par etape. Les <video> demo-*.mp4 et leurs
// 9,9 Mo d'assets ont ete retires — le lecteur pese 49 Ko gzippes, charges
// paresseusement a l'entree dans le viewport.
//
// Un seul lecteur vit a la fois : PremiumDemoSection porte une `key` sur le
// secteur, ce qui force le demontage complet du precedent au changement
// d'onglet.

// Structural shape of each sector's flagship-automation diagram. Not
// translatable — labels come from messages/*.json (showcase.tabs.*.flow).
const FLOW_KINDS: FlowStepKind[] = ["trigger", "process", "action", "validation"];

export default function VideoShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseKey>("garage");
  const t = useTranslations("showcase");
  const reduceMotion = useReducedMotion();
  const flowSteps = zipFlowSteps(FLOW_KINDS, t.raw(`tabs.${activeTab}.flow`));

  return (
    <section
      id="en-action"
      className="relative overflow-hidden py-24 px-10 max-[900px]:px-5 max-[900px]:py-16 my-8 max-[900px]:my-4"
      style={{
        maxWidth: 1320,
        margin: "0 auto",
        borderRadius: 28,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.012) 38%, rgba(255,255,255,0.005) 100%)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        role="tablist"
        aria-label={t("tablistLabel")}
        className="flex flex-wrap gap-2.5 mb-12"
      >
        {SHOWCASE_KEYS.map((key) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(key)}
              data-cursor="link"
              className="relative flex items-center gap-2.5 text-[13px] font-medium px-5 py-3.5 rounded-xl transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap"
              style={{
                background: isActive ? "var(--gold-dim)" : "rgba(255,255,255,0.02)",
                border: isActive ? "1px solid var(--gold-border)" : "1px solid var(--border)",
                color: isActive ? "var(--gold-light)" : "var(--text-muted)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transform: isActive ? "translateY(-2px)" : "translateY(0)",
                boxShadow: isActive ? "0 10px 28px -12px rgba(196,151,58,0.45)" : "none",
              }}
            >
              <span aria-hidden="true" className="text-[15px] leading-none">
                {TAB_ICONS[key]}
              </span>
              {t(`tabs.${key}.label`)}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab}
          data-capture-frame={activeTab}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <PremiumDemoSection
            demoKey={activeTab as DemoKey}
            labels={t.raw(`premium.steps.${activeTab}`) as string[]}
            validateLabel={t("premium.validate")}
            hintLabel={t("premium.hint")}
            ariaLabel={`${t("premium.ariaLabel")} — ${t(`tabs.${activeTab}.name`)}`}
            stepsLabel={t("demoStage.stepsAriaLabel")}
            eyebrow={t("eyebrow")}
            title={t("title")}
            contextLine={t(`tabs.${activeTab}.name`)}
            benefit={t(`tabs.${activeTab}.benefit`)}
          />
        </motion.div>
      </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${activeTab}-caption`}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-center"
          >
            <div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase"
              style={{
                background: "var(--gold-dim)",
                color: "var(--gold-light)",
                border: "1px solid var(--gold-border)",
              }}
            >
              {t(`tabs.${activeTab}.label`)}
            </div>
            <div
              className="text-lg font-bold mb-2"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--text)",
                letterSpacing: "-0.3px",
              }}
            >
              {t(`tabs.${activeTab}.name`)}
            </div>
            <p
              className="text-sm mb-5"
              style={{ color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 640, margin: "0 auto" }}
            >
              {t(`tabs.${activeTab}.benefit`)}
            </p>

            {/* ROI callout: what frees up for the team, not a fabricated metric —
                NBHC has no client references to cite, so this stays qualitative. */}
            <p
              className="text-[13px] font-medium mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                color: "var(--gold-light)",
                background: "rgba(196,151,58,0.06)",
                border: "1px solid var(--gold-border)",
                maxWidth: 640,
              }}
            >
              <span aria-hidden="true">✦</span>
              {t(`tabs.${activeTab}.roi`)}
            </p>

            {/* Filmed sectors already show the mechanism on video — the flow
                diagram repeats it as a compact, always-legible strip so the
                "how it works" story never depends on the video autoplaying. */}
            {(
              <div
                className="mx-auto"
                style={{ maxWidth: 780 }}
              >
                <div
                  className="text-[11px] font-semibold tracking-[2px] uppercase mb-4"
                  style={{ color: "var(--text-dim)" }}
                >
                  {t("howLabel")}
                </div>
                <AutomationFlow
                  steps={flowSteps}
                  ariaLabel={t(`tabs.${activeTab}.name`)}
                  animated={!reduceMotion}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
    </section>
  );
}
