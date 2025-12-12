## Déploiement sur Vercel (v1)

Objectif : mettre la v1 en ligne pour tests, avec un chemin clair pour brancher ensuite Supabase et l’agent/RAG.

### 1) Pré-requis
- Repo GitHub prêt (branche `main` ou `master`).
- Node 20+ en local (pour tester `npm run build`).
- Compte Vercel (gratuit ok pour la v1).

### 2) Paramètres Vercel
- Framework : **Next.js**
- Build command : `npm run build`
- Install command : `npm ci`
- Output : auto (Next 16 App Router)
- Node version : 20
- Environment variables : voir section 3

### 3) Variables d’environnement (à créer dans Vercel > Project Settings > Environment Variables)
| Nom | Description | Exemple |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (pour metadata/canoniques) | `https://portfolio-ai.vercel.app` |
| `OPENROUTER_API_KEY` | (Optionnel) Clé LLM pour l’agent | `sk-...` |
| `SUPABASE_URL` | (Optionnel) URL projet Supabase si RAG/stockage news | `https://xxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | (Optionnel) Clé anon Supabase pour les requêtes côté client | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | (Optionnel) Clé service pour ingestion/cron (server-side uniquement) | `eyJ...` |

Astuce : en local, crée un fichier `.env.local` (non versionné) et ajoute ces variables.

### 4) Étapes de déploiement
1. **Connecter le repo** : Vercel > Add New Project > Import GitHub > sélectionner le repo.
2. **Vérifier la détection** : Vercel doit reconnaître Next.js. Ajuster build/install si besoin (`npm ci`, `npm run build`).
3. **Ajouter les variables** (section 3) avant le premier build si possible.
4. **Déployer** : lancer le premier déploiement. La preview doit être accessible en `<projet>.vercel.app`.
5. **Domaine custom** (option) : Project Settings > Domains > ajouter `ton-domaine.com`, laisser Vercel gérer le DNS/SSL.

### 5) Tests post-déploiement
- Ouvrir la preview, vérifier les pages principales : `/`, `/projets`, `/stack`, `/news`, `/contact`.
- Vérifier `/news` (API route `/api/news` doit renvoyer le flux statique).
- Surveiller les logs Vercel (section Logs) pour détecter d’éventuelles erreurs SSR.

### 6) Préparer la suite (RAG/agent)
- Base de données : créer un projet **Supabase Starter** et activer `pgvector`. Ajouter les variables `SUPABASE_URL` et `SUPABASE_ANON_KEY`.
- LLM : ajouter `OPENROUTER_API_KEY` dans Vercel et `.env.local`.
- Cron/ingestion : commencer avec GitHub Actions `schedule` ou Upstash QStash pour peupler les embeddings plus tard.

### 7) Rollback / Preview
- Chaque PR déclenche une **Preview URL**. Valider le rendu avant de merge.
- En cas de souci sur `main`, utiliser “Redeploy” d’un build précédent ou revert Git.

Notes :
- Le plan Vercel Hobby est suffisant pour la v1 de démo. Si mémoire ou temps de build deviennent limites, passer en Pro. 
- Pas besoin de config `vercel.json` spécifique tant que les routes API restent simples.

