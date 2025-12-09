import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import NewsFeed from "@/components/NewsFeed";
import { newsFeed } from "@/data/news";

export default function NewsPage() {
  return (
    <PageContainer className="gap-8">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Agent News"
          title="Un feed automatisé"
          subtitle="L’agent lit mes notes Obsidian, mes commits GitHub et ma veille pour publier ici."
        />
        <p className="text-zinc-300">
          Objectif : garder le portfolio vivant. Chaque entrée est synthétisée par l’agent puis relue rapidement avant
          publication. Bientôt : API publique + flux RSS généré automatiquement.
        </p>
      </section>

      <section className="glass-panel p-6 md:p-10">
        <NewsFeed entries={newsFeed} />
      </section>
    </PageContainer>
  );
}

