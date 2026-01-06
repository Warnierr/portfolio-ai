"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import ArticleCard from "@/components/articles/ArticleCard";
import CategoryPills from "@/components/articles/CategoryPills";
import SearchInput from "@/components/articles/SearchInput";

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

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          status: "published",
          limit: "50",
        });

        if (activeCategory) {
          params.set("category", activeCategory);
        }

        if (searchQuery) {
          params.set("search", searchQuery);
        }

        const res = await fetch(`/api/articles?${params}`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [activeCategory, searchQuery]);

  const featuredArticles = articles.filter((a) => a.featured).slice(0, 3);
  const regularArticles = articles.filter((a) => !a.featured);

  return (
    <PageContainer className="gap-12">
      {/* Hero */}
      <div className="text-center">
        <SectionTitle
          eyebrow="Articles & Insights"
          title="Guides techniques, retours d'expérience et analyses"
          subtitle="Data Engineering, DataOps, LLM, DevOps et conformité AI Act. Par Raouf Warnier."
        />
      </div>

      {/* Filtres */}
      <div className="space-y-6">
        <CategoryPills
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <SearchInput onSearchChange={setSearchQuery} />
      </div>

      {/* À la une */}
      {featuredArticles.length > 0 && (
        <section>
          <h2 className="mb-6 text-2xl font-bold text-white">À la une</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                {...article}
                publishedAt={article.publishedAt ? new Date(article.publishedAt) : null}
              />
            ))}
          </div>
        </section>
      )}

      {/* Articles */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-white">
          {activeCategory ? "Articles filtrés" : "Tous les articles"}
        </h2>

        {loading ? (
          <div className="text-center text-zinc-400">Chargement...</div>
        ) : regularArticles.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-zinc-400">Aucun article trouvé.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularArticles.map((article) => (
              <ArticleCard
                key={article.id}
                {...article}
                publishedAt={article.publishedAt ? new Date(article.publishedAt) : null}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-8 text-center">
        <h2 className="mb-3 text-2xl font-bold text-white">
          Besoin d'un accompagnement technique ?
        </h2>
        <p className="mb-6 text-zinc-300">
          Data Engineering, DataOps, LLM, DevOps ou AI Compliance : discutons de votre projet.
        </p>
        <a
          href="/contact"
          className="inline-block rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg"
        >
          Me contacter
        </a>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-white">Questions fréquentes</h2>
        <div className="space-y-4">
          {[
            {
              q: "À quelle fréquence publiez-vous des articles ?",
              a: "Je publie environ 1-2 articles par mois sur des sujets techniques approfondis.",
            },
            {
              q: "Les articles sont-ils adaptés aux débutants ?",
              a: "La plupart des articles ciblent des profils intermédiaires à avancés, mais je fournis toujours du contexte.",
            },
            {
              q: "Puis-je suggérer un sujet d'article ?",
              a: "Absolument ! Contactez-moi via le formulaire de contact avec votre suggestion.",
            },
          ].map((faq, i) => (
            <details key={i} className="group rounded-xl border border-white/10 bg-white/5 p-6">
              <summary className="cursor-pointer font-semibold text-white">
                {faq.q}
              </summary>
              <p className="mt-3 text-zinc-300">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
