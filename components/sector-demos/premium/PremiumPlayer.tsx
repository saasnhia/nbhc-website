"use client";

// Lecteur interactif d'une démo premium.
//
// Ce n'est pas une vidéo : c'est la composition Remotion elle-même, montée
// dans la page. Le prospect avance étape par étape, revient, et surtout
// DÉCLENCHE LUI-MÊME la validation humaine — la lecture s'arrête sur la
// fiche et attend son clic.
import { Player, type PlayerRef } from "@remotion/player";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PremiumDemo } from "./PremiumDemo";
import { GARAGE } from "./sectors";
import { PREMIUM_FORMAT } from "./theme";
import { PHONE_STEPS, VALIDATE_BUTTON_POSITION, type DemoStep } from "./steps";
import { premiumFontClass } from "./premiumFonts";

type Props = {
  steps?: DemoStep[];
  labels: string[];
  validateLabel: string;
  hintLabel: string;
};

export default function PremiumPlayer({
  steps = PHONE_STEPS,
  labels,
  validateLabel,
  hintLabel,
}: Props) {
  const playerRef = useRef<PlayerRef>(null);
  const [current, setCurrent] = useState(0);
  const [awaitingClick, setAwaitingClick] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  // Cible de lecture courante : la frame à laquelle il faut s'arrêter.
  const stopAt = useRef<number | null>(null);
  const gatePassed = useRef(false);

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // prefers-reduced-motion : aucune lecture automatique, navigation manuelle
  // seule. L'utilisateur garde l'accès complet au contenu.
  useEffect(() => {
    if (reduced) setAutoplay(false);
  }, [reduced]);

  const playRange = useCallback((from: number, to: number) => {
    const p = playerRef.current;
    if (!p) return;
    stopAt.current = to;
    p.seekTo(from);
    p.play();
  }, []);

  const goToStep = useCallback(
    (index: number, { userInitiated = true } = {}) => {
      const step = steps[index];
      if (!step) return;
      if (userInitiated) setAutoplay(false);
      setCurrent(index);
      setAwaitingClick(false);
      gatePassed.current = false;

      if (reduced) {
        // Sans animation : on se pose sur la dernière image utile du plan.
        const p = playerRef.current;
        stopAt.current = null;
        p?.pause();
        p?.seekTo(step.gateAt ?? step.to - 1);
        if (step.gateAt) setAwaitingClick(true);
        return;
      }
      playRange(step.from, step.gateAt ?? step.to);
    },
    [playRange, reduced, steps]
  );

  // Arrêt à la frame cible, ouverture de la porte de validation, et
  // enchaînement automatique tant que le prospect n'a pas pris la main.
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    const onFrame = (e: { detail: { frame: number } }) => {
      const target = stopAt.current;
      if (target === null) return;
      if (e.detail.frame < target - 1) return;

      p.pause();
      stopAt.current = null;
      const step = steps[current];

      if (step?.gateAt && !gatePassed.current) {
        setAwaitingClick(true);
        return;
      }
      if (autoplay && current < steps.length - 1) {
        const next = current + 1;
        setCurrent(next);
        const ns = steps[next];
        playRange(ns.from, ns.gateAt ?? ns.to);
      }
    };
    p.addEventListener("frameupdate", onFrame);
    return () => p.removeEventListener("frameupdate", onFrame);
  }, [autoplay, current, playRange, steps]);

  // Démarrage : première étape, sauf mouvement réduit.
  useEffect(() => {
    if (reduced) {
      playerRef.current?.seekTo(steps[0].from);
      return;
    }
    playRange(steps[0].from, steps[0].to);
    // Volontairement une seule fois au montage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onValidate = useCallback(() => {
    const step = steps[current];
    if (!step?.gateAt) return;
    gatePassed.current = true;
    setAwaitingClick(false);
    playRange(step.gateAt, step.to);
  }, [current, playRange, steps]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToStep(Math.min(current + 1, steps.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToStep(Math.max(current - 1, 0));
      } else if ((e.key === "Enter" || e.key === " ") && awaitingClick) {
        e.preventDefault();
        onValidate();
      }
    },
    [awaitingClick, current, goToStep, onValidate, steps.length]
  );

  return (
    <div className={premiumFontClass}>
      <div
        role="group"
        aria-label="Démonstration interactive"
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{ position: "relative", borderRadius: 18, overflow: "hidden", outline: "none" }}
      >
        <Player
          ref={playerRef}
          component={PremiumDemo}
          inputProps={{ sector: GARAGE }}
          durationInFrames={PREMIUM_FORMAT.durationFrames}
          fps={PREMIUM_FORMAT.fps}
          compositionWidth={PREMIUM_FORMAT.width}
          compositionHeight={PREMIUM_FORMAT.height}
          style={{ width: "100%", aspectRatio: "16 / 9" }}
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          acknowledgeRemotionLicense
        />

        {/* Le vrai bouton du prospect, calé sur celui de la composition. */}
        {awaitingClick && (
          <button
            type="button"
            onClick={onValidate}
            aria-label={validateLabel}
            style={{
              position: "absolute",
              left: `${VALIDATE_BUTTON_POSITION.xPct}%`,
              top: `${VALIDATE_BUTTON_POSITION.yPct}%`,
              width: `${VALIDATE_BUTTON_POSITION.wPct}%`,
              height: `${VALIDATE_BUTTON_POSITION.hPct}%`,
              transform: "translate(-50%, -50%)",
              borderRadius: 12,
              border: "2px solid #0A84FF",
              background: "rgba(10,132,255,0.18)",
              color: "#F5F5F7",
              font: "600 clamp(11px, 1.6vw, 20px) var(--font-jakarta), sans-serif",
              cursor: "pointer",
              animation: "nbhcPulse 1.6s ease-in-out infinite",
            }}
          >
            {validateLabel}
          </button>
        )}
      </div>

      {awaitingClick && (
        <p style={{ marginTop: 12, fontSize: 14, color: "var(--muted, #94A3B8)" }}>{hintLabel}</p>
      )}

      <ol
        style={{
          display: "flex",
          gap: 8,
          listStyle: "none",
          padding: 0,
          margin: "16px 0 0",
          overflowX: "auto",
        }}
      >
        {steps.map((s, i) => (
          <li key={s.key}>
            <button
              type="button"
              onClick={() => goToStep(i)}
              aria-current={i === current ? "step" : undefined}
              style={{
                whiteSpace: "nowrap",
                padding: "8px 14px",
                borderRadius: 999,
                cursor: "pointer",
                fontSize: 13,
                border: i === current ? "1px solid #0A84FF" : "1px solid rgba(255,255,255,0.16)",
                background: i === current ? "rgba(10,132,255,0.16)" : "transparent",
                color: i === current ? "#F5F5F7" : "var(--muted, #94A3B8)",
              }}
            >
              {i + 1}. {labels[i] ?? s.key}
            </button>
          </li>
        ))}
      </ol>

      <style>{`
        @keyframes nbhcPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(10,132,255,0.45); }
          50% { box-shadow: 0 0 0 10px rgba(10,132,255,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="nbhcPulse"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
