import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

export default function AgentPage() {
  return (
    <PageContainer className="gap-10">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Agent maison"
          title="Chat IA + RAG contextualisé"
          subtitle="📆 Disponible bientôt — on finalise la base de connaissances, priorité au contenu."
        />
        <p className="text-zinc-300">
          Pipeline en cours : ingestion Obsidian + docs projets + news → indexation pgvector → service RAG (Node) →
          interface web. L’agent connaît mes process, peut fournir des extraits, envoyer un résumé et aiguiller vers le bon
          canal, mais je peaufine encore les réponses et la gouvernance.
        </p>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Fonctionnalités prévues</p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Répondre aux visiteurs (stack, projets, dispo).</li>
              <li>Créer un résumé PDF d’un projet à partir de `/projets/[slug]`.</li>
              <li>Envoyer un message sur Telegram si une opportunité semble prioritaire.</li>
            </ul>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-emerald-200">Phase : tuning du modèle</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-200">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Stack</p>
            <ul className="mt-3 space-y-2">
              <li>OpenRouter (LLM) + guardrails maison.</li>
              <li>Supabase pgvector pour l’indexation.</li>
              <li>API Next.js (Edge) pour le streaming.</li>
            </ul>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-emerald-200">Focus actuel : contenu + prompts</p>
          </div>
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle eyebrow="Interface" title="Prototype" subtitle="L’UI finale sera intégrée ici." />
        <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-zinc-400">
          Console chat en construction — tests internes uniquement pour le moment.
        </div>
      </section>
    </PageContainer>
  );
}

