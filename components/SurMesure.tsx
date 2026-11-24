import { useTranslations } from "next-intl";
import DemoSurMesure from "./DemoSurMesure";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";
const PAIRES = [1, 2, 3, 4] as const;

/* Une seule idée : ce qu'est un outil sur mesure. La démonstration la montre en
   train de se faire, puis l'avant / après dit ce qui change au quotidien. */

function Coche() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flex: "none", marginTop: 3, color: "var(--gold-light)" }}>
      <path d="M4 9.5l3.2 3.2L14 5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Croix() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flex: "none", marginTop: 3, color: "var(--text-muted)" }}>
      <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
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
        <div style={{ maxWidth: 780 }}>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 600,
              fontSize: "clamp(30px, 4vw, 52px)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              color: "var(--text)",
              marginBottom: 20,
            }}
          >
            {t("title")}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 17, lineHeight: 1.65, maxWidth: 640 }}>
            {t("subtitle")}
          </p>
        </div>

        <DemoSurMesure />

        {/* Ce qui change : deux colonnes qui se lisent ligne contre ligne. */}
        <div className="grid min-[800px]:grid-cols-2 gap-x-16 mt-20 max-[900px]:mt-12">
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 500, color: "var(--text-muted)", paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
              {t("beforeTitle")}
            </h3>
            <ul className="list-none m-0 p-0">
              {PAIRES.map((n) => (
                <li key={n} className="flex items-start gap-3" style={{ padding: "14px 0", borderBottom: "1px solid var(--border)", fontSize: 16, lineHeight: 1.5, color: "var(--text-muted)" }}>
                  <Croix />
                  {t(`b${n}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="max-[799px]:mt-10">
            <h3 style={{ fontSize: 15, fontWeight: 500, color: "var(--gold-light)", paddingBottom: 14, borderBottom: "1px solid var(--gold-border)" }}>
              {t("afterTitle")}
            </h3>
            <ul className="list-none m-0 p-0">
              {PAIRES.map((n) => (
                <li key={n} className="flex items-start gap-3" style={{ padding: "14px 0", borderBottom: "1px solid var(--border)", fontSize: 16, lineHeight: 1.5, color: "var(--text)" }}>
                  <Coche />
                  {t(`a${n}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-12">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bouton-or inline-flex items-center no-underline text-[15px] font-medium"
            style={{ height: 48, padding: "0 24px", borderRadius: 10 }}
          >
            {t("cta")}
          </a>
          <p className="m-0" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--text-muted)", maxWidth: 620 }}>
            {t("terms")}
          </p>
        </div>
      </div>
    </section>
  );
}
