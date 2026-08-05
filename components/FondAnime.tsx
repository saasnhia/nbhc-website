"use client";

// Bande de transition animee, entre la section EN ACTION et COMMENT CA MARCHE.
//
// POURQUOI UNE BOUCLE ET PAS UN SCRUB. Le mouvement de la source est plat :
// la difference entre images consecutives reste entre 0,38 et 0,47 sur toute
// la duree, sans aucun pic. Il n'y a donc rien a « construire » au scroll —
// scruber une texture uniforme ne raconte rien et donne une impression de
// patinage. C'est un fond, il tourne en boucle.
//
// POURQUOI UNE <video> ET PAS UNE SEQUENCE D'IMAGES. La regle du projet
// interdit le SEEK sur une video, pas la lecture. Et la mesure tranche : le
// maillage fin comprime tres mal en WebP (24 Ko l'image, soit 1 466 Ko pour
// 60 images) alors que la meme matiere en H.264 tient en 829 Ko pour deux
// fois plus de duree, avec un seul pipeline de decodage materiel.
//
// POURQUOI UN PALINDROME. La boucle brute saute : l'ecart entre la derniere
// et la premiere image vaut 7,66, contre 0,43 entre deux images consecutives.
// Le fichier contient donc l'aller puis le retour, ce qui ramene l'ecart a
// 1,16 — invisible a l'oeil.
//
// AUCUN TEXTE PAR-DESSUS. Les pixels les plus clairs de la source imposeraient
// un voile noir a 0,7 pour tenir le contraste, et meme la --text-muted
// tomberait a 3,5:1, sous le seuil AA. On ne met donc rien dessus.
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

const POSTER = "/sequences/fond-anime-poster.jpg";

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

export default function FondAnime({ alt }: { alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduit = useMediaQuery("(prefers-reduced-motion: reduce)");
  const large = useMediaQuery("(min-width: 1024px)");
  // Sous 1024 px on sert le poster : 829 Ko de decor sur un forfait mobile ne
  // se justifient pas, et c'est la meme regle que partout ailleurs sur le site.
  const anime = large && !reduit;

  // Hors de l'ecran, une video en lecture continue de decoder : c'est du
  // travail perdu qui pese sur le reste de la page. On la met en pause.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !anime) return;
    const observateur = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else if (!v.paused) v.pause();
      },
      { rootMargin: "20% 0px", threshold: 0 }
    );
    observateur.observe(v);
    return () => observateur.disconnect();
  }, [anime]);

  return (
    <section
      aria-hidden="true"
      className="relative w-full overflow-hidden"
      style={{ height: "50vh", minHeight: 300, background: "var(--bg)" }}
    >
      {!anime ? (
        <img
          src={POSTER}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          poster={POSTER}
          muted
          playsInline
          loop
          preload="none"
          aria-label={alt}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/sequences/fond-anime.webm" type="video/webm" />
          <source src="/sequences/fond-anime.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fondus haut et bas : la bande nait du fond de page et y retourne,
          au lieu d'apparaitre comme un bloc rapporte. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{ background: "linear-gradient(to bottom, var(--bg), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />
    </section>
  );
}
