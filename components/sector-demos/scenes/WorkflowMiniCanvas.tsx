"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

export type WorkflowNode = {
  label: string;
  icon: React.ReactNode;
};

const nodeVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

/** Compact node+arrow canvas naming the REAL mechanism steps for one
 *  automation (not a generic trigger/process/action/validation shape) —
 *  e.g. "Appel entrant → Transcription → L'IA comprend → Vérifie le
 *  planning". Wraps on narrow viewports instead of shrinking illegibly. */
export default function WorkflowMiniCanvas({ nodes, ariaLabel }: { nodes: WorkflowNode[]; ariaLabel: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      role="img"
      aria-label={ariaLabel}
      className="flex flex-row flex-wrap items-stretch justify-center gap-x-1.5 gap-y-3"
      initial={reduceMotion ? "visible" : "hidden"}
      animate="visible"
      variants={containerVariants}
    >
      {nodes.map((n, i) => (
        <Fragment key={i}>
          <motion.div
            variants={nodeVariants}
            className="flex flex-col items-center justify-center gap-1.5 text-center"
            style={{
              width: 108,
              padding: "10px 6px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border)",
              background: "rgba(255,255,255,0.015)",
            }}
          >
            <div style={{ color: "var(--gold)" }}>{n.icon}</div>
            <span style={{ fontSize: 11, lineHeight: 1.3, color: "var(--text-muted)" }}>{n.label}</span>
          </motion.div>
          {i < nodes.length - 1 && (
            <motion.div
              variants={nodeVariants}
              className="flex items-center justify-center shrink-0"
              style={{ color: "var(--text-dim)" }}
              aria-hidden="true"
            >
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10h11M11 5.5L15.5 10 11 14.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}
        </Fragment>
      ))}
    </motion.div>
  );
}
