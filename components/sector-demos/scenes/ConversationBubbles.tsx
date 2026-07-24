"use client";

import { motion, useReducedMotion } from "framer-motion";

export type ConversationTurn = {
  speaker: "ia" | "client";
  text: string;
};

/** Short call transcript, IA on the left in gold, caller on the right in
 *  neutral — reveals turn by turn on mount so it reads like it's actually
 *  happening, not a wall of text dropped at once. */
export default function ConversationBubbles({ turns }: { turns: ConversationTurn[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex flex-col gap-2.5 w-full" style={{ maxWidth: 380 }}>
      {turns.map((turn, i) => {
        const isIa = turn.speaker === "ia";
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: reduceMotion ? 0 : i * 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
            style={{ justifyContent: isIa ? "flex-start" : "flex-end" }}
          >
            <div
              className="text-[13px] px-3.5 py-2 rounded-2xl"
              style={{
                maxWidth: "82%",
                lineHeight: 1.5,
                background: isIa ? "var(--gold-dim)" : "rgba(255,255,255,0.04)",
                border: isIa ? "1px solid var(--gold-border)" : "1px solid var(--border)",
                color: isIa ? "var(--gold-light)" : "var(--text)",
                borderBottomLeftRadius: isIa ? 4 : undefined,
                borderBottomRightRadius: isIa ? undefined : 4,
              }}
            >
              {turn.text}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
