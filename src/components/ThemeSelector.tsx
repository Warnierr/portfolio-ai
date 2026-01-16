"use client";

import { useState, useEffect } from "react";
import { useTheme, THEMES } from "@/contexts/ThemeContext";

export default function ThemeSelector() {
    const { theme, setTheme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+T pour toggle le theme selector
            if (e.ctrlKey && e.key === "t") {
                e.preventDefault();
                setIsVisible((v) => !v);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-[100] rounded-2xl border border-purple-500/30 bg-black/95 p-6 shadow-2xl backdrop-blur-xl max-w-sm">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-purple-400">
                        🎨 Theme Selector
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                        Change le thème pour tout le site
                    </p>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-white hover:text-purple-400 transition"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-2">
                {THEMES.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`w-full rounded-lg px-4 py-3 text-left transition-all ${theme === t.id
                                ? "bg-purple-500/20 border-2 border-purple-500/50 scale-[1.02]"
                                : "bg-white/5 border-2 border-white/10 hover:bg-white/10 hover:border-white/20"
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-medium text-white">{t.label}</div>
                                <div className="text-xs text-zinc-400">{t.description}</div>
                            </div>
                            {theme === t.id && (
                                <div className="text-purple-400">✓</div>
                            )}
                        </div>
                    </button>
                ))}
            </div>

            <p className="mt-4 text-center text-[10px] text-zinc-500">
                Appuyez sur <kbd className="rounded bg-white/10 px-1.5 py-0.5">Ctrl+T</kbd> pour masquer
            </p>
        </div>
    );
}
