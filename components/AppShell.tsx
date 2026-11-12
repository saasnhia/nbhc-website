"use client";

import SmoothScroll from "./SmoothScroll";

/* Le préchargeur, le curseur dessiné et le bandeau doré sont sortis de la
   coquille. Le préchargeur retardait une page déjà servie, le curseur restait
   figé en haut à gauche tant que la souris n'avait pas bougé, et le bandeau
   répétait le bouton de la barre de navigation. Les trois fichiers restent
   dans components/ ; plus rien ne les monte. */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>;
}
