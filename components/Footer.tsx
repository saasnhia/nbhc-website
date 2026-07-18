"use client";

import { useEffect, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import Logo from "./Logo";

const marqueeText = "NBHC · STUDIO IA · FRANCE · ";
const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

export default function Footer() {
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("footer");
  const locale = useLocale();

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      x: "-50%",
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  const navLinks = [
    { href: `/${locale}#comment-ca-marche`, label: t("howItWorks") },
    { href: `/${locale}#secteurs`, label: t("sectors") },
    { href: `/${locale}/tarifs`, label: t("pricing") },
    { href: `/${locale}#produits`, label: t("products") },
    { href: `/${locale}#faq`, label: t("faq") },
    { href: `/${locale}/blog`, label: t("blog") },
  ];

  const productLinks = [
    { href: "https://devizly.fr", label: t("devizly"), external: true },
    { href: "https://vlogyz.com", label: t("vlogyz"), external: true },
  ];

  const contactLinks = [
    { href: CALENDLY_URL, label: t("diagnostic"), external: true },
    { href: "mailto:contact@nbhc.fr", label: t("email"), external: false },
    {
      href: "https://www.linkedin.com/company/nbhc",
      label: t("linkedin"),
      external: true,
    },
    { href: "https://x.com/harounNbhc", label: t("twitter"), external: true },
  ];

  return (
    <>
      {/* Giant marquee above footer */}
      <div
        className="overflow-hidden"
        style={{
          pointerEvents: "none",
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "24px 0",
        }}
      >
        <div ref={marqueeTrackRef} style={{ display: "flex", width: "max-content" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 800,
                fontSize: "clamp(48px, 6vw, 80px)",
                color: "rgba(196, 151, 58, 0.08)",
                letterSpacing: "-2px",
                paddingRight: 32,
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      <footer
        style={{
          borderTop: "1px solid var(--border)",
          background: "var(--surface)",
        }}
      >
        <div
          className="grid gap-10 py-14 px-10 max-[900px]:px-5 max-[900px]:py-10 max-[900px]:gap-8"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          }}
        >
          {/* Brand */}
          <div className="flex flex-col gap-3 max-[900px]:col-span-full">
            <Logo variant="footer" />
            <div
              className="text-[13px]"
              style={{ color: "var(--text-dim)", lineHeight: 1.5 }}
            >
              {t("tagline")}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3 max-[900px]:col-span-2 max-[600px]:col-span-full">
            <div
              className="text-[11px] tracking-widest uppercase mb-1"
              style={{ color: "var(--gold)" }}
            >
              {t("navTitle")}
            </div>
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                data-cursor="link"
                className="text-[13px] no-underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Products */}
          <div className="flex flex-col gap-3">
            <div
              className="text-[11px] tracking-widest uppercase mb-1"
              style={{ color: "var(--gold)" }}
            >
              {t("productsTitle")}
            </div>
            {productLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                data-cursor="link"
                className="text-[13px] no-underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <div
              className="text-[11px] tracking-widest uppercase mb-1"
              style={{ color: "var(--gold)" }}
            >
              {t("contactTitle")}
            </div>
            {contactLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                data-cursor="link"
                className="text-[13px] no-underline hover:opacity-80 transition-opacity"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="px-10 max-[900px]:px-5" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              paddingTop: 12,
              marginBottom: 0,
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              alignItems: "center",
              fontSize: 12,
            }}
          >
            {[
              { href: `/${locale}/mentions-legales`, label: t("legal") },
              { href: `/${locale}/politique-confidentialite`, label: t("privacy") },
              { href: `/${locale}/cgv`, label: t("cgv") },
              { href: `/${locale}/cgu`, label: t("cgu") },
            ].map((l, i, arr) => (
              <span key={l.label}>
                <a
                  href={l.href}
                  className="no-underline hover:opacity-80"
                  style={{ color: "var(--text-dim)" }}
                >
                  {l.label}
                </a>
                {i < arr.length - 1 && (
                  <span style={{ color: "var(--text-dim)", margin: "0 6px" }}>·</span>
                )}
              </span>
            ))}
          </div>
          <div className="text-xs py-5" style={{ color: "var(--text-dim)" }}>
            {t("copyright")}
          </div>
        </div>
      </footer>
    </>
  );
}
