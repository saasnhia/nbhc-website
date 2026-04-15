"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../i18n/navigation";
import { useTransition } from "react";

type Props = {
  onSwitch?: () => void;
  size?: "sm" | "md";
};

export default function LanguageSwitcher({ onSwitch, size = "md" }: Props) {
  const locale = useLocale() as "fr" | "en";
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isFr = locale === "fr";

  // Dimensions per size
  const dims =
    size === "sm"
      ? { width: 56, height: 26, ballW: 26, ballH: 22, font: 10 }
      : { width: 64, height: 28, ballW: 30, ballH: 24, font: 11 };

  const toggle = () => {
    if (isPending) return;
    const next: "fr" | "en" = isFr ? "en" : "fr";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
    onSwitch?.();
  };

  // Ball position: 2px from left when FR, or width - ballW - 2px when EN
  const ballLeft = isFr ? 2 : dims.width - dims.ballW - 2;

  const ariaLabel = isFr ? "Switch to English" : "Passer en français";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={ariaLabel}
      aria-pressed={!isFr}
      className="lang-toggle group relative block"
      style={{
        width: dims.width,
        height: dims.height,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 999,
        padding: 0,
        cursor: isPending ? "wait" : "pointer",
        transition: "transform 0.2s, background 0.2s",
        flexShrink: 0,
      }}
    >
      {/* Sliding ball */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          left: ballLeft,
          width: dims.ballW,
          height: dims.ballH,
          transform: "translateY(-50%)",
          background: "linear-gradient(135deg, #C4973A 0%, #B8862E 100%)",
          borderRadius: 999,
          boxShadow: "0 2px 8px rgba(196,151,58,0.4)",
          transition: "left 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: "none",
        }}
      />

      {/* Labels */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-between pointer-events-none"
        style={{ padding: "0 8px" }}
      >
        <span
          style={{
            fontSize: dims.font,
            fontWeight: 700,
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.05em",
            color: isFr ? "#ffffff" : "#8C8880",
            transition: "color 0.3s",
            zIndex: 1,
          }}
        >
          FR
        </span>
        <span
          style={{
            fontSize: dims.font,
            fontWeight: 700,
            fontFamily: "var(--font-dm-sans)",
            letterSpacing: "0.05em",
            color: !isFr ? "#ffffff" : "#8C8880",
            transition: "color 0.3s",
            zIndex: 1,
          }}
        >
          EN
        </span>
      </span>

      <style jsx>{`
        .lang-toggle:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.08) !important;
        }
      `}</style>
    </button>
  );
}
