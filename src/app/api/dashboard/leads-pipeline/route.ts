import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      where: { status: { in: ["NEW", "CONTACTED", "QUALIFIED"] } },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        name: true,
        email: true,
        source: true,
        status: true,
        score: true,
        createdAt: true,
        lastContactAt: true,
      },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Leads pipeline error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
