import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding dashboard data...");

  // Créer des projets de test
  const projects = [
    {
      name: "Migration ETL Legacy",
      clientName: "BNP Paribas",
      status: "active",
      priority: "urgent",
      progress: 75,
      mrr: 2500,
      startDate: new Date("2025-12-01"),
      deadline: new Date("2026-01-20"),
      description: "Migration d'un pipeline ETL de 15 ans vers Spark moderne",
    },
    {
      name: "Plateforme Analytics",
      clientName: "Orange",
      status: "active",
      priority: "high",
      progress: 45,
      mrr: 1800,
      startDate: new Date("2025-11-15"),
      deadline: new Date("2026-02-28"),
      description: "Construction d'une plateforme analytics end-to-end",
    },
    {
      name: "Agent IA Support Client",
      clientName: "Safran",
      status: "active",
      priority: "normal",
      progress: 30,
      mrr: 1200,
      startDate: new Date("2026-01-05"),
      deadline: new Date("2026-03-15"),
      description: "Développement d'un agent IA pour le support technique",
    },
    {
      name: "Audit AI Act",
      clientName: "Startup HealthTech",
      status: "paused",
      priority: "low",
      progress: 60,
      mrr: 500,
      startDate: new Date("2025-10-01"),
      deadline: new Date("2026-01-31"),
      description: "Audit de conformité AI Act + recommandations",
    },
    {
      name: "Pipeline IoT",
      clientName: "Industry Corp",
      status: "completed",
      priority: "normal",
      progress: 100,
      mrr: null,
      startDate: new Date("2025-09-01"),
      deadline: new Date("2025-12-31"),
      description: "Pipeline de traitement de données IoT temps réel",
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log(`✅ Created ${projects.length} projects`);

  // Mettre à jour ou créer des leads avec données enrichies
  const leads = [
    {
      name: "Marie Dubois",
      email: "marie.dubois@techcorp.fr",
      message: "Besoin d'un Data Engineer pour un projet Spark",
      status: "NEW",
      source: "linkedin",
      score: 85,
    },
    {
      name: "Thomas Martin",
      email: "t.martin@startup.io",
      message: "Migration de notre stack data vers le cloud",
      status: "CONTACTED",
      source: "website",
      score: 70,
      lastContactAt: new Date("2026-01-08"),
    },
    {
      name: "Sophie Leroy",
      email: "sophie.l@finance.com",
      message: "Audit AI Act pour nos systèmes de scoring crédit",
      status: "QUALIFIED",
      source: "referral",
      score: 95,
      lastContactAt: new Date("2026-01-09"),
    },
    {
      name: "Alexandre Petit",
      email: "apetit@industrie.fr",
      message: "Automatisation de nos pipelines ETL",
      status: "NEW",
      source: "cold-email",
      score: 60,
    },
    {
      name: "Camille Bernard",
      email: "c.bernard@retailco.fr",
      message: "Développement d'un agent IA pour le e-commerce",
      status: "CONTACTED",
      source: "website",
      score: 80,
      lastContactAt: new Date("2026-01-07"),
    },
  ];

  for (const lead of leads) {
    const existing = await prisma.lead.findFirst({
      where: { email: lead.email },
    });

    if (existing) {
      await prisma.lead.update({
        where: { id: existing.id },
        data: lead,
      });
    } else {
      await prisma.lead.create({
        data: lead,
      });
    }
  }

  console.log(`✅ Created ${leads.length} leads`);

  // Créer quelques news en attente pour tester
  const news = [
    {
      title: "Next.js 16 released",
      content: "New features and improvements",
      summary: "Next.js 16 brings major updates",
      tag: "tech",
      date: new Date().toISOString(),
      category: "framework",
      status: "PENDING",
    },
    {
      title: "AI Act compliance deadline",
      content: "Important regulatory update",
      summary: "Companies must comply by Q2 2026",
      tag: "regulation",
      date: new Date().toISOString(),
      category: "legal",
      status: "PENDING",
    },
  ];

  for (const item of news) {
    await prisma.news.create({
      data: item,
    });
  }

  console.log(`✅ Created ${news.length} news items`);

  console.log("🎉 Dashboard seeding completed!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
