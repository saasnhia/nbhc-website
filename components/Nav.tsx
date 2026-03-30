"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "./Logo";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "#approche", label: "Approche" },
  { href: "#produits", label: "Produits" },
  { href: "#services", label: "Services" },
];

export default function Nav() {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

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

    // Initial state
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

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-10 max-md:px-5"
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
        className="font-[var(--font-syne)] font-extrabold text-xl tracking-tight no-underline flex items-center gap-2"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text)" }}
      >
        <Logo size={36} />
        N<span style={{ color: "var(--gold)" }}>B</span>HC
      </a>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
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

      {/* Mobile menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
        aria-label="Menu"
      >
        <span
          className="block w-5 h-0.5 transition-transform duration-200"
          style={{
            background: "var(--text-muted)",
            transform: menuOpen ? "rotate(45deg) translate(2px, 4px)" : "none",
          }}
        />
        <span
          className="block w-5 h-0.5 transition-opacity duration-200"
          style={{
            background: "var(--text-muted)",
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-5 h-0.5 transition-transform duration-200"
          style={{
            background: "var(--text-muted)",
            transform: menuOpen
              ? "rotate(-45deg) translate(2px, -4px)"
              : "none",
          }}
        />
      </button>

      <MagneticButton
        href="#contact"
        className="hidden md:inline-flex text-sm font-medium px-5 py-2 rounded-md no-underline transition-all duration-200 whitespace-nowrap hover:opacity-90"
        style={{
          background: "var(--gold-dim)",
          color: "var(--gold-light)",
          border: "1px solid var(--gold-border)",
        }}
      >
        Discuter du projet →
      </MagneticButton>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="absolute top-16 left-0 right-0 md:hidden flex flex-col gap-4 p-6"
          style={{
            background: "rgba(9,9,11,0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base no-underline"
              style={{ color: "var(--text-muted)" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-sm font-medium px-5 py-2 rounded-md no-underline text-center mt-2"
            style={{
              background: "var(--gold-dim)",
              color: "var(--gold-light)",
              border: "1px solid var(--gold-border)",
            }}
          >
            Discuter du projet →
          </a>
        </div>
      )}
    </nav>
  );
}
