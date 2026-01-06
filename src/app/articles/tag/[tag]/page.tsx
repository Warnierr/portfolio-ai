"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import ArticleCard from "@/components/articles/ArticleCard";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  readingTime: number;
  publishedAt: string | null;
  featured: boolean;
};

export default function TagPage() {
  const params = useParams();
  const tag = params.tag as string;
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/articles?status=published&tag=${tag}&limit=50`
        );
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [tag]);

  return (
    <PageContainer className="gap-12">
      <SectionTitle
        eyebrow="Tag"
        title={`#${tag}`}
        subtitle={`Tous les articles avec le tag "${tag}"`}
      />

      {loading ? (
        <div className="text-center text-zinc-400">Chargement...</div>
      ) : articles.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-zinc-400">Aucun article avec ce tag.</p>
          <a
            href="/articles"
            className="mt-4 inline-block text-emerald-400 hover:underline"
          >
            ← Retour aux articles
          </a>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              publishedAt={article.publishedAt ? new Date(article.publishedAt) : null}
            />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
