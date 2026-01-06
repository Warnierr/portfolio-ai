import Link from "next/link";
import type { ArticleCategory } from "@/types/article";

type ArticleCTAProps = {
  category: ArticleCategory;
};

const ctaConfig: Record<
  ArticleCategory,
  { title: string; description: string; cta: string }
> = {
  "data-engineering": {
    title: "Besoin d'un audit de vos pipelines ?",
    description:
      "Je peux vous aider à fiabiliser votre infrastructure data et réduire vos coûts.",
    cta: "Audit pipeline",
  },
  dataops: {
    title: "Besoin d'améliorer votre observabilité ?",
    description:
      "Industrialisons ensemble vos pipelines DataOps pour des données fiables.",
    cta: "Discuter DataOps",
  },
  "llm-ia": {
    title: "Un projet LLM à mettre en production ?",
    description:
      "Cadrage, architecture et mise en production de vos systèmes IA.",
    cta: "Cadrage & prod LLM",
  },
  "devops-plateforme": {
    title: "Besoin d'automatiser votre infrastructure ?",
    description:
      "CI/CD, observabilité et automatisation pour des déploiements sereins.",
    cta: "Automatiser l'infra",
  },
  "conformite-ai-act-rgpd": {
    title: "Audit AI Act & RGPD pour vos systèmes IA ?",
    description:
      "Évaluez la conformité de vos applications IA avec le cadre européen.",
    cta: "Pré-audit AI Act",
  },
  "retours-experience": {
    title: "Un projet technique complexe ?",
    description:
      "Discutons de votre besoin et trouvons la meilleure approche ensemble.",
    cta: "Discuter du projet",
  },
};

export default function ArticleCTA({ category }: ArticleCTAProps) {
  const config = ctaConfig[category];

  return (
    <div className="my-12 rounded-xl border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-8 text-center">
      <h3 className="mb-3 text-2xl font-bold text-white">{config.title}</h3>
      <p className="mb-6 text-zinc-300">{config.description}</p>
      <Link
        href="/contact"
        className="inline-block rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg"
      >
        {config.cta}
      </Link>
    </div>
  );
}
