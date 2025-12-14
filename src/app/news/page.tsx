import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import NewsFeed from "@/components/NewsFeed";
import { newsFeed } from "@/data/news";

export default function NewsPage() {
  const latestDate = newsFeed[0]?.date || "—";
  const totalArticles = newsFeed.length;

  return (
    <PageContainer className="gap-8">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Agent News"
          title="Un feed automatisé"
          subtitle="L'agent lit mes notes Obsidian, mes commits GitHub et ma veille pour publier ici."
        />
        <p className="text-zinc-300">
          Objectif : garder le portfolio vivant. Chaque entrée est synthétisée
          par l&apos;agent puis relue rapidement avant publication. Bientôt :
          API publique + flux RSS généré automatiquement.
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
          <span>{totalArticles} articles publiés</span>
          <span>•</span>
          <span>Dernière mise à jour : {latestDate}</span>
        </div>
      </section>

      <section className="glass-panel p-6 md:p-10">
        <NewsFeed entries={newsFeed} />
      </section>
    </PageContainer>
  );
}
