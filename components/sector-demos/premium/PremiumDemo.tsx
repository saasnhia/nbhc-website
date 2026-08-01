// Moule premium — 8 plans, 396 frames @24fps (16,5 s).
//
// Générique : le récit est le même pour toutes les automatisations
// TÉLÉPHONIQUES (décrocher, comprendre, consulter, proposer, rédiger, faire
// valider). Seul le contenu change, porté par SectorSpec. Les secteurs dont
// l'automatisation n'est pas un appel auront leur propre composition — les
// plaquer ici serait un contresens.
//
// Les plans sont des <Sequence> juxtaposées : les transitions sont donc des
// COUPES FRANCHES. Aucun fondu enchaîné, conformément à l'analyse de
// hero.webm (0 dissolution sur 12 s). Chaque plan a son mouvement propre :
// aucun plan fixe.
import React from "react";
import { Sequence } from "remotion";
import { Scene } from "./Scene";
import { SHOTS } from "./theme";
import type { SectorSpec } from "./sectors";
import {
  ShotAppel,
  ShotRepond,
  ShotComprend,
  ShotPlanning,
  ShotCreneau,
  ShotFiche,
  ShotValidation,
  ShotBenefice,
} from "./scenes";

export const PremiumDemo: React.FC<{ sector: SectorSpec }> = ({ sector: s }) => (
  <>
    <Sequence from={SHOTS.appel.from} durationInFrames={SHOTS.appel.dur}>
      <Scene duration={SHOTS.appel.dur} move={{ scaleFrom: 1.0, scaleTo: 1.06, rotFrom: -0.8, rotTo: 0.7 }}>
        <ShotAppel s={s} />
      </Scene>
    </Sequence>

    <Sequence from={SHOTS.repond.from} durationInFrames={SHOTS.repond.dur}>
      <Scene duration={SHOTS.repond.dur} move={{ xFrom: 46, xTo: -46, scaleFrom: 1.04, scaleTo: 1.0 }}>
        <ShotRepond s={s} />
      </Scene>
    </Sequence>

    <Sequence from={SHOTS.comprend.from} durationInFrames={SHOTS.comprend.dur}>
      <Scene duration={SHOTS.comprend.dur} move={{ scaleFrom: 1.07, scaleTo: 1.0, yFrom: -14, yTo: 10 }}>
        <ShotComprend s={s} />
      </Scene>
    </Sequence>

    <Sequence from={SHOTS.planning.from} durationInFrames={SHOTS.planning.dur}>
      <Scene duration={SHOTS.planning.dur} move={{ xFrom: -52, xTo: 52, scaleFrom: 1.0, scaleTo: 1.05 }}>
        <ShotPlanning s={s} />
      </Scene>
    </Sequence>

    <Sequence from={SHOTS.creneau.from} durationInFrames={SHOTS.creneau.dur}>
      <Scene duration={SHOTS.creneau.dur} move={{ scaleFrom: 1.0, scaleTo: 1.08 }}>
        <ShotCreneau s={s} />
      </Scene>
    </Sequence>

    <Sequence from={SHOTS.fiche.from} durationInFrames={SHOTS.fiche.dur}>
      {/* Échelle autour de 1 : plus bas, la carte flotte dans du vide. */}
      <Scene duration={SHOTS.fiche.dur} move={{ xFrom: 34, xTo: -34, yFrom: 16, yTo: -16, scaleFrom: 1.02, scaleTo: 1.09 }}>
        <ShotFiche s={s} />
      </Scene>
    </Sequence>

    <Sequence from={SHOTS.validation.from} durationInFrames={SHOTS.validation.dur}>
      {/* Recul net après le plan 6 qui finit à 1,09 : c'est cet écart qui
          porte la coupe, la fiche étant la même des deux côtés. */}
      <Scene duration={SHOTS.validation.dur} move={{ scaleFrom: 0.96, scaleTo: 1.02, yFrom: 12, yTo: -12 }}>
        <ShotValidation s={s} />
      </Scene>
    </Sequence>

    <Sequence from={SHOTS.benefice.from} durationInFrames={SHOTS.benefice.dur}>
      <Scene duration={SHOTS.benefice.dur} move={{ scaleFrom: 1.06, scaleTo: 1.0, xFrom: -18, xTo: 18 }}>
        <ShotBenefice s={s} />
      </Scene>
    </Sequence>
  </>
);
