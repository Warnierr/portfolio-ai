import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import StickyCTA from "@/components/StickyCtA";

const metrics = [
  { value: "100%", label: "automatisation flux", context: "Pipelines DataOps" },
  { value: "450 €", label: "TJM Freelance", context: "Expertise Senior" },
  { value: "-75%", label: "coûts infra", context: "vs solutions Cloud" },
];

export default function MethodePage() {
  return (
    <>
      <PageContainer className="gap-10">
        {/* Header */}
        <section className="glass-panel p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
            Méthode
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
            L&apos;Approche DataOps & IA Industrialisée
          </h1>
          <p className="mt-6 max-w-2xl text-zinc-300">
            J&apos;accompagne les entreprises dans la transition d&apos;un artisanat de la donnée vers une véritable usine logicielle. Mon focus : la fiabilité, la scalabilité et la souveraineté.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-center"
              >
                <p className="text-2xl font-bold text-emerald-300">{item.value}</p>
                <p className="text-sm text-zinc-300">{item.label}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.context}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi DataOps */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Pourquoi le DataOps ?
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Marre des pipelines qui cassent sans prévenir",
              "Besoin d'industrialiser les agents IA (LLM) en production",
              "Volonté de réduire les factures cloud (AWS/GCP/Azure)",
              "Nécessité de garantir la souveraineté des données métier",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 text-emerald-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Mes Services */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Mes Services
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Pipelines n8n & Python",
                description: "Automatisation complexe entre APIs, bases de données et outils métier.",
                result: "Souveraineté totale",
              },
              {
                title: "Infrastructure IA",
                description: "Déploiement d'architectures RAG et agents LLM optimisés pour la prod.",
                result: "Coûts maîtrisés",
              },
              {
                title: "BigData & DevOps",
                description: "Mise en place de Modern Data Stacks (BigQuery, dbt, CI/CD).",
                result: "Qualité de donnée garantie",
              },
              {
                title: "App Web & Mobile IA",
                description: "Développement complet d'applications intégrant l'intelligence artificielle.",
                result: "Expérience utilisateur premium",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                <p className="mt-3 text-sm text-emerald-300">→ {item.result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Cycle d'Intervention
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                step: "1",
                title: "Audit & Stratégie",
                duration: "1-2 jours",
                description: "Analyse de l'existant et définition de la stack cible.",
                deliverable: "Roadmap technique détaillée",
              },
              {
                step: "2",
                title: "Sprint Implementation",
                duration: "1-4 semaines",
                description: "Développement itératif des pipelines ou de l'application.",
                deliverable: "Code source & Tests automatisés",
              },
              {
                step: "3",
                title: "Industrialisation",
                duration: "1 semaine",
                description: "Mise en place du CI/CD et du monitoring (Grafana/Alerting).",
                deliverable: "Infrastructure stable à 99.9%",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-5 rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 font-semibold text-emerald-300">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-white">{item.title}</h3>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-zinc-400">
                      {item.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Livrable : {item.deliverable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tarifs */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Tarifs & Engagement
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <p className="text-lg font-semibold text-white">Régie (TJM)</p>
              <p className="mt-4 text-3xl font-bold text-emerald-300">450 €</p>
              <p className="mt-2 text-xs text-zinc-500 text-balance">Pour missions DevOps / DataOps complexes</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <p className="text-lg font-semibold text-white">Pipeline (Forfait)</p>
              <p className="mt-4 text-3xl font-bold text-white">Dès 2k €</p>
              <p className="mt-2 text-xs text-zinc-500">Audit + Setup n8n / Workflow Python</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <p className="text-lg font-semibold text-white">App / Mobile</p>
              <p className="mt-4 text-3xl font-bold text-white">Sur devis</p>
              <p className="mt-2 text-xs text-zinc-500">Architecture BigData & Frontend Premium</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-center text-zinc-500 italic">
            Mes tarifs sont transparents : pas de coûts cachés, pas de maintenance forcée.
          </p>
        </section>

        {/* CTA */}
        <section className="glass-panel p-8 text-center md:p-10">
          <h2 className="text-2xl font-semibold text-white">
            Besoin d'un architecte ?
          </h2>
          <p className="mt-2 text-zinc-400">
            Parlons de vos flux de données et de vos besoins d'automatisation.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-100"
            >
              Lancer le diagnostic
            </Link>
          </div>
        </section>
      </PageContainer>

      <StickyCTA text="Contact" href="/contact" />
    </>
  );
}
