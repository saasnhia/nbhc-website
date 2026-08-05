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
 * image dispose exactement de ce budget. A 9 px on reste sous les 10 demandes,
 * et la distance totale — 378 px — tient la consigne d'un passage court.
 */
const PX_PAR_IMAGE = 9;
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

  const large = useMediaQuery("(min-width: 1024px)");
  const reduit = useMediaQuery("(prefers-reduced-motion: reduce)");
  const anime = large && !reduit;

  /** Dessin en « cover » : le cadre est rempli quel que soit son rapport. */
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
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
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

    (async () => {
      redimensionner();
      await charger(0);
      if (annule) return;
      const premiere = images.current[0];
      if (premiere) dessiner(premiere);
      for (let i = 1; i < NB_IMAGES && !annule; i++) await charger(i);
    })();

    const declencheur = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=" + NB_IMAGES * PX_PAR_IMAGE,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const i = Math.min(
          NB_IMAGES - 1,
          Math.max(0, Math.round(self.progress * (NB_IMAGES - 1)))
        );
        if (i === indexCourant.current) return;
        indexCourant.current = i;
        const img = images.current[i];
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
      declencheur.kill();
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
        // Plein cadre : aucun conteneur, aucun rayon, aucune bordure, aucune
        // ombre. Les bords se dissolvent par le canal alpha des images.
        <canvas ref={canvasRef} aria-hidden="true" className="block h-full w-full" />
      ) : (
        // Sous 1024 px et en mouvement reduit : une image, aucune sequence, et
        // aucune image de sequence telechargee.
        <img
          src={REPLI}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover"
          style={{ aspectRatio: "1280 / 800" }}
        />
      )}
    </section>
  );
}
