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

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

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
    </main>
  );
}
