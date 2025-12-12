"use client";

import Link from "next/link";
import { motion, type MotionProps } from "framer-motion";

import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

const heroActions = [
  { label: "Écosystèmes IA", href: "/ecosystemes", variant: "primary" },
  { label: "Voir les projets", href: "/projets", variant: "ghost" },
  { label: "Parler à l’agent", href: "/agent", variant: "outline" },
];

const entryCards = [
  {
    title: "Écosystèmes complets",
    description: "Vision, architecture, automatisation : tout est pensé comme un organisme vivant.",
    tag: "Méthodo",
    href: "/ecosystemes",
  },
  {
    title: "Cas d’usage / Projets",
    description: "Nomah AI, Anomalie 2084, Second Brain… des études de cas détaillées.",
    tag: "Études de cas",
    href: "/projets",
  },
  {
    title: "Laboratoire & R&D",
    description: "Scripts, tests d’agents, prototypes. Là où je pousse les limites.",
    tag: "R&D",
    href: "/lab",
  },
  {
    title: "Stack & Infra",
    description: "Radar IA/Data, infrastructure Proxmox/NAS, design systèmes et outils.",
    tag: "Stack",
    href: "/stack",
  },
  {
    title: "News par agent",
    description: "Journal vivant généré automatiquement depuis Obsidian + Git.",
    tag: "Flux intelligent",
    href: "/news",
  },
  {
    title: "Collaborer",
    description: "Contact, calendrier, snapshot recruteur, accès à l’agent de présentation.",
    tag: "Collaboration",
    href: "/contact",
  },
];

const signals = [
  {
    title: "Pipeline RAG perso optimisé",
    detail: "Indexation plus rapide (-32%) en fusionnant embeddings NAS + Obsidian.",
    tag: "#SecondBrain",
    href: "/news",
  },
  {
    title: "Agents commerce Nomah",
    detail: "Watcher Stripe + agent de conciliation fournisseurs désormais en production.",
    tag: "#NomahAI",
    href: "/news",
  },
  {
    title: "Réflexion : IA amplifie la vision",
    detail: "Je reste architecte, l’agent étend mon champ d’action.",
    tag: "#Thinking",
    href: "/news",
  },
];

const fadeUp: MotionProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function LandingPage() {
  return (
    <PageContainer className="gap-20">
      <motion.section
        className="glass-panel grid gap-10 overflow-hidden p-8 md:grid-cols-2 md:p-12"
        {...fadeUp}
      >
        <div className="space-y-6">
          <p className="section-eyebrow">Architecte d’écosystèmes IA</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Je construis des écosystèmes IA, pas des applications isolées.
          </h1>
          <p className="text-lg text-zinc-300">
            Dev polyvalent (Data, Infra, IA, Produit) – créateur de systèmes vivants, du hardware (NAS, Proxmox)
            aux agents autonomes qui pilotent vos opérations.
          </p>
          <div className="flex flex-wrap gap-3">
            {heroActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                  action.variant === "primary"
                    ? "bg-white text-black hover:bg-zinc-200"
                    : action.variant === "ghost"
                      ? "bg-white/5 text-white hover:bg-white/10"
                      : "border border-white/30 text-white hover:bg-white/10"
                }`}
              >
                {action.label}
              </Link>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm text-zinc-300 md:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold text-white">10+ ans</p>
              <p>de conception systèmes</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">4 écosystèmes</p>
              <p>prod/infra/IA unifiés</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-white">Agent News</p>
              <p>portfolio vivant</p>
            </div>
          </div>
        </div>
        <motion.div
          className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Vision système</p>
          <p className="mt-3 text-xl text-zinc-100">« IA, Data, Automation & Design d’écosystèmes numériques. »</p>
          <ul className="mt-8 space-y-3 text-sm text-zinc-200">
            <li>• Nomah AI – marketplace + agents orchestrés</li>
            <li>• Anomalie 2084 – studio narratif augmenté</li>
            <li>• Second Brain – RAG personnel sécurisé</li>
          </ul>
          <div className="mt-8 rounded-xl border border-white/10 bg-black/30 p-5 text-sm text-zinc-300">
            <p className="text-white">Mode opératoire</p>
            <p className="mt-2">
              Vision à long terme, architecture modulaire, automatisations auditées, refus du bricolage court terme.
            </p>
          </div>
        </motion.div>
      </motion.section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Parcours"
          title="Choisis ton point d’entrée"
          subtitle="Chaque page explore en profondeur un pan de l’écosystème IA."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {entryCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-400">{card.tag}</div>
              <p className="text-2xl font-semibold text-white">{card.title}</p>
              <p className="text-sm text-zinc-300">{card.description}</p>
              <span className="text-sm text-emerald-200">Explorer →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Signal"
          title="Un portfolio vivant mis à jour par agent"
          subtitle="Dernières entrées du flux automatisé. Voir tout sur /news."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {signals.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-200 transition hover:bg-white/10"
            >
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{item.tag}</span>
                <span>Agent News</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-white">{item.title}</p>
              <p>{item.detail}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}

