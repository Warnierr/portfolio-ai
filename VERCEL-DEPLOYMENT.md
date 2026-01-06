# 🚀 Guide de Déploiement Vercel

## ✅ Résolution du bug en local

Le problème était l'absence de la variable d'environnement `DATABASE_URL`. 

**Solution appliquée :**
- Création du fichier `.env` avec `DATABASE_URL="file:./prisma/dev.db"`
- Configuration du schema Prisma avec SQLite pour le développement local
- Synchronisation de la base de données avec `npx prisma db push`

## 📋 Configuration Vercel

### 1. Base de données PostgreSQL

Sur Vercel, vous devez utiliser PostgreSQL au lieu de SQLite. Options recommandées :

**Option A : Vercel Postgres (Recommandé)**
1. Aller sur votre projet Vercel
2. Onglet "Storage" → "Create Database" → "Postgres"
3. Créer la base de données
4. Copier l'URL de connexion (elle sera automatiquement ajoutée aux variables d'environnement)

**Option B : Supabase (Gratuit)**
1. Créer un compte sur [supabase.com](https://supabase.com)
2. Créer un nouveau projet
3. Aller dans Settings → Database
4. Copier la "Connection String" (URI mode)

**Option C : Neon (Gratuit)**
1. Créer un compte sur [neon.tech](https://neon.tech)
2. Créer un nouveau projet
3. Copier la connection string

### 2. Variables d'environnement Vercel

Aller dans votre projet Vercel → Settings → Environment Variables

Ajouter :
```
DATABASE_URL=postgresql://user:password@host:5432/database?sslmode=require
```

⚠️ **Important :** Cocher "Production", "Preview" et "Development"

### 3. Déploiement

#### Méthode 1 : Via Git (Recommandé)

```bash
git add .
git commit -m "fix: configure DATABASE_URL for Prisma"
git push origin main
```

Vercel déploiera automatiquement.

#### Méthode 2 : CLI Vercel

```bash
# Installer Vercel CLI si nécessaire
npm i -g vercel

# Déployer
vercel --prod
```

### 4. Migration de la base de données

Une fois déployé, vous devez migrer votre schéma Prisma :

**Option A : Via un script de migration**

Ajouter dans `package.json` :
```json
"scripts": {
  "postinstall": "prisma generate",
  "vercel-build": "prisma generate && prisma db push --accept-data-loss && next build"
}
```

**Option B : Manuellement**

```bash
# Avec DATABASE_URL de production
npx prisma db push
```

### 5. Vérification

Après le déploiement :
1. Aller sur `https://votre-domaine.vercel.app/early-access`
2. Tester le formulaire waitlist
3. Vérifier les logs Vercel pour s'assurer qu'il n'y a pas d'erreur

## 🔄 Dual Environment Setup

Pour gérer SQLite en local et PostgreSQL en production :

**Fichier `.env` (local - non commité)**
```
DATABASE_URL="file:./prisma/dev.db"
```

**Vercel Environment Variables (production)**
```
DATABASE_URL="postgresql://..."
```

Le schema Prisma avec `provider = "postgresql"` fonctionne avec les deux.

## 📝 Checklist de déploiement

- [x] Fichier `.env` créé localement
- [x] Schema Prisma configuré
- [x] Base de données locale testée et fonctionnelle
- [ ] Base de données PostgreSQL créée (Vercel/Supabase/Neon)
- [ ] Variable `DATABASE_URL` ajoutée sur Vercel
- [ ] Code poussé sur Git
- [ ] Migration de la base de données en production
- [ ] Test du formulaire en production

## 🐛 Troubleshooting

**Erreur : "Environment variable not found: DATABASE_URL"**
→ Vérifier que la variable est bien définie dans Vercel Settings

**Erreur : "Can't reach database server"**
→ Vérifier que l'URL contient `?sslmode=require` pour PostgreSQL

**Erreur : "Table doesn't exist"**
→ Exécuter `prisma db push` avec l'URL de production

## 📚 Ressources

- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Prisma + Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Supabase PostgreSQL](https://supabase.com/docs/guides/database)
