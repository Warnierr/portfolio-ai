import ArticleCard from "./ArticleCard";

type Article = {
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

type RelatedArticlesProps = {
  articles: Article[];
  currentArticleId: string;
};

export default function RelatedArticles({
  articles,
  currentArticleId,
}: RelatedArticlesProps) {
  // Filter out current article
  const relatedArticles = articles
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 3);

  if (relatedArticles.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Articles recommandés
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedArticles.map((article) => (
          <ArticleCard key={article.id} {...article} />
        ))}
      </div>
    </section>
  );
}
