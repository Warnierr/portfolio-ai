"use client";
import { useState } from "react";
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
            { title: "Landing Page", time: "3-5 jours", desc: "Conversion élevée, Design unique" },
            { title: "Site Vitrine", time: "1-2 semaines", desc: "Présentation entreprise, CMS" },
            { title: "E-commerce", time: "3-6 semaines", desc: "Shopify ou Custom, Paiement" },
            { title: "Plateforme SaaS", time: "1-3 mois", desc: "Dashboard, Auth, Souscription" }
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
            { title: "MVP Startup", time: "3-6 semaines", desc: "Lancement rapide, features clés" },
            { title: "Outil Interne", time: "2-4 semaines", desc: "Gestion stock, RH, Admin" },
            { title: "App Mobile", time: "1-3 mois", desc: "iOS & Android (React Native)" },
            { title: "PWA", time: "2-4 semaines", desc: "App web installable" }
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
            { title: "Pipeline ETL", time: "1-3 semaines", desc: "Airflow, dbt, Snowflake" },
            { title: "Migration Cloud", time: "1-6 mois", desc: "Vers AWS, Azure, GCP" },
            { title: "Audit Infra", time: "3-7 jours", desc: "Sécurité, Coûts, Perf" },
            { title: "Déploiement CI/CD", time: "3-10 jours", desc: "GitHub Actions, Docker" }
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
            { title: "Workflow CRM", time: "2-5 jours", desc: "Synchro emails, leads, Slack" },
            { title: "Contenu IA", time: "1-3 jours", desc: "Génération automatique posts/blog" },
            { title: "Facturation", time: "3-7 jours", desc: "Devis, relances automatiques" },
            { title: "Scraping", time: "2-5 jours", desc: "Extraction données web" }
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
            { title: "Audit de Conformité", time: "1-2 semaines", desc: "Analyse écarts / AI Act" },
            { title: "Sécurisation LLM", time: "3-5 jours", desc: "Guardrails, Prompt Injection" },
            { title: "Gouvernance Data", time: "2-4 semaines", desc: "Cartographie, Rôles, Process" },
            { title: "Formation Équipes", time: "1-2 jours", desc: "Sensibilisation Risques & Bonnes Pratiques" }
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
            { title: "RAG Documentaire", time: "1-3 semaines", desc: "Chattez avec vos PDF, Notion, Docs" },
            { title: "Serveurs MCP", time: "3-5 jours", desc: "Connectez Claude Desktop à vos outils" },
            { title: "Chatbots Custom", time: "2-4 semaines", desc: "Support client, Assistant interne, RH" },
            { title: "Agents Autonomes", time: "Sur mesure", desc: "Automatisation complexe multi-étapes" }
        ]
    }
];

export default function ServiceExplorer() {
    const [selected, setSelected] = useState(SERVICES[2]); // Data selected by default

    return (
        <div className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl overflow-hidden backdrop-blur-sm relative flex flex-col lg:flex-row min-h-[600px] lg:min-h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            {/* MESSAGE MOBILE (Navigation) */}
            <div className="lg:hidden px-4 pt-6 pb-3">
                <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-3 px-2">
                    Explorer les expertises
                </div>
                {/* MENU MOBILE HORIZONTAL SCROLLANT AMÉLIORÉ */}
                <div className="flex overflow-x-auto gap-2.5 pb-2 snap-x snap-mandatory no-scrollbar -mx-4 px-4 scroll-smooth">
                    {SERVICES.map((s) => (
                        <motion.button
                            key={s.id}
                            onClick={() => setSelected(s)}
                            whileTap={{ scale: 0.95 }}
                            className={`snap-center shrink-0 min-w-[140px] max-w-[160px] p-3.5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-start relative overflow-hidden ${selected.id === s.id
                                ? `bg-[var(--bg-elevated)] border-[var(--border-strong)] shadow-xl ${s.accent} scale-105`
                                : "bg-[var(--bg-secondary)] border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-strong)]"
                                }`}
                        >
                            {/* Badge Kenshu toujours visible si applicable */}
                            {s.kenshuMode && (
                                <span className={`text-[8px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full w-fit mb-2 font-bold uppercase tracking-wider ${selected.id === s.id ? 'opacity-100' : 'opacity-60'}`}>
                                    R&D
                                </span>
                            )}
                            
                            {/* Titre mis en avant */}
                            <h3 className={`text-xs font-bold uppercase tracking-wide z-10 text-left leading-snug ${selected.id === s.id ? s.accent : ''}`}>
                                {s.title}
                            </h3>
                            
                            {/* Description courte visible */}
                            <p className={`text-[10px] mt-1.5 line-clamp-2 leading-tight ${selected.id === s.id ? 'text-[var(--text-secondary)] opacity-80' : 'text-[var(--text-muted)] opacity-60'}`}>
                                {s.desc}
                            </p>
                            
                            {/* Glow animé en background */}
                            {selected.id === s.id && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 0.6, scale: 1 }}
                                    className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.color} blur-2xl`} 
                                />
                            )}
                            
                            {/* Indicateur de sélection */}
                            {selected.id === s.id && (
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 shadow-lg"
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
                                Possibilités & Estimations
                            </span>
                            {selected.kenshuMode && (
                                <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-secondary)] border border-[var(--border)] px-2 py-0.5 rounded-full">
                                    R&D
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-y-auto max-h-[400px] md:max-h-none pr-1 custom-scrollbar">
                            {selected.branches.map((branch, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 + 0.2 }}
                                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] transition-all group/card cursor-default"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-[var(--text-primary)] text-sm group-hover/card:text-emerald-300 transition-colors">{branch.title}</h4>
                                        <span className={`text-[10px] px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-card)] whitespace-nowrap ${selected.accent}`}>
                                            {branch.time}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{branch.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
