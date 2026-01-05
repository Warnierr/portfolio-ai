import Link from "next/link";

import PageContainer from "@/components/PageContainer";
import ContactForm from "@/components/ContactForm";

const faqItems = [
  {
    question: "Combien coûte un projet ?",
    answer: "Entre 2 000€ et 15 000€ selon la complexité. Devis précis après le diagnostic gratuit.",
  },
  {
    question: "Quel délai pour un premier livrable ?",
    answer: "Prototype en 1-2 semaines. Déploiement complet en 1-3 mois.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Hébergement local ou européen. Anonymisation avant envoi vers les API externes.",
  },
  {
    question: "Faut-il des compétences techniques ?",
    answer: "Non. Formation incluse, documentation fournie.",
  },
];

export default function ContactPage() {
  return (
    <PageContainer className="gap-10">
      {/* Header */}
      <section className="glass-panel p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Contact
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
          Discutons de votre projet
        </h1>
        <p className="mt-4 max-w-xl text-zinc-300">
          Premier appel de 30 minutes gratuit pour évaluer si l&apos;IA peut
          vous aider.
        </p>
      </section>

      {/* Options */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="glass-panel p-8">
          <h2 className="text-xl font-semibold text-white">Réserver un appel</h2>
          <p className="mt-2 text-zinc-400">
            30 minutes pour discuter de votre situation.
          </p>
          <a
            href="tel:+33749416355"
            className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
          >
            📞 +33 7 49 41 63 55
          </a>
          <p className="mt-3 text-xs text-zinc-500">Disponible 9h-18h</p>
        </div>

        <div className="glass-panel p-8">
          <h2 className="text-xl font-semibold text-white">Envoyer un message</h2>
          <p className="mt-2 text-zinc-400 mb-6">
            Réponse garantie sous 24h.
          </p>

          <ContactForm />
        </div>
      </section>

      {/* Process après contact */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Ensuite
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              step: "1",
              title: "Appel diagnostic",
              description: "On identifie les tâches automatisables.",
            },
            {
              step: "2",
              title: "Proposition",
              description: "Périmètre, délais et budget par écrit.",
            },
            {
              step: "3",
              title: "Décision",
              description: "Vous prenez le temps. Pas de relance.",
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

      {/* Profils techniques */}
      <section className="glass-panel p-8 md:p-10">
        <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Pour les profils techniques
        </h2>
        <p className="mt-3 text-zinc-300">
          CTO, Tech Lead ou développeur ? Je fais aussi du conseil ponctuel
          sur les architectures IA et des revues de code.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/projets"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Études de cas →
          </Link>
          <Link
            href="/methode"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Méthode de travail →
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
