"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Differentiators() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations("differentiators");

  const blocks = [
    { icon: t("block1Icon"), title: t("block1Title"), desc: t("block1Desc") },
    { icon: t("block2Icon"), title: t("block2Title"), desc: t("block2Desc") },
    { icon: t("block3Icon"), title: t("block3Title"), desc: t("block3Desc") },
    { icon: t("block4Icon"), title: t("block4Title"), desc: t("block4Desc") },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-diff-block]");
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
          stagger: 0.08,
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      id="pourquoi-nbhc"
      ref={sectionRef}
      className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
        style={{ color: "var(--gold)" }}
      >
        <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
        {t("eyebrow")}
      </div>
      <h2
        className="font-bold leading-tight mb-16"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 52px)",
          letterSpacing: "-1.5px",
          color: "var(--text)",
        }}
      >
        {t("title")}
      </h2>

      <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-x-12 gap-y-10 max-[900px]:gap-x-8">
        {blocks.map((b, i) => (
          <div key={i} data-diff-block className="flex gap-5 max-[700px]:gap-4">
            <div
              className="flex-shrink-0 flex items-center justify-center text-2xl"
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: "var(--gold-dim)",
                border: "1px solid var(--gold-border)",
              }}
            >
              {b.icon}
            </div>
            <div className="flex-1">
              <div
                className="text-lg font-bold mb-2"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "var(--text)",
                  letterSpacing: "-0.5px",
                }}
              >
                {b.title}
              </div>
              <p
                className="text-sm font-light"
                style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
              >
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
