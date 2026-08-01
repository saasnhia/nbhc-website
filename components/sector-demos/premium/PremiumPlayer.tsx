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
  prevLabel?: string;
  nextLabel?: string;
};

export default function PremiumPlayer({
  demoKey,
  labels,
  validateLabel,
  hintLabel,
  ariaLabel,
  stepsLabel = "Étapes de la démonstration",
  prevLabel = "Étapes précédentes",
  nextLabel = "Étapes suivantes",
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

  // --- Habillage de la rangée d'étapes ---------------------------------------
  // Le défilement reste natif, mais la scrollbar système est masquée : elle est
  // remplacée par des fondus de bord et deux chevrons. Aucun contenu ne doit
  // être tranché net au bord d'un conteneur.
  const scrollerRef = useRef<HTMLOListElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  const [fade, setFade] = useState(72);

  const syncEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft < max - 4 });
    setFade(Math.round(Math.max(24, Math.min(72, el.clientWidth * 0.16))));
  }, []);

  useEffect(() => {
    syncEdges();
    const el = scrollerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(syncEdges);
    ro.observe(el);
    window.addEventListener("resize", syncEdges);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", syncEdges);
    };
  }, [syncEdges]);

  // L'étape active se recentre d'elle-même : sans ça, passé la 4e étape elle
  // sortait du champ sans que rien ne l'indique.
  useEffect(() => {
    const el = scrollerRef.current?.children[current] as HTMLElement | undefined;
    el?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduced ? "auto" : "smooth",
    });
  }, [current, reduced]);

  const nudge = useCallback(
    (dir: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollBy({
        left: dir * Math.max(160, el.clientWidth * 0.6),
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [reduced]
  );

  const mask = `linear-gradient(to right, ${
    edges.left ? "transparent" : "black"
  } 0, black ${fade}px, black calc(100% - ${fade}px), ${edges.right ? "transparent" : "black"} 100%)`;

  return (
    <div className={premiumFontClass}>
      <div
        ref={holderRef}
        role="group"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        style={{
          position: "relative",
          borderRadius: "var(--radius, 12px)",
          overflow: "hidden",
          outline: "none",
          border: "1px solid var(--border, rgba(255,255,255,0.07))",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          background: "#000",
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
              // Aucun texte visible : le libellé affiché reste celui de la
              // composition, déjà juste pour chaque famille.
              color: "transparent",
              fontSize: 0,
              cursor: "pointer",
              animation: "nbhcPulse 1.6s ease-in-out infinite",
            }}
          />
        )}
      </div>

      {awaitingClick && (
        <p className="text-[14px] font-light mt-5" style={{ color: "var(--text-muted)" }}>
          {hintLabel}
        </p>
      )}

      {/* Gouttiere laterale : les chevrons vivent a cote de la rangee, pas
          par-dessus les puces. Sans elle, la premiere puce passait sous le
          chevron et se lisait comme une coupe. */}
      <div className="relative mt-7 px-10 max-[600px]:px-7">
        <ol
          ref={scrollerRef}
          onScroll={syncEdges}
          data-nbhc-steps=""
          aria-label={stepsLabel}
          className="flex gap-2.5 list-none p-0 m-0 overflow-x-auto"
          style={{
            maskImage: mask,
            WebkitMaskImage: mask,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {steps.map((s, i) => (
            <li key={s.key} className="shrink-0">
              <button
                type="button"
                onClick={() => goToStep(i)}
                aria-current={i === current ? "step" : undefined}
                data-cursor="link"
                className="text-[13px] font-medium px-5 py-3 max-[600px]:px-3.5 max-[600px]:py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 cursor-pointer"
                style={{
                  border:
                    i === current
                      ? "1px solid rgba(10,132,255,0.55)"
                      : "1px solid var(--border, rgba(255,255,255,0.07))",
                  background:
                    i === current ? "rgba(10,132,255,0.14)" : "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(8px)",
                  color: i === current ? "var(--text)" : "var(--text-muted)",
                }}
              >
                <span style={{ opacity: 0.55 }}>{i + 1}.</span> {labels[i] ?? s.key}
              </button>
            </li>
          ))}
        </ol>

        {edges.left && (
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label={prevLabel}
            data-cursor="link"
            className="absolute top-1/2 -translate-y-1/2 grid place-items-center rounded-full cursor-pointer"
            style={{
              left: 0,
              width: 32,
              height: 32,
              border: "1px solid var(--border, rgba(255,255,255,0.07))",
              background: "var(--card, #161619)",
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            &lsaquo;
          </button>
        )}
        {edges.right && (
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label={nextLabel}
            data-cursor="link"
            className="absolute top-1/2 -translate-y-1/2 grid place-items-center rounded-full cursor-pointer"
            style={{
              right: 0,
              width: 32,
              height: 32,
              border: "1px solid var(--border, rgba(255,255,255,0.07))",
              background: "var(--card, #161619)",
              color: "var(--text-muted)",
              fontSize: 16,
              lineHeight: 1,
            }}
          >
            &rsaquo;
          </button>
        )}
      </div>

      <style>{`
        [data-nbhc-steps]::-webkit-scrollbar { display: none; }
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
