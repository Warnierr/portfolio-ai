import Link from "next/link";
import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Services Data Engineering & IA | Kenshu",
  description: "Missions freelance, projets sur-mesure et produits IA. Data Engineering, DevOps, automatisation et applications SaaS. TJM 450€.",
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
        description: "J'interviens en renfort d'équipes data sur des missions de 3 mois à 1 an. Pipelines Big Data, infrastructure DevOps, migrations de données.",
        features: [
            "Pipelines ETL/ELT (Spark, Airflow, dbt)",
            "Infrastructure DevOps (Ansible, Docker, CI/CD)",
            "Migrations de données (PostgreSQL, MSSQL)",
            "Architecture Data Lake / Data Warehouse",
        ],
        pricing: "TJM 450€",
        cta: "Discuter d'une mission",
        color: "emerald",
    },
    {
        id: "projets",
        title: "Projets Sur Mesure",
        subtitle: "Sites Web & Automatisation",
        description: "Je développe des solutions clé en main pour les PME et entrepreneurs : sites vitrines, e-commerce, automatisation des processus métier.",
        features: [
            "Sites web modernes (Next.js, React)",
            "E-commerce et paiements en ligne",
            "Automatisation n8n / Make / Zapier",
            "Chatbots et agents IA",
        ],
        pricing: "À partir de 2 000€",
        cta: "Demander un devis",
        color: "blue",
    },
    {
        id: "produits",
        title: "Produits IA",
        subtitle: "Solutions SaaS",
        description: "Je développe des micro-SaaS pour résoudre des problèmes concrets. Applications complètes et scalables.",
        features: [
            "Budget AI — Assistant Financier Personnel",
            "Invoice AI — Catégorisation de factures",
            "Solutions sur-mesure pour startups",
        ],
        pricing: "En ligne",
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
    },
    {
        slug: "invoice-ai",
        name: "Invoice AI",
        tagline: "Catégorisation automatique de factures",
        problem: "Uploadez vos factures, l'IA les catégorise. Préparez-vous à la facturation électronique obligatoire 2026 sans effort.",
        status: "En développement",
        eta: "Q1 2025",
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
                            <span className={`text-xs uppercase tracking-widest text-${service.color}-400`}>
                                {service.subtitle}
                            </span>
                            <h2 className="mt-1 text-xl font-bold text-white">{service.title}</h2>
                        </div>

                        <p className="text-sm text-zinc-400 mb-4">{service.description}</p>

                        <ul className="space-y-2 mb-6 flex-1">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-zinc-300">
                                    <span className="text-emerald-400 mt-0.5">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-auto pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between">
                                <span className={`font-bold text-${service.color}-400`}>{service.pricing}</span>
                                <Link
                                    href="/contact"
                                    className="text-sm text-zinc-400 hover:text-white transition underline underline-offset-4"
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
                    <span className="text-xs uppercase tracking-widest text-purple-400">Produits en développement</span>
                    <h2 className="mt-2 text-2xl font-bold text-white">Micro-SaaS à venir</h2>
                    <p className="mt-2 text-zinc-400">
                        Des outils focalisés sur un problème précis. Inscrivez-vous pour être informé du lancement.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {products.map((product) => (
                        <Link
                            key={product.slug}
                            href={`/produits/${product.slug}`}
                            className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-purple-500/30 hover:bg-purple-500/5 transition group"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                                    {product.status}
                                </span>
                                <span className="text-xs text-zinc-500">{product.eta}</span>
                            </div>
                            <h3 className="font-bold text-white group-hover:text-purple-200">{product.name}</h3>
                            <p className="text-sm text-emerald-400 mb-2">{product.tagline}</p>
                            <p className="text-sm text-zinc-400 mb-3">{product.problem}</p>
                            <span className="text-xs text-purple-400 group-hover:underline">Voir détails →</span>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/30 px-6 py-3 text-sm font-medium text-purple-300 hover:bg-purple-500/30 transition"
                    >
                        <span>🔔</span> M'informer du lancement
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className="glass-panel p-8 text-center">
                <h2 className="text-2xl font-bold text-white">Besoin d'autre chose ?</h2>
                <p className="mt-2 text-zinc-400 max-w-xl mx-auto">
                    Chaque projet est unique. Contactez-moi pour discuter de vos besoins spécifiques.
                </p>
                <Link
                    href="/contact"
                    className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-medium text-black hover:bg-zinc-200 transition"
                >
                    Prendre rendez-vous
                </Link>
            </section>
        </PageContainer>
    );
}
