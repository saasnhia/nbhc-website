"use client";

import { useEffect, useRef } from "react";

/* Apparition au défilement, sûre par construction.

   Le contenu est servi VISIBLE. Ce n'est qu'une fois le JavaScript chargé que
   le bloc reçoit la classe « pret » (état de départ), puis « vu » quand il
   entre dans l'écran. Sans JavaScript, ou si l'observateur n'existe pas, rien
   n'est jamais masqué. En mouvement réduit, la feuille de style annule l'état
   de départ. Un bloc déjà à l'écran au chargement ne reçoit pas « pret » : il
   ne clignote pas.

   Les enfants marqués `data-etape` entrent l'un après l'autre ; un trait
   marqué `data-trait` se trace de gauche à droite. */
type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "ol" | "ul" | "figure";
  /** Vrai quand ce sont les enfants marqués data-etape qui entrent, pas le bloc. */
  enfants?: boolean;
};

export default function Apparition({ children, className, style, as = "div", enfants }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.9) return; // déjà visible : on n'y touche pas

    el.classList.add("pret");
    const io = new IntersectionObserver(
      ([entree]) => {
        if (!entree.isIntersecting) return;
        el.classList.add("vu");
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Balise = as as "div";
  return (
    <Balise
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`apparition ${className ?? ""}`}
      style={style}
      data-enfants={enfants ? "" : undefined}
    >
      {children}
    </Balise>
  );
}
