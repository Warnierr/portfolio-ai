"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  badge?: string;
  isButton?: boolean;
};

type MobileMenuProps = {
  navItems: NavItem[];
  onAskAI?: () => void;
};

export default function MobileMenu({ navItems, onAskAI }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col items-center justify-center gap-1.5 p-2"
        aria-label="Menu"
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }}
          className="h-0.5 w-6 bg-[var(--text-primary)] transition-all"
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          className="h-0.5 w-6 bg-[var(--text-primary)] transition-all"
        />
        <motion.span
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
          className="h-0.5 w-6 bg-[var(--text-primary)] transition-all"
        />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[60px] z-40 bg-[var(--bg-primary)]/80 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[60px] z-50 h-[calc(100vh-60px)] w-[280px] border-l border-[var(--border)] bg-[var(--bg-card)] backdrop-blur-xl"
            >
              <nav className="flex flex-col gap-2 p-6">
                {navItems.map((item) => (
                  item.isButton ? (
                    <button
                      key={item.label}
                      onClick={() => {
                        setIsOpen(false);
                        onAskAI?.();
                      }}
                      className="flex items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-300 font-medium transition hover:bg-emerald-500/20 hover:border-emerald-500/60"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between rounded-lg px-4 py-3 text-[var(--text-secondary)] transition hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
