"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import DemoVideo from "./DemoVideo";

type ShowcaseKey = "garage" | "restaurant" | "pharmacie";

const SHOWCASE_KEYS: ShowcaseKey[] = ["garage", "restaurant", "pharmacie"];

export default function VideoShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseKey>("garage");
  const t = useTranslations("showcase");

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
        className="flex flex-wrap gap-2 mb-8"
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
              className="text-[13px] font-medium px-5 py-3 rounded-lg transition-all duration-200 cursor-pointer"
              style={{
                background: isActive ? "var(--gold-dim)" : "rgba(255,255,255,0.02)",
                border: isActive
                  ? "1px solid var(--gold-border)"
                  : "1px solid var(--border)",
                color: isActive ? "var(--gold-light)" : "var(--text-muted)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
            >
              {t(`tabs.${key}.label`)}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div
          style={{
            borderRadius: "var(--radius)",
            overflow: "hidden",
            border: "1px solid var(--border)",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <DemoVideo
            key={activeTab}
            name={activeTab}
            ariaLabel={t(`tabs.${activeTab}.name`)}
          />
        </div>
        <div className="mt-6 text-center">
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
            className="text-sm"
            style={{ color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 640, margin: "0 auto" }}
          >
            {t(`tabs.${activeTab}.benefit`)}
          </p>
        </div>
      </div>
    </section>
  );
}
