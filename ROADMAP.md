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

### 1.2 Typography Par Thème (0%)
- [ ] Dark: Outfit moderne, sans-serif
- [ ] Zen: Merriweather serif + parchemin
- [ ] Cyberpunk: Outfit bold + effets néon
- [ ] Midnight: Sans-serif océanique
- [ ] Neon: Fira Code monospace hacker
- [ ] Matrix: Courier New + glitch

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

## 🏗️ Phase 7: Architecture Refactoring (20%)

### 7.1 Feature-Based Structure (20%)
- [x] `features/analytics/` (créé)
- [ ] `features/chat/` (migration)
- [ ] `features/themes/` (migration)
- [ ] `features/documents/` (nouveau)

### 7.2 Code Cleanup (0%)
- [ ] Archiver composants obsolètes
- [ ] Update tous les imports
- [ ] Supprimer dead code
- [ ] Lint fixes

---

## ✅ Phase 8: Mobile UX Optimization (85% - EN COURS)

### 8.1 Widget Zen (100%) ✅
- [x] Click toggle (au lieu de hover)
- [x] Backdrop pour fermer
- [x] Animations smooth
- [x] Touch-friendly buttons

### 8.2 ServiceExplorer (85%)
- [x] Menu horizontal scrollable
- [x] Snap scroll
- [x] Titres visibles
- [ ] Optimiser description visibility
- [ ] Test sur vrais devices

### 8.3 Global Mobile (70%)
- [x] Responsive breakpoints
- [x] Touch targets (min 44px)
- [ ] Performance audit
- [ ] Lighthouse score >90

---

## 🎨 Phase 9: Typography & Writing (0%)

### 9.1 Font Loading (0%)
- [ ] Load custom fonts par thème
- [ ] Fallback strategy
- [ ] FOUT/FOIT prevention

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

## 📈 Métriques Cibles

| Métrique | Actuel | Objectif | Progress |
|----------|--------|----------|----------|
| Themes fonctionnels | 6/6 | 6/6 | ✅ 100% |
| RGPD Compliance | Infra OK | Full impl | 🟡 75% |
| Multi-IA routing | 0 | 4 modèles | 🔴 15% |
| RAG accuracy | N/A | >90% | 🔴 10% |
| Mobile Lighthouse | ~75 | >90 | 🟡 70% |
| Code coverage | N/A | >80% | 🔴 0% |

---

## 🎯 Prochaines Actions Immédiates

1. **[EN COURS]** Finish mobile UX (ServiceExplorer tweaks)
2. **[NEXT]** Typography par thème
3. **[NEXT]** Consent UI integration
4. **[BLOQUÉ]** RAG setup (need Pinecone account)
5. **[BLOQUÉ]** DB Production (need Vercel Postgres)

---

**Dernière maj** : 17/01/2026 05:15  
**Prochaine revue** : Après Phase 2 complete (consent UI)
