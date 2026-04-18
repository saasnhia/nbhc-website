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
    ? "Agentic AI as a Service — Agents IA sur mesure | NBHC"
    : "Agentic AI as a Service — Custom AI agents | NBHC";
  const description = isFr
    ? "Des équipes d'agents IA déployées et opérées par NBHC pour automatiser vos flux métier : comptabilité, devis, contenu. Dès 490€/mois. Infrastructure RGPD France."
    : "AI agent teams deployed and operated by NBHC to automate your workflows: accounting, quoting, content. From €490/month. GDPR-compliant infrastructure in France.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "Agentic AI as a Service",
          "agents IA sur mesure",
          "automatisation IA TPE PME",
          "multi-agents",
          "agents IA France",
          "studio IA",
          "RGPD",
        ]
      : [
          "Agentic AI as a Service",
          "custom AI agents",
          "SME AI automation",
          "multi-agent systems",
          "AI agents France",
          "AI studio",
          "GDPR",
        ],
    alternates: localeCanonical(locale, "/agentic-ai"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/agentic-ai`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC Agentic AI" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://nbhc.fr/og-image.png"],
    },
  };
}

export default function AgenticAILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
