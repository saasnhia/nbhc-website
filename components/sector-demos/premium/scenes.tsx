// Les 8 plans de la démo garage premium.
//
// Règles appliquées partout, tirées de la mesure de hero.webm :
//   - un sujet dominant qui remplit 50-70 % du cadre (c'est lui qui tient
//     la bande de luminance, pas un étalonnage ajouté après coup) ;
//   - un seul accent vif : COLORS.accent. Aucune autre couleur saturée —
//     y compris pour la validation, volontairement en bleu et non en vert ;
//   - typo de marque, sans caisson ;
//   - mouvement continu (assuré par <Scene move=...>).
//
// Passe 2 après auto-comparaison contre la référence, qui a montré cinq
// défauts : cartes flottant dans le vide, légendes illisibles, surfaces
// plates, compositions creuses, et un plan 3 vide sur sa première demi-
// seconde. Corrigés respectivement par : cadres agrandis et recentrés,
// légendes contrastées, ombre portée + filet de lumière sur les surfaces,
// contenu réel dans le planning et l'onde, révélation avancée.
//
// Véracité : la fiche RDV est validée par le garagiste (plan 7), jamais
// envoyée automatiquement. Aucun chiffre, aucun logiciel tiers nommé.
import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SURFACE } from "./theme";
import type { SectorSpec } from "./sectors";

/** Toutes les scènes reçoivent le même contrat : le contenu réel du secteur. */
type ShotProps = { s: SectorSpec };

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

/** Légende de plan. Contrastée : à #86868B/30px elle était illisible au rendu. */
const Caption: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 6 }) => {
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

/**
 * Surface dominante du plan.
 * Ombre portée + filet de lumière en haut : sans eux les cartes lisaient
 * comme des aplats de maquette, là où la référence a de la matière.
 */
const Stage: React.FC<{
  width: number;
  height: number;
  children: React.ReactNode;
  radius?: number;
}> = ({ width, height, children, radius = 36 }) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      // Liquid glass simule : surface translucide + bord clair + ligne de
      // lumiere en haut (inset) + ombre portee. Deliberement SANS
      // backdrop-filter : le flou est l'effet le plus couteux en rendu DOM
      // temps reel, et la lecture est deja limite sur mobile. Les opacites
      // sont calees pour conserver la bande de luminance 28-55.
      background: `linear-gradient(158deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.105) 46%, rgba(255,255,255,0.05) 100%)`,
      border: `1px solid rgba(255,255,255,0.18)`,
      boxShadow:
        // Liseré de lumière franc sur l'arête haute, et un second, très faible,
        // en bas : c'est le bord qui fait lire l'épaisseur du verre.
        "0 46px 110px rgba(0,0,0,0.62), 0 6px 24px rgba(0,0,0,0.45), " +
        "inset 0 1px 0 rgba(255,255,255,0.38), inset 0 -1px 0 rgba(255,255,255,0.07)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: radius,
        background:
          // Voile du haut + reflet spéculaire en diagonale.
          "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.028) 26%, rgba(255,255,255,0) 52%), " +
          "linear-gradient(114deg, rgba(255,255,255,0) 28%, rgba(255,255,255,0.055) 44%, rgba(255,255,255,0.012) 52%, rgba(255,255,255,0) 66%)",
        pointerEvents: "none",
      }}
    />
    {children}
  </div>
);

/** Révélation par masque, gauche → droite. Pas de fondu mou. */
const Reveal: React.FC<{ at: number; span?: number; children: React.ReactNode }> = ({
  at,
  span = 12,
  children,
}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [at, at + span], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}>{children}</div>;
};

// ---------------------------------------------------------------------------
// Plan 1 — L'appel arrive
// ---------------------------------------------------------------------------
// Rayons des ondes de l'appel. Le maximum est DERIVE et non recopie : c'est lui
// qui sert de taille de base aux anneaux ci-dessous, et un ecart entre les deux
// se verrait comme un changement d'echelle.
const ANNEAU_R0 = 190;
const ANNEAU_DR = 350;
const ANNEAU_RMAX = ANNEAU_R0 + ANNEAU_DR;

export const ShotAppel: React.FC<ShotProps> = ({ s }) => {
  const f = useCurrentFrame();
  const rings = [0, 1, 2].map((i) => {
    const phase = ((f + i * 8) % 24) / 24;
    return { r: ANNEAU_R0 + phase * ANNEAU_DR, o: (1 - phase) * 0.85 };
  });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 1100, height: 1100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: "absolute",
            width: 1080,
            height: 1080,
            borderRadius: "50%",
            background: `radial-gradient(circle at 42% 38%, ${SURFACE.cardHi} 0%, ${SURFACE.card} 52%, ${SURFACE.dim} 78%, rgba(11,11,16,0) 84%)`,
          }}
        />
        {/* ECHELLE, PAS TAILLE — cf. la regle en tete de shared.tsx.
            Ces anneaux animaient width et height : chaque image passait donc par
            une mise en page, et le retour de cycle (rayon 540 -> 190, soit 264 px
            a l'ecran) etait rapporte comme un decalage. Trois entrees mesurees,
            0,0055 a 0,0062 chacune, a 1440 px.

            La bordure est CONTRE-MISE A L'ECHELLE : rendue, son epaisseur vaut
            (3 / e) x e = 3 px exactement, comme avant. Et le diametre exterieur
            vaut ANNEAU_RMAX x 2 x e = ring.r x 2, identique lui aussi — que la
            boite soit en border-box (le cas ici, preflight Tailwind) ou non. */}
        {rings.map((ring, i) => {
          const e = ring.r / ANNEAU_RMAX;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: ANNEAU_RMAX * 2,
                height: ANNEAU_RMAX * 2,
                borderRadius: "50%",
                border: `${3 / e}px solid ${COLORS.accent}`,
                opacity: ring.o,
                transform: `scale(${e})`,
              }}
            />
          );
        })}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: `linear-gradient(150deg, ${SURFACE.cardHi}, ${SURFACE.card})`,
            border: `2px solid ${COLORS.accentBorder}`,
            boxShadow: "0 30px 70px rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="126" height="126" viewBox="0 0 24 24" fill="none">
            <path
              d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z"
              fill={COLORS.accent}
            />
          </svg>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 104 }}>
        <Caption delay={4}>{s.captions.appel}</Caption>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Plan 2 — L'assistant répond
// ---------------------------------------------------------------------------
const BARS = 54;

export const ShotRepond: React.FC<ShotProps> = ({ s }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Stage width={1740} height={700}>
        {/* Ces barres animent leur height, en connaissance de cause : scaleY
            deformerait leurs coins arrondis. Voir la regle d'animation en tete
            de shared.tsx, et son exception nommee. */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, height: 470 }}>
          {Array.from({ length: BARS }).map((_, i) => {
            const wave =
              Math.sin(i * 0.34 + f * 0.28) * 0.5 + Math.sin(i * 0.11 - f * 0.17) * 0.5;
            const h = 44 + Math.abs(wave) * 420;
            return (
              <div
                key={i}
                style={{
                  width: 15,
                  height: h,
                  borderRadius: 8,
                  background: COLORS.accent,
                  opacity: 0.55 + Math.abs(wave) * 0.45,
                }}
              />
            );
          })}
        </div>
      </Stage>
      <Caption>{s.captions.repond}</Caption>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Plan 3 — Comprendre la demande
// ---------------------------------------------------------------------------
export const ShotComprend: React.FC<ShotProps> = ({ s }) => {
  const f = useCurrentFrame();
  // Les barres retombent : l'onde se "cristallise" en texte. Rapide, pour
  // qu'aucune image ne montre une carte vide.
  const collapse = interpolate(f, [0, 10], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {/* Cadrage haut et étroit : la coupe depuis le plan 2 (large et bas)
          doit se voir. */}
      <Stage width={1320} height={780}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, height: 150 * collapse, marginBottom: 24 * collapse }}>
          {Array.from({ length: BARS }).map((_, i) => {
            const wave = Math.sin(i * 0.34 + f * 0.28) * 0.5 + Math.sin(i * 0.11 - f * 0.17) * 0.5;
            return (
              <div
                key={i}
                style={{
                  width: 15,
                  height: (26 + Math.abs(wave) * 124) * collapse,
                  borderRadius: 8,
                  background: COLORS.accent,
                  opacity: 0.75 * collapse,
                }}
              />
            );
          })}
        </div>
        {/* Masque ligne par ligne, jamais sur le bloc entier : un balayage
            horizontal sur un texte centré multi-lignes révélait la ligne
            courte en entier pendant que la longue restait coupée en plein
            mot — ça lisait comme un bug, pas comme une animation. */}
        {s.quote.map((line, i) => (
          <Reveal key={line} at={3 + i * 5} span={11}>
            <div
              style={{
                fontFamily: FONTS.display,
                fontWeight: 600,
                fontSize: 58,
                lineHeight: 1.3,
                color: COLORS.text,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {line}
            </div>
          </Reveal>
        ))}
        <div style={{ display: "flex", gap: 22, marginTop: 54 }}>
          {s.tags.map((t, ti) => {
            const tag = { ...t, at: 15 + ti * 5 };
            const o = interpolate(f, [tag.at, tag.at + 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const y = interpolate(f, [tag.at, tag.at + 8], [12, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={tag.k}
                style={{
                  opacity: o,
                  transform: `translateY(${y}px)`,
                  padding: "16px 30px",
                  borderRadius: 999,
                  border: `1px solid ${COLORS.accentBorder}`,
                  background: COLORS.accentSoft,
                  fontFamily: FONTS.body,
                  fontSize: 29,
                  color: COLORS.text,
                }}
              >
                <span style={{ color: COLORS.textMuted }}>{tag.k} : </span>
                {tag.v}
              </div>
            );
          })}
        </div>
      </Stage>
      <Caption delay={2}>{s.captions.comprend}</Caption>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Plan 4 — Vérifie le planning
// ---------------------------------------------------------------------------
export const ShotPlanning: React.FC<ShotProps> = ({ s }) => {
  const f = useCurrentFrame();
  const DAYS = s.grid.columns;
  const HOURS = s.grid.rows;
  const FREE_ROW = s.grid.freeRow;
  const FREE_COL = s.grid.freeCol;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {/* Le plus large des huit plans : contraste franc avec le plan 3 (haut
          et étroit). Les cellules portent jour et heure — une grille vide ne
          disait rien et laissait la composition creuse. */}
      <Stage width={1780} height={880}>
        <div style={{ display: "flex", gap: 20, marginBottom: 18 }}>
          <div style={{ width: 96 }} />
          {DAYS.map((d) => (
            <div
              key={d}
              style={{
                width: 292,
                textAlign: "center",
                fontFamily: FONTS.body,
                fontSize: 27,
                color: COLORS.textMuted,
              }}
            >
              {d}
            </div>
          ))}
        </div>
        {HOURS.map((hour, row) => (
          <div key={hour} style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            <div
              style={{
                width: 96,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontFamily: FONTS.body,
                fontSize: 27,
                color: COLORS.textMuted,
              }}
            >
              {hour}
            </div>
            {DAYS.map((day, col) => {
              const i = row * DAYS.length + col;
              const isFree = row === FREE_ROW && col === FREE_COL;
              const dim = interpolate(f, [6 + i * 1.3, 14 + i * 1.3], [1, 0.55], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              const lit = interpolate(f, [30, 40], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <div
                  key={day}
                  style={{
                    width: 292,
                    height: 138,
                    borderRadius: 18,
                    background: isFree ? COLORS.accentSoft : SURFACE.dim,
                    border: `1px solid ${isFree ? COLORS.accentBorder : SURFACE.borderSoft}`,
                    opacity: isFree ? 1 : dim,
                    boxShadow: isFree ? `inset 0 0 0 ${2.5 * lit}px ${COLORS.accent}` : undefined,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {isFree ? (
                    <span
                      style={{
                        fontFamily: FONTS.display,
                        fontWeight: 600,
                        fontSize: 32,
                        color: COLORS.text,
                        opacity: lit,
                      }}
                    >
                      {s.grid.freeLabel}
                    </span>
                  ) : (
                    <div
                      style={{
                        width: 132,
                        height: 8,
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.20)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </Stage>
      <Caption delay={2}>{s.captions.planning}</Caption>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Plan 5 — Propose un créneau
// ---------------------------------------------------------------------------
export const ShotCreneau: React.FC<ShotProps> = ({ s }) => {
  const f = useCurrentFrame();
  const lines = [
    { who: "ia" as const, text: s.dialogue.ia, at: 8 },
    { who: "client" as const, text: s.dialogue.client, at: 28 },
  ];
  const chip = interpolate(f, [0, 10], [0.86, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      {/* Zoom serré sur le créneau retenu : il entre gros dans le cadre, puis
          le dialogue se pose dessous. */}
      <Stage width={1620} height={840}>
        <div
          style={{
            transform: `scale(${chip})`,
            padding: "26px 62px",
            borderRadius: 22,
            background: COLORS.accentSoft,
            border: `2px solid ${COLORS.accent}`,
            fontFamily: FONTS.display,
            fontWeight: 600,
            fontSize: 52,
            color: COLORS.text,
            marginBottom: 52,
          }}
        >
          {s.chip}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28, width: 1320 }}>
          {lines.map((l) => {
            const o = interpolate(f, [l.at, l.at + 9], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const y = interpolate(f, [l.at, l.at + 9], [16, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const isIa = l.who === "ia";
            return (
              <div
                key={l.text}
                style={{
                  opacity: o,
                  transform: `translateY(${y}px)`,
                  alignSelf: isIa ? "flex-start" : "flex-end",
                  maxWidth: 980,
                  padding: "28px 38px",
                  borderRadius: 24,
                  background: isIa ? COLORS.accentSoft : SURFACE.dim,
                  border: `1px solid ${isIa ? COLORS.accentBorder : SURFACE.border}`,
                  fontFamily: FONTS.display,
                  fontWeight: 500,
                  fontSize: 46,
                  color: COLORS.text,
                }}
              >
                {l.text}
              </div>
            );
          })}
        </div>
      </Stage>
      <Caption delay={2}>{s.captions.creneau}</Caption>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Plans 6 & 7 — La fiche, puis sa validation par le garagiste
// ---------------------------------------------------------------------------
/** Coche de confirmation, tracée. Rendue en ligne avec « Validé par le
 *  garagiste » : flottante en absolu, elle apparaissait à côté du curseur
 *  au lieu d'être rattachée au bouton. */
const CheckMark: React.FC<{ drawn: number; len: number }> = ({ drawn, len }) => (
  <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 12.5l5.2 5.2L20 7"
      stroke={COLORS.accent}
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={len}
      strokeDashoffset={len - drawn}
    />
  </svg>
);

const FicheCard: React.FC<{
  revealFrom?: number;
  awaiting?: boolean;
  validated?: boolean;
  /** Enfoncement au clic — porté par le bouton, donc subi par le curseur. */
  press?: boolean;
  /** Curseur, monté DANS le bouton : sa cible est le centre du bouton par
   *  construction, sans coordonnée devinée. */
  cursor?: React.ReactNode;
  checkDrawn?: number;
  checkLen?: number;
  s: SectorSpec;
}> = ({ revealFrom, awaiting, validated, press, cursor, checkDrawn = 0, checkLen = 44, s }) => (
  <Stage width={1560} height={860}>
    <div style={{ width: 1280 }}>
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 27,
          letterSpacing: 1.6,
          textTransform: "uppercase",
          color: COLORS.textMuted,
          marginBottom: 36,
        }}
      >
        {s.fiche.title}
      </div>
      {s.fiche.rows.map((row, i) => {
        const body = (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "26px 0",
              borderBottom: `1px solid ${SURFACE.borderSoft}`,
            }}
          >
            <span style={{ fontFamily: FONTS.body, fontSize: 32, color: COLORS.textMuted }}>
              {row.k}
            </span>
            <span
              style={{
                fontFamily: FONTS.display,
                fontWeight: 600,
                fontSize: 44,
                color: COLORS.text,
              }}
            >
              {row.v}
            </span>
          </div>
        );
        return revealFrom === undefined ? (
          <div key={row.k}>{body}</div>
        ) : (
          <Reveal key={row.k} at={revealFrom + i * 5} span={10}>
            {body}
          </Reveal>
        );
      })}
      <div style={{ marginTop: 42, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
          {validated && <CheckMark drawn={checkDrawn} len={checkLen} />}
          {validated ? s.validatedLabel : awaiting ? s.awaitingLabel : " "}
        </span>
        {(awaiting || validated) && (
          <ValidateButton validated={!!validated} press={!!press}>
            {cursor}
          </ValidateButton>
        )}
      </div>
    </div>
  </Stage>
);

const ValidateButton: React.FC<{
  validated: boolean;
  press?: boolean;
  children?: React.ReactNode;
}> = ({ validated, press, children }) => (
  <div
    data-nbhc-validate=""
    style={{
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "22px 42px",
      borderRadius: 18,
      background: validated ? COLORS.accentSoft : SURFACE.dim,
      border: `2px solid ${validated ? COLORS.accent : SURFACE.border}`,
      fontFamily: FONTS.display,
      fontWeight: 600,
      fontSize: 36,
      color: validated ? COLORS.text : COLORS.textMuted,
      // L'enfoncement est porté par le bouton : le curseur, monté à
      // l'intérieur, descend avec lui — le clic se lit comme un clic.
      transform: press ? "translateY(2px)" : "none",
    }}
  >
    Valider
    {children}
  </div>
);

export const ShotFiche: React.FC<ShotProps> = ({ s }) => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <FicheCard revealFrom={4} s={s} />
    <Caption delay={2}>{s.captions.fiche}</Caption>
  </AbsoluteFill>
);

export const ShotValidation: React.FC<ShotProps> = ({ s }) => {
  const f = useCurrentFrame();
  const CLICK = 30;
  const validated = f >= CLICK;
  // Le curseur entre, décélère, appuie.
  const cx = interpolate(f, [2, CLICK], [430, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cy = interpolate(f, [2, CLICK], [300, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const press = f >= CLICK && f < CLICK + 5;
  const CHECK_LEN = 44;
  const drawn = interpolate(f, [CLICK + 2, CLICK + 12], [0, CHECK_LEN], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Le curseur est un enfant du bouton : left/top 50% = centre du bouton, et
  // l'offset (cx, cy) retombe à zéro pile au clic. La pointe de la flèche est
  // à (10, 4) dans le SVG rendu, d'où le recalage constant.
  const cursor = (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(${cx - 10}px, ${cy - 4}px)`,
      }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24">
        <path
          d="M5 2l14 11.5-6.4.6 3.4 6.9-2.9 1.4-3.4-7L5 20z"
          fill={COLORS.text}
          stroke={SURFACE.bgBottom}
          strokeWidth="1.1"
        />
      </svg>
    </div>
  );

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <FicheCard
        awaiting={!validated}
        validated={validated}
        press={press}
        cursor={cursor}
        checkDrawn={drawn}
        checkLen={CHECK_LEN}
        s={s}
      />
      <Caption delay={2}>{s.captions.validation}</Caption>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------------------
// Plan 8 — Bénéfice (renfort LTX traité, encadré comme un élément graphique)
// ---------------------------------------------------------------------------
export const ShotBenefice: React.FC<ShotProps> = ({ s }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(f, [10, 22], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -40 }}>
        <div
          style={{
            width: 1480,
            height: 832,
            borderRadius: 36,
            overflow: "hidden",
            border: `1px solid ${SURFACE.border}`,
            boxShadow: "0 46px 110px rgba(0,0,0,0.62)",
          }}
        >
          {/* Balise video native, et non le composant Remotion : celui-ci
              ajoute un fragment temporel a l'URL (#t=0,2) que WebKit refuse
              (MEDIA_ERR_SRC_NOT_SUPPORTED, plan de cloture noir sur iPhone).
              Un plan d'ambiance de 2 s n'a pas besoin d'etre synchronise a la
              frame : autoPlay + loop + muted + playsInline suffisent, et
              c'est le seul montage qu'iOS accepte sans geste utilisateur. */}
          <video
            src={staticFile(s.closeVideo)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            autoPlay
            loop
            playsInline
          />
        </div>
        <div
          style={{
            marginTop: 48,
            opacity: o,
            transform: `translateY(${y}px)`,
            fontFamily: FONTS.display,
            fontWeight: 600,
            fontSize: 66,
            letterSpacing: -0.5,
            color: COLORS.text,
          }}
        >
          {s.benefit}
        </div>
      </div>
    </AbsoluteFill>
  );
};
