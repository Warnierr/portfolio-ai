"use client";

import { useState } from "react";

type FormErrors = {
    name?: string;
    email?: string;
    message?: string;
};

export default function ContactForm() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const validateField = (name: string, value: string): string | undefined => {
        switch (name) {
            case "name":
                if (!value.trim()) return "Le nom est requis";
                if (value.trim().length < 2) return "Le nom doit contenir au moins 2 caractères";
                return undefined;
            case "email":
                if (!value.trim()) return "L'email est requis";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "Format d'email invalide";
                return undefined;
            case "message":
                if (!value.trim()) return "Le message est requis";
                if (value.trim().length < 10) return "Le message doit contenir au moins 10 caractères";
                return undefined;
            default:
                return undefined;
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched({ ...touched, [name]: true });
        const error = validateField(name, value);
        setErrors({ ...errors, [name]: error });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors({ ...errors, [name]: error });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };

        // Validate all fields
        const newErrors: FormErrors = {
            name: validateField("name", data.name),
            email: validateField("email", data.email),
            message: validateField("message", data.message),
        };

        setErrors(newErrors);
        setTouched({ name: true, email: true, message: true });

        // Check if there are any errors
        if (Object.values(newErrors).some(error => error !== undefined)) {
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
                setErrors({});
                setTouched({});
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (e) {
            setStatus("error");
        }
    };

    const getFieldClassName = (fieldName: string) => {
        const baseClass = "mt-2 w-full rounded-lg border px-4 py-3 text-white outline-none transition-colors";
        const hasError = touched[fieldName] && errors[fieldName as keyof FormErrors];
        
        if (hasError) {
            return `${baseClass} border-red-500/50 bg-red-500/5 focus:border-red-500`;
        }
        
        return `${baseClass} border-white/10 bg-white/5 focus:border-emerald-500/50`;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-xs uppercase tracking-widest text-zinc-500">
                    Nom <span className="text-red-400">*</span>
                </label>
                <input
                    name="name"
                    type="text"
                    required
                    className={getFieldClassName("name")}
                    placeholder="Votre nom"
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.name}
                    </p>
                )}
            </div>

            <div>
                <label className="text-xs uppercase tracking-widest text-zinc-500">
                    Email <span className="text-red-400">*</span>
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    className={getFieldClassName("email")}
                    placeholder="votre@email.com"
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.email}
                    </p>
                )}
            </div>

            <div>
                <label className="text-xs uppercase tracking-widest text-zinc-500">
                    Message <span className="text-red-400">*</span>
                </label>
                <textarea
                    name="message"
                    required
                    rows={4}
                    className={getFieldClassName("message")}
                    placeholder="Décrivez votre projet..."
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                {touched.message && errors.message && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-emerald-500 py-3 font-bold text-black transition hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {status === "loading" ? (
                    <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
                        Envoi en cours...
                    </>
                ) : (
                    <>
                        <span>✉️</span>
                        Envoyer le message
                    </>
                )}
            </button>

            {status === "success" && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
                    <p className="text-sm text-emerald-400 flex items-center justify-center gap-2">
                        <span className="text-xl">✅</span>
                        Message envoyé ! Je vous répondrai sous 24h.
                    </p>
                </div>
            )}
            
            {status === "error" && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center">
                    <p className="text-sm text-red-400 flex items-center justify-center gap-2">
                        <span className="text-xl">❌</span>
                        Erreur lors de l&apos;envoi. Réessayez ou contactez-moi directement.
                    </p>
                </div>
            )}
        </form>
    );
}
