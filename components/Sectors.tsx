"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

export default function Sectors() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("sectors");

  // Niches NBHC actively targets, each with its own dedicated, indexable
  // page (see SEO_AUDIT_STRATEGIE.md GATE 2). Opticien added for the
  // multi-store prospect pipeline — not yet field-canvassed like the others.
  const sectors = [
    {
      icon: "🏋️",
      name: t("sportName"),
      pain: t("sportPain"),
      solution: t("sportSolution"),
      footnote: t("sportFootnote"),
      href: t("sportHref"),
    },
    {
      icon: "🤝",
      name: t("sportAssoName"),
      pain: t("sportAssoPain"),
      solution: t("sportAssoSolution"),
      footnote: t("sportAssoFootnote"),
      href: t("sportAssoHref"),
    },
    {
      icon: "🔧",
      name: t("garageName"),
      pain: t("garagePain"),
      solution: t("garageSolution"),
      footnote: t("garageFootnote"),
      href: t("garageHref"),
    },
    {
      icon: "🏗️",
      name: t("btpName"),
      pain: t("btpPain"),
      solution: t("btpSolution"),
      footnote: t("btpFootnote"),
      href: t("btpHref"),
    },
    {
      icon: "🎓",
      name: t("formationName"),
      pain: t("formationPain"),
      solution: t("formationSolution"),
      footnote: t("formationFootnote"),
      href: t("formationHref"),
    },
    {
      icon: "💊",
      name: t("pharmaName"),
      pain: t("pharmaPain"),
      solution: t("pharmaSolution"),
      footnote: t("pharmaFootnote"),
      href: t("pharmaHref"),
    },
    {
      icon: "👓",
      name: t("opticienName"),
      pain: t("opticienPain"),
      solution: t("opticienSolution"),
      footnote: t("opticienFootnote"),
      href: t("opticienHref"),
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-sector-card]");
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
          stagger: 0.08,
        });
      },
    });

    cards.forEach((card) => {
      const c = card as HTMLElement;
      const onEnter = () =>
        gsap.to(c, { y: -4, duration: 0.3, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(c, { y: 0, duration: 0.3, ease: "power2.out" });
      c.addEventListener("mouseenter", onEnter);
      c.addEventListener("mouseleave", onLeave);
      (c as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
        c.removeEventListener("mouseenter", onEnter);
        c.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      st.kill();
      cards.forEach((card) => {
        const c = card as HTMLElement & { _cleanup?: () => void };
        c._cleanup?.();
      });
    };
  }, []);

  return (
    <section
      id="secteurs"
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

      <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-5">
        {sectors.map((s) => (
          <Link
            key={s.name}
            href={s.href}
            data-sector-card
            data-cursor="card"
            className="p-7 block no-underline transition-colors duration-300 group"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="text-4xl mb-5">{s.icon}</div>
            <div
              className="text-xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--text)",
                letterSpacing: "-0.5px",
              }}
            >
              {s.name}
            </div>
            <p
              className="text-sm mb-3"
              style={{ color: "var(--text-muted)", lineHeight: 1.65 }}
            >
              <span style={{ color: "#f87171", fontWeight: 600 }}>↳</span>{" "}
              {s.pain}
            </p>
            <p
              className="text-sm mb-5"
              style={{ color: "var(--text)", lineHeight: 1.65 }}
            >
              <span style={{ color: "#4ade80", fontWeight: 600 }}>✓</span>{" "}
              {s.solution}
            </p>
            <div
              className="text-[12px] font-bold tracking-wide pt-4"
              style={{
                color: "var(--gold)",
                borderTop: "1px solid var(--border)",
              }}
            >
              {s.footnote}
            </div>
            <div
              className="mt-4 text-[13px] font-medium transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: "var(--gold-light)" }}
            >
              {t("learnMore")}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-14 text-center">
        <p
          className="text-[15px] font-light mb-5"
          style={{ color: "var(--text-muted)", maxWidth: 600, margin: "0 auto 20px" }}
        >
          {t("outroText")}
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--gold)", color: "#0a0a0b" }}
        >
          {t("outroCta")}
        </a>
      </div>
    </section>
  );
}
