# Audit SEO & Stratégie — nbhc.fr
**Date :** 2026-07-07 | **Scope :** GATE 1 — audit read-only, aucune modification de code effectuée.
**Mission :** aligner le SEO du site sur les niches réellement prospectées par NBHC (Sport & Bien-être, Automobile/garages, Artisans BTP, Organismes de formation) et poser une fondation technique durable.

---

## 0. Résumé exécutif

Le site a déjà reçu un audit SEO technique en avril 2026 (`SEO-AUDIT-REPORT.md`, présent dans le repo) qui a corrigé les bases : JSON-LD, hreflang, canonical, robots.txt. Cette fondation technique est solide. **Le problème n'est plus technique, il est architectural et de contenu** :

1. **Décalage total entre le site et le terrain.** La homepage cible 4 secteurs (Artisans/BTP, Agences & communication, Experts-comptables, Avocats/notaires) — aucun ne correspond aux niches réellement prospectées en cold call (Sport & Bien-être à Vernon, Automobile/garages à Toulouse). Le site ne mentionne ni salle de sport, ni garage, ni organisme de formation nulle part.
2. **Zéro page dédiée par secteur.** Il n'existe aucune landing page indexable par niche — seulement des cartes ancre sur la homepage (`#pricing`) et 3 articles de blog (comptabilité, artisans/devis, création vidéo). Un gérant de salle de sport qui tape "automatiser relances salle de sport" ne trouvera jamais nbhc.fr.
3. **Une page fantôme dans le sitemap.** `/agentic-ai` est aujourd'hui un simple redirect vers `/#pricing`, mais le sitemap la déclare toujours en priorité 0.95 comme une page de contenu à part entière. Signal confus pour Google, budget de crawl gâché.
4. **Un risque de performance concret et non corrigé** : un loader plein écran bloque l'affichage du contenu réel (~1,5-2s d'animation avant que la page ne devienne visible) sur **chaque** chargement de page — probable frein direct au LCP, jamais mesuré.
5. **`llms.txt` désynchronisé** : il décrit une offre "Agentic AI as a Service" à 490€/1290€/3500€ qui n'existe plus sur le site (la homepage affiche Quick Win 2000€ / Standard 4000€+performance fee / Sur devis).

Le reste de ce document détaille l'état des lieux, l'analyse concurrentielle sourcée, la matrice de mots-clés priorisée, et un plan d'architecture proposé — **à valider avant tout code (GATE 2)**.

---

## 1. État des lieux technique du site (lecture du repo)

### 1.1 Ce qui est déjà solide (hérité de l'audit d'avril 2026)
- JSON-LD : `Organization`, `WebSite`, `ProfessionalService` (root layout), `WebPage` + `FAQPage` + `BreadcrumbList` (homepage), `BlogPosting` (articles). Builders centralisés et propres dans `lib/schema.ts`.
- Hreflang complet (`fr-FR` / `en-US` / `x-default`) via `localeCanonical()`, appliqué sur toutes les pages statiques.
- `robots.ts` : autorise explicitement 15 crawlers IA (GPTBot, ClaudeBot, PerplexityBot, etc.) — bon pour le GEO/AEO. Disallow propre sur `/api/` et `/_next/`.
- `sitemap.ts` dynamique, 12 pages × 2 locales = 24 URLs, avec alternates hreflang par URL.
- Metadata (`generateMetadata`) locale-aware avec OG + Twitter cards sur les pages principales.
- Fonts (`Syne`, `DM Sans`) chargées via `next/font` avec `display: swap` — bonne pratique CWV.
- `public/llms.txt` déjà présent (bon réflexe GEO) mais **contenu obsolète** (voir 1.3).

### 1.2 Architecture actuelle des routes
```
app/[locale]/
  page.tsx                      → homepage (Hero, WhyNow, Sectors, HowItWorks, Portfolio, Pricing, Differentiators, FAQ, FinalCta, Contact)
  agentic-ai/page.tsx           → redirect(/${locale}#pricing) — PAS de contenu réel
  contact/page.tsx              → page contact (formulaire)
  faq/page.tsx                  → FAQ dédiée + FAQPage JSON-LD
  blog/page.tsx + blog/[slug]/  → 3 articles MDX
  mentions-legales, cgv, cgu, politique-confidentialite
```
Aucune page `/automatisation-*` ou équivalent secteur. Le composant `Sectors.tsx` sur la homepage est le seul endroit qui évoque des verticales, et il pointe vers un ancre `#pricing`, pas vers une URL indexable dédiée.

### 1.3 Problèmes identifiés

**CRITIQUE — Décalage contenu / prospection terrain**
Le contenu du site (`messages/fr.json` → `sectors`) cible : Artisans & BTP, Agences & communication, Experts-comptables, Avocats & notaires. Les niches réellement prospectées (livrables Vernon, périphérie Vernon, Toulouse déjà produits) sont : Sport & Bien-être (salles, studios, spas, associations), Automobile/garages, plus BTP (qui lui est bien couvert). **Organismes de formation** est cité dans votre brief mais n'apparaît nulle part sur le site actuel. Un site qui ne parle pas des secteurs qu'on démarche ne peut capter aucun trafic organique correspondant à ce cold call.

**CRITIQUE — `/agentic-ai` : page fantôme dans le sitemap**
`app/[locale]/agentic-ai/page.tsx` fait un `redirect()` serveur immédiat vers `/${locale}#pricing`. C'est un vrai redirect HTTP (307), pas un problème de duplicate content en soi — mais `sitemap.ts` continue de déclarer `https://nbhc.fr/fr/agentic-ai` avec `priority: 0.95` (2e priorité la plus haute du site, juste après la homepage) comme si c'était une page de contenu à indexer. Un crawler qui suit le sitemap tombe sur un redirect, pas du contenu — signal perdu, budget de crawl gâché sur une URL qui ne sert à rien. Il existe aussi un `agentic-ai/layout.tsx` avec un `generateMetadata` complet (titre, OG, keywords) qui ne sert jamais puisque `page.tsx` redirige avant tout rendu.

**HAUTE — Risque de performance non mesuré : le Loader**
`AppShell.tsx` → `Loader.tsx` : à chaque chargement de page, un overlay plein écran (`position: fixed, inset: 0, z-index: 1000`) joue une séquence GSAP (~0.4s scale-in du logo + 0.35s texte + délai 0.2s + 0.6s slide-out = **environ 1,5 à 1,6 secondes** avant `onComplete`), et le contenu réel de la page reste à `opacity: 0` jusqu'à ce moment (`AppContent` dans `AppShell.tsx`, transition `opacity 0.4s`). Concrètement : **le contenu visible le plus large de la page (le LCP candidate) n'apparaît visuellement qu'après ~1,5-2s, sur chaque page, à chaque visite** (pas de détection de session déjà vue). C'est un candidat sérieux pour un mauvais score LCP (seuil "bon" = < 2.5s ; ici on consomme déjà 60-80% du budget avant même que le vrai contenu commence à apparaître). Aucune mesure Lighthouse/PSI n'a encore été faite pour confirmer l'ampleur réelle — recommandé avant toute décision GATE 2 (voir section 6).

**MOYENNE — `llms.txt` désynchronisé du site réel**
`public/llms.txt` décrit une offre "Starter 490€/mois, Growth 1290€/mois, Enterprise 3500€/mois — Agentic AI as a Service" et renvoie vers `/agentic-ai` comme page de référence tarifaire. Le site réel (homepage `Pricing.tsx` + `messages/fr.json`) affiche **Quick Win à partir de 2000€ HT, Standard à partir de 4000€ HT + performance fee 30% (cap 2×), Sur mesure sur devis**. Les LLMs (ChatGPT, Perplexity, Claude) qui lisent `llms.txt` pour citer NBHC répéteraient une offre qui n'existe plus. Correction rapide, indépendante du GATE 2.

**MOYENNE — Images non optimisées**
Toujours pas de WebP/AVIF (`logo.png` 9.7KB, `nbhc-logo-linkedin.png` 19.5KB, `og-image.png` 26KB — poids modeste individuellement mais aucune conversion moderne appliquée, recommandation déjà faite en avril non suivie). À vérifier aussi : usage de `next/image` vs `<img>` brut dans `Portfolio.tsx`/`mockups/` (non audité en détail dans cette passe, à vérifier en GATE 2).

**FAIBLE — Blog mono-langue**
Les 3 articles MDX n'existent qu'en français ; la version `/en/blog/[même-slug]` sert probablement le même contenu FR (déjà noté en avril, toujours vrai). Faible priorité vs les autres points — le marché prioritaire de NBHC est français.

**FAIBLE — `next-sitemap` en dépendance inutilisée**
`package.json` liste `next-sitemap` alors que le site utilise déjà `app/sitemap.ts` (l'approche native App Router, plus propre). Dépendance probablement morte — à vérifier avant suppression (hors scope SEO strict, mentionné pour hygiène).

### 1.4 Stack performance (GSAP + Lenis) — lecture du code, pas de mesure
- `Lenis` (smooth scroll) + `GSAP ScrollTrigger` tournent sur toutes les pages via `SmoothScroll.tsx`, avec un event listener `scroll` + un `raf` callback GSAP à chaque frame. C'est la source de JS actif en continu la plus probable pour l'INP (interaction/scroll jank) — impact généralement modéré si le reste du thread principal est libre, mais cumulé avec les animations de `Sectors.tsx`/`Pricing.tsx` (ScrollTrigger par section), le coût JS total mérite une mesure réelle plutôt qu'une supposition.
- Aucune régression du design n'est recommandée sans mesure : **la priorité GATE 2 sur ce point est de mesurer avant de toucher au Loader ou à Lenis**, pas de les retirer par précaution.

---

## 2. Analyse concurrentielle (recherche web, sourcée)

### 2.1 Concurrents génériques ("agence automatisation IA France", "agence n8n France")
Recherche SERP sur les requêtes génériques que taperait un prospect qui ne connaît pas encore son besoin précis. Trouvé, entre autres : Koïno, Digital Unicorn, Mister IA, Digitallia, Optimia, Nocode Factory, Nexa Automatia, Inno-Mation, Genee, DevFlows, Sequance, Dataki, A2Z Automation, Growth AI, Dazz Studio, L'Agence Sauvage, Arborys IA.

**Ce qui est reproductible rapidement (pas d'autorité de domaine nécessaire) :**
- Positionnement prix transparent dès la page d'accueil (L'Agence Sauvage : "500€/mois + 1000€ setup" affiché ; Arborys IA : "audit payant 240€ HT" affiché) — NBHC le fait déjà (Quick Win/Standard/Sur mesure visibles).
- Pages dédiées par cas d'usage avec structure pain → solution → prix → FAQ.

**Ce qui relève de l'autorité de domaine (hors de portée court terme) :**
- Les têtes de requête "agence IA France", "meilleure agence automatisation IA" sont dominées par des sites de classement/annuaire tiers (koino.fr, flowt.fr, jedha.co, meilleuragenceia.fr, lafabriquedunet.fr) qui agrègent et comparent des dizaines d'agences — impossible à déloger sans autorité de domaine construite sur des mois. **NBHC ne doit pas viser ces requêtes en premier.**

### 2.2 Concurrent direct le plus dangereux : Nerolia (BTP + Automobile)
**nerolia-ai.fr** publie des guides longue traîne qui ciblent EXACTEMENT les niches BTP et Automobile de NBHC :
- `/blog/agent-ia-btp-artisan-devis-automatique-gestion-chantier`
- `/blog/agent-ia-garage-automobile-concessionnaire-france`

Structure décortiquée (page garage automobile, ~3 500-4 000 mots) :
- H1 : "Agent IA pour Garage Automobile et Concession Auto : Zéro Appel Manqué, RDV Entretien Automatisés"
- H2 en cascade : coût réel des appels manqués → ce que fait un agent IA concrètement → prix réels en France (tableau comparatif 3 niveaux) → cas d'usage concessions → intégrations DMS compatibles → "photo du terrain" (avant/après) → 5 questions à poser avant de choisir → calcul de ROI → FAQ (9 questions).
- **Aucun schema.org détecté** sur cette page (ni FAQPage, ni Service, ni Article) — **c'est une vraie faille exploitable** : NBHC peut publier un contenu de qualité équivalente ou supérieure ET le baliser correctement, ce que Nerolia ne fait pas.
- Maillage interne minimal (quelques CTA), pas de fort réseau de pages liées.
- Ton : professionnel, chiffré, avec des citations attribuées ("Marc Durand, Garage Autoservice") — **attention, NBHC n'a aucune référence client et ne doit surtout pas reproduire ce type de citation fictive ou non vérifiable.**

Nerolia possède aussi `nerolia-formation.fr`, organisme de formation certifié Qualiopi (>50 entreprises formées) — donc une **structure sœur déjà positionnée sur la niche "formation"**, ce qui en fait indirectement un concurrent potentiel si NBHC publie du contenu formation.

**Verdict :** le format long-guide + FAQ + tableau de prix de Nerolia est reproductible à court terme par NBHC. L'absence de schema.org chez eux est une fenêtre d'opportunité concrète et vérifiable (pas une supposition).

### 2.3 Autres concurrents directs par niche
- **Automobile/garage** : Clotilde.ai (agent IA garage, tarif préférentiel -20% mentionné), Heeya (chatbot garagiste dès 19€/mois), AutoCoreAI (éditeur DMS avec blog IA garage), aismarttalk.tech (solutions IA garages indépendants, en partie anglophone/générique).
- **Organisme de formation** : Bonjour IA (automatisations spécifiques organismes de formation, intégrations Digiforma/Ypareo/Dendreo/VSA/Docebo — angle d'intégration logiciel métier très pertinent à reprendre), Digiforma/Pétronille (éditeur logiciel avec assistant IA intégré — pas une agence concurrente directe mais un acteur de référence à connaître/mentionner en comparaison).
- **Sport / Bien-être / instituts** : **whitespace quasi total en France.** La recherche ne remonte que des outils génériques internationaux (Crowdy.ai, FastBots.ai — chatbots SaaS auto-service, pas des agences françaises avec du contenu dédié) et des articles génériques "IA salon de coiffure/beauté" sans agence française identifiée qui possède une page pilier dédiée "automatisation IA salle de sport" ou "automatisation IA association sportive". **C'est la niche où NBHC peut le plus facilement devenir la référence de contenu**, précisément parce que c'est la moins disputée — cohérent avec le fait que c'est aussi la niche la plus activement prospectée (Vernon).

### 2.4 Signal réseaux (LinkedIn/Twitter/Reddit)
Recherche partiellement limitée cette session (outil Twitter indisponible en cours de route, à refaire si utile). Ce qui a pu être établi : Nerolia Formation est identifiable comme organisme Qualiopi basé à Paris, mais aucune donnée d'engagement social spécifique n'a pu être vérifiée dans le temps imparti. **Je ne remplis pas cette lacune par une estimation inventée** — recommandation : refaire une passe X/LinkedIn dédiée si l'angle contenu social devient prioritaire, plutôt que de bâtir la stratégie GATE 2 dessus (le SERP et l'analyse de pages suffisent pour l'architecture on-page).

---

## 3. Matrice de mots-clés priorisée

Méthode : requêtes réelles observées dans les résultats de recherche (title tags concurrents, "les gens demandent aussi", structure des guides concurrents) + logique métier (ce que taperait un dirigeant qui cherche à automatiser une tâche précise). **Aucun volume de recherche exact n'est avancé** — je n'ai pas d'accès à un outil de volumétrie (Search Console, Ahrefs, SEMrush) dans cette session ; les priorités ci-dessous sont qualitatives (concurrence observée sur le SERP + spécificité de la requête), pas quantitatives.

### 3.1 Longue traîne atteignable à court terme (priorité 1 — viser en premier)
Requêtes à faible concurrence observée (peu ou pas de résultat français dédié en page 1), forte intention, correspondant à une automatisation W-SPORT/W-AUTO précise.

| Requête | Niche | Intention | Concurrence observée | Page cible proposée |
|---|---|---|---|---|
| automatiser relances impayés salle de sport | Sport | Commerciale | Très faible (aucun résultat FR dédié) | `/automatisation-salle-de-sport` (section) |
| chatbot prise de rendez-vous institut de beauté | Sport/Bien-être | Commerciale | Faible (outils génériques internationaux seulement) | `/automatisation-institut-beaute` ou section dédiée |
| automatiser inscriptions association sportive | Sport (asso) | Commerciale | Très faible | `/automatisation-association-sportive` |
| relance cotisations impayées club sportif | Sport (asso) | Commerciale | Très faible | même page, section dédiée |
| logiciel devis automatique artisan BTP | BTP | Commerciale | Moyenne (Nerolia + éditeurs logiciels présents) | `/automatisation-artisan-btp` |
| agent IA téléphonique garage automobile | Automobile | Commerciale | Moyenne-haute (Nerolia, Clotilde.ai, Heeya déjà présents) | `/automatisation-garage-automobile` |
| automatiser convocations organisme de formation | Formation | Commerciale | Faible-moyenne (Bonjour IA seul identifié) | `/automatisation-organisme-formation` |
| automatiser relance devis non signé PME | Générique | Commerciale | Moyenne | Page socle générique + niches |
| réduire no-show cours collectifs salle de sport | Sport | Informationnelle | Très faible | Blog/ressource |
| IA relance cotisations bénévoles club sport | Sport (asso) | Informationnelle | Très faible | Blog/ressource |

### 3.2 Moyen terme (priorité 2 — concurrence réelle mais surmontable avec du contenu de qualité + quelques mois)
| Requête | Niche | Intention | Concurrence observée |
|---|---|---|---|
| automatisation IA garage automobile France | Automobile | Commerciale | Haute (Nerolia domine ce sous-thème précis) |
| IA pour cabinet comptable automatisation | Comptabilité | Commerciale | Haute (déjà couvert par 1 article NBHC — à renforcer) |
| automatisation IA PME TPE France | Générique | Commerciale | Haute (dizaines d'agences positionnées) |
| agent IA entreprise sur mesure | Générique | Commerciale | Haute |

### 3.3 Long terme / hors de portée court terme (priorité 3 — nécessite autorité de domaine)
| Requête | Pourquoi hors de portée maintenant |
|---|---|
| agence IA France | SERP dominé par sites de classement tiers (koino.fr, flowt.fr, jedha.co...) avec autorité de domaine ancienne |
| meilleure agence automatisation IA | Idem — requête "liste/comparatif", pas une requête où une agence individuelle ranke |
| agence n8n France | Marché déjà dense (10+ agences identifiées avec du contenu dédié depuis plus longtemps) |
| intelligence artificielle entreprise | Requête trop large, tête de longue traîne générique, cible SaaS internationaux |

**Recommandation de priorisation :** concentrer les 2-3 premiers mois de contenu sur la section 3.1 (longue traîne, faible concurrence, alignée sur le cold call réel), pas sur la section 3.3. Le ranking sur 3.1 est plausible en quelques semaines à quelques mois une fois les pages publiées et indexées (Search Console) ; le ranking sur 3.3 se compte en mois/années et dépend de backlinks que le GATE 2 ne peut pas produire seul.

---

## 4. Plan d'architecture de pages proposé (à valider avant code)

### 4.1 Pages secteur (une par niche réellement prospectée)
- `/automatisation-salle-de-sport` (FR) — couvre salles/studios/fitness. Contenu basé sur W-SPORT-01, 03, 05 (rappels no-show, relance abonnements, avis Google).
- `/automatisation-association-sportive` — couvre le volet loi 1901 séparément du commercial (ton différent, offre asso/solidaire à mentionner). Basé sur W-SPORT-06, 07, 09.
- `/automatisation-institut-beaute` ou fusionné dans la page salle de sport avec section dédiée (à trancher selon volume de contenu réel disponible — éviter une page trop fine). Basé sur W-SPORT-02, 08.
- `/automatisation-garage-automobile` — basé sur le catalogue W-AUTO (IA téléphonique, relance devis, rappels CT/révision, avis Google).
- `/automatisation-artisan-btp` — renforce/remplace la section BTP existante de la homepage avec une vraie page dédiée (actuellement seulement un article de blog + une carte homepage).
- `/automatisation-organisme-formation` — nouvelle niche, aucun contenu existant. Angle : convocations, certificats/attestations, relances OPCO/CPF (à sourcer précisément en GATE 2, ne pas improviser le vocabulaire réglementaire).

**Décision à valider avec vous :** faut-il garder les 2 secteurs actuels (Experts-comptables, Avocats/notaires) qui ne correspondent à aucune prospection terrain documentée dans cette conversation ? Je ne les supprime pas unilatéralement — l'audit ne sait pas si NBHC prospecte ces niches par un autre canal (Worthifast est mentionné dans `llms.txt` comme produit SaaS comptable séparé, donc le lien existe peut-être). **Question pour vous : gardons-nous ces 2 sections telles quelles, les fusionnons-nous avec les nouvelles pages secteur, ou les retirons-nous du menu principal ?**

### 4.2 Pages secteur × ville : recommandation = NON, sauf cas précis
L'audit ne recommande PAS de générer des pages `/automatisation-salle-de-sport-vernon`, `/automatisation-garage-toulouse`, etc. en série. Risque de doorway pages si le contenu par ville n'est pas substantiellement différent (le brief le signale explicitement, et les seuils de qualité du skill SEO utilisé confirment : warning dès 30 pages géo, hard stop à 50). Avec seulement 2 zones travaillées (Vernon+périphérie, Toulouse) et une doctrine "qualité > quantité" déjà appliquée en prospection, créer 2 pages ville dédiées **avec du contenu réellement local** (mention de la zone de chalandise, pas juste un nom de ville injecté dans un template) est défendable, mais seulement si vous validez qu'il y a assez de matière différenciante (ex: mentionner explicitement "Vernon et sa périphérie (Eure)" dans la page Sport, "Toulouse et sa métropole" dans la page Garage) plutôt que de créer une URL séparée. **Proposition : intégrer la mention géographique en section de la page secteur elle-même (meilleur pour l'instant, moins risqué), pas en URL dédiée.** À trancher ensemble.

### 4.3 Blog / ressources — longue traîne informationnelle
Étendre le blog existant (3 articles) avec des articles alignés sur la section 3.1 :
- "Comment réduire les no-shows sur les cours collectifs en salle de sport"
- "Gérer les certificats médicaux et licences d'une association sportive sans y perdre son bénévolat"
- "Pourquoi les garages perdent des appels et comment y remédier" (déjà en partie couvert conceptuellement par la niche mais pas encore publié)
- Renforcement de l'article BTP existant avec liens internes vers la nouvelle page secteur BTP.

### 4.4 Maillage interne proposé
Chaque page secteur → lien vers le diagnostic gratuit (Calendly), lien vers 1-2 articles de blog associés, lien vers les autres pages secteur ("vous êtes plutôt dans le BTP ? voir aussi..."), lien depuis la homepage (`Sectors.tsx` doit pointer vers les vraies URLs, pas seulement vers `#pricing`).

---

## 5. Ce qui est atteignable court terme vs long terme (honnêteté sur les délais)

**Atteignable en quelques semaines (une fois les pages publiées + indexées via Search Console) :**
- Ranking sur la longue traîne section 3.1 (peu de concurrence documentée), à condition que le contenu soit substantiel et réellement utile (pas un template creux).
- Correction des problèmes techniques identifiés (sitemap `/agentic-ai`, `llms.txt`, schema par page) — effet immédiat sur la qualité de crawl, pas sur le ranking en soi.
- Rich results potentiels (FAQ, Service) si le balisage est correct — mais rappel : Google a restreint FAQPage aux sites gouvernementaux/santé depuis août 2023, donc le bénéfice attendu est plutôt côté citation IA (GEO) que rich snippet Google classique.

**Long terme, plusieurs mois à un an, hors de portée du seul travail on-page :**
- Ranking sur les requêtes de la section 3.2/3.3 — nécessite des backlinks et de l'ancienneté de domaine que le code ne peut pas produire.
- Concurrencer Nerolia frontalement sur "agent IA garage automobile" — possible à moyen terme si NBHC publie un contenu au moins aussi complet ET mieux balisé, mais Nerolia a l'antériorité.
- Toute promesse de "top 3 Google" à court terme serait malhonnête compte tenu de l'âge du domaine et de l'absence de backlinks — **je ne la fais pas**.

---

## 6. Recommandation avant tout code : mesurer le Loader

Avant de décider quoi que ce soit sur le Loader/Lenis en GATE 2, il serait utile de faire tourner un test Lighthouse/PageSpeed Insights réel sur la homepage actuelle pour quantifier l'impact exact du loader sur le LCP (au lieu de rester sur une estimation basée sur la lecture du code). Cette mesure n'a pas été faite dans cette passe GATE 1 (elle nécessiterait de builder et servir le site, ce qui sort du strict read-only, ou d'utiliser PageSpeed Insights sur le site déployé si vous me donnez le feu vert). **Je vous propose de la faire en tout début de GATE 2**, avant de toucher au code, pour arbitrer objectivement plutôt que de deviner.

---

## 7. Questions ouvertes pour votre validation avant GATE 2

1. **Sections existantes (Experts-comptables, Avocats/notaires) sur la homepage** : garder, fusionner, ou retirer du menu principal au profit des 4 nouvelles niches ?
2. **Granularité Sport/Bien-être** : une seule page `/automatisation-salle-de-sport` qui couvre salles + studios + instituts + associations, ou plusieurs pages plus fines (risque de contenu mince si trop découpé vu le volume de contenu réellement disponible) ?
3. **Géo (Vernon/Toulouse)** : mention en section dans la page secteur (recommandé par cet audit) ou pages dédiées séparées malgré le risque doorway (déconseillé sauf contenu substantiellement différent que vous jugeriez disponible) ?
4. **Organisme de formation** : confirmez-vous le vocabulaire réglementaire à utiliser (OPCO, CPF, Qualiopi, bilan pédagogique et financier) — je devrai le sourcer précisément en GATE 2 plutôt que de l'inventer, avez-vous des livrables de prospection sur cette niche comme pour Sport/Auto, ou dois-je partir de zéro sur le catalogue d'automatisations (W-FORMATION) ?
5. **Mesure Lighthouse/PSI avant de toucher au Loader** : OK pour que je lance ce test en tout début de GATE 2 ?

---

## 8. GATE 2 — Ce qui a été implémenté (2026-07-07)

**Mesure Lighthouse (mobile, préalable au fix du Loader, comme validé) :**
- Homepage avant fix : score performance 24/100, LCP 5,1s. Élément LCP identifié par Lighthouse : le texte "NBHC" du Loader lui-même (`element render delay` : 5058ms) — preuve directe que le Loader/AppShell gâchait le LCP.
- Homepage après fix (contenu réel non gaté en opacity, Loader/GSAP inchangés) : score 62/100, LCP 4,6s. L'élément LCP est désormais le vrai sous-titre du Hero (progrès réel), mais il reste un délai de rendu de ~4,6s.
- **Cause du délai restant, identifiée mais non corrigée (hors scope autorisé)** : `Hero.tsx` a sa propre timeline GSAP qui démarre plusieurs éléments (dont le sous-titre) à `opacity: 0` et les révèle en cascade avec un stagger — indépendamment du Loader. Ce n'était pas dans le périmètre validé ("Loader/Lenis uniquement"). **Je ne l'ai pas touché** et vous le signale : si vous voulez aller plus loin sur le LCP de la homepage, c'est la prochaine cible, mais ça touche à une animation d'entrée délibérée (pas un bug comme le Loader), donc à valider avec vous avant d'y toucher.
- Page secteur `/automatisation-salle-de-sport` (nouvelle, server-rendered, sans stagger GSAP) : score 90/100, LCP 2,3s. Confirme que les nouvelles pages n'héritent pas du problème.

**Corrections techniques :**
- `llms.txt` resynchronisé avec l'offre réelle (Quick Win 2 000€ / Standard 4 000€+fee / Sur mesure) et les 4 nouvelles niches.
- `/agentic-ai` : layout mort supprimé (metadata qui ne servait jamais), retiré du sitemap (reste un redirect fonctionnel vers `/#pricing` pour les anciens liens).
- `AppShell.tsx` : le contenu réel n'est plus gaté en `opacity: 0` derrière le Loader — le Loader (animation GSAP intacte) le recouvre visuellement le temps de son animation, mais le contenu est désormais le vrai candidat LCP.

**4 pages secteur créées** (`/automatisation-salle-de-sport`, `/automatisation-association-sportive`, `/automatisation-garage-automobile`, `/automatisation-artisan-btp`) : title/meta/H1 uniques par page, contenu distinct (pas de paragraphes copiés-collés d'une page à l'autre), mention géo en section (Vernon/Eure sur Sport, Toulouse métropole sur Garage), JSON-LD Service + BreadcrumbList + FAQPage sur chacune, maillage croisé entre les 4 pages + vers l'article de blog BTP existant.

**Homepage (`Sectors.tsx`)** : les 4 nouvelles pages sont désormais en premier plan (cartes cliquables vers leurs vraies URLs), Comptables/Avocats/Agences rétrogradés dans une section "Autres secteurs accompagnés" plus discrète, toujours présente mais visuellement secondaire.

**Sitemap** : 4 nouvelles URLs ajoutées (priorité 0.9), `/agentic-ai` retiré.

*Fin du rapport GATE 1/2. En attente de votre revue avant commit/déploiement (GATE 3).*
