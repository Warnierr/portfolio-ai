"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
    {
        id: "web",
        title: "Création de sites web",
        desc: "Sites vitrines, landing pages, SEO",
        image: "/kits/web-kit.png",
        color: "from-emerald-500/20 to-emerald-900/5",
        accent: "text-emerald-400",
        kenshuMode: false,
        branches: [
            { title: "Landing Page", complexity: "Simple", desc: "Conversion élevée, Design unique" },
            { title: "Site Vitrine", complexity: "Moyen", desc: "Présentation entreprise, CMS" },
            { title: "E-commerce", complexity: "Avancé", desc: "Shopify ou Custom, Paiement" },
            { title: "Plateforme SaaS", complexity: "Avancé", desc: "Dashboard, Auth, Souscription" }
        ]
    },
    {
        id: "app",
        title: "Développement d'apps",
        desc: "MVP, outils internes, produits digitaux",
        image: "/kits/app-kit.png",
        color: "from-blue-500/20 to-blue-900/5",
        accent: "text-blue-400",
        kenshuMode: false,
        branches: [
            { title: "MVP Startup", complexity: "Moyen", desc: "Lancement rapide, features clés" },
            { title: "Outil Interne", complexity: "Moyen", desc: "Gestion stock, RH, Admin" },
            { title: "App Mobile", complexity: "Avancé", desc: "iOS & Android (React Native)" },
            { title: "PWA", complexity: "Moyen", desc: "App web installable" }
        ]
    },
    {
        id: "data",
        title: "Data Engineer / DevOps",
        desc: "Pipelines fiables, grands comptes",
        image: "/kits/data-kit.png",
        color: "from-orange-500/20 to-orange-900/5",
        accent: "text-orange-400",
        kenshuMode: false,
        branches: [
            { title: "Pipeline ETL", complexity: "Moyen", desc: "Airflow, dbt, Snowflake" },
            { title: "Migration Cloud", complexity: "Avancé", desc: "Vers AWS, Azure, GCP" },
            { title: "Audit Infra", complexity: "Simple", desc: "Sécurité, Coûts, Perf" },
            { title: "Déploiement CI/CD", complexity: "Moyen", desc: "GitHub Actions, Docker" }
        ]
    },
    {
        id: "auto",
        title: "Automatisation (n8n)",
        desc: "Exploration & Optimisation de flux",
        image: "/kits/automation-kit.png",
        color: "from-purple-500/20 to-purple-900/5",
        accent: "text-purple-400",
        kenshuMode: true,
        branches: [
            { title: "Workflow CRM", complexity: "Simple", desc: "Synchro emails, leads, Slack" },
            { title: "Contenu IA", complexity: "Simple", desc: "Génération automatique posts/blog" },
            { title: "Facturation", complexity: "Moyen", desc: "Devis, relances automatiques" },
            { title: "Scraping", complexity: "Simple", desc: "Extraction données web" }
        ]
    },
    {
        id: "compliance",
        title: "Audit & Conformité IA",
        desc: "Veille Active & Sécurisation",
        image: "/kits/ai-compliance-kit.png",
        color: "from-red-500/20 to-red-900/5",
        accent: "text-red-400",
        kenshuMode: true,
        branches: [
            { title: "Audit de Conformité", complexity: "Moyen", desc: "Analyse écarts / AI Act" },
            { title: "Sécurisation LLM", complexity: "Moyen", desc: "Guardrails, Prompt Injection" },
            { title: "Gouvernance Data", complexity: "Avancé", desc: "Cartographie, Rôles, Process" },
            { title: "Formation Équipes", complexity: "Simple", desc: "Sensibilisation Risques & Bonnes Pratiques" }
        ]
    },
    {
        id: "rag",
        title: "Intégration d'IA Avancée",
        desc: "RAG, Agents Autonomes, Chatbots",
        image: "/kits/rag-kit.png",
        color: "from-cyan-500/20 to-cyan-900/5",
        accent: "text-cyan-400",
        kenshuMode: true,
        branches: [
            { title: "RAG Documentaire", complexity: "Moyen", desc: "Chattez avec vos PDF, Notion, Docs" },
            { title: "Serveurs MCP", complexity: "Simple", desc: "Connectez Claude Desktop à vos outils" },
            { title: "Chatbots Custom", complexity: "Moyen", desc: "Support client, Assistant interne, RH" },
            { title: "Agents Autonomes", complexity: "Avancé", desc: "Automatisation complexe multi-étapes" }
        ]
    }
];

export default function ServiceExplorer() {
    const [selected, setSelected] = useState(SERVICES[2]); // Data selected by default
    const scrollRef = useRef<HTMLDivElement>(null);
    const [hasAutoScrolled, setHasAutoScrolled] = useState(false);

    // Auto-scroll to center Data Engineer on mobile mount
    useEffect(() => {
        if (!hasAutoScrolled && scrollRef.current) {
            // Index 2 is Data Engineer
            // Card width (160) + gap (12)
            const itemWidth = 160;
            const gap = 12;
            const index = 2;

            // Calculate center position
            const containerWidth = scrollRef.current.clientWidth;
            const scrollPos = ((itemWidth + gap) * index) - (containerWidth / 2) + (itemWidth / 2);

            scrollRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
            setHasAutoScrolled(true);
        }
    }, [hasAutoScrolled]);

    return (
        <div className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl overflow-hidden backdrop-blur-sm relative flex flex-col lg:flex-row min-h-[600px] lg:min-h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* MESSAGE MOBILE (Navigation) */}
            <div className="lg:hidden">
                <div className="px-6 pt-6 pb-2">
                    <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-4">
                        Explorer les expertises
                    </div>
                </div>

                {/* MENU MOBILE HORIZONTAL SCROLLANT - DESIGN COMPACT */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-3 px-6 pb-6 snap-x snap-mandatory no-scrollbar scroll-smooth"
                >
                    {SERVICES.map((s) => (
                        <motion.button
                            key={s.id}
                            onClick={() => setSelected(s)}
                            whileTap={{ scale: 0.98 }}
                            className={`snap-center shrink-0 w-[160px] h-[110px] p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden group ${selected.id === s.id
                                ? `bg-[var(--bg-elevated)] border-[var(--border-strong)] shadow-lg ${s.accent}`
                                : "bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] opacity-80"
                                }`}
                        >
                            {/* Gradient Background subtil si sélectionné */}
                            {selected.id === s.id && (
                                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-20`} />
                            )}

                            {/* Badge Kenshu (R&D) */}
                            {s.kenshuMode && (
                                <div className="absolute top-0 right-0 p-2">
                                    <span className="block w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                </div>
                            )}

                            <div className="relative z-10">
                                {/* Titre */}
                                <h3 className={`text-xs font-bold uppercase tracking-wider text-left leading-tight ${selected.id === s.id ? s.accent : 'group-hover:text-[var(--text-primary)] transition-colors'}`}>
                                    {s.title}
                                </h3>
                            </div>

                            {/* Barre de progression visuelle pour la sélection */}
                            {selected.id === s.id && (
                                <motion.div
                                    layoutId="active-pill-mobile"
                                    className={`h-0.5 w-8 rounded-full bg-current opacity-50 mt-2 self-start`}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* LEFT MENU (DESKTOP ONLY) */}
            <div className="hidden lg:flex lg:col-span-4 lg:w-1/3 border-r border-[var(--border)] p-4 flex-col gap-2 relative z-10 bg-[var(--bg-secondary)]">
                <div className="px-4 py-2 text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                    Domaines d'expertise
                </div>
                {SERVICES.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => setSelected(s)}
                        className={`text-left p-4 rounded-xl transition-all duration-300 border relative overflow-hidden group ${selected.id === s.id
                            ? `bg-[var(--bg-elevated)] border-[var(--border-strong)] ${s.accent}`
                            : "hover:bg-[var(--bg-elevated)] border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-sm tracking-wide uppercase">{s.title}</h3>
                            {s.kenshuMode && (
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                                    Kenshu
                                </span>
                            )}
                        </div>
                        <p className="text-xs opacity-70 mt-1 truncate">{s.desc}</p>
                    </button>
                ))}
            </div>

            {/* RIGHT CONTENT (SHARED) */}
            <div className="relative flex-1 p-6 md:p-10 flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative z-10 h-full flex flex-col"
                    >
                        {/* HERO IMAGE & BG */}
                        <div className={`absolute -inset-10 opacity-20 bg-gradient-to-br ${selected.color} blur-3xl rounded-full pointer-events-none transition-colors duration-700`} />

                        {/* Container Image avec ratio aspect géré proprement */}
                        <div className="relative w-full aspect-video md:h-64 mb-6 md:mb-8 rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl group">
                            <Image
                                src={selected.image}
                                alt={selected.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority={true}
                                unoptimized={true} // Force le chargement direct pour éviter les soucis de cache/optimisation NextJS parfois
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                            {/* Titre sur l'image en mobile pour l'effet Wow */}
                            <div className="absolute bottom-4 left-4 md:hidden">
                                <h2 className={`text-xl font-bold ${selected.accent}`}>{selected.title}</h2>
                                <p className="text-xs text-[var(--text-secondary)]">{selected.desc}</p>
                            </div>

                            {selected.kenshuMode && (
                                <div className="absolute top-4 right-4 bg-[var(--bg-secondary)]/60 backdrop-blur-md border border-[var(--border)] px-3 py-1.5 rounded-full flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]">Mode Kenshu</span>
                                </div>
                            )}
                        </div>

                        <div className="mb-4 flex items-center gap-2 px-1">
                            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest">
                                Possibilités
                            </span>
                            {selected.kenshuMode && (
                                <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-secondary)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                                    R&D
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-y-auto max-h-[400px] md:max-h-none pr-1 custom-scrollbar">
                            {selected.branches.map((branch, i) => {
                                const complexityColors = {
                                    "Simple": "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
                                    "Moyen": "text-amber-400 border-amber-500/30 bg-amber-500/10",
                                    "Avancé": "text-purple-400 border-purple-500/30 bg-purple-500/10"
                                };
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 + 0.2 }}
                                        className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] transition-all group/card cursor-default"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-[var(--text-primary)] text-sm group-hover/card:text-emerald-300 transition-colors">{branch.title}</h4>
                                            <span className={`text-[10px] px-2 py-1 rounded-full border font-semibold whitespace-nowrap ${complexityColors[branch.complexity as keyof typeof complexityColors]}`}>
                                                {branch.complexity}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{branch.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
