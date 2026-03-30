export default function Logo({ size = 36 }: { size?: number }) {
  const r = size === 32 ? 5 : 6;
  const fontSize = size === 32 ? 14 : 16;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: r, flexShrink: 0 }}
    >
      <rect width={size} height={size} rx={r} fill="#C4973A" />
      <text
        x="50%"
        y="54%"
        dominantBaseline="central"
        textAnchor="middle"
        fill="#09090b"
        fontFamily="var(--font-syne), Syne, sans-serif"
        fontWeight="800"
        fontSize={fontSize}
        letterSpacing="-0.5px"
      >
        NB
      </text>
    </svg>
  );
}
