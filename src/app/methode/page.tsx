import Link from "next/link";

import PageContainer from "@/components/PageContainer";
import StickyCTA from "@/components/StickyCtA";

// Données des résultats clients
const clientResults = [
  { metric: "60%", label: "temps gagné", detail: "Cabinet comptable" },
  { metric: "91%", label: "précision auto", detail: "Classification docs" },
  { metric: "45s", label: "vs 10 min", detail: "Recherche de biens" },
  { metric: "0€", label: "coût infra", detail: "Tiers gratuits" },
];

export default function MethodePage() {
  return (
    <>
      <PageContainer className="gap-10">
        {/* Hero avec storytelling narratif */}
        <section className="glass-panel p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
            Kenshu Dev — Méthode
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
            Vous perdez du temps sur des tâches répétitives ?
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-300">
            Cabinets comptables, avocats, agences immobilières : vos équipes
            passent des heures à trier des emails, classer des documents,
            chercher des informations. <strong className="text-white">Ce temps perdu, c&apos;est du
            conseil client en moins.</strong>
          </p>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Je construis des outils IA qui automatisent ces tâches — sans
            exposer vos données, sans changer vos logiciels, sans formation
            complexe.
          </p>

          {/* Métriques de preuve sociale */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {clientResults.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-center"
              >
                <p className="text-2xl font-bold text-emerald-300">
                  {item.metric}
                </p>
                <p className="text-sm text-zinc-300">{item.label}</p>
                <p className="mt-1 text-xs text-zinc-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Le problème (pour qui + douleur) */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Le problème
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Ce que je vois chez mes clients
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  "2-3 heures/jour à trier des pièces comptables manuellement",
                  "Des négociateurs qui cherchent 10 min un bien au lieu de rappeler le prospect",
                  "Des données sensibles envoyées vers des outils cloud sans protection",
                  "Des outils \"IA\" achetés mais jamais utilisés car trop complexes",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300">
                    <span className="mt-1 text-amber-400">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-medium text-white">Vous reconnaissez-vous ?</h3>
              <p className="mt-3 text-sm text-zinc-400">
                Si votre équipe passe plus de temps à chercher et classer qu&apos;à
                produire de la valeur, vous êtes au bon endroit.
              </p>
              <p className="mt-4 text-sm text-zinc-400">
                La bonne nouvelle : ces tâches sont <strong className="text-emerald-300">exactement</strong> ce
                que l&apos;IA fait bien — si elle est bien intégrée.
              </p>
            </div>
          </div>
        </section>

        {/* La solution (ce que je fais) */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Ce que je construis
          </h2>
          <p className="mt-3 text-zinc-300">
            Des outils sur mesure qui s&apos;intègrent à votre quotidien — pas des
            gadgets.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                icon: "📄",
                title: "Automatisation documentaire",
                description:
                  "OCR + classification IA. Vos factures, contrats, pièces comptables triés et renommés automatiquement.",
                result: "Cabinet comptable : 2h30 → 45 min/jour",
              },
              {
                icon: "💬",
                title: "Assistants IA métier",
                description:
                  "Chatbots qui connaissent vos données. Recherche de biens, FAQ clients, base de connaissances interne.",
                result: "Agence immo : fiche prospect en 10 secondes",
              },
              {
                icon: "📊",
                title: "Tableaux de bord intelligents",
                description:
                  "Visualisation + alertes automatiques. Vos chiffres expliqués sans maîtriser Excel.",
                result: "Détection d'anomalies avant qu'elles coûtent cher",
              },
              {
                icon: "🔗",
                title: "Intégration sans migration",
                description:
                  "Je m'adapte à vos logiciels existants (même anciens). Export CSV si pas d'API.",
                result: "Zéro changement dans vos habitudes",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-medium text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      {item.description}
                    </p>
                    <p className="mt-3 text-sm font-medium text-emerald-300">
                      → {item.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* La démarche (process) */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Comment ça se passe
          </h2>
          <p className="mt-3 text-zinc-300">
            4 étapes simples. Vous savez où vous en êtes à chaque moment.
          </p>
          <div className="relative mt-8">
            {/* Ligne de connexion verticale */}
            <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-emerald-400/50 via-emerald-400/20 to-transparent md:block" />

            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Diagnostic gratuit",
                  duration: "1 heure",
                  description:
                    "On identifie les tâches répétitives qui vous coûtent du temps. Je vous dis honnêtement si l'IA peut aider.",
                  deliverable: "Compte-rendu écrit avec 2-3 pistes concrètes",
                  highlight: true,
                },
                {
                  step: "2",
                  title: "Prototype fonctionnel",
                  duration: "1-2 semaines",
                  description:
                    "Une première version sur un périmètre restreint. Vous testez avec vos vraies données.",
                  deliverable: "Outil utilisable + retours terrain",
                },
                {
                  step: "3",
                  title: "Déploiement + formation",
                  duration: "2-4 semaines",
                  description:
                    "On ajuste selon vos retours, puis on étend à toute l'équipe. Formation incluse.",
                  deliverable: "Outil en production + équipe autonome",
                },
                {
                  step: "4",
                  title: "Suivi & évolutions",
                  duration: "Optionnel",
                  description:
                    "Je reste disponible pour les ajustements. Pas de dépendance si vous ne le souhaitez pas.",
                  deliverable: "Support réactif + transfert de compétences",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className={`flex gap-5 rounded-xl border p-5 ${
                    item.highlight
                      ? "border-emerald-400/30 bg-emerald-400/5"
                      : "border-white/10 bg-gradient-to-r from-white/5 to-transparent"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-lg font-semibold text-emerald-300">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-medium text-white">{item.title}</h3>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-zinc-400">
                        {item.duration}
                      </span>
                      {item.highlight && (
                        <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs text-emerald-300">
                          Gratuit
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-zinc-400">
                      {item.description}
                    </p>
                    <p className="mt-2 text-xs text-zinc-500">
                      <span className="text-zinc-400">Livrable :</span>{" "}
                      {item.deliverable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engagements (trust) */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Mes engagements
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: "🔒",
                title: "Confidentialité",
                description:
                  "Vos données restent chez vous. Solutions locales ou européennes. Anonymisation avant tout envoi vers des API.",
              },
              {
                icon: "🎓",
                title: "Autonomie",
                description:
                  "Si votre équipe ne peut pas utiliser l'outil sans moi, j'ai échoué. Formation et documentation incluses.",
              },
              {
                icon: "💬",
                title: "Honnêteté",
                description:
                  "Je vous dis quand l'IA n'est pas la solution. Parfois un tableur suffit. Je ne vends pas du rêve.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-3 font-medium text-emerald-300">
                  {item.title}
                </h3>
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
          <p className="mt-3 text-sm text-zinc-400">
            Transparence sur ce qui ne rentre pas dans ma façon de travailler :
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              '"On veut de l\'IA" — sans problème clair à résoudre',
              "Les délais impossibles sans compromis sur le périmètre",
              "Les solutions qui exposent vos données sans protection",
              "Le remplacement de vos équipes — l'IA augmente, elle ne remplace pas",
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

        {/* Tarification */}
        <section className="glass-panel p-8 md:p-10">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Tarification transparente
          </h2>
          <p className="mt-3 text-zinc-400">
            Prix fixe défini après le diagnostic. Pas de surprise.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-white">
                  Forfait projet
                </p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-400">
                  Le plus courant
                </span>
              </div>
              <p className="mt-3 text-zinc-400">
                Prix fixe pour un périmètre défini. Vous savez ce que vous payez
                avant de commencer.
              </p>
              <p className="mt-4 text-2xl font-semibold text-white">
                2 000€ – 15 000€
              </p>
              <p className="text-sm text-zinc-500">selon complexité</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-white">
                  Accompagnement
                </p>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-400">
                  Projets évolutifs
                </span>
              </div>
              <p className="mt-3 text-zinc-400">
                Pour les projets qui grandissent. Nombre de jours flexibles,
                ajustable chaque mois.
              </p>
              <p className="mt-4 text-2xl font-semibold text-white">
                À partir de 800€/mois
              </p>
              <p className="text-sm text-zinc-500">2 jours inclus</p>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-center">
            <p className="font-medium text-emerald-300">
              ✓ Diagnostic initial gratuit et sans engagement
            </p>
          </div>
        </section>

        {/* CTA final */}
        <section className="glass-panel p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            Prêt à récupérer du temps ?
          </h2>
          <p className="mt-3 text-zinc-400">
            30 minutes pour discuter de votre situation.
            <br />
            <span className="text-zinc-500">
              Si l&apos;IA n&apos;est pas la bonne solution, je vous le dis.
            </span>
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-100"
            >
              Réserver un appel gratuit →
            </Link>
            <Link
              href="/projets"
              className="text-sm text-zinc-400 transition hover:text-white"
            >
              Voir les études de cas
            </Link>
          </div>
        </section>
      </PageContainer>

      {/* CTA sticky */}
      <StickyCTA text="Réserver un diagnostic gratuit" href="/contact" />
    </>
  );
}
