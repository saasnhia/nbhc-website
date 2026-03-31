import type { Metadata } from "next";
import Link from "next/link";
import Logo from "../../components/Logo";

export const metadata: Metadata = {
  title: "Mentions legales — NBHC",
  description:
    "Mentions legales du site nbhc.fr — SAS NBHC, studio IA & automatisation.",
};

export default function MentionsLegales() {
  return (
    <main
      style={{
        maxWidth: 800,
        margin: "0 auto",
        padding: "80px 40px",
        background: "var(--bg)",
        color: "var(--text-muted)",
        lineHeight: 1.8,
      }}
    >
      <style>{`
        @media (max-width: 600px) {
          main { padding: 60px 20px !important; }
        }
      `}</style>

      <Link
        href="/"
        style={{
          color: "var(--gold)",
          textDecoration: "none",
          fontSize: 14,
          display: "inline-block",
          marginBottom: 32,
        }}
      >
        &larr; Retour
      </Link>

      <div style={{ marginBottom: 48 }}>
        <Logo variant="footer" />
      </div>

      <h1
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          color: "var(--gold)",
          marginBottom: 48,
        }}
      >
        Mentions legales
      </h1>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--gold)",
            marginBottom: 16,
          }}
        >
          Editeur du site
        </h2>
        <p>
          <strong style={{ color: "var(--text)" }}>SAS NBHC</strong>
          <br />
          SIREN : 102 637 899
          <br />
          Siege social : 55 Rue Henri Clement, 71100 Saint-Rémy
          <br />
          Email :{" "}
          <a
            href="mailto:contact@nbhc.fr"
            style={{ color: "var(--gold)", textDecoration: "none" }}
          >
            contact@nbhc.fr
          </a>
          <br />
          Activite : Edition de logiciels SaaS (Vlogyz, Devizly, Worthifast)
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--gold)",
            marginBottom: 16,
          }}
        >
          Directeur de la publication
        </h2>
        <p>Haroun CHIKH, en qualite de representant legal de la SAS NBHC.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--gold)",
            marginBottom: 16,
          }}
        >
          Hebergement
        </h2>
        <p>
          <strong style={{ color: "var(--text)" }}>Vercel Inc.</strong>
          <br />
          440 N Barranca Ave #4133, Covina, CA 91723, Etats-Unis
        </p>
        <p style={{ marginTop: 12 }}>
          <strong style={{ color: "var(--text)" }}>Hetzner Online GmbH</strong>
          <br />
          Industriestr. 25, 91710 Gunzenhausen, Allemagne
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--gold)",
            marginBottom: 16,
          }}
        >
          Propriete intellectuelle
        </h2>
        <p>
          L&apos;ensemble du contenu de ce site (textes, images, logos, design,
          code source) est la propriete exclusive de la SAS NBHC ou de ses
          partenaires. Toute reproduction, representation, modification ou
          exploitation, totale ou partielle, sans autorisation ecrite prealable,
          est strictement interdite.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: 22,
            fontWeight: 600,
            color: "var(--gold)",
            marginBottom: 16,
          }}
        >
          Limitation de responsabilite
        </h2>
        <p>
          NBHC s&apos;efforce d&apos;assurer l&apos;exactitude des informations
          publiees sur ce site. Toutefois, NBHC ne saurait etre tenue
          responsable des erreurs, omissions ou des resultats obtenus suite a
          l&apos;utilisation de ces informations. L&apos;acces au site peut etre
          interrompu a tout moment pour des raisons de maintenance ou de force
          majeure, sans que NBHC puisse en etre tenue responsable.
        </p>
      </section>
    </main>
  );
}
