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
    ? "Automatisation IA pour organismes de formation (Qualiopi, OPCO) | NBHC"
    : "AI automation for training organizations (Qualiopi, OPCO) | NBHC";
  const description = isFr
    ? "Allégez la charge administrative Qualiopi, OPCO, émargement et convocations. NBHC prépare et rappelle, vous restez décideur. Diagnostic gratuit 30 min."
    : "Lighten the Qualiopi, OPCO, attendance sheet and notice admin burden. NBHC prepares and reminds, you stay in charge. Free 30-min diagnostic.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "automatisation organisme de formation",
          "logiciel préparation audit Qualiopi",
          "automatiser relance dossier OPCO",
          "automatisation émargement feuille de présence formation",
          "automatiser convocation stagiaire",
        ]
      : ["AI automation training organization", "Qualiopi audit preparation software"],
    alternates: localeCanonical(locale, "/automatisation-organisme-formation"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-organisme-formation`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation organisme de formation" }],
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
