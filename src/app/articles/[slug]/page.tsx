import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PageContainer from "@/components/PageContainer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import TagChips from "@/components/articles/TagChips";
import ArticleCTA from "@/components/articles/ArticleCTA";
import RelatedArticles from "@/components/articles/RelatedArticles";
import TableOfContents from "@/components/articles/TableOfContents";
import { CATEGORY_LABELS } from "@/types/article";
import type { ArticleCategory } from "@/types/article";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, status: "published" },
  });

  if (!article) {
    return { title: "Article introuvable" };
  }

  return {
    title: article.metaTitle || `${article.title} | Kenshu`,
    description: article.metaDescription || article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt?.toISOString(),
      authors: [article.author],
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug, status: "published" },
  });

  if (!article) {
    notFound();
  }

  // Get related articles (same category)
  const relatedArticles = await prisma.article.findMany({
    where: {
      category: article.category,
      status: "published",
      id: { not: article.id },
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  const tags = JSON.parse(article.tags);
  const categoryLabel = CATEGORY_LABELS[article.category as ArticleCategory];

  // Schema.org BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author,
      url: "https://kenshu.dev/a-propos",
    },
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    image: article.coverImage || undefined,
    articleSection: categoryLabel,
    keywords: tags.join(", "),
    publisher: {
      "@type": "Organization",
      name: "Kenshu",
      url: "https://kenshu.dev",
    },
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://kenshu.dev" },
      { "@type": "ListItem", position: 2, name: "Articles", item: "https://kenshu.dev/articles" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://kenshu.dev/articles/${article.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageContainer className="gap-12">
        {/* Header */}
        <header className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-400">
              {categoryLabel}
            </span>
            <span>{article.readingTime} min de lecture</span>
            {article.publishedAt && (
              <span>
                Publié le {format(new Date(article.publishedAt), "d MMMM yyyy", { locale: fr })}
              </span>
            )}
            <span>Par {article.author}</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            {article.title}
          </h1>

          <p className="text-xl text-zinc-300">{article.excerpt}</p>

          <TagChips tags={tags} />
        </header>

        {/* Table of Contents (desktop sidebar) */}
        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          <article className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
              {article.content}
            </ReactMarkdown>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={article.content} />
            </div>
          </aside>
        </div>

        {/* CTA contextuel */}
        <ArticleCTA category={article.category as ArticleCategory} />

        {/* Author */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{article.author}</h3>
              <p className="text-sm text-zinc-400">
                Data Engineer, AI Product Builder, DevOps Specialist
              </p>
              <p className="mt-3 text-sm text-zinc-300">
                Expert en Data Engineering, DataOps, LLM et DevOps. Freelance basé en France.
              </p>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} currentArticleId={article.id} />

        {/* Internal Links */}
        <section className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-bold text-white">Aller plus loin</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/services" className="text-emerald-400 hover:underline">
                → Découvrir mes services
              </a>
            </li>
            <li>
              <a href="/projets" className="text-emerald-400 hover:underline">
                → Voir mes projets
              </a>
            </li>
            <li>
              <a href="/articles" className="text-emerald-400 hover:underline">
                → Retour aux articles
              </a>
            </li>
          </ul>
        </section>
      </PageContainer>
    </>
  );
}
