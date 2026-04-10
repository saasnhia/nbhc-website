"use client";

import { useState } from "react";

const ACCENT = "#6366f1";

const transcript = [
  { t: "0:00", text: "Un jour j'étais au Japon" },
  { t: "0:01", text: "et il faut savoir que" },
  { t: "0:04", text: "tout d'abord mon histoire se" },
  { t: "0:06", text: "passe à Shibuya à Tokyo." },
  { t: "0:09", text: "Je marchais dans la rue" },
  { t: "0:12", text: "et là j'ai vu quelque chose" },
  { t: "0:15", text: "d'incroyable. Un temple caché" },
  { t: "0:18", text: "entre deux immeubles géants." },
  { t: "0:21", text: "Personne ne le connaît." },
  { t: "0:24", text: "C'était magnifique vraiment." },
  { t: "0:27", text: "Bref, le Japon c'est dingue." },
  { t: "0:30", text: "Abonnez-vous pour la suite !" },
];

const subtitleStyles = [
  "Word Highlight",
  "TikTok",
  "Karaoke",
  "Minimal",
  "Neon",
  "Cinematic",
  "Bold Shadow",
  "YouTube",
];

const formats = ["Vertical", "Horizontal", "Carré", "Portrait"];

const timelineSegments = [
  { type: "keep", w: "14%" },
  { type: "keep", w: "8%" },
  { type: "cut", w: "3%" },
  { type: "keep", w: "18%" },
  { type: "cut", w: "2%" },
  { type: "keep", w: "12%" },
  { type: "keep", w: "10%" },
  { type: "cut", w: "2.5%" },
  { type: "keep", w: "16%" },
  { type: "keep", w: "10%" },
];

export default function VlogyzMockup() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="mockup-root"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#0c0c14",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 12,
        overflow: "hidden",
        height: 400,
        display: "flex",
        flexDirection: "column",
        fontSize: 11,
        fontFamily: "var(--font-dm-sans)",
        color: "#c9cdd4",
        transition: "transform 0.3s ease",
        transform: hovered ? "scale(1.01)" : "scale(1)",
        cursor: "default",
      }}
    >
      {/* Topbar */}
      <div
        className="flex items-center gap-2 px-3 flex-shrink-0"
        style={{
          height: 32,
          background: "#111118",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: "#ff5f57" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#febc2e" }} />
        <span className="w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        <span className="ml-2 text-[10px] font-semibold" style={{ color: "#8C8880" }}>
          Vlogyz Editor
        </span>
        <span
          className="ml-1 text-[8px] px-1.5 py-0.5 rounded-full font-medium"
          style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" }}
        >
          IA active
        </span>
        <div className="flex-1" />
        <button
          className="text-[9px] font-semibold px-2 py-0.5 rounded"
          style={{
            background: ACCENT,
            color: "#fff",
            border: "none",
            opacity: hovered ? 1 : 0.3,
            transition: "opacity 0.3s",
            cursor: "pointer",
          }}
        >
          Exporter
        </button>
      </div>

      {/* Main area */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar — Transcript */}
        <div
          className="mockup-scroll flex-shrink-0 flex flex-col"
          style={{
            width: 145,
            borderRight: "1px solid rgba(255,255,255,0.05)",
            background: "#0a0a10",
          }}
        >
          <div
            className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-2 flex-shrink-0"
            style={{ color: "#6b7280", letterSpacing: "0.1em" }}
          >
            Transcript
          </div>
          <div className="flex-1 overflow-y-auto mockup-scroll px-1.5 pb-2">
            {transcript.map((l, i) => (
              <div
                key={i}
                className="flex gap-1.5 py-1 px-1.5 rounded text-[10px]"
                style={{
                  borderLeft: i === 0 ? `2px solid ${ACCENT}` : "2px solid transparent",
                  background: i === 0 ? "rgba(99,102,241,0.08)" : "transparent",
                }}
              >
                <span className="flex-shrink-0 font-mono" style={{ color: "#4b5563", fontSize: 9 }}>
                  {l.t}
                </span>
                <span style={{ color: i === 0 ? "#e5e7eb" : "#9ca3af" }}>{l.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center — Preview */}
        <div className="flex-1 flex flex-col min-w-0">
          <div
            className="flex-1 relative flex items-center justify-center"
            style={{ background: "linear-gradient(180deg, #0d0e18, #0a0b12)" }}
          >
            {/* Subtitle */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[11px] font-bold px-2.5 py-1 rounded"
              style={{ background: "rgba(0,0,0,0.6)", color: "#f0ede6" }}
            >
              <span style={{ color: ACCENT }}>Salut</span> à tous
            </div>
            {/* Play button (hover) */}
            <div
              className="flex items-center justify-center"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s",
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="white">
                <path d="M3 1.5 L3 12.5 L12 7 Z" />
              </svg>
            </div>
            {/* Bottom controls (hover) */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-1.5"
              style={{
                background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            >
              <span className="text-[8px] font-mono" style={{ color: "#9ca3af" }}>0:00</span>
              <div className="flex-1 h-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                <div className="h-full rounded-full" style={{ width: "0%", background: ACCENT }} />
              </div>
              <span className="text-[8px] font-mono" style={{ color: "#9ca3af" }}>2:35</span>
            </div>
          </div>

          {/* Timeline */}
          <div
            className="flex-shrink-0 px-2 py-1.5 relative"
            style={{
              height: 28,
              background: "#08080e",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div className="flex items-center h-full gap-px">
              {timelineSegments.map((s, i) => (
                <div
                  key={i}
                  style={{
                    width: s.w,
                    height: s.type === "cut" ? 10 : 14,
                    background: s.type === "cut" ? "rgba(239,68,68,0.5)" : ACCENT,
                    borderRadius: 2,
                    opacity: s.type === "cut" ? 0.6 : 0.7,
                  }}
                />
              ))}
            </div>
            {/* Playhead */}
            <div
              className="absolute top-0 bottom-0"
              style={{ left: "22%", width: 1.5, background: "#ef4444", boxShadow: "0 0 4px #ef4444" }}
            />
          </div>
        </div>

        {/* Right panel */}
        <div
          className="flex-shrink-0 flex flex-col mockup-scroll"
          style={{
            width: 140,
            borderLeft: "1px solid rgba(255,255,255,0.05)",
            background: "#0b0b12",
          }}
        >
          <div className="flex-1 overflow-y-auto mockup-scroll p-2.5 space-y-3">
            {/* Format */}
            <div>
              <div className="text-[8px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#6b7280" }}>
                Format
              </div>
              <div className="grid grid-cols-2 gap-1">
                {formats.map((f) => (
                  <div
                    key={f}
                    className="text-[8px] text-center py-1 rounded"
                    style={{
                      background: f === "Horizontal" ? ACCENT : "rgba(255,255,255,0.04)",
                      color: f === "Horizontal" ? "#fff" : "#9ca3af",
                      border: `1px solid ${f === "Horizontal" ? ACCENT : "rgba(255,255,255,0.06)"}`,
                      cursor: "pointer",
                    }}
                  >
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Subtitle style */}
            <div>
              <div className="text-[8px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#6b7280" }}>
                Style sous-titres
              </div>
              <div className="grid grid-cols-2 gap-1">
                {subtitleStyles.map((s) => (
                  <div
                    key={s}
                    className="text-[8px] text-center py-1 rounded truncate px-1"
                    style={{
                      background: s === "TikTok" ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
                      color: s === "TikTok" ? "#818cf8" : "#9ca3af",
                      border: `1px solid ${s === "TikTok" ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
                      cursor: "pointer",
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Score */}
            <div>
              <div className="text-[8px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#6b7280" }}>
                Score viralité
              </div>
              <div className="flex items-center gap-2">
                <svg width="36" height="36" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform="rotate(-90 18 18)"
                    strokeDasharray={`${87.96 * 0.87} ${87.96}`}
                  />
                  <text x="18" y="18" textAnchor="middle" dominantBaseline="central" fontSize="9" fontWeight="800" fill="#f0ede6">
                    87
                  </text>
                </svg>
                <span className="text-[9px]" style={{ color: "#6b7280" }}>/100</span>
              </div>
            </div>

            {/* Save button */}
            <button
              className="w-full text-[8px] font-semibold py-1.5 rounded"
              style={{
                background: "#ef4444",
                color: "#fff",
                border: "none",
                opacity: hovered ? 1 : 0.3,
                transition: "opacity 0.3s",
                cursor: "pointer",
              }}
            >
              Sauvegarder
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
