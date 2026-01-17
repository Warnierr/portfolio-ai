"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import AskKenshuHome from "@/components/ask-kenshu/AskKenshuHome";
import ServiceExplorer from "@/components/ServiceExplorer";
import { CURRENT_AVAILABILITY, AVAILABILITY_CONFIG } from "@/config/availability";

// --- COMPOSANT TITRE DYNAMIQUE ---
const ThemeAwareTitle = () => {
    const { theme } = useTheme();
    const [text, setText] = useState("Raouf Warnier");
    const fullText = "Raouf Warnier";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // EFFET MATRIX DECODING
    const handleMatrixHover = () => {
        let iteration = 0;
        const interval = setInterval(() => {
            setText(
                fullText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return fullText[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iteration >= fullText.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30);
    };

    if (theme === 'matrix') {
        return (
            <h1
                onMouseEnter={handleMatrixHover}
                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[#00ff41] leading-[1.1] cursor-default font-mono transition-none"
            >
                {text}
            </h1>
        );
    }

    if (theme === 'cyberpunk') {
        return (
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[var(--text-primary)] leading-[1.1] relative group cursor-default transition-all duration-300 hover:text-[var(--accent)] hover:italic select-none">
                <span className="relative inline-block group-hover:hidden">Raouf Warnier</span>
                <span className="hidden group-hover:inline-block relative animate-glitch-1 text-[var(--accent)]">Raouf Warnier</span>

                {/* Calques Glitch (visibles seulement au hover) */}
                <span className="absolute top-0 left-0 -z-10 text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:animate-glitch-2">Raouf Warnier</span>
                <span className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:animate-glitch-3">Raouf Warnier</span>
            </h1>
        );
    }

    if (theme === 'midnight') {
        return (
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-400 to-cyan-300 leading-[1.1] cursor-default transition-all duration-700 hover:tracking-wide hover:blur-[1px] hover:scale-105">
                Raouf Warnier
            </h1>
        );
    }

    if (theme === 'neon') {
        return (
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[#39ff14] leading-[1.1] cursor-default font-mono uppercase shadow-green-500 drop-shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all animate-pulse duration-[3000ms]">
                Raouf Warnier
            </h1>
        );
    }

    if (theme === 'zen') {
        return (
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 text-[#2c241b] leading-[1.1] cursor-default font-serif transition-colors duration-1000 opacity-90 hover:opacity-100">
                Raouf Warnier
            </h1>
        );
    }

    // Default
    return (
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[var(--text-primary)] leading-[1.1]">
            Raouf Warnier
        </h1>
    );
};

export default function HomeMinimal() {
    const { theme } = useTheme(); // FIX: theme is now accessible for the cards below
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


    return (
        <>
            <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-amber-500/30">

                {/* NAV BAR Compacte & Rapprochée */}
                <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 backdrop-blur-xl bg-[var(--bg-secondary)]/60 border-b border-[var(--border)]">
                    <Link href="/" className="font-bold text-sm tracking-wide hover:text-emerald-400 transition-colors">
                        Kenshu Dev
                    </Link>

                    <div className="flex items-center gap-4 text-xs font-semibold tracking-wide uppercase">
                        <Link href="/services" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                            Services
                        </Link>
                        <Link href="/projets" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
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

                        {/* TITRE DYNAMIQUE SELON THEME */}
                        <ThemeAwareTitle />

                        <h2 className="text-xl md:text-2xl font-normal mb-8 text-[var(--text-secondary)]">
                            <span className="[html[data-theme='dark']_&]:bg-gradient-to-r [html[data-theme='dark']_&]:from-orange-400 [html[data-theme='dark']_&]:via-amber-500 [html[data-theme='dark']_&]:to-orange-400 [html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:text-transparent [html[data-theme='zen']_&]:text-[#cc3300] [html[data-theme='zen']_&]:font-bold font-medium">
                                Data Engineer
                            </span>
                            {' & '}
                            <span className="[html[data-theme='dark']_&]:bg-gradient-to-r [html[data-theme='dark']_&]:from-orange-400 [html[data-theme='dark']_&]:via-amber-500 [html[data-theme='dark']_&]:to-orange-400 [html[data-theme='dark']_&]:bg-clip-text [html[data-theme='dark']_&]:text-transparent [html[data-theme='zen']_&]:text-[#cc3300] [html[data-theme='zen']_&]:font-bold font-medium">
                                AI Product Builder
                            </span>
                        </h2>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-bold text-[var(--accent-foreground)] transition-all hover:bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                            >
                                <span>✨ Discuter avec mon IA</span>
                            </button>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-6 py-3 text-sm font-semibold text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                            >
                                Me contacter
                            </Link>
                        </div>
                    </div>


                    {/* GRID BENTO MIXTE SERVICES & PROJETS */}
                    {/* NOOUVEAU SERVICE EXPLORER (Bento interactif) */}
                    <div className="mb-20 mt-8">
                        <ServiceExplorer />
                    </div>


                    {/* SECTION EXPÉRIENCES (Images en bas) */}
                    <div className="mt-20">
                        <div className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-6">Expériences Significatives</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/projets" className={`group relative overflow-hidden rounded-2xl border bg-[var(--bg-card)] transition-all ${theme === 'cyberpunk' ? 'cyber-glitch-hover border-transparent' : 'border-[var(--border)] hover:border-emerald-500/30'}`}>
                                <Image src="/projects/bnp-pipeline.png" alt="BNP Pipeline" width={300} height={200} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                                <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}>
                                    <h4 className="text-sm font-bold text-[var(--text-primary)]">Data Engineer Big Data</h4>
                                    <p className="text-[10px] text-[var(--text-muted)]">BNP Paribas</p>
                                </div>
                            </Link>
                            <Link href="/projets" className={`group relative overflow-hidden rounded-2xl border bg-[var(--bg-card)] transition-all ${theme === 'cyberpunk' ? 'cyber-glitch-hover border-transparent' : 'border-[var(--border)] hover:border-orange-500/30'}`}>
                                <Image src="/projects/orange-infra.png" alt="Orange Infrastructure" width={300} height={200} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                                <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}>
                                    <h4 className="text-sm font-bold text-[var(--text-primary)]">Cloud Infrastructure</h4>
                                    <p className="text-[10px] text-[var(--text-muted)]">Orange</p>
                                </div>
                            </Link>
                            <Link href="/projets" className={`group relative overflow-hidden rounded-2xl border bg-[var(--bg-card)] transition-all ${theme === 'cyberpunk' ? 'cyber-glitch-hover border-transparent' : 'border-[var(--border)] hover:border-blue-500/30'}`}>
                                <Image src="/projects/safran-data.png" alt="Safran Tech Lead" width={300} height={200} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                                <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}>
                                    <h4 className="text-sm font-bold text-[var(--text-primary)]">Tech Lead Data</h4>
                                    <p className="text-[10px] text-[var(--text-muted)]">Safran</p>
                                </div>
                            </Link>
                            <Link href="/projets" className={`group relative overflow-hidden rounded-2xl border bg-[var(--bg-card)] transition-all ${theme === 'cyberpunk' ? 'cyber-glitch-hover border-transparent' : 'border-[var(--border)] hover:border-green-500/30'}`}>
                                <Image src="/projects/acc-battery.png" alt="ACC Industry 4.0" width={300} height={200} className="w-full h-32 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" />
                                <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }}>
                                    <h4 className="text-sm font-bold text-[var(--text-primary)]">Industrie 4.0 & Data</h4>
                                    <p className="text-[10px] text-[var(--text-muted)]">ACC</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* FOOTER SIMPLE */}
                <div className="text-center py-12 border-t border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs">
                    © 2026 Kenshu Dev — Data & AI Product Building
                </div>

            </div>

            {/* MODAL CHAT */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center bg-[var(--bg-primary)]/80 backdrop-blur-md md:p-6"
                        onClick={() => setIsChatOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: "100%" }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full h-[90vh] md:h-[800px] md:max-w-2xl overflow-hidden rounded-t-3xl md:rounded-3xl shadow-2xl bg-[var(--bg-card)] border-t md:border border-[var(--border)] flex flex-col"
                        >
                            <div className="flex-1 overflow-hidden relative">
                                <AskKenshuHome
                                    isOpen={isChatOpen}
                                    onClose={() => setIsChatOpen(false)}
                                    compactMode={true}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
