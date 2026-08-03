"use client";

// Sélecteur de type de bien, au-dessus de la vidéo.
//
// Le style est repris tel quel des onglets de la section EN ACTION
// (VideoShowcase.tsx) : mêmes rayons, même typo, même traitement de l'état
// actif. La page doit rester visiblement du même site.
//
// Clavier : flèches gauche/droite pour circuler, comme l'attend le motif
// onglets. Le tabindex est roulant — un seul onglet dans l'ordre de
// tabulation, celui qui est actif.
import { useRef } from "react";
import { VARIANTES, type Variante } from "./LogementVideo";

type Props = {
  valeur: Variante;
  onChange: (v: Variante) => void;
  libelles: Record<Variante, string>;
  listeLabel: string;
};

export default function LogementSelecteur({ valeur, onChange, libelles, listeLabel }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const auClavier = (e: React.KeyboardEvent, index: number) => {
    const pas = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!pas) return;
    e.preventDefault();
    const suivant = (index + pas + VARIANTES.length) % VARIANTES.length;
    onChange(VARIANTES[suivant]);
    refs.current[suivant]?.focus();
  };

  return (
    <div role="tablist" aria-label={listeLabel} className="flex flex-wrap gap-2.5 mb-5">
      {VARIANTES.map((v, i) => {
        const actif = v === valeur;
        return (
          <button
            key={v}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={actif}
            tabIndex={actif ? 0 : -1}
            onClick={() => onChange(v)}
            onKeyDown={(e) => auClavier(e, i)}
            data-cursor="link"
            className="relative flex items-center text-[13px] font-medium px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer shrink-0 whitespace-nowrap"
            style={{
              background: actif ? "var(--gold-dim)" : "rgba(255,255,255,0.02)",
              border: actif ? "1px solid var(--gold-border)" : "1px solid var(--border)",
              color: actif ? "var(--gold-light)" : "var(--text-muted)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              transform: actif ? "translateY(-2px)" : "translateY(0)",
              boxShadow: actif ? "0 10px 28px -12px rgba(196,151,58,0.45)" : "none",
            }}
          >
            {libelles[v]}
          </button>
        );
      })}
    </div>
  );
}
