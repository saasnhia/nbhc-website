"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Eyebrow
      tl.fromTo(
        el.querySelector("[data-eyebrow]"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7 },
        0
      );

      // Title words reveal
      const titleWords = el.querySelectorAll("[data-word] > span");
      tl.fromTo(
        titleWords,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.08 },
        0.15
      );

      // Subtitle + CTAs
      tl.fromTo(
        el.querySelector("[data-subtitle]"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.8
      );
      tl.fromTo(
        el.querySelector("[data-ctas]"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.95
      );

      // Scroll hint
      tl.fromTo(
        el.querySelector("[data-scroll-hint]"),
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        1.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = "On automatise ce qui vous";
  const titleWords = titleText.split(" ");

  return (
    <section ref={sectionRef} className="relative">
      <div
        className="min-h-screen flex flex-col justify-center px-10 max-md:px-5 pt-28 pb-20 max-md:pt-24 max-md:pb-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          data-eyebrow
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-7"
          style={{ color: "var(--gold)", opacity: 0 }}
        >
          <span
            className="block w-6 h-px"
            style={{ background: "var(--gold)" }}
          />
          Studio IA · SAS NBHC · France
        </div>

        <h1
          className="font-extrabold leading-none mb-7"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(48px, 7vw, 96px)",
            letterSpacing: "-3px",
            color: "var(--text)",
            maxWidth: 900,
          }}
        >
          {titleWords.map((word, i) => (
            <span
              key={i}
              data-word
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
            >
              <span style={{ display: "inline-block" }}>
                {word}
              </span>
              {i < titleWords.length - 1 && "\u00A0"}
            </span>
          ))}
          <br />
          <span
            data-word
            style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
          >
            <span
              className="not-italic relative"
              style={{ display: "inline-block", color: "var(--gold)" }}
            >
              freine.
              <span
                className="absolute bottom-0.5 left-0 right-0 h-0.5"
                style={{
                  background: "linear-gradient(90deg, var(--gold), transparent)",
                }}
              />
            </span>
          </span>
        </h1>

        <p
          data-subtitle
          className="text-lg font-light mb-12"
          style={{
            color: "var(--text-muted)",
            maxWidth: 560,
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          Nous concevons des solutions SaaS et des systèmes d&apos;intelligence
          artificielle sur mesure pour accélérer votre transformation digitale —
          du diagnostic jusqu&apos;au déploiement.
        </p>

        <div
          data-ctas
          className="flex items-center gap-4 flex-wrap"
          style={{ opacity: 0 }}
        >
          <MagneticButton
            href="#contact"
            className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 cursor-pointer hover:-translate-y-px"
            style={{
              background: "var(--gold)",
              color: "#0a0a0b",
              border: "none",
            }}
          >
            Démarrer un projet
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MagneticButton>
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
        </div>

        <div
          data-scroll-hint
          className="absolute bottom-10 left-10 flex items-center gap-3 text-xs tracking-wider uppercase"
          style={{ color: "var(--text-dim)", opacity: 0 }}
        >
          <span
            className="block w-8 h-px animate-pulse"
            style={{ background: "var(--text-dim)" }}
          />
          Découvrir
        </div>
      </div>
    </section>
  );
}
