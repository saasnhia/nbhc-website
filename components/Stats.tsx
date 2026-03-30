"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3, suffix: "+", label: "SaaS en production" },
  { value: 33, suffix: "+", label: "Features déployées sur Vlogyz" },
  { value: 5, suffix: "GB", label: "Upload max géré sans serveur intermédiaire" },
  { value: 100, suffix: "%", label: "Hébergement France & Europe" },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(obj.val)}${suffix}`;
          },
        });
      },
    });

    return () => st.kill();
  }, [value, suffix]);

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
      0{suffix}
    </div>
  );
}

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
