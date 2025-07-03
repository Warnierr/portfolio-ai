<template>
  <section id="roadmap" class="roadmap-section">
    <div class="container">
      <!-- En-tête de section -->
      <div class="section-header" ref="sectionHeader">
        <span class="section-badge">Roadmap 2025</span>
        <h2 class="section-title">
          L'évolution de mon 
          <span class="text-gradient">portfolio</span>
        </h2>
        <p class="section-description">
          Découvrez les innovations à venir et l'évolution continue 
          de mes projets IA et technologies émergentes.
        </p>
      </div>

      <!-- Timeline interactive -->
      <div class="timeline-container" ref="timelineContainer">
        <div class="timeline-line" ref="timelineLine"></div>
        
        <div 
          v-for="(phase, index) in roadmapPhases" 
          :key="phase.id"
          class="timeline-item"
          :class="{ 
            'completed': phase.status === 'completed',
            'in-progress': phase.status === 'in-progress',
            'planned': phase.status === 'planned'
          }"
          @click="selectPhase(phase)"
          ref="timelineItems"
        >
          <div class="timeline-marker">
            <div class="marker-inner">
              <Icon :name="phase.icon" />
            </div>
            <div class="marker-pulse" v-if="phase.status === 'in-progress'"></div>
          </div>
          
          <div class="timeline-content">
            <div class="timeline-date">{{ phase.period }}</div>
            <h3 class="timeline-title">{{ phase.title }}</h3>
            <p class="timeline-description">{{ phase.description }}</p>
            
            <!-- Métriques de progression -->
            <div class="progress-metrics" v-if="phase.metrics">
              <div class="metric-item" v-for="metric in phase.metrics" :key="metric.label">
                <span class="metric-label">{{ metric.label }}</span>
                <div class="metric-bar">
                  <div 
                    class="metric-progress" 
                    :style="{ width: `${metric.value}%` }"
                    :data-value="metric.value"
                  ></div>
                </div>
                <span class="metric-value">{{ metric.value }}%</span>
              </div>
            </div>
            
            <!-- Technologies utilisées -->
            <div class="tech-stack" v-if="phase.technologies">
              <div class="tech-label">Technologies clés :</div>
              <div class="tech-tags">
                <span 
                  v-for="tech in phase.technologies" 
                  :key="tech"
                  class="tech-tag"
                  :class="getTechLevel(tech)"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Détails de la phase sélectionnée -->
      <div class="phase-details" v-if="selectedPhase" ref="phaseDetails">
        <div class="details-header">
          <div class="details-icon">
            <Icon :name="selectedPhase.icon" />
          </div>
          <div class="details-info">
            <h3>{{ selectedPhase.title }}</h3>
            <p>{{ selectedPhase.period }} • {{ getStatusLabel(selectedPhase.status) }}</p>
          </div>
          <button @click="selectedPhase = null" class="close-details">
            <Icon name="mdi:close" />
          </button>
        </div>
        
        <div class="details-content">
          <div class="details-grid">
            <!-- Objectifs -->
            <div class="detail-section">
              <h4>🎯 Objectifs</h4>
              <ul class="objectives-list">
                <li v-for="objective in selectedPhase.objectives" :key="objective">
                  {{ objective }}
                </li>
              </ul>
            </div>
            
            <!-- Livrables -->
            <div class="detail-section">
              <h4>📦 Livrables</h4>
              <div class="deliverables-grid">
                <div 
                  v-for="deliverable in selectedPhase.deliverables" 
                  :key="deliverable.name"
                  class="deliverable-card"
                  :class="{ 'completed': deliverable.completed }"
                >
                  <Icon :name="deliverable.completed ? 'mdi:check-circle' : 'mdi:clock-outline'" />
                  <span>{{ deliverable.name }}</span>
                </div>
              </div>
            </div>
            
            <!-- Impact attendu -->
            <div class="detail-section full-width">
              <h4>📈 Impact attendu</h4>
              <div class="impact-metrics">
                <div 
                  v-for="impact in selectedPhase.impact" 
                  :key="impact.metric"
                  class="impact-card"
                >
                  <div class="impact-value">{{ impact.value }}</div>
                  <div class="impact-label">{{ impact.metric }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques globales -->
      <div class="roadmap-stats" ref="roadmapStats">
        <h3>Progression globale</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">
              <Icon name="mdi:check-circle" />
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ completedPhases }}</div>
              <div class="stat-label">Phases terminées</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <Icon name="mdi:progress-clock" />
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ inProgressPhases }}</div>
              <div class="stat-label">En cours</div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon">
              <Icon name="mdi:calendar-clock" />
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ plannedPhases }}</div>
              <div class="stat-label">Planifiées</div>
            </div>
          </div>
          
          <div class="stat-card highlight">
            <div class="stat-icon">
              <Icon name="mdi:trending-up" />
            </div>
            <div class="stat-content">
              <div class="stat-number">{{ overallProgress }}%</div>
              <div class="stat-label">Progression totale</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vision future -->
      <div class="future-vision" ref="futureVision">
        <h3>🔮 Vision 2025-2026</h3>
        <div class="vision-content">
          <p>
            Mon objectif est de créer un écosystème technologique complet 
            combinant IA avancée, expériences immersives et innovation continue. 
            Chaque phase de cette roadmap contribue à bâtir l'avenir de 
            l'interaction homme-machine.
          </p>
          
          <div class="vision-pillars">
            <div class="pillar">
              <Icon name="mdi:brain" />
              <h4>IA Conversationnelle</h4>
              <p>Agents intelligents et interactions naturelles</p>
            </div>
            <div class="pillar">
              <Icon name="mdi:virtual-reality" />
              <h4>Expériences Immersives</h4>
              <p>WebXR, métaverse et réalités mixtes</p>
            </div>
            <div class="pillar">
              <Icon name="mdi:rocket-launch" />
              <h4>Innovation Continue</h4>
              <p>Technologies émergentes et R&D</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

interface RoadmapPhase {
  id: string
  title: string
  description: string
  period: string
  status: 'completed' | 'in-progress' | 'planned'
  icon: string
  technologies?: string[]
  metrics?: Array<{
    label: string
    value: number
  }>
  objectives?: string[]
  deliverables?: Array<{
    name: string
    completed: boolean
  }>
  impact?: Array<{
    metric: string
    value: string
  }>
}

// Refs
const sectionHeader = ref()
const timelineContainer = ref()
const timelineLine = ref()
const timelineItems = ref([])
const phaseDetails = ref()
const roadmapStats = ref()
const futureVision = ref()

const selectedPhase = ref<RoadmapPhase | null>(null)

// Données de la roadmap
const roadmapPhases = ref<RoadmapPhase[]>([
  {
    id: 'foundation',
    title: 'Foundation IA',
    description: 'Mise en place des bases avec Nina AI et optimisations',
    period: 'Janvier 2025',
    status: 'completed',
    icon: 'mdi:foundation',
    technologies: ['Vue.js', 'Nuxt 3', 'GSAP', 'Three.js', 'Nina AI'],
    metrics: [
      { label: 'Portfolio', value: 100 },
      { label: 'Nina AI', value: 100 },
      { label: 'Performance', value: 95 }
    ],
    objectives: [
      'Portfolio moderne et performant',
      'Agent Nina AI fonctionnel',
      'Optimisations SEO et accessibilité',
      'Déploiement production'
    ],
    deliverables: [
      { name: 'Portfolio Nuxt 3', completed: true },
      { name: 'Agent Nina AI', completed: true },
      { name: 'Animations GSAP', completed: true },
      { name: 'Effets WebGL', completed: true }
    ],
    impact: [
      { metric: 'Performance Score', value: '95+' },
      { metric: 'Temps de chargement', value: '<1s' },
      { metric: 'Engagement utilisateur', value: '+200%' }
    ]
  },
  {
    id: 'interactive-ai',
    title: 'IA Interactive',
    description: 'Amélioration de Nina AI et intégration de fonctionnalités avancées',
    period: 'Février 2025',
    status: 'in-progress',
    icon: 'mdi:robot-excited',
    technologies: ['OpenAI', 'LangChain', 'WebSpeech API', 'WebRTC'],
    metrics: [
      { label: 'Nina AI v2', value: 75 },
      { label: 'Chatbot intégré', value: 60 },
      { label: 'Voice AI', value: 40 }
    ],
    objectives: [
      'Nina AI avec mémoire conversationnelle',
      'Intégration voice-to-text',
      'Génération de contenu dynamique',
      'Personnalisation avancée'
    ],
    deliverables: [
      { name: 'Nina AI v2.0', completed: false },
      { name: 'Voice Recognition', completed: false },
      { name: 'Content Generator', completed: false },
      { name: 'User Profiling', completed: false }
    ],
    impact: [
      { metric: 'Conversations/jour', value: '500+' },
      { metric: 'Satisfaction utilisateur', value: '90%' },
      { metric: 'Temps d\'engagement', value: '+300%' }
    ]
  },
  {
    id: 'immersive-web',
    title: 'Web Immersif',
    description: 'WebXR, métaverse et expériences 3D avancées',
    period: 'Mars 2025',
    status: 'planned',
    icon: 'mdi:virtual-reality',
    technologies: ['WebXR', 'A-Frame', 'Blockchain', 'Web3', 'AR.js'],
    metrics: [
      { label: 'WebXR Ready', value: 0 },
      { label: 'VR Experience', value: 0 },
      { label: 'Web3 Integration', value: 0 }
    ],
    objectives: [
      'Portfolio en réalité virtuelle',
      'Intégration blockchain/NFT',
      'Expériences AR interactives',
      'Métaverse personnel'
    ],
    deliverables: [
      { name: 'VR Portfolio', completed: false },
      { name: 'AR Business Card', completed: false },
      { name: 'NFT Collection', completed: false },
      { name: 'Metaverse Space', completed: false }
    ],
    impact: [
      { metric: 'Expériences immersives', value: '10+' },
      { metric: 'Temps en VR', value: '15min+' },
      { metric: 'Innovation score', value: '100%' }
    ]
  },
  {
    id: 'ux-revolution',
    title: 'UX Révolutionnaire',
    description: 'Interface révolutionnaire avec IA prédictive et accessibility extrême',
    period: 'Avril 2025',
    status: 'planned',
    icon: 'mdi:magic-staff',
    technologies: ['Eye Tracking', 'Gesture Control', 'Brain-Computer Interface', 'Accessibility AI'],
    objectives: [
      'Navigation par gestes et regard',
      'IA prédictive d\'interface',
      'Accessibilité universelle',
      'Personnalisation extrême'
    ],
    deliverables: [
      { name: 'Gesture Navigation', completed: false },
      { name: 'Eye Tracking', completed: false },
      { name: 'Predictive UI', completed: false },
      { name: 'Universal Access', completed: false }
    ],
    impact: [
      { metric: 'Accessibilité', value: '100%' },
      { metric: 'UX Innovation', value: 'Breakthrough' },
      { metric: 'Inclusion', value: 'Universal' }
    ]
  },
  {
    id: 'analytics-optimization',
    title: 'Analytics & Optimisation',
    description: 'Analyse avancée, RUM et optimisations basées sur l\'IA',
    period: 'Mai 2025',
    status: 'planned',
    icon: 'mdi:chart-line',
    technologies: ['Real User Monitoring', 'AI Analytics', 'Performance AI', 'Predictive Scaling'],
    objectives: [
      'RUM et analytics temps réel',
      'Optimisations automatiques par IA',
      'Prédiction des performances',
      'Scaling intelligent'
    ],
    deliverables: [
      { name: 'RUM Dashboard', completed: false },
      { name: 'AI Optimization', completed: false },
      { name: 'Performance Predictor', completed: false },
      { name: 'Auto Scaling', completed: false }
    ],
    impact: [
      { metric: 'Performance gain', value: '+50%' },
      { metric: 'Coûts réduits', value: '-30%' },
      { metric: 'Uptime', value: '99.99%' }
    ]
  },
  {
    id: 'bleeding-edge',
    title: 'Innovation Bleeding Edge',
    description: 'Technologies émergentes : WebGPU, IA générative, quantum computing',
    period: 'Juin 2025',
    status: 'planned',
    icon: 'mdi:rocket-launch',
    technologies: ['WebGPU', 'Quantum Computing', 'Generative AI', 'Neural Networks'],
    objectives: [
      'WebGPU pour calculs massifs',
      'IA générative intégrée',
      'Expérimentation quantum',
      'Neural network training'
    ],
    deliverables: [
      { name: 'WebGPU Compute', completed: false },
      { name: 'Generative AI', completed: false },
      { name: 'Quantum Experiments', completed: false },
      { name: 'Neural Training', completed: false }
    ],
    impact: [
      { metric: 'Innovation index', value: 'Maximum' },
      { metric: 'Future readiness', value: '100%' },
      { metric: 'Tech leadership', value: 'Pioneer' }
    ]
  }
])

// Computed properties
const completedPhases = computed(() => 
  roadmapPhases.value.filter(phase => phase.status === 'completed').length
)

const inProgressPhases = computed(() => 
  roadmapPhases.value.filter(phase => phase.status === 'in-progress').length
)

const plannedPhases = computed(() => 
  roadmapPhases.value.filter(phase => phase.status === 'planned').length
)

const overallProgress = computed(() => {
  const total = roadmapPhases.value.length
  const completed = completedPhases.value
  const inProgress = inProgressPhases.value * 0.5
  return Math.round(((completed + inProgress) / total) * 100)
})

// Méthodes
const selectPhase = (phase: RoadmapPhase) => {
  selectedPhase.value = phase
  
  nextTick(() => {
    if (phaseDetails.value) {
      phaseDetails.value.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      })
    }
  })
}

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'completed': '✅ Terminé',
    'in-progress': '🚧 En cours',
    'planned': '📅 Planifié'
  }
  return labels[status] || status
}

const getTechLevel = (tech: string): string => {
  const levels: Record<string, string> = {
    'Vue.js': 'expert',
    'Nuxt 3': 'expert', 
    'GSAP': 'advanced',
    'Three.js': 'advanced',
    'Nina AI': 'expert',
    'OpenAI': 'advanced',
    'WebXR': 'experimental',
    'Blockchain': 'learning'
  }
  return levels[tech] || 'standard'
}

// Animations
onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  // Animation d'entrée
  $gsap.gsap.from(sectionHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: sectionHeader.value,
      start: 'top 80%'
    }
  })

  // Animation de la timeline
  $gsap.gsap.from('.timeline-item', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: timelineContainer.value,
      start: 'top 80%'
    }
  })

  // Animation de la ligne de temps
  $gsap.gsap.from(timelineLine.value, {
    scaleY: 0,
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: timelineContainer.value,
      start: 'top 80%'
    }
  })

  // Animation des statistiques
  $gsap.gsap.from('.stat-card', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: roadmapStats.value,
      start: 'top 80%'
    }
  })
})
</script>

<style scoped>
.roadmap-section {
  padding: var(--space-32) 0;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  position: relative;
  overflow: hidden;
}

.roadmap-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="rgba(99,102,241,0.1)"/></svg>') repeat;
  background-size: 50px 50px;
  opacity: 0.3;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-20);
  position: relative;
  z-index: 1;
}

.section-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--accent-primary);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: var(--space-6);
  font-family: var(--font-heading);
}

.section-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Timeline */
.timeline-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto var(--space-20);
}

.timeline-line {
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, var(--accent-primary), rgba(99, 102, 241, 0.3));
  border-radius: var(--radius-full);
  transform-origin: top;
}

.timeline-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: var(--space-6);
  margin-bottom: var(--space-12);
  cursor: pointer;
  transition: all var(--transition-base);
}

.timeline-item:hover {
  transform: translateX(10px);
}

.timeline-item.completed .timeline-marker .marker-inner {
  background: var(--success-color);
  border-color: var(--success-color);
}

.timeline-item.in-progress .timeline-marker .marker-inner {
  background: var(--warning-color);
  border-color: var(--warning-color);
}

.timeline-item.planned .timeline-marker .marker-inner {
  background: var(--bg-secondary);
  border-color: var(--border-primary);
}

.timeline-marker {
  position: relative;
  flex-shrink: 0;
}

.marker-inner {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid var(--accent-primary);
  background: var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  transition: all var(--transition-base);
}

.marker-pulse {
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  border: 2px solid var(--warning-color);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.3); opacity: 0; }
}

.timeline-content {
  flex: 1;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: all var(--transition-base);
}

.timeline-item:hover .timeline-content {
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.timeline-date {
  color: var(--accent-primary);
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.timeline-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.timeline-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

/* Métriques de progression */
.progress-metrics {
  margin-bottom: var(--space-4);
}

.metric-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.metric-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  min-width: 100px;
}

.metric-bar {
  flex: 1;
  height: 8px;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.metric-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  border-radius: var(--radius-full);
  transition: width 1s ease-out;
}

.metric-value {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--accent-primary);
  min-width: 40px;
  text-align: right;
}

/* Technologies */
.tech-stack {
  margin-top: var(--space-4);
}

.tech-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tech-tag {
  padding: var(--space-1) var(--space-3);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--text-secondary);
  transition: all var(--transition-base);
}

.tech-tag.expert {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  color: #065f46;
}

.tech-tag.advanced {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.3);
  color: #1e40af;
}

.tech-tag.experimental {
  background: rgba(168, 85, 247, 0.1);
  border-color: rgba(168, 85, 247, 0.3);
  color: #6b21a8;
}

/* Détails de phase */
.phase-details {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  margin-bottom: var(--space-16);
  animation: slideInUp 0.3s ease-out;
}

.details-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-primary);
}

.details-icon {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.details-info {
  flex: 1;
}

.details-info h3 {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.details-info p {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.close-details {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
}

.close-details:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.detail-section.full-width {
  grid-column: 1 / -1;
}

.detail-section h4 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.objectives-list {
  list-style: none;
  padding: 0;
}

.objectives-list li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  color: var(--text-secondary);
}

.objectives-list li::before {
  content: '🎯';
  font-size: 16px;
}

.deliverables-grid {
  display: grid;
  gap: var(--space-3);
}

.deliverable-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.deliverable-card.completed {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  color: #065f46;
}

.impact-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-4);
}

.impact-card {
  text-align: center;
  padding: var(--space-4);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
}

.impact-value {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--accent-primary);
  margin-bottom: var(--space-2);
}

.impact-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* Statistiques */
.roadmap-stats {
  margin-bottom: var(--space-16);
}

.roadmap-stats h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  text-align: center;
  margin-bottom: var(--space-8);
  color: var(--text-primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.stat-card.highlight {
  border-color: var(--accent-primary);
  background: rgba(99, 102, 241, 0.05);
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
}

.stat-number {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* Vision future */
.future-vision {
  text-align: center;
}

.future-vision h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-6);
  color: var(--text-primary);
}

.vision-content p {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto var(--space-8);
}

.vision-pillars {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.pillar {
  padding: var(--space-6);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  transition: all var(--transition-base);
}

.pillar:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.pillar svg {
  font-size: 48px;
  color: var(--accent-primary);
  margin-bottom: var(--space-4);
}

.pillar h4 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.pillar p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }
  
  .timeline-item {
    gap: var(--space-4);
  }
  
  .marker-inner {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
  
  .details-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .vision-pillars {
    grid-template-columns: 1fr;
  }
}
</style> 