'use client'
interface LogoProps { variant?: 'nav' | 'footer' }
export default function Logo({ variant = 'nav' }: LogoProps) {
  return (
    <svg
      width={variant === 'nav' ? 105 : 90}
      height={variant === 'nav' ? 28 : 24}
      viewBox="0 0 105 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="10" width="8" height="8"
        rx="2" fill="#C4973A" />
      <text
        x="15"
        y="23"
        fontFamily="Syne, sans-serif"
        fontWeight="800"
        fontSize="20"
        fill="#F0EDE6"
      >NBHC</text>
    </svg>
  )
}
