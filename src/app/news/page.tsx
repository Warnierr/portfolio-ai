import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { newsFeed as staticNews } from "@/data/news";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import NewsFeed from "@/components/NewsFeed";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Veille & Retours d'Expérience | Kenshu",
  description: "Analyses techniques sur l'industrialisation IA, DataOps, automatisation n8n. Veille continue et réflexions pratiques générées avec agent IA. Actualités du secteur Data/IA.",
  alternates: {
    canonical: "/news",
  },
};

export default async function NewsPage() {
  const dbNews = await prisma.news.findMany({
    where: { status: "APPROVED" },
    orderBy: { publishedAt: "desc" },
  });

  // Combine static and DB news
  const allNews = [
    ...dbNews.map(n => ({
      title: n.title,
      content: n.content,
      tag: n.tag as any,
      date: n.publishedAt ? n.publishedAt.toLocaleDateString("fr-FR") : n.date,
      category: n.category as any,
    })),
    ...staticNews,
  ];

  const latestDate = allNews[0]?.date || "—";
  const totalArticles = allNews.length;

  return (
    <PageContainer className="gap-8">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Expertise Feed"
          title="Veille & Retours d'Expérience"
          subtitle="Analyses sur l'industrialisation IA, le DataOps et l'automatisation n8n."
        />
        <p className="text-zinc-300">
          Ce flux mélange mes actualités et des réflexions techniques générées en collaboration avec mon agent IA, assurant une veille continue sur les meilleures pratiques du secteur.
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
          <span>{totalArticles} articles publiés</span>
          <span>•</span>
          <span>Dernière mise à jour : {latestDate}</span>
        </div>
      </section>

      <section className="glass-panel p-6 md:p-10">
        <NewsFeed entries={allNews} />
      </section>

      {/* Newsletter signup */}
      <section className="glass-panel overflow-hidden p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Restez en veille</h2>
            <p className="mt-2 text-zinc-400">
              Recevez une synthèse des meilleures pratiques DataOps et industrialisation IA.
              Pas de spam, juste de la valeur technique.
            </p>
          </div>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white placeholder-zinc-500 outline-none focus:border-emerald-400/50"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-white px-8 py-3 font-semibold text-black transition hover:bg-zinc-200"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </section>
    </PageContainer>
  );
}
