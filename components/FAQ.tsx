"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations("faq");

  const items = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
    { q: t("q5"), a: t("a5") },
    { q: t("q6"), a: t("a6") },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rows = el.querySelectorAll("[data-faq-item]");
    gsap.set(rows, { opacity: 0, y: 20 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(rows, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
      style={{ maxWidth: 1000, margin: "0 auto" }}
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
        className="text-[16px] font-light mb-12"
        style={{ color: "var(--text-muted)", maxWidth: 600, lineHeight: 1.7 }}
      >
        {t("subtitle")}
      </p>

      <div className="flex flex-col gap-3">
        {items.map((it, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              data-faq-item
              style={{
                background: "rgba(255,255,255,0.02)",
                border: isOpen
                  ? "1px solid var(--gold-border)"
                  : "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                data-cursor="link"
                className="w-full flex items-center justify-between gap-4 p-5 max-[700px]:p-4 text-left bg-transparent border-0 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span
                  className="text-[15px] font-semibold"
                  style={{
                    fontFamily: "var(--font-syne)",
                    color: isOpen ? "var(--gold-light)" : "var(--text)",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {it.q}
                </span>
                <span
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: isOpen ? "var(--gold)" : "var(--gold-dim)",
                    color: isOpen ? "#0a0a0b" : "var(--gold)",
                    transition: "all 0.2s",
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 2v10M2 7h10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                style={{
                  maxHeight: isOpen ? 400 : 0,
                  opacity: isOpen ? 1 : 0,
                  transition: "max-height 0.4s ease, opacity 0.3s ease",
                  overflow: "hidden",
                }}
              >
                <div
                  className="px-5 pb-5 max-[700px]:px-4 max-[700px]:pb-4 text-[14px] font-light"
                  style={{ color: "var(--text-muted)", lineHeight: 1.75 }}
                >
                  {it.a}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
