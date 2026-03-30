'use client'
interface LogoProps { variant?: 'nav' | 'footer' }
export default function Logo({ variant = 'nav' }: LogoProps) {
  const height = variant === 'nav' ? 28 : 24
  return (
    <svg
      height={height}
      viewBox="0 0 100 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <rect x="0" y="10" width="8" height="8" rx="2" fill="#C4973A" />
      <text
        x="16"
        y="23"
        fontFamily="Syne, sans-serif"
        fontWeight="800"
        fontSize="21"
        fill="#F0EDE6"
      >NBHC</text>
    </svg>
  )
}
