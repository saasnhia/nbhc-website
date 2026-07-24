"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhoneIcon } from "../icons";

/** Trigger scene: a phone ringing while nobody can answer. Used verbatim
 *  for any sector whose flagship automation starts with a missed call
 *  (garage, restaurant, coiffure) — the ring visual and caption text are
 *  the only per-sector inputs, so this stays a single component. */
export default function PhoneRingScene({ caption }: { caption: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative flex items-center justify-center" style={{ width: 96, height: 96 }}>
        {!reduceMotion &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{ border: "1.5px solid var(--gold-border)" }}
              initial={{ width: 60, height: 60, opacity: 0.6 }}
              animate={{ width: 110, height: 110, opacity: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
            />
          ))}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--gold-dim)",
            border: "1px solid var(--gold-border)",
            color: "var(--gold)",
          }}
        >
          <PhoneIcon />
        </div>
      </div>
      <p
        className="text-sm text-center max-w-[380px]"
        style={{ color: "var(--text-muted)", lineHeight: 1.6 }}
      >
        {caption}
      </p>
    </div>
  );
}
