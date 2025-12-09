import Link from "next/link";
import { notFound } from "next/navigation";

import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: { slug: string };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((item) => item.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <PageContainer className="gap-10">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Étude de cas"
          title={project.name}
          subtitle="Problème, solution, architecture et lessons learned."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Problème</p>
            <p className="text-lg text-zinc-200">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Solution</p>
            <p className="text-lg text-zinc-200">{project.solution}</p>
          </div>
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle eyebrow="Architecture" title="Blueprint" />
        <p className="text-zinc-300">{project.architecture}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-zinc-400">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-white/15 px-3 py-1 text-white">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle eyebrow="Impact" title="Résultats & preuves" />
        <p className="text-zinc-300">{project.impact}</p>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle eyebrow="Lessons learned" title="Ce que j’en retiens" />
        <ul className="list-disc space-y-2 pl-6 text-sm text-zinc-200">
          {project.lessons.map((lesson) => (
            <li key={lesson}>{lesson}</li>
          ))}
        </ul>
      </section>

      {project.links && (
        <section className="glass-panel p-6 md:p-8">
          <SectionTitle eyebrow="Liens" title="Ressources" />
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
}

