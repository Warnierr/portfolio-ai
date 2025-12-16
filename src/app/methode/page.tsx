import Link from "next/link";

import PageContainer from "@/components/PageContainer";
import StickyCTA from "@/components/StickyCtA";

const metrics = [
  { value: "60%", label: "temps de saisie en moins", context: "Cabinet comptable" },
  { value: "91%", label: "précision classification", context: "Documents automatisés" },
  { value: "45s", label: "recherche de bien", context: "vs 10 min avant" },
];

export default function MethodePage() {
  return (
    <>
      <PageContainer className="gap-10">
        {/* Header */}
        <section className="glass-panel p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
            Méthode
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
            Automatisation IA pour TPE/PME
          </h1>
          <p className="mt-6 max-w-2xl text-zinc-300">
            Je travaille avec des cabinets comptables, avocats et agences qui
            perdent du temps sur des tâches répétitives : tri de documents,
            recherche d&apos;informations, saisie manuelle.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {metrics.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-center"
              >
                <p className="text-2xl font-bold text-emerald-300">{item.value}</p>
                <p className="text-sm text-zinc-300">{item.label}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.context}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ce que je vois */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Problèmes fréquents
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "2-3h par jour à trier des pièces comptables",
              "Négociateurs qui cherchent 10 min un bien au lieu de rappeler",
              "Données sensibles envoyées vers des outils cloud US",
              "Outils IA achetés mais jamais utilisés (trop complexes)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 text-amber-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Ce que je construis */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Ce que je construis
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Automatisation documentaire",
                description: "OCR + classification. Factures et pièces comptables triées automatiquement.",
                result: "2h30 → 45 min/jour",
              },
              {
                title: "Assistants métier",
                description: "Chatbots sur vos données. Recherche de biens, FAQ clients, base interne.",
                result: "Fiche prospect en 10 secondes",
              },
              {
                title: "Dashboards intelligents",
                description: "Visualisation + alertes automatiques sur vos données métier.",
                result: "Détection d'anomalies en temps réel",
              },
              {
                title: "Intégration logiciels",
                description: "Je m'adapte à vos outils existants. Export CSV si pas d'API.",
                result: "Zéro changement d'habitudes",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                <p className="mt-3 text-sm text-emerald-300">→ {item.result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Process
          </h2>
          <div className="mt-6 space-y-4">
            {[
              {
                step: "1",
                title: "Diagnostic",
                duration: "1h",
                description: "On identifie ce qui peut être automatisé. Je vous dis si l'IA est pertinente.",
                deliverable: "Compte-rendu avec 2-3 pistes",
                free: true,
              },
              {
                step: "2",
                title: "Prototype",
                duration: "1-2 semaines",
                description: "Première version fonctionnelle sur un périmètre restreint.",
                deliverable: "Outil testable sur vos données",
              },
              {
                step: "3",
                title: "Déploiement",
                duration: "2-4 semaines",
                description: "Ajustements, déploiement équipe, formation.",
                deliverable: "Outil en production + équipe autonome",
              },
              {
                step: "4",
                title: "Suivi",
                duration: "Optionnel",
                description: "Maintenance et évolutions si besoin.",
                deliverable: "Support réactif",
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`flex gap-5 rounded-xl border p-5 ${
                  item.free
                    ? "border-emerald-400/30 bg-emerald-400/5"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 font-semibold text-emerald-300">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium text-white">{item.title}</h3>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-zinc-400">
                      {item.duration}
                    </span>
                    {item.free && (
                      <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs text-emerald-300">
                        Gratuit
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    Livrable : {item.deliverable}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engagements */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Engagements
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Confidentialité",
                description: "Données locales ou européennes. Anonymisation avant envoi vers les API.",
              },
              {
                title: "Autonomie",
                description: "Formation incluse. L'outil doit fonctionner sans moi.",
              },
              {
                title: "Honnêteté",
                description: "Je vous dis quand l'IA n'est pas la solution. Parfois un tableur suffit.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-medium text-emerald-300">{item.title}</h3>
                <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Ce que je refuse */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Ce que je refuse
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              "Projets sans problème clair à résoudre",
              "Délais impossibles sans compromis",
              "Solutions qui exposent vos données",
              "Remplacement d'équipes par l'IA",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-red-400/10 bg-red-400/5 p-3 text-sm text-zinc-300"
              >
                <span className="text-red-400">✕</span>
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Tarifs */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Tarifs
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-xl font-semibold text-white">Forfait projet</p>
              <p className="mt-2 text-zinc-400">
                Prix fixe pour un périmètre défini.
              </p>
              <p className="mt-4 text-2xl font-semibold text-white">
                2 000€ – 15 000€
              </p>
              <p className="text-sm text-zinc-500">selon complexité</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-xl font-semibold text-white">Accompagnement</p>
              <p className="mt-2 text-zinc-400">
                Pour les projets qui évoluent.
              </p>
              <p className="mt-4 text-2xl font-semibold text-white">
                À partir de 800€/mois
              </p>
              <p className="text-sm text-zinc-500">2 jours inclus</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-500">
            Diagnostic initial gratuit.
          </p>
        </section>

        {/* CTA */}
        <section className="glass-panel p-8 text-center md:p-10">
          <h2 className="text-2xl font-semibold text-white">
            Un projet en tête ?
          </h2>
          <p className="mt-2 text-zinc-400">
            30 minutes pour évaluer si l&apos;IA peut aider.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-100"
            >
              Prendre contact
            </Link>
            <Link
              href="/projets"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Voir les projets
            </Link>
          </div>
        </section>
      </PageContainer>

      <StickyCTA text="Contact" href="/contact" />
    </>
  );
}
