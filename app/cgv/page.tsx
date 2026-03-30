import type { Metadata } from "next";
import Link from "next/link";
import Logo from "../../components/Logo";

export const metadata: Metadata = {
  title: "Conditions Generales de Vente — NBHC",
  description:
    "CGV des services SaaS edites par NBHC — Vlogyz, Devizly, Worthifast.",
};

export default function CGV() {
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
        Conditions Generales de Vente
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
          Objet
        </h2>
        <p>
          Les presentes Conditions Generales de Vente (CGV) regissent la vente
          de licences d&apos;acces aux plateformes SaaS editees par la SAS NBHC,
          notamment Vlogyz, Devizly et Worthifast. Toute souscription a un
          service implique l&apos;acceptation sans reserve des presentes CGV.
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
          Prix et paiement
        </h2>
        <ul style={{ paddingLeft: 20, listStyleType: "disc" }}>
          <li>Les prix sont affiches toutes taxes comprises (TTC).</li>
          <li>
            Le paiement s&apos;effectue par carte bancaire via la plateforme
            securisee Stripe.
          </li>
          <li>
            Les abonnements sont disponibles en formule mensuelle ou annuelle.
          </li>
          <li>
            La facturation est automatique au debut de chaque periode de
            renouvellement.
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
          Droit de retractation
        </h2>
        <p>
          Conformement au Code de la consommation, les consommateurs (B2C)
          disposent d&apos;un delai de 14 jours a compter de la souscription
          pour exercer leur droit de retractation, sans avoir a justifier de
          motifs.
        </p>
        <p style={{ marginTop: 12 }}>
          Pour exercer ce droit, envoyez votre demande par email a{" "}
          <a
            href="mailto:contact@nbhc.fr"
            style={{ color: "var(--gold)", textDecoration: "none" }}
          >
            contact@nbhc.fr
          </a>
          .
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
          Resiliation
        </h2>
        <p>
          L&apos;utilisateur peut resilier son abonnement a tout moment depuis
          son espace client. La resiliation prend effet a la fin de la periode
          d&apos;abonnement en cours. Aucun remboursement au prorata ne sera
          effectue pour la periode restante.
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
          NBHC conserve l&apos;integralite des droits de propriete
          intellectuelle sur ses plateformes, incluant le code source, le design,
          les algorithmes et les marques. L&apos;utilisateur conserve
          l&apos;entiere propriete de ses donnees et des contenus generes via
          les services.
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
          Responsabilite
        </h2>
        <p>
          NBHC est soumise a une obligation de moyens. Les services SaaS
          integrant des fonctionnalites d&apos;intelligence artificielle, NBHC
          ne garantit pas un resultat specifique sur les outputs generes par
          l&apos;IA. L&apos;utilisateur reste responsable de la verification et
          de l&apos;utilisation des contenus generes.
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
          Loi applicable et juridiction competente
        </h2>
        <p>
          Les presentes CGV sont soumises au droit francais. En cas de litige,
          et apres tentative de resolution amiable, le Tribunal de Commerce de
          Macon (Saone-et-Loire) sera seul competent.
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
