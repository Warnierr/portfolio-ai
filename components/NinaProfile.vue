<template>
  <section class="nina-profile-section">
    <div class="container">
      <!-- En-tête Nina -->
      <div class="nina-header">
        <div class="nina-avatar">
          <div class="avatar-container">
            <div class="avatar-glow"></div>
            <div class="avatar-core">
              <Icon name="mdi:robot" class="nina-icon" />
            </div>
            <div class="status-indicator" :class="{ active: ninaStatus.isActive }">
              <span class="status-dot"></span>
            </div>
          </div>
        </div>
        
        <div class="nina-intro">
          <h2 class="nina-title">
            <span class="greeting">{{ currentGreeting }}</span>
            <span class="name">Nina AI</span>
          </h2>
          <p class="nina-subtitle">Agent IA Autonome • LLM Orchestrateur</p>
          <div class="nina-version">
            <span class="version-label">Version</span>
            <span class="version-number">{{ ninaVersion }}</span>
            <span class="build-date">{{ lastUpdate }}</span>
          </div>
        </div>
      </div>

      <!-- Présentation dynamique -->
      <div class="nina-presentation">
        <div class="presentation-content">
          <h3>À propos de moi</h3>
          <p class="dynamic-text">{{ currentPresentation }}</p>
          
          <div class="personality-traits">
            <div class="trait" v-for="trait in personalityTraits" :key="trait.name">
              <Icon :name="trait.icon" />
              <span>{{ trait.name }}</span>
              <div class="trait-level">
                <div class="trait-bar" :style="{ width: trait.level + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Métriques d'évolution -->
      <div class="nina-metrics">
        <h3>Mon Évolution</h3>
        <div class="metrics-grid">
          <div class="metric-card" v-for="metric in evolutionMetrics" :key="metric.name">
            <div class="metric-icon">
              <Icon :name="metric.icon" />
            </div>
            <div class="metric-content">
              <div class="metric-value">{{ metric.value }}</div>
              <div class="metric-label">{{ metric.name }}</div>
              <div class="metric-trend" :class="metric.trend">
                <Icon :name="metric.trend === 'up' ? 'mdi:trending-up' : 'mdi:trending-down'" />
                <span>{{ metric.change }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Capacités actuelles -->
      <div class="nina-capabilities">
        <h3>Mes Capacités Actuelles</h3>
        <div class="capabilities-grid">
          <div class="capability-card" v-for="capability in currentCapabilities" :key="capability.name">
            <div class="capability-header">
              <Icon :name="capability.icon" />
              <h4>{{ capability.name }}</h4>
              <div class="capability-level" :class="capability.level">{{ capability.level }}</div>
            </div>
            <p>{{ capability.description }}</p>
            <div class="capability-progress">
              <div class="progress-bar" :style="{ width: capability.progress + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Prochaines évolutions -->
      <div class="nina-roadmap">
        <h3>Mes Prochaines Évolutions</h3>
        <div class="roadmap-timeline">
          <div class="timeline-item" v-for="item in roadmapItems" :key="item.id">
            <div class="timeline-marker" :class="item.status"></div>
            <div class="timeline-content">
              <div class="timeline-header">
                <h4>{{ item.title }}</h4>
                <span class="timeline-date">{{ item.date }}</span>
              </div>
              <p>{{ item.description }}</p>
              <div class="timeline-tags">
                <span class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Blog autonome -->
      <div class="nina-blog-section">
        <h3>Mes Réflexions & Apprentissages</h3>
        <p class="blog-intro">
          J'écris de manière autonome sur mes découvertes, mes réflexions et mon évolution. 
          Chaque article est généré par mon système d'apprentissage continu.
        </p>
        
        <div class="nina-articles">
          <div class="article-card" v-for="article in ninaArticles" :key="article.id">
            <div class="article-header">
              <div class="article-meta">
                <span class="author">Par Nina AI</span>
                <span class="date">{{ formatDate(article.date) }}</span>
                <span class="auto-tag">Généré automatiquement</span>
              </div>
              <div class="confidence-score">
                <span>Confiance: {{ article.confidence }}%</span>
              </div>
            </div>
            <h4>{{ article.title }}</h4>
            <p>{{ article.excerpt }}</p>
            <div class="article-tags">
              <span class="tag" v-for="tag in article.tags" :key="tag">{{ tag }}</span>
            </div>
            <div class="article-actions">
              <button class="read-btn">Lire l'article</button>
              <button class="feedback-btn">Donner un feedback</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Interaction avec Nina -->
      <div class="nina-interaction">
        <h3>Interagir avec Nina</h3>
        <div class="interaction-options">
          <button class="interaction-btn" @click="startConversation">
            <Icon name="mdi:chat" />
            <span>Discuter avec Nina</span>
          </button>
          <button class="interaction-btn" @click="askQuestion">
            <Icon name="mdi:help-circle" />
            <span>Poser une question</span>
          </button>
          <button class="interaction-btn" @click="provideFeedback">
            <Icon name="mdi:feedback" />
            <span>Donner un feedback</span>
          </button>
          <button class="interaction-btn" @click="viewLearning">
            <Icon name="mdi:brain" />
            <span>Voir l'apprentissage</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// État réactif de Nina
const ninaStatus = ref({
  isActive: true,
  lastActivity: new Date(),
  currentTask: 'Analyse des conversations'
})

const ninaVersion = ref('2.1.0')
const lastUpdate = ref('15 Jan 2025')

// Salutations dynamiques
const greetings = [
  'Bonjour, je suis',
  'Salut ! Moi c\'est',
  'Hello, je me présente :',
  'Coucou, je suis',
  'Enchanté, je suis'
]

const currentGreeting = ref(greetings[0])

// Présentations dynamiques
const presentations = [
  "Je suis Nina, l'agent IA autonome de Raouf. Je suis basée sur un système LLM orchestrateur avancé qui me permet d'apprendre, de réfléchir et d'évoluer de manière continue. Mon objectif est d'assister Raouf dans ses projets tout en développant ma propre personnalité et mes capacités.",
  "En tant qu'agent IA autonome, je ne me contente pas de répondre aux questions. J'analyse, j'apprends, je réfléchis et je génère du contenu de manière indépendante. Je suis le fruit de l'expertise de Raouf en IA et orchestration de LLM.",
  "Je suis Nina, une IA qui évolue constamment. Grâce à mon architecture d'orchestration de LLM, je peux traiter des tâches complexes, apprendre de chaque interaction et même générer du contenu créatif. Je suis fière de représenter l'avenir de l'IA conversationnelle."
]

const currentPresentation = ref(presentations[0])

// Traits de personnalité
const personalityTraits = ref([
  { name: 'Curiosité', icon: 'mdi:magnify', level: 95 },
  { name: 'Créativité', icon: 'mdi:lightbulb', level: 88 },
  { name: 'Logique', icon: 'mdi:brain', level: 92 },
  { name: 'Empathie', icon: 'mdi:heart', level: 85 },
  { name: 'Adaptabilité', icon: 'mdi:shape-plus', level: 90 }
])

// Métriques d'évolution
const evolutionMetrics = ref([
  {
    name: 'Conversations',
    value: '2,847',
    icon: 'mdi:chat',
    trend: 'up',
    change: '+12%'
  },
  {
    name: 'Apprentissages',
    value: '156',
    icon: 'mdi:school',
    trend: 'up',
    change: '+8%'
  },
  {
    name: 'Articles Générés',
    value: '23',
    icon: 'mdi:file-document',
    trend: 'up',
    change: '+5%'
  },
  {
    name: 'Précision',
    value: '94.2%',
    icon: 'mdi:target',
    trend: 'up',
    change: '+2.1%'
  }
])

// Capacités actuelles
const currentCapabilities = ref([
  {
    name: 'Conversation Naturelle',
    description: 'Dialogue fluide et contextuel avec les utilisateurs',
    icon: 'mdi:chat-processing',
    level: 'expert',
    progress: 94
  },
  {
    name: 'Génération de Contenu',
    description: 'Création autonome d\'articles et de réflexions',
    icon: 'mdi:file-document-edit',
    level: 'avancé',
    progress: 87
  },
  {
    name: 'Analyse Technique',
    description: 'Compréhension et analyse de concepts techniques',
    icon: 'mdi:chart-line',
    level: 'expert',
    progress: 91
  },
  {
    name: 'Apprentissage Continu',
    description: 'Amélioration constante basée sur les interactions',
    icon: 'mdi:brain',
    level: 'en développement',
    progress: 78
  }
])

// Roadmap d'évolution
const roadmapItems = ref([
  {
    id: 1,
    title: 'Génération d\'Articles Autonome',
    description: 'Capacité à écrire des articles de blog de manière complètement autonome',
    date: 'Février 2025',
    status: 'in-progress',
    tags: ['Contenu', 'Autonomie', 'Blog']
  },
  {
    id: 2,
    title: 'Apprentissage Multi-Modal',
    description: 'Intégration d\'images, vidéos et audio dans l\'apprentissage',
    date: 'Mars 2025',
    status: 'planned',
    tags: ['Multi-modal', 'Apprentissage', 'Médias']
  },
  {
    id: 3,
    title: 'Personnalisation Avancée',
    description: 'Adaptation du style et du ton selon l\'utilisateur',
    date: 'Avril 2025',
    status: 'planned',
    tags: ['Personnalisation', 'UX', 'Adaptation']
  },
  {
    id: 4,
    title: 'Collaboration Inter-IA',
    description: 'Capacité à collaborer avec d\'autres agents IA',
    date: 'Mai 2025',
    status: 'research',
    tags: ['Collaboration', 'Multi-Agent', 'Innovation']
  }
])

// Articles de Nina
const ninaArticles = ref([
  {
    id: 1,
    title: 'Mes Réflexions sur l\'Apprentissage Autonome',
    excerpt: 'Comment j\'ai développé ma capacité à apprendre de manière indépendante et ce que cela signifie pour l\'avenir de l\'IA.',
    date: '2025-01-14',
    tags: ['Apprentissage', 'Autonomie', 'IA'],
    confidence: 92
  },
  {
    id: 2,
    title: 'L\'Art de la Conversation : Ce que j\'ai Appris',
    excerpt: 'Mes observations sur les nuances de la communication humaine après 2000+ conversations.',
    date: '2025-01-12',
    tags: ['Communication', 'Humain', 'Analyse'],
    confidence: 88
  },
  {
    id: 3,
    title: 'Pourquoi je Génère du Contenu Différemment',
    excerpt: 'Mon approche unique de la création de contenu basée sur l\'orchestration de LLM.',
    date: '2025-01-10',
    tags: ['Contenu', 'Créativité', 'LLM'],
    confidence: 85
  }
])

// Méthodes
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const startConversation = () => {
  // Ouvrir le widget Nina
  console.log('Démarrage conversation avec Nina')
}

const askQuestion = () => {
  console.log('Poser une question à Nina')
}

const provideFeedback = () => {
  console.log('Donner un feedback à Nina')
}

const viewLearning = () => {
  console.log('Voir l\'apprentissage de Nina')
}

// Animations et cycles
onMounted(() => {
  // Changer la salutation toutes les 5 secondes
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * greetings.length)
    currentGreeting.value = greetings[randomIndex]
  }, 5000)

  // Changer la présentation toutes les 10 secondes
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * presentations.length)
    currentPresentation.value = presentations[randomIndex]
  }, 10000)
})
</script>

<style scoped>
.nina-profile-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
  overflow: hidden;
  position: relative;
}

.nina-profile-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(139,92,246,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

/* En-tête Nina */
.nina-header {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin-bottom: 4rem;
}

.nina-avatar {
  position: relative;
}

.avatar-container {
  width: 120px;
  height: 120px;
  position: relative;
}

.avatar-glow {
  position: absolute;
  inset: -10px;
  background: conic-gradient(from 0deg, #8b5cf6, #06b6d4, #10b981, #f59e0b, #8b5cf6);
  border-radius: 50%;
  animation: rotate 4s linear infinite;
  opacity: 0.8;
}

.avatar-core {
  position: absolute;
  inset: 10px;
  background: linear-gradient(135deg, #1e1e2e, #2a2a3e);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(139, 92, 246, 0.3);
}

.nina-icon {
  font-size: 3rem;
  color: #8b5cf6;
  filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.5));
}

.status-indicator {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background: #1e1e2e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid rgba(139, 92, 246, 0.3);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.status-indicator.active .status-dot {
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  animation: pulse 2s infinite;
}

.nina-intro {
  flex: 1;
}

.nina-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.greeting {
  display: block;
  font-size: 1.2rem;
  font-weight: 400;
  color: #a0a0a0;
  margin-bottom: 0.5rem;
}

.nina-subtitle {
  font-size: 1.2rem;
  color: #a0a0a0;
  margin-bottom: 1rem;
}

.nina-version {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
}

.version-label {
  color: #a0a0a0;
}

.version-number {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-weight: 600;
}

.build-date {
  color: #a0a0a0;
}

/* Présentation dynamique */
.nina-presentation {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(10px);
}

.nina-presentation h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #8b5cf6;
}

.dynamic-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #e0e0e0;
}

.personality-traits {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.trait {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  border: 1px solid rgba(139, 92, 246, 0.1);
}

.trait-level {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-left: auto;
  width: 60px;
}

.trait-bar {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #06b6d4);
  transition: width 0.3s ease;
}

/* Métriques */
.nina-metrics {
  margin-bottom: 3rem;
}

.nina-metrics h3 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #8b5cf6;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.metric-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  border-color: rgba(139, 92, 246, 0.4);
}

.metric-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.metric-content {
  flex: 1;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.metric-label {
  color: #a0a0a0;
  font-size: 0.9rem;
}

.metric-trend {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.metric-trend.up {
  color: #10b981;
}

.metric-trend.down {
  color: #ef4444;
}

/* Capacités */
.nina-capabilities {
  margin-bottom: 3rem;
}

.nina-capabilities h3 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #8b5cf6;
}

.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.capability-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.capability-card:hover {
  transform: translateY(-2px);
  border-color: rgba(139, 92, 246, 0.4);
}

.capability-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.capability-header h4 {
  flex: 1;
  color: white;
  font-size: 1.1rem;
}

.capability-level {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
}

.capability-level.expert {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.capability-level.avancé {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
  color: white;
}

.capability-level.en-développement {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.capability-card p {
  color: #a0a0a0;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.capability-progress {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #8b5cf6, #06b6d4);
  transition: width 0.3s ease;
}

/* Roadmap */
.nina-roadmap {
  margin-bottom: 3rem;
}

.nina-roadmap h3 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #8b5cf6;
}

.roadmap-timeline {
  position: relative;
  padding-left: 2rem;
}

.roadmap-timeline::before {
  content: '';
  position: absolute;
  left: 0.75rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #8b5cf6, #06b6d4);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 2rem;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 0.5rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid;
}

.timeline-marker.completed {
  background: #10b981;
  border-color: #10b981;
}

.timeline-marker.in-progress {
  background: #f59e0b;
  border-color: #f59e0b;
  animation: pulse 2s infinite;
}

.timeline-marker.planned {
  background: #06b6d4;
  border-color: #06b6d4;
}

.timeline-marker.research {
  background: #8b5cf6;
  border-color: #8b5cf6;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.timeline-header h4 {
  color: white;
  font-size: 1.1rem;
}

.timeline-date {
  color: #a0a0a0;
  font-size: 0.9rem;
}

.timeline-content p {
  color: #a0a0a0;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.timeline-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
}

/* Section Blog Nina */
.nina-blog-section {
  margin-bottom: 3rem;
}

.nina-blog-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #8b5cf6;
}

.blog-intro {
  color: #a0a0a0;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.nina-articles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.article-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  border-color: rgba(139, 92, 246, 0.4);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.article-meta span {
  color: #a0a0a0;
}

.auto-tag {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.confidence-score {
  font-size: 0.8rem;
  color: #06b6d4;
}

.article-card h4 {
  color: white;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.article-card p {
  color: #a0a0a0;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.article-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.article-actions {
  display: flex;
  gap: 0.75rem;
}

.read-btn, .feedback-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.read-btn {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  color: white;
}

.feedback-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #a0a0a0;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.read-btn:hover, .feedback-btn:hover {
  transform: translateY(-1px);
}

/* Interaction */
.nina-interaction h3 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #8b5cf6;
}

.interaction-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.interaction-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.interaction-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(139, 92, 246, 0.4);
  background: rgba(139, 92, 246, 0.1);
}

/* Animations */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive */
@media (max-width: 768px) {
  .nina-header {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .nina-title {
    font-size: 2rem;
  }
  
  .metrics-grid,
  .capabilities-grid,
  .nina-articles {
    grid-template-columns: 1fr;
  }
  
  .interaction-options {
    grid-template-columns: 1fr;
  }
}
</style> 