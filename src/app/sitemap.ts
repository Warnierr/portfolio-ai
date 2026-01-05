import { MetadataRoute } from "next";

// Version 3.0 - Pages long-tail SEO + /a-propos
export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://kenshu.dev";
    const now = new Date();

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
        {
            url: `${baseUrl}/methode`,
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
        
        // Pages secondaires
        {
            url: `${baseUrl}/agent`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.6,
        },
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
    ];
}
