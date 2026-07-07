/**
 * Visual mechanism diagram for one automation: trigger -> processing ->
 * action -> human validation. Steps are passed as props (label + kind) so
 * this component never hardcodes any text — labels come from the page's
 * i18n content (messages/*.json), matching the "comment ça marche, étape
 * par étape" text already written for each automation.
 *
 * Deliberately shows MECHANISM only (how it works), never a result or
 * metric — NBHC has no client references to show, so this diagram must
 * never be mistaken for a results dashboard.
 */

import { Fragment } from "react";

export type FlowStepKind = "trigger" | "process" | "action" | "validation";

export type FlowStep = {
  label: string;
  kind: FlowStepKind;
};

/** Combines a structural kind sequence (defined in the page, not
 *  translatable) with the translated labels pulled from messages/*.json
 *  (via `t.raw(key)`) into the FlowStep[] the diagram renders. */
export function zipFlowSteps(kinds: FlowStepKind[], labels: unknown): FlowStep[] {
  const labelArray = Array.isArray(labels) ? (labels as string[]) : [];
  return kinds.map((kind, i) => ({ kind, label: labelArray[i] ?? "" }));
}

function TriggerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M11.5 2L4 12h5.2l-1.2 6L16 8h-5.2l0.7-6z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function ProcessIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 9.5a6 6 0 0 1 10-4.2M16 3v4.3h-4.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 10.5a6 6 0 0 1-10 4.2M4 17v-4.3h4.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActionIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 10.5L17 3.5l-5.5 14-2-6-6-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function ValidationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M6.7 10.2l2.2 2.2 4.4-4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<FlowStepKind, () => ReturnType<typeof TriggerIcon>> = {
  trigger: TriggerIcon,
  process: ProcessIcon,
  action: ActionIcon,
  validation: ValidationIcon,
};

function ArrowConnector() {
  return (
    <div
      className="flex items-center justify-center shrink-0 rotate-0 max-[700px]:rotate-90"
      style={{ color: "var(--text-dim)" }}
      aria-hidden="true"
    >
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <path
          d="M4 10h11M11 5.5L15.5 10 11 14.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function AutomationFlow({
  steps,
  ariaLabel,
}: {
  steps: FlowStep[];
  ariaLabel: string;
}) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="flex flex-row max-[700px]:flex-col items-stretch gap-2 max-[700px]:gap-1.5 mb-5"
    >
      {steps.map((step, i) => {
        const Icon = ICONS[step.kind];
        const isValidation = step.kind === "validation";
        return (
          <Fragment key={i}>
            <div
              className="flex flex-col items-center justify-center gap-1.5 text-center flex-1 min-w-0"
              style={{
                padding: "10px 8px",
                borderRadius: "var(--radius-sm)",
                border: isValidation ? "1px solid var(--gold-border)" : "1px solid var(--border)",
                background: isValidation ? "var(--gold-dim)" : "rgba(255,255,255,0.015)",
              }}
            >
              <div style={{ color: isValidation ? "var(--gold)" : "var(--text-muted)" }}>
                <Icon />
              </div>
              <span
                style={{
                  fontSize: 11.5,
                  lineHeight: 1.35,
                  color: isValidation ? "var(--gold-light)" : "var(--text-muted)",
                  fontWeight: isValidation ? 600 : 400,
                }}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && <ArrowConnector />}
          </Fragment>
        );
      })}
    </div>
  );
}
