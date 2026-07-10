/**
 * Realistic-looking status checklist mockup for flagship automations that
 * centralize evidence/indicators rather than produce a single document or
 * a conversation (e.g. Qualiopi audit indicators). Shows which items are
 * already complete and which are still missing — a state list, never a
 * performance/results dashboard.
 *
 * All copy comes from messages/*.json (automationFlows.<sector>.*) — this
 * component never hardcodes example content.
 */

import { AlertIcon, ValidationIcon } from "./AutomationFlow";

export type ChecklistItem = {
  label: string;
  status: "ok" | "missing";
  note?: string;
};

export type ChecklistMockupContent = {
  title: string;
  items: ChecklistItem[];
  okLabel: string;
  missingLabel: string;
  validationLabel: string;
};

export default function ChecklistMockup({
  content,
  ariaLabel,
}: {
  content: ChecklistMockupContent;
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
      <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)" }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{content.title}</span>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2" style={{ padding: "10px 14px 14px" }}>
        {content.items.map((item, i) => {
          const isMissing = item.status === "missing";
          return (
            <div key={i}>
              <div
                className="flex items-center justify-between gap-2"
                style={{
                  padding: "8px 10px",
                  borderRadius: "var(--radius-sm)",
                  background: isMissing ? "var(--gold-dim)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isMissing ? "var(--gold-border)" : "var(--border)"}`,
                }}
              >
                <span
                  style={{
                    fontSize: 11.5,
                    color: isMissing ? "var(--gold-light)" : "var(--text-muted)",
                    fontWeight: isMissing ? 600 : 400,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.label}
                </span>
                <span
                  className="inline-flex items-center gap-1 shrink-0"
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: 0.3,
                    textTransform: "uppercase",
                    color: isMissing ? "var(--gold-light)" : "var(--text-dim)",
                  }}
                >
                  {isMissing ? <AlertIcon /> : <ValidationIcon />}
                  {isMissing ? content.missingLabel : content.okLabel}
                </span>
              </div>
              {item.note && (
                <div style={{ fontSize: 10, color: "var(--gold-light)", padding: "3px 10px 0" }}>
                  {item.note}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Human validation footer */}
      <div
        style={{
          padding: "12px 14px",
          background: "var(--gold-dim)",
          borderTop: "1px solid var(--gold-border)",
        }}
      >
        <div className="flex items-start gap-1.5" style={{ color: "var(--gold-light)" }}>
          <ValidationIcon />
          <span style={{ fontSize: 11.5, fontWeight: 500, lineHeight: 1.5 }}>{content.validationLabel}</span>
        </div>
      </div>
    </div>
  );
}
