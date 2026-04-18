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
    ? "Contact — Diagnostic gratuit 30 min · NBHC"
    : "Contact — Free 30-min diagnostic · NBHC";
  const description = isFr
    ? "Diagnostic gratuit de 30 minutes. Nous analysons vos flux de travail et identifions les tâches que des agents IA peuvent automatiser. Sans engagement."
    : "Free 30-minute diagnostic. We map your workflows and identify tasks AI agents can automate. No commitment.";

  return {
    title,
    description,
    alternates: localeCanonical(locale, "/contact"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/contact`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC Contact" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://nbhc.fr/og-image.png"],
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
