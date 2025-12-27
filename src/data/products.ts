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
        slug: "pipeline-monitor",
        name: "Pipeline Monitor",
        tagline: "Monitoring unifié pour petites équipes data",
        status: "concept",
        eta: "Q2 2025",
        icon: "📊",
        color: "emerald",

        painPoints: {
            title: "Pourquoi les équipes data ont besoin d'un meilleur monitoring",
            trends: [
                "77% des entreprises considèrent le data engineering comme critique (2024)",
                "Le marché de l'observabilité data croît de 25% par an",
                "80% des initiatives data intégreront DataOps d'ici 2025 (Gartner)",
                "Les solutions existantes coûtent 50-100K€/an",
            ],
            problems: [
                {
                    title: "Complexité croissante des pipelines",
                    description: "Un pipeline moderne implique 5-10 outils (Airflow, dbt, Spark, Fivetran...), multi-cloud, et des centaines de jobs à surveiller. Impossible de tout suivre manuellement.",
                },
                {
                    title: "Coût du downtime data",
                    description: "Quand un pipeline échoue, les équipes métier perdent accès aux données. Décisions retardées, rapports erronés, confiance érodée avec les stakeholders.",
                },
                {
                    title: "Monitoring réactif vs proactif",
                    description: "Les outils actuels signalent les échecs APRÈS qu'ils se produisent. Les équipes veulent prédire les problèmes avant qu'ils n'impactent la prod.",
                },
                {
                    title: "Silos d'observabilité",
                    description: "Chaque outil a son propre dashboard. Pas de vue unifiée 'est-ce que mes données sont saines ?'. Perte de temps à naviguer entre interfaces.",
                },
            ],
        },

        mvp: {
            description: "Dashboard simple qui agrège le statut de vos pipelines Airflow et dbt en un seul endroit, avec alertes intelligentes.",
            coreFeatures: [
                "Connexion OAuth à Airflow et dbt Cloud",
                "Vue consolidée : jobs réussis/échoués, durée moyenne, tendances",
                "Alertes Slack/email sur anomalies (job 3x plus long que d'habitude)",
                "Dashboard 'santé globale' en un coup d'œil",
            ],
            futureFeatures: [
                "Support Prefect, Dagster, Fivetran",
                "Détection d'anomalies par ML",
                "Lineage simplifié",
                "Rapports hebdomadaires automatiques",
            ],
            userStory: "En tant que Data Engineer, je veux voir en 10 secondes si tous mes pipelines sont OK, sans ouvrir 5 onglets différents.",
        },

        stack: {
            frontend: ["Next.js 14", "TailwindCSS", "Tremor (charts)", "React Query"],
            backend: ["Next.js API Routes", "tRPC (optionnel)"],
            database: ["PostgreSQL (Supabase)", "Redis (cache alertes)"],
            apis: ["Airflow REST API", "dbt Cloud API", "Prefect API", "Slack Webhooks"],
            deploy: ["Vercel", "Supabase"],
        },

        pricing: {
            model: "SaaS mensuel par workspace",
            plans: [
                {
                    name: "Starter",
                    price: "29€/mois",
                    features: ["3 connexions", "7 jours d'historique", "Alertes email", "1 utilisateur"],
                },
                {
                    name: "Pro",
                    price: "79€/mois",
                    features: ["10 connexions", "30 jours d'historique", "Alertes Slack + email", "5 utilisateurs", "Export CSV"],
                    recommended: true,
                },
                {
                    name: "Team",
                    price: "199€/mois",
                    features: ["Connexions illimitées", "90 jours d'historique", "SSO", "Utilisateurs illimités", "SLA 99.9%"],
                },
            ],
            objective: "50 clients Pro = 4K€ MRR",
        },

        validation: {
            targetPersona: "Data Engineer dans une équipe de 2-10 personnes, utilisant Airflow ou dbt",
            interviewQuestions: [
                "Comment surveillez-vous vos pipelines aujourd'hui ?",
                "Combien de temps passez-vous en debug/ré-exécution par semaine ?",
                "Avez-vous déjà eu un incident causé par un pipeline silencieusement cassé ?",
                "Quel budget mettez-vous dans l'observabilité actuellement ?",
            ],
            channels: [
                "r/dataengineering (Reddit)",
                "Data Engineering Slack communities",
                "LinkedIn #DataOps",
                "Meetups Data locaux",
            ],
            successMetrics: [
                "10 interviews réalisées",
                "Landing page avec 100 emails collectés",
                "3 design partners pour la beta",
            ],
        },
    },

    {
        slug: "lead-enricher",
        name: "Lead Enricher",
        tagline: "Enrichissez vos prospects automatiquement, en conformité RGPD",
        status: "concept",
        eta: "Q2 2025",
        icon: "🎯",
        color: "blue",

        painPoints: {
            title: "Pourquoi l'enrichissement de leads est un casse-tête pour les PME",
            trends: [
                "25-30% des données B2B deviennent obsolètes chaque année",
                "40% des leads contiennent des données incomplètes ou erronées",
                "Les outils comme Clearbit/Apollo coûtent 200-500€/mois",
                "RGPD et CNIL imposent des règles strictes sur la collecte de données",
            ],
            problems: [
                {
                    title: "Données incomplètes",
                    description: "Un formulaire web ne capture que nom/email. Impossible de qualifier sans connaître le poste, la taille de l'entreprise, le secteur.",
                },
                {
                    title: "Conformité RGPD/CNIL",
                    description: "Collecter des données sur des prospects sans leur consentement est risqué juridiquement. Les PME ne savent pas où est la limite.",
                },
                {
                    title: "Outils chers et complexes",
                    description: "Clearbit, Apollo, ZoomInfo : 200-500€/mois avec des fonctionnalités overkill pour une PME de 10 personnes.",
                },
                {
                    title: "Manque de personnalisation",
                    description: "L'automatisation sans contexte = emails génériques = taux de réponse < 1%. Les commerciaux perdent du temps.",
                },
            ],
        },

        mvp: {
            description: "Outil qui enrichit automatiquement vos leads avec des données publiques, génère un résumé IA, et respecte le RGPD.",
            coreFeatures: [
                "Import CSV ou webhook (formulaire web)",
                "Enrichissement via données publiques (LinkedIn, Google)",
                "Résumé IA du prospect (poste, ancienneté, intérêts)",
                "Score de qualification automatique",
                "Export vers CRM (HubSpot, Pipedrive) ou CSV",
            ],
            futureFeatures: [
                "Intégration directe formulaires (Typeform, Tally)",
                "Séquences email personnalisées auto-générées",
                "Tracking d'engagement",
                "Mode 'compliance audit' pour prouver la conformité",
            ],
            userStory: "En tant que commercial B2B, je veux recevoir mes leads qualifiés avec toutes les infos nécessaires pour personnaliser mon premier appel.",
        },

        stack: {
            frontend: ["Next.js 14", "TailwindCSS", "React Hook Form"],
            backend: ["n8n (self-hosted)", "Python scripts", "Next.js API Routes"],
            database: ["PostgreSQL (Supabase)", "Redis (rate limiting)"],
            apis: ["Google Custom Search API", "Proxycurl (LinkedIn)", "Claude API", "HubSpot API", "Pipedrive API"],
            deploy: ["Railway", "VPS OVH (n8n)"],
        },

        pricing: {
            model: "Crédits mensuels (pay-per-lead)",
            plans: [
                {
                    name: "Starter",
                    price: "19€/mois",
                    features: ["100 enrichissements", "Export CSV", "1 utilisateur"],
                },
                {
                    name: "Growth",
                    price: "49€/mois",
                    features: ["500 enrichissements", "Intégrations CRM", "Résumé IA avancé", "3 utilisateurs"],
                    recommended: true,
                },
                {
                    name: "Scale",
                    price: "149€/mois",
                    features: ["2000 enrichissements", "API access", "Webhook en temps réel", "Utilisateurs illimités"],
                },
            ],
            objective: "100 clients Growth = 5K€ MRR",
        },

        validation: {
            targetPersona: "Commercial B2B ou fondateur de startup en phase de prospection active",
            interviewQuestions: [
                "Combien de leads recevez-vous par mois ? Quel % est vraiment qualifié ?",
                "Combien de temps passez-vous à rechercher des infos avant un appel ?",
                "Utilisez-vous déjà un outil d'enrichissement ? Lequel ? Frustrations ?",
                "Comment gérez-vous la conformité RGPD dans votre prospection ?",
            ],
            channels: [
                "LinkedIn (Sales Navigator users)",
                "Groupes Facebook entrepreneurs/startups",
                "Product Hunt / AppSumo (lancement)",
                "Partenariats avec agences de prospection",
            ],
            successMetrics: [
                "10 interviews commerciaux B2B",
                "50 inscrits waitlist",
                "5 early adopters en test gratuit",
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
