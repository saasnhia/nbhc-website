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
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "160px 40px 100px",
        }}
        className="max-[700px]:!px-5"
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
          <div className="flex flex-col gap-4">
            {content.automations.map((a) => (
              <div
                key={a.code}
                style={{
                  padding: 24,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                }}
              >
                <div
                  className="flex items-center gap-3 flex-wrap"
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
                  >
                    {a.title}
                  </span>
                </div>
                {a.flowSteps && a.flowSteps.length > 0 && (
                  <AutomationFlow
                    steps={a.flowSteps}
                    ariaLabel={a.flowAriaLabel ?? a.title}
                  />
                )}
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  {a.description}
                </p>
              </div>
            ))}
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
