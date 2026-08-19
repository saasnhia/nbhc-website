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

### L'HÉBERGEMENT EST **SUSPENDU**, PAS ACQUIS

« n8n en Allemagne, Mistral en UE » est **un fait sur des fournisseurs, pas une
règle de projet** — et **rien dans ce chantier ne l'établit.** Une version
antérieure de ce fichier l'écrivait « fait vérifiable, pas une promesse » :
**vérifiable n'est pas vérifié**, et cette phrase reproduisait exactement la
faute qu'elle prétendait corriger — le fichier parent marque la même
information **suspendue**, ce qui faisait deux statuts contradictoires sur le
même fournisseur, dans deux fichiers qui gouvernent ce qui s'écrit sur les pages.

**Tant que ce n'est pas établi sur DEUX SOURCES, dont une de l'éditeur et
portant sur l'offre RÉELLEMENT utilisée — pas sur l'offre entreprise — la
phrase ne s'écrit ni ici, ni sur une page.** Ce qui est déjà publié est relevé
dans `nbhc-broll/RELEVE_HEBERGEMENT_PUBLIE.md` et traité en phase B.

### Le reste de la règle, lui, est acquis

**Jamais** « données en France ». **Jamais** « on anonymise avant tout traitement
LLM ». **Jamais** « traitement sécurisé » ni aucune allégation de conformité.
Ces formulations ont été retirées d'une vidéo, d'une source Remotion, d'une
capture de référence et de dix pages — **et elles sont revenues trois fois
depuis un fichier de contexte.** Voir le §7 de `nbhc-broll/PIEGES_D_INSTRUMENT.md`.

**Aucun chiffre non vérifiable sur une page publique.** Un chiffre porte sa
source ou il ne s'écrit pas.

**L'invitation à déposer un avis public ne dépend JAMAIS de la note recueillie
en amont — on invite tout le monde, ou personne.** Arbitrage client du
19/08/2026, il vise **le produit**, pas seulement la page. Reste : mesurer la
satisfaction et **alerter sur une note basse** pour un rappel personnel. Sort :
envoyer le lien vers la fiche publique aux uns et pas aux autres. Le tri n'est
pas établi comme illicite ; il sort parce que le risque dépasse le gain, et
parce que corriger la page en gardant la pratique reviendrait à **cacher une
allégation au lieu de la retirer**. Voir `nbhc-broll/REGLE_AVIS_EN_LIGNE.md`.

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
