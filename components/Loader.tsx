'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoaderProps { onComplete: () => void }

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const squareRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(squareRef.current, {
      scale: 0,
      duration: 0.4,
      ease: 'power3.out'
    })
    .from(textRef.current, {
      x: 16,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.out'
    }, '-=0.15')
    .to(overlayRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut',
      delay: 0.2,
      onComplete
    })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#09090b',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
      }}
    >
      <div
        ref={squareRef}
        style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          background: '#C4973A',
          flexShrink: 0,
        }}
      />
      <div
        ref={textRef}
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 28,
          color: '#F0EDE6',
          letterSpacing: '-1px',
        }}
      >
        NBHC
      </div>
    </div>
  )
}
