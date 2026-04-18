import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Portfolio from "@/components/Portfolio";
import Sectors from "@/components/Sectors";
import Services from "@/components/Services";
import Approche from "@/components/Approche";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const homeUrl = `https://nbhc.fr/${locale}`;
  const isFr = locale === "fr";

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${homeUrl}#webpage`,
    url: homeUrl,
    name: isFr
      ? "NBHC — Studio IA & Automatisation"
      : "NBHC — AI Studio & Automation",
    description: isFr
      ? "Studio IA français. Nous concevons et opérons des agents IA et des SaaS métiers pour automatiser votre entreprise."
      : "French AI studio. We design and operate AI agents and business SaaS products to automate your company.",
    inLanguage: isFr ? "fr-FR" : "en-US",
    isPartOf: { "@id": "https://nbhc.fr/#website" },
    about: { "@id": "https://nbhc.fr/#organization" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://nbhc.fr/og-image.png",
    },
  };

  return (
    <main>
      <Nav />
      <Hero />
      <MarqueeStrip />
      <Stats />
      <HowItWorks />
      <Portfolio />
      <Sectors />
      <Services />
      <Approche />
      <Contact />
      <Footer />
      <JsonLd
        data={[
          webPageSchema,
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: homeUrl },
          ]),
        ]}
      />
    </main>
  );
}
