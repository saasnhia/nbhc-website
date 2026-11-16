/* Un écran RÉEL d'un produit, présenté dans un cadre de fenêtre. L'image n'est
   ni redessinée ni retouchée : elle vient du dépôt du produit, seulement rognée
   et redimensionnée (voir la liste des sources dans le message de commit).
   Le cadre est le seul habillage : une barre, trois points, l'adresse. */
type Props = {
  /** Nom de fichier sans largeur ni extension, dans /public/ecrans. */
  nom: string;
  /** Largeurs disponibles, croissantes. La dernière est la source affichée. */
  largeurs: number[];
  /** Dimensions de la plus grande version, pour réserver la place. */
  width: number;
  height: number;
  alt: string;
  /** Texte de la barre : l'adresse ou la nature de l'écran. */
  barre: string;
  sizes: string;
  /** Vrai pour l'image du premier écran : chargée sans attendre. */
  prioritaire?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export default function EcranReel({
  nom,
  largeurs,
  width,
  height,
  alt,
  barre,
  sizes,
  prioritaire,
  className,
  style,
}: Props) {
  const plusGrande = largeurs[largeurs.length - 1];
  return (
    <div
      className={className}
      style={{
        background: "#17171a",
        border: "1px solid var(--border-accent)",
        borderRadius: 12,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        className="flex items-center"
        style={{ height: 32, padding: "0 12px", borderBottom: "1px solid var(--border)" }}
      >
        <span aria-hidden="true" className="flex" style={{ gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{ width: 8, height: 8, borderRadius: 4, background: "#3E3D3A" }}
            />
          ))}
        </span>
        <span
          className="flex-1 text-center truncate"
          style={{ fontSize: 12, color: "var(--text-muted)", padding: "0 12px" }}
        >
          {barre}
        </span>
        <span aria-hidden="true" style={{ width: 36 }} />
      </div>
      <img
        src={`/ecrans/${nom}-${plusGrande}.webp`}
        srcSet={largeurs.map((l) => `/ecrans/${nom}-${l}.webp ${l}w`).join(", ")}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={prioritaire ? "eager" : "lazy"}
        fetchPriority={prioritaire ? "high" : undefined}
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}
