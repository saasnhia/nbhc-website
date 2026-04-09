import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Diagnostic gratuit AaaS · NBHC",
  description:
    "Diagnostic gratuit de 30 minutes. On analyse vos flux de travail et on identifie les tâches que des agents IA peuvent automatiser.",
  alternates: {
    canonical: "https://nbhc.fr/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
