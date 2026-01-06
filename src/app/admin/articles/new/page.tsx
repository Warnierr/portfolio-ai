"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import slugify from "slugify";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function NewArticlePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "data-engineering",
    tags: "",
    author: "Raouf Warnier",
    authorType: "human",
    readingTime: 5,
    featured: false,
    metaTitle: "",
    metaDescription: "",
    canonical: "",
  });

  const handleTitleChange = (title: string) => {
    setForm({
      ...form,
      title,
      slug: slugify(title, { lower: true, strict: true }),
    });
  };

  async function handleSubmit(status: "draft" | "published") {
    try {
      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);

      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: JSON.stringify(tags),
          status,
        }),
      });

      if (res.ok) {
        router.push("/admin/articles");
      } else {
        alert("Erreur lors de la création");
      }
    } catch (error) {
      console.error("Failed to create article:", error);
      alert("Erreur réseau");
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold text-white">Nouvel article</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300">Titre</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={3}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Contenu (Markdown)</label>
          <div className="mt-1" data-color-mode="dark">
            <MDEditor
              value={form.content}
              onChange={(val) => setForm({ ...form, content: val || "" })}
              height={500}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300">Catégorie</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
            >
              <option value="data-engineering">Data Engineering</option>
              <option value="dataops">DataOps</option>
              <option value="llm-ia">LLM & IA</option>
              <option value="devops-plateforme">DevOps & Plateforme</option>
              <option value="conformite-ai-act-rgpd">Conformité AI Act & RGPD</option>
              <option value="retours-experience">Retours d'expérience</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">Temps de lecture (min)</label>
            <input
              type="number"
              value={form.readingTime}
              onChange={(e) => setForm({ ...form, readingTime: parseInt(e.target.value) })}
              className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Tags (séparés par des virgules)</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
            placeholder="spark, jenkins, observabilite"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="h-4 w-4"
          />
          <label className="text-sm text-zinc-300">Article à la une</label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleSubmit("draft")}
            className="rounded-lg bg-zinc-700 px-6 py-2 font-semibold text-white hover:bg-zinc-600"
          >
            Enregistrer comme brouillon
          </button>
          <button
            onClick={() => handleSubmit("published")}
            className="rounded-lg bg-emerald-500 px-6 py-2 font-semibold text-white hover:bg-emerald-600"
          >
            Publier
          </button>
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-white/10 px-6 py-2 text-zinc-300 hover:bg-white/5"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
