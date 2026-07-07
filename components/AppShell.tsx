"use client";

import { useCallback } from "react";
import SmoothScroll, { useLenis } from "./SmoothScroll";
import Cursor from "./Cursor";
import Loader from "./Loader";
import FounderBanner from "./FounderBanner";

function AppContent({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();

  const handleLoaded = useCallback(() => {
    lenis.start();
    lenis.refresh();
  }, [lenis]);

  return (
    <>
      <Loader onComplete={handleLoaded} />
      <Cursor />
      {/* Content renders immediately (real LCP candidate); the opaque Loader
          overlay covers it visually until its slide-out animation completes.
          Do not gate this in opacity — that made the Loader's own logo text
          the measured LCP element (5s+ render delay, see SEO_AUDIT_STRATEGIE.md). */}
      <div>
        <FounderBanner />
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
