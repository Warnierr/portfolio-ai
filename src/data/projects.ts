/**
 * Expériences professionnelles — Raouf Warnier
 * Data Engineer & DevOps | Freelance
 */

export type CaseStudy = {
  slug: string;
  title: string;
  type: "mission" | "produit" | "experimentation";
  tldr: string;
  context: {
    client: string;
    duration: string;
    role: string;
    year: number;
  };
  problem: {
    situation: string;
    stakes: string;
  };
  constraints: string[];
  decisions: {
    choice: string;
    why: string;
    tradeoff?: string;
  }[];
  delivered: string[];
  results: {
    metrics?: string[];
    qualitative: string;
  };
  retrospective: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  roadmap?: string[];
  media?: {
    type: "image" | "video";
    url: string;
    caption?: string;
  }[];
  status?: "en_cours" | "prototype" | "archive";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "budget-ai",
    title: "Budget AI — Assistant Financier Intelligent",
    type: "produit",
    tldr: "Assistant personnel intelligent qui transforme des lignes de dépenses brutes en conseils stratégiques. Prédictions de solde, détection d'abonnements et coaching IA en temps réel.",
    context: {
      client: "Projet Personnel (SaaS)",
      duration: "En développement continu",
      role: "Lead Fullstack & AI Engineer",
      year: 2024,
    },
    problem: {
      situation: "Les applications bancaires classiques regardent le passé. Les utilisateurs manquent de visibilité sur leur futur financier et de conseils personnalisés.",
      stakes: "Transformer la gestion financière passive en un coaching proactif, intelligent, sécurisé et agréable à utiliser via une interface conversationnelle.",
    },
    constraints: [
      "Confidentialité des données bancaires (Privacy by Design)",
      "Expérience utilisateur fluide avec réponses IA en streaming",
      "Architecture Serverless optimisée pour les coûts",
    ],
    decisions: [
      {
        choice: "Next.js 14 + Server-Sent Events (SSE)",
        why: "Pour un effet 'machine à écrire' fluide et natif sans bloquer l'interface utilisateur.",
      },
      {
        choice: "Middleware d'anonymisation (Privacy Layer)",
        why: "Couche logicielle qui anonymise toutes les données financières (suppression des noms, comptes, lieux) AVANT l'envoi aux LLMs publics (OpenRouter).",
      },
      {
        choice: "Variables CSS Sémantiques & Tailwind",
        why: "Système de thèmes dynamiques (Neon, Ocean...) injectés par Context React pour changer l'ambiance sans recharger la page.",
      },
      {
        choice: "OpenRouter API",
        why: "Permet de switcher de modèle d'IA à la volée (Claude 3.5 Sonnet, GPT-4o) selon le besoin en intelligence.",
      },
    ],
    delivered: [
      "Assistant Financier Contextuel (Chat en temps réel avec vos données)",
      "Projection de Solde & 'Reste à Vivre'",
      "Détection et isolement automatique des abonnements",
      "Interface Glassmorphism & Thèmes dynamiques",
    ],
    results: {
      metrics: [
        "Temps de réponse de l'IA < 200ms (SFE)",
        "Plus de 3 modèles LLM supportés",
      ],
      qualitative: "Une application qui impressionne par son design 'Wow' (Glassmorphism, Recharts) et rassure par sa gestion stricte de la privacy.",
    },
    retrospective: [
      "La gestion des ReadableStreams entre serveur et client (SSE) a demandé une configuration fine sur Next.js.",
      "L'architecture 'Privacy-First' est le véritable atout confiance du produit.",
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/UI",
      "Framer Motion",
      "Recharts",
      "Prisma",
      "PostgreSQL (Neon)",
      "NextAuth.js",
      "OpenRouter API"
    ],
    roadmap: [
      "Connexion Bancaire Directe (via GoCardless/Plaid) pour ne plus importer de CSV.",
      "Mode Multi-Worskapce (Budget Perso / Budget Pro).",
      "Application Mobile (via React Native ou PWA)."
    ],
    links: [
      { label: "🔴 Live Demo : Budget AI", href: "https://budget.kenshu.dev" },
      { label: "📱 Page de l'app", href: "/app/budget-ai" }
    ],
  },
  {
    slug: "ai-compliance-audit-tool",
    title: "AI Compliance Audit Tool — Conformité AI Act & RGPD",
    type: "experimentation",
    tldr: "Outil d'audit automatisé pour évaluer la conformité des systèmes d'IA selon le cadre européen AI Act et RGPD. Classification des risques, checklists réglementaires et rapports détaillés.",
    context: {
      client: "Projet R&D Personnel",
      duration: "En développement (2025-2026)",
      role: "Lead Engineer & Compliance Researcher",
      year: 2025,
    },
    problem: {
      situation: "Les entreprises européennes devront auditer leurs systèmes d'IA d'ici 2026-2027 selon l'AI Act. Pas d'outils techniques accessibles pour les équipes produit.",
      stakes: "Créer un outil qui traduit les obligations légales en checklists techniques exploitables par les développeurs et product managers.",
    },
    constraints: [
      "Interprétation correcte du cadre réglementaire AI Act",
      "Interface simple pour non-juristes",
      "Évolutivité (le texte évoluera)",
    ],
    decisions: [
      {
        choice: "Architecture modulaire par catégorie de risque",
        why: "Le texte AI Act est structuré par niveaux de risque (inacceptable, élevé, limité, minimal). L'outil reflète cette logique.",
      },
      {
        choice: "Checklist interactive avec export PDF/JSON",
        why: "Les équipes ont besoin de rapports partageables avec direction et juristes.",
      },
      {
        choice: "Base de connaissances intégrée (articles de loi)",
        why: "Chaque question renvoie à l'article précis du règlement pour traçabilité.",
      },
    ],
    delivered: [
      "Interface de classification des systèmes IA",
      "Checklist dynamique selon le niveau de risque détecté",
      "Rapport d'audit exportable (PDF)",
      "Base de connaissances AI Act intégrée",
    ],
    results: {
      metrics: [
        "Prototype fonctionnel v0.1",
        "Couverture de 80% des obligations high-risk",
      ],
      qualitative: "Un outil early pour anticiper les besoins 2026-2027. Positionnement unique entre tech et réglementation.",
    },
    retrospective: [
      "La complexité du texte AI Act nécessite une veille constante.",
      "L'outil est un excellent différenciateur pour attirer des missions compliance.",
    ],
    stack: ["Next.js 15", "TypeScript", "Tailwind", "Prisma", "PostgreSQL", "PDF Generation"],
    roadmap: [
      "Intégration API pour audit automatisé de code/modèles",
      "Module RGPD complémentaire",
      "Multi-langue (EN/FR)",
    ],
    links: [{ label: "📱 Page de l'app", href: "/app/ai-compliance" }],
    status: "prototype",
  },
  {
    slug: "data-engineer-bnpp",
    title: "Ingénieur Data / Big Data — BNP Paribas",
    type: "mission",
    tldr: "Migration d'ETL legacy vers architecture moderne. Debugging de pipelines complexes, automatisation Jenkins et développement Scala/Spark SQL.",
    context: {
      client: "BNP Paribas",
      duration: "Sept 2025 - Déc 2025",
      role: "Ingénieur Data",
      year: 2025,
    },
    problem: {
      situation: "Maintenance et évolution d'un SI critique bancaire. Nécessité de comprendre et migrer des pipelines legacy sans documentation.",
      stakes: "Assurer la continuité de service des flux financiers tout en migrant vers une stack plus performante et maintenable.",
    },
    constraints: [
      "Environnement bancaire hautement sécurisé",
      "Systèmes existants complexes (Reverse Engineering)",
      "Qualité de service critique (SLA strict)",
    ],
    decisions: [
      {
        choice: "Scala & Spark SQL",
        why: "Performance et typage fort pour les traitements critiques à grande échelle.",
      },
      {
        choice: "Jenkins pour l'orchestration",
        why: "Automatisation complète des flux pour réduire les interventions manuelles et sécuriser les déploiements.",
      },
    ],
    delivered: [
      "Migration de pipelines ETL legacy vers nouvelle architecture",
      "Scripts de debugging et d'analyse de données",
      "Documentation technique détaillée des flux migrés",
    ],
    results: {
      metrics: [
        "100% des flux migrés sans régression",
        "Réduction du temps de debug",
      ],
      qualitative: "Une transition fluide vers une architecture plus moderne, avec une meilleure visibilité sur les traitements.",
    },
    retrospective: [
      "L'analyse approfondie (reverse engineering) avant le code est la clé du succès sur du legacy.",
    ],
    stack: ["Scala", "Spark", "Spark SQL", "Jenkins", "Shell", "Linux", "Hadoop", "Git"],
  },
  {
    slug: "devops-orange-bigdata",
    title: "Infrastructure Big Data — Orange",
    type: "mission",
    tldr: "Automatisation du déploiement des outils Big Data (Zeppelin, Airflow, Spark, Grafana) avec Ansible. Migration de données critiques MariaDB vers MSSQL.",
    context: {
      client: "Orange via Inetum",
      duration: "Depuis août 2024",
      role: "Ingénieur DevOps",
      year: 2024,
    },
    problem: {
      situation: "Déploiement manuel des outils Big Data chronophage et source d'erreurs. Migration de base de données legacy nécessaire.",
      stakes: "Assurer la fiabilité des environnements de production et garantir l'intégrité des données lors de la migration.",
    },
    constraints: [
      "Environnements Linux à haute disponibilité",
      "Équipes multidisciplinaires à coordonner",
    ],
    decisions: [
      {
        choice: "Ansible pour l'automatisation",
        why: "Idempotence garantie et playbooks réutilisables pour Zeppelin, Airflow, Spark.",
      },
      {
        choice: "Scripts Shell pour l'opérationnel",
        why: "Surveillance et dépannage rapide des services Big Data en production.",
      },
    ],
    delivered: [
      "Playbooks Ansible pour déploiement automatisé",
      "Scripts de migration MariaDB → MSSQL avec validation",
      "Monitoring Prometheus/Grafana",
    ],
    results: {
      metrics: [
        "Temps de déploiement réduit de 80%",
        "Zéro perte de données lors des migrations",
      ],
      qualitative: "Les équipes peuvent désormais déployer des environnements Big Data complets en quelques minutes.",
    },
    retrospective: [
      "L'automatisation Ansible a été un game-changer pour la reproductibilité des environnements.",
    ],
    stack: ["Ansible", "Zeppelin", "Airflow", "Spark", "Grafana", "Prometheus", "Linux", "MariaDB", "MSSQL"],
  },
  {
    slug: "iot-thingworx-safran",
    title: "Plateforme IoT & Monitoring — Safran",
    type: "mission",
    tldr: "Développement de solutions data IoT avec ThingWorx, migration PostgreSQL vers MSSQL, et mise en place de pipelines CI/CD GitLab.",
    context: {
      client: "Safran via Inetum",
      duration: "Juin 2023 - Août 2024",
      role: "Consultant IoT et Base de Données",
      year: 2024,
    },
    problem: {
      situation: "Systèmes IoT industriels nécessitant une surveillance temps réel et des données fiables pour la prise de décision.",
      stakes: "Assurer la qualité des produits aéronautiques via un monitoring précis des métriques de production.",
    },
    constraints: [
      "Environnement industriel critique (aéronautique)",
      "Collaboration internationale (workshops en anglais)",
    ],
    decisions: [
      {
        choice: "ThingWorx pour l'IoT",
        why: "Plateforme industrielle éprouvée avec capacités de visualisation temps réel.",
      },
      {
        choice: "Migration PostgreSQL → MSSQL",
        why: "Standardisation des bases de données du groupe tout en assurant la continuité des données.",
      },
    ],
    delivered: [
      "Système de surveillance temps réel des services IoT",
      "Dashboard de métriques et alerting",
      "Pipelines CI/CD GitLab avec PowerShell",
      "Tests automatisés Jest",
    ],
    results: {
      metrics: [
        "Migration de volumes massifs sans interruption",
        "Couverture de tests à 85%",
      ],
      qualitative: "Une infrastructure data robuste supportant les décisions qualité en production aéronautique.",
    },
    retrospective: [
      "La documentation technique détaillée a été cruciale pour le transfert de compétences.",
    ],
    stack: ["ThingWorx", "JavaScript", "SQL", "PostgreSQL", "MSSQL", "GitLab CI", "PowerShell", "Jest"],
  },
  {
    slug: "data-engineer-acc-industrie",
    title: "Pipelines Big Data — ACC Industrie 4.0",
    type: "mission",
    tldr: "Développement de pipelines ETL avec Spark et Hadoop pour traiter de gros volumes de données industrielles. Orchestration Airflow et stockage MinIO.",
    context: {
      client: "ACC via Inetum",
      duration: "Sept 2022 - Juin 2023",
      role: "Data Engineer",
      year: 2023,
    },
    problem: {
      situation: "Volumes massifs de données de production nécessitant un traitement automatisé et une ingestion fiable.",
      stakes: "Permettre l'analyse des données industrielles pour optimiser les processus de fabrication.",
    },
    constraints: [
      "Gestion de gros volumes (TBs)",
      "Conformité aux normes de gestion des données",
    ],
    decisions: [
      {
        choice: "Spark et Hadoop pour le traitement",
        why: "Technologies éprouvées pour le Big Data avec scalabilité horizontale.",
      },
      {
        choice: "Airflow pour l'orchestration",
        why: "DAGs flexibles et monitoring intégré des pipelines.",
      },
    ],
    delivered: [
      "Pipelines d'ingestion MinIO → SQL via Airflow",
      "Optimisation des performances de traitement",
      "Documentation et collaboration avec l'équipe Data Architecture",
    ],
    results: {
      metrics: [
        "Réduction des coûts de traitement de 40%",
        "Temps de traitement divisé par 3",
      ],
      qualitative: "Une infrastructure data moderne permettant des analyses industrielles à grande échelle.",
    },
    retrospective: [
      "La collaboration avec l'équipe Data Architecture a été essentielle pour les bonnes pratiques.",
    ],
    stack: ["Spark", "Hadoop", "Airflow", "MinIO", "Python", "SQL", "PostgreSQL"],
  },

];

// Compatibilité avec l'ancien format
export const projects = caseStudies.map((cs) => ({
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
