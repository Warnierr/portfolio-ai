import type { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import TechAccordion from "@/components/TechAccordion";

export const metadata: Metadata = {
  title: "À propos — Raouf Warnier | Data Engineer Freelance",
  description: "Parcours professionnel, compétences techniques, certifications et tarifs. 7+ ans d'expérience Data Engineering chez BNP Paribas, Orange, Safran. Stack : Spark, Airflow, Python, DevOps.",
  alternates: {
    canonical: "/a-propos",
  },
  openGraph: {
    title: "À propos — Raouf Warnier | Data Engineer Freelance",
    description: "Parcours professionnel, compétences techniques, certifications et tarifs. 7+ ans d'expérience Data Engineering.",
    url: "https://kenshu.dev/a-propos",
  },
};

export default function AProposPage() {
  return (
    <PageContainer className="gap-10">
      {/* Hero */}
      <section className="glass-panel p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
          À propos
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
          Raouf Warnier — Data Engineer Freelance
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-zinc-300">
          7+ ans d'expérience en Data Engineering, Big Data et DevOps.
          Spécialisé en industrialisation de pipelines critiques pour grands comptes
          (BNP Paribas, Orange, Safran) et développement de produits Data/IA pour startups et PME.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
            Freelance
          </span>
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
            Disponible immédiatement
          </span>
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
            Remote / Hybride / Présentiel
          </span>
        </div>
      </section>

      {/* Parcours professionnel */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-8">Parcours professionnel</h2>

        <div className="space-y-8">
          <div className="border-l-4 border-emerald-500/30 pl-6">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-emerald-300">2025</p>
                <h3 className="text-xl font-semibold text-white mt-1">Ingénieur Data / Big Data</h3>
                <p className="text-zinc-400">BNP Paribas</p>
              </div>
              <span className="text-sm text-zinc-500">Sept - Déc 2025</span>
            </div>

            {/* Résultat business visible */}
            <p className="mt-3 text-white font-medium">
              Migration de pipelines financiers critiques sans interruption de service
            </p>

            {/* Détails techniques en accordéon */}
            <TechAccordion
              title="Détails mission"
              technologies={["Scala", "Spark", "Airflow", "Jenkins", "SQL"]}
              description={`• Migration d'ETL legacy vers architecture moderne Spark/Airflow
• Debugging de pipelines complexes sur flux financiers critiques
• Développement Scala, Spark SQL, automatisation Jenkins
• Documentation technique détaillée pour transfert de compétences`}
            />
          </div>

          <div className="border-l-4 border-blue-500/30 pl-6">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-blue-300">2024-2025</p>
                <h3 className="text-xl font-semibold text-white mt-1">Ingénieur DevOps</h3>
                <p className="text-zinc-400">Orange (via Inetum)</p>
              </div>
              <span className="text-sm text-zinc-500">Depuis Août 2024</span>
            </div>

            {/* Résultat business visible */}
            <p className="mt-3 text-white font-medium">
              Automatisation complète du déploiement Big Data, migration de données sans perte
            </p>

            {/* Détails techniques en accordéon */}
            <TechAccordion
              title="Détails mission"
              technologies={["Ansible", "Zeppelin", "Airflow", "Spark", "Grafana", "Linux"]}
              description={`• Automatisation du déploiement des outils Big Data (Zeppelin, Airflow, Spark, Grafana)
• Playbooks Ansible pour déploiement reproductible et idempotent
• Migration de données critiques MariaDB → MSSQL avec zéro perte
• Monitoring Prometheus/Grafana, scripts Shell pour surveillance`}
            />
          </div>

          <div className="border-l-4 border-purple-500/30 pl-6">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-purple-300">2023-2024</p>
                <h3 className="text-xl font-semibold text-white mt-1">Consultant IoT & Base de Données</h3>
                <p className="text-zinc-400">Safran (via Inetum)</p>
              </div>
              <span className="text-sm text-zinc-500">Juin 2023 - Août 2024</span>
            </div>

            {/* Résultat business visible */}
            <p className="mt-3 text-white font-medium">
              Plateforme IoT temps réel pour surveillance qualité aéronautique
            </p>

            {/* Détails techniques en accordéon */}
            <TechAccordion
              title="Détails mission"
              technologies={["ThingWorx", "JavaScript", "SQL", "PostgreSQL", "MSSQL", "GitLab CI"]}
              description={`• Développement de solutions data IoT avec ThingWorx (plateforme industrielle)
• Migration PostgreSQL vers MSSQL avec validation intégrité données
• Pipelines CI/CD GitLab avec PowerShell, tests automatisés Jest (85% couverture)
• Workshops internationaux en anglais, documentation technique`}
            />
          </div>

          <div className="border-l-4 border-amber-500/30 pl-6">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-300">2022-2023</p>
                <h3 className="text-xl font-semibold text-white mt-1">Data Engineer</h3>
                <p className="text-zinc-400">ACC Industrie 4.0 (via Inetum)</p>
              </div>
              <span className="text-sm text-zinc-500">Sept 2022 - Juin 2023</span>
            </div>

            {/* Résultat business visible */}
            <p className="mt-3 text-white font-medium">
              Pipelines Big Data industriels : -40% coûts, temps de traitement divisé par 3
            </p>

            {/* Détails techniques en accordéon */}
            <TechAccordion
              title="Détails mission"
              technologies={["Spark", "Hadoop", "Airflow", "MinIO", "Python", "SQL"]}
              description={`• Développement de pipelines Big Data (Spark, Hadoop, Airflow)
• Traitement de volumes massifs (TBs) pour données industrielles
• Ingestion MinIO → SQL via Airflow, optimisation performances
• Réduction des coûts de traitement de 40%, temps divisé par 3`}
            />
          </div>
        </div>
      </section>

      {/* Stack technique */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-8">Stack Technique</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-emerald-300 mb-4">Big Data & Pipelines</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">Apache Spark</p>
                <p className="text-sm text-zinc-400">Scala, PySpark — Expert (7 ans)</p>
              </div>
              <div>
                <p className="text-white font-medium">Apache Airflow</p>
                <p className="text-sm text-zinc-400">Orchestration — Expert</p>
              </div>
              <div>
                <p className="text-white font-medium">Hadoop, MinIO</p>
                <p className="text-sm text-zinc-400">Stockage distribué</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">Langages</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">Python</p>
                <p className="text-sm text-zinc-400">Data Engineering, automation, scripts</p>
              </div>
              <div>
                <p className="text-white font-medium">Scala</p>
                <p className="text-sm text-zinc-400">Spark, pipelines critiques</p>
              </div>
              <div>
                <p className="text-white font-medium">TypeScript, SQL, Shell</p>
                <p className="text-sm text-zinc-400">Web, queries, automation</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">DevOps & Automation</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">Ansible</p>
                <p className="text-sm text-zinc-400">Déploiement automatisé, idempotent</p>
              </div>
              <div>
                <p className="text-white font-medium">Docker, Proxmox</p>
                <p className="text-sm text-zinc-400">Conteneurisation, virtualisation</p>
              </div>
              <div>
                <p className="text-white font-medium">Jenkins, GitLab CI</p>
                <p className="text-sm text-zinc-400">Pipelines CI/CD</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-amber-300 mb-4">Bases de données</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">PostgreSQL</p>
                <p className="text-sm text-zinc-400">Base principale, optimisation queries</p>
              </div>
              <div>
                <p className="text-white font-medium">MSSQL, MariaDB</p>
                <p className="text-sm text-zinc-400">Migrations, environnements entreprise</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Observabilité</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">Grafana, Prometheus</p>
                <p className="text-sm text-zinc-400">Monitoring, métriques, alerting</p>
              </div>
              <div>
                <p className="text-white font-medium">Loki</p>
                <p className="text-sm text-zinc-400">Logs centralisés</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-pink-300 mb-4">IA & Web</h3>
            <div className="space-y-3">
              <div>
                <p className="text-white font-medium">n8n, OpenRouter</p>
                <p className="text-sm text-zinc-400">Automation, LLM orchestration</p>
              </div>
              <div>
                <p className="text-white font-medium">Next.js, React</p>
                <p className="text-sm text-zinc-400">Applications web, SaaS</p>
              </div>
              <div>
                <p className="text-white font-medium">RAG, Agents LLM</p>
                <p className="text-sm text-zinc-400">IA conversationnelle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formation & Certifications */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Formation & Certifications</h2>
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="font-semibold text-white">ESIEE Paris</p>
            <p className="text-sm text-zinc-400 mt-1">École d'ingénieurs — Informatique et Systèmes Embarqués</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="font-semibold text-white">Veille continue</p>
            <p className="text-sm text-zinc-400 mt-1">
              AI Act, RGPD, DataOps best practices, Spark/Airflow évolutions,
              architectures RAG, observabilité moderne
            </p>
          </div>
        </div>
      </section>

      {/* Tarifs & Modalités */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Tarifs & Modalités</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <p className="text-xs uppercase tracking-wider text-emerald-300">Freelance</p>
            <p className="text-2xl font-bold text-white mt-2">Sur devis</p>
            <p className="text-sm text-zinc-400 mt-1">selon le projet</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>• Missions Data Engineering</li>
              <li>• Infrastructure DevOps</li>
              <li>• Big Data consulting</li>
              <li>• Minimum 3 mois</li>
            </ul>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
            <p className="text-xs uppercase tracking-wider text-blue-300">Projets sur-mesure</p>
            <p className="text-2xl font-bold text-white mt-2">Sur devis</p>
            <p className="text-sm text-zinc-400 mt-1">selon la complexité</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>• Sites web (Next.js)</li>
              <li>• Agents IA & chatbots</li>
              <li>• Automatisations n8n/Make</li>
              <li>• Délai 1-3 mois</li>
            </ul>
          </div>

          <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6">
            <p className="text-xs uppercase tracking-wider text-purple-300">Disponibilité</p>
            <p className="text-2xl font-bold text-white mt-2">Immédiate</p>
            <p className="text-sm text-zinc-400 mt-1">plusieurs modalités</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>• Remote (France/Europe)</li>
              <li>• Hybride</li>
              <li>• Présentiel (Île-de-France)</li>
              <li>• Flexibilité selon projet</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold text-white mb-3">Ce qui est inclus dans mes missions</h3>
          <ul className="grid gap-2 md:grid-cols-2 text-sm text-zinc-300">
            <li>• Analyse et cadrage du besoin</li>
            <li>• Développement et mise en production</li>
            <li>• Documentation technique détaillée</li>
            <li>• Transfert de compétences à l'équipe</li>
            <li>• Support post-livraison (période définie)</li>
            <li>• Code reviews et best practices</li>
          </ul>
        </div>
      </section>

      {/* Coordonnées */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Me contacter</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">Email</p>
            <a href="mailto:contact@kenshu.dev" className="text-lg font-medium text-white hover:text-emerald-300 transition">
              contact@kenshu.dev
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">Calendrier</p>
            <a href="https://cal.com/raouf-warnier-zatji4" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:text-emerald-300 transition">
              Réserver un appel
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">LinkedIn</p>
            <a href="https://linkedin.com/in/raouf-warnier" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:text-emerald-300 transition">
              linkedin.com/in/raouf-warnier
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-400">GitHub</p>
            <a href="https://github.com/warnierr" target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-white hover:text-emerald-300 transition">
              github.com/warnierr
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-zinc-400 mb-4">Premier appel de 30 minutes gratuit pour diagnostic</p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 font-medium text-black hover:bg-zinc-200 transition"
          >
            Discuter de votre projet
          </Link>
        </div>
      </section>

      {/* Schema.org Person ultra-détaillé */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Raouf Warnier",
            "jobTitle": "Data Engineer, AI Product Builder, DevOps Specialist",
            "description": "Expert Data Engineering, AI Product Builder & DevOps Automation avec 7+ ans d'expérience. Spécialisé en pipelines Big Data (Spark, Airflow), applications IA, plateformes SaaS et automatisation.",
            "url": "https://kenshu.dev",
            "email": "contact@kenshu.dev",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR",
              "addressLocality": "France",
              "addressRegion": "Île-de-France"
            },
            "alumniOf": {
              "@type": "Organization",
              "name": "ESIEE Paris",
              "sameAs": "https://www.esiee.fr"
            },
            "knowsAbout": [
              "Data Engineering",
              "Apache Spark",
              "Apache Airflow",
              "Big Data",
              "Python",
              "Scala",
              "DevOps",
              "Ansible",
              "Docker",
              "Kubernetes",
              "Jenkins",
              "GitLab CI",
              "PostgreSQL",
              "MSSQL",
              "MariaDB",
              "Grafana",
              "Prometheus",
              "AI Product Development",
              "Machine Learning",
              "RAG",
              "LLM Agents",
              "n8n Automation",
              "Next.js",
              "React",
              "AI Compliance",
              "RGPD",
              "AI Act",
              "ETL Development",
              "Data Pipelines",
              "Cloud Computing"
            ],
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Data Engineer",
              "occupationalCategory": "15-1254.00",
              "experienceRequirements": "7+ years",
              "skills": "Apache Spark, Apache Airflow, Python, Scala, DevOps, Big Data"
            },
            "worksFor": [
              {
                "@type": "Organization",
                "name": "BNP Paribas",
                "startDate": "2025-09",
                "endDate": "2025-12"
              },
              {
                "@type": "Organization",
                "name": "Orange",
                "startDate": "2024-08"
              },
              {
                "@type": "Organization",
                "name": "Safran",
                "startDate": "2023-06",
                "endDate": "2024-08"
              },
              {
                "@type": "Organization",
                "name": "ACC Industrie 4.0",
                "startDate": "2022-09",
                "endDate": "2023-06"
              }
            ],
            "sameAs": [
              "https://www.linkedin.com/in/raouf-warnier",
              "https://github.com/warnierr",
              "https://kenshu.dev"
            ]
          })
        }}
      />
    </PageContainer>
  );
}
