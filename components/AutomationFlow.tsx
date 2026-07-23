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
 *
 * Icon choice: the `kind` (trigger/process/action/validation) picks a
 * fallback icon, but a concrete pictogram is preferred when the label text
 * matches a recognizable action (SMS, appel, dossier, alerte...) so the
 * reader understands the mechanism without reading every word. The
 * validation icon is never overridden this way — it must stay the same
 * recognizable checkmark everywhere so "a human decides here" reads
 * consistently across every diagram.
 */

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";

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

export function TriggerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

export function ProcessIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

export function ActionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

export function ValidationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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

export function MessageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 4.5h14a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H8l-3.8 3v-3H3a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M6 8h8M6 11h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 5.5l7 5.5 7-5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5 3h2.3l1 3.5-1.7 1.3a9 9 0 0 0 5.6 5.6l1.3-1.7 3.5 1v2.3c0 .9-.8 1.6-1.7 1.4-6-1-10.6-5.6-11.6-11.6C3.4 3.8 4.1 3 5 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M15.5 15.5l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DocumentIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.5 2.5h6l3 3v11a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M11.5 2.5v3h3" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 10.5h6M7 13.5h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="15" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 7.5h15M6 2.5v3M14 2.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="7" cy="11.3" r="1" fill="currentColor" />
      <circle cx="10" cy="11.3" r="1" fill="currentColor" />
    </svg>
  );
}

export function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 2.8L18 16.5H2L10 2.8z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M10 8v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function FolderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 5.5a1 1 0 0 1 1-1h4l1.5 2h7.5a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-9.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const KIND_ICONS: Record<FlowStepKind, () => ReturnType<typeof TriggerIcon>> = {
  trigger: TriggerIcon,
  process: ProcessIcon,
  action: ActionIcon,
  validation: ValidationIcon,
};

// Keyword -> concrete pictogram. Checked in order; first match wins. Applied
// only to trigger/process/action steps — validation always keeps its own
// icon (see pickIcon) so the "human decides here" signal never changes shape.
const KEYWORD_ICONS: [RegExp, () => ReturnType<typeof TriggerIcon>][] = [
  [/\bsms\b|message/i, MessageIcon],
  [/email|e-mail|courriel/i, MailIcon],
  [/\bappels?\b|téléphon|standard/i, PhoneIcon],
  [/détect|identifi|recherch|croisement|croise/i, SearchIcon],
  [/rupture|alerte|anomalie|rejet|incomplet/i, AlertIcon],
  [/planning|échéance|rendez-vous|session|créneau|calendrier|programmé/i, CalendarIcon],
  [/archiv|class(é|ement)/i, FolderIcon],
  [/dossier|document|fiche|pièce|certificat|attestation|devis|facture|courrier|convocation/i, DocumentIcon],
];

// Icons that mean "a specific artifact/document exists" read oddly on a
// "process" step (internal checking/computation) — e.g. a label that just
// happens to mention "devis" while describing an AI qualifying a request.
// Process steps keep the generic sync icon unless another, more process-y
// keyword (search, alert, calendar...) matches instead.
const PROCESS_EXCLUDED = new Set([DocumentIcon, FolderIcon]);

function pickIcon(step: FlowStep) {
  if (step.kind === "validation") return ValidationIcon;
  for (const [pattern, Icon] of KEYWORD_ICONS) {
    if (pattern.test(step.label)) {
      if (step.kind === "process" && PROCESS_EXCLUDED.has(Icon)) continue;
      return Icon;
    }
  }
  return KIND_ICONS[step.kind];
}

const connectorVariants: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

export function ArrowConnector({ animated = false }: { animated?: boolean }) {
  const className = "flex items-center justify-center shrink-0 rotate-0 max-[700px]:rotate-90";
  const style = { color: "var(--text-dim)" };
  const icon = (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
      <path
        d="M4 10h11M11 5.5L15.5 10 11 14.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  if (!animated) {
    return (
      <div className={className} style={style} aria-hidden="true">
        {icon}
      </div>
    );
  }
  return (
    <motion.div className={className} style={style} aria-hidden="true" variants={connectorVariants}>
      {icon}
    </motion.div>
  );
}

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.92 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// Validation node: same entrance as every other node, plus a gold ring that
// pulses once it lands — a quiet "this is where a human confirms" beat, not
// a decorative loop. `transition.default` drives the entrance (matches
// nodeVariants' timing); `transition.boxShadow` is scoped separately so the
// pulse starts only once the node has actually settled into place.
const validationNodeVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.92, boxShadow: "0 0 0 0 rgba(196,151,58,0)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    boxShadow: [
      "0 0 0 0 rgba(196,151,58,0)",
      "0 0 0 6px rgba(196,151,58,0.18)",
      "0 0 0 0 rgba(196,151,58,0)",
    ],
    transition: {
      default: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      boxShadow: { duration: 1.1, delay: 0.4, times: [0, 0.5, 1] },
    },
  },
};

/** Single flow step visual (icon + label), extracted so richer diagrams
 *  (branching, converging) can reuse the exact same node styling as the
 *  linear AutomationFlow instead of duplicating it. */
export function FlowNode({
  icon,
  label,
  isValidation = false,
  animated = false,
}: {
  icon: React.ReactNode;
  label: string;
  isValidation?: boolean;
  animated?: boolean;
}) {
  const className = `flow-node${isValidation ? " flow-node--validation" : ""} flex flex-col items-center justify-center gap-1.5 lg:gap-2 text-center flex-1 min-w-0 lg:py-4`;
  const style = {
    padding: "10px 8px",
    borderRadius: "var(--radius-sm)",
    border: isValidation ? "1px solid var(--gold-border)" : "1px solid var(--border)",
    background: isValidation ? "var(--gold-dim)" : "rgba(255,255,255,0.015)",
  };
  const inner = (
    <>
      <div
        className="flow-node-icon lg:scale-[1.15]"
        style={{ color: isValidation ? "var(--gold)" : "var(--text-muted)" }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 11.5,
          lineHeight: 1.35,
          color: isValidation ? "var(--gold-light)" : "var(--text-muted)",
          fontWeight: isValidation ? 600 : 400,
        }}
        className="lg:text-[12.5px]"
      >
        {label}
      </span>
    </>
  );
  if (!animated) {
    return (
      <div className={className} style={style}>
        {inner}
      </div>
    );
  }
  return (
    <motion.div className={className} style={style} variants={isValidation ? validationNodeVariants : nodeVariants}>
      {inner}
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

/** `animated`: opt-in sequential reveal (stagger in, gold pulse on the
 *  validation node) for contexts where the diagram IS the hero visual and
 *  has room to perform — e.g. VideoShowcase's non-filmed sectors. Off by
 *  default so every sector-page usage keeps its current static rendering. */
export default function AutomationFlow({
  steps,
  ariaLabel,
  animated = false,
}: {
  steps: FlowStep[];
  ariaLabel: string;
  animated?: boolean;
}) {
  const className = "flex flex-row max-[700px]:flex-col items-stretch gap-2 lg:gap-3 max-[700px]:gap-1.5";
  const children = steps.map((step, i) => {
    const Icon = pickIcon(step);
    const isValidation = step.kind === "validation";
    return (
      <Fragment key={i}>
        <FlowNode icon={<Icon />} label={step.label} isValidation={isValidation} animated={animated} />
        {i < steps.length - 1 && <ArrowConnector animated={animated} />}
      </Fragment>
    );
  });
  if (!animated) {
    return (
      <div role="img" aria-label={ariaLabel} className={className}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      role="img"
      aria-label={ariaLabel}
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}
