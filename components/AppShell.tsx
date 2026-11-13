"use client";

import { useLocale } from "next-intl";
import SmoothScroll from "./SmoothScroll";

/* Le préchargeur, le curseur dessiné et le bandeau doré sont sortis de la
   coquille. Elle porte en revanche le lien d'évitement : au clavier, la
   première tabulation propose d'aller droit au contenu, sous la barre fixe. */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  return (
    <SmoothScroll>
      <a href="#contenu" className="lien-evitement">
        {locale === "en" ? "Skip to content" : "Aller au contenu"}
      </a>
      <div id="contenu" tabIndex={-1} style={{ outline: "none" }}>
        {children}
      </div>
    </SmoothScroll>
  );
}
