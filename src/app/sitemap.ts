import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://kenshu.dev';

    const roundedDate = new Date();
    // Arrondir à l'heure pour éviter trop de changements
    roundedDate.setMinutes(0, 0, 0);

    // Pages statiques
    const staticPages = [
        '',
        '/projets',
        '/services',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: roundedDate,
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return [...staticPages];
}
