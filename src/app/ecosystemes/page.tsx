import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";
import { dnaHighlights, educationHighlights, experienceHighlights } from "@/data/highlights";

export const metadata: Metadata = {
  title: "Écosystèmes IA | Kenshu",
  description: "Conception de systèmes IA complets : architecture Data/IA/Infra, agents autonomes, RAG, observabilité. Vision, architecture et automatisation pour écosystèmes cohérents.",
  alternates: {
    canonical: "/ecosystemes",
  },
};

const timeline = [
  { year: "2015", label: "Dév & Produit", detail: "Applications web, UX, premières API." },
  { year: "2018", label: "Data & Automatisation", detail: "Pipelines, dashboards, intelligence opérationnelle." },
  { year: "2020", label: "Infra & DevOps", detail: "Proxmox, NAS, CI/CD, réseaux privés." },
  { year: "2022", label: "IA & Agents", detail: "RAG, orchestrateurs, agents autonomes." },
  { year: "2025", label: "Architecte d’écosystèmes", detail: "Systèmes vivants (Nomah, Anomalie 2084, Second Brain)." },
];

const pillars = [
  {
    title: "Vision",
    description: "Chaque écosystème naît d’une intention claire : impact long terme, esthétique et scalabilité.",
  },
  {
    title: "Architecture",
    description: "Blueprints modulaires, séparation des responsabilités, monitoring intégré dès le jour 1.",
  },
  {
    title: "Automatisation",
    description: "Agents, pipelines, workflows audités pour libérer du temps humain et fiabiliser les opérations.",
  },
];

const process = [
  { step: "01", title: "Cartographie", detail: "Comprendre vos flux, vos données, vos contraintes réelles." },
  { step: "02", title: "Architecture vivante", detail: "Dessiner les couches IA/Data/Infra + les interactions humaines." },
  { step: "03", title: "Mise en orbite", detail: "Mettre en production, documenter, confier à l’agent d’autosurveillance." },
];

const principles = [
  "Pas de briques jetables : tout doit pouvoir évoluer.",
  "Observabilité native (logs, métriques, traces).",
  "Sécurité par design : chiffrement, cloisonnement, sauvegardes.",
  "Documentation vivante générée par agents.",
];

export default function EcosystemesPage() {
  return (
    <PageContainer className="gap-12">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Écosystèmes IA"
          title="Je conçois des systèmes complets, pas des features isolées"
          subtitle="De la vision à l’automatisation, en passant par l’infrastructure et l’expérience."
        />
        <div className="grid gap-8 md:grid-cols-[1.4fr,1fr]">
          <p className="text-lg text-zinc-300">
            Chaque mission démarre par un manifeste : pourquoi ce système doit exister, comment il respire, comment il
            sera maintenu. Je m’immerge dans vos notes, vos process, vos rêves. Ensuite, je bâtis un organisme numérique
            qui mêle IA, data, infra et produit.
          </p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200">
            <p className="text-white">Ce que je refuse</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-300">
              <li>Le bricolage court terme.</li>
              <li>Les agents “magiques” non monitorés.</li>
              <li>Les stacks opaques impossibles à auditer.</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-200">
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-200">Architecture en 3 blocs</p>
          <p className="mt-2">
            <span className="font-semibold text-white">Data</span> (ingestion, qualité, stockage) →{" "}
            <span className="font-semibold text-white">IA</span> (agents, RAG, orchestrateur) →{" "}
            <span className="font-semibold text-white">Infra</span> (NAS/Proxmox, CI/CD, observabilité). Chaque couche est
            testée et observable avant d’être reliée aux autres.
          </p>
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="ADN professionnel"
          title="Ce que je mets sur la table dès J1"
          subtitle="Synthèse issue de mes missions Orange, Safran, ACC, C40 Cities."
        />
        <div className="space-y-3 text-sm text-zinc-200">
          {dnaHighlights.map((item) => (
            <p key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              {item}
            </p>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Piliers"
          title="Vision • Architecture • Automatisation"
          subtitle="Trois couches inséparables pour un écosystème cohérent."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">{pillar.title}</p>
              <p className="mt-3 text-zinc-300">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Processus"
          title="Méthodologie en 3 actes"
          subtitle="Une timeline courte, mais dense, avec validations à chaque étape."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {process.map((item) => (
            <div key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-[0.4em] text-zinc-500">{item.step}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-zinc-300">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Timeline"
          title="De développeur polyvalent à architecte d’écosystèmes"
        />
        <div className="space-y-4">
          {timeline.map((step) => (
            <div
              key={step.year}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/30 p-4 md:flex-row md:items-center md:gap-6"
            >
              <div className="text-sm font-semibold text-emerald-200">{step.year}</div>
              <div>
                <p className="font-medium text-white">{step.label}</p>
                <p className="text-sm text-zinc-300">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Principes de collaboration"
          title="Alignement, rigueur, transmission"
          subtitle="Les règles du jeu dès la première conversation."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">
              {principle}
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle eyebrow="Expériences phares" title="4 missions qui structurent ma méthode" />
        <div className="space-y-4">
          {experienceHighlights.map((exp) => (
            <div key={exp.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">{exp.title}</p>
              <p className="text-zinc-200">{exp.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle eyebrow="Diplômes & certifs" title="Fondations académiques" />
        <ul className="list-disc space-y-2 pl-6 text-sm text-zinc-200">
          {educationHighlights.map((edu) => (
            <li key={edu}>{edu}</li>
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}

