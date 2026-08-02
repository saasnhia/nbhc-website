// Primitives communes aux neuf démos.
//
// Le bloc de validation en particulier est PARTAGÉ, pas recopié : le moment
// de contrôle humain doit se lire exactement pareil dans tous les secteurs.
// Le curseur y est monté DANS le bouton, donc sa cible est le centre du
// bouton par construction, quelle que soit la mise en page du secteur.
import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SURFACE } from "./theme";

// ---------------------------------------------------------------------------
// Courbes. Rien n'entre ni ne sort en linéaire : un élément qui arrive à
// vitesse constante puis s'arrête net est le tell le plus net d'une animation
// non travaillée. Tout ce qui entre décélère.
// ---------------------------------------------------------------------------
export const EASE_OUT = Easing.bezier(0.22, 1, 0.36, 1); // décélération franche
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** interpolate avec décélération, bornes clampées. */
export const eased = (
  f: number,
  range: [number, number],
  out: [number, number],
  easing = EASE_OUT
) => interpolate(f, range, out, { easing, ...CLAMP });

/** Entrée standard d'un élément : opacité + montée, échelonnable. */
export const useEnter = (at: number, span = 12, rise = 14) => {
  const f = useCurrentFrame();
  return {
    opacity: eased(f, [at, at + span], [0, 1]),
    transform: `translateY(${eased(f, [at, at + span], [rise, 0]).toFixed(2)}px)`,
  };
};

/**
 * Montant en euros, typographie francaise.
 * Groupement fait a la main : toLocaleString("fr-FR") ne groupait pas dans
 * le Chromium de rendu, et les montants sortaient « 1250 € ».
 */
export const formatEuro = (n: number) => {
  const grouped = String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} €`;
};

/** Légende de plan, contrastée. */
export const Caption: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 6,
}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [delay, delay + 10], [0, 0.82], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(f, [delay, delay + 10], [10, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        fontFamily: FONTS.body,
        fontWeight: 500,
        fontSize: 36,
        letterSpacing: 0.4,
        color: COLORS.text,
        opacity: o,
        transform: `translateY(${y}px)`,
        marginTop: 44,
      }}
    >
      {children}
    </div>
  );
};

/** Surface dominante du plan : ombre portée + filet de lumière pour la matière. */
export const Stage: React.FC<{
  width: number;
  height: number;
  children: React.ReactNode;
  radius?: number;
  pad?: number;
}> = ({ width, height, children, radius = 36, pad }) => (
  <div
    style={{
      width,
      height,
      padding: pad,
      borderRadius: radius,
      // Liquid glass simule : surface translucide + bord clair + ligne de
      // lumiere en haut (inset) + ombre portee. Deliberement SANS
      // backdrop-filter : le flou est l'effet le plus couteux en rendu DOM
      // temps reel, et la lecture est deja limite sur mobile. Les opacites
      // sont calees pour conserver la bande de luminance 28-55.
      background: `linear-gradient(158deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.105) 46%, rgba(255,255,255,0.05) 100%)`,
      border: `1px solid rgba(255,255,255,0.18)`,
      boxShadow: "0 46px 110px rgba(0,0,0,0.62), 0 6px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.26)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: radius,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.028) 26%, rgba(255,255,255,0) 52%)",
        pointerEvents: "none",
      }}
    />
    {children}
  </div>
);

/** Révélation par masque, gauche → droite. */
export const Reveal: React.FC<{ at: number; span?: number; children: React.ReactNode }> = ({
  at,
  span = 12,
  children,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + span], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <div style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>{children}</div>;
};

export const CHECK_LEN = 44;

export const CheckMark: React.FC<{ drawn: number; size?: number }> = ({ drawn, size = 46 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12.5l5.2 5.2L20 7"
      stroke={COLORS.accent}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={CHECK_LEN}
      strokeDashoffset={CHECK_LEN - drawn}
    />
  </svg>
);

/**
 * Bloc de validation humaine — identique dans tous les secteurs.
 * `clickAt` est exprimé en frames locales du plan.
 */
export const ValidationRow: React.FC<{
  awaitingLabel: string;
  validatedLabel: string;
  buttonLabel: string;
  clickAt?: number;
  width?: number;
}> = ({ awaitingLabel, validatedLabel, buttonLabel, clickAt = 30, width = 1280 }) => {
  const f = useCurrentFrame();
  const validated = f >= clickAt;
  const press = f >= clickAt && f < clickAt + 5;
  // Le curseur décélère en approchant du bouton au lieu d'arriver à vitesse
  // constante : c'est ce qui fait lire le geste comme un clic et non comme un
  // déplacement mécanique.
  const cx = eased(f, [2, clickAt], [430, 0]);
  const cy = eased(f, [2, clickAt], [300, 0]);
  const drawn = eased(f, [clickAt + 2, clickAt + 13], [0, CHECK_LEN]);

  return (
    <div
      style={{
        width,
        marginTop: 42,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: FONTS.body,
          fontSize: 30,
          color: validated ? COLORS.text : COLORS.textMuted,
        }}
      >
        {validated && <CheckMark drawn={drawn} />}
        {validated ? validatedLabel : awaitingLabel}
      </span>
      <div
        data-nbhc-validate=""
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "22px 42px",
          borderRadius: 18,
          background: validated ? COLORS.accentSoft : SURFACE.dim,
          border: `2px solid ${validated ? COLORS.accent : SURFACE.border}`,
          fontFamily: FONTS.display,
          fontWeight: 600,
          fontSize: 36,
          color: validated ? COLORS.text : COLORS.textMuted,
          transform: press ? "translateY(2px)" : "none",
        }}
      >
        {buttonLabel}
        {/* Curseur enfant du bouton : il atterrit sur son centre par
            construction. La pointe du SVG est à (10, 4), d'où le recalage. */}
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: `translate(${cx - 10}px, ${cy - 4}px)` }}>
          <svg width="48" height="48" viewBox="0 0 24 24">
            <path
              d="M5 2l14 11.5-6.4.6 3.4 6.9-2.9 1.4-3.4-7L5 20z"
              fill={COLORS.text}
              stroke={SURFACE.bgBottom}
              strokeWidth="1.1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

/** Bandeau de garde-fou, persistant sur toute la démo (pharmacie, opticien…). */
export const GuardBanner: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      top: 40,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      // Les cartes de scène montaient par-dessus le bandeau : il doit rester
      // lisible du premier au dernier plan sur les secteurs réglementés.
      zIndex: 5,
    }}
  >
    <div
      style={{
        padding: "12px 28px",
        borderRadius: 999,
        border: `1px solid ${SURFACE.borderSoft}`,
        background: "rgba(255,255,255,0.05)",
        fontFamily: FONTS.body,
        fontSize: 25,
        color: COLORS.textMuted,
      }}
    >
      {text}
    </div>
  </div>
);

/** Ligne anonymisée : initiales seulement, jamais de donnée métier sensible. */
export const AnonRow: React.FC<{
  initials: string;
  meta?: string;
  dim?: number;
  highlighted?: boolean;
  checked?: boolean;
  showBox?: boolean;
  width?: number;
  h?: number;
}> = ({ initials, meta, dim = 1, highlighted, checked, showBox, width = 1180, h = 92 }) => (
  <div
    style={{
      width,
      height: h,
      display: "flex",
      alignItems: "center",
      gap: 24,
      padding: "0 30px",
      borderRadius: 16,
      // Meme traitement de verre que la carte, en plus discret : les lignes
      // doivent rester subordonnees a la surface qui les porte.
      background: highlighted
        ? COLORS.accentSoft
        : "linear-gradient(170deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.045) 100%)",
      border: `1px solid ${highlighted ? COLORS.accentBorder : "rgba(255,255,255,0.12)"}`,
      boxShadow: highlighted ? undefined : "inset 0 1px 0 rgba(255,255,255,0.14)",
      opacity: dim,
      boxSizing: "border-box",
    }}
  >
    {showBox && (
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          border: `2px solid ${checked ? COLORS.accent : SURFACE.border}`,
          background: checked ? COLORS.accentSoft : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {checked && <CheckMark drawn={CHECK_LEN} size={26} />}
      </div>
    )}
    <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 36, color: COLORS.text, minWidth: 130 }}>
      {initials}
    </span>
    {meta && (
      <span style={{ fontFamily: FONTS.body, fontSize: 28, color: COLORS.textMuted, marginLeft: "auto" }}>
        {meta}
      </span>
    )}
  </div>
);
