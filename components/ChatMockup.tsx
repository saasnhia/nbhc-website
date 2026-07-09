/**
 * Realistic-looking messaging-app mockup for flagship automations that run
 * through a chat channel (WhatsApp Business today, potentially others
 * later). Shows the INTERFACE in action — a conversation with example
 * data — never a performance result. Deliberately evocative of "a
 * messaging app" through shape alone (left/right bubbles, input bar, read
 * receipts) using the site's own tokens: no WhatsApp green, no Meta logo,
 * no cloned branding.
 *
 * All copy comes from messages/*.json (automationFlows.<sector>.*Chat) —
 * this component never hardcodes example content.
 */

import { ActionIcon, ValidationIcon } from "./AutomationFlow";

export type ChatBubbleData = {
  from: "business" | "client";
  text: string;
  tag?: string;
};

export type ChatMockupContent = {
  contactName: string;
  contactSubtitle: string;
  bubbles: ChatBubbleData[];
  inputPlaceholder: string;
  validateButtonLabel: string;
  validateCaption: string;
};

function ReadReceipt() {
  return (
    <span
      className="inline-flex items-center gap-[1px]"
      style={{ color: "var(--text-dim)" }}
      aria-hidden="true"
    >
      <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
        <path
          d="M2.5 10.5l3.5 3.5L14.5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg width="12" height="12" viewBox="0 0 20 20" fill="none" style={{ marginLeft: -6 }}>
        <path
          d="M6.5 10.5l3.5 3.5L18.5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function ChatMockup({
  content,
  ariaLabel,
}: {
  content: ChatMockupContent;
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
            borderRadius: "999px",
            background: "var(--gold-dim)",
            border: "1px solid var(--gold-border)",
            color: "var(--gold-light)",
            fontSize: 12,
            fontWeight: 700,
            fontFamily: "var(--font-syne)",
          }}
        >
          {content.contactName.slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{content.contactName}</div>
          <div style={{ fontSize: 10.5, color: "var(--text-dim)" }}>{content.contactSubtitle}</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-2.5" style={{ padding: "14px" }}>
        {content.bubbles.map((b, i) => {
          const isClient = b.from === "client";
          return (
            <div
              key={i}
              className="flex flex-col"
              style={{ alignSelf: isClient ? "flex-end" : "flex-start", alignItems: isClient ? "flex-end" : "flex-start", maxWidth: "82%" }}
            >
              {b.tag && (
                <span
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    textTransform: "uppercase",
                    color: "var(--gold-light)",
                    marginBottom: 3,
                  }}
                >
                  {b.tag}
                </span>
              )}
              <div
                style={{
                  padding: "8px 12px",
                  fontSize: 12.5,
                  lineHeight: 1.5,
                  borderRadius: "var(--radius-sm)",
                  color: isClient ? "var(--gold-light)" : "var(--text-muted)",
                  background: isClient ? "var(--gold-dim)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${isClient ? "var(--gold-border)" : "var(--border)"}`,
                }}
              >
                {b.text}
              </div>
              {!isClient && (
                <div style={{ marginTop: 3 }}>
                  <ReadReceipt />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Input bar (decorative) */}
      <div
        className="flex items-center gap-2"
        style={{ padding: "10px 14px", borderTop: "1px solid var(--border)" }}
      >
        <div
          className="flex-1 min-w-0"
          style={{
            padding: "8px 12px",
            fontSize: 11.5,
            color: "var(--text-dim)",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--border)",
            borderRadius: 999,
          }}
        >
          {content.inputPlaceholder}
        </div>
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: 30,
            height: 30,
            borderRadius: "999px",
            background: "var(--gold-dim)",
            color: "var(--gold)",
          }}
        >
          <ActionIcon />
        </div>
      </div>

      {/* Human validation footer */}
      <div
        style={{
          padding: "12px 14px",
          background: "var(--gold-dim)",
          borderTop: "1px solid var(--gold-border)",
        }}
      >
        <div
          className="inline-flex items-center gap-1.5"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#0a0a0b",
            background: "var(--gold)",
            padding: "7px 14px",
            borderRadius: 6,
          }}
        >
          <ValidationIcon />
          {content.validateButtonLabel}
        </div>
        <p style={{ fontSize: 10.5, color: "var(--gold-light)", margin: "8px 0 0", lineHeight: 1.5 }}>
          {content.validateCaption}
        </p>
      </div>
    </div>
  );
}
