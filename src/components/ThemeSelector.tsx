"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, THEMES } from "@/contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

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
                        className="absolute bottom-16 left-0 mb-2 w-72 rounded-2xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="mb-3 flex items-center justify-between px-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
                                Choisir un thème
                            </span>
                        </div>

                        <div className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {THEMES.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => {
                                        setTheme(t.id);
                                        // On garde ouvert pour voir l'effet immédiat
                                    }}
                                    className={`w-full rounded-xl px-3 py-2 text-left transition-all flex items-center justify-between group ${theme === t.id
                                            ? "bg-white/10 border border-white/20 text-white shadow-lg"
                                            : "text-zinc-400 hover:bg-white/5 hover:text-white border border-transparent"
                                        }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">{t.label}</span>
                                        <span className="text-[10px] opacity-60">{t.description}</span>
                                    </div>
                                    {theme === t.id && (
                                        <motion.div layoutId="active-theme" className="w-2 h-2 rounded-full bg-emerald-500 box-shadow-glow" />
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
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white shadow-lg backdrop-blur-md hover:bg-white/10 transition-colors"
                title="Changer de thème"
            >
                <span className="text-xl">🎨</span>
            </motion.button>
        </div>
    );
}
