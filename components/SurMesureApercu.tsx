import { useTranslations } from "next-intl";
import Apparition from "./Apparition";

/* Le sur-mesure, compris d'un coup d'œil : une demande arrive, l'outil applique
   les règles de l'entreprise, le devis est prêt à valider. Trois cartes reliées
   par un trait qui se trace à l'arrivée dans l'écran ; puis, dessous, ce qui
   change entre « à la main » et « avec l'outil ». */

const REGLES = ["rule1", "rule2", "rule3"] as const;
const LIGNES = ["r1", "r2", "r3"] as const;
const PAIRES = [1, 2, 3, 4] as const;

const CARTE: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: 20,
  height: "100%",
};

function Numero({ n, titre }: { n: number; titre: string }) {
  return (
    <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
      <span
        className="inline-flex items-center justify-center"
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          flex: "none",
          fontSize: 13,
          fontWeight: 500,
          color: "#0a0a0b",
          background: "var(--gold)",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {n}
      </span>
      <span style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.3, color: "var(--text)" }}>
        {titre}
      </span>
    </div>
  );
}

/* Le trait entre deux cartes : horizontal sur grand écran, vertical en pile. */
function Lien({ i }: { i: number }) {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center max-[999px]:py-1"
      style={{ ["--i" as string]: i }}
    >
      <span className="hidden min-[1000px]:flex items-center" style={{ width: 40 }}>
        <span
          data-trait
          style={{ display: "block", flex: 1, height: 1, background: "var(--gold)" }}
        />
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" data-etape style={{ ["--i" as string]: i + 1 }}>
          <path d="M1 1l5 4-5 4" stroke="#C4973A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <svg
        className="min-[1000px]:hidden"
        width="10"
        height="20"
        viewBox="0 0 10 20"
        fill="none"
      >
        <path d="M5 1v16M1 13l4 5 4-5" stroke="#C4973A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function Coche({ couleur }: { couleur: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flex: "none", marginTop: 2, color: couleur }}>
      <path d="M4 9.5l3.2 3.2L14 5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Croix() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flex: "none", marginTop: 2, color: "var(--text-muted)" }}>
      <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function SurMesureApercu() {
  const t = useTranslations("custom");

  return (
    <>
      {/* 1. Le chemin d'une demande, en trois cartes */}
      <Apparition
        enfants
        className="grid items-stretch mt-14 max-[900px]:mt-10 min-[1000px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]"
      >
        <div data-etape style={{ ["--i" as string]: 0 }}>
          <div style={CARTE}>
            <Numero n={1} titre={t("flow.s1Title")} />
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 14,
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}
              >
                <span>{t("flow.s1From")}</span>
                <span>{t("flow.s1When")}</span>
              </div>
              <p className="m-0" style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-muted)" }}>
                {t("demo.m1")}
                <span style={{ color: "var(--text)", borderBottom: "1px solid var(--gold)" }}>
                  {t("demo.c1")}
                </span>
                {t("flow.s1Mid")}
                <span style={{ color: "var(--text)", borderBottom: "1px solid var(--gold)" }}>
                  {t("demo.c2")}
                </span>
                {t("demo.m3")}
                <span style={{ color: "var(--text)", borderBottom: "1px solid var(--gold)" }}>
                  {t("demo.c3")}
                </span>
                .
              </p>
            </div>
            <p className="m-0" style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55, color: "var(--text-muted)" }}>
              {t("flow.s1Text")}
            </p>
          </div>
        </div>

        <Lien i={1} />

        <div data-etape style={{ ["--i" as string]: 2 }}>
          <div style={CARTE}>
            <Numero n={2} titre={t("flow.s2Title")} />
            <ul className="list-none m-0 p-0 flex flex-col" style={{ gap: 8 }}>
              {REGLES.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 10,
                    padding: "10px 12px",
                  }}
                >
                  <Coche couleur="var(--gold-light)" />
                  <span>
                    <span className="block" style={{ fontSize: 14, color: "var(--text)" }}>
                      {t(`flow.${r}If`)}
                    </span>
                    <span className="block" style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      {t(`flow.${r}Then`)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="m-0" style={{ marginTop: 12, fontSize: 14, lineHeight: 1.55, color: "var(--text-muted)" }}>
              {t("flow.s2Text")}
            </p>
          </div>
        </div>

        <Lien i={3} />

        <div data-etape style={{ ["--i" as string]: 4 }}>
          <div style={CARTE}>
            <Numero n={3} titre={t("flow.s3Title")} />
            <div
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: "4px 14px",
              }}
            >
              {LIGNES.map((r, i) => (
                <div
                  key={r}
                  className="grid items-baseline"
                  style={{
                    gridTemplateColumns: "minmax(0, 1fr) auto auto",
                    columnGap: 12,
                    padding: "9px 0",
                    borderTop: i === 0 ? "none" : "1px solid var(--border)",
                    fontSize: 14,
                  }}
                >
                  <span style={{ color: "var(--text)", fontWeight: 500 }}>{t(`demo.${r}.who`)}</span>
                  <span style={{ color: "var(--text)", fontVariantNumeric: "tabular-nums" }}>
                    {t(`demo.${r}.nights`)}
                  </span>
                  <span style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "right" }}>
                    {t(`demo.${r}.room`)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3" style={{ marginTop: 12 }}>
              <span style={{ fontSize: 14, lineHeight: 1.45, color: "var(--text-muted)" }}>
                {t("flow.s3Text")}
              </span>
              <span
                className="inline-flex items-center whitespace-nowrap"
                style={{
                  height: 32,
                  padding: "0 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#0a0a0b",
                  background: "var(--gold)",
                }}
              >
                {t("flow.validate")}
              </span>
            </div>
          </div>
        </div>
      </Apparition>
      <p style={{ marginTop: 12, fontSize: 13, color: "var(--text-muted)" }}>{t("flow.caption")}</p>

      {/* 2. Ce qui change */}
      <Apparition className="grid min-[800px]:grid-cols-2 mt-16 max-[900px]:mt-10" style={{ border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 500, color: "var(--text-muted)", marginBottom: 16 }}>
            {t("beforeTitle")}
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col" style={{ gap: 14 }}>
            {PAIRES.map((n) => (
              <li key={n} className="flex items-start gap-3" style={{ fontSize: 15, lineHeight: 1.5, color: "var(--text-muted)" }}>
                <Croix />
                {t(`b${n}`)}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="max-[799px]:border-t min-[800px]:border-l"
          style={{ padding: 28, background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 500, color: "var(--gold-light)", marginBottom: 16 }}>
            {t("afterTitle")}
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col" style={{ gap: 14 }}>
            {PAIRES.map((n) => (
              <li key={n} className="flex items-start gap-3" style={{ fontSize: 15, lineHeight: 1.5, color: "var(--text)" }}>
                <Coche couleur="var(--gold-light)" />
                {t(`a${n}`)}
              </li>
            ))}
          </ul>
        </div>
      </Apparition>
    </>
  );
}
