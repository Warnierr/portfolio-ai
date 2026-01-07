"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

type AnalyticsData = {
  totalLeads: number;
  totalChats: number;
  totalArticles: number;
  totalViews: number;
  avgSessionTime: number;
  conversionRate: number;
  topPages: Array<{ page: string; views: number }>;
  topEvents: Array<{ event: string; count: number }>;
  recentActivity: Array<{ type: string; description: string; timestamp: Date }>;
};

async function fetchAnalyticsData(): Promise<AnalyticsData> {
  // En production, ceci sera remplacé par des appels à l'API Google Analytics 4
  // Pour l'instant, on utilise les données de la base de données locale
  
  try {
    const response = await fetch("/api/analytics");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des analytics:", error);
    return {
      totalLeads: 0,
      totalChats: 0,
      totalArticles: 0,
      totalViews: 0,
      avgSessionTime: 0,
      conversionRate: 0,
      topPages: [],
      topEvents: [],
      recentActivity: [],
    };
  }
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white">Chargement des analytics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-400">Erreur lors du chargement des données</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="mt-1 text-zinc-400">Vue d'ensemble de vos métriques</p>
          </div>
          <Link
            href="/admin"
            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            ← Retour Admin
          </Link>
        </div>

        {/* Métriques principales */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Leads"
            value={data.totalLeads}
            icon="👥"
            trend="+12%"
          />
          <MetricCard
            title="Sessions Chat"
            value={data.totalChats}
            icon="💬"
            trend="+8%"
          />
          <MetricCard
            title="Articles Publiés"
            value={data.totalArticles}
            icon="📝"
            trend="+3"
          />
          <MetricCard
            title="Vues Totales"
            value={data.totalViews}
            icon="👁️"
            trend="+25%"
          />
        </div>

        {/* Graphiques et détails */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Pages */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Pages les Plus Vues</h2>
            <div className="space-y-3">
              {data.topPages.map((page, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-300">{page.page}</span>
                  <span className="text-sm font-semibold text-emerald-400">
                    {page.views} vues
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Events */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">Events les Plus Fréquents</h2>
            <div className="space-y-3">
              {data.topEvents.map((event, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-zinc-300">{event.event}</span>
                  <span className="text-sm font-semibold text-blue-400">
                    {event.count}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activité récente */}
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Activité Récente</h2>
          <div className="space-y-3">
            {data.recentActivity.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0"
              >
                <div>
                  <span className="text-sm font-medium text-white">{activity.type}</span>
                  <p className="text-xs text-zinc-400">{activity.description}</p>
                </div>
                <span className="text-xs text-zinc-500">
                  {new Date(activity.timestamp).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* KPIs Supplémentaires */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{data.avgSessionTime}s</div>
              <div className="mt-1 text-sm text-zinc-400">Temps Moyen de Session</div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">
                {data.conversionRate}%
              </div>
              <div className="mt-1 text-sm text-zinc-400">Taux de Conversion</div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">42%</div>
              <div className="mt-1 text-sm text-zinc-400">Taux de Rebond</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type MetricCardProps = {
  title: string;
  value: number;
  icon: string;
  trend: string;
};

function MetricCard({ title, value, icon, trend }: MetricCardProps) {
  const isPositive = trend.startsWith("+");
  
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
      <div className="mt-4">
        <span
          className={`text-sm font-semibold ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {trend}
        </span>
        <span className="ml-2 text-xs text-zinc-500">vs mois dernier</span>
      </div>
    </div>
  );
}
