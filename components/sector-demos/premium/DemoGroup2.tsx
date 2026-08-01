// Assemblage des 6 démos non téléphoniques.
//
// Même squelette temporel que le moule téléphonique — 8 plans, 396 frames
// @24fps, coupes franches, mouvement sur chaque plan — mais la mise en scène
// de chaque plan vient de la famille du secteur.
import React from "react";
import { Sequence } from "remotion";
import { Scene, type CameraMove } from "./Scene";
import { SHOTS } from "./theme";
import { CloseShot } from "./CloseShot";
import type { AssemblySpec, DemoSpec, ListSpec, QuoteSpec, ScheduleSpec } from "./sectors2";
import {
  ListShot1, ListShot2, ListShot3, ListShot4, ListShot5, ListShot6, ListShot7,
  AsmShot1, AsmShot2, AsmShot3, AsmShot4, AsmShot5, AsmShot6, AsmShot7,
  QuoteShot1, QuoteShot2, QuoteShot3, QuoteShot4, QuoteShot5, QuoteShot6, QuoteShot7,
  SchedShot1, SchedShot2, SchedShot3, SchedShot4, SchedShot5, SchedShot6, SchedShot7,
} from "./scenesGroup2";

// Un mouvement distinct par plan : aucun plan fixe, et les écarts d'échelle
// de part et d'autre d'une coupe la rendent perceptible même quand deux plans
// voisins montrent la même carte (plans 6 et 7 notamment).
const MOVES: CameraMove[] = [
  { scaleFrom: 1.0, scaleTo: 1.06, rotFrom: -0.6, rotTo: 0.6 },
  { xFrom: 46, xTo: -46, scaleFrom: 1.04, scaleTo: 1.0 },
  { scaleFrom: 1.07, scaleTo: 1.0, yFrom: -14, yTo: 10 },
  { xFrom: -52, xTo: 52, scaleFrom: 1.0, scaleTo: 1.05 },
  // Echelle bornee a 1.05 : au-dela, le bandeau de garde-fou sortait du
  // cadre sur les secteurs reglementes.
  { scaleFrom: 1.0, scaleTo: 1.05 },
  { xFrom: 34, xTo: -34, yFrom: 16, yTo: -16, scaleFrom: 1.0, scaleTo: 1.05 },
  { scaleFrom: 0.96, scaleTo: 1.02, yFrom: 12, yTo: -12 },
  { scaleFrom: 1.06, scaleTo: 1.0, xFrom: -18, xTo: 18 },
];

const ORDER = [
  SHOTS.appel, SHOTS.repond, SHOTS.comprend, SHOTS.planning,
  SHOTS.creneau, SHOTS.fiche, SHOTS.validation, SHOTS.benefice,
];

function shotsFor(spec: DemoSpec): React.ReactNode[] {
  switch (spec.kind) {
    case "list": {
      const s = spec as ListSpec;
      return [
        <ListShot1 s={s} />, <ListShot2 s={s} />, <ListShot3 s={s} />, <ListShot4 s={s} />,
        <ListShot5 s={s} />, <ListShot6 s={s} />, <ListShot7 s={s} />,
      ];
    }
    case "assembly": {
      const s = spec as AssemblySpec;
      return [
        <AsmShot1 s={s} />, <AsmShot2 s={s} />, <AsmShot3 s={s} />, <AsmShot4 s={s} />,
        <AsmShot5 s={s} />, <AsmShot6 s={s} />, <AsmShot7 s={s} />,
      ];
    }
    case "quote": {
      const s = spec as QuoteSpec;
      return [
        <QuoteShot1 s={s} />, <QuoteShot2 s={s} />, <QuoteShot3 s={s} />, <QuoteShot4 s={s} />,
        <QuoteShot5 s={s} />, <QuoteShot6 s={s} />, <QuoteShot7 s={s} />,
      ];
    }
    case "schedule": {
      const s = spec as ScheduleSpec;
      return [
        <SchedShot1 s={s} />, <SchedShot2 s={s} />, <SchedShot3 s={s} />, <SchedShot4 s={s} />,
        <SchedShot5 s={s} />, <SchedShot6 s={s} />, <SchedShot7 s={s} />,
      ];
    }
  }
}

export const DemoGroup2: React.FC<{ spec: DemoSpec }> = ({ spec }) => {
  const shots = shotsFor(spec);
  return (
    <>
      {shots.map((node, i) => (
        <Sequence key={i} from={ORDER[i].from} durationInFrames={ORDER[i].dur}>
          <Scene duration={ORDER[i].dur} move={MOVES[i]}>
            {node}
          </Scene>
        </Sequence>
      ))}
      <Sequence from={ORDER[7].from} durationInFrames={ORDER[7].dur}>
        <Scene duration={ORDER[7].dur} move={MOVES[7]}>
          <CloseShot close={spec.close} benefit={spec.benefit} />
        </Scene>
      </Sequence>
    </>
  );
};
