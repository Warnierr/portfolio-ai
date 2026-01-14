"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Stats = {
  totalLeads: number;
  newLeadsThisMonth: number;
  activeProjects: number;
  totalMRR: number;
  pendingNewsCount: number;
};

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  trend?: string;
  alert?: boolean;
};

function StatCard({ title, value, subtitle, trend, alert }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-6 ${
        alert
          ? "border-orange-500/40 bg-orange-500/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>
        </div>
        {trend && (
          <div className="text-right">
            <span
              className={`text-sm font-semibold ${
                trend.startsWith("+") ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {trend}
            </span>
            <p className="mt-1 text-xs text-zinc-500">vs mois dernier</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function QuickStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-zinc-400">
        Erreur lors du chargement des statistiques
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="MRR"
        value={`${stats.totalMRR.toFixed(0)} €`}
        subtitle={`${stats.activeProjects} projets actifs`}
        trend="+18%"
      />
      <StatCard
        title="Leads ce mois"
        value={stats.newLeadsThisMonth}
        subtitle={`${stats.totalLeads} total`}
        trend="+12%"
      />
      <StatCard
        title="Projets actifs"
        value={stats.activeProjects}
        subtitle="En cours"
      />
      <StatCard
        title="News à valider"
        value={stats.pendingNewsCount}
        subtitle="Action requise"
        alert={stats.pendingNewsCount > 0}
      />
    </div>
  );
}
