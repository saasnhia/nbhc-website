#!/usr/bin/env node
//
// GARDE-FOU APRES BUILD — CONTROLE CE QUE LE HTML DE PRODUCTION CONTIENT REELLEMENT.
//
// POURQUOI IL EXISTE. Le minificateur de production de Next 16.2.1 supprime
// silencieusement du texte dans une classe d'expressions precise (voir
// outils/chercher-concat-gabarits.mjs). Le build est vert, TypeScript est satisfait,
// `next dev` affiche la bonne valeur, et seule la page servie en production est
// fausse. Un defaut de ce profil ne doit pas dependre de la vigilance de quelqu'un :
// il faut une verification qui regarde le HTML SERVI.
//
// Cas reel qui a motive ce script : l'attribut sizes des panneaux 2 et 3 de WhyNow
// arrivait tronque — « (max-width: 900px) calc(100vw - 40px), (max-width: 1145 590px »
// au lieu de « ..., (max-width: 1145px) calc(100vw - 80px), 590px ». Consequence
// mesuree : sizes invalide, donc le navigateur retombe sur 100vw, donc a 1 440 px il
// telechargeait le palier de 1 180 px (31,7 Ko) pour un emplacement de 590 px.
//
// COMMENT ON L'APPELLE. Il faut un serveur de production en cours :
//
//     npm run build
//     npx next start -p 3200 &
//     node outils/verifier-html-servi.mjs
//     node outils/verifier-html-servi.mjs http://127.0.0.1:3200 fr,en
//
// Il sort 0 si tout est conforme, 1 sinon, et il nomme chaque ecart. A lancer avant
// une fusion, avec chercher-concat-gabarits.mjs.
//
// DEUX FAMILLES DE CONTROLES :
//   1. les attributs ATTENDUS, declares ci-dessous, compares au caractere pres
//   2. une regle GENERIQUE sur la forme des attributs sizes, qui attrapera une
//      troncature ailleurs que dans WhyNow — c'est elle qui protege l'avenir

import http from "node:http";

// ── ON N'UTILISE PAS fetch, ET C'EST UNE CORRECTION ──────────────────────────
// Avec fetch (undici) sur Node 24 sous Windows, le processus se termine sur
// « Assertion failed: !(handle->flags & UV_HANDLE_CLOSING), src\winsync.c:76 » et
// rend un code de sortie 127 meme quand tous les controles passent — y compris avec
// process.exitCode au lieu de process.exit. Un garde-fou dont le code de sortie est
// faux ne garde rien : il serait vu comme un echec a chaque passage, donc ignore.
// node:http n'a pas ce probleme et suffit largement ici.
function obtenir(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      let corps = "";
      res.setEncoding("utf8");
      res.on("data", (c) => { corps += c; });
      res.on("end", () => resolve({ ok: res.statusCode >= 200 && res.statusCode < 300,
                                    status: res.statusCode, corps }));
    });
    req.on("error", (e) => resolve({ ok: false, status: 0, erreur: e.message, corps: "" }));
    req.setTimeout(15000, () => { req.destroy(); resolve({ ok: false, status: 0, erreur: "delai depasse", corps: "" }); });
  });
}

const BASE = process.argv[2] || "http://127.0.0.1:3200";
const LOCALES = (process.argv[3] || "fr,en").split(",");

// ── 1. CE QUI DOIT SE TROUVER DANS LE HTML, AU CARACTERE PRES ────────────────
// Chaque entree est cherchee telle quelle. Si une valeur legitime change, on met a
// jour cette liste — c'est le point ou l'intention est ecrite.
const ATTENDUS = [
  {
    quoi: "sizes du panneau 1 de WhyNow (pleine largeur)",
    texte: 'sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 80px), 1120px"',
    occurrences: 1,
  },
  {
    quoi: "sizes des panneaux 2 et 3 de WhyNow (emplacement de 590 px)",
    texte: 'sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1145px) calc(100vw - 80px), 590px"',
    occurrences: 2,
  },
  {
    quoi: "srcset du panneau 1, quatre paliers dont le 400",
    texte: "/whynow-bureau-400.webp 400w, /whynow-bureau-760.webp 760w, /whynow-bureau-1120.webp 1120w, /whynow-bureau-2240.webp 2240w",
    occurrences: 1,
  },
  {
    quoi: "srcset du panneau 2, quatre paliers",
    texte: "/whynow-outils-370.webp 370w, /whynow-outils-590.webp 590w, /whynow-outils-740.webp 740w, /whynow-outils-1180.webp 1180w",
    occurrences: 1,
  },
  {
    quoi: "srcset du panneau 3, quatre paliers",
    texte: "/whynow-caisses-370.webp 370w, /whynow-caisses-590.webp 590w, /whynow-caisses-740.webp 740w, /whynow-caisses-1180.webp 1180w",
    occurrences: 1,
  },
];

// ── 2. LA REGLE GENERIQUE SUR LES ATTRIBUTS sizes ────────────────────────────
// Un `sizes` valide est une liste de « <condition> <longueur> » separees par des
// virgules, la derniere entree sans condition. La signature de la troncature
// observee est une condition de media ouverte qui n'est jamais fermee : on cherche
// donc tout « (max-width: <nombre> » qui n'est pas suivi de « px) » ou « em) ».
function sizesMalForme(valeur) {
  const motifs = [
    // LE `(?!\d)` EST INDISPENSABLE, et son absence a produit un faux positif au
    // premier essai : sans lui, `\d+` recule sur « 900px) » jusqu'a ne prendre que
    // « 90 », le lookahead voit alors « 0px) » qui ne commence pas par px, et la
    // regle declarait mal formee une valeur parfaitement valide. Les deux vrais
    // sizes de WhyNow etaient signales en echec.
    [/\(\s*(max|min)-width:\s*\d+(?!\d)(?!\s*(px|em|rem)\s*\))/,
     "condition de media non fermee par une unite et une parenthese"],
    [/,\s*$/, "se termine par une virgule"],
    [/\(\s*(max|min)-width:[^)]*$/, "parenthese de condition jamais fermee"],
  ];
  for (const [re, cause] of motifs) if (re.test(valeur)) return cause;
  // la derniere entree doit etre une longueur sans condition
  const dernier = valeur.split(",").pop().trim();
  if (!/^(calc\(.*\)|\d+(\.\d+)?(px|em|rem|vw))$/.test(dernier)) {
    return `derniere entree inattendue : ${JSON.stringify(dernier)}`;
  }
  return null;
}

// ── L'INSTRUMENT SE VERIFIE AVANT DE SERVIR ──────────────────────────────────
// Une regle de forme qui n'a pas ete passee sur du connu-bon et du connu-mauvais ne
// vaut rien : la premiere version de celle-ci declarait mal formees les deux valeurs
// reelles de WhyNow. Si un seul de ces cas se comporte mal, on s'arrete sans
// regarder la page.
const BANC = [
  ["(max-width: 900px) calc(100vw - 40px), (max-width: 1145px) calc(100vw - 80px), 590px", true],
  ["(max-width: 900px) calc(100vw - 40px), (max-width: 1200px) calc(100vw - 80px), 1120px", true],
  ["100vw", true],
  ["(max-width: 600px) 50vw, 100vw", true],
  ["370px", true],
  // la troncature REELLEMENT observee en production
  ["(max-width: 900px) calc(100vw - 40px), (max-width: 1145 590px", false],
  ["(max-width: 900px) 50vw,", false],
  ["(max-width: 900 100vw", false],
  ["(max-width: 600px) 50vw, truc", false],
];

function verifierInstrument() {
  let bon = true;
  for (const [valeur, attenduValide] of BANC) {
    const cause = sizesMalForme(valeur);
    const valide = cause === null;
    if (valide !== attenduValide) {
      bon = false;
      console.log(`  DESACCORD sur ${JSON.stringify(valeur.slice(0, 62))}`
        + `  attendu ${attenduValide ? "valide" : "mal forme"},`
        + ` obtenu ${valide ? "valide" : `mal forme (${cause})`}`);
    }
  }
  if (!bon) {
    console.log("\nLa regle de forme ne retrouve pas des cas connus. On s'arrete.");
    process.exit(2);
  }
  console.log(`instrument verifie sur ${BANC.length} cas connus.`);
}

verifierInstrument();

function compter(foin, aiguille) {
  let n = 0, i = 0;
  while ((i = foin.indexOf(aiguille, i)) !== -1) { n++; i += aiguille.length; }
  return n;
}

let echecs = 0;

for (const loc of LOCALES) {
  const url = `${BASE}/${loc}`;
  const rep = await obtenir(url);
  if (!rep.ok) {
    console.log(`  ${url} : ${rep.erreur ? `injoignable (${rep.erreur})` : `HTTP ${rep.status}`}`
      + " — un serveur de production tourne-t-il ?");
    echecs++;
    continue;
  }
  const html = rep.corps;

  console.log(`\n=== ${url} — ${html.length} octets ===`);

  // Coherence HTML/CSS d'abord : un serveur reste en vie apres un rebuild sert un
  // HTML qui reference un chunk supprime, et TOUTES les mesures suivantes sont
  // alors fausses. C'est arrive sur ce projet.
  const css = [...html.matchAll(/\/_next\/static\/[^"']*\.css/g)].map((m) => m[0]);
  for (const c of [...new Set(css)]) {
    const r = await obtenir(BASE + c);
    const etat = r.ok ? `${r.status}` : `${r.status} — HTML PERIME, relancer le serveur`;
    if (!r.ok) echecs++;
    console.log(`  css ${c} : ${etat}`);
  }

  for (const a of ATTENDUS) {
    const n = compter(html, a.texte);
    const ok = n === a.occurrences;
    if (!ok) echecs++;
    console.log(`  ${ok ? "OK   " : "ECHEC"} ${a.quoi} — ${n}/${a.occurrences} occurrence(s)`);
    if (!ok) {
      // On montre ce qui s'y trouve a la place, pour que le diagnostic soit immediat.
      const cle = a.texte.slice(0, 34);
      const i = html.indexOf(cle);
      if (i !== -1) {
        console.log(`        trouve a la place : ${JSON.stringify(html.slice(i, i + a.texte.length + 20))}`);
      } else {
        console.log(`        le debut « ${cle} » n'apparait meme pas`);
      }
    }
  }

  const tous = [...html.matchAll(/\ssizes="([^"]*)"/g)].map((m) => m[1]);
  const aControler = tous.filter((v) => /width|calc|px|vw/.test(v));  // hors sizes d'icones
  for (const v of [...new Set(aControler)]) {
    const cause = sizesMalForme(v);
    if (cause) { echecs++; console.log(`  ECHEC sizes mal forme : ${cause}\n        ${JSON.stringify(v)}`); }
    else console.log(`  OK    sizes bien forme : ${JSON.stringify(v.slice(0, 64))}...`);
  }
}

console.log(echecs === 0
  ? "\nTout est conforme."
  : `\n${echecs} ecart(s). Ne pas fusionner en l'etat.`);
process.exit(echecs === 0 ? 0 : 1);
