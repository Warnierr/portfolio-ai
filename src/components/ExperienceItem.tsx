"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience } from "@/data/experiences";

export default function ExperienceItem({ data }: { data: Experience }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)]">

            {/* Header Line */}
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-2xl font-serif text-[var(--text-primary)] font-medium tracking-wide">
                    {data.company}
                </h3>
                <span className="text-xs font-mono text-[var(--text-muted)] mt-1 md:mt-0">
                    {data.period}
                </span>
            </div>

            {/* Role */}
            <div className="mb-6">
                <span className="text-amber-200/90 font-medium text-sm tracking-wide uppercase">
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
