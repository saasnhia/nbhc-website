"use client";

import { useEffect, useRef } from "react";

export type DemoVideoName =
  | "garage"
  | "restaurant"
  | "pharmacie"
  | "coiffure"
  | "opticien"
  | "btp"
  | "formation"
  | "cosmetique"
  | "sport";

export default function DemoVideo({
  name,
  ariaLabel,
}: {
  name: DemoVideoName;
  ariaLabel?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const load = () => {
      const mp4 = document.createElement("source");
      mp4.src = `/demo-${name}.mp4`;
      mp4.type = "video/mp4";
      v.appendChild(mp4);
      v.load();
      v.play().catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(load, { timeout: 2000 });
    } else {
      setTimeout(load, 1200);
    }
  }, [name]);

  const poster = `/demo-${name}-poster.jpg`;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "16 / 9", borderRadius: "var(--radius)" }}
    >
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        className="demo-video absolute inset-0 h-full w-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        aria-label={ariaLabel}
      />
    </div>
  );
}
