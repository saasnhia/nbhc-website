"use client";

// Sequence scrubee juste avant la section EN ACTION.
//
// Le recit : le visiteur voit une automatisation se ramifier au fil du
// scroll, puis arrive sur EN ACTION ou il la pilote lui-meme.
//
// LA RUPTURE CLAIRE EST ASSUMEE, DONC ELLE EST MISE EN SCENE. La source est
// une animation sur fond creme, a l'oppose du fond sombre du site. Plutot que
// de la poser en pleine largeur — ou elle ferait tache — elle est enfermee
// dans un cadre : bordure doree fine, rayon et ombre repris des cartes du
// site, marges genereuses autour. Le bloc clair devient une piece exposee sur
// le fond sombre, pas un accident de montage. Les fondus haut et bas etirent
// le passage sombre -> clair -> sombre sur toute la hauteur de la section.
//
// POURQUOI UN CANVAS ET PAS UNE <video> : le seek video n'est pas fiable a
// l'image pres, et le sens arriere varie selon le codec et le moteur. Des
// images decodees a l'avance rendent le scrub deterministe.
//
// BUDGET, MESURE : 72 images WebP de 1280 px, 1045 Ko, 14 Ko l'image. Le
// segment source ne contient que 94 images (3,62 s a 24 ips) — au-dela de 94
// on dupliquerait. 72 en conserve 77 %, la progression reste continue ;
// descendre a 60 laisse voir des paliers sur une croissance aussi rapide.
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NB_IMAGES = 72;
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

type Props = { eyebrow: string; legende: string; alt: string };

export default function SequenceEnAction({ eyebrow, legende, alt }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const barreRef = useRef<HTMLDivElement>(null);
  const images = useRef<(HTMLImageElement | null)[]>([]);
  const indexCourant = useRef(0);
  const [charge, setCharge] = useState(0);

  const large = useMediaQuery("(min-width: 1024px)");
  const reduit = useMediaQuery("(prefers-reduced-motion: reduce)");
  const anime = large && !reduit;

  /** Dessin en « cover » : le cadre est rempli quel que soit son rapport. */
  const dessiner = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
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
            setCharge((n) => n + 1);
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
      end: () => "+=" + window.innerHeight * 1.25,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // L'indicateur dore suit la progression : c'est le seul element qui
        // rattache visuellement le bloc clair a la charte pendant le scrub.
        if (barreRef.current) {
          barreRef.current.style.transform = `scaleX(${self.progress})`;
        }
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

  const pret = charge >= Math.min(10, NB_IMAGES);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ height: anime ? "100vh" : "auto", background: "var(--bg)" }}
    >
      <div className="w-full px-10 max-[1100px]:px-6 py-16 max-[1023px]:py-14"
           style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div
          className="text-[11px] font-medium tracking-[3px] uppercase mb-5 flex items-center gap-2"
          style={{ color: "var(--gold)" }}
        >
          <span className="block w-6 h-px" style={{ background: "var(--gold)" }} />
          {eyebrow}
        </div>

        {/* Le cadre : c'est lui qui fait tenir le bloc clair sur le fond
            sombre. Bordure doree, rayon et ombre repris des cartes du site. */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "1600 / 1000",
            borderRadius: 16,
            border: "1px solid var(--gold-border)",
            boxShadow: "0 16px 36px rgba(0,0,0,0.55)",
            background: "#0e0e10",
          }}
        >
          {anime ? (
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full block" />
          ) : (
            // Sous 1024 px et en mouvement reduit : une image, aucune sequence.
            <img
              src={REPLI}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* Adoucit la rencontre entre le creme de l'image et le dore du
              cadre. Un degrade radial et non un box-shadow interne : le flou
              d'une ombre de 90 px coutait 1 image par seconde sur WebKit,
              mesure a l'appui, alors qu'un degrade est rasterise une fois. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: 16,
              background:
                "radial-gradient(120% 120% at 50% 50%, transparent 55%, rgba(10,10,11,0.34) 100%)",
            }}
          />
        </div>

        <div className="mt-5 flex items-center gap-4">
          {/* Indicateur de progression, en doré. */}
          <div
            aria-hidden="true"
            className="h-px flex-1 overflow-hidden"
            style={{ background: "var(--gold-border)" }}
          >
            <div
              ref={barreRef}
              className="h-px w-full"
              style={{
                background: "var(--gold)",
                transform: "scaleX(0)",
                transformOrigin: "left center",
              }}
            />
          </div>
          <p className="text-[12px] font-light tracking-[1.5px] uppercase shrink-0"
             style={{ color: "var(--text-muted)" }}>
            {legende}
          </p>
        </div>
      </div>

      {/* Fondus genereux : le passage sombre -> clair -> sombre est etire sur
          toute la hauteur, pour qu'il se lise comme une transition voulue. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(to bottom, var(--bg), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />

      {anime && !pret && (
        <div
          aria-hidden="true"
          className="absolute bottom-6 right-8 h-px"
          style={{ width: 40, background: "var(--gold-border)" }}
        >
          <div
            className="h-px"
            style={{ width: `${Math.round((charge / NB_IMAGES) * 100)}%`, background: "var(--gold)" }}
          />
        </div>
      )}
    </section>
  );
}
