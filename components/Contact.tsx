import { useTranslations } from "next-intl";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

/* Les deux colonnes étaient servies à opacity 0 et attendaient un déclencheur
   de défilement pour apparaître : sans JavaScript, ou si le déclencheur ne se
   levait pas, la section restait vide. Elles sont maintenant servies visibles. */
export default function Contact() {
  const t = useTranslations("contact");

  const meta: { label: string; value: React.ReactNode; large?: boolean }[] = [
    {
      label: t("emailDirect"),
      value: (
        <a href="mailto:contact@nbhc.fr" className="lien-or">
          contact@nbhc.fr
        </a>
      ),
    },
    { label: t("siren"), value: "102 637 899" },
    { label: t("headquarters"), value: "55 Rue Henri Clément, 71100 Saint-Rémy", large: true },
  ];

  return (
    <section
      id="contact"
      style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
    >
      <div
        className="py-28 max-[900px]:py-16 grid items-center gap-16 max-[900px]:gap-10 max-[900px]:grid-cols-1 grid-cols-2 px-10 max-[900px]:px-5"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div>
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
              marginBottom: 20,
            }}
          >
            {t("title")} {t("titleGold")}
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            {t("description")}
          </p>
        </div>

        <div
          className="flex flex-col gap-5"
          style={{
            padding: 24,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 16,
          }}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bouton-or inline-flex items-center justify-center no-underline text-[16px] font-medium"
            style={{ height: 52, padding: "0 24px", borderRadius: 10 }}
          >
            {t("calendlyButton")}
          </a>

          <div className="text-[14px] text-center" style={{ color: "var(--text-muted)" }}>
            {t("calendlyAlt")}
          </div>

          <dl
            className="grid gap-4 m-0"
            style={{
              paddingTop: 20,
              borderTop: "1px solid var(--border)",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            {meta.map((m) => (
              <div key={m.label} className={m.large ? "col-span-2" : ""}>
                <dt style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>
                  {m.label}
                </dt>
                <dd
                  className="m-0"
                  style={{
                    fontSize: 14,
                    color: "var(--text)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
