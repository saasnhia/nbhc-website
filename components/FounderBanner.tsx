"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "nbhc-founder-banner-closed";

export default function FounderBanner() {
  const locale = useLocale();
  const t = useTranslations("globalBanner");
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Hydrate visibility from localStorage
    const closed = typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY);
    if (!closed) setVisible(true);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Expose banner height as CSS variable so fixed Nav can offset itself
  useEffect(() => {
    const root = document.documentElement;
    if (visible) {
      root.style.setProperty("--banner-h", "40px");
    } else {
      root.style.setProperty("--banner-h", "0px");
    }
    return () => {
      root.style.setProperty("--banner-h", "0px");
    };
  }, [visible]);

  const close = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  // Target: if already on /agentic-ai, scroll to #pricing; otherwise link to that section
  const isOnAgenticAi = pathname.includes("/agentic-ai");
  const href = isOnAgenticAi
    ? `/${locale}/agentic-ai#pricing`
    : `/${locale}/agentic-ai#pricing`;

  const text = isMobile ? t("textShort") : t("text");

  return (
    <div
      className="founder-banner-root"
      data-founder-banner
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 110,
        background: "linear-gradient(135deg, #C4973A 0%, #B8862E 100%)",
        transition: "background 0.2s",
        height: 40,
      }}
    >
      <Link
        href={href}
        aria-label={text}
        className="founder-banner-link block"
        style={{
          textDecoration: "none",
          color: "#09090b",
          padding: "8px 44px 8px 16px",
          minHeight: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
          fontFamily: "var(--font-dm-sans)",
          fontSize: isMobile ? 12 : 13,
          textAlign: "center",
          lineHeight: 1.3,
          cursor: "pointer",
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: "100%",
          }}
        >
          {text}
        </span>
      </Link>
      <button
        type="button"
        onClick={close}
        aria-label={t("close")}
        className="founder-banner-close"
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.6,
          transition: "opacity 0.2s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 3l8 8M11 3l-8 8"
            stroke="#09090b"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <style jsx>{`
        .founder-banner-root:hover {
          background: linear-gradient(135deg, #d1a947 0%, #c4973a 100%) !important;
          box-shadow: 0 2px 12px rgba(196, 151, 58, 0.3);
        }
        .founder-banner-close:hover {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
