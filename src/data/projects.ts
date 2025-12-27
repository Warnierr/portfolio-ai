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
  media?: {
    type: "image" | "video";
    url: string;
    caption?: string;
  }[];
  status?: "en_cours" | "prototype" | "archive";
};

export const caseStudies: CaseStudy[] = [
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
  {
    slug: "budget-ai",
    title: "Budget AI — Assistant de Gestion Financière",
    type: "produit",
    tldr: "Application SaaS utilisant l'IA pour catégoriser les transactions et prédire les flux de trésorerie. Projet personnel démontrant mes compétences fullstack.",
    context: {
      client: "Projet Personnel",
      duration: "En continu",
      role: "Lead Fullstack & IA",
      year: 2024,
    },
    problem: {
      situation: "Les outils de gestion de budget classiques demandent trop de saisie manuelle.",
      stakes: "Créer un assistant intelligent pour automatiser la gestion financière personnelle.",
    },
    constraints: [
      "UX intuitive et mobile-first",
      "Précision des catégorisations IA",
    ],
    decisions: [
      {
        choice: "LLM local pour la catégorisation",
        why: "Réduire les coûts d'API et protéger les données sensibles.",
      },
      {
        choice: "Next.js + Prisma + PostgreSQL",
        why: "Stack moderne pour une application réactive.",
      },
    ],
    delivered: [
      "Moteur de catégorisation intelligent",
      "Dashboard de prévision de trésorerie",
      "Interface mobile-first",
    ],
    results: {
      metrics: [
        "95% de précision catégorisation",
        "Saisie manuelle réduite de 80%",
      ],
      qualitative: "Une application qui transforme la gestion de budget en expérience conversationnelle.",
    },
    retrospective: [
      "Ce projet personnel m'a permis d'explorer l'industrialisation des LLMs.",
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL", "TypeScript", "TailwindCSS"],
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
