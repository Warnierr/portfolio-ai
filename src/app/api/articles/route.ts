import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/articles - Liste des articles (avec filtres)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const category = searchParams.get("category") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const search = searchParams.get("search") || undefined;
    const limit = parseInt(searchParams.get("limit") || "12");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = { contains: tag };
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.article.count({ where }),
    ]);

    return NextResponse.json({
      articles,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/articles - Créer un article (admin uniquement)
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // TODO: Ajouter vérification auth admin ici
    // const isAdmin = await checkAdminAuth(req);
    // if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        coverImage: body.coverImage,
        category: body.category,
        tags: body.tags, // JSON string
        author: body.author || "Raouf Warnier",
        authorType: body.authorType || "human",
        readingTime: body.readingTime,
        status: body.status || "draft",
        featured: body.featured || false,
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        canonical: body.canonical,
        publishedAt: body.status === "published" ? new Date() : null,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error("POST /api/articles error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
