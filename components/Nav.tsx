"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "#approche", label: "Approche" },
  { href: "#produits", label: "Produits" },
  { href: "#services", label: "Services" },
  { href: "/agentic-ai", label: "AaaS" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

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

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.set(nav, { y: -64, opacity: 0 });
    gsap.to(nav, { y: 0, opacity: 1, duration: 0.5, delay: 0.2 });

    const st = ScrollTrigger.create({
      start: "80px top",
      onUpdate: (self) => {
        const scrolled = self.progress > 0;
        gsap.to(nav, {
          height: scrolled ? 52 : 64,
          duration: 0.3,
          ease: "power2.out",
        });
        nav.style.background = scrolled
          ? "rgba(9,9,11,0.95)"
          : "rgba(9,9,11,0.85)";
        nav.style.backdropFilter = scrolled ? "blur(30px)" : "blur(20px)";
        nav.style.borderBottomColor = scrolled
          ? "var(--border-accent)"
          : "var(--border)";
      },
    });

    return () => st.kill();
  }, []);

  // Mobile overlay animation
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.fromTo(
        overlay,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power3.inOut" }
      );

      const navLinks = overlay.querySelectorAll("[data-mobile-link]");
      tl.fromTo(
        navLinks,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" },
        0.3
      );
    }
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) {
      setMenuOpen(false);
      return;
    }

    gsap.to(overlay, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        setMenuOpen(false);
        document.body.style.overflow = "";
      },
    });
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-10 max-[900px]:px-5"
        style={{
          height: 64,
          background: "rgba(9,9,11,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        }}
      >
        <a
          href="#"
          data-cursor="link"
          className="no-underline flex items-center"
        >
          <Logo variant="nav" />
        </a>

        <ul className="hidden min-[900px]:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-cursor="link"
                className="text-sm no-underline transition-colors duration-200"
                style={{
                  color:
                    activeSection === l.href.slice(1)
                      ? "var(--text)"
                      : "var(--text-muted)",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          data-cursor="link"
          className="min-[900px]:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5" style={{ background: "var(--gold)" }} />
          <span className="block w-5 h-0.5" style={{ background: "var(--gold)" }} />
          <span className="block w-5 h-0.5" style={{ background: "var(--gold)" }} />
        </button>

        <MagneticButton
          href="#contact"
          data-cursor="link"
          className="hidden min-[900px]:inline-flex text-sm font-medium px-5 py-2 rounded-md no-underline transition-all duration-200 whitespace-nowrap hover:opacity-90"
          style={{
            background: "var(--gold-dim)",
            color: "var(--gold-light)",
            border: "1px solid var(--gold-border)",
          }}
        >
          Discuter du projet →
        </MagneticButton>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 flex flex-col justify-center items-start px-10 max-[900px]:px-8"
          style={{
            background: "#09090b",
            zIndex: 200,
            clipPath: "inset(0 0 100% 0)",
          }}
        >
          <button
            onClick={closeMenu}
            data-cursor="link"
            className="absolute top-5 right-6 p-2 bg-transparent border-none cursor-pointer"
            aria-label="Fermer"
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

          <div className="flex flex-col gap-6">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-mobile-link
                data-cursor="link"
                onClick={closeMenu}
                className="no-underline block"
                style={{
                  fontFamily: "var(--font-syne)",
                  fontWeight: 700,
                  fontSize: 48,
                  color: "var(--text)",
                  letterSpacing: "-2px",
                  lineHeight: 1.1,
                }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              data-mobile-link
              data-cursor="link"
              onClick={closeMenu}
              className="no-underline block"
              style={{
                fontFamily: "var(--font-syne)",
                fontWeight: 700,
                fontSize: 48,
                color: "var(--gold)",
                letterSpacing: "-2px",
                lineHeight: 1.1,
              }}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </>
  );
}
