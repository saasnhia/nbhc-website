"use client";

// Enveloppe de montage — c'est ici que se joue le coût réseau.
//
// Le lecteur et les compositions ne sont téléchargés QUE lorsque la section
// entre dans le viewport (import dynamique sans SSR + IntersectionObserver).
// Et un seul lecteur vit à la fois : la `key` sur le secteur force React à
// démonter complètement le précédent au changement d'onglet, plutôt que d'en
// garder neuf en mémoire.
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { DemoKey } from "./registry";

const PremiumPlayer = dynamic(() => import("./PremiumPlayer"), {
  ssr: false,
  loading: () => <Placeholder />,
});

function Placeholder() {
  return (
    <div
      className="w-full min-[1024px]:ml-auto min-[1024px]:w-[63%]"
      style={{
        aspectRatio: "16 / 9",
        borderRadius: 16,
        background: "linear-gradient(150deg, #1A1A24, #0B0B10)",
      }}
    />
  );
}

export default function PremiumDemoSection({
  demoKey,
  labels,
  validateLabel,
  hintLabel,
  ariaLabel,
  stepsLabel,
  eyebrow,
  title,
  contextLine,
  benefit,
}: {
  demoKey: DemoKey;
  labels: string[];
  validateLabel: string;
  hintLabel: string;
  ariaLabel: string;
  stepsLabel?: string;
  eyebrow?: string;
  title?: string;
  contextLine?: string;
  benefit?: string;
}) {
  const holder = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={holder}>
      {visible ? (
        <PremiumPlayer
          key={demoKey}
          demoKey={demoKey}
          labels={labels}
          validateLabel={validateLabel}
          hintLabel={hintLabel}
          ariaLabel={ariaLabel}
          stepsLabel={stepsLabel}
          eyebrow={eyebrow}
          title={title}
          contextLine={contextLine}
          benefit={benefit}
        />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}
