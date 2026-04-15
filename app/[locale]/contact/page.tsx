"use client";

import { useState, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

const planLabels: Record<string, string> = {
  starter: "Starter",
  growth: "Growth",
  enterprise: "Enterprise",
};

const sectors = [
  "Comptabilité & Finance",
  "Artisans & BTP",
  "Créateurs & Médias",
  "E-commerce & Retail",
  "Juridique & RH",
  "Autre",
];

const teamSizes = ["1-5", "6-20", "21-50", "50+"];

const sources = [
  "Recherche Google",
  "LinkedIn",
  "Bouche à oreille",
  "Article / Blog",
  "Autre",
];

type Status = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}

function ContactPageInner() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan");
  const planKey = planParam && planLabels[planParam] ? planParam : null;
  const planLabel = planKey ? planLabels[planKey] : null;
  const tp = useTranslations("pricing");

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    societe: "",
    secteur: sectors[0],
    taille: teamSizes[0],
    tache: "",
    source: sources[0],
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
      // Map new fields onto existing API contract (nom, email, societe, message, typeProjet)
      const planPrefix = planLabel ? `[FONDATEUR · ${planLabel}] ` : "";
      const payload = {
        nom: `${form.prenom} ${form.nom}`.trim(),
        email: form.email,
        societe: form.societe,
        typeProjet: `${planPrefix}${form.secteur} · ${form.taille} pers. · via ${form.source}`,
        message: form.tache,
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({
          prenom: "",
          nom: "",
          email: "",
          societe: "",
          secteur: sectors[0],
          taille: teamSizes[0],
          tache: "",
          source: sources[0],
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

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%238C8880' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 16px center",
    paddingRight: 40,
  };

  return (
    <main>
      <Nav />
      <section
        className="pt-36 pb-24 px-10 max-[900px]:px-5 max-[900px]:pt-28 max-[900px]:pb-16"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div
          className="grid gap-16 max-[900px]:gap-10"
          style={{ gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.1fr)" }}
        >
          {/* LEFT — Reassurance */}
          <div className="max-[900px]:col-span-full">
            <div
              className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase mb-6"
              style={{ color: "var(--gold)" }}
            >
              <span
                className="block w-6 h-px"
                style={{ background: "var(--gold)" }}
              />
              Diagnostic gratuit
            </div>
            <h1
              className="font-extrabold mb-6"
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(34px, 5vw, 64px)",
                letterSpacing: "-2.5px",
                lineHeight: 1.05,
                color: "var(--text)",
              }}
            >
              Diagnostic gratuit.{" "}
              <span style={{ color: "var(--gold)" }}>30 minutes.</span>
            </h1>
            <p
              className="text-[17px] font-light mb-10"
              style={{ color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 480 }}
            >
              On analyse vos flux de travail et on vous dit exactement quels agents
              IA peuvent automatiser vos tâches — sans jargon technique.
            </p>

            {/* 3 steps */}
            <ol className="space-y-5 mb-10">
              {[
                "Vous décrivez vos tâches répétitives",
                "On identifie les opportunités d'agents IA",
                "On vous remet un plan d'action concret",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold"
                    style={{
                      background: "var(--gold-dim)",
                      color: "var(--gold-light)",
                      border: "1px solid var(--gold-border)",
                      fontFamily: "var(--font-syne)",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-sm font-light pt-1.5"
                    style={{ color: "var(--text)" }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            {/* Reassurance bloc */}
            <div
              className="p-6 mb-8"
              style={{
                background: "rgba(34,197,94,0.04)",
                border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "var(--radius)",
              }}
            >
              <ul className="space-y-2.5">
                {[
                  "Aucun engagement après le diagnostic",
                  "Réponse sous 24h",
                  "Hébergé en France, données RGPD",
                ].map((r) => (
                  <li
                    key={r}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: "var(--text)" }}
                  >
                    <span style={{ color: "#4ade80" }}>✓</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct contact */}
            <div
              className="p-5"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
            >
              <div
                className="text-[10px] tracking-widest uppercase mb-1"
                style={{ color: "var(--text-dim)" }}
              >
                Contact direct
              </div>
              <a
                href="mailto:contact@nbhc.fr"
                data-cursor="link"
                className="font-bold text-base no-underline block hover:opacity-80"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "var(--gold)",
                }}
              >
                contact@nbhc.fr
              </a>
              <div
                className="text-[11px] mt-2"
                style={{ color: "var(--text-dim)" }}
              >
                SAS NBHC · SIREN 102 637 899
              </div>
            </div>
          </div>

          {/* RIGHT — Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-8 max-[900px]:p-6"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              alignSelf: "start",
            }}
          >
            {planLabel && (
              <div
                className="flex items-center gap-2.5 mb-2 px-4 py-3 rounded-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(196,151,58,0.12) 0%, rgba(196,151,58,0.04) 100%)",
                  border: "1px solid rgba(196,151,58,0.35)",
                }}
              >
                <span style={{ fontSize: 18 }}>🎯</span>
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: "var(--gold-light)" }}
                >
                  {tp("leadBadge", { plan: planLabel })}
                </span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              <div>
                <label
                  className="block text-xs mb-1.5 tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  Prénom *
                </label>
                <input
                  type="text"
                  name="prenom"
                  required
                  value={form.prenom}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
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
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-xs mb-1.5 tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                Email professionnel *
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="vous@entreprise.fr"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <label
                className="block text-xs mb-1.5 tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                Entreprise *
              </label>
              <input
                type="text"
                name="societe"
                required
                value={form.societe}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              <div>
                <label
                  className="block text-xs mb-1.5 tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  Secteur d&apos;activité
                </label>
                <select
                  name="secteur"
                  value={form.secteur}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  {sectors.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  className="block text-xs mb-1.5 tracking-wide"
                  style={{ color: "var(--text-muted)" }}
                >
                  Taille d&apos;équipe
                </label>
                <select
                  name="taille"
                  value={form.taille}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  {teamSizes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                className="block text-xs mb-1.5 tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                Ma principale tâche répétitive *
              </label>
              <textarea
                name="tache"
                required
                value={form.tache}
                onChange={handleChange}
                rows={5}
                placeholder="Ex: Je passe 3h par semaine à faire des devis manuellement et relancer mes clients..."
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--gold)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <div>
              <label
                className="block text-xs mb-1.5 tracking-wide"
                style={{ color: "var(--text-muted)" }}
              >
                Comment vous nous avez trouvés
              </label>
              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                style={selectStyle}
              >
                {sources.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
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
              {status === "loading"
                ? "Envoi en cours..."
                : "Demander mon diagnostic gratuit →"}
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
                Demande reçue. On revient vers vous sous 24h.
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
                Erreur, réessayez ou écrivez à{" "}
                <a
                  href="mailto:contact@nbhc.fr"
                  style={{ color: "#f87171", textDecoration: "underline" }}
                >
                  contact@nbhc.fr
                </a>
              </p>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
