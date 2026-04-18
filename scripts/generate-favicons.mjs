import sharp from "sharp";
import fs from "node:fs";

const svgBuffer = fs.readFileSync("./public/favicon.svg");

const targets = [
  { size: 16, out: "./public/favicon-16.png" },
  { size: 32, out: "./public/favicon-32.png" },
  { size: 180, out: "./public/apple-touch-icon.png" },
  { size: 192, out: "./public/icon-192.png" },
  { size: 512, out: "./public/icon-512.png" },
];

for (const t of targets) {
  await sharp(svgBuffer).resize(t.size, t.size).png().toFile(t.out);
  const { size } = fs.statSync(t.out);
  console.log(`${t.out} (${t.size}×${t.size}, ${size} B)`);
}

console.log("Favicons generated.");
