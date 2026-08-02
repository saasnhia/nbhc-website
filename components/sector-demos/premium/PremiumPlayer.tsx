"use client";

// Lecteur interactif d'une démo premium, tous secteurs.
//
// Ce n'est pas une vidéo : c'est la composition Remotion montée dans la page.
// Le prospect avance étape par étape, revient, et surtout DÉCLENCHE LUI-MÊME
// la validation humaine — la lecture s'arrête et attend son clic.
//
// L'habillage suit la charte de la home (rayons --radius, bordures --border,
// glassmorphism léger) pour que la section appartienne visuellement à la page ;
// seule la démo elle-même garde son accent bleu, qui est son identité.
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
  stepsLabel?: string;
  /** Contenu de la colonne gauche (architecture deux colonnes desktop). */
  eyebrow?: string;
  title?: string;
  contextLine?: string;
  benefit?: string;
};

export default function PremiumPlayer({
  demoKey,
  labels,
  validateLabel,
  hintLabel,
  ariaLabel,
  stepsLabel = "Étapes de la démonstration",
  eyebrow,
  title,
  contextLine,
  benefit,
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
   * Le Player rend du DOM, pas un canvas : on lit donc la boîte englobante du
   * bouton au lieu de la dériver. Une première version calculait la position à
   * la main et tombait 21 px trop haut ; et les quatre familles de mise en
   * scène placent leur bouton ailleurs. Cette lecture les couvre toutes.
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

  // La liste est verticale a toutes les largeurs : plus aucun defilement
  // horizontal nulle part. Seul reste le recentrage de l'etape active, utile
  // quand la colonne est plus courte que la liste.
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    // Recentrage UNIQUEMENT quand la liste est en colonne laterale (desktop).
    // Sous ce seuil la liste est SOUS le lecteur : recentrer l'etape poussait
    // le lecteur hors de l'ecran — on tapait une etape et la demo disparaissait.
    // Mesure reelle du seuil, pas une supposition de largeur.
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const el = listRef.current?.children[current] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", behavior: reduced ? "auto" : "smooth" });
  }, [current, reduced]);

  // Une seule forme de puce, verticale, a toutes les largeurs.
  const stepButton = (i: number, s: { key: string }) => (
    <button
      type="button"
      onClick={() => goToStep(i)}
      aria-current={i === current ? "step" : undefined}
      data-cursor="link"
      className="w-full text-left flex items-baseline gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer"
      style={{
        border:
          i === current ? "1px solid rgba(10,132,255,0.55)" : "1px solid transparent",
        background: i === current ? "rgba(10,132,255,0.14)" : "transparent",
        color: i === current ? "var(--text)" : "var(--text-muted)",
        fontSize: 15,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-syne)",
          fontWeight: 700,
          fontSize: 13,
          opacity: i === current ? 0.9 : 0.45,
          color: i === current ? "#4DA6FF" : "inherit",
          minWidth: 18,
        }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="leading-snug">{labels[i] ?? s.key}</span>
    </button>
  );

  return (
    <div className={premiumFontClass}>
      <div className="grid grid-cols-1 gap-10 max-[1023px]:gap-8 min-[1024px]:grid-cols-[minmax(0,37%)_minmax(0,63%)] items-start">
        {/* Colonne gauche — sous le lecteur en dessous de 1024 px : le
            vertical est naturel au pouce, et le lecteur doit rester en tete. */}
        <div className="min-w-0 max-[1023px]:order-2">
          {eyebrow && (
            <div
              className="text-[11px] font-medium tracking-[3px] uppercase mb-5 flex items-center gap-2"
              style={{ color: "var(--gold)" }}
            >
              <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
              {eyebrow}
            </div>
          )}
          {title && (
            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(34px, 3.4vw, 60px)",
                lineHeight: 1.02,
                letterSpacing: "-2px",
                color: "var(--text)",
              }}
            >
              {title}
            </h2>
          )}
          {contextLine && (
            <p
              className="text-[15px] font-light mb-8"
              style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
            >
              {contextLine}
            </p>
          )}

          {/* Liste verticale, desktop */}
          <ol ref={listRef} className="flex flex-col gap-1 list-none p-0 m-0" aria-label={stepsLabel}>
            {steps.map((s, i) => (
              <li key={s.key}>{stepButton(i, s)}</li>
            ))}
          </ol>

          {benefit && (
            <p
              className="text-[14px] font-light mt-8 pt-6"
              style={{
                color: "var(--text-muted)",
                lineHeight: 1.7,
                borderTop: "1px solid var(--border, rgba(255,255,255,0.07))",
              }}
            >
              {benefit}
            </p>
          )}
        </div>

        {/* Colonne droite — le lecteur, qui occupe vraiment sa colonne. */}
        <div className="min-w-0 max-[1023px]:order-1 relative">
          {/* Halo doux derriere le cadre : ce qui detache le lecteur du fond
              au lieu de le laisser flotter en sombre-sur-sombre. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 max-[600px]:-inset-4"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 40%, rgba(196,151,58,0.10), rgba(10,132,255,0.05) 45%, transparent 72%)",
              filter: "blur(28px)",
            }}
          />
          <div
            ref={holderRef}
            role="group"
            aria-label={ariaLabel}
            tabIndex={0}
            onKeyDown={onKeyDown}
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              outline: "none",
              border: "1px solid var(--border-accent, rgba(255,255,255,0.12))",
              boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 2px 0 rgba(255,255,255,0.04) inset",
              background: "#08080B",
            }}
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
              style={{ width: "100%", aspectRatio: "16 / 9", display: "block" }}
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
                data-cursor="link"
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
                  // Aucun texte visible : le libelle affiche reste celui de la
                  // composition, deja juste pour chaque famille.
                  color: "transparent",
                  fontSize: 0,
                  cursor: "pointer",
                  animation: "nbhcPulse 1.6s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {awaitingClick && (
            <p className="text-[14px] font-light mt-5 relative" style={{ color: "var(--text-muted)" }}>
              {hintLabel}
            </p>
          )}

        </div>
      </div>

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
