"use client";

import { useRef, useState, useEffect, FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectTypes = [
  "Agent IA métier",
  "Automatisation de flux",
  "SaaS B2B sur mesure",
  "Traitement média IA",
  "Autre",
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    nom: "",
    email: "",
    societe: "",
    message: "",
    typeProjet: projectTypes[0],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({
          nom: "",
          email: "",
          societe: "",
          message: "",
          typeProjet: projectTypes[0],
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // GSAP scroll reveal (replaces Framer Motion)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Animated gold line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { height: 0 },
          {
            height: 120,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    color: "var(--text)",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      data-cursor="contact"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        className="py-24 max-[900px]:py-16"
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1fr) minmax(0, 1fr)",
          gap: isMobile ? "40px" : "60px",
          alignItems: "start",
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "0 20px" : "0 40px",
        }}
      >
        <div ref={leftRef} style={{ opacity: 0 }}>
          <h2
            className="font-extrabold leading-none mb-6"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(40px, 5vw, 80px)",
              letterSpacing: "-3px",
              color: "var(--text)",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              hyphens: "auto",
            }}
          >
            Votre projet
            <br />
            <span style={{ color: "var(--gold)" }}>commence ici.</span>
          </h2>

          {/* Animated gold line */}
          <div
            ref={lineRef}
            style={{
              width: 2,
              height: 0,
              background: "var(--gold)",
              marginLeft: 40,
              marginBottom: 32,
            }}
          />

          <p
            className="text-base font-light"
            style={{
              color: "var(--text-muted)",
              maxWidth: 480,
              lineHeight: 1.6,
            }}
          >
            Décrivez-nous votre problème — on vous répond sous 24h avec une
            première approche technique et un chiffrage indicatif.
          </p>

          {/* Info block */}
          <div
            className="mt-10 p-6 max-[900px]:mt-8"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            <div
              className="text-[11px] tracking-widest uppercase mb-2"
              style={{ color: "var(--text-dim)" }}
            >
              Email direct
            </div>
            <a
              href="mailto:contact@nbhc.fr"
              data-cursor="link"
              className="font-semibold text-base no-underline block hover:opacity-80"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--gold)",
              }}
            >
              contact@nbhc.fr
            </a>
            <div
              className="mt-3 pt-3"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div
                className="text-[11px] tracking-widest uppercase mb-1"
                style={{ color: "var(--text-dim)" }}
              >
                SIREN
              </div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                102 637 899
              </div>
            </div>
            <div
              className="mt-3 pt-3"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div
                className="text-[11px] tracking-widest uppercase mb-1"
                style={{ color: "var(--text-dim)" }}
              >
                Siège
              </div>
              <div
                className="text-[13px] font-light leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                55 Rue Henri Clément
                <br />
                71100 Saint-Marcel
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-8"
          style={{
            opacity: 0,
            width: "100%",
            maxWidth: "100%",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
          }}
        >
          <div>
            <label
              className="block text-xs mb-1.5 tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              Nom *
            </label>
            <input
              type="text"
              name="nom"
              required
              value={form.nom}
              onChange={handleChange}
              placeholder="Votre nom"
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--gold)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--border)")
              }
            />
          </div>

          <div>
            <label
              className="block text-xs mb-1.5 tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="vous@entreprise.fr"
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--gold)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--border)")
              }
            />
          </div>

          <div>
            <label
              className="block text-xs mb-1.5 tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              Société
            </label>
            <input
              type="text"
              name="societe"
              value={form.societe}
              onChange={handleChange}
              placeholder="Nom de votre entreprise"
              style={inputStyle}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--gold)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--border)")
              }
            />
          </div>

          <div>
            <label
              className="block text-xs mb-1.5 tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              Type de projet
            </label>
            <select
              name="typeProjet"
              value={form.typeProjet}
              onChange={handleChange}
              style={{
                ...inputStyle,
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%238C8880' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
                paddingRight: 40,
              }}
            >
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-xs mb-1.5 tracking-wide"
              style={{ color: "var(--text-muted)" }}
            >
              Message *
            </label>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Décrivez votre besoin..."
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--gold)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--border)")
              }
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            data-cursor="link"
            className="flex items-center justify-center gap-2 text-[15px] font-medium px-7 py-3.5 rounded-md transition-all duration-200 cursor-pointer hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            style={{
              background: "var(--gold)",
              color: "#0a0a0b",
              border: "none",
            }}
          >
            {status === "loading" ? (
              <>
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="28"
                    strokeDashoffset="8"
                    strokeLinecap="round"
                  />
                </svg>
                Envoi en cours...
              </>
            ) : (
              "Envoyer le message"
            )}
          </button>

          {status === "success" && (
            <p
              className="text-sm font-medium mt-2 p-3 rounded-md"
              style={{
                color: "#4ade80",
                background: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              Message envoyé, on revient vers vous sous 24h.
            </p>
          )}

          {status === "error" && (
            <p
              className="text-sm font-medium mt-2 p-3 rounded-md"
              style={{
                color: "#f87171",
                background: "rgba(248,113,113,0.1)",
                border: "1px solid rgba(248,113,113,0.2)",
              }}
            >
              Erreur, réessayez ou écrivez directement à{" "}
              <a
                href="mailto:contact@nbhc.fr"
                data-cursor="link"
                style={{ color: "#f87171", textDecoration: "underline" }}
              >
                contact@nbhc.fr
              </a>
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
