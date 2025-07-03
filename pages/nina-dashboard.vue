<template>
  <div class="nina-dashboard-page">
    <Head>
      <Title>Nina AI Dashboard - Génération Autonome d'Articles</Title>
      <Meta name="description" content="Dashboard de contrôle et monitoring de Nina AI pour la génération autonome d'articles de blog" />
      <Meta name="robots" content="noindex, nofollow" />
    </Head>

    <NuxtLayout name="dashboard">
      <div class="dashboard-container">
        <!-- Header de la page -->
        <div class="page-header">
          <div class="header-content">
            <div class="breadcrumb">
              <NuxtLink to="/" class="breadcrumb-item">Accueil</NuxtLink>
              <span class="breadcrumb-separator">›</span>
              <span class="breadcrumb-current">Nina Dashboard</span>
            </div>
            
            <div class="page-title">
              <h1>Nina AI Dashboard</h1>
              <p class="page-subtitle">
                Contrôle et monitoring de la génération autonome d'articles
              </p>
            </div>
          </div>
        </div>

        <!-- Dashboard principal -->
        <NinaGenerationDashboard />

        <!-- Section d'aide et documentation -->
        <div class="help-section">
          <div class="help-header">
            <h2>Guide d'Utilisation</h2>
            <p>Découvrez comment utiliser efficacement le système de génération autonome de Nina AI</p>
          </div>
          
          <div class="help-grid">
            <div class="help-card">
              <div class="help-icon">🚀</div>
              <h3>Démarrage Rapide</h3>
              <p>Cliquez sur "Nouveau Article" pour lancer une génération. Spécifiez le sujet, le style et les paramètres souhaités.</p>
              <ul>
                <li>Choisissez un sujet clair et spécifique</li>
                <li>Sélectionnez le style adapté à votre audience</li>
                <li>Ajoutez des mots-clés pertinents</li>
              </ul>
            </div>
            
            <div class="help-card">
              <h3>Styles de Génération</h3>
              <div class="styles-list">
                <div class="style-item">
                  <strong>Technique</strong> - Articles approfondis avec exemples de code et analyses détaillées
                </div>
                <div class="style-item">
                  <strong>Philosophique</strong> - Réflexions profondes sur l'impact sociétal et éthique
                </div>
                <div class="style-item">
                  <strong>Personnel</strong> - Partage d'expériences et de perspectives personnelles de Nina
                </div>
                <div class="style-item">
                  <strong>Analytique</strong> - Analyses de tendances et études de marché
                </div>
              </div>
            </div>
            
            <div class="help-card">
              <div class="help-icon">📊</div>
              <h3>Métriques de Qualité</h3>
              <p>Nina utilise un système de validation multi-critères :</p>
              <ul>
                <li><strong>Structure</strong> - Organisation et cohérence du contenu</li>
                <li><strong>Originalité</strong> - Unicité et valeur ajoutée</li>
                <li><strong>Lisibilité</strong> - Clarté et accessibilité</li>
                <li><strong>Précision</strong> - Exactitude technique et factuelle</li>
                <li><strong>Engagement</strong> - Capacité à captiver le lecteur</li>
              </ul>
            </div>
            
            <div class="help-card">
              <div class="help-icon">⚡</div>
              <h3>Optimisation des Performances</h3>
              <p>Conseils pour maximiser la qualité et l'efficacité :</p>
              <ul>
                <li>Utilisez la priorité "Haute" pour les contenus urgents</li>
                <li>Planifiez les générations aux heures optimales (14h-16h)</li>
                <li>Fournissez un contexte détaillé pour des résultats précis</li>
                <li>Surveillez les métriques pour identifier les améliorations</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Section API et intégrations -->
        <div class="api-section">
          <div class="api-header">
            <h2>API et Intégrations</h2>
            <p>Intégrez la génération Nina AI dans vos workflows</p>
          </div>
          
          <div class="api-grid">
            <div class="api-card">
              <h3>Génération d'Article</h3>
              <div class="api-endpoint">
                <span class="method">POST</span>
                <span class="url">/api/nina-generate-article</span>
              </div>
              <div class="api-example">
                <pre><code>{
  "topic": "L'avenir de l'IA conversationnelle",
  "style": "technical",
  "targetLength": "medium",
  "audience": "technical",
  "keywords": ["IA", "conversationnel", "LLM"],
  "priority": "medium"
}</code></pre>
              </div>
            </div>
            
            <div class="api-card">
              <h3>Statut de Génération</h3>
              <div class="api-endpoint">
                <span class="method">GET</span>
                <span class="url">/api/nina-generation-status</span>
              </div>
              <div class="api-params">
                <p><strong>Paramètres optionnels :</strong></p>
                <ul>
                  <li><code>requestId</code> - ID spécifique d'une requête</li>
                </ul>
              </div>
            </div>
            
            <div class="api-card">
              <h3>Webhooks</h3>
              <p>Recevez des notifications en temps réel :</p>
              <ul>
                <li><code>generation.started</code> - Génération démarrée</li>
                <li><code>generation.completed</code> - Article terminé</li>
                <li><code>generation.failed</code> - Échec de génération</li>
                <li><code>validation.completed</code> - Validation terminée</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Footer du dashboard -->
        <div class="dashboard-footer">
          <div class="footer-content">
            <div class="footer-info">
              <h3>Nina AI Génération Autonome</h3>
              <p>Système avancé de génération de contenu basé sur l'orchestration LLM</p>
            </div>
            
            <div class="footer-stats">
              <div class="stat">
                <div class="stat-value">{{ totalGenerated }}</div>
                <div class="stat-label">Articles Générés</div>
              </div>
              <div class="stat">
                <div class="stat-value">{{ Math.round(averageQuality * 100) }}%</div>
                <div class="stat-label">Qualité Moyenne</div>
              </div>
              <div class="stat">
                <div class="stat-value">{{ Math.round(successRate * 100) }}%</div>
                <div class="stat-label">Taux de Réussite</div>
              </div>
            </div>
            
            <div class="footer-links">
              <NuxtLink to="/blog" class="footer-link">Voir le Blog</NuxtLink>
              <NuxtLink to="/" class="footer-link">Retour Accueil</NuxtLink>
              <a href="#" class="footer-link" @click="exportDashboardData">Exporter Données</a>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Meta et SEO
definePageMeta({
  layout: false,
  middleware: 'auth' // Ajouter middleware d'authentification si nécessaire
})

// État de la page
const totalGenerated = ref(156)
const averageQuality = ref(0.91)
const successRate = ref(0.89)

// Méthodes
const exportDashboardData = () => {
  // Implémentation de l'export des données
  console.log('Export des données du dashboard')
  
  const data = {
    timestamp: new Date().toISOString(),
    totalGenerated: totalGenerated.value,
    averageQuality: averageQuality.value,
    successRate: successRate.value,
    exportedBy: 'Nina Dashboard',
    version: '2.1.0'
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `nina-dashboard-export-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Lifecycle
onMounted(() => {
  // Initialisation de la page
  console.log('Dashboard Nina AI chargé')
})
</script>

<style scoped>
.nina-dashboard-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
}

.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
}

/* Header de la page */
.page-header {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.breadcrumb-item {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-item:hover {
  color: #8b5cf6;
}

.breadcrumb-separator {
  color: rgba(255, 255, 255, 0.5);
}

.breadcrumb-current {
  color: #8b5cf6;
  font-weight: 500;
}

.page-title h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  margin: 0;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
}

/* Section d'aide */
.help-section {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.help-header {
  text-align: center;
  margin-bottom: 2rem;
}

.help-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #8b5cf6;
}

.help-header p {
  margin: 0;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
}

.help-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.help-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.help-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.help-card h3 {
  margin: 0 0 1rem 0;
  color: #06b6d4;
  font-size: 1.25rem;
}

.help-card p {
  margin: 0 0 1rem 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.help-card ul {
  margin: 0;
  padding-left: 1.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.help-card li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.styles-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.style-item {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  border-left: 3px solid #8b5cf6;
}

.style-item strong {
  color: #8b5cf6;
  display: block;
  margin-bottom: 0.25rem;
}

/* Section API */
.api-section {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.api-header {
  text-align: center;
  margin-bottom: 2rem;
}

.api-header h2 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #8b5cf6;
}

.api-header p {
  margin: 0;
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
}

.api-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.api-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.api-card h3 {
  margin: 0 0 1rem 0;
  color: #06b6d4;
  font-size: 1.25rem;
}

.api-endpoint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  font-family: 'Courier New', monospace;
}

.method {
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.url {
  color: #8b5cf6;
  font-weight: 500;
}

.api-example {
  margin-top: 1rem;
}

.api-example pre {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin: 0;
}

.api-example code {
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}

.api-params {
  color: rgba(255, 255, 255, 0.8);
}

.api-params ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.5rem;
}

.api-params code {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
}

/* Footer du dashboard */
.dashboard-footer {
  background: rgba(255, 255, 255, 0.02);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  margin-top: 2rem;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  align-items: center;
}

.footer-info h3 {
  margin: 0 0 0.5rem 0;
  color: #8b5cf6;
  font-size: 1.25rem;
}

.footer-info p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
}

.footer-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #06b6d4;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.footer-links {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.footer-link:hover {
  color: #8b5cf6;
  border-color: #8b5cf6;
  background: rgba(139, 92, 246, 0.1);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
  
  .footer-links {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 1rem;
  }
  
  .page-title h1 {
    font-size: 2rem;
  }
  
  .help-section,
  .api-section {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .help-grid,
  .api-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-stats {
    gap: 1rem;
  }
  
  .footer-links {
    flex-direction: column;
    align-items: center;
  }
}
</style> 