"use client";

import { useMemo, useState } from "react";

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
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
              activeFilter === filter
                ? "border-white bg-white/10 text-white"
                : "border-white/20 text-zinc-400 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {filteredEntries.map((entry) => (
          <div
            key={`${entry.title}-${entry.date}`}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200"
          >
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>{entry.date}</span>
              <span>{entry.tag}</span>
            </div>
            <p className="mt-3 text-lg font-semibold text-white">{entry.title}</p>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

