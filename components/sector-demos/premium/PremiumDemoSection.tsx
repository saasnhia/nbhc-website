"use client";

// Enveloppe de montage : c'est ici que se joue le coût réseau.
//
// Le lecteur et les compositions ne sont téléchargés QUE lorsque la section
// entre dans le viewport — un import dynamique sans SSR, déclenché par un
// IntersectionObserver. Tant que le prospect n'a pas fait défiler jusqu'ici,
// la page ne paie rien : ni le player, ni Remotion, ni les scènes.
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const PremiumPlayer = dynamic(() => import("./PremiumPlayer"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 18,
        background: "linear-gradient(150deg, #1A1A24, #0B0B10)",
      }}
    />
  ),
});

const STEP_LABELS = [
  "L’appel arrive",
  "L’assistant répond",
  "Il comprend la demande",
  "Il vérifie le planning",
  "Il propose un créneau",
  "Il rédige la fiche",
  "Vous validez",
  "Le résultat",
];

export default function PremiumDemoSection() {
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
          labels={STEP_LABELS}
          validateLabel="Valider"
          hintLabel="La fiche attend votre validation — rien n’est envoyé sans elle."
        />
      ) : (
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: 18,
            background: "linear-gradient(150deg, #1A1A24, #0B0B10)",
          }}
        />
      )}
    </div>
  );
}
