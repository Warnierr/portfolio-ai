"use client";

import { useState } from "react";

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            message: formData.get("message"),
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
            }
        } catch (e) {
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-xs uppercase tracking-widest text-zinc-500">Nom</label>
                <input
                    name="name"
                    type="text"
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-emerald-500/50"
                    placeholder="Votre nom"
                />
            </div>
            <div>
                <label className="text-xs uppercase tracking-widest text-zinc-500">Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-emerald-500/50"
                    placeholder="votre@email.com"
                />
            </div>
            <div>
                <label className="text-xs uppercase tracking-widest text-zinc-500">Message</label>
                <textarea
                    name="message"
                    required
                    rows={4}
                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-emerald-500/50"
                    placeholder="Décrivez votre projet..."
                />
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-emerald-500 py-3 font-bold text-black transition hover:bg-emerald-400 disabled:opacity-50"
            >
                {status === "loading" ? "Envoi..." : "Envoyer le message"}
            </button>

            {status === "success" && (
                <p className="text-sm text-emerald-400 text-center">Message envoyé ! Je vous répondrai sous 24h.</p>
            )}
            {status === "error" && (
                <p className="text-sm text-red-400 text-center">Erreur lors de l&apos;envoi. Réessayez ou utilisez l&apos;email direct.</p>
            )}
        </form>
    );
}
