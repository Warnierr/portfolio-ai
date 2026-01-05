"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type NavItem = {
  label: string;
  href: string;
  badge?: string;
  highlighted?: boolean;
};

type MobileMenuProps = {
  navItems: NavItem[];
};

export default function MobileMenu({ navItems }: MobileMenuProps) {
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
          className="h-0.5 w-6 bg-white transition-all"
        />
        <motion.span
          animate={{ opacity: isOpen ? 0 : 1 }}
          className="h-0.5 w-6 bg-white transition-all"
        />
        <motion.span
          animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
          className="h-0.5 w-6 bg-white transition-all"
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
              className="fixed inset-0 top-[73px] z-40 bg-black/80 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[73px] z-50 h-[calc(100vh-73px)] w-[280px] border-l border-white/10 bg-black/95 backdrop-blur-xl"
            >
              <nav className="flex flex-col gap-2 p-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={
                      item.highlighted
                        ? "flex items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-300 font-medium transition hover:bg-emerald-500/20 hover:border-emerald-500/60"
                        : "group flex items-center justify-between rounded-lg px-4 py-3 text-zinc-300 transition hover:bg-white/5 hover:text-white"
                    }
                  >
                    <span>{item.label}</span>
                    {item.badge && !item.highlighted && (
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}

                {/* Phone CTA */}
                <a
                  href="tel:+33749416355"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 font-medium text-black transition hover:bg-zinc-200"
                >
                  <span>📞</span>
                  <span className="text-sm">Appeler</span>
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
