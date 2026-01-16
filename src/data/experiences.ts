export interface Experience {
    company: string;
    role: string;
    period: string;
    achievements: string[];
    aiContext: {
        situation: string;
        approach: string;
        technical: string;
        lessons: string;
    };
}

export const experiences: Experience[] = [
    {
        company: "BNP Paribas",
        role: "Lead Data Engineer Big Data",
        period: "2023 — Présent",
        achievements: [
            "Architecture de pipelines ETL traitant 50TB+ de données bancaires",
            "Migration legacy vers architecture moderne Hadoop/Spark",
            "Optimisation des temps de traitement de -40%",
        ],
        aiContext: {
            situation: "L'infrastructure existante peinait à traiter les volumes croissants de données réglementaires (compliance), causant des retards de reporting critiques.",
            approach: "J'ai d'abord cartographié les goulots d'étranglement. Au lieu de tout réécrire, j'ai implémenté une couche de 'Bronze/Silver/Gold' data lake pour paralléliser les traitements.",
            technical: "Scala, Apache Spark, Hadoop HDFS, Kafka pour l'ingestion temps réel. Orchestration via Airflow.",
            lessons: "La migration technique est facile, la gestion du changement auprès des équipes data analysts est le vrai défi.",
        },
    },
    {
        company: "Orange",
        role: "DevOps / Big Data Engineer",
        period: "2021 — 2023",
        achievements: [
            "Automatisation complète de l'infrastructure Big Data (Ansible)",
            "Mise en place de monitoring proactif (Grafana/Prometheus)",
            "Réduction des incidents de production de 60%",
        ],
        aiContext: {
            situation: "Le déploiement des environnements de test prenait 3 semaines manuellement, ralentissant drastiquement les cycles de release.",
            approach: "J'ai introduit l'Infrastructure as Code. J'ai 'dockerisé' les composants non-stateful et écrit des playbooks Ansible pour le reste.",
            technical: "Ansible, Terraform, Docker, Jenkins CI/CD, Grafana stack.",
            lessons: "L'automatisation ne sert pas qu'à aller vite, elle sert surtout à documenter l'infrastructure de manière exécutable.",
        },
    },
    {
        company: "Safran",
        role: "IoT Data Engineer",
        period: "2020 — 2021",
        achievements: [
            "Collecte de données capteurs industriels en temps réel",
            "Tableaux de bord prédictifs pour la maintenance",
            "Interface ThingWorx pour les opérateurs",
        ],
        aiContext: {
            situation: "Les données des machines-outils étaient silotées et inaccessibles pour la maintenance prédictive.",
            approach: "Mise en place d'un connecteur universel OPC-UA vers une base TimeSeries centrale.",
            technical: "ThingWorx, Java, InfluxDB, MQTT Protocol.",
            lessons: "Dans l'industrie, la fiabilité de la donnée capteur prime sur la complexité de l'algorithme.",
        },
    },
    {
        company: "ACC (Automotive Cells Co)",
        role: "Data Engineer Industrie 4.0",
        period: "2019 — 2020",
        achievements: [
            "Traçabilité complète de la production de batteries",
            "Intégration ERP/MES pour la chaîne logistique",
        ],
        aiContext: {
            situation: "Nécessité de tracer chaque composant de batterie pour les normes automobiles strictes, sans système centralisé.",
            approach: "Design d'une architecture événementielle où chaque étape de production publie son statut.",
            technical: "Azure Data Factory, SQL Server, Python scripting.",
            lessons: "Une architecture simple et bien documentée vaut mieux qu'une usine à gaz 'cutting edge' impossible à maintenir.",
        },
    },
];

export const products = [
    {
        name: "Budget AI",
        tagline: "Assistant financier personnel intelligent",
        url: "https://budget-ai.kenshu.dev", // Simulation lien direct
        internalLink: "/projets/budget-ai",
        icon: "💰"
    },
    {
        name: "AI Compliance",
        tagline: "Audit RGPD & AI Act automatisé",
        url: "https://aiact.kenshu.dev", // Simulation lien direct
        internalLink: "/projets/ai-compliance-audit-tool",
        icon: "🛡️"
    }
];
