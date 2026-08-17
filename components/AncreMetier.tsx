import Image from "next/image";

/* L'ANCRE DE METIER — l'objet muet qui dit le metier, a cote de la scene.
 *
 * POURQUOI CE COMPOSANT EXISTE, ET POURQUOI IL EST PLAT (gate 85/86).
 * L'ancre 3D — trois primitives lissees censees faire un casque de chantier —
 * a echoue HUIT lectures sur HUIT, dont trois a 512 px, seule, centree, sur le
 * fond de charte : « un chapeau », « un borsalino », « seul et blanc, cet
 * objet ne designe personne ». La taille n'y etait pour rien : la loi ecrite
 * au protocole dit que DES PRIMITIVES NE NOMMENT PAS UN METIER, quelle que
 * soit leur taille.
 *
 * Le dessin servi ici est celui qui a ete lu « macon », SUR, par les trois
 * juges du gate 85 — repris SANS RETOUCHE, seul le rectangle de fond opaque a
 * ete retire (la page porte deja #09090b). Il obeit a la seconde loi : LE
 * MATERIAU ET LE GESTE NOMMENT, L'OUTIL SEUL NE SUFFIT PAS. Le mur de briques
 * porte le metier ; la truelle le precise ; et la brique posee DE TRAVERS —
 * relevee spontanement par les trois juges — fait basculer « mur fini » vers
 * « en train de maconner ».
 *
 * SON ROLE N'EST PAS CELUI DE LA SCENE-DOCUMENT. Le document EST le sujet : il
 * reproduit un artefact reel champ par champ. L'ancre ne fait que NOMMER. Deux
 * roles, deux registres, meme palette — et c'est pourquoi elle est bornee en
 * largeur : une ancre qui dominerait le document inverserait les deux roles.
 *
 * `aria-hidden` : elle ne dit rien qu'un lecteur d'ecran doive entendre. Le
 * metier est deja nomme en toutes lettres par le titre du bloc et par le
 * fil d'ariane ; annoncer « illustration d'un mur de briques » ajouterait du
 * bruit, pas de l'information. C'est une image DECORATIVE au sens strict.
 */
export default function AncreMetier({
  fichier,
  /** Plafond de largeur en px CSS. La subordination est MESUREE, pas choisie :
   *  l'ancre doit rester tres au-dessous de l'aire de la scene qu'elle
   *  accompagne (mesurer_ancre_metier.js). */
  largeurMax = 104,
}: {
  fichier: string;
  largeurMax?: number;
}) {
  return (
    <div
      /* data-ancre : c'est par la que l'instrument la retrouve dans la page
         servie, sans dependre d'une classe de mise en page qui peut bouger. */
      data-ancre={fichier}
      aria-hidden
      style={{ width: largeurMax, maxWidth: "34%", flex: "0 0 auto" }}
    >
      <Image
        src={`/${fichier}.svg`}
        alt=""
        width={512}
        height={512}
        style={{ width: "100%", height: "auto", display: "block", opacity: 0.92 }}
      />
    </div>
  );
}
