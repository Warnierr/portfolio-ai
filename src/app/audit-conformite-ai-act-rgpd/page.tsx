import type { Metadata } from "next";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export const metadata: Metadata = {
  title: "Audit Conformité AI Act & RGPD pour Systèmes IA — Préparation 2026-2027 | Kenshu",
  description: "Audit de conformité AI Act EU et RGPD pour systèmes d'IA. Classification des risques, obligations high-risk, documentation réglementaire. Early positioning 2026-2027. Outil prototype disponible.",
  alternates: {
    canonical: "/audit-conformite-ai-act-rgpd",
  },
  openGraph: {
    title: "Audit Conformité AI Act & RGPD pour Systèmes IA",
    description: "Audit de conformité AI Act EU et RGPD pour systèmes d'IA. Classification des risques, préparation 2026-2027.",
    url: "https://kenshu.dev/audit-conformite-ai-act-rgpd",
  },
};

export default function AIActAuditPage() {
  return (
    <PageContainer className="gap-10">
      {/* Hero */}
      <section className="glass-panel p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
          AI Compliance & Audit
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
          Audit Conformité AI Act & RGPD — Préparation 2026-2027
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-zinc-300">
          L'AI Act européen impose des obligations progressives jusqu'en août 2027.
          J'accompagne les équipes techniques dans l'audit et la mise en conformité de leurs systèmes d'IA.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-300">
            🔒 AI Act Ready
          </span>
          <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-300">
            RGPD Compliance
          </span>
          <span className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-300">
            Early 2026-2027
          </span>
        </div>
      </section>

      {/* Avertissement */}
      <section className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
        <p className="text-sm text-amber-200">
          ⚠️ <strong>Important</strong> : Je ne suis pas juriste. Mon approche est <strong>technique et produit</strong> :
          je traduis les obligations légales en checklists exploitables par les développeurs et product managers.
          Pour validation juridique finale, consultez un cabinet spécialisé.
        </p>
      </section>

      {/* Qu'est-ce que l'AI Act ? */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-4">Qu'est-ce que l'AI Act (Règlement UE 2024/1689) ?</h2>
        <p className="text-zinc-300 mb-4">
          L'<strong>AI Act</strong> est le premier cadre juridique mondial pour réguler l'intelligence artificielle.
          Entré en vigueur le <strong>1ᵉʳ août 2024</strong>, il s'applique progressivement jusqu'en <strong>août 2027</strong>.
        </p>
        <p className="text-zinc-300 mb-4">
          Il classe les systèmes d'IA par <strong>niveau de risque</strong> et impose des obligations croissantes :
        </p>

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
            <h3 className="text-lg font-semibold text-red-300 mb-2">Risque inacceptable</h3>
            <p className="text-sm text-zinc-400">
              <strong>Interdit</strong> depuis février 2025. Exemples : manipulation psychologique,
              surveillance biométrique en temps réel sans justification, scoring social.
            </p>
          </div>

          <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
            <h3 className="text-lg font-semibold text-orange-300 mb-2">Risque élevé</h3>
            <p className="text-sm text-zinc-400">
              Obligations lourdes (documentation, tests, monitoring, audit).
              Exemples : recrutement algorithmique, diagnostic médical IA, scoring crédit.
            </p>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <h3 className="text-lg font-semibold text-amber-300 mb-2">Risque limité</h3>
            <p className="text-sm text-zinc-400">
              Obligations de transparence (informer que c'est une IA).
              Exemples : chatbots, deepfakes, systèmes de recommandation.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <h3 className="text-lg font-semibold text-emerald-300 mb-2">Risque minimal</h3>
            <p className="text-sm text-zinc-400">
              Pas d'obligations spécifiques. Exemples : filtres spam, suggestions auto-complétion.
            </p>
          </div>
        </div>
      </section>

      {/* Calendrier d'application */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Calendrier d'application progressif</h2>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="rounded-lg bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 whitespace-nowrap">
              2 fév. 2025
            </div>
            <p className="text-zinc-300 pt-1">
              <strong>Interdiction pratiques à risque inacceptable</strong> (manipulation, surveillance biométrique abusive)
            </p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="rounded-lg bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-300 whitespace-nowrap">
              2 août 2025
            </div>
            <p className="text-zinc-300 pt-1">
              <strong>Obligations modèles GPAI</strong> (General Purpose AI comme GPT-4, Claude) :
              documentation, évaluation risques systémiques
            </p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="rounded-lg bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-300 whitespace-nowrap">
              2 août 2026
            </div>
            <p className="text-zinc-300 pt-1">
              <strong>Application générale de la plupart des obligations</strong> : systèmes à haut risque,
              transparence, sandbox réglementaire
            </p>
          </div>

          <div className="flex gap-4 items-start">
            <div className="rounded-lg bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-300 whitespace-nowrap">
              2 août 2027
            </div>
            <p className="text-zinc-300 pt-1">
              <strong>Transition finale</strong> pour systèmes à haut risque dans secteurs réglementés
              (banque, santé, transport)
            </p>
          </div>
        </div>
      </section>

      {/* Mon approche d'audit */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Mon approche : Technique, Produit, Pragmatique</h2>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-emerald-300 mb-3">01</div>
            <h3 className="text-lg font-semibold text-white mb-3">Classification des risques</h3>
            <p className="text-sm text-zinc-300">
              Analyse du système d'IA pour déterminer son niveau de risque selon les critères AI Act
              (usage, domaine, impact sur droits fondamentaux).
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-blue-300 mb-3">02</div>
            <h3 className="text-lg font-semibold text-white mb-3">Checklist obligations</h3>
            <p className="text-sm text-zinc-300">
              Génération d'une checklist des obligations techniques applicables : documentation,
              tests, monitoring, traçabilité, transparence utilisateurs.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-purple-300 mb-3">03</div>
            <h3 className="text-lg font-semibold text-white mb-3">Rapport & Roadmap</h3>
            <p className="text-sm text-zinc-300">
              Rapport d'audit avec gaps identifiés + roadmap priorisée pour mise en conformité
              (quick wins, actions critiques, améliorations long-terme).
            </p>
          </div>
        </div>
      </section>

      {/* Outil prototype */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-4">AI Compliance Audit Tool — Prototype R&D</h2>
        <p className="text-zinc-300 mb-6">
          Je développe un <strong>outil d'audit automatisé</strong> pour évaluer la conformité des systèmes d'IA
          selon le cadre AI Act et RGPD. Version prototype disponible pour early adopters.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <h3 className="text-lg font-semibold text-emerald-300 mb-3">Fonctionnalités actuelles (v0.1)</h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Interface de classification des systèmes IA</li>
              <li>• Checklist dynamique selon niveau de risque</li>
              <li>• Rapport d'audit exportable (PDF)</li>
              <li>• Base de connaissances AI Act intégrée</li>
              <li>• Couverture 80% obligations high-risk</li>
            </ul>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-3">Roadmap 2026</h3>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li>• Intégration API pour audit automatisé code/modèles</li>
              <li>• Module RGPD complémentaire (DPIA, registre traitements)</li>
              <li>• Multi-langue (FR/EN)</li>
              <li>• Intégration CI/CD pour validation continue</li>
              <li>• Dashboard de suivi conformité dans le temps</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
          <p className="text-sm text-amber-200">
            <strong>Statut</strong> : Prototype fonctionnel en cours de test.
            Si vous souhaitez l'essayer ou contribuer au développement, contactez-moi.
          </p>
        </div>
      </section>

      {/* Qui doit se préparer ? */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Qui doit se préparer à l'AI Act ?</h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Startups & PME tech développant des produits IA</h3>
            <p className="text-zinc-300 mb-3">
              Si vous utilisez des LLM (GPT, Claude), du scoring, de la recommandation personnalisée,
              de la vision computer ou du traitement automatisé de décisions : vous êtes concernés.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Action recommandée</strong> : Audit dès 2025 pour anticiper les obligations 2026.
              Mieux vaut construire compliance-by-design que corriger après.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">DSI & CTOs grands comptes</h3>
            <p className="text-zinc-300 mb-3">
              Si vous avez des systèmes d'IA en production dans des domaines réglementés
              (banque, santé, RH, transport) : obligations lourdes (tests, monitoring, documentation).
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Action recommandée</strong> : Inventaire des systèmes IA dès maintenant,
              classification des risques, roadmap mise en conformité avant août 2026.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Product Managers & équipes produit IA</h3>
            <p className="text-zinc-300 mb-3">
              Vous devez comprendre les obligations pour intégrer la compliance dès la conception :
              transparence utilisateurs, documentation des décisions, tests de biais.
            </p>
            <p className="text-sm text-zinc-400">
              <strong>Action recommandée</strong> : Formation équipe aux bases AI Act,
              intégration checklists compliance dans product specs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Questions fréquentes sur AI Act & RGPD</h2>

        <div className="space-y-6">
          <div className="border-l-2 border-amber-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">AI Act vs RGPD : quelle différence ?</h3>
            <p className="text-zinc-300">
              Le <strong>RGPD</strong> régule le traitement des données personnelles (consentement, droit à l'oubli, portabilité).
              L'<strong>AI Act</strong> régule les systèmes d'IA eux-mêmes (risques, transparence, gouvernance),
              qu'ils utilisent ou non des données personnelles. Les deux se cumulent si votre IA traite des données perso.
            </p>
          </div>

          <div className="border-l-2 border-amber-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Mon chatbot est-il concerné par l'AI Act ?</h3>
            <p className="text-zinc-300">
              Oui, <strong>obligation de transparence</strong> (risque limité) : vous devez informer les utilisateurs
              qu'ils interagissent avec une IA. Si votre chatbot prend des décisions critiques
              (ex : orientation vers un service spécifique), il peut basculer en risque élevé.
            </p>
          </div>

          <div className="border-l-2 border-amber-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Dois-je auditer mon système dès maintenant ?</h3>
            <p className="text-zinc-300">
              <strong>Oui, si vous visez la prod en 2026-2027</strong>. L'audit permet d'identifier les gaps tôt
              et d'intégrer la conformité dès la conception (compliance-by-design),
              moins coûteux que corriger après. Les premiers audités seront aussi les premiers compétitifs.
            </p>
          </div>

          <div className="border-l-2 border-amber-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Quelles sanctions en cas de non-conformité ?</h3>
            <p className="text-zinc-300">
              Amendes jusqu'à <strong>7% du chiffre d'affaires mondial</strong> ou <strong>35 millions d'€</strong>
              (selon le plus élevé) pour violations graves. Interdiction de mise sur le marché si non-conformité critique.
              Risque réputationnel majeur (presse, clients).
            </p>
          </div>

          <div className="border-l-2 border-amber-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Combien coûte un audit AI Act ?</h3>
            <p className="text-zinc-300">
              Tarification sur devis selon la complexité du système à auditer.
              Accompagnement complet (audit + mise en conformité) = plusieurs mois.
              Premier diagnostic gratuit (30 min) pour évaluer vos besoins.
            </p>
          </div>

          <div className="border-l-2 border-amber-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Êtes-vous certifié AI Act ?</h3>
            <p className="text-zinc-300">
              Non, il n'existe pas encore de certification officielle. Je suis en <strong>veille active</strong>
              sur le texte et les guidelines officielles (EU AI Office). Mon approche est technique/produit,
              pas juridique : je traduis le texte en actions exploitables pour les devs.
            </p>
          </div>

          <div className="border-l-2 border-amber-500/30 pl-6">
            <h3 className="text-lg font-semibold text-white mb-2">Proposez-vous de la formation équipe ?</h3>
            <p className="text-zinc-300">
              Oui, workshop de 2-4h pour sensibiliser Product Managers, développeurs et équipes data aux bases AI Act :
              classification des risques, obligations par niveau, intégration dans product specs.
              Format adapté selon audience (tech, produit, management).
            </p>
          </div>
        </div>
      </section>

      {/* Ressources */}
      <section className="glass-panel p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Ressources officielles AI Act</h2>

        <div className="space-y-3">
          <a
            href="https://artificialintelligenceact.eu/"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
          >
            <p className="font-semibold text-white">AI Act Explorer</p>
            <p className="text-sm text-zinc-400 mt-1">Outil interactif pour explorer les articles du texte (artificialintelligenceact.eu)</p>
          </a>

          <a
            href="https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
          >
            <p className="font-semibold text-white">Commission Européenne — Cadre réglementaire IA</p>
            <p className="text-sm text-zinc-400 mt-1">Documentation officielle, guidelines, FAQ (digital-strategy.ec.europa.eu)</p>
          </a>

          <a
            href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32024R1689"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
          >
            <p className="font-semibold text-white">Texte officiel AI Act (EUR-Lex)</p>
            <p className="text-sm text-zinc-400 mt-1">Règlement UE 2024/1689 en version intégrale (eur-lex.europa.eu)</p>
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="glass-panel p-8 md:p-10 text-center">
        <h2 className="text-2xl font-bold text-white">Prêt à anticiper l'AI Act 2026-2027 ?</h2>
        <p className="mt-3 text-zinc-400 max-w-2xl mx-auto">
          Premier appel de 30 minutes gratuit pour évaluer si votre système d'IA est concerné
          et identifier les premières actions à mener.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-white px-8 py-3 font-medium text-black hover:bg-zinc-200 transition"
          >
            Discuter de votre projet
          </Link>
          <Link
            href="/projets"
            className="rounded-full border border-white/20 bg-white/5 px-8 py-3 font-medium text-white hover:bg-white/10 transition"
          >
            Voir mes projets
          </Link>
        </div>
      </section>
    </PageContainer>
  );
}
