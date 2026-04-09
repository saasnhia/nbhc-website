"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

/** Shared card wrapper for all product flow steps */
export function FlowCard({
  step,
  title,
  accent,
  delay = 0,
  children,
}: {
  step: string;
  title: string;
  accent: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        background: "#0d0d0f",
        border: `1px solid ${accent}26`,
        borderRadius: 14,
        padding: 20,
      }}
    >
      <div className="flex items-baseline gap-3 mb-3">
        <span
          className="italic"
          style={{
            color: accent,
            fontFamily: "var(--font-syne)",
            fontWeight: 600,
            fontSize: 13,
            opacity: 0.65,
            letterSpacing: "0.5px",
          }}
        >
          {step}
        </span>
        <h4
          className="font-semibold"
          style={{
            color: "var(--text)",
            fontFamily: "var(--font-syne)",
            fontSize: 15,
            letterSpacing: "-0.3px",
          }}
        >
          {title}
        </h4>
      </div>
      <div>{children}</div>
    </motion.div>
  );
}
