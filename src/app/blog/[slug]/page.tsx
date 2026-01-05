import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "@/components/PageContainer";
import { blogPosts } from "@/data/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: `${post.title} | Blog Kenshu`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://kenshu.dev/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer className="gap-10">
      {/* Header */}
      <section className="glass-panel p-8 md:p-12">
        <Link href="/blog" className="text-sm text-emerald-400 hover:underline mb-4 inline-block">
          ← Retour au blog
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
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

        <h1 className="text-3xl font-bold text-white md:text-4xl mb-4">
          {post.title}
        </h1>

        <p className="text-lg text-zinc-300 mb-6">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <span>Par {post.author}</span>
        </div>
      </section>

      {/* Contenu */}
      <article className="glass-panel p-8 md:p-12 prose prose-invert prose-emerald max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mt-8 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mt-6 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-white mt-4 mb-2" {...props} />,
            p: ({ node, ...props }) => <p className="text-zinc-300 mb-4 leading-relaxed" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 text-zinc-300 space-y-2" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 text-zinc-300 space-y-2" {...props} />,
            li: ({ node, ...props }) => <li className="text-zinc-300" {...props} />,
            code: ({ node, inline, ...props }: any) =>
              inline ? (
                <code className="bg-zinc-800 text-emerald-300 px-1.5 py-0.5 rounded text-sm" {...props} />
              ) : (
                <code className="block bg-zinc-900 text-zinc-300 p-4 rounded-lg overflow-x-auto text-sm" {...props} />
              ),
            pre: ({ node, ...props }) => <pre className="bg-zinc-900 rounded-lg overflow-x-auto mb-4" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-zinc-400 my-4" {...props} />
            ),
            a: ({ node, ...props }) => (
              <a className="text-emerald-400 hover:underline" {...props} />
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      {/* Tags */}
      <section className="glass-panel p-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-sm text-zinc-400 bg-white/5 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="glass-panel p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Besoin d'aide sur vos pipelines ?</h2>
        <p className="text-zinc-400 mb-6">
          J'accompagne les équipes techniques dans l'industrialisation de leurs pipelines data et IA.
        </p>
        <Link
          href="/contact"
          className="inline-block rounded-full bg-white px-8 py-3 font-medium text-black hover:bg-zinc-200 transition"
        >
          Discuter de votre projet
        </Link>
      </section>

      {/* Schema.org Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "author": {
              "@type": "Person",
              "name": post.author,
              "url": "https://kenshu.dev/a-propos"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Kenshu Dev",
              "url": "https://kenshu.dev"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://kenshu.dev/blog/${post.slug}`
            },
            "keywords": post.tags.join(", "),
            "articleSection": post.category,
          })
        }}
      />
    </PageContainer>
  );
}
