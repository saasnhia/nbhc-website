/**
 * Realistic-looking "generated regulatory file" mockup for the cosmetic
 * compliance flagship automation. Shows the INTERFACE result — an
 * illustrative INCI formula, flagged allergens, flagged claims — never a
 * performance result. The final status line is deliberately explicit that
 * the TOXICOLOGIST validates and files the dossier, never NBHC.
 *
 * All copy comes from messages/*.json (automationFlows.marqueCosmetique.docMockup)
 * — this component never hardcodes example content.
 */

import type { ReactNode } from "react";
import { DocumentIcon, AlertIcon, ValidationIcon } from "./AutomationFlow";

export type DocMockupContent = {
  title: string;
  reference: string;
  inciTitle: string;
  inciTags: string[];
  allergensTitle: string;
  allergensValue: string;
  claimsTitle: string;
  claimsValue: string;
  statusLabel: string;
  validationCaption: string;
};

function FieldBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ padding: "10px 0" }}>
      <div
        style={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: 0.4,
          textTransform: "uppercase",
          color: "var(--text-dim)",
          marginBottom: 7,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

export default function DocMockup({
  content,
  ariaLabel,
}: {
  content: DocMockupContent;
  ariaLabel: string;
}) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="w-full mx-auto"
      style={{
        maxWidth: 360,
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        background: "rgba(255,255,255,0.02)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5"
        style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 30,
            height: 30,
            borderRadius: "var(--radius-sm)",
            background: "var(--gold-dim)",
            border: "1px solid var(--gold-border)",
            color: "var(--gold)",
          }}
        >
          <DocumentIcon />
        </div>
        <div className="min-w-0 flex-1">
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{content.title}</div>
        </div>
        <span
          className="shrink-0"
          style={{
            fontSize: 9.5,
            fontWeight: 600,
            color: "var(--text-dim)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            padding: "3px 8px",
          }}
        >
          {content.reference}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "2px 14px 4px" }}>
        <FieldBlock label={content.inciTitle}>
          <div className="flex flex-wrap gap-1.5">
            {content.inciTags.map((tag, i) => (
              <span
                key={i}
                style={{
                  fontSize: 10.5,
                  color: "var(--text-muted)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border)",
                  borderRadius: 999,
                  padding: "3px 8px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </FieldBlock>

        <FieldBlock label={content.allergensTitle}>
          <div className="flex items-center gap-1.5" style={{ color: "var(--gold-light)" }}>
            <AlertIcon />
            <span style={{ fontSize: 12, fontWeight: 500 }}>{content.allergensValue}</span>
          </div>
        </FieldBlock>

        <FieldBlock label={content.claimsTitle}>
          <div className="flex items-center gap-1.5" style={{ color: "var(--gold-light)" }}>
            <AlertIcon />
            <span style={{ fontSize: 12, fontWeight: 500 }}>{content.claimsValue}</span>
          </div>
        </FieldBlock>
      </div>

      {/* Human validation footer — the toxicologist, never NBHC */}
      <div
        style={{
          padding: "12px 14px",
          background: "var(--gold-dim)",
          borderTop: "1px solid var(--gold-border)",
        }}
      >
        <div className="flex items-center gap-1.5" style={{ color: "var(--gold-light)" }}>
          <ValidationIcon />
          <span style={{ fontSize: 12, fontWeight: 600 }}>{content.statusLabel}</span>
        </div>
        <p style={{ fontSize: 10.5, color: "var(--gold-light)", margin: "6px 0 0", lineHeight: 1.5 }}>
          {content.validationCaption}
        </p>
      </div>
    </div>
  );
}
