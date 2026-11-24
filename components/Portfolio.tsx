import { useTranslations } from "next-intl";
import EcranReel from "./EcranReel";
import Apparition from "./Apparition";

type IdProduit = "devizly" | "vlogyz";

type Produit = {
  id: IdProduit;
  href: string;
  externe: boolean;
  enProduction?: boolean;
};

const PRODUITS: Produit[] = [
  { id: "devizly", href: "https://devizly.fr", externe: true, enProduction: true },
  { id: "vlogyz", href: "https://vlogyz.com", externe: true },
];

/* Les écrans de chaque produit. Sur grand écran l'application s'affiche en
   pleine largeur, lisible, avec un second écran posé dessus ; sur téléphone on
   ne garde que l'écran en hauteur, le seul qui reste lisible à 350 px. */
function Ecrans({ id }: { id: IdProduit }) {
  const t = useTranslations("products");

  if (id === "devizly") {
    return (
      <div className="grid items-start gap-6 min-[900px]:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]">
        <EcranReel
          className="max-[899px]:hidden"
          nom="devizly-nouveau-devis"
          largeurs={[830]}
          width={830}
          height={787}
          alt={t("devizlyAlt1")}
          barre="devizly.fr · Nouveau devis"
          sizes="640px"
        />
        <EcranReel
          className="min-[900px]:mt-16 max-[899px]:mx-auto"
          style={{ maxWidth: 460 }}
          nom="devizly-devis-client"
          largeurs={[667]}
          width={667}
          height={898}
          alt={t("devizlyAlt2")}
          barre={t("devizlyBar2")}
          sizes="(max-width: 899px) calc(100vw - 40px), 460px"
        />
      </div>
    );
  }

  return (
    <EcranReel
      className="mx-auto"
      style={{ maxWidth: 960 }}
      nom="vlogyz-broll"
      largeurs={[800, 1360]}
      width={1360}
      height={800}
      alt={t("vlogyzAlt1")}
      barre={t("vlogyzBar1")}
      sizes="(max-width: 1040px) calc(100vw - 80px), 960px"
    />
  );
}

function Fleche() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
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

        {PRODUITS.map((p) => (
          <article
            key={p.id}
            id={p.id}
            className="py-20 max-[900px]:py-12"
            style={{ borderBottom: "1px solid var(--border)", scrollMarginTop: 72 }}
          >
            {/* En-tête : à gauche ce que c'est, à droite ce qui se passe. */}
            <div className="grid gap-10 min-[900px]:gap-20 min-[900px]:grid-cols-2 mb-12 max-[900px]:mb-8">
              <div>
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
                      aria-hidden="true"
                      style={{ width: 6, height: 6, borderRadius: 3, background: "#7FB58A" }}
                    />
                  )}
                  {t(`${p.id}Badge`)}
                </div>
                <h3
                  translate="no"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontWeight: 600,
                    fontSize: "clamp(30px, 3.4vw, 44px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                    marginBottom: 12,
                  }}
                >
                  {t(`${p.id}Name`)}
                </h3>
                <p
                  style={{
                    fontSize: 18,
                    lineHeight: 1.5,
                    color: "var(--text)",
                    marginBottom: 20,
                    maxWidth: 460,
                  }}
                >
                  {t(`${p.id}For`)}
                </p>
                <a
                  href={p.href}
                  {...(p.externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="lien-or inline-flex items-center gap-2 text-[15px] font-medium"
                >
                  {t(`${p.id}Link`)}
                  <Fleche />
                </a>
              </div>

              <div>
                <ol className="list-none m-0 p-0">
                  {(t.raw(`${p.id}Steps`) as string[]).map((etape, i) => (
                    <li
                      key={etape}
                      className="grid"
                      style={{
                        gridTemplateColumns: "28px minmax(0, 1fr)",
                        padding: "10px 0",
                        borderTop: i === 0 ? "none" : "1px solid var(--border)",
                        fontSize: 15,
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        style={{ color: "var(--gold-light)", fontVariantNumeric: "tabular-nums" }}
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
                  }}
                >
                  {t(`${p.id}Note`)}
                </p>
              </div>
            </div>

            <figure className="m-0">
              <Apparition>
                <Ecrans id={p.id} />
              </Apparition>
              <figcaption style={{ marginTop: 16, fontSize: 13, color: "var(--text-muted)" }}>
                {t(`${p.id}Caption`)}
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}
