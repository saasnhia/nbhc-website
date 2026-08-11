/* Le rognage telephone split-screen (planche c1_feature_01b) remplace la maquette
   codee (VlogyzMockup) — choisi par MESURE de lisibilite a la taille servie (texte
   porteur 20 px a 435, 14,7 px a 320 ; les candidats panneaux d'interface et grille
   b-roll tombent a 3-7 px) puis par JUGEMENT a l'aveugle : 3/3 au second tour,
   « la seule qui montre un resultat de montage au lieu de repeter la carte ».
   AFFICHAGE PLAFONNE A 320 px : portrait 0,585:1 — plein colonne il ferait
   1 458 px de haut a l'empilement. La colonne la plus etroite mesuree fait 342 px,
   donc la largeur servie est constante (320) et `sizes` est vrai par construction.
   Paliers 320/480/640 : densites 1, 1,5 et 2, aucun au-dessus du maitre (690). */
const PALIERS = [320, 480, 640];

export default function VlogyzDemo() {
  return (
    <img
      src="/produit-vlogyz-320.webp"
      srcSet={PALIERS.map((p) => `/produit-vlogyz-${p}.webp ${p}w`).join(", ")}
      sizes="320px"
      width={690}
      height={1180}
      alt="Vidéo verticale montée par Vlogyz : écran partagé vlogueur et b-roll, carton de titre stylisé, badge de mode de montage"
      loading="lazy"
      decoding="async"
      className="block h-auto w-full mx-auto"
      style={{
        maxWidth: 320,
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    />
  );
}
