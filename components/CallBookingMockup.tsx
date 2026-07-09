/**
 * Realistic-looking "incoming call -> booking result" mockup for flagship
 * AI phone-answering automations (restaurant reservations, salon
 * appointments). Shows the INTERFACE result — two illustrative booking
 * cards (slot available / fully booked) — never a performance result.
 * Evocative of a generic call/booking screen through shape alone; no
 * specific telecom operator or booking tool is cloned.
 *
 * All copy comes from messages/*.json (automationFlows.<sector>.callBooking)
 * — this component never hardcodes example content.
 */

import { PhoneIcon, SearchIcon, ValidationIcon } from "./AutomationFlow";

export type BookingField = { label: string; value: string };

export type BookingCardData = {
  status: "confirmed" | "alternative";
  statusLabel: string;
  fields: BookingField[];
};

export type CallBookingMockupContent = {
  callerLabel: string;
  callerNumber: string;
  processingLabel: string;
  cardAvailable: BookingCardData;
  cardFull: BookingCardData;
  validationLabel: string;
};

function BookingCard({ card }: { card: BookingCardData }) {
  const isConfirmed = card.status === "confirmed";
  return (
    <div
      style={{
        borderRadius: "var(--radius-sm)",
        border: `1px solid ${isConfirmed ? "var(--gold-border)" : "var(--border)"}`,
        background: isConfirmed ? "var(--gold-dim)" : "rgba(255,255,255,0.03)",
        padding: "10px 12px",
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: 0.3,
          textTransform: "uppercase",
          color: isConfirmed ? "#0a0a0b" : "var(--text-muted)",
          background: isConfirmed ? "var(--gold)" : "rgba(255,255,255,0.07)",
          padding: "3px 9px",
          borderRadius: 999,
          marginBottom: 8,
        }}
      >
        {card.statusLabel}
      </span>
      <div className="flex flex-col gap-1.5">
        {card.fields.map((f, i) => (
          <div key={i} className="flex items-baseline justify-between gap-2">
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>{f.label}</span>
            <span style={{ fontSize: 11.5, color: "var(--text)", fontWeight: 500, textAlign: "right" }}>
              {f.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CallBookingMockup({
  content,
  ariaLabel,
}: {
  content: CallBookingMockupContent;
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
      {/* Call header */}
      <div
        className="flex items-center gap-2.5"
        style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)" }}
      >
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 30,
            height: 30,
            borderRadius: "999px",
            background: "var(--gold-dim)",
            border: "1px solid var(--gold-border)",
            color: "var(--gold)",
          }}
        >
          <PhoneIcon />
        </div>
        <div className="min-w-0 flex-1">
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{content.callerLabel}</div>
          <div style={{ fontSize: 10.5, color: "var(--text-dim)" }}>{content.callerNumber}</div>
        </div>
        <span
          className="shrink-0"
          style={{ width: 7, height: 7, borderRadius: 999, background: "var(--gold)" }}
          aria-hidden="true"
        />
      </div>

      {/* Processing state */}
      <div className="flex items-center gap-2" style={{ padding: "10px 14px", color: "var(--text-muted)" }}>
        <SearchIcon />
        <span style={{ fontSize: 11.5 }}>{content.processingLabel}</span>
      </div>

      {/* Two outcome cards */}
      <div className="flex flex-col gap-2" style={{ padding: "0 14px 14px" }}>
        <BookingCard card={content.cardAvailable} />
        <BookingCard card={content.cardFull} />
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
