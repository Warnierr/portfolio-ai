import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/articles/[id] - Récupérer un article par ID
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    const { id } = await params;
    console.error(`GET /api/articles/${id} error:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH /api/articles/[id] - Mettre à jour un article (admin uniquement)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Ajouter vérification auth admin ici
    // const isAdmin = await checkAdminAuth(req);
    // if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    // Si le status passe à "published" et publishedAt n'existe pas, le définir maintenant
    if (body.status === "published") {
      const existingArticle = await prisma.article.findUnique({
        where: { id },
      });

      if (existingArticle && !existingArticle.publishedAt) {
        body.publishedAt = new Date();
      }
    }

    const article = await prisma.article.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(article);
  } catch (error) {
    const { id } = await params;
    console.error(`PATCH /api/articles/${id} error:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[id] - Supprimer un article (admin uniquement)
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Ajouter vérification auth admin ici
    // const isAdmin = await checkAdminAuth(req);
    // if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await prisma.article.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const { id } = await params;
    console.error(`DELETE /api/articles/${id} error:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
