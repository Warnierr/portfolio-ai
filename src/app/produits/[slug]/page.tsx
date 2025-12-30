import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import { products, getProductBySlug } from "@/data/products";

export function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const statusColors = {
        concept: "bg-zinc-500/20 text-zinc-300",
        "en-dev": "bg-yellow-500/20 text-yellow-300",
        beta: "bg-blue-500/20 text-blue-300",
        live: "bg-emerald-500/20 text-emerald-300",
    };

    const statusLabels = {
        concept: "Concept",
        "en-dev": "En développement",
        beta: "Beta",
        live: "Disponible",
    };

    return (
        <PageContainer className="gap-8">
            {/* Header */}
            <section className="glass-panel p-8">
                <Link
                    href="/services"
                    className="text-sm text-zinc-500 hover:text-white transition mb-4 inline-block"
                >
                    ← Retour aux services
                </Link>

                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-4xl">{product.icon}</span>
                            <span className={`text-xs px-2 py-1 rounded ${statusColors[product.status]}`}>
                                {statusLabels[product.status]}
                            </span>
                            <span className="text-xs text-zinc-500">ETA: {product.eta}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white">{product.name}</h1>
                        <p className={`text-lg text-${product.color}-400 mt-1`}>{product.tagline}</p>
                    </div>

                    {product.demoUrl ? (
                        <a
                            href={product.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`rounded-full bg-${product.color}-500 text-white border border-${product.color}-400 px-6 py-3 text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-${product.color}-600 transition flex items-center gap-2`}
                        >
                            <span>🔴</span> Live Demo
                        </a>
                    ) : (
                        <Link
                            href="/contact"
                            className={`rounded-full bg-${product.color}-500/20 border border-${product.color}-500/30 px-6 py-3 text-sm font-medium text-${product.color}-300 hover:bg-${product.color}-500/30 transition`}
                        >
                            🔔 M&apos;informer du lancement
                        </Link>
                    )}
                </div>
            </section>

            {/* Section 1: Pain Points */}
            <section className="glass-panel p-8">
                <h2 className="text-xl font-bold text-white mb-2">📊 Analyse des Pain Points</h2>
                <p className="text-zinc-400 mb-6">{product.painPoints.title}</p>

                <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-3">Tendances 2025-2026</h3>
                    <div className="grid gap-2 md:grid-cols-2">
                        {product.painPoints.trends.map((trend, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                                <span className="text-emerald-400">📈</span>
                                {trend}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-3">Problèmes identifiés</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {product.painPoints.problems.map((problem, i) => (
                            <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-4">
                                <h4 className="font-medium text-white mb-1">{problem.title}</h4>
                                <p className="text-sm text-zinc-400">{problem.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 2: MVP */}
            <section className="glass-panel p-8">
                <h2 className="text-xl font-bold text-white mb-2">🎯 MVP & Features Core</h2>
                <p className="text-zinc-400 mb-6">{product.mvp.description}</p>

                <div className="bg-white/5 rounded-lg p-4 mb-6 border-l-4 border-emerald-500">
                    <p className="text-sm text-zinc-300 italic">"{product.mvp.userStory}"</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-emerald-400 mb-3">Features MVP (V1)</h3>
                        <ul className="space-y-2">
                            {product.mvp.coreFeatures.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                                    <span className="text-emerald-400 mt-0.5">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-3">Features Futures (V2+)</h3>
                        <ul className="space-y-2">
                            {product.mvp.futureFeatures.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-zinc-500">
                                    <span className="mt-0.5">○</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 3: Stack Technique */}
            <section className="glass-panel p-8">
                <h2 className="text-xl font-bold text-white mb-6">🛠️ Stack Technique & Architecture</h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(product.stack).map(([category, items]) => (
                        <div key={category} className="rounded-lg border border-white/10 bg-white/5 p-4">
                            <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {items.map((item, i) => (
                                    <span key={i} className="text-xs bg-white/10 text-zinc-300 px-2 py-1 rounded">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 4: Pricing */}
            <section className="glass-panel p-8">
                <h2 className="text-xl font-bold text-white mb-2">💰 Modèle Économique & Pricing</h2>
                <p className="text-zinc-400 mb-6">{product.pricing.model}</p>

                <div className="grid gap-4 md:grid-cols-3 mb-6">
                    {product.pricing.plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`rounded-xl border p-5 ${plan.recommended
                                ? `border-${product.color}-500/50 bg-${product.color}-500/10`
                                : "border-white/10 bg-white/5"
                                }`}
                        >
                            {plan.recommended && (
                                <span className={`text-xs bg-${product.color}-500/30 text-${product.color}-300 px-2 py-0.5 rounded mb-2 inline-block`}>
                                    Recommandé
                                </span>
                            )}
                            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                            <p className={`text-2xl font-bold text-${product.color}-400 mb-3`}>{plan.price}</p>
                            <ul className="space-y-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="text-sm text-zinc-400 flex items-start gap-2">
                                        <span className="text-emerald-400">✓</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="text-center text-sm text-zinc-500">
                    <span className="bg-white/5 px-3 py-1 rounded">Objectif : {product.pricing.objective}</span>
                </div>
            </section>

            {/* Section 5: Validation */}
            <section className="glass-panel p-8">
                <h2 className="text-xl font-bold text-white mb-6">🔬 Plan de Validation Marché</h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-3">Persona Cible</h3>
                        <p className="text-zinc-300 bg-white/5 p-3 rounded">{product.validation.targetPersona}</p>
                    </div>

                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-3">Métriques de Succès</h3>
                        <ul className="space-y-1">
                            {product.validation.successMetrics.map((metric, i) => (
                                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                                    <span className="text-emerald-400">🎯</span>
                                    {metric}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-3">Questions d'Interview</h3>
                        <ol className="space-y-2">
                            {product.validation.interviewQuestions.map((question, i) => (
                                <li key={i} className="text-sm text-zinc-400">
                                    <span className="text-zinc-500">{i + 1}.</span> {question}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-3">Canaux de Prospection</h3>
                        <ul className="space-y-1">
                            {product.validation.channels.map((channel, i) => (
                                <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                                    <span className="text-blue-400">📢</span>
                                    {channel}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="glass-panel p-8 text-center">
                <h2 className="text-xl font-bold text-white">Intéressé par ce projet ?</h2>
                <p className="mt-2 text-zinc-400">
                    Inscrivez-vous pour être informé du lancement ou proposez-vous comme beta testeur.
                </p>
                <div className="mt-4 flex justify-center gap-4">
                    <Link
                        href="/contact"
                        className="rounded-full bg-white px-6 py-3 font-medium text-black hover:bg-zinc-200 transition"
                    >
                        Devenir beta testeur
                    </Link>
                    <Link
                        href="/services"
                        className="rounded-full border border-white/20 px-6 py-3 font-medium text-white hover:bg-white/5 transition"
                    >
                        Voir tous les produits
                    </Link>
                </div>
            </section>
        </PageContainer>
    );
}
