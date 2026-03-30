"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

function AnimatedNumber({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="font-extrabold leading-none mb-2"
      style={{
        fontFamily: "var(--font-syne)",
        fontSize: 48,
        color: "var(--text)",
        letterSpacing: "-2px",
      }}
    >
      {display}
      <span style={{ color: "var(--gold)" }}>{suffix}</span>
    </div>
  );
}

const stats = [
  { value: 3, suffix: "+", label: "SaaS en production" },
  { value: 33, suffix: "+", label: "Features déployées sur Vlogyz" },
  { value: 5, suffix: "GB", label: "Upload max géré sans serveur intermédiaire" },
  { value: 100, suffix: "%", label: "Hébergement France & Europe" },
];

export default function Stats() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div
        className="grid grid-cols-4 max-md:grid-cols-2"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="py-12 px-10 max-md:border-b"
            style={{
              borderRight:
                i < stats.length - 1 ? "1px solid var(--border)" : "none",
              borderColor: "var(--border)",
            }}
          >
            <AnimatedNumber value={s.value} suffix={s.suffix} />
            <div
              className="text-[13px] font-normal"
              style={{ color: "var(--text-muted)" }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
