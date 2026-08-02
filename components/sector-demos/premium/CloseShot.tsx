// Plan de clôture, deux formes.
//
// `video` : renfort humain LTX, déjà étalonné (visage lisible, désaturé,
// viré bleu), encadré comme un élément graphique de la composition.
//
// `motion` : clôture en motion design pur, retenue pour la pharmacie et la
// cosmétique — métiers réglementés, où un visage photoréaliste ferait
// promesse. Elle referme la boucle sur le geste de la démo : la coche de
// validation, reprise en grand.
import React from "react";
import { AbsoluteFill, interpolate, staticFile, useCurrentFrame } from "remotion";
import { COLORS, FONTS, SURFACE } from "./theme";
import { CHECK_LEN } from "./shared";
import type { Close } from "./sectors2";

const BenefitLine: React.FC<{ text: string; at?: number }> = ({ text, at = 10 }) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [at, at + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(f, [at, at + 12], [12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
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
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

export const CloseShot: React.FC<{ close: Close; benefit: string }> = ({ close, benefit }) => {
  const f = useCurrentFrame();

  if (close.type === "video") {
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
              src={staticFile(close.file)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              muted
              autoPlay
              loop
              playsInline
            />
          </div>
          <BenefitLine text={benefit} />
        </div>
      </AbsoluteFill>
    );
  }

  // Clôture motion : la coche se retrace en grand, sur un disque sobre.
  const drawn = interpolate(f, [4, 20], [0, CHECK_LEN], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ring = interpolate(f, [0, 47], [0.94, 1.03], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -30 }}>
        <div
          style={{
            position: "relative",
            // 620 px laissait la clôture à 27,9 de luminance, sous la bande :
            // le disque doit porter la lumière comme les cartes des autres plans.
            width: 940,
            height: 940,
            transform: `scale(${ring})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: `radial-gradient(circle at 42% 38%, ${SURFACE.cardHi} 0%, ${SURFACE.card} 54%, ${SURFACE.dim} 80%, rgba(11,11,16,0) 86%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 700,
              height: 700,
              borderRadius: "50%",
              border: `3px solid ${COLORS.accentBorder}`,
            }}
          />
          {/* position: relative obligatoire — les deux calques du disque sont
              en position absolute et se peindraient au-dessus d'un SVG resté
              en flux statique, ce qui masquait entièrement la coche. */}
          <svg width="270" height="270" viewBox="0 0 24 24" fill="none" style={{ position: "relative" }}>
            <path
              d="M4 12.5l5.2 5.2L20 7"
              stroke={COLORS.accent}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={CHECK_LEN}
              strokeDashoffset={CHECK_LEN - drawn}
            />
          </svg>
        </div>
        <BenefitLine text={benefit} at={16} />
      </div>
    </AbsoluteFill>
  );
};
