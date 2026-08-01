// Socle commun à tous les plans.
//
// Deux garanties mécaniques tirées de l'analyse de hero.webm :
//   - aucun plan fixe : useCameraMove impose une transformation continue,
//     et le calque de fond dérive à une vitesse différente (parallaxe) ;
//   - aucune transition molle : les plans sont des Sequence juxtaposées,
//     donc des coupes franches. Il n'y a volontairement aucun fondu ici.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SURFACE } from "./theme";

export type CameraMove = {
  scaleFrom?: number;
  scaleTo?: number;
  xFrom?: number;
  xTo?: number;
  yFrom?: number;
  yTo?: number;
  rotFrom?: number;
  rotTo?: number;
};

/**
 * Mouvement continu sur toute la durée du plan.
 * La progression est légèrement adoucie aux deux bouts : une caméra qui
 * démarre et s'arrête net trahit l'animation, même sur un déplacement lent.
 */
export const useCameraMove = (duration: number, move: CameraMove): React.CSSProperties => {
  const frame = useCurrentFrame();
  const raw = duration <= 1 ? 0 : Math.min(1, Math.max(0, frame / (duration - 1)));
  const p = raw * raw * (3 - 2 * raw); // smoothstep
  const at = (a = 0, b = 0) => a + (b - a) * p;
  const scale = at(move.scaleFrom ?? 1, move.scaleTo ?? 1);
  const x = at(move.xFrom, move.xTo);
  const y = at(move.yFrom, move.yTo);
  const rot = at(move.rotFrom, move.rotTo);
  return {
    transform: `translate(${x.toFixed(3)}px, ${y.toFixed(3)}px) scale(${scale.toFixed(
      4
    )}) rotate(${rot.toFixed(3)}deg)`,
    willChange: "transform",
  };
};

/**
 * Fond de scène : dégradé sombre + halo large très diffus qui dérive.
 * Le halo n'est pas un effet décoratif — il porte la profondeur (le flou
 * d'arrière-plan marqué de la référence) et remonte la luminance moyenne
 * hors du noir pur.
 */
const Backdrop: React.FC<{ duration: number }> = ({ duration }) => {
  const frame = useCurrentFrame();
  const p = duration <= 1 ? 0 : frame / (duration - 1);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(158deg, ${SURFACE.bgTop} 0%, ${SURFACE.bgBottom} 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${18 + p * 6}%`,
          top: `${10 + p * 5}%`,
          width: 1500,
          height: 1000,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.028) 45%, rgba(255,255,255,0) 72%)",
          filter: "blur(48px)",
        }}
      />
    </AbsoluteFill>
  );
};

export const Scene: React.FC<{
  duration: number;
  move: CameraMove;
  children: React.ReactNode;
}> = ({ duration, move, children }) => {
  const camera = useCameraMove(duration, move);
  return (
    <AbsoluteFill>
      <Backdrop duration={duration} />
      <AbsoluteFill
        style={{
          ...camera,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
