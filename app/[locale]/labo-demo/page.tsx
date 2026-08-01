// Page de test du GATE 1 — mesure de faisabilité du lecteur interactif.
// Hors navigation, non indexée. La home n'est pas touchée à ce stade.
import type { Metadata } from "next";
import PremiumDemoSection from "../../../components/sector-demos/premium/PremiumDemoSection";

export const metadata: Metadata = {
  title: "Labo — démo interactive",
  robots: { index: false, follow: false },
};

export default function LaboDemo() {
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Labo — démo garage pilotable</h1>
      <p style={{ color: "var(--muted, #94A3B8)", marginBottom: 32, fontSize: 15 }}>
        Page de mesure. La démo se pilote au clic ou aux flèches ← →. À l’étape de
        validation, la lecture s’arrête et attend votre clic.
      </p>
      <PremiumDemoSection />
    </main>
  );
}
