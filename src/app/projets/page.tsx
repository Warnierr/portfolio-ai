import Link from "next/link";

import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import { projects } from "@/data/projects";

export default function ProjetsPage() {
  return (
    <PageContainer className="gap-10">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Études de cas"
          title="Chaque projet est une mini-architecture"
          subtitle="Problème → Solution → Architecture → Stack. Les pages détaillées arrivent (agent auto-documenté)."
        />
        <p className="text-zinc-300">
          Je privilégie les récits complets : contexte, contraintes, schémas, lessons learned. Les fiches ci-dessous
          résument l’essence de chaque système avant d’ouvrir les pages détaillées (format `/projets/[slug]` généré par
          mon agent d’autodocumentation).
        </p>
      </section>

      <section className="glass-panel p-6 md:p-10">
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">{project.name}</p>
                  <h2 className="text-2xl font-semibold text-white">{project.solution}</h2>
                </div>
                <Link
                  href={`/projets/${project.slug}`}
                  className="text-sm text-emerald-200 underline-offset-4 hover:text-white hover:underline"
                >
                  Page détail (bientôt)
                </Link>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Problème</p>
                  <p className="text-sm text-zinc-200">{project.problem}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Architecture</p>
                  <p className="text-sm text-zinc-200">{project.architecture}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Décisions clés</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-200">
                    {(project.decisions ?? []).slice(0, 3).map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-200">Risques maîtrisés</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-200">
                    {(project.risks ?? []).slice(0, 3).map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-200">À explorer</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-zinc-200">
                    {(project.exploreNext ?? []).slice(0, 3).map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-white/15 px-3 py-1 text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

