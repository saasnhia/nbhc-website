"use client";

import React, { ComponentType, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import VlogyzMockup from "./mockups/VlogyzMockup";
import DevizlyMockup from "./mockups/DevizlyMockup";

type Product = {
  id: string;
  badgeKey: "live" | "soon";
  badgeLabel: string;
  name: string;
  tagline: string;
  Mockup: ComponentType;
  link: string;
  href: string;
  accent: string;
  textSide: "left" | "right";
};

const statusBadge: Record<string, React.CSSProperties> = {
  live: {
    background: "rgba(34,197,94,0.12)",
    color: "#4ade80",
    border: "1px solid rgba(34,197,94,0.2)",
  },
  soon: {
    background: "rgba(99,102,241,0.12)",
    color: "#818cf8",
    border: "1px solid rgba(99,102,241,0.2)",
  },
};

function TextColumn({ p }: { p: Product }) {
  const isExternal = p.href !== "#";
  return (
    <motion.div
      initial={{ opacity: 0, x: p.textSide === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="flex flex-col justify-center"
    >
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <span
          className="inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full tracking-wide"
          style={statusBadge[p.badgeKey]}
        >
          {p.badgeLabel}
        </span>
      </div>
      <h3
        className="font-extrabold mb-4"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px,3vw,42px)",
          lineHeight: 1.0,
          letterSpacing: "-1.5px",
          color: "var(--text)",
        }}
      >
        {p.name}
      </h3>
      <p
        className="text-[15px] font-light mb-7"
        style={{ color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 460 }}
      >
        {p.tagline}
      </p>
      <a
        href={p.href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        data-cursor="link"
        className="inline-flex items-center gap-1.5 text-[14px] no-underline w-fit group"
        style={{ color: p.accent, fontWeight: 600 }}
      >
        {p.link}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-200 group-hover:translate-x-1"
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
    </motion.div>
  );
}

function MockupColumn({ p }: { p: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const Mockup = p.Mockup;

  return (
    <div ref={ref} className="relative" style={{ overflow: "visible" }}>
      <div
        className="absolute pointer-events-none hidden lg:block"
        aria-hidden
        style={{
          inset: "-8%",
          background: `radial-gradient(circle, ${p.accent}1F 0%, transparent 70%)`,
          filter: "blur(60px)",
          zIndex: -1,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Mockup />
      </motion.div>
    </div>
  );
}

function ProductSection({ p }: { p: Product }) {
  const textOnLeft = p.textSide === "left";
  return (
    <div className="py-16 lg:py-24">
      <div className="grid gap-12 lg:gap-16 items-center lg:grid-cols-[minmax(0,40fr)_minmax(0,60fr)]">
        <div style={{ order: textOnLeft ? 0 : 1 }} className="max-lg:order-2">
          <TextColumn p={p} />
        </div>
        <div style={{ order: textOnLeft ? 1 : 0 }} className="max-lg:order-1">
          <MockupColumn p={p} />
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const t = useTranslations("products");

  const products: Product[] = [
    {
      id: "devizly",
      badgeKey: "live",
      badgeLabel: t("devizlyBadge"),
      name: t("devizlyName"),
      tagline: t("devizlyDesc"),
      Mockup: DevizlyMockup,
      link: t("devizlyLink"),
      href: "https://devizly.fr",
      accent: "#5B5BD6",
      textSide: "left",
    },
    {
      id: "vlogyz",
      badgeKey: "soon",
      badgeLabel: t("vlogyzBadge"),
      name: t("vlogyzName"),
      tagline: t("vlogyzDesc"),
      Mockup: VlogyzMockup,
      link: t("vlogyzLink"),
      href: "https://vlogyz.com",
      accent: "#6366f1",
      textSide: "right",
    },
  ];

  return (
    <section
      id="produits"
      className="relative"
      style={{
        background: "#09090b",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto py-24 md:py-28 px-6" style={{ maxWidth: 1200 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16"
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
              fontSize: "clamp(32px,4vw,52px)",
              letterSpacing: "-1.5px",
              color: "var(--text)",
            }}
          >
            {t("title")}
          </h2>
          <p
            className="text-[16px] font-light"
            style={{ color: "var(--text-muted)", maxWidth: 700, lineHeight: 1.7 }}
          >
            {t("subtitle")}
          </p>
        </motion.div>

        {products.map((p, i) => (
          <div key={p.id}>
            <ProductSection p={p} />
            {i < products.length - 1 && (
              <div
                aria-hidden
                style={{
                  height: 1,
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
