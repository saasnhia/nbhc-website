"use client";

// Banc d'essai : un secteur par famille de mise en scène, pour vérifier le
// parcours complet (étapes, clavier, bouton Valider aligné, coche).
import { useState } from "react";
import PremiumDemoSection from "../../../components/sector-demos/premium/PremiumDemoSection";
import type { DemoKey } from "../../../components/sector-demos/premium/registry";

const CASES: { key: DemoKey; famille: string; labels: string[] }[] = [
  {
    key: "garage",
    famille: "téléphone",
    labels: [
      "L’appel arrive", "L’assistant répond", "Il comprend la demande",
      "Il vérifie le planning", "Il propose un créneau", "Il rédige la fiche",
      "Vous validez", "Le résultat",
    ],
  },
  {
    key: "pharmacie",
    famille: "liste",
    labels: [
      "Votre patientèle", "Le critère d’éligibilité", "L’IA parcourt la liste",
      "Les patients éligibles", "Une proposition", "Vous choisissez",
      "Vous validez", "Le résultat",
    ],
  },
  {
    key: "btp",
    famille: "devis",
    labels: [
      "La demande client", "Le devis se remplit", "Le total se calcule",
      "Remise appliquée", "Un brouillon, pas un envoi", "Vous relisez",
      "Vous validez", "Le résultat",
    ],
  },
];

export default function LaboClient() {
  const [i, setI] = useState(0);
  const c = CASES[i];
  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
      <h1 style={{ fontSize: 26, marginBottom: 16 }}>Labo — démos pilotables</h1>
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {CASES.map((x, n) => (
          <button
            key={x.key}
            type="button"
            data-labo-tab={x.key}
            onClick={() => setI(n)}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: 13,
              border: n === i ? "1px solid #0A84FF" : "1px solid rgba(255,255,255,0.16)",
              background: n === i ? "rgba(10,132,255,0.16)" : "transparent",
              color: "var(--text, #F5F5F7)",
            }}
          >
            {x.key} ({x.famille})
          </button>
        ))}
      </div>
      <PremiumDemoSection
        demoKey={c.key}
        labels={c.labels}
        validateLabel="Valider"
        hintLabel="La démonstration attend votre validation — rien n’est envoyé sans elle."
        ariaLabel="Démonstration interactive"
      />
    </main>
  );
}
