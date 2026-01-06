# 🗄️ Configuration Base de Données — ISO Local/Prod

## 🎯 Objectif

Avoir **PostgreSQL partout** (local, preview, prod) pour éviter les bugs liés aux différences SQLite/PostgreSQL.

---

## ✅ Configuration Recommandée

### **Local (Développement)**
- **Docker Compose** avec PostgreSQL 16
- URL : `postgresql://kenshu:kenshu_dev_password@localhost:5432/kenshu_dev`

### **Preview (Vercel Preview Branches)**
- **Vercel Postgres** ou **Supabase** (gratuit)
- URL configurée dans Vercel Environment Variables → Preview

### **Production (kenshu.dev)**
- **Vercel Postgres** ou **Supabase** (gratuit)
- URL configurée dans Vercel Environment Variables → Production

---

## 📋 Étapes à Suivre

### **Étape 1 : Configurer Docker Local** ✅ (Déjà fait)

Le fichier `docker-compose.yml` est déjà configuré.

**Actions :**
1. **Lancer Docker Desktop**
2. **Démarrer PostgreSQL** :
   ```bash
   cd portfolio-ai
   docker-compose up -d
   ```
3. **Vérifier que PostgreSQL tourne** :
   ```bash
   docker ps
   ```
   Tu devrais voir `kenshu-postgres-dev` en cours d'exécution.

4. **Synchroniser le schéma Prisma** :
   ```bash
   npm run db:push
   ```

5. **Migrer les articles existants** (optionnel) :
   ```bash
   node prisma/migrate-blog.js
   ```

---

### **Étape 2 : Configurer Vercel Postgres** (À faire)

**Option A : Vercel Postgres** (Recommandé — intégré Vercel)

1. Aller sur https://vercel.com → Ton projet `portfolio-ai`
2. Onglet **"Storage"** → **"Create Database"** → **"Postgres"**
3. Créer **2 bases de données** :
   - `kenshu-production` (pour main branch)
   - `kenshu-preview` (pour feature branches)
4. **Copier les URLs de connexion** (automatiquement ajoutées aux env vars)

**Option B : Supabase** (Gratuit, 500 Mo chacune)

1. Aller sur https://supabase.com
2. Créer **2 projets** :
   - `kenshu-prod`
   - `kenshu-preview`
3. Pour chaque projet :
   - Settings → Database → Connection string
   - Mode : **URI**
   - Copier l'URL (format : `postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres`)

---

### **Étape 3 : Configurer les Variables d'Environnement Vercel** (À faire)

**Important** : Configurer séparément pour Production et Preview !

1. Vercel Dashboard → Ton projet → **Settings** → **Environment Variables**

#### Pour Production :
- Name: `DATABASE_URL`
- Value: URL de la base **production** (Vercel Postgres ou Supabase prod)
- Cocher : ✅ **Production** uniquement

#### Pour Preview :
- Name: `DATABASE_URL`
- Value: URL de la base **preview** (Vercel Postgres ou Supabase preview)
- Cocher : ✅ **Preview** uniquement

#### Pour Development (optionnel) :
- Name: `DATABASE_URL`
- Value: `postgresql://kenshu:kenshu_dev_password@localhost:5432/kenshu_dev`
- Cocher : ✅ **Development** uniquement

⚠️ **Ne pas cocher "Development"** si tu utilises Docker local (conflit).

---

### **Étape 4 : Migrer le Schéma en Production** (À faire après déploiement)

Une fois Vercel déployé avec les bonnes variables :

1. **Via Vercel CLI** (recommandé) :
   ```bash
   # Installer Vercel CLI si nécessaire
   npm i -g vercel

   # Se connecter
   vercel login

   # Lier le projet
   vercel link

   # Pull les variables d'environnement
   vercel env pull .env.production

   # Migrer le schéma
   npx prisma db push --schema=./prisma/schema.prisma
   ```

2. **Ou via un script de migration** (ajouté dans `package.json`) :
   ```json
   "scripts": {
     "db:migrate:prod": "prisma db push --schema=./prisma/schema.prisma"
   }
   ```

---

### **Étape 5 : Vérifier que Tout Fonctionne** (À faire)

#### En Local :
```bash
# 1. Démarrer Docker
docker-compose up -d

# 2. Vérifier la connexion
npm run db:studio
# Devrait ouvrir Prisma Studio sur http://localhost:5555

# 3. Tester l'API
npm run dev
# Aller sur http://localhost:3000/articles
# Devrait afficher les articles (même si vide)
```

#### En Production :
1. Aller sur https://kenshu.dev/articles
2. Vérifier que la page charge sans erreur
3. Tester l'admin : https://kenshu.dev/admin/articles
4. Créer un article de test
5. Vérifier le sitemap : https://kenshu.dev/sitemap.xml

---

## 🔍 Vérification de l'ISO

Pour vérifier que tout est iso :

| Environnement | Base de Données | Provider | URL |
|--------------|----------------|----------|-----|
| **Local** | Docker PostgreSQL 16 | `postgresql` | `localhost:5432` |
| **Preview** | Vercel Postgres / Supabase | `postgresql` | Vercel env var |
| **Production** | Vercel Postgres / Supabase | `postgresql` | Vercel env var |

✅ **Tous utilisent PostgreSQL** → Pas de différence de comportement !

---

## 🐛 Troubleshooting

### **Erreur : "Can't reach database server"**

**En local :**
- Vérifier que Docker Desktop est lancé
- Vérifier que le conteneur tourne : `docker ps`
- Vérifier le `.env` : `DATABASE_URL="postgresql://kenshu:kenshu_dev_password@localhost:5432/kenshu_dev"`

**En production :**
- Vérifier que la variable `DATABASE_URL` est bien configurée sur Vercel
- Vérifier que l'URL contient `?sslmode=require` pour PostgreSQL cloud

### **Erreur : "Table doesn't exist"**

- Exécuter `npm run db:push` avec la bonne `DATABASE_URL`
- Vérifier que le schéma Prisma est synchronisé

### **Erreur : "Invalid `prisma.article.findMany()` invocation"**

- Regénérer Prisma Client : `npx prisma generate`
- Redémarrer le serveur Next.js

---

## 📝 Checklist Finale

- [ ] Docker Desktop installé et lancé
- [ ] PostgreSQL local démarré (`docker-compose up -d`)
- [ ] Schéma Prisma synchronisé local (`npm run db:push`)
- [ ] Base de données Vercel/Supabase créée (production)
- [ ] Base de données Vercel/Supabase créée (preview)
- [ ] Variable `DATABASE_URL` configurée sur Vercel (Production)
- [ ] Variable `DATABASE_URL` configurée sur Vercel (Preview)
- [ ] Schéma migré en production (`npx prisma db push`)
- [ ] Test local réussi (`npm run dev` → `/articles`)
- [ ] Test production réussi (`https://kenshu.dev/articles`)

---

## 🎯 Recommandation Finale

**Pour être 100% iso, je recommande :**

1. **Docker local** (déjà configuré) ✅
2. **Vercel Postgres** pour preview + prod (plus simple, intégré)
   - OU **Supabase** si tu préfères (gratuit aussi)

**Pourquoi Vercel Postgres ?**
- Intégré directement dans Vercel
- Pas besoin de compte externe
- Variables d'environnement automatiques
- Scaling facile

**Pourquoi Supabase ?**
- Interface admin très complète
- Outils de monitoring intégrés
- Gratuit jusqu'à 500 Mo
- Peut servir pour d'autres projets

👉 **Les deux fonctionnent parfaitement !** Choisis selon tes préférences.
