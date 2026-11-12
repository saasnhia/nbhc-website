import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import SurMesure from "@/components/SurMesure";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, faqPageSchema } from "@/lib/schema";

const QUESTIONS = [1, 2, 3, 4, 5, 6] as const;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeUrl = `https://nbhc.fr/${locale}`;
  const isFr = locale === "fr";
  const tFaq = await getTranslations({ locale, namespace: "faq" });

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${homeUrl}#webpage`,
    url: homeUrl,
    name: isFr
      ? "NBHC — Logiciels métier et outils sur mesure"
      : "NBHC — Business software and custom tools",
    description: isFr
      ? "NBHC conçoit et développe des logiciels : Devizly, Vlogyz, internbullet, et des outils sur mesure pour les entreprises."
      : "NBHC designs and develops software: Devizly, Vlogyz, internbullet, and custom tools for companies.",
    inLanguage: isFr ? "fr-FR" : "en-US",
    isPartOf: { "@id": "https://nbhc.fr/#website" },
    about: { "@id": "https://nbhc.fr/#organization" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://nbhc.fr/og-image.png",
    },
  };

  /* Le balisage FAQ est tiré des mêmes messages que la section affichée : les
     deux ne peuvent plus se contredire. */
  const faqSchema = faqPageSchema(
    QUESTIONS.map((n) => ({ question: tFaq(`q${n}`), answer: tFaq(`a${n}`) }))
  );

  return (
    <main>
      <Nav />
      <Hero />
      <Portfolio />
      <SurMesure />
      <HowItWorks />
      <FAQ />
      <Contact />
      <Footer />
      <JsonLd
        data={[
          webPageSchema,
          faqSchema,
          breadcrumbSchema([{ name: isFr ? "Accueil" : "Home", url: homeUrl }]),
        ]}
      />
    </main>
  );
}
