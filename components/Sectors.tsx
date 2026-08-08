"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "../i18n/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

/**
 * LES SCENES DE METIER LIVREES, ET SEULEMENT ELLES.
 *
 * Deux sur sept. Les cinq autres gardent leur reserve : un vide honnete se juge,
 * un faux visuel ferait juger autre chose que ce qui sera livre.
 *
 * LES ANCRES SONT CELLES QUE LA SCENE A EMISES, recopiees de ses .ancres.json et
 * jamais recalculees ici. Elles sont en fraction du cadre livre (1480 x 925), et le
 * CSS les pose en pourcentage — donc elles suivent l'image a toutes les largeurs
 * sans qu'aucune valeur en pixels n'existe.
 *
 * L'ancre designe le POINT DE L'OBJET ; l'etiquette se pose au-dessus et centree
 * sur lui, comme sur WhyNow et HowItWorks (transform translate(-50%, -100%)).
 *
 * PALIERS : 370, 650, 880, 1100, 1480 — derives de l'emprise reelle des reserves
 * (650 px a 1440, 540 a 1024, la pleine largeur en dessous de 900 ou les panneaux
 * s'empilent). Voir l'en-tete de rendu-3d/exporter_metiers.py.
 */
const PALIERS_METIER = [370, 650, 880, 1100, 1480] as const;

const SCENES_METIER: Record<string, {
  fichier: string;
  etiquettes: { cle: string; x: number; y: number }[];
}> = {
  garage: {
    fichier: "metier-garage",
    etiquettes: [
      { cle: "garageLabelAccueil", x: 0.4169, y: 0.6502 },   // telephone
      { cle: "garageLabelFiche", x: 0.6421, y: 0.6154 },     // fiche
    ],
  },
  pharma: {
    fichier: "metier-pharmacie",
    etiquettes: [
      { cle: "pharmaLabelTri", x: 0.486, y: 0.4038 },        // case active
      { cle: "pharmaLabelDecision", x: 0.6148, y: 0.6784 },  // ordonnance
    ],
  },
};

export default function Sectors() {
  const sectionRef = useRef<HTMLElement>(null);
  const rubanRef = useRef<HTMLDivElement>(null);
  const remplissageRef = useRef<HTMLSpanElement>(null);
  const jalonsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const reduit = usePrefersReducedMotion();
  const t = useTranslations("sectors");

  // Niches NBHC actively targets, each with its own dedicated, indexable
  // page (see SEO_AUDIT_STRATEGIE.md GATE 2). Opticien added for the
  // multi-store prospect pipeline — not yet field-canvassed like the others.
  const sectors = [
    {
      name: t("sportName"),
      pain: t("sportPain"),
      solution: t("sportSolution"),
      footnote: t("sportFootnote"),
      href: t("sportHref"),
    },
    {
      name: t("sportAssoName"),
      pain: t("sportAssoPain"),
      solution: t("sportAssoSolution"),
      footnote: t("sportAssoFootnote"),
      href: t("sportAssoHref"),
    },
    {
      scene: "garage",
      name: t("garageName"),
      pain: t("garagePain"),
      solution: t("garageSolution"),
      footnote: t("garageFootnote"),
      href: t("garageHref"),
    },
    {
      name: t("btpName"),
      pain: t("btpPain"),
      solution: t("btpSolution"),
      footnote: t("btpFootnote"),
      href: t("btpHref"),
    },
    {
      name: t("formationName"),
      pain: t("formationPain"),
      solution: t("formationSolution"),
      footnote: t("formationFootnote"),
      href: t("formationHref"),
    },
    {
      scene: "pharma",
      name: t("pharmaName"),
      pain: t("pharmaPain"),
      solution: t("pharmaSolution"),
      footnote: t("pharmaFootnote"),
      href: t("pharmaHref"),
    },
    {
      name: t("opticienName"),
      pain: t("opticienPain"),
      solution: t("opticienSolution"),
      footnote: t("opticienFootnote"),
      href: t("opticienHref"),
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-sector-card]");
    // MOUVEMENT REDUIT : L'ETAT FINAL, PAS L'ABSENCE DE TWEEN.
    // Le `gsap.set` ci-dessous pose opacity 0 ; se contenter de ne pas creer le
    // declencheur laisserait les cartes INVISIBLES. On pose donc l'arrivee.
    //
    // ON SORT AVANT LE CABLAGE DU SURVOL, et c'est voulu : le soulevement de
    // 4 px au passage de la souris est du mouvement decoratif. Sans ces
    // ecouteurs, la carte garde son etat de survol CSS et perd son deplacement.
    if (reduit) {
      gsap.set(cards, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }
    gsap.set(cards, { opacity: 0, y: 40 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        });
      },
    });

    cards.forEach((card) => {
      const c = card as HTMLElement;
      const onEnter = () =>
        gsap.to(c, { y: -4, duration: 0.3, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(c, { y: 0, duration: 0.3, ease: "power2.out" });
      c.addEventListener("mouseenter", onEnter);
      c.addEventListener("mouseleave", onLeave);
      (c as HTMLElement & { _cleanup?: () => void })._cleanup = () => {
        c.removeEventListener("mouseenter", onEnter);
        c.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      st.kill();
      cards.forEach((card) => {
        const c = card as HTMLElement & { _cleanup?: () => void };
        c._cleanup?.();
      });
    };
  }, [reduit]);

  /**
   * LA COLONNE VERTEBRALE — GSAP SEUL, scaleY, AUCUN PIN.
   *
   * CE QUI DIFFERE DU RAIL HORIZONTAL DE HowItWorks, ET C'EST TOUT LE SUJET.
   * Là-bas les quatre fractions sont des CONSTANTES GEOMETRIQUES sorties du
   * rendu (X_STATIONS) : elles ne bougent jamais, donc la timeline se construit
   * une fois. ICI les sept fractions dependent de LA MISE EN PAGE — hauteur des
   * textes, largeur de la fenetre, police chargee ou non. Elles doivent donc etre
   * MESUREES au montage, et REMESUREES quand la mise en page change.
   *
   * D'ou deux mecanismes, et pas un :
   *   1. `invalidateOnRefresh` recalcule start/end de la ScrollTrigger ;
   *   2. un ResizeObserver RECONSTRUIT la timeline, parce qu'`invalidateOnRefresh`
   *      ne deplace pas les enfants deja poses d'une timeline. Sans lui, un
   *      changement de largeur laisserait les jalons s'allumer aux anciennes
   *      fractions — le defaut exact que la structure en timeline evite au
   *      chargement se reintroduirait au redimensionnement.
   *
   * ON NE COMPARE JAMAIS A self.progress. Le scrub lisse le tween mais pas la
   * ScrollTrigger : un jalon compare a la progression du declencheur s'allumerait
   * AVANT que le remplissage ne l'atteigne. Chaque allumage est place DANS la
   * timeline au temps egal a sa fraction, donc la coincidence est structurelle.
   *
   * LA PLAGE, et le piege du retard est documente en detail sur le rail
   * horizontal (voir le commentaire du `bottom 60%` dans HowItWorks.tsx) : le
   * retard du scrub est proportionnel a la VITESSE de defilement, pas a la plage.
   * On part du HAUT DU RUBAN atteignant 75 % de la fenetre — donc quand le
   * premier panneau est franchement visible — et l'on finit au bas du ruban a
   * 60 % de la fenetre, ce qui laisse de la place au rattrapage.
   */
  useEffect(() => {
    const ruban = rubanRef.current;
    const rempli = remplissageRef.current;
    if (!ruban || !rempli) return;

    // MOUVEMENT REDUIT : L'ETAT D'ARRIVEE, pas l'absence de tween. Le style en
    // ligne pose scaleY(0) ; ne pas creer la timeline laisserait la barre vide et
    // les sept jalons eteints, donc une enumeration sans son fil.
    if (reduit) {
      gsap.set(rempli, { scaleY: 1, transformOrigin: "top center" });
      const j = jalonsRef.current.filter(Boolean) as HTMLSpanElement[];
      if (j.length) gsap.set(j, { backgroundColor: "var(--gold)" });
      return;
    }

    let tl: gsap.core.Timeline | null = null;

    const poser = () => {
      if (tl) { tl.scrollTrigger?.kill(); tl.kill(); tl = null; }
      const jalons = jalonsRef.current.filter(Boolean) as HTMLSpanElement[];
      const boite = ruban.getBoundingClientRect();
      if (boite.height < 10) return;
      // LES FRACTIONS SONT MESUREES, PAS DERIVEES. Centre du jalon rapporte a la
      // hauteur du ruban : c'est exactement la meme grandeur que celle que le
      // remplissage parcourt, donc les deux ne peuvent pas se desynchroniser.
      const fractions = jalons.map((n) => {
        const b = n.getBoundingClientRect();
        return Math.min(1, Math.max(0, (b.top + b.height / 2 - boite.top) / boite.height));
      });

      gsap.set(rempli, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(jalons, { backgroundColor: "var(--text-muted)" });

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: ruban,
          start: "top 75%",
          end: "bottom 60%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      // duree totale 1 : le TEMPS de la timeline est la fraction parcourue
      tl.to(rempli, { scaleY: 1, ease: "none", duration: 1 }, 0);
      fractions.forEach((f, k) => {
        if (jalons[k]) {
          tl!.to(jalons[k], { backgroundColor: "var(--gold)", ease: "none",
                              duration: 0.02 }, f);
        }
      });
    };

    poser();
    // Le ResizeObserver reconstruit ; on le laisse respirer pour ne pas repose
    // la timeline a chaque image d'un redimensionnement continu.
    let minuteur: ReturnType<typeof setTimeout> | null = null;
    const ro = new ResizeObserver(() => {
      if (minuteur) clearTimeout(minuteur);
      minuteur = setTimeout(() => { poser(); ScrollTrigger.refresh(); }, 180);
    });
    ro.observe(ruban);

    return () => {
      ro.disconnect();
      if (minuteur) clearTimeout(minuteur);
      if (tl) { tl.scrollTrigger?.kill(); tl.kill(); }
    };
  }, [reduit]);

  return (
    <section
      id="secteurs"
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
        className="font-bold leading-tight mb-4"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 52px)",
          letterSpacing: "-1.5px",
          color: "var(--text)",
        }}
      >
        {t("title")}
      </h2>
      <p
        className="text-[16px] font-light mb-14"
        style={{ color: "var(--text-muted)", maxWidth: 700, lineHeight: 1.7 }}
      >
        {t("subtitle")}
      </p>

      {/* ═══ SEPT PANNEAUX ALTERNES, SUR UNE COLONNE VERTEBRALE ═══════════════
          Le patron C de la reference : illustration d'un cote, texte de l'autre,
          inverse a chaque metier, et une barre CENTRALE qui se remplit. Mesure
          sur la capture de la reference : sa barre est a x=950 sur 1920, donc au
          milieu, et les illustrations alternent de part et d'autre.

          LA BARRE JALONNE UNE LISTE, ELLE N'AFFIRME AUCUNE SEQUENCE. C'est la
          difference avec WhyNow, ou j'avais refuse une barre : trois problemes
          independants n'ont pas d'ordre, alors que sept metiers sont une
          enumeration — et une enumeration a un debut et une fin. */}
      <div ref={rubanRef} className="relative">
        {/* LA PISTE ET LE REMPLISSAGE.
            LE COUPLE DE COULEURS EST MESURE, ET IL A FALLU RENONCER A L'OR SUR LE
            REMPLISSAGE. Sur un fond a #09090b les deux exigences sont
            arithmetiquement opposees : rendre la piste visible demande de
            l'eclaircir, et le remplissage doit alors etre plus clair encore.
            Table calculee sur la charte — l'or en remplissage ne depasse jamais
            1,32:1 contre une piste visible. Retenu :

              piste       #6B6A66   3,67:1 du fond (plancher WCAG 1.4.11, la
                                    valeur que l'en-tete de nbhc_studio.py derive)
              remplissage #F0EDE6   4,63:1 de la piste, 17,02:1 du fond

            L'or n'est pas perdu : il passe sur LES JALONS, la ou il signifie
            « franchi » au lieu de decorer. Un jalon dore POSE SUR le remplissage
            clair ne tiendrait que 2,29:1 ; il est donc CERCLE de la couleur de
            page, si bien que son contraste se juge contre le fond — 7,42:1 pour
            l'or, 5,64:1 au repos. */}
        <span
          data-sect-piste
          aria-hidden="true"
          className="absolute max-[900px]:hidden"
          style={{ left: "50%", marginLeft: -1, top: 0, bottom: 0, width: 2,
                   background: "#6B6A66", zIndex: 1 }}
        />
        <span
          ref={remplissageRef}
          data-sect-rempli
          aria-hidden="true"
          className="absolute max-[900px]:hidden"
          style={{ left: "50%", marginLeft: -1, top: 0, bottom: 0, width: 2,
                   background: "var(--text)", zIndex: 1,
                   // Etat de depart declare ICI et pas seulement dans la timeline :
                   // sinon la barre apparait pleine le temps d'une image.
                   transform: "scaleY(0)", transformOrigin: "top center" }}
        />

        {sectors.map((s, i) => {
          const imageADroite = i % 2 === 1;
          const scene = s.scene ? SCENES_METIER[s.scene] : undefined;
          return (
            <div
              key={s.name}
              data-sector-card
              data-sect-panneau
              className={"relative grid gap-[80px] items-center"
                + " max-[900px]:!grid-cols-1 max-[900px]:!gap-8 "
                // LES COLONNES NE SONT PAS EGALES, ET LE GABARIT SUIT L'ALTERNANCE.
                // A parts egales avec 96 px de gouttiere, la reserve tombait a
                // 424 px a 1024 — sous les 519 que la reference affiche. Le visuel
                // prend donc 1,25 part contre 0,75, et le GABARIT S'INVERSE avec
                // lui : sans cela, un visuel place en second par `order` atterrit
                // dans la piste etroite.
                + (imageADroite ? "grid-cols-[0.75fr_1.25fr]" : "grid-cols-[1.25fr_0.75fr]")}
              style={{ marginTop: i === 0 ? 0 : 128 }}
            >
              {/* LE JALON, sur la barre, a mi-hauteur du panneau. Il est ici un
                  enfant du panneau : sa position suit donc la mise en page sans
                  qu'aucune constante ne la decrive. */}
              <span
                ref={(n) => { jalonsRef.current[i] = n; }}
                data-sect-jalon
                aria-hidden="true"
                className="absolute max-[900px]:hidden"
                style={{ left: "50%", top: "50%", width: 14, height: 14,
                         marginLeft: -7, marginTop: -7, borderRadius: "50%",
                         background: "var(--text-muted)",
                         // le cercle de couleur de page isole le jalon du
                         // remplissage : son contraste se juge contre le fond
                         border: "3px solid var(--bg)", zIndex: 2 }}
              />

              {/* LA RESERVE — un vide HONNETE, a l'emprise du rendu a venir.
                  Rapport 1480/925 : c'est la forme exacte de nos rendus, donc le
                  jour ou l'image arrive, la boite ne bouge pas d'un pixel et il
                  n'y a aucun decalage de mise en page a craindre.
                  Ni emoji agrandi, ni illustration empruntee a une autre section :
                  un faux visuel ferait juger autre chose que ce qui sera livre. */}
              <div
                data-sect-reserve
                data-sect-livree={scene ? "1" : undefined}
                // LE FLOTTEMENT PORTE SUR LA BOITE, DONC SUR L'IMAGE ET SES
                // ETIQUETTES ENSEMBLE. Premiere version : sur l'image seule. Mais les
                // etiquettes sont ses SOEURS, positionnees en absolu par rapport a
                // cette boite — l'image aurait derive de 2 px sous une etiquette
                // restee fixe, et une etiquette qui ne designe plus son point ne
                // designe rien. Une transformation ne refait pas la mise en page :
                // l'emprise, le rapport et la reserve restent exactement ce qu'ils
                // sont. Rien sur les reserves encore vides, qui n'ont rien a bercer.
                data-sect-flotte={scene ? (s.scene === "pharma" ? "b" : "a") : undefined}
                className={(imageADroite
                  ? "order-2 max-[900px]:order-1"
                  : "order-1 max-[900px]:order-1") + " relative"}
                style={{
                  // L'EMPRISE NE BOUGE PAS QUAND L'IMAGE ARRIVE. Le rapport est
                  // celui du rendu, et il l'etait deja quand la boite etait vide :
                  // la substitution ne peut donc produire aucun decalage.
                  aspectRatio: "1480 / 925",
                  ...(scene
                    ? null
                    : { border: "1px dashed var(--border-accent, rgba(196,151,58,0.3))",
                        borderRadius: "var(--radius)",
                        display: "flex", alignItems: "center",
                        justifyContent: "center" }),
                }}
              >
                {scene ? (
                  <>
                    <img
                      src={`/${scene.fichier}-650.webp`}
                      srcSet={PALIERS_METIER.map((p) =>
                        `/${scene.fichier}-${p}.webp ${p}w`).join(", ")}
                      sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1200px) calc((100vw - 160px) * 0.625), 650px"
                      width={1480}
                      height={925}
                      alt={s.pain}
                      loading="lazy"
                      decoding="async"
                      className="block w-full h-auto"
                    />
                    {scene.etiquettes.map((e) => (
                      <span
                        key={e.cle}
                        className="pointer-events-none absolute text-[11px] font-medium uppercase text-center
                                   max-[560px]:hidden"
                        style={{
                          left: `${e.x * 100}%`,
                          top: `${e.y * 100}%`,
                          // L'ancre designe le point de l'objet ; l'etiquette se
                          // pose AU-DESSUS et centree sur lui.
                          transform: "translate(-50%, -100%)",
                          color: "var(--text)",
                          letterSpacing: 2,
                          lineHeight: 1.35,
                          maxWidth: "46%",
                        }}
                      >
                        {t(e.cle)}
                      </span>
                    ))}
                  </>
                ) : (
                  <span className="text-[12px] tracking-[2px] uppercase text-center px-4"
                        style={{ color: "var(--text-muted)" }}>
                    {s.name}
                  </span>
                )}
              </div>

              {/* LE TEXTE. Le lien reste sur tout le bloc : chaque metier a sa
                  page indexable dediee, c'est de l'acquisition et cela ne se
                  perd pas dans une refonte de mise en page. */}
              <Link
                href={s.href}
                data-cursor="card"
                className={(imageADroite
                  ? "order-1 max-[900px]:order-2"
                  : "order-2 max-[900px]:order-2") + " block no-underline group"}
              >
                <div
                  className="text-xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-syne)", color: "var(--text)",
                           letterSpacing: "-0.5px" }}
                >
                  {s.name}
                </div>
                <p className="text-sm mb-3"
                   style={{ color: "var(--text-muted)", lineHeight: 1.65 }}>
                  <span style={{ color: "#f87171", fontWeight: 600 }}>↳</span>{" "}
                  {s.pain}
                </p>
                <p className="text-sm mb-5"
                   style={{ color: "var(--text)", lineHeight: 1.65 }}>
                  <span style={{ color: "#4ade80", fontWeight: 600 }}>✓</span>{" "}
                  {s.solution}
                </p>
                <div
                  className="text-[12px] font-bold tracking-wide pt-4"
                  style={{ color: "var(--gold)", borderTop: "1px solid var(--border)" }}
                >
                  {s.footnote}
                </div>
                <div
                  className="mt-4 text-[13px] font-medium transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "var(--gold-light)" }}
                >
                  {t("learnMore")}
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="mt-14 text-center">
        <p
          className="text-[15px] font-light mb-5"
          style={{ color: "var(--text-muted)", maxWidth: 600, margin: "0 auto 20px" }}
        >
          {t("outroText")}
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--gold)", color: "#0a0a0b" }}
        >
          {t("outroCta")}
        </a>
      </div>
    </section>
  );
}
