import { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import ExperienceItem from "@/components/ExperienceItem";
import { experiences } from "@/data/experiences";

export const metadata: Metadata = {
  title: "Expériences Professionnelles | BNP Paribas, Orange, Safran - Raouf Warnier",
  description:
    "Missions Data Engineering chez BNP Paribas (Spark, Scala), Orange (DevOps, Airflow), Safran (IoT) et ACC (Industrie 4.0). 3+ ans d'expertise sur environnements Big Data critiques.",
  keywords: [
    "Data Engineer BNP Paribas",
    "DevOps Orange Big Data",
    "IoT Engineer Safran",
    "Missions freelance data engineering",
    "Expérience Spark Scala Airflow",
    "Pipeline ETL production",
    "Big Data consultant France",
    "Data Engineer Hadoop HDFS",
    "Kafka ingestion temps réel",
    "Infrastructure as Code Ansible",
  ],
  openGraph: {
    title: "Mes Expériences Professionnelles en Data Engineering",
    description:
      "3+ ans sur des projets Data critiques : BNP Paribas (pipelines 50TB+), Orange (DevOps), Safran (IoT), ACC (Industrie 4.0)",
    type: "profile",
    url: "https://kenshu.dev/projets",
    images: [
      {
        url: "/og-projets.png",
        width: 1200,
        height: 630,
        alt: "Expériences Data Engineering - Raouf Warnier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expériences Data Engineering | BNP, Orange, Safran",
    description: "3+ ans de missions Big Data sur environnements critiques",
  },
};

export default function ExperiencesPage() {
  return (
    <PageContainer>
      <div className="min-h-screen bg-transparent text-[var(--text-primary)] pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6">

          {/* Header */}
          <div className="mb-10 text-center space-y-4 -mt-8 md:-mt-4">
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-[var(--text-primary)]">
              Expériences Professionnelles
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Chaque rôle inclut un <span className="text-[var(--text-accent)] font-semibold">contexte IA interrogeable</span> — la vraie histoire derrière les bullet points.
            </p>
          </div>

          {/* Liste des expériences */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <ExperienceItem key={index} data={exp} />
            ))}
          </div>

          {/* CTA Contact */}
          <div className="mt-20 text-center p-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Vous avez un projet similaire ?
            </h3>
            <p className="text-[var(--text-secondary)] mb-6">
              Je peux intervenir sur des missions Data, DevOps ou IA.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-[var(--accent-foreground)] font-bold rounded-full transition-all shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              Me contacter
            </a>
          </div>

        </div>
      </div>
    </PageContainer>
  );
}
