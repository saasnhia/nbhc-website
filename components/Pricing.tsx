"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PricingPlanCard from "./PricingPlanCard";

gsap.registerPlugin(ScrollTrigger);

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("pricing");
  const tA = useTranslations("tarifs.blocA");
  const locale = useLocale();

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
        <div data-pricing-card className="flex flex-col h-full [&>div]:flex-1 [&>div]:flex [&>div]:flex-col">
          <PricingPlanCard
            badge={tA("essentielBadge")}
            tag={tA("essentielTag")}
            name={tA("essentielName")}
            price={tA("essentielPrice")}
            priceSub={tA("essentielPriceSub")}
            desc={tA("essentielDesc")}
            features={[
              tA("essentielFeature1"),
              tA("essentielFeature2"),
              tA("essentielFeature3"),
              tA("essentielFeature4"),
            ]}
          />
        </div>
        <div data-pricing-card className="flex flex-col h-full [&>div]:flex-1 [&>div]:flex [&>div]:flex-col">
          <PricingPlanCard
            tag={tA("surMesureLegerTag")}
            name={tA("surMesureLegerName")}
            price={tA("surMesureLegerPrice")}
            desc={tA("surMesureLegerDesc")}
            features={[
              tA("surMesureLegerFeature1"),
              tA("surMesureLegerFeature2"),
              tA("surMesureLegerFeature3"),
              tA("surMesureLegerFeature4"),
            ]}
          />
        </div>
        <div data-pricing-card className="flex flex-col h-full [&>div]:flex-1 [&>div]:flex [&>div]:flex-col">
          <PricingPlanCard
            badge={tA("surDevisBadge")}
            tag={tA("surDevisTag")}
            name={tA("surDevisName")}
            price={tA("surDevisPrice")}
            desc={tA("surDevisDesc")}
            features={[
              tA("surDevisFeature1"),
              tA("surDevisFeature2"),
              tA("surDevisFeature3"),
              tA("surDevisFeature4"),
              tA("surDevisFeature5"),
            ]}
            feeNote={tA("surDevisFeeNote")}
          />
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href={`/${locale}/tarifs`}
          data-cursor="link"
          className="inline-flex items-center justify-center gap-2 text-[14px] font-medium px-6 py-3 rounded-md no-underline transition-all duration-200 hover:opacity-90"
          style={{
            background: "var(--gold)",
            color: "#0a0a0b",
          }}
        >
          {t("ctaButton")}
        </Link>
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
          className="text-[13px] font-light mb-3"
          style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
        >
          {t("footnote2")}
        </p>
        <p
          className="text-[13px] font-light"
          style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
        >
          {t("footnote3")}
        </p>
      </div>
    </section>
  );
}
