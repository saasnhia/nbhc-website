"use client";

/**
 * WHYNOW — premiere section a recevoir la nouvelle DA, les deux couches.
 *
 * COUCHE 1, TYPOGRAPHIE ET COMPOSITION. L'anatomie est celle mesuree sur la
 * reference : un titre, un chapo, trois puces a icone, une grande illustration.
 * Les trois cartes deviennent trois puces. Reperes tenus :
 *
 *   rapport titre / chapo  2,53   (mesure sur la reference : ascendante du titre
 *                                 38 px, capitale du chapo 15 px)
 *   colonne de texte        358 px = 32 % de 1 120
 *   gouttiere               116 px, soit les 114 px de la reference ramenes a
 *                                 notre largeur par la normalisation 480:114:501
 *   vide de fin             288 px = 26 %, le vide que la reference laisse
 *
 * OU LE RAPPORT 2,53 TIENT. Le h2 atteint son plafond de 52 px a 1 300 px de
 * viewport et le chapo son plafond de 20,5 px a 1 171 px : au-dela de 1 300 le
 * rapport vaut 2,54. En dessous il se comprime, et c'est arithmetique — a 375 px
 * le h2 est borne a 28 px par son propre clamp, et un chapo a 11 px serait
 * illisible. Le plancher du chapo est donc pose a 15 px, ce qui donne 1,87.
 *
 * COUCHE 2, L'ILLUSTRATION. Rendu Cycles hors ligne, PNG opaque sur #09090b
 * converti en WebP — voir nbhc-broll/rendu-3d/. Elle est en PLEINE LARGEUR avec
 * le texte au-dessus, et non sur les 33 % de la reference. La raison est mesuree :
 * ce que l'image demontre est une quantite DENOMBRABLE, onze feuilles contre une,
 * et l'epaisseur apparente d'une feuille vaut 6,7 px a 1 120 px de large. A 370 px
 * de colonne elle tomberait a 2,2 px, or le seuil de denombrabilite mesure a l'oeil
 * se situe entre 5,4 et 4,9 px. La proportion de la reference detruirait donc
 * exactement ce qui fait la force de l'image. Ses illustrations sont des scenes
 * larges a gros objets ; la notre repose sur un comptage. Ce n'est pas la meme
 * contrainte, donc ce ne peut pas etre la meme mise en page.
 *
 * CLS. L'illustration porte width et height intrinseques, donc le navigateur
 * reserve sa boite avant le chargement et la page ne saute pas. C'est le critere
 * qui casse le plus facilement sur une image de cette taille.
 *
 * L'ASSET EST RECADRE EN HAUT, et c'est une mesure qui l'a impose. Le rendu a ete
 * compose comme une image autonome : ses marges internes valaient 382 px en haut
 * contre 69 en bas, soit 191 px d'air a la taille d'affichage. Cet air s'AJOUTE a
 * l'espacement de la mise en page — l'ecart percu sous le texte faisait 64 (CSS)
 * + 191 (interne) = 255 px la ou 64 etaient voulus. 313 px sont donc coupes en
 * haut pour que les marges verticales du fichier soient symetriques a 69 px, soit
 * 34 px de chaque cote a l'affichage. Le rapport passe de 1,600 a 2,061.
 *
 * TROIS TAILLES SERVIES, choisies par srcset : 2 240, 1 120 et 760 px. Aucun
 * telephone ne telecharge le rendu 2 240.
 */

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const QuestionIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const RocketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

// Reperes de la reference, ramenes a notre largeur utile de 1 120 px.
const COLONNE = 358;

export default function WhyNow() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("whyNow");

  const puces = [
    { Icon: ClockIcon, titre: t("card1Title"), texte: t("card1Desc") },
    { Icon: QuestionIcon, titre: t("card2Title"), texte: t("card2Desc") },
    { Icon: RocketIcon, titre: t("card3Title"), texte: t("card3Desc") },
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
        className="font-bold leading-tight mb-10 max-[900px]:mb-8"
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

      {/* Chapo et puces cote a cote, avec la gouttiere de la reference. Le vide
          de fin — 288 px sur 1 120, soit 26 % — n'est pas un oubli : c'est le
          vide que la reference laisse a droite de chacun de ses panneaux. */}
      {/* La gouttiere de 116 px est HORIZONTALE. En dessous de 900 px la
          disposition passe en colonne et cette meme valeur devenait un ecart
          VERTICAL de 116 px, plus 32 de marge sur la liste : 148 px entre le
          chapo et les puces, mesures sur la capture a 375. Elle est donc portee
          par une classe et non par un style en ligne, pour qu'une requete de
          media puisse la reprendre. */}
      <div
        className="flex max-[900px]:flex-col gap-[116px] max-[900px]:gap-9"
        style={{ marginBottom: 64 }}
      >
        <p
          data-whynow-item
          className="font-light shrink-0 max-[900px]:!w-full"
          style={{
            width: COLONNE,
            color: "var(--text-muted)",
            fontSize: "clamp(15px, 1.75vw, 20.5px)",
            lineHeight: 1.62,
          }}
        >
          {t("subtitle")}
        </p>

        <ul
          className="shrink-0 max-[900px]:!w-full space-y-6 list-none p-0 m-0"
          style={{ width: COLONNE }}
        >
          {puces.map((p, i) => (
            <li key={i} data-whynow-item className="flex gap-4">
              <span
                className="shrink-0 inline-flex items-center justify-center"
                style={{ width: 36, height: 36, color: "var(--gold)" }}
              >
                <p.Icon />
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className="block font-bold"
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: 16,
                    letterSpacing: "-0.3px",
                    color: "var(--text)",
                    marginBottom: 4,
                  }}
                >
                  {p.titre}
                </span>
                <span
                  className="block font-light"
                  style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-muted)" }}
                >
                  {p.texte}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* L'ILLUSTRATION. width et height intrinseques : la boite est reservee
          avant le chargement, donc CLS nul. `sizes` decrit la largeur REELLEMENT
          occupee a chaque palier — c'est lui qui evite qu'un telephone
          telecharge le rendu 2 240. */}
      <figure data-whynow-item className="m-0">
        <img
          src="/whynow-bureau-1120.webp"
          srcSet="/whynow-bureau-760.webp 760w, /whynow-bureau-1120.webp 1120w, /whynow-bureau-2240.webp 2240w"
          sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 80px), 1120px"
          width={2240}
          height={1087}
          alt={t("illustrationAlt")}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto"
        />
      </figure>
    </section>
  );
}
