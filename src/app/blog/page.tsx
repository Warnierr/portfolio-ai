import type { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog Data Engineering & IA | Kenshu",
  description: "Articles techniques sur Data Engineering, Apache Spark, Airflow, DataOps, IA et automatisation. Retours d'expérience terrain et best practices.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog Data Engineering & IA | Kenshu",
    description: "Articles techniques sur Data Engineering, Spark, Airflow, DataOps. Retours d'expérience terrain.",
    url: "https://kenshu.dev/blog",
  },
};

export default function BlogPage() {
  return (
    <PageContainer className="gap-10">
      {/* Hero */}
      <section className="glass-panel p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
          Blog Technique
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
          Data Engineering & IA en Production
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-zinc-300">
          Retours d'expérience, patterns éprouvés et best practices pour industrialiser 
          vos pipelines data et applications IA.
        </p>
      </section>

      {/* Liste des articles */}
      <section className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-panel block p-8 transition hover:border-emerald-500/30 hover:bg-white/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                    post.category === 'spark' ? 'bg-emerald-500/20 text-emerald-300' :
                    post.category === 'airflow' ? 'bg-blue-500/20 text-blue-300' :
                    post.category === 'dataops' ? 'bg-purple-500/20 text-purple-300' :
                    'bg-amber-500/20 text-amber-300'
                  }`}>
                    {post.category.toUpperCase()}
                  </span>
                  <span className="text-sm text-zinc-500">{post.date}</span>
                  <span className="text-sm text-zinc-500">• {post.readTime}</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition">
                  {post.title}
                </h2>
                
                <p className="text-zinc-400 mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-zinc-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-emerald-400 text-2xl">→</div>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA Newsletter */}
      <section className="glass-panel p-8 md:p-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Recevoir les nouveaux articles</h2>
          <p className="text-zinc-400 mb-6">
            1-2 articles par mois sur Data Engineering, Spark, Airflow et DataOps. 
            Pas de spam, que du contenu technique.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 font-medium text-black hover:bg-zinc-200 transition"
          >
            Me contacter
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
