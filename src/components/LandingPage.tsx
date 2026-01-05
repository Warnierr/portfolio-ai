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

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

// Services orientés valeur (pas technos)
const services = [
  {
    title: "Data Engineering & Pipelines",
    description: "Conception et industrialisation de pipelines ETL/ELT. Migration de systèmes legacy vers architectures modernes et scalables.",
    result: "Données fiables en production",
    icon: "⚙️",
  },
  {
    title: "Plateformes & Produits Data",
    description: "Création de plateformes analytics, dashboards et APIs data. Architecture orientée produit pour valoriser vos données.",
    result: "Produits data exploitables",
    icon: "📊",
  },
  {
    title: "Automatisation & DataOps",
    description: "CI/CD, monitoring, alerting et fiabilisation des flux. Industrialisation des processus data pour une qualité garantie.",
    result: "Opérations automatisées",
    icon: "🔄",
  },
  {
    title: "Outils Internes & Applications",
    description: "Développement d'applications web et outils métier intégrant l'intelligence des données. Du prototype au produit fini.",
    result: "Solutions sur-mesure",
    icon: "🛠️",
  },
];

// Produits SaaS / Experiments
const products = [
  {
    name: "Budget AI",
    tagline: "Assistant Financier Intelligent",
    description: "Transforme vos dépenses en conseils stratégiques. Prédictions, détection d'abonnements et coaching IA.",
    status: "Live Demo",
    href: "/projets/budget-ai",
    color: "emerald",
  },
  {
    name: "Expérimentations",
    tagline: "Prototypes & Open-Source",
    description: "Outils data, agents IA et MVPs en développement. Laboratoire d'innovation continue.",
    status: "En cours",
    href: "/projets",
    color: "blue",
  },
];

export default function LandingPage() {
  const featuredProjects = caseStudies.filter(p => p.type === "mission").slice(0, 3);

  return (
    <>
      <PageContainer className="gap-16">
        {/* ══════════════════════════════════════════════════════════════════
            HERO SECTION - Nouveau positionnement Ingénieur Produit Data
        ══════════════════════════════════════════════════════════════════ */}
        <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pt-20 text-center sm:px-6">
          <BackgroundDecoration />

          {/* 3 Spécialités principales - Design premium avec hover effects */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 px-10 py-5 backdrop-blur-md transition-all hover:scale-105 hover:border-emerald-500/60 hover:shadow-2xl hover:shadow-emerald-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <h1 className="relative text-3xl font-bold tracking-tight text-emerald-300 sm:text-4xl lg:text-5xl">Data Engineering</h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative overflow-hidden rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-500/20 to-blue-500/5 px-10 py-5 backdrop-blur-md transition-all hover:scale-105 hover:border-blue-500/60 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <h1 className="relative text-3xl font-bold tracking-tight text-blue-300 sm:text-4xl lg:text-5xl">AI Product Builder</h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative overflow-hidden rounded-3xl border border-purple-500/40 bg-gradient-to-br from-purple-500/20 to-purple-500/5 px-10 py-5 backdrop-blur-md transition-all hover:scale-105 hover:border-purple-500/60 hover:shadow-2xl hover:shadow-purple-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <h1 className="relative text-3xl font-bold tracking-tight text-purple-300 sm:text-4xl lg:text-5xl">DevOps Automation</h1>
            </motion.div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-zinc-300 sm:text-xl"
          >
            Des pipelines de données aux produits scalables.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-2 max-w-3xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Conception de systèmes data end-to-end — de l&apos;ingestion ETL
            aux applications IA et plateformes SaaS en production.
          </motion.p>

          {/* Tags orientés valeur (pas technos) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-3 text-[11px] uppercase tracking-[0.15em]"
          >
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-emerald-300">
              Data Pipelines
            </span>
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-blue-300">
              Data Platforms
            </span>
            <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-purple-300">
              Applications Data
            </span>
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-amber-300">
              Automation
            </span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Link
              href="/projets"
              className="rounded-full bg-white px-8 py-4 font-bold text-black transition hover:bg-zinc-200"
            >
              Voir mes réalisations →
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Me contacter
            </Link>
          </motion.div>

          {/* Indicateur France / Remote */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 text-sm text-zinc-500"
          >
            France • Remote • Europe
          </motion.p>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            WORK MODES - Modes d'intervention
        ══════════════════════════════════════════════════════════════════ */}
        <motion.section 
          className="glass-panel p-6 md:p-8"
          {...fadeUp}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">Modes d&apos;intervention</p>
              <h2 className="text-xl font-semibold text-white">Flexible selon vos besoins</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-5 py-3">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <p className="font-medium text-white">Freelance</p>
                  <p className="text-xs text-zinc-400">Missions data & produit</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 px-5 py-3">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                <div>
                  <p className="font-medium text-white">Long terme</p>
                  <p className="text-xs text-zinc-400">CDI / Consulting</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════
            SERVICES - Orientés valeur, pas technos
        ══════════════════════════════════════════════════════════════════ */}
        <section>
          <div className="mb-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-2">Services</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Ce que je construis</h2>
            <p className="mt-2 text-zinc-400 max-w-xl mx-auto">
              Des solutions data orientées produit, de la conception à la production.
            </p>
          </div>

          <motion.div 
            className="grid gap-4 md:grid-cols-2"
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={staggerItem}
                className="glass-panel p-6 group hover:border-white/20 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{service.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-emerald-200 transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-400">{service.description}</p>
                    <p className="mt-3 text-sm text-emerald-300">→ {service.result}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            PRODUCTS & SAAS - Capacité builder
        ══════════════════════════════════════════════════════════════════ */}
        <motion.section 
          className="glass-panel p-8 md:p-10"
          {...fadeUp}
        >
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-2">Produits & SaaS</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Je construis aussi mes propres produits</h2>
            <p className="mt-2 text-zinc-400">
              Au-delà des missions clients, je développe des solutions data en mode produit.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className={`group rounded-xl border bg-white/5 p-6 transition hover:bg-white/10 ${
                  product.color === "emerald" 
                    ? "border-emerald-500/20 hover:border-emerald-500/40" 
                    : "border-blue-500/20 hover:border-blue-500/40"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    product.color === "emerald" 
                      ? "bg-emerald-500/20 text-emerald-300" 
                      : "bg-blue-500/20 text-blue-300"
                  }`}>
                    {product.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-200 transition-colors">
                  {product.name}
                </h3>
                <p className={`text-sm mt-1 ${
                  product.color === "emerald" ? "text-emerald-400" : "text-blue-400"
                }`}>
                  {product.tagline}
                </p>
                <p className="text-sm text-zinc-400 mt-3">{product.description}</p>
                <span className="inline-block mt-4 text-sm text-zinc-500 group-hover:text-white transition-colors">
                  Découvrir →
                </span>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════
            SYSTEMS & STRATEGY - Différenciant clé
        ══════════════════════════════════════════════════════════════════ */}
        <motion.section 
          className="glass-panel p-8 md:p-10 border-l-4 border-l-emerald-500/50"
          {...fadeUp}
        >
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-4">Vision Système</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl leading-tight">
              Je pense en systèmes, pas en fonctionnalités.
            </h2>
            <p className="mt-6 text-lg text-zinc-300 leading-relaxed">
              Architecture long terme, scalabilité, éthique des données et décisions d&apos;ingénierie orientées produit.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-emerald-300">End-to-End</p>
                <p className="text-xs text-zinc-400 mt-1">De l&apos;ingestion au produit</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-blue-300">Scalable</p>
                <p className="text-xs text-zinc-400 mt-1">Architectures évolutives</p>
              </div>
              <div className="rounded-lg bg-white/5 p-4 text-center">
                <p className="text-2xl font-bold text-purple-300">Production</p>
                <p className="text-xs text-zinc-400 mt-1">Qualité industrielle</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ══════════════════════════════════════════════════════════════════
            CLIENTS - Social Proof
        ══════════════════════════════════════════════════════════════════ */}
        <section className="glass-panel overflow-hidden p-8 md:p-12">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-zinc-500 mb-8">
            Environnements critiques — Banque, Télécom, Industrie
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-xl font-semibold text-zinc-400">
            <span className="hover:text-white transition cursor-default">BNP Paribas</span>
            <span className="hover:text-white transition cursor-default">Orange</span>
            <span className="hover:text-white transition cursor-default">Safran</span>
            <span className="hover:text-white transition cursor-default">ACC</span>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            FEATURED PROJECTS - Focus impact
        ══════════════════════════════════════════════════════════════════ */}
        <section className="glass-panel p-8 md:p-10">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Réalisations</p>
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
                      {/* Impact plutôt que stack */}
                      {project.results.metrics && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.results.metrics.slice(0, 2).map((metric) => (
                            <span key={metric} className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                              {metric}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-zinc-500 group-hover:text-emerald-300 md:mt-4">Détails →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
            >
              Voir toutes les réalisations →
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CTA FINAL
        ══════════════════════════════════════════════════════════════════ */}
        <motion.section
          className="glass-panel p-8 text-center md:p-12 mb-10"
          {...fadeUp}
        >
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Un projet data en tête ?</h2>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Discutons de vos besoins en pipelines, plateformes ou produits data.
          </p>
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
