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
    ? "Automatisation IA pour opticiens | NBHC"
    : "AI automation for opticians | NBHC";
  const description = isFr
    ? "Relance des clients à renouveler, notification fabrication prête, stock multi-boutiques, suivi mutuelle : NBHC prépare, vous restez l'opticien qui examine, conseille et vend. Diagnostic gratuit 30 min."
    : "Renewal reminders, ready-for-pickup notifications, multi-store stock sync, insurance follow-up: NBHC prepares, you stay the optician who examines, advises and sells. Free 30-min diagnostic.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "automatisation opticien IA",
          "relance client renouvellement lunettes",
          "automatisation magasin optique",
          "stock multi-boutiques opticien",
          "automatisation tiers-payant mutuelle optique",
        ]
      : ["AI automation optician", "optical store automation"],
    alternates: localeCanonical(locale, "/automatisation-opticien"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-opticien`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation opticien" }],
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
