export type NewsEntry = {
  title: string;
  content: string;
  tag: string;
  date: string;
  category: "Avancement" | "Veille" | "Réflexion";
};

export const newsFeed: NewsEntry[] = [
  // Décembre 2024
  {
    title: "Portfolio V1 Freelance en ligne",
    content:
      "Refonte complète du portfolio avec positionnement TPE/PME. Nouveau format d'études de cas narratives, page Méthode avec tarifs transparents, et intégration du flux News + Agent.",
    tag: "#Portfolio",
    date: "14 déc.",
    category: "Avancement",
  },
  {
    title: "Claude 3.5 Sonnet vs GPT-4 Turbo : mon verdict",
    content:
      "Après 3 mois d'usage intensif sur mes projets clients, Claude gagne sur le code et le raisonnement long. GPT-4 reste meilleur pour les tâches créatives courtes. J'utilise les deux via OpenRouter.",
    tag: "#Veille",
    date: "12 déc.",
    category: "Veille",
  },
  {
    title: "Mission cabinet comptable : 60% de temps gagné",
    content:
      "Déploiement réussi du système OCR + classification IA. Les collaborateurs passent de 2h30 à 45min par jour sur le traitement documentaire. ROI client atteint en 3 mois.",
    tag: "#Mission",
    date: "10 déc.",
    category: "Avancement",
  },
  {
    title: "Optimisation pipeline RAG perso",
    content:
      "Réduction du temps d'indexation de 32% en fusionnant les embeddings NAS + Obsidian dans un seul workflow. Le Second Brain répond maintenant en moins de 3 secondes sur 15 000 documents.",
    tag: "#SecondBrain",
    date: "08 déc.",
    category: "Avancement",
  },
  {
    title: "Pourquoi je refuse les projets sans specs",
    content:
      "Un client m'a proposé un budget confortable pour 'mettre de l'IA quelque part'. J'ai refusé. Sans problème clair à résoudre, l'IA devient un gadget coûteux. Ma méthode : diagnostic d'abord, code ensuite.",
    tag: "#Réflexion",
    date: "06 déc.",
    category: "Réflexion",
  },
  {
    title: "Veille : orchestration open-source",
    content:
      "Tests de Temporal Cloud + Helicone pour monitorer les appels LLM en production. Temporal gère bien les workflows longs, Helicone donne une visibilité claire sur les coûts par requête.",
    tag: "#Veille",
    date: "04 déc.",
    category: "Veille",
  },
  {
    title: "Budget AI – import bancaire automatique",
    content:
      "Enfin implémenté l'import CSV des relevés bancaires. La saisie manuelle était le principal frein à l'adoption. Catégorisation automatique à 87% de précision dès le premier import.",
    tag: "#BudgetAI",
    date: "02 déc.",
    category: "Avancement",
  },
  // Novembre 2024
  {
    title: "L'IA ne remplace pas, elle amplifie",
    content:
      "Retour d'expérience sur 6 mois de missions : les meilleurs résultats viennent quand l'IA augmente l'expertise existante plutôt que de la remplacer. Le collaborateur + IA bat toujours l'IA seule.",
    tag: "#Réflexion",
    date: "29 nov.",
    category: "Réflexion",
  },
  {
    title: "Runbook NAS/Proxmox validé",
    content:
      "Test complet du runbook de reprise après panne : restauration snapshot en moins de 6 minutes, alertes Telegram fonctionnelles, basculement automatique sur backup testé avec succès.",
    tag: "#Infra",
    date: "27 nov.",
    category: "Avancement",
  },
  {
    title: "CI/CD durcie pour les projets data",
    content:
      "Nouveau pipeline : diff-schema obligatoire, tests Jest + lint bloquants avant tout déploiement data. Logs centralisés sur Grafana/Loki. Zéro régression en prod depuis 2 mois.",
    tag: "#DevOps",
    date: "25 nov.",
    category: "Avancement",
  },
  {
    title: "Assistant immo : adoption à 87%",
    content:
      "7 négociateurs sur 8 utilisent l'assistant IA quotidiennement après seulement une semaine. Le temps de recherche de bien passe de 5-10 min à moins de 45 secondes.",
    tag: "#Mission",
    date: "22 nov.",
    category: "Avancement",
  },
  {
    title: "Veille : pgvector vs Pinecone",
    content:
      "Pour les volumes < 100K documents, pgvector suffit largement et évite une dépendance cloud. Latence comparable, coût nul, et tout reste dans l'infra existante.",
    tag: "#Veille",
    date: "18 nov.",
    category: "Veille",
  },
  {
    title: "Anonymisation : la clé de la confiance",
    content:
      "Les clients TPE/PME ont une vraie crainte sur la confidentialité. Ma solution : anonymisation côté client avant tout envoi vers l'IA. Aucune donnée sensible ne transite en clair.",
    tag: "#Réflexion",
    date: "15 nov.",
    category: "Réflexion",
  },
  {
    title: "Second Brain : 15 000 notes indexées",
    content:
      "Cap symbolique franchi. Le RAG personnel couvre maintenant 5 ans de documentation technique, notes de veille et retours d'expérience. Recherche sémantique fonctionnelle.",
    tag: "#SecondBrain",
    date: "12 nov.",
    category: "Avancement",
  },
];
