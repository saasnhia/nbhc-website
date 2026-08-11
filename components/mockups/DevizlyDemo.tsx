/* L'image « devizly demo » remplace la maquette codee (DevizlyMockup) — decision du
   gate « Nos produits ». AFFICHAGE PLAFONNE A 582 px : c'est la largeur native du
   maitre ; plus large serait un sur-echantillonnage. Les largeurs servies mesurees
   au navigateur (jamais via `sizes`) sont min(colonne, 582) : 342 au viewport 390,
   582 partout ailleurs — d'ou les deux paliers. La densite 2 au-dela de 582 n'est
   pas couvrable : resolution de la source. */
const PALIERS = [342, 582];

export default function DevizlyDemo() {
  return (
    <img
      src="/produit-devizly-582.webp"
      srcSet={PALIERS.map((p) => `/produit-devizly-${p}.webp ${p}w`).join(", ")}
      sizes="(max-width: 630px) calc(100vw - 48px), 582px"
      width={582}
      height={762}
      alt="Interface Devizly : devis de rénovation détaillé avec séquestre sécurisé, paiement en plusieurs fois et remboursement en un clic"
      loading="lazy"
      decoding="async"
      className="block h-auto w-full mx-auto"
      style={{
        maxWidth: 582,
        borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    />
  );
}
