"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeId = 'default' | 'light' | 'matrix' | 'cyberpunk' | 'retro' | 'zen';

export const THEMES = [
    { id: 'default' as ThemeId, label: 'Dark 🌑', description: 'Interface sombre standard' },
    { id: 'light' as ThemeId, label: 'Light ☀️', description: 'Mode clair / Beige' },
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

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('site-theme') as ThemeId;
        if (savedTheme && THEMES.find(t => t.id === savedTheme)) {
            setThemeState(savedTheme);
        }
    }, []);

    // Save theme to localStorage when it changes
    const setTheme = (newTheme: ThemeId) => {
        setThemeState(newTheme);
        localStorage.setItem('site-theme', newTheme);
    };

    // Apply theme classes to document body
    useEffect(() => {
        // Remove all theme classes
        document.body.classList.remove('theme-light', 'theme-matrix', 'theme-cyberpunk', 'theme-retro', 'theme-zen');

        // Add current theme class if not default
        if (theme !== 'default') {
            document.body.classList.add(`theme-${theme}`);
        }
    }, [theme]);

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
