"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import AskKenshuHome from "@/components/ask-kenshu/AskKenshuHome";

type NavItem = {
    label: string;
    href: string;
    badge?: string;
    isButton?: boolean;
};

const navItems: NavItem[] = [
    { label: "Services", href: "/services" },
    { label: "Expériences", href: "/projets" },
];

export default function ConditionalHeader() {
    const pathname = usePathname();
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 w-full z-50 border-b border-[var(--border)] bg-[var(--bg-secondary)]/60 backdrop-blur-xl">
                <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 text-[var(--text-primary)]">
                    <Link href="/" className="font-bold text-sm tracking-wide hover:text-emerald-400 transition-colors">
                        Kenshu Dev
                    </Link>

                    {/* Navigation Unifiée (Mobile & Desktop) - Sans Burger */}
                    <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs font-semibold tracking-wide uppercase">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2 py-2"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <button
                            onClick={() => setIsChatOpen(true)}
                            className="ml-2 px-3 py-1.5 md:px-4 md:py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all active:scale-95"
                        >
                            Ask AI
                        </button>
                    </div>
                </div>
            </header>

            {/* MODAL CHAT */}
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]/80 backdrop-blur-md p-4 md:p-6"
                        onClick={() => setIsChatOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl h-[85vh] md:h-[800px] overflow-hidden rounded-3xl shadow-2xl bg-[var(--bg-card)] border border-[var(--border)]"
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
