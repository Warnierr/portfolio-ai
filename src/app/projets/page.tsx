"use client";

import PageContainer from "@/components/PageContainer";
import ExperienceItem from "@/components/ExperienceItem";
import { experiences } from "@/data/experiences";

export default function ExperiencesPage() {
  return (
    <PageContainer>
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white py-20">
        <div className="mx-auto max-w-4xl px-6">

          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Expériences Professionnelles
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Chaque rôle inclut un <span className="text-emerald-400 font-semibold">contexte IA interrogeable</span> — la vraie histoire derrière les bullet points.
            </p>
          </div>

          {/* Liste des expériences */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} data={exp} />
            ))}
          </div>

          {/* CTA Contact */}
          <div className="mt-20 text-center p-10 rounded-3xl border border-white/10 bg-white/5">
            <h3 className="text-2xl font-bold text-white mb-4">
              Vous avez un projet similaire ?
            </h3>
            <p className="text-zinc-400 mb-6">
              Je peux intervenir sur des missions Data, DevOps ou IA.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              Me contacter
            </a>
          </div>

        </div>
      </div>
    </PageContainer>
  );
}
