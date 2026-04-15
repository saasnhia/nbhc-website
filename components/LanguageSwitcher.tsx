"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../i18n/navigation";
import { useTransition } from "react";

type Props = {
  onSwitch?: () => void;
  size?: "sm" | "md";
};

export default function LanguageSwitcher({ onSwitch, size = "sm" }: Props) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const fontSize = size === "md" ? 14 : 12;

  const switchTo = (newLocale: "fr" | "en") => {
    if (newLocale === locale || isPending) {
      onSwitch?.();
      return;
    }
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
    onSwitch?.();
  };

  const linkStyle = (target: string): React.CSSProperties => ({
    cursor: "pointer",
    background: "transparent",
    border: "none",
    padding: 0,
    fontSize,
    fontWeight: 600,
    fontFamily: "var(--font-dm-sans)",
    color: locale === target ? "var(--text)" : "#8C8880",
    borderBottom: locale === target ? "1px solid var(--gold)" : "1px solid transparent",
    paddingBottom: 2,
    transition: "color 0.2s",
  });

  const gap = size === "md" ? "gap-3" : "gap-1.5";

  return (
    <div className={`flex items-center ${gap}`}>
      <button
        type="button"
        onClick={() => switchTo("fr")}
        style={linkStyle("fr")}
        aria-label="Français"
      >
        FR
      </button>
      <span style={{ color: "#3E3D3A", fontSize }}>|</span>
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
