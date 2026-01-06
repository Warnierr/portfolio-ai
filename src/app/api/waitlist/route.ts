import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, product, source } = await request.json();

    // Validation basique
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà pour ce produit
    const existing = await prisma.waitlist.findFirst({
      where: {
        email,
        product,
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Vous êtes déjà inscrit pour ce produit !" },
        { status: 200 }
      );
    }

    // Créer l'inscription
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        email,
        product: product || "general",
        source: source || "unknown",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Merci ! Vous serez notifié du lancement.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur waitlist:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}

// GET pour l'admin (liste des inscrits)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const product = searchParams.get("product");

    const waitlist = await prisma.waitlist.findMany({
      where: product ? { product } : undefined,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        product: true,
        source: true,
        notified: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ waitlist });
  } catch (error) {
    console.error("Erreur récupération waitlist:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    );
  }
}
