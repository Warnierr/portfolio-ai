"use client";

import Link from "next/link";
import { motion, type MotionProps } from "framer-motion";

import PageContainer from "@/components/PageContainer";
import StickyCTA from "@/components/StickyCtA";
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
];

export default function LandingPage() {
  const featuredProjects = caseStudies
    .filter((p) => p.type === "mission")
    .slice(0, 2)
    .concat(caseStudies.filter((p) => p.type === "produit").slice(0, 1));

  return (
    <>
      <PageContainer className="gap-16">
        {/* Hero */}
        <motion.section className="glass-panel p-8 md:p-12" {...fadeUp}>
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
              Kenshu Dev
            </p>

            <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
              Développeur IA spécialisé TPE/PME
            </h1>

            <p className="mt-6 text-lg text-zinc-300">
              Je construis des outils d&apos;automatisation pour les métiers du
              tertiaire. OCR documentaire, chatbots métier, dashboards
              intelligents.
            </p>

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

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/projets"
                className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
              >
                Voir les projets
              </Link>
              <Link
                href="/methode"
                className="rounded-full border border-white/30 px-6 py-3 font-medium text-white transition hover:bg-white/10"
              >
                Ma méthode
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Ce que je fais */}
        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Données locales",
              description:
                "Hébergement européen ou sur site. Anonymisation systématique avant envoi vers les API.",
            },
            {
              title: "Intégration douce",
              description:
                "Je m'adapte à vos logiciels existants. Pas de migration, pas de changement d'habitudes.",
            },
            {
              title: "Transfert inclus",
              description:
                "Formation de l'équipe et documentation. L'outil doit fonctionner sans moi.",
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

        {/* Projets */}
        <section className="glass-panel p-8 md:p-10">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Études de cas
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Projets récents
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

                      <p className="mt-2 text-sm text-zinc-400">
                        {project.tldr}
                      </p>

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
              Tous les projets →
            </Link>
          </div>
        </section>

        {/* Process */}
        <section className="glass-panel p-8 md:p-10">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Process
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Comment je travaille
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Diagnostic",
                description:
                  "30 min pour identifier ce qui peut être automatisé. Gratuit.",
              },
              {
                step: "2",
                title: "Prototype",
                description:
                  "Première version fonctionnelle en 1-2 semaines. Test sur vos données.",
              },
              {
                step: "3",
                title: "Déploiement",
                description:
                  "Mise en production et formation de l'équipe. Documentation fournie.",
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
              Détails de la méthode →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <motion.section
          className="glass-panel p-8 text-center md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Un projet en tête ?
          </h2>
          <p className="mt-4 text-zinc-400">
            Premier appel gratuit pour évaluer si l&apos;IA peut aider.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            Prendre contact
          </Link>
        </motion.section>
      </PageContainer>

      <StickyCTA text="Contact" href="/contact" />
    </>
  );
}
