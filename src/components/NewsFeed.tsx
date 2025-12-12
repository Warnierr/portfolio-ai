"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { NewsEntry } from "@/data/news";

const filters = ["Tous", "Avancement", "Veille", "Réflexion"] as const;

export default function NewsFeed({ entries }: { entries: NewsEntry[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Tous");

  const filteredEntries = useMemo(() => {
    if (activeFilter === "Tous") {
      return entries;
    }
    return entries.filter((entry) => entry.category === activeFilter);
  }, [activeFilter, entries]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition-all duration-300 ${
              activeFilter === filter
                ? "border-white bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                : "border-white/20 text-zinc-400 hover:text-white hover:border-white/40"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-4 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredEntries.map((entry, index) => (
            <motion.div
              key={`${entry.title}-${entry.date}`}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
                layout: { duration: 0.3 },
              }}
              className="glass-card p-5 text-sm text-zinc-200"
            >
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{entry.date}</span>
                <span>{entry.tag}</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">{entry.title}</p>
              <p>{entry.content}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

