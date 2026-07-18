import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyNow from "@/components/WhyNow";
import Sectors from "@/components/Sectors";
import HowItWorks from "@/components/HowItWorks";
import Portfolio from "@/components/Portfolio";
import Pricing from "@/components/Pricing";
import Differentiators from "@/components/Differentiators";
import FAQ from "@/components/FAQ";
import FinalCta from "@/components/FinalCta";
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
      ? "Studio IA français. Nous concevons et opérons des workflows d'automatisation IA sur mesure pour automatiser les tâches répétitives de votre entreprise."
      : "French AI studio. We design and operate custom AI automation workflows to automate the repetitive tasks of your business.",
    inLanguage: isFr ? "fr-FR" : "en-US",
    isPartOf: { "@id": "https://nbhc.fr/#website" },
    about: { "@id": "https://nbhc.fr/#organization" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://nbhc.fr/og-image.png",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: isFr
          ? "Je n'y connais rien en IA, c'est grave ?"
          : "I don't know anything about AI, is that a problem?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isFr
            ? "Pas du tout. C'est justement pour ça qu'on existe. On s'occupe de toute la partie technique. Vous, vous nous expliquez votre métier et ce qui vous prend du temps."
            : "Not at all. That's exactly why we exist. We handle the entire technical side. You just explain your trade and what's taking up your time.",
        },
      },
      {
        "@type": "Question",
        name: isFr
          ? "Combien de temps avant de voir les résultats ?"
          : "How long before I see results?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isFr
            ? "Entre 1 et 5 semaines selon la complexité. Une automatisation standardisée (Essentiel) est livrée en 1-2 semaines. Une automatisation sur mesure, intégrée à vos outils (Sur Mesure Léger), prend 2-5 semaines."
            : "Between 1 and 5 weeks depending on complexity. A standardized automation (Essentiel) is delivered in 1-2 weeks. A custom automation integrated with your tools (Sur Mesure Léger) takes 2-5 weeks.",
        },
      },
      {
        "@type": "Question",
        name: isFr
          ? "Mes données sont en sécurité ?"
          : "Is my data safe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: isFr
            ? "Oui. On utilise Mistral, un modèle IA français, hébergé en UE, conformément au RGPD."
            : "Yes. We use Mistral, a French AI model, hosted in the EU, GDPR-compliant.",
        },
      },
    ],
  };

  return (
    <main>
      <Nav />
      <Hero />
      <WhyNow />
      <Sectors />
      <HowItWorks />
      <Portfolio />
      <Pricing />
      <Differentiators />
      <FAQ />
      <FinalCta />
      <Contact />
      <Footer />
      <JsonLd
        data={[
          webPageSchema,
          faqSchema,
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: homeUrl },
          ]),
        ]}
      />
    </main>
  );
}
