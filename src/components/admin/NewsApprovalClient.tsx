"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function NewsApprovalClient({ proposals }: { proposals: any[] }) {
    const router = useRouter();

    const handleAction = async (id: string, action: "approve" | "reject") => {
        const res = await fetch(`/api/admin/news/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action }),
        });

        if (res.ok) {
            router.refresh();
        }
    };

    const generateNewIdas = async () => {
        alert("L'IA analyse vos projets récents pour générer des idées... (Fonctionnalité bientôt disponible)");
    };

    return (
        <div className="space-y-8">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Approbation News</h1>
                    <p className="text-zinc-400">Gérez les news générées par l&apos;agent IA.</p>
                </div>
                <button
                    onClick={generateNewIdas}
                    className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-bold text-black transition hover:bg-emerald-400"
                >
                    Générer de nouvelles idées
                </button>
            </header>

            <div className="space-y-4">
                <AnimatePresence>
                    {proposals.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase text-zinc-400">
                                            {item.category}
                                        </span>
                                        <span className="text-xs text-zinc-500">
                                            {new Date(item.createdAt).toLocaleDateString("fr-FR")}
                                        </span>
                                    </div>
                                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                                    <p className="mt-2 text-sm text-zinc-400">{item.content}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleAction(item.id, "approve")}
                                        className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400"
                                    >
                                        Publier
                                    </button>
                                    <button
                                        onClick={() => handleAction(item.id, "reject")}
                                        className="rounded-lg border border-red-500/20 px-4 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10"
                                    >
                                        Rejeter
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {proposals.length === 0 && (
                    <div className="py-20 text-center text-zinc-500">
                        <p className="italic">Aucune proposition en attente.</p>
                        <p className="mt-2 text-sm">L&apos;IA génère des news périodiquement basées sur vos activités.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
