import type { Metadata } from "next";
import Link from "next/link";
import Logo from "../../../components/Logo";

export const metadata: Metadata = {
  title: "Politique de confidentialite — NBHC",
  description:
    "Politique de confidentialite et protection des donnees personnelles — NBHC.",
};

export default function PolitiqueConfidentialite() {
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
        Politique de confidentialite
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
          Responsable du traitement
        </h2>
        <p>
          Le responsable du traitement des donnees personnelles est la SAS NBHC,
          55 Rue Henri Clement, 71100 Saint-Rémy.
          <br />
          Contact :{" "}
          <a
            href="mailto:contact@nbhc.fr"
            style={{ color: "var(--gold)", textDecoration: "none" }}
          >
            contact@nbhc.fr
          </a>
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
          Donnees collectees
        </h2>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li>
            <strong style={{ color: "var(--text)" }}>
              Formulaire de contact :
            </strong>{" "}
            nom, adresse email, societe (optionnel), message.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>
              Utilisation des services SaaS :
            </strong>{" "}
            donnees de compte, donnees d&apos;usage, contenus generes par
            l&apos;utilisateur.
          </li>
        </ul>
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
          Finalites du traitement
        </h2>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li>Repondre aux demandes envoyees via le formulaire de contact.</li>
          <li>
            Fournir et maintenir les services SaaS (Vlogyz, Devizly,
            Worthifast).
          </li>
          <li>Ameliorer nos services et l&apos;experience utilisateur.</li>
        </ul>
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
          Base legale
        </h2>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li>
            <strong style={{ color: "var(--text)" }}>Consentement</strong> pour
            le formulaire de contact.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>
              Execution du contrat
            </strong>{" "}
            pour la fourniture des services SaaS.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>Interet legitime</strong>{" "}
            pour l&apos;amelioration des services.
          </li>
        </ul>
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
          Duree de conservation
        </h2>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li>
            <strong style={{ color: "var(--text)" }}>
              Donnees de contact :
            </strong>{" "}
            3 ans apres le dernier contact.
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>Donnees SaaS :</strong>{" "}
            pendant la duree du contrat, puis supprimees dans les 30 jours
            suivant la cloture du compte.
          </li>
        </ul>
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
          Hebergement des donnees
        </h2>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li>
            <strong style={{ color: "var(--text)" }}>Supabase</strong> — Region
            Frankfurt, Allemagne (base de donnees et authentification).
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>Hetzner Online GmbH</strong>{" "}
            — Allemagne (infrastructure serveur).
          </li>
          <li>
            <strong style={{ color: "var(--text)" }}>Vercel Inc.</strong> —
            Etats-Unis (hebergement front-end, CDN).
          </li>
        </ul>
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
          Vos droits (RGPD)
        </h2>
        <p>
          Conformement au Reglement General sur la Protection des Donnees
          (RGPD), vous disposez des droits suivants :
        </p>
        <ul style={{ paddingLeft: 20, listStyleType: "disc", marginTop: 12 }}>
          <li>Droit d&apos;acces a vos donnees personnelles</li>
          <li>Droit de rectification</li>
          <li>Droit a l&apos;effacement (droit a l&apos;oubli)</li>
          <li>Droit a la portabilite des donnees</li>
          <li>Droit a la limitation du traitement</li>
          <li>Droit d&apos;opposition</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          Pour exercer ces droits, contactez-nous a{" "}
          <a
            href="mailto:contact@nbhc.fr"
            style={{ color: "var(--gold)", textDecoration: "none" }}
          >
            contact@nbhc.fr
          </a>
          . Vous pouvez egalement introduire une reclamation aupres de la CNIL.
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
          Cookies
        </h2>
        <p>
          Ce site utilise uniquement des cookies fonctionnels strictement
          necessaires au bon fonctionnement du service. Aucun cookie de tracking
          tiers n&apos;est utilise.
        </p>
        <p style={{ marginTop: 12 }}>
          Si Plausible Analytics est active, il fonctionne sans cookies et ne
          collecte aucune donnee personnelle identifiable.
        </p>
      </section>
    </main>
  );
}
