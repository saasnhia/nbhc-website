"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

export default function FinalCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("ctaFinal");

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const inner = el.querySelector("[data-cta-inner]");
    if (!inner) return;
    gsap.set(inner, { opacity: 0, y: 30 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      once: true,
      onEnter: () => {
        gsap.to(inner, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(196,151,58,0.12) 0%, rgba(196,151,58,0.04) 40%, transparent 75%)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(196,151,58,0.03) 50%, transparent 100%)",
        }}
      />

      <div
        data-cta-inner
        className="relative z-1 py-24 max-[900px]:py-16 px-10 max-[900px]:px-5 text-center"
        style={{ maxWidth: 880, margin: "0 auto" }}
      >
        <h2
          className="font-bold leading-tight mb-6"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(30px, 4.5vw, 56px)",
            letterSpacing: "-1.5px",
            color: "var(--text)",
          }}
        >
          {t("title")}
        </h2>
        <p
          className="text-[17px] font-light mb-10 max-[900px]:mb-8"
          style={{
            color: "var(--text-muted)",
            maxWidth: 640,
            lineHeight: 1.7,
            margin: "0 auto 40px",
          }}
        >
          {t("subtitle")}
        </p>

        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="inline-flex items-center gap-2 text-[16px] font-medium px-9 py-4 rounded-md no-underline transition-all duration-200 hover:opacity-90"
          style={{
            background: "var(--gold)",
            color: "#0a0a0b",
            boxShadow: "0 8px 32px rgba(196,151,58,0.25)",
          }}
        >
          {t("button")}
        </a>
      </div>
    </section>
  );
}
