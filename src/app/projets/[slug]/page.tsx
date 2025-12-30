import Link from "next/link";
import { notFound } from "next/navigation";

import PageContainer from "@/components/PageContainer";
import { caseStudies } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const typeLabels = {
    mission: "Mission client",
    produit: "Produit",
    experimentation: "Expérimentation",
  };

  return (
    <PageContainer className="gap-8">
      {/* TL;DR + Contexte */}
      <section className="glass-panel p-8 md:p-10">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em]">
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">
            {typeLabels[project.type]}
          </span>
          {project.status && (
            <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-amber-300">
              {project.status === "en_cours" ? "En cours" : project.status}
            </span>
          )}
          <span className="text-zinc-500">{project.context.year}</span>
        </div>

        <h1 className="text-3xl font-semibold text-white md:text-4xl">
          {project.title}
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-zinc-300">
          {project.tldr}
        </p>

        {/* Liens (Action immédiate) */}
        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => {
              const isLiveDemo = link.label.toLowerCase().includes("live demo");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${isLiveDemo
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-red-400"
                      : "bg-white text-black hover:bg-zinc-200"
                    }`}
                >
                  {link.label} →
                </a>
              );
            })}
          </div>
        )}

        <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 text-sm md:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Client
            </p>
            <p className="mt-1 text-zinc-200">{project.context.client}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Durée
            </p>
            <p className="mt-1 text-zinc-200">{project.context.duration}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Rôle
            </p>
            <p className="mt-1 text-zinc-200">{project.context.role}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Stack
            </p>
            <p className="mt-1 text-zinc-200">
              {project.stack.slice(0, 4).join(", ")}
            </p>
          </div>
        </div>
      </section>

      {/* Médias / Démo */}
      {project.media && project.media.length > 0 && (
        <section className="grid gap-6 md:grid-cols-2">
          {project.media.map((item, i) => (
            <div key={i} className="glass-panel overflow-hidden">
              {item.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.url}
                  alt={item.caption || project.title}
                  className="w-full object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  controls
                  className="w-full"
                  poster="/video-placeholder.png"
                />
              )}
              {item.caption && (
                <p className="bg-white/5 p-3 text-center text-xs text-zinc-500">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Problème */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Le problème
        </h2>
        <p className="mt-3 text-lg text-zinc-200">{project.problem.situation}</p>
        <div className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-zinc-400">Ce qui était en jeu :</p>
          <p className="mt-1 text-zinc-200">{project.problem.stakes}</p>
        </div>
      </section>

      {/* Contraintes */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Contraintes réelles
        </h2>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {project.constraints.map((constraint, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-zinc-200"
            >
              <span className="mt-0.5 text-amber-400">●</span>
              {constraint}
            </li>
          ))}
        </ul>
      </section>

      {/* Décisions techniques */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Décisions techniques
        </h2>
        <div className="mt-4 space-y-4">
          {project.decisions.map((decision, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5"
            >
              <p className="font-medium text-white">{decision.choice}</p>
              <p className="mt-2 text-sm text-zinc-300">{decision.why}</p>
              {decision.tradeoff && (
                <p className="mt-2 text-sm text-zinc-500">
                  <span className="text-amber-400/80">Compromis :</span>{" "}
                  {decision.tradeoff}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Ce qui a été livré */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Ce qui a été livré
        </h2>
        <ul className="mt-4 space-y-2">
          {project.delivered.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-200">
              <span className="mt-1 text-emerald-400">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Résultats */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Résultats
        </h2>

        {project.results.metrics && project.results.metrics.length > 0 && (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {project.results.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-4 text-center"
              >
                <p className="text-sm text-emerald-200">{metric}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-zinc-300">{project.results.qualitative}</p>
      </section>

      {/* Rétrospective */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Ce que je referais différemment
        </h2>
        <ul className="mt-4 space-y-3">
          {project.retrospective.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
              <span className="mt-0.5 text-zinc-500">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Roadmap */}
      {project.roadmap && project.roadmap.length > 0 && (
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Potentiel d&apos;Évolution (Roadmap)
          </h2>
          <ul className="mt-4 space-y-3">
            {project.roadmap.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                <span className="mt-0.5 text-zinc-500">☐</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Stack complète */}
      <section className="glass-panel p-6 md:p-8">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Stack technique
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between text-sm">
        <Link
          href="/projets"
          className="text-zinc-400 transition hover:text-white"
        >
          ← Tous les projets
        </Link>
        <Link
          href="/contact"
          className="text-emerald-300 transition hover:text-white"
        >
          Discuter d&apos;un projet similaire →
        </Link>
      </div>
    </PageContainer>
  );
}
