import { setRequestLocale, getTranslations } from "next-intl/server";
import TarifsPageContent from "../../../components/TarifsPageContent";
import JsonLd from "../../../components/JsonLd";
import { serviceSchema, breadcrumbSchema } from "../../../lib/schema";

export default async function TarifsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === "fr";

  const tA = await getTranslations({ locale, namespace: "tarifs.blocA" });
  const pageUrl = `https://nbhc.fr/${locale}/tarifs`;

  return (
    <>
      <TarifsPageContent locale={locale} />
      <JsonLd
        data={[
          serviceSchema(locale as "fr" | "en", [
            {
              name: tA("essentielName"),
              price: "200",
              description: isFr
                ? "Automatisation standardisée, workflow pré-construit configuré pour votre activité"
                : "Standardised automation, pre-built workflow configured for your business",
              url: pageUrl,
            },
            {
              name: tA("surMesureLegerName"),
              price: "2000",
              description: isFr
                ? "Automatisation sur mesure avec intégration à votre logiciel de gestion existant"
                : "Custom automation with integration into your existing management software",
              url: pageUrl,
            },
          ]),
          breadcrumbSchema([
            { name: isFr ? "Accueil" : "Home", url: `https://nbhc.fr/${locale}` },
            { name: isFr ? "Tarifs" : "Pricing", url: pageUrl },
          ]),
        ]}
      />
    </>
  );
}
