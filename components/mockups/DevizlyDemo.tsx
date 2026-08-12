/* LE DEVIS 3D — gate 65 §0 : la capture rognee « devizly demo » est REFUSEE et
   remplacee par le rendu Blender de `scene_produit_devizly.py` (nbhc-broll),
   1164x1524 — le double exact du slot, donc la densite 2 est enfin couverte
   (l'ancienne limitation de source tombe, le palier 1164 existe).

   LA MISE EN SCENE EST CELLE DE LA REFERENCE « devizly demo » : l'objet central
   — le devis — et des etiquettes autour qui NOMMENT ses parties. Le rendu des
   etiquettes reprend TRAIT POUR TRAIT celui de SceneSecteur.tsx (lui-meme
   herite de Sectors.tsx, regles MESUREES) : ancres en fraction du cadre
   1164x1524, trait de rappel double (fond 7 px sous or 2,5 px) + jalon,
   alignement par bord sous x 0,30 / au-dela de 0,70, plaque rgba(9,9,11,0.82)
   qui tient 4,5:1 sur le papier clair, tout masque sous 560 px de fenetre.

   AFFICHAGE PLAFONNE A 582 px CSS (la largeur du slot) : les largeurs servies
   mesurees au navigateur sont min(colonne, 582) — 342 au viewport 390, 582
   partout ailleurs ; le palier 1164 sert ces memes largeurs en densite 2. */
"use client";

import { useTranslations } from "next-intl";

const PALIERS = [342, 582, 1164];

type EtiquetteDevis = {
  texte: string;
  x: number;
  y: number;
  cx: number;
  cy: number;
  largeurMax?: number;
  sousLeSocle?: boolean;
};

export default function DevizlyDemo() {
  const t = useTranslations("products");
  const etiquettes: EtiquetteDevis[] = [
    { texte: t("devizlyLabelDevis"), x: 0.05, y: 0.055, cx: 0.4105, cy: 0.1554, largeurMax: 0.4 },
    { texte: t("devizlyLabelLignes"), x: 0.95, y: 0.055, cx: 0.7526, cy: 0.2562, largeurMax: 0.4 },
    { texte: t("devizlyLabelSignature"), x: 0.06, y: 0.72, cx: 0.3105, cy: 0.6071, sousLeSocle: true, largeurMax: 0.3 },
    { texte: t("devizlyLabelEncaissement"), x: 0.28, y: 0.83, cx: 0.2526, cy: 0.6552, sousLeSocle: true, largeurMax: 0.3 },
  ];
  return (
    <div className="relative mx-auto" style={{ aspectRatio: "1164 / 1524", maxWidth: 582 }}>
      <img
        src="/produit-devizly-582.webp"
        srcSet={PALIERS.map((p) => `/produit-devizly-${p}.webp ${p}w`).join(", ")}
        sizes="(max-width: 630px) calc(100vw - 48px), 582px"
        width={582}
        height={762}
        alt={t("devizlySceneAlt")}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full"
        style={{
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 1164 1524"
        className="pointer-events-none absolute inset-0 h-full w-full max-[560px]:hidden"
      >
        {etiquettes.map((e) => (
          <g key={e.texte}>
            <line
              x1={e.x * 1164} y1={e.y * 1524}
              x2={e.cx * 1164} y2={e.cy * 1524}
              stroke="var(--bg)" strokeWidth={7} strokeLinecap="round"
            />
            <line
              x1={e.x * 1164} y1={e.y * 1524}
              x2={e.cx * 1164} y2={e.cy * 1524}
              stroke="var(--gold)" strokeWidth={2.5} strokeLinecap="round"
            />
            <circle cx={e.cx * 1164} cy={e.cy * 1524} r={9}
                    fill="var(--gold)" stroke="var(--bg)" strokeWidth={4} />
          </g>
        ))}
      </svg>
      {etiquettes.map((e) => (
        <span
          key={e.texte}
          data-secteur-etiquette
          className="pointer-events-none absolute text-[11px] font-medium uppercase text-center
                     max-[560px]:hidden"
          style={{
            ...(e.x > 0.7 ? { right: `${(1 - e.x) * 100}%` } : { left: `${e.x * 100}%` }),
            top: `${e.y * 100}%`,
            transform: e.sousLeSocle
              ? "translate(0, 0)"
              : e.x < 0.3 || e.x > 0.7 ? "translate(0, -100%)" : "translate(-50%, -100%)",
            color: "var(--text)",
            letterSpacing: 2,
            lineHeight: 1.35,
            maxWidth: e.largeurMax ? `${e.largeurMax * 100}%` : "35%",
            background: "rgba(9, 9, 11, 0.82)",
            padding: "3px 7px",
            borderRadius: "var(--radius-sm, 4px)",
          }}
        >
          {e.texte}
        </span>
      ))}
    </div>
  );
}
