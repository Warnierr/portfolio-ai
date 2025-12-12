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
  {
    title: "Budget AI – planner coût/risque",
    content: "Ajout d’un planner avant actions automatiques (virements/alertes) et journal d’explicabilité.",
    tag: "#BudgetAI",
    date: "01 déc.",
    category: "Avancement",
  },
  {
    title: "Ecrituria – critique IA",
    content: "Agent critique inséré entre le créatif et la publication pour garder la cohérence du lore.",
    tag: "#Ecrituria",
    date: "29 nov.",
    category: "Avancement",
  },
  {
    title: "Runbook NAS/Proxmox",
    content: "Test de runbook de panne : restauration snapshot validée en <6 minutes, alertes Telegram OK.",
    tag: "#Infra",
    date: "27 nov.",
    category: "Avancement",
  },
  {
    title: "CI/CD durcie",
    content: "Diff-schema + Jest + lint bloquants avant déploiement data, logs centralisés sur Grafana/Loki.",
    tag: "#DevOps",
    date: "25 nov.",
    category: "Avancement",
  },
];

