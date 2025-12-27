"use client";

import { motion } from "framer-motion";

type Stat = {
    label: string;
    value: string;
    change: string;
    color: string;
};

type Lead = {
    name: string;
    email: string;
    date: string;
};

type Theme = {
    theme: string;
    count: number;
};

export default function AdminDashboardClient({
    stats,
    recentLeads,
    topThemes
}: {
    stats: Stat[],
    recentLeads: Lead[],
    topThemes: Theme[]
}) {
    const maxCount = topThemes.length > 0 ? Math.max(...topThemes.map(t => t.count)) : 1;

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-zinc-400">Vue d&apos;ensemble en temps réel de votre écosystème IA.</p>
            </header>

            {/* Grid Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6"
                    >
                        <p className="text-sm text-zinc-500">{stat.label}</p>
                        <div className="mt-2 flex items-end justify-between">
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            <span className="text-xs text-zinc-400">{stat.change}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Recent Leads */}
                <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-xl font-semibold text-white">Dernières prises de contact</h2>
                    <div className="mt-4 space-y-4">
                        {recentLeads.length > 0 ? (
                            recentLeads.map((lead) => (
                                <div key={lead.email} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-medium text-white">{lead.name}</p>
                                        <p className="text-xs text-zinc-500">{lead.email}</p>
                                    </div>
                                    <span className="text-xs text-zinc-500">{lead.date}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-zinc-500 italic py-4 text-center">Aucun lead pour le moment.</p>
                        )}
                    </div>
                </section>

                {/* AI Themes */}
                <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-xl font-semibold text-white">Thématiques AI récurrentes</h2>
                    <div className="mt-4 space-y-3">
                        {topThemes.length > 0 ? (
                            topThemes.map((theme) => (
                                <div key={theme.theme} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-300">{theme.theme}</span>
                                        <span className="text-zinc-500">{theme.count}</span>
                                    </div>
                                    <div className="h-1.5 w-full rounded-full bg-white/5">
                                        <div
                                            className="h-full rounded-full bg-emerald-500"
                                            style={{ width: `${(theme.count / maxCount) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-zinc-500 italic py-4 text-center">Aucune interaction analysée.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
