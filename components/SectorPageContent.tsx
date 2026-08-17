import Link from "next/link";
import { useTranslations } from "next-intl";
import Nav from "./Nav";
import Footer from "./Footer";
import AutomationFlow, { type FlowStep } from "./AutomationFlow";

const CALENDLY_URL = "https://calendly.com/saasnhia/30min";

export type Automation = {
  code: string;
  title: string;
  description: string;
  /** Mechanism diagram steps — how it works, not a result. Optional so
   *  automations without a clear trigger->action->validation sequence can
   *  simply omit the diagram rather than force one. */
  flowSteps?: FlowStep[];
  flowAriaLabel?: string;
  /** Richer visual for flagship automations — typically a realistic UI
   *  mockup (e.g. ChatMockup, CallBookingMockup, DocMockup, StockTableMockup)
   *  showing the interface in action rather than an abstract flow diagram.
   *  Takes precedence over flowSteps when both are set. */
  customFlow?: React.ReactNode;
  /** When true, this automation's card stacks text (full width) above
   *  customFlow (full width, capped) instead of the default lg:
   *  2-column side-by-side layout. Opt-in, off by default — for
   *  flagships whose customFlow needs more room to stay legible
   *  (e.g. on-screen disclaimer text in a demo video). */
  wideFlow?: boolean;
  /** Complement visual on a DEMONSTRATIVE component (gate 64, elargi au
   *  gate 66) : le composant N — maquette, video OU AutomationFlow dont la
   *  description est une cascade conditionnelle — reste servi dans sa
   *  colonne, la scene 3D est AJOUTEE sous la description, structurellement
   *  subordonnee. */
  complementFlow?: React.ReactNode;
  /** LE BLOC DE PREUVE (gate 89 §2) — reserve aux automatisations qui
   *  EXISTENT : workflow ecrit, execute, releve. Quatre sur quarante-cinq.
   *  Il ne se pose pas ailleurs, sans quoi il redeviendrait l'allegation
   *  d'existence retiree au gate 89 §1. */
  preuve?: React.ReactNode;
  /** Plafond de largeur du complement (px CSS). 420 par defaut — la
   *  subordination MESUREE des complements de maquettes (gate 64). Un
   *  complement d'AutomationFlow (rangee PLATE, ~59k px2) doit au contraire
   *  ALIGNER sa largeur sur celle du flow (471) : la regle des 5 % exempte
   *  alors l'aire, qui degenererait en comparaison de rapports d'image
   *  (mesurer_complement_ssr.js, gate 66). */
  complementMaxWidth?: number;
};

export type PainPoint = {
  title: string;
  description: string;
};

export type FaqItem = { question: string; answer: string };

export type RelatedLink = { label: string; href: string };

export type SectorContent = {
  eyebrow: string;
  h1: string;
  intro: string;
  painTitle: string;
  painIntro: string;
  painPoints: PainPoint[];
  automationsTitle: string;
  automationsIntro: string;
  automations: Automation[];
  geoTitle: string;
  geoText: string;
  pricingTitle: string;
  pricingIntro: string;
  pricingNote?: React.ReactNode;
  faqTitle?: string;
  faq?: FaqItem[];
  ctaText: string;
  ctaButton: string;
  diagnosticNote: string;
  relatedSectorsTitle: string;
  relatedSectors: RelatedLink[];
  relatedArticle?: RelatedLink;
  backLabel: string;
};

export default function SectorPageContent({
  locale,
  content,
  mise = "classique",
}: {
  locale: string;
  content: SectorContent;
  /** Mise en page de la section « automatisations ».
   *
   *  `"classique"` — les cartes bordees, empilees, gap 20/24 px. C'est ce que
   *  servent les SEPT pages secteur depuis leurs gates respectifs ; on n'y
   *  touche pas.
   *
   *  `"asp"` — la grammaire relevee sur `audit-sequences-v3/DA DEMANDER`
   *  (gate 80/83) : panneaux ALTERNES sans boite, colonne vertebrale a
   *  gauche avec un noeud par panneau, colonne visuelle PLUS LARGE que la
   *  colonne de texte, et une respiration de 72/112 px entre panneaux.
   *
   *  POURQUOI UN DRAPEAU ET PAS UN REMPLACEMENT : le gate 83 demande UNE
   *  page pilote, validee par le client avant les six autres. Le drapeau
   *  rend la non-regression des six autres VERIFIABLE et non promise —
   *  elles ne passent pas dans la branche `asp`, leur HTML servi ne bouge
   *  pas d'un octet. */
  mise?: "classique" | "asp";
}) {
  const tPricing = useTranslations("pricing");
  const asp = mise === "asp";
  return (
    <main style={{ background: "var(--bg)" }}>
      <Nav />
      <style>{`
        .automation-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .flow-node {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .automation-card:hover {
            transform: translateY(-3px);
            border-color: var(--gold-border);
            box-shadow: 0 20px 44px -16px rgba(0,0,0,0.4), 0 0 0 1px rgba(196,151,58,0.08);
          }
          .automation-card:hover .flow-node {
            transform: translateY(-2px);
            box-shadow: 0 8px 18px -8px rgba(0,0,0,0.35);
          }
          .automation-card:hover .flow-node--validation {
            box-shadow: 0 0 0 3px rgba(196,151,58,0.14), 0 8px 18px -8px rgba(0,0,0,0.35);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .automation-card, .flow-node { transition: none !important; }
          .automation-card:hover { transform: none !important; }
          .automation-card:hover .flow-node { transform: none !important; }
        }
      `}</style>
      <div
        style={{
          margin: "0 auto",
          padding: "160px 40px 100px",
        }}
        className="max-w-[900px] lg:max-w-[1120px] max-[700px]:!px-5"
      >
        <Link
          href={`/${locale}`}
          style={{
            color: "var(--gold)",
            textDecoration: "none",
            fontSize: 14,
            display: "inline-block",
            marginBottom: 32,
          }}
        >
          &larr; {content.backLabel}
        </Link>

        {/* Hero */}
        <div
          className="text-[11px] font-medium tracking-[3px] uppercase mb-4 flex items-center gap-2"
          style={{ color: "var(--gold)" }}
        >
          <span className="block w-4 h-px" style={{ background: "var(--gold)" }} />
          {content.eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-syne)",
            fontSize: "clamp(30px, 5vw, 52px)",
            fontWeight: 700,
            letterSpacing: "-1.5px",
            color: "var(--text)",
            lineHeight: 1.15,
            marginBottom: 24,
          }}
        >
          {content.h1}
        </h1>
        <p
          style={{
            fontSize: 18,
            fontWeight: 300,
            color: "var(--text-muted)",
            lineHeight: 1.7,
            maxWidth: 680,
            marginBottom: 56,
          }}
        >
          {content.intro}
        </p>

        {/* Pain points */}
        <section style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 16,
              letterSpacing: "-0.5px",
            }}
          >
            {content.painTitle}
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 680,
            }}
          >
            {content.painIntro}
          </p>
          <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-4">
            {content.painPoints.map((p) => (
              <div
                key={p.title}
                style={{
                  padding: 24,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-syne)",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ color: "#f87171" }}>↳</span> {p.title}
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.65, margin: 0 }}>
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Automations */}
        <section style={{ marginBottom: asp ? 104 : 64, marginTop: asp ? 40 : 0 }}>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 16,
              letterSpacing: "-0.5px",
            }}
          >
            {content.automationsTitle}
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: 15,
              lineHeight: 1.7,
              marginBottom: 32,
              maxWidth: 680,
            }}
          >
            {content.automationsIntro}
          </p>
          {asp ? (
            /* ─────────────────────────────────────────────────────────────
               MISE EN PAGE ASP — panneaux alternes sur une colonne vertebrale.
               Aucune animation ici : le gate 83 permet de livrer la STRUCTURE
               MESUREE sans le mouvement plutot qu'une page animee non
               verifiee. Ce qui bouge deja (survol des cartes) n'existe pas
               dans cette branche, il n'y a plus de carte.
               ───────────────────────────────────────────────────────────── */
            <div className="relative lg:pl-[68px]">
              {/* La colonne vertebrale. Decorative : aria-hidden, aucun texte,
                  aucun role. Elle s'eteint aux deux bouts pour ne pas donner
                  de debut ni de fin durs a une liste qui n'en a pas. */}
              <span
                aria-hidden
                className="hidden lg:block absolute left-[4px] top-[10px] bottom-[10px] w-px"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, var(--gold-border) 6%, var(--gold-border) 94%, transparent)",
                }}
              />
              <div className="flex flex-col gap-[72px] lg:gap-[112px]">
                {content.automations.map((a, i) => {
                  const hasFlow = !!(a.customFlow || (a.flowSteps && a.flowSteps.length > 0));
                  const alternate = i % 2 === 1;
                  /* Les deux colonnes ne sont PAS egales : 0,86 / 1,14. Le
                     visuel prend la place, c'est la demande du gate 80. La
                     scene de complement descend dans la MEME colonne que le
                     flow — sinon sa largeur cesse d'egaler celle du flow, la
                     regle des 5 % ne l'exempte plus, et son aire (290k px2
                     contre 59k) la ferait DOMINER. Mesure de reference avant
                     remise en page : ecart 0,0 % aux sept fenetres. */
                  const texteCol = alternate ? "lg:col-start-2" : "lg:col-start-1";
                  const visuelCol = alternate ? "lg:col-start-1" : "lg:col-start-2";
                  /* L'ALTERNANCE CHANGE LE COTE, PAS LA LARGEUR. Premiere
                     mesure de la remise en page : avec un gabarit fixe
                     0,86/1,14 le visuel des panneaux impairs tombait dans la
                     colonne ETROITE et sortait a 394 px — plus petit que les
                     471 px de la mise en page qu'il devait elargir. Le
                     gabarit se retourne donc avec le panneau, et la colonne
                     visuelle vaut 1,14 des deux cotes. */
                  const gabarit = alternate
                    ? "lg:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)]"
                    : "lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]";
                  return (
                    <article
                      key={a.code}
                      className={
                        hasFlow
                          ? /* CENTRE quand les deux colonnes ont des hauteurs
                               comparables ; EN HAUT quand le visuel est trois
                               fois plus haut que le texte. Lu a l'oeil sur
                               l'octet servi : centre, le texte de W-PH-06
                               flottait au milieu de 680 px de scene, avec un
                               vide de 300 px au-dessus et autant en dessous. */
                            `relative lg:grid ${gabarit} lg:gap-x-14 ${a.complementFlow ? "lg:items-start" : "lg:items-center"}`
                          : "relative"
                      }
                    >
                      {/* Le noeud du panneau sur la vertebre. left -64 place
                          son centre a 4,5 px du bord du bloc, la ou passe le
                          trait. */}
                      <span
                        aria-hidden
                        className="hidden lg:block absolute left-[-68px] top-[8px] w-[9px] h-[9px] rounded-full"
                        style={{
                          background: "var(--gold)",
                          boxShadow: "0 0 0 4px var(--bg), 0 0 0 5px var(--gold-border)",
                        }}
                      />
                      <div className={hasFlow ? texteCol : ""}>
                        <div className="flex items-center gap-3 flex-wrap" style={{ marginBottom: 12 }}>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              letterSpacing: 1,
                              color: "var(--gold)",
                              background: "var(--gold-dim)",
                              border: "1px solid var(--gold-border)",
                              borderRadius: 999,
                              padding: "3px 10px",
                            }}
                          >
                            {a.code}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--font-syne)",
                            fontSize: 20,
                            fontWeight: 700,
                            letterSpacing: "-0.4px",
                            lineHeight: 1.25,
                            color: "var(--text)",
                            margin: "0 0 12px",
                          }}
                          className="lg:text-[24px]"
                        >
                          {a.title}
                        </h3>
                        <p
                          style={{ color: "var(--text-muted)", fontSize: 14.5, lineHeight: 1.75, margin: 0 }}
                          className="lg:text-[15px]"
                        >
                          {a.description}
                        </p>
                        {a.preuve}
                      </div>
                      {hasFlow && (
                        <div className={`${visuelCol} lg:row-start-1 mt-6 lg:mt-0`}>
                          {a.customFlow ?? (
                            <AutomationFlow steps={a.flowSteps!} ariaLabel={a.flowAriaLabel ?? a.title} />
                          )}
                          {a.complementFlow && (
                            <div className="mt-5" style={{ maxWidth: a.complementMaxWidth ?? 420 }}>
                              {a.complementFlow}
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          ) : (
          <div className="flex flex-col gap-5 lg:gap-6">
            {content.automations.map((a, i) => {
              const hasFlow = !!(a.customFlow || (a.flowSteps && a.flowSteps.length > 0));
              const wide = !!a.wideFlow;
              const alternate = i % 2 === 1;
              const textCol = !hasFlow
                ? "lg:col-span-2"
                : alternate
                  ? "lg:col-start-2"
                  : "lg:col-start-1";
              const flowCol = alternate ? "lg:col-start-1" : "lg:col-start-2";
              return (
                <div
                  key={a.code}
                  className={
                    wide
                      ? "automation-card lg:p-9"
                      : `automation-card lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 lg:p-9 ${
                          /* CENTRE quand les deux colonnes se repondent ; EN HAUT
                             des qu'un bloc de preuve allonge la colonne de texte.
                             Lu a l'oeil sur l'octet servi : centre, le diagramme
                             de W-BTP-03 flottait au milieu de 640 px de vide.
                             Meme correction qu'au gate 83 sur la variante ASP. */
                          a.preuve ? "lg:items-start" : "lg:items-center"
                        }`
                  }
                  style={{
                    padding: 24,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <div
                    className={`flex items-center gap-3 flex-wrap ${wide ? "" : `${textCol} lg:row-start-1`}`}
                    style={{ marginBottom: 10 }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                        color: "var(--gold)",
                        background: "var(--gold-dim)",
                        border: "1px solid var(--gold-border)",
                        borderRadius: 999,
                        padding: "3px 10px",
                      }}
                    >
                      {a.code}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-syne)",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "var(--text)",
                      }}
                      className="lg:text-[19px]"
                    >
                      {a.title}
                    </span>
                  </div>
                  {hasFlow && (
                    <div
                      className={
                        wide
                          ? "mt-4 lg:mt-6 lg:max-w-[880px] lg:mx-auto"
                          : /* avec un complement, la maquette enjambe les TROIS
                               rangees : sans cela elle s'arrete a la rangee 2
                               et la scene s'etale seule sous elle — mesure un
                               vide de pleine rangee dans la carte. */
                            `${flowCol} lg:row-start-1 ${a.complementFlow ? (a.preuve ? "lg:row-span-4" : "lg:row-span-3") : (a.preuve ? "lg:row-span-3" : "lg:row-span-2")} mt-1 lg:mt-0`
                      }
                    >
                      {a.customFlow ?? (
                        <AutomationFlow
                          steps={a.flowSteps!}
                          ariaLabel={a.flowAriaLabel ?? a.title}
                        />
                      )}
                    </div>
                  )}
                  <p
                    style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, margin: 0 }}
                    className={`${wide ? "mt-4" : `${textCol} lg:row-start-2`} lg:text-[14.5px]`}
                  >
                    {a.description}
                  </p>
                  {a.preuve && (
                    <div className={`${wide ? "" : `${textCol} lg:row-start-3`}`}>{a.preuve}</div>
                  )}
                  {a.complementFlow && (
                    /* max-w-[420px] : la subordination MESUREE du regime
                       complement — sans plafond, la scene depassait l'aire de
                       la maquette aux fenetres empilees 901/768/640
                       (371k/255k/189k px2 contre 185k, mesurer_complement_
                       sgp.js) ; a 420 px elle reste dessous partout, et le
                       minimum servi (300 px, fenetre 390) ne bouge pas. */
                    <div
                      className={`${wide ? "" : `${textCol} lg:row-start-4`} mt-4 lg:self-start`}
                      style={{ maxWidth: a.complementMaxWidth ?? 420 }}
                    >
                      {a.complementFlow}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          )}
        </section>

        {/* Geo */}
        <section
          style={{
            marginBottom: 64,
            padding: 28,
            background: "rgba(196,151,58,0.04)",
            border: "1px solid var(--gold-border)",
            borderRadius: "var(--radius)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: 20,
              fontWeight: 700,
              color: "var(--gold-light)",
              marginBottom: 10,
            }}
          >
            {content.geoTitle}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            {content.geoText}
          </p>
        </section>

        {/* Pricing */}
        <section style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 700,
              color: "var(--text)",
              marginBottom: 16,
              letterSpacing: "-0.5px",
            }}
          >
            {content.pricingTitle}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, maxWidth: 680, marginBottom: content.pricingNote ? 16 : 0 }}>
            {content.pricingIntro}
          </p>
          {content.pricingNote && (
            <p
              style={{
                color: "var(--gold-light)",
                fontSize: 14,
                lineHeight: 1.7,
                maxWidth: 680,
                margin: 0,
              }}
            >
              {content.pricingNote}
            </p>
          )}
          <div style={{ marginTop: 20, maxWidth: 680 }}>
            <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.7, margin: "0 0 6px" }}>
              {tPricing("footnote2")}
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>
              {tPricing("footnote3")}
            </p>
            <Link
              href={`/${locale}/tarifs`}
              style={{ color: "var(--gold-light)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}
            >
              {tPricing("ctaButton")}
            </Link>
          </div>
        </section>

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section style={{ marginBottom: 64 }}>
            <h2
              style={{
                fontFamily: "var(--font-syne)",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 24,
                letterSpacing: "-0.5px",
              }}
            >
              {content.faqTitle}
            </h2>
            <div>
              {content.faq.map((f) => (
                <div key={f.question} style={{ borderBottom: "1px solid var(--border)", padding: "20px 0" }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne)",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--text)",
                      marginBottom: 8,
                    }}
                  >
                    {f.question}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section
          style={{
            textAlign: "center",
            padding: "48px 32px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            marginBottom: 64,
          }}
        >
          <p style={{ color: "var(--text)", fontSize: 16, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 24px" }}>
            {content.ctaText}
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 15,
              fontWeight: 500,
              padding: "14px 28px",
              borderRadius: 6,
              textDecoration: "none",
              background: "var(--gold)",
              color: "#0a0a0b",
            }}
          >
            {content.ctaButton}
          </a>
          <p style={{ color: "var(--text-dim)", fontSize: 12, marginTop: 16 }}>
            {content.diagnosticNote}
          </p>
        </section>

        {/* Related */}
        <section>
          <h2
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: 15,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              color: "var(--text-muted)",
              marginBottom: 16,
            }}
          >
            {content.relatedSectorsTitle}
          </h2>
          <div className="flex flex-wrap gap-3">
            {content.relatedSectors.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                style={{
                  fontSize: 14,
                  color: "var(--gold-light)",
                  textDecoration: "none",
                  padding: "8px 16px",
                  border: "1px solid var(--gold-border)",
                  borderRadius: 999,
                }}
              >
                {r.label} &rarr;
              </Link>
            ))}
            {content.relatedArticle && (
              <Link
                href={content.relatedArticle.href}
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  padding: "8px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                }}
              >
                {content.relatedArticle.label} &rarr;
              </Link>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
