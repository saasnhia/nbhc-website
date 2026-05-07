"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("howItWorks");

  const steps = [
    {
      n: t("step1Number"),
      title: t("step1Title"),
      desc: t("step1Desc"),
      badge: t("step1Badge"),
    },
    {
      n: t("step2Number"),
      title: t("step2Title"),
      desc: t("step2Desc"),
      badge: t("step2Badge"),
    },
    {
      n: t("step3Number"),
      title: t("step3Title"),
      desc: t("step3Desc"),
      badge: t("step3Badge"),
    },
    {
      n: t("step4Number"),
      title: t("step4Title"),
      desc: t("step4Desc"),
      badge: t("step4Badge"),
    },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-step-card]");
    const line = el.querySelector("[data-step-line]");

    gsap.set(cards, { opacity: 0, x: -30 });
    if (line) gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => {
        if (line) {
          gsap.to(line, { scaleY: 1, duration: 1.2, ease: "power3.out" });
        }
        gsap.to(cards, {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      id="comment-ca-marche"
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
          maxWidth: 900,
        }}
      >
        {t("title")}
      </h2>
      <p
        className="text-[16px] font-light mb-16"
        style={{ color: "var(--text-muted)", maxWidth: 700, lineHeight: 1.7 }}
      >
        {t("subtitle")}
      </p>

      <div className="relative" style={{ paddingLeft: 8 }}>
        {/* Vertical gold line */}
        <div
          data-step-line
          aria-hidden
          className="absolute max-[700px]:left-[15px]"
          style={{
            left: 31,
            top: 28,
            bottom: 28,
            width: 2,
            background:
              "linear-gradient(180deg, var(--gold) 0%, rgba(196,151,58,0.2) 100%)",
            borderRadius: 2,
          }}
        />

        <div className="flex flex-col gap-10 max-[900px]:gap-8">
          {steps.map((s) => (
            <div
              key={s.n}
              data-step-card
              className="relative flex gap-6 max-[700px]:gap-4"
            >
              {/* Number bubble on the line */}
              <div
                className="flex-shrink-0 flex items-center justify-center max-[700px]:w-8 max-[700px]:h-8"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "var(--bg)",
                  border: "2px solid var(--gold)",
                  fontFamily: "var(--font-syne)",
                  fontWeight: 800,
                  fontSize: 18,
                  color: "var(--gold)",
                  letterSpacing: "-0.5px",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {s.n}
              </div>

              {/* Content */}
              <div
                className="flex-1 p-6 max-[700px]:p-4"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                  <div
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-syne)",
                      color: "var(--text)",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {s.title}
                  </div>
                  <span
                    className="text-[11px] font-medium tracking-wide uppercase px-3 py-1 rounded-full whitespace-nowrap"
                    style={{
                      background: "var(--gold-dim)",
                      color: "var(--gold-light)",
                      border: "1px solid var(--gold-border)",
                    }}
                  >
                    {s.badge}
                  </span>
                </div>
                <p
                  className="text-sm font-light"
                  style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
