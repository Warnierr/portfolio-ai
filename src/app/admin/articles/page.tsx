"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  author: string;
  createdAt: string;
};

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchArticles();
  }, [filter]);

  async function fetchArticles() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (filter !== "all") {
        params.set("status", filter);
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

  async function deleteArticle(id: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) return;

    try {
      await fetch(`/api/articles/${id}`, { method: "DELETE" });
      fetchArticles();
    } catch (error) {
      console.error("Failed to delete article:", error);
      alert("Erreur lors de la suppression");
    }
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    try {
      await fetch(`/api/articles/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchArticles();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Erreur lors de la mise à jour");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Gestion des articles</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/articles/new"
            className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-600"
          >
            + Nouvel article
          </Link>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        {["all", "draft", "published", "archived"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === status
                ? "bg-emerald-500 text-white"
                : "bg-white/5 text-zinc-300 hover:bg-white/10"
            }`}
          >
            {status === "all" ? "Tous" : status}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center text-zinc-400">Chargement...</div>
      ) : articles.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-zinc-400">Aucun article.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 text-left text-sm text-zinc-400">
                <th className="pb-3">Titre</th>
                <th className="pb-3">Catégorie</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Auteur</th>
                <th className="pb-3">Créé le</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-white/5">
                  <td className="py-3 text-white">{article.title}</td>
                  <td className="py-3 text-zinc-300">{article.category}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        article.status === "published"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : article.status === "draft"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {article.status}
                    </span>
                  </td>
                  <td className="py-3 text-zinc-300">{article.author}</td>
                  <td className="py-3 text-zinc-400">
                    {format(new Date(article.createdAt), "d MMM yyyy", { locale: fr })}
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="text-blue-400 hover:underline"
                      >
                        Éditer
                      </Link>
                      <button
                        onClick={() => toggleStatus(article.id, article.status)}
                        className="text-emerald-400 hover:underline"
                      >
                        {article.status === "published" ? "Dépublier" : "Publier"}
                      </button>
                      <button
                        onClick={() => deleteArticle(article.id)}
                        className="text-red-400 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
