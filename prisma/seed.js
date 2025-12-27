const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding production data...");

  await prisma.news.createMany({
    data: [
      {
        title: "Industrialisation n8n : Pourquoi passer du Cloud au Self-Hosted ?",
        content: "Analyse des gains de performance et de souveraineté pour les entreprises traitant des volumes de données sensibles...",
        tag: "veille",
        date: "26 Décembre 2024",
        category: "DevOps",
        status: "PENDING"
      },
      {
        title: "Retour d'expérience : Architecture RAG sur BigQuery",
        content: "Comment nous avons réduit les coûts d'inférence de 40% en utilisant les fonctions distantes de Google Cloud...",
        tag: "reflexion",
        date: "26 Décembre 2024",
        category: "IA",
        status: "PENDING"
      }
    ]
  });

  console.log("Seed finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });