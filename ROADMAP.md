# 🚀 Roadmap Système IA Intelligent - Portfolio

## 📊 Progression Globale : **45%**

---

## ✅ Phase 1: UI & Thèmes (100% - TERMINÉ)

### 1.1 Correction Bugs Thèmes ✅
- [x] Fix spécificité CSS (Cyberpunk/Neon)
- [x] Gradient orange Black Ops (Dark theme)
- [x] Texte sanguine visible (Zen theme)
- [x] Widget Zen 3 couleurs (Lin/Doré/Sanguine)
- [x] Mobile UX pour widget œil
- **Résultat** : 6 thèmes fonctionnels et distincts

### 1.2 Typography Par Thème (100% - TERMINÉ)
- [x] Dark: Outfit moderne, sans-serif
- [x] Zen: Merriweather serif + parchemin
- [x] Cyberpunk: Outfit bold + effets néon
- [x] Midnight: Sans-serif océanique (Outfit)
- [x] Neon: Fira Code monospace hacker
- [x] Matrix: Courier New + glitch (Fira Code)

---

## ✅ Phase 2: Data Collection RGPD (75% - EN COURS)

### 2.1 Infrastructure Backend ✅
- [x] Prisma schema (ChatSession, ChatMessage, ConsentLog)
- [x] API routes `/analytics/session` & `/consent`
- [x] Types TypeScript
- [x] React hooks `useConsent` & `useSession`
- **Temps** : ~1h30 | **LOC** : ~400

### 2.2 Intégration Frontend (30%)
- [ ] Widget consent progressif dans AskKenshuHome
- [ ] Opt-in après 2-3 messages
- [ ] Commandes slash : `/optout`, `/delete`
- [ ] Dashboard admin analytics

### 2.3 Base de Données Production (0%)
- [ ] Setup Vercel Postgres
- [ ] Variables d'environnement
- [ ] Migration Prisma
- [ ] Tests en production

---

## 🔄 Phase 3: Multi-Personnalité IA (15% - EN ATTENTE)

### 3.1 Question Classifier (0%)
- [ ] Analyse keywords (technical, commercial, casual)
- [ ] Détection intention (recrutement, projet, curiosité)
- [ ] Scoring confiance

### 3.2 AI Router (0%)
- [ ] Logique de routing par profil
- [ ] Failover cascade (Primaire → Secondaire → Llama)
- [ ] Gestion timeout & retry

### 3.3 Personnalités Définies (15%)
- [x] Grok Beta: Créatif, direct (config actuelle)
- [ ] Claude 3.5: Code-focused, analytique
- [ ] GPT-4o: Commercial, persuasif
- [ ] Llama 3.3: Backup fiable gratuit

---

## 🧠 Phase 4: RAG Implementation (10% - EN ATTENTE)

### 4.1 Vector Database (0%)
- [ ] Setup Pinecone free tier
- [ ] Config OpenAI Embeddings
- [ ] Index creation

### 4.2 Data Ingestion (10%)
- [ ] Source: experiences.ts
- [ ] Source: services data
- [ ] Source: PROJECT_SUMMARY.md
- [ ] Source: contexte_donnees (RGPD rules)
- [ ] Chunking strategy (500 tokens)
- [ ] Embedding + upsert

### 4.3 Query Augmentation (0%)
- [ ] Embed user question
- [ ] Similarity search (top 3)
- [ ] Inject context in prompt
- [ ] Test accuracy

---

## 📄 Phase 5: Document Upload & Analyse (0%)

### 5.1 Upload Component (0%)
- [ ] File input UI (PDF/TXT/MD)
- [ ] Parser PDF (pdf-parse)
- [ ] Vercel Blob storage

### 5.2 Mission Analyzer (0%)
- [ ] Prompt spécialisé analyse mission
- [ ] Scoring compatibilité (%)
- [ ] Points forts / risques
- [ ] Option: Save to RAG

---

## 📝 Phase 6: Enhanced System Prompt (25%)

### 6.1 Prompt Architecture (25%)
- [x] Structure de base définie
- [ ] RAG context injection
- [ ] Verbosité adaptive
- [ ] RGPD collection rules intégrées
- [ ] Tone per profile (Recruiter/Dev/Asso)

### 6.2 Testing (0%)
- [ ] Test prompt avec chaque personnalité
- [ ] Mesure pertinence réponses
- [ ] A/B test verbosity levels

---

## 🏗️ Phase 7: Architecture Refactoring (60%)

### 7.1 Feature-Based Structure (20%)
- [x] `features/analytics/` (créé)
- [ ] `features/chat/` (migration)
- [ ] `features/themes/` (migration)
- [ ] `features/documents/` (nouveau)

### 7.2 Code Cleanup (100% - TERMINÉ)
- [x] Archiver composants obsolètes (Admin, Legacy APIs, News, Articles)
- [x] Update tous les imports (Fixed builds)
- [x] Supprimer dead code (sitemap dynamic, rss)
- [x] Lint fixes (theme context)

---

## ✅ Phase 8: Mobile UX Optimization (100% - TERMINÉ)

### 8.1 Widget Zen (100%) ✅
- [x] Click toggle (au lieu de hover)
- [x] Backdrop pour fermer
- [x] Animations smooth
- [x] Touch-friendly buttons

### 8.2 ServiceExplorer (100%) ✅
- [x] Menu horizontal scrollable
- [x] Snap scroll
- [x] Titres visibles
- [x] Auto-scroll center "Data Engineer" ✅
- [x] Optimiser description visibility
- [x] Test sur vrais devices (Simulated)

### 8.3 Global Mobile (80%)
- [x] Responsive breakpoints
- [x] Touch targets (min 44px)
- [x] Fullscreen Chat Modal
- [x] Left/Right Widget grouping
- [ ] Performance audit (Lighthouse)

---

## 🎨 Phase 9: Typography & Writing (20%)

### 9.1 Font Loading (100%) ✅
- [x] Load custom fonts par thème (Inter, Merriweather, Fira Code, Outfit)
- [x] Fallback strategy
- [x] FOUT/FOIT prevention

### 9.2 Content Adaptation (0%)
- [ ] Headers size/weight par thème
- [ ] Body text readability
- [ ] Code blocks styling
- [ ] Link states harmonisés

---

## 🚀 Phase 10: Testing & Deploy (30%)

### 10.1 Testing (20%)
- [ ] E2E tests (Playwright)
- [ ] Mobile device testing
- [ ] Cross-browser (Safari/Chrome/Firefox)
- [ ] Accessibility audit

### 10.2 Monitoring (30%)
- [x] Vercel Analytics setup
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] User flow analytics

### 10.3 Documentation (40%)
- [x] implementation_plan.md
- [x] task.md
- [x] walkthrough.md
- [ ] README.md update
- [ ] API documentation

---

## 🎨 Phase 11: IA Contextuelle Avancée par Thème (FUTUR)

**Note** : Les thèmes influencent déjà l'IA (voir `ask-kenshu/route.ts` lignes 339-411), mais on peut aller plus loin.

### 11.1 Personnalité Thématique Avancée (0%)
- [ ] Matrix: Langage terminal + easter eggs hacker
- [ ] Zen: Koans + métaphores japonaises + kanji
- [ ] Cyberpunk: Slang urbain + références dystopiques
- [ ] Midnight: Poétique nautique + ambiance ASMR
- [ ] Neon: Hyper-énergétique + références 80s/synthwave

### 11.2 Actions UI Thématiques (0%)
- [ ] Matrix: Déclencher data bursts sur mots-clés ("hack", "system")
- [ ] Zen: Ink drop animation sur concepts philosophiques
- [ ] Cyberpunk: Glitch effect sur termes techniques
- [ ] Midnight: Shooting star sur réussites mentionnées
- [ ] Neon: Neon pulse sur mots d'action

### 11.3 Mémoire Contextuelle Thématique (0%)
- [ ] Tracker préférence thème utilisateur
- [ ] Adapter ton IA selon historique thème
- [ ] Suggestions personnalisées par thème
- [ ] Analytics: Corrélation thème ↔ profil visiteur

---

## 📈 Métriques Cibles

| Métrique | Actuel | Objectif | Progress |
|----------|--------|----------|----------|
| Themes fonctionnels | 6/6 | 6/6 | ✅ 100% |
| RGPD Compliance | Infra OK | Full impl | 🟡 75% |
| Multi-IA routing | 0 | 4 modèles | 🔴 15% |
| RAG accuracy | N/A | >90% | 🔴 10% |
| Mobile UX | Optimal | Optimal | ✅ 95% |
| Code coverage | N/A | >80% | 🔴 0% |

---

## 🎯 Prochaines Actions Immédiates

1. **[NEXT]** Consent UI integration (Phase 2)
2. **[NEXT]** Content Adaptation (Phase 9.2)
3. **[BLOQUÉ]** RAG setup (need Pinecone account)
4. **[BLOQUÉ]** DB Production (need Vercel Postgres)

---

**Dernière maj** : 17/01/2026 06:20
**Prochaine revue** : Après Consent UI
