import Link from "next/link";

import PageContainer from "@/components/PageContainer";

export default function MethodePage() {
  return (
    <PageContainer className="gap-10">
      {/* En-tête */}
      <section className="glass-panel p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Comment je travaille
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
          Une méthode pensée pour les TPE et PME
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Cabinets comptables, avocats, agences immobilières ou marketing : je
          vous aide à intégrer l&apos;IA dans votre quotidien. Pas pour remplacer vos
          équipes, mais pour leur libérer du temps sur ce qui compte.
        </p>
      </section>

      {/* Ce que je fais */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Ce que je construis
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Automatisation documentaire",
              description:
                "Tri, classement et extraction automatique de vos documents. Factures, contrats, pièces comptables — traités en quelques secondes au lieu d'heures.",
              example: "Cabinet comptable : 2h30 de saisie → 45 min",
            },
            {
              title: "Assistants IA métier",
              description:
                "Chatbots internes qui connaissent vos données et répondent en langage naturel. Recherche de biens, FAQ clients, base de connaissances.",
              example: "Agence immo : fiche prospect générée en 10 secondes",
            },
            {
              title: "Tableaux de bord intelligents",
              description:
                "Visualisation de vos données avec alertes automatiques et recommandations. Pas besoin de maîtriser Excel pour comprendre vos chiffres.",
              example: "Alertes automatiques sur les anomalies",
            },
            {
              title: "Intégration à vos outils existants",
              description:
                "Je m'adapte à vos logiciels métier (même anciens). Pas de changement brutal, pas de migration risquée.",
              example: "Export CSV quotidien si pas d'API",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <h3 className="font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
              <p className="mt-3 text-sm text-emerald-300">→ {item.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Mon process en 4 étapes
        </h2>
        <div className="mt-6 space-y-6">
          {[
            {
              step: "1",
              title: "Diagnostic gratuit (1h)",
              description:
                "On identifie ensemble les tâches répétitives qui vous coûtent du temps. Je vous dis honnêtement si l'IA peut aider ou non.",
              deliverable: "Compte-rendu écrit avec 2-3 pistes concrètes",
            },
            {
              step: "2",
              title: "Prototype rapide (1-2 semaines)",
              description:
                "Je construis une première version fonctionnelle sur un périmètre restreint. Vous testez avec vos vraies données.",
              deliverable: "Outil utilisable + retours terrain",
            },
            {
              step: "3",
              title: "Déploiement progressif",
              description:
                "On ajuste selon vos retours, puis on étend à toute l'équipe. Formation incluse, documentation fournie.",
              deliverable: "Outil en production + équipe formée",
            },
            {
              step: "4",
              title: "Suivi et maintenance",
              description:
                "Je reste disponible pour les ajustements et les évolutions. Pas de dépendance à long terme si vous ne le souhaitez pas.",
              deliverable: "Support réactif + transfert de compétences",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex gap-5 rounded-xl border border-white/10 bg-gradient-to-r from-white/5 to-transparent p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-lg font-semibold text-emerald-300">
                {item.step}
              </div>
              <div>
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
                <p className="mt-2 text-xs text-zinc-500">
                  Livrable : {item.deliverable}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ce que je refuse */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Ce que je refuse
        </h2>
        <p className="mt-3 text-zinc-400">
          Transparence sur ce qui ne rentre pas dans ma façon de travailler :
        </p>
        <ul className="mt-4 space-y-3">
          {[
            "Les projets sans objectif clair — \"on veut de l'IA\" n'est pas un brief",
            "Les délais impossibles sans compromis sur le périmètre",
            "Les solutions qui exposent vos données sensibles sans protection",
            "Le remplacement pur et simple de vos équipes — l'IA augmente, elle ne remplace pas",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-zinc-300">
              <span className="mt-0.5 text-red-400">✕</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Garanties */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Mes engagements
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Confidentialité",
              description:
                "Vos données restent chez vous. Je privilégie les solutions locales ou européennes. Aucune donnée sensible vers des API américaines sans anonymisation.",
            },
            {
              title: "Simplicité",
              description:
                "Si votre équipe ne peut pas utiliser l'outil sans moi, j'ai échoué. Formation et documentation incluses dans chaque projet.",
            },
            {
              title: "Honnêteté",
              description:
                "Je vous dis quand l'IA n'est pas la bonne solution. Parfois un tableur bien fait suffit. Je ne vends pas du rêve.",
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

      {/* Tarification */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Tarification transparente
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-2xl font-semibold text-white">Forfait projet</p>
            <p className="mt-2 text-zinc-400">
              Prix fixe défini après le diagnostic. Vous savez exactement ce que
              vous payez avant de commencer.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              Typiquement : 2 000€ – 15 000€ selon complexité
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-2xl font-semibold text-white">
              Accompagnement mensuel
            </p>
            <p className="mt-2 text-zinc-400">
              Pour les projets qui évoluent. Nombre de jours flexibles,
              ajustable chaque mois.
            </p>
            <p className="mt-4 text-sm text-zinc-500">
              À partir de 800€/mois (2 jours)
            </p>
          </div>
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          Le diagnostic initial est gratuit et sans engagement.
        </p>
      </section>

      {/* CTA */}
      <section className="glass-panel p-8 text-center md:p-10">
        <h2 className="text-2xl font-semibold text-white">
          Prêt à gagner du temps ?
        </h2>
        <p className="mt-2 text-zinc-400">
          Réservez un appel de 30 minutes pour discuter de votre situation.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-white px-8 py-3 font-medium text-black transition hover:bg-zinc-200"
        >
          Prendre rendez-vous →
        </Link>
      </section>
    </PageContainer>
  );
}
