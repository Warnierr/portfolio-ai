import Link from "next/link";
import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import ContentToggle from "@/components/ContentToggle";

export const metadata: Metadata = {
    title: "Services Data Engineering & IA | Kenshu",
    description: "Missions freelance, projets sur-mesure et produits IA. Data Engineering, DevOps, automatisation et applications SaaS.",
    alternates: {
        canonical: "/services",
    },
    openGraph: {
        title: "Services Data Engineering & IA | Kenshu",
        description: "Missions freelance, projets sur-mesure et produits IA. Data Engineering, DevOps, automatisation et applications SaaS.",
        url: "https://kenshu.dev/services",
    },
};

const services = [
    {
        id: "freelance",
        title: "Missions Freelance",
        subtitle: "Data Engineering & DevOps",
        businessContent: {
            benefits: [
                "Vos données deviennent fiables et exploitables en production",
                "Réduction des coûts d'infrastructure jusqu'à 75%",
                "Équipes renforcées sans recrutement long et coûteux",
                "Transfert de compétences et autonomie progressive",
            ],
        },
        technicalContent: {
            description: "Intervention en renfort sur des missions de 3 mois à 1 an pour industrialiser vos pipelines data.",
            features: [
                "Pipelines ETL/ELT (Spark, Airflow, dbt)",
                "Infrastructure DevOps (Ansible, Docker, CI/CD)",
                "Migrations de données (PostgreSQL, MSSQL)",
                "Architecture Data Lake / Data Warehouse",
            ],
        },
        pricing: "Sur devis",
        cta: "Discuter d'une mission",
        color: "emerald",
    },
    {
        id: "projets",
        title: "Projets Sur Mesure",
        subtitle: "Sites Web & Automatisation",
        businessContent: {
            benefits: [
                "Votre site ou app en ligne en 4 semaines maximum",
                "Design moderne et professionnel qui inspire confiance",
                "Paiements sécurisés et automatisation des tâches répétitives",
                "Formation incluse : vous restez maître de votre outil",
            ],
        },
        technicalContent: {
            description: "Solutions clé en main pour PME et entrepreneurs : sites vitrines, e-commerce, automatisation.",
            features: [
                "Sites web modernes (Next.js, React, Tailwind)",
                "E-commerce et paiements (Stripe, PayPal)",
                "Automatisation (n8n, Make, Zapier)",
                "Chatbots et agents IA conversationnels",
            ],
        },
        pricing: "Sur devis",
        cta: "Demander un devis",
        color: "blue",
    },
    {
        id: "produits",
        title: "Produits IA",
        subtitle: "Solutions SaaS",
        businessContent: {
            benefits: [
                "Votre idée devient un produit fonctionnel et scalable",
                "Hébergement géré : vous ne gérez pas l'infrastructure",
                "Maintenance et évolutions comprises dans l'abonnement",
                "Déploiement rapide et itérations basées sur vos retours",
            ],
        },
        technicalContent: {
            description: "Développement de micro-SaaS pour résoudre des problèmes concrets avec l'IA.",
            features: [
                "Architecture serverless (Next.js, Vercel)",
                "APIs LLM (OpenRouter, OpenAI, Anthropic)",
                "Base de données managée (PostgreSQL, Prisma)",
                "CI/CD automatisé et monitoring intégré",
            ],
        },
        pricing: "Sur devis",
        cta: "Voir les produits",
        color: "purple",
    },
];

const products = [
    {
        slug: "budget-ai",
        name: "Budget AI",
        tagline: "Assistant Financier Intelligent",
        problem: "Transformez vos lignes de dépenses en conseils stratégiques. Prédictions de solde, détection d'abonnements et coaching IA en temps réel.",
        status: "Live Demo",
        eta: "Disponible",
        externalLink: null,
    },
    {
        slug: "ai-act-auditor",
        name: "AI Act Audit",
        tagline: "Audit de conformité AI Act",
        problem: "Questionnaire interactif pour classifier vos systèmes IA, identifier vos obligations et générer un rapport de conformité AI Act exploitable.",
        status: "Beta publique",
        eta: "Disponible",
        externalLink: null,
    },
];

export default function ServicesPage() {
    return (
        <PageContainer className="gap-12">
            <SectionTitle
                eyebrow="Services"
                title="Ce que je peux faire pour vous"
                subtitle="Trois façons de travailler ensemble selon vos besoins"
            />

            {/* Services Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="glass-panel p-6 flex flex-col h-full"
                    >
                        <div className="mb-4">
                            <span className={`text-xs uppercase tracking-widest text-${service.color}-400 font-bold`}>
                                {service.subtitle}
                            </span>
                            <h2 className="mt-1 text-xl font-bold text-[var(--text-primary)]">{service.title}</h2>
                        </div>

                        <div className="flex-1">
                            <ContentToggle
                                businessContent={
                                    <div className="space-y-3">
                                        {service.businessContent.benefits.map((benefit, idx) => (
                                            <div key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                <span className="text-emerald-500 mt-0.5 font-bold">✓</span>
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                }
                                technicalContent={
                                    <div>
                                        <p className="text-sm text-[var(--text-muted)] mb-4">{service.technicalContent.description}</p>
                                        <ul className="space-y-2">
                                            {service.technicalContent.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                    <span className="text-blue-500 mt-0.5">•</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                }
                            />
                        </div>

                        <div className="mt-auto pt-4 border-t border-[var(--border)]">
                            <div className="flex items-center justify-between">
                                <span className={`font-bold text-${service.color}-500`}>{service.pricing}</span>
                                <Link
                                    href="/contact"
                                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition underline underline-offset-4"
                                >
                                    {service.cta}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Products Section */}
            <section className="glass-panel p-8 md:p-10">
                <div className="mb-8">
                    <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Produits en développement</span>
                    <h2 className="mt-2 text-2xl font-bold text-[var(--text-primary)]">Micro-SaaS à venir</h2>
                    <p className="mt-2 text-[var(--text-secondary)]">
                        Des outils focalisés sur un problème précis. Inscrivez-vous pour être informé du lancement.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            key={product.slug}
                            href={product.externalLink || `/produits/${product.slug}`}
                            target={product.externalLink ? "_blank" : undefined}
                            rel={product.externalLink ? "noopener noreferrer" : undefined}
                            className="rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 hover:border-purple-500/30 transition group shadow-sm hover:shadow-md"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs bg-purple-500/10 text-purple-500 font-medium px-2 py-0.5 rounded border border-purple-500/20">
                                    {product.status}
                                </span>
                                <span className="text-xs text-[var(--text-muted)]">{product.eta}</span>
                            </div>
                            <h3 className="font-bold text-[var(--text-primary)] group-hover:text-purple-500 transition-colors">{product.name}</h3>
                            <p className="text-sm text-emerald-500 font-medium mb-2">{product.tagline}</p>
                            <p className="text-sm text-[var(--text-secondary)] mb-3">{product.problem}</p>
                            <span className="text-xs text-purple-500 font-bold group-hover:underline">
                                {product.externalLink ? "Visiter l'app →" : "Voir détails →"}
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/early-access"
                        className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/30 px-6 py-3 text-sm font-bold text-purple-500 hover:bg-purple-500/20 transition"
                    >
                        <span>🔔</span> M'informer du lancement
                    </Link>
                </div>
            </section>

            {/* FAQ */}
            <section className="glass-panel p-8 md:p-10">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Questions fréquentes</h2>
                <div className="space-y-4">
                    <details className="group rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                        <summary className="cursor-pointer font-semibold text-[var(--text-primary)] text-lg hover:text-emerald-500 transition list-none">
                            Comment fonctionne la tarification ?
                        </summary>
                        <p className="mt-3 text-[var(--text-secondary)]">
                            Chaque projet est unique. Je propose un devis détaillé après un premier échange pour bien comprendre vos besoins.
                            Ce devis inclut l'analyse, le développement, la documentation et le transfert de compétences.
                        </p>
                    </details>

                    <details className="group rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                        <summary className="cursor-pointer font-semibold text-[var(--text-primary)] text-lg hover:text-emerald-500 transition list-none">
                            Quelles technologies utilisez-vous en production ?
                        </summary>
                        <p className="mt-3 text-[var(--text-secondary)]">
                            Stack principale : Apache Spark (Scala, PySpark), Apache Airflow, Python, PostgreSQL/MSSQL, Docker, Ansible, Jenkins/GitLab CI.
                            Pour l'IA : n8n, OpenRouter, RAG, agents LLM. Infrastructure : Proxmox, NAS, Grafana/Prometheus.
                        </p>
                    </details>

                    <details className="group rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                        <summary className="cursor-pointer font-semibold text-[var(--text-primary)] text-lg hover:text-emerald-500 transition list-none">
                            Intervenez-vous en environnement bancaire/réglementé ?
                        </summary>
                        <p className="mt-3 text-[var(--text-secondary)]">
                            Oui, avec contraintes fortes : sécurité, traçabilité, RGPD, séparation des accès.
                            Expérience récente chez BNP Paribas sur flux financiers critiques (migration ETL, debugging pipelines complexes).
                        </p>
                    </details>

                    <details className="group rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                        <summary className="cursor-pointer font-semibold text-[var(--text-primary)] text-lg hover:text-emerald-500 transition list-none">
                            Quelle est la durée typique d'une mission ?
                        </summary>
                        <p className="mt-3 text-[var(--text-secondary)]">
                            Missions freelance : 3 mois minimum (renouvelable). Projets sur-mesure : 1-3 mois selon la complexité.
                            Produits SaaS : développement itératif avec livraisons mensuelles.
                        </p>
                    </details>

                    <details className="group rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] p-6">
                        <summary className="cursor-pointer font-semibold text-[var(--text-primary)] text-lg hover:text-emerald-500 transition list-none">
                            Proposez-vous du remote ou uniquement du présentiel ?
                        </summary>
                        <p className="mt-3 text-[var(--text-secondary)]">
                            Les deux : full remote (France/Europe), hybride ou présentiel (Île-de-France principalement).
                            Flexibilité selon les besoins du projet et les contraintes de sécurité.
                        </p>
                    </details>
                </div>
            </section>

            {/* CTA */}
            <section className="glass-panel p-8 text-center">
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">Besoin d'autre chose ?</h2>
                <p className="mt-2 text-[var(--text-muted)] max-w-xl mx-auto">
                    Chaque projet est unique. Contactez-moi pour discuter de vos besoins spécifiques.
                </p>
                <Link
                    href="/contact"
                    className="mt-6 inline-block rounded-full bg-[var(--text-primary)] px-8 py-3 font-medium text-[var(--bg-primary)] hover:opacity-90 transition shadow-lg"
                >
                    Prendre rendez-vous
                </Link>
            </section>

            {/* Schema.org FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Comment fonctionne la tarification ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Chaque projet est unique. Je propose un devis détaillé après un premier échange pour bien comprendre vos besoins. Ce devis inclut l'analyse, le développement, la documentation et le transfert de compétences."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Quelles technologies utilisez-vous en production ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Stack principale : Apache Spark (Scala, PySpark), Apache Airflow, Python, PostgreSQL/MSSQL, Docker, Ansible, Jenkins/GitLab CI. Pour l'IA : n8n, OpenRouter, RAG, agents LLM. Infrastructure : Proxmox, NAS, Grafana/Prometheus."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Intervenez-vous en environnement bancaire/réglementé ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Oui, avec contraintes fortes : sécurité, traçabilité, RGPD, séparation des accès. Expérience récente chez BNP Paribas sur flux financiers critiques (migration ETL, debugging pipelines complexes)."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Quelle est la durée typique d'une mission ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Missions freelance : 3 mois minimum (renouvelable). Projets sur-mesure : 1-3 mois selon la complexité. Produits SaaS : développement itératif avec livraisons mensuelles."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Proposez-vous du remote ou uniquement du présentiel ?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Les deux : full remote (France/Europe), hybride ou présentiel (Île-de-France principalement). Flexibilité selon les besoins du projet et les contraintes de sécurité."
                                }
                            }
                        ]
                    })
                }}
            />
        </PageContainer>
    );
}
