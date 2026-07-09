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
    ? "Automatisation IA pour marques de cosmétique et parfumerie | NBHC"
    : "AI automation for cosmetics and fragrance brands | NBHC";
  const description = isFr
    ? "Dossier réglementaire cosmétique préparé, synchro stock boutiques/e-shop, avis multi-plateformes, échantillons influenceurs, commandes B2B : NBHC prépare, votre responsable conformité valide et déclare. Diagnostic gratuit 30 min."
    : "Cosmetic regulatory file prep, multi-store stock sync, multi-platform reviews, influencer sample tracking, B2B orders: NBHC prepares, your compliance lead validates and files. Free 30-min diagnostic.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "automatisation marque cosmétique IA",
          "dossier réglementaire cosmétique CPNP",
          "synchro stock boutique e-shop",
          "automatisation parfumerie luxe",
          "automatisation commandes B2B revendeurs",
        ]
      : ["AI automation cosmetics brand", "cosmetic regulatory file automation"],
    alternates: localeCanonical(locale, "/automatisation-marque-cosmetique"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-marque-cosmetique`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation marque de cosmétique" }],
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
