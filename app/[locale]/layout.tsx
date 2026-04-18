import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import AppShell from "../../components/AppShell";
import JsonLd from "../../components/JsonLd";
import { routing } from "../../i18n/routing";
import {
  organizationSchema,
  websiteSchema,
  professionalServiceSchema,
} from "../../lib/schema";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";

  const title = isFr
    ? "NBHC — Studio IA & Automatisation"
    : "NBHC — AI Studio & Automation";
  const description = isFr
    ? "Studio IA français. Nous concevons des solutions SaaS et systèmes d'intelligence artificielle sur mesure pour automatiser votre entreprise."
    : "French AI studio. We design custom SaaS solutions and AI systems to automate your business.";

  return {
    title,
    description,
    keywords: isFr
      ? ["agence IA", "automatisation", "SaaS sur mesure", "intelligence artificielle", "Next.js", "France"]
      : ["AI agency", "automation", "custom SaaS", "artificial intelligence", "Next.js", "France"],
    openGraph: {
      title,
      description,
      url: `https://nbhc.fr/${locale}`,
      images: [
        {
          url: "https://nbhc.fr/og-image.png",
          width: 1200,
          height: 630,
          alt: "NBHC Studio IA",
        },
      ],
      type: "website",
      siteName: "NBHC",
      locale: isFr ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://nbhc.fr/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon-32.png",
      apple: "/apple-touch-icon.png",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: `https://nbhc.fr/${locale}`,
      languages: {
        "fr-FR": "https://nbhc.fr/fr",
        "en-US": "https://nbhc.fr/en",
        "x-default": "https://nbhc.fr/fr",
      },
    },
    metadataBase: new URL("https://nbhc.fr"),
    authors: [{ name: "NBHC", url: "https://nbhc.fr" }],
    creator: "NBHC",
    publisher: "NBHC",
    category: "technology",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(locale as "fr" | "en"),
            professionalServiceSchema(),
          ]}
        />
        <NextIntlClientProvider>
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
