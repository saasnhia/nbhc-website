import { useTranslations } from "next-intl";

/* La preuve, dite telle qu'elle est : un projet sur mesure est en cours, il
   n'est pas livré, et l'agence n'est pas nommée. Quatre étapes, chacune avec
   son état — faite, en cours, à venir — et rien qui laisse croire à plus. */
type Etat = "fait" | "enCours" | "aVenir";
const ETAPES: { id: "e1" | "e2" | "e3" | "e4"; etat: Etat }[] = [
  { id: "e1", etat: "fait" },
  { id: "e2", etat: "enCours" },
  { id: "e3", etat: "aVenir" },
  { id: "e4", etat: "aVenir" },
];

function Jalon({ etat }: { etat: Etat }) {
  if (etat === "fait") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9.25" stroke="#7FB58A" strokeWidth="1.5" />
        <path
          d="M6 10.4l2.6 2.6L14 7.6"
          stroke="#7FB58A"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (etat === "enCours") {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="9.25" stroke="#C4973A" strokeWidth="1.5" />
        <circle cx="10" cy="10" r="4" fill="#C4973A" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9.25" stroke="#3E3D3A" strokeWidth="1.5" />
    </svg>
  );
}

export default function ProjetEnCours() {
  const t = useTranslations("custom.project");

  return (
    <section id="projet" style={{ borderBottom: "1px solid var(--border)" }}>
    <div
      className="grid gap-10 min-[1000px]:gap-20 min-[1000px]:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] px-10 max-[900px]:px-5 py-28 max-[900px]:py-16"
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      <div>
        <div
          className="inline-flex items-center gap-2"
          style={{ fontSize: 13, color: "var(--gold-light)", marginBottom: 12 }}
        >
          <span
            aria-hidden="true"
            style={{ width: 6, height: 6, borderRadius: 3, background: "var(--gold)" }}
          />
          {t("eyebrow")}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.4vw, 44px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            marginBottom: 20,
          }}
        >
          {t("title")}
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "var(--text-muted)" }}>
          {t("text")}
        </p>
        <p
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTop: "1px solid var(--border)",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--text-muted)",
          }}
        >
          {t("note")}
        </p>
      </div>

      <ol className="list-none m-0 p-0">
        {ETAPES.map((e, i) => (
          <li
            key={e.id}
            className="grid"
            style={{ gridTemplateColumns: "20px minmax(0, 1fr)", columnGap: 16 }}
          >
            <span className="flex flex-col items-center">
              <Jalon etat={e.etat} />
              {i < ETAPES.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{
                    flex: 1,
                    width: 1,
                    minHeight: 24,
                    margin: "4px 0",
                    background: e.etat === "fait" ? "#7FB58A" : "var(--border-accent)",
                    opacity: e.etat === "fait" ? 0.5 : 1,
                  }}
                />
              )}
            </span>
            <span style={{ paddingBottom: i < ETAPES.length - 1 ? 20 : 0 }}>
              <span
                className="flex flex-wrap items-baseline justify-between gap-x-4"
                style={{ lineHeight: "20px" }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: e.etat === "aVenir" ? "var(--text-muted)" : "var(--text)",
                  }}
                >
                  {t(`${e.id}.title`)}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: e.etat === "enCours" ? "var(--gold-light)" : "var(--text-muted)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {t(`${e.id}.when`)}
                </span>
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
                {t(`${e.id}.text`)}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
    </section>
  );
}
