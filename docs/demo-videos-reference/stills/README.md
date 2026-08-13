# Captures de référence des vidéos de démonstration

Ces images documentent ce que les vidéos affichent. **Elles ne sont pas
servies** — `docs/` n'est pas `public/` — mais elles servent de référence à qui
régénère une famille Remotion, et à ce titre elles engagent autant que le code.

## Une capture a été retirée, et il faut savoir pourquoi

**`pharmacie-workflow.png` — SUPPRIMÉE au gate 82.**

Elle montrait le nœud « **Liste patients anonymisée** » et le bandeau
« **Données traitées de façon sécurisée. Aucune donnée médicale affichée.** » :
les deux formules interdites depuis le premier gate NBHC — une allégation de
sécurité vague, et le sous-entendu d'une anonymisation préalable au traitement
LLM, que NBHC **ne fait pas et ne promet pas**.

La vidéo produite depuis cette version a été retirée du site au gate 81, et la
source Remotion corrigée au gate 82. **Garder la capture aurait rouvert la
porte** : une image de référence qui montre la formulation fautive est
exactement ce qui la fait revenir, et aucun grep ne l'aurait trouvée.

**La règle NBHC est un fait vérifiable, pas une promesse :** n8n en Allemagne,
Mistral en UE. C'est ce que dit désormais le bandeau de la famille pharmacie —
« n8n en Allemagne, Mistral en UE — les données ne quittent pas l'Union. »

## Ce qui reste

`pharmacie-checklist-consent.png` — conservée. Elle porte « Aucun message envoyé
sans votre accord », qui est une garantie **vraie** et vérifiable dans le
workflow, et n'affiche que des initiales.

## À faire à chaque nouvelle capture

Relire l'image, pas seulement le code qui l'a produite. **Une mention incrustée
dans une image échappe au grep, aux `messages/*.json` et à toute relecture de
texte.** C'est le point aveugle mesuré au gate 80, et le seul instrument qui
l'attrape est la lecture, une par une.
