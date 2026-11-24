import { useTranslations } from "next-intl";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

/* La prise de contact dite comme une phrase : le titre, le créneau, l'adresse.
   Servie visible, sans carte autour. */
export default function Contact() {
  const t = useTranslations("contact");

  const meta: { label: string; value: React.ReactNode; large?: boolean }[] = [
    { label: t("siren"), value: "102 637 899" },
    { label: t("headquarters"), value: "55 Rue Henri Clément, 71100 Saint-Rémy", large: true },
  ];

  return (
    <section
      id="contact"
      style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}
    >
      <div
        className="py-28 max-[900px]:py-16 px-10 max-[900px]:px-5"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: "clamp(36px, 6vw, 84px)",
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: "var(--text)",
            marginBottom: 24,
          }}
        >
          {t("title")} {t("titleGold")}
        </h2>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: 17,
            lineHeight: 1.65,
            maxWidth: 620,
            marginBottom: 36,
          }}
        >
          {t("description")}
        </p>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bouton-or inline-flex items-center justify-center no-underline text-[16px] font-medium"
            style={{ height: 52, padding: "0 28px", borderRadius: 10 }}
          >
            {t("calendlyButton")}
          </a>
          <a
            href="mailto:contact@nbhc.fr"
            className="lien-or"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 500,
              fontSize: "clamp(22px, 2.6vw, 34px)",
              letterSpacing: "-0.02em",
            }}
          >
            contact@nbhc.fr
          </a>
        </div>

        <div style={{ marginTop: 56, maxWidth: 620 }}>
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
