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

// Repli mobile : sous 1024 px on sert le MP4 du secteur au lieu du lecteur
// Remotion. Mesure a l'appui — WebKit tombe a 3,7 fps avec le lecteur, et
// plafonne a 9,5 meme en sacrifiant tous les filtres et toutes les ombres.
// La video est fluide par nature, et le geste de validation est conserve.
const MobileDemoVideo = dynamic(() => import("./MobileDemoVideo"), {
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
  // `null` tant qu'on n'a pas mesure : on ne monte rien avant de savoir quel
  // des deux servir, pour ne jamais charger le lecteur puis la video.
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
      {visible && desktop === false ? (
        <MobileDemoVideo
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
      ) : visible && desktop === true ? (
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
