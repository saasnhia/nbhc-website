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
 * le panneau 1 apporte deja la variation en pleine largeur. Leurs deux
 * illustrations sont concues pour 370 px des la liste d'objets, pas recadrees apres.
 *
 * L'ECART DE HAUTEUR ENTRE LES DEUX N'EST PAS COMPENSE, ET C'EST UNE DECISION.
 * Le panneau 2 fait 231 px de haut a 370 de large, le panneau 3 en fait 158 : 73 px
 * d'ecart. Les deux panneaux ne sont JAMAIS cote a cote — ils sont empiles, chacun
 * dans sa propre ligne, texte et image alignes par le haut, et le rythme vertical
 * est porte par un ecart constant de 96 px. Un ecart de hauteur entre deux lignes
 * successives ne produit donc aucun desalignement. Egaliser les hauteurs voudrait
 * dire ajouter 73 px de vide dans le panneau 3 : exactement ce que le client
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
 * TROIS TAILLES SERVIES PAR IMAGE. Le panneau 1 est en pleine largeur : 760, 1 120
 * et 2 240. Les panneaux 2 et 3 tiennent dans 370 px : 370, 740 et 1 110, soit les
 * densites 1, 2 et 3. Aucun telephone ne telecharge un fichier de 1 110 px pour une
 * colonne de 335.
 */

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Reperes de la reference, ramenes a notre largeur utile de 1 120 px.
const COLONNE = 358;
const GOUTTIERE = 116;
const LARGEUR_ILLUSTRATION = 370;

// Les deux illustrations laterales, avec les dimensions intrinseques de leur
// maitre : c'est ce couple qui reserve la boite et met le CLS a zero.
const LATERALES = [
  { fichier: "whynow-outils", largeur: 1480, hauteur: 925 },   // 231 px a 370
  { fichier: "whynow-postes", largeur: 1480, hauteur: 631 },   // 158 px a 370
] as const;

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
          srcSet="/whynow-bureau-760.webp 760w, /whynow-bureau-1120.webp 1120w, /whynow-bureau-2240.webp 2240w"
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
            className="flex max-[900px]:flex-col gap-[116px] max-[900px]:gap-6 items-start"
            style={{ marginTop: 96 }}
          >
            <div className="shrink-0 max-[900px]:!w-full" style={{ width: COLONNE }}>
              <TitrePanneau>{p.titre}</TitrePanneau>
              <TextePanneau>{p.texte}</TextePanneau>
            </div>
            <img
              src={`/${img.fichier}-740.webp`}
              srcSet={`/${img.fichier}-370.webp 370w, /${img.fichier}-740.webp 740w, /${img.fichier}-1110.webp 1110w`}
              sizes={`(max-width: 900px) calc(100vw - 40px), ${LARGEUR_ILLUSTRATION}px`}
              width={img.largeur}
              height={img.hauteur}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="block shrink-0 max-[900px]:!w-full h-auto"
              style={{ width: LARGEUR_ILLUSTRATION }}
            />
          </article>
        );
      })}
    </section>
  );
}

// GOUTTIERE : la valeur de la constante et celle de la classe Tailwind doivent
// rester egales. Tailwind ne lit pas les constantes du module, donc la classe est
// ecrite en litteral ci-dessus ; cette assertion casse le build si l'une bouge
// sans l'autre.
const _gouttiere: 116 = GOUTTIERE;
void _gouttiere;
