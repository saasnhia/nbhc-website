import { setRequestLocale } from "next-intl/server";
import Nav from "../../../components/Nav";
import Contact from "../../../components/Contact";
import FinalCta from "../../../components/FinalCta";
import Footer from "../../../components/Footer";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Nav />
      <div style={{ paddingTop: 120 }} />
      <Contact />
      <FinalCta />
      <Footer />
    </main>
  );
}
