import { useTranslations } from "next-intl";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

/* Deux tuiles, deux écrans réels : le premier écran montre ce que NBHC a
   construit avant d'en parler. Chaque tuile renvoie à sa section ; l'état de
   chaque produit est écrit dessous, sans rien arrondir. */
type Tuile = {
  id: "devizly" | "vlogyz";
  src: string;
  width: number;
  height: number;
  position: string;
  /** Agrandissement de l'image dans la tuile ; 1 = l'écran entier en largeur. */
  zoom: number;
  enProduction?: boolean;
};

const TUILES: Tuile[] = [
  {
    id: "devizly",
    src: "/ecrans/devizly-devis-client-667.webp",
    width: 667,
    height: 898,
    position: "50% 0%",
    zoom: 1.5,
    enProduction: true,
  },
  {
    id: "vlogyz",
    src: "/ecrans/vlogyz-broll-800.webp",
    width: 800,
    height: 471,
    position: "50% 50%",
    zoom: 1,
  },
];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section style={{ borderBottom: "1px solid var(--border)" }}>
      <div
        className="px-10 max-[900px]:px-5 pt-40 pb-24 max-[900px]:pt-28 max-[900px]:pb-14"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div className="entree" style={{ maxWidth: 920 }}>
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 500,
              fontSize: "clamp(34px, 5vw, 64px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--text)",
              marginBottom: 24,
            }}
          >
            <span className="block">{t("titleLine1")}</span>
            <span className="block">{t("titleLine2")}</span>
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 18,
              lineHeight: 1.6,
              maxWidth: 620,
              marginBottom: 32,
            }}
          >
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton-or inline-flex items-center no-underline text-[15px] font-medium"
              style={{ height: 48, padding: "0 24px", borderRadius: 10 }}
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#produits"
              className="bouton-discret inline-flex items-center no-underline text-[15px]"
              style={{ height: 48, padding: "0 24px", borderRadius: 10 }}
            >
              {t("ctaSecondary")}
            </a>
            <span
              className="max-[700px]:basis-full"
              style={{ fontSize: 14, color: "var(--text-muted)", marginLeft: 4 }}
            >
              {t("ctaNote")}
            </span>
          </div>
        </div>

        <ul className="entree entree-2 list-none m-0 p-0 grid gap-5 min-[760px]:grid-cols-2 mt-16 max-[900px]:mt-10">
          {TUILES.map((tu, i) => (
            <li key={tu.id}>
              <a
                href={`#${tu.id}`}
                className="tuile-ecran block no-underline"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <span
                  className="block"
                  style={{ aspectRatio: "4 / 3", overflow: "hidden", background: "#17171a" }}
                >
                  <img
                    src={tu.src}
                    alt={t(`tiles.${tu.id}.alt`)}
                    width={tu.width}
                    height={tu.height}
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : undefined}
                    decoding="async"
                    className="block"
                    style={
                      tu.zoom === 1
                        ? {
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: tu.position,
                          }
                        : { width: `${tu.zoom * 100}%`, maxWidth: "none", height: "auto" }
                    }
                  />
                </span>
                <span
                  className="flex items-baseline justify-between gap-4"
                  style={{ padding: "14px 16px 4px" }}
                >
                  <span
                    translate="no"
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontWeight: 600,
                      fontSize: 19,
                      letterSpacing: "-0.01em",
                      color: "var(--text)",
                    }}
                  >
                    {t(`tiles.${tu.id}.name`)}
                  </span>
                  <span
                    className="inline-flex items-center gap-2 whitespace-nowrap"
                    style={{
                      fontSize: 13,
                      color: tu.enProduction ? "var(--text)" : "var(--text-muted)",
                    }}
                  >
                    {tu.enProduction && (
                      <span
                        aria-hidden="true"
                        style={{ width: 6, height: 6, borderRadius: 3, background: "#7FB58A" }}
                      />
                    )}
                    {t(`tiles.${tu.id}.status`)}
                  </span>
                </span>
                <span
                  className="block"
                  style={{
                    padding: "0 16px 16px",
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "var(--text-muted)",
                  }}
                >
                  {t(`tiles.${tu.id}.what`)}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Le sur-mesure n'a pas d'écran à montrer : il a un projet en cours,
            dit en une ligne, qui renvoie à sa section. */}
        <a
          href="#sur-mesure"
          className="rangee-sommaire flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 no-underline"
          style={{
            marginTop: 20,
            padding: "16px 20px",
            border: "1px solid var(--border)",
            borderRadius: 14,
          }}
        >
          <span>
            <span
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: "-0.01em",
                color: "var(--text)",
              }}
            >
              {t("custom.name")}
            </span>
            <span style={{ marginLeft: 12, fontSize: 14, color: "var(--text-muted)" }}>
              {t("custom.what")}
            </span>
          </span>
          <span
            className="inline-flex items-center gap-2"
            style={{ fontSize: 13, color: "var(--gold-light)" }}
          >
            <span
              aria-hidden="true"
              style={{ width: 6, height: 6, borderRadius: 3, background: "var(--gold)" }}
            />
            {t("custom.status")}
          </span>
        </a>
      </div>
    </section>
  );
}
