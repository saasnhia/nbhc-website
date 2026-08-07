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
// FORMAT VIEWPORT ET CALQUE COLLANT. La premiere version dimensionnait le
// fichier sur le BLOC entier — 720x1440 pour deux sections empilees. Mesure du
// rendu : 1440x2940, soit un agrandissement de 2,04x. Les mailles doublaient
// et le reseau cessait de se lire ; il n'en restait que deux ou trois a
// l'ecran. Le fichier est desormais au format du viewport et le calque est
// rendu en position collante : il reste a l'echelle 1:1 quelle que soit la
// hauteur du bloc traverse. Mesure apres correction : 27 a 47 noeuds dans la
// bande centrale.
//
// L'OVERFLOW EST SUR L'ELEMENT COLLANT, PAS SUR SON PARENT. Un ancetre en
// overflow:hidden devient un conteneur de defilement, et l'element collant se
// resout alors contre une boite qui ne defile pas — donc ne colle plus.
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Hauteur des deux fondus de l'enveloppe, et decalage de celle-ci vers le haut.
 *
 * Une seule valeur pour les deux, en unites de viewport : le fondu d'entree
 * doit couvrir exactement la zone dont l'enveloppe a ete remontee, sinon il
 * deborderait sur le contenu ou laisserait une marche. 65 % du viewport — un
 * fondu court se voit autant qu'une coupure.
 */
const FONDU = "65vh";

// DEUX POSTERS, UN PAR FORME. La variante mobile est en portrait depuis le
// reencodage : un poster paysage y subirait exactement l'agrandissement qu'on
// vient de corriger sur la video. Et ce poster n'est pas un detail — avec
// `preload="none"` c'est lui qui tient l'ecran jusqu'a ce que la video arrive,
// et c'est le seul visuel affiche sous prefers-reduced-motion.
const POSTER = "/fond/fond-anime-poster.jpg";
const POSTER_MOBILE = "/fond/fond-anime-poster-mobile.jpg";
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
    // overflowX clip, et surtout PAS hidden. Les voiles locaux debordent
    // horizontalement des blocs de texte ; sur un ecran etroit le bloc occupe
    // presque toute la largeur, donc ce debordement creait une barre de
    // defilement horizontale — mesure : 39 a 74 px selon la largeur, contre 0 a
    // 1440. `clip` decoupe sans creer de conteneur de defilement, ce qui laisse
    // le calque collant se resoudre contre le viewport ; `hidden` en ferait un
    // scrollport et le calque cesserait de coller.
    // MARGE NEGATIVE COMPENSEE PAR UNE MARGE INTERNE EGALE. L'enveloppe demarre
    // ainsi FONDU px plus haut sans deplacer d'un pixel le contenu qu'elle
    // porte. Le fondu d'entree se joue donc derriere la section EN ACTION, qui
    // la precede, et le maillage est deja a pleine force la ou le premier titre
    // apparait. Sans ce decalage, le fondu occupait les 600 premiers pixels de
    // l'enveloppe et le reseau n'atteignait sa pleine force qu'APRES le titre.
    <div
      className="relative"
      style={{
        background: "var(--bg)",
        overflowX: "clip",
        marginTop: `-${FONDU}`,
        paddingTop: FONDU,
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 h-screen overflow-hidden">
          {reduit ? (
            <img
              src={large ? POSTER : POSTER_MOBILE}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              poster={large ? POSTER : POSTER_MOBILE}
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
      </div>

      {/* FONDUS DE L'ENVELOPPE, au-dessus de la video et sous le contenu.
          Deux degrades plats, rasterises une fois : aucun mask-image, aucun
          filter, aucun blur, donc aucun cout par image. C'est la seule raison
          de proceder ainsi. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{ height: FONDU, background: "linear-gradient(to bottom, var(--bg), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: FONDU, background: "linear-gradient(to top, var(--bg), transparent)" }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}
