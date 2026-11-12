import type { ComponentType } from "react";
import { useTranslations } from "next-intl";
import VlogyzApercu from "./mockups/VlogyzApercu";
import DevizlyApercu from "./mockups/DevizlyApercu";
import InternbulletDemo from "./mockups/InternbulletDemo";

type Produit = {
  id: "devizly" | "vlogyz" | "internbullet";
  Maquette: ComponentType;
  href: string;
  externe: boolean;
  enProduction?: boolean;
  /** Largeur maximale de la maquette : le devis rendu est un portrait, on le
      tient a la hauteur de la colonne de texte plutot que de la depasser. */
  largeurMaquette: number;
  /** Citation du fondateur, sous la description. */
  avecCitation?: boolean;
  texteAGauche: boolean;
};

const PRODUITS: Produit[] = [
  {
    id: "devizly",
    Maquette: DevizlyApercu,
    href: "https://devizly.fr",
    externe: true,
    enProduction: true,
    largeurMaquette: 520,
    texteAGauche: true,
  },
  {
    id: "vlogyz",
    Maquette: VlogyzApercu,
    href: "https://vlogyz.com",
    externe: true,
    largeurMaquette: 520,
    texteAGauche: false,
  },
  {
    id: "internbullet",
    Maquette: InternbulletDemo,
    href: "mailto:contact@nbhc.fr?subject=internbullet",
    externe: false,
    avecCitation: true,
    largeurMaquette: 520,
    texteAGauche: true,
  },
];

function Fleche() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 7h10M7 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Portfolio() {
  const t = useTranslations("products");

  return (
    <section id="produits">
      <div
        className="px-10 max-[900px]:px-5 pt-28 max-[900px]:pt-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div style={{ maxWidth: 720 }}>
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

        {PRODUITS.map((p) => {
          const Maquette = p.Maquette;
          return (
            <article
              key={p.id}
              id={p.id}
              className="grid items-center gap-12 min-[1000px]:gap-20 min-[1000px]:grid-cols-2 py-20 max-[900px]:py-12"
              style={{
                borderBottom: "1px solid var(--border)",
                scrollMarginTop: 72,
              }}
            >
              <div className={p.texteAGauche ? "" : "min-[1000px]:order-2"}>
                <div
                  className="inline-flex items-center gap-2"
                  style={{
                    fontSize: 13,
                    color: p.enProduction ? "var(--text)" : "var(--text-muted)",
                    marginBottom: 16,
                  }}
                >
                  {p.enProduction && (
                    <span
                      aria-hidden
                      style={{ width: 6, height: 6, borderRadius: 3, background: "#7FB58A" }}
                    />
                  )}
                  {t(`${p.id}Badge`)}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 600,
                    fontSize: "clamp(26px, 2.8vw, 36px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                    marginBottom: 8,
                  }}
                >
                  {t(`${p.id}Name`)}
                </h3>
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: "var(--text)",
                    marginBottom: 16,
                    maxWidth: 480,
                  }}
                >
                  {t(`${p.id}For`)}
                </p>
                {/* Trois étapes numérotées plutôt qu'un paragraphe : on lit ce que
                    fait la personne, ce que fait l'outil, et ce qui en sort. */}
                <ol className="list-none m-0 p-0" style={{ maxWidth: 480 }}>
                  {(t.raw(`${p.id}Steps`) as string[]).map((etape, i) => (
                    <li
                      key={etape}
                      className="grid"
                      style={{
                        gridTemplateColumns: "28px minmax(0, 1fr)",
                        padding: "10px 0",
                        borderTop: "1px solid var(--border)",
                        fontSize: 15,
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--gold-light)",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ color: "var(--text)" }}>{etape}</span>
                    </li>
                  ))}
                </ol>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--text-muted)",
                    paddingTop: 12,
                    borderTop: "1px solid var(--border)",
                    marginBottom: 24,
                    maxWidth: 480,
                  }}
                >
                  {t(`${p.id}Note`)}
                </p>

                {p.avecCitation && (
                  <blockquote
                    className="m-0"
                    style={{
                      borderLeft: "2px solid var(--gold)",
                      paddingLeft: 16,
                      marginBottom: 24,
                      maxWidth: 480,
                    }}
                  >
                    <p
                      className="m-0"
                      style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text)" }}
                    >
                      {t(`${p.id}Quote`)}
                    </p>
                    <footer
                      style={{ marginTop: 8, fontSize: 13, color: "var(--text-muted)" }}
                    >
                      {t(`${p.id}QuoteBy`)}
                    </footer>
                  </blockquote>
                )}

                <a
                  href={p.href}
                  {...(p.externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="lien-or inline-flex items-center gap-2 text-[15px] font-medium"
                >
                  {t(`${p.id}Link`)}
                  <Fleche />
                </a>
              </div>

              <div className={p.texteAGauche ? "" : "min-[1000px]:order-1"}>
                <div className="mx-auto" style={{ maxWidth: p.largeurMaquette }}>
                  <Maquette />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
