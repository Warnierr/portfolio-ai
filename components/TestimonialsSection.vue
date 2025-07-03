<template>
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <!-- En-tête de section -->
      <div class="section-header" ref="sectionHeader">
        <span class="section-badge">Témoignages</span>
        <h2 class="section-title">
          Ce que disent mes 
          <span class="text-gradient">clients</span>
        </h2>
        <p class="section-description">
          Découvrez les retours d'expérience de clients satisfaits 
          qui ont fait confiance à mon expertise.
        </p>
      </div>

      <!-- Statistiques -->
      <div class="stats-grid" ref="statsGrid">
        <div class="stat-card" v-for="stat in stats" :key="stat.id">
          <div class="stat-icon">
            <Icon :name="stat.icon" />
          </div>
          <div class="stat-content">
            <div class="stat-number" :data-target="stat.value">0</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Carousel de témoignages -->
      <div class="testimonials-carousel" ref="carouselContainer">
        <div class="testimonials-wrapper" ref="testimonialsWrapper">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="testimonial.id"
            class="testimonial-card"
            :class="{ 
              'active': index === currentTestimonial,
              'prev': index === (currentTestimonial - 1 + testimonials.length) % testimonials.length,
              'next': index === (currentTestimonial + 1) % testimonials.length
            }"
            @click="setActiveTestimonial(index)"
          >
            <div class="testimonial-content">
              <!-- Quote -->
              <div class="testimonial-quote">
                <Icon name="mdi:format-quote-open" class="quote-icon" />
                <p class="testimonial-text">{{ testimonial.content }}</p>
              </div>

              <!-- Rating -->
              <div class="testimonial-rating">
                <div class="stars">
                  <Icon 
                    v-for="n in 5" 
                    :key="n"
                    name="mdi:star" 
                    :class="{ 'filled': n <= testimonial.rating }"
                  />
                </div>
                <span class="rating-text">{{ testimonial.rating }}/5</span>
              </div>

              <!-- Author -->
              <div class="testimonial-author">
                <div class="author-avatar">
                  <img 
                    v-if="testimonial.avatar" 
                    :src="testimonial.avatar" 
                    :alt="testimonial.name"
                  />
                  <div v-else class="avatar-placeholder">
                    {{ testimonial.name.charAt(0) }}
                  </div>
                </div>
                <div class="author-info">
                  <h4 class="author-name">{{ testimonial.name }}</h4>
                  <p class="author-role">{{ testimonial.role }}</p>
                  <p class="author-company">{{ testimonial.company }}</p>
                </div>
              </div>

              <!-- Project info -->
              <div class="testimonial-project">
                <div class="project-tag">
                  <Icon :name="testimonial.projectIcon" />
                  {{ testimonial.projectType }}
                </div>
                <div class="project-duration">{{ testimonial.duration }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="carousel-navigation">
          <button 
            class="nav-btn prev-btn" 
            @click="previousTestimonial"
            :disabled="isAnimating"
          >
            <Icon name="mdi:chevron-left" />
          </button>
          
          <div class="carousel-dots">
            <button 
              v-for="(_, index) in testimonials" 
              :key="index"
              class="dot"
              :class="{ active: index === currentTestimonial }"
              @click="setActiveTestimonial(index)"
            ></button>
          </div>
          
          <button 
            class="nav-btn next-btn" 
            @click="nextTestimonial"
            :disabled="isAnimating"
          >
            <Icon name="mdi:chevron-right" />
          </button>
        </div>
      </div>

      <!-- Logos clients -->
      <div class="clients-logos" ref="clientsLogos">
        <h3>Ils me font confiance</h3>
        <div class="logos-grid">
          <div 
            v-for="client in clients" 
            :key="client.id"
            class="client-logo"
            :title="client.name"
          >
            <img v-if="client.logo" :src="client.logo" :alt="client.name" />
            <div v-else class="logo-placeholder">{{ client.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { usePageTransitions } from '~/composables/usePageTransitions'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
  projectType: string
  projectIcon: string
  duration: string
}

interface Stat {
  id: string
  icon: string
  value: number
  label: string
}

interface Client {
  id: string
  name: string
  logo?: string
}

// Refs
const sectionHeader = ref()
const statsGrid = ref()
const carouselContainer = ref()
const testimonialsWrapper = ref()
const clientsLogos = ref()

// État du carousel
const currentTestimonial = ref(0)
const isAnimating = ref(false)
const autoPlayInterval = ref<NodeJS.Timeout>()

// Données des témoignages
const testimonials: Testimonial[] = [
  {
    id: 'temoignage-1',
    name: 'Sarah Martinez',
    role: 'Directrice E-commerce',
    company: 'Nomah Store',
    content: 'Raouf a transformé notre approche data avec une solution IA qui a augmenté nos conversions de 40%. Son expertise technique et sa compréhension business sont exceptionnelles.',
    rating: 5,
    projectType: 'E-commerce IA',
    projectIcon: 'mdi:shopping',
    duration: '3 mois'
  },
  {
    id: 'temoignage-2',
    name: 'Thomas Dubois',
    role: 'CTO',
    company: 'TechFlow Solutions',
    content: 'Un développeur rare qui combine excellence technique et vision stratégique. Les pipelines de données qu\'il a conçus ont révolutionné notre architecture.',
    rating: 5,
    projectType: 'Data Engineering',
    projectIcon: 'mdi:database',
    duration: '6 mois'
  },
  {
    id: 'temoignage-3',
    name: 'Marie Leroy',
    role: 'Product Manager',
    company: 'InnovateLab',
    content: 'Collaboration exceptionnelle sur notre projet d\'automatisation. Raouf a livré une solution robuste qui nous fait gagner 15h/semaine d\'opérations manuelles.',
    rating: 5,
    projectType: 'Automatisation',
    projectIcon: 'mdi:robot',
    duration: '2 mois'
  },
  {
    id: 'temoignage-4',
    name: 'David Chen',
    role: 'Data Scientist',
    company: 'Analytics Pro',
    content: 'Raouf maîtrise parfaitement l\'écosystème data moderne. Ses recommandations d\'architecture ont optimisé nos performances de 300%.',
    rating: 5,
    projectType: 'Data Science',
    projectIcon: 'mdi:chart-line',
    duration: '4 mois'
  }
]

// Statistiques
const stats: Stat[] = [
  {
    id: 'projets',
    icon: 'mdi:rocket-launch',
    value: 25,
    label: 'Projets réalisés'
  },
  {
    id: 'clients',
    icon: 'mdi:account-group',
    value: 15,
    label: 'Clients satisfaits'
  },
  {
    id: 'satisfaction',
    icon: 'mdi:star',
    value: 98,
    label: '% Satisfaction'
  },
  {
    id: 'support',
    icon: 'mdi:headset',
    value: 24,
    label: 'Support 24/7'
  }
]

// Logos clients
const clients: Client[] = [
  { id: 'nomah', name: 'Nomah Store' },
  { id: 'techflow', name: 'TechFlow' },
  { id: 'innovate', name: 'InnovateLab' },
  { id: 'analytics', name: 'Analytics Pro' },
  { id: 'datatech', name: 'DataTech' },
  { id: 'smartsol', name: 'SmartSol' }
]

// Navigation du carousel
const nextTestimonial = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length
  
  setTimeout(() => {
    isAnimating.value = false
  }, 800)
}

const previousTestimonial = () => {
  if (isAnimating.value) return
  
  isAnimating.value = true
  currentTestimonial.value = (currentTestimonial.value - 1 + testimonials.length) % testimonials.length
  
  setTimeout(() => {
    isAnimating.value = false
  }, 800)
}

const setActiveTestimonial = (index: number) => {
  if (isAnimating.value || index === currentTestimonial.value) return
  
  isAnimating.value = true
  currentTestimonial.value = index
  
  setTimeout(() => {
    isAnimating.value = false
  }, 800)
}

// Auto-play
const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextTestimonial()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
}

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  const { animateCounter, staggeredAppear } = usePageTransitions()

  // Animation d'entrée de la section
  $gsap.gsap.from(sectionHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: sectionHeader.value,
      start: 'top 80%'
    }
  })

  // Animation des statistiques avec compteurs
  $gsap.gsap.from('.stat-card', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: statsGrid.value,
      start: 'top 80%',
      onEnter: () => {
        // Animer les compteurs
        stats.forEach(stat => {
          animateCounter(`[data-target="${stat.value}"]`, stat.value)
        })
      }
    }
  })

  // Animation du carousel
  $gsap.gsap.from('.testimonial-card', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: carouselContainer.value,
      start: 'top 80%'
    }
  })

  // Animation des logos clients
  staggeredAppear('.client-logo', {
    direction: 'up',
    stagger: 0.1,
    duration: 0.6
  })

  // Démarrer l'auto-play
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.testimonials-section {
  padding: var(--space-32) 0;
  background: var(--bg-secondary);
  position: relative;
  overflow: hidden;
}

.testimonials-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
}

/* En-tête de section */
.section-header {
  text-align: center;
  margin-bottom: var(--space-20);
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

/* Statistiques */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-20);
}

.stat-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  text-align: center;
  transition: all var(--transition-base);
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
  color: white;
  font-size: 24px;
}

.stat-number {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  font-family: var(--font-heading);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

/* Carousel de témoignages */
.testimonials-carousel {
  position: relative;
  margin-bottom: var(--space-20);
}

.testimonials-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 500px;
  perspective: 1000px;
}

.testimonial-card {
  position: absolute;
  width: 100%;
  max-width: 600px;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-10);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  transform-style: preserve-3d;
}

.testimonial-card:not(.active) {
  opacity: 0.6;
  transform: scale(0.9) translateZ(-100px);
  pointer-events: none;
}

.testimonial-card.active {
  opacity: 1;
  transform: scale(1) translateZ(0);
  box-shadow: var(--shadow-2xl);
  border-color: var(--accent-primary);
  z-index: 10;
}

.testimonial-card.prev {
  transform: scale(0.8) translateX(-50%) rotateY(25deg);
}

.testimonial-card.next {
  transform: scale(0.8) translateX(50%) rotateY(-25deg);
}

.testimonial-content {
  text-align: center;
}

.testimonial-quote {
  margin-bottom: var(--space-8);
  position: relative;
}

.quote-icon {
  font-size: 48px;
  color: var(--accent-primary);
  opacity: 0.3;
  position: absolute;
  top: -20px;
  left: -20px;
}

.testimonial-text {
  font-size: var(--text-lg);
  line-height: 1.6;
  color: var(--text-primary);
  font-style: italic;
  margin-left: var(--space-6);
}

.testimonial-rating {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.stars {
  display: flex;
  gap: var(--space-1);
}

.stars svg {
  font-size: 20px;
  color: var(--color-gray-400);
  transition: color 0.3s ease;
}

.stars svg.filled {
  color: var(--color-yellow-400);
}

.rating-text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-primary);
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-xl);
  font-weight: 700;
}

.author-info {
  text-align: left;
}

.author-name {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.author-role {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.author-company {
  font-size: var(--text-sm);
  color: var(--accent-primary);
  font-weight: 500;
}

.testimonial-project {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background: rgba(99, 102, 241, 0.1);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.project-tag {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--accent-primary);
  font-weight: 500;
}

.project-duration {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* Navigation du carousel */
.carousel-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
  margin-top: var(--space-8);
}

.nav-btn {
  width: 50px;
  height: 50px;
  border: 2px solid var(--border-primary);
  border-radius: 50%;
  background: var(--bg-primary);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
}

.nav-btn:hover:not(:disabled) {
  border-color: var(--accent-primary);
  background: var(--accent-primary);
  color: white;
  transform: scale(1.1);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-dots {
  display: flex;
  gap: var(--space-3);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: var(--color-gray-400);
  cursor: pointer;
  transition: all var(--transition-base);
}

.dot.active {
  background: var(--accent-primary);
  transform: scale(1.2);
}

/* Logos clients */
.clients-logos {
  text-align: center;
}

.clients-logos h3 {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-8);
}

.logos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-6);
  align-items: center;
}

.client-logo {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  cursor: pointer;
}

.client-logo:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.client-logo img {
  max-width: 100%;
  max-height: 50px;
  object-fit: contain;
  filter: grayscale(1);
  transition: filter var(--transition-base);
}

.client-logo:hover img {
  filter: grayscale(0);
}

.logo-placeholder {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-secondary);
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .testimonials-wrapper {
    height: 600px;
  }
  
  .testimonial-card {
    padding: var(--space-6);
  }
  
  .testimonial-card.prev,
  .testimonial-card.next {
    display: none;
  }
  
  .testimonial-author {
    flex-direction: column;
    text-align: center;
  }
  
  .author-info {
    text-align: center;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .logos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .carousel-navigation {
    gap: var(--space-4);
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
  }
}
</style> 