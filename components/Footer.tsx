"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Logo from "./Logo";

const marqueeText = "NBHC \u00B7 STUDIO IA \u00B7 FRANCE \u00B7 ";

export default function Footer() {
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

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
        <div
          ref={marqueeTrackRef}
          style={{ display: "flex", width: "max-content" }}
        >
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
          className="flex items-center justify-between flex-wrap gap-6 py-12 px-10 max-[900px]:px-5 max-[900px]:flex-col max-[900px]:items-start"
          style={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <div className="flex flex-col gap-2">
            <Logo variant="footer" />
            <div className="text-[13px]" style={{ color: "var(--text-dim)" }}>
              Studio IA & Automatisation · France
            </div>
          </div>
          <div className="flex items-center gap-8 flex-wrap">
            <div className="flex gap-6">
              {[
                { href: "#approche", label: "Approche" },
                { href: "#produits", label: "Produits" },
                { href: "#services", label: "Services" },
                { href: "/blog", label: "Blog" },
                { href: "/faq", label: "FAQ" },
                { href: "mailto:contact@nbhc.fr", label: "Contact" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  data-cursor="link"
                  className="text-[13px] no-underline hover:opacity-80"
                  style={{ color: "var(--text-muted)" }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className="px-10 max-[900px]:px-5"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
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
              { href: "/mentions-legales", label: "Mentions légales" },
              { href: "/politique-confidentialite", label: "Politique de confidentialité" },
              { href: "/cgv", label: "CGV" },
              { href: "/cgu", label: "CGU" },
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
          <div
            className="text-xs py-5"
            style={{ color: "var(--text-dim)" }}
          >
            © 2026 SAS NBHC — SIREN 102 637 899 · 55 Rue Henri Clément, 71100
            Saint-Marcel · Tous droits réservés
          </div>
        </div>
      </footer>
    </>
  );
}
