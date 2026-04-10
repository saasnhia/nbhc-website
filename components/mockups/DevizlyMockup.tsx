"use client";

import { useState } from "react";

const lines = [
  { desc: "Démontage ancien équipement", qty: 1, price: 250 },
  { desc: "Pose nouvelle cuisine sur mesure", qty: 1, price: 8500 },
  { desc: "Remplacement électricité (NF C 15-100)", qty: 1, price: 1200 },
  { desc: "Remplacement plomberie (eau ch/fr)", qty: 1, price: 950 },
  { desc: "Pose carrelage sol (20m²)", qty: 20, price: 45 },
  { desc: "Pose crédence (10m²)", qty: 10, price: 60 },
  { desc: "Peinture murs et plafond (20m²)", qty: 20, price: 25 },
  { desc: "Pose éclairage LED encastré", qty: 6, price: 80 },
  { desc: "Robinetterie et mitigeur", qty: 1, price: 250 },
  { desc: "Finition et nettoyage chantier", qty: 1, price: 200 },
];

const totalHT = 13830;
const tva = 2766;
const totalTTC = 16596;

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);

export default function DevizlyMockup() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fafaf9",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        overflow: "hidden",
        height: 400,
        display: "flex",
        flexDirection: "column",
        fontSize: 11,
        fontFamily: "var(--font-dm-sans)",
        color: "#1a1a2e",
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.01)" : "scale(1)",
        cursor: "default",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ height: 36, borderBottom: "1px solid #e5e5e5" }}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-[13px]" style={{ color: "#5B5BD6" }}>
            ■ Devizly
          </span>
        </div>
        <span
          className="text-[9px] px-2 py-0.5 rounded-full font-medium"
          style={{ background: "#f3f4f6", color: "#6b7280", border: "1px solid #e5e5e5" }}
        >
          Brouillon
        </span>
      </div>

      {/* Body — scrollable */}
      <div className="flex-1 overflow-y-auto mockup-scroll px-4 py-3">
        {/* Title */}
        <div className="mb-0.5">
          <div className="font-bold text-[14px]" style={{ color: "#111" }}>
            Devis rénovation cuisine complète
          </div>
          <div className="flex items-center justify-between text-[9px]" style={{ color: "#9ca3af" }}>
            <span>Devis n° DEV-0020 — 08/04/2026</span>
            <span>Valide jusqu&apos;au 08/05/2026</span>
          </div>
        </div>

        {/* Table */}
        <table className="w-full mt-2" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #e5e5e5" }}>
              <th className="text-left text-[9px] font-semibold py-1 pr-2" style={{ color: "#6b7280" }}>Description</th>
              <th className="text-center text-[9px] font-semibold py-1 px-1" style={{ color: "#6b7280", width: 30 }}>Qté</th>
              <th className="text-right text-[9px] font-semibold py-1 px-1" style={{ color: "#6b7280", width: 60 }}>Prix unit.</th>
              <th className="text-right text-[9px] font-semibold py-1 pl-1" style={{ color: "#6b7280", width: 60 }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td className="py-1 pr-2 text-[10px]">{l.desc}</td>
                <td className="py-1 px-1 text-center text-[10px]" style={{ color: "#6b7280" }}>{l.qty}</td>
                <td className="py-1 px-1 text-right text-[10px]" style={{ color: "#6b7280" }}>{fmt(l.price)} €</td>
                <td className="py-1 pl-1 text-right text-[10px] font-medium">{fmt(l.qty * l.price)} €</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-2 space-y-0.5" style={{ textAlign: "right" }}>
          <div className="text-[10px]" style={{ color: "#6b7280" }}>
            Total HT <span className="ml-3 font-medium" style={{ color: "#374151" }}>{fmt(totalHT)} €</span>
          </div>
          <div className="text-[10px]" style={{ color: "#6b7280" }}>
            TVA (20%) <span className="ml-3 font-medium" style={{ color: "#374151" }}>{fmt(tva)} €</span>
          </div>
          <div className="text-[13px] font-bold mt-1" style={{ color: "#111" }}>
            Total TTC <span className="ml-3" style={{ color: "#5B5BD6" }}>{fmt(totalTTC)} €</span>
          </div>
        </div>

        {/* Notes */}
        <div
          className="mt-3 p-2.5 rounded text-[9px]"
          style={{ background: "#f9fafb", border: "1px solid #e5e5e5", color: "#6b7280" }}
        >
          <div className="font-semibold mb-0.5" style={{ color: "#374151" }}>Notes</div>
          Prix HT valable pour un chantier standard en région parisienne. Devis valable 3 mois. Fournitures incluses sauf électroménager.
        </div>

        {/* Buttons — hover reveal */}
        <div className="mt-3 space-y-1.5" style={{ opacity: hovered ? 1 : 0.35, transition: "opacity 0.3s" }}>
          <button
            className="w-full text-[10px] font-medium py-1.5 rounded"
            style={{ background: "#f3f4f6", color: "#374151", border: "1px solid #d1d5db", cursor: "pointer" }}
          >
            ⬇ Télécharger PDF
          </button>
          <button
            className="w-full text-[11px] font-bold py-2 rounded"
            style={{ background: "#22c55e", color: "#fff", border: "none", cursor: "pointer" }}
          >
            💳 Payer {fmt(totalTTC)} € maintenant
          </button>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              className="text-[9px] font-medium py-1.5 rounded"
              style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", cursor: "pointer" }}
            >
              Acompte 30% — {fmt(totalTTC * 0.3)} €
            </button>
            <button
              className="text-[9px] font-medium py-1.5 rounded"
              style={{ background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", cursor: "pointer" }}
            >
              Acompte 50% — {fmt(totalTTC * 0.5)} €
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mockup-scroll::-webkit-scrollbar { width: 4px; }
        .mockup-scroll::-webkit-scrollbar-track { background: transparent; }
        .mockup-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.08); border-radius: 2px; }
        .mockup-scroll { scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.08) transparent; }
      `}</style>
    </div>
  );
}
