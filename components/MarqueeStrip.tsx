"use client";

import { motion } from "framer-motion";

const items = [
  "Next.js 16",
  "Supabase",
  "Mistral AI",
  "Stripe",
  "TypeScript",
  "Groq Whisper",
  "Remotion",
  "FFmpeg",
  "Vercel",
  "Tailwind CSS",
  "Hetzner",
  "PostgreSQL",
  "React",
  "Resend",
];

export default function MarqueeStrip() {
  return (
    <div
      className="overflow-hidden py-3.5"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <motion.div
        className="flex gap-12"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-xs font-medium tracking-widest uppercase whitespace-nowrap flex items-center gap-3"
            style={{ color: "var(--text-dim)" }}
          >
            <span className="text-[8px]" style={{ color: "var(--gold)" }}>
              ◆
            </span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
