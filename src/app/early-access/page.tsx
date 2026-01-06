"use client";

import { useState } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Early Access — Soyez les premiers informés | Kenshu",
  description: "Inscrivez-vous pour être notifié du lancement de Budget AI, AI Act Auditor et nos prochains produits. Accès anticipé et avantages exclusifs.",
  alternates: {
    canonical: "/early-access",
  },
  openGraph: {
    title: "Early Access — Nouveaux produits à venir",
    description: "Inscrivez-vous pour être notifié du lancement de nos produits IA.",
    url: "https://kenshu.dev/early-access",
  },
};

export default function EarlyAccessPage() {
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("general");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          product,
          source: "early-access-page",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Une erreur est survenue");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erreur de connexion");
    }
  };

  return (
    <PageContainer className="gap-10">
      <SectionTitle
        eyebrow="Early Access"
        title="Soyez les premiers informés"
        subtitle="Inscrivez-vous pour être notifié du lancement de nos nouveaux produits"
      />

      <section className="glass-panel p-8 md:p-12 max-w-2xl mx-auto w-full">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sélection du produit */}
          <div>
            <label htmlFor="product" className="block text-sm font-medium text-zinc-300 mb-2">
              Quel produit vous intéresse ?
            </label>
            <select
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="general">Tous les produits</option>
              <option value="budget-ai">Budget AI</option>
              <option value="ai-act-auditor">AI Act Auditor</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
              Votre email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              required
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Message de statut */}
          {status !== "idle" && (
            <div
              className={`rounded-lg border p-4 ${
                status === "success"
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                  : status === "error"
                  ? "border-red-500/30 bg-red-500/10 text-red-300"
                  : "border-blue-500/30 bg-blue-500/10 text-blue-300"
              }`}
            >
              {status === "loading" ? "Inscription en cours..." : message}
            </div>
          )}

          {/* Bouton */}
          <button
            type="submit"
            disabled={status === "loading" || !email}
            className="w-full rounded-full bg-emerald-500 px-8 py-3 font-medium text-white hover:bg-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Inscription..." : "🔔 M'informer du lancement"}
          </button>
        </form>

        {/* Info RGPD */}
        <p className="mt-6 text-xs text-zinc-500 text-center">
          Vos données ne seront utilisées que pour vous notifier du lancement. 
          Pas de spam, désinscription en un clic.
        </p>
      </section>

      {/* Produits en développement */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-2xl font-bold text-white mb-6">Produits à venir</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                Live Demo
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">Budget AI</h3>
            <p className="text-sm text-emerald-400 mt-1">Assistant Financier Intelligent</p>
            <p className="text-sm text-zinc-400 mt-3">
              Version complète avec synchronisation bancaire, multi-comptes et app mobile.
            </p>
          </div>

          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                En développement
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">AI Act Auditor</h3>
            <p className="text-sm text-purple-400 mt-1">Conformité AI Act & RGPD</p>
            <p className="text-sm text-zinc-400 mt-3">
              Outil d'audit complet avec scoring, recommandations et suivi de conformité.
            </p>
          </div>
        </div>
      </section>

      {/* CTA retour */}
      <div className="text-center">
        <Link
          href="/"
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </PageContainer>
  );
}
