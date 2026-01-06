import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/types/article";
import type { ArticleCategory } from "@/types/article";

type ArticleCardProps = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  readingTime: number;
  publishedAt: Date | null;
  featured?: boolean;
};

export default function ArticleCard({
  title,
  slug,
  excerpt,
  coverImage,
  category,
  readingTime,
  publishedAt,
  featured = false,
}: ArticleCardProps) {
  const categoryColor = CATEGORY_COLORS[category as ArticleCategory] || "gray";
  const categoryLabel = CATEGORY_LABELS[category as ArticleCategory] || category;

  return (
    <Link
      href={`/articles/${slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-xl border transition-all hover:scale-[1.02] ${
        featured
          ? "border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5"
          : "border-white/10 bg-white/5 hover:border-white/20"
      }`}
    >
      {coverImage && (
        <div className="relative h-48 w-full overflow-hidden bg-black/20">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-zinc-400">
          <span
            className={`rounded-full px-3 py-1 text-${categoryColor}-400 bg-${categoryColor}-500/10`}
          >
            {categoryLabel}
          </span>
          <span>{readingTime} min</span>
          {publishedAt && (
            <span>
              {format(new Date(publishedAt), "d MMM yyyy", { locale: fr })}
            </span>
          )}
        </div>

        <h3 className="mb-3 text-xl font-bold text-white line-clamp-2">
          {title}
        </h3>

        <p className="mb-4 flex-1 text-sm text-zinc-300 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex items-center text-emerald-400 transition-colors group-hover:text-emerald-300">
          <span className="text-sm font-medium">Lire l'article</span>
          <svg
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {featured && (
        <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          À la une
        </div>
      )}
    </Link>
  );
}
