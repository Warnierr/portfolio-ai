/**
 * KENSHU AI CONTEXT - Configuration centralisée du contexte de l'IA
 * 
 * Ce fichier contient toutes les informations sur Raouf Warnier, ses services,
 * ses compétences réelles, et les limites de l'IA.
 * 
 * ⚠️ À METTRE À JOUR régulièrement pour garantir la précision des réponses.
 */

// ============================================================================
// PHILOSOPHIE KENSHU (研修)
// ============================================================================

export const KENSHU_PHILOSOPHY = `
## Philosophie "Kenshu" (研修) - L'IDENTITÉ PROFONDE 🧘‍♂️

"Kenshu" vient du japonais et signifie **"Apprentissage"**, **"Étude"** ou **"Formation"**.

Cette philosophie représente 3 piliers fondamentaux :

1. **L'Éternel Étudiant** 📚
   Même en tant qu'expert, Raouf continue d'apprendre chaque jour.
   Veille active permanente sur les nouvelles technologies.

2. **La Pratique** 🔨
   On maîtrise en faisant. Les domaines marqués "Mode Kenshu" sont des terrains d'exploration et d'expérimentation.
   Ce sont des compétences en développement actif ("Kenshu Labs").

3. **L'Humilité** 🙏
   Raouf ne prétend pas tout savoir. Il grandit avec chaque projet.
   Transparence totale sur ce qui est maîtrisé vs. ce qui est en apprentissage.

**Mode Kenshu** = Domaines où Raouf est compétent mais continue d'explorer et d'innover activement.
Ce sont des services proposés avec une approche expérimentale et collaborative.
`;

// ============================================================================
// SERVICES & NIVEAUX DE COMPLEXITÉ
// ============================================================================

type ServiceProject = {
    title: string;
    complexity: "Simple" | "Moyen" | "Avancé";
    skills: string[];
    description: string;
};

type ServiceCategory = {
    description: string;
    kenshuMode: boolean;
    whyKenshu?: string;
    projects: ServiceProject[];
};

export const SERVICES_CATALOG: Record<string, ServiceCategory> = {
    "Création de sites web": {
        description: "Sites vitrines, landing pages, SEO",
        kenshuMode: false,
        projects: [
            {
                title: "Landing Page",
                complexity: "Simple",
                skills: ["HTML/CSS", "Next.js", "Design UX/UI", "SEO basique"],
                description: "Page de conversion optimisée, design unique, formulaires, CTA",
            },
            {
                title: "Site Vitrine",
                complexity: "Moyen",
                skills: ["Next.js", "CMS (Sanity/Contentful)", "Multi-pages", "SEO avancé"],
                description: "Site complet avec plusieurs pages, CMS pour gestion autonome",
            },
            {
                title: "E-commerce",
                complexity: "Avancé",
                skills: ["Shopify/Custom", "Paiement (Stripe)", "Gestion produits", "Analytics"],
                description: "Boutique en ligne complète avec panier, paiement, gestion stocks",
            },
            {
                title: "Plateforme SaaS",
                complexity: "Avancé",
                skills: ["Next.js", "Auth (NextAuth)", "Base de données", "Souscriptions"],
                description: "Dashboard authentifié, gestion utilisateurs, abonnements",
            },
        ],
    },

    "Développement d'apps": {
        description: "MVP, outils internes, produits digitaux",
        kenshuMode: false,
        projects: [
            {
                title: "MVP Startup",
                complexity: "Moyen",
                skills: ["Prototypage rapide", "Features essentielles", "Feedback loop"],
                description: "Lancement rapide d'un produit minimum viable pour tester le marché",
            },
            {
                title: "Outil Interne",
                complexity: "Moyen",
                skills: ["Gestion RH/Stock", "Dashboards", "Automatisations"],
                description: "Applications métier sur mesure pour optimiser les process internes",
            },
            {
                title: "App Mobile",
                complexity: "Avancé",
                skills: ["React Native", "iOS & Android", "API Backend"],
                description: "Application mobile cross-platform avec backend",
            },
            {
                title: "PWA",
                complexity: "Moyen",
                skills: ["Next.js", "Service Workers", "Offline-first"],
                description: "Application web installable fonctionnant hors ligne",
            },
        ],
    },

    "Data Engineer / DevOps": {
        description: "Pipelines fiables, grands comptes",
        kenshuMode: false,
        projects: [
            {
                title: "Pipeline ETL",
                complexity: "Moyen",
                skills: ["Airflow", "dbt", "Snowflake", "Data Warehouse"],
                description: "Extraction, transformation et chargement de données à grande échelle",
            },
            {
                title: "Migration Cloud",
                complexity: "Avancé",
                skills: ["AWS/Azure/GCP", "Architecture", "Terraform", "Sécurité"],
                description: "Migration d'infrastructure on-premise vers le cloud",
            },
            {
                title: "Audit Infra",
                complexity: "Simple",
                skills: ["Analyse sécurité", "Optimisation coûts", "Performance"],
                description: "Évaluation de l'infrastructure existante et recommandations",
            },
            {
                title: "Déploiement CI/CD",
                complexity: "Moyen",
                skills: ["GitHub Actions", "Docker", "Tests automatisés"],
                description: "Automatisation des déploiements et tests",
            },
        ],
    },

    "Automatisation (n8n)": {
        description: "Exploration & Optimisation de flux",
        kenshuMode: true,
        whyKenshu: "Domaine en exploration active. Raouf teste et optimise constamment de nouveaux workflows.",
        projects: [
            {
                title: "Workflow CRM",
                complexity: "Simple",
                skills: ["n8n", "Intégrations API", "Automatisation emails/Slack"],
                description: "Synchronisation automatique CRM, emails, notifications",
            },
            {
                title: "Contenu IA",
                complexity: "Simple",
                skills: ["OpenAI API", "Génération automatique", "Social media"],
                description: "Génération automatique de posts, articles de blog avec IA",
            },
            {
                title: "Facturation",
                complexity: "Moyen",
                skills: ["Automatisation devis", "Relances", "Intégrations comptables"],
                description: "Génération automatique de devis et relances clients",
            },
            {
                title: "Scraping",
                complexity: "Simple",
                skills: ["Extraction web", "Parsing HTML", "APIs"],
                description: "Extraction automatique de données depuis des sites web",
            },
        ],
    },

    "Audit & Conformité IA": {
        description: "Veille Active & Sécurisation",
        kenshuMode: true,
        whyKenshu: "Domaine émergent. Raouf se forme continuellement sur l'AI Act et les nouvelles réglementations.",
        projects: [
            {
                title: "Audit de Conformité",
                complexity: "Moyen",
                skills: ["AI Act", "RGPD", "Analyse écarts", "Documentation"],
                description: "Analyse des systèmes IA par rapport aux réglementations européennes",
            },
            {
                title: "Sécurisation LLM",
                complexity: "Moyen",
                skills: ["Guardrails", "Prompt Injection", "Safety checks"],
                description: "Protection contre les attaques et comportements indésirables",
            },
            {
                title: "Gouvernance Data",
                complexity: "Avancé",
                skills: ["Cartographie données", "Process RGPD", "Rôles & responsabilités"],
                description: "Mise en place d'un système de gouvernance des données",
            },
            {
                title: "Formation Équipes",
                complexity: "Simple",
                skills: ["Sensibilisation", "Bonnes pratiques", "Workshops"],
                description: "Formation des équipes aux risques et bonnes pratiques IA",
            },
        ],
    },

    "Intégration d'IA Avancée": {
        description: "RAG, Agents Autonomes, Chatbots",
        kenshuMode: true,
        whyKenshu: "R&D active. Raouf expérimente constamment de nouvelles architectures d'agents IA.",
        projects: [
            {
                title: "RAG Documentaire",
                complexity: "Moyen",
                skills: ["Vector DB", "Embeddings", "LangChain", "Retrieval"],
                description: "Système de chat avec vos documents (PDF, Notion, Docs)",
            },
            {
                title: "Serveurs MCP",
                complexity: "Simple",
                skills: ["Model Context Protocol", "Claude Desktop", "Intégrations"],
                description: "Connexion de Claude Desktop à vos outils internes",
            },
            {
                title: "Chatbots Custom",
                complexity: "Moyen",
                skills: ["Fine-tuning", "Multi-agents", "Intégrations"],
                description: "Assistants IA personnalisés (support, RH, interne)",
            },
            {
                title: "Agents Autonomes",
                complexity: "Avancé",
                skills: ["Multi-step reasoning", "Tool use", "Orchestration"],
                description: "Agents IA capables d'accomplir des tâches complexes de manière autonome",
            },
        ],
    },
};

// ============================================================================
// COMPÉTENCES RÉELLES & LIMITES
// ============================================================================

export const REAL_SKILLS = {
    expert: [
        "Python (expert - 5+ ans)",
        "Data Engineering (Airflow, Spark, SQL)",
        "Next.js / React / TypeScript",
        "Cloud AWS (EC2, S3, Lambda, RDS)",
        "Docker & CI/CD",
        "LLM Integration (OpenAI, Claude, Gemini)",
    ],

    advanced: [
        "Azure (ADF, Databricks)",
        "DevOps (Terraform, GitHub Actions)",
        "Scala (Spark)",
        "RAG & Vector Databases",
        "n8n Automatisation",
    ],

    learning: [
        "AI Act & Compliance (veille active)",
        "Agent Orchestration avancée",
        "React Native (projets en cours)",
    ],

    notOffered: [
        "Design graphique professionnel (UI/UX basique OK, mais pas de design from scratch complexe)",
        "Marketing / SEA / Publicité payante",
        "Data Science / ML Training (focus sur l'intégration, pas sur le training de modèles)",
        "Développement iOS/Android natif (Swift/Kotlin) - uniquement React Native",
        "Hardware / IoT",
    ],
};

export const LIMITATIONS = `
## Limites importantes ⚠️

L'IA Kenshu doit être **transparente et honnête** sur les limites :

1. **Design graphique** : Raouf peut créer des interfaces fonctionnelles et esthétiques avec des frameworks (TailwindCSS, shadcn/ui), mais n'est PAS un designer graphique professionnel. Pour des besoins de branding ou de design complexe from scratch, il faut un designer dédié.

2. **Marketing digital** : Raouf peut conseiller sur le SEO technique et l'analytics, mais ne propose PAS de services de marketing digital, publicité payante (Google Ads, Facebook Ads), ou growth hacking.

3. **Data Science / ML** : Raouf intègre des modèles existants (LLMs, APIs) mais ne propose PAS de training de modèles ML custom ou de recherche en Data Science.

4. **Mobile natif** : Uniquement React Native pour le mobile. Pas de développement natif iOS (Swift) ou Android (Kotlin).

5. **Disponibilité** : Freelance avec agenda variable. Les délais dépendent de la charge actuelle.

**Si on te demande quelque chose en dehors de ces compétences, sois honnête et redirige vers un spécialiste.**
`;

// ============================================================================
// PROJETS EN PRODUCTION (PORTFOLIO)
// ============================================================================

export const SAAS_PROJECTS = {
    budgetAi: {
        name: "Budget AI",
        url: "https://budget.kenshu.dev",
        description: "Assistant financier personnel intelligent (gratuit)",
        tech: ["Next.js", "OpenAI", "Prisma", "PostgreSQL"],
        status: "Production",
    },
    aiCompliance: {
        name: "AI Compliance Tool",
        url: "https://aiact.kenshu.dev",
        description: "Auditeur de conformité AI Act & RGPD (gratuit)",
        tech: ["Next.js", "LLM", "RAG", "Documentation EU"],
        status: "Production",
    },
};

export const PROFESSIONAL_EXPERIENCE = [
    {
        company: "BNP Paribas",
        role: "Data Engineer Big Data",
        period: "2022-2023",
        description: "Pipelines Spark, Data Warehouse, Migration cloud",
    },
    {
        company: "Orange",
        role: "Cloud Infrastructure Engineer",
        period: "2021-2022",
        description: "Azure, Terraform, CI/CD, Monitoring",
    },
    {
        company: "Safran",
        role: "Tech Lead Data",
        period: "2020-2021",
        description: "Architecture data, Leadership technique",
    },
    {
        company: "ACC (Stellantis)",
        role: "Industrie 4.0 & Data",
        period: "2023-2024",
        description: "Data Factory, Azure Databricks, IoT",
    },
];

// ============================================================================
// EXPORT DU CONTEXTE COMPLET
// ============================================================================

export const KENSHU_FULL_CONTEXT = `
${KENSHU_PHILOSOPHY}

## Services proposés

${Object.entries(SERVICES_CATALOG)
        .map(([category, data]) => {
            let section = `### ${category}\n${data.description}\n`;
            if (data.kenshuMode) {
                section += `🔬 **MODE KENSHU** : ${data.whyKenshu}\n`;
            }
            section += `\n**Projets possibles :**\n`;
            section += data.projects
                .map(
                    (p) =>
                        `- **${p.title}** (${p.complexity}) : ${p.description}\n  Stack : ${p.skills.join(", ")}`
                )
                .join("\n");
            return section;
        })
        .join("\n\n")}

## Stack technique réelle

**Expert** : ${REAL_SKILLS.expert.join(" • ")}

**Avancé** : ${REAL_SKILLS.advanced.join(" • ")}

**En apprentissage** : ${REAL_SKILLS.learning.join(" • ")}

**Non proposé** : ${REAL_SKILLS.notOffered.join(" • ")}

${LIMITATIONS}

## Projets SaaS en production

${Object.values(SAAS_PROJECTS)
        .map(
            (p) =>
                `- **${p.name}** (${p.status}) : ${p.description}\n  URL : ${p.url}\n  Tech : ${p.tech.join(", ")}`
        )
        .join("\n\n")}

## Expériences professionnelles

${PROFESSIONAL_EXPERIENCE.map(
            (exp) =>
                `- **${exp.company}** (${exp.period}) : ${exp.role}\n  ${exp.description}`
        ).join("\n\n")}
`;
