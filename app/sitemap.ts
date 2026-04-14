import type { MetadataRoute } from "next";

const locales = ["fr", "en"] as const;

type PageDef = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const pages: PageDef[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/agentic-ai", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 1.0 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog/automatisation-ia-cabinet-comptable", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/montage-video-ia-createurs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/devis-automatique-artisans", changeFrequency: "monthly", priority: 0.7 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3 },
  { path: "/politique-confidentialite", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cgv", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cgu", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.flatMap((p) =>
    locales.map((locale) => ({
      url: `https://nbhc.fr/${locale}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {
        languages: {
          fr: `https://nbhc.fr/fr${p.path}`,
          en: `https://nbhc.fr/en${p.path}`,
        },
      },
    }))
  );
}
