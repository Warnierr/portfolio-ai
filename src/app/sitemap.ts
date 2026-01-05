import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://kenshu.dev";
    const now = new Date();

    return [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/methode`,
            lastModified: now,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projets`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 0.9,
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
