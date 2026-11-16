import { useTranslations } from "next-intl";
import ProjetEnCours from "./ProjetEnCours";
import SurMesureApercu from "./SurMesureApercu";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

const POINTS = ["p1", "p2", "p3", "p4"] as const;
const VOYAGEURS = ["r1", "r2", "r3"] as const;
const ETAPES = ["e1", "e2", "e3"] as const;

/* La phrase du client, soulignée d'or : c'est le détail propre à cette section.
   Une valeur du tableau n'existe que si une phrase du message la fonde. */
function Citation({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        color: "var(--text)",
        borderBottom: "1px solid var(--gold)",
        paddingBottom: 1,
      }}
    >
      {children}
    </span>
  );
}

function Tableau() {
  const t = useTranslations("custom.demo");

  return (
    <figure className="m-0">
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* 1. Le message, tel qu'il arrive */}
        <div style={{ padding: 20, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
            {t("messageLabel")}
          </div>
          <p
            className="m-0"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: 16,
              fontSize: 15,
              lineHeight: 1.65,
              color: "var(--text-muted)",
            }}
          >
            {t("m1")}
            <Citation>{t("c1")}</Citation>
            {t("m2")}
            <Citation>{t("c2")}</Citation>
            {t("m3")}
            <Citation>{t("c3")}</Citation>
            {t("m4")}
          </p>
        </div>

        {/* 2. Le parcours : les étapes viennent du catalogue de l'entreprise, la
            présence de chacun vient du message. */}
        <div style={{ padding: 20, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
            {t("routeLabel")}
          </div>
          <ol className="list-none m-0 p-0 grid min-[600px]:grid-cols-3 max-[600px]:gap-4">
            {ETAPES.map((e, i) => (
              <li key={e} className="relative" style={{ paddingRight: 12 }}>
                <div
                  aria-hidden
                  className="flex items-center max-[600px]:hidden"
                  style={{ height: 8, marginBottom: 12 }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      background: "var(--gold)",
                      flex: "none",
                    }}
                  />
                  {i < ETAPES.length - 1 && (
                    <span
                      style={{
                        flex: 1,
                        height: 1,
                        marginLeft: 8,
                        background: "var(--gold-border)",
                      }}
                    />
                  )}
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>
                  {t(`${e}.place`)}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    marginTop: 2,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {t(`${e}.dates`)}
                </div>
                <div style={{ marginTop: 8, fontSize: 13, color: "var(--text)" }}>
                  {t(`${e}.present`)}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 3. Qui paie quoi */}
        <div style={{ padding: "16px 20px 8px" }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>
            {t("tableLabel")}
          </div>
          <div
            className="grid max-[600px]:hidden"
            style={{
              gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr) minmax(0, 3fr)",
              gap: 16,
              padding: "8px 0",
              fontSize: 13,
              color: "var(--text-muted)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <span>{t("colWho")}</span>
            <span>{t("colNights")}</span>
            <span>{t("colRoom")}</span>
          </div>
          {VOYAGEURS.map((r, i) => (
            <div
              key={r}
              className="grid max-[600px]:grid-cols-1 max-[600px]:gap-1 min-[600px]:grid-cols-[minmax(0,2fr)_minmax(0,3fr)_minmax(0,3fr)] min-[600px]:gap-4"
              style={{
                padding: "12px 0",
                borderBottom:
                  i < VOYAGEURS.length - 1 ? "1px solid var(--border)" : "none",
                fontSize: 14,
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: "var(--text)", fontWeight: 500 }}>
                {t(`${r}.who`)}
              </span>
              <span style={{ color: "var(--text)", fontVariantNumeric: "tabular-nums" }}>
                <span className="min-[600px]:hidden" style={{ color: "var(--text-muted)" }}>
                  {t("colNights")} :{" "}
                </span>
                {t(`${r}.nights`)}
                <span className="block" style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {t(`${r}.dates`)}
                </span>
              </span>
              <span style={{ color: "var(--text)" }}>
                <span className="min-[600px]:hidden" style={{ color: "var(--text-muted)" }}>
                  {t("colRoom")} :{" "}
                </span>
                {t(`${r}.room`)}
                <span className="block" style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {t(`${r}.source`)}
                </span>
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex items-start gap-3"
          style={{
            padding: "16px 20px",
            borderTop: "1px solid var(--border)",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--text-muted)",
          }}
        >
          <span
            aria-hidden
            style={{
              flex: "none",
              width: 6,
              height: 6,
              borderRadius: 3,
              background: "var(--gold)",
              marginTop: 8,
            }}
          />
          <span>{t("amounts")}</span>
        </div>
      </div>
      <figcaption style={{ marginTop: 12, fontSize: 13, color: "var(--text-muted)" }}>
        {t("caption")}
      </figcaption>
    </figure>
  );
}

export default function SurMesure() {
  const t = useTranslations("custom");

  return (
    <section id="sur-mesure" style={{ borderBottom: "1px solid var(--border)" }}>
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

        <SurMesureApercu />

        <div className="grid items-start gap-12 min-[1000px]:gap-20 min-[1000px]:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] mt-20 max-[900px]:mt-12">
          <div>
            <h3
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: "clamp(22px, 2.2vw, 28px)",
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "var(--text)",
                marginBottom: 24,
              }}
            >
              {t("demoTitle")}
            </h3>
            <ol className="list-none m-0 p-0">
              {POINTS.map((p, i) => (
                <li
                  key={p}
                  className="grid"
                  style={{
                    gridTemplateColumns: "32px minmax(0, 1fr)",
                    padding: "20px 0",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      lineHeight: "26px",
                      color: "var(--gold-light)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span
                      className="block"
                      style={{
                        fontSize: 17,
                        lineHeight: "26px",
                        fontWeight: 500,
                        color: "var(--text)",
                      }}
                    >
                      {t(`${p}Title`)}
                    </span>
                    <span
                      className="block"
                      style={{
                        marginTop: 4,
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: "var(--text-muted)",
                      }}
                    >
                      {t(`${p}Text`)}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <p
              style={{
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
                fontSize: 15,
                lineHeight: 1.65,
                color: "var(--text-muted)",
              }}
            >
              {t("terms")}
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton-or inline-flex items-center no-underline text-[15px] font-medium"
              style={{ height: 48, padding: "0 24px", borderRadius: 10, marginTop: 20 }}
            >
              {t("cta")}
            </a>
          </div>

          <Tableau />
        </div>

        <ProjetEnCours />
      </div>
    </section>
  );
}
