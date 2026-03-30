"use client";

import { useState, useCallback } from "react";
import SmoothScroll, { useLenis } from "./SmoothScroll";
import Cursor from "./Cursor";
import Loader from "./Loader";

function AppContent({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const lenis = useLenis();

  const handleLoaded = useCallback(() => {
    setLoaded(true);
    lenis.start();
    lenis.refresh();
  }, [lenis]);

  return (
    <>
      <Loader onComplete={handleLoaded} />
      <Cursor />
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <AppContent>{children}</AppContent>
    </SmoothScroll>
  );
}
