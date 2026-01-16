"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AskKenshuHome from "@/components/ask-kenshu/AskKenshuHome";
import { CURRENT_AVAILABILITY, AVAILABILITY_CONFIG } from "@/config/availability";

const SERVICES = [
    {
        icon: "🛠️",
        title: "Data Engineering",
        description: "Pipelines Big Data robustes, ETL/ELT, Architecture scalable",
        tags: ["Spark", "Airflow", "DBT"],
        color: "emerald"
    },
    {
        icon: "🤖",
        title: "AI Product Building",
        description: "SaaS intelligents, Chatbots, RAG, Automation IA",
        tags: ["LLMs", "Next.js", "OpenAI"],
        color: "amber"
    },
    {
        icon: "☁️",
        title: "DevOps & Cloud",
        description: "Infrastructure as Code, CI/CD, Observabilité",
        tags: ["AWS", "Azure", "Terraform"],
        color: "blue"
    },
    {
        icon: "⚡",
        title: "Automatisation n8n",
        description: "Workflows intelligents, CRM, Intégrations",
        tags: ["n8n", "Make", "APIs"],
        color: "purple"
    }
];

export default function HomeMinimal() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showFloatingButton, setShowFloatingButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowFloatingButton(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const availability = AVAILABILITY_CONFIG[CURRENT_AVAILABILITY];

    const getServiceColor = (color: string) => {
        switch (color) {
            case "emerald": return "border-emerald-500/20 hover:border-emerald-500/40 hover:bg-emerald-500/5";
            case "amber": return "border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/5";
            case "blue": return "border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/5";
            case "purple": return "border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5";
            default: return "border-white/10 hover:border-white/20";
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30">

                {/* NAV BAR Minimaliste */}
                <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-5 backdrop-blur-md bg-black/40 border-b border-white/5">
                    <Link href="/" className="font-bold text-base tracking-wide hover:text-emerald-400 transition-colors">
                        Kenshu Dev
                    </Link>

                    <div className="flex items-center gap-6 text-sm">
                        <Link href="/services" className="text-zinc-400 hover:text-white transition-colors font-medium">
                            Services
                        </Link>
                        <Link href="/projets" className="text-zinc-400 hover:text-white transition-colors font-medium">
                            Expériences
                        </Link>
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="px-5 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/30 hover:bg-emerald-500/20 transition-all font-medium text-sm"
                        >
                            Ask AI
                        </button>
                    </div>
                </nav>

                {/* HERO SECTION - Mix élégant */}
                <section className="mx-auto max-w-4xl px-8 pt-40 pb-24 md:pt-48 md:pb-32">

                    {/* Badge Disponibilité */}
                    <div className="flex items-center gap-3 mb-10">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${availability.pingColor} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${availability.dotColor}`}></span>
                        </span>
                        <span className={`text-xs font-bold ${availability.textColor} tracking-wider uppercase`}>
                            {availability.text}
                        </span>
                    </div>

                    {/* Nom - Gras et imposant */}
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 text-white leading-[1.05]">
                        Raouf Warnier
                    </h1>

                    {/* Sous-titre avec touches dorées */}
                    <h2 className="text-2xl md:text-3xl font-normal mb-16 leading-relaxed">
                        <span className="text-amber-100">Data Engineer</span>
                        <span className="text-zinc-600 mx-2">&</span>
                        <span className="text-amber-100">AI Product Builder</span>
                    </h2>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-4 mb-24">
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-4 text-base font-bold text-white transition-all hover:shadow-[0_0_30px_rgba(52,211,153,0.4)] hover:scale-[1.02]"
                        >
                            <span>✨ Discuter avec mon IA</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>

                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-zinc-300 transition-all hover:bg-white/10 hover:text-white hover:border-white/30"
                        >
                            Me contacter
                        </Link>
                    </div>

                </section>

                {/* SERVICES SECTION - Grid élégante */}
                <section className="mx-auto max-w-5xl px-8 pb-32">
                    <div className="mb-12 text-center">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Services & Expertise
                        </h3>
                        <p className="text-base text-zinc-400 max-w-2xl mx-auto">
                            De la data fiable aux produits IA innovants
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {SERVICES.map((service, idx) => (
                            <Link
                                key={idx}
                                href="/services"
                                className={`group p-8 rounded-2xl border bg-white/[0.02] transition-all hover:-translate-y-1 ${getServiceColor(service.color)}`}
                            >
                                <div className="text-4xl mb-4">{service.icon}</div>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                                    {service.title}
                                </h4>
                                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-500"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* CTA voir tous les services */}
                    <div className="mt-12 text-center">
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group"
                        >
                            <span>Découvrir tous les services</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="mx-auto max-w-4xl px-8 py-24 text-center border-t border-white/5">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Un projet en tête ?
                    </h2>
                    <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
                        Discutons de vos besoins data, IA ou web
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="px-8 py-4 text-base bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_40px_rgba(52,211,153,0.5)]"
                        >
                            Parler à l'IA
                        </button>
                        <Link
                            href="/contact"
                            className="px-8 py-4 text-base bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-full transition-all"
                        >
                            Me contacter direct
                        </Link>
                    </div>
                </section>

            </div>

            {/* FLOATING BUTTON */}
            <AnimatePresence>
                {showFloatingButton && !isChatOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-2xl hover:scale-110 transition-transform"
                    >
                        <span className="text-2xl">🤖</span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* MODAL CHAT */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6"
                        onClick={() => setIsChatOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl h-[85vh] md:h-[800px] overflow-hidden rounded-3xl shadow-2xl bg-[#0a0a0a] border border-white/10"
                        >
                            <AskKenshuHome
                                isOpen={isChatOpen}
                                onClose={() => setIsChatOpen(false)}
                                compactMode={true}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
