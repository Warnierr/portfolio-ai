import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { CATEGORY_LABELS } from "@/types/article";
import type { ArticleCategory } from "@/types/article";

// Force dynamic to avoid build-time database calls
export const dynamic = "force-dynamic";

// Version 6.1 - Dynamic articles from database with fallback
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://kenshu.dev";
    const now = new Date();

    // Fetch published articles with error handling
    let articleUrls: MetadataRoute.Sitemap = [];
    try {
        const articles = await prisma.article.findMany({
            where: { status: "published" },
            select: { slug: true, updatedAt: true },
        });

        articleUrls = articles.map((article) => ({
            url: `${baseUrl}/articles/${article.slug}`,
            lastModified: article.updatedAt,
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }));
    } catch (error) {
        console.error("[Sitemap] Database error, using static URLs only:", error);
        // Continue with empty articleUrls - static pages will still be generated
    }

    // Category URLs
    const categoryUrls = Object.keys(CATEGORY_LABELS).map((category) => ({
        url: `${baseUrl}/articles/categorie/${category}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [
        // Core pages (priority élevée)
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/a-propos`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.95,
        },


        // Pages SEO long-tail (forte priorité conversion)
        {
            url: `${baseUrl}/freelance-data-engineer-spark-airflow`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/dataops-observabilite-pipelines`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/audit-conformite-ai-act-rgpd`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },

        // Services & Projets
        {
            url: `${baseUrl}/projets`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/early-access`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.7,
        },

        // Applications /app/
        {
            url: `${baseUrl}/app/budget-ai`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.85,
        },
        {
            url: `${baseUrl}/app/ai-compliance`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.85,
        },

        // Pages secondaires

        {
            url: `${baseUrl}/stack`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/ecosystemes`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/lab`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/news`,
            lastModified: now,
            changeFrequency: "daily",
            priority: 0.6,
        },

        // Articles (hub)
        {
            url: `${baseUrl}/articles`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.85,
        },

        // Blog legacy (redirect to articles)
        {
            url: `${baseUrl}/blog`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.85,
        },
        ...articleUrls,
        ...categoryUrls,
    ];
}
