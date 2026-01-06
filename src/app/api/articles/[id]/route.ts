import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/articles/[id] - Récupérer un article par ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
    });

    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error(`GET /api/articles/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH /api/articles/[id] - Mettre à jour un article (admin uniquement)
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Ajouter vérification auth admin ici
    // const isAdmin = await checkAdminAuth(req);
    // if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();

    // Si le status passe à "published" et publishedAt n'existe pas, le définir maintenant
    if (body.status === "published") {
      const existingArticle = await prisma.article.findUnique({
        where: { id: params.id },
      });

      if (existingArticle && !existingArticle.publishedAt) {
        body.publishedAt = new Date();
      }
    }

    const article = await prisma.article.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(article);
  } catch (error) {
    console.error(`PATCH /api/articles/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// DELETE /api/articles/[id] - Supprimer un article (admin uniquement)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Ajouter vérification auth admin ici
    // const isAdmin = await checkAdminAuth(req);
    // if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.article.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/articles/${params.id} error:`, error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
