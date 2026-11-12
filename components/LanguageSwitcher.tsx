"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../i18n/navigation";
import { useTransition } from "react";

type Props = {
  onSwitch?: () => void;
  size?: "sm" | "md";
};

/* Deux segments, la langue active sur une surface un cran plus claire. Plus de
   pastille en dégradé doré, plus d'ombre colorée, plus d'agrandissement au
   survol ; le libellé ne descend plus sous 12 px. */
export default function LanguageSwitcher({ onSwitch }: Props) {
  const locale = useLocale() as "fr" | "en";
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isFr = locale === "fr";

  const toggle = () => {
    if (isPending) return;
    const next: "fr" | "en" = isFr ? "en" : "fr";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
    onSwitch?.();
  };

  const segment = (actif: boolean): React.CSSProperties => ({
    width: 32,
    height: 26,
    borderRadius: 6,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 500,
    color: actif ? "var(--text)" : "var(--text-muted)",
    background: actif ? "var(--card-hover)" : "transparent",
    transition: "background-color 150ms ease-out, color 150ms ease-out",
  });

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isFr ? "Switch to English" : "Passer en français"}
      data-lang-switcher
      className="inline-flex items-center"
      style={{
        gap: 2,
        padding: 2,
        background: "transparent",
        border: "1px solid var(--border-accent)",
        borderRadius: 8,
        cursor: isPending ? "wait" : "pointer",
        flexShrink: 0,
      }}
    >
      <span aria-hidden style={segment(isFr)}>
        FR
      </span>
      <span aria-hidden style={segment(!isFr)}>
        EN
      </span>
    </button>
  );
}
