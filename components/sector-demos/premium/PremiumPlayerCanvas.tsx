"use client";

// LA SEULE PARTIE COUTEUSE DU LECTEUR BUREAU — et donc la seule qui reste
// chargee paresseusement.
//
// Mesure au reseau : le franchissement du seuil de montage tirait 206,2 Ko de
// JavaScript a 1440 px, dont 205 dans un unique chunk. Ce chunk, c'est
// @remotion/player plus les neuf compositions, que DEMO_REGISTRY importe toutes.
// Le reste de PremiumPlayer — l'ossature, la liste d'etapes, la machine a etats —
// ne pese rien et n'a aucune raison d'attendre.
//
// D'ou ce fichier : il isole les deux imports lourds. PremiumPlayer le charge par
// next/dynamic, derriere une boite au meme rapport 16/9, ce qui rend la hauteur
// identique avant et apres le montage.
//
// Le ref n'est pas transmis par `ref` mais par une prop : next/dynamic ne
// transfere pas les refs. Un objet de ref passe en prop ordinaire fonctionne, et
// evite un forwardRef de plus dans la chaine.
import { Player, type PlayerRef } from "@remotion/player";
import { useEffect } from "react";
import { DEMO_REGISTRY, type DemoKey } from "./registry";
import { PREMIUM_FORMAT } from "./theme";

export default function PremiumPlayerCanvas({
  demoKey,
  refLecteur,
  onPret,
}: {
  demoKey: DemoKey;
  refLecteur: React.RefObject<PlayerRef | null>;
  /** Appele une fois le Player monte : c'est le signal que refLecteur est utilisable. */
  onPret: () => void;
}) {
  const entry = DEMO_REGISTRY[demoKey];

  useEffect(() => {
    onPret();
  }, [onPret]);

  return (
    <Player
      ref={refLecteur}
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
  );
}
