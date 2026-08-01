// Polices propres aux démos premium, servies par next/font (auto-hébergées,
// preload, zéro requête vers Google au runtime).
//
// Remplace @remotion/google-fonts, utilisé côté pipeline de rendu : ce paquet
// pèse 67 Mo et va chercher les fontes chez Google à l'exécution — inacceptable
// sur une page publique, et un tiers de plus dans la chaîne de chargement.
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

export const premiumFontClass = `${jakarta.variable} ${manrope.variable}`;
