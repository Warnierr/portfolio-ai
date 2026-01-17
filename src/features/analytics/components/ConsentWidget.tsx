'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConsent } from '../hooks/useConsent';
import { useSession } from '../hooks/useSession';
import { useTheme } from 'next-themes';

export default function ConsentWidget() {
    const { consent, requestConsent, isLoading } = useConsent();
    const { sessionId } = useSession();
    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Show widget if consent hasn't been chosen yet
        if (!isLoading && consent.level === 'none') {
            const timer = setTimeout(() => setIsVisible(true), 1500); // Small delay for UX
            return () => clearTimeout(timer);
        }
    }, [isLoading, consent.level]);

    const handleAccept = async () => {
        await requestConsent('persistent', sessionId);
        setIsVisible(false);
    };

    const handleDecline = async () => {
        await requestConsent('none', sessionId);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 md:px-0">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className={`
                    relative overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-md
                    ${theme === 'matrix'
                        ? 'bg-black/90 border-[#0F0] text-[#0F0] font-mono shadow-[0_0_20px_rgba(0,255,0,0.2)]'
                        : 'bg-[var(--bg-elevated)]/90 border-[var(--border)] text-[var(--text-primary)]'}
                `}
            >
                {!isExpanded ? (
                    <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-3">
                            <span className="text-xl">🛡️</span>
                            <div className="flex-1">
                                <h3 className={`font-bold text-sm mb-1 ${theme === 'matrix' ? 'uppercase' : ''}`}>
                                    {theme === 'matrix' ? '>> SECURITY_PROTOCOL' : 'Confidentialité & IA'}
                                </h3>
                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                    J'utilise vos conversations pour apprendre et améliorer mes réponses. Acceptez-vous de participer à mon entraînement ? (Anonyme & RGPD)
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-1">
                            <button
                                onClick={handleDecline}
                                className={`
                                    flex-1 px-3 py-2 text-xs font-bold rounded-lg border transition-all
                                    ${theme === 'matrix'
                                        ? 'border-[#0F0]/50 hover:bg-[#0F0]/10 text-[#0F0]'
                                        : 'border-[var(--border)] hover:bg-[var(--bg-card)]'
                                    }
                                `}
                            >
                                {theme === 'matrix' ? '[DECLINE]' : 'Refuser'}
                            </button>
                            <button
                                onClick={handleAccept}
                                className={`
                                    flex-1 px-3 py-2 text-xs font-bold rounded-lg transition-all
                                    ${theme === 'matrix'
                                        ? 'bg-[#0F0] text-black hover:bg-[#0F0]/90 shadow-[0_0_10px_rgba(0,255,0,0.5)]'
                                        : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20'
                                    }
                                `}
                            >
                                {theme === 'matrix' ? '[ACCEPT_DATA]' : 'Accepter & Aider'}
                            </button>
                        </div>
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="text-[10px] text-[var(--text-muted)] underline text-center"
                        >
                            En savoir plus
                        </button>
                    </div>
                ) : (
                    <div className="text-xs space-y-3">
                        <h3 className={`font-bold border-b pb-2 ${theme === 'matrix' ? 'border-[#0F0]/30' : 'border-[var(--border)]'}`}>
                            Détails de la collecte
                        </h3>
                        <ul className="space-y-2 text-[var(--text-secondary)] list-disc pl-4">
                            <li>🚫 Pas de cookies tiers publicitaires.</li>
                            <li>🤖 Les conversations sont analysées pour améliorer le RAG (base de connaissance).</li>
                            <li>🔒 Données anonymisées (Session ID uniquement).</li>
                            <li>🗑️ Droit à l'oubli : tapez <code>/delete</code> dans le chat.</li>
                        </ul>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className={`w-full py-2 mt-2 font-bold rounded ${theme === 'matrix' ? 'bg-[#0F0]/20 hover:bg-[#0F0]/30' : 'bg-gray-100 dark:bg-zinc-800'}`}
                        >
                            Retour
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
