#!/usr/bin/env node
// CHERCHE LA CLASSE D'EXPRESSIONS QUE LE MINIFICATEUR DE PRODUCTION CASSE.
//
// LE BUG, delimite par quatorze sondes sur un build de production (Next 16.2.1,
// React 19.2.4, reproduit a l'identique avec Turbopack ET avec webpack, absent en
// next dev) :
//
//   Quand DEUX gabarits interpoles ou plus sont combines par l'operateur + dans une
//   meme expression, le minificateur SUPPRIME la fin de chaque gabarit apres sa
//   derniere interpolation, sauf pour le dernier de la chaine. Une chaine litterale
//   placee ENTRE deux gabarits interpoles disparait aussi.
//
//   `a${1}b` + `c${2}d`                      ->  a1c2d       (b perdu)
//   `a${1}b` + "MILIEU" + `c${2}d`           ->  a1c2d       (b et MILIEU perdus)
//   `a${1}b` + `c${2}d` + `e${3}f`           ->  a1c2e3f     (b et d perdus)
//   `${1}a` + `${2}b`                        ->  12b         (a perdu)
//
// CE QUI EST SUR, mesure sur le meme build :
//   un seul gabarit interpole, meme avec plusieurs interpolations
//   un gabarit interpole + une chaine litterale (un seul gabarit dans la chaine)
//   deux gabarits passes en ARGUMENTS d'une fonction qui les concatene
//   deux gabarits assignes a des constantes, puis concatenes
//   un tableau de gabarits joint par .join("")
//   un gabarit dans un ternaire, seul ou dans une concatenation
//   className et style construits par un gabarit unique
//
// LA REGLE, courte : NE JAMAIS COMBINER DEUX GABARITS INTERPOLES PAR +. Ecrire un
// seul gabarit, ou joindre un tableau, ou passer par des variables.
//
// Ce script signale la classe entiere, pas le motif d'origine. Il ne parse pas le
// JavaScript : il repere les gabarits contenant ${, puis regarde ce qui separe deux
// gabarits consecutifs. Si la separation contient un + et aucun caractere qui
// trahirait un autre contexte (virgule d'argument, point-virgule, accolade), c'est
// un candidat. Faux positifs possibles, faux negatifs improbables — et pour ce
// genre de garde-fou c'est le bon sens de l'erreur.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const RACINE = process.argv[2] || ".";
const EXCLUS = new Set(["node_modules", ".next", ".git", "outils", "public"]);
const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs"];

function fichiers(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (EXCLUS.has(e)) continue;
    const p = join(dir, e);
    const s = statSync(p);
    if (s.isDirectory()) fichiers(p, out);
    else if (EXTENSIONS.some((x) => e.endsWith(x))) out.push(p);
  }
  return out;
}

// Reperage des gabarits : on avance caractere par caractere en tenant compte des
// chaines et des commentaires, pour ne pas prendre un backtick dans un commentaire
// pour un gabarit.
function gabarits(src) {
  const out = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i];
    if (c === "/" && src[i + 1] === "/") { while (i < n && src[i] !== "\n") i++; continue; }
    if (c === "/" && src[i + 1] === "*") { i += 2; while (i < n && !(src[i] === "*" && src[i + 1] === "/")) i++; i += 2; continue; }
    if (c === '"' || c === "'") {
      const q = c; i++;
      while (i < n && src[i] !== q) { if (src[i] === "\\") i++; i++; }
      i++; continue;
    }
    if (c === "`") {
      const debut = i; i++;
      let profondeur = 0, interp = false;
      while (i < n) {
        if (src[i] === "\\") { i += 2; continue; }
        if (src[i] === "$" && src[i + 1] === "{") { interp = true; profondeur++; i += 2; continue; }
        if (profondeur > 0 && src[i] === "}") { profondeur--; i++; continue; }
        if (profondeur === 0 && src[i] === "`") break;
        i++;
      }
      i++;
      out.push({ debut, fin: i, interp, texte: src.slice(debut, i) });
      continue;
    }
    i++;
  }
  return out;
}

let total = 0;
for (const f of fichiers(RACINE)) {
  const src = readFileSync(f, "utf8");
  const g = gabarits(src).filter((x) => x.interp);
  for (let k = 0; k + 1 < g.length; k++) {
    const entre = src.slice(g[k].fin, g[k + 1].debut);
    if (!entre.includes("+")) continue;
    if (/[,;{}]/.test(entre.replace(/\s/g, ""))) continue;
    const ligne = src.slice(0, g[k].debut).split("\n").length;
    total++;
    console.log(`${relative(RACINE, f)}:${ligne}`);
    console.log(`   ${g[k].texte.slice(0, 60)}  ${entre.trim().slice(0, 20)}  ${g[k + 1].texte.slice(0, 60)}`);
  }
}
console.log(total === 0
  ? "\nAucune occurrence de la classe. Le depot est sain sur ce point."
  : `\n${total} occurrence(s) a corriger.`);
process.exit(total === 0 ? 0 : 1);
