import { useTranslations } from "next-intl";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

type IdLigne = "devizly" | "vlogyz" | "internbullet" | "surMesure";

type Ligne = {
  id: IdLigne;
  href: string;
  enProduction?: boolean;
};

/* Le sommaire tient lieu de visuel : quatre lignes, ce que NBHC construit et où
   chaque chose en est. Il renvoie aux sections de la page, il ne décore pas. */
const LIGNES: Ligne[] = [
  { id: "devizly", href: "#devizly", enProduction: true },
  { id: "vlogyz", href: "#vlogyz" },
  { id: "internbullet", href: "#internbullet" },
  { id: "surMesure", href: "#sur-mesure" },
];

const CADRE: React.CSSProperties = {
  width: 56,
  height: 56,
  borderRadius: 10,
  border: "1px solid var(--border)",
  background: "var(--card)",
  overflow: "hidden",
  flex: "none",
};

/* Chaque ligne montre ce dont elle parle : le devis rendu, la vidéo montée, une
   fiche de candidature, un tableau dont une valeur est soulignée par sa source.
   Les deux dernières sont dessinées en code, à l'échelle de la miniature. */
function Miniature({ id }: { id: IdLigne }) {
  if (id === "devizly") {
    return (
      <span aria-hidden className="block" style={CADRE}>
        <img
          src="/produit-devizly-342.webp"
          alt=""
          width={56}
          height={56}
          className="block h-full w-full"
          style={{ objectFit: "cover", objectPosition: "50% 38%" }}
        />
      </span>
    );
  }
  if (id === "vlogyz") {
    return (
      <span aria-hidden className="block" style={CADRE}>
        {/* Une ligne de temps : trois plans gardés, deux coupes en pointillé, et
            le sous-titre dont un mot est en or. */}
        <svg viewBox="0 0 56 56" width="56" height="56" fill="none">
          <rect x="10" y="16" width="12" height="9" rx="2" fill="#3A3936" />
          <rect x="24" y="16.5" width="5" height="8" rx="2" stroke="#8C8880" strokeOpacity="0.6" strokeDasharray="2 2" />
          <rect x="31" y="16" width="9" height="9" rx="2" fill="#3A3936" />
          <rect x="42" y="16.5" width="4" height="8" rx="2" stroke="#8C8880" strokeOpacity="0.6" strokeDasharray="2 2" />
          <rect x="12" y="35" width="10" height="3" rx="1.5" fill="#F0EDE6" opacity="0.85" />
          <rect x="24" y="35" width="12" height="3" rx="1.5" fill="#C4973A" />
          <rect x="38" y="35" width="6" height="3" rx="1.5" fill="#F0EDE6" opacity="0.85" />
        </svg>
      </span>
    );
  }
  if (id === "internbullet") {
    return (
      <span aria-hidden className="block" style={CADRE}>
        <svg viewBox="0 0 56 56" width="56" height="56" fill="none">
          <rect x="12" y="13" width="2" height="12" rx="1" fill="#C4973A" />
          <rect x="18" y="14" width="26" height="3" rx="1.5" fill="#F0EDE6" opacity="0.85" />
          <rect x="18" y="21" width="18" height="3" rx="1.5" fill="#8C8880" opacity="0.7" />
          <rect x="12" y="32" width="32" height="3" rx="1.5" fill="#8C8880" opacity="0.45" />
          <rect x="12" y="39" width="24" height="3" rx="1.5" fill="#8C8880" opacity="0.45" />
        </svg>
      </span>
    );
  }
  return (
    <span aria-hidden className="block" style={CADRE}>
      <svg viewBox="0 0 56 56" width="56" height="56" fill="none">
        <rect x="11" y="14" width="12" height="3" rx="1.5" fill="#F0EDE6" opacity="0.85" />
        <rect x="29" y="14" width="16" height="3" rx="1.5" fill="#8C8880" opacity="0.7" />
        <rect x="11" y="26" width="12" height="3" rx="1.5" fill="#F0EDE6" opacity="0.85" />
        <rect x="29" y="26" width="16" height="3" rx="1.5" fill="#8C8880" opacity="0.7" />
        <rect x="11" y="38" width="12" height="3" rx="1.5" fill="#F0EDE6" opacity="0.85" />
        <rect x="29" y="38" width="12" height="3" rx="1.5" fill="#F0EDE6" opacity="0.85" />
        <rect x="29" y="43" width="12" height="1.5" rx="0.75" fill="#C4973A" />
      </svg>
    </span>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section style={{ borderBottom: "1px solid var(--border)" }}>
      <div
        className="grid items-center gap-16 max-[1000px]:gap-12 min-[1000px]:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] px-10 max-[900px]:px-5 pt-40 pb-28 max-[900px]:pt-28 max-[900px]:pb-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div className="entree">
          <h1
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 600,
              fontSize: "clamp(30px, 2.85vw, 40px)",
              lineHeight: 1.14,
              textWrap: "balance",
              letterSpacing: "-0.02em",
              color: "var(--text)",
              marginBottom: 24,
            }}
          >
            <span className="block">
              {t("titleLine1")} {t("titleLine2")}
            </span>
            <span className="block" style={{ color: "var(--gold-light)" }}>
              {t("titleLine3")}
            </span>
          </h1>

          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 17,
              lineHeight: 1.65,
              maxWidth: 540,
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
          </div>

          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--text-muted)",
              maxWidth: 540,
            }}
          >
            {t("ctaNote")}
          </p>
        </div>

        <div
          className="entree entree-2"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 16,
            padding: 8,
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-muted)" }}
          >
            <span>{t("index.title")}</span>
            <span>{t("index.status")}</span>
          </div>
          <ul className="list-none m-0 p-0">
            {LIGNES.map((l) => (
              <li key={l.id} style={{ borderTop: "1px solid var(--border)" }}>
                <a
                  href={l.href}
                  className="rangee-sommaire grid items-center no-underline gap-4"
                  style={{
                    gridTemplateColumns: "56px minmax(0, 1fr) auto",
                    padding: 16,
                    borderRadius: 8,
                  }}
                >
                  <Miniature id={l.id} />
                  <span className="min-w-0">
                    <span
                      className="block"
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontWeight: 600,
                        fontSize: 19,
                        lineHeight: 1.2,
                        letterSpacing: "-0.01em",
                        color: "var(--text)",
                      }}
                    >
                      {t(`index.${l.id}.name`)}
                    </span>
                    <span
                      className="block"
                      style={{
                        marginTop: 4,
                        fontSize: 14,
                        lineHeight: 1.45,
                        color: "var(--text-muted)",
                      }}
                    >
                      {t(`index.${l.id}.what`)}
                    </span>
                    {/* Sous 420 px la colonne d'état n'a plus la place : l'état
                        passe sous la description au lieu de disparaître. */}
                    <span
                      className="hidden max-[420px]:block"
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: l.enProduction ? "#7FB58A" : "var(--gold-light)",
                      }}
                    >
                      {t(`index.${l.id}.status`)}
                    </span>
                  </span>
                  <span
                    className="inline-flex items-center gap-2 whitespace-nowrap max-[420px]:hidden"
                    style={{
                      fontSize: 13,
                      color: l.enProduction ? "var(--text)" : "var(--text-muted)",
                    }}
                  >
                    {l.enProduction && (
                      <span
                        aria-hidden
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          background: "#7FB58A",
                        }}
                      />
                    )}
                    {t(`index.${l.id}.status`)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
