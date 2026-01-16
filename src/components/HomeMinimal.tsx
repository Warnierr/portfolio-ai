"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AskKenshuHome from "@/components/ask-kenshu/AskKenshuHome";
import { CURRENT_AVAILABILITY, AVAILABILITY_CONFIG } from "@/config/availability";

const SERVICES_CARDS = [
    {
        title: "Création de sites web",
        subtitle: "Sites vitrines, landing pages, SEO",
        href: "/services",
        imgSrc: "/ask-kenshu/web.png",
        color: "emerald",
        delay: 0.1
    },
    {
        title: "Développement d'apps",
        subtitle: "MVP, outils internes, produits digitaux",
        href: "/services",
        imgSrc: "/ask-kenshu/apps.png",
        color: "blue",
        delay: 0.2
    },
    {
        title: "Automatisation (n8n)",
        subtitle: "Process, CRM, emails, intégrations",
        href: "/services",
        imgSrc: "/ask-kenshu/n8n.png",
        color: "purple",
        delay: 0.3
    },
    {
        title: "Data Engineer / DevOps",
        subtitle: "Pipelines fiables, grands comptes",
        href: "/services",
        imgSrc: "/ask-kenshu/data.png",
        color: "amber",
        delay: 0.4
    }
];

const FEATURED_PROJECTS = [
    {
        name: "Budget AI",
        desc: "Assistant financier personnel",
        icon: "💰",
        link: "/projets",
        color: "bg-emerald-500/10 text-emerald-500"
    },
    {
        name: "AI Compliance",
        desc: "Audit RGPD & AI Act",
        icon: "🛡️",
        link: "/projets",
        color: "bg-blue-500/10 text-blue-500"
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

    const getCardColorClasses = (color: string) => {
        switch (color) {
            case "emerald": return "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]";
            case "blue": return "border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]";
            case "purple": return "border-purple-500/20 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]";
            case "amber": return "border-amber-500/20 hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]";
            default: return "border-white/10 hover:border-white/30";
        }
    };

    return (
        <>
            <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-amber-500/30">

                {/* NAV BAR Compacte & Rapprochée */}
                <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 backdrop-blur-xl bg-black/60 border-b border-white/5">
                    <Link href="/" className="font-bold text-sm tracking-wide hover:text-emerald-400 transition-colors">
                        Kenshu Dev
                    </Link>

                    <div className="flex items-center gap-4 text-xs font-semibold tracking-wide uppercase">
                        <Link href="/services" className="text-zinc-400 hover:text-white transition-colors">
                            Services
                        </Link>
                        <Link href="/projets" className="text-zinc-400 hover:text-white transition-colors">
                            Expériences
                        </Link>
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all hover:scale-105"
                        >
                            Ask AI
                        </button>
                    </div>
                </nav>

                <div className="pt-28 pb-20 px-4 md:px-6 mx-auto max-w-5xl">

                    {/* HERO SECTION */}
                    <div className="mb-20">
                        {/* Badge Disponibilité */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${availability.pingColor} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${availability.dotColor}`}></span>
                            </span>
                            <span className={`text-[10px] font-bold ${availability.textColor} tracking-widest uppercase`}>
                                {availability.text}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
                            Raouf Warnier
                        </h1>
                        <h2 className="text-xl md:text-2xl font-normal mb-8 text-zinc-400">
                            <span className="text-amber-100 font-medium">Data Engineer</span> & <span className="text-amber-100 font-medium">AI Product Builder</span>
                        </h2>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                            >
                                <span>✨ Discuter avec mon IA</span>
                            </button>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all hover:bg-white/10 hover:text-white"
                            >
                                Me contacter
                            </Link>
                        </div>
                    </div>


                    {/* GRID BENTO MIXTE SERVICES & PROJETS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* SERVICES CARDS (Visuelles comme avant) */}
                        {SERVICES_CARDS.map((card, idx) => (
                            <Link
                                key={idx}
                                href={card.href}
                                className={`group relative overflow-hidden rounded-2xl border bg-zinc-900/40 p-1 transition-all ${getCardColorClasses(card.color)} ${idx >= 2 ? 'lg:col-span-1' : ''}`}
                            >
                                <div className="relative h-full w-full overflow-hidden rounded-xl bg-black/40 p-6 flex flex-col justify-between min-h-[180px]">
                                    {/* Image background effect */}
                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-40 transition-opacity transform translate-x-4 -translate-y-4">
                                        <Image src={card.imgSrc} alt="" width={128} height={128} className="object-contain" />
                                    </div>

                                    <div className="relative z-10 mt-auto">
                                        <h3 className="text-lg font-bold text-white mb-1 leading-tight group-hover:text-emerald-300 transition-colors">
                                            {card.title}
                                        </h3>
                                        <p className="text-xs text-zinc-500 font-medium">
                                            {card.subtitle}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {/* SECTION PROJETS DU MOMENT (Bento style) */}
                        <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-4">
                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 px-1">Projets du moment</div>

                            {FEATURED_PROJECTS.map((p, i) => (
                                <Link
                                    key={i}
                                    href={p.link}
                                    className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-white/10 transition-all group"
                                >
                                    <div className={`h-10 w-10 flex items-center justify-center rounded-xl text-xl ${p.color}`}>
                                        {p.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{p.name}</h4>
                                        <p className="text-xs text-zinc-500">{p.desc}</p>
                                    </div>
                                    <div className="ml-auto text-zinc-600 group-hover:text-white transition-colors">→</div>
                                </Link>
                            ))}

                            {/* Environnements Critiques (Badges) */}
                            <div className="mt-auto p-4 rounded-2xl border border-white/5 bg-zinc-900/30">
                                <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Environnements Critiques</div>
                                <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-400">
                                    <span>BNP Paribas</span>
                                    <span className="text-zinc-700">•</span>
                                    <span>Orange</span>
                                    <span className="text-zinc-700">•</span>
                                    <span>Safran</span>
                                    <span className="text-zinc-700">•</span>
                                    <span>ACC</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* SECTION PROJETS (Images en bas) */}
                    <div className="mt-20">
                        <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Projets & Réalisations</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/projets" className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 hover:border-emerald-500/30 transition-all">
                                <Image src="/projects/budget-ai.png" alt="Budget AI" width={300} height={200} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                    <h4 className="text-sm font-bold text-white">Budget AI</h4>
                                    <p className="text-[10px] text-zinc-400">SaaS Financier</p>
                                </div>
                            </Link>
                            <Link href="/projets" className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 hover:border-blue-500/30 transition-all">
                                <Image src="/projects/ai-compliance.png" alt="AI Compliance" width={300} height={200} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                    <h4 className="text-sm font-bold text-white">AI Compliance</h4>
                                    <p className="text-[10px] text-zinc-400">Audit RGPD & AI Act</p>
                                </div>
                            </Link>
                            <Link href="/projets" className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 hover:border-amber-500/30 transition-all">
                                <Image src="/projects/bnp-pipeline.png" alt="BNP Pipeline" width={300} height={200} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                    <h4 className="text-sm font-bold text-white">Pipeline Data</h4>
                                    <p className="text-[10px] text-zinc-400">BNP Paribas</p>
                                </div>
                            </Link>
                            <Link href="/projets" className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 hover:border-purple-500/30 transition-all">
                                <Image src="/projects/orange-infra.png" alt="Orange Infrastructure" width={300} height={200} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                    <h4 className="text-sm font-bold text-white">Infra Cloud</h4>
                                    <p className="text-[10px] text-zinc-400">Orange</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* FOOTER SIMPLE */}
                <div className="text-center py-12 border-t border-white/5 bg-black text-zinc-600 text-xs">
                    © 2026 Kenshu Dev — Data & AI Product Building
                </div>

            </div>

            {/* FLOATING BUTTON */}
            <AnimatePresence>
                {showFloatingButton && !isChatOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsChatOpen(true)}
                        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg hover:bg-emerald-400 hover:scale-105 transition-all"
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
