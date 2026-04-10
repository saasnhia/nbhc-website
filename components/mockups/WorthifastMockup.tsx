"use client";

import { useState } from "react";

const ACCENT = "#22c55e";

const menuItems = [
  { label: "Tableau de bord", active: false },
  { label: "Assistant IA", active: true },
  { label: "Transactions", active: false },
  { label: "Factures", active: false },
  { label: "Relances", active: false, badge: "12" },
  { label: "Notifications", active: false, badge: "3" },
  { label: "Banques", active: false },
  { label: "Import Relevé", active: false },
  { label: "TVA", active: false },
  { label: "Rapprochement", active: false },
  { label: "Immobilisations", active: false },
  { label: "Analytique", active: false },
  { label: "Liasses fisc.", active: false, badge: "Pro" },
];

const agents = [
  {
    name: "Agent Audit",
    desc: "Contrôle, doublons et incohérences selon le Plan Comptable Général.",
    color: "#ef4444",
  },
  {
    name: "Agent TVA",
    desc: "Vérifie les taux TVA, calcule le solde CA3 et émet des conseils fiscaux.",
    color: "#f59e0b",
  },
  {
    name: "Agent Rapprochement",
    desc: "Rapproche les journaux bancaires en langage clair et propose des actions correctives.",
    color: "#3b82f6",
  },
  {
    name: "Agent Mail",
    desc: "Génère des rapports de patrimoine personnalisés et courtois pour vos clients en retard.",
    color: "#8b5cf6",
  },
];

export default function WorthifastMockup() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0f1614",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        overflow: "hidden",
        height: 400,
        display: "flex",
        fontSize: 11,
        fontFamily: "var(--font-dm-sans)",
        color: "#c9cdd4",
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.01)" : "scale(1)",
        cursor: "default",
      }}
    >
      {/* Sidebar */}
      <div
        className="flex-shrink-0 flex flex-col mockup-scroll"
        style={{
          width: 130,
          background: "#0a0f0d",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-1.5 px-2.5 py-2 flex-shrink-0">
          <div
            className="w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold"
            style={{ background: ACCENT, color: "#06100a" }}
          >
            W
          </div>
          <span className="text-[10px] font-bold" style={{ color: ACCENT }}>
            Worthifast
          </span>
        </div>

        {/* Menu items */}
        <div className="flex-1 overflow-y-auto mockup-scroll px-1.5 pb-2 space-y-0.5">
          {menuItems.map((m) => (
            <div
              key={m.label}
              className="flex items-center justify-between px-2 py-1 rounded text-[9px]"
              style={{
                background: m.active ? "rgba(34,197,94,0.1)" : "transparent",
                color: m.active ? ACCENT : "#6b7280",
                cursor: "pointer",
              }}
            >
              <span className={m.active ? "font-semibold" : ""}>{m.label}</span>
              {m.badge && (
                <span
                  className="text-[7px] font-bold px-1 py-0.5 rounded-full"
                  style={{
                    background: m.badge === "Pro" ? "rgba(196,151,58,0.15)" : "rgba(239,68,68,0.15)",
                    color: m.badge === "Pro" ? "#C4973A" : "#f87171",
                  }}
                >
                  {m.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-3 py-2 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono" style={{ color: "#6b7280" }}>
              Cabinet Moreau &amp; A...
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[7px]" style={{ color: "#6b7280" }}>Dashboard</span>
            <span className="text-[7px]" style={{ color: "#6b7280" }}>Comptabilité</span>
            <span className="text-[7px]" style={{ color: "#6b7280" }}>Audit</span>
          </div>
        </div>

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto mockup-scroll px-3 py-2.5 space-y-2">
          {/* Title */}
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold" style={{ color: "#e5e7eb" }}>
              Assistant IA Worthifast
            </span>
            <span
              className="text-[7px] font-medium px-1.5 py-0.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.25)" }}
            >
              ● Données anonymisées
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1">
            <span
              className="text-[9px] font-semibold px-2 py-1 rounded"
              style={{ background: ACCENT, color: "#06100a" }}
            >
              Agents Worthifast
            </span>
            <span className="text-[9px] px-2 py-1 rounded" style={{ color: "#6b7280" }}>
              Mes Agents
            </span>
            <span className="text-[9px] px-2 py-1 rounded" style={{ color: "#6b7280" }}>
              PCG &amp; BOFIP
            </span>
          </div>

          {/* Confidentiality banner */}
          <div
            className="text-[8px] p-2 rounded"
            style={{
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.15)",
              color: "#86efac",
            }}
          >
            <span className="font-semibold">Confidentialité garantie</span> — Vos données sont anonymisées automatiquement avant tout envoi au modèle IA. Aucune donnée personnalisée (nom, email, adresse) ne quitte vos serveurs.
          </div>

          {/* Agent cards */}
          {agents.map((a) => (
            <div
              key={a.name}
              className="flex items-center gap-2 p-2 rounded"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${a.color}20`, border: `1px solid ${a.color}40` }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: a.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-bold" style={{ color: "#e5e7eb" }}>{a.name}</div>
                <div className="text-[8px] truncate" style={{ color: "#6b7280" }}>{a.desc}</div>
              </div>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, opacity: 0.3 }}>
                <path d="M3 2l4 3-4 3" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ))}

          {/* Input */}
          <div className="mt-1">
            <div
              className="flex items-center gap-2 px-2 py-1.5 rounded"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-[9px] flex-1" style={{ color: "#4b5563" }}>
                Ex : Quelles sont les conditions d&apos;exonération de TVA intracommunautaire ?
              </span>
            </div>
            <button
              className="w-full mt-1.5 text-[9px] font-semibold py-1.5 rounded"
              style={{
                background: ACCENT,
                color: "#06100a",
                border: "none",
                cursor: "pointer",
                opacity: hovered ? 1 : 0.4,
                transition: "opacity 0.3s",
              }}
            >
              ✨ Obtenir une réponse experte
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mockup-scroll::-webkit-scrollbar { width: 4px; }
        .mockup-scroll::-webkit-scrollbar-track { background: transparent; }
        .mockup-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        .mockup-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.1) transparent; }
      `}</style>
    </div>
  );
}
