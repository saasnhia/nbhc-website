"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    icon: "🧠",
    title: "On cartographie votre problème",
    desc: "En 30 minutes, on identifie exactement quelles tâches répétitives vous font perdre du temps et ce que des agents IA peuvent automatiser.",
    visual: "diagnostic",
  },
  {
    n: "02",
    icon: "⚙️",
    title: "On déploie votre équipe d'agents",
    desc: "En 2 à 4 semaines, vos agents sont opérationnels. Connectés à vos outils existants (email, ERP, CRM). Testés et validés.",
    visual: "agents",
  },
  {
    n: "03",
    icon: "📈",
    title: "Vous gagnez en efficacité chaque jour",
    desc: "Vos agents travaillent en continu. Nous monitorons les performances et améliorons les modèles. Vous consommez les résultats.",
    visual: "metrics",
  },
];

function StepVisual({ kind }: { kind: string }) {
  if (kind === "diagnostic") {
    return (
      <div
        className="p-4 mt-5"
        style={{
          background: "#0d0d12",
          border: "1px solid var(--border)",
          borderRadius: 8,
        }}
      >
        <div
          className="text-[9px] uppercase tracking-widest mb-3"
          style={{ color: "var(--gold)", opacity: 0.6 }}
        >
          Diagnostic NBHC
        </div>
        <div className="space-y-2.5">
          {[
            { label: "Secteur", value: "Votre métier" },
            { label: "Tâches identifiées", value: "12" },
            { label: "Heures récupérables", value: "≈ 80h / mois" },
            { label: "Périmètre", value: "Validé sous 48h" },
          ].map((f) => (
            <div key={f.label}>
              <div className="text-[9px]" style={{ color: "var(--text-dim)" }}>
                {f.label}
              </div>
              <div className="text-[11px] font-medium" style={{ color: "var(--text)" }}>
                {f.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (kind === "agents") {
    return (
      <div
        className="p-4 mt-5"
        style={{
          background: "#0d0d12",
          border: "1px solid var(--border)",
          borderRadius: 8,
        }}
      >
        <div
          className="text-[9px] uppercase tracking-widest mb-3"
          style={{ color: "var(--gold)", opacity: 0.6 }}
        >
          Agents déployés
        </div>
        <div className="space-y-2">
          {["Agent #1", "Agent #2", "Agent #3"].map((a) => (
            <div
              key={a}
              className="flex items-center justify-between p-2 rounded"
              style={{
                background: "rgba(34,197,94,0.04)",
                border: "1px solid rgba(34,197,94,0.15)",
              }}
            >
              <span className="text-[11px] font-medium" style={{ color: "var(--text)" }}>
                {a}
              </span>
              <span className="text-[10px]" style={{ color: "#4ade80" }}>
                ✓ Actif
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // metrics
  return (
    <div
      className="p-4 mt-5"
      style={{
        background: "#0d0d12",
        border: "1px solid var(--border)",
        borderRadius: 8,
      }}
    >
      <div
        className="text-[9px] uppercase tracking-widest mb-3"
        style={{ color: "var(--gold)", opacity: 0.6 }}
      >
        Performance · 30 derniers jours
      </div>
      <div className="space-y-2.5">
        {[
          { k: "−40%", v: "Temps de traitement" },
          { k: "+80h", v: "Heures économisées / mois" },
          { k: "100%", v: "Tâches automatisées" },
        ].map((m) => (
          <div key={m.v} className="flex items-baseline gap-2">
            <span
              className="text-[18px] font-extrabold"
              style={{
                color: "#4ade80",
                fontFamily: "var(--font-syne)",
                letterSpacing: "-0.5px",
              }}
            >
              {m.k}
            </span>
            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              {m.v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll("[data-step-card]");
    gsap.set(cards, { opacity: 0, y: 50 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-24 px-10 max-[900px]:px-5 max-[900px]:py-16"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
        style={{ color: "var(--gold)" }}
      >
        <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
        Comment ça marche
      </div>
      <h2
        className="font-bold leading-tight mb-4"
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 52px)",
          letterSpacing: "-1.5px",
          color: "var(--text)",
          maxWidth: 900,
        }}
      >
        Une équipe qui travaille pendant que vous dormez.
      </h2>
      <p
        className="text-[17px] font-light mb-16"
        style={{ color: "var(--text-muted)", maxWidth: 600, lineHeight: 1.7 }}
      >
        De votre problème à vos agents en production — un process en trois étapes,
        sans jargon et sans surprise.
      </p>

      <div className="grid grid-cols-3 max-[900px]:grid-cols-1 gap-5">
        {steps.map((s) => (
          <div
            key={s.n}
            data-step-card
            className="p-7 relative overflow-hidden"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
            }}
          >
            <div className="flex items-baseline gap-3 mb-4">
              <div
                className="text-3xl font-extrabold"
                style={{
                  fontFamily: "var(--font-syne)",
                  color: "var(--gold)",
                  letterSpacing: "-1.5px",
                }}
              >
                {s.n}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
            <div
              className="text-lg font-bold mb-3"
              style={{
                fontFamily: "var(--font-syne)",
                color: "var(--text)",
                letterSpacing: "-0.5px",
              }}
            >
              {s.title}
            </div>
            <p
              className="text-sm font-light"
              style={{ color: "var(--text-muted)", lineHeight: 1.65 }}
            >
              {s.desc}
            </p>
            <StepVisual kind={s.visual} />
          </div>
        ))}
      </div>
    </section>
  );
}
