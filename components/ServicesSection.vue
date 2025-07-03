<template>
  <section id="services" class="services-section">
    <div class="container">
      <!-- En-tête de section -->
      <div class="section-header" ref="sectionHeader">
        <span class="section-badge">Services</span>
        <h2 class="section-title">
          Comment je peux vous 
          <span class="text-gradient">accompagner</span>
        </h2>
        <p class="section-description">
          Expertise technique et approche collaborative pour transformer 
          vos défis data en opportunités business.
        </p>
      </div>

      <!-- Services principaux -->
      <div class="services-grid" ref="servicesGrid">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="service-card"
          @mouseenter="startHoverAnimation"
          @mouseleave="endHoverAnimation"
        >
          <div class="service-icon">
            <Icon :name="service.icon" />
          </div>
          
          <div class="service-content">
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>
            
            <div class="service-features">
              <h4>Inclus dans cette offre :</h4>
              <ul>
                <li v-for="feature in service.features" :key="feature">
                  <Icon name="mdi:check-circle" />
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
          
          <div class="service-footer">
            <div class="service-price">
              <span class="price">{{ service.price }}</span>
              <span class="duration">{{ service.duration }}</span>
            </div>
            <button class="btn-service">
              <Icon name="mdi:arrow-right" />
              Demander un devis
            </button>
          </div>
        </div>
      </div>

      <!-- Processus de travail -->
      <div class="process-section" ref="processSection">
        <h3 class="process-title">Mon processus de travail</h3>
        <div class="process-timeline">
          <div 
            v-for="(step, index) in processSteps" 
            :key="step.id"
            class="process-step"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <div class="step-icon">
                <Icon :name="step.icon" />
              </div>
              <h4 class="step-title">{{ step.title }}</h4>
              <p class="step-description">{{ step.description }}</p>
              <div class="step-duration">{{ step.duration }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Témoignages/Résultats -->
      <div class="results-section" ref="resultsSection">
        <h3 class="results-title">Résultats obtenus</h3>
        <div class="results-grid">
          <div 
            v-for="result in results" 
            :key="result.id"
            class="result-card"
          >
            <div class="result-metric">
              <span class="metric-value">{{ result.value }}</span>
              <span class="metric-unit">{{ result.unit }}</span>
            </div>
            <p class="result-description">{{ result.description }}</p>
            <div class="result-context">{{ result.context }}</div>
          </div>
        </div>
      </div>

      <!-- Call to action -->
      <div class="cta-section" ref="ctaSection">
        <div class="cta-content">
          <h3 class="cta-title">Prêt à démarrer votre projet ?</h3>
          <p class="cta-description">
            Discutons de vos besoins et trouvons ensemble la meilleure solution 
            pour vos défis techniques.
          </p>
          <div class="cta-actions">
            <button class="btn-primary cta-btn">
              <Icon name="mdi:calendar" />
              Planifier un appel
            </button>
            <button class="btn-secondary cta-btn">
              <Icon name="mdi:email" />
              Envoyer un message
            </button>
          </div>
        </div>
        <div class="cta-features">
          <div class="cta-feature">
            <Icon name="mdi:clock-fast" />
            <span>Réponse sous 24h</span>
          </div>
          <div class="cta-feature">
            <Icon name="mdi:handshake" />
            <span>Consultation gratuite</span>
          </div>
          <div class="cta-feature">
            <Icon name="mdi:shield-check" />
            <span>Confidentialité garantie</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const sectionHeader = ref()
const servicesGrid = ref()
const processSection = ref()
const resultsSection = ref()
const ctaSection = ref()

// Services proposés
const services = [
  {
    id: 1,
    icon: 'mdi:robot',
    title: 'Développement d\'Agents IA',
    description: 'Création d\'agents conversationnels intelligents comme Nina AI, avec NLP avancé et intégration multi-plateforme.',
    features: ['Agents conversationnels', 'NLP & NLU', 'Intégration API', 'Formation personnalisée'],
    price: '4500€',
    duration: '3-6 semaines',
    popular: true
  },
  {
    id: 2,
    icon: 'mdi:brain',
    title: 'Solutions IA Personnalisées',
    description: 'Développement de modèles IA sur mesure : classification, prédiction, recommandation, analyse de sentiments.',
    features: ['Modèles ML/DL', 'Fine-tuning', 'Déploiement cloud', 'Monitoring'],
    price: '3500€',
    duration: '4-8 semaines',
    popular: false
  },
  {
    id: 3,
    icon: 'mdi:database-cog',
    title: 'Pipeline Data pour IA',
    description: 'Architecture complète de données pour alimenter vos modèles IA : ETL, preprocessing, feature engineering.',
    features: ['ETL automatisé', 'Data quality', 'Feature store', 'Monitoring'],
    price: '2800€',
    duration: '2-4 semaines',
    popular: false
  },
  {
    id: 4,
    icon: 'mdi:api',
    title: 'API & Intégrations IA',
    description: 'Développement d\'APIs pour vos modèles IA, intégrations avec OpenAI, Anthropic, et autres services.',
    features: ['API REST/GraphQL', 'Authentification', 'Rate limiting', 'Documentation'],
    price: '2200€',
    duration: '2-3 semaines',
    popular: false
  },
  {
    id: 5,
    icon: 'mdi:school',
    title: 'Formation & Consulting IA',
    description: 'Formation de vos équipes aux technologies IA, audit de vos projets, et conseil stratégique.',
    features: ['Formation équipes', 'Audit projets', 'Stratégie IA', 'Best practices'],
    price: '1200€/jour',
    duration: 'Sur mesure',
    popular: false
  },
  {
    id: 6,
    icon: 'mdi:cog',
    title: 'Maintenance & Support IA',
    description: 'Maintenance de vos modèles IA, monitoring des performances, mises à jour et optimisations.',
    features: ['Monitoring 24/7', 'Optimisations', 'Mises à jour', 'Support technique'],
    price: '1800€/mois',
    duration: 'Continu',
    popular: false
  }
]

// Processus de travail
const processSteps = [
  {
    id: 1,
    title: 'Découverte & Analyse',
    description: 'Compréhension approfondie de vos besoins, contraintes et objectifs business.',
    icon: 'mdi:magnify',
    duration: '1-2 semaines'
  },
  {
    id: 2,
    title: 'Conception & Architecture',
    description: 'Définition de l\'architecture technique et du plan de développement détaillé.',
    icon: 'mdi:draw',
    duration: '1 semaine'
  },
  {
    id: 3,
    title: 'Développement & Tests',
    description: 'Implémentation avec méthodologie agile et tests continus pour garantir la qualité.',
    icon: 'mdi:code-tags',
    duration: '2-8 semaines'
  },
  {
    id: 4,
    title: 'Déploiement & Formation',
    description: 'Mise en production sécurisée et formation de vos équipes pour l\'autonomie.',
    icon: 'mdi:rocket-launch',
    duration: '1 semaine'
  },
  {
    id: 5,
    title: 'Suivi & Optimisation',
    description: 'Monitoring post-déploiement et optimisations continues basées sur les métriques.',
    icon: 'mdi:chart-line',
    duration: 'Continu'
  }
]

// Résultats obtenus
const results = [
  {
    id: 1,
    value: '2TB',
    unit: '/jour',
    description: 'Données traitées automatiquement',
    context: 'Pipeline Big Data'
  },
  {
    id: 2,
    value: '80%',
    unit: '',
    description: 'Réduction du temps de déploiement',
    context: 'Automatisation DevOps'
  },
  {
    id: 3,
    value: '99.9%',
    unit: '',
    description: 'Disponibilité des systèmes',
    context: 'Monitoring & Alertes'
  },
  {
    id: 4,
    value: '50%',
    unit: '',
    description: 'Réduction des coûts cloud',
    context: 'Migration & Optimisation'
  }
]

// Méthodes
const startHoverAnimation = (event: MouseEvent) => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  const card = event.currentTarget as HTMLElement
  $gsap.gsap.to(card, {
    y: -10,
    duration: 0.3,
    ease: 'power2.out'
  })
}

const endHoverAnimation = (event: MouseEvent) => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  const card = event.currentTarget as HTMLElement
  $gsap.gsap.to(card, {
    y: 0,
    duration: 0.3,
    ease: 'power2.out'
  })
}

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  // Animations d'entrée
  $gsap.gsap.from(sectionHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: sectionHeader.value,
      start: 'top 80%'
    }
  })

  $gsap.gsap.from('.service-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: servicesGrid.value,
      start: 'top 80%'
    }
  })

  $gsap.gsap.from('.process-step', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: processSection.value,
      start: 'top 80%'
    }
  })

  $gsap.gsap.from('.result-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: resultsSection.value,
      start: 'top 80%'
    }
  })

  $gsap.gsap.from(ctaSection.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ctaSection.value,
      start: 'top 80%'
    }
  })
})
</script>

<style scoped>
.services-section {
  padding: var(--space-32) 0;
  background: var(--bg-primary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-16);
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

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-20);
}

.service-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  position: relative;
  transition: all var(--transition-base);
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
}

.service-card:hover {
  border-color: var(--accent-primary);
  box-shadow: var(--shadow-xl);
}

.service-icon {
  width: 70px;
  height: 70px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  margin-bottom: var(--space-6);
}

.service-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.service-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

.service-features {
  list-style: none;
  padding: 0;
  margin-bottom: var(--space-6);
}

.service-features li {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) 0;
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.service-features svg {
  color: var(--accent-primary);
  font-size: 16px;
  flex-shrink: 0;
}

.service-footer {
  border-top: 1px solid var(--border-primary);
  padding-top: var(--space-4);
}

.service-price {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.price {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--accent-primary);
  font-family: var(--font-heading);
}

.duration {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.btn-service {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-lg);
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-base);
  border: none;
  cursor: pointer;
  font-size: var(--text-base);
}

/* Processus */
.process-section {
  margin-bottom: var(--space-20);
}

.process-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  text-align: center;
  margin-bottom: var(--space-12);
  color: var(--text-primary);
}

.process-timeline {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  max-width: 800px;
  margin: 0 auto;
}

.process-step {
  display: flex;
  align-items: flex-start;
  gap: var(--space-6);
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: var(--text-lg);
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-icon {
  color: var(--accent-primary);
  font-size: 24px;
  margin-bottom: var(--space-2);
}

.step-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.step-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-3);
}

.step-duration {
  font-size: var(--text-sm);
  color: var(--accent-primary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Résultats */
.results-section {
  margin-bottom: var(--space-20);
}

.results-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  text-align: center;
  margin-bottom: var(--space-12);
  color: var(--text-primary);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
}

.result-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  text-align: center;
  transition: all var(--transition-base);
}

.result-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.result-metric {
  margin-bottom: var(--space-4);
}

.metric-value {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--accent-primary);
  font-family: var(--font-heading);
}

.metric-unit {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  font-weight: 500;
}

.result-description {
  font-size: var(--text-base);
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: var(--space-2);
}

.result-context {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* CTA Section */
.cta-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-12);
  text-align: center;
}

.cta-title {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.cta-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-8);
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  border-radius: var(--radius-lg);
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-base);
  border: none;
  cursor: pointer;
  font-size: var(--text-base);
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-secondary:hover {
  background: var(--bg-primary);
  border-color: var(--accent-primary);
}

.cta-features {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.cta-feature {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.cta-feature svg {
  color: var(--accent-primary);
  font-size: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .process-step {
    flex-direction: column;
    text-align: center;
  }

  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  .cta-features {
    flex-direction: column;
    gap: var(--space-4);
  }
}

@media (max-width: 480px) {
  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style> 