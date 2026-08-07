"use client";

// Enveloppe de montage — c'est ici que se joue le coût réseau.
//
// ON REND CE QUI EST BON MARCHÉ, ON NE DIFFÈRE QUE CE QUI EST COÛTEUX.
//
// La version précédente différait le composant ENTIER derrière un substitut qui
// ne réservait que la boîte 16/9 de la vidéo. Mesuré : 187 px réservés pour
// 962 occupés à 375 px, 408 pour 1157 à 768, 439 pour 798 à 1440 — un manque de
// 333 à 801 px à toutes les largeurs. Toute la page était poussée d'autant,
// enveloppe FondSections comprise, ce qui donnait un CLS de 0,25 à 375 et 0,34
// à 768. Réserver la bonne hauteur était hors d'atteinte : elle croît
// continûment avec la largeur (955 → 1209 px sur la branche mobile), donc aucune
// valeur fixe par palier ne pouvait suivre.
//
// Le poids différé, mesuré au réseau au franchissement du seuil :
//   branche mobile   :   6,2 Ko de JS  +  le MP4 du secteur (382 Ko)
//   branche bureau   : 206,2 Ko de JS  (@remotion/player + les 9 compositions)
//
// Donc : les deux composants sont rendus immédiatement — leur ossature est du DOM
// léger — et chacun ne diffère que son média, qui a un rapport 16/9 et se réserve
// tout seul. Le lecteur Remotion reste derrière next/dynamic, dans
// PremiumPlayerCanvas ; le MP4 mobile n'obtient son `src` qu'à l'approche.
//
// Un seul lecteur vit à la fois : la `key` sur le secteur force React à démonter
// complètement le précédent au changement d'onglet.
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import MobileDemoVideo from "./MobileDemoVideo";
import PremiumPlayer from "./PremiumPlayer";
import type { DemoKey } from "./registry";

/**
 * Media query sans setState dans un effet. Le rendu serveur répond « non » :
 * la branche bureau n'est donc jamais rendue avant que le navigateur ait
 * confirmé la largeur, et le MP4 mobile n'est jamais demandé pour autant
 * puisque son `src` dépend de l'approche, pas de la largeur.
 *
 * Jumeau volontairement séparé de celui de FondSections : ce composant-là est
 * hors périmètre à cette porte, et on ne le touche pas pour partager douze
 * lignes. À mutualiser le jour où l'un des deux bouge pour une autre raison.
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

export default function PremiumDemoSection({
  demoKey,
  labels,
  validateLabel,
  hintLabel,
  ariaLabel,
  stepsLabel,
  eyebrow,
  title,
  contextLine,
  benefit,
}: {
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
}) {
  const holder = useRef<HTMLDivElement>(null);
  const [approche, setApproche] = useState(false);
  const bureau = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setApproche(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setApproche(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const commun = {
    demoKey,
    labels,
    validateLabel,
    hintLabel,
    ariaLabel,
    stepsLabel,
    eyebrow,
    title,
    contextLine,
    benefit,
    chargerMedia: approche,
  };

  return (
    <div ref={holder}>
      {bureau ? (
        <PremiumPlayer key={demoKey} {...commun} />
      ) : (
        <MobileDemoVideo key={demoKey} {...commun} />
      )}
    </div>
  );
}
