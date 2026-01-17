# Audit SEO & Améliorations Portfolio - 17/01/2026

## ✅ Corrections Effectuées

### 1. Data Accuracy
- ✅ Supprimé "Lead" de BNP Paribas (`experiences.ts`)
- ✅ Modifié Orange role : "DevOps / Big Data Engineer" → "Data Engineer DevOps"  
- ✅ Correction `testimonials.ts` : "Lead Data Engineer" → "Data Engineer"

---

## 🔴 Problèmes SEO Critiques Détectés

### 1. Pages Client-Side Sans Metadata
**Impact**: Google ne peut pas indexer correctement les pages

**Pages affectées**:
- `/projets/page.tsx` → `"use client"` sans export metadata
- Probablement `/contact` aussi

**Solution**: Convertir en Server Components OU extraire metadata dans fichier séparé

### 2. Page /services - Metadata à Vérifier
**Statut**: À auditer

### 3. Structured Data Incomplet
**Manque potentiel**:
- BreadcrumbList sur pages secondaires
- FAQPage (si FAQ présente)
- Service schema pour /services

---

## 📊 Recommandations SEO par Priorité

### PRIORITÉ 1 - CRITIQUE (à faire maintenant)

#### A. Ajouter Metadata à /projets
```typescript
// src/app/projets/page.tsx - À AJOUTER en haut
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Expériences Professionnelles | BNP, Orange, Safran - Raouf Warnier",
  description: "Missions Data Engineering chez BNP Paribas, Orange, Safran et ACC. Pipelines Big Data, DevOps, IoT. 3+ ans d'expertise sur environnements critiques.",
  keywords: [
    "Data Engineer BNP Paribas",
    "DevOps Orange",
    "Big Data Safran",
    "Missions freelance data engineering",
    "Expérience Spark Airflow",
    "Pipeline ETL production"
  ],
  openGraph: {
    title: "Mes Expériences Professionnelles en Data Engineering",
    description: "3+ ans sur des projets Data critiques : BNP Paribas, Orange, Safran",
    type: "profile",
    url: "https://kenshu.dev/projets"
  }
}

// PUIS convertir en Server Component (retirer "use client")
```

#### B. Audit /services Metadata
Vérifier si les keywords incluent :
- "services data engineering"
- "automatisation n8n"
- "RAG chatbot"
- "AI Act audit"

#### C. Vérifier /contact Metadata
Même problème potentiel que /projets

---

### PRIORITÉ 2 - IMPORTANT (cette semaine)

#### D. Structured Data Enrichment

**1. BreadcrumbList sur toutes les pages**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://kenshu.dev" },
    { "@type": "ListItem", "position": 2, "name": "Expériences", "item": "https://kenshu.dev/projets" }
  ]
}
```

**2. Service Schema pour /services**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Data Engineering & AI",
  "provider": {
    "@type": "Person",
    "name": "Raouf Warnier"
  },
  "areaServed": "France",
  "offers": [...]
}
```

#### E. Internal Linking Strategy
- Ajouter des liens contextuels entre pages
- Ex: De /projets → /services ("Découvrez mes services Data Engineering")
- Ex: De /services → /projets ("Voir mes expériences terrain")

---

### PRIORITÉ 3 - OPTIMISATIONS (ce mois-ci)

#### F. Performance SEO
- ✅ Images déjà optimizées (WebP via generate_image)
- ⚠️ Vérifier taille des JSON de thèmes (actuellement ~500 bytes chacun = OK)
- ⚠️ Lazy load ServiceExplorer images si scroll requis

#### G. Content SEO
**Page /projets**:
- Ajouter section "Compétences clés" (résumé des technos)
- Tableau récapitulatif : Entreprise | Domaine | Stack

**Page /services**:
- Pricing indicatif (au moins "Sur devis" vs "Forfait")
- Témoignages clients

**Homepage**:
- CTA plus visible ("Disponible Freelance" badge + bouton contact)

#### H. Local SEO (optionnel si remote)
```json
{
  "@type": "PostalAddress",
  "addressLocality": "Paris",
  "addressCountry": "FR"
}
```

---

## 🎯 Quick Wins SEO (30 min)

1. **Alt text images** : Vérifier toutes les images AI-générées ont alt descriptif
2. **Meta robots** : S'assurer qu'aucune page n'est en noindex
3. **Canonical URLs** : Vérifier que layout.tsx définit bien `metadataBase`
4. **Sitemap** : Next.js génère automatiquement ? Sinon créer `app/sitemap.ts`

---

## 📈 Métriques à Surveiller

**Google Search Console**:
- CTR pages principales (objectif >5%)
- Impressions mots-clés : "Data Engineer freelance", "Spark Airflow"
- Core Web Vitals (actuellement non testé en prod)

**Lighthouse SEO**:
- Score actuel : Non testé
- Objectif : 100/100

---

## 🔧 Actions Immédiates Proposées

1. ✅ Fix "Lead" dans data → **FAIT**
2. 🔴 Ajouter metadata /projets → **À FAIRE**
3. 🟠 Vérifier /services metadata → **À AUDITER**
4. 🟠 Vérifier /contact metadata → **À AUDITER**
5. 🟢 Enrichir structured data → **OPTIONNEL**

---

## 💡 Idées Innovantes

### A. AI-Powered Content
L'IA du site pourrait :
- Suggérer des mots-clés manquants (ex: "Tu as oublié de mentionner Kafka dans ton SEO")
- Générer meta descriptions optimisées

### B. Dynamic Structured Data
Générer automatiquement les breadcrumbs via un hook Next.js

### C. SEO Dashboard (interne)
Mini-outil pour tracker :
- Pages sans metadata
- Alt text manquants
- Keywords density

---

**Dernière mise à jour** : 17/01/2026 01:15
**Statut** : 3 corrections data terminées, 4 tâches SEO en attente
