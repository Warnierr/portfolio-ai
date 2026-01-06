/**
 * Script de migration des articles existants de /blog vers la base de données
 * Exécuter avec : node prisma/migrate-blog.js
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const articlesToMigrate = [
  {
    title: "5 erreurs courantes avec Apache Spark en production",
    slug: "5-erreurs-spark-production",
    excerpt:
      "Les pièges classiques qui font crasher vos jobs Spark et comment les éviter. Retour d'expérience sur des pipelines traitant des TBs de données.",
    content: `# 5 erreurs courantes avec Apache Spark en production

Après 7 ans à développer et maintenir des pipelines Spark en production (BNP Paribas, Orange, ACC Industrie 4.0), j'ai identifié 5 erreurs qui reviennent systématiquement et qui peuvent faire crasher vos jobs ou exploser vos coûts.

## 1. Mauvais partitioning des données

### Le problème
Un partitioning inadapté crée des **skewed partitions** : certaines partitions contiennent 100x plus de données que d'autres. Résultat : un seul executor travaille pendant que les autres attendent.

### Symptômes
- Job qui stagne à 99% pendant des heures
- OOM (Out of Memory) sur certains executors
- Temps d'exécution imprévisible

### Solution
\`\`\`scala
// ❌ Mauvais : partitioning par défaut
df.groupBy("user_id").agg(...)

// ✅ Bon : repartition avant aggregation
df.repartition(200, col("user_id"))
  .groupBy("user_id")
  .agg(...)
\`\`\`

**Règle empirique** : 1 partition = 128 MB de données. Pour 100 GB → ~800 partitions.

## Points clés

- Toujours profiler vos jobs Spark avec Spark UI
- Évitez les shuffles inutiles
- Monitorer la mémoire des executors
- Tester en staging avant prod`,
    category: "data-engineering",
    tags: JSON.stringify(["spark", "scala", "pyspark", "optimisation", "production"]),
    author: "Raouf Warnier",
    authorType: "human",
    readingTime: 8,
    status: "published",
    featured: true,
    publishedAt: new Date("2026-01-05"),
  },
  {
    title: "Airflow : patterns anti-fragiles pour pipelines robustes",
    slug: "airflow-patterns-anti-fragiles",
    excerpt:
      "Comment concevoir des DAGs Airflow qui survivent aux pannes réseau, timeouts API et erreurs silencieuses. Patterns testés en production.",
    content: `# Airflow : patterns anti-fragiles pour pipelines robustes

Airflow est devenu le standard pour orchestrer des pipelines data. Mais entre un DAG qui "marche" en démo et un qui tourne 24/7 en prod sans intervention humaine, il y a un monde.

## Pattern 1 : Idempotence obligatoire

Chaque tâche doit être **idempotente** : l'exécuter 10 fois = l'exécuter 1 fois.

\`\`\`python
# ❌ Mauvais
def append_to_table():
    df = extract_data()
    df.to_sql("table", engine, if_exists="append")

# ✅ Bon : upsert + clé de déduplication
def upsert_to_table():
    df = extract_data()
    df = df.drop_duplicates(subset=["id", "date"])
    # Utiliser MERGE ou DELETE + INSERT
\`\`\`

## Pattern 2 : Retry avec backoff exponentiel

\`\`\`python
task = PythonOperator(
    task_id="extract_api",
    python_callable=extract,
    retries=5,
    retry_delay=timedelta(minutes=2),
    retry_exponential_backoff=True,
)
\`\`\`

## Points clés

- Toujours prévoir des retries
- Logger abondamment
- Monitorer avec Prometheus + Grafana
- Tester les failure scenarios`,
    category: "dataops",
    tags: JSON.stringify(["airflow", "python", "orchestration", "patterns", "production"]),
    author: "Raouf Warnier",
    authorType: "human",
    readingTime: 7,
    status: "published",
    featured: false,
    publishedAt: new Date("2026-01-04"),
  },
];

async function main() {
  console.log("🚀 Début de la migration des articles...\n");

  for (const articleData of articlesToMigrate) {
    try {
      // Vérifier si l'article existe déjà
      const existing = await prisma.article.findUnique({
        where: { slug: articleData.slug },
      });

      if (existing) {
        console.log(`⚠️  Article "${articleData.title}" existe déjà (slug: ${articleData.slug})`);
        continue;
      }

      // Créer l'article
      const article = await prisma.article.create({
        data: articleData,
      });

      console.log(`✅ Article migré : "${article.title}" (ID: ${article.id})`);
    } catch (error) {
      console.error(`❌ Erreur lors de la migration de "${articleData.title}":`, error);
    }
  }

  console.log("\n✨ Migration terminée !");
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
