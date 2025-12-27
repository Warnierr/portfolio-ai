"use client";

import Link from "next/link";
import { motion, type MotionProps } from "framer-motion";

import PageContainer from "@/components/PageContainer";
import StickyCTA from "@/components/StickyCtA";
import { caseStudies } from "@/data/projects";
import BackgroundDecoration from "@/components/BackgroundDecoration";

const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function LandingPage() {
  const featuredProjects = caseStudies.filter(p => p.type === "mission").slice(0, 3);

  return (
    <>
      <PageContainer className="gap-16">
        {/* Hero */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20 text-center sm:px-6">
          <BackgroundDecoration />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium tracking-wider text-emerald-400 backdrop-blur-md"
          >
            DISPONIBLE IMMÉDIATEMENT • TJM 450€
          </motion.div>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
            Raouf Warnier <br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Data Engineer & DevOps
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
            3+ ans d&apos;expérience en pipelines Big Data, automatisation et infrastructure.
            J&apos;accompagne les entreprises dans leurs projets data critiques.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            <span className="rounded-full border border-white/10 px-3 py-1">Spark / Hadoop</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Airflow / ETL</span>
            <span className="rounded-full border border-white/10 px-3 py-1">Ansible / CI-CD</span>
            <span className="rounded-full border border-white/10 px-3 py-1">PostgreSQL / MSSQL</span>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/projets"
              className="rounded-full bg-white px-8 py-4 font-bold text-black transition hover:bg-zinc-200"
            >
              Voir mes missions →
            </Link>
            <Link
              href="/agent"
              className="rounded-full border border-white/10 px-8 py-4 font-bold text-white transition hover:bg-white/5"
            >
              Parler à l&apos;agent IA
            </Link>
          </div>
        </section>

        {/* Expertise Grid */}
        <section className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Data Engineering",
              description: "Pipelines ETL/ELT avec Spark, Hadoop et Airflow. Architecture Data Lake et Data Warehouse.",
            },
            {
              title: "DevOps & Infrastructure",
              description: "Automatisation Ansible, CI/CD GitLab, monitoring Prometheus/Grafana. Cloud AWS/GCP/Azure.",
            },
            {
              title: "Big Data & Analytics",
              description: "Traitement de volumes massifs avec PySpark, Databricks. Migration et optimisation de bases de données.",
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

        {/* Clients */}
        <section className="glass-panel overflow-hidden p-8 md:p-12">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-zinc-500 mb-8">Clients récents</p>
          <div className="flex flex-wrap justify-center gap-8 text-xl font-semibold text-zinc-400">
            <span className="hover:text-white transition">Orange</span>
            <span className="hover:text-white transition">Safran</span>
            <span className="hover:text-white transition">ACC</span>
            <span className="hover:text-white transition">C40 Cities</span>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="glass-panel p-8 md:p-10">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Missions</p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Expériences récentes</h2>
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
                        <span className="text-xs uppercase tracking-[0.15em] text-zinc-500">{project.context.client}</span>
                        <span className="text-xs text-zinc-600">•</span>
                        <span className="text-xs text-zinc-500">{project.context.role}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-emerald-200">{project.title}</h3>
                      <p className="mt-2 text-sm text-zinc-400">{project.tldr}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech) => (
                          <span key={tech} className="text-xs text-zinc-500 bg-white/5 px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-zinc-500 group-hover:text-emerald-300 md:mt-4">Détails →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          className="glass-panel p-8 text-center md:p-12 mb-10"
          {...fadeUp}
        >
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Un projet data en tête ?</h2>
          <p className="mt-4 text-zinc-400">Discutons de vos besoins en pipelines, automatisation ou infrastructure.</p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              Me contacter
            </Link>
            <a
              href="mailto:rww.warnier@gmail.com"
              className="text-sm text-zinc-400 hover:text-white transition"
            >
              rww.warnier@gmail.com
            </a>
          </div>
        </motion.section>
      </PageContainer>

      <StickyCTA text="Parler à l'agent" href="/agent" />
    </>
  );
}
