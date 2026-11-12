import { useTranslations } from "next-intl";

/* Ce que Vlogyz fait d'un rush, dessiné en code : la transcription avec ses
   hésitations et ses silences coupés, la ligne de temps où l'on voit ce qui est
   gardé, et le sous-titre posé. Remplace une image dont le titre et le b-roll
   n'avaient aucun rapport. Exemple fictif, dit dessous.
   Les parts de la ligne de temps font 100 ; 18 % coupés sur 4 min 12 (252 s)
   laissent 3 min 27 (207 s). */
type Segment = { part: number; coupe?: boolean };
const SEGMENTS: Segment[] = [
  { part: 22 },
  { part: 6, coupe: true },
  { part: 30 },
  { part: 4, coupe: true },
  { part: 18 },
  { part: 8, coupe: true },
  { part: 12 },
];

const REPLIQUES = ["t1", "t2", "t3"] as const;

function Coupe({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: "var(--text-muted)", textDecoration: "line-through" }}>
      {children}
    </span>
  );
}

export default function VlogyzApercu() {
  const t = useTranslations("products.vlogyzDemo");

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
        {/* 1. La transcription : ce qui est barré est coupé */}
        <div style={{ padding: 20, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
            {t("transcriptLabel")}
          </div>
          <div className="flex flex-col" style={{ gap: 10 }}>
            {REPLIQUES.map((r) => (
              <div
                key={r}
                className="grid"
                style={{
                  gridTemplateColumns: "44px minmax(0, 1fr)",
                  fontSize: 14,
                  lineHeight: 1.55,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {t(`${r}.time`)}
                </span>
                <span style={{ color: "var(--text)" }}>
                  {t(`${r}.before`)}
                  <Coupe>{t(`${r}.cut`)}</Coupe>
                  {t(`${r}.after`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. La ligne de temps */}
        <div style={{ padding: 20, borderBottom: "1px solid var(--border)" }}>
          <div
            className="flex items-baseline justify-between"
            style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}
          >
            <span>{t("timelineLabel")}</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>{t("durations")}</span>
          </div>
          <div aria-hidden className="flex" style={{ gap: 2, height: 28 }}>
            {SEGMENTS.map((s, i) => (
              <span
                key={i}
                style={{
                  flex: `${s.part} 0 0`,
                  borderRadius: 4,
                  background: s.coupe ? "transparent" : "#3A3936",
                  border: s.coupe ? "1px dashed var(--border-accent)" : "none",
                }}
              />
            ))}
          </div>
          <div
            className="flex items-center gap-5"
            style={{ marginTop: 12, fontSize: 13, color: "var(--text-muted)" }}
          >
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                style={{ width: 12, height: 12, borderRadius: 3, background: "#3A3936" }}
              />
              {t("kept")}
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  border: "1px dashed var(--border-accent)",
                }}
              />
              {t("cut")}
            </span>
          </div>
        </div>

        {/* 3. Le sous-titre posé sur la vidéo */}
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
            {t("subtitleLabel")}
          </div>
          <div
            className="flex items-center justify-center"
            style={{
              height: 64,
              borderRadius: 10,
              background: "var(--card)",
              border: "1px solid var(--border)",
              padding: 16,
            }}
          >
            <span
              style={{
                fontSize: 17,
                fontWeight: 500,
                lineHeight: 1.3,
                textAlign: "center",
                color: "var(--text)",
              }}
            >
              {t("subBefore")}
              <span style={{ color: "var(--gold-light)" }}>{t("subWord")}</span>
              {t("subAfter")}
            </span>
          </div>
        </div>
      </div>
      <figcaption style={{ marginTop: 12, fontSize: 13, color: "var(--text-muted)" }}>
        {t("caption")}
      </figcaption>
    </figure>
  );
}
