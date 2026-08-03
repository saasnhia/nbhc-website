"use client";

// Page d'envoi commercial, pas une page de trafic.
//
// Le prospect a déjà eu l'appel : il vient voir à quoi ça ressemble, pas lire
// un argumentaire. La vidéo est donc au-dessus de tout, le texte est réduit au
// strict nécessaire, et il n'y a qu'un seul appel à l'action.
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LogementSelecteur from "./LogementSelecteur";
import LogementVideo, { type Variante } from "./LogementVideo";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

// Chaque démo décrit son propre bien : l'aria-label suit la variante affichée.
const ARIA_VIDEO: Record<Variante, string> = {
  studio: "videoAriaStudio",
  appartement: "videoAria",
  villa: "videoAriaVilla",
};
const EASE = [0.22, 1, 0.36, 1] as const;

export default function LogementPage() {
  const t = useTranslations("logement");
  const reduceMotion = useReducedMotion();
  // Appartement par défaut : sur les 40 prospects du fichier Cannes, 26 sont
  // des appartements ou meublés et 5 seulement des villas. La villa est le
  // segment le plus cher, pas le plus fréquent — elle mérite son onglet, pas
  // le premier écran.
  const [variante, setVariante] = useState<Variante>("appartement");

  // Entrée douce, jamais linéaire : la courbe est celle déjà utilisée par la
  // section EN ACTION, pour que le rythme des deux pages soit le même.
  const monte = (delay = 0) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: reduceMotion ? 0 : 0.55, ease: EASE, delay: reduceMotion ? 0 : delay },
  });

  const etapes = [t("step1"), t("step2"), t("step3")];

  return (
    <main
      // overflow-x-clip : le halo deborde volontairement du cadre, la page
      // le rogne plutot que de laisser apparaitre une barre horizontale.
      className="overflow-x-clip px-10 max-[900px]:px-5"
      style={{ maxWidth: 1120, margin: "0 auto" }}
    >
      {/* 1 + 2 — titre A COTE de la video sur grand ecran, pas au-dessus.
          En 4:3 la video mesure 778 px de haut a 1038 de large : empilee sous
          un titre, elle passait sous la ligne de flottaison et le gerant n'en
          voyait que le haut. Cote a cote, elle tient entiere dans la premiere
          vue — c'est tout l'objet de la page. */}
      <section className="pt-16 pb-24 max-[900px]:pt-10 max-[900px]:pb-16">
        <div className="grid gap-10 max-[1023px]:gap-7 min-[1024px]:grid-cols-[minmax(0,34%)_minmax(0,66%)] items-center">
          <motion.div {...monte()} className="min-w-0">
            <div
              className="text-[11px] font-medium tracking-[3px] uppercase mb-5 flex items-center gap-2"
              style={{ color: "var(--gold)" }}
            >
              <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
              {t("eyebrow")}
            </div>
            <h1
              className="font-bold mb-4"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(28px, 3.1vw, 46px)",
                lineHeight: 1.05,
                letterSpacing: "-1.6px",
                color: "var(--text)",
              }}
            >
              {t("title")}
            </h1>
            <p
              className="text-[16px] font-light"
              style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
            >
              {t("subtitle")}
            </p>
            {/* Veracite : la demonstration ne vient d'aucun client, et on le dit
                la ou la question se pose. */}
            <p
              className="text-[13px] font-light mt-7 max-[1023px]:hidden"
              style={{ color: "var(--text-dim)" }}
            >
              {t("disclaimer")}
            </p>
          </motion.div>

          <motion.div {...monte(0.08)} className="min-w-0">
            <LogementSelecteur
              valeur={variante}
              onChange={setVariante}
              libelles={{
                studio: t("typeStudio"),
                appartement: t("typeAppartement"),
                villa: t("typeVilla"),
              }}
              listeLabel={t("typeListeAria")}
            />
            <LogementVideo
              variante={variante}
              ariaLabel={t(ARIA_VIDEO[variante])}
              soundOn={t("soundOn")}
              soundOff={t("soundOff")}
            />
            <p
              className="text-[13px] font-light mt-5 text-center min-[1024px]:hidden"
              style={{ color: "var(--text-dim)" }}
            >
              {t("disclaimer")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3 — trois étapes, sans blocs bavards. */}
      <section className="pb-24 max-[900px]:pb-16">
        <motion.div
          {...monte()}
          className="text-[11px] font-semibold tracking-[2px] uppercase mb-8"
          style={{ color: "var(--text-dim)" }}
        >
          {t("howLabel")}
        </motion.div>
        <div className="grid grid-cols-3 max-[760px]:grid-cols-1 gap-5">
          {etapes.map((etape, i) => (
            <motion.div
              key={etape}
              {...monte(0.06 * i)}
              className="p-7 max-[600px]:p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="mb-4"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: 1,
                  color: "var(--gold)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p
                className="text-[16px] font-light"
                style={{ color: "var(--text)", lineHeight: 1.6 }}
              >
                {etape}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4 — un seul appel à l'action, le même mécanisme que la home. */}
      <motion.section {...monte()} className="pb-28 max-[900px]:pb-20 text-center">
        <h2
          className="font-bold mb-4"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(24px, 2.8vw, 36px)",
            letterSpacing: "-1px",
            color: "var(--text)",
          }}
        >
          {t("ctaTitle")}
        </h2>
        <p
          className="text-[15px] font-light mb-8"
          style={{ color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 32px" }}
        >
          {t("ctaSubtitle")}
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="inline-flex items-center gap-2 text-[16px] font-medium px-9 py-4 rounded-md no-underline transition-all duration-200 hover:opacity-90"
          style={{ background: "var(--gold)", color: "#0a0a0b" }}
        >
          {t("ctaButton")}
          <span aria-hidden="true">→</span>
        </a>
      </motion.section>
    </main>
  );
}
