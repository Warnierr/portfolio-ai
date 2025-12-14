"use client";

import Link from "next/link";
import { motion, type MotionProps } from "framer-motion";

import PageContainer from "@/components/PageContainer";
import { caseStudies } from "@/data/projects";

const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const audiences = [
  "Cabinets comptables",
  "Avocats",
  "Agences immobilières",
  "Agences marketing",
  "TPE & PME",
];

export default function LandingPage() {
  // Sélection des projets à mettre en avant (missions client d'abord)
  const featuredProjects = caseStudies
    .filter((p) => p.type === "mission")
    .slice(0, 2)
    .concat(caseStudies.filter((p) => p.type === "produit").slice(0, 1));

  return (
    <PageContainer className="gap-16">
      {/* Hero */}
      <motion.section className="glass-panel p-8 md:p-12" {...fadeUp}>
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
            Développeur IA indépendant
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
            J&apos;aide les TPE et PME à intégrer l&apos;IA dans leur quotidien
          </h1>

          <p className="mt-6 text-lg text-zinc-300">
            Automatisation documentaire, assistants métier, tableaux de bord
            intelligents. Je construis des outils qui vous font gagner du temps
            — pas des gadgets.
          </p>

          {/* Audiences */}
          <div className="mt-6 flex flex-wrap gap-2">
            {audiences.map((audience) => (
              <span
                key={audience}
                className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-zinc-400"
              >
                {audience}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projets"
              className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              Voir mes réalisations
            </Link>
            <Link
              href="/methode"
              className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Comment je travaille
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Proposition de valeur */}
      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Vos données restent chez vous",
            description:
              "Solutions locales ou européennes. Anonymisation avant tout envoi vers des API externes.",
          },
          {
            title: "Adapté à vos outils existants",
            description:
              "Pas de migration risquée. Je m'intègre à vos logiciels métier, même anciens.",
          },
          {
            title: "Formation incluse",
            description:
              "Votre équipe sait utiliser l'outil sans moi. Documentation et support réactif.",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <h3 className="font-medium text-white">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Projets mis en avant */}
      <section className="glass-panel p-8 md:p-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Études de cas
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            Des projets concrets, des résultats mesurables
          </h2>
        </div>

        <div className="space-y-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/projets/${project.slug}`}
                className="group block rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                        {project.context.client}
                      </span>
                      <span className="text-xs text-zinc-600">•</span>
                      <span className="text-xs text-zinc-500">
                        {project.context.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white group-hover:text-emerald-200">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">{project.tldr}</p>

                    {/* Résultats clés */}
                    {project.results.metrics &&
                      project.results.metrics.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {project.results.metrics.slice(0, 2).map((m, j) => (
                            <span
                              key={j}
                              className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 text-xs text-emerald-300"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>

                  <span className="text-sm text-zinc-500 group-hover:text-emerald-300 md:mt-4">
                    Lire →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projets"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Voir tous les projets →
          </Link>
        </div>
      </section>

      {/* Process simplifié */}
      <section className="glass-panel p-8 md:p-10">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Comment ça se passe
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
            Un process simple et transparent
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Diagnostic gratuit",
              description:
                "30 minutes pour identifier les tâches automatisables et évaluer si l'IA peut aider.",
            },
            {
              step: "2",
              title: "Prototype en 2 semaines",
              description:
                "Une première version fonctionnelle à tester avec vos vraies données.",
            },
            {
              step: "3",
              title: "Déploiement + formation",
              description:
                "Outil en production, équipe formée, documentation fournie.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-xl font-semibold text-emerald-300">
                {item.step}
              </div>
              <h3 className="mt-4 font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/methode"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            En savoir plus sur ma méthode →
          </Link>
        </div>
      </section>

      {/* CTA final */}
      <motion.section
        className="glass-panel p-8 text-center md:p-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          Vous perdez du temps sur des tâches répétitives ?
        </h2>
        <p className="mt-4 text-zinc-400">
          Discutons de ce que l&apos;IA peut changer dans votre quotidien.
          <br />
          Premier appel gratuit, sans engagement.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-200"
        >
          Réserver un appel →
        </Link>
      </motion.section>
    </PageContainer>
  );
}
