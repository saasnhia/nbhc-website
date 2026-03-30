import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import Stats from "@/components/Stats";
import Approche from "@/components/Approche";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <MarqueeStrip />
      <Stats />
      <Approche />
      <Portfolio />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
