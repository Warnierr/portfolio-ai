import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      where: { status: { in: ["active", "paused"] } },
      orderBy: [{ priority: "desc" }, { deadline: "asc" }],
      take: 10,
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
