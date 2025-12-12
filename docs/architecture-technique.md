## Architecture & stack technique

### Périmètre actuel (v0)
- Framework : Next.js 16 (App Router) en mode static/SSR mixte.
- UI : Tailwind CSS v4 (préconfig), Framer Motion pour les transitions.
- Langage : TypeScript.
- Pages livrées : `/`, `/ecosystemes`, `/projets`, `/projets/[slug]`, `/lab`, `/stack`, `/news`, `/contact`, `/agent`.
- Données statiques : `src/data/{projects,news,highlights}.ts`.

### Structure des répertoires
- `src/app/*` : pages App Router (une route = un dossier avec `page.tsx`).
- `src/components/*` : composants réutilisables (Landing, PageContainer, transitions, NewsFeed, titres).
- `src/data/*` : seeds statiques (projets, news, highlights).
- `docs/*` : documentation produit/tech (blueprint, ce document).
- `public/*` : assets statiques (icônes, svg).

### Stack front
- Next.js 16, React 19.
- Tailwind CSS v4 (config minimaliste), classes utilitaires dans `src/app/globals.css`.
- Animations : Framer Motion (sections, transitions futures).
- Patterns : pages multipages (navigation simple), composants partagés (`PageContainer`, `SectionTitle`, `PageTransition` prêt pour AnimatePresence).

### Stack back (prévu / à brancher)
- API Routes Next.js pour :
  - Flux news dynamique (GET/POST sur un store markdown/JSON).
  - Endpoint agent (`/api/agent`) pour chat/RAG.
- Base de données suggérée : Supabase/PostgreSQL (+ `pgvector` si RAG).
- Orchestration agents : Temporal / cron workers (optionnel) pour ingestions planifiées.
- Auth simple : Clerk/Auth.js possible, non implémenté.

### Infra & déploiement (recommandé)
- Hébergement : Vercel pour le front ou VPS Docker (Node 20+).
- CI/CD : GitHub Actions (`lint`, `build`, `test`) à ajouter.
- Observabilité : Vercel Analytics ou Logtail/OpenTelemetry (à prévoir).
- Sécurité : variables via `.env.local` (non commité), rotation des clés LLM.

### Données & RAG (roadmap)
- Ingestion : notes Obsidian, commits GitHub, fichiers docs → stockage Postgres + embeddings `pgvector`.
- Index : table embeddings avec métadonnées (source, date, type).
- Chat agent : retrieval + synthèse, logging des prompts/réponses pour audit.
- News Agent : job cron pour générer `newsFeed` depuis sources réelles.

### Routes & intentions
- `/` : hero + portes d’entrée.
- `/ecosystemes` : offre/méthodo, process en 3 étapes.
- `/projets` + `/projets/[slug]` : cas d’usage détaillés (problem/solution/archi/stack/impact).
- `/lab` : expérimentations, badges statut.
- `/stack` : radar skills + infra perso.
- `/news` : flux agent, filtres (avancement/veille/réflexion).
- `/contact` : CTA collaboration, mode recruteur.
- `/agent` : console chat (placeholder), futur RAG.

### Commandes utiles
- `npm run dev` : serveur local.
- `npm run build` : build de production.
- `npm run start` : serveur prod local.
- `npm run lint` : lint Next/ESLint.

### À faire en priorité
- Ajouter CI GitHub Actions (lint + build).
- Brancher données dynamiques (news) via API route + store JSON/DB.
- Esquisser `/api/agent` avec stub RAG et UI chat minimale.
- Ajouter diagrammes simples (sequence/infra) dans `docs/` si besoin.

