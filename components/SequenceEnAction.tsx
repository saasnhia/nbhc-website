"use client";

// Sequence scrubee juste avant la section EN ACTION.
//
// ELLE N'A PAS A RACONTER. Le sens est porte par le lecteur interactif qui
// suit — huit etapes, fiche rendez-vous, bouton Valider. Celle-ci AMENE la
// section, puis cede la place : distance de scroll courte, aucun libelle,
// aucun sur-titre, aucun indicateur de progression.
//
// PLEIN CADRE, PLUS DE CARTE. La version precedente enfermait la sequence dans
// une carte a bordure doree, rayon et ombre, sur le raisonnement qu'une source
// claire devait etre presentee comme une piece exposee. Le traitement a change :
// les images portent desormais un duotone cuit vers (150,124,82), exactement le
// dore du calque de fond, donc il n'y a plus de rupture claire a encadrer. Le
// cadre, le rayon, le liseré, l'ombre et le degrade de vignettage sont retires.
//
// LES BORDS SONT DANS L'ALPHA DES IMAGES, pas en CSS. Chaque WebP porte un
// fondu vertical cuit dans son canal alpha, 18 % en haut et en bas : la bande
// se dissout dans la couleur de page sans mask-image ni filtre, donc sans cout
// par image.
//
// POURQUOI UN CANVAS ET PAS UNE <video> : le seek video n'est pas fiable a
// l'image pres, et le sens arriere varie selon le codec et le moteur. Des
// images decodees a l'avance rendent le scrub deterministe.
//
// POLARITE INVERSEE A L'EXTRACTION. La source est une animation d'objets
// colores sur fond GRIS CLAIR — luminance moyenne 176, mediane 200. Une rampe
// posee telle quelle mappait le FOND vers le dore : un aplat dore plein cadre
// avec les objets en taches sombres, l'inverse exact de l'intention. La
// luminance est donc inversee, puis les niveaux recales pour que le fond
// retombe sur la couleur de page.
//
// LOT MESURE : 42 images WebP de 1280x800, 1201 Ko, 28 Ko l'image, budget
// 1 229 Ko. Segment 17,40 s jusqu'a la fin de la source. Aucune duplication —
// les deux dernieres images de la source sont identiques au pixel pres, la
// derniere est ecartee a l'extraction. Occupation 2,9 % a 29,1 %, monotone.
// Teinte 37,6 a 38,8 degres, celle du calque de fond mesuree entre 35,9 et
// 38,1 : les deux sequences parlent bien la meme langue.
import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NB_IMAGES = 42;

/**
 * Pixels de scroll par image. C'est LE critere du scrub, pas le nombre
 * d'images : la distance epinglee vaut NB_IMAGES x cette valeur, donc chaque
 * image dispose exactement de ce budget. On prend la valeur maximale autorisee :
 * la montee d'opacite se jouant pendant l'epinglage, allonger celui-ci de 378 a
 * 420 px etale d'autant l'amplitude de luminance, et le pire palier passe de
 * 11,3 a 10,2 sur Chromium et de 14,7 a 13,2 sur WebKit. La distance reste celle
 * d'un passage court.
 */
const PX_PAR_IMAGE = 10;

/**
 * Hauteur de la bande, en fraction de la hauteur du viewport.
 *
 * Elle N'OCCUPE PLUS TOUT L'ECRAN. Avec les couleurs de la source restaurees,
 * une bande plein ecran ferait passer l'integralite du viewport de 9 a environ
 * 200 de luminance puis reviendrait, sur 378 px de defilement : un flash plein
 * ecran, inconfortable et dangereux pour une personne photosensible. Du noir de
 * page reste au-dessus et en dessous, pour garder un point d'ancrage sombre
 * pendant toute la traversee.
 */
const HAUTEUR_BANDE = "55vh";

/**
 * Distance de la descente d'opacite apres l'epinglage, en pixels de defilement.
 *
 * LA MONTEE, ELLE, SE JOUE PENDANT L'EPINGLAGE, et c'est une contrainte de
 * physique, pas un choix. Quand la bande entre dans le viewport elle defile a la
 * vitesse du scroll : chaque rangee de son interieur opaque, a environ 155 de
 * luminance, ajoute (155 - 9) / 860 = 0,17 a la moyenne du viewport. Sur 100 px
 * de defilement cela fait 17, au-dela du critere de 15, et ce chiffre ne depend
 * NI de la hauteur de la bande NI de la largeur de son fondu. Mesures : 17,2
 * avec une rampe lineaire sur la traversee, 23,0 en quadratique, 16,9 en racine
 * carree, 16,8 en exposant 0,4 avec la bande ramenee a 55 % et le fondu a 30 %.
 *
 * On rend donc ce balayage invisible — opacite nulle tant que l'epinglage n'a
 * pas commence — et la montee se joue ensuite sur les 420 px d'epinglage, ou la
 * bande est IMMOBILE. L'amplitude de 43 s'y etale a 11,4 pour 100 px. La bande
 * apparait donc en meme temps qu'elle se construit, ce qui est exactement
 * l'intention : une apparition, pas un objet qui arrive.
 */
const SORTIE = 900;
const REPLI = "/sequences/enaction-fixe.jpg";
const source = (i: number) =>
  `/sequences/enaction/f_${String(i + 1).padStart(3, "0")}.webp`;

/**
 * Media query sans setState dans un effet : le rendu serveur repond « non »,
 * donc aucune image n'est demandee avant que le navigateur ait confirme le
 * desktop.
 */
function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    [query]
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

type Props = { alt: string };

export default function SequenceEnAction({ alt }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const indexCourant = useRef(0);
  const opacite = useRef(0);

  const large = useMediaQuery("(min-width: 1024px)");
  const reduit = useMediaQuery("(prefers-reduced-motion: reduce)");
  const anime = large && !reduit;

  /**
   * Dessin en « cover », a l'opacite courante de la rampe.
   *
   * On efface avant de dessiner : sous une opacite inferieure a 1, un dessin
   * pose sur le precedent s'accumulerait au lieu de le remplacer. L'opacite est
   * appliquee par globalAlpha, donc au moment du dessin, ce qui ne coute rien —
   * a l'oppose d'une opacite CSS sur le canvas, qui ferait recomposer la couche
   * a chaque image.
   */
  const dessiner = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    // alpha CONSERVE : le fondu des bords est dans le canal alpha des
    // images, et un contexte opaque le remplacerait par du noir.
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;
    const { width: w, height: h } = canvas;
    const r = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * r;
    const dh = img.naturalHeight * r;
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = opacite.current;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    ctx.globalAlpha = 1;
  }, []);

  const redimensionner = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    canvas.width = Math.round(r.width * dpr);
    canvas.height = Math.round(r.height * dpr);
    const img = images.current[indexCourant.current];
    if (img) dessiner(img);
  }, [dessiner]);

  useEffect(() => {
    if (!anime) return;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    let annule = false;
    images.current = new Array(NB_IMAGES).fill(null);

    const charger = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.src = source(i);
        // decode() hors du fil du scroll : au moment ou ScrollTrigger reclame
        // l'image, il ne reste qu'un drawImage.
        img
          .decode()
          .then(() => {
            if (annule) return;
            images.current[i] = img;
            resolve();
          })
          .catch(() => resolve());
      });

    // CHARGEMENT DIFFERE JUSQU'A L'APPROCHE DE LA SECTION.
    //
    // Les 42 images pesent 1 295 Ko et etaient demandees des l'hydratation,
    // donc en concurrence avec les assets du hero : le LCP median sur WebKit
    // passait de 492 a 632 ms, au-dela du seuil de 564. Un observateur
    // d'intersection avec une marge d'une hauteur et demie d'ecran laisse le
    // haut de page se charger d'abord, tout en laissant largement le temps de
    // decoder avant que la section soit atteinte.
    //
    // Rien n'est perdu a l'ecran : l'opacite de la bande vaut zero tant que
    // l'epinglage n'a pas commence, donc un canvas encore vide est invisible.
    redimensionner();
    const demarrer = async () => {
      await charger(0);
      if (annule) return;
      const premiere = images.current[0];
      if (premiere) dessiner(premiere);
      for (let i = 1; i < NB_IMAGES && !annule; i++) await charger(i);
    };
    const observateur = new IntersectionObserver(
      (entrees) => {
        if (!entrees[0].isIntersecting) return;
        observateur.disconnect();
        void demarrer();
      },
      { rootMargin: "150% 0px" }
    );
    observateur.observe(section);

    const declencheur = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=" + NB_IMAGES * PX_PAR_IMAGE,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // Pendant l'epinglage, l'opacite suit directement la progression du
        // scrub : la montee et la construction avancent ensemble.
        opacite.current = self.progress;
        const i = Math.min(
          NB_IMAGES - 1,
          Math.max(0, Math.round(self.progress * (NB_IMAGES - 1)))
        );
        indexCourant.current = i;
        const img = images.current[i];
        if (img) dessiner(img);
      },
    });

    // RAMPE D'OPACITE, calculee sur les positions de defilement REELLES du
    // declencheur d'epinglage plutot que sur une fraction de la traversee : ce
    // sont ses bornes qui doivent encadrer la montee, et elles dependent de la
    // hauteur du viewport.
    const rampe = (y: number) => {
      const debut = declencheur.start;
      const fin = declencheur.end;
      if (y <= debut) return 0;
      if (y < fin) return (y - debut) / (fin - debut);
      return Math.max(0, 1 - (y - fin) / SORTIE);
    };

    const fondu = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const a = Math.max(0, Math.min(1, rampe(self.scroll())));
        if (Math.abs(a - opacite.current) < 0.004) return;
        opacite.current = a;
        const img = images.current[indexCourant.current];
        if (img) dessiner(img);
      },
    });

    let minuteur: ReturnType<typeof setTimeout>;
    const auRedimensionnement = () => {
      clearTimeout(minuteur);
      minuteur = setTimeout(() => {
        redimensionner();
        ScrollTrigger.refresh();
      }, 180);
    };
    window.addEventListener("resize", auRedimensionnement);

    return () => {
      annule = true;
      clearTimeout(minuteur);
      window.removeEventListener("resize", auRedimensionnement);
      observateur.disconnect();
      declencheur.kill();
      fondu.kill();
      images.current = [];
    };
  }, [anime, dessiner, redimensionner]);

  return (
    <section
      ref={sectionRef}
      // overflowX clip et jamais hidden : un ancetre en overflow:hidden devient
      // un conteneur de defilement, ce qui casserait tout positionnement
      // collant en aval. La lecon vient du calque de fond, elle vaut ici aussi.
      className="relative w-full"
      style={{
        height: anime ? "100vh" : "auto",
        background: "var(--bg)",
        overflowX: "clip",
      }}
    >
      {anime ? (
        // BANDE PLEINE LARGEUR, CENTREE, moins haute que l'ecran. Aucun
        // conteneur, aucun rayon, aucune bordure, aucune ombre, aucun libelle :
        // ce n'est pas une carte, c'est une apparition. Les bords se dissolvent
        // par le canal alpha des images, la bande entiere par la rampe
        // d'opacite appliquee au dessin.
        <div
          className="absolute inset-x-0 top-1/2 w-full -translate-y-1/2"
          style={{ height: HAUTEUR_BANDE }}
        >
          <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
        </div>
      ) : (
        // Sous 1024 px et en mouvement reduit : une image, aucune sequence, et
        // aucune image de sequence telechargee. Elle reste DANS LE FLUX et la
        // section prend sa hauteur : la bande centree dans 100 vh laisserait
        // 45 % de vide sur un ecran ou la hauteur est la ressource rare.
        <img
          src={REPLI}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block w-full"
          style={{ aspectRatio: "1280 / 440" }}
        />
      )}
    </section>
  );
}
