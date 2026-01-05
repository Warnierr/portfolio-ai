"use client";

export default function ProcessDiagram() {
  return (
    <div className="relative my-8">
      {/* Ligne de connexion */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 -translate-y-1/2 hidden md:block" />
      
      <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Étape 1: Audit */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 backdrop-blur-sm">
            <div className="text-3xl">🔍</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-2 flex items-center justify-center gap-2">
              <h3 className="font-semibold text-white">Audit & Stratégie</h3>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">
                1-2j
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              Analyse de l&apos;existant et définition de la stack cible
            </p>
            <p className="mt-3 text-xs font-medium text-emerald-300">
              → Roadmap technique détaillée
            </p>
          </div>
        </div>

        {/* Étape 2: Sprint */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500/40 bg-gradient-to-br from-blue-500/20 to-blue-500/5 backdrop-blur-sm">
            <div className="text-3xl">⚡</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-2 flex items-center justify-center gap-2">
              <h3 className="font-semibold text-white">Sprint Implementation</h3>
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-300">
                1-4sem
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              Développement itératif des pipelines ou de l&apos;application
            </p>
            <p className="mt-3 text-xs font-medium text-blue-300">
              → Code source & Tests automatisés
            </p>
          </div>
        </div>

        {/* Étape 3: Industrialisation */}
        <div className="relative flex flex-col items-center text-center">
          <div className="relative z-10 mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2 border-purple-500/40 bg-gradient-to-br from-purple-500/20 to-purple-500/5 backdrop-blur-sm">
            <div className="text-3xl">🚀</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-2 flex items-center justify-center gap-2">
              <h3 className="font-semibold text-white">Industrialisation</h3>
              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-300">
                1sem
              </span>
            </div>
            <p className="text-sm text-zinc-400">
              Mise en place du CI/CD et du monitoring (Grafana/Alerting)
            </p>
            <p className="mt-3 text-xs font-medium text-purple-300">
              → Infrastructure stable à 99.9%
            </p>
          </div>
        </div>
      </div>
      
      {/* Flèches visuelles pour mobile */}
      <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
        <div className="h-2 w-2 rounded-full bg-emerald-500" />
        <div className="h-0.5 w-8 bg-gradient-to-r from-emerald-500 to-blue-500" />
        <div className="h-2 w-2 rounded-full bg-blue-500" />
        <div className="h-0.5 w-8 bg-gradient-to-r from-blue-500 to-purple-500" />
        <div className="h-2 w-2 rounded-full bg-purple-500" />
      </div>
    </div>
  );
}
