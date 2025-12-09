import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

const stack = [
  {
    label: "🧠 IA & Data",
    skills: [
      { name: "RAG & agents composables", level: "Expert", example: "Second Brain RAG perso" },
      { name: "Pipelines embeddings", level: "Avancé", example: "Veille + NAS" },
      { name: "LLM orchestration", level: "Avancé", example: "Nomah AI marketplace" },
    ],
  },
  {
    label: "🏗 Infra & DevOps",
    skills: [
      { name: "Proxmox / NAS / Réseaux", level: "Expert", example: "Backbone maison" },
      { name: "CI/CD GitHub Actions", level: "Avancé", example: "Déploiements automatiques" },
      { name: "Observabilité & sécurité", level: "Avancé", example: "Automations backup" },
    ],
  },
  {
    label: "💻 Web & Produit",
    skills: [
      { name: "Next.js / App Router", level: "Expert", example: "Dashboards Nomah" },
      { name: "API modulaire", level: "Avancé", example: "Micro-services automation" },
      { name: "Design systems", level: "Avancé", example: "UI Anomalie 2084" },
    ],
  },
  {
    label: "⚙️ Systèmes internes",
    skills: [
      { name: "Second Brain / PKM", level: "Expert", example: "RAG Obsidian" },
      { name: "Pipelines contenu", level: "Avancé", example: "News agent" },
      { name: "Automations NAS", level: "Avancé", example: "Backup + sécurité" },
    ],
  },
];

const infra = [
  { title: "Proxmox cluster", detail: "3 nodes + NAS ZFS, VLAN dédiés, snapshots horaires." },
  { title: "CI/CD", detail: "GitHub Actions + runners auto-hébergés + déploiements Vercel." },
  { title: "Observabilité", detail: "Grafana, Loki, alertes Telegram via agent." },
];

export default function StackPage() {
  return (
    <PageContainer className="gap-10">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Stack"
          title="Radar de compétences & infrastructure"
          subtitle="Ce que je maîtrise réellement, avec des exemples concrets."
        />
        <p className="text-zinc-300">
          J’opère autant la couche software que l’infrastructure physique (NAS, réseaux, proxmox). Cette page résume
          les stacks que j’utilise au quotidien, avec des cas d’usage reliés.
        </p>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <div className="grid gap-6 md:grid-cols-2">
          {stack.map((category) => (
            <div key={category.label} className="rounded-2xl border border-white/10 bg-black/25 p-6">
              <p className="text-lg font-semibold text-white">{category.label}</p>
              <div className="mt-4 space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-sm text-zinc-400">
                      <span>{skill.level}</span>
                      <span>{skill.example}</span>
                    </div>
                    <p className="mt-1 font-medium text-white">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle eyebrow="Infra perso" title="Hardware & backbone privé" />
        <div className="grid gap-4 md:grid-cols-3">
          {infra.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">{item.title}</p>
              <p className="mt-2">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

