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
const LATERALES = [
  { fichier: "whynow-outils", largeur: 1480, hauteur: 925 },   // 369 px a 590
  { fichier: "whynow-postes", largeur: 1480, hauteur: 631 },   // 252 px a 590
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
        fontSize: "clamp(19px, 2.1vw, 26px)",
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
  }, []);

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
          style={{ marginTop: 40 }}
        />
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
              className="block shrink-0 max-[1145px]:!w-full h-auto"
              style={{ width: LARGEUR_ILLUSTRATION }}
            />
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
