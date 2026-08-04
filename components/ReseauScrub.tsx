"use client";

// Bandeau de raccord entre la section Secteurs et la section EN ACTION.
//
// Le reseau d'automatisation se construit au fil du scroll : le visiteur le
// fabrique en descendant, puis arrive sur EN ACTION ou il le pilote pour de
// vrai. C'est le raccord narratif entre les deux sections.
//
// POURQUOI UN CANVAS ET PAS UNE BALISE VIDEO. Le seek d'une <video> n'est pas
// fiable a l'image pres : la precision et le sens de lecture arriere varient
// selon le codec et le moteur. On dessine donc des images decodees a l'avance
// sur un canvas 2D, ce qui rend le scrub deterministe.
//
// BUDGET. 60 images WebP de 1280 px, 645 Ko au total, soit 10 Ko par image —
// mesure, pas estime. La page est deja lourde sur WebKit : desktop uniquement
// au-dessus de 1024 px, et rien du tout en mouvement reduit.
//
// Lenis et ScrollTrigger partagent deja une seule boucle rAF (voir
// SmoothScroll.tsx : gsap.ticker pilote lenis.raf, et lenis.on("scroll")
// appelle ScrollTrigger.update). Il n'y a donc rien a recabler ici.
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lit une media query sans poser d'etat depuis un effet — meme forme que dans
 * LogementVideo. Au rendu serveur on repond « non » : la sequence n'est donc
 * jamais demandee avant que le navigateur ait confirme qu'on est sur desktop.
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

const NB_IMAGES = 60;
const REPLI = "/scrub/reseau-fixe.jpg";
const source = (i: number) => `/scrub/reseau/f_${String(i + 1).padStart(3, "0")}.webp`;

type Props = { legende: string; alt: string };

export default function ReseauScrub({ legende, alt }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const indexCourant = useRef(0);
  const [charge, setCharge] = useState(0);

  const large = useMediaQuery("(min-width: 1024px)");
  const reduit = useMediaQuery("(prefers-reduced-motion: reduce)");
  const anime = large && !reduit;

  /** Dessine en « cover » : le cadre est rempli quel que soit le rapport. */
  const dessiner = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx) return;
    const { width: w, height: h } = canvas;
    const ratio = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * ratio;
    const dh = img.naturalHeight * ratio;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }, []);

  const redimensionner = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // On plafonne le rapport de pixels a 2 : au-dela, le cout de remplissage
    // double sans gain visible sur une image aussi douce.
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
        // decode() sort le cout de decodage du fil du scroll : au moment ou
        // ScrollTrigger demandera l'image, il ne restera qu'un drawImage.
        img
          .decode()
          .then(() => {
            if (annule) return;
            images.current[i] = img;
            setCharge((n) => n + 1);
            resolve();
          })
          .catch(() => resolve());
      });

    // La premiere image est prioritaire : elle doit s'afficher tout de suite.
    (async () => {
      redimensionner();
      await charger(0);
      if (annule) return;
      const premiere = images.current[0];
      if (premiere) dessiner(premiere);
      // Le reste en tache de fond, dans l'ordre, sans bloquer le fil principal.
      for (let i = 1; i < NB_IMAGES && !annule; i++) await charger(i);
    })();

    const declencheur = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => "+=" + window.innerHeight * 1.2,
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
        // Si l'image n'est pas encore chargee, on garde la derniere dessinee
        // plutot que d'afficher un trou.
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

  const pret = charge >= Math.min(12, NB_IMAGES);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: anime ? "100vh" : "46vh", background: "#0a0a0b" }}
    >
      {anime ? (
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full block" />
      ) : (
        // Sous 1024 px et en mouvement reduit : une seule image, aucune
        // sequence telechargee, aucun canvas, aucun ScrollTrigger.
        <img
          src={REPLI}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Fondus haut et bas : le bandeau se fond dans les sections voisines
          au lieu d'etre pose comme un bloc rapporte. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{ background: "linear-gradient(to bottom, #0a0a0b, transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, #0a0a0b, transparent)" }}
      />

      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-16 max-[1023px]:pb-8">
        <p
          className="text-[13px] font-light tracking-[2px] uppercase text-center px-6"
          style={{ color: "var(--text-dim)" }}
        >
          {legende}
        </p>
      </div>

      {/* Indicateur discret tant que la sequence n'est pas exploitable. */}
      {anime && !pret && (
        <div
          aria-hidden="true"
          className="absolute bottom-6 right-6 h-px transition-opacity duration-300"
          style={{ width: 48, background: "var(--border-accent)" }}
        >
          <div
            className="h-px"
            style={{
              width: `${Math.round((charge / NB_IMAGES) * 100)}%`,
              background: "var(--gold)",
            }}
          />
        </div>
      )}
    </section>
  );
}
