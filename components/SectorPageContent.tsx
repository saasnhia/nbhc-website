import Link from "next/link";
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
  pricingNote?: string;
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
}: {
  locale: string;
  content: SectorContent;
}) {
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
          <div className="flex flex-col gap-5 lg:gap-6">
            {content.automations.map((a, i) => {
              const hasFlow = !!(a.customFlow || (a.flowSteps && a.flowSteps.length > 0));
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
                  className="automation-card lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 lg:items-center lg:p-9"
                  style={{
                    padding: 24,
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <div
                    className={`flex items-center gap-3 flex-wrap ${textCol} lg:row-start-1`}
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
                      className={`${flowCol} lg:row-start-1 lg:row-span-2 mt-1 lg:mt-0`}
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
                    className={`${textCol} lg:row-start-2 lg:text-[14.5px]`}
                  >
                    {a.description}
                  </p>
                </div>
              );
            })}
          </div>
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
