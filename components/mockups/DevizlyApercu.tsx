import { useTranslations } from "next-intl";

/* Un devis lisible, dessiné en code : des lignes, des quantités, des montants,
   un total, une signature et un acompte. Il remplace le rendu 3D, dans lequel un
   lecteur ne pouvait lire ni libellé ni montant. Données fictives, dit dessous.
   Les montants se recoupent : 689,00 + 220,00 + 140,00 = 1 049,00 ; TVA 10 % =
   104,90 ; TTC = 1 153,90 ; acompte 30 % = 346,17. */
const LIGNES = ["l1", "l2", "l3"] as const;

export default function DevizlyApercu() {
  const t = useTranslations("products.devizlyDemo");
  const nombres: React.CSSProperties = {
    fontVariantNumeric: "tabular-nums",
    textAlign: "right",
    whiteSpace: "nowrap",
  };

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
        {/* La demande, telle que l'artisan l'écrit */}
        <div style={{ padding: 20, borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
            {t("promptLabel")}
          </div>
          <p
            className="m-0"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--text)",
            }}
          >
            {t("prompt")}
          </p>
        </div>

        {/* Le devis rédigé */}
        <div style={{ padding: "16px 20px 4px" }}>
          <div className="flex items-baseline justify-between gap-4">
            <span style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>
              {t("number")}
            </span>
            <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{t("client")}</span>
          </div>

          <div style={{ marginTop: 12, borderTop: "1px solid var(--border)" }}>
            {LIGNES.map((l) => (
              <div
                key={l}
                className="grid items-baseline"
                style={{
                  gridTemplateColumns: "minmax(0, 1fr) auto auto",
                  columnGap: 16,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                  fontSize: 14,
                  lineHeight: 1.45,
                }}
              >
                <span style={{ color: "var(--text)" }}>{t(`${l}.label`)}</span>
                <span style={{ ...nombres, fontSize: 13, color: "var(--text-muted)" }}>
                  {t(`${l}.qty`)}
                </span>
                <span style={{ ...nombres, color: "var(--text)", minWidth: 72 }}>
                  {t(`${l}.amount`)}
                </span>
              </div>
            ))}
          </div>

          <dl className="m-0" style={{ padding: "12px 0 16px" }}>
            {(["ht", "tva"] as const).map((k) => (
              <div
                key={k}
                className="flex items-baseline justify-between"
                style={{ fontSize: 13, color: "var(--text-muted)", padding: "2px 0" }}
              >
                <dt>{t(`${k}Label`)}</dt>
                <dd className="m-0" style={nombres}>
                  {t(k)}
                </dd>
              </div>
            ))}
            <div
              className="flex items-baseline justify-between"
              style={{ paddingTop: 8, fontSize: 17, fontWeight: 500, color: "var(--text)" }}
            >
              <dt>{t("ttcLabel")}</dt>
              <dd className="m-0" style={{ ...nombres, color: "var(--gold-light)" }}>
                {t("ttc")}
              </dd>
            </div>
          </dl>
        </div>

        {/* Ce qui se passe ensuite, côté client */}
        <div
          className="grid min-[480px]:grid-cols-2"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {(["signed", "paid"] as const).map((k, i) => (
            <div
              key={k}
              className="flex items-start gap-3"
              style={{
                padding: "14px 20px",
                borderLeft: i === 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden
                style={{ flex: "none", marginTop: 2, color: "#7FB58A" }}
              >
                <path
                  d="M4 9.5l3.2 3.2L14 5.8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                <span className="block" style={{ fontSize: 14, color: "var(--text)" }}>
                  {t(`${k}Title`)}
                </span>
                <span
                  className="block"
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {t(`${k}Text`)}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <figcaption style={{ marginTop: 12, fontSize: 13, color: "var(--text-muted)" }}>
        {t("caption")}
      </figcaption>
    </figure>
  );
}
