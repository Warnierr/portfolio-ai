"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeId = 'default' | 'matrix' | 'cyberpunk' | 'retro' | 'zen';

export const THEMES = [
    { id: 'default' as ThemeId, label: 'App ⚪', description: 'Interface moderne et épurée' },
    { id: 'matrix' as ThemeId, label: 'Matrix 🟢', description: 'Terminal Hacker' },
    { id: 'cyberpunk' as ThemeId, label: 'City OS 🟣', description: 'Néon futuriste' },
    { id: 'retro' as ThemeId, label: 'Retro 👾', description: 'Game Boy nostalgie' },
    { id: 'zen' as ThemeId, label: 'Zen ✒️', description: 'Minimaliste japonais' },
] as const;

interface ThemeContextType {
    theme: ThemeId;
    setTheme: (theme: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeId>('default');
    const [mounted, setMounted] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('site-theme') as ThemeId;
        if (savedTheme && THEMES.find(t => t.id === savedTheme)) {
            setThemeState(savedTheme);
        }
        setMounted(true);
    }, []);

    // Save theme to localStorage when it changes
    const setTheme = (newTheme: ThemeId) => {
        setThemeState(newTheme);
        localStorage.setItem('site-theme', newTheme);
    };

    // Apply theme classes to document body
    useEffect(() => {
        if (!mounted) return;

        // Remove all theme classes
        document.body.classList.remove('theme-matrix', 'theme-cyberpunk', 'theme-retro', 'theme-zen');

        // Add current theme class if not default
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }
    }, [theme, mounted]);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        // Pendant le SSR, retourner une valeur par défaut pour éviter les erreurs de build
        if (typeof window === 'undefined') {
            return { theme: 'default' as ThemeId, setTheme: () => { } };
        }
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
