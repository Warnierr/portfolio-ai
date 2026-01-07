"use client";

import { motion } from "framer-motion";

type MethodologyStep = {
  phase: string;
  title: string;
  description: string;
  icon: string;
};

const defaultSteps: MethodologyStep[] = [
  {
    phase: "1. Analyse",
    title: "Problème & Contexte",
    description: "Audit technique, identification des contraintes, définition des objectifs mesurables",
    icon: "🔍",
  },
  {
    phase: "2. Architecture",
    title: "Décisions Techniques",
    description: "Choix des technologies, trade-offs, design de l'architecture scalable",
    icon: "🏗️",
  },
  {
    phase: "3. Implémentation",
    title: "Développement & Tests",
    description: "Code production-ready, tests unitaires/intégration, documentation",
    icon: "⚙️",
  },
  {
    phase: "4. Déploiement",
    title: "Mise en Production",
    description: "CI/CD, monitoring, observabilité, rollback strategy",
    icon: "🚀",
  },
  {
    phase: "5. Optimisation",
    title: "Résultats & Amélioration",
    description: "Métriques de performance, feedback, itérations continues",
    icon: "📊",
  },
];

type MethodologyTimelineProps = {
  steps?: MethodologyStep[];
};

export default function MethodologyTimeline({ steps = defaultSteps }: MethodologyTimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-emerald-500 via-blue-500 to-purple-500 md:left-1/2" />

      <div className="space-y-12">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center gap-6 ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                    {step.phase}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-zinc-400">{step.description}</p>
                </div>
              </div>

              {/* Icon */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-zinc-900 text-2xl">
                {step.icon}
              </div>

              {/* Spacer for alignment */}
              <div className="hidden flex-1 md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
