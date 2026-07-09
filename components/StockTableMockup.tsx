/**
 * Realistic-looking multi-location STATE table for the stock-sync flagship
 * automation. Shows how much stock sits where (store / e-shop / global) —
 * a state table, deliberately NOT a performance/revenue dashboard. One row
 * is flagged below its restock threshold to show the mechanism end to end.
 *
 * All copy comes from messages/*.json (automationFlows.marqueCosmetique.stockTable)
 * — this component never hardcodes example content.
 */

import { AlertIcon, ValidationIcon } from "./AutomationFlow";

export type StockRow = {
  product: string;
  boutique: string;
  eshop: string;
  global: string;
  alert?: boolean;
};

export type StockTableMockupContent = {
  title: string;
  columns: { product: string; boutique: string; eshop: string; global: string };
  rows: StockRow[];
  restockLabel: string;
  validationLabel: string;
};

const GRID_COLS = "minmax(0,1.5fr) minmax(0,0.75fr) minmax(0,0.75fr) minmax(0,0.9fr)";

export default function StockTableMockup({
  content,
  ariaLabel,
}: {
  content: StockTableMockupContent;
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

      {/* Column labels */}
      <div className="grid" style={{ gridTemplateColumns: GRID_COLS, gap: 6, padding: "10px 14px 2px" }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", color: "var(--text-dim)" }}>
          {content.columns.product}
        </span>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", color: "var(--text-dim)", textAlign: "right" }}>
          {content.columns.boutique}
        </span>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", color: "var(--text-dim)", textAlign: "right" }}>
          {content.columns.eshop}
        </span>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase", color: "var(--text-dim)", textAlign: "right" }}>
          {content.columns.global}
        </span>
      </div>

      {/* Rows */}
      <div style={{ padding: "4px 14px 10px" }}>
        {content.rows.map((r, i) => (
          <div key={i}>
            <div
              className="grid items-center"
              style={{
                gridTemplateColumns: GRID_COLS,
                gap: 6,
                padding: "7px 8px",
                marginTop: 4,
                borderRadius: "var(--radius-sm)",
                background: r.alert ? "var(--gold-dim)" : "transparent",
                border: `1px solid ${r.alert ? "var(--gold-border)" : "transparent"}`,
              }}
            >
              <span
                style={{
                  fontSize: 11.5,
                  color: "var(--text-muted)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {r.product}
              </span>
              <span style={{ fontSize: 11.5, color: "var(--text)", textAlign: "right" }}>{r.boutique}</span>
              <span style={{ fontSize: 11.5, color: "var(--text)", textAlign: "right" }}>{r.eshop}</span>
              <span
                className="inline-flex items-center justify-end gap-1"
                style={{ fontSize: 11.5, fontWeight: 600, color: r.alert ? "var(--gold-light)" : "var(--text)" }}
              >
                {r.alert && <AlertIcon />}
                {r.global}
              </span>
            </div>
            {r.alert && (
              <div style={{ fontSize: 10, color: "var(--gold-light)", padding: "3px 8px 0", textAlign: "right" }}>
                {content.restockLabel}
              </div>
            )}
          </div>
        ))}
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
