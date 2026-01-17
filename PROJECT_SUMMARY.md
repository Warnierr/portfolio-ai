# Portfolio AI - Architecture & Plan d'Évolution

## 📋 Vue d'ensemble du Projet

Portfolio intelligent de Raouf Warnier (Data Engineer, AI Product Builder, DevOps) avec assistant IA intégré, système de thèmes avancé et capture de données analytics.

**Stack Technique**
- **Framework** : Next.js 15 (App Router) + React 18
- **Styling** : Tailwind CSS v4 + Design Tokens System
- **UI/Animation** : Framer Motion
- **Theming** : next-themes + Custom CSS Variables
- **IA** : OpenRouter (Grok Beta, Llama 3.3, Gemini 2.0 failover)
- **Déploiement** : Vercel (CI/CD automatique)
- **Analytics** : Google Analytics 4

---

## 🗂️ Architecture des Fichiers

### Structure Actuelle

```
portfolio-ai/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Layout global (ThemeProvider, Analytics)
│   │   ├── page.tsx                  # Page d'accueil (redirection vers HomeMinimal)
│   │   ├── globals.css               # Styles globaux + Import thèmes
│   │   ├── projets/
│   │   │   └── page.tsx              # Page Expériences professionnelles
│   │   ├── services/
│   │   │   └── page.tsx              # Page Services (ServiceExplorer)
│   │   ├── contact/
│   │   │   └── page.tsx              # Page Contact (formulaire Resend)
│   │   └── api/
│   │       ├── ask-kenshu/           # API Chat IA (streaming)
│   │       │   └── route.ts
│   │       └── contact/              # API formulaire contact
│   │           └── route.ts
│   │
│   ├── components/                   # Composants React
│   │   ├── HomeMinimal.tsx           # 🎯 Homepage principale
│   │   ├── ThemeSelector.tsx         # Switch thèmes (Dark, Zen, Cyberpunk...)
│   │   ├── EyeComfortControl.tsx     # 👁️ Filtre lumière bleue (Zen theme)
│   │   ├── ConditionalHeader.tsx     # Header avec chat modal
│   │   ├── MobileMenu.tsx            # Menu mobile responsive
│   │   ├── ExperienceItem.tsx        # Carte expérience pro
│   │   ├── ServiceExplorer.tsx       # Explorateur services interactif
│   │   ├── PageTransition.tsx        # Transitions entre pages
│   │   ├── AnalyticsTracker.tsx      # Tracking GA4
│   │   ├── StructuredData.tsx        # Schema.org SEO
│   │   └── ask-kenshu/              # Module Chat IA
│   │       ├── AskKenshuHome.tsx     # Interface chat complète
│   │       └── ProfileSelector.tsx   # Sélection profil utilisateur
│   │
│   ├── styles/                       # Design System
│   │   ├── tokens/
│   │   │   └── themes/               # 🎨 Thèmes JSON (6 thèmes)
│   │   │       ├── dark.json
│   │   │       ├── zen.json          # Papier parchemin + filtre bleu
│   │   │       ├── cyberpunk.json    # Rose/Violet néon
│   │   │       ├── midnight.json     # Océanique bleu-vert
│   │   │       ├── neon.json         # Vert terminal hacker
│   │   │       └── matrix.json       # Vert Matrix classique
│   │   ├── generated/
│   │   │   └── theme-variables.css   # 🤖 Auto-généré (ne pas éditer)
│   │   └── generate-css-vars.js      # Script de génération CSS
│   │
│   ├── lib/                          # Utilitaires & Config
│   │   └── ai-config.ts              # Config multi-modèles IA (failover)
│   │
│   ├── data/                         # Données statiques
│   │   ├── experiences.ts            # Historique professionnel
│   │   └── [autres données]
│   │
│   └── config/                       # Configuration projet
│       └── [config files]
│
├── public/                           # Assets statiques
│   ├── ask-kenshu/                   # Images chat IA
│   ├── og-image.png                  # Open Graph image
│   └── [autres assets]
│
├── .env.local                        # Variables d'environnement (API keys)
├── tailwind.config.ts                # Config Tailwind v4
├── next.config.ts                    # Config Next.js
└── package.json
```

---

## 🎨 Système de Thèmes (Design Tokens)

### Thèmes Disponibles (6)

| Thème | Identité | Particularités |
|-------|----------|----------------|
| **Dark 🌑** | Interface sombre standard | Thème par défaut, noir/gris |
| **Zen 📜** | Papier parchemin | Beige chaud + filtre lumière bleue (3 niveaux) |
| **Cyberpunk 🟣** | Néon rose/violet | Fond ultra-sombre, texte fuchsia (#e879f9) |
| **Midnight 🌊** | Océanique | Bleu-vert profond (Teal), ambiance sous-marine |
| **Neon 💻** | Terminal hacker | Vert néon (#00ff9f), police monospace |
| **Matrix 🟢** | Matrix classique | Vert Matrix, police Courier |

### Architecture Design Tokens

1. **Fichiers JSON** (`src/styles/tokens/themes/*.json`) définissent les tokens
2. **Script Node.js** (`generate-css-vars.js`) génère le CSS
3. **CSS Variables** (`theme-variables.css`) injectées via `globals.css`
4. **ThemeProvider** (next-themes) applique `[data-theme="X"]` au `<html>`

---

## 🤖 Système d'IA Conversationnelle

### Multi-Model Failover Strategy

**Ordre de tentative** (configuré dans `src/lib/ai-config.ts`) :
1. **Grok Beta** (xAI) - Primaire
2. **Llama 3.3 70B** (Meta) - Backup 1
3. **Gemini 2.0 Flash** (Google) - Backup 2
4. **Fallback statique** - Si tout échoue

### Fonctionnalités Chat IA

- ✅ Streaming de réponses
- ✅ Historique local (localStorage)
- ✅ Profil utilisateur (Développeur, Entrepreneur, Recruteur, Curieux)
- ✅ Quick chips (questions pré-remplies)
- ✅ Limite de requêtes (10/session en prod, ∞ en dev)
- ✅ Actions spéciales (CONFETTI, FIREWORKS via triggers)
- ✅ Adaptation visuelle aux thèmes (polices monospace pour Matrix/Neon)

### Données Récoltées (RGPD-Friendly)

**Actuellement** : Aucune donnée personnelle stockée côté serveur.
**Plan futur** : 
- ✅ **Sans consentement** : Questions anonymisées (pas d'IP, pas de nom)
- ⚠️ **Avec consentement** : Profil détaillé pour analytics avancées

---

## 📊 Fichiers Obsolètes / À Archiver

### Composants Legacy (Non utilisés)
```
src/components/LandingPage.tsx         # Ancienne homepage (remplacée par HomeMinimal)
src/components/LandingPageNew.tsx      # Variante non utilisée
src/components/[anciens composants]    # À identifier via grep "import"
```

### Actions à Prendre
1. Audit `import` dans tous les fichiers pour identifier les composants orphelins
2. Créer dossier `src/_archive/` pour historique
3. Supprimer après validation

---

## 🚀 Plan d'Évolution

### Phase 1 : Stabilisation UI/UX ✅ (Fait)
- [x] Système de thèmes complet (6 thèmes)
- [x] Filtre lumière bleue (Zen theme)
- [x] Chat IA responsive mobile
- [x] Hardcoded colors → CSS variables

### Phase 2 : Analytics & Intelligence 🔄 (En cours)
**Objectifs** :
- [ ] **Chat Analytics** : Sauvegarder les questions utilisateurs (anonymisées)
  - Schéma Prisma : `ChatLog { id, sessionId, profile, question, timestamp }`
  - Route API : `POST /api/analytics/chat`
  - Dashboard interne : `/admin/insights`
  
- [ ] **Load Balancing IA Intelligent** :
  - Analyser le type de question (technique, commercial, casual)
  - Router vers le meilleur modèle :
    - Questions code → Llama 3.3 / Claude
    - Questions vente → GPT-4o / Grok
    - Questions simples → Gemini (rapide + gratuit)
  
- [ ] **Amélioration Prompts IA** :
  - Context enrichi (TJM, disponibilité, stack actuel)
  - Verbosité adaptative (courte pour mobile, détaillée pour desktop)
  - Système de scoring pour améliorer les réponses

### Phase 3 : Optimisation & Scalabilité 📈 (Q1 2026)
**Architecture** :
- [ ] **Refactoring Arborescence** :
  ```
  src/
  ├── features/           # Feature-based architecture
  │   ├── chat/          # Tout ce qui concerne le chat IA
  │   ├── themes/        # Système de thèmes
  │   ├── analytics/     # Tracking & insights
  │   └── experiences/   # Gestion expériences pro
  ├── lib/               # Utilities partagées
  ├── ui/                # Composants UI purs (Design System)
  └── app/               # Routes Next.js
  ```

- [ ] **Base de données** :
  - Prisma ORM + PostgreSQL (Vercel Postgres)
  - Tables : `users`, `chat_logs`, `analytics_events`
  
- [ ] **Testing** :
  - Jest + React Testing Library
  - E2E avec Playwright
  
- [ ] **Performance** :
  - Lazy loading composants lourds
  - Image optimization (next/image)
  - Bundle analysis (suppression du superflu)

### Phase 4 : Monétisation & Services 💰 (Q2 2026)
- [ ] **Booking System** : Calendrier pour RDV clients
- [ ] **Paiement** : Stripe pour réservation missions
- [ ] **Blog** : Système de contenu (MDX)
- [ ] **Projets Interactifs** : Démos live des projets Data/IA

---

## 🔧 Problèmes Connus & Solutions

### 1. Thème Cyberpunk "ne change pas"
**Cause** : Cache CSS navigateur + build Next.js
**Solution** :
- ✅ Forcer rebuild via modification `globals.css`
- ✅ Vérifier `[data-theme="cyberpunk"]` dans DevTools
- Si persistant : `rm -rf .next && npm run dev`

### 2. Responsive Mobile Chat IA
**TODO** :
- Améliorer hauteur modale sur petits écrans
- Scroll automatique plus fluide
- Boutons Quick Chips moins larges

### 3. Polices Non Chargées (Matrix/Neon)
**Statut** : Résolu via `font-[family-name:var(--font-main)]`
**Garde** : Vérifier que Google Fonts (Outfit, Merriweather) sont bien importées

---

## 🎯 Prochaines Actions Immédiates

1. **Tester Cyberpunk** : Vider cache navigateur et vérifier le rendu rose/violet
2. **Audit Composants** : Lister tous les imports et identifier les fichiers morts
3. **Analytics Chat** : Créer schéma DB + route API
4. **Documentation IA** : Enrichir le context de l'IA avec les infos à jour de Raouf
5. **RGPD Banner** : Ajouter un bandeau cookie simple (si on active analytics avancées)

---

## 📚 Commandes Utiles

```bash
# Régénération thèmes CSS
node src/styles/generate-css-vars.js

# Dev local
npm run dev

# Build production
npm run build

# Analyse bundle
npm run analyze  # (à configurer avec @next/bundle-analyzer)

# Tests (à implémenter)
npm test

# Lint + Format
npm run lint
npm run format
```

---

**Dernière mise à jour** : 17/01/2026 03:47
**Auteurs** : Raouf Warnier + Assistant IA (Gemini Deep Research)
