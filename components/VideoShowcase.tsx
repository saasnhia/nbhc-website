"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import DemoVideo, { type DemoVideoName } from "./DemoVideo";
import AutomationFlow, { zipFlowSteps, type FlowStepKind } from "./AutomationFlow";

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

// Sectors with a filmed DemoVideo asset — the rest lean entirely on the
// simplified flow diagram (same AutomationFlow component used on every
// sector landing page) until a video exists for them too.
const VIDEO_SECTORS: DemoVideoName[] = ["garage", "restaurant", "pharmacie", "coiffure"];

function isVideoSector(key: ShowcaseKey): key is DemoVideoName {
  return (VIDEO_SECTORS as ShowcaseKey[]).includes(key);
}

// Structural shape of each sector's flagship-automation diagram. Not
// translatable — labels come from messages/*.json (showcase.tabs.*.flow).
const FLOW_KINDS: FlowStepKind[] = ["trigger", "process", "action", "validation"];

export default function VideoShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseKey>("garage");
  const t = useTranslations("showcase");
  const reduceMotion = useReducedMotion();
  const hasVideo = isVideoSector(activeTab);
  const flowSteps = zipFlowSteps(FLOW_KINDS, t.raw(`tabs.${activeTab}.flow`));

  return (
    <section
      id="en-action"
      className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      <div
        className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
        style={{ color: "var(--gold)" }}
      >
        <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
        {t("eyebrow")}
      </div>
      <h2
        className="font-bold leading-tight mb-4"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 52px)",
          letterSpacing: "-1.5px",
          color: "var(--text)",
        }}
      >
        {t("title")}
      </h2>
      <p
        className="text-[16px] font-light mb-10"
        style={{ color: "var(--text-muted)", maxWidth: 700, lineHeight: 1.7 }}
      >
        {t("subtitle")}
      </p>

      <div
        role="tablist"
        aria-label={t("tablistLabel")}
        className="scrollbar-hide flex gap-2.5 mb-10 overflow-x-auto -mx-1 px-1 pb-1"
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

      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <style>{`
          @keyframes nbhc-grid-pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 0.75; }
          }
          .nbhc-showcase-grid {
            background-image: radial-gradient(circle, rgba(196,151,58,0.4) 1px, transparent 1px);
            background-size: 24px 24px;
            animation: nbhc-grid-pulse 4.5s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .nbhc-showcase-grid { animation: none; opacity: 0.4; }
          }
        `}</style>
        {/* Elegant frame: gradient bezel wrapping the visual, not a bare rectangle */}
        <div
          className="relative p-2 max-[600px]:p-1.5"
          style={{
            borderRadius: 20,
            background:
              "linear-gradient(155deg, rgba(196,151,58,0.22), rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.02))",
            border: "1px solid var(--border-accent)",
            boxShadow: "0 30px 90px -35px rgba(0,0,0,0.65)",
          }}
        >
          <div
            className="relative overflow-hidden"
            data-capture-frame={activeTab}
            style={{
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "#000",
            }}
          >
            {/* Ambient dot-grid + corner glow — the same fine grid and warm gold
                bloom seen in the Higgsfield motion reference, reproduced natively
                so it renders behind every sector, filmed or diagrammed. */}
            <div className="nbhc-showcase-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{ background: "radial-gradient(circle at 15% 15%, rgba(196,151,58,0.16), transparent 55%)" }}
            />
            {/* mode="wait" + initial={false}: the outgoing tab's visual is fully
                unmounted before the next one mounts — never more than one video
                in the DOM at once, and no fade-in flash on first paint. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeTab}
                className="relative"
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.985 }}
                transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {hasVideo ? (
                  <DemoVideo name={activeTab} ariaLabel={t(`tabs.${activeTab}.name`)} />
                ) : (
                  <div
                    className="relative w-full flex items-center justify-center px-6 py-10 max-[600px]:px-4 max-[600px]:py-8"
                    style={{ aspectRatio: "16 / 9" }}
                  >
                    <AutomationFlow
                      steps={flowSteps}
                      ariaLabel={t(`tabs.${activeTab}.name`)}
                      animated={!reduceMotion}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

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
            {hasVideo && (
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
      </div>
    </section>
  );
}
