import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        className="flex items-center justify-between flex-wrap gap-6 py-12 px-10 max-md:px-5 max-md:flex-col max-md:items-start"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        <div className="flex flex-col gap-2">
          <div
            className="font-extrabold text-lg"
            style={{
              fontFamily: "var(--font-syne)",
              color: "var(--text)",
              letterSpacing: "-0.5px",
            }}
          >
            <Image
              src="/logo.png"
              alt="NBHC"
              width={32}
              height={32}
              style={{ borderRadius: 8, display: "inline-block", verticalAlign: "middle", marginRight: 8 }}
            />
            N<span style={{ color: "var(--gold)" }}>B</span>HC
          </div>
          <div className="text-[13px]" style={{ color: "var(--text-dim)" }}>
            Studio IA & Automatisation · France
          </div>
        </div>
        <div className="flex items-center gap-8 flex-wrap">
          <div className="flex gap-6">
            {[
              { href: "#approche", label: "Approche" },
              { href: "#produits", label: "Produits" },
              { href: "#services", label: "Services" },
              { href: "mailto:contact@nbhc.fr", label: "Contact" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[13px] no-underline hover:opacity-80"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        className="text-xs py-5 px-10 max-md:px-5"
        style={{
          color: "var(--text-dim)",
          borderTop: "1px solid var(--border)",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        © 2026 SAS NBHC — SIREN 102 637 899 · 55 Rue Henri Clément, 71100
        Saint-Marcel · Tous droits réservés
      </div>
    </footer>
  );
}
