"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import PageContainer from "@/components/PageContainer";
import { caseStudies } from "@/data/projects";

type FilterType = "all" | "mission" | "produit" | "experimentation";

export default function ProjetsPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const typeLabels = {
    mission: "Mission Client",
    produit: "Produit SaaS",
    experimentation: "R&D / Expérimentation",
  };

  const typeColors = {
    mission: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    produit: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    experimentation: "border-purple-500/40 bg-purple-500/10 text-purple-300",
  };

  const filteredProjects = filter === "all"
    ? caseStudies
    : caseStudies.filter(p => p.type === filter);

  // Séparer les projets phares (produits) des autres
  const featuredProjects = filteredProjects.filter(p => p.type === "produit");
  const otherProjects = filteredProjects.filter(p => p.type !== "produit");

  return (
    <PageContainer className="gap-10">
      {/* En-tête */}
      <section className="glass-panel p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Portfolio
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
          Projets & Réalisations
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Produits SaaS, missions grandes entreprises et expérimentations R&D.
          Chaque projet est documenté avec contexte, contraintes techniques et résultats mesurables.
        </p>

        {/* Filtres interactifs */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === "all"
                ? "bg-white/20 text-white"
                : "bg-white/5 text-zinc-400 hover:bg-white/10"
              }`}
          >
            Tous les projets ({caseStudies.length})
          </button>
          <button
            onClick={() => setFilter("produit")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === "produit"
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                : "bg-white/5 text-zinc-400 hover:bg-white/10"
              }`}
          >
            🚀 Produits SaaS ({caseStudies.filter(p => p.type === "produit").length})
          </button>
          <button
            onClick={() => setFilter("mission")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === "mission"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-white/5 text-zinc-400 hover:bg-white/10"
              }`}
          >
            🏢 Missions Client ({caseStudies.filter(p => p.type === "mission").length})
          </button>
          <button
            onClick={() => setFilter("experimentation")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${filter === "experimentation"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                : "bg-white/5 text-zinc-400 hover:bg-white/10"
              }`}
          >
            🔬 R&D ({caseStudies.filter(p => p.type === "experimentation").length})
          </button>
        </div>
      </section>

      {/* Projets phares en grand */}
      {featuredProjects.length > 0 && (
        <section>
          <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
            🌟 Projets phares
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  href={`/projets/${project.slug}`}
                  className="group glass-panel block overflow-hidden p-0 transition hover:border-white/30 hover:shadow-2xl"
                >
                  {/* Image mockup */}
                  <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-emerald-900/20 to-blue-900/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">{project.slug === "budget-ai" ? "💰" : "🛡️"}</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-full border px-2.5 py-0.5 text-xs uppercase tracking-wide ${typeColors[project.type]}`}>
                          {typeLabels[project.type]}
                        </span>
                        {project.links && project.links[0] && (
                          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs text-emerald-300">
                            ✓ Live Demo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm text-zinc-400 line-clamp-2">
                      {project.tldr}
                    </p>

                    {/* Tags technologies */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="rounded-md bg-white/5 px-2 py-1 text-xs text-zinc-500">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Métriques */}
                    {project.results.metrics && project.results.metrics.length > 0 && (
                      <div className="mt-4 grid gap-2 border-t border-white/10 pt-4">
                        {project.results.metrics.slice(0, 2).map((metric, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="text-emerald-400">✓</span>
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400 font-medium">
                      <span>Voir l'étude de cas</span>
                      <span className="transition group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Autres projets en grille */}
      {otherProjects.length > 0 && (
        <section>
          <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
            {featuredProjects.length > 0 ? "Missions & Expérimentations" : "Tous les projets"}
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + (featuredProjects.length * 0.1) }}
              >
                <Link
                  href={`/projets/${project.slug}`}
                  className="group glass-panel block h-full overflow-hidden p-0 transition hover:border-white/30 hover:shadow-xl"
                >
                  {/* Mini image */}
                  <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-zinc-800/50 to-zinc-900/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl opacity-20">
                        {project.type === "mission" ? "🏢" : "🔬"}
                      </div>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${typeColors[project.type]}`}>
                        {typeLabels[project.type]}
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-xs text-zinc-500">
                      {project.context.client} • {project.context.year}
                    </p>
                    <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                      {project.tldr}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-500"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-zinc-600">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-1 text-xs text-zinc-500 group-hover:text-emerald-400">
                      <span>Lire →</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Message si aucun projet */}
      {filteredProjects.length === 0 && (
        <div className="glass-panel p-12 text-center">
          <p className="text-zinc-400">Aucun projet dans cette catégorie</p>
        </div>
      )}

      {/* CTA */}
      <section className="glass-panel p-6 text-center md:p-8">
        <p className="text-zinc-400">
          Un projet similaire en tête ?
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-600 shadow-lg shadow-emerald-500/20"
        >
          Discutons de votre projet →
        </Link>
      </section>
    </PageContainer>
  );
}
