"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const QUESTIONS = [1, 2, 3, 4, 5] as const;

/* Les rangées ne sont plus masquées au chargement puis révélées au défilement :
   la section est lisible telle qu'elle est servie. Une réponse s'ouvre et se
   ferme sans animer de hauteur. */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = useTranslations("faq");

  return (
    <section
      id="faq"
      className="py-28 px-10 max-[900px]:px-5 max-[900px]:py-16"
      style={{ maxWidth: 880, margin: "0 auto" }}
    >
      <div style={{ fontSize: 14, color: "var(--gold-light)", marginBottom: 12 }}>
        {t("eyebrow")}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 600,
          fontSize: "clamp(28px, 3.4vw, 44px)",
          lineHeight: 1.12,
          letterSpacing: "-0.02em",
          color: "var(--text)",
          marginBottom: 16,
        }}
      >
        {t("title")}
      </h2>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: 16,
          lineHeight: 1.7,
          marginBottom: 40,
        }}
      >
        {t("subtitle")}
      </p>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {QUESTIONS.map((n, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={n} style={{ borderBottom: "1px solid var(--border)" }}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 text-left bg-transparent border-0 cursor-pointer"
                style={{ padding: "20px 0" }}
                aria-expanded={isOpen}
                aria-controls={`faq-reponse-${n}`}
              >
                <span
                  style={{
                    fontSize: 17,
                    lineHeight: 1.4,
                    fontWeight: 500,
                    color: "var(--text)",
                  }}
                >
                  {t(`q${n}`)}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden
                  className="flex-shrink-0"
                  style={{
                    color: isOpen ? "var(--gold-light)" : "var(--text-muted)",
                    transform: isOpen ? "rotate(45deg)" : "none",
                    transition: "transform 150ms ease-out, color 150ms ease-out",
                  }}
                >
                  <path
                    d="M8 2.5v11M2.5 8h11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div
                id={`faq-reponse-${n}`}
                hidden={!isOpen}
                style={{
                  paddingBottom: 24,
                  maxWidth: 720,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--text-muted)",
                }}
              >
                {t(`a${n}`)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
