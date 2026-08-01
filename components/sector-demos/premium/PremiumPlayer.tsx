"use client";

// Lecteur interactif d'une démo premium, tous secteurs.
//
// Ce n'est pas une vidéo : c'est la composition Remotion montée dans la page.
// Le prospect avance étape par étape, revient, et surtout DÉCLENCHE LUI-MÊME
// la validation humaine — la lecture s'arrête et attend son clic.
import { Player, type PlayerRef } from "@remotion/player";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { DEMO_REGISTRY, type DemoKey } from "./registry";
import { PREMIUM_FORMAT } from "./theme";
import { PHONE_STEPS } from "./steps";
import { premiumFontClass } from "./premiumFonts";

type Rect = { left: number; top: number; width: number; height: number };

type Props = {
  demoKey: DemoKey;
  labels: string[];
  validateLabel: string;
  hintLabel: string;
  ariaLabel: string;
};

export default function PremiumPlayer({
  demoKey,
  labels,
  validateLabel,
  hintLabel,
  ariaLabel,
}: Props) {
  const entry = DEMO_REGISTRY[demoKey];
  const steps = PHONE_STEPS; // découpage commun aux deux moules
  const playerRef = useRef<PlayerRef>(null);
  const holderRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);
  const [awaitingClick, setAwaitingClick] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [buttonRect, setButtonRect] = useState<Rect | null>(null);

  const stopAt = useRef<number | null>(null);
  const gatePassed = useRef(false);

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

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

  /**
   * Position réelle du bouton de la composition, lue dans le DOM.
   *
   * Le Player rend du DOM, pas un canvas : on lit donc la boîte englobante
   * du bouton au lieu de la dériver de la mise en page. Une première version
   * calculait la position à la main et tombait 21 px trop haut ; et les
   * quatre familles de mise en scène placent leur bouton à des endroits
   * différents. Cette lecture les couvre toutes, sans relevé.
   */
  const syncButtonRect = useCallback(() => {
    const holder = holderRef.current;
    if (!holder) return;
    const btn = holder.querySelector<HTMLElement>("[data-nbhc-validate]");
    if (!btn) {
      setButtonRect(null);
      return;
    }
    const b = btn.getBoundingClientRect();
    const h = holder.getBoundingClientRect();
    setButtonRect({
      left: b.left - h.left,
      top: b.top - h.top,
      width: b.width,
      height: b.height,
    });
  }, []);

  useLayoutEffect(() => {
    if (!awaitingClick) return;
    syncButtonRect();
    const onResize = () => syncButtonRect();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [awaitingClick, syncButtonRect]);

  const goToStep = useCallback(
    (index: number, { userInitiated = true } = {}) => {
      const step = steps[index];
      if (!step) return;
      if (userInitiated) setAutoplay(false);
      setCurrent(index);
      setAwaitingClick(false);
      gatePassed.current = false;

      if (reduced) {
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

  useEffect(() => {
    if (reduced) {
      playerRef.current?.seekTo(steps[0].from);
      return;
    }
    playRange(steps[0].from, steps[0].to);
    // Volontairement au montage seul : chaque onglet monte un lecteur neuf.
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
        ref={holderRef}
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{ position: "relative", borderRadius: 18, overflow: "hidden", outline: "none" }}
      >
        <Player
          ref={playerRef}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component={entry.component as any}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          inputProps={entry.props as any}
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

        {awaitingClick && buttonRect && (
          <button
            type="button"
            onClick={onValidate}
            aria-label={validateLabel}
            data-nbhc-overlay=""
            style={{
              position: "absolute",
              left: buttonRect.left,
              top: buttonRect.top,
              width: buttonRect.width,
              height: buttonRect.height,
              borderRadius: Math.min(18, buttonRect.height / 3),
              border: "2px solid #0A84FF",
              background: "rgba(10,132,255,0.14)",
              // Aucun texte visible : le libellé affiché reste celui de la
              // composition, qui est déjà juste pour chaque famille
              // (« Valider la sélection », « Valider et envoyer »…). Une
              // étiquette propre à l'overlay se superposerait à la sienne.
              color: "transparent",
              fontSize: 0,
              cursor: "pointer",
              animation: "nbhcPulse 1.6s ease-in-out infinite",
            }}
          />
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
          scrollbarWidth: "thin",
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
          [data-nbhc-overlay] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
