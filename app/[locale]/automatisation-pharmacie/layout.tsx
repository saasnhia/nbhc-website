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
    ? "Automatisation IA pour officines de pharmacie | NBHC"
    : "AI automation for pharmacies | NBHC";
  const description = isFr
    ? "Détection BPM, entretiens pharmaceutiques, ruptures, rejets tiers-payant, préparation qualité : NBHC prépare, vous restez l'acteur qui décide et facture. Diagnostic gratuit 30 min."
    : "BPM detection, pharmacist consultations, shortage alerts, third-party payer rejections, quality prep: NBHC prepares, you stay the one who decides and bills. Free 30-min diagnostic.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "automatisation pharmacie IA",
          "détection patients éligibles bilan partagé de médication",
          "automatisation entretien pharmaceutique",
          "alerte rupture stock pharmacie",
          "automatisation tiers-payant pharmacie",
        ]
      : ["AI automation pharmacy", "pharmacist medication review automation"],
    alternates: localeCanonical(locale, "/automatisation-pharmacie"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-pharmacie`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation pharmacie" }],
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
