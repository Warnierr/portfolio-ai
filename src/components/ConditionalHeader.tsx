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
    const isHomePage = pathname === "/";
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Ne pas afficher le header sur la homepage (elle a sa propre navigation)
    if (isHomePage) return null;

    return (
        <>
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
                <div className="mx-auto flex items-center justify-between px-6 py-4 text-white">
                    <Link href="/" className="font-bold text-sm tracking-wide hover:text-emerald-400 transition-colors">
                        Kenshu Dev
                    </Link>
                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex items-center gap-4 text-xs font-semibold tracking-wide uppercase">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 hover:bg-emerald-500/20 transition-all hover:scale-105"
                            >
                                Ask AI
                            </button>
                        </nav>
                        <MobileMenu navItems={[...navItems, { label: "Ask AI", href: "#", isButton: true }]} onAskAI={() => setIsChatOpen(true)} />
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
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6"
                        onClick={() => setIsChatOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl h-[85vh] md:h-[800px] overflow-hidden rounded-3xl shadow-2xl bg-[#0a0a0a] border border-white/10"
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
