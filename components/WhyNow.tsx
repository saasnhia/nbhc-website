"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const QuestionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const RocketIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

export default function WhyNow() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("whyNow");

  const cards = [
    { Icon: ClockIcon, title: t("card1Title"), desc: t("card1Desc") },
    { Icon: QuestionIcon, title: t("card2Title"), desc: t("card2Desc") },
    { Icon: RocketIcon, title: t("card3Title"), desc: t("card3Desc") },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cardEls = el.querySelectorAll("[data-whynow-card]");
    gsap.set(cardEls, { opacity: 0, y: 40 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(cardEls, {
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
      id="pourquoi-maintenant"
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
        className="font-bold leading-tight mb-6"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 52px)",
          letterSpacing: "-1.5px",
          color: "var(--text)",
          maxWidth: 900,
        }}
      >
        {t("title")}
      </h2>
      <p
        className="text-[16px] font-light mb-14"
        style={{ color: "var(--text-muted)", maxWidth: 760, lineHeight: 1.7 }}
      >
        {t("subtitle")}
      </p>

      <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-5">
        {cards.map((c, i) => (
          <div
            key={i}
            data-whynow-card
            className="p-7 transition-colors duration-300"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="mb-5 inline-flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                background: "var(--gold-dim)",
                color: "var(--gold)",
                border: "1px solid var(--gold-border)",
              }}
            >
              <c.Icon />
            </div>
            <div
              className="text-lg font-bold mb-3"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--text)",
                letterSpacing: "-0.5px",
              }}
            >
              {c.title}
            </div>
            <p
              className="text-sm font-light"
              style={{ color: "var(--text-muted)", lineHeight: 1.65 }}
            >
              {c.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
