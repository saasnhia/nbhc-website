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
    ? "Automatisation IA pour salons de coiffure | NBHC"
    : "AI automation for hair salons | NBHC";
  const description = isFr
    ? "IA téléphonique de prise de RDV, relance et rappel WhatsApp, fiche cliente, cartes cadeaux, anti no-show : NBHC prépare, vous restez la coiffeuse ou le salon qui décide. Diagnostic gratuit 30 min."
    : "AI phone booking, WhatsApp reminders and follow-ups, client files, gift cards, no-show prevention: NBHC prepares, you stay the salon that decides. Free 30-min diagnostic.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "automatisation salon de coiffure IA",
          "IA téléphonique prise de rendez-vous coiffeur",
          "WhatsApp Business salon de coiffure",
          "relance client salon de coiffure",
          "automatisation no-show coiffeur",
        ]
      : ["AI automation hair salon", "AI phone booking salon"],
    alternates: localeCanonical(locale, "/automatisation-salon-de-coiffure"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-salon-de-coiffure`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation salon de coiffure" }],
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
