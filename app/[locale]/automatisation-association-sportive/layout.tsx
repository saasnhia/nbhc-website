import type { Metadata } from "next";
import { localeCanonical } from "../../../lib/schema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  const title = isFr
    ? "Automatisation IA pour associations sportives (loi 1901) | NBHC"
    : "AI automation for sports associations (non-profit) | NBHC";
  const description = isFr
    ? "Automatisez les inscriptions, certificats, licences, cotisations et convocations de votre club sportif. Offre solidaire dès 1 000 € HT. Diagnostic gratuit 30 min."
    : "Automate sign-ups, medical certificates, licenses, dues and match notices for your sports club. Solidarity offer from €1,000 excl. VAT. Free 30-min diagnostic.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "automatiser inscriptions association sportive",
          "relance cotisations impayées club sportif",
          "gestion certificats médicaux club sport",
          "automatisation club loi 1901",
        ]
      : ["sports club automation", "non-profit sports association software"],
    alternates: localeCanonical(locale, "/automatisation-association-sportive"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-association-sportive`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation association sportive" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://nbhc.fr/og-image.png"],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
