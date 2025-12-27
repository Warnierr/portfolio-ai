export type NewsEntry = {
  title: string;
  content: string;
  tag: "veille" | "avancement" | "reflexion";
  date: string;
  category: "IA" | "DevOps" | "Autre";
};

export const newsFeed: NewsEntry[] = [
  {
    title: "Nouveau positionnement : Architecte de Solutions DataOps & IA",
    content: "Dès Janvier 2025, j'accompagne les entreprises sur la mise en place de pipelines de données robustes et l'industrialisation de leurs solutions IA. Mon focus : DevOps pour la Data et automatisation via n8n.",
    tag: "avancement",
    date: "26 Décembre 2024",
    category: "DevOps",
  }
];
