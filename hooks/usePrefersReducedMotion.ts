"use client";

// LA PREFERENCE DE MOUVEMENT REDUIT, UN SEUL POINT DE VERITE.
//
// POURQUOI CE FICHIER EXISTE. Treize composants animaient en GSAP ou en Framer
// Motion sans consulter la preference. La seule regle globale du depot,
// app/globals.css:205-207, ne masque que `.hero-video` et `.demo-video` : elle
// ne coupe ni animation ni transition. Chaque composant qui la consultait le
// faisait a sa facon — `window.matchMedia(...).matches` lu UNE FOIS dans un
// effet, donc sourd a un changement de reglage en cours de session.
//
// POURQUOI CE N'EST PAS `useReducedMotion` DE FRAMER MOTION. Ce nom est deja
// pris par la bibliotheque, utilisee ailleurs dans le depot (DemoStage.tsx:42).
// Deux hooks homonymes dans le meme code sont une confusion en attente : le nom
// est donc different, et les composants Framer continuent d'utiliser le leur.
//
// POURQUOI `useSyncExternalStore` ET PAS UN `useState` DANS UN EFFET. C'est le
// motif deja employe par FondSections.tsx:58-72 : l'instantane du serveur
// repond « non », donc le rendu serveur et la premiere image du client
// concordent, et aucune animation n'est declenchee puis annulee.
//
// CE QUE CE HOOK NE FAIT PAS. Il ne decide de rien. La regle de comportement
// vit dans chaque composant, parce qu'elle n'est pas la meme partout :
//
//   - une REVELATION au defilement doit poser son ETAT FINAL immediatement.
//     Sauter le tween ne suffit pas : le `gsap.set(..., { opacity: 0 })` qui le
//     precede a deja rendu la section invisible, et la section le resterait.
//     C'est le piege de ce lot, et il existe sous une deuxieme forme dans
//     Contact.tsx:136, ou l'etat de depart est un `transform: scaleY(0)` ECRIT
//     DANS LE STYLE EN LIGNE, que seul un `gsap.set` peut ecraser ;
//   - un mouvement PERPETUEL et decoratif s'arrete ;
//   - un changement d'ETAT (ouverture d'un menu, suivi du pointeur) garde sa
//     fonction et perd sa duree.
import { useCallback, useSyncExternalStore } from "react";

const REQUETE = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion(): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    const mq = window.matchMedia(REQUETE);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REQUETE).matches,
    () => false
  );
}
