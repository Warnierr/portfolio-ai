## Architecture & stack technique

### Périmètre actuel (v1 Freelance)
- Framework : Next.js 16 (App Router) en mode static/SSR mixte.
- UI : Tailwind CSS v4 (préconfig), Framer Motion pour les transitions.
- Langage : TypeScript.
- Pages V1 actives : `/`, `/projets`, `/projets/[slug]`, `/methode`, `/news`, `/agent`, `/contact`.
- Pages V2 (préparées mais hors nav) : `/ecosystemes`, `/lab`, `/stack`.
- Données statiques : `src/data/projects.ts` (format `CaseStudy`), `src/data/news.ts` (flux news).

### Positionnement V1
- Cible : TPE/PME (cabinets comptables, avocats, agences immobilières/marketing)
- Proposition de valeur : intégration IA dans le quotidien métier
- Ton : sobre, direct, orienté résultats mesurables

### Structure des répertoires
- `src/app/*` : pages App Router (une route = un dossier avec `page.tsx`).
- `src/components/*` : composants réutilisables (LandingPage, PageContainer, transitions).
- `src/data/*` : données statiques (projets au format CaseStudy).
- `docs/*` : documentation produit/tech.
- `public/*` : assets statiques (icônes, svg).

### Format des études de cas (CaseStudy)
Chaque projet suit une structure narrative :
1. TL;DR (résumé exécutif)
2. Contexte (client, durée, rôle)
3. Problème concret (situation + enjeux)
4. Contraintes réelles
5. Décisions techniques (choix + justification + tradeoff)
6. Ce qui a été livré
7. Résultats (métriques + qualitatif)
8. Rétrospective (ce que je referais différemment)

### Navigation V1
- Header : Logo | Projets | Méthode | News | Agent | Contact | [CTA Discuter]
- Footer : Projets | Méthode | News | Agent | Contact | Copyright

### Stack front
- Next.js 16, React 19.
- Tailwind CSS v4, classes utilitaires dans `src/app/globals.css`.
- Animations : Framer Motion (sections, fade-in).
- Patterns : pages statiques, composants partagés (`PageContainer`).

### Évolution prévue
- V2 Produit : ajout `/ecosystemes`, `/lab`, `/stack` dans la navigation
- V3 Pédagogie : ajout `/writing` (articles techniques)
- V4 Architecture : études d'architecture complètes

### Commandes utiles
- `npm run dev` : serveur local.
- `npm run build` : build de production.
- `npm run start` : serveur prod local.
- `npm run lint` : lint Next/ESLint.

### Routes actuelles
| Route | Statut V1 | Description |
|-------|-----------|-------------|
| `/` | ✓ Actif | Hero + projets + process + CTA |
| `/projets` | ✓ Actif | Liste des études de cas |
| `/projets/[slug]` | ✓ Actif | Détail d'une étude de cas |
| `/methode` | ✓ Actif | Process de travail, tarifs, FAQ |
| `/contact` | ✓ Actif | Prise de contact, calendrier |
| `/news` | ✓ Actif | Flux d'actualités généré par agent IA |
| `/agent` | ✓ Actif | Chat RAG contextualisé (en construction) |
| `/ecosystemes` | Préparé | Méthodo complète (V2) |
| `/lab` | Préparé | Expérimentations (V2) |
| `/stack` | Préparé | Radar skills (V2) |
