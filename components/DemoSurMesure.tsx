"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/* Le sur-mesure, montré en train de se faire : une demande arrive, l'outil
   applique les règles de l'entreprise, le devis est prêt à valider.

   C'est le seul mouvement de la page qui part tout seul, et il a un but :
   expliquer, dans l'ordre, ce que fait l'outil. Il se joue une fois, quand la
   démo entre dans l'écran ; ensuite c'est le lecteur qui avance ou rejoue.

   Sûre par construction :
   - le HTML servi montre l'état final (étape 3), lisible sans JavaScript ;
   - en mouvement réduit, rien ne part seul et les changements sont instantanés ;
   - les étapes à venir sont estompées, jamais retirées : rien n'est caché aux
     lecteurs d'écran, et la mise en page ne bouge pas.

   Chaque ligne du devis garde le lien avec la phrase du client qui la fonde :
   au survol ou au focus d'une ligne, sa phrase s'allume. */

const REGLES = ["rule1", "rule2", "rule3"] as const;
const LIGNES = [
  { id: "r1", sources: ["c1"] },
  { id: "r2", sources: ["c1"] },
  // Claire : ses 4 nuits viennent de « nous rejoint le 8 mai », sa chambre de « une chambre seule ».
  { id: "r3", sources: ["c2", "c3"] },
] as const;
type Source = "c1" | "c2" | "c3";

/* Sur téléphone, la barre d'étapes est trop loin des panneaux : chaque panneau
   porte alors son propre intitulé. */
function Intitule({ n, titre }: { n: number; titre: string }) {
  return (
    <div className="demo-intitule min-[760px]:hidden flex items-center gap-3" aria-hidden="true">
      <span className="demo-numero">{n}</span>
      <span>{titre}</span>
    </div>
  );
}

/* Durées de lecture, pas d'animation : le temps de lire chaque étape. */
const PAS_MS = 2200;

export default function DemoSurMesure() {
  const t = useTranslations("custom");
  const racine = useRef<HTMLDivElement>(null);
  // 3 = état final, celui du HTML servi.
  const [etape, setEtape] = useState(3);
  const [sources, setSources] = useState<readonly Source[]>([]);
  const minuteurs = useRef<number[]>([]);

  const arreter = useCallback(() => {
    minuteurs.current.forEach((m) => window.clearTimeout(m));
    minuteurs.current = [];
  }, []);

  const jouer = useCallback(() => {
    arreter();
    setEtape(1);
    minuteurs.current.push(
      window.setTimeout(() => setEtape(2), PAS_MS),
      window.setTimeout(() => setEtape(3), PAS_MS * 2)
    );
  }, [arreter]);

  useEffect(() => {
    const el = racine.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Déjà à l'écran au chargement (lien direct vers la section) : on laisse
    // l'état final, le bouton « Rejouer » est là.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) return;

    // Armée à l'image suivante, et l'observateur avec elle : ainsi l'étape 0
    // est toujours posée avant que la lecture ne puisse commencer.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        jouer();
      },
      // Quand le haut de la démo passe aux deux tiers de l'écran, quelle que
      // soit sa hauteur.
      { threshold: 0, rootMargin: "0px 0px -33% 0px" }
    );
    const cadre = window.requestAnimationFrame(() => {
      setEtape(0);
      io.observe(el);
    });
    return () => {
      window.cancelAnimationFrame(cadre);
      io.disconnect();
      arreter();
    };
  }, [jouer, arreter]);

  const choisir = (n: number) => {
    arreter();
    setEtape(n);
  };

  const phrase = (id: Source) => (
    <span
      className="demo-phrase"
      data-allume={etape >= 1 ? "" : undefined}
      data-source={sources.includes(id) ? "" : undefined}
      style={{ ["--d" as string]: `${["c1", "c2", "c3"].indexOf(id) * 380}ms` }}
    >
      {t(`demo.${id}`)}
    </span>
  );

  const ETAPES = [
    { n: 1, titre: t("flow.s1Title") },
    { n: 2, titre: t("flow.s2Title") },
    { n: 3, titre: t("flow.s3Title") },
  ];

  return (
    <figure className="m-0 mt-14 max-[900px]:mt-10">
      <div ref={racine} className="demo" data-etape={etape}>
        {/* Les trois étapes : la légende de ce qui se joue, et les commandes. */}
        <ol className="demo-etapes list-none m-0 p-0 grid min-[760px]:grid-cols-3 max-[759px]:hidden">
          {ETAPES.map((e) => (
            <li key={e.n}>
              <button
                type="button"
                onClick={() => choisir(e.n)}
                aria-current={etape === e.n ? "step" : undefined}
                className="demo-etape w-full text-left bg-transparent border-0 cursor-pointer"
                data-actif={etape >= e.n ? "" : undefined}
              >
                <span className="demo-numero" aria-hidden="true">
                  {e.n}
                </span>
                <span>{e.titre}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="grid min-[1000px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)_minmax(0,1.05fr)]">
          {/* 1. La demande, telle qu'elle arrive */}
          <div className="demo-panneau" data-panneau="1">
            <Intitule n={1} titre={t("flow.s1Title")} />
            <div
              className="flex items-baseline justify-between gap-4"
              style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 10 }}
            >
              <span>{t("flow.s1From")}</span>
              <span>{t("flow.s1When")}</span>
            </div>
            <p className="m-0" style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-muted)" }}>
              {t("demo.m1")}
              {phrase("c1")}
              {t("demo.m2")}
              {phrase("c2")}
              {t("demo.m3")}
              {phrase("c3")}
              {t("demo.m4")}
            </p>
          </div>

          {/* 2. Les règles de l'entreprise */}
          <div className="demo-panneau" data-panneau="2">
            <Intitule n={2} titre={t("flow.s2Title")} />
            <ul className="list-none m-0 p-0 flex flex-col" style={{ gap: 14 }}>
              {REGLES.map((r, i) => (
                <li
                  key={r}
                  className="demo-regle flex items-start gap-3"
                  style={{ ["--d" as string]: `${i * 260}ms` }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" style={{ flex: "none", marginTop: 2 }}>
                    <path d="M4 9.5l3.2 3.2L14 5.8" stroke="var(--gold-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>
                    <span className="block" style={{ fontSize: 15, color: "var(--text)" }}>
                      {t(`flow.${r}If`)}
                    </span>
                    <span className="block" style={{ fontSize: 14, lineHeight: 1.5, color: "var(--text-muted)" }}>
                      {t(`flow.${r}Then`)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Qui paie quoi, prêt à valider */}
          <div className="demo-panneau" data-panneau="3">
            <Intitule n={3} titre={t("flow.s3Title")} />
            <div role="table" aria-label={t("demo.tableLabel")}>
              <div role="row" className="demo-ligne demo-entete">
                <span role="columnheader">{t("demo.colWho")}</span>
                <span role="columnheader">{t("demo.colNights")}</span>
                <span role="columnheader">{t("demo.colRoom")}</span>
              </div>
              {LIGNES.map((l, i) => (
                <div
                  key={l.id}
                  role="row"
                  tabIndex={0}
                  className="demo-ligne demo-valeur"
                  style={{ ["--d" as string]: `${i * 260}ms` }}
                  onMouseEnter={() => setSources(l.sources)}
                  onMouseLeave={() => setSources([])}
                  onFocus={() => setSources(l.sources)}
                  onBlur={() => setSources([])}
                >
                  <span role="cell" style={{ color: "var(--text)", fontWeight: 500 }}>
                    {t(`demo.${l.id}.who`)}
                  </span>
                  <span role="cell" style={{ color: "var(--text)", fontVariantNumeric: "tabular-nums" }}>
                    {t(`demo.${l.id}.nights`)}
                  </span>
                  <span role="cell" style={{ color: "var(--text)" }}>
                    {t(`demo.${l.id}.room`)}
                    <span className="block" style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      {t(`demo.${l.id}.source`)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="demo-valider flex items-center justify-between gap-4" style={{ marginTop: 16 }}>
              <span style={{ fontSize: 14, lineHeight: 1.5, color: "var(--text-muted)" }}>
                {t("demo.amountsShort")}
              </span>
              <span
                className="inline-flex items-center whitespace-nowrap"
                style={{
                  height: 34,
                  padding: "0 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#0a0a0b",
                  background: "var(--gold)",
                }}
              >
                {t("flow.validate")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <figcaption
        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2"
        style={{ marginTop: 12, fontSize: 13, color: "var(--text-muted)" }}
      >
        <span>{t("flow.caption")}</span>
        <button type="button" onClick={jouer} className="lien-or bg-transparent border-0 p-0 cursor-pointer" style={{ fontSize: 14 }}>
          {t("flow.replay")}
        </button>
      </figcaption>
    </figure>
  );
}
