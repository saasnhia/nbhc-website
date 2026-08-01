// Palette dérivée de ../nbhc/tokens (marque NBHC, fond noir "style Apple",
// accent unique #0A84FF). On n'y touche pas : on ajoute seulement les
// surfaces de scène nécessaires pour que chaque plan tienne la bande de
// luminance 28-55 mesurée contre hero.webm.
//
// Le noir pur (#000) plaquait la luminance moyenne à 10,9 — c'est ce qui
// produisait l'effet "bloc collé". Le fond est donc un dégradé sombre mais
// non nul, et chaque plan pose une surface dominante qui remplit 50-70 %
// du cadre.
// Tokens de marque des demos, recopies depuis le pipeline Remotion (vlogyz,
// remotion/nbhc/tokens.ts) : ce repo n'a pas acces a ce module. Palette
// "Apple" — fond quasi noir neutre, accent bleu systeme unique.
// Les demos gardent volontairement cette identite, distincte de la charte
// doree du site qui habille la section autour.
export const COLORS = {
  bg: "#000000",
  bgElevated: "#0A0A0C",
  glassDark: "rgba(26, 26, 28, 0.94)",
  glassDarkBorder: "rgba(255, 255, 255, 0.12)",
  text: "#F5F5F7",
  textMuted: "#86868B",
  textDim: "#6E6E73",
  accent: "#0A84FF",
  accentSoft: "rgba(10, 132, 255, 0.14)",
  accentGlow: "rgba(10, 132, 255, 0.20)",
  accentBorder: "rgba(10, 132, 255, 0.32)",
  positive: "#30D158",
  positiveSoft: "rgba(48, 209, 88, 0.14)",
  positiveGlow: "rgba(48, 209, 88, 0.20)",
  negative: "#FF453A",
  negativeSoft: "rgba(255, 69, 58, 0.14)",
  pure: "#FFFFFF",
} as const;

// Polices servies par next/font (voir premiumFonts.ts) au lieu de
// @remotion/google-fonts : ce paquet pese 67 Mo et va chercher les fontes
// chez Google au runtime — inacceptable sur une page publique.
export const FONTS = {
  display: "var(--font-jakarta), sans-serif",
  body: "var(--font-manrope), sans-serif",
} as const;

export const SPRINGS = {
  enter: { mass: 0.9, damping: 26, stiffness: 90 },
  exit: { mass: 0.8, damping: 24, stiffness: 100 },
  gentle: { mass: 1, damping: 22, stiffness: 70 },
} as const;

// Valeurs relevées d'un cran après la 1re passe de vérification : trois plans
// tombaient sous la bande (25,0 / 26,6 / 26,9). Le noir de marque reste le
// fond, mais les surfaces dominantes portent la luminance.
export const SURFACE = {
  bgTop: "#1A1A24",
  bgBottom: "#0B0B10",
  stage: "#2A2A36",
  card: "#33333F",
  cardHi: "#3E3E4C",
  dim: "#24242E",
  border: "rgba(255, 255, 255, 0.16)",
  borderSoft: "rgba(255, 255, 255, 0.10)",
} as const;

export const PREMIUM_FORMAT = {
  width: 1920,
  height: 1080,
  fps: 24,
  durationFrames: 396,
} as const;

// Découpage des 8 plans. 2,0 s chacun (48f @24fps), 2,5 s pour la
// validation — le climax, comme hero.webm donne 3,2 s au sien.
export const SHOTS = {
  appel: { from: 0, dur: 48 },
  repond: { from: 48, dur: 48 },
  comprend: { from: 96, dur: 48 },
  planning: { from: 144, dur: 48 },
  creneau: { from: 192, dur: 48 },
  fiche: { from: 240, dur: 48 },
  validation: { from: 288, dur: 60 },
  benefice: { from: 348, dur: 48 },
} as const;
