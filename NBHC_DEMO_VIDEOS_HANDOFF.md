# Handoff — vidéos démo automatisations → reproduction interactive native

Préparé depuis le repo `vlogyz` (pipeline Remotion `worker/remotion/nbhc/`) pour une session
Claude Code qui travaille ici, dans `nbhc-website`. Objectif : ne pas repartir de zéro pour
comprendre ce que montrent les 4 vidéos démo, puis les reproduire **en composants React natifs
interactifs** (pas des fichiers vidéo) intégrés directement aux pages secteur du site.

## Ce qui a déjà été fait dans ce repo (par cette préparation)

- `public/demo-garage.mp4`, `public/demo-restaurant.mp4`, `public/demo-pharmacie.mp4` :
  **remplacés** par des versions largement retravaillées (canvas n8n agrandi, palette revue,
  glassmorphism/glow supprimés — cf plus bas). Postersjpg régénérés en même temps.
  Fichiers modifiés mais **non committés** — à review avant commit.
- `public/demo-coiffure.mp4` + poster : **nouveaux**, secteur pas encore branché dans
  `VideoShowcase.tsx` (`SHOWCASE_KEYS` ne connaît que garage/restaurant/pharmacie — coiffure
  manque, et `messages/{fr,en}.json` → clé `showcase.tabs.coiffure` n'existe pas encore).
- `docs/demo-videos-reference/stills/` : captures PNG de moments clés (voir §3).
- `docs/demo-videos-reference/remotion-source/` : code source React/TSX des composants qui
  génèrent ces vidéos (Remotion) — **référence de lecture uniquement**, ne pas importer tel
  quel (dépend du package `remotion`, absent de ce repo). Fichiers suffixés `.txt` (ex.
  `N8nCanvas.tsx.txt`) exprès, pour que `tsconfig.json` (`include: **/*.tsx`) ne les compile
  pas et ne casse pas `next build` avec un import `remotion` introuvable. Voir §5 pour la table
  de conversion vers du React web classique.

## Sommaire

1. [Correction prioritaire : couleur d'accent](#1-correction-prioritaire--couleur-daccent)
2. [État actuel du site (ce qui existe déjà ici)](#2-état-actuel-du-site)
3. [Découpage scène par scène — les "passages clés"](#3-découpage-scène-par-scène)
4. [Table de correspondance tokens](#4-table-de-correspondance-tokens-vidéo--site)
5. [Remotion → React web : table de conversion](#5-remotion--react-web--table-de-conversion)
6. [Pourquoi "interactif" plutôt que vidéo autoplay](#6-pourquoi-interactif-plutôt-que-vidéo-autoplay)
7. [Todo list concrète](#7-todo-list-concrète)

---

## 1. Correction prioritaire : couleur d'accent

Les vidéos Remotion utilisent un accent **bleu** (`#0A84FF`, system blue Apple dark mode) —
c'était une correction demandée en cours de route pour un rendu "vrai style Apple" et anti
"AI slop" (le violet/indigo initial étant identifié comme LE tell visuel n°1 d'un design généré
par IA). Mais **ce n'est pas la couleur de marque réelle du site** :

```
app/globals.css :
  --gold: #C4973A        (accent réel du site — PAS bleu)
  --gold-light: #E8C97A
  --gold-dim: rgba(196, 151, 58, 0.15)
  --gold-border: rgba(196, 151, 58, 0.3)
```

Le logo NBHC lui-même (`public/nbhc-logo-cutout.png`, utilisé dans les vidéos) porte déjà ce
gold — c'est resté visible dans les vidéos malgré l'accent bleu partout ailleurs, ce qui crée
une incohérence entre le logo et le reste de l'UI vidéo.

**→ En reproduisant les séquences ici, utiliser `--gold` (et ses variantes) comme accent, pas
le bleu des vidéos.** Le reste de la palette (fond quasi-noir, texte cassé, gris muted) est en
revanche déjà très proche de `--bg`/`--text`/`--text-muted` du site (voir §4) — ces choix-là
peuvent être repris tels quels.

## 2. État actuel du site

Trois pièces existantes, à connaître avant de coder quoi que ce soit :

- **`components/VideoShowcase.tsx`** — section `#en-action` de la page d'accueil. Tabs
  (`role="tablist"`) pour choisir un secteur, embarque `<DemoVideo>`. `SHOWCASE_KEYS` est codé
  en dur à `["garage", "restaurant", "pharmacie"]` — à étendre (coiffure, puis sport/BTP/
  formation à mesure qu'ils sont produits côté vlogyz).
- **`components/DemoVideo.tsx`** — lazy-load (`requestIdleCallback`) + autoplay muted loop d'un
  `<video>` pointant `/demo-{name}.mp4`, poster `/demo-{name}-poster.jpg`. Respecte
  `prefers-reduced-motion` (ne charge pas la vidéo si activé — **un remplacement natif devra
  garder ce comportement**, ex. figer sur l'état final au lieu d'animer).
- **`components/AutomationFlow.tsx`** — diagramme **statique** (pas animé) trigger→process→
  action→validation, déjà utilisé sur chaque page secteur (`app/[locale]/automatisation-*/`),
  piloté par les labels i18n (`messages/*.json`), jamais de texte en dur. C'est probablement LE
  composant à faire évoluer vers une version animée/interactive inspirée du canvas n8n des
  vidéos — voir §6.
- **Dépendances déjà présentes** : `framer-motion` (^12) et `gsap` (^3) — tout ce qu'il faut
  pour animer nativement, aucune lib à ajouter.
- **i18n** : `messages/fr.json` / `messages/en.json`, clé `showcase.tabs.{secteur}.{label,name,
  benefit}` — à compléter pour `coiffure` avant de l'ajouter à `SHOWCASE_KEYS`. Ne jamais coder
  de texte en dur dans les composants — toujours passer par `useTranslations`.

## 3. Découpage scène par scène

Les 4 vidéos actuelles durent 23-24s à 30fps. Structure identique pour garage/resto/coiffure
(même famille "téléphonique"), pharmacie a un scénario dédié (santé, sujet sensible).

### Garage / Restaurant / Coiffure — 690 frames / 23s

| Scène | Frames | Temps | Contenu |
|---|---|---|---|
| S0 Accroche | 0-60 | 0-2s | Phrase centrée plein écran, fade in/out. Garage : *"Un appel manqué, c'est un client chez le concurrent."* Resto : *"En plein service, qui répond au téléphone ?"* Coiffure : *"Pendant une coupe, qui décroche le téléphone ?"* |
| S1 Déclencheur | 60-150 | 2-5s | Mockup téléphone générique (aucune marque/OS réel), sonnerie 45f, puis pill "Votre ligne actuelle, renvoi activé." |
| S2 Workflow + conversation | 150-360 | 5-12s | Canvas n8n (6 nodes en zigzag, connexions qui se dessinent gauche→droite au fil de l'activation) au-dessus ; bulles de conversation IA/client en dessous. Nodes : *Appel entrant → Transcription vocale → IA Mistral : comprend la demande → Vérifie le planning → Propose un créneau → Crée la fiche RDV*. |
| S3 Logiciels | 360-450 | 12-15s | Bandeau "Compatible avec…" + pills noms de logiciels réels (texte brut, aucun logo tiers reconstitué). Garage : Google Agenda, votre logiciel de gestion. Resto : Zenchef, TheFork. Coiffure : Planity, Google Agenda. |
| S4 Usage/Validation | 450-570 | 15-19s | Fiche RDV (ValidationCard) qui glisse à l'écran + curseur qui clique sur [Valider] → coche verte "Validé". **Point de vérité non négociable : la fiche est toujours validée par un humain, jamais envoyée automatiquement.** |
| S5 Installation | 570-630 | 19-21s | 3 pastilles numérotées, étapes d'installation en langage simple. |
| S6 CTA final | 630-690 | 21-23s | Texte bénéfice 2 lignes + logo NBHC. Garage/Coiffure : *"Vous ne ratez plus un seul appel."* Resto : *"Vous ne ratez plus un seul couvert."* |

Conversations (verbatim) :
- **Garage** : IA *"Garage du Centre, bonjour."* → Client *"Un RDV pour une révision."* → IA
  *"Jeudi 14h ?"* → Client *"Parfait."*
- **Resto** : IA *"Le Bistrot, bonjour."* → Client *"Une table pour 4 ce soir."* → IA
  *"20h30 ?"* → Client *"Parfait."*
- **Coiffure** : IA *"Salon Éclat, bonjour."* → Client *"Un RDV coupe pour samedi."* → IA
  *"Samedi 11h ?"* → Client *"Parfait."*

### Pharmacie — 720 frames / 24s (scénario dédié, sujet santé)

| Scène | Frames | Temps | Contenu |
|---|---|---|---|
| S0 Accroche | 0-60 | 0-2s | *"Combien de patients éligibles au bilan partagé, sans le savoir ?"* |
| S1 Liste patients | 60-210 | 2-7s | Carte "Patientèle" — **initiales fictives uniquement** (jamais de nom complet), surlignage progressif des profils éligibles + critère générique affiché ("65 ans et +, 5 traitements chroniques ou plus" — jamais une donnée individuelle). |
| S2 Workflow + hébergement | 210-360 | 7-12s | Canvas n8n (3 nodes : *Votre fichier patients → IA : repère les critères d'éligibilité BPM → Génère la liste d'actions*) + bandeau permanent *"n8n en Allemagne, Mistral en UE — les données ne quittent pas l'Union."* |

> **CORRIGÉ AU GATE 82.** Ce tableau demandait auparavant le nœud *« Liste
> patients anonymisée »* et le bandeau *« Données traitées de façon sécurisée.
> Aucune donnée médicale affichée. »* — deux formules interdites depuis le
> premier gate : une allégation de sécurité vague, et le sous-entendu d'une
> anonymisation préalable au traitement LLM, que NBHC ne fait pas et ne promet
> pas. La règle est un **fait vérifiable** — n8n en Allemagne, Mistral en UE —
> **pas une promesse**. La vidéo produite depuis l'ancienne version a été
> retirée du site au gate 81 ; ce brief est corrigé pour qu'une régénération ne
> la ramène pas.
| S3 Logiciels | 360-450 | 12-15s | Winpharma, LGPI. |
| S4 Checklist + consentement | 450-600 | 15-20s | Checklist de 5 patients (initiales), **3 cochés / 2 volontairement jamais cochés** — la sélectivité humaine doit rester visible, pas un envoi en masse. Bandeau permanent *"Aucun message envoyé sans votre accord."* |
| S5 Installation | 600-660 | 20-22s | 3 étapes. |
| S6 CTA final | 660-720 | 22-24s | *"Vous ne passez plus à côté d'un patient éligible."* |

**Garde-fous santé non négociables si ce scénario est repris tel quel** : initiales fictives
seulement, critères génériques jamais individuels, bandeau consentement visible en
permanence (pas juste sous-entendu), validation sélective (ne jamais montrer 100% coché),
aucun logiciel tiers réel affiché hors du bandeau "compatible avec", ton sobre (pas de rouge
alarmant, pas de clignotement).

## 4. Table de correspondance tokens (vidéo → site)

| Rôle | Token vidéo (`remotion-source/tokens.ts`) | Token site réel (`app/globals.css`) |
|---|---|---|
| Fond | `#000000` | `--bg: #09090b` (quasi identique, garder celui du site) |
| Surface carte | `rgba(26,26,28,0.94)` (opaque, sans blur) | `--surface: #111113` |
| Bordure carte | `rgba(255,255,255,0.12)` | `--border` / `--border-accent` |
| Texte principal | `#F5F5F7` (blanc froid) | `--text: #F0EDE6` (blanc **chaud**, garder celui du site) |
| Texte muted | `#86868B` | `--text-muted: #8C8880` |
| Texte dim | `#6E6E73` | `--text-dim: #3E3D3A` |
| **Accent** | `#0A84FF` (bleu — **ne pas reprendre**) | **`--gold: #C4973A`** |
| Accent soft (fond translucide) | `rgba(10,132,255,0.14)` | `--gold-dim` |
| Accent bordure | `rgba(10,132,255,0.32)` | `--gold-border` |
| Rayon carte | `20-24px` en dur par composant | `--radius: 12px` / `--radius-sm: 6px` |
| Police titres | Plus Jakarta Sans | `var(--font-syne)` |
| Police texte | Manrope | à vérifier dans `globals.css` (probablement une police système/sans du site) |

Le reste de la logique (glassmorphism supprimé, glow réduit, pas de dégradé violet) est un
choix de direction déjà validé côté vidéo — à conserver ici aussi : **surfaces opaques nettes,
pas de blur, glow d'accent discret (pas de halo néon)**.

## 5. Remotion → React web : table de conversion

Le code dans `docs/demo-videos-reference/remotion-source/` est du React/TSX normal, seule la
couche animation dépend de l'API Remotion (absente ici). Correspondance directe :

| Remotion (`worker/remotion/nbhc/`) | Équivalent web (déjà dispo : framer-motion + gsap) |
|---|---|
| `useCurrentFrame()` — position dans une timeline en frames | État React (`useState`) piloté par un timer, un scroll (`IntersectionObserver`), ou une interaction utilisateur (clic "étape suivante") |
| `interpolate(frame, [in], [out])` | `useTransform` (framer-motion) ou simple interpolation manuelle sur l'état ci-dessus |
| `spring({ frame, config: SPRINGS.enter })` — `{ mass: 0.9, damping: 26, stiffness: 90 }` | `transition={{ type: "spring", mass: 0.9, damping: 26, stiffness: 90 }}` sur un composant `motion.div` — **valeurs directement réutilisables** |
| `<Sequence from={} durationInFrames={}>` | Rendu conditionnel par étape (state machine) ou `motion.div` avec `variants` + `AnimatePresence` |
| `AbsoluteFill` | `<div className="absolute inset-0">` |
| Format fixe 1920×1080 | Le composant web doit être responsive (`aspect-ratio: 16/9` comme `DemoVideo.tsx` le fait déjà) — recalculer les tailles en `rem`/`%`/`clamp()` plutôt qu'en px fixes comme les vidéos |

Composants les plus réutilisables tels quels (juste la couleur/police à changer, cf §4) :
`N8nCanvas.tsx` (le schéma workflow — le morceau le plus caractéristique des vidéos),
`VoiceBubble.tsx` (bulles de conversation), `ValidationCard.tsx` (fiche + bouton Valider),
`Checklist.tsx` (pharmacie).

## 6. Pourquoi "interactif" plutôt que vidéo autoplay

Les vidéos sont un autoplay muet en boucle — l'utilisateur est spectateur passif. L'ask est
d'aller plus loin : une reproduction native peut le rendre réellement interactif, par ex. :

- **Étapes cliquables** : au lieu d'un autoplay figé, l'utilisateur clique sur chaque node du
  canvas n8n (ou une pastille "1/2/3...") pour avancer la séquence à son rythme — transforme
  un moment passif en démonstration explorable.
- **Reveal au scroll** : `IntersectionObserver` + `framer-motion whileInView` pour déclencher
  la séquence quand la section entre dans le viewport, avec possibilité de la relancer (bouton
  "revoir" plutôt qu'un loop silencieux).
- **Hover sur un node** : afficher une micro-explication de ce que fait cette étape
  (actuellement seul le label du node porte l'info, une vraie interactivité web permet d'aller
  plus loin sans surcharger le visuel).
- Bénéfice additionnel indépendant de l'"interactif" demandé : en DOM/SVG natif plutôt qu'en
  vidéo compressée, le texte reste net à n'importe quelle taille d'affichage — réglant
  définitivement le problème de lisibilité identifié quand la vidéo est réduite dans la landing
  page (c'était la motivation d'un précédent passage d'agrandissement côté vlogyz).

## 7. Todo list concrète

1. Décider où la version interactive vit : remplace `VideoShowcase.tsx` (section `#en-action`)
   et/ou vient enrichir `AutomationFlow.tsx` sur chaque page secteur — les deux endroits
   montrent aujourd'hui une version simplifiée de ce que les vidéos racontent en détail.
2. Construire un composant `WorkflowCanvas` (inspiré de `N8nCanvas.tsx`) en `--gold`, piloté
   par état (pas par frame Remotion), avec un mode "auto-play + pause au clic" ou "étape par
   étape au clic" (voir §6).
3. Réutiliser `ValidationCard`/`VoiceBubble`/`Checklist` comme base, recolorés en `--gold` et
   passés en `rem`/responsive.
4. Ajouter `coiffure` à `SHOWCASE_KEYS` (`VideoShowcase.tsx`) + clé i18n
   `showcase.tabs.coiffure` dans `messages/fr.json` et `messages/en.json` (texte déjà présent
   dans les scènes ci-dessus pour s'inspirer, mais à valider/adapter au ton du site).
5. Review + commit les mp4/posters déjà remplacés dans `public/` avant tout déploiement (ils
   sont dans l'arbre de travail mais pas committés).
6. Une fois validé, les 3 vidéos restantes du plan initial (sport, BTP, formation) arriveront
   par le même pipeline vlogyz — prévoir que `SHOWCASE_KEYS`/i18n s'étendent à nouveau.
