"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

type Plan = {
  badge: string;
  name: string;
  price: string;
  priceSecondary?: string;
  desc: string;
  features: string[];
  highlighted: boolean;
};

function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      style={{ flexShrink: 0, marginTop: 5 }}
    >
      <path
        d="M2 7.5l3 3 7-7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("pricing");

  const plans: Plan[] = [
    {
      badge: t("quickWinBadge"),
      name: t("quickWinName"),
      price: t("quickWinPrice"),
      desc: t("quickWinDesc"),
      features: [
        t("quickWinFeature1"),
        t("quickWinFeature2"),
        t("quickWinFeature3"),
        t("quickWinFeature4"),
      ],
      highlighted: false,
    },
    {
      badge: t("standardBadge"),
      name: t("standardName"),
      price: t("standardPrice"),
      priceSecondary: t("standardPriceSecondary"),
      desc: t("standardDesc"),
      features: [
        t("standardFeature1"),
        t("standardFeature2"),
        t("standardFeature3"),
        t("standardFeature4"),
        t("standardFeature5"),
        t("standardFeature6"),
      ],
      highlighted: true,
    },
    {
      badge: t("customBadge"),
      name: t("customName"),
      price: t("customPrice"),
      desc: t("customDesc"),
      features: [
        t("customFeature1"),
        t("customFeature2"),
        t("customFeature3"),
        t("customFeature4"),
        t("customFeature5"),
      ],
      highlighted: false,
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-pricing-card]");
    gsap.set(cards, { opacity: 0, y: 40 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
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
        className="text-[16px] font-light mb-14"
        style={{ color: "var(--text-muted)", maxWidth: 700, lineHeight: 1.7 }}
      >
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-5 items-stretch">
        {plans.map((p) => (
          <div
            key={p.name}
            data-pricing-card
            className="p-7 max-[900px]:p-6 flex flex-col relative"
            style={{
              background: p.highlighted
                ? "rgba(196,151,58,0.06)"
                : "rgba(255,255,255,0.02)",
              border: p.highlighted
                ? "1px solid var(--gold-border)"
                : "1px solid var(--border)",
              borderRadius: "var(--radius)",
              backdropFilter: "blur(8px)",
              boxShadow: p.highlighted
                ? "0 8px 40px rgba(196,151,58,0.12)"
                : "none",
              transform: p.highlighted ? "translateY(-4px)" : "none",
            }}
          >
            <div
              className="text-[10px] font-bold tracking-[2px] uppercase mb-3 inline-block self-start px-2.5 py-1 rounded-full"
              style={{
                color: p.highlighted ? "#0a0a0b" : "var(--gold-light)",
                background: p.highlighted ? "var(--gold)" : "var(--gold-dim)",
                border: p.highlighted ? "none" : "1px solid var(--gold-border)",
              }}
            >
              {p.badge}
            </div>
            <div
              className="text-2xl font-bold mb-3"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--text)",
                letterSpacing: "-0.5px",
              }}
            >
              {p.name}
            </div>
            <div
              className="text-xl font-bold mb-1"
              style={{
                fontFamily: "var(--font-syne)",
                color: p.highlighted ? "var(--gold)" : "var(--text)",
                letterSpacing: "-0.5px",
              }}
            >
              {p.price}
            </div>
            {p.priceSecondary && (
              <div
                className="text-[12px] font-medium mb-4"
                style={{ color: "var(--gold-light)" }}
              >
                {p.priceSecondary}
              </div>
            )}
            {!p.priceSecondary && <div className="mb-4" />}
            <p
              className="text-sm font-light mb-6"
              style={{ color: "var(--text-muted)", lineHeight: 1.65 }}
            >
              {p.desc}
            </p>

            <ul
              className="flex flex-col gap-2.5 mb-7 pt-5"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {p.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[13px] font-light"
                  style={{ color: "var(--text)", lineHeight: 1.55 }}
                >
                  <CheckIcon color={p.highlighted ? "var(--gold)" : "#4ade80"} />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex items-center justify-center gap-2 text-[14px] font-medium px-5 py-3 rounded-md no-underline transition-all duration-200 hover:opacity-90 mt-auto"
              style={{
                background: p.highlighted ? "var(--gold)" : "transparent",
                color: p.highlighted ? "#0a0a0b" : "var(--gold-light)",
                border: p.highlighted ? "none" : "1px solid var(--gold-border)",
              }}
            >
              {t("ctaButton")}
            </a>
          </div>
        ))}
      </div>

      <div
        className="mt-12 p-6 max-[900px]:p-5 text-center"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
        }}
      >
        <p
          className="text-[14px] font-light mb-3"
          style={{ color: "var(--text)", lineHeight: 1.7 }}
        >
          🔓 {t("footnote1")}
        </p>
        <p
          className="text-[13px] font-light"
          style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
        >
          {t("footnote2")}
        </p>
      </div>
    </section>
  );
}
