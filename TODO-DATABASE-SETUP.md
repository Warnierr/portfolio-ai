# ✅ Checklist — Configuration Base de Données ISO

## 🎯 Objectif
Avoir PostgreSQL partout (local, preview, prod) pour éviter les bugs.

---

## 📋 Actions Restantes

### **1. Local (Développement)** — 5 minutes

- [ ] **Lancer Docker Desktop**
- [ ] **Démarrer PostgreSQL** :
  ```bash
  cd portfolio-ai
  docker-compose up -d
  ```
- [ ] **Vérifier que ça tourne** :
  ```bash
  docker ps
  # Devrait afficher kenshu-postgres-dev
  ```
- [ ] **Synchroniser le schéma** :
  ```bash
  npm run db:push
  ```
- [ ] **Tester localement** :
  ```bash
  npm run dev
  # Aller sur http://localhost:3000/articles
  ```

---

### **2. Production (Vercel)** — 10 minutes

#### Option A : Vercel Postgres (Recommandé)

- [ ] Aller sur https://vercel.com → Ton projet
- [ ] **Storage** → **Create Database** → **Postgres**
- [ ] Créer la base `kenshu-production`
- [ ] **Settings** → **Environment Variables**
- [ ] Ajouter `DATABASE_URL` avec l'URL de la base
- [ ] Cocher ✅ **Production** uniquement

#### Option B : Supabase (Alternative)

- [ ] Aller sur https://supabase.com
- [ ] Créer un projet `kenshu-prod`
- [ ] **Settings** → **Database** → **Connection string** (URI mode)
- [ ] Copier l'URL
- [ ] Sur Vercel : **Settings** → **Environment Variables**
- [ ] Ajouter `DATABASE_URL` avec l'URL Supabase
- [ ] Cocher ✅ **Production** uniquement

#### Migration du schéma en production

- [ ] **Option 1** : Via Vercel CLI
  ```bash
  npm i -g vercel
  vercel login
  vercel link
  vercel env pull .env.production
  npx prisma db push
  ```

- [ ] **Option 2** : Via le build Vercel (automatique)
  - Le script `postinstall` dans `package.json` génère déjà Prisma Client
  - Ajouter dans `vercel.json` ou via les settings Vercel :
    ```json
    {
      "buildCommand": "prisma generate && prisma db push && next build"
    }
    ```

---

### **3. Preview (Vercel Preview Branches)** — 5 minutes

- [ ] Créer une **2ème base de données** :
  - Vercel Postgres : `kenshu-preview`
  - OU Supabase : Nouveau projet `kenshu-preview`
- [ ] Sur Vercel : **Settings** → **Environment Variables**
- [ ] Ajouter `DATABASE_URL` avec l'URL de la base preview
- [ ] Cocher ✅ **Preview** uniquement

---

### **4. Tests Finaux** — 5 minutes

#### Local
- [ ] `npm run dev` → http://localhost:3000/articles (pas d'erreur)
- [ ] `npm run db:studio` → Vérifier les tables

#### Production
- [ ] https://kenshu.dev/articles (charge sans erreur)
- [ ] https://kenshu.dev/admin/articles (peut créer un article)
- [ ] https://kenshu.dev/sitemap.xml (contient `/articles`)

---

## 🎯 Résumé Rapide

**Ce qui est déjà fait :**
- ✅ Schema Prisma configuré avec PostgreSQL
- ✅ Docker Compose configuré
- ✅ Scripts npm (`db:push`, `db:studio`) configurés
- ✅ Code du blog système implémenté

**Ce qui reste à faire :**
1. **Lancer Docker local** (2 min)
2. **Créer les bases Vercel/Supabase** (5 min)
3. **Configurer les variables d'environnement Vercel** (3 min)
4. **Migrer le schéma en production** (2 min)
5. **Tester** (3 min)

**Total estimé : ~15 minutes** ⏱️

---

## 🚀 Commande Rapide pour Démarrer

```bash
# 1. Local
docker-compose up -d
npm run db:push
npm run dev

# 2. Production (après config Vercel)
vercel env pull .env.production
npx prisma db push
```

---

## 📚 Documentation Complète

Voir `docs/SETUP-DATABASE-ISO.md` pour les détails complets.
