import Link from "next/link";

import PageContainer from "@/components/PageContainer";
import { caseStudies } from "@/data/projects";

export default function ProjetsPage() {
  const typeLabels = {
    mission: "Mission client",
    produit: "Produit",
    experimentation: "Expérimentation",
  };

  const typeColors = {
    mission: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    produit: "border-blue-400/30 bg-blue-400/10 text-blue-300",
    experimentation: "border-purple-400/30 bg-purple-400/10 text-purple-300",
  };

  return (
    <PageContainer className="gap-10">
      {/* En-tête */}
      <section className="glass-panel p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Études de cas
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
          Ce que je construis, et comment
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Chaque projet est documenté avec son contexte réel : problème client,
          contraintes, choix techniques et résultats. Pas de marketing, des
          faits.
        </p>
      </section>

      {/* Liste des projets */}
      <section className="grid gap-6">
        {caseStudies.map((project) => (
          <Link
            key={project.slug}
            href={`/projets/${project.slug}`}
            className="glass-panel group p-6 transition hover:border-white/20 md:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs uppercase tracking-[0.15em] ${typeColors[project.type]}`}
                  >
                    {typeLabels[project.type]}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {project.context.year} • {project.context.duration}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-white group-hover:text-emerald-200 md:text-2xl">
                  {project.title}
                </h2>

                <p className="mt-3 text-zinc-400">{project.tldr}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 5 && (
                    <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-500">
                      +{project.stack.length - 5}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-zinc-500 group-hover:text-emerald-300 md:mt-6">
                <span>Voir l&apos;étude de cas</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </div>

            {/* Aperçu des résultats */}
            {project.results.metrics && project.results.metrics.length > 0 && (
              <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 md:grid-cols-3">
                {project.results.metrics.slice(0, 3).map((metric, i) => (
                  <div key={i} className="text-sm text-zinc-400">
                    <span className="text-emerald-400">✓</span> {metric}
                  </div>
                ))}
              </div>
            )}
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="glass-panel p-6 text-center md:p-8">
        <p className="text-zinc-400">
          Un projet similaire en tête ?
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
        >
          Discutons →
        </Link>
      </section>
    </PageContainer>
  );
}
