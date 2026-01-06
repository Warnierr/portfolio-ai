import Link from "next/link";
import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "AI Compliance Audit Tool — Conformité AI Act & RGPD | Kenshu",
  description: "Outil d'audit automatisé pour évaluer la conformité de vos systèmes IA selon le cadre européen AI Act et RGPD. Classification des risques, checklists réglementaires et rapports détaillés.",
  alternates: {
    canonical: "/app/ai-compliance",
  },
  openGraph: {
    title: "AI Compliance Audit Tool — Conformité AI Act & RGPD",
    description: "Auditez la conformité de vos systèmes IA avec le cadre européen. Prêt pour 2026-2027.",
    url: "https://kenshu.dev/app/ai-compliance",
    type: "website",
  },
};

export default function AIComplianceAppPage() {
  return (
    <>
      {/* Schema.org SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AI Compliance Audit Tool",
            "description": "Outil d'audit automatisé pour évaluer la conformité des systèmes d'IA selon le cadre européen AI Act et RGPD.",
            "applicationCategory": "ComplianceApplication",
            "operatingSystem": "Web",
            "url": "https://kenshu.dev/app/ai-compliance",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/PreOrder"
            },
            "author": {
              "@type": "Person",
              "name": "Raouf Warnier",
              "url": "https://kenshu.dev",
              "jobTitle": "AI Compliance Engineer, Data Engineer"
            },
            "featureList": [
              "Classification des systèmes IA par niveau de risque",
              "Checklist dynamique selon obligations AI Act",
              "Rapport d'audit exportable (PDF/JSON)",
              "Base de connaissances AI Act intégrée",
              "Suivi de conformité RGPD complémentaire"
            ],
            "softwareVersion": "0.1",
            "datePublished": "2025-01-01"
          })
        }}
      />

      <PageContainer className="gap-12">
        <SectionTitle
          eyebrow="AI Compliance Audit Tool"
          title="Conformité AI Act & RGPD"
          subtitle="Auditez vos systèmes IA pour la réglementation européenne 2026-2027"
        />

        {/* Hero avec badge Early Access */}
        <section className="glass-panel p-8 md:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-400/10 px-4 py-2 text-sm text-purple-300 mb-6">
              <span>🚀</span> Early Access 2026 — Prototype v0.1
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Anticipez la conformité AI Act dès maintenant
            </h2>
            <p className="text-lg text-zinc-300 mb-8">
              Outil technique pour évaluer la conformité de vos systèmes IA selon le cadre européen. 
              Classification des risques, checklists réglementaires et rapports exportables.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/audit-conformite-ai-act-rgpd"
                className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-8 py-4 text-lg font-medium text-white hover:bg-purple-600 transition"
              >
                📋 Découvrir l'AI Act →
              </Link>
              <Link
                href="/projets/ai-compliance-audit-tool"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-medium text-white hover:bg-white/10 transition"
              >
                📖 Voir le case study
              </Link>
            </div>
          </div>
        </section>

        {/* Pourquoi cet outil ? */}
        <section className="glass-panel p-8 md:p-10">
          <h3 className="text-xl font-bold text-white mb-4">
            🇪🇺 Pourquoi l'AI Act va changer votre roadmap 2026-2027
          </h3>
          <div className="space-y-4 text-zinc-300">
            <p>
              Le <strong className="text-white">AI Act européen</strong> (règlement UE 2024/1689) impose 
              des obligations progressives aux systèmes d'IA dès août 2026.
            </p>
            <p>
              Les entreprises devront <strong className="text-emerald-400">auditer, documenter et justifier</strong> leurs 
              systèmes IA sous peine d'amendes jusqu'à <strong className="text-red-400">7% du CA mondial</strong>.
            </p>
            <p className="text-zinc-400 text-sm border-l-2 border-purple-500/30 pl-4">
              📌 <strong>Problème :</strong> Pas d'outils techniques accessibles pour les équipes produit et développement. 
              Les juristes ne comprennent pas le code, les devs ne comprennent pas le cadre légal.
            </p>
          </div>
        </section>

        {/* Fonctionnalités */}
        <section>
          <h3 className="text-xl font-bold text-white mb-6">Ce que fait l'outil</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="glass-panel p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-lg font-bold text-white mb-2">Classification des Risques</h4>
              <p className="text-zinc-300">
                Déterminez le niveau de risque de votre système IA (inacceptable, élevé, limité, minimal) selon les critères officiels.
              </p>
            </div>

            <div className="glass-panel p-6">
              <div className="text-3xl mb-3">✅</div>
              <h4 className="text-lg font-bold text-white mb-2">Checklist Interactive</h4>
              <p className="text-zinc-300">
                Obligations techniques adaptées dynamiquement selon votre classification. Chaque question renvoie à l'article de loi.
              </p>
            </div>

            <div className="glass-panel p-6">
              <div className="text-3xl mb-3">📄</div>
              <h4 className="text-lg font-bold text-white mb-2">Rapport d'Audit Exportable</h4>
              <p className="text-zinc-300">
                Générez un rapport PDF ou JSON partageable avec votre direction et vos juristes.
              </p>
            </div>

            <div className="glass-panel p-6">
              <div className="text-3xl mb-3">📚</div>
              <h4 className="text-lg font-bold text-white mb-2">Base de Connaissances Intégrée</h4>
              <p className="text-zinc-300">
                Accédez aux articles officiels du règlement AI Act directement dans l'interface.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline AI Act */}
        <section className="glass-panel p-8">
          <h3 className="text-lg font-semibold text-white mb-4">📅 Calendrier AI Act 2025-2027</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-sm font-mono text-zinc-500 min-w-[100px]">Fév 2025</span>
              <p className="text-zinc-300">Interdiction des pratiques à risque inacceptable</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-sm font-mono text-zinc-500 min-w-[100px]">Août 2025</span>
              <p className="text-zinc-300">Obligations pour modèles IA à usage général (GPAI)</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-sm font-mono text-purple-400 min-w-[100px] font-bold">Août 2026</span>
              <p className="text-white font-semibold">Application générale de la plupart des obligations</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-sm font-mono text-zinc-500 min-w-[100px]">Août 2027</span>
              <p className="text-zinc-300">Transition finale pour systèmes à haut risque (secteurs réglementés)</p>
            </div>
          </div>
        </section>

        {/* Stack technique */}
        <section className="glass-panel p-8">
          <h3 className="text-lg font-semibold text-white mb-4">Stack Technique</h3>
          <div className="flex flex-wrap gap-2">
            {["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "PDF Generation", "React Hook Form"].map((tech) => (
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
          <h3 className="text-lg font-semibold text-white mb-4">Roadmap 2026</h3>
          <ul className="space-y-3">
            {[
              "Intégration API pour audit automatisé de code/modèles",
              "Module RGPD complémentaire (croisement AI Act + RGPD)",
              "Multi-langue (EN/FR/DE)",
              "Dashboard de suivi de conformité dans le temps",
              "Export vers outils de gestion de risque (GRC)"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-zinc-300">
                <span className="text-zinc-500">☐</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Beta Access CTA */}
        <section className="glass-panel p-8 md:p-10 text-center bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
          <h3 className="text-2xl font-bold text-white mb-3">
            🚀 Accès anticipé (Beta 2026)
          </h3>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            L'outil est en développement actif. Intéressé pour tester la beta ou discuter d'un audit AI Act personnalisé ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-purple-500 px-8 py-3 font-medium text-white hover:bg-purple-600 transition"
            >
              📧 Demander un accès beta
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3 font-medium text-white hover:bg-white/10 transition"
            >
              Voir mes services compliance →
            </Link>
          </div>
        </section>

        {/* Positioning Statement */}
        <section className="glass-panel p-8 text-center">
          <p className="text-sm text-zinc-400 max-w-2xl mx-auto">
            💡 <strong className="text-white">Positionnement unique :</strong> Je suis Data Engineer avec expertise 
            en production, et je me forme activement à l'AI Act européen. Ce projet me permet de créer le pont 
            entre <strong className="text-emerald-400">tech</strong> et <strong className="text-purple-400">réglementation</strong> 
            — un profil rare et très demandé pour 2026-2027.
          </p>
        </section>
      </PageContainer>
    </>
  );
}
