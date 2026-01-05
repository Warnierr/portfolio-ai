import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/admin/", "/_next/", "/private/"],
        },
        sitemap: "https://kenshu-dev.vercel.app/sitemap.xml",
    };
}
