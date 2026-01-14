import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalLeads,
      newLeadsThisMonth,
      activeProjects,
      totalMRR,
      pendingNewsCount,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: firstDayOfMonth,
          },
        },
      }),
      prisma.project.count({ where: { status: "active" } }),
      prisma.project.aggregate({
        where: { status: "active" },
        _sum: { mrr: true },
      }),
      prisma.news.count({ where: { status: "PENDING" } }),
    ]);

    return NextResponse.json({
      totalLeads,
      newLeadsThisMonth,
      activeProjects,
      totalMRR: totalMRR._sum.mrr || 0,
      pendingNewsCount,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
