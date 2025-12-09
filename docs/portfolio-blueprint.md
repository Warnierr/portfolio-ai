## Vision du Portfolio IA

### Positionnement
- Architecte d'écosystèmes IA, profil hybride (Data, Infra, Produit).
- Constructeur de systèmes intelligents (Nomah AI, Anomalie 2084, Second Brain).
- Mantra : *« Je construis des écosystèmes IA, pas des applications isolées. »*

### Slogans & Accroches
- Baseline principale : **IA, Data, Automation & System Design — de l'infrastructure à l'imaginaire.**
- Pitch express : *Architecte d'écosystèmes IA • Dev polyvalent • Créateur de systèmes vivants.*
- Promesse CTA : *« Parler à l'agent »* pour montrer la couche IA intégrée.

### Structure des pages
1. **Accueil / Impact immédiat**  
   Hero immersif, fond dynamique, CTA (`Voir mes systèmes`, `Mon stack`, `Parler à l'agent`).  
2. **À propos**  
   Storyline/timeline (Dév → Data → DevOps → IA → Architecte) + principes : ce que je construis / comment / ce que je refuse.  
3. **Stack radar**  
   Quatre quadrants (IA & Data, Infra & DevOps, Web & Produit, Systèmes internes) avec niveau réel + cas concret + lien projet.  
4. **Projets (mini cas d'étude)**  
   Pour chaque projet : Problème → Solution → Architecture → Stack → Ce que ça prouve.  
5. **Laboratoire / R&D**  
   Expériences, tests d'agents, scripts internes avec badge de statut.  
6. **News automatisées**  
   Flux alimenté par agent (notes Obsidian / GitHub / veille).  
7. **Contact & collaborations**  
   Coordonnées + ouverture : IA, data, automatisation, design de systèmes.  
8. **Mode recruteur**  
   Drawer express (résumé, 3 projets phares, stack, contact).

### Automatisations IA envisagées
| Agent | Entrées | Sortie | Fréquence |
| --- | --- | --- | --- |
| **News Agent** | Notes Obsidian + commits Git | Posts courts (résumé, tags, lien) | Quotidienne |
| **Project Intel Agent** | README GitHub + schémas | Fiche projet + architecture | À chaque release |
| **On-Site Guide** | Base RAG (docs, news, projets) | Chat contextuel avec visiteurs | Temps réel |

### Stack technique recommandée
- **Frontend** : Next.js 14 (App Router), Tailwind, Framer Motion, Radix UI (composants).  
- **Backend** : Routes API Next, Prisma, PostgreSQL (Supabase).  
- **Infra** : VPS + CI/CD GitHub Actions + sauvegardes NAS/Proxmox.  
- **IA** : OpenRouter (LLM), stockage vecteurs (pgvector ou Pinecone), orchestrateur cron.

### Étapes de delivery
1. Créer socle visuel (hero, grille de sections, thème sombre vivant).  
2. Rédiger contenus `À propos`, fiches projets, laboratoire.  
3. Brancher flux dynamique (news agent) + base de données.  
4. Ajouter chat RAG + Mode recruteur interactif.  
5. Automatiser pipeline (agents + déploiement).

### Inspirations design
- hero type Linear / Anthropic (fond sombre + typographie large).  
- Radar skills inspiré d'Apple Design Systems.  
- Mini cas d'étude façon Buildwithframer.  
- News style newsroom OpenAI mais condensé.

## Architecture multipage (vite)

| Route | Objectif | Blocs principaux | Micro-scroll autorisé |
| --- | --- | --- | --- |
| `/` | Impact & sélection parcours | Hero, carrousel “entrées” (Écosystèmes, Projets, Lab, News), CTA agent | Oui pour highlight cards |
| `/ecosystemes` | Présenter offres / méthodo | Manifesto, piliers (Vision/Architecture/Automation), Processus en 3 étapes, preuves sociales | Oui (timeline process) |
| `/projets` | Cas d’usage détaillés | Cartes filtrables + page détail `/projets/[slug]` (problème→stack→architecture) | Non, layout grille + modals |
| `/lab` | Expérimentations & R&D | Feed d’essais, statut badges, liens Git/scripts, future roadmap | Oui sur section “roadmap” |
| `/stack` | Radar & infrastructure | Radar interactif, stack hardware/software, diagrammes infra | Non (onglets) |
| `/news` | Flux agent autonome | Fil chronologique, filtres (Avancement/Veille/Réflexions), CTA “Subscribe RSS/Agent” | Oui scroll listing |
| `/contact` | Collaboration & mode recruteur | Formulaire, calendrier, snapshot recruteur, FAQ process | Non (sections verticales courtes) |
| `/agent` | Interface chat IA | Explication RAG, console chat, disclaimers | Non |

### Navigation & UX
- Barre fixe minimaliste (logo + “Écosystèmes / Projets / Lab / Stack / News / Contact / Agent”).  
- Bouton “Parler à l’agent” présent en header + footer.  
- Chaque page débute par un “strapline” rappelant la promesse globale (sobriété sombre, glassmorphism léger).  
- Les scrolls sont courts : 2–3 panneaux maxi, priorité aux pages dédiées plutôt qu’un one-page infini.  
- Prévoir `layout.tsx` avec transitions légères (Framer Motion `AnimatePresence`) pour conserver fluidité malgré navigation multipage.

---
Document à garder comme boussole stratégique pendant le dev.

