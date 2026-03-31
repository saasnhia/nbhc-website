import { createCanvas } from 'canvas'
import fs from 'fs'

// ── 1. Logo LinkedIn 1000x1000 ──
const canvas = createCanvas(1000, 1000)
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#09090b'
ctx.fillRect(0, 0, 1000, 1000)

// Carré or avec border-radius
const r = 24, x = 280, y = 280, s = 180
ctx.beginPath()
ctx.moveTo(x + r, y)
ctx.lineTo(x + s - r, y)
ctx.quadraticCurveTo(x + s, y, x + s, y + r)
ctx.lineTo(x + s, y + s - r)
ctx.quadraticCurveTo(x + s, y + s, x + s - r, y + s)
ctx.lineTo(x + r, y + s)
ctx.quadraticCurveTo(x, y + s, x, y + s - r)
ctx.lineTo(x, y + r)
ctx.quadraticCurveTo(x, y, x + r, y)
ctx.closePath()
ctx.fillStyle = '#C4973A'
ctx.fill()

// Texte NBHC
ctx.fillStyle = '#F0EDE6'
ctx.font = 'bold 220px Arial'
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.fillText('NBHC', 500, 620)

const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('public/nbhc-logo-linkedin.png', buffer)
console.log('Logo LinkedIn généré : public/nbhc-logo-linkedin.png')

// ── 2. OG Image 1200x630 ──
const og = createCanvas(1200, 630)
const octx = og.getContext('2d')

octx.fillStyle = '#09090b'
octx.fillRect(0, 0, 1200, 630)

// Carré or
const r2 = 8, x2 = 80, y2 = 240, s2 = 60
octx.beginPath()
octx.moveTo(x2 + r2, y2)
octx.lineTo(x2 + s2 - r2, y2)
octx.quadraticCurveTo(x2 + s2, y2, x2 + s2, y2 + r2)
octx.lineTo(x2 + s2, y2 + s2 - r2)
octx.quadraticCurveTo(x2 + s2, y2 + s2, x2 + s2 - r2, y2 + s2)
octx.lineTo(x2 + r2, y2 + s2)
octx.quadraticCurveTo(x2, y2 + s2, x2, y2 + s2 - r2)
octx.lineTo(x2, y2 + r2)
octx.quadraticCurveTo(x2, y2, x2 + r2, y2)
octx.closePath()
octx.fillStyle = '#C4973A'
octx.fill()

// NBHC
octx.fillStyle = '#F0EDE6'
octx.font = 'bold 96px Arial'
octx.textAlign = 'left'
octx.textBaseline = 'alphabetic'
octx.fillText('NBHC', 80, 380)

// Sous-texte
octx.fillStyle = '#8C8880'
octx.font = '36px Arial'
octx.fillText('Studio IA & Automatisation · France', 80, 430)

// Ligne dorée
octx.fillStyle = '#C4973A'
octx.fillRect(80, 460, 120, 3)

// nbhc.fr
octx.fillStyle = '#C4973A'
octx.font = '28px Arial'
octx.fillText('nbhc.fr', 80, 510)

const buffer2 = og.toBuffer('image/png')
fs.writeFileSync('public/og-image.png', buffer2)
console.log('OG image générée : public/og-image.png')
