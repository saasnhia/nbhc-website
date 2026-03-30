export default function Logo({ variant = "nav" }: { variant?: "nav" | "footer" }) {
  const isFooter = variant === "footer";
  const height = isFooter ? 24 : 28;

  return (
    <svg
      height={height}
      viewBox="0 0 80 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, display: "block" }}
    >
      {isFooter ? (
        <g transform="scale(0.857)">
          <rect x={0} y={10} width={8} height={8} rx={2} fill="#C4973A" />
          <text
            x={14}
            y={20}
            fill="#F0EDE6"
            fontFamily="var(--font-syne), Syne, sans-serif"
            fontWeight={800}
            fontSize={22}
            letterSpacing="-0.5px"
          >
            NBHC
          </text>
        </g>
      ) : (
        <>
          <rect x={0} y={10} width={8} height={8} rx={2} fill="#C4973A" />
          <text
            x={14}
            y={20}
            fill="#F0EDE6"
            fontFamily="var(--font-syne), Syne, sans-serif"
            fontWeight={800}
            fontSize={22}
            letterSpacing="-0.5px"
          >
            NBHC
          </text>
        </>
      )}
    </svg>
  );
}
