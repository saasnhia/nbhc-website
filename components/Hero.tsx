"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import AgentFlowIllustration from "./AgentFlowIllustration";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const circle1Ref = useRef<SVGSVGElement>(null);
  const circle2Ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = sectionRef.current;
      if (!el) return;

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        el.querySelector("[data-eyebrow]"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.7 },
        0
      );

      tl.fromTo(
        el.querySelectorAll("[data-hero-line]"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        0.15
      );

      tl.fromTo(
        el.querySelector("[data-subtitle]"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.6
      );

      tl.fromTo(
        el.querySelector("[data-flow]"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.75
      );

      tl.fromTo(
        el.querySelector("[data-ctas]"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.0
      );

      tl.fromTo(
        el.querySelector("[data-trust]"),
        { opacity: 0 },
        { opacity: 0.5, duration: 0.6 },
        1.15
      );

      if (circle1Ref.current) {
        gsap.to(circle1Ref.current, { rotation: 360, duration: 40, repeat: -1, ease: "none" });
      }
      if (circle2Ref.current) {
        gsap.to(circle2Ref.current, { rotation: -360, duration: 60, repeat: -1, ease: "none" });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Decorative circles */}
      <svg
        ref={circle1Ref}
        width="600"
        height="600"
        viewBox="0 0 600 600"
        fill="none"
        className="absolute pointer-events-none"
        style={{ right: "-12%", bottom: "-25%", opacity: 0.05 }}
      >
        <circle cx="300" cy="300" r="298" stroke="#C4973A" strokeWidth="1" />
        <circle cx="300" cy="300" r="240" stroke="#C4973A" strokeWidth="0.5" />
      </svg>
      <svg
        ref={circle2Ref}
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
        className="absolute pointer-events-none"
        style={{ left: "-10%", top: "10%", opacity: 0.04 }}
      >
        <circle cx="200" cy="200" r="198" stroke="#C4973A" strokeWidth="1" />
        <circle cx="200" cy="200" r="150" stroke="#C4973A" strokeWidth="0.5" />
      </svg>

      <div
        className="min-h-screen flex flex-col justify-center items-center px-10 max-[900px]:px-5 pt-28 pb-16 max-[900px]:pt-24 max-[900px]:pb-12 relative z-1 text-center"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          data-eyebrow
          className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-7"
          style={{ color: "var(--gold)", opacity: 0 }}
        >
          <span className="block w-6 h-px" style={{ background: "var(--gold)" }} />
          AGENTIC AI AS A SERVICE
        </div>

        <h1
          className="font-extrabold mb-7"
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(32px, 6.5vw, 78px)",
            lineHeight: "1.05",
            letterSpacing: "-2.5px",
            color: "var(--text)",
            maxWidth: 1000,
          }}
        >
          <span data-hero-line style={{ display: "block", opacity: 0 }}>
            Vos équipes passent des heures
          </span>
          <span data-hero-line style={{ display: "block", opacity: 0 }}>
            sur des tâches que
          </span>
          <span data-hero-line style={{ display: "block", opacity: 0, color: "var(--gold)" }}>
            des agents IA font en secondes.
          </span>
        </h1>

        <p
          data-subtitle
          className="text-lg font-light mb-12 max-[900px]:mb-10"
          style={{
            color: "var(--text-muted)",
            maxWidth: 680,
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          NBHC conçoit et déploie des équipes d&apos;agents IA dans votre entreprise —
          connectés à vos outils, opérés par nos soins, conformes RGPD.
        </p>

        {/* Interactive flow diagram */}
        <div data-flow className="w-full mb-12 max-[900px]:mb-10" style={{ opacity: 0 }}>
          <AgentFlowIllustration />
        </div>

        {/* CTAs */}
        <div
          data-ctas
          className="flex items-center justify-center gap-4 flex-wrap"
          style={{ opacity: 0 }}
        >
          <Link
            href="/contact"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md no-underline transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--gold)", color: "#0a0a0b", border: "none" }}
          >
            Réserver mon diagnostic gratuit
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 7h10M7 2l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <a
            href="#how-it-works"
            data-cursor="link"
            className="inline-flex items-center gap-2 text-[15px] font-normal px-7 py-3.5 rounded-md no-underline transition-all duration-200"
            style={{
              background: "transparent",
              color: "var(--text-muted)",
              border: "1px solid var(--border-accent)",
            }}
          >
            Voir comment ça marche ↓
          </a>
        </div>

        <div
          data-trust
          className="flex items-center justify-center gap-2 mt-10 text-xs flex-wrap"
          style={{
            color: "var(--text-dim)",
            opacity: 0,
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.5px",
          }}
        >
          <span>Hébergé en France</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>RGPD</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>Mistral AI</span>
          <span style={{ opacity: 0.3 }}>·</span>
          <span>Next.js</span>
        </div>
      </div>
    </section>
  );
}
