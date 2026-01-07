import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    let statsData: any[] = [], recentLeadsData: any[] = [], topThemesData: any[] = [];
    let error = null;

    try {
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

        statsData = [
            { label: "Vues (total)", value: totalViews.toString(), change: "Trafic enregistré", color: "text-blue-400" },
            { label: "Nouveaux Leads", value: leadCount.toString(), change: "Depuis le début", color: "text-emerald-400" },
            { label: "Messages AI", value: chatCount.toString(), change: "Interactions", color: "text-purple-400" },
            { label: "News en attente", value: pendingNewsCount.toString(), change: "Action requise", color: "text-amber-400" },
        ];
        recentLeadsData = recentLeads;
        topThemesData = topThemes;

    } catch (e: any) {
        console.error("Admin Dashboard DB Error:", e);
        error = e.message || "Erreur de connexion base de données";
        // Fallback data
        statsData = [
            { label: "Erreur", value: "0", change: "DB Connection", color: "text-red-400" }
        ];
        recentLeadsData = [];
        topThemesData = [];
    }

    const formattedThemes = topThemesData.map(t => ({
        theme: t.theme || "Inconnu",
        count: t._count._all
    }));

    if (error) {
        return (
            <div className="p-8 text-white">
                <h1 className="text-2xl font-bold text-red-400 mb-4">Erreur Base de Données</h1>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
                    <p className="font-mono text-sm whitespace-pre-wrap">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <AdminDashboardClient
            stats={statsData}
            recentLeads={recentLeadsData.map(l => ({
                name: l.name,
                email: l.email,
                date: l.createdAt.toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" })
            }))}
            topThemes={formattedThemes}
        />
    );
}
