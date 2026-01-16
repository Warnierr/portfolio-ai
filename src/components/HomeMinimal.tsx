"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AskKenshuHome from "@/components/ask-kenshu/AskKenshuHome";
import { caseStudies } from "@/data/projects";

const FEATURED_PROJECTS = caseStudies.filter(p => p.type === "produit" || p.slug === "data-engineer-bnpp").slice(0, 2);

const SERVICES = [
    { title: "Data Engineering", desc: "Pipelines Spark/Airflow robustes", icon: "🛠️" },
    { title: "AI Product Building", desc: "SaaS & Chatbots intelligents", icon: "🤖" },
    { title: "DevOps & Cloud", desc: "Infrastructure as Code & CI/CD", icon: "☁️" },
];

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

    return (
        <>
            <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">

                {/* HERO SECTION */}
                <section className="mx-auto max-w-4xl px-6 pt-32 pb-20 md:pt-48 md:pb-32">

                    <div className="flex items-center gap-3 mb-8">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-sm font-medium text-emerald-400/90 tracking-wide uppercase text-[11px]">
                            Disponible pour missions freelance
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-serif font-medium tracking-tight mb-6 text-white leading-[1.1]">
                        Raouf Warnier
                    </h1>

                    <h2 className="text-xl md:text-2xl text-zinc-400 font-light mb-12 max-w-2xl leading-relaxed">
                        Data Engineer & AI Product Builder.
                    </h2>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="group relative inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-400 hover:pr-8"
                        >
                            <span>✨ Discuter avec mon IA</span>
                            <span className="absolute right-3 opacity-0 transition-all group-hover:opacity-100">→</span>
                        </button>

                        <Link
                            href="/projets"
                            className="rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
                        >
                            Voir mes projets
                        </Link>
                    </div>

                    {/* BADGES / STACK (Minimalist) */}
                    <div className="mt-16 flex flex-wrap gap-3 text-sm text-zinc-500 font-mono">
                        <span className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">Spark/Scala</span>
                        <span className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">Python</span>
                        <span className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">Next.js</span>
                        <span className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50">AWS/Azure</span>
                    </div>

                </section>

                {/* SELECTED WORK SECTION */}
                <section className="mx-auto max-w-4xl px-6 py-20 border-t border-white/5">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-xl font-medium">Sélection de projets</h3>
                        <Link href="/projets" className="text-sm text-zinc-500 hover:text-white transition">Tout voir →</Link>
                    </div>

                    <div className="grid gap-8">
                        {FEATURED_PROJECTS.map((project) => (
                            <Link
                                key={project.slug}
                                href={`/projets/${project.slug}`}
                                className="group block"
                            >
                                <article className="flex flex-col md:flex-row gap-6 md:items-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] transition hover:bg-white/[0.05] hover:border-white/10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="text-lg font-medium text-white group-hover:text-emerald-300 transition">{project.title}</h4>
                                            <span className="px-2 py-0.5 rounded text-[10px] uppercase border border-white/10 text-zinc-400 bg-white/5">{project.type}</span>
                                        </div>
                                        <p className="text-sm text-zinc-400 line-clamp-2 mb-4">{project.tldr}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {/* Stack slice */}
                                            {project.stack.slice(0, 3).map(t => (
                                                <span key={t} className="text-xs text-zinc-500 font-mono">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="md:w-32 flex-shrink-0 flex items-center gap-2 text-sm text-zinc-600 group-hover:text-emerald-400 justify-end">
                                        Explorer <span className="group-hover:translate-x-1 transition">→</span>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* SERVICES / EXPERTISE */}
                <section className="mx-auto max-w-4xl px-6 py-20 border-t border-white/5">
                    <h3 className="text-xl font-medium mb-12">Expertise Technique</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {SERVICES.map((s, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5">
                                <div className="text-3xl mb-4">{s.icon}</div>
                                <h4 className="font-medium text-white mb-2">{s.title}</h4>
                                <p className="text-sm text-zinc-400">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FOOTER CTA */}
                <section className="mx-auto max-w-4xl px-6 py-32 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-medium mb-8">
                        Prêt à collaborer ?
                    </h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="text-white bg-zinc-800 hover:bg-zinc-700 px-8 py-4 rounded-full font-medium transition"
                        >
                            Parler à l'IA
                        </button>
                        <Link
                            href="/contact"
                            className="text-black bg-white hover:bg-zinc-200 px-8 py-4 rounded-full font-medium transition"
                        >
                            Me contacter direct
                        </Link>
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
                        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xl hover:bg-emerald-400 hover:scale-110 transition-all"
                    >
                        <span className="text-2xl">🤖</span>
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-black"></span>
                        </span>
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
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-6"
                        onClick={() => setIsChatOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl h-[85vh] md:h-[800px] overflow-hidden rounded-3xl shadow-2xl relative bg-zinc-950 border border-white/10"
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
