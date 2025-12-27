import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminLeads() {
    const leads = await prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-white">Gestion des Leads</h1>
                <p className="text-zinc-400">Suivez les demandes entrantes de vos prospects.</p>
            </header>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-xs uppercase tracking-wider text-zinc-500">
                            <th className="px-6 py-4">Client</th>
                            <th className="px-6 py-4">Message</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Statut</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                        {leads.length > 0 ? (
                            leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-white/5">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-white">{lead.name}</p>
                                        <p className="text-xs text-zinc-500">{lead.email}</p>
                                    </td>
                                    <td className="max-w-xs truncate px-6 py-4 text-sm text-zinc-400">
                                        {lead.message}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-zinc-500">
                                        {lead.createdAt.toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${lead.status === "NEW" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-xs font-semibold text-emerald-400 hover:text-emerald-300">
                                            Détails
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-20 text-zinc-500 italic">
                                    Aucun lead pour le moment.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
