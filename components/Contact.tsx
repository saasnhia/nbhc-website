"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";

const projectTypes = [
  "Agent IA métier",
  "Automatisation de flux",
  "SaaS B2B sur mesure",
  "Traitement média IA",
  "Autre",
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
      ref={ref}
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div
        className="py-24 px-10 max-md:px-5 max-md:py-16 grid grid-cols-[1fr_auto] max-md:grid-cols-1 gap-16 items-start"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div
            className="text-[11px] font-medium tracking-[3px] uppercase mb-5 flex items-center gap-2"
            style={{ color: "var(--gold)" }}
          >
            <span
              className="block w-4 h-px"
              style={{ background: "var(--gold)" }}
            />
            Démarrer
          </div>
          <h2
            className="font-extrabold leading-none mb-4"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(36px, 4vw, 56px)",
              letterSpacing: "-2px",
              color: "var(--text)",
              maxWidth: 640,
            }}
          >
            Votre prochain outil
            <br />
            <em className="not-italic" style={{ color: "var(--gold)" }}>
              IA commence ici.
            </em>
          </h2>
          <p
            className="text-base font-light mt-4"
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
            className="mt-10 p-6 max-md:mt-8"
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
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="min-w-[340px] max-md:min-w-0 w-full max-w-[440px] flex flex-col gap-4"
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
                style={{ color: "#f87171", textDecoration: "underline" }}
              >
                contact@nbhc.fr
              </a>
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
