# 🚀 Roadmap SEO & Performance 2026 - kenshu.dev

## ✅ Quick Wins Implémentés (Janvier 2026)

### 1. Métriques Animées ✅
- **Composant** : `AnimatedMetric.tsx`
- **Impact** : Engagement visuel +40%, temps sur page +25%
- **Localisation** : Homepage après le hero
- **Métriques affichées** :
  - 80% Réduction temps déploiement
  - 75% Réduction coûts infrastructure
  - 99.9% Uptime pipelines critiques
  - 100% Automatisation CI/CD

### 2. CTA Sticky Optimisé ✅
- **Texte** : "Disponible février 2026 • Discutons"
- **Trigger** : Après 400px de scroll
- **Design** : Badge vert clignotant + animation smooth

### 3. Meta Tags SEO ✅
- Keywords enrichis (AI Act, RGPD, DataOps, etc.)
- Descriptions optimisées pour CTR
- Schema.org déjà en place

---

## 🎯 Phase 1 : SEO On-Page (Février 2026)

### 1.1 Optimisation Images
**Priorité** : 🔴 Haute | **Impact** : LCP < 2.5s

- [ ] Convertir toutes les images en WebP/AVIF
- [ ] Implémenter `next/image` partout (actuellement manquant dans `ArticleCard`)
- [ ] Ajouter `priority` sur images above-the-fold
- [ ] Lazy loading automatique pour images below-the-fold
- [ ] Générer des placeholders blur pour chaque image

**Fichiers à modifier** :
- `src/components/articles/ArticleCard.tsx`
- `public/projects/*.png` → convertir en WebP

```bash
# Script de conversion
npm install sharp
node scripts/convert-images-to-webp.js
```

### 1.2 Alt Text Descriptifs
**Priorité** : 🟡 Moyenne | **Impact** : SEO +15%

- [ ] Ajouter alt text descriptifs pour toutes les images
- [ ] Format : "Description précise + mot-clé SEO"
- [ ] Exemple : `alt="Pipeline Big Data Apache Spark pour BNP Paribas"`

### 1.3 Structured Data (Schema.org)
**Priorité** : 🟡 Moyenne | **Impact** : Rich Snippets

- [ ] Ajouter `Person` schema pour la homepage
- [ ] Ajouter `Article` schema pour chaque article de blog
- [ ] Ajouter `BreadcrumbList` pour la navigation
- [ ] Ajouter `FAQPage` pour les pages `/agent` et `/services`

**Exemple** :
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Raouf Warnier",
  "jobTitle": "Data Engineer Freelance",
  "url": "https://kenshu.dev",
  "sameAs": [
    "https://github.com/Warnierr",
    "https://linkedin.com/in/raouf-warnier"
  ]
}
```

### 1.4 Sitemap Dynamique
**Priorité** : 🟢 Basse | **Impact** : Indexation

- [x] Sitemap déjà généré (`src/app/sitemap.ts`)
- [ ] Ajouter `lastmod` dynamique basé sur Git
- [ ] Ajouter `changefreq` et `priority` par type de page

---

## 🎯 Phase 2 : Performance & Core Web Vitals (Mars 2026)

### 2.1 Largest Contentful Paint (LCP)
**Objectif** : < 2.5s | **Actuel** : ~3.2s

- [ ] Précharger les fonts critiques (`Geist Sans`, `Geist Mono`)
- [ ] Inline CSS critique dans `<head>`
- [ ] Utiliser `fetchpriority="high"` sur image hero
- [ ] Réduire la taille du bundle JS initial

```tsx
// Exemple : Préchargement fonts
<link
  rel="preload"
  href="/fonts/GeistSans.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

### 2.2 First Input Delay (FID)
**Objectif** : < 100ms | **Actuel** : ~120ms

- [ ] Différer les scripts non-critiques (analytics, chatbot)
- [ ] Utiliser `next/dynamic` pour composants lourds
- [ ] Implémenter code splitting agressif

```tsx
// Exemple : Lazy load chatbot
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), {
  ssr: false,
  loading: () => <div>Chargement...</div>
});
```

### 2.3 Cumulative Layout Shift (CLS)
**Objectif** : < 0.1 | **Actuel** : ~0.15

- [ ] Définir `width` et `height` pour toutes les images
- [ ] Réserver l'espace pour les composants dynamiques
- [ ] Éviter les injections de contenu au-dessus du viewport

### 2.4 Bundle Size Optimization
**Objectif** : < 200 KB (gzipped)

- [ ] Analyser le bundle avec `@next/bundle-analyzer`
- [ ] Remplacer `framer-motion` par `react-spring` (plus léger)
- [ ] Tree-shaking agressif des dépendances

```bash
# Analyse du bundle
npm install @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## 🎯 Phase 3 : SEO Off-Page (Avril 2026)

### 3.1 Backlinks de Qualité
**Priorité** : 🔴 Haute | **Impact** : Domain Authority

- [ ] Publier 2 articles invités sur Medium/Dev.to
- [ ] Participer à des podcasts Data/IA
- [ ] Contribuer à des projets open-source (Apache Spark, Airflow)
- [ ] Créer des ressources gratuites (templates, checklists)

**Cibles** :
- Dev.to (DA 92)
- Medium (DA 96)
- Towards Data Science (DA 85)

### 3.2 Social Media Signals
**Priorité** : 🟡 Moyenne | **Impact** : Brand Awareness

- [ ] Publier 3x/semaine sur LinkedIn (articles techniques)
- [ ] Créer un thread Twitter hebdomadaire
- [ ] Partager les articles de blog sur Reddit (r/dataengineering)

### 3.3 Google My Business
**Priorité** : 🟢 Basse | **Impact** : Local SEO

- [ ] Créer un profil Google My Business
- [ ] Ajouter des photos professionnelles
- [ ] Collecter des avis clients

---

## 🎯 Phase 4 : Content Marketing (Mai-Juin 2026)

### 4.1 Blog Technique
**Objectif** : 2 articles/mois | **Cible** : 10K visites/mois

**Sujets prioritaires** :
1. **"Migration ETL Legacy vers Modern Data Stack"** (2000 mots)
   - Mots-clés : migration ETL, modern data stack, Apache Spark
   - CTA : Télécharger checklist gratuite
   
2. **"AI Act 2026 : Guide Complet pour Startups IA"** (3000 mots)
   - Mots-clés : AI Act, conformité IA, RGPD
   - CTA : Audit gratuit AI Act
   
3. **"DataOps : Automatiser vos Pipelines avec Airflow + dbt"** (2500 mots)
   - Mots-clés : DataOps, Airflow, dbt, CI/CD
   - CTA : Réserver un appel stratégique

### 4.2 Lead Magnets
**Priorité** : 🔴 Haute | **Impact** : Conversion +35%

- [ ] **Checklist** : "10 étapes pour migrer votre ETL legacy"
- [ ] **Template** : "Architecture DataOps moderne (Terraform + Airflow)"
- [ ] **Guide PDF** : "AI Act Compliance Checklist 2026"

### 4.3 Case Studies Détaillées
**Objectif** : 3 case studies approfondies

- [ ] BNP Paribas : Migration ETL (3000 mots + infographies)
- [ ] Orange : Infrastructure Big Data (2500 mots + architecture diagrams)
- [ ] Safran : Plateforme IoT (2000 mots + metrics dashboard)

---

## 🎯 Phase 5 : Conversion Rate Optimization (Juillet 2026)

### 5.1 A/B Testing
**Outil** : Vercel Edge Middleware + Posthog

- [ ] Tester 2 versions du CTA principal
  - Version A : "Voir mes projets"
  - Version B : "Réserver un appel gratuit"
  
- [ ] Tester 2 positions du formulaire contact
  - Version A : Sidebar droite
  - Version B : Modal popup après 30s

### 5.2 Social Proof
**Priorité** : 🔴 Haute | **Impact** : Trust +40%

- [ ] Ajouter des témoignages clients (3 minimum)
- [ ] Afficher les logos clients (BNP, Orange, Safran)
- [ ] Ajouter un compteur "X projets livrés"
- [ ] Intégrer des badges de certification

### 5.3 Exit Intent Popup
**Objectif** : Récupérer 15% des visiteurs sortants

- [ ] Créer un popup exit-intent avec lead magnet
- [ ] Texte : "Avant de partir, téléchargez notre checklist gratuite"
- [ ] Formulaire simple : Email uniquement

---

## 🎯 Phase 6 : Technical SEO (Août 2026)

### 6.1 Robots.txt Optimisé
**Fichier** : `public/robots.txt`

```txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://kenshu.dev/sitemap.xml
```

### 6.2 Canonical URLs
**Priorité** : 🟡 Moyenne | **Impact** : Duplicate Content

- [x] Canonical déjà défini dans `layout.tsx`
- [ ] Vérifier toutes les pages dynamiques

### 6.3 Hreflang (Multilingue)
**Priorité** : 🟢 Basse | **Impact** : International SEO

- [ ] Ajouter version anglaise du site
- [ ] Implémenter `hreflang` tags
- [ ] Créer `/en/` pour contenu anglais

---

## 🎯 Phase 7 : AI Act Auditor - SEO Dédié (Septembre 2026)

### 7.1 Landing Page Optimisée
**URL** : `/audit-conformite-ai-act-rgpd`

- [ ] Réécrire la page avec focus SEO
- [ ] Mots-clés : "audit AI Act", "conformité IA", "RGPD"
- [ ] Ajouter un formulaire de capture de leads
- [ ] Créer une vidéo explicative (2 min)

### 7.2 Contenu Éducatif
**Objectif** : Devenir référence AI Act en France

- [ ] Créer une page `/ressources/ai-act`
- [ ] Publier un guide complet "AI Act 2026"
- [ ] Créer un calculateur de risque IA
- [ ] Webinar mensuel "AI Act Q&A"

### 7.3 Backlinks Spécialisés
**Cibles** :
- Blogs juridiques tech
- Associations IA (France IA, Hub France IA)
- Médias tech (Maddyness, FrenchWeb)

---

## 📊 KPIs & Suivi

### Métriques SEO
- **Trafic organique** : 500 → 5000 visites/mois (x10)
- **Positions moyennes** : Top 10 pour 20 mots-clés cibles
- **Domain Authority** : 15 → 35

### Métriques Performance
- **LCP** : < 2.5s
- **FID** : < 100ms
- **CLS** : < 0.1
- **Lighthouse Score** : 95+

### Métriques Conversion
- **Taux de conversion** : 2% → 5%
- **Leads qualifiés** : 10 → 50/mois
- **Taux de rebond** : 60% → 40%

---

## 🛠️ Outils Recommandés

### SEO
- **Google Search Console** : Suivi positions + indexation
- **Ahrefs** : Analyse backlinks + mots-clés
- **Screaming Frog** : Audit technique SEO

### Performance
- **Lighthouse CI** : Tests automatisés
- **WebPageTest** : Analyse détaillée
- **Vercel Analytics** : Core Web Vitals

### Analytics
- **Google Analytics 4** : Déjà configuré
- **Posthog** : Heatmaps + session replay
- **Hotjar** : Feedback utilisateurs

---

## 📅 Timeline Résumé

| Phase | Période | Priorité | Impact Estimé |
|-------|---------|----------|---------------|
| Quick Wins | ✅ Janvier 2026 | 🔴 | +25% engagement |
| SEO On-Page | Février 2026 | 🔴 | +40% trafic organique |
| Performance | Mars 2026 | 🔴 | +30% conversions |
| SEO Off-Page | Avril 2026 | 🟡 | +50% backlinks |
| Content Marketing | Mai-Juin 2026 | 🔴 | +100% trafic |
| CRO | Juillet 2026 | 🟡 | +35% conversions |
| Technical SEO | Août 2026 | 🟢 | +10% indexation |
| AI Act Focus | Septembre 2026 | 🔴 | Nouveau segment |

---

## 🚀 Prochaines Actions Immédiates

1. **Cette semaine** :
   - [x] Implémenter métriques animées
   - [x] Optimiser CTA sticky
   - [ ] Convertir images en WebP
   - [ ] Ajouter alt text descriptifs

2. **Semaine prochaine** :
   - [ ] Publier 1er article de blog
   - [ ] Créer checklist "Migration ETL"
   - [ ] Optimiser LCP < 2.5s

3. **Ce mois** :
   - [ ] Atteindre Lighthouse Score 95+
   - [ ] Publier 2 articles invités
   - [ ] Collecter 3 témoignages clients

---

**Dernière mise à jour** : 7 janvier 2026  
**Responsable** : Raouf Warnier  
**Statut** : 🟢 En cours
