import { headers } from "next/headers";

import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import NewsFeed from "@/components/NewsFeed";
import { newsFeed as staticNewsFeed, type NewsEntry } from "@/data/news";

async function fetchNewsEntries(): Promise<NewsEntry[]> {
  const headersList = await headers();
  const host = headersList.get("host");
  if (!host) return staticNewsFeed;

  const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
  const url = `${protocol}://${host}/api/news`;

  try {
    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) return staticNewsFeed;

    const data = (await response.json()) as { entries?: NewsEntry[] };
    return data.entries ?? staticNewsFeed;
  } catch {
    return staticNewsFeed;
  }
}

export default async function NewsPage() {
  const entries = await fetchNewsEntries();

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
        <NewsFeed entries={entries} />
      </section>
    </PageContainer>
  );
}

