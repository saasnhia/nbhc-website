"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../i18n/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (newLocale: "fr" | "en") => {
    if (newLocale === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const linkStyle = (target: string): React.CSSProperties => ({
    cursor: "pointer",
    background: "transparent",
    border: "none",
    padding: 0,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "var(--font-dm-sans)",
    color: locale === target ? "var(--text)" : "#8C8880",
    borderBottom: locale === target ? "1px solid var(--gold)" : "1px solid transparent",
    paddingBottom: 2,
    transition: "color 0.2s",
  });

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => switchTo("fr")}
        style={linkStyle("fr")}
        aria-label="Français"
      >
        FR
      </button>
      <span style={{ color: "#3E3D3A", fontSize: 12 }}>|</span>
      <button
        type="button"
        onClick={() => switchTo("en")}
        style={linkStyle("en")}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
}
