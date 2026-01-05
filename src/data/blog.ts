export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: 'spark' | 'airflow' | 'dataops' | 'ai';
  tags: string[];
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "5-erreurs-spark-production",
    title: "5 erreurs courantes avec Apache Spark en production",
    excerpt: "Les pièges classiques qui font crasher vos jobs Spark et comment les éviter. Retour d'expérience sur des pipelines traitant des TBs de données.",
    date: "5 janvier 2026",
    readTime: "8 min",
    category: "spark",
    tags: ["spark", "scala", "pyspark", "optimisation", "production"],
    author: "Raouf Warnier",
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

## 2. Broadcast joins sur des tables trop grandes

### Le problème
Spark peut broadcaster une petite table (< 10 MB par défaut) vers tous les executors pour éviter un shuffle. Mais si vous forcez le broadcast d'une table de 500 MB, **tous les executors crashent avec OOM**.

### Solution
\`\`\`scala
// ❌ Mauvais : forcer broadcast sur grosse table
import org.apache.spark.sql.functions.broadcast
df1.join(broadcast(df2), "key")

// ✅ Bon : laisser Spark décider OU augmenter threshold
spark.conf.set("spark.sql.autoBroadcastJoinThreshold", "50MB")
df1.join(df2, "key")
\`\`\`

**Vérifiez** : \`df.count()\` et \`df.cache().count()\` pour estimer la taille réelle.

## 3. Pas de cache sur les DataFrames réutilisés

### Le problème
Si vous utilisez le même DataFrame dans plusieurs transformations sans le cacher, **Spark recalcule tout depuis le début à chaque fois**.

### Solution
\`\`\`scala
// ❌ Mauvais : recalcul à chaque action
val df = spark.read.parquet("data.parquet")
df.filter(...).count()  // Lit tout
df.filter(...).show()   // Relit tout !

// ✅ Bon : cache après première lecture
val df = spark.read.parquet("data.parquet").cache()
df.count() // Force le cache
df.filter(...).count()
df.filter(...).show()
\`\`\`

**Attention** : \`unpersist()\` après usage pour libérer la mémoire !

## 4. Trop de petits fichiers (Small Files Problem)

### Le problème
Écrire 10 000 fichiers de 1 MB au lieu de 100 fichiers de 100 MB **dégrade les performances de 10x** lors des lectures futures.

### Solution
\`\`\`scala
// ❌ Mauvais : 1 fichier par partition
df.write.parquet("output/")

// ✅ Bon : coalesce avant écriture
df.coalesce(100).write.parquet("output/")

// ✅ Encore mieux : repartition par clé métier
df.repartition(100, col("date"))
  .write
  .partitionBy("date")
  .parquet("output/")
\`\`\`

**Règle** : Viser 128-256 MB par fichier.

## 5. Ignorer les métriques Spark UI

### Le problème
Beaucoup de développeurs lancent un job et attendent sans regarder **Spark UI**. Pourtant, c'est là que vous voyez :
- Les stages qui prennent 90% du temps
- Les shuffle read/write excessifs
- Les GC (Garbage Collection) qui tuent les perfs

### Solution
1. Ouvrir **Spark UI** : \`http://localhost:4040\` (ou via YARN/K8s)
2. Onglet **Stages** : identifier les stages lents
3. Onglet **Executors** : vérifier la distribution des tâches
4. Onglet **SQL** : voir le plan d'exécution

**Exemple concret** : J'ai réduit un job de 4h à 30 min en détectant via Spark UI qu'un \`groupBy\` créait un shuffle de 500 GB. Solution : \`repartition\` avant le \`groupBy\`.

## Bonus : Tuning mémoire

### Configuration typique pour jobs stables
\`\`\`bash
spark-submit \\
  --executor-memory 8G \\
  --executor-cores 4 \\
  --driver-memory 4G \\
  --conf spark.executor.memoryOverhead=2G \\
  --conf spark.sql.shuffle.partitions=200 \\
  my_job.py
\`\`\`

**Règle** : \`memoryOverhead = 10-20% de executor-memory\` pour éviter les OOM.

## Conclusion

Ces 5 erreurs représentent **80% des problèmes Spark en production** que j'ai rencontrés. Les corriger peut diviser vos temps d'exécution par 3-5 et vos coûts par 2.

**Prochaines étapes** :
1. Auditer vos jobs actuels avec Spark UI
2. Vérifier le partitioning de vos datasets critiques
3. Implémenter du caching stratégique

Besoin d'aide pour optimiser vos pipelines Spark ? [Contactez-moi](/contact) pour un diagnostic gratuit.

---

**Tags** : #spark #scala #pyspark #optimisation #production #dataengineering
`,
  },
  {
    slug: "airflow-patterns-anti-fragiles",
    title: "Airflow : patterns anti-fragiles pour pipelines robustes",
    excerpt: "Comment construire des DAGs Airflow qui ne cassent jamais en production. Idempotence, retry intelligents et monitoring proactif.",
    date: "5 janvier 2026",
    readTime: "10 min",
    category: "airflow",
    tags: ["airflow", "dataops", "orchestration", "monitoring", "production"],
    author: "Raouf Warnier",
    content: `# Airflow : patterns anti-fragiles pour pipelines robustes

Après avoir déployé des dizaines de DAGs Airflow en production chez Orange et BNP Paribas, j'ai appris une chose : **un pipeline qui ne peut pas être relancé sans effets de bord est un pipeline fragile**.

Voici les patterns que j'applique systématiquement pour des DAGs anti-fragiles.

## 1. Idempotence : le principe fondamental

### Définition
Un DAG est **idempotent** si vous pouvez le relancer 10 fois sur la même période sans casser les données.

### Exemple concret
\`\`\`python
# ❌ Mauvais : append sans vérification
def load_data(**context):
    df = extract_data()
    df.to_sql('table', engine, if_exists='append')  # Risque de doublons !

# ✅ Bon : upsert avec clé unique
def load_data(**context):
    execution_date = context['execution_date']
    df = extract_data()
    
    # Supprimer les données existantes pour cette date
    engine.execute(f"DELETE FROM table WHERE date = '{execution_date}'")
    
    # Insérer les nouvelles données
    df.to_sql('table', engine, if_exists='append')
\`\`\`

**Pourquoi c'est crucial** : En prod, les DAGs crashent (API timeout, OOM, etc.). Si vous ne pouvez pas les relancer sans créer des doublons, vous êtes bloqué.

## 2. Retry intelligents (pas infinis)

### Le problème
Par défaut, Airflow retry 0 fois. Mais mettre \`retries=999\` n'est pas la solution : si une API est down 24h, votre DAG va retry toutes les 5 minutes pendant 24h !

### Solution : retry progressif
\`\`\`python
from airflow.operators.python import PythonOperator
from datetime import timedelta

task = PythonOperator(
    task_id='extract_api',
    python_callable=extract_from_api,
    retries=3,  # 3 tentatives max
    retry_delay=timedelta(minutes=5),  # Attendre 5 min entre chaque
    retry_exponential_backoff=True,  # 5min, 10min, 20min
    max_retry_delay=timedelta(hours=1),  # Cap à 1h max
)
\`\`\`

**Règle** : 
- API externes : \`retries=3\`, \`retry_delay=5min\`, exponential backoff
- Jobs internes (Spark) : \`retries=1\` (si ça crash, c'est un vrai bug)

## 3. Monitoring proactif avec alerting

### Le problème classique
Votre DAG fail à 3h du matin. Personne ne le voit. Les utilisateurs découvrent à 9h que les données sont manquantes. **Trop tard.**

### Solution : Alerting Telegram/Slack
\`\`\`python
from airflow.providers.telegram.hooks.telegram import TelegramHook

def send_telegram_alert(context):
    task_instance = context['task_instance']
    dag_id = context['dag'].dag_id
    
    message = f"""
    🚨 Airflow Alert
    
    DAG: {dag_id}
    Task: {task_instance.task_id}
    État: FAILED
    Logs: {task_instance.log_url}
    """
    
    hook = TelegramHook(telegram_conn_id='telegram_default')
    hook.send_message({'text': message, 'chat_id': 'YOUR_CHAT_ID'})

# Appliquer à tous les DAGs
default_args = {
    'on_failure_callback': send_telegram_alert,
    'on_retry_callback': send_telegram_alert,
}
\`\`\`

**Bonus** : Intégrer avec Grafana/Prometheus pour dashboards temps réel.

## 4. Gestion des dépendances externes

### Le problème
Votre DAG dépend d'un fichier S3 qui arrive entre 2h et 4h du matin. Si vous lancez à 3h fixe, ça marche 50% du temps.

### Solution : Sensors
\`\`\`python
from airflow.providers.amazon.aws.sensors.s3 import S3KeySensor

wait_for_file = S3KeySensor(
    task_id='wait_for_data',
    bucket_name='my-bucket',
    bucket_key='data/{{ ds }}/file.csv',
    timeout=3600,  # Attendre max 1h
    poke_interval=300,  # Vérifier toutes les 5 min
    mode='reschedule',  # Libérer le worker entre chaque check
)

process_data = PythonOperator(...)

wait_for_file >> process_data
\`\`\`

**Modes** :
- \`poke\` : bloque le worker (pour checks rapides < 5 min)
- \`reschedule\` : libère le worker (pour checks longs)

## 5. Validation des données (Data Quality)

### Le problème
Votre pipeline s'exécute avec succès, mais les données sont pourries (colonnes nulles, doublons, valeurs aberrantes). Personne ne le voit avant que les dashboards soient faux.

### Solution : Great Expectations + Airflow
\`\`\`python
from airflow.operators.python import PythonOperator
import great_expectations as ge

def validate_data(**context):
    df = pd.read_sql("SELECT * FROM table WHERE date = '{{ ds }}'", engine)
    
    # Convertir en GE dataset
    ge_df = ge.from_pandas(df)
    
    # Définir les attentes
    ge_df.expect_column_values_to_not_be_null('user_id')
    ge_df.expect_column_values_to_be_unique('transaction_id')
    ge_df.expect_column_values_to_be_between('amount', min_value=0, max_value=1000000)
    
    # Valider
    results = ge_df.validate()
    
    if not results['success']:
        raise ValueError(f"Data quality check failed: {results}")

validate = PythonOperator(
    task_id='validate_data',
    python_callable=validate_data,
)

extract >> transform >> load >> validate  # Validation APRÈS le load
\`\`\`

**Principe** : Fail fast si les données sont mauvaises.

## 6. Templating pour éviter le code dupliqué

### Le problème
Vous avez 10 DAGs quasi identiques qui diffèrent juste par le nom de la table. Maintenir 10 fichiers Python est l'enfer.

### Solution : DAG Factory
\`\`\`python
from airflow import DAG
from datetime import datetime

def create_etl_dag(table_name, schedule):
    dag = DAG(
        dag_id=f'etl_{table_name}',
        schedule_interval=schedule,
        start_date=datetime(2026, 1, 1),
        catchup=False,
    )
    
    with dag:
        extract = PythonOperator(
            task_id='extract',
            python_callable=extract_data,
            op_kwargs={'table': table_name},
        )
        
        load = PythonOperator(
            task_id='load',
            python_callable=load_data,
            op_kwargs={'table': table_name},
        )
        
        extract >> load
    
    return dag

# Générer 10 DAGs automatiquement
tables = ['users', 'orders', 'products', 'transactions']
for table in tables:
    globals()[f'etl_{table}'] = create_etl_dag(table, '@daily')
\`\`\`

**Résultat** : 1 seul fichier Python pour 10 DAGs.

## 7. Backfill sécurisé

### Le problème
Vous devez retraiter 6 mois de données. Si vous lancez un backfill naïf, vous allez :
- Saturer votre cluster
- Crasher vos bases de données
- Bloquer les DAGs en cours

### Solution : Backfill contrôlé
\`\`\`bash
# ❌ Mauvais : backfill tout d'un coup
airflow dags backfill my_dag --start-date 2025-07-01 --end-date 2026-01-01

# ✅ Bon : backfill par batch avec delay
for month in {07..12}; do
    airflow dags backfill my_dag \\
        --start-date 2025-$month-01 \\
        --end-date 2025-$month-31 \\
        --delay-on-limit 60  # Attendre 60s entre chaque run
    sleep 300  # Pause de 5 min entre chaque mois
done
\`\`\`

**Alternative** : Créer un DAG de backfill dédié avec \`max_active_runs=1\`.

## Conclusion

Ces 7 patterns transforment des DAGs fragiles en pipelines anti-fragiles :
1. ✅ **Idempotence** : relançable sans risque
2. ✅ **Retry intelligents** : pas infinis
3. ✅ **Alerting proactif** : détection immédiate
4. ✅ **Sensors** : attendre les dépendances
5. ✅ **Data quality** : validation automatique
6. ✅ **Templating** : éviter la duplication
7. ✅ **Backfill contrôlé** : retraitement sécurisé

**Résultat** : Pipelines qui tournent en prod sans intervention humaine pendant des mois.

Besoin d'aide pour industrialiser vos DAGs Airflow ? [Contactez-moi](/contact).

---

**Tags** : #airflow #dataops #orchestration #monitoring #production
`,
  },
];
