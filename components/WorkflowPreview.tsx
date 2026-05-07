"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";

type TabKey = "emails" | "leads" | "reports" | "custom";

const TAB_KEYS: TabKey[] = ["emails", "leads", "reports", "custom"];

const TAB_ICONS: Record<TabKey, string> = {
  emails: "📨",
  leads: "📋",
  reports: "📊",
  custom: "🔄",
};

const BEFORE_ICONS: Record<TabKey, string> = {
  emails: "📨",
  leads: "📋",
  reports: "📊",
  custom: "🔄",
};

function ArrowDesktop() {
  return (
    <div
      data-flow-arrow
      className="hidden md:flex items-center justify-center"
      aria-hidden
      style={{ flex: "0 0 auto", width: 32 }}
    >
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
        <path
          d="M2 10h26M22 4l6 6-6 6"
          stroke="#C4973A"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function ArrowMobile() {
  return (
    <div
      data-flow-arrow-mobile
      className="flex md:hidden items-center justify-center"
      aria-hidden
      style={{ height: 24 }}
    >
      <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
        <path
          d="M10 2v26M4 22l6 6 6-6"
          stroke="#C4973A"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function NbhcLogoMark() {
  return (
    <div
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 10,
        background: "linear-gradient(135deg, #C4973A 0%, #B8862E 100%)",
        boxShadow: "0 4px 16px rgba(196,151,58,0.3)",
      }}
    >
      <span
        style={{
          fontSize: 20,
          fontWeight: 900,
          color: "#fff",
          fontFamily: "var(--font-syne), system-ui, sans-serif",
          lineHeight: 1,
          letterSpacing: "-1px",
        }}
      >
        N
      </span>
    </div>
  );
}

export default function WorkflowPreview() {
  const [activeTab, setActiveTab] = useState<TabKey>("emails");
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  // Animate cards on tab change
  useEffect(() => {
    const wrap = cardsWrapRef.current;
    if (!wrap) return;
    const cards = wrap.querySelectorAll("[data-flow-card-content]");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", stagger: 0.04 }
    );
  }, [activeTab]);

  // Pulse arrows
  useEffect(() => {
    const root = arrowsRef.current;
    if (!root) return;
    const desktopArrows = root.querySelectorAll("[data-flow-arrow] svg");
    const mobileArrows = root.querySelectorAll("[data-flow-arrow-mobile] svg");

    const tweens: gsap.core.Tween[] = [];
    desktopArrows.forEach((el) => {
      tweens.push(
        gsap.to(el, {
          x: 5,
          duration: 0.75,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      );
    });
    mobileArrows.forEach((el) => {
      tweens.push(
        gsap.to(el, {
          y: 5,
          duration: 0.75,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      );
    });
    return () => tweens.forEach((t) => t.kill());
  }, []);

  const before = {
    title: t(`flow.${activeTab}.before.title`),
    sub: t(`flow.${activeTab}.before.sub`),
  };
  const after = {
    title: t(`flow.${activeTab}.after.title`),
    sub: t(`flow.${activeTab}.after.sub`),
  };

  const cardBaseStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    padding: 24,
    borderRadius: 12,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    textAlign: "left",
  };

  return (
    <div
      className="w-full"
      style={{ maxWidth: 920, margin: "0 auto", textAlign: "left" }}
    >
      {/* Tabs — 2×2 grid on desktop, 1 column on mobile (long sentence labels) */}
      <div
        role="tablist"
        aria-label="Workflow examples"
        className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-7"
      >
        {TAB_KEYS.map((key) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(key)}
              data-cursor="link"
              className="inline-flex items-center gap-2.5 text-[13px] font-medium px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer text-left"
              style={{
                background: isActive
                  ? "rgba(196,151,58,0.12)"
                  : "transparent",
                border: isActive
                  ? "1px solid var(--gold-border)"
                  : "1px solid rgba(255,255,255,0.06)",
                color: isActive ? "var(--gold-light)" : "#8C8880",
                letterSpacing: "0.1px",
                lineHeight: 1.35,
              }}
            >
              <span
                aria-hidden
                style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}
              >
                {TAB_ICONS[key]}
              </span>
              <span style={{ minWidth: 0 }}>{t(`flow.tabs.${key}`)}</span>
            </button>
          );
        })}
      </div>

      {/* Cards row */}
      <div
        ref={arrowsRef}
        className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2"
      >
        <div ref={cardsWrapRef} className="contents">
          {/* BEFORE */}
          <div
            data-flow-card-content
            style={{
              ...cardBaseStyle,
              background: "rgba(239,68,68,0.04)",
              border: "1px solid rgba(239,68,68,0.12)",
            }}
          >
            <div
              aria-hidden
              style={{ fontSize: 24, marginBottom: 12, lineHeight: 1 }}
            >
              {BEFORE_ICONS[activeTab]}
            </div>
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: 15,
                color: "#F0EDE6",
                letterSpacing: "-0.3px",
                marginBottom: 6,
                lineHeight: 1.25,
              }}
            >
              {before.title}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "#8C8880",
                lineHeight: 1.55,
              }}
            >
              {before.sub}
            </div>
          </div>

          <ArrowDesktop />
          <ArrowMobile />

          {/* NBHC center */}
          <div
            data-flow-card-content
            style={{
              ...cardBaseStyle,
              padding: 26,
              background: "rgba(196,151,58,0.06)",
              border: "1px solid rgba(196,151,58,0.25)",
              borderRadius: 14,
              boxShadow: "0 0 40px rgba(196,151,58,0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              transform: "scale(1.02)",
            }}
          >
            <div style={{ marginBottom: 12 }}>
              <NbhcLogoMark />
            </div>
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: 15,
                color: "var(--gold)",
                letterSpacing: "-0.3px",
                marginBottom: 8,
                lineHeight: 1.25,
              }}
            >
              {t("flow.center")}
            </div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                color: "var(--gold-light)",
                fontFamily: "var(--font-dm-sans)",
                letterSpacing: "0.4px",
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4ade80",
                  boxShadow: "0 0 8px rgba(74,222,128,0.6)",
                }}
              />
              <span>24/7</span>
            </div>
          </div>

          <ArrowDesktop />
          <ArrowMobile />

          {/* AFTER */}
          <div
            data-flow-card-content
            style={{
              ...cardBaseStyle,
              background: "rgba(34,197,94,0.04)",
              border: "1px solid rgba(34,197,94,0.12)",
            }}
          >
            <div
              aria-hidden
              style={{ fontSize: 24, marginBottom: 12, lineHeight: 1 }}
            >
              ✅
            </div>
            <div
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: 15,
                color: "#F0EDE6",
                letterSpacing: "-0.3px",
                marginBottom: 6,
                lineHeight: 1.25,
              }}
            >
              {after.title}
            </div>
            <div
              style={{
                fontSize: 12.5,
                color: "#8C8880",
                lineHeight: 1.55,
              }}
            >
              {after.sub}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
