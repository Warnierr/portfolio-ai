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

export const projects: Project[] = [
  {
    name: "Budget AI",
    slug: "budget-ai",
    problem: "Gerer son budget personnel de maniere intelligente avec une vision claire des finances et des conseils personnalises.",
    solution: "Application web full-stack de gestion financiere avec assistant IA integre pour des conseils personnalises et anonymises.",
    architecture: "Next.js 14 (App Router, Server Components) + Prisma ORM + PostgreSQL (Neon) + NextAuth.js + OpenRouter API (multi-modeles IA).",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Neon", "NextAuth.js", "OpenRouter", "Recharts", "Radix UI", "Vercel"],
    proof: "Demontre ma capacite a concevoir une application full-stack complete, de l'authentification securisee a l'integration IA, en passant par le deploiement cloud.",
    impact: "Dashboard interactif avec graphiques temps reel, suivi multi-comptes, projections financieres et assistant IA pour optimiser son budget.",
    lessons: [
      "Anonymiser les donnees avant envoi a l'IA pour respecter la vie privee (RGPD-friendly).",
      "Prisma + Neon offrent un excellent compromis performance/simplicite pour le serverless.",
      "L'architecture Server Components de Next.js 14 reduit drastiquement le JS cote client.",
    ],
    decisions: [
      "NextAuth.js pour l'authentification securisee avec sessions JWT.",
      "OpenRouter pour acceder a plusieurs modeles IA (GPT-4, Claude, Llama) via une seule API.",
      "Couche de confidentialite qui anonymise toutes les donnees financieres avant envoi a l'IA.",
      "Recharts pour des graphiques performants et accessibles.",
    ],
    risks: [
      "Gestion des donnees sensibles financieres.",
      "Couts d'inference IA a maitriser (modeles gratuits disponibles).",
      "Synchronisation schema Prisma entre dev (SQLite) et prod (PostgreSQL).",
    ],
    exploreNext: [
      "Import automatique des releves bancaires (CSV/OFX).",
      "Notifications push pour les echeances d'abonnements.",
      "Mode hors-ligne avec sync differee.",
      "Export PDF des rapports mensuels.",
    ],
    links: [
      { label: "Application Live", href: "https://portfolio-ai-gcs9-6117x9tji-kenshu-projects.vercel.app" },
    ],
  },
  {
    name: "Ecrituria",
    slug: "ecrituria",
    problem: "Industrialiser la creation d'univers narratifs (textes, visuels, lore) sans perdre la coherence creative.",
    solution: "Studio IA multi-agents : un architecte de lore, un ecrivain, un critique et un illustrateur se supervisent.",
    architecture: "Knowledge graph + base vectorielle + orchestrateur multi-agent + UI narrative immersive.",
    stack: ["Next.js", "LangChain", "Pinecone", "Supabase", "OpenRouter"],
    proof: "Montre comment j'utilise l'IA pour fusionner imaginaire, structure et automation.",
    impact: "Production reguliere de chapitres, fiches personnages et moodboards coherents avec l'univers.",
    lessons: [
      "Separer les roles (creatif vs critique) pour maintenir la qualite.",
      "Le graph de connaissances est la charpente : il doit etre versionne comme du code.",
    ],
    decisions: [
      "Deux agents : creatif et critique, orchestres par un planner.",
      "Knowledge graph versionne pour garder la coherence du lore.",
      "Pipeline multi-modal (texte + visuel) avec validation humaine legere.",
    ],
    risks: [
      "Incoherences de lore si le graph n'est pas mis a jour.",
      "Couts d'inference sur les passages longs.",
      "Derive stylistique sans critique explicite.",
    ],
    exploreNext: [
      "Generation de planches visuelles coherentes (moodboards).",
      "Synthese audio des chapitres pour validation rapide.",
      "Portail public de lecture avec mode RAG questions sur le lore.",
    ],
  },
  {
    name: "Nomah AI",
    slug: "nomah-ai",
    problem: "Creer une marketplace IA pilotee par des agents autonomes reliee a des workflows metier complexes.",
    solution: "Ecosysteme modulaire : orchestrateur d'agents, API multi-tenant, monitoring temps reel.",
    architecture: "Next.js + Workers + pipelines RAG sur Supabase, bus d'evenements + orchestrateur Temporal.",
    stack: ["Next.js", "TypeScript", "Supabase", "Temporal", "OpenRouter"],
    proof: "Capacite a concevoir un systeme commerce complet (produit + infra + IA).",
    impact: "Ouverture du catalogue a des dizaines de vendeurs, automatisation de la conciliation financiere et monitoring en continu.",
    lessons: [
      "L'observabilite doit etre pensee avant d'orchestrer plusieurs agents.",
      "Limiter les couts d'inference via un planner qui choisit le bon modele.",
    ],
    links: [{ label: "Architecture", href: "https://example.com/nomah-architecture" }],
  },
  {
    name: "Anomalie 2084",
    slug: "anomalie-2084",
    problem: "Industrialiser du worldbuilding et de la narration generative sans perdre la coherence creative.",
    solution: "Studio IA avec graphes de connaissances, generation multi-modale et automations de publication.",
    architecture: "Pipeline LLM orchestre (agents creatifs + critique) + base vectorielle + UI immersive.",
    stack: ["Next.js", "LangChain", "Pinecone", "Prisma"],
    proof: "Union entre imaginaire et rigueur systeme : IA comme co-auteur controle.",
    impact: "Production hebdomadaire de chapitres et d'assets visuels coherents avec le lore.",
    lessons: [
      "Toujours separer creativite et controle qualite via deux agents distincts.",
      "Un knowledge graph simple (JSON-LD) suffit pour detecter les incoherences.",
    ],
  },
  {
    name: "Second Brain",
    slug: "second-brain",
    problem: "Centraliser la connaissance personnelle (notes, recherches, NAS) et la rendre requetable.",
    solution: "RAG prive, ingestion Obsidian/Git/Notion, agent concierge qui synthetise et notifie.",
    architecture: "Pipeline ingestion Rust + workers Node, NAS chiffre, pgvector pour recherche semantique.",
    stack: ["Obsidian", "Supabase pgvector", "Rust", "Next.js"],
    proof: "Dialogue entre hardware personnel, securite et intelligence augmentee.",
    impact: "Reponses en quelques secondes sur des annees de notes, exports automatiques de resumes hebdomadaires.",
    lessons: [
      "Indexer les medias (images/PDF) des la premiere version pour eviter la dette.",
      "Automatiser le nettoyage des doublons avant l'embedding reduit les couts.",
    ],
  },
  {
    name: "Automations NAS & Securite",
    slug: "nas-automation",
    problem: "Superviser backups, securite et acces a un cluster maison multi-sites.",
    solution: "Automations Proxmox + scripts d'audit, alertes temps reel, bastions securises.",
    architecture: "Proxmox + NAS + agents watchers + dashboard d'observabilite custom.",
    stack: ["Proxmox", "Ansible", "Node", "Grafana"],
    proof: "Savoir industrialiser l'automatisation infra (backups, securite, acces).",
    impact: "Zero backup manque depuis 18 mois, detection instantanee des anomalies reseau.",
    lessons: [
      "Toujours logguer les acces physiques (NAS) autant que les acces distants.",
      "Creer un simulateur de panne pour tester les runbooks tous les trimestres.",
    ],
  },
];
