"use client";

import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/types/article";
import type { ArticleCategory } from "@/types/article";

type CategoryPillsProps = {
  activeCategory?: string;
  onCategoryChange: (category: string | undefined) => void;
};

const categories: Array<{ value: ArticleCategory | "all"; label: string }> = [
  { value: "all", label: "Tous" },
  { value: "data-engineering", label: CATEGORY_LABELS["data-engineering"] },
  { value: "dataops", label: CATEGORY_LABELS["dataops"] },
  { value: "llm-ia", label: CATEGORY_LABELS["llm-ia"] },
  { value: "devops-plateforme", label: CATEGORY_LABELS["devops-plateforme"] },
  { value: "conformite-ai-act-rgpd", label: CATEGORY_LABELS["conformite-ai-act-rgpd"] },
  { value: "retours-experience", label: CATEGORY_LABELS["retours-experience"] },
];

export default function CategoryPills({
  activeCategory,
  onCategoryChange,
}: CategoryPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = cat.value === "all" ? !activeCategory : activeCategory === cat.value;
        const color = cat.value === "all" ? "emerald" : CATEGORY_COLORS[cat.value as ArticleCategory];

        return (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value === "all" ? undefined : cat.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? `bg-${color}-500 text-white shadow-lg`
                : `bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white`
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
