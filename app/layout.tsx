import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "NBHC — Studio IA & Automatisation",
  description:
    "Studio IA français. Nous concevons des solutions SaaS et systèmes d'intelligence artificielle sur mesure pour automatiser votre entreprise.",
  keywords: [
    "agence IA",
    "automatisation",
    "SaaS sur mesure",
    "intelligence artificielle",
    "Next.js",
    "France",
  ],
  openGraph: {
    title: "NBHC — Studio IA & Automatisation",
    description:
      "Studio IA français. Nous concevons des solutions SaaS et systèmes d'intelligence artificielle sur mesure pour automatiser votre entreprise.",
    url: "https://nbhc.fr",
    type: "website",
    siteName: "NBHC",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "NBHC — Studio IA & Automatisation",
    description:
      "Studio IA français. Solutions SaaS et IA sur mesure pour automatiser votre entreprise.",
  },
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://nbhc.fr",
  },
  metadataBase: new URL("https://nbhc.fr"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
