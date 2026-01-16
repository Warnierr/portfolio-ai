"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AskKenshuHome from "@/components/ask-kenshu/AskKenshuHome";
import ExperienceItem from "@/components/ExperienceItem";
import { experiences, products } from "@/data/experiences";
import { CURRENT_AVAILABILITY, AVAILABILITY_CONFIG } from "@/config/availability";

export default function HomeMinimal() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showFloatingButton, setShowFloatingButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowFloatingButton(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Configuration dynamique de disponibilité
    const availability = AVAILABILITY_CONFIG[CURRENT_AVAILABILITY];

    return (
        <>
            <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-amber-500/30">

                {/* NAV BAR Minimal */}
                <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 pointer-events-none">
                    <div className="pointer-events-auto">
                        {/* Logo or Name placeholder if needed, otherwise empty */}
                    </div>
                    <div className="pointer-events-auto flex items-center gap-6 text-xs font-medium tracking-wide uppercase">
                        <a href="#experience" className="text-zinc-500 hover:text-white transition-colors">Experience</a>
                        <a href="#products" className="text-zinc-500 hover:text-white transition-colors">Produits</a>
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all hover:scale-105"
                        >
                            Ask AI
                        </button>
                    </div>
                </nav>

                {/* HERO SECTION */}
                <section className="mx-auto max-w-3xl px-6 pt-32 pb-20 md:pt-48 md:pb-32">

                    {/* Badge de Disponibilité Dynamique */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${availability.pingColor} opacity-75`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${availability.dotColor}`}></span>
                        </span>
                        <span className={`text-[10px] font-bold ${availability.textColor} tracking-widest uppercase`}>
                            {availability.text}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6 text-white leading-[1.1]">
                        Raouf Warnier
                    </h1>

                    <h2 className="text-xl md:text-2xl font-light mb-12 max-w-xl leading-relaxed text-zinc-400">
                        <span className="text-amber-100">Data Engineer</span> <span className="text-zinc-600">&</span> <span className="text-amber-100">AI Product Builder</span>.
                    </h2>

                    {/* CTAs Hero (Restaurés) */}
                    <div className="flex flex-wrap items-center gap-4 mb-20">
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="group relative inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.2)] hover:shadow-[0_0_30px_rgba(52,211,153,0.4)]"
                        >
                            <span>✨ Discuter avec mon IA</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>

                        <a
                            href="#experience"
                            className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white hover:border-white/20"
                        >
                            Explorer mes expériences
                        </a>
                    </div>

                    {/* PRODUCTS SHOWCASE - "Subdomain" Style */}
                    <div id="products" className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
                        {products.map((p) => (
                            <Link
                                key={p.name}
                                href={p.internalLink}
                                className="group block p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-1"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-2xl">{p.icon}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 group-hover:text-emerald-400 transition-colors">
                                        Live App ↗
                                    </span>
                                </div>
                                <h3 className="text-lg font-serif text-white mb-1 group-hover:text-amber-200 transition-colors">{p.name}</h3>
                                <p className="text-xs text-zinc-500 mb-3">{p.tagline}</p>
                                <div className="inline-block text-[10px] font-mono text-zinc-600 bg-black/30 px-2 py-1 rounded border border-white/5 group-hover:border-emerald-500/20 group-hover:text-emerald-500/70 transition-colors">
                                    {p.url.replace('https://', '')}
                                </div>
                            </Link>
                        ))}
                    </div>

                </section>

                {/* EXPERIENCE SECTION (Lovable Style) */}
                <section id="experience" className="mx-auto max-w-3xl px-6 pb-32">
                    <h3 className="text-3xl font-serif font-medium text-white mb-2">Experience</h3>
                    <p className="text-sm text-zinc-500 mb-12 max-w-lg leading-relaxed">
                        Chaque rôle inclut un contexte IA interrogeable — la vraie histoire derrière les bullet points.
                    </p>

                    <div className="space-y-6">
                        {experiences.map((exp, index) => (
                            <ExperienceItem key={index} data={exp} />
                        ))}
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="mx-auto max-w-3xl px-6 py-20 text-center border-t border-white/5">
                    <h2 className="text-2xl md:text-4xl font-serif font-medium mb-8 text-white">
                        Un projet en tête ?
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="text-black bg-emerald-400 hover:bg-emerald-300 px-8 py-3 rounded-full font-medium transition shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]"
                        >
                            Discuter avec l'IA
                        </button>
                    </div>
                </section>

            </div>

            {/* FLOATING CHAT BUTTON */}
            <AnimatePresence>
                {showFloatingButton && !isChatOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#151515] border border-white/10 text-emerald-400 shadow-2xl hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all group"
                    >
                        <span className="text-xl group-hover:scale-110 transition-transform">✨</span>
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
                            className="w-full max-w-2xl h-[85vh] md:h-[800px] overflow-hidden rounded-3xl shadow-2xl relative bg-[#0a0a0a] border border-white/10 ring-1 ring-white/5"
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
