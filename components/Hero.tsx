"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import Link from "next/link";
import AgentFlowIllustration from "./AgentFlowIllustration";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<SVGSVGElement>(null);
  const circle2Ref = useRef<SVGSVGElement>(null);
  const t = useTranslations("hero");
  const locale = useLocale();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        el.querySelector("[data-eyebrow]"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7 },
        0
      );

      tl.fromTo(
        el.querySelectorAll("[data-hero-line]"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        0.15
      );

      tl.fromTo(
        el.querySelector("[data-subtitle]"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.6
      );

      tl.fromTo(
        el.querySelector("[data-flow]"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.75
      );

      tl.fromTo(
        el.querySelector("[data-ctas]"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.0
      );

      tl.fromTo(
        el.querySelector("[data-trust]"),
        { opacity: 0 },
        { opacity: 0.5, duration: 0.6 },
        1.15
      );

      if (circle1Ref.current) {
        gsap.to(circle1Ref.current, { rotation: 360, duration: 40, repeat: -1, ease: "none" });
      }
      if (circle2Ref.current) {
        gsap.to(circle2Ref.current, { rotation: -360, duration: 60, repeat: -1, ease: "none" });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Decorative circles */}
      <svg
        ref={circle1Ref}
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        className="absolute pointer-events-none"
        style={{ right: "-12%", bottom: "-25%", opacity: 0.05 }}
      >
        <circle cx="300" cy="300" r="298" stroke="#C4973A" strokeWidth="1" />
        <circle cx="300" cy="300" r="240" stroke="#C4973A" strokeWidth="0.5" />
      </svg>
      <svg
        ref={circle2Ref}
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        className="absolute pointer-events-none"
        style={{ left: "-10%", top: "10%", opacity: 0.04 }}
      >
        <circle cx="200" cy="200" r="198" stroke="#C4973A" strokeWidth="1" />
        <circle cx="200" cy="200" r="150" stroke="#C4973A" strokeWidth="0.5" />
      </svg>

      <div
        className="flex flex-col justify-center items-center px-10 max-[900px]:px-5 pt-28 pb-12 max-[900px]:pt-20 max-[900px]:pb-8 relative z-1 text-center"
        style={{ maxWidth: 1200, margin: "0 auto", minHeight: "auto" }}
      >
        <div
          data-eyebrow
          className="inline-flex items-center gap-2 text-[11px] font-medium tracking-widest uppercase mb-5"
          style={{ color: "var(--gold)", opacity: 0 }}
        >
          <span className="block w-6 h-px" style={{ background: "var(--gold)" }} />
          {t("eyebrow")}
        </div>

        <h1
          className="font-extrabold mb-5"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(32px, 5.2vw, 64px)",
            lineHeight: "0.95",
            letterSpacing: "-2px",
            color: "var(--text)",
            maxWidth: 880,
          }}
        >
          <span data-hero-line style={{ display: "block", opacity: 0 }}>
            {t("titleLine1")}
          </span>
          <span data-hero-line style={{ display: "block", opacity: 0, color: "var(--gold)" }}>
            {t("titleLine2")}
          </span>
          <span data-hero-line style={{ display: "block", opacity: 0 }}>
            {t("titleLine3")}
          </span>
        </h1>

        <p
          data-subtitle
          className="text-base font-light mb-8 max-[900px]:mb-7"
          style={{
            color: "var(--text-muted)",
            maxWidth: 620,
            lineHeight: 1.6,
            opacity: 0,
          }}
        >
          {t("subtitle")}
        </p>

        {/* Interactive flow diagram */}
        <div data-flow className="w-full mb-8 max-[900px]:mb-7" style={{ opacity: 0 }}>
          <AgentFlowIllustration />
        </div>

        {/* CTAs */}
        <div
          data-ctas
          className="flex items-center justify-center gap-4 flex-wrap"
          style={{ opacity: 0 }}
        >
          <Link
            href={`/${locale}/contact`}
            data-cursor="link"
            className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--gold)", color: "#0a0a0b", border: "none" }}
          >
            {t("ctaPrimary")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href="#how-it-works"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-[15px] font-normal px-7 py-3.5 rounded-md no-underline transition-all duration-200"
            style={{
              background: "transparent",
              color: "var(--text-muted)",
              border: "1px solid var(--border-accent)",
            }}
          >
            {t("ctaSecondary")} ↓
          </a>
        </div>

        <div
          data-trust
          className="flex items-center justify-center gap-2 mt-7 text-xs flex-wrap"
          style={{
            color: "var(--text-dim)",
            opacity: 0,
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.5px",
          }}
        >
          <span>{t("trust1")}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{t("trust2")}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{t("trust3")}</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>{t("trust4")}</span>
        </div>
      </div>
    </section>
  );
}
