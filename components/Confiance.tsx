import { useTranslations } from "next-intl";
import Apparition from "./Apparition";

/* Une jeune entreprise sans client livré en sur-mesure ne gagne rien à le
   cacher : elle le dit, montre ce qu'elle a réellement, et retire le risque à
   celui qui hésite. Deux colonnes : ce qui existe, ce qui vous protège. */
const FAITS = ["f1", "f2"] as const;
const GARANTIES = ["g1", "g2", "g3", "g4"] as const;

function Coche() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ flex: "none", marginTop: 3, color: "var(--gold-light)" }}
    >
      <path
        d="M4 9.5l3.2 3.2L14 5.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Confiance() {
  const t = useTranslations("trust");

  return (
    <section id="confiance" style={{ borderBottom: "1px solid var(--border)" }}>
      <div
        className="px-10 max-[900px]:px-5 py-28 max-[900px]:py-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ maxWidth: 760 }}>
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
          <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7 }}>
            {t("subtitle")}
          </p>
        </div>

        <Apparition
          enfants
          className="grid gap-12 min-[1000px]:gap-20 min-[1000px]:grid-cols-2 mt-16 max-[900px]:mt-10"
        >
          <div data-etape style={{ ["--i" as string]: 0 }}>
            <h3 style={{ fontSize: 17, fontWeight: 500, color: "var(--text)", marginBottom: 8 }}>
              {t("factsTitle")}
            </h3>
            <ul className="list-none m-0 p-0">
              {FAITS.map((f) => (
                <li
                  key={f}
                  className="grid"
                  style={{
                    gridTemplateColumns: "minmax(0, 1fr) auto",
                    columnGap: 16,
                    padding: "16px 0",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span>
                    <span
                      className="block"
                      style={{ fontSize: 16, lineHeight: 1.4, color: "var(--text)" }}
                    >
                      {t(`${f}Title`)}
                    </span>
                    <span
                      className="block"
                      style={{
                        marginTop: 4,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                      }}
                    >
                      {t(`${f}Text`)}
                    </span>
                  </span>
                  <a
                    href={t(`${f}Href`)}
                    {...(t(`${f}Href`).startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="lien-or whitespace-nowrap"
                    style={{ fontSize: 14, lineHeight: "22px" }}
                  >
                    {t(`${f}Link`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-etape
            style={{
              ["--i" as string]: 1,
              padding: 28,
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 16,
            }}
          >
            <h3 style={{ fontSize: 17, fontWeight: 500, color: "var(--text)", marginBottom: 16 }}>
              {t("guaranteesTitle")}
            </h3>
            <ul className="list-none m-0 p-0 flex flex-col" style={{ gap: 16 }}>
              {GARANTIES.map((g) => (
                <li key={g} className="flex items-start gap-3">
                  <Coche />
                  <span>
                    <span
                      className="block"
                      style={{ fontSize: 16, lineHeight: 1.4, color: "var(--text)" }}
                    >
                      {t(`${g}Title`)}
                    </span>
                    <span
                      className="block"
                      style={{
                        marginTop: 2,
                        fontSize: 14,
                        lineHeight: 1.6,
                        color: "var(--text-muted)",
                      }}
                    >
                      {t(`${g}Text`)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Apparition>
      </div>
    </section>
  );
}
