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
    ? "Automatisation IA pour salles de sport, studios et instituts | NBHC"
    : "AI automation for gyms, studios and wellness centers | NBHC";
  const description = isFr
    ? "Automatisez les relances d'abonnements, la prise de RDV et la gestion des no-shows de votre salle de sport, studio ou institut bien-être. Diagnostic gratuit 30 min."
    : "Automate membership follow-ups, appointment booking and no-show management for your gym, studio or wellness center. Free 30-min diagnostic.";

  return {
    title,
    description,
    keywords: isFr
      ? [
          "automatisation IA salle de sport",
          "automatiser relances abonnement salle de sport",
          "chatbot prise de rendez-vous institut de beauté",
          "réduire no-show cours collectifs",
          "automatisation studio yoga pilates",
        ]
      : [
          "AI automation gym",
          "fitness membership automation",
          "wellness studio booking automation",
          "reduce gym no-shows",
        ],
    alternates: localeCanonical(locale, "/automatisation-salle-de-sport"),
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}/automatisation-salle-de-sport`,
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
      images: [{ url: "https://nbhc.fr/og-image.png", width: 1200, height: 630, alt: "NBHC — Automatisation salle de sport" }],
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
