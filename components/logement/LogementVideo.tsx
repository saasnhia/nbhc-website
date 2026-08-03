"use client";

// Le héros de la page : la vidéo de présentation, en grand.
//
// AUTOPLAY MUET EN BOUCLE, et non lecture au clic. La page s'ouvre devant un
// gérant qui vient de raccrocher : chaque geste supplémentaire est une chance
// de le perdre. En dix secondes de boucle il a vu le produit sans rien faire.
//
// DEUX DÉMONSTRATIONS, une seule montée à la fois. Le prospect choisit le type
// de bien qui lui ressemble ; on ne charge jamais les deux vidéos en parallèle
// (AnimatePresence mode="wait" démonte la sortante avant de monter l'entrante),
// et une seule variante de largeur est téléchargée.
//
// Le cadre porte lui-même le rapport 4:3 : pendant le fondu il n'a aucun
// enfant, et sans cette contrainte la page sauterait à chaque changement.
//
// Pièges connus du projet, évités : yuv420p (le 10 bits et le 4:4:4 cassent
// silencieusement sur iOS), playsInline (sans quoi WebKit refuse la lecture
// inline), et aucun fragment #t= dans l'URL (WebKit le rejette).
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState, useSyncExternalStore } from "react";

// Du plus petit au plus grand : c'est la progression naturelle, et elle suit
// les segments S / M / L de la grille tarifaire interne.
export const VARIANTES = ["studio", "appartement", "villa"] as const;
export type Variante = (typeof VARIANTES)[number];

const SOURCES: Record<Variante, { desktop: string; mobile: string; poster: string }> = {
  studio: {
    desktop: "/logement/logement-studio-desktop.mp4",
    mobile: "/logement/logement-studio-mobile.mp4",
    poster: "/logement/logement-studio-poster.jpg",
  },
  appartement: {
    desktop: "/logement/logement-demo-desktop.mp4",
    mobile: "/logement/logement-demo-mobile.mp4",
    poster: "/logement/logement-demo-poster.jpg",
  },
  villa: {
    desktop: "/logement/logement-villa-desktop.mp4",
    mobile: "/logement/logement-villa-mobile.mp4",
    poster: "/logement/logement-villa-poster.jpg",
  },
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Lit une media query sans passer par un effet qui pose un état : c'est la
 * forme idiomatique côté React, et elle évite un rendu intermédiaire où la
 * valeur serait fausse.
 */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    // Rendu serveur : on ne sait rien de l'appareil, on part du plus petit.
    () => false
  );
}

type Props = {
  variante: Variante;
  ariaLabel: string;
  soundOn: string;
  soundOff: string;
};

export default function LogementVideo({ variante, ariaLabel, soundOn, soundOff }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const large = useMediaQuery("(min-width: 768px)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  const jeu = SOURCES[variante];
  // Une seule variante est demandée, jamais les deux.
  const source = large ? jeu.desktop : jeu.mobile;

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) void v.play().catch(() => {});
  };

  return (
    <div className="relative">
      {/* Halo doux : c'est lui qui détache la vidéo du fond sombre, sans
          filtre de flou (coûteux au rendu, leçon des démos sectorielles). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 max-[900px]:-inset-4"
        style={{
          background:
            "radial-gradient(58% 58% at 50% 42%, rgba(196,151,58,0.14), rgba(196,151,58,0.04) 45%, transparent 72%)",
        }}
      />

      <div
        className="relative overflow-hidden"
        style={{
          // Le rapport est porté par le cadre, pas par la vidéo : il tient
          // même pendant le fondu, quand le cadre est momentanément vide.
          aspectRatio: "4 / 3",
          borderRadius: 16,
          border: "1px solid var(--border-accent)",
          boxShadow: "0 46px 110px rgba(0,0,0,0.6), 0 2px 0 rgba(255,255,255,0.04) inset",
          background: "#08080B",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.video
            // La clé porte la variante ET la largeur : changer de source sur
            // un même élément <video> laisse WebKit afficher la dernière image
            // de la précédente le temps du chargement.
            key={`${variante}-${large ? "d" : "m"}`}
            ref={videoRef}
            poster={jeu.poster}
            src={source}
            muted
            playsInline
            loop
            autoPlay={!reduced}
            controls={reduced}
            preload="metadata"
            aria-label={ariaLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.28, ease: EASE }}
            onLoadedMetadata={(e) => {
              // Le son suit le choix de l'utilisateur d'une démo à l'autre.
              e.currentTarget.muted = muted;
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </AnimatePresence>

        {/* La source a une piste audio : on laisse le choix plutôt que de la
            taire définitivement. Discret, en surimpression. */}
        {!reduced && (
          <button
            type="button"
            onClick={toggleSound}
            data-cursor="link"
            aria-label={muted ? soundOn : soundOff}
            className="absolute bottom-4 right-4 grid place-items-center rounded-full transition-opacity duration-200 hover:opacity-80"
            style={{
              width: 42,
              height: 42,
              border: "1px solid var(--border-accent)",
              background: "rgba(8,8,11,0.62)",
              color: "var(--text)",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" fill="currentColor" />
              {muted ? (
                <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path
                  d="M15.8 8.6a4.6 4.6 0 0 1 0 6.8M18.4 6.2a8 8 0 0 1 0 11.6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              )}
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
