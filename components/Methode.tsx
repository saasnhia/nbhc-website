import { useTranslations } from "next-intl";

/* La méthode, en quatre étapes qui se suivent vraiment : les numéros portent
   l'ordre, le trait la continuité. Chaque étape dit ce qu'on y fait et ce que
   vous avez en main à la fin. Rien ne bouge : l'ordre se lit d'un regard. */
const ETAPES = [1, 2, 3, 4] as const;

export default function Methode() {
  const t = useTranslations("howItWorks");

  return (
    <section id="comment-ca-marche" style={{ borderBottom: "1px solid var(--border)" }}>
      <div
        className="px-10 max-[900px]:px-5 py-28 max-[900px]:py-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ maxWidth: 760 }}>
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
          <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7 }}>
            {t("subtitle")}
          </p>
        </div>

        <ol className="list-none m-0 p-0 grid min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4 gap-x-8 gap-y-12 mt-16 max-[900px]:mt-10">
          {ETAPES.map((n) => (
            <li key={n} className="flex flex-col" style={{ borderTop: "1px solid var(--gold-border)", paddingTop: 20 }}>
              <div className="flex items-baseline justify-between gap-4" style={{ marginBottom: 14 }}>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 500,
                    fontSize: 40,
                    lineHeight: 1,
                    color: "var(--gold-light)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {n}
                </span>
                <span style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "right" }}>
                  {t(`step${n}Badge`)}
                </span>
              </div>
              <h3
                className="min-[1100px]:min-h-[48px]"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 600,
                  fontSize: 19,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                  marginBottom: 8,
                }}
              >
                <span className="sr-only">{t("stepLabel", { n })} : </span>
                {t(`step${n}Title`)}
              </h3>
              <p className="m-0" style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-muted)" }}>
                {t(`step${n}Desc`)}
              </p>
              <p className="m-0" style={{ marginTop: "auto", paddingTop: 18, fontSize: 14, lineHeight: 1.5 }}>
                <span className="block" style={{ color: "var(--text-muted)", fontSize: 13 }}>
                  {t("outLabel")}
                </span>
                <span style={{ color: "var(--text)" }}>{t(`step${n}Out`)}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
