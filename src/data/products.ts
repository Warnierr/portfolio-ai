/**
 * Produits Micro-SaaS en développement — Raouf Warnier
 * Ces ébauches seront complétées une fois les projets réalisés
 */

export type Product = {
    slug: string;
    name: string;
    tagline: string;
    status: "concept" | "en-dev" | "beta" | "live";
    eta: string;
    icon: string;
    color: string;
    demoUrl?: string;
    githubUrl?: string;

    // Sections détaillées
    painPoints: {
        title: string;
        trends: string[];
        problems: {
            title: string;
            description: string;
        }[];
    };

    mvp: {
        description: string;
        coreFeatures: string[];
        futureFeatures: string[];
        userStory: string;
    };

    stack: {
        frontend: string[];
        backend: string[];
        database: string[];
        apis: string[];
        deploy: string[];
    };

    pricing: {
        model: string;
        plans: {
            name: string;
            price: string;
            features: string[];
            recommended?: boolean;
        }[];
        objective: string;
    };

    validation: {
        targetPersona: string;
        interviewQuestions: string[];
        channels: string[];
        successMetrics: string[];
    };
};

export const products: Product[] = [
    {
        slug: "budget-ai",
        name: "Budget AI",
        tagline: "Assistant Financier Intelligent",
        status: "live",
        eta: "Disponible",
        icon: "💰",
        color: "emerald",
        demoUrl: "https://budget.kenshu.dev",

        painPoints: {
            title: "Pourquoi la gestion financière personnelle est cassée",
            trends: [
                "Les jeunes actifs ont plusieurs comptes et abonnements",
                "L'inflation rend la gestion du 'Reste à Vivre' critique",
                "Les apps bancaires sont passives et regardent le passé",
                "Besoin de conseils personnalisés, pas juste de graphiques",
            ],
            problems: [
                {
                    title: "Manque de visibilité future",
                    description: "Savoir combien j'ai dépensé est utile, savoir si je pourrai payer mon loyer le 30 est vital. Les banques ne font pas de projection.",
                },
                {
                    title: "Abonnements oubliés",
                    description: "Netflix, Spotify, Gym... On perd en moyenne 300€/an dans des abonnements qu'on n'utilise plus.",
                },
                {
                    title: "Saisie manuelle fastidieuse",
                    description: "Les fichiers Excel demandent trop d'efforts. L'automatisation est la seule voie pour une adoption long terme.",
                },
            ],
        },

        mvp: {
            description: "Assistant personnel intelligent qui transforme des lignes de dépenses brutes en conseils stratégiques via une interface conversationnelle.",
            coreFeatures: [
                "Connexion CSV (bientôt bancaire directe)",
                "Catégorisation automatique par IA locale/cloud",
                "Projection de solde fin de mois (Reste à Vivre)",
                "Chat avec ses finances ('Combien de Uber ce mois-ci ?')",
                "Détection d'abonnements récurrents",
            ],
            futureFeatures: [
                "Mode Multi-Workspace (Pro/Perso)",
                "App Mobile native",
                "Alertes intelligentes en temps réel",
                "Optimisation fiscale automatique",
            ],
            userStory: "En tant qu'utilisateur, je veux savoir immédiatement combien je peux dépenser ce week-end sans me mettre dans le rouge à la fin du mois.",
        },

        stack: {
            frontend: ["Next.js 14", "TailwindCSS", "Framer Motion", "Shadcn/UI"],
            backend: ["Next.js API Routes", "Prisma", "Server-Sent Events"],
            database: ["PostgreSQL (Neon)", "Redis (Rate limiting)"],
            apis: ["OpenRouter (Claude 3.5, GPT-4)", "GoCardless (Future)"],
            deploy: ["Vercel", "Neon Tech"],
        },

        pricing: {
            model: "Freemium + Premium",
            plans: [
                {
                    name: "Gratuit",
                    price: "0€",
                    features: ["Import CSV illimité", "Dashboard basique", "Chat IA limité (10 msg/jour)"],
                },
                {
                    name: "Premium",
                    price: "9.99€/mois",
                    features: ["Connexion Bancaire Auto", "Chat IA illimité", "Projections futures", "Support prioritaire"],
                    recommended: true,
                },
            ],
            objective: "Acquisition utilisateur via le modèle gratuit pour upsell sur la connexion auto.",
        },

        validation: {
            targetPersona: "Jeunes actifs et freelances soucieux d'optimiser leur épargne",
            interviewQuestions: [
                "Utilisez-vous une app de budget ? Pourquoi avez-vous arrêté la précédente ?",
                "Quelle est votre plus grande angoisse financière mensuelle ?",
                "Seriez-vous prêt à payer pour ne plus faire de saisie manuelle ?",
            ],
            channels: [
                "Twitter/X Finance",
                "Communautés FIRE (Financial Independence)",
                "Linkedin",
            ],
            successMetrics: [
                "Temps passés sur l'app > 5min/session",
                "Taux de rétention S+4 > 40%",
                "Conversion Premium > 5%",
            ],
        },
    },

    {
        slug: "ai-act-auditor",
        name: "AI Act Auditor",
        tagline: "Audit your AI for EU Compliance",
        status: "live",
        eta: "Disponible",
        icon: "⚖️",
        color: "purple",
        demoUrl: "https://aiact.kenshu.dev",
        githubUrl: "https://github.com/Warnierr/AI-Act-Auditor",

        painPoints: {
            title: "Pourquoi la conformité AI Act est un défi majeur pour les entreprises",
            trends: [
                "AI Act applicable dès août 2024, obligations pleines en 2026",
                "Amendes jusqu'à 35M€ ou 7% du CA mondial pour non-conformité",
                "80% des PME ignorent si leurs systèmes sont \"high-risk\"",
                "Pénurie de compétences juridiques + techniques sur l'AI Act",
            ],
            problems: [
                {
                    title: "Classification complexe et floue",
                    description: "Difficile de savoir si un système IA entre dans le champ de l'AI Act, s'il est \"high-risk\", GPAI Provider ou Deployer. Le texte est dense et technique.",
                },
                {
                    title: "Manque de compétences internes",
                    description: "Les équipes produit ne maîtrisent pas le vocabulaire réglementaire. Les juristes ne comprennent pas les systèmes IA. Besoin d'un pont entre les deux mondes.",
                },
                {
                    title: "Risque de non-conformité en 2026",
                    description: "Sans préparation structurée, les entreprises risquent des sanctions lourdes. La documentation, la gouvernance et les audits doivent être mis en place DÈS MAINTENANT.",
                },
                {
                    title: "Audit manuel chronophage et coûteux",
                    description: "Faire appel à un cabinet de conseil coûte entre 10K€ et 50K€. Les petites structures n'ont ni le budget ni le temps pour un audit complet.",
                },
            ],
        },

        mvp: {
            description: "Outil d'auto-audit interactif qui guide les équipes produit, juridique et data engineering à travers un questionnaire intelligent pour déterminer le niveau de risque de leurs systèmes IA et générer un rapport de conformité exploitable.",
            coreFeatures: [
                "Questionnaire dynamique multi-étapes (use case, données, secteur)",
                "Classification automatique par niveau de risque (Prohibited, High, Limited, Minimal)",
                "Checklist d'obligations par rôle (Provider / Deployer / GPAI)",
                "Rapport PDF/Markdown avec synthèse exécutive et recommandations",
                "Dashboard de suivi multi-systèmes (pour les organisations avec plusieurs produits IA)",
                "Bibliothèque de ressources (articles, templates documentation)",
            ],
            futureFeatures: [
                "Mode collaboratif (équipe Product + Legal + Data)",
                "Suivi des évolutions réglementaires (changements AI Act & GPAI)",
                "Intégration Slack/Teams pour notifications",
                "Templates de documentation technique (data sheets, risk assessment)",
                "API pour intégration CI/CD (audit automatique à chaque release)",
            ],
            userStory: "En tant que Product Manager d'une startup SaaS utilisant de l'IA générative, je veux savoir rapidement si mon produit est soumis à l'AI Act, quelles obligations s'appliquent et comment préparer ma conformité sans engager un cabinet à 30K€.",
        },

        stack: {
            frontend: ["Next.js 15", "React", "TailwindCSS", "Shadcn/UI", "Framer Motion"],
            backend: ["Next.js API Routes", "FastAPI (Python)", "Prisma ORM"],
            database: ["PostgreSQL (Neon)", "Redis (cache règles AI Act)"],
            apis: ["OpenRouter (Claude 3.5 Sonnet pour analyse)", "Resend (notifications email)", "Stripe (billing)"],
            deploy: ["Vercel (frontend)", "Railway (backend API optionnel)"],
        },

        pricing: {
            model: "SaaS mensuel par système IA audité + niveau d'accompagnement",
            plans: [
                {
                    name: "Starter",
                    price: "0€",
                    features: ["1 système IA", "Questionnaire complet", "Rapport basique PDF", "Accès bibliothèque ressources"],
                },
                {
                    name: "Professional",
                    price: "49€/mois",
                    features: ["5 systèmes IA", "Rapports détaillés avec recommandations", "Dashboard de suivi", "Templates documentation", "Support prioritaire"],
                    recommended: true,
                },
                {
                    name: "Enterprise",
                    price: "249€/mois",
                    features: ["Systèmes illimités", "Mode collaboratif (équipes)", "Audit automatique CI/CD", "Accompagnement personnalisé", "Formation équipe", "API access"],
                },
            ],
            objective: "Acquisition via plan gratuit, conversion sur Professional (Product Managers, startups IA), upsell Enterprise (scale-ups, PME avec plusieurs produits IA)",
        },

        validation: {
            targetPersona: "Product Managers, CTOs, DPOs et responsables juridiques de startups/PME qui déploient des systèmes IA et doivent se conformer à l'AI Act",
            interviewQuestions: [
                "Savez-vous si vos systèmes IA sont concernés par l'AI Act ?",
                "Avez-vous déjà réalisé un audit de conformité AI Act ? À quel coût ?",
                "Quelle est votre principale difficulté pour comprendre les obligations AI Act ?",
                "Combien de temps passez-vous par mois sur les sujets de conformité IA/RGPD ?",
                "Utilisez-vous des outils pour gérer votre conformité réglementaire ?",
            ],
            channels: [
                "LinkedIn (AI Engineering, Legal Tech, Data/AI communities)",
                "Product Hunt launch",
                "Communautés startups IA (France Digitale, Station F)",
                "Partenariats cabinets d'avocats tech",
                "Conférences AI/Data (ODSC, DataConnect)",
            ],
            successMetrics: [
                "100 audits gratuits réalisés (validation use case)",
                "Taux de complétion questionnaire > 60%",
                "15% conversion Starter → Professional",
                "NPS > 40",
            ],
        },
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}
