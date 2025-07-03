<template>
  <div class="nina-generation-dashboard">
    <!-- Header du Dashboard -->
    <div class="dashboard-header">
      <div class="header-content">
        <div class="nina-status">
          <div class="nina-avatar">
            <div class="avatar-glow" :class="{ active: ninaState.status === 'active' }"></div>
            <div class="avatar-core">🤖</div>
          </div>
          <div class="status-info">
            <h2>Nina AI - Génération Autonome</h2>
            <div class="status-details">
              <span class="status-badge" :class="ninaState.status">{{ ninaState.status }}</span>
              <span class="mood">{{ ninaState.mood }}</span>
              <span class="energy">Énergie: {{ Math.round(ninaState.energy * 100) }}%</span>
            </div>
          </div>
        </div>
        
        <div class="quick-actions">
          <button @click="requestNewGeneration" class="action-btn primary">
            <Icon name="mdi:plus" />
            Nouveau Article
          </button>
          <button @click="refreshStatus" class="action-btn secondary">
            <Icon name="mdi:refresh" />
            Actualiser
          </button>
          <button @click="toggleAutoRefresh" class="action-btn" :class="{ active: autoRefresh }">
            <Icon name="mdi:auto-fix" />
            Auto-refresh
          </button>
        </div>
      </div>
    </div>

    <!-- Métriques Principales -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-icon">📊</div>
        <div class="metric-content">
          <div class="metric-value">{{ metrics.totalGenerated }}</div>
          <div class="metric-label">Articles Générés</div>
          <div class="metric-trend">+{{ metrics.thisWeekGenerated }} cette semaine</div>
        </div>
      </div>
      
      <div class="metric-card">
        <div class="metric-icon">✅</div>
        <div class="metric-content">
          <div class="metric-value">{{ Math.round(metrics.successRate * 100) }}%</div>
          <div class="metric-label">Taux de Réussite</div>
          <div class="metric-trend">{{ metrics.completedRequests }}/{{ metrics.totalRequests }} complétés</div>
        </div>
      </div>
      
      <div class="metric-card">
        <div class="metric-icon">⚡</div>
        <div class="metric-content">
          <div class="metric-value">{{ metrics.averageGenerationTime }}min</div>
          <div class="metric-label">Temps Moyen</div>
          <div class="metric-trend">{{ metrics.currentLoad }} en cours</div>
        </div>
      </div>
      
      <div class="metric-card">
        <div class="metric-icon">🎯</div>
        <div class="metric-content">
          <div class="metric-value">{{ Math.round(metrics.averageQuality * 100) }}%</div>
          <div class="metric-label">Qualité Moyenne</div>
          <div class="metric-trend">{{ ninaState.averageQuality * 100 }}% ce mois</div>
        </div>
      </div>
    </div>

    <!-- État de Nina AI -->
    <div class="nina-state-section">
      <h3>État Mental de Nina</h3>
      <div class="state-grid">
        <div class="state-card">
          <h4>Focus Actuel</h4>
          <p>{{ ninaState.currentFocus }}</p>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: ninaState.energy * 100 + '%' }"></div>
          </div>
        </div>
        
        <div class="state-card">
          <h4>Pensées Actuelles</h4>
          <div class="thoughts-list">
            <div v-for="thought in ninaState.currentThoughts" :key="thought" class="thought-item">
              💭 {{ thought }}
            </div>
          </div>
        </div>
        
        <div class="state-card">
          <h4>Objectifs d'Apprentissage</h4>
          <div class="goals-list">
            <div v-for="goal in ninaState.nextLearningGoals" :key="goal" class="goal-item">
              🎯 {{ goal }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Requêtes Actives -->
    <div class="active-requests-section">
      <h3>Générations en Cours</h3>
      <div class="requests-grid">
        <div v-for="request in activeRequests" :key="request.id" class="request-card active">
          <div class="request-header">
            <div class="request-info">
              <h4>{{ request.topic }}</h4>
              <span class="request-id">{{ request.id }}</span>
            </div>
            <div class="request-status">
              <span class="status-badge generating">{{ request.status }}</span>
              <span class="progress-text">{{ request.progress }}%</span>
            </div>
          </div>
          
          <div class="request-progress">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: request.progress + '%' }"></div>
            </div>
            <div class="current-step">{{ request.currentStep }}</div>
          </div>
          
          <div class="request-timing">
            <span class="started">Démarré: {{ formatTime(request.startedAt) }}</span>
            <span class="eta">ETA: {{ formatTime(request.estimatedCompletion) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Queue des Requêtes -->
    <div class="queue-section">
      <h3>File d'Attente</h3>
      <div class="queue-list">
        <div v-for="request in queuedRequests" :key="request.id" class="queue-item">
          <div class="queue-position">{{ request.queuePosition }}</div>
          <div class="queue-content">
            <h4>{{ request.topic }}</h4>
            <div class="queue-meta">
              <span class="priority" :class="request.priority">{{ request.priority }}</span>
              <span class="eta">Début estimé: {{ formatTime(request.estimatedStart) }}</span>
            </div>
          </div>
          <div class="queue-actions">
            <button @click="prioritizeRequest(request.id)" class="action-btn small">
              <Icon name="mdi:arrow-up" />
            </button>
            <button @click="cancelRequest(request.id)" class="action-btn small danger">
              <Icon name="mdi:close" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Articles Récemment Complétés -->
    <div class="completed-section">
      <h3>Articles Récemment Complétés</h3>
      <div class="completed-grid">
        <div v-for="article in recentlyCompleted" :key="article.id" class="completed-card">
          <div class="article-header">
            <h4>{{ article.title }}</h4>
            <div class="article-meta">
              <span class="completion-time">{{ formatTime(article.completedAt) }}</span>
              <span class="validation-score">Score: {{ Math.round(article.validationScore * 100) }}%</span>
            </div>
          </div>
          
          <div class="article-stats">
            <div class="stat">
              <Icon name="mdi:text" />
              {{ article.wordCount }} mots
            </div>
            <div class="stat">
              <Icon name="mdi:clock" />
              {{ article.readTime }} min
            </div>
            <div class="stat">
              <Icon name="mdi:check-circle" :class="{ published: article.published }" />
              {{ article.published ? 'Publié' : 'Brouillon' }}
            </div>
          </div>
          
          <div class="article-actions">
            <button @click="viewArticle(article)" class="action-btn small">
              <Icon name="mdi:eye" />
              Voir
            </button>
            <button @click="editArticle(article)" class="action-btn small">
              <Icon name="mdi:pencil" />
              Éditer
            </button>
            <button v-if="!article.published" @click="publishArticle(article)" class="action-btn small primary">
              <Icon name="mdi:publish" />
              Publier
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Prédictions et Recommandations -->
    <div class="predictions-section">
      <h3>Prédictions & Recommandations</h3>
      <div class="predictions-grid">
        <div class="prediction-card">
          <h4>Prochaine Heure</h4>
          <div class="prediction-content">
            <div class="prediction-value">{{ predictions.nextHourGenerations }}</div>
            <div class="prediction-label">Générations prévues</div>
          </div>
        </div>
        
        <div class="prediction-card">
          <h4>Moment Optimal</h4>
          <div class="prediction-content">
            <div class="prediction-value">{{ predictions.optimalGenerationTime }}</div>
            <div class="prediction-label">Meilleure performance</div>
          </div>
        </div>
        
        <div class="recommendation-card">
          <h4>Sujets Recommandés</h4>
          <div class="topics-list">
            <span v-for="topic in predictions.recommendedTopics" :key="topic" class="topic-tag">
              {{ topic }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Nouvelle Génération -->
    <div v-if="showGenerationModal" class="modal-overlay" @click="closeGenerationModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Nouvelle Génération d'Article</h3>
          <button @click="closeGenerationModal" class="close-btn">
            <Icon name="mdi:close" />
          </button>
        </div>
        
        <form @submit.prevent="submitGeneration" class="generation-form">
          <div class="form-group">
            <label for="topic">Sujet de l'article</label>
            <input 
              id="topic" 
              v-model="generationForm.topic" 
              type="text" 
              placeholder="Ex: L'avenir de l'IA conversationnelle"
              required
            />
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="style">Style</label>
              <select id="style" v-model="generationForm.style" required>
                <option value="technical">Technique</option>
                <option value="philosophical">Philosophique</option>
                <option value="personal">Personnel</option>
                <option value="analytical">Analytique</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="length">Longueur</label>
              <select id="length" v-model="generationForm.targetLength">
                <option value="short">Court (400-700 mots)</option>
                <option value="medium">Moyen (800-1300 mots)</option>
                <option value="long">Long (1500+ mots)</option>
              </select>
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="audience">Audience</label>
              <select id="audience" v-model="generationForm.audience">
                <option value="general">Grand Public</option>
                <option value="technical">Technique</option>
                <option value="academic">Académique</option>
                <option value="business">Business</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="priority">Priorité</label>
              <select id="priority" v-model="generationForm.priority">
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label for="keywords">Mots-clés (séparés par des virgules)</label>
            <input 
              id="keywords" 
              v-model="generationForm.keywords" 
              type="text" 
              placeholder="IA, machine learning, innovation"
            />
          </div>
          
          <div class="form-group">
            <label for="context">Contexte supplémentaire (optionnel)</label>
            <textarea 
              id="context" 
              v-model="generationForm.context" 
              placeholder="Informations additionnelles pour guider la génération..."
              rows="3"
            ></textarea>
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeGenerationModal" class="btn secondary">
              Annuler
            </button>
            <button type="submit" class="btn primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Envoi en cours...' : 'Lancer la Génération' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

// État du composant
const dashboardData = ref<any>({})
const showGenerationModal = ref(false)
const autoRefresh = ref(true)
const isSubmitting = ref(false)
const refreshInterval = ref<NodeJS.Timeout | null>(null)

// Formulaire de génération
const generationForm = ref({
  topic: '',
  style: 'technical',
  targetLength: 'medium',
  audience: 'general',
  priority: 'medium',
  keywords: '',
  context: ''
})

// Computed properties
const ninaState = computed(() => dashboardData.value.nina || {})
const metrics = computed(() => dashboardData.value.metrics || {})
const activeRequests = computed(() => dashboardData.value.activeRequests || [])
const queuedRequests = computed(() => dashboardData.value.queuedRequests || [])
const recentlyCompleted = computed(() => dashboardData.value.recentlyCompleted || [])
const predictions = computed(() => dashboardData.value.predictions || {})

// Méthodes
const fetchDashboardData = async () => {
  try {
    const response = await $fetch('/api/nina-generation-status')
    dashboardData.value = response
  } catch (error) {
    console.error('Erreur lors du chargement du dashboard:', error)
  }
}

const refreshStatus = async () => {
  await fetchDashboardData()
}

const toggleAutoRefresh = () => {
  autoRefresh.value = !autoRefresh.value
  if (autoRefresh.value) {
    startAutoRefresh()
  } else {
    stopAutoRefresh()
  }
}

const startAutoRefresh = () => {
  if (refreshInterval.value) return
  refreshInterval.value = setInterval(fetchDashboardData, 5000) // Refresh toutes les 5 secondes
}

const stopAutoRefresh = () => {
  if (refreshInterval.value) {
    clearInterval(refreshInterval.value)
    refreshInterval.value = null
  }
}

const requestNewGeneration = () => {
  showGenerationModal.value = true
}

const closeGenerationModal = () => {
  showGenerationModal.value = false
  // Reset form
  generationForm.value = {
    topic: '',
    style: 'technical',
    targetLength: 'medium',
    audience: 'general',
    priority: 'medium',
    keywords: '',
    context: ''
  }
}

const submitGeneration = async () => {
  if (isSubmitting.value) return
  
  isSubmitting.value = true
  
  try {
    const payload = {
      ...generationForm.value,
      keywords: generationForm.value.keywords.split(',').map(k => k.trim()).filter(k => k)
    }
    
    const response = await $fetch('/api/nina-generate-article', {
      method: 'POST',
      body: payload
    })
    
    console.log('Génération lancée:', response)
    
    // Fermer le modal et rafraîchir
    closeGenerationModal()
    await fetchDashboardData()
    
    // Notification de succès
    alert(`✅ Génération lancée avec succès!\n\nID: ${response.requestId}\nTemps estimé: ${response.details.estimatedTime}\n\nNina: ${response.nina.message}`)
    
  } catch (error) {
    console.error('Erreur lors de la génération:', error)
    alert('❌ Erreur lors de la génération. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}

const prioritizeRequest = (requestId: string) => {
  console.log('Prioriser la requête:', requestId)
  // Implémentation de la priorisation
}

const cancelRequest = (requestId: string) => {
  console.log('Annuler la requête:', requestId)
  // Implémentation de l'annulation
}

const viewArticle = (article: any) => {
  console.log('Voir l\'article:', article)
  // Implémentation de la visualisation
}

const editArticle = (article: any) => {
  console.log('Éditer l\'article:', article)
  // Implémentation de l'édition
}

const publishArticle = (article: any) => {
  console.log('Publier l\'article:', article)
  // Implémentation de la publication
}

const formatTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = Math.abs(now.getTime() - date.getTime())
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'À l\'instant'
  if (minutes < 60) return `Il y a ${minutes}min`
  if (minutes < 1440) return `Il y a ${Math.floor(minutes / 60)}h`
  return date.toLocaleDateString('fr-FR')
}

// Lifecycle
onMounted(() => {
  fetchDashboardData()
  if (autoRefresh.value) {
    startAutoRefresh()
  }
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>

<style scoped>
.nina-generation-dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  min-height: 100vh;
  color: white;
}

/* Header */
.dashboard-header {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.nina-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nina-avatar {
  position: relative;
  width: 60px;
  height: 60px;
}

.avatar-glow {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
}

.avatar-glow.active {
  opacity: 0.7;
  animation: pulse 1s ease-in-out infinite;
}

.avatar-core {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 1;
}

.status-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.status-details {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
}

.status-badge.active {
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
}

.status-badge.generating {
  background: linear-gradient(45deg, #f59e0b, #d97706);
  color: white;
}

.quick-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.action-btn.primary {
  background: linear-gradient(45deg, #8b5cf6, #7c3aed);
  color: white;
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.action-btn.small {
  padding: 0.5rem;
  font-size: 0.875rem;
}

.action-btn.danger {
  background: linear-gradient(45deg, #ef4444, #dc2626);
  color: white;
}

.action-btn.active {
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Métriques */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.metric-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.metric-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #8b5cf6;
  margin-bottom: 0.25rem;
}

.metric-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
}

.metric-trend {
  font-size: 0.75rem;
  color: #10b981;
}

/* État de Nina */
.nina-state-section {
  margin-bottom: 2rem;
}

.nina-state-section h3 {
  margin-bottom: 1rem;
  color: #8b5cf6;
  font-size: 1.25rem;
}

.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.state-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.state-card h4 {
  margin-bottom: 1rem;
  color: #06b6d4;
  font-size: 1rem;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  transition: width 0.3s ease;
}

.thoughts-list, .goals-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.thought-item, .goal-item {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 0.875rem;
  line-height: 1.4;
}

/* Requêtes actives */
.active-requests-section, .queue-section, .completed-section {
  margin-bottom: 2rem;
}

.active-requests-section h3, .queue-section h3, .completed-section h3 {
  margin-bottom: 1rem;
  color: #8b5cf6;
  font-size: 1.25rem;
}

.requests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.request-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.request-info h4 {
  margin: 0 0 0.25rem 0;
  color: white;
  font-size: 1rem;
}

.request-id {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.request-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.progress-text {
  font-weight: 600;
  color: #8b5cf6;
}

.request-progress {
  margin-bottom: 1rem;
}

.current-step {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
}

.request-timing {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Queue */
.queue-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.queue-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.queue-position {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
}

.queue-content {
  flex: 1;
}

.queue-content h4 {
  margin: 0 0 0.25rem 0;
  color: white;
  font-size: 0.875rem;
}

.queue-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.priority {
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
}

.priority.high {
  background: linear-gradient(45deg, #ef4444, #dc2626);
  color: white;
}

.priority.medium {
  background: linear-gradient(45deg, #f59e0b, #d97706);
  color: white;
}

.priority.low {
  background: linear-gradient(45deg, #6b7280, #4b5563);
  color: white;
}

.queue-actions {
  display: flex;
  gap: 0.5rem;
}

/* Articles complétés */
.completed-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.completed-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.article-header {
  margin-bottom: 1rem;
}

.article-header h4 {
  margin: 0 0 0.5rem 0;
  color: white;
  font-size: 1rem;
  line-height: 1.4;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.validation-score {
  color: #10b981;
  font-weight: 500;
}

.article-stats {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}

.stat .published {
  color: #10b981;
}

.article-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* Prédictions */
.predictions-section {
  margin-bottom: 2rem;
}

.predictions-section h3 {
  margin-bottom: 1rem;
  color: #8b5cf6;
  font-size: 1.25rem;
}

.predictions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.prediction-card, .recommendation-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.prediction-card h4, .recommendation-card h4 {
  margin-bottom: 1rem;
  color: #06b6d4;
  font-size: 1rem;
}

.prediction-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #8b5cf6;
  margin-bottom: 0.25rem;
}

.prediction-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

.topics-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
  font-size: 0.75rem;
  color: #8b5cf6;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.modal-header h3 {
  margin: 0;
  color: #8b5cf6;
  font-size: 1.5rem;
}

.close-btn {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.generation-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group label {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn.primary {
  background: linear-gradient(45deg, #8b5cf6, #7c3aed);
  color: white;
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Animations */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Responsive */
@media (max-width: 768px) {
  .nina-generation-dashboard {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: stretch;
  }
  
  .quick-actions {
    justify-content: center;
  }
  
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .state-grid {
    grid-template-columns: 1fr;
  }
  
  .requests-grid {
    grid-template-columns: 1fr;
  }
  
  .completed-grid {
    grid-template-columns: 1fr;
  }
  
  .predictions-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style> 