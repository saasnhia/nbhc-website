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
    ? "Automatisation IA pour garages et carrosseries indépendants | NBHC"
    : "AI automation for independent garages and body shops | NBHC";
  const description = isFr
    ? "Agent IA téléphonique, relance de devis, rappels révision/CT automatiques pour votre garage ou carrosserie indépendante. Diagnostic gratuit 30 min."
    : "AI phone agent, quote follow-ups, automatic service/inspection reminders for your independent garage or body shop. Free 30-min diagnostic.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "agent IA téléphonique garage automobile",
          "automatisation IA garage indépendant",
          "relance devis automatique garage",
          "rappel automatique contrôle technique révision",
        ]
      : ["AI automation garage", "auto repair shop AI agent"],
    alternates: localeCanonical(locale, "/automatisation-garage-automobile"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-garage-automobile`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation garage automobile" }],
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
