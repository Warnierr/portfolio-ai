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
};

export const projects: Project[] = [
  {
    name: "Budget AI",
    slug: "budget-ai",
    problem: "Connecter comptes bancaires, factures et objectifs financiers pour orchestrer un budget vivant.",
    solution: "Agent financier qui consolide les flux, anticipe les cashflows et déclenche des alertes/action automatiques.",
    architecture: "Next.js + Supabase + orchestrateur d’agents (planner/analyste/actionneur) + connecteurs bancaires.",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenRouter", "LangChain"],
    proof: "Démontre ma capacité à traiter des données sensibles, à tracer chaque décision et à relier IA + infra perso.",
    impact: "Vision consolidée en temps réel sur les dépenses, recommandations personnalisées et automatisation des tâches fastidieuses.",
    lessons: [
      "Toujours stocker les explications de l’agent pour audit ultérieur.",
      "Le budget est un écosystème : prévoir des hooks vers NAS, Notion, e-mail.",
    ],
  },
  {
    name: "Ecrituria",
    slug: "ecrituria",
    problem: "Industrialiser la création d’univers narratifs (textes, visuels, lore) sans perdre la cohérence créative.",
    solution: "Studio IA multi-agents : un architecte de lore, un écrivain, un critique et un illustrateur se supervisent.",
    architecture: "Knowledge graph + base vectorielle + orchestrateur multi-agent + UI narrative immersive.",
    stack: ["Next.js", "LangChain", "Pinecone", "Supabase", "OpenRouter"],
    proof: "Montre comment j’utilise l’IA pour fusionner imaginaire, structure et automation.",
    impact: "Production régulière de chapitres, fiches personnages et moodboards cohérents avec l’univers.",
    lessons: [
      "Séparer les rôles (créatif vs critique) pour maintenir la qualité.",
      "Le graph de connaissances est la charpente : il doit être versionné comme du code.",
    ],
  },
  {
    name: "Nomah AI",
    slug: "nomah-ai",
    problem: "Créer une marketplace IA pilotée par des agents autonomes reliée à des workflows métier complexes.",
    solution: "Écosystème modulaire : orchestrateur d’agents, API multi-tenant, monitoring temps réel.",
    architecture: "Next.js + Workers + pipelines RAG sur Supabase, bus d’événements + orchestrateur Temporal.",
    stack: ["Next.js", "TypeScript", "Supabase", "Temporal", "OpenRouter"],
    proof: "Capacité à concevoir un système commerce complet (produit + infra + IA).",
    impact: "Ouverture du catalogue à des dizaines de vendeurs, automatisation de la conciliation financière et monitoring en continu.",
    lessons: [
      "L’observabilité doit être pensée avant d’orchestrer plusieurs agents.",
      "Limiter les coûts d’inférence via un planner qui choisit le bon modèle.",
    ],
    links: [{ label: "Architecture", href: "https://example.com/nomah-architecture" }],
  },
  {
    name: "Anomalie 2084",
    slug: "anomalie-2084",
    problem: "Industrialiser du worldbuilding et de la narration générative sans perdre la cohérence créative.",
    solution: "Studio IA avec graphes de connaissances, génération multi-modale et automations de publication.",
    architecture: "Pipeline LLM orchestré (agents créatifs + critique) + base vectorielle + UI immersive.",
    stack: ["Next.js", "LangChain", "Pinecone", "Prisma"],
    proof: "Union entre imaginaire et rigueur système : IA comme co-auteur contrôlé.",
    impact: "Production hebdomadaire de chapitres et d’assets visuels cohérents avec le lore.",
    lessons: [
      "Toujours séparer créativité et contrôle qualité via deux agents distincts.",
      "Un knowledge graph simple (JSON-LD) suffit pour détecter les incohérences.",
    ],
  },
  {
    name: "Second Brain",
    slug: "second-brain",
    problem: "Centraliser la connaissance personnelle (notes, recherches, NAS) et la rendre requêtable.",
    solution: "RAG privé, ingestion Obsidian/Git/Notion, agent concierge qui synthétise et notifie.",
    architecture: "Pipeline ingestion Rust + workers Node, NAS chiffré, pgvector pour recherche sémantique.",
    stack: ["Obsidian", "Supabase pgvector", "Rust", "Next.js"],
    proof: "Dialogue entre hardware personnel, sécurité et intelligence augmentée.",
    impact: "Réponses en quelques secondes sur des années de notes, exports automatiques de résumés hebdomadaires.",
    lessons: [
      "Indexer les médias (images/PDF) dès la première version pour éviter la dette.",
      "Automatiser le nettoyage des doublons avant l’embedding réduit les coûts.",
    ],
  },
  {
    name: "Automations NAS & Sécurité",
    slug: "nas-automation",
    problem: "Superviser backups, sécurité et accès à un cluster maison multi-sites.",
    solution: "Automations Proxmox + scripts d’audit, alertes temps réel, bastions sécurisés.",
    architecture: "Proxmox + NAS + agents watchers + dashboard d’observabilité custom.",
    stack: ["Proxmox", "Ansible", "Node", "Grafana"],
    proof: "Savoir industrialiser l’automatisation infra (backups, sécurité, accès).",
    impact: "Zéro backup manqué depuis 18 mois, détection instantanée des anomalies réseau.",
    lessons: [
      "Toujours logguer les accès physiques (NAS) autant que les accès distants.",
      "Créer un simulateur de panne pour tester les runbooks tous les trimestres.",
    ],
  },
];

