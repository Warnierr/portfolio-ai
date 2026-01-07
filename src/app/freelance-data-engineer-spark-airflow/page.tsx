import type { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export const metadata: Metadata = {
  title: "Data Engineer Freelance Spark & Airflow — Expertise Production | Kenshu",
  description: "Data Engineer freelance expert Spark & Airflow. 7+ ans en prod (BNP Paribas, Orange, Safran). Migration ETL, orchestration, optimisation. TJM 450€. Disponible immédiatement.",
  alternates: {
    canonical: "/freelance-data-engineer-spark-airflow",
  },
  openGraph: {
    title: "Data Engineer Freelance Spark & Airflow",
    description: "Expert Spark (Scala, PySpark) et Airflow. 7+ ans d'expérience en production. TJM 450€.",
    url: "https://kenshu.dev/freelance-data-engineer-spark-airflow",
  },
};

export default function FreelanceSparkAirflowPage() {
  return (
    <PageContainer className="gap-10">
      {/* Hero */}
      <section className="glass-panel p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
          Freelance Data Engineering
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
          Data Engineer Freelance Spark & Airflow — Expertise Production
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-zinc-300">
          7+ ans d'expérience en Data Engineering avec Apache Spark (Scala, PySpark) et
          Apache Airflow en environnements critiques : BNP Paribas, Orange, Safran, ACC Industrie.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full border border-emerald-450/30 bg-emerald-450/10 px-4 py-1.5 text-sm text-emerald-300">
            TJM 450€
          </span>
          <span className="rounded-full border border-blue-450/30 bg-blue-450/10 px-4 py-1.5 text-sm text-blue-300">
            Disponible immédiatement
          </span>
          <span className="rounded-full border border-purple-450/30 bg-purple-450/10 px-4 py-1.5 text-sm text-purple-300">
            Remote / Hybride / Présentiel
          </span>
        </div>
      </section>

      {/* Qui je suis */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-4">Qui je suis</h2>
        <p className="text-zinc-300">
          Je m'appelle <strong>Raouf Warnier</strong>. Data Engineer freelance spécialisé en <strong>Big Data</strong>,
          <strong> Apache Spark</strong> et <strong>Apache Airflow</strong>.
        </p>
        <p className="text-zinc-300 mt-4">
          Mon expertise : industrialiser des pipelines data instables en systèmes fiables, scalables et observables.
          J'interviens sur des migrations ETL legacy, de l'optimisation de jobs Spark, de l'orchestration Airflow
          et de la mise en place de DataOps complets (CI/CD, monitoring, alerting).
        </p>
        <p className="text-zinc-300 mt-4">
          J'ai travaillé chez <strong>BNP Paribas</strong> (migration ETL critique, debugging Spark SQL),
          <strong> Orange</strong> (automatisation déploiement Big Data via Ansible),
          <strong> Safran</strong> (pipelines IoT industriels),
          <strong> ACC Industrie 4.0</strong> (réduction 40% coûts traitement, temps divisé par 3).
        </p>
      </section>

      {/* Compétences techniques */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Compétences techniques Spark & Airflow</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-450/20 bg-emerald-450/5 p-6">
            <h3 className="text-xl font-semibold text-emerald-300 mb-4">Apache Spark</h3>
            <p className="text-sm text-zinc-400 mb-4">Expert — 7 ans en production</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• <strong>Langages</strong> : Scala (prioritaire), PySpark</li>
              <li>• <strong>APIs</strong> : RDD, DataFrame, Dataset, Spark SQL</li>
              <li>• <strong>Optimisations</strong> : Partitioning, broadcast joins, cache strategies</li>
              <li>• <strong>Debugging</strong> : OOM fixes, shuffle optimization, skewed data</li>
              <li>• <strong>Tuning</strong> : Memory management, executor sizing, parallelism</li>
              <li>• <strong>Environnements</strong> : Hadoop, standalone, K8s</li>
            </ul>
          </div>

          <div className="rounded-xl border border-blue-450/20 bg-blue-450/5 p-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Apache Airflow</h3>
            <p className="text-sm text-zinc-400 mb-4">Expert — Orchestration complexe</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• <strong>Architecture</strong> : DAGs, operators, sensors, hooks</li>
              <li>• <strong>Patterns</strong> : Idempotence, retry logic, error handling</li>
              <li>• <strong>Monitoring</strong> : Grafana/Prometheus, alerting Telegram/Slack</li>
              <li>• <strong>CI/CD</strong> : GitLab CI, tests automatisés, validation DAGs</li>
              <li>• <strong>Scaling</strong> : CeleryExecutor, KubernetesExecutor</li>
              <li>• <strong>Intégrations</strong> : Spark, PostgreSQL, APIs externes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Cas d'usage typiques */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Cas d'usage typiques</h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Migration ETL legacy vers Spark</h3>
            <p className="text-zinc-300 mb-4">
              Remplacement de systèmes ETL vieillissants (scripts Shell, jobs propriétaires) par
              pipelines Spark modernes, testables et maintenables.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Exemple récent</strong> : BNP Paribas — Migration ETL bancaires critiques vers Spark/Airflow.
              Reverse engineering de la logique legacy, réécriture Scala, validation par tests automatisés.
              100% des flux migrés sans régression.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Orchestration Airflow de pipelines distribués</h3>
            <p className="text-zinc-300 mb-4">
              Mise en place d'Airflow pour orchestrer des jobs Spark, ingestions PostgreSQL/MSSQL,
              appels APIs, génération de rapports. DAGs idempotents avec retry intelligent.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Exemple récent</strong> : Orange — Automatisation déploiement Airflow (+ Zeppelin, Spark, Grafana)
              via playbooks Ansible. Réduction de 80% du temps de déploiement.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Optimisation de jobs Spark lents</h3>
            <p className="text-zinc-300 mb-4">
              Diagnostic de jobs Spark qui prennent des heures ou crashent (OOM, shuffle errors).
              Refactoring avec partitioning adapté, broadcast joins, tuning mémoire.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Exemple récent</strong> : ACC Industrie 4.0 — Optimisation pipelines TBs.
              Temps de traitement divisé par 3, coûts réduits de 40%.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Debugging & Stabilisation production</h3>
            <p className="text-zinc-300 mb-4">
              Intervention sur pipelines qui cassent en production. Analyse logs, Spark UI, métriques.
              Corrections rapides + plan de prévention long-terme.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Approche</strong> : Diagnostic en 2-3 jours, hotfix si urgent, refactoring structuré ensuite.
              Formation équipe pour autonomie future.
            </p>
          </div>
        </div>
      </section>

      {/* Tarifs & Modalités */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Tarifs et modalités</h2>

        <div className="rounded-xl border border-emerald-450/30 bg-emerald-450/5 p-8">
          <div className="flex items-baseline gap-3">
            <p className="text-5xl font-bold text-white">450€</p>
            <p className="text-zinc-400">/ jour (TJM)</p>
          </div>

          <div className="mt-6 space-y-3 text-zinc-300">
            <p>✅ Analyse et cadrage du besoin</p>
            <p>✅ Développement et mise en production</p>
            <p>✅ Documentation technique complète</p>
            <p>✅ Transfert de compétences à l'équipe</p>
            <p>✅ Support post-livraison (période définie)</p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm text-zinc-400">
            <p><strong className="text-white">Durée minimale</strong> : 3 mois (renouvelable)</p>
            <p><strong className="text-white">Modalités</strong> : Remote (France/Europe), Hybride, Présentiel (IDF)</p>
            <p><strong className="text-white">Disponibilité</strong> : Immédiate</p>
            <p><strong className="text-white">Premier contact</strong> : Appel gratuit 30 minutes</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Questions fréquentes</h2>

        <div className="space-y-6">
          <div className="border-l-2 border-emerald-450/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Quelle est votre expérience Spark en production ?</h3>
            <p className="text-zinc-300">
              7 ans d'expérience avec Spark (depuis 2018). Missions chez BNP Paribas (migration ETL bancaires critiques),
              Orange (infrastructure Big Data), ACC Industrie 4.0 (pipelines TBs). Compétences : Scala prioritairement,
              PySpark, optimisation jobs (OOM, shuffle, partitioning), debugging complexe.
            </p>
          </div>

          <div className="border-l-2 border-emerald-450/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Maîtrisez-vous Scala ou PySpark ?</h3>
            <p className="text-zinc-300">
              Les deux. Scala en priorité pour environnements critiques (typage fort, performances).
              PySpark pour prototypage rapide et équipes Python-first. Choix selon contexte projet et équipe existante.
            </p>
          </div>

          <div className="border-l-2 border-emerald-450/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Pouvez-vous intervenir en environnement bancaire ?</h3>
            <p className="text-zinc-300">
              Oui, expérience récente BNP Paribas (sept-déc 2025) sur flux financiers critiques.
              Familier avec : sécurité renforcée, traçabilité, RGPD strict, SLA stricts, processus de validation
              lourds, séparation des accès.
            </p>
          </div>

          <div className="border-l-2 border-emerald-450/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Faites-vous de l'optimisation de jobs Spark existants ?</h3>
            <p className="text-zinc-300">
              Oui, c'est un cas d'usage fréquent. Je diagnostique les jobs lents ou instables (OOM, shuffle errors,
              skewed data) via logs, Spark UI et métriques. Puis j'applique : partitioning adapté, broadcast joins,
              tuning mémoire, caching stratégique. Résultats typiques : -50% temps exécution, stabilité garantie.
            </p>
          </div>

          <div className="border-l-2 border-emerald-450/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Quelle est votre approche pour Airflow ?</h3>
            <p className="text-zinc-300">
              Patterns anti-fragiles : DAGs idempotents, retry intelligents (pas infinis), gestion erreurs explicite,
              monitoring Grafana/Prometheus, alerting Telegram/Slack. Déploiement automatisé via Ansible ou CI/CD GitLab.
              Stack complémentaire avec n8n pour workflows low-code.
            </p>
          </div>

          <div className="border-l-2 border-emerald-450/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Proposez-vous du remote uniquement ou aussi du présentiel ?</h3>
            <p className="text-zinc-300">
              Les deux. Full remote (France/Europe), hybride ou 100% présentiel (Île-de-France principalement).
              Flexibilité selon les besoins du projet et les contraintes de sécurité/collaboration.
            </p>
          </div>

          <div className="border-l-2 border-emerald-450/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Quelle est la durée minimale d'une mission ?</h3>
            <p className="text-zinc-300">
              3 mois minimum pour une mission freelance, renouvelable. Cela permet une véritable montée en compétences
              sur le contexte métier et une livraison de valeur durable (pas juste du dépannage).
            </p>
          </div>
        </div>
      </section>

      {/* Expériences clés */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Expériences clés avec Spark & Airflow</h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">BNP Paribas — Migration ETL</h3>
                <p className="text-sm text-zinc-400">Sept - Déc 2025 | Data Engineer</p>
              </div>
            </div>
            <p className="text-zinc-300 mb-4">
              Migration de pipelines ETL legacy vers architecture moderne Spark/Airflow.
              Debugging de jobs complexes sur flux financiers critiques.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-emerald-450/20 text-emerald-300 px-3 py-1 rounded-full">Scala</span>
              <span className="text-xs bg-emerald-450/20 text-emerald-300 px-3 py-1 rounded-full">Spark SQL</span>
              <span className="text-xs bg-emerald-450/20 text-emerald-300 px-3 py-1 rounded-full">Jenkins</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Orange — Infrastructure Big Data</h3>
                <p className="text-sm text-zinc-400">Depuis Août 2024 | DevOps Engineer</p>
              </div>
            </div>
            <p className="text-zinc-300 mb-4">
              Automatisation du déploiement d'Airflow, Zeppelin, Spark et Grafana via Ansible.
              Réduction de 80% du temps de déploiement. Migration MariaDB → MSSQL.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-blue-450/20 text-blue-300 px-3 py-1 rounded-full">Ansible</span>
              <span className="text-xs bg-blue-450/20 text-blue-300 px-3 py-1 rounded-full">Airflow</span>
              <span className="text-xs bg-blue-450/20 text-blue-300 px-3 py-1 rounded-full">Spark</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white">ACC Industrie 4.0 — Pipelines Big Data</h3>
                <p className="text-sm text-zinc-400">Sept 2022 - Juin 2023 | Data Engineer</p>
              </div>
            </div>
            <p className="text-zinc-300 mb-4">
              Développement de pipelines ETL avec Spark et Hadoop pour TBs de données industrielles.
              Orchestration Airflow, stockage MinIO. Réduction 40% coûts, temps divisé par 3.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-purple-450/20 text-purple-300 px-3 py-1 rounded-full">Spark</span>
              <span className="text-xs bg-purple-450/20 text-purple-300 px-3 py-1 rounded-full">Hadoop</span>
              <span className="text-xs bg-purple-450/20 text-purple-300 px-3 py-1 rounded-full">Airflow</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="glass-panel p-8 md:p-10 text-center">
        <h2 className="text-2xl font-bold text-white">Besoin d'un Data Engineer Spark/Airflow ?</h2>
        <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">
          Premier appel de 30 minutes gratuit pour évaluer vos besoins en Data Engineering,
          migration ETL ou optimisation de pipelines existants.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-white px-8 py-3 font-medium text-black hover:bg-zinc-200 transition"
          >
            Discuter de votre projet
          </Link>
          <Link
            href="/methode"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3 font-medium text-white hover:bg-white/10 transition"
          >
            Voir ma méthode
          </Link>
        </div>
      </section>

      {/* Schema.org Person (spécifique à cette page) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Raouf Warnier",
            "jobTitle": "Data Engineer Freelance — Apache Spark & Airflow Expert",
            "description": "Data Engineer freelance spécialisé Apache Spark (Scala, PySpark) et Apache Airflow. 7+ ans d'expérience en production chez BNP Paribas, Orange, Safran, ACC Industrie 4.0.",
            "url": "https://kenshu.dev/freelance-data-engineer-spark-airflow",
            "email": "rww.warnier@gmail.com",
            "telephone": "+33749416355",
            "knowsAbout": [
              "Apache Spark",
              "Apache Airflow",
              "Scala",
              "PySpark",
              "Big Data",
              "ETL Development",
              "Data Pipelines",
              "DevOps",
              "Ansible",
              "Jenkins",
              "GitLab CI"
            ],
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Data Engineer — Spark & Airflow Specialist",
              "occupationalCategory": "15-1254.00",
              "estimatedSalary": {
                "@type": "MonetaryAmount",
                "currency": "EUR",
                "value": {
                  "@type": "QuantitativeValue",
                  "value": 450,
                  "unitText": "DAY"
                }
              },
              "experienceRequirements": "7+ years with Apache Spark and Airflow"
            }
          })
        }}
      />
    </PageContainer>
  );
}
