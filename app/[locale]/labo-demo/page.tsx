// Page de banc d'essai — hors navigation, non indexee. Sert a verifier le
// parcours complet sur des secteurs de familles differentes.
import type { Metadata } from "next";
import LaboClient from "./LaboClient";

export const metadata: Metadata = {
  title: "Labo — demo interactive",
  robots: { index: false, follow: false },
};

export default function LaboDemo() {
  return <LaboClient />;
}
