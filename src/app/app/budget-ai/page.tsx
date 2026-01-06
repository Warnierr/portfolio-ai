import Link from "next/link";
import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Budget AI — Assistant Financier Intelligent | Kenshu",
  description: "Assistant personnel intelligent qui transforme vos dépenses en conseils stratégiques. Prédictions de solde, détection d'abonnements et coaching IA en temps réel. Privacy-first et gratuit.",
  alternates: {
    canonical: "/app/budget-ai",
  },
  openGraph: {
    title: "Budget AI — Assistant Financier Intelligent",
    description: "Transformez vos dépenses en conseils stratégiques avec l'IA. Privacy-first et gratuit.",
    url: "https://kenshu.dev/app/budget-ai",
    type: "website",
    images: [{
      url: "/projects/budget_ai.png",
      width: 1200,
      height: 630,
      alt: "Budget AI - Interface de l'application"
    }]
  },
};

export default function BudgetAIAppPage() {
  return (
    <>
      {/* Schema.org SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Budget AI",
            "description": "Assistant financier intelligent avec prédictions de solde, détection d'abonnements et coaching IA en temps réel.",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "url": "https://kenshu.dev/app/budget-ai",
            "screenshot": "https://kenshu.dev/projects/budget_ai.png",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock"
            },
            "author": {
              "@type": "Person",
              "name": "Raouf Warnier",
              "url": "https://kenshu.dev",
              "jobTitle": "AI Product Builder, Data Engineer"
            },
            "featureList": [
              "Assistant Financier Contextuel (Chat en temps réel)",
              "Projection de Solde & Reste à Vivre",
              "Détection automatique des abonnements",
              "Interface Glassmorphism avec thèmes dynamiques",
              "Privacy-first : anonymisation des données"
            ],
            "softwareVersion": "1.0",
            "datePublished": "2024-01-01"
          })
        }}
      />

      <PageContainer className="gap-12">
        <SectionTitle
          eyebrow="Budget AI"
          title="Assistant Financier Intelligent"
          subtitle="Transformez vos dépenses en conseils stratégiques avec l'IA"
        />

        {/* Hero avec CTA */}
        <section className="glass-panel p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Votre coach financier personnel, alimenté par l'IA
            </h2>
            <p className="text-lg text-zinc-300 mb-8">
              Budget AI analyse vos dépenses, prédit votre solde futur et vous conseille en temps réel. 
              <strong className="text-emerald-400"> Privacy-first</strong> : vos données restent anonymisées.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://budget-ai-portfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-4 text-lg font-medium text-white hover:bg-red-600 transition shadow-[0_0_25px_rgba(239,68,68,0.4)]"
              >
                🔴 Essayer la démo live →
              </a>
              <Link
                href="/projets/budget-ai"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-medium text-white hover:bg-white/10 transition"
              >
                📖 Voir le case study
              </Link>
            </div>
          </div>
        </section>

        {/* Fonctionnalités */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="glass-panel p-6">
            <div className="text-3xl mb-3">🤖</div>
            <h3 className="text-xl font-bold text-white mb-2">Assistant IA Conversationnel</h3>
            <p className="text-zinc-300">
              Posez des questions sur vos finances en langage naturel. L'IA analyse vos données et répond en temps réel.
            </p>
          </div>

          <div className="glass-panel p-6">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Prédictions de Solde</h3>
            <p className="text-zinc-300">
              Visualisez votre solde futur et votre "reste à vivre" pour mieux anticiper vos dépenses.
            </p>
          </div>

          <div className="glass-panel p-6">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="text-xl font-bold text-white mb-2">Privacy-First</h3>
            <p className="text-zinc-300">
              Toutes vos données sont anonymisées AVANT d'être envoyées à l'IA. Vos comptes restent privés.
            </p>
          </div>

          <div className="glass-panel p-6">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="text-xl font-bold text-white mb-2">Détection d'Abonnements</h3>
            <p className="text-zinc-300">
              Identifiez automatiquement tous vos abonnements récurrents et optimisez vos dépenses.
            </p>
          </div>
        </section>

        {/* Stack technique */}
        <section className="glass-panel p-8">
          <h3 className="text-lg font-semibold text-white mb-4">Stack Technique</h3>
          <div className="flex flex-wrap gap-2">
            {["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "OpenRouter API", "Framer Motion", "Recharts"].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="glass-panel p-8">
          <h3 className="text-lg font-semibold text-white mb-4">À venir (Roadmap)</h3>
          <ul className="space-y-3">
            {[
              "Connexion bancaire directe (API GoCardless/Plaid)",
              "Mode Multi-Workspace (Budget Perso / Pro)",
              "Application Mobile (PWA ou React Native)"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="text-zinc-500">☐</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA Final */}
        <section className="glass-panel p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">
            Besoin d'une app similaire pour votre entreprise ?
          </h3>
          <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
            Je développe des applications IA sur-mesure avec focus sur la performance, 
            la sécurité et l'expérience utilisateur.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-emerald-500 px-8 py-3 font-medium text-white hover:bg-emerald-600 transition"
          >
            Discuter de votre projet →
          </Link>
        </section>
      </PageContainer>
    </>
  );
}
