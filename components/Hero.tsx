"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: i * 0.15 },
  }),
};

export default function Hero() {
  return (
    <section className="relative">
      <div
        className="min-h-screen flex flex-col justify-center px-10 max-md:px-5 pt-28 pb-20 max-md:pt-24 max-md:pb-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-7"
          style={{ color: "var(--gold)" }}
        >
          <span
            className="block w-6 h-px"
            style={{ background: "var(--gold)" }}
          />
          Studio IA · SAS NBHC · France
        </motion.div>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-extrabold leading-none mb-7"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(48px, 7vw, 96px)",
            letterSpacing: "-3px",
            color: "var(--text)",
            maxWidth: 900,
          }}
        >
          On automatise
          <br />
          ce qui vous
          <br />
          <em
            className="not-italic relative"
            style={{ color: "var(--gold)" }}
          >
            freine.
            <span
              className="absolute bottom-0.5 left-0 right-0 h-0.5"
              style={{
                background:
                  "linear-gradient(90deg, var(--gold), transparent)",
              }}
            />
          </em>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg font-light mb-12"
          style={{
            color: "var(--text-muted)",
            maxWidth: 560,
            lineHeight: 1.7,
          }}
        >
          Nous concevons des solutions SaaS et des systèmes d&apos;intelligence
          artificielle sur mesure pour accélérer votre transformation digitale —
          du diagnostic jusqu&apos;au déploiement.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex items-center gap-4 flex-wrap"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 cursor-pointer hover:-translate-y-px"
            style={{
              background: "var(--gold)",
              color: "#0a0a0b",
              border: "none",
            }}
          >
            Démarrer un projet
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#produits"
            className="inline-flex items-center gap-2 text-[15px] font-normal px-7 py-3.5 rounded-md no-underline transition-all duration-200"
            style={{
              background: "transparent",
              color: "var(--text-muted)",
              border: "1px solid var(--border-accent)",
            }}
          >
            Voir nos réalisations
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-10 flex items-center gap-3 text-xs tracking-wider uppercase"
          style={{ color: "var(--text-dim)" }}
        >
          <span
            className="block w-8 h-px animate-pulse"
            style={{ background: "var(--text-dim)" }}
          />
          Découvrir
        </motion.div>
      </div>
    </section>
  );
}
