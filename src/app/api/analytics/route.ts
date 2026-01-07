import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const { page, referrer } = await req.json();
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || undefined;

        await prisma.analytics.create({
            data: {
                page,
                referrer,
                userAgent,
            },
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Fail" }, { status: 500 });
    }
}

export async function GET() {
    try {
        // Récupérer les statistiques agrégées
        const [totalLeads, totalChats, totalArticles, totalViews] = await Promise.all([
            prisma.lead.count(),
            prisma.chatLog.count(),
            prisma.article.count({ where: { status: "published" } }),
            prisma.analytics.count(),
        ]);

        // Pages les plus vues (top 5)
        const analyticsData = await prisma.analytics.groupBy({
            by: ["page"],
            _count: {
                page: true,
            },
            orderBy: {
                _count: {
                    page: "desc",
                },
            },
            take: 5,
        });

        const topPages = analyticsData.map(item => ({
            page: item.page,
            views: item._count.page,
        }));

        // Activité récente
        const recentLeads = await prisma.lead.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
        });

        const recentActivity = recentLeads.map(lead => ({
            type: "Nouveau Lead",
            description: lead.email,
            timestamp: lead.createdAt,
        }));

        // Calcul du taux de conversion (leads / vues * 100)
        const conversionRate = totalViews > 0 
            ? Number(((totalLeads / totalViews) * 100).toFixed(2))
            : 0;

        return NextResponse.json({
            totalLeads,
            totalChats,
            totalArticles,
            totalViews,
            avgSessionTime: 145, // Temps moyen en secondes (placeholder)
            conversionRate,
            topPages,
            topEvents: [
                { event: "CTA Click", count: 45 },
                { event: "Article View", count: 128 },
                { event: "Contact Form", count: 12 },
                { event: "Chat Started", count: 34 },
                { event: "PDF Download", count: 8 },
            ],
            recentActivity,
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des analytics:", error);
        return NextResponse.json(
            { error: "Erreur serveur" },
            { status: 500 }
        );
    }
}