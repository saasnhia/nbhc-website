"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import gsap from "gsap";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ScrollLink = { kind: "scroll"; id: string; label: string };
type PageLink = { kind: "page"; href: string; label: string };
type NavLink = ScrollLink | PageLink;

export default function Nav() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const reduit = usePrefersReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  const homePath = `/${locale}`;
  const isOnHome = pathname === homePath || pathname === `${homePath}/`;

  const links: NavLink[] = [
    { kind: "scroll", id: "produits", label: t("products") },
    { kind: "scroll", id: "sur-mesure", label: t("custom") },
    { kind: "scroll", id: "comment-ca-marche", label: t("howItWorks") },
    { kind: "scroll", id: "faq", label: t("faq") },
    { kind: "page", href: `/${locale}/blog`, label: t("blog") },
  ];

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= (s as HTMLElement).offsetTop - 100) {
          current = s.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // La barre est fixe et ne bouge plus : ni entree animee, ni hauteur qui
  // change au defilement (une animation de `height` refaisait la mise en page
  // a chaque image), ni flou d'arriere-plan qui varie.

  // Mobile overlay animation
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tlRef.current = tl;

      // Ouverture du menu : un changement d'etat. En mouvement reduit il est
      // instantane. Un `fromTo` applique toujours son arrivee, donc l'overlay
      // s'ouvre dans les deux cas — il n'y a pas d'etat de depart orphelin.
      tl.fromTo(
        overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: reduit ? 0 : 0.5, ease: "power3.inOut" }
      );

      const navLinks = overlay.querySelectorAll("[data-mobile-link]");
      tl.fromTo(
        navLinks,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: reduit ? 0 : 0.4,
          stagger: reduit ? 0 : 0.08,
          ease: "power3.out",
        },
        reduit ? 0 : 0.3
      );
    }
  }, [menuOpen, reduit]);

  const closeMenu = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) {
      setMenuOpen(false);
      return;
    }

    gsap.to(overlay, {
      clipPath: "inset(0 0 100% 0)",
      duration: reduit ? 0 : 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        setMenuOpen(false);
        document.body.style.overflow = "";
      },
    });
  }, [reduit]);

  const scrollToSection = useCallback(
    (id: string, afterClose?: boolean) => {
      const doScroll = () => {
        const el = document.getElementById(id);
        if (!el) return;
        const bannerH =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--banner-h"
            )
          ) || 0;
        const navH = 64;
        const offset = bannerH + navH + 8;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      };

      if (afterClose) {
        // Wait for mobile overlay to close so body scroll is re-enabled
        setTimeout(doScroll, 450);
      } else {
        doScroll();
      }
    },
    []
  );

  const handleScrollClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    fromMobile = false
  ) => {
    if (isOnHome) {
      e.preventDefault();
      if (fromMobile) {
        closeMenu();
        scrollToSection(id, true);
      } else {
        scrollToSection(id);
      }
    } else if (fromMobile) {
      // Let navigation happen to /fr#id, but still close the menu
      closeMenu();
    }
  };

  const renderDesktopLink = (l: NavLink) => {
    if (l.kind === "scroll") {
      const href = isOnHome ? `#${l.id}` : `${homePath}#${l.id}`;
      return (
        <li key={`scroll-${l.id}`}>
          <a
            href={href}
            onClick={(e) => handleScrollClick(e, l.id)}
            data-cursor="link"
            className="text-sm no-underline transition-colors duration-200"
            style={{
              color:
                activeSection === l.id
                  ? "var(--text)"
                  : "var(--text-muted)",
            }}
          >
            {l.label}
          </a>
        </li>
      );
    }
    return (
      <li key={`page-${l.href}`}>
        <Link
          href={l.href}
          data-cursor="link"
          className="text-sm no-underline transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
        >
          {l.label}
        </Link>
      </li>
    );
  };

  const renderMobileLink = (l: NavLink) => {
    const style = {
      fontFamily: "var(--font-syne)",
      fontWeight: 600,
      fontSize: 32,
      color: "var(--text)",
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
    };

    if (l.kind === "scroll") {
      const href = isOnHome ? `#${l.id}` : `${homePath}#${l.id}`;
      return (
        <a
          key={`m-scroll-${l.id}`}
          href={href}
          data-mobile-link
          data-cursor="link"
          onClick={(e) => handleScrollClick(e, l.id, true)}
          className="no-underline block"
          style={style}
        >
          {l.label}
        </a>
      );
    }
    return (
      <Link
        key={`m-page-${l.href}`}
        href={l.href}
        data-mobile-link
        data-cursor="link"
        onClick={closeMenu}
        className="no-underline block"
        style={style}
      >
        {l.label}
      </Link>
    );
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 flex items-center justify-between px-10 max-[900px]:px-5"
        style={{
          top: "var(--banner-h, 0px)",
          height: 64,
          zIndex: 100,
          background: "rgba(9,9,11,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          isolation: "isolate",
          pointerEvents: "auto",
        }}
      >
        <Link
          href={`/${locale}`}
          data-cursor="link"
          className="no-underline flex items-center"
        >
          <Logo variant="nav" />
        </Link>

        <ul className="hidden min-[900px]:flex items-center gap-8 list-none">
          {links.map(renderDesktopLink)}
        </ul>

        {/* Mobile: LanguageSwitcher + hamburger visible in nav bar */}
        <div className="flex min-[900px]:hidden items-center gap-3">
          <LanguageSwitcher size="sm" />
          <button
            onClick={() => setMenuOpen(true)}
            data-cursor="link"
            className="flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
            aria-label={locale === "en" ? "Open menu" : "Ouvrir le menu"}
          >
            <span className="block w-5 h-0.5" style={{ background: "var(--gold)" }} />
            <span className="block w-5 h-0.5" style={{ background: "var(--gold)" }} />
            <span className="block w-5 h-0.5" style={{ background: "var(--gold)" }} />
          </button>
        </div>

        {/* Desktop: LanguageSwitcher + CTA */}
        <div className="hidden min-[900px]:flex items-center gap-4">
          <LanguageSwitcher size="md" />
          <a
            href="https://calendly.com/saasnhia/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="bouton-discret inline-flex items-center text-sm font-medium no-underline whitespace-nowrap"
            style={{ height: 36, padding: "0 16px", borderRadius: 8 }}
          >
            {t("cta")}
          </a>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 flex flex-col justify-center items-start px-10 max-[900px]:px-8"
          style={{
            background: "#09090b",
            overscrollBehavior: "contain",
            zIndex: 200,
            clipPath: "inset(0 0 100% 0)",
          }}
        >
          <button
            onClick={closeMenu}
            data-cursor="link"
            className="absolute top-5 right-6 p-2 bg-transparent border-none cursor-pointer"
            aria-label={locale === "en" ? "Close menu" : "Fermer le menu"}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="#C4973A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Language switcher — top of mobile menu */}
          <div
            className="self-center mb-8 pb-4"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <LanguageSwitcher size="md" onSwitch={closeMenu} />
          </div>

          <div className="flex flex-col gap-6">
            {links.map(renderMobileLink)}
            <a
              href="https://calendly.com/saasnhia/30min"
              target="_blank"
              rel="noopener noreferrer"
              data-mobile-link
              data-cursor="link"
              onClick={closeMenu}
              className="no-underline block"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 600,
                fontSize: 32,
                color: "var(--gold-light)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
