"use client";

import { createContext, useContext, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextType {
  stop: () => void;
  start: () => void;
  refresh: () => void;
}

const LenisContext = createContext<LenisContextType>({
  stop: () => {},
  start: () => {},
  refresh: () => {},
});

export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);
  const refresh = useCallback(() => {
    gsap.delayedCall(0.1, () => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
    });
    lenisRef.current = lenis;

    // Bridge Lenis → ScrollTrigger (critical for pin)
    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={{ stop, start, refresh }}>
      {children}
    </LenisContext.Provider>
  );
}
