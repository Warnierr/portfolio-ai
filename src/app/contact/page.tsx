import Link from "next/link";

import PageContainer from "@/components/PageContainer";
import SectionTitle from "@/components/SectionTitle";

const contactLinks = [
  { label: "Email", value: "hello@ecosystemes.ai", href: "mailto:hello@ecosystemes.ai" },
  { label: "LinkedIn", value: "linkedin.com/in/nomah", href: "https://www.linkedin.com" },
  { label: "GitHub", value: "github.com/nomah-systems", href: "https://github.com" },
  { label: "Telegram", value: "@nomah_builder", href: "https://t.me" },
];

const recruiterSnapshot = {
  intro:
    "Profil hybride : Architecte d’écosystèmes IA (Produit + Infra + IA). 10 ans de dev, 5 ans d’automations industrielles.",
  highlights: [
    "Nomah AI · Marketplace + agents autonomes (stack complet).",
    "Second Brain · RAG personnel sécurisé pour knowledge workers.",
    "Anomalie 2084 · Studio narratif IA multi-agents.",
  ],
  stack: "Next.js · Node/Workers · Supabase/Postgres · LangChain · Temporal · Proxmox · CI/CD.",
};

export default function ContactPage() {
  return (
    <PageContainer className="gap-10">
      <section className="glass-panel p-8 md:p-12">
        <SectionTitle
          eyebrow="Contact"
          title="Ouvert aux collaborations IA, data, automation, design de systèmes"
          subtitle="Explorons vos besoins, cadrons la vision, lançons un écosystème."
        />
        <p className="text-zinc-300">
          Email direct, prise de rendez-vous, messagerie chiffrée : choisissez votre canal. Réponse sous 24h ouvrées.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
        <div className="glass-panel p-8 md:p-12">
          <div className="grid gap-4 md:grid-cols-2">
            {contactLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">{link.label}</p>
                <p className="text-lg font-medium text-white">{link.value}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-zinc-300">
            <p className="text-white">Calendrier</p>
            <p className="mt-2">Réserver un créneau (30 min) via Calendly/TidyCal – lien partagé sur demande.</p>
          </div>
        </div>
        <div className="glass-panel p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div>
              <span className="section-eyebrow">Mode recruteur</span>
              <h3 className="mt-3 text-2xl font-semibold text-white">Lecture express</h3>
              <p className="mt-2 text-zinc-300">{recruiterSnapshot.intro}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Projets clefs</p>
              <ul className="mt-3 space-y-2 text-sm text-zinc-200">
                {recruiterSnapshot.highlights.map((item) => (
                  <li key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Stack cœur</p>
              <p className="mt-2 text-zinc-200">{recruiterSnapshot.stack}</p>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

