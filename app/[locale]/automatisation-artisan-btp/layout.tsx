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
    ? "Automatisation IA pour artisans et TPE du bâtiment (BTP) | NBHC"
    : "AI automation for tradespeople and construction SMEs | NBHC";
  const description = isFr
    ? "Automatisez vos devis, relances et facturation d'artisan ou de TPE du bâtiment. Diagnostic gratuit 30 min, IA Mistral française."
    : "Automate quotes, follow-ups and invoicing for your trade business or construction SME. Free 30-min diagnostic, French Mistral AI.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "logiciel devis automatique artisan BTP",
          "automatiser relance devis artisan",
          "automatisation facturation TPE bâtiment",
          "automatisation IA artisan plombier électricien",
        ]
      : ["AI automation tradespeople", "construction SME quote automation"],
    alternates: localeCanonical(locale, "/automatisation-artisan-btp"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-artisan-btp`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation artisan BTP" }],
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
