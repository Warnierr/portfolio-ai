import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const [leadCount, chatCount, pendingNewsCount, recentLeads, topThemes, totalViews] = await Promise.all([
        prisma.lead.count(),
        prisma.chatLog.count(),
        prisma.news.count({ where: { status: "PENDING" } }),
        prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
        prisma.chatLog.groupBy({
            by: ["theme"],
            _count: {
                _all: true,
            },
            orderBy: {
                _count: {
                    theme: "desc",
                },
            },
            take: 5,
        }),
        prisma.analytics.count(),
    ]);

    const stats = [
        { label: "Vues (total)", value: totalViews.toString(), change: "Trafic enregistré", color: "text-blue-400" },
        { label: "Nouveaux Leads", value: leadCount.toString(), change: "Depuis le début", color: "text-emerald-400" },
        { label: "Messages AI", value: chatCount.toString(), change: "Interactions", color: "text-purple-400" },
        { label: "News en attente", value: pendingNewsCount.toString(), change: "Action requise", color: "text-amber-400" },
    ];

    const formattedThemes = topThemes.map(t => ({
        theme: t.theme || "Inconnu",
        count: t._count._all
    }));

    return (
        <AdminDashboardClient
            stats={stats}
            recentLeads={recentLeads.map(l => ({
                name: l.name,
                email: l.email,
                date: l.createdAt.toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" })
            }))}
            topThemes={formattedThemes}
        />
    );
}
