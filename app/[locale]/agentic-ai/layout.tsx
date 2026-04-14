import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentic AI as a Service — NBHC",
  description:
    "Des équipes d'agents IA déployées pour votre entreprise. Automatisez vos flux métier avec des systèmes intelligents opérés par NBHC.",
  alternates: {
    canonical: "https://nbhc.fr/agentic-ai",
  },
};

export default function AgenticAILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
