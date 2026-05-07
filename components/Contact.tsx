"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("contact");

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: leftRef.current, start: "top 80%", once: true },
          }
        );
      }
      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: rightRef.current, start: "top 80%", once: true },
          }
        );
      }
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: 0 },
          {
            height: 120,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: lineRef.current, start: "top 80%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-cursor="contact"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        className="py-24 max-[900px]:py-16 grid gap-12 max-[900px]:gap-10 max-[900px]:grid-cols-1 grid-cols-2 px-10 max-[900px]:px-5"
        style={{
          alignItems: "start",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div ref={leftRef} style={{ opacity: 0 }}>
          <div
            className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
            style={{ color: "var(--gold)" }}
          >
            <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
            {t("eyebrow")}
          </div>

          <h2
            className="font-extrabold leading-none mb-6"
            style={{
              fontFamily: "var(--font-syne)",
              fontWeight: 800,
              fontSize: "clamp(28px, 3.5vw, 56px)",
              letterSpacing: "-2px",
              lineHeight: 1.05,
              color: "var(--text)",
            }}
          >
            {t("title")}
            <br />
            <span style={{ color: "var(--gold)" }}>{t("titleGold")}</span>
          </h2>

          <div
            ref={lineRef}
            style={{
              width: 2,
              height: 0,
              background: "var(--gold)",
              marginLeft: 40,
              marginBottom: 32,
            }}
          />

          <p
            className="text-base font-light"
            style={{ color: "var(--text-muted)", maxWidth: 480, lineHeight: 1.7 }}
          >
            {t("description")}
          </p>
        </div>

        <div
          ref={rightRef}
          className="p-8 max-[900px]:p-6 flex flex-col gap-5"
          style={{
            opacity: 0,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="inline-flex items-center justify-center gap-2 text-[16px] font-medium px-7 py-4 rounded-md no-underline transition-all duration-200 hover:opacity-90"
            style={{
              background: "var(--gold)",
              color: "#0a0a0b",
              border: "none",
              boxShadow: "0 8px 24px rgba(196,151,58,0.18)",
            }}
          >
            {t("calendlyButton")}
          </a>

          <div
            className="text-[13px] text-center"
            style={{ color: "var(--text-muted)" }}
          >
            {t("calendlyAlt")}
          </div>

          <div
            className="grid gap-4 pt-5"
            style={{
              borderTop: "1px solid var(--border)",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div>
              <div
                className="text-[10px] tracking-widest uppercase mb-1.5"
                style={{ color: "var(--text-dim)" }}
              >
                {t("emailDirect")}
              </div>
              <a
                href="mailto:contact@nbhc.fr"
                data-cursor="link"
                className="text-[13px] font-semibold no-underline hover:opacity-80"
                style={{ color: "var(--gold)" }}
              >
                contact@nbhc.fr
              </a>
            </div>
            <div>
              <div
                className="text-[10px] tracking-widest uppercase mb-1.5"
                style={{ color: "var(--text-dim)" }}
              >
                {t("siren")}
              </div>
              <div className="text-[13px]" style={{ color: "var(--text-muted)" }}>
                102 637 899
              </div>
            </div>
            <div className="col-span-2">
              <div
                className="text-[10px] tracking-widest uppercase mb-1.5"
                style={{ color: "var(--text-dim)" }}
              >
                {t("headquarters")}
              </div>
              <div
                className="text-[13px] font-light leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                55 Rue Henri Clément, 71100 Saint-Rémy
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
