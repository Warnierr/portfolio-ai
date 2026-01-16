"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

// Theme list matching our JSON definitions
const THEMES = [
    { id: 'dark', label: 'Dark 🌑', description: 'Interface sombre standard' },
    { id: 'light', label: 'Light ☀️', description: 'Mode clair / Beige Notion' },
    { id: 'neon', label: 'Neon Dev 💻', description: 'Terminal hacker avec effets glow' },
    { id: 'matrix', label: 'Matrix 🟢', description: 'Terminal Hacker style' },
    { id: 'cyberpunk', label: 'Cyberpunk 🟣', description: 'Néon futuriste fuchsia/cyan' },
    { id: 'retro', label: 'Retro 👾', description: 'Game Boy nostalgie' },
    { id: 'zen', label: 'Zen ✒️', description: 'Minimaliste japonais' },
] as const;

export default function ThemeSelector() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-[90]" ref={menuRef}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-16 left-0 mb-2 w-72 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="mb-3 flex items-center justify-between px-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">
                                Choisir un thème
                            </span>
                        </div>

                        <div className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {THEMES.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTheme(t.id);
                                        // Keep open to see instant effect
                                    }}
                                    className={`w-full rounded-xl px-3 py-2 text-left transition-all flex items-center justify-between group ${theme === t.id
                                            ? "bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[var(--text-primary)] shadow-lg"
                                            : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] border border-transparent"
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{t.label}</span>
                                        <span className="text-[10px] opacity-60">{t.description}</span>
                                    </div>
                                    {theme === t.id && (
                                        <motion.div
                                            layoutId="active-theme"
                                            className="w-2 h-2 rounded-full bg-[var(--accent)]"
                                            style={{ boxShadow: '0 0 8px var(--accent)' }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] shadow-lg backdrop-blur-md hover:bg-[var(--bg-elevated)] transition-colors"
                title="Changer de thème"
            >
                <span className="text-xl">🎨</span>
            </motion.button>
        </div>
    );
}
