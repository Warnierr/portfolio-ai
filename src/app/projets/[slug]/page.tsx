import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import PageContainer from "@/components/PageContainer";
import MethodologyTimeline from "@/components/MethodologyTimeline";
import { caseStudies } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Projet non trouvé | Kenshu",
    };
  }

  return {
    title: `${project.title} | Kenshu`,
    description: project.tldr,
    alternates: {
      canonical: `/projets/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Kenshu`,
      description: project.tldr,
      url: `https://kenshu.dev/projets/${slug}`,
      type: "article",
      publishedTime: `${project.context.year}-01-01`,
    },
  };
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

  // Schema.org JSON-LD pour référencement optimisé
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.tldr,
    "applicationCategory": project.type === "produit" ? "ProductivityApplication" : "BusinessApplication",
    "applicationSubCategory": project.slug === "budget-ai" 
      ? "FinanceApplication" 
      : project.slug === "ai-compliance-audit-tool"
      ? "ComplianceApplication"
      : undefined,
    "operatingSystem": "Web",
    "url": project.links?.[0]?.href || `https://kenshu.dev/projets/${slug}`,
    "author": {
      "@type": "Person",
      "name": "Raouf Warnier",
      "url": "https://kenshu.dev",
      "jobTitle": "Data Engineer, AI Product Builder, DevOps Specialist",
      "sameAs": [
        "https://github.com/warnierr",
        "https://www.linkedin.com/in/raouf-warnier"
      ]
    },
    "datePublished": `${project.context.year}-01-01`,
    "offers": project.type === "produit" ? {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "EUR"
    } : undefined,
    "featureList": project.delivered.join(", "),
    "screenshot": project.media?.[0]?.url,
    "softwareVersion": project.status === "prototype" ? "0.1" : "1.0",
    "programmingLanguage": project.stack.filter(tech => 
      ["Python", "TypeScript", "JavaScript", "Scala", "SQL"].includes(tech)
    ),
    "softwareRequirements": project.stack.join(", "),
    "keywords": [
      ...project.stack,
      project.type === "mission" ? "consulting" : project.type,
      project.context.client,
    ].join(", "),
  };

  // Breadcrumb Schema pour navigation
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://kenshu.dev",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Projets",
        "item": "https://kenshu.dev/projets",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://kenshu.dev/projets/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD - Project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      
      {/* Schema.org JSON-LD - Breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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
                <div className="relative h-96 w-full">
                  <Image
                    src={item.url}
                    alt={item.caption || `${project.title} - Illustration ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
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

      {/* Méthodologie */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="mb-8 text-center text-xs uppercase tracking-[0.3em] text-zinc-500">
          Méthodologie Appliquée
        </h2>
        <MethodologyTimeline />
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

      {/* Maillage interne - CTA contextuels */}
      <section className="glass-panel p-8 md:p-10">
        <h3 className="text-lg font-semibold text-white">
          Intéressé par un projet similaire ?
        </h3>
        <p className="mt-3 text-zinc-400">
          Découvrez comment je peux vous aider à industrialiser vos pipelines data 
          ou développer votre application IA en production.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/methode"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Découvrir ma méthode →
          </Link>
          <Link
            href="/services"
            className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-600"
          >
            Voir mes services
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-emerald-500/50 bg-emerald-500/10 px-6 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/20"
          >
            Me contacter
          </Link>
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
          href="/blog"
          className="text-zinc-400 transition hover:text-white"
        >
          Lire les articles tech →
        </Link>
      </div>
    </PageContainer>
    </>
  );
}
