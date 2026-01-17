"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience } from "@/data/experiences";
import { useTheme } from "next-themes";

export default function ExperienceItem({ data }: { data: Experience }) {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();

    // Theme-specific styling logic
    const accentClass = theme === 'zen' ? 'text-[#5c4935] font-bold tracking-widest' : // Darker brown for Zen
        theme === 'neon' ? 'text-[#39ff14] drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]' :
            theme === 'cyberpunk' ? 'text-[#ff00ff] font-bold drop-shadow-[0_0_2px_#00ffff]' :
                theme === 'matrix' ? 'text-[#0F0] font-mono' :
                    'text-amber-200/90';

    const containerStyle = theme === 'cyberpunk'
        ? 'border-pink-500/30 bg-black/80 shadow-[0_0_15px_rgba(236,72,153,0.1)] hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]'
        : theme === 'zen'
            ? 'border-[#d6cbb6] bg-[#f4ebd0]/40 backdrop-blur-sm hover:bg-[#f4ebd0]/60 text-[#2c241b]'
            : 'border-[var(--border)] bg-[var(--bg-card)]/60 backdrop-blur-md hover:bg-[var(--bg-elevated)]/80';

    return (
        <div className={`group relative rounded-2xl p-6 transition-all border ${containerStyle}`}>

            {/* Header Line */}
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className={`text-2xl font-medium tracking-wide ${theme === 'zen' ? 'font-serif font-bold' : ''}`}>
                    {data.company}
                </h3>
                <span className={`text-xs mt-1 md:mt-0 ${theme === 'matrix' ? 'font-mono' : ''} text-[var(--text-muted)]`}>
                    {data.period}
                </span>
            </div>

            {/* Role */}
            <div className="mb-6">
                <span className={`${accentClass} text-sm tracking-wide uppercase`}>
                    {data.role}
                </span>
            </div>

            {/* Achievements List */}
            <ul className="space-y-3 mb-6">
                {data.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                        <span className="leading-relaxed">{item}</span>
                    </li>
                ))}
            </ul>

            {/* AI Context Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 text-xs font-medium tracking-wide transition-all ${isOpen ? "text-emerald-400" : "text-[var(--text-muted)] hover:text-emerald-400"
                    }`}
            >
                <span className="text-base">✨</span>
                <span>{isOpen ? "Masquer le contexte IA" : "Voir le contexte IA"}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    ↓
                </motion.span>
            </button>

            {/* Expandable Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="mt-4 pt-4 border-t border-[var(--border)]">
                            <div className="rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] p-5 space-y-6 text-sm text-[var(--text-secondary)]">

                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1 font-semibold">Situation</h4>
                                    <p className="leading-relaxed text-[var(--text-primary)]">{data.aiContext.situation}</p>
                                </div>

                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1 font-semibold">Approche</h4>
                                    <p className="leading-relaxed text-[var(--text-primary)]">{data.aiContext.approach}</p>
                                </div>

                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1 font-semibold">Travail Technique</h4>
                                    <p className="leading-relaxed text-[var(--text-primary)]">{data.aiContext.technical}</p>
                                </div>

                                <div className="pl-3 border-l-2 border-amber-500/30">
                                    <h4 className="text-[10px] uppercase tracking-widest text-amber-500/70 mb-1 font-semibold">Leçons Apprises</h4>
                                    <p className="leading-relaxed text-[var(--text-primary)] italic">"{data.aiContext.lessons}"</p>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
