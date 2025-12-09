import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

const labExperiments = [
  {
    title: "Agent d’autodocumentation",
    status: "En cours",
    detail: "Scan des repos + Obsidian pour générer fiches projets, changelogs et pages `/projets/[slug]`.",
  },
  {
    title: "Tests RAG multi-modal",
    status: "Beta",
    detail: "Fusion d’images/process + texte pour enrichir le knowledge graph des automations NAS.",
  },
  {
    title: "Séquenceur d’agents Nomah",
    status: "R&D",
    detail: "Planner qui décide quel agent lancer (exploration, reasoning, action) selon les signaux métier.",
  },
  {
    title: "Firewall narratif Anomalie",
    status: "Prototype",
    detail: "Filtre linguistique qui garde la cohérence du lore généré par les agents créatifs.",
  },
];

const roadmap = [
  { label: "Q1", items: ["Release agent d’autodoc", "Nouvelle version du chat RAG public"] },
  { label: "Q2", items: ["Instrumentation open-source NAS", "API publique des news agent"] },
];

export default function LabPage() {
  return (
    <PageContainer className="gap-10">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Laboratoire"
          title="R&D permanente"
          subtitle="C’est ici que je teste les agents, les scripts, les architectures hybrides avant de les déployer."
        />
        <p className="text-zinc-300">
          Mon laboratoire est connecté à mon NAS, à Obsidian et à une série de sandboxes cloud. Chaque expérimentation
          est loggée, versionnée et – quand elle est stable – promue dans un écosystème client ou personnel.
        </p>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle eyebrow="Expérimentations" title="Les chantiers en cours" />
        <div className="grid gap-5 md:grid-cols-2">
          {labExperiments.map((experiment) => (
            <div
              key={experiment.title}
              className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-200"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-zinc-500">
                <span>{experiment.status}</span>
                <span>Agent Lab</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">{experiment.title}</h3>
              <p>{experiment.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle eyebrow="Roadmap" title="Prochaines sorties publiques" />
        <div className="grid gap-6 md:grid-cols-2">
          {roadmap.map((block) => (
            <div key={block.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{block.label}</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-200">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

