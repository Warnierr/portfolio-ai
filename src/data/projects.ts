/**
 * Études de cas — Format V1 Freelance
 * Cible : TPE/PME (cabinets comptables, avocats, agences marketing/immobilières)
 */

export type CaseStudy = {
  slug: string;
  title: string;
  type: "mission" | "produit" | "experimentation";

  // Résumé exécutif (2-3 lignes max, visible en haut)
  tldr: string;

  // Contexte de la mission
  context: {
    client: string; // "Cabinet comptable" ou "Projet personnel"
    duration: string; // "3 mois" ou "En cours"
    role: string; // "Développeur principal + architecture"
    year: number;
  };

  // Problème concret
  problem: {
    situation: string; // État initial du client
    stakes: string; // Ce qui était en jeu (temps, argent, qualité)
  };

  // Contraintes réelles rencontrées
  constraints: string[];

  // Choix techniques avec justification
  decisions: {
    choice: string;
    why: string;
    tradeoff?: string; // Ce qu'on a sacrifié pour ce choix
  }[];

  // Ce qui a été livré (factuel)
  delivered: string[];

  // Résultats obtenus
  results: {
    metrics?: string[]; // Chiffres concrets si disponibles
    qualitative: string; // Toujours présent
  };

  // Ce que je referais différemment
  retrospective: string[];

  // Stack technique
  stack: string[];

  // Liens externes
  links?: { label: string; href: string }[];

  // Pour les projets type "experimentation"
  status?: "en_cours" | "prototype" | "archive";
};

// Ancienne structure (compatibilité temporaire)
export type Project = {
  name: string;
  slug: string;
  problem: string;
  solution: string;
  architecture: string;
  stack: string[];
  proof: string;
  impact: string;
  lessons: string[];
  links?: { label: string; href: string }[];
  decisions?: string[];
  risks?: string[];
  exploreNext?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "budget-ai",
    title: "Budget AI — Gestion financière avec assistant IA",
    type: "produit",
    tldr:
      "App de gestion budgétaire avec assistant IA. Anonymisation côté client avant envoi vers l'API.",
    context: {
      client: "Projet personnel (utilisé au quotidien)",
      duration: "2 mois de développement, maintenance continue",
      role: "Conception, développement, déploiement",
      year: 2024,
    },
    problem: {
      situation:
        "Les outils de budget existants sont soit basiques (tableurs), soit complexes (Bankin, YNAB), soit demandent de connecter ses comptes bancaires — ce que beaucoup refusent pour des raisons de confidentialité.",
      stakes:
        "Avoir une vision claire de ses finances sans sacrifier la vie privée, et obtenir des conseils personnalisés sans exposer ses données bancaires à un tiers.",
    },
    constraints: [
      "Confidentialité absolue : aucune donnée bancaire en clair vers l'API IA",
      "Budget infrastructure minimal (hébergement gratuit Vercel + Neon)",
      "Interface utilisable sur mobile sans friction",
      "Temps de réponse IA acceptable (<5 secondes)",
    ],
    decisions: [
      {
        choice: "Anonymisation côté client avant appel IA",
        why: "Les montants et libellés sont transformés en catégories génériques avant envoi. L'IA reçoit 'dépense alimentaire 150€' et non 'Carrefour Market 147,32€'.",
        tradeoff:
          "Conseils moins précis sur les commerces spécifiques, mais confidentialité garantie.",
      },
      {
        choice: "Next.js 14 avec Server Components",
        why: "Rendu serveur pour les pages statiques, hydratation minimale côté client. Résultat : bundle JS divisé par 3 par rapport à une SPA classique.",
      },
      {
        choice: "OpenRouter plutôt qu'API OpenAI directe",
        why: "Accès à plusieurs modèles (GPT-4, Claude, Llama) via une seule clé. Permet de basculer sur un modèle moins cher si les coûts explosent.",
      },
      {
        choice: "Neon (PostgreSQL serverless) plutôt que Supabase",
        why: "Besoin uniquement de la base de données, pas de l'écosystème complet. Neon offre un tier gratuit généreux et une latence faible.",
      },
    ],
    delivered: [
      "Dashboard avec graphiques interactifs (dépenses par catégorie, évolution mensuelle)",
      "Suivi multi-comptes (compte courant, épargne, espèces)",
      "Assistant IA contextuel avec historique de conversation",
      "Projections financières sur 3/6/12 mois",
      "Export des données en JSON",
    ],
    results: {
      metrics: [
        "Utilisé quotidiennement depuis 6 mois",
        "Temps de réponse IA moyen : 2,3 secondes",
        "Coût d'infrastructure : 0€/mois (tiers gratuits)",
      ],
      qualitative:
        "Première fois que je tiens un budget plus de 2 mois. L'IA aide à identifier les postes de dépense oubliés (abonnements dormants notamment).",
    },
    retrospective: [
      "Aurais dû implémenter l'import CSV dès le départ — la saisie manuelle reste un frein",
      "Le modèle de données 'catégories' est trop rigide, un système de tags serait plus flexible",
      "Manque de tests automatisés sur la couche d'anonymisation — critique pourtant",
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL (Neon)",
      "OpenRouter",
      "Recharts",
      "Vercel",
    ],
    links: [
      {
        label: "Voir l'application",
        href: "https://portfolio-ai-gcs9.vercel.app",
      },
      {
        label: "Code source",
        href: "https://github.com/Warnierr/budget-ai",
      },
    ],
  },
  {
    slug: "automatisation-cabinet",
    title: "Automatisation documentaire — Cabinet comptable",
    type: "mission",
    tldr:
      "Système OCR + classification automatique des pièces comptables. Temps de saisie réduit de 60%.",
    context: {
      client: "Cabinet d'expertise comptable (12 collaborateurs, 400 dossiers clients)",
      duration: "4 mois",
      role: "Audit, conception, développement, formation équipe",
      year: 2024,
    },
    problem: {
      situation:
        "Les collaborateurs passaient 2-3 heures par jour à trier, renommer et classer les pièces comptables reçues par email ou scan. Processus 100% manuel, source d'erreurs et de retards.",
      stakes:
        "Libérer du temps pour le conseil client (activité à plus forte valeur) et réduire les erreurs de classement qui causaient des relances inutiles.",
    },
    constraints: [
      "Pas de changement de logiciel comptable (éditeur imposé)",
      "Données sensibles : aucun envoi vers des API cloud non européennes",
      "Collaborateurs non techniques — formation minimale requise",
      "Budget limité : pas de licence logicielle récurrente coûteuse",
    ],
    decisions: [
      {
        choice: "OCR local (Tesseract) + classification par règles avant IA",
        why: "90% des documents suivent des patterns récurrents (factures fournisseurs habituels). L'IA n'intervient que sur les 10% ambigus — divise les coûts par 10.",
        tradeoff: "Maintenance des règles métier nécessaire quand nouveaux fournisseurs.",
      },
      {
        choice: "Pipeline sur serveur local (NAS Synology du cabinet)",
        why: "Zéro donnée qui sort du cabinet. Le NAS existant suffisait, pas d'investissement matériel.",
      },
      {
        choice: "Interface web minimaliste plutôt qu'application desktop",
        why: "Accessible depuis n'importe quel poste, pas d'installation. Formation en 30 minutes.",
      },
    ],
    delivered: [
      "Dossier email surveillé : dépôt = traitement automatique",
      "Extraction automatique : date, montant, fournisseur, type de pièce",
      "Renommage normalisé selon convention cabinet",
      "Classement dans arborescence client",
      "Interface de validation pour les cas ambigus (< 10% des documents)",
      "Tableau de bord de suivi quotidien",
    ],
    results: {
      metrics: [
        "Temps de traitement réduit de 2h30 à 45min par jour",
        "Taux de classement correct automatique : 91%",
        "ROI atteint en 3 mois",
      ],
      qualitative:
        "Les collaborateurs ont pu reprendre des missions de conseil abandonnées faute de temps. Le cabinet a pris 15 nouveaux dossiers sans recrutement.",
    },
    retrospective: [
      "Aurais dû prévoir un mode 'apprentissage' où les corrections manuelles améliorent les règles automatiquement",
      "La documentation utilisateur était trop technique — refaite en format vidéo courte après retours",
      "Sous-estimé le temps de paramétrage initial (patterns fournisseurs spécifiques au cabinet)",
    ],
    stack: [
      "Python",
      "Tesseract OCR",
      "FastAPI",
      "SQLite",
      "Synology NAS",
      "Tailwind CSS",
    ],
  },
  {
    slug: "assistant-prospection-immobilier",
    title: "Assistant IA de prospection — Agence immobilière",
    type: "mission",
    tldr:
      "Chatbot RAG sur le portefeuille de biens. Génère des fiches PDF personnalisées en 10 secondes.",
    context: {
      client: "Agence immobilière indépendante (8 négociateurs, 200 biens en portefeuille)",
      duration: "6 semaines",
      role: "Conception, développement, intégration CRM",
      year: 2024,
    },
    problem: {
      situation:
        "Les négociateurs perdaient du temps à chercher les biens correspondant aux critères clients dans un CRM mal organisé. Les fiches PDF étaient créées manuellement, avec des erreurs fréquentes.",
      stakes:
        "Réactivité face au client (le premier qui rappelle avec le bon bien gagne le mandat). Professionnalisme des supports de présentation.",
    },
    constraints: [
      "CRM existant non remplaçable (contrat en cours)",
      "Négociateurs sur le terrain : accès mobile indispensable",
      "Pas de compétence technique en interne pour la maintenance",
      "Photos des biens hébergées sur serveur local",
    ],
    decisions: [
      {
        choice: "RAG sur base vectorielle légère (ChromaDB)",
        why: "200 biens = petit volume. ChromaDB tourne en local, pas de coût cloud, recherche sémantique efficace.",
        tradeoff: "Scalabilité limitée à ~5000 biens, suffisant pour ce client.",
      },
      {
        choice: "Synchronisation CRM par export CSV quotidien",
        why: "Le CRM n'avait pas d'API. Export automatique programmé à 6h, réindexation complète en 3 minutes.",
        tradeoff: "Données pas temps réel (décalage max 24h acceptable pour l'usage).",
      },
      {
        choice: "Génération PDF avec template Jinja + WeasyPrint",
        why: "Contrôle total sur le rendu, pas de dépendance à un service externe. Templates modifiables par l'agence.",
      },
    ],
    delivered: [
      "Interface chat accessible sur mobile et desktop",
      "Recherche en langage naturel ('appartement 3 pièces centre-ville balcon')",
      "Fiches PDF générées en 10 secondes avec photos, caractéristiques, DPE",
      "Envoi direct par email ou WhatsApp",
      "Historique des recherches par négociateur",
    ],
    results: {
      metrics: [
        "Temps moyen de recherche de bien : 45 sec (vs 5-10 min avant)",
        "100% des fiches générées sans erreur de données",
        "Adoption par 7/8 négociateurs dès la première semaine",
      ],
      qualitative:
        "Les négociateurs rappellent les prospects avec une fiche personnalisée en moins de 2 minutes après le premier contact. Retour client : 'On dirait une grande agence.'",
    },
    retrospective: [
      "Aurais dû intégrer un système de feedback ('ce bien ne correspondait pas') pour améliorer la recherche",
      "L'export CSV est fragile — une API même basique aurait été plus robuste",
      "Prévoir un mode hors-ligne pour les visites en zone blanche",
    ],
    stack: [
      "Python",
      "FastAPI",
      "ChromaDB",
      "OpenRouter (Claude)",
      "Jinja2",
      "WeasyPrint",
      "Tailwind CSS",
    ],
  },
  {
    slug: "second-brain",
    title: "Second Brain — Base de connaissances personnelle augmentée",
    type: "experimentation",
    status: "en_cours",
    tldr:
      "RAG personnel sur 15 000 notes Obsidian. Recherche sémantique en 3 secondes.",
    context: {
      client: "Projet personnel",
      duration: "En développement continu depuis 8 mois",
      role: "Architecture, développement, usage quotidien",
      year: 2024,
    },
    problem: {
      situation:
        "Des années de notes, bookmarks, PDF, snippets de code éparpillés. Impossible de retrouver une information précise sans parcourir des dizaines de fichiers.",
      stakes:
        "Capitaliser sur mes recherches passées au lieu de les refaire. Répondre rapidement à des questions clients en retrouvant mes notes de veille.",
    },
    constraints: [
      "Données personnelles et professionnelles sensibles : hébergement local uniquement",
      "Volume important : ~15 000 notes Obsidian + 2 000 PDF",
      "Doit fonctionner sur mon NAS domestique (ressources limitées)",
      "Pas de dépendance à un service cloud qui peut fermer",
    ],
    decisions: [
      {
        choice: "PostgreSQL + pgvector plutôt que Pinecone",
        why: "Hébergement local, pas de coût récurrent. pgvector suffisant pour ce volume.",
        tradeoff: "Configuration initiale plus complexe qu'un service managé.",
      },
      {
        choice: "Indexation incrémentale (hash de contenu)",
        why: "Réindexer 15 000 documents à chaque modification serait trop lent. Seuls les fichiers modifiés sont retraités.",
      },
      {
        choice: "Interface CLI plutôt que web",
        why: "Usage personnel, rapidité d'accès. Une commande = une réponse.",
      },
    ],
    delivered: [
      "Pipeline d'ingestion Obsidian + PDF + Markdown",
      "Recherche sémantique sur l'ensemble du corpus",
      "Synthèse automatique avec citations des sources",
      "Résumés hebdomadaires des notes récentes",
      "Export vers Obsidian des réponses générées",
    ],
    results: {
      metrics: [
        "15 000+ documents indexés",
        "Temps de réponse moyen : 3 secondes",
        "Coût : 0€ (matériel existant)",
      ],
      qualitative:
        "Je retrouve en 30 secondes des notes que je mettais 15 minutes à chercher. Changement d'usage : je prends plus de notes car je sais que je pourrai les retrouver.",
    },
    retrospective: [
      "Aurais dû versionner les embeddings dès le départ — difficile de comparer les améliorations",
      "L'interface CLI est limitante pour explorer les résultats connexes",
      "Prévoir un mode 'question de suivi' pour affiner les recherches",
    ],
    stack: [
      "Python",
      "PostgreSQL",
      "pgvector",
      "Obsidian",
      "OpenRouter",
      "Rust (worker d'ingestion)",
    ],
  },
];

// Export de compatibilité avec l'ancien format
export const projects: Project[] = caseStudies.map((cs) => ({
  name: cs.title,
  slug: cs.slug,
  problem: cs.problem.situation,
  solution: cs.tldr,
  architecture: cs.decisions.map((d) => d.choice).join(", "),
  stack: cs.stack,
  proof: cs.results.qualitative,
  impact: cs.results.metrics?.join(" • ") ?? cs.results.qualitative,
  lessons: cs.retrospective,
  decisions: cs.decisions.map((d) => d.choice),
  risks: cs.constraints,
  exploreNext: [],
  links: cs.links,
}));
