"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import type { NewsEntry } from "@/data/news";

const filters = ["Tous", "avancement", "veille", "reflexion"] as const;

export default function NewsFeed({ entries }: { entries: NewsEntry[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("Tous");

  const filteredEntries = useMemo(() => {
    if (activeFilter === "Tous") {
      return entries;
    }
    return entries.filter((entry) => entry.tag === activeFilter);
  }, [activeFilter, entries]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition-all duration-300 ${activeFilter === filter
                  ? "border-white bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  : "border-white/20 text-zinc-400 hover:text-white hover:border-white/40"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span>{filteredEntries.length} article{filteredEntries.length > 1 ? "s" : ""}</span>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-zinc-400 transition hover:border-white/20 hover:text-white"
            title="Flux RSS (bientôt disponible)"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z" />
            </svg>
            RSS
          </a>
        </div>
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

