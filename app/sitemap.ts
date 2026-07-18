import type { MetadataRoute } from "next";

const locales = ["fr", "en"] as const;

type PageDef = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
};

const pages: PageDef[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/automatisation-salle-de-sport", changeFrequency: "monthly", priority: 0.9 },
  { path: "/automatisation-association-sportive", changeFrequency: "monthly", priority: 0.9 },
  { path: "/automatisation-garage-automobile", changeFrequency: "monthly", priority: 0.9 },
  { path: "/automatisation-artisan-btp", changeFrequency: "monthly", priority: 0.9 },
  { path: "/automatisation-organisme-formation", changeFrequency: "monthly", priority: 0.9 },
  { path: "/automatisation-pharmacie", changeFrequency: "monthly", priority: 0.9 },
  { path: "/automatisation-restaurant", changeFrequency: "monthly", priority: 0.9 },
  { path: "/automatisation-salon-de-coiffure", changeFrequency: "monthly", priority: 0.9 },
  { path: "/automatisation-marque-cosmetique", changeFrequency: "monthly", priority: 0.9 },
  { path: "/tarifs", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.75 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/blog/montage-video-ia-createurs", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/devis-automatique-artisans", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/reduire-no-show-cours-collectifs-salle-de-sport", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/certificats-medicaux-licences-association-sportive", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog/relancer-abonnements-adherents-inactifs-salle-de-sport", changeFrequency: "monthly", priority: 0.7 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.2 },
  { path: "/politique-confidentialite", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cgv", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cgu", changeFrequency: "yearly", priority: 0.2 },
];
// Note: /agentic-ai intentionally excluded — it's a server-side redirect to
// /tarifs (kept for old backlinks), not indexable content. Declaring it in
// the sitemap at high priority previously sent Google a page-worth-crawling
// signal for a URL that never serves content. See SEO_AUDIT_STRATEGIE.md.

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
          "fr-FR": `https://nbhc.fr/fr${p.path}`,
          "en-US": `https://nbhc.fr/en${p.path}`,
          "x-default": `https://nbhc.fr/fr${p.path}`,
        },
      },
    }))
  );
}
