"use client";

// Repli mobile : le MP4 deja rendu du secteur, pilote aux memes etapes.
//
// Pourquoi : le lecteur Remotion tombe a ~3,7 fps sur WebKit (mesure), et
// meme en coupant tous les filtres et toutes les ombres il plafonne a 9,5 —
// soit en abandonnant le liquid glass pour un resultat encore saccade. La
// video, elle, est fluide par nature.
//
// Ce qui est conserve : les 8 etapes cliquables, la synchronisation de
// l'etape active, et surtout LE CLIC DU PROSPECT sur « Valider » — la
// lecture s'arrete au meme instant et attend son geste.
//
// Pieges iOS evites : muted + playsInline (sinon WebKit refuse la lecture
// sans geste), yuv420p (le 4:4:4 donnait MEDIA_ERR_DECODE), et le seek se
// fait par currentTime en JS — JAMAIS par fragment #t= dans l'URL, qui est
// precisement ce qui avait casse le plan de cloture sur WebKit.
//
// CE COMPOSANT EST RENDU IMMEDIATEMENT, et seul son MP4 attend.
// Il pesait 6,2 Ko de JavaScript, mesures au reseau — le differer ne gagnait
// donc rien, et coutait tout : le substitut ne reservait que la boite 16/9 de la
// video (187 px a 375), la ou le composant en occupe 962. Les 775 px d'ecart
// poussaient toute la page, enveloppe FondSections comprise, pour un CLS de 0,25
// a 375 et 0,34 a 768.
//
// Le report porte maintenant sur le seul poids reel : `src` n'est pose qu'a
// l'approche. La <video> existe des le premier rendu, avec son rapport 16/9,
// donc sa boite ne change jamais. Meme correction cote bureau dans PremiumPlayer.
import { useCallback, useMemo, useRef, useState } from "react";
import { PHONE_STEPS } from "./steps";
import { PREMIUM_FORMAT } from "./theme";
import type { DemoKey } from "./registry";

type Props = {
  demoKey: DemoKey;
  labels: string[];
  validateLabel: string;
  hintLabel: string;
  ariaLabel: string;
  stepsLabel?: string;
  eyebrow?: string;
  title?: string;
  contextLine?: string;
  benefit?: string;
  /** Faux tant que la section n'est pas approchee : le MP4 n'est pas demande. */
  chargerMedia?: boolean;
};

const FPS = PREMIUM_FORMAT.fps;
const EPS = 0.04; // tolerance de fin de segment, ~1 frame
// `timeupdate` ne se declenche que ~4 fois par seconde : sans marge, la pause
// depassait la porte de validation et l'image figee montrait deja la fiche
// VALIDEE, avant meme le clic du prospect. On s'arrete un peu avant ; toute
// la plage precedente affiche « En attente de validation ».
const MARGE_PORTE = 0.35;

export default function MobileDemoVideo({
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
  chargerMedia = true,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [current, setCurrent] = useState(0);
  const [awaitingClick, setAwaitingClick] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [charge, setCharge] = useState(false);

  const stopAt = useRef<number | null>(null);
  const gatePassed = useRef(false);

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Bornes en secondes, derivees des memes frames que la composition : aucune
  // derive possible entre la video et le decoupage en etapes.
  const bornes = useMemo(
    () =>
      PHONE_STEPS.map((s) => ({
        key: s.key,
        from: s.from / FPS,
        to: s.to / FPS,
        gateAt: s.gateAt === undefined ? undefined : s.gateAt / FPS,
      })),
    []
  );

  const jouer = useCallback((from: number, to: number) => {
    const v = videoRef.current;
    if (!v) return;
    stopAt.current = to;
    try {
      v.currentTime = from;
    } catch {
      /* metadonnees pas encore la : le seek sera refait a loadedmetadata */
    }
    void v.play().catch(() => {
      /* iOS peut refuser avant interaction ; l'etape reste selectionnable */
    });
  }, []);

  const allerA = useCallback(
    (i: number, { parUtilisateur = true } = {}) => {
      const b = bornes[i];
      if (!b) return;
      if (parUtilisateur) setAutoplay(false);
      setCurrent(i);
      setAwaitingClick(false);
      gatePassed.current = false;

      if (reduced) {
        const v = videoRef.current;
        stopAt.current = null;
        v?.pause();
        if (v) v.currentTime = b.gateAt === undefined ? b.to - 0.05 : b.gateAt - MARGE_PORTE;
        if (b.gateAt) setAwaitingClick(true);
        return;
      }
      jouer(b.from, b.gateAt === undefined ? b.to : b.gateAt - MARGE_PORTE);
    },
    [bornes, jouer, reduced]
  );

  const onTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    const cible = stopAt.current;
    if (!v || cible === null) return;
    if (v.currentTime < cible - EPS) return;

    v.pause();
    stopAt.current = null;
    const b = bornes[current];

    if (b?.gateAt && !gatePassed.current) {
      setAwaitingClick(true);
      return;
    }
    if (autoplay && current < bornes.length - 1) {
      const suivant = current + 1;
      setCurrent(suivant);
      const n = bornes[suivant];
      jouer(n.from, n.gateAt === undefined ? n.to : n.gateAt - MARGE_PORTE);
    }
  }, [autoplay, bornes, current, jouer]);

  const onLoadedMetadata = useCallback(() => {
    if (reduced) {
      const v = videoRef.current;
      if (v) v.currentTime = bornes[0].from;
      return;
    }
    jouer(bornes[0].from, bornes[0].to);
  }, [bornes, jouer, reduced]);

  const valider = useCallback(() => {
    const b = bornes[current];
    if (!b?.gateAt) return;
    gatePassed.current = true;
    setAwaitingClick(false);
    jouer(b.gateAt, b.to);
  }, [bornes, current, jouer]);

  // Aucun scroll automatique sur mobile : la liste est SOUS la video, et
  // recentrer l'etape poussait le lecteur hors de l'ecran.

  return (
    <div>
      <div
        role="group"
        aria-label={ariaLabel}
        style={{
          position: "relative",
          borderRadius: "var(--radius, 12px)",
          overflow: "hidden",
          border: "1px solid var(--border-accent, rgba(255,255,255,0.12))",
          boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
          background: "#08080B",
        }}
      >
        <video
          ref={videoRef}
          // Pas de fragment #t= dans l'URL : WebKit le refuse.
          // Pas de src avant l'approche : c'est le seul poids reel de ce bloc, et
          // la boite est deja tenue par aspectRatio, donc rien ne bouge quand il
          // arrive. `onLoadedMetadata` demarre alors la lecture, exactement comme
          // il le faisait au montage.
          src={chargerMedia ? `/demos/${demoKey}_mobile.mp4` : undefined}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
          onWaiting={() => setCharge(true)}
          onPlaying={() => setCharge(false)}
          onCanPlay={() => setCharge(false)}
          style={{ width: "100%", aspectRatio: "16 / 9", display: "block" }}
        />

        {charge && !awaitingClick && (
          <div
            aria-live="polite"
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background: "rgba(4,4,8,0.35)",
            }}
          >
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                border: "2px solid rgba(255,255,255,0.22)",
                borderTopColor: "#0A84FF",
                animation: "nbhcSpin 0.8s linear infinite",
              }}
            />
          </div>
        )}

        {awaitingClick && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              // Voile leger : il eteint le bouton dessine dans la video pour
              // qu'un seul appel a l'action reste visible, celui du prospect.
              background: "rgba(4,4,8,0.52)",
            }}
          >
            <button
              type="button"
              onClick={valider}
              data-nbhc-overlay=""
              data-cursor="link"
              style={{
                padding: "16px 34px",
                borderRadius: 14,
                border: "2px solid #0A84FF",
                background: "rgba(10,132,255,0.22)",
                color: "#F5F5F7",
                fontFamily: "var(--font-jakarta), sans-serif",
                fontWeight: 600,
                fontSize: 17,
                cursor: "pointer",
              }}
            >
              {validateLabel}
            </button>
          </div>
        )}

      </div>

      {awaitingClick && (
        <p className="text-[14px] font-light mt-5" style={{ color: "var(--text-muted)" }}>
          {hintLabel}
        </p>
      )}

      {eyebrow && (
        <div
          className="text-[11px] font-medium tracking-[3px] uppercase mt-9 mb-5 flex items-center gap-2"
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
            fontSize: "clamp(30px, 8vw, 44px)",
            lineHeight: 1.04,
            letterSpacing: "-1.5px",
            color: "var(--text)",
          }}
        >
          {title}
        </h2>
      )}
      {contextLine && (
        <p className="text-[15px] font-light mb-7" style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
          {contextLine}
        </p>
      )}

      <ol className="flex flex-col gap-1 list-none p-0 m-0" aria-label={stepsLabel}>
        {bornes.map((b, i) => (
          <li key={b.key}>
            <button
              type="button"
              onClick={() => allerA(i)}
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
              <span className="leading-snug">{labels[i] ?? b.key}</span>
            </button>
          </li>
        ))}
      </ol>

      <style>{`
        @keyframes nbhcSpin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { [aria-live="polite"] span { animation: none; } }
      `}</style>

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
  );
}
