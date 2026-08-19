# NBHC — contexte projet

**Ce fichier existe parce que `nbhc-website` n'en avait pas et héritait de celui
de Worthifast**, dont la palette émeraude a contaminé un juge aveugle et dont
deux règles étaient fausses ici. Ce qui suit vaut pour **ce dépôt et lui seul**.

---

## Palette — la vraie

- Fond : **#09090b** · Or : **#C4973A** · Or clair : `--gold-light`
- Texte atténué : **#8C8880**

**Ce n'est pas la palette de Worthifast (#22D3A5 / #0F172A).** Ne jamais prendre
celle du fichier parent comme référence pour ce dépôt.

## Architecture

`app/[locale]/` (App Router, pas de `src/`) · `components/` · `content/` ·
`messages/fr.json` et `en.json` · `public/`
Le dossier `[locale]` contient des **crochets littéraux** : les motifs shell les
interprètent comme une classe de caractères. Utiliser `Glob`, `Grep`, ou
`GIT_LITERAL_PATHSPECS=1` avec git.

## La règle NBHC, non négociable

**n8n en ALLEMAGNE, Mistral en UE.** C'est un **fait vérifiable**, pas une
promesse.

**Jamais** « données en France ». **Jamais** « on anonymise avant tout traitement
LLM ». **Jamais** « traitement sécurisé » ni aucune allégation de conformité.
Ces formulations ont été retirées d'une vidéo, d'une source Remotion, d'une
capture de référence et de dix pages — **et elles sont revenues trois fois
depuis un fichier de contexte.** Voir le §7 de `nbhc-broll/PIEGES_D_INSTRUMENT.md`.

**Aucun chiffre non vérifiable sur une page publique.** Un chiffre porte sa
source ou il ne s'écrit pas.

**Une allégation d'existence est une allégation, même discrète** : « catalogue »,
« standardisée », « déjà construit », « clé en main » sont sorties du site au
gate 89.

## Serveur de dev — y accéder par `localhost`, jamais par `127.0.0.1`

Next 16 bloque l'accès *cross-origin* à ses ressources de développement.
`localhost` est autorisé, **`127.0.0.1` ne l'est pas**. Conséquence mesurée : le
WebSocket HMR reçoit une réponse non-HTTP (Chrome `ERR_INVALID_HTTP_RESPONSE`,
Node `Parse Error: Expected HTTP/`) et **l'application ne s'hydrate pas du
tout** — préchargeur figé, ni Lenis, ni curseur, aucun effet React. Seul le
journal du serveur le dit : *« Blocked cross-origin request to Next.js dev
resource /_next/webpack-hmr from "127.0.0.1" »*.

- Ouvrir `http://localhost:PORT`. Sondes Playwright : `NBHC_BASE=http://localhost:PORT`.
- Alternative non appliquée : `allowedDevOrigins: ['127.0.0.1']` dans `next.config.ts`.
- Trois causes écartées **par mesure** : ce n'est pas le bundler (webpack et
  Turbopack échouent identiquement), ce n'est pas ce dépôt (une app Next 16.2.1
  vide échoue aussi), et ce n'est **pas** un `npm run build` lancé pendant un
  `next dev`.
- `next start` n'est pas concerné.

## Mesurer avant d'affirmer

**Les pièges déjà payés sont écrits** : `C:\finpilote\nbhc-broll\PIEGES_D_INSTRUMENT.md`.
Les lire avant d'écrire un instrument. Les trois qui coûtent le plus souvent :

- **`innerText`, jamais le HTML** — next-intl embarque tout le catalogue de
  messages dans la charge RSC de chaque page ;
- **libérer le port** avant toute mesure sur `next start` ;
- **parser l'AST, jamais le texte** pour inventorier des blocs.

Instruments dans `C:\finpilote\nbhc-broll\airbnb-demo\`. Le comptage des blocs
passe par `inventaire_blocs_ast.js`, qui **calcule** son total depuis
`journal-verdicts.json` — **aucun chiffre ne s'écrit à la main**.

## Navigation du code

Avant de grep-er pour comprendre la structure : `graphify-out/GRAPH_REPORT.md`
(god nodes, communautés) et `graphify-out/graph.json` (`graphify query "<question>"`).
Généré en local par AST, sans appel LLM. Régénérer avec `graphify update nbhc-website`.

## Ce qui ne bouge pas sans GO

**`master` ne bouge pas sans GO explicite du client.** Push sur branche, URL à
chaque fois. **Pathspec explicite, jamais `git add -A`.**
**Rien en production n8n sans GO.**
**Un agent ne juge jamais son propre travail.**
