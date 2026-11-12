import { useTranslations } from "next-intl";

/* Maquette en code d'une fiche de candidature. Elle montre les deux règles du
   produit : un fait ne s'affiche qu'avec l'extrait de la page où il a été lu,
   et aucun mail ne part sans avoir été relu. Entreprise fictive, dit sous la
   maquette. */
export default function InternbulletDemo() {
  const t = useTranslations("products.internbulletDemo");

  return (
    <figure className="m-0 mx-auto" style={{ maxWidth: 520 }}>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div
          className="flex items-center justify-between gap-4"
          style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}
        >
          <div className="min-w-0">
            <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text)" }}>
              {t("company")}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
              {t("offer")}
            </div>
          </div>
          <span
            className="whitespace-nowrap"
            style={{ fontSize: 13, color: "var(--gold-light)" }}
          >
            {t("status")}
          </span>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
            {t("readLabel")}
          </div>
          <blockquote
            className="m-0"
            style={{
              borderLeft: "2px solid var(--gold)",
              paddingLeft: 12,
              fontSize: 14,
              lineHeight: 1.55,
              color: "var(--text)",
            }}
          >
            {t("excerpt")}
            <span
              className="block"
              style={{ marginTop: 4, fontSize: 12, color: "var(--text-muted)" }}
            >
              {t("excerptSource")}
            </span>
          </blockquote>

          <div
            style={{
              marginTop: 20,
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: 16,
            }}
          >
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {t("subjectLabel")}
            </div>
            <div style={{ fontSize: 14, color: "var(--text)", marginTop: 2 }}>
              {t("subject")}
            </div>
            <p
              className="m-0"
              style={{
                marginTop: 12,
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--text-muted)",
              }}
            >
              {t("body")}
            </p>
          </div>
        </div>

        <div
          className="flex items-center justify-between gap-4 flex-wrap"
          style={{ padding: "12px 20px 16px", borderTop: "1px solid var(--border)" }}
        >
          <span
            className="inline-flex items-center gap-2"
            style={{ fontSize: 13, color: "var(--text-muted)" }}
          >
            <span
              aria-hidden
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                border: "1px solid var(--border-accent)",
              }}
            />
            {t("checked")}
          </span>
          <span
            style={{
              height: 36,
              padding: "0 16px",
              borderRadius: 8,
              display: "inline-flex",
              alignItems: "center",
              fontSize: 14,
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
          >
            {t("send")}
          </span>
        </div>
      </div>
      <figcaption
        style={{ marginTop: 12, fontSize: 13, color: "var(--text-muted)" }}
      >
        {t("caption")}
      </figcaption>
    </figure>
  );
}
