import type { Metadata } from "next";
import Link from "next/link";
import Logo from "../../../components/Logo";

export const metadata: Metadata = {
  title: "Conditions Generales d'Utilisation — NBHC",
  description:
    "CGU des plateformes SaaS editees par NBHC — conditions d'acces et d'utilisation.",
};

export default function CGU() {
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
        Conditions Generales d&apos;Utilisation
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
          Acces aux services
        </h2>
        <p>
          L&apos;acces aux plateformes SaaS editees par NBHC (Vlogyz, Devizly,
          Worthifast) necessite une inscription prealable. L&apos;utilisateur
          doit creer un compte personnel avec une adresse email valide. Chaque
          compte est strictement personnel et ne peut etre partage avec des
          tiers.
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
          Obligations de l&apos;utilisateur
        </h2>
        <p>L&apos;utilisateur s&apos;engage a :</p>
        <ul style={{ paddingLeft: 20, listStyleType: "disc", marginTop: 12 }}>
          <li>
            Utiliser les services de maniere licite et conforme aux presentes
            CGU.
          </li>
          <li>
            Ne pas tenter de proceder a du reverse engineering, decompilation ou
            desassemblage des plateformes.
          </li>
          <li>
            Ne pas surcharger volontairement les serveurs (attaques DDoS, abus
            d&apos;API, scraping massif).
          </li>
          <li>
            Garder ses identifiants de connexion confidentiels et etre
            responsable de toute activite effectuee sous son compte.
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
          Donnees et confidentialite
        </h2>
        <p>
          Le traitement des donnees personnelles est decrit dans notre{" "}
          <Link
            href="/politique-confidentialite"
            style={{ color: "var(--gold)", textDecoration: "none" }}
          >
            Politique de confidentialite
          </Link>
          . En utilisant nos services, vous reconnaissez en avoir pris
          connaissance.
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
          L&apos;ensemble du code source, du design, des algorithmes, des
          marques et de tout element constitutif des plateformes NBHC est la
          propriete exclusive de la SAS NBHC. Toute reproduction ou utilisation
          non autorisee est interdite.
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
          NBHC met tout en oeuvre pour assurer la disponibilite de ses services.
          Toutefois, des interruptions peuvent survenir pour des raisons de
          maintenance programmee ou d&apos;incidents techniques. NBHC ne saurait
          etre tenue responsable de pertes de donnees resultant d&apos;un cas de
          force majeure.
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
          Suspension de compte
        </h2>
        <p>
          En cas de violation des presentes CGU, NBHC se reserve le droit de
          suspendre ou de supprimer le compte de l&apos;utilisateur, avec
          notification prealable par email. En cas d&apos;urgence (atteinte a la
          securite des systemes, activite frauduleuse), la suspension peut etre
          immediate et sans preavis.
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
          Modifications des CGU
        </h2>
        <p>
          NBHC se reserve le droit de modifier les presentes CGU a tout moment.
          Les utilisateurs seront notifies des modifications au moins 30 jours
          avant leur entree en vigueur. La poursuite de l&apos;utilisation des
          services apres l&apos;entree en vigueur des modifications vaut
          acceptation des nouvelles conditions.
        </p>
      </section>

      <p
        style={{
          fontSize: 13,
          color: "var(--text-dim)",
          marginTop: 48,
          fontStyle: "italic",
        }}
      >
        Derniere mise a jour : 30 mars 2026
      </p>
    </main>
  );
}
