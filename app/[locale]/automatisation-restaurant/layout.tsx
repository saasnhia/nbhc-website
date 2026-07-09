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
    ? "Automatisation IA pour restaurants | NBHC"
    : "AI automation for restaurants | NBHC";
  const description = isFr
    ? "IA téléphonique de réservation, WhatsApp commande et remise ciblée, anti no-show, avis Google : NBHC prépare, vous restez le restaurateur qui décide et sert. Diagnostic gratuit 30 min."
    : "AI phone booking, WhatsApp ordering and targeted discounts, no-show reminders, Google reviews: NBHC prepares, you stay the owner who decides and serves. Free 30-min diagnostic.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "automatisation restaurant IA",
          "IA téléphonique réservation restaurant",
          "WhatsApp Business restaurant",
          "automatisation no-show restaurant",
          "automatisation avis Google restaurant",
        ]
      : ["AI automation restaurant", "AI phone booking restaurant"],
    alternates: localeCanonical(locale, "/automatisation-restaurant"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-restaurant`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation restaurant" }],
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
