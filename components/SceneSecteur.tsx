/* Une scene 3D de page secteur dans le slot `customFlow` de SectorPageContent.
 *
 * LE RENDU DES ETIQUETTES EST CELUI DE Sectors.tsx, REPRIS TRAIT POUR TRAIT — les
 * regles y sont MESUREES, pas decoratives, et les reprendre a l'identique est ce
 * qui permet de ne pas les re-mesurer ici :
 *  - ancres en FRACTION du cadre 1480x925 (aucune valeur en pixels : l'etiquette
 *    suit l'image a toutes les largeurs) ;
 *  - trait de rappel DOUBLE (fond de page 7 px sous or 2,5 px) + jalon cercle,
 *    parce qu'il traverse le fond sombre PUIS le plateau clair ;
 *  - alignement par bord sous x 0,30 et au-dela de 0,70, centre entre les deux —
 *    une etiquette centree deborde des que sa demi-largeur excede la distance de
 *    l'ancre au bord (mesure : 15,3 px de depassement a 1440 sur l'accueil) ;
 *  - `maxWidth` 35 % et plaque `rgba(9,9,11,0.82)` — l'opacite est calculee pour
 *    tenir 4,5:1 sur le fond le plus clair rencontre (papier a L = 0,832), la
 *    plaque est invisible sur le ciel a rgb(9,9,11) ;
 *  - tout est masque sous 560 px de fenetre, comme sur l'accueil.
 *
 * Les largeurs du `sizes` reproduisent SIX MESURES au navigateur sur la page
 * servie (2026-08-11) : 1920/1280 -> 471, 1024 -> 423, 901 -> 770, 768 -> 638,
 * 640 -> 550, 390 -> 300. Elles declarent, elles ne servent a mesurer nulle part.
 */

export type EtiquetteScene = {
  texte: string;
  x: number;
  y: number;
  cx?: number;
  cy?: number;
  /* Plafond de largeur propre a UNE etiquette (fraction, ex. 0.30) quand la
     valeur commune de 35 % ferait entrer sa boite en collision avec une
     voisine — la collision se MESURE au navigateur avant de poser ce champ. */
  largeurMax?: number;
  /* Etiquette posee SOUS son point d'ancrage (zone sombre sous le socle) :
     la boite s'accroche par le HAUT (translate -50%, 0), sinon le trait de
     rappel — qui part de (x, y) vers le haut — traverserait sa propre boite. */
  sousLeSocle?: boolean;
};

const PALIERS_SECTEUR = [300, 471, 638, 880, 1100, 1480];

export default function SceneSecteur({
  fichier,
  alt,
  etiquettes,
}: {
  fichier: string;
  alt: string;
  etiquettes: EtiquetteScene[];
}) {
  return (
    <div className="relative" style={{ aspectRatio: "1480 / 925" }}>
      <img
        src={`/${fichier}-471.webp`}
        srcSet={PALIERS_SECTEUR.map((p) => `/${fichier}-${p}.webp ${p}w`).join(", ")}
        sizes="(min-width: 1120px) 471px, (min-width: 1024px) calc((100vw - 178px) / 2), (min-width: 701px) calc(100vw - 130px), calc(100vw - 90px)"
        width={1480}
        height={925}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full h-auto"
        style={{ borderRadius: "var(--radius)" }}
      />
      {etiquettes.some((e) => e.cx !== undefined) && (
        <svg
          aria-hidden
          viewBox="0 0 1480 925"
          className="pointer-events-none absolute inset-0 h-full w-full max-[560px]:hidden"
        >
          {etiquettes.map((e) =>
            e.cx === undefined || e.cy === undefined ? null : (
              <g key={e.texte}>
                <line
                  x1={e.x * 1480} y1={e.y * 925}
                  x2={e.cx * 1480} y2={e.cy * 925}
                  stroke="var(--bg)" strokeWidth={7} strokeLinecap="round"
                />
                <line
                  x1={e.x * 1480} y1={e.y * 925}
                  x2={e.cx * 1480} y2={e.cy * 925}
                  stroke="var(--gold)" strokeWidth={2.5} strokeLinecap="round"
                />
                <circle cx={e.cx * 1480} cy={e.cy * 925} r={9}
                        fill="var(--gold)" stroke="var(--bg)" strokeWidth={4} />
              </g>
            ),
          )}
        </svg>
      )}
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
              ? "translate(-50%, 0)"
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
