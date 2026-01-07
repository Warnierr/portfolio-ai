import Link from "next/link";
import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import StickyCTA from "@/components/StickyCtA";
import ProcessDiagram from "@/components/ProcessDiagram";

export const metadata: Metadata = {
  title: "Méthode DataOps & IA Industrialisée | Kenshu",
  description: "Cycle d'intervention Kenshu : Audit → Sprint → Industrialisation. Pipelines souverains, -75% coûts, 100% automatisation.",
  alternates: {
    canonical: "/methode",
  },
  openGraph: {
    title: "Méthode DataOps & IA Industrialisée | Kenshu",
    description: "Cycle d'intervention Kenshu : Audit → Sprint → Industrialisation. Pipelines souverains, -75% coûts, 100% automatisation.",
    url: "https://kenshu.dev/methode",
  },
};

const metrics = [
  { value: "100%", label: "automatisation flux", context: "Pipelines DataOps" },
  { value: "500 €", label: "TJM Freelance", context: "Expertise Senior" },
  { value: "-75%", label: "coûts infra", context: "vs solutions Cloud" },
];

const personas = [
  {
    icon: "🏢",
    title: "CTOs & Lead Data Engineers",
    description: "Équipes 5-50 personnes nécessitant industrialisation et scalabilité",
  },
  {
    icon: "🚀",
    title: "Startups tech & Scale-ups",
    description: "Product-driven avec données critiques et croissance rapide",
  },
  {
    icon: "🏦",
    title: "DSI grands comptes",
    description: "Environnements réglementés : Banque, Telecom, Industrie",
  },
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
          <p className="mt-4 text-lg text-emerald-300 font-medium">
            Industrialisation DataOps & IA pour la scalabilité, la fiabilité et la souveraineté.
          </p>
          <p className="mt-6 max-w-2xl text-zinc-300">
            Kenshu accompagne les équipes techniques dans la transformation de flux data instables en pipelines automatisés, industrialisés et souverains — prêts pour l&apos;IA et les usages critiques.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
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

        {/* Pour qui ? */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Pour qui ?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {personas.map((persona, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center"
              >
                <div className="text-4xl mb-3">{persona.icon}</div>
                <h3 className="font-medium text-white mb-2">{persona.title}</h3>
                <p className="text-sm text-zinc-400">{persona.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi DataOps */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Problèmes typiques rencontrés
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                problem: "Pipelines qui cassent sans prévenir",
                metric: "40% du temps data engineer perdu en debug",
              },
              {
                problem: "Agents LLM en production",
                metric: "80% échouent sans DataOps structuré",
              },
              {
                problem: "Factures cloud incontrôlées",
                metric: "Réduction possible de 60-75% avec souveraineté",
              },
              {
                problem: "Souveraineté des données métier",
                metric: "Conformité RGPD et sécurité renforcée",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-zinc-300 rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="mt-1 text-emerald-400 text-xl">→</span>
                <div className="flex-1">
                  <p className="font-medium text-white">{item.problem}</p>
                  <p className="text-sm text-emerald-300 mt-1">{item.metric}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Kenshu */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Services Kenshu
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

        {/* Process - Visualisation avec diagramme */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Cycle d'Intervention Kenshu
          </h2>
          <ProcessDiagram />
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
            Tarifs transparents : pas de coûts cachés, pas de maintenance forcée.
          </p>
        </section>

        {/* CTA */}
        <section className="glass-panel p-8 text-center md:p-10">
          <h2 className="text-2xl font-semibold text-white">
            Besoin d'un architecte data ?
          </h2>
          <p className="mt-2 text-zinc-400">
            Discutons de vos flux de données et de vos besoins d'automatisation.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-100"
            >
              Planifier un diagnostic gratuit (30 min)
            </Link>
            <Link
              href="/projets"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Voir un exemple de roadmap
            </Link>
          </div>
        </section>
      </PageContainer>

      <StickyCTA text="Contact" href="/contact" />
    </>
  );
}
