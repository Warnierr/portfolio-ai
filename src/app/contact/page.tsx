import Link from "next/link";

import PageContainer from "@/components/PageContainer";

const contactLinks = [
  {
    label: "Email",
    value: "contact@exemple.com",
    href: "mailto:contact@exemple.com",
    description: "Réponse sous 24h",
  },
  {
    label: "LinkedIn",
    value: "Profil LinkedIn",
    href: "https://www.linkedin.com",
    description: "Pour me suivre",
  },
];

const faqItems = [
  {
    question: "Combien coûte un projet ?",
    answer:
      "Les projets vont de 2 000€ à 15 000€ selon la complexité. Le diagnostic initial est gratuit et vous permet d'avoir un devis précis avant de vous engager.",
  },
  {
    question: "Combien de temps pour un premier livrable ?",
    answer:
      "Un prototype fonctionnel est généralement prêt en 1 à 2 semaines. Le déploiement complet prend 1 à 3 mois selon le périmètre.",
  },
  {
    question: "Mes données sont-elles en sécurité ?",
    answer:
      "Je privilégie les solutions locales ou européennes. Aucune donnée sensible n'est envoyée vers des API externes sans anonymisation préalable.",
  },
  {
    question: "Faut-il des compétences techniques dans mon équipe ?",
    answer:
      "Non. La formation est incluse et les outils sont conçus pour être utilisés sans moi. Documentation et support fournis.",
  },
];

export default function ContactPage() {
  return (
    <PageContainer className="gap-10">
      {/* En-tête */}
      <section className="glass-panel p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Contact
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
          Discutons de votre projet
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Premier appel de 30 minutes gratuit et sans engagement. On identifie
          ensemble si l&apos;IA peut vous faire gagner du temps.
        </p>
      </section>

      {/* Options de contact */}
      <section className="grid gap-6 md:grid-cols-2">
        {/* Appel */}
        <div className="glass-panel p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-xl">
            📅
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">
            Réserver un appel
          </h2>
          <p className="mt-2 text-zinc-400">
            30 minutes pour discuter de votre situation et identifier les
            opportunités d&apos;automatisation.
          </p>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            Choisir un créneau →
          </a>
          <p className="mt-3 text-xs text-zinc-500">
            Lien Calendly — créneau confirmé par email
          </p>
        </div>

        {/* Email */}
        <div className="glass-panel p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10 text-xl">
            ✉️
          </div>
          <h2 className="mt-4 text-xl font-semibold text-white">
            M&apos;écrire directement
          </h2>
          <p className="mt-2 text-zinc-400">
            Pour les demandes précises ou si vous préférez commencer par écrit.
          </p>
          <div className="mt-6 space-y-3">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div>
                  <p className="font-medium text-white">{link.value}</p>
                  <p className="text-xs text-zinc-500">{link.description}</p>
                </div>
                <span className="text-zinc-500">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui se passe ensuite */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Ce qui se passe ensuite
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Appel diagnostic",
              description:
                "On identifie vos tâches chronophages et on évalue si l'IA est pertinente.",
            },
            {
              step: "2",
              title: "Proposition écrite",
              description:
                "Vous recevez un document avec périmètre, délais et budget — sans surprise.",
            },
            {
              step: "3",
              title: "Décision libre",
              description:
                "Vous prenez le temps de réfléchir. Pas de relance, pas de pression.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 font-semibold text-white">
                {item.step}
              </div>
              <h3 className="mt-3 font-medium text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Questions fréquentes
        </h2>
        <div className="mt-6 space-y-4">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <p className="font-medium text-white">{item.question}</p>
              <p className="mt-2 text-sm text-zinc-400">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pour les profils techniques */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Pour les profils techniques
        </h2>
        <p className="mt-3 text-zinc-300">
          Si vous êtes CTO, Tech Lead ou développeur et que vous cherchez un
          regard extérieur sur une architecture IA, n&apos;hésitez pas à me
          contacter. Je fais aussi du conseil ponctuel et des revues de code.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/projets"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Voir mes études de cas →
          </Link>
          <Link
            href="/methode"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Ma méthode de travail →
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
