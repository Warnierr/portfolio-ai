export type NewsEntry = {
  title: string;
  content: string;
  tag: string;
  date: string;
  category: "Avancement" | "Veille" | "Réflexion";
};

export const newsFeed: NewsEntry[] = [
  {
    title: "Optimisation pipeline RAG perso",
    content: "Réduction du temps d’indexation (−32%) en fusionnant embeddings NAS + Obsidian.",
    tag: "#SecondBrain",
    date: "08 déc.",
    category: "Avancement",
  },
  {
    title: "Changelog Nomah – agents commerce",
    content: "Ajout d’un watcher Stripe + agent de conciliation comptes fournisseurs.",
    tag: "#NomahAI",
    date: "07 déc.",
    category: "Avancement",
  },
  {
    title: "Réflexion : IA amplifie la vision",
    content: "L’agent reste un copilote : j’oriente, il étend les possibilités.",
    tag: "#Thinking",
    date: "05 déc.",
    category: "Réflexion",
  },
  {
    title: "Veille : orchestration open-source",
    content: "Tests de Temporal Cloud + Helicone pour monitorer les appels LLM en production.",
    tag: "#Veille",
    date: "02 déc.",
    category: "Veille",
  },
];

