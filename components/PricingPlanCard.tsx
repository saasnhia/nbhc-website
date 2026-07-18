export type PricingPlanCardProps = {
  badge?: string;
  tag: string;
  name: string;
  price: string;
  priceSub?: string;
  desc: string;
  features: string[];
  feeNote?: string;
  featured?: boolean;
};

export default function PricingPlanCard({
  badge,
  tag,
  name,
  price,
  priceSub,
  desc,
  features,
  feeNote,
  featured,
}: PricingPlanCardProps) {
  return (
    <div
      className="flex flex-col"
      style={{
        background: "var(--card)",
        border: featured ? "1px solid var(--gold-border)" : "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "28px 24px",
        backgroundImage: featured
          ? "linear-gradient(180deg, rgba(196,151,58,0.06), var(--card) 40%)"
          : undefined,
      }}
    >
      {badge && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 0.5,
            color: "var(--gold-light)",
            background: "var(--gold-dim)",
            border: "1px solid var(--gold-border)",
            borderRadius: 999,
            padding: "4px 10px",
            display: "inline-block",
            marginBottom: 14,
            width: "fit-content",
          }}
        >
          {badge}
        </span>
      )}
      <div
        style={{
          fontSize: 11.5,
          color: "var(--text-dim)",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 10,
        }}
      >
        {tag}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: 19,
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 6,
        }}
      >
        {name}
      </h3>
      <div
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: 21,
          fontWeight: 700,
          color: "var(--gold-light)",
          marginBottom: priceSub ? 4 : 16,
          lineHeight: 1.25,
        }}
      >
        {price}
      </div>
      {priceSub && (
        <div style={{ fontSize: 12.5, color: "var(--text-muted)", marginBottom: 16 }}>
          {priceSub}
        </div>
      )}
      <p style={{ fontSize: 13.5, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 18 }}>
        {desc}
      </p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, fontSize: 13.5, color: "var(--text)", flex: 1 }}>
        {features.map((f, i) => (
          <li
            key={f}
            style={{
              padding: "7px 0",
              borderTop: i === 0 ? "none" : "1px solid var(--border)",
              display: "flex",
              gap: 8,
            }}
          >
            <span style={{ color: "var(--gold)", flexShrink: 0, fontWeight: 700 }}>✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {feeNote && (
        <div
          style={{
            marginTop: 14,
            paddingTop: 14,
            borderTop: "1px solid var(--border)",
            fontSize: 12,
            color: "var(--text-muted)",
            lineHeight: 1.6,
          }}
        >
          {feeNote}
        </div>
      )}
    </div>
  );
}
