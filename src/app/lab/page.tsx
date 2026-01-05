import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import { labExperiments } from "@/data/lab";

export const metadata: Metadata = {
  title: "Laboratoire R&D | Kenshu",
  description: "Expérimentations en R&D : agents IA, architectures hybrides, scripts d'automatisation. Sandbox connecté à NAS, Obsidian et cloud. Roadmap des prochaines sorties publiques.",
  alternates: {
    canonical: "/lab",
  },
};

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
              <div className="mt-3 grid gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-xs text-zinc-300">
                <div>
                  <span className="text-emerald-200">Prochaine étape :</span> {experiment.next}
                </div>
                <div>
                  <span className="text-emerald-200">Bénéfice :</span> {experiment.value}
                </div>
              </div>
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

