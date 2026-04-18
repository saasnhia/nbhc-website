const SITE_URL = "https://nbhc.fr";
const SITE_NAME = "NBHC";
const LEGAL_NAME = "SAS NBHC";
const LOGO_URL = `${SITE_URL}/logo.png`;
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const LINKEDIN_URL = "https://www.linkedin.com/company/nbhc";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: LEGAL_NAME,
    alternateName: "NBHC Studio IA",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: OG_IMAGE,
    description:
      "Studio IA français. Conception et opération d'agents IA et de systèmes d'automatisation sur mesure pour TPE, PME et indépendants.",
    foundingDate: "2025",
    taxID: "102637899",
    vatID: "FR102637899",
    identifier: [
      { "@type": "PropertyValue", propertyID: "SIREN", value: "102637899" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
    },
    areaServed: { "@type": "Country", name: "France" },
    email: "contact@nbhc.fr",
    sameAs: [LINKEDIN_URL],
    knowsAbout: [
      "Intelligence artificielle",
      "Agents IA",
      "Automatisation",
      "SaaS",
      "Next.js",
      "Mistral AI",
      "RGPD",
    ],
  };
}

export function websiteSchema(locale: "fr" | "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      locale === "fr"
        ? "Studio IA français — agents IA et automatisation sur mesure."
        : "French AI studio — custom AI agents and automation.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: LOGO_URL,
    priceRange: "€€€",
    description:
      "Studio IA & automatisation : agents IA sur mesure, SaaS métiers, conformité RGPD (données hébergées en Europe).",
    address: { "@type": "PostalAddress", addressCountry: "FR" },
    areaServed: { "@type": "Country", name: "France" },
    email: "contact@nbhc.fr",
    sameAs: [LINKEDIN_URL],
  };
}

type BreadcrumbItem = { name: string; url: string };
export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type ServiceOffer = {
  name: string;
  price: string;
  priceCurrency?: string;
  description: string;
  url: string;
};

export function serviceSchema(locale: "fr" | "en", offers: ServiceOffer[]) {
  const isFr = locale === "fr";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/${locale}/agentic-ai#service`,
    serviceType: "Agentic AI as a Service",
    name: isFr
      ? "Agentic AI as a Service — agents IA sur mesure"
      : "Agentic AI as a Service — custom AI agents",
    description: isFr
      ? "Conception, déploiement et opération d'équipes d'agents IA pour automatiser vos flux métier : comptabilité, devis, contenu, support client."
      : "Design, deployment and operation of AI agent teams to automate your business workflows: accounting, quoting, content, customer support.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "France" },
    url: `${SITE_URL}/${locale}/agentic-ai`,
    offers: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: o.priceCurrency ?? "EUR",
      description: o.description,
      url: o.url,
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: o.price,
        priceCurrency: o.priceCurrency ?? "EUR",
        unitText: "MONTH",
      },
    })),
  };
}

type FAQItem = { question: string; answer: string };
export function faqPageSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

type BlogPostArgs = {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  tags?: string[];
  locale: "fr" | "en";
};
export function blogPostingSchema(p: BlogPostArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.datePublished,
    dateModified: p.dateModified ?? p.datePublished,
    inLanguage: p.locale === "fr" ? "fr-FR" : "en-US",
    image: p.image ?? OG_IMAGE,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": p.url },
    keywords: p.tags?.join(", "),
    url: p.url,
  };
}

export function hreflangAlternates(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return {
    canonical: `${SITE_URL}/fr${clean}`,
    languages: {
      "fr-FR": `${SITE_URL}/fr${clean}`,
      "en-US": `${SITE_URL}/en${clean}`,
      "x-default": `${SITE_URL}/fr${clean}`,
    },
  };
}

export function localeCanonical(locale: string, path: string) {
  const clean = path.startsWith("/") ? path : path ? `/${path}` : "";
  return {
    canonical: `${SITE_URL}/${locale}${clean}`,
    languages: {
      "fr-FR": `${SITE_URL}/fr${clean}`,
      "en-US": `${SITE_URL}/en${clean}`,
      "x-default": `${SITE_URL}/fr${clean}`,
    },
  };
}

export const SITE = {
  url: SITE_URL,
  name: SITE_NAME,
  ogImage: OG_IMAGE,
  logo: LOGO_URL,
};
