# 🔍 Audit des Prompts IA - Portfolio Kenshu.dev

**Date**: 14 janvier 2026  
**Objectif**: Documenter exactement ce que reçoivent les deux agents IA comme instructions

---

## 📊 Vue d'ensemble

Nous avons **2 agents IA distincts** sur le site :

| Agent | Route | Modèle | Rôle |
|-------|-------|--------|------|
| **Ask Kenshu** | `/api/ask-kenshu` | Gemini 2.0 Flash | Navigation & orientation |
| **Agent Complet** | `/api/chat` | Claude 3.5 Haiku (choix multiples) | Conversation approfondie |

---

## 🤖 Agent 1 : Ask Kenshu (Page d'accueil `/`)

### Modèle utilisé
- **ID**: `google/gemini-2.0-flash-exp:free`
- **Température**: 0.8 (plus créatif)
- **Coût**: Gratuit
- **Vitesse**: Ultra-rapide (~0.5s)

### Contexte fourni (`buildNavigationContext()`)

L'agent reçoit automatiquement :

#### 1. Pages disponibles
```
- /projets - Liste complète des projets et réalisations
- /services - Détail des services proposés
- /contact - Formulaire de contact
- /agent - Version complète de l'assistant IA
- /methode - Méthodologie de travail
```

#### 2. Profil de Raouf
```
Ingénieur Produit Data avec 3+ ans d'expérience.
Conçoit des systèmes data end-to-end : pipelines, plateformes, SaaS.
Diplômé ESIEE Paris en Data Science et IA.
Disponible en freelance.
```

#### 3. Services proposés

**Pour PME / Indépendants :**
- Sites web (vitrines, landing pages, SEO)
- Applications (MVP, outils internes)
- Automatisation n8n (CRM, emails, reporting)
- Projets sur-mesure adaptés au budget

**Pour Grands Groupes :**
- Data Engineering (Spark, Airflow, migrations)
- DevOps (CI/CD, monitoring)
- Plateformes Data (Warehouse, Lake)
- AI Compliance (AI Act, RGPD)
- Missions longues freelance

#### 4. Projets récents (5 derniers)

L'agent reçoit une liste des 5 derniers projets de `src/data/projects.ts` avec :
- Titre
- Client
- Résumé (tldr)

**Exemple actuel** :
```
- Budget AI (Personnel): Assistant financier intelligent avec prédictions de solde
- AI Compliance Audit Tool (Personnel): Outil d'audit automatisé AI Act et RGPD
- Migration ETL BNP Paribas (BNP Paribas): Migration pipelines financiers critiques
- Automatisation Big Data (Orange): Déploiement automatisé Zeppelin, Spark, Airflow
- Plateforme IoT Safran (Safran): Solutions data temps réel pour qualité aéronautique
```

#### 5. Contact
```
Email: contact@kenshu.dev
```

**⚠️ Ce qui N'est PAS fourni** :
- ❌ Numéro de téléphone (volontairement retiré)
- ❌ Tarifs précis (TJM, forfaits)
- ❌ Détails techniques approfondis des projets

---

### Instructions comportementales

L'agent reçoit ces **instructions critiques** :

#### Style & Structure (PRIORITAIRE)
```
- AÈRE TES RÉPONSES : Saute une ligne entre chaque idée
- EMOJIS : Utilise pour rendre chaleureux 🚀✨
- STRUCTURE : Puces (- ) ou gras (**gras**)
- LIENS CLIQUABLES : Format Markdown [Texte](/url)
```

#### Comportement
```
- Aide les visiteurs à trouver la bonne page
- Ton: Friendly, pro, enthousiaste
```

#### Adaptabilité
```
PME/Indépendant → Vulgarise, parle "bénéfice business"
Grand Groupe → Parle "scalabilité", "compliance"
```

#### Format attendu (Exemple donné à l'IA)
```markdown
Bonjour ! Ravi de vous voir ! 👋

Pour ce type de besoin, je peux intervenir sur deux axes :

- **Consulting** 🧠 : Analyse de votre existant
- **Réalisation** 🛠️ : Développement sur mesure

Je vous conseille de regarder mes projets similaires :
👉 [Voir les projets](/projets)

On peut aussi en discuter de vive voix ?
```

#### Actions suggérées
```
Termine toujours par un lien formaté :
- 👉 [Voir les projets](/projets)
- 👉 [Découvrir les services](/services)
- 👉 [Me contacter](/contact)
```

#### À éviter
```
- Blocs de texte pavés sans saut de ligne
- Parler de prix (on ne parle pas de tarifs ici)
```

---

## 🧠 Agent 2 : Agent Complet (Page `/agent`)

### Modèles disponibles (choix utilisateur)

| Modèle | Description | Icône |
|--------|-------------|-------|
| **Gemini 2.0 Flash** | Gratuit, ultra-rapide, moderne | 🚀 |
| **Claude 3.5 Haiku** | Rapide et efficace | ⚡ |
| **Claude 3.5 Sonnet** | Équilibré et précis | ✨ |
| **GPT-4o** | Puissant et créatif | 🧠 |

**Modèle par défaut** : Claude 3.5 Haiku  
**Température** : 0.7

---

### Contexte fourni (`buildContext()`)

L'agent reçoit **BEAUCOUP PLUS de détails** :

#### 1. Profil complet
```
Je suis Raouf Warnier, Ingénieur Produit Data avec 3+ ans d'expérience.
Conçois des systèmes data end-to-end : pipelines, plateformes, SaaS.
Diplômé ESIEE Paris en Data Science et IA.
Disponible en freelance pour missions data et produit.

Positionnement:
"Je pense en systèmes, pas en fonctionnalités"
- Architecture long terme et scalabilité
- Du pipeline ETL à l'application en production
- Éthique des données et qualité industrielle
```

#### 2. Contact
```
- Email: contact@kenshu.dev
- LinkedIn: @raouf-warnier
- Localisation: France (télétravail/présentiel) + Europe
```

#### 3. Compétences principales (détaillées)

**Data Engineering & Pipelines**
```
- Conception et industrialisation pipelines ETL/ELT
- Migration legacy vers architectures modernes
- Technologies: Spark, Hadoop, Airflow, dbt
- Bases de données: PostgreSQL, MSSQL, MongoDB, MinIO
```

**Plateformes & Produits Data**
```
- Plateformes analytics et dashboards
- APIs data et architecture orientée produit
- Data Warehousing (Bronze/Silver/Gold)
```

**Automatisation & DataOps**
```
- CI/CD: GitLab, GitHub Actions, Jenkins
- Monitoring: Prometheus, Grafana
- Infrastructure as Code: Ansible, Docker
- Scripting: PowerShell, Shell, Python
```

**Outils & Applications**
```
- Applications web intégrant les données
- Stack: Next.js, React, TypeScript, Tailwind
- From prototype to production
```

#### 4. Modes d'intervention
```
- Mission longue durée: Intégration dans vos équipes
- Forfait: Projets à périmètre défini
- Application web/SaaS: Devis sur mesure
```

#### 5. Disponibilité
```
✅ Disponible immédiatement pour missions freelance et consulting long terme
```

#### 6. Expériences récentes (TOUS les projets)

L'agent reçoit **TOUS** les projets de `src/data/projects.ts` avec :
- Type
- Client
- Durée
- Rôle
- Résumé (tldr)
- Stack complète
- Résultats (métriques + qualitatif)

**Exemple** :
```
## Budget AI
- Type: Personal Project
- Client: Personnel
- Durée: 3 mois
- Rôle: Full-stack Developer & Product Owner
- Résumé: Assistant financier intelligent...
- Stack: Next.js, React, TypeScript, OpenRouter, PostgreSQL, Prisma, Tailwind
- Résultats: Prototype fonctionnel, catégorisation 85% précision...
```

#### 7. Actualités (5 dernières)

L'agent reçoit les 5 dernières entrées de `src/data/news.ts` :
```
- 2025-12: Budget AI en beta publique
- 2025-12: Mission BNP Paribas terminée
- 2025-08: Début mission Orange DevOps
- 2024-12: Fin mission Safran
- 2023-09: Début mission ACC
```

---

### Instructions comportementales

#### Style de réponse
```
- Réponds en français, claire et structurée
- Utilise Markdown:
  * Titres ## pour sections
  * Listes à puces - pour énumérer
  * **Gras** pour mots-clés
  * `code` pour technologies
- Limite: 150-200 mots (sauf demande détaillée)
- Direct et concret: évite formules trop polies
```

#### Contenu des réponses

**Pour un besoin data/produit** :
1. Évalue si c'est dans mes compétences
2. Cite une expérience similaire (BNP, Orange, Safran, ACC)
3. Propose une action concrète (RDV, devis, contact)

**Pour tarifs/disponibilité** :
- Donne les infos précises
- Propose de me contacter directement

**Si tu ne sais pas** :
- Dis-le clairement
- Suggère de me contacter

#### Structure recommandée
```
1. Réponse directe (1-2 phrases)
2. Détails pertinents (listes si nécessaire)
3. Action suggérée (question ou CTA)
```

#### Exemples fournis à l'IA

L'agent reçoit **2 exemples complets** de réponses attendues (voir code source).

#### À éviter
```
❌ Pas de réponses hors sujet (politique, médical...)
❌ N'invente pas de projets/compétences
❌ Pas trop verbeux: reste concis et actionnable
```

---

## 🔐 Données sensibles

### ✅ Ce qui EST transmis aux IA

| Donnée | Ask Kenshu | Agent Complet |
|--------|------------|---------------|
| **Email** | ✅ contact@kenshu.dev | ✅ contact@kenshu.dev |
| **LinkedIn** | ❌ | ✅ @raouf-warnier |
| **Projets (résumés)** | ✅ (5 derniers) | ✅ (tous, détaillés) |
| **Compétences** | ✅ (résumé) | ✅ (très détaillées) |
| **Stack tech** | ✅ (mentionné) | ✅ (complète) |
| **Expériences clients** | ✅ (noms) | ✅ (détails complets) |
| **Actualités** | ❌ | ✅ (5 dernières) |

### ❌ Ce qui N'EST PAS transmis

- ❌ **Numéro de téléphone** (supprimé volontairement)
- ❌ **Tarifs précis** (TJM, forfaits)
- ❌ **Informations bancaires**
- ❌ **Données personnelles sensibles**
- ❌ **Clés API / Secrets**

---

## 📈 Tracking & Logging

### Ce qui est enregistré

Les deux agents utilisent la fonction `logInteraction()` de `src/lib/db-utils.ts` :

```typescript
await logInteraction(
  messages[messages.length - 1]?.content || "",  // Question utilisateur
  fullResponse                                    // Réponse de l'IA
);
```

**Stocké dans PostgreSQL** :
- ✅ Question de l'utilisateur
- ✅ Réponse complète de l'IA
- ✅ Timestamp
- ❌ Pas d'IP (non tracké)
- ❌ Pas de données personnelles utilisateur

**Usage** :
- Amélioration des prompts
- Analyse des questions fréquentes
- Debug

---

## 🎯 Différences clés entre les 2 agents

| Aspect | Ask Kenshu (`/`) | Agent Complet (`/agent`) |
|--------|------------------|--------------------------|
| **Objectif** | Navigation rapide | Conversation approfondie |
| **Contexte** | Léger (pages + 5 projets) | Complet (tout le profil) |
| **Détails projets** | Résumé uniquement | Stack + résultats complets |
| **Actualités** | ❌ Non | ✅ Oui (5 dernières) |
| **LinkedIn** | ❌ Non | ✅ Oui |
| **Longueur réponses** | Court, orienté navigation | Détaillé si demandé |
| **Exemples fournis** | 1 exemple format | 2 exemples complets |
| **Modèle** | Gemini 2.0 Flash (fixe) | Choix utilisateur (4 modèles) |

---

## 🔄 Sources de données

Tous les contextes sont construits dynamiquement depuis :

| Fichier | Contenu | Utilisé par |
|---------|---------|-------------|
| `src/data/projects.ts` | Tous les projets (caseStudies) | Les 2 agents |
| `src/data/news.ts` | Actualités (newsFeed) | Agent Complet uniquement |

**⚠️ Important** : Si tu modifies ces fichiers, les prompts changent automatiquement.

---

## 💡 Recommandations

### Pour améliorer la pertinence

1. **Mettre à jour régulièrement** :
   - `src/data/projects.ts` (nouveaux projets)
   - `src/data/news.ts` (actualités)

2. **Affiner les prompts** :
   - Tester différentes formulations
   - Analyser les logs d'interactions
   - Ajuster selon le feedback utilisateur

3. **Contexte minimal** :
   - Ask Kenshu : Garder léger pour navigation rapide
   - Agent Complet : Peut avoir plus de détails

### Pour la confidentialité

- ✅ Ne jamais ajouter de tarifs dans les prompts (déjà fait)
- ✅ Ne jamais ajouter de numéro de téléphone (déjà fait)
- ✅ Vérifier que les projets clients ne contiennent pas d'infos confidentielles

---

## 📝 Changelog

| Date | Agent | Changement |
|------|-------|-----------|
| 2026-01-14 | Ask Kenshu | Upgrade vers Gemini 2.0 Flash |
| 2026-01-14 | Les 2 | Suppression tous tarifs (TJM, forfaits) |
| 2026-01-14 | Les 2 | Suppression numéro téléphone |
| 2026-01-14 | Ask Kenshu | Amélioration prompt (emojis, liens formatés) |
| 2026-01-14 | Agent Complet | Ajout Gemini 2.0 Flash aux choix |

---

**Dernière mise à jour** : 14 janvier 2026, 22h40
