"use client";

// Calque de fond anime, place DERRIERE le contenu des sections qu'il enveloppe.
// Ce n'est pas une section autonome : les sections passent devant lui.
//
// TOUT EST CUIT DANS LE FICHIER. La courbe de tons, l'epaississement des
// lignes et le fondu vers le noir de page sont appliques a l'encodage. Aucun
// filter, aucun mask-image, aucun backdrop-filter ici : sur une page a
// 13 images par seconde sur WebKit, un effet permanent sur une video plein
// cadre est un cout qu'on ne peut pas payer, et qu'on n'a pas besoin de payer.
// Les premieres et dernieres lignes de l'image valent deja 9,4 — la valeur de
// #09090b — donc le raccord avec la page est invisible sans une ligne de CSS.
//
// MP4 SEUL, PAS DE WEBM. Sur WebKit, canPlayType annonce « probably » pour le
// VP9, le decodage echoue quand meme, aucune erreur n'est levee et le
// navigateur ne se rabat pas sur la source suivante. C'est ce qui rendait le
// calque precedent invisible.
//
// FORMAT VERTICAL 720x1440. Le calque couvre deux sections empilees, soit un
// bloc d'environ 1:2 sur un ecran large. Une video 16:9 etiree dans ce cadre
// subissait un agrandissement de 4x.
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

const POSTER = "/fond/fond-anime-poster.jpg";
const BUREAU = "/fond/fond-anime.mp4";
const MOBILE = "/fond/fond-anime-mobile.mp4";

/**
 * Media query sans setState dans un effet. Le rendu serveur repond « non » :
 * la variante lourde n'est jamais demandee avant que le navigateur ait
 * confirme la largeur.
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
    () => false
  );
}

export default function FondSections({ children }: { children: React.ReactNode }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduit = useMediaQuery("(prefers-reduced-motion: reduce)");
  const large = useMediaQuery("(min-width: 1024px)");

  // Hors de l'ecran, une video en lecture continue de decoder : c'est du
  // travail perdu qui pese sur le reste de la page.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduit) return;
    const observateur = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else if (!v.paused) v.pause();
      },
      { rootMargin: "15% 0px", threshold: 0 }
    );
    observateur.observe(v);
    return () => observateur.disconnect();
  }, [reduit]);

  return (
    <div className="relative" style={{ background: "var(--bg)" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {reduit ? (
          <img
            src={POSTER}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            poster={POSTER}
            muted
            playsInline
            loop
            preload="none"
            className="h-full w-full object-cover"
            // Une seule source, et en MP4 : voir l'entete du fichier.
            src={large ? BUREAU : MOBILE}
          />
        )}
      </div>

      <div className="relative">{children}</div>
    </div>
  );
}
