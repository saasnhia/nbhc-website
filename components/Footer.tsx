import { useTranslations, useLocale } from "next-intl";
import Logo from "./Logo";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

type Lien = { href: string; label: string; external?: boolean };

/* Les dix pages par métier restent en ligne : elles sont listées ici, en bas de
   page, pour ne pas devenir des pages sans aucun lien entrant. */
const METIERS = [
  "automatisation-artisan-btp",
  "automatisation-garage-automobile",
  "automatisation-restaurant",
  "automatisation-salon-de-coiffure",
  "automatisation-salle-de-sport",
  "automatisation-association-sportive",
  "automatisation-organisme-formation",
  "automatisation-pharmacie",
  "automatisation-opticien",
  "automatisation-marque-cosmetique",
] as const;

const CLASSE_LIEN =
  "text-[13px] no-underline transition-colors duration-150 hover:text-[var(--text)]";

function Colonne({ titre, liens }: { titre: string; liens: Lien[] }) {
  return (
    <div className="flex flex-col gap-3">
      <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 4 }}>{titre}</div>
      {liens.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target={l.external ? "_blank" : undefined}
          rel={l.external ? "noopener noreferrer" : undefined}
          className={CLASSE_LIEN}
          style={{ color: "var(--text-muted)" }}
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const navLinks: Lien[] = [
    { href: `/${locale}#produits`, label: t("products") },
    { href: `/${locale}#sur-mesure`, label: t("custom") },
    { href: `/${locale}#comment-ca-marche`, label: t("howItWorks") },
    { href: `/${locale}#faq`, label: t("faq") },
    { href: `/${locale}/blog`, label: t("blog") },
  ];

  const productLinks: Lien[] = [
    { href: "https://devizly.fr", label: t("devizly"), external: true },
    { href: "https://vlogyz.com", label: t("vlogyz"), external: true },
    { href: `/${locale}#internbullet`, label: t("internbullet") },
  ];

  const contactLinks: Lien[] = [
    { href: CALENDLY_URL, label: t("diagnostic"), external: true },
    { href: "mailto:contact@nbhc.fr", label: t("email") },
    { href: "https://www.linkedin.com/company/nbhc", label: t("linkedin"), external: true },
    { href: "https://x.com/harounNbhc", label: t("twitter"), external: true },
  ];

  const legalLinks: Lien[] = [
    { href: `/${locale}/mentions-legales`, label: t("legal") },
    { href: `/${locale}/politique-confidentialite`, label: t("privacy") },
    { href: `/${locale}/cgv`, label: t("cgv") },
    { href: `/${locale}/cgu`, label: t("cgu") },
  ];

  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
      <div
        className="grid gap-10 py-14 px-10 max-[900px]:px-5 max-[900px]:py-10 max-[900px]:gap-8 grid-cols-[1.5fr_1fr_1fr_1fr] max-[900px]:grid-cols-2 max-[520px]:grid-cols-1"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div className="flex flex-col gap-3 max-[900px]:col-span-full">
          <Logo variant="footer" />
          <div className="text-[13px]" style={{ color: "var(--text-muted)", lineHeight: 1.5 }}>
            {t("tagline")}
          </div>
        </div>
        <Colonne titre={t("navTitle")} liens={navLinks} />
        <Colonne titre={t("productsTitle")} liens={productLinks} />
        <Colonne titre={t("contactTitle")} liens={contactLinks} />
      </div>

      <div className="px-10 max-[900px]:px-5" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ padding: "20px 0", borderTop: "1px solid var(--border)" }}>
          <div style={{ fontSize: 13, color: "var(--text)", marginBottom: 12 }}>
            {t("sectorsTitle")}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {METIERS.map((slug) => (
              <a
                key={slug}
                href={`/${locale}/${slug}`}
                className={CLASSE_LIEN}
                style={{ color: "var(--text-muted)" }}
              >
                {t(`sectorLinks.${slug}`)}
              </a>
            ))}
          </div>
        </div>

        <div
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
          style={{ paddingTop: 16, borderTop: "1px solid var(--border)", fontSize: 12 }}
        >
          {legalLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="no-underline transition-colors duration-150 hover:text-[var(--text)]"
              style={{ color: "var(--text-muted)" }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="text-xs py-5" style={{ color: "var(--text-muted)" }}>
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
