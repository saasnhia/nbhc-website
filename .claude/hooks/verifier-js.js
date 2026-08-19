#!/usr/bin/env node
// CONTROLE D'INSTRUMENT — piege P5 du registre : « un \n a travers une couche
// d'echappement de trop ». Paye DEUX fois : gate 84 (le noeud n8n de W-BTP-03
// ne s'analysait plus) et gate 89 (trois litteraux coupes dans
// inventaire_blocs_ast.js, alors que le piege etait ECRIT depuis cinq jours).
//
// UNE CONSIGNE SE PERD, UN CONTROLE NON. Ce hook analyse tout .js/.mjs/.cjs
// ecrit ou edite et refuse de laisser passer un fichier qui ne s'analyse pas.
//
// DEUX FAUX POSITIFS MESURES AU PREMIER ESSAI, ET CORRIGES ICI :
//   1. le hook echouait sur du JS VALIDE quand node ne resolvait pas le chemin
//      (« Cannot find module ») — un hook qui bloque les fichiers corrects est
//      pire qu'aucun hook ;
//   2. il traitait « module introuvable » comme une faute de syntaxe.
// Il ne bloque donc plus que sur une VRAIE erreur d'analyse.
const { execFileSync } = require("child_process");
const fs = require("fs");

let brut = "";
process.stdin.on("data", (d) => (brut += d));
process.stdin.on("end", () => {
  let chemin = "";
  try {
    const e = JSON.parse(brut || "{}");
    chemin = (e.tool_input && (e.tool_input.file_path || e.tool_input.filePath)) || "";
  } catch (_) {
    process.exit(0);
  }
  if (!/\.(js|mjs|cjs)$/i.test(chemin)) process.exit(0);
  if (!fs.existsSync(chemin)) process.exit(0);

  try {
    execFileSync(process.execPath, ["--check", chemin], { stdio: ["ignore", "pipe", "pipe"] });
    process.exit(0);
  } catch (e) {
    const sortie = (e.stderr ? e.stderr.toString() : String(e.message || ""));
    // On ne bloque que sur une faute d'ANALYSE. Le reste — droits, chemin,
    // encodage — n'est pas ce que ce controle mesure.
    if (!/SyntaxError|Invalid or unexpected token|Unexpected (token|identifier|end)/i.test(sortie)) {
      process.exit(0);
    }
    const extrait = sortie.split("\n").slice(0, 6).join("\n");
    console.error(
      "node --check ECHOUE sur " + chemin + "\n" + extrait +
      "\n\nPiege P5 (PIEGES_D_INSTRUMENT.md) : une sequence d'echappement qui " +
      "traverse une couche de trop coupe les litteraux de chaine.\n" +
      "Parades, dans l'ordre : n'ecrire AUCUNE sequence d'echappement " +
      "(construire l'antislash par chr(92), comparer des charCodeAt) ; " +
      "remplacer par NUMERO DE LIGNE plutot que par ancre textuelle ; " +
      "et ecrire le fichier directement plutot que de le generer depuis un " +
      "script qui ajoute une couche."
    );
    process.exit(2);
  }
});
