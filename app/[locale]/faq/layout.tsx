import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — NBHC Studio IA & Automatisation",
  description:
    "Toutes vos questions sur nos solutions IA sur mesure, Vlogyz, Devizly et Worthifast.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
