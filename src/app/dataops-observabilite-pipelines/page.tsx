import type { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export const metadata: Metadata = {
  title: "DataOps & Observabilité Pipelines — Grafana, Prometheus, Automatisation | Kenshu",
  description: "Spécialiste DataOps : pipelines fiables, monitoring Grafana/Prometheus, CI/CD Ansible, alerting. Expérience Orange, BNP Paribas. Industrialisation, observabilité native, SLA garantis.",
  alternates: {
    canonical: "/dataops-observabilite-pipelines",
  },
  openGraph: {
    title: "DataOps & Observabilité Pipelines",
    description: "Industrialisation pipelines data avec observabilité native. Grafana, Prometheus, Ansible, CI/CD.",
    url: "https://kenshu.dev/dataops-observabilite-pipelines",
  },
};

export default function DataOpsPage() {
  return (
    <PageContainer className="gap-10">
      {/* Hero */}
      <section className="glass-panel p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
          DataOps & Observabilité
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
          DataOps & Observabilité Pipelines — Fiabilité garantie
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-zinc-300">
          J'industrialise vos pipelines data avec observabilité native, automatisation CI/CD,
          et monitoring temps réel (Grafana, Prometheus, Loki). Zéro pipelines « qui cassent en silence ».
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
            99.9% uptime
          </span>
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
            100% automatisation
          </span>
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
            -75% coûts infra
          </span>
        </div>
      </section>

      {/* Qu'est-ce que le DataOps ? */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-4">Qu'est-ce que le DataOps ?</h2>
        <p className="text-zinc-300 mb-4">
          Le <strong>DataOps</strong> (Data Operations) est l'application des principes DevOps aux pipelines data :
          automatisation, tests continus, monitoring, collaboration cross-équipes.
        </p>
        <p className="text-zinc-300 mb-4">
          Concrètement, c'est transformer des pipelines fragiles (scripts manuels, zero monitoring,
          debugging à l'aveugle) en <strong>systèmes industrialisés</strong> avec :
        </p>
        <ul className="space-y-2 text-zinc-300 list-disc pl-6">
          <li>Déploiements automatisés (CI/CD)</li>
          <li>Tests automatisés (qualité données, idempotence)</li>
          <li>Monitoring en temps réel (métriques, logs, traces)</li>
          <li>Alerting intelligent (Telegram, Slack, PagerDuty)</li>
          <li>Documentation vivante (générée automatiquement)</li>
        </ul>
      </section>

      {/* Observabilité : Grafana, Prometheus, Loki */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Observabilité : Voir ce qui se passe vraiment</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-6">
            <h3 className="text-xl font-semibold text-orange-300 mb-4">Grafana</h3>
            <p className="text-sm text-zinc-400 mb-4">Visualisation temps réel</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Dashboards métriques pipelines</li>
              <li>• Visualisation logs centralisés</li>
              <li>• Alerting configurable</li>
              <li>• Variables dynamiques</li>
            </ul>
          </div>

          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="text-xl font-semibold text-red-300 mb-4">Prometheus</h3>
            <p className="text-sm text-zinc-400 mb-4">Métriques & alertes</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Scraping métriques applicatives</li>
              <li>• Alertmanager pour notifications</li>
              <li>• PromQL pour queries complexes</li>
              <li>• Intégration Spark/Airflow</li>
            </ul>
          </div>

          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-6">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Loki</h3>
            <p className="text-sm text-zinc-400 mb-4">Logs centralisés</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Aggregation logs multi-sources</li>
              <li>• LogQL pour recherche rapide</li>
              <li>• Corrélation logs/métriques</li>
              <li>• Faible empreinte ressources</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="font-semibold text-white mb-3">Résultat concret</h3>
          <p className="text-zinc-300">
            Avec cette stack, vous voyez en temps réel : combien de lignes sont traitées par minute,
            où sont les goulots d'étranglement, quels jobs sont en échec <em>avant</em> que vos utilisateurs
            ne s'en plaignent. Alerting automatique sur Telegram/Slack dès qu'un seuil est dépassé.
          </p>
        </div>
      </section>

      {/* Automatisation CI/CD */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Automatisation CI/CD pour pipelines data</h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Déploiement automatisé (Ansible)</h3>
            <p className="text-zinc-300 mb-4">
              Playbooks Ansible pour déployer Spark, Airflow, Grafana, bases de données en 1 commande.
              Idempotent (relançable sans risque), versionné Git, testé en environnement staging.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Exemple réel</strong> : Orange — Automatisation complète déploiement Zeppelin + Airflow + Spark + Grafana.
              Réduction de 80% du temps de setup, zéro erreur humaine.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Pipelines CI/CD (Jenkins, GitLab CI)</h3>
            <p className="text-zinc-300 mb-4">
              Tests automatisés (qualité données, schéma validation), linting code, build containers Docker,
              déploiement staging → production avec validation manuelle.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Exemple réel</strong> : BNP Paribas — Pipeline Jenkins pour ETL Spark. Validation automatisée
              avant merge. Zéro régression en production.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Idempotence & tests</h3>
            <p className="text-zinc-300 mb-4">
              Pipelines idempotents (relançables sans effets de bord) + tests unitaires Python/Scala +
              tests d'intégration sur datasets réels.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Principe</strong> : Un pipeline qui crash en prod doit pouvoir être relancé sans casser les données.
              Les tests garantissent cette propriété dès le développement.
            </p>
          </div>
        </div>
      </section>

      {/* Méthode DataOps en 3 étapes */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Méthode DataOps en 3 étapes</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-6">
            <div className="text-3xl font-bold text-emerald-300 mb-3">01</div>
            <h3 className="text-lg font-semibold text-white mb-3">Audit & Cartographie</h3>
            <p className="text-sm text-zinc-300">
              Diagnostic des flux existants : où sont les données, quels jobs cassent, quels SLA sont non-respectés.
              Documentation de l'état actuel (2-5 jours selon complexité).
            </p>
          </div>

          <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-6">
            <div className="text-3xl font-bold text-blue-300 mb-3">02</div>
            <h3 className="text-lg font-semibold text-white mb-3">Sprint Industrialisation</h3>
            <p className="text-sm text-zinc-300">
              Mise en place monitoring (Grafana/Prometheus), automatisation CI/CD, refactoring pipelines critiques.
              Quick wins visibles en 2 semaines (alerting, dashboards).
            </p>
          </div>

          <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-6">
            <div className="text-3xl font-bold text-purple-300 mb-3">03</div>
            <h3 className="text-lg font-semibold text-white mb-3">Autonomie Équipe</h3>
            <p className="text-sm text-zinc-300">
              Formation équipe aux outils (Grafana, Ansible, tests), documentation vivante, transfert de compétences.
              Objectif : autonomie totale après la mission.
            </p>
          </div>
        </div>
      </section>

      {/* Cas d'usage DataOps */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Cas d'usage typiques</h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Pipelines qui cassent en silence</h3>
            <p className="text-zinc-300 mb-3">
              <strong>Problème</strong> : Jobs Airflow qui crashent mais personne ne le sait avant que les utilisateurs
              ne s'en plaignent (trop tard).
            </p>
            <p className="text-zinc-300 mb-3">
              <strong>Solution</strong> : Monitoring Grafana + alerting Telegram/Slack en temps réel.
              Notification immédiate si un job fail ou dépasse son SLA.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Impact</strong> : Détection proactive des incidents, MTTR divisé par 5.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Déploiements manuels chronophages</h3>
            <p className="text-zinc-300 mb-3">
              <strong>Problème</strong> : Chaque update nécessite 3h de manipulation manuelle + 40% d'erreurs humaines.
            </p>
            <p className="text-zinc-300 mb-3">
              <strong>Solution</strong> : Playbooks Ansible idempotents pour déploiement automatisé en 1 commande.
              Versionnement Git, rollback rapide si besoin.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Impact</strong> : Temps réduit à 10 minutes, zéro erreur, scalabilité garantie.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Coûts cloud incontrôlables</h3>
            <p className="text-zinc-300 mb-3">
              <strong>Problème</strong> : Factures AWS/Azure qui explosent sans visibilité sur les ressources consommées.
            </p>
            <p className="text-zinc-300 mb-3">
              <strong>Solution</strong> : Métriques Prometheus sur CPU/RAM/Disk par job, dashboards Grafana pour suivi.
              Optimisation basée sur données réelles (partitioning, broadcast joins, tuning mémoire).
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Impact</strong> : Réduction typique de 40-75% des coûts selon le contexte.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Questions fréquentes sur DataOps</h2>

        <div className="space-y-6">
          <div className="border-l-2 border-emerald-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">DataOps vs DevOps : quelle différence ?</h3>
            <p className="text-zinc-300">
              DataOps applique les principes DevOps (automatisation, CI/CD, monitoring) aux pipelines data spécifiquement.
              Différences clés : focus sur qualité des données (schéma, freshness, complétude),
              gestion des états (idempotence critique), tests spécifiques (validation datasets).
            </p>
          </div>

          <div className="border-l-2 border-emerald-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Faut-il Grafana ET Prometheus ?</h3>
            <p className="text-zinc-300">
              Oui, ils sont complémentaires. <strong>Prometheus</strong> collecte et stocke les métriques
              (CPU, RAM, latences, nombre de lignes traitées). <strong>Grafana</strong> visualise ces métriques
              avec dashboards customisables. Ajouter <strong>Loki</strong> pour centraliser les logs.
            </p>
          </div>

          <div className="border-l-2 border-emerald-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Ansible ou Docker pour déploiement ?</h3>
            <p className="text-zinc-300">
              Les deux sont complémentaires. <strong>Docker</strong> pour conteneurisation des apps
              (portabilité, isolation). <strong>Ansible</strong> pour orchestrer le déploiement multi-machines
              (installation Docker, configuration réseau, montage volumes). Ensemble, c'est la stack idéale.
            </p>
          </div>

          <div className="border-l-2 border-emerald-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Combien de temps pour industrialiser un pipeline existant ?</h3>
            <p className="text-zinc-300">
              Selon complexité : 2-4 semaines pour 1 pipeline (audit, refactoring, tests, CI/CD, monitoring).
              Quick wins visibles dès la semaine 1 (dashboards Grafana, alerting basique).
              Industrialisation complète avec autonomie équipe : 1-3 mois.
            </p>
          </div>

          <div className="border-l-2 border-emerald-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Quels gains concrets avec DataOps ?</h3>
            <p className="text-zinc-300">
              D'après mes missions : <strong>-40 à -75% coûts infrastructure</strong> (optimisation ressources),
              <strong>-80% temps debugging</strong> (monitoring proactif),
              <strong>99.9% uptime</strong> (alerting + retry intelligents),
              <strong>-70% temps déploiement</strong> (automatisation CI/CD).
            </p>
          </div>

          <div className="border-l-2 border-emerald-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Avez-vous de l'expérience en environnement réglementé ?</h3>
            <p className="text-zinc-300">
              Oui, missions récentes BNP Paribas (banque) et Orange (telecom) avec contraintes :
              sécurité renforcée, traçabilité complète, RGPD strict, séparation des environnements.
              Playbooks Ansible adaptés aux contraintes de sécurité, logs anonymisés pour RGPD.
            </p>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Tarifs & Modalités</h2>

        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-8">
          <div className="flex items-baseline gap-3">
            <p className="text-5xl font-bold text-white">500€</p>
            <p className="text-zinc-400">/ jour (TJM)</p>
          </div>

          <div className="mt-6 space-y-3 text-zinc-300">
            <p>✅ Audit & diagnostic pipelines existants</p>
            <p>✅ Setup monitoring (Grafana, Prometheus, Loki)</p>
            <p>✅ Automatisation CI/CD (Ansible, Jenkins, GitLab)</p>
            <p>✅ Refactoring pipelines critiques</p>
            <p>✅ Formation équipe & transfert compétences</p>
            <p>✅ Documentation vivante</p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-sm text-zinc-400">
            <p><strong className="text-white">Durée minimale</strong> : 3 mois (renouvelable)</p>
            <p><strong className="text-white">Modalités</strong> : Remote (France/Europe), Hybride, Présentiel (IDF)</p>
            <p><strong className="text-white">Disponibilité</strong> : Immédiate</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="glass-panel p-8 md:p-10 text-center">
        <h2 className="text-2xl font-bold text-white">Vos pipelines méritent mieux que le chaos</h2>
        <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">
          Premier appel de 30 minutes gratuit pour diagnostiquer vos besoins en DataOps,
          observabilité et automatisation.
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
    </PageContainer>
  );
}
