/**
 * Script pour créer des articles de blog de qualité
 * Usage: node scripts/seed-articles.js
 */

const articles = [
  {
    title: "Comment Industrialiser un Pipeline Spark en Production",
    slug: "industrialiser-pipeline-spark-production",
    excerpt: "Guide complet pour passer d'un prototype Spark à un pipeline production-ready avec monitoring, tests et CI/CD.",
    content: `# Comment Industrialiser un Pipeline Spark en Production

## Introduction

Passer d'un prototype Spark qui fonctionne sur votre machine locale à un pipeline robuste en production est un défi majeur. Dans cet article, je partage les leçons apprises sur 7 ans d'expérience avec Spark chez BNP Paribas, Orange et Safran.

## 1. Architecture & Design Patterns

### Le Pattern Bronze-Silver-Gold

L'architecture médaillée (Medallion Architecture) est devenue le standard pour les pipelines Big Data :

- **Bronze** : Données brutes, ingestion as-is
- **Silver** : Données nettoyées, dédupliquées, typées
- **Gold** : Données agrégées, prêtes pour l'analytics

\`\`\`scala
// Exemple de transformation Bronze → Silver
val bronzeDF = spark.read.parquet("s3://datalake/bronze/transactions")

val silverDF = bronzeDF
  .dropDuplicates("transaction_id")
  .withColumn("amount", col("amount").cast(DecimalType(10, 2)))
  .withColumn("timestamp", to_timestamp(col("timestamp")))
  .filter(col("amount") > 0)

silverDF.write
  .mode("overwrite")
  .partitionBy("date")
  .parquet("s3://datalake/silver/transactions")
\`\`\`

### Idempotence & Replayability

Un pipeline production doit être **idempotent** : relancer le même job avec les mêmes inputs produit les mêmes outputs.

**Bonnes pratiques** :
- Utiliser \`mode("overwrite")\` avec des partitions temporelles
- Éviter les \`append\` sans déduplication
- Logger les checksums des données traitées

## 2. Tests & Qualité

### Tests Unitaires avec ScalaTest

\`\`\`scala
class TransformationSpec extends AnyFlatSpec with SparkSessionTestWrapper {
  "cleanTransactions" should "remove negative amounts" in {
    val input = Seq(
      ("tx1", 100.0),
      ("tx2", -50.0),
      ("tx3", 200.0)
    ).toDF("id", "amount")

    val result = Transformations.cleanTransactions(input)
    
    assert(result.count() == 2)
    assert(result.filter(col("amount") < 0).count() == 0)
  }
}
\`\`\`

### Data Quality Checks

Intégrer des validations automatiques :

\`\`\`python
# Avec Great Expectations
import great_expectations as ge

df = ge.read_csv("data.csv")
df.expect_column_values_to_not_be_null("transaction_id")
df.expect_column_values_to_be_between("amount", min_value=0, max_value=1000000)
\`\`\`

## 3. Monitoring & Observabilité

### Métriques Spark Essentielles

- **Durée d'exécution** : Alerter si > 2x la baseline
- **Nombre de records traités** : Détecter les anomalies
- **Taux d'erreur** : Seuil acceptable < 0.1%
- **Utilisation mémoire** : Éviter les OOM

### Stack Monitoring Recommandée

- **Prometheus** : Collecte des métriques Spark
- **Grafana** : Dashboards temps réel
- **Loki** : Logs centralisés
- **PagerDuty** : Alerting

\`\`\`yaml
# Exemple de dashboard Grafana
panels:
  - title: "Pipeline Duration"
    query: "spark_job_duration_seconds{job='etl_transactions'}"
  - title: "Records Processed"
    query: "spark_records_processed_total"
\`\`\`

## 4. CI/CD & Déploiement

### Pipeline GitLab CI

\`\`\`yaml
stages:
  - test
  - build
  - deploy

unit_tests:
  stage: test
  script:
    - sbt test
    - sbt coverage

build_jar:
  stage: build
  script:
    - sbt assembly
  artifacts:
    paths:
      - target/scala-2.12/*.jar

deploy_prod:
  stage: deploy
  script:
    - spark-submit --master yarn --deploy-mode cluster target/scala-2.12/pipeline.jar
  only:
    - main
\`\`\`

### Stratégie de Déploiement

1. **Blue-Green Deployment** : Deux environnements parallèles
2. **Canary Release** : Déployer sur 10% du trafic d'abord
3. **Rollback automatique** : Si les métriques dégradent

## 5. Optimisations Performance

### Partitionnement Intelligent

\`\`\`scala
// ❌ Mauvais : trop de petits fichiers
df.write.partitionBy("country", "city", "date").parquet("output")

// ✅ Bon : partitionnement équilibré
df.repartition(100, col("date"))
  .write
  .partitionBy("date")
  .parquet("output")
\`\`\`

### Broadcast Joins

Pour les petites tables (< 10 MB) :

\`\`\`scala
import org.apache.spark.sql.functions.broadcast

val result = largeDF.join(
  broadcast(smallDF),
  "key"
)
\`\`\`

## Conclusion

Industrialiser un pipeline Spark demande rigueur et méthodologie. Les 5 piliers :

1. **Architecture** solide (Bronze-Silver-Gold)
2. **Tests** automatisés (unitaires + data quality)
3. **Monitoring** proactif (Prometheus + Grafana)
4. **CI/CD** robuste (GitLab CI + rollback)
5. **Optimisations** continues (partitionnement + broadcast)

Chez BNP Paribas, cette approche nous a permis de réduire les incidents de 80% et les coûts compute de 40%.

---

**Besoin d'aide pour industrialiser vos pipelines Spark ?**  
Contactez-moi : rww.warnier@gmail.com | +33 7 49 41 63 55`,
    category: "data_engineering",
    tags: ["spark", "big-data", "devops", "production"],
    status: "published",
    featured: true,
  },
  {
    title: "DataOps : De la Théorie à la Pratique chez Orange",
    slug: "dataops-theorie-pratique-orange",
    excerpt: "Retour d'expérience sur la mise en place d'une culture DataOps dans une équipe de 15 personnes chez Orange.",
    content: `# DataOps : De la Théorie à la Pratique chez Orange

## Contexte

En 2023, j'ai rejoint Orange pour automatiser le déploiement de leur plateforme Big Data. L'équipe gérait manuellement 50+ serveurs avec des déploiements qui prenaient 2 jours. Voici comment nous avons implémenté DataOps.

## Qu'est-ce que DataOps ?

DataOps = **DevOps appliqué aux pipelines de données**

### Les 3 Piliers

1. **Automatisation** : CI/CD pour les pipelines data
2. **Collaboration** : Data Engineers + Data Scientists + Ops
3. **Monitoring** : Observabilité end-to-end

## Notre Implémentation

### 1. Infrastructure as Code avec Ansible

Avant :
- Déploiement manuel via SSH
- Configuration non versionnée
- Temps de déploiement : **2 jours**

Après :
- Playbooks Ansible versionnés
- Déploiement automatisé
- Temps de déploiement : **15 minutes**

\`\`\`yaml
# ansible/deploy-spark.yml
- name: Deploy Spark Cluster
  hosts: spark_workers
  tasks:
    - name: Install Spark
      apt:
        name: spark
        state: present
    
    - name: Configure Spark
      template:
        src: spark-defaults.conf.j2
        dest: /etc/spark/conf/spark-defaults.conf
    
    - name: Start Spark Worker
      systemd:
        name: spark-worker
        state: started
        enabled: yes
\`\`\`

### 2. CI/CD pour les Pipelines

\`\`\`yaml
# .gitlab-ci.yml
stages:
  - validate
  - test
  - deploy

validate_sql:
  stage: validate
  script:
    - sqlfluff lint queries/

test_transformations:
  stage: test
  script:
    - pytest tests/

deploy_airflow_dags:
  stage: deploy
  script:
    - rsync -av dags/ airflow@prod:/opt/airflow/dags/
  only:
    - main
\`\`\`

### 3. Monitoring avec Prometheus + Grafana

Métriques clés surveillées :

- **Pipeline SLA** : % de jobs terminés à temps
- **Data Freshness** : Âge des données en production
- **Data Quality Score** : % de records valides
- **Coût par pipeline** : Optimisation continue

\`\`\`python
# Exemple d'instrumentation
from prometheus_client import Counter, Histogram

pipeline_duration = Histogram(
    'pipeline_duration_seconds',
    'Time spent processing pipeline',
    ['pipeline_name']
)

@pipeline_duration.labels('etl_customers').time()
def process_customers():
    # ... traitement
    pass
\`\`\`

## Résultats Mesurés

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| Temps de déploiement | 2 jours | 15 min | **-80%** |
| Incidents production | 12/mois | 2/mois | **-83%** |
| Time to Market | 3 semaines | 1 semaine | **-66%** |
| Satisfaction équipe | 6/10 | 9/10 | **+50%** |

## Leçons Apprises

### ✅ Ce qui a fonctionné

1. **Formation continue** : 2h/semaine de pair programming
2. **Documentation as Code** : README.md dans chaque repo
3. **Blameless Postmortems** : Apprendre des incidents sans blâmer

### ❌ Erreurs à éviter

1. **Sur-automatisation** : Commencer simple, itérer
2. **Ignorer la culture** : DataOps est 80% culture, 20% outils
3. **Pas de buy-in management** : Impliquer les managers dès le début

## Stack Technique

- **Orchestration** : Apache Airflow
- **CI/CD** : GitLab CI
- **IaC** : Ansible
- **Monitoring** : Prometheus + Grafana + Loki
- **Data Quality** : Great Expectations
- **Version Control** : Git + DVC (Data Version Control)

## Conclusion

DataOps n'est pas qu'un buzzword. Chez Orange, nous avons prouvé qu'une approche méthodique peut transformer radicalement la productivité d'une équipe data.

**Les 3 règles d'or** :
1. Automatiser tout ce qui est répétable
2. Mesurer pour améliorer
3. Collaborer sans silos

---

**Vous voulez implémenter DataOps dans votre équipe ?**  
Parlons-en : rww.warnier@gmail.com`,
    category: "devops",
    tags: ["dataops", "ansible", "ci-cd", "automation"],
    status: "published",
    featured: true,
  },
  {
    title: "AI Act : Ce Que les Équipes Tech Doivent Savoir en 2026",
    slug: "ai-act-equipes-tech-2026",
    excerpt: "Guide pratique pour les développeurs et data scientists : comprendre l'AI Act et se mettre en conformité.",
    content: `# AI Act : Ce Que les Équipes Tech Doivent Savoir en 2026

## Introduction

L'AI Act européen entre en vigueur progressivement en 2026. En tant que développeur ou data scientist, vous êtes directement concerné. Voici ce que vous devez savoir.

## L'AI Act en 3 Minutes

### Principe de Base

L'AI Act classe les systèmes d'IA en **4 niveaux de risque** :

1. **Risque Inacceptable** 🚫 : Interdit (ex: social scoring)
2. **Risque Élevé** ⚠️ : Réglementé strictement (ex: recrutement, crédit)
3. **Risque Limité** ⚡ : Transparence obligatoire (ex: chatbots)
4. **Risque Minimal** ✅ : Pas de contraintes (ex: filtres anti-spam)

### Qui Est Concerné ?

- **Fournisseurs d'IA** : Ceux qui développent ou commercialisent
- **Déployeurs d'IA** : Ceux qui utilisent des systèmes IA
- **Importateurs** : Ceux qui mettent sur le marché EU

## Impact pour les Développeurs

### 1. Documentation Obligatoire

Pour les systèmes à **risque élevé**, vous devez documenter :

- **Architecture technique** : Modèle, données d'entraînement, hyperparamètres
- **Métriques de performance** : Accuracy, precision, recall, fairness
- **Cas d'usage** : Utilisations prévues et non prévues
- **Risques identifiés** : Biais, erreurs, limitations

\`\`\`python
# Exemple de documentation conforme
MODEL_CARD = {
    "model_name": "credit_risk_classifier",
    "version": "2.1.0",
    "training_data": {
        "source": "internal_crm",
        "size": 1_000_000,
        "period": "2020-2023",
        "demographics": {
            "gender": {"male": 0.52, "female": 0.48},
            "age": {"18-30": 0.25, "31-50": 0.45, "51+": 0.30}
        }
    },
    "performance": {
        "accuracy": 0.87,
        "precision": 0.85,
        "recall": 0.83,
        "fairness_metrics": {
            "demographic_parity": 0.92,
            "equalized_odds": 0.89
        }
    },
    "limitations": [
        "Ne pas utiliser pour des montants > 100k€",
        "Performances dégradées pour les profils atypiques"
    ]
}
\`\`\`

### 2. Tests de Robustesse

Vous devez prouver que votre modèle est **robuste** :

\`\`\`python
import pytest
from model import CreditRiskModel

def test_adversarial_robustness():
    """Test contre les attaques adversariales"""
    model = CreditRiskModel.load("v2.1.0")
    
    # Données normales
    normal_input = {"income": 50000, "age": 35, "credit_score": 700}
    normal_pred = model.predict(normal_input)
    
    # Perturbation minime
    perturbed_input = {**normal_input, "income": 50100}
    perturbed_pred = model.predict(perturbed_input)
    
    # La prédiction ne doit pas changer drastiquement
    assert abs(normal_pred - perturbed_pred) < 0.05

def test_fairness_across_demographics():
    """Test d'équité entre groupes démographiques"""
    model = CreditRiskModel.load("v2.1.0")
    test_data = load_test_data()
    
    male_accuracy = model.evaluate(test_data[test_data.gender == "M"])
    female_accuracy = model.evaluate(test_data[test_data.gender == "F"])
    
    # Écart d'accuracy < 5%
    assert abs(male_accuracy - female_accuracy) < 0.05
\`\`\`

### 3. Traçabilité des Décisions

Pour les systèmes à risque élevé, **chaque décision doit être tracée** :

\`\`\`python
import logging
from datetime import datetime

class AIDecisionLogger:
    def __init__(self, model_name, version):
        self.model_name = model_name
        self.version = version
        self.logger = logging.getLogger("ai_decisions")
    
    def log_decision(self, input_data, prediction, confidence, user_id):
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "model": self.model_name,
            "version": self.version,
            "input": input_data,
            "prediction": prediction,
            "confidence": confidence,
            "user_id": user_id,
            "explainability": self.get_feature_importance(input_data)
        }
        self.logger.info(log_entry)
        
        # Stocker en base pour audit
        db.ai_decisions.insert_one(log_entry)
\`\`\`

## Checklist de Conformité

### Pour un Système à Risque Élevé

- [ ] **Documentation technique complète**
- [ ] **Évaluation des biais** (gender, age, ethnicity)
- [ ] **Tests de robustesse** automatisés
- [ ] **Traçabilité des décisions** (logs + DB)
- [ ] **Supervision humaine** possible
- [ ] **Procédure de réclamation** pour les utilisateurs
- [ ] **Mise à jour régulière** des modèles
- [ ] **Audit externe** annuel

### Pour un Chatbot (Risque Limité)

- [ ] **Disclaimer visible** : "Vous parlez à une IA"
- [ ] **Opt-out facile** : Accès à un humain
- [ ] **Pas de manipulation** : Pas de dark patterns
- [ ] **RGPD compliant** : Consentement + droit à l'oubli

## Outils Recommandés

### 1. Fairlearn (Microsoft)

\`\`\`python
from fairlearn.metrics import demographic_parity_difference

dpd = demographic_parity_difference(
    y_true, 
    y_pred, 
    sensitive_features=gender
)
print(f"Demographic Parity Difference: {dpd}")
# Objectif : < 0.1
\`\`\`

### 2. AI Fairness 360 (IBM)

\`\`\`python
from aif360.datasets import BinaryLabelDataset
from aif360.metrics import BinaryLabelDatasetMetric

dataset = BinaryLabelDataset(df, label_names=['approved'])
metric = BinaryLabelDatasetMetric(dataset, privileged_groups=[{'gender': 1}])

print(f"Disparate Impact: {metric.disparate_impact()}")
# Objectif : entre 0.8 et 1.2
\`\`\`

### 3. Model Cards Toolkit (Google)

\`\`\`python
from model_card_toolkit import ModelCardToolkit

mct = ModelCardToolkit()
model_card = mct.scaffold_assets()
model_card.model_details.name = "Credit Risk Classifier"
model_card.model_details.version.name = "2.1.0"
mct.update_model_card(model_card)
html = mct.export_format()
\`\`\`

## Sanctions

En cas de non-conformité :

- **Amendes** : Jusqu'à 35M€ ou 7% du CA mondial
- **Interdiction de commercialisation**
- **Responsabilité civile** : Dommages et intérêts

## Conclusion

L'AI Act n'est pas une contrainte, c'est une **opportunité** de construire des systèmes IA plus robustes, équitables et dignes de confiance.

**Les 3 actions immédiates** :

1. **Classifier vos systèmes IA** (risque élevé, limité, minimal)
2. **Documenter vos modèles** (model cards + logs)
3. **Tester l'équité** (fairness metrics automatisés)

---

**Besoin d'un audit de conformité AI Act ?**  
J'ai développé un outil gratuit : [AI Act Auditor](https://kenshu.dev/ai-act-auditor)

Contact : rww.warnier@gmail.com`,
    category: "ai_regulation",
    tags: ["ai-act", "rgpd", "compliance", "fairness"],
    status: "published",
    featured: true,
  },
];

console.log("📝 Articles à créer:", articles.length);
console.log("\nPour créer ces articles, utilisez l'interface admin:");
console.log("1. Allez sur /admin/articles");
console.log("2. Cliquez sur 'Nouvel Article'");
console.log("3. Copiez-collez le contenu depuis ce fichier");
console.log("\nOu utilisez l'API directement avec curl/Postman");

module.exports = { articles };
