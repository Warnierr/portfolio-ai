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
        slug: "invoice-ai",
        name: "Invoice AI",
        tagline: "Catégorisation automatique de factures pour freelances et TPE",
        status: "en-dev",
        eta: "Q1 2025",
        icon: "🧾",
        color: "purple",

        painPoints: {
            title: "Pourquoi la gestion des factures est un cauchemar pour les indépendants",
            trends: [
                "Facturation électronique obligatoire en France dès septembre 2026 (réception)",
                "Émission obligatoire pour TPE/PME à partir de septembre 2027",
                "4M+ de freelances et micro-entrepreneurs en France",
                "26% des PME utilisent déjà l'IA pour leurs processus (doublé en 1 an)",
            ],
            problems: [
                {
                    title: "Obligation légale imminente",
                    description: "La réforme de la facturation électronique impose des formats structurés (Factur-X, UBL). Les entreprises doivent se préparer MAINTENANT.",
                },
                {
                    title: "Saisie manuelle chronophage",
                    description: "Chaque facture doit être catégorisée (type de charge, TVA, fournisseur). Les comptables passent 30-50% de leur temps sur de la saisie.",
                },
                {
                    title: "Erreurs de catégorisation",
                    description: "Mauvaise catégorisation = erreurs comptables = risques fiscaux. Et corriger après coup prend encore plus de temps.",
                },
                {
                    title: "Manque de visibilité en temps réel",
                    description: "Sans catégorisation automatique, impossible de savoir en temps réel 'combien j'ai dépensé en marketing ce mois-ci ?'.",
                },
            ],
        },

        mvp: {
            description: "Application qui catégorise automatiquement vos factures grâce à l'IA, avec export compatible comptabilité française.",
            coreFeatures: [
                "Upload drag & drop de PDF/images",
                "OCR intelligent (extraction texte)",
                "Catégorisation IA avec suggestions (Claude)",
                "Validation rapide (1 clic pour confirmer)",
                "Dashboard dépenses par catégorie et mois",
                "Export CSV compatible Pennylane/Indy",
            ],
            futureFeatures: [
                "Forwarding email (envoyer factures par mail)",
                "Connexion bancaire pour rapprochement",
                "Génération Factur-X automatique",
                "Rappels paiement fournisseurs",
            ],
            userStory: "En tant que freelance, je veux uploader mes factures et voir instantanément dans quelle catégorie elles tombent, sans saisie manuelle.",
        },

        stack: {
            frontend: ["Next.js 14", "TailwindCSS", "React Dropzone"],
            backend: ["Next.js API Routes", "Python (OCR processing)"],
            database: ["PostgreSQL (Supabase)", "Supabase Storage (factures)"],
            apis: ["Tesseract.js ou Google Cloud Vision (OCR)", "Claude API (catégorisation)", "SendGrid (emails)"],
            deploy: ["Vercel", "Supabase"],
        },

        pricing: {
            model: "SaaS mensuel par volume de factures",
            plans: [
                {
                    name: "Solo",
                    price: "9€/mois",
                    features: ["30 factures/mois", "Export CSV", "Dashboard basique", "1 utilisateur"],
                },
                {
                    name: "Pro",
                    price: "29€/mois",
                    features: ["150 factures/mois", "Catégories personnalisées", "Statistiques avancées", "Support prioritaire"],
                    recommended: true,
                },
                {
                    name: "Cabinet",
                    price: "99€/mois",
                    features: ["500 factures/mois", "Multi-clients", "API access", "Marque blanche"],
                },
            ],
            objective: "200 Solo + 50 Pro = 3.2K€ MRR",
        },

        validation: {
            targetPersona: "Freelance ou micro-entrepreneur qui gère sa comptabilité lui-même",
            interviewQuestions: [
                "Comment gérez-vous vos factures fournisseurs aujourd'hui ?",
                "Combien de temps passez-vous par mois à catégoriser vos dépenses ?",
                "Êtes-vous au courant de la facturation électronique obligatoire 2026 ?",
                "Utilisez-vous un logiciel de compta ? Lequel ? Ce qui vous manque ?",
            ],
            channels: [
                "Groupes Facebook freelances (La Communauté des Indépendants)",
                "Forums auto-entrepreneurs",
                "LinkedIn : comptables indépendants",
                "Partenariats experts-comptables",
            ],
            successMetrics: [
                "15 interviews freelances",
                "Landing page avec 200 emails",
                "10 beta testeurs actifs",
            ],
        },
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}
