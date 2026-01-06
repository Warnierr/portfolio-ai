import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import RSS from "rss";

export async function GET() {
  try {
    const feed = new RSS({
      title: "Kenshu Blog — Data Engineering, IA, DevOps",
      description:
        "Guides techniques, retours d'expérience et analyses sur Data Engineering, DataOps, LLM, DevOps et conformité AI Act.",
      feed_url: "https://kenshu.dev/rss.xml",
      site_url: "https://kenshu.dev",
      language: "fr",
      pubDate: new Date(),
    });

    const articles = await prisma.article.findMany({
      where: { status: "published" },
      orderBy: { publishedAt: "desc" },
      take: 20,
    });

    articles.forEach((article) => {
      feed.item({
        title: article.title,
        description: article.excerpt,
        url: `https://kenshu.dev/articles/${article.slug}`,
        date: article.publishedAt || article.createdAt,
        author: article.author,
        categories: [article.category],
      });
    });

    return new NextResponse(feed.xml(), {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("RSS generation error:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
