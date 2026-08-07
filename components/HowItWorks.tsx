"use client";

/**
 * HOWITWORKS — LA CHAINE DES QUATRE ETAPES.
 *
 * CE QUE L'ILLUSTRATION DEMONTRE : la signature ne tombe pas au debut de la chaine
 * mais APRES LA CONCEPTION, au moment ou ce qui sera construit est deja entierement
 * defini. C'est deja publie, donc opposable — step2Desc dit « Vous savez exactement
 * ce qui sera construit avant de signer. »
 *
 * UNE SEULE ILLUSTRATION, PAS QUATRE. WhyNow portait trois problemes independants,
 * donc trois panneaux. Ici les quatre etapes sont sequentielles : c'est une chaine.
 *
 * ── LA GRILLE SE DERIVE DU RENDU, ET NON L'INVERSE ──────────────────────────
 * Les quatre stations tombent aux fractions 0,1279 · 0,3410 · 0,5541 · 0,7672 de la
 * largeur de l'image, mesurees sur le rendu. Le pas est de 0,2131, regulier a la
 * quatrieme decimale, et une station occupe 15,58 % de la largeur. Les quatre colonnes
 * de libelles sont donc un conteneur decale de 5,00 % a gauche et 9,76 % a droite,
 * divise en quatre parts egales SANS JOUR : le bord gauche de chaque colonne tombe
 * exactement sur le bord gauche de sa station — 5,00 / 26,31 / 47,62 / 68,93 %.
 *
 * L'INVERSE NE MARCHE PAS, et je l'ai cru un temps. Regler le jour entre stations
 * pour viser une grille de quatre colonnes egales sur 1 120 px est impossible :
 * l'echelle ortho vaut span / 0,90 et le span depend lui-meme du jour, donc le pas en
 * pixels ne peut pas viser une cible fixe. Une grille de quatre colonnes egales sur
 * toute la largeur tomberait a 121 px de la quatrieme station. Le CSS est le
 * parametre libre, pas la geometrie.
 *
 * ── DEUX RECADRAGES, ET LE POINT DE RUPTURE EST MESURE ──────────────────────
 * Seuil de lisibilite en balayage, mesure a la taille reelle sur les cinq largeurs
 * que la mise en page affiche vraiment : l'argument passe jusqu'a 728 px et meurt en
 * dessous. Ce qui fixe ce seuil est la BANDE DOREE du document — 9,9 px de haut a
 * 1 120, 6,4 px a 728, 3,9 px a 440 — a comparer au plancher de 4,9 a 5,4 px mesure
 * a l'oeil sur ce projet.
 *
 * Sous 768 px de viewport on sert donc un RECADRAGE sur 02, la signature et 03.
 * L'argument y est entier a une echelle lisible : la bande doree remonte a 9,4 px a
 * 440 et 7,2 px a 335. Ce qu'on perd est la sequence complete des quatre etapes, que
 * les quatre titres et les quatre badges portent de toute facon a toutes les
 * largeurs. C'est un recadrage du maitre, donc il n'a coute aucun rendu.
 *
 * EPAISSIR LES BARRES DES STATIONS NE SERT A RIEN, et c'est mesure : de 0,045 a
 * 0,078 elles passent de 10,5 a 18,2 px a 440 px d'affichage, mais la bande doree
 * reste a 3,9 px. Le seuil est fixe par l'objet qui porte l'argument, et ce n'est pas
 * celui qu'on epaissirait.
 *
 * ── LES VOILES LOCAUX RESTENT ───────────────────────────────────────────────
 * Cette section est a l'interieur de FondSections : un maillage anime tourne derriere
 * elle. Les blocs de texte gardent donc leur aplat de couleur de page a 78 %, qui les
 * rend lisibles sans le cout par image d'un backdrop-filter.
 */

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fractions des centres de station, MESUREES sur le rendu. Le pas vaut 0,2131.
const PAS = 0.2131;
// Demi-emprise ecran d'une station, en fraction de la largeur d'image : 0,416 unite
// d'emprise sur une echelle ortho de 2,6691, divisee par deux.
const DEMI_STATION = 0.416 / 2.6691 / 2;       // 7,79 %
// Le bord gauche de la premiere colonne coincide avec le BORD GAUCHE de la premiere
// station, et non avec son centre : les libelles sont alignes a gauche, donc c'est
// leur bord gauche que l'oeil rapporte a la station.
const BORD_GAUCHE = 0.1279 - DEMI_STATION;     // 5,00 %
const BORD_DROIT = 1 - (BORD_GAUCHE + 4 * PAS);

/**
 * ANCRES SORTIES PAR scene_chaine.py (chaine.ancres.json, ecrit APRES st.ecrire()).
 *
 * CE MAITRE N'EST PAS RECADRE — verifie et non suppose, contrairement a celui du
 * panneau 1 de WhyNow qui l'est de 313 px : les deux fichiers font 2 240 x 1 349
 * et le recalage donne son minimum a l'offset 0 (0,420 d'ecart moyen contre 0,963
 * a un pixel), l'ecart residuel etant la seule compression WebP. Les ancres
 * s'expriment donc directement dans le cadre rendu.
 *
 * LE DECALAGE VERTICAL DES DEUX ETIQUETTES EST BALAYE, comme sur whynow-outils, et
 * on retient le plus PETIT qui donne du fond de page. La falaise est brutale :
 *
 * ET LE BALAYAGE DOIT SE FAIRE AVEC LA BOITE DU PLUS PETIT AFFICHAGE, pas du plus
 * grand. Une etiquette a taille de police FIXE couvre une FRACTION d'image d'autant
 * plus grande que l'image est affichee petite : 147 x 15 px valent 0,131 x 0,022 de
 * l'image a 1 120 px d'affichage, mais 0,203 x 0,034 a 726 px — la plus petite
 * largeur ou ces etiquettes existent. Premier balayage fait avec la boite de 1 120 :
 * il donnait dz 0,40 et dz 0,50, verts a 1 440 et 1 024 et A 1,17:1 A 768. Refait
 * avec la boite de 726 :
 *
 *   station 04   dz 0,40 -> 1,15:1     dz 0,50 -> 16,92:1
 *   queue        dz 0,50 -> 0,93:1     dz 0,60 -> 16,92:1
 *
 * Aucune plaque n'est donc necessaire ici, contrairement aux caisses et au bureau.
 */
const ETIQUETTES_CHAINE = [
  { cle: "labelSysteme", x: 0.7673, y: 0.2407, bord: false },
  // `bord` : cette etiquette PEND DE SON BORD DROIT au lieu d'etre centree sur son
  // ancre. La queue detachee est a 0,9202 de la largeur, soit 9 px du bord droit a
  // 726 px d'affichage : centree, l'etiquette debordait de l'image, et la figure
  // est en overflow-hidden — donc coupee. Un mot comme « accompagnement » ne peut
  // pas non plus se replier. Elle est donc alignee a droite sur son ancre, ce qui
  // la garde dans le cadre et la laisse toucher son objet.
  { cle: "labelOptionnel", x: 0.9202, y: 0.3534, bord: true },
] as const;

/** Abscisse au sol des quatre stations, pour le tiret de rappel. */
const X_STATIONS = [0.1278, 0.3409, 0.5541, 0.7673] as const;

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("howItWorks");

  const steps = [
    { n: t("step1Number"), title: t("step1Title"), desc: t("step1Desc"), badge: t("step1Badge") },
    { n: t("step2Number"), title: t("step2Title"), desc: t("step2Desc"), badge: t("step2Badge") },
    { n: t("step3Number"), title: t("step3Title"), desc: t("step3Desc"), badge: t("step3Badge") },
    { n: t("step4Number"), title: t("step4Title"), desc: t("step4Desc"), badge: t("step4Badge") },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-hiw-item]");
    gsap.set(items, { opacity: 0, y: 24 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          clearProps: "transform",
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      id="comment-ca-marche"
      ref={sectionRef}
      className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      {/* Voile local : ce bloc est pose sur le calque anime. */}
      <div className="voile-texte mb-12">
        <div
          className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
          style={{ color: "var(--gold)" }}
        >
          <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
          {t("eyebrow")}
        </div>
        <h2
          className="font-bold leading-tight mb-4"
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
          className="text-[16px] font-light"
          style={{ color: "var(--text-muted)", maxWidth: 700, lineHeight: 1.7 }}
        >
          {t("subtitle")}
        </p>
      </div>

      {/* L'ILLUSTRATION. Deux recadrages, bascules par une requete de media et non
          par srcset : c'est de la direction artistique, pas un choix de resolution,
          donc <picture> et non un simple srcset. Chaque source porte ses width et
          height pour que le navigateur reserve la bonne boite avant le chargement —
          les deux rapports d'image different (1,660:1 et 1,029:1), donc sans ces
          attributs le basculement produirait un saut de mise en page. */}
      {/* LE CADRE DE CARTE N'EST PAS UN ORNEMENT, IL CORRIGE UN DEFAUT VU SUR LA
          PAGE. L'illustration est un PNG opaque sur #09090b ; posee dans FondSections,
          elle decoupe un rectangle noir a arete franche dans le maillage anime et lit
          comme un trou plutot que comme un objet. Le meme traitement que les anciennes
          cartes de cette section — un filet a var(--border) et le rayon de la charte —
          transforme le trou en carte. C'est le vocabulaire deja present sur la page,
          pas une invention.

          L'autre sortie serait de servir l'illustration en ALPHA pour que le maillage
          traverse son fond. Elle est plus elegante mais elle coute quatre fichiers de
          plus, un WebP a canal alpha est plus lourd, et les gates precedents ont mesure
          des halos gris sur les bords en mode alpha. Elle est chiffree dans le rapport,
          pas retenue ici. */}
      <figure
        data-hiw-item
        className="relative m-0 overflow-hidden"
        style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/hiw-etape2-340.webp 340w, /hiw-etape2-440.webp 440w, /hiw-etape2-680.webp 680w, /hiw-etape2-878.webp 878w"
            sizes="calc(100vw - 40px)"
            width={878}
            height={853}
          />
          <img
            src="/hiw-chaine-1120.webp"
            srcSet="/hiw-chaine-760.webp 760w, /hiw-chaine-1120.webp 1120w, /hiw-chaine-1480.webp 1480w, /hiw-chaine-2240.webp 2240w"
            sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 80px), 1120px"
            width={2240}
            height={1349}
            alt={t("illustrationAlt")}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto"
          />
        </picture>
        {/* DEUX ETIQUETTES, ET ELLES N'AJOUTENT PAS DE LIBELLE D'ETAPE — les quatre
            stepNTitle sont deja dans les colonnes, alignes sur les stations. Elles
            expliquent deux CHOIX GRAPHIQUES aujourd'hui muets : pourquoi la station
            04 est pleine quand les trois autres sont ajourees, et pourquoi le
            dernier segment est DETACHE. Le detachement code l'option, et personne
            ne le sait.

            Masquees sous 768 px : c'est le RECADRAGE qui y est servi, un autre
            cadrage, dont les ancres ne sont pas celles-ci. Voir ETIQUETTES.md. */}
        {ETIQUETTES_CHAINE.map((e) => (
          <span
            key={e.cle}
            className="pointer-events-none absolute text-[11px] font-medium uppercase text-center max-[767px]:hidden"
            style={{
              left: `${e.x * 100}%`,
              top: `${e.y * 100}%`,
              transform: e.bord ? "translate(-100%, -100%)" : "translate(-50%, -100%)",
              color: "var(--text)",
              letterSpacing: 2,
              lineHeight: 1.35,
              maxWidth: "22%",
              textAlign: e.bord ? "right" : "center",
            }}
          >
            {t(e.cle)}
          </span>
        ))}
      </figure>

      {/* LA LEGENDE DE LA SIGNATURE, ET ELLE EST INDISPENSABLE.
          L'epreuve du prospect l'a montree : un lecteur qui balaye voit bien une
          plaque blanche entre la deuxieme et la troisieme station, mais rien ne lui
          dit que c'est une signature — le mot « signer » n'existe que dans le
          paragraphe de l'etape 2, qu'il ne lit pas. L'image portait donc « quatre
          etapes » mais pas son argument.

          Le texte est un FRAGMENT VERBATIM de step2Desc : « avant de signer ». Aucune
          affirmation nouvelle.

          Sa position horizontale est celle du document dans le rendu. Le document est
          a mi-chemin entre les stations 02 et 03, soit a l'abscisse -0,140 de l'axe,
          soit 44,75 % de la largeur de l'image. Sur le RECADRAGE mobile la meme
          plaque tombe a 50,1 %, parce que le recadrage part de 539 px sur un maitre de
          2 240 et fait 926 px de large : (1002,8 - 539) / 926. Deux valeurs, donc deux
          spans, chacun visible de son cote du point de rupture. */}
      <div className="relative h-7 mt-2" data-hiw-item aria-hidden="false">
        <span
          className="voile-texte absolute text-[11px] font-medium tracking-[2px] uppercase whitespace-nowrap max-[767px]:hidden"
          style={{ left: "44.75%", transform: "translateX(-50%)", color: "var(--gold)" }}
        >
          {t("legendeSignature")}
        </span>
        <span
          className="voile-texte absolute text-[11px] font-medium tracking-[2px] uppercase whitespace-nowrap hidden max-[767px]:inline"
          style={{ left: "50.1%", transform: "translateX(-50%)", color: "var(--gold)" }}
        >
          {t("legendeSignature")}
        </span>
      </div>

      {/* LE TIRET DE RAPPEL — il transforme une proximite en reference.
          Les quatre colonnes sont deja alignees sur les stations a 0 px, mais
          l'alignement seul ne se LIT pas comme un etiquetage : rien ne dit au
          lecteur que ce texte parle de cet objet.

          IL N'EST PAS DORE, ET C'EST LE POINT. La chaine l'est deja ; un tiret dore
          rimerait avec elle et se lirait comme un PROLONGEMENT de l'illustration au
          lieu d'une annotation. Il appartient a la couche du TEXTE. Candidats
          mesures, contraste sur #09090b :

            --border rgba(255,255,255,0.07)   1,14:1   ECARTE
            --text-dim  #3E3D3A               1,83:1   ECARTE
            --text-muted #8C8880              5,64:1   RETENU
            --gold #C4973A                    7,42:1   exclu par construction

          Les deux premiers sont ecartes par la MESURE et non par gout : le tiret
          porte la reference, donc c'est un objet graphique necessaire a la
          comprehension, et WCAG 1.4.11 lui demande 3:1. Et --text-muted est la
          couleur meme des descriptions des colonnes : le tiret appartient donc
          litteralement a la couche qu'il designe.

          IL A SA PROPRE BANDE, ET C'EST UNE CORRECTION MESUREE. Pose d'abord DANS
          la bande de legende, le troisieme tiret tombait DANS la boite de « avant
          de signer » a TOUTES les largeurs — legende 661..783 et tiret a 781 a
          1 440, 462..585 et 563 a 1 024, 346..468 et 423 a 768, en francais comme
          en anglais. La legende est a 44,75 % parce que c'est la position reelle du
          document dans le rendu : elle ne se deplace pas. Les tirets descendent
          donc d'un cran, dans une bande de 24 px qui ABSORBE le mt-6 de la grille —
          hauteur totale entre la figure et les colonnes inchangee, donc aucun
          risque de CLS.

          Et il ENJAMBE toute sa bande. Premier essai a 10 px : il se lisait comme un
          MARQUEUR et non comme un lien, flottant sans toucher ni la figure ni les
          colonnes. Un connecteur doit enjamber ; l'epaisseur reste a 1 px.

          IL TOMBE SUR L'ABSCISSE DE LA STATION, PAS SUR LE CENTRE DE LA COLONNE, et
          les deux ne coincident pas : BORD_GAUCHE vaut 0,1279 - DEMI_STATION, ce qui
          aligne le BORD GAUCHE de chaque cellule sur le bord gauche de sa station,
          non son centre sur son centre. Mesure a 1 440 px : tirets a 303 / 542 /
          781 / 1019, centres de cellules a 335 / 574 / 813 / 1051, soit -32 px
          constants. Ce n'est pas un desalignement a corriger — le texte des colonnes
          est ferre a gauche, donc son ancre percue est son bord gauche, et le tiret
          tombe A L'INTERIEUR de sa colonne, a 86 px d'une cellule de 238. Un tiret
          vertical ne peut pas viser a la fois l'objet et le centre du texte ; il vise
          l'objet, qui est ce qu'il designe. */}
      <div className="relative h-6 max-[767px]:hidden" aria-hidden="true">
        {X_STATIONS.map((x, k) => (
          <span
            key={k}
            className="absolute inset-y-0 block"
            style={{
              left: `${x * 100}%`,
              width: 1,
              background: "var(--text-muted)",
              transform: "translateX(-50%)",
            }}
          />
        ))}
      </div>

      {/* LES QUATRE LIBELLES, chacun sous sa station. Le conteneur est decale des
          marges derivees du rendu ; en dessous de 768 px la chaine cede la place au
          recadrage et les etapes repassent en pile verticale, donc plus de decalage
          ni de grille. */}
      <div
        className="max-[767px]:!mt-6 max-[767px]:!ml-0 max-[767px]:!mr-0"
        style={{
          marginLeft: `${BORD_GAUCHE * 100}%`,
          marginRight: `${BORD_DROIT * 100}%`,
        }}
      >
        {/* GAP A ZERO, ET C'EEST UNE CORRECTION MESUREE. Avec gap-6, les centres des
            colonnes tombaient a -9 / -3 / +3 / +9 px de leurs stations aux quatre
            largeurs ou la grille est active. La cause est arithmetique : le pas d'une
            grille de quatre colonnes vaut (largeur - 3 x jour) / 4 + jour, soit 244,75
            px pour un conteneur de 955 px et un jour de 24 — alors que le pas des
            stations vaut 0,2131 x 1120 = 238,7 px. Un jour non nul rend donc les deux
            pas incompatibles quelle que soit la largeur du conteneur.
            A jour nul, le pas vaut exactement largeur / 4, donc un conteneur de
            4 x 21,31 % aligne les colonnes sur les stations par construction. L'air
            entre colonnes est rendu par une marge interne, qui ne touche pas au pas. */}
        <div className="grid grid-cols-4 gap-0 max-[767px]:grid-cols-1 max-[767px]:gap-8">
          {steps.map((s) => (
            <div key={s.n} data-hiw-item className="voile-texte pr-6 max-[767px]:pr-0">
              <div
                className="text-[11px] font-bold tracking-[2px] mb-2 max-[767px]:hidden"
                style={{ fontFamily: "var(--font-syne)", color: "var(--gold)" }}
              >
                {s.n}
              </div>
              <div
                className="font-bold mb-2"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontSize: "clamp(16px, 1.5vw, 19px)",
                  letterSpacing: "-0.3px",
                  color: "var(--text)",
                  lineHeight: 1.25,
                }}
              >
                <span className="hidden max-[767px]:inline" style={{ color: "var(--gold)" }}>
                  {s.n}
                  {" — "}
                </span>
                {s.title}
              </div>
              <span
                className="inline-block text-[11px] font-medium tracking-wide uppercase px-3 py-1 rounded-full mb-3"
                style={{
                  background: "var(--gold-dim)",
                  color: "var(--gold-light)",
                  border: "1px solid var(--gold-border)",
                }}
              >
                {s.badge}
              </span>
              <p
                className="text-[14px] font-light m-0"
                style={{ color: "var(--text-muted)", lineHeight: 1.65 }}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Les deux marges sont ecrites en pourcentage calcule, mais le point de rupture de
// 767 px est en litteral dans les classes Tailwind — Tailwind ne lit pas les
// constantes du module. Cette assertion casse la compilation si le pas mesure change
// sans que les marges soient recalculees.
const _pas: 0.2131 = PAS;
void _pas;
