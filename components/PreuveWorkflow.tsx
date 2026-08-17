import faits from "../content/preuves-executions.json";
import textes from "../content/preuves-textes.json";

/* LE BLOC DE PREUVE — pour les automatisations qui EXISTENT (gate 89 §2).
 *
 * POURQUOI IL N'EST PAS SUR LES 45 BLOCS. Quatre workflows sont écrits,
 * exécutés et relevés ; les 41 autres décrivent ce qu'une automatisation
 * FERAIT. Poser ce bloc partout serait exactement l'allégation d'existence
 * retirée au gate 89 §1. Il ne se pose que là où il y a une trace.
 *
 * LA DATE N'EST PAS SAISIE. Elle vient de `content/preuves-executions.json`,
 * qui est GÉNÉRÉ par `nbhc-broll/rendu-3d/exporter_preuves.py` en lisant les
 * traces n8n versionnées. Le générateur refuse de publier une trace qui porte
 * une erreur ou qui ne rend aucun artefact. Une date fausse demanderait donc
 * de falsifier une trace, pas de se tromper en tapant.
 *
 * TROIS TEMPS, ET LE PREMIER DIT AUSSI CE QUI N'EXISTE PAS — « les caisses ne
 * poussent rien vers un tiers » est ce qui rend croyable le reste.
 *
 * LES DÉFAUTS SONT UN ARGUMENT, PAS UN AVEU : ils justifient la validation
 * humaine, et un concurrent qui promet l'envoi automatique ne peut pas écrire
 * ce paragraphe.
 */

export type PreuveContenu = {
  /** « Un `Local File Trigger` sur le dossier où votre LGO dépose son export. » */
  declencheur: string;
  /** Ce qui n'existe pas, dit comme tel. Optionnel : tous les blocs n'en ont pas. */
  nExistePas?: string;
  /** L'artefact, avec ses montants réels tirés du relevé. */
  artefact: string;
  /** Ce que l'humain garde en main. */
  validation: string;
  /** Les défauts mesurés, en argument. */
  defauts: string;
};

type Faits = Record<string, { executeLe: string; noeuds: number; artefacts: number }>;

const LIBELLES = {
  fr: {
    titre: "Cette automatisation existe.",
    tourne: (d: string, n: number) =>
      `Elle a tourné le ${d} sur un jeu d'essai, et elle a produit ${n} document${n > 1 ? "s" : ""}.`,
    t1: "Ce qui la déclenche",
    t2: "Ce qu'elle a produit",
    t3: "Ce que vous gardez en main",
    t4: "Ce qui a raté, et pourquoi on vous le dit",
  },
  en: {
    titre: "This automation exists.",
    tourne: (d: string, n: number) =>
      `It ran on ${d} on a test set, and produced ${n} document${n > 1 ? "s" : ""}.`,
    t1: "What triggers it",
    t2: "What it produced",
    t3: "What stays in your hands",
    t4: "What went wrong, and why we say so",
  },
} as const;

function jourLisible(iso: string, locale: string) {
  const [a, m, j] = iso.split("-");
  if (locale === "en") return `${a}-${m}-${j}`;
  return `${j}/${m}/${a}`;
}

type Textes = Record<string, Record<string, PreuveContenu>>;

export default function PreuveWorkflow({ code, locale }: { code: string; locale: string }) {
  const f = (faits as Faits)[code];
  const contenu = (textes as Textes)[code]?.[locale === "en" ? "en" : "fr"];
  if (!contenu) return null;
  /* Pas de trace, pas de bloc. C'est la règle entière du composant : il ne
     peut pas affirmer l'existence d'une automatisation dont il n'a pas la
     preuve sous la main. */
  if (!f) return null;
  const L = locale === "en" ? LIBELLES.en : LIBELLES.fr;

  const Temps = ({ titre, children }: { titre: string; children: React.ReactNode }) => (
    <div style={{ marginTop: 14 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 1.4,
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: 5,
        }}
      >
        {titre}
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>
        {children}
      </p>
    </div>
  );

  return (
    <section
      aria-label={L.titre}
      style={{
        marginTop: 18,
        padding: "18px 20px",
        background: "rgba(196,151,58,0.04)",
        border: "1px solid var(--gold-border)",
        borderRadius: "var(--radius)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: 15,
          fontWeight: 700,
          color: "var(--gold-light)",
          marginBottom: 4,
        }}
      >
        {L.titre}
      </div>
      {/* LE FAIT DATÉ. Il vient de la trace, jamais d'une saisie. */}
      <p style={{ color: "var(--text)", fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>
        {L.tourne(jourLisible(f.executeLe, locale), f.artefacts)}
      </p>

      <Temps titre={L.t1}>
        {contenu.declencheur}
        {contenu.nExistePas && (
          <>
            {" "}
            <span style={{ color: "var(--text-dim)" }}>{contenu.nExistePas}</span>
          </>
        )}
      </Temps>
      <Temps titre={L.t2}>{contenu.artefact}</Temps>
      <Temps titre={L.t3}>{contenu.validation}</Temps>
      <Temps titre={L.t4}>{contenu.defauts}</Temps>
    </section>
  );
}
