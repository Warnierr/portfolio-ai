"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContainer from "@/components/PageContainer";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push("/admin");
            router.refresh();
        } else {
            setError("Mot de passe incorrect");
        }
    };

    return (
        <PageContainer className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <h1 className="text-2xl font-bold text-white">Accès Administration</h1>
                <p className="mt-2 text-sm text-zinc-400">
                    Veuillez saisir votre mot de passe pour accéder au dashboard.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-zinc-500">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-emerald-500/50"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && <p className="text-xs text-red-400">{error}</p>}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-white py-3 font-bold text-black transition hover:bg-zinc-200"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </PageContainer>
    );
}
