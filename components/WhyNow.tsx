"use client";

/**
 * WHYNOW — UN PANNEAU PAR IDEE, TROIS PANNEAUX.
 *
 * Le reproche auquel cette version repond : « beaucoup trop d'ecriture », et
 * « une info = un rendu 3D qui illustre ». La densite a ete mesuree avant d'etre
 * corrigee : 118 mots dans la section contre une mediane de 28 par panneau sur la
 * reference, soit 4,2 fois, et 59 % de ce poids dans les trois puces. La copie
 * condensee de l'etape A ramene la section a 79 mots, soit -33 %.
 *
 * ── COUCHE 1, L'ANATOMIE ────────────────────────────────────────────────────
 * Reperes mesures sur la reference, ramenes a notre largeur utile de 1 120 px :
 *
 *   rapport titre / chapo   2,53   (ascendante du titre 38 px, capitale du chapo 15)
 *   colonne de texte         358 px = 32 % de 1 120
 *   gouttiere                116 px  (les 114 px de la reference, normalises)
 *   vide de fin              276 px = 24,6 %, le vide que la reference laisse
 *
 * OU LE RAPPORT 2,53 TIENT. Le h2 plafonne a 52 px a 1 300 px de viewport et le
 * chapo a 20,5 px a 1 171 : au-dela de 1 300 le rapport vaut 2,54. En dessous il
 * se comprime, et c'est arithmetique — a 375 px le h2 est borne a 28 px par son
 * propre clamp, et un chapo a 11 px serait illisible. Plancher du chapo a 15 px,
 * soit 1,87.
 *
 * CE QUI N'EST PAS MESURE, ET QUI EST DONC UN CHOIX ASSUME : la taille des titres
 * de panneau et l'espacement entre panneaux. Je n'ai aucun titre de panneau ni
 * aucun interligne de panneau mesure sur la reference — ses captures montrent des
 * panneaux isoles, pas leur enchainement. Le titre de panneau est place entre le h2
 * et le corps ; l'ecart entre panneaux vaut 96 px, la meme famille de valeur que
 * les 64 px qui separent un texte de son illustration.
 *
 * ── COUCHE 2, LES TROIS ILLUSTRATIONS ───────────────────────────────────────
 * Rendus Cycles hors ligne, PNG opaque sur #09090b converti en WebP — voir
 * nbhc-broll/rendu-3d/. Camera, lumieres et materiaux viennent d'un module unique
 * jamais modifie : la coherence est garantie par construction et mesuree (la pente
 * du lisere dore s'etend sur 0,315 deg entre les cinq images).
 *
 * PANNEAU 1 EN PLEINE LARGEUR, ET C'EST L'EXCEPTION. Son argument est un COMPTAGE
 * — onze feuilles, puis trois, puis une — et l'epaisseur apparente d'une feuille
 * vaut 6,7 px a 1 120 px de large. A 370 px de colonne elle tomberait a 2,2 px, or
 * le seuil de denombrabilite mesure a l'oeil se situe entre 5,4 et 4,9 px. La
 * proportion de la reference detruirait donc exactement ce qui fait sa force.
 *
 * PANNEAUX 2 ET 3 : TEXTE A GAUCHE, ILLUSTRATION A DROITE, LES DEUX. On n'alterne
 * pas : la reference ne le fait jamais, tous ses panneaux ont le texte a gauche, et
 * le panneau 1 apporte deja la variation en pleine largeur.
 *
 * ── L'EMPLACEMENT FAIT 590 px ET NON 370, ET C'EST UN SEUIL MESURE ───────────
 * A 370 px, mesure sur la page, l'argument de ces deux illustrations ne se lisait
 * PAS dans un balayage : elles servaient d'ancrage visuel et c'etait le titre qui
 * portait l'idee. Or la demande est « une info = un rendu 3D qui illustre ».
 *
 * Le seuil a donc ete mesure comme celui de denombrabilite l'avait ete : cinq
 * candidats fabriques a la taille reelle par reduction Lanczos des maitres livres —
 * 370, 450, 520, 590, 646 — et juges a l'oeil, sans agrandissement qui aiderait
 * l'oeil. Resultat, identique pour les deux panneaux : l'argument passe a partir de
 * 520. Sous 520, la fente du panneau 2 lit comme une rayure doree decorative et les
 * deux socles separes du panneau 3 doivent etre CHERCHES.
 *
 * 590 est retenu, un cran au-dessus du seuil : un seuil pris a sa valeur exacte
 * n'a aucune marge, et il retombe sous la limite des que le navigateur applique un
 * facteur de zoom ou qu'un ecran rend moins bien.
 *
 * POURQUOI NE PAS AVOIR SUIVI LES 33 % DE LA REFERENCE. Ses illustrations tiennent
 * a cette proportion parce que ce sont des scenes larges a gros objets ; les notres
 * portent des relations plus fines — une fente, deux socles separes. Copier sa
 * proportion sans verifier que ce qu'elle abrite est lisible, c'est copier la forme
 * sans la fonction. Le panneau 1 avait deja tranche exactement ce point en exigeant
 * la pleine largeur pour son comptage.
 *
 * VIDE DE FIN : 1 120 - 358 - 116 - 590 = 56 px, soit 5 % au lieu des 24,6 % de la
 * reference. Il reste un vide, l'illustration ne va pas bord a bord.
 *
 * L'INDENOMBRABILITE DE L'AMAS TIENT A CETTE LARGEUR, et c'est verifie et non
 * suppose : le masque du papier forme UNE SEULE tache portant 82,9 % de sa surface,
 * et cette valeur est invariante de 370 a 646 px — la fusion des blocs vient de
 * leur contact en 3D, pas de la resolution. Aucune largeur ne les separe.
 *
 * L'ECART DE HAUTEUR ENTRE LES DEUX N'EST PAS COMPENSE, ET C'EST UNE DECISION.
 * A 590 px le panneau 2 fait 369 px de haut et le panneau 3 en fait 252 : 117 px
 * d'ecart. Les deux panneaux ne sont JAMAIS cote a cote — ils sont empiles, chacun
 * dans sa propre ligne, texte et image alignes par le haut, et le rythme vertical
 * est porte par un ecart constant de 96 px. Un ecart de hauteur entre deux lignes
 * successives ne produit donc aucun desalignement. Egaliser les hauteurs voudrait
 * dire ajouter 117 px de vide dans le panneau 3 : exactement ce que le client
 * cherche a retirer ailleurs sur la page.
 *
 * CE QUI ETAIT REELLEMENT A CORRIGER, ET QUI L'A ETE DANS L'ASSET. Le panneau 3
 * portait 175 px de degagement au-dessus de son sujet contre 114 px pour le panneau
 * 2 (mesure sur les maitres a 1 480 px). Comme le texte et l'image sont alignes par
 * le haut, sa premiere ligne de texte demarrait 15 px plus haut que celle du
 * panneau 2 PAR RAPPORT A SON SUJET : un desalignement optique reel entre deux
 * panneaux consecutifs. Le maitre du panneau 3 est donc recadre a 114 px de
 * degagement en haut comme en bas. Le recadrage ne retire que du fond.
 *
 * CLS. Les trois illustrations portent width et height intrinseques, donc le
 * navigateur reserve leur boite avant le chargement. C'est le critere qui casse le
 * plus facilement sur des images de cette taille.
 *
 * ── LES PALIERS SERVIS, DERIVES DES EMPLACEMENTS REELS ───────────────────────
 * Ce que le navigateur demande, emplacement x densite :
 *
 *   >= 900 px de viewport   590 (d1)   1 180 (d2)      panneaux 2 et 3
 *   768                     728        1 456
 *   480                     440          880
 *   375                     335          670
 *
 * Quatre paliers pour les panneaux 2 et 3 : 370, 590, 740, 1 180. Aucune largeur ne
 * prend plus de 1,34 fois les pixels utiles. Le cas 768 en densite 2 (1 456 px)
 * n'est pas servi et prend 1 180 : il faudrait un palier de 1 480 pour 5 Ko de plus,
 * et c'est un cas de tablette rare. C'est dit, pas cache.
 *
 * LE PANNEAU 1 A RECU UN PALIER DE 400 px, et c'etait un defaut mesure au reseau :
 * a 375 en densite 1 son emplacement fait 335 px et le plus petit fichier etait
 * bureau-760, soit 2,3 fois les pixels utiles pour 10,7 Ko. Le palier de 400 ramene
 * le rapport a 1,19 et le poids a 5,1 Ko. Le maitre n'est pas retouche.
 */

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Reperes de la reference, ramenes a notre largeur utile de 1 120 px.
const COLONNE = 358;
const GOUTTIERE = 116;
// 590 et non 370 : seuil de balayage mesure, voir l'entete. 1 120 - 358 - 116 - 590
// laisse 56 px de vide de fin.
const LARGEUR_ILLUSTRATION = 590;

/**
 * SEUIL DU COTE A COTE, CALCULE ET NON CHOISI — ET IL CORRIGE UN DEBORDEMENT QUE
 * L'AGRANDISSEMENT AVAIT INTRODUIT.
 *
 * La rangee « texte a gauche, image a droite » demande COLONNE + GOUTTIERE +
 * LARGEUR_ILLUSTRATION = 358 + 116 + 590 = 1 064 px de contenu. La section porte
 * px-10, soit 80 px de marge interne totale, donc il lui faut 1 144 px de viewport.
 *
 * Le passage en colonne etait cable a 900 px, ce qui suffisait pour une image de
 * 370 (358 + 116 + 370 = 844). A 590 il ne suffit plus : mesure au viewport de
 * 1 024, la page debordait de 80 px horizontalement. Le seuil est donc porte a
 * 1 145, la premiere valeur ou 1 064 px de contenu tiennent.
 *
 * En dessous, la disposition empile et l'illustration prend toute la largeur utile
 * — 944 px a 1 024, soit PLUS que 590. La degradation ne coute donc rien en
 * lisibilite : elle en gagne.
 */
const SEUIL_COTE_A_COTE = 1145;

// Les deux illustrations laterales, avec les dimensions intrinseques de leur
// maitre : c'est ce couple qui reserve la boite et met le CLS a zero.
/**
 * ETIQUETTES DU PANNEAU 3, SUR ANCRES SORTIES PAR LA SCENE.
 *
 * POURQUOI DANS LE DOM ET PAS DANS LE RENDU. Composer le texte dans Blender
 * demanderait deux rendus par locale, une typographie etrangere aux fontes du
 * site, et rendrait le contraste non mesurable par nos instruments. Ici : un seul
 * rendu, deux locales gratuites, les fontes du site, du texte selectionnable, et
 * le contraste mesure par contraste_calque.js comme n'importe quel autre texte.
 *
 * LES ANCRES NE SONT PAS RELEVEES A LA MAIN. scene_concurrents.py les ecrit dans
 * caisses.ancres.json APRES st.ecrire(), par projection des coordonnees monde qui
 * ont PLACE les caisses. Verifie : l'ajout de cette sortie laisse le rendu a
 * 116 et 118 pixels d'ecart sur 1 530 320, ecart maximal 1 — donc SOUS le
 * plancher de reproductibilite du GPU, mesure a 124 pixels entre deux rendus du
 * script inchange.
 *
 * ET ELLES CORRIGENT MON ESTIMATION. J'avais propose y = 0,1968 et 0,5014 en
 * supposant la caisse haute de 0,35 a 0,52 ; elle fait 0,46, et la scene rend
 * 0,1761 et 0,4807. C'est exactement pourquoi c'est la scene qui les sort.
 *
 * Controles portes par le JSON : norme de l'axe vertical = 1,0 ; symetrie en x
 * (0,2552 + 0,7448 = 1,0000) ; ecart vertical 0,3045 contre 0,3030 x l'ecart en
 * x predit par la docstring de la scene.
 */
/**
 * Un jeu d'etiquettes par panneau lateral, dans l'ordre de LATERALES : panneau 2
 * (outils) puis panneau 3 (caisses). Toutes les ancres sortent des scenes, dans
 * <nom>.ancres.json, ecrit APRES st.ecrire().
 *
 * LA PLAQUE EST DECIDEE PAR PANNEAU, ET MESUREE A CHAQUE FOIS. Elle coute en
 * proprete visuelle, donc on ne la pose que la ou le fond l'impose. 95e centile
 * du fond dans la boite d'etiquette, contraste avec #F0EDE6 :
 *
 *   panneau 2, amas      16,92:1   -> aucune plaque
 *   panneau 2, fente     16,92:1   -> aucune plaque
 *   panneau 3, les deux   0,86:1 et 0,90:1  -> plaque indispensable
 *
 * La difference n'est pas un hasard : sur les caisses, le dessus du socle eclaire
 * occupe tout l'espace au-dessus des deux sujets, et la seule bande sombre
 * commune est y <= 0,125, trop loin des objets. Sur outils, il suffit de monter
 * l'ancre — de 0,30 unite au-dessus de l'amas, 0,46 au-dessus de la plaque
 * fendue — pour retomber sur du fond de page. C'est le plus PETIT decalage qui
 * donne du fond de page dans les deux cas : l'etiquette est aussi pres de son
 * objet que la lumiere le permet.
 *
 * ── LE `alt` DU PANNEAU 2 A DECRIT PENDANT DIX PORTES UNE GEOMETRIE INEXISTANTE ─
 *
 * Il disait « une plaque fendue d'une longue rainure bordee d'or ; deux blocs
 * reposent en travers de la fente SANS Y ENTRER ». `rendu-3d/scene_outils.py`
 * construisait DEUX BOITES PLEINES posees a 0,145 l'une de l'autre, dont le jour
 * descendait jusqu'au socle : balayage de 200 tranches en x, **0** portait de la
 * matiere d'un bord du jour a l'autre. Il n'y avait pas de plaque a fendre.
 *
 * ET CE `alt` NE VIT PAS DANS CE FICHIER, ce qui est la raison pour laquelle il a
 * survecu aux relectures de ce fichier : il est en `messages/fr.json` et
 * `messages/en.json`, clef `whyNow.panel2Alt`, et n'arrive ici que par
 * `panneaux[i].alt`. Chercher « fendue » dans `WhyNow.tsx` ne le trouvait pas.
 *
 * DEUX CORRECTIONS, ET LA SECONDE N'EST PAS UNE CORRECTION DE GEOMETRIE :
 *   1. la scene rend desormais la plaque CONTINUE (`plaque_bout_0` /
 *      `plaque_bout_1` ferment le jour aux deux bouts ; 40 tranches sur 200
 *      portent de la matiere au niveau du dessus). « Plaque » est devenu vrai.
 *   2. « SANS Y ENTRER » est retire. Ce n'est pas une description, c'est une these,
 *      et elle vaut **1,6 px** de porte-a-faux a 335 px : elle a ete vue par
 *      **0 lecteur sur 12** au test a l'aveugle. Le `alt` dit maintenant ce que la
 *      geometrie porte — les blocs sont « plus larges qu'elle », 0,17 contre
 *      0,145 — et laisse la these au TEXTE de la page, qui est ce qui la porte.
 * Le mot « fendue » plus haut dans ce commentaire, lui, decrit desormais la
 * geometrie reelle et reste donc en place.
 */
const ETIQUETTES_LATERALES = [
  [
    { cle: "panel2LabelOutils", x: 0.2866, y: 0.3507 },
    { cle: "panel2LabelMetier", x: 0.6745, y: 0.1198 },
  ],
  [
    { cle: "panel3LabelVous", x: 0.2552, y: 0.4807 },
    { cle: "panel3LabelAutres", x: 0.7448, y: 0.1761 },
  ],
] as const;

/** Mesure, panneau par panneau. Voir le commentaire ci-dessus. */
const PLAQUE_LATERALE = [false, true] as const;

/**
 * Panneau 1. Ancre sortie par scene_bureau_gradient.py, EXPRIMEE DANS LE CADRE
 * LIVRE : ce maitre est le seul des trois a etre recadre — rendu 2 240 x 1 400,
 * livre 2 240 x 1 087, 313 px retires EN HAUT (recalage des deux images, erreur
 * moyenne 0,0000). Sans cette correction l'ancre serait decalee de 313/1087 =
 * 0,288 de hauteur. La sonde asymetrique de la scene la valide : a la hauteur du
 * sommet de la pile de onze feuilles, cette station rend Y = 199,3 et la station
 * a une seule feuille Y = 9,1 — un recadrage mal compte casserait les deux.
 */
/**
 * ANCRE MESUREE SUR LE VRAI PIRE CAS, et l'ancienne etait cassee deux fois.
 *
 * (0,548 ; 0,1233) faisait sortir le bord haut de la boite DU CADRE pour toute largeur
 * d'affichage <= 521 px — jusqu'a -274 px en unites du maitre — et son emprise
 * recouvrait 7,64 a 9,16 % de pixels non-fond. Elle devait meme son bon score de
 * recouvrement au fait qu'une partie de sa boite etait hors cadre, donc non comptee :
 * corriger le seul debordement vertical en gardant x = 0,548 portait le recouvrement
 * a 56-58 %. Les deux defauts etaient ANTAGONISTES.
 *
 * ── DEUX AFFIRMATIONS DE CE COMMENTAIRE ETAIENT FAUSSES, ET ELLES SONT RETIREES ──
 *
 * CE QUI ETAIT ECRIT ICI : « 0 pixel non-fond sur les treize combinaisons palier x
 * largeur d'affichage livrees, contraste 17,02:1 contre la plaque a 0,78 ». Les deux
 * moities sont fausses, et la premiere l'est deux fois.
 *
 *   1. « TREIZE COMBINAISONS » N'A AUCUNE SOURCE. L'instrument qui mesure cette ancre
 *      — nbhc-broll/airbnb-demo/ancre_whynow_bureau.js — parcourt 19 couples
 *      largeur x densite dans DEUX locales, soit 38 mesures, et il compte lui-meme
 *      les combinaisons palier x largeur d'affichage DISTINCTES : il en imprime 30.
 *      Le nombre treize ne sort d'aucune execution.
 *   2. « 0 PIXEL NON-FOND » ETAIT FAUX SUR L'IMAGE QUI ETAIT SERVIE, et il ne l'est
 *      plus depuis que la page sert le rendu de la scene. Les deux etats sont plus
 *      bas : le chiffre n'a jamais decrit une ancre, il decrivait une IMAGE.
 *   3. « CONTRASTE 17,02:1 CONTRE LA PLAQUE A 0,78 » est la seule moitie qui se
 *      verifie : l'instrument LIT la plaque dans le DOM au lieu de la recopier, il y
 *      lit rgba(9, 9, 11, 0.78), et il rend 17,02:1 aux 38 mesures. Ce chiffre-la
 *      n'est pas retire. Il etait cependant faux AVANT la correction de l'asset, ou
 *      le pire cas tombait a 9,71:1 : il decrivait, lui aussi, une autre image.
 *
 * MESURE, 38 mesures / 30 combinaisons palier x affichage distinctes, DEUX locales,
 * sur la page servie a localhost — et il faut deux tableaux, parce que le defaut
 * n'etait pas dans cette ancre :
 *
 *   AVANT, avec l'asset qui etait livre (whynow-bureau-*.webp derives d'un vieux
 *   rendu C3, cadrage different) :
 *     boite dans le cadre         38 / 38
 *     contraste >= 4,5:1          38 / 38, pire cas 9,71:1
 *     zero pixel non-fond         15 / 38  ->  23 ECHECS, jusqu'a 2 695 px non-fond,
 *                                 propre seulement a partir de 944 px d'affichage en
 *                                 `fr` et 1 120 px en `en`
 *
 *   APRES, avec l'asset re-derive du rendu de la scene (nbhc-broll/rendu-3d/
 *   exporter_panneaux.py, panneau 1) — MEME ancre, meme boite, meme plaque :
 *     boite dans le cadre         38 / 38   (pire bord 14,0 px, en `en` a 521 px)
 *     contraste >= 4,5:1          38 / 38   17,02:1 aux 38, pire fond vu rgb(9,9,11)
 *     zero pixel non-fond         38 / 38   0 px non-fond partout, ecart au fond 0
 *   154 / 154 controles, code de sortie 0, les deux falsifications de l'instrument
 *   mordent (90,5 % de non-fond quand on pose l'etiquette a 62 % ; -34,7 px de bord
 *   quand on la pousse a left 99 %).
 *
 * CE QUE CELA APPREND, ET C'EST LA VRAIE LECON DU LOT : les 23 echecs n'etaient PAS
 * un defaut d'ancre. L'ancre n'a pas bouge d'un centieme. Ils venaient de ce que la
 * page servait une image que la scene n'avait pas produite — un cadrage ou des objets
 * occupaient la bande que l'ancre suppose vide. Chercher une meilleure ancre aurait
 * ete corriger le symptome sur le mauvais objet, une fois de plus.
 *
 * CE QUI RESTE VRAI DU DIAGNOSTIC : `text-[11px]` est bien une taille fixe, donc la
 * boite grandit en FRACTION DE CADRE quand l'image rapetisse — 221x21 px a toutes les
 * largeurs en `fr`, et 229x36 px sur DEUX lignes en `en` sous 560 px d'affichage.
 * C'est pour ce cas-la, et pour le cas a trois lignes qu'il n'y a plus lieu de servir,
 * que le masquage sous 560 px reste en place.
 */
const ETIQUETTE_BUREAU = { x: 0.29, y: 0.1965 } as const;

/**
 * POURQUOI LES DEUX ETIQUETTES PORTENT UNE PLAQUE SEMI-OPAQUE.
 *
 * Mesure du fond sous chaque etiquette, 95e centile de luminance dans sa boite
 * exacte, sur le maitre a 1 480 px : rgb(255,255,255) au-dessus de la caisse
 * OUVERTE et rgb(255,250,227) au-dessus de la CLOSE. Soit 0,86:1 et 0,90:1 sans
 * plaque — le texte y est litteralement invisible.
 *
 * La cause est geometrique et non corrigeable par un deplacement : le DESSUS DU
 * SOCLE, eclaire, occupe l'espace au-dessus des deux caisses, et la seule bande
 * sombre commune aux deux boites est y <= 0,125, soit le bandeau du haut, trop
 * loin des objets.
 *
 * OPACITE, CALCULEE PUIS VERIFIEE. Pour tenir 4,5:1 avec #F0EDE6 (L = 0,835) il
 * faut un fond de luminance relative <= 0,885/4,5 - 0,05 = 0,1467, soit 107,5 en
 * sRGB. Sur le pire fond (255), une plaque de couleur 9 a l'opacite a donne
 * 255(1-a) + 9a <= 107,5, donc a >= 0,60. On prend 0,78, ce qui ramene le pire
 * cas a 63 et donne 8,7:1 en calcul — mesure sur la page : 12,55:1 a 1 440 px et
 * 9,70:1 a 375, la plaque faisant mieux que le calcul parce que le pire pixel ne
 * couvre pas toute la boite.
 */
const VOILE_ETIQUETTE = 0.78;

const LATERALES = [
  { fichier: "whynow-outils", largeur: 1480, hauteur: 925 },   // 369 px a 590
  // SECONDE VERSION DU PANNEAU 3. La premiere montrait deux postes de travail et
  // elle RIMAIT avec le panneau 1 sur la page : on n'y lisait pas deux bureaux, on
  // lisait le bureau du panneau 1 deux fois. L'agrandissement a 590 px n'a pas
  // resolu la rime, il l'a aggravee — il a rendu lisible l'identite du mobilier en
  // meme temps que la separation des socles. Celle-ci n'emprunte aucun objet ni au
  // panneau 1 ni au panneau 2 : deux caisses, l'une close, l'autre ouverte avec de
  // l'or dedans.
  { fichier: "whynow-caisses", largeur: 1480, hauteur: 1034 }, // 412 px a 590
] as const;
const PALIERS_LATERAUX = [370, 590, 740, 1180] as const;

type Panneau = {
  titre: string;
  texte: string;
  alt: string;
};

function TitrePanneau({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="font-bold m-0"
      style={{
        fontFamily: "var(--font-syne)",
        // PLAFOND A 24 px ET NON 26, ET C'EST UNE MESURE. A 26 px, le titre du
        // panneau 3 — « Vos concurrents s'y mettent », 27 caracteres — ne tenait pas
        // dans la colonne de 358 px et passait sur deux lignes alors que les deux
        // autres tenaient sur une. Un titre sur deux lignes au milieu de trois
        // panneaux casse le rythme. A 24 px les trois tiennent sur une ligne,
        // verifie au navigateur, et le rapport au h2 passe de 2,00 a 2,17.
        fontSize: "clamp(19px, 2.1vw, 24px)",
        letterSpacing: "-0.5px",
        lineHeight: 1.2,
        color: "var(--text)",
        marginBottom: 10,
      }}
    >
      {children}
    </h3>
  );
}

function TextePanneau({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-light m-0"
      style={{ fontSize: 16, lineHeight: 1.6, color: "var(--text-muted)" }}
    >
      {children}
    </p>
  );
}

export default function WhyNow() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduit = usePrefersReducedMotion();
  const t = useTranslations("whyNow");

  const panneaux: Panneau[] = [
    { titre: t("panel1Title"), texte: t("panel1Text"), alt: t("panel1Alt") },
    { titre: t("panel2Title"), texte: t("panel2Text"), alt: t("panel2Alt") },
    { titre: t("panel3Title"), texte: t("panel3Text"), alt: t("panel3Alt") },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-whynow-item]");
    // MOUVEMENT REDUIT : L'ETAT FINAL, PAS L'ABSENCE DE TWEEN.
    // Le `gsap.set` ci-dessous pose opacity 0 ; se contenter de ne pas creer le
    // declencheur laisserait la section INVISIBLE. On pose donc l'arrivee.
    if (reduit) {
      gsap.set(items, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }
    gsap.set(items, { opacity: 0, y: 30 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          clearProps: "transform",
        });
      },
    });
    return () => st.kill();
  }, [reduit]);

  return (
    <section
      id="pourquoi-maintenant"
      ref={sectionRef}
      className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      <div
        className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
        style={{ color: "var(--gold)" }}
      >
        <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
        {t("eyebrow")}
      </div>
      <h2
        className="font-bold leading-tight mb-6"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 52px)",
          letterSpacing: "-1.5px",
          color: "var(--text)",
          maxWidth: 900,
        }}
      >
        {t("title")}
      </h2>
      <p
        data-whynow-item
        className="font-light max-[900px]:!w-full m-0"
        style={{
          width: COLONNE,
          color: "var(--text-muted)",
          fontSize: "clamp(15px, 1.75vw, 20.5px)",
          lineHeight: 1.62,
        }}
      >
        {t("subtitle")}
      </p>

      {/* PANNEAU 1 — texte au-dessus, illustration en pleine largeur.
          L'exception, et elle est justifiee par le seuil de denombrabilite. */}
      <article data-whynow-item style={{ marginTop: 96 }}>
        <div className="max-[900px]:!w-full" style={{ width: COLONNE }}>
          <TitrePanneau>{panneaux[0].titre}</TitrePanneau>
          <TextePanneau>{panneaux[0].texte}</TextePanneau>
        </div>
        {/* Le conteneur porte la marge et la position ; l'image passe en w-full.
            La boite est donc inchangee. */}
        <div className="relative" style={{ marginTop: 40 }}>
          <img
            src="/whynow-bureau-1120.webp"
            srcSet="/whynow-bureau-400.webp 400w, /whynow-bureau-760.webp 760w, /whynow-bureau-1120.webp 1120w, /whynow-bureau-2240.webp 2240w"
            sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 80px), 1120px"
            width={2240}
            height={1087}
            alt={panneaux[0].alt}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto"
          />
          {/* UNE SEULE ETIQUETTE, DE GROUPE, et c'est un arbitrage et non une
              economie. Mapper « devis », « relances » et « reporting » sur trois
              piles de HAUTEURS DIFFERENTES affirmerait un classement — que les
              devis coutent plus que les relances — que panel1Text n'enonce pas :
              il les enumere sans les ordonner. Une etiquette de groupe nomme
              sans classer.

              PLAQUE NECESSAIRE ICI, et pour une raison propre a ce maitre : il
              est le seul des trois a etre RECADRE, de 313 px en haut, ce qui a
              precisement retire l'air au-dessus du sujet. Balayage du decalage :
              0,34 -> 0,90:1 (plaque), 0,50 -> 17,02:1 sans plaque mais l'ancre
              tombe alors a 0,0576 de hauteur, soit 4 px du bord haut au palier
              de 400 px. Un libelle a 4 px du bord n'est pas une mise en page,
              c'est un ecretage en attente. On garde 0,34 et la plaque. */}
          {/* ── MASQUEE SOUS 560 px, SUR LE MODELE DE Sectors.tsx ──────────────────
              LA MESURE FERME TOUTE AUTRE ISSUE. La boite est centree sur l'ancre et
              son plafond de largeur vaut min(44 % ; 100 % - x) — donc `maxWidth: 44 %`
              n'est PAS la contrainte, et le porter a 52, 60, 68, 76 ou 88 % ne deplace
              pas la boite d'un pixel : c'est l'ancre x qui commande le nombre de
              lignes. Le libelle est une enumeration de trois termes, qui passe a TROIS
              lignes a 280 px de largeur d'affichage — la plus petite servie, faute de
              regle de masquage — soit 0,3753 de hauteur de cadre.
              La fenetre a placer y fait alors 44 % x 37,53 % du cadre, plus grande que
              toute poche de fond pur de l'image : balayage 2D exhaustif, PLANCHER
              MESURE A 14,20 % de pixels non-fond, et 56 a 58 % si l'on corrige le seul
              debordement vertical en gardant x. Les deux defauts sont ANTAGONISTES —
              l'ancre livree doit son taux de 7,6 % au fait qu'une partie de sa boite
              est HORS CADRE, donc non comptee.
              LA BORNE EST STRICTE, ET C'EST MESURE AU DISPLAY CALCULE :
              `max-[560px]:hidden` compile en `width < 560px`, donc l'etiquette est
              MASQUEE a 559 px de fenetre et VISIBLE a 560 — pas l'inverse. Le mot
              « sous » est donc exact, et l'instrument le verifie avec `<`, pas `<=`.
              MASQUER SOUS 560 px SUPPRIME LE CAS QUI BLOQUE, mais PAS jusqu'a une
              ligne, et j'avais ecrit le contraire. Mesure : avec le `sizes` de ce
              panneau, une fenetre de 561 px sert 521 px d'affichage, donc encore DEUX
              lignes et 0,142391 de cadre — 2,14 fois les 0,0661 que j'annoncais. La
              bascule vers une seule ligne est a 582 px d'affichage, soit 622 px de
              fenetre : entre 561 et 621 px, soixante et un pixels, la boite fait
              toujours deux lignes. Le seuil qui rendrait vraie la phrase « une ligne »
              serait 621 px, pas 560.
              Le masquage a 560 reste le bon choix : il supprime le cas a TROIS lignes,
              qui est celui dont aucune ancre ne se sortait. Et l'ancre ci-dessous est
              mesuree sur le vrai pire cas restant, 0,142391 — pas sur le cas confortable
              que mon premier commentaire imaginait.
              Une etiquette absente doublee d'un texte present juste a cote vaut mieux
              qu'une etiquette posee sur 14 % du sujet.

              ── ET CE SEUIL A ENFIN ETE MESURE PAR-DESSOUS, CE QUI N'AVAIT JAMAIS ETE
              FAIT. Tout ce qui precede raisonne sur des largeurs que la CSS MASQUE :
              on ne pouvait donc pas savoir si la boite y etait placable, et « le
              masquage a 560 est le bon choix » se prouvait tout seul. L'instrument a
              recu un mode `NBHC_DEMASQUER=1` qui force l'affichage sous le seuil et
              ajoute dix largeurs. Mesure sur la locale `en`, le pire cas (libelle le
              plus long), sur l'asset SERVI apres correction :

                fenetre  affich.  boite      lignes  non-fond  pire bord
                    320      280  123x51          3         0     -23,9
                    360      320  141x51          3         0     -20,0
                    375      335  147x36          2         0      -3,8
                    420      380  167x36          2         0      +0,5
                    480      440  194x36          2         0      +6,3
                    560      520  229x36          2         0     +13,9

              Le critere qui bloque n'est plus le recouvrement — il est a ZERO PIXEL
              non-fond partout, et le contraste a 17,02:1 partout, y compris a trois
              lignes. C'est le CADRE qui casse : le bord haut de la boite sort de
              l'image. La boite redevient placable a 380 px d'affichage, soit 420 px de
              fenetre, et avec 0,5 px de marge seulement ; le premier palier confortable
              est 440 px d'affichage (480 de fenetre) a 6,3 px.

              LE MASQUAGE N'EST PAS DEPLACE POUR AUTANT, ET C'EST UNE ABSTENTION
              DELIBEREE. Le descendre de 560 a 480 afficherait l'etiquette sur quatre-
              vingts pixels de largeurs qu'aucune lecture a l'oeil n'a jamais vues, pour
              gagner un libelle deja present en clair dans le texte du panneau juste
              au-dessus. Le chiffre est la, la decision appartient au client. Ce qui est
              corrige, c'est qu'elle ne repose plus sur une supposition. */}
          <span
            className="pointer-events-none absolute text-[11px] font-medium uppercase text-center
                       max-[560px]:hidden"
            style={{
              left: `${ETIQUETTE_BUREAU.x * 100}%`,
              top: `${ETIQUETTE_BUREAU.y * 100}%`,
              transform: "translate(-50%, -100%)",
              color: "var(--text)",
              letterSpacing: 2,
              lineHeight: 1.35,
              maxWidth: "44%",
              background: `rgba(9, 9, 11, ${VOILE_ETIQUETTE})`,
              padding: "3px 7px",
              borderRadius: 4,
            }}
          >
            {t("panel1LabelGroupe")}
          </span>
        </div>
      </article>

      {/* PANNEAUX 2 ET 3 — texte a gauche, illustration a droite, les deux dans
          le meme sens. La gouttiere est HORIZONTALE : en dessous de 900 px la
          disposition passe en colonne, et une gouttiere posee en style en ligne
          y deviendrait un ecart VERTICAL de 116 px. Elle est donc portee par une
          classe, pour qu'une requete de media puisse la reprendre. */}
      {LATERALES.map((img, i) => {
        const p = panneaux[i + 1];
        return (
          <article
            key={img.fichier}
            data-whynow-item
            className="flex max-[1145px]:flex-col gap-[116px] max-[1145px]:gap-6 items-start"
            style={{ marginTop: 96 }}
          >
            <div className="shrink-0 max-[1145px]:!w-full" style={{ width: COLONNE }}>
              <TitrePanneau>{p.titre}</TitrePanneau>
              <TextePanneau>{p.texte}</TextePanneau>
            </div>
            <div
              className="relative shrink-0 max-[1145px]:!w-full"
              style={{ width: LARGEUR_ILLUSTRATION }}
            >
            <img
              src={`/${img.fichier}-590.webp`}
              srcSet={PALIERS_LATERAUX.map((p) => `/${img.fichier}-${p}.webp ${p}w`).join(", ")}
              // SIZES EN LITTERAL, SANS INTERPOLATION, ET C'EST UN CONTOURNEMENT
              // DE BOGUE, PAS UN CHOIX DE STYLE.
              //
              // Ecrit avec des gabarits — "(max-width: 900px) calc(100vw - 40px),"
              // + ` (max-width: ${SEUIL_COTE_A_COTE}px) calc(100vw - 80px),`
              // + ` ${LARGEUR_ILLUSTRATION}px` — l'attribut arrivait TRONQUE dans
              // le HTML construit : `(max-width: 900px) calc(100vw - 40px),
              // (max-width: 1145 590px`. La fin du gabarit qui suit
              // l'interpolation, `px) calc(100vw - 80px),`, etait perdue. Verifie :
              // la source est correcte octet par octet, la troncature apparait
              // apres le build.
              //
              // Consequence mesuree tant que c'etait la : `sizes` invalide, donc le
              // navigateur retombe sur 100vw, donc a 1 440 il prenait le palier de
              // 1 180 px (31,7 Ko) pour un emplacement de 590 — soit 2,2 fois les
              // pixels utiles. Le symptome qui l'a trahi est que naturalWidth
              // valait exactement la largeur du viewport a chaque mesure.
              //
              // Les valeurs restent verifiees contre les constantes par les
              // assertions de type en bas de fichier.
              sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1145px) calc(100vw - 80px), 590px"
              width={img.largeur}
              height={img.hauteur}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto"
            />
              {/* Les etiquettes ne portent QUE sur le panneau 3. Le conteneur,
                  lui, enveloppe les deux : il reprend exactement les contraintes
                  de flex et la largeur que l'image portait, et l'image passe en
                  w-full — la boite est donc inchangee, et il n'y a pas deux
                  chemins de mise en page a comparer. */}
              {ETIQUETTES_LATERALES[i].map((e) => (
                  <span
                    key={e.cle}
                    className="pointer-events-none absolute text-[11px] font-medium uppercase text-center"
                    style={{
                      left: `${e.x * 100}%`,
                      top: `${e.y * 100}%`,
                      // L'ancre designe le point de l'objet ; l'etiquette se pose
                      // AU-DESSUS et centree sur lui.
                      transform: "translate(-50%, -100%)",
                      color: "var(--text)",
                      letterSpacing: 2,
                      lineHeight: 1.35,
                      maxWidth: "44%",
                      ...(PLAQUE_LATERALE[i]
                        ? {
                            background: `rgba(9, 9, 11, ${VOILE_ETIQUETTE})`,
                            padding: "3px 7px",
                            borderRadius: 4,
                          }
                        : null),
                    }}
                  >
                  {t(e.cle)}
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}

// Trois valeurs sont ecrites en litteral dans le JSX et doivent rester egales a
// leurs constantes : la gouttiere et le seuil parce que Tailwind ne lit pas les
// constantes du module, la largeur d'illustration parce que l'interpolation dans
// `sizes` arrivait tronquee apres le build (voir le commentaire sur l'attribut).
// Ces assertions cassent la compilation si une constante bouge sans son litteral.
const _gouttiere: 116 = GOUTTIERE;
const _seuil: 1145 = SEUIL_COTE_A_COTE;
const _largeur: 590 = LARGEUR_ILLUSTRATION;
void _gouttiere;
void _seuil;
void _largeur;
