import { useTranslations } from "next-intl";
import Apparition from "./Apparition";

/* La méthode en quatre étapes, dessinée en code. Elle remplace une scène 3D que
   trois lecteurs successifs ont trouvée décorative : numéros masqués par les
   objets, étiquettes sans rattachement. Chaque étape dit maintenant ce qu'on y
   fait et ce que vous avez en main à la fin. */
const ETAPES = [1, 2, 3, 4] as const;

function Picto({ n }: { n: (typeof ETAPES)[number] }) {
  const commun = {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (n === 1) {
    // un échange
    return (
      <svg {...commun}>
        <path d="M3.5 5.5A2 2 0 0 1 5.5 3.5h9a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-3.5 3v-3a2 2 0 0 1-2-2z" />
      </svg>
    );
  }
  if (n === 2) {
    // un document écrit
    return (
      <svg {...commun}>
        <path d="M5.5 3h6l3.5 3.5V16a1 1 0 0 1-1 1h-8.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M11.5 3v3.5H15M7.5 10.5h5M7.5 13.5h3.5" />
      </svg>
    );
  }
  if (n === 3) {
    // des cas passés un par un
    return (
      <svg {...commun}>
        <path d="M4 5.5l1.5 1.5L8 4.5M4 10.5l1.5 1.5L8 9.5M4 15.5l1.5 1.5L8 14.5" />
        <path d="M11 5.5h5M11 10.5h5M11 15.5h5" />
      </svg>
    );
  }
  // une livraison
  return (
    <svg {...commun}>
      <path d="M3.5 6.5L10 3l6.5 3.5v7L10 17l-6.5-3.5z" />
      <path d="M3.5 6.5L10 10l6.5-3.5M10 10v7" />
    </svg>
  );
}

export default function Methode() {
  const t = useTranslations("howItWorks");

  return (
    <section id="comment-ca-marche" style={{ borderBottom: "1px solid var(--border)" }}>
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
          as="ol"
          enfants
          className="list-none m-0 p-0 grid min-[700px]:grid-cols-2 min-[1100px]:grid-cols-4 gap-x-8 gap-y-10 mt-16 max-[900px]:mt-10"
        >
          {ETAPES.map((n) => (
            <li key={n} className="flex flex-col" data-etape style={{ ["--i" as string]: n - 1 }}>
              {/* Le jalon et le trait : la chaîne se lit d'un coup d'œil sur
                  grand écran, et chaque étape reste lisible seule en pile. */}
              <div className="flex items-center" style={{ marginBottom: 20 }}>
                <span
                  className="inline-flex items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    flex: "none",
                    color: "var(--gold-light)",
                    background: "var(--surface)",
                    border: "1px solid var(--border-accent)",
                  }}
                >
                  <Picto n={n} />
                </span>
                <span
                  aria-hidden="true"
                  className="max-[1099px]:hidden"
                  style={{
                    flex: 1,
                    height: 1,
                    marginLeft: 12,
                    marginRight: -20,
                    background: n < 4 ? "var(--border-accent)" : "transparent",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "var(--gold-light)",
                  fontVariantNumeric: "tabular-nums",
                  marginBottom: 4,
                }}
              >
                {t("stepLabel", { n })} · {t(`step${n}Badge`)}
              </div>
              {/* Deux lignes réservées sur grand écran : un titre court ne fait
                  pas remonter le paragraphe de sa colonne. */}
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
                {t(`step${n}Title`)}
              </h3>
              <p
                className="m-0"
                style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-muted)" }}
              >
                {t(`step${n}Desc`)}
              </p>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: 16,
                }}
              >
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>
                    {t("outLabel")}
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.45, color: "var(--text)" }}>
                    {t(`step${n}Out`)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </Apparition>
      </div>
    </section>
  );
}
