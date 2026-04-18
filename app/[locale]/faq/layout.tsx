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
    ? "FAQ — Questions fréquentes · NBHC Studio IA"
    : "FAQ — Frequently asked questions · NBHC AI Studio";
  const description = isFr
    ? "Tarifs, délais, RGPD, intégrations… toutes les réponses sur nos agents IA sur mesure et nos SaaS Vlogyz, Devizly, Worthifast."
    : "Pricing, timelines, GDPR, integrations… everything you need to know about our custom AI agents and our SaaS products Vlogyz, Devizly, Worthifast.";

  return {
    title,
    description,
    alternates: localeCanonical(locale, "/faq"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/faq`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC FAQ" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://nbhc.fr/og-image.png"],
    },
  };
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
