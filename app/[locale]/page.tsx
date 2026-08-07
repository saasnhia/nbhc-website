import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyNow from "@/components/WhyNow";
import Sectors from "@/components/Sectors";
import VideoShowcase from "@/components/VideoShowcase";
import FondSections from "@/components/FondSections";
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
      {/* TRANSITION ENTRE POUR QUI ET EN ACTION.
          Une sequence scrubee de 75 vh occupait cette place et assurait la
          respiration entre l'appel a l'action de Pour qui et la carte du
          lecteur. En la retirant, les deux se retrouvaient adjacents : un
          bouton dore, puis un cadre borde, sans rien entre les deux.
          On reprend le filet deja employe entre les deux produits de Portfolio
          — un degrade horizontal a 4 % de blanc, peint une fois, sans filtre ni
          animation — et on lui donne de l'air. */}
      <div aria-hidden="true" className="py-20 max-[900px]:py-12">
        <div className="px-10 max-[900px]:px-5" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
            }}
          />
        </div>
      </div>
      <VideoShowcase />
      {/* HOWITWORKS EST SORTI DE L'ENVELOPPE, ET C'EST UNE MESURE QUI L'A DECIDE.
          Son illustration est un WebP OPAQUE sur #09090b. Posee sur le maillage
          anime, elle y decoupait un rectangle noir a arete franche : le fond
          immediatement autour d'elle mesurait rgb(12,12,12) — la video qui passe —
          contre rgb(9,9,11) dans l'image. C'est ce raccord manquant que le cadre
          de carte compensait, et non un besoin d'ornement.
          Hors enveloppe, le fond de page vaut exactement la valeur du coin des
          rendus Blender, la couture disparait, et le cadre n'a plus de raison
          d'etre. Il est retire dans le meme lot. */}
      <HowItWorks />
      {/* Calque anime derriere ces deux sections, pas entre elles.
          Tarifs est inclus : la sortie du calque a la frontiere
          Portfolio/Tarifs se lisait comme une coupure nette, et prolonger
          supprime la couture au lieu de la maquiller. Le fondu ne tombe donc
          qu'au vrai debut et a la vraie fin du parcours couvert. */}
      <FondSections>
        <Portfolio />
        <Pricing />
      </FondSections>
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
