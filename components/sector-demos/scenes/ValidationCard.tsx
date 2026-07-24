"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon } from "../icons";

export type ValidationLine = { label: string; value: string };

/**
 * The moment the demo exists to teach: a draft the automation prepared,
 * that only becomes real once the visitor — standing in for the pro —
 * clicks to confirm it. Nothing here is a passive animation; the visitor
 * has to act, same as the pro would.
 */
export default function ValidationCard({
  title,
  lines,
  validateLabel,
  confirmedLabel,
  helperText,
}: {
  title: string;
  lines: ValidationLine[];
  validateLabel: string;
  confirmedLabel: string;
  helperText: string;
}) {
  const [validated, setValidated] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-full"
        style={{
          maxWidth: 340,
          borderRadius: "var(--radius)",
          border: validated ? "1px solid var(--gold-border)" : "1px solid var(--border)",
          background: validated ? "var(--gold-dim)" : "rgba(255,255,255,0.02)",
          padding: 22,
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text)",
            }}
          >
            {title}
          </span>
          <AnimatePresence>
            {validated && (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ color: "var(--gold)" }}
              >
                <CheckCircleIcon />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col gap-1.5 mb-4">
          {lines.map((l) => (
            <div key={l.label} className="flex justify-between text-[13px]" style={{ color: "var(--text-muted)" }}>
              <span>{l.label}</span>
              <span style={{ color: "var(--text)" }}>{l.value}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          data-cursor="link"
          disabled={validated}
          onClick={() => setValidated(true)}
          className="w-full text-[13px] font-semibold py-2.5 rounded-md transition-all cursor-pointer disabled:cursor-default"
          style={{
            background: validated ? "transparent" : "var(--gold)",
            color: validated ? "var(--gold-light)" : "#0a0a0b",
            border: validated ? "1px solid var(--gold-border)" : "none",
          }}
        >
          {validated ? confirmedLabel : validateLabel}
        </button>
      </div>
      <p className="text-[13px] text-center max-w-[340px]" style={{ color: "var(--text-dim)", lineHeight: 1.55 }}>
        {helperText}
      </p>
    </div>
  );
}
