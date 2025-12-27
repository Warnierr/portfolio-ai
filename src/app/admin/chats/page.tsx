import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AIAnalytics() {
    const interactions = await prisma.chatLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,
    });

    const totalInteractions = await prisma.chatLog.count();

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Analyse des Interactions AI</h1>
                <p className="text-zinc-400">Décryptez les besoins et les freins de vos visiteurs en temps réel.</p>
            </header>

            {/* Topics Summary */}
            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
                    <p className="text-sm text-emerald-300">Volume total</p>
                    <p className="mt-2 text-3xl font-bold text-white">{totalInteractions}</p>
                </div>
                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 text-center">
                    <p className="text-sm text-blue-300">Dernière interaction</p>
                    <p className="mt-2 text-xl font-bold text-white">
                        {interactions[0]?.createdAt.toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" }) || "---"}
                    </p>
                </div>
                <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6 text-center">
                    <p className="text-sm text-purple-300">Interactions/Leads (Ratio)</p>
                    <p className="mt-2 text-3xl font-bold text-white">Prêt</p>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Flux des conversations récentes</h2>
                <div className="space-y-3">
                    {interactions.length > 0 ? (
                        interactions.map((msg) => (
                            <div key={msg.id} className="rounded-xl border border-white/5 bg-white/5 p-5">
                                <div className="flex items-center justify-between">
                                    <span className="rounded-full bg-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-400">
                                        {msg.theme || "Inconnu"}
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                        {msg.createdAt.toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </div>
                                <div className="mt-3 grid gap-3 md:grid-cols-2">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-zinc-600">Visiteur</p>
                                        <p className="text-sm text-white italic mt-1">&quot;{msg.userMessage}&quot;</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-wider text-zinc-600">Réponse Kenshu</p>
                                        <p className="text-sm text-zinc-400 mt-1 line-clamp-2">{msg.aiResponse}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className={`h-2 w-2 rounded-full ${msg.sentiment === "Intéressé" ? "bg-emerald-400" : "bg-blue-400"}`} />
                                    <p className="text-xs text-zinc-400">Sentiment détecté : <span className="text-zinc-200">{msg.sentiment || "Neutral"}</span></p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center py-20 text-zinc-500 italic">Aucune interaction enregistrée.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
