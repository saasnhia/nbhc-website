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
    ? "Tarifs — Automatisation IA pour TPE, PME et indépendants | NBHC"
    : "Pricing — AI automation for small businesses | NBHC";
  const description = isFr
    ? "Essentiel à partir de 200 € HT (automatisation standardisée), Sur Mesure Léger à partir de 2 000 € HT (intégration à vos outils), Sur Devis au-delà. Simulateur gratuit, diagnostic 30 min offert."
    : "Essential from €200 excl. VAT (standardised automation), Light Custom from €2,000 excl. VAT (integration with your tools), Custom Quote beyond. Free simulator, 30-min diagnostic included.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "prix automatisation IA PME",
          "tarif automatisation entreprise",
          "combien coute une automatisation IA",
          "devis automatisation workflow n8n",
        ]
      : ["AI automation pricing", "business automation cost"],
    alternates: localeCanonical(locale, "/tarifs"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/tarifs`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Tarifs" }],
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
