<template>
  <section class="testimonials-section" ref="testimonialsSection">
    <div class="container">
      <!-- En-tête -->
      <div class="section-header" ref="sectionHeader">
        <span class="section-badge">Témoignages</span>
        <h2 class="section-title">
          Ce que disent mes <span class="text-gradient">clients</span>
        </h2>
        <p class="section-description">
          Découvrez les retours d'expérience de clients satisfaits qui ont fait confiance à mon expertise.
        </p>
      </div>

      <!-- Carousel 3D -->
      <div class="testimonials-carousel" ref="carousel">
        <div class="carousel-container" ref="carouselContainer">
          <div 
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            class="testimonial-card"
            :class="{ 
              'active': index === activeIndex,
              'prev': index === prevIndex,
              'next': index === nextIndex
            }"
            :style="getCardStyle(index)"
            ref="testimonialCards"
            @click="setActiveCard(index)"
          >
            <!-- Avatar et infos -->
            <div class="testimonial-header">
              <div class="testimonial-avatar">
                <Icon name="mdi:account-circle" size="80" />
                <div class="avatar-ring"></div>
              </div>
              <div class="testimonial-info">
                <h3 class="testimonial-name">{{ testimonial.name }}</h3>
                <p class="testimonial-role">{{ testimonial.role }}</p>
                <p class="testimonial-company">{{ testimonial.company }}</p>
              </div>
            </div>

            <!-- Évaluation -->
            <div class="testimonial-rating">
              <div class="stars">
                <Icon 
                  v-for="star in 5" 
                  :key="star"
                  name="mdi:star"
                  :class="{ 'filled': star <= testimonial.rating }"
                />
              </div>
              <span class="rating-text">{{ testimonial.rating }}/5</span>
            </div>

            <!-- Contenu -->
            <div class="testimonial-content">
              <blockquote>
                <Icon name="mdi:format-quote-open" class="quote-icon" />
                {{ testimonial.content }}
                <Icon name="mdi:format-quote-close" class="quote-icon" />
              </blockquote>
            </div>

            <!-- Projet associé -->
            <div class="testimonial-project" v-if="testimonial.project">
              <Icon name="mdi:folder-outline" />
              <span>Projet : {{ testimonial.project }}</span>
            </div>

            <!-- Date -->
            <div class="testimonial-date">
              <Icon name="mdi:calendar-outline" />
              <span>{{ formatDate(testimonial.date) }}</span>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="carousel-navigation">
          <button 
            class="nav-btn nav-prev"
            @click="prevCard"
            :disabled="isAnimating"
            data-cursor-text="Précédent"
            data-cursor-icon="mdi:arrow-left"
          >
            <Icon name="mdi:chevron-left" />
          </button>
          
          <div class="carousel-indicators">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              class="indicator"
              :class="{ active: index === activeIndex }"
              @click="setActiveCard(index)"
              :aria-label="`Témoignage ${index + 1}`"
            ></button>
          </div>
          
          <button 
            class="nav-btn nav-next"
            @click="nextCard"
            :disabled="isAnimating"
            data-cursor-text="Suivant"
            data-cursor-icon="mdi:arrow-right"
          >
            <Icon name="mdi:chevron-right" />
          </button>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="testimonials-stats" ref="statsRef">
        <div class="stat-item">
          <div class="stat-number">{{ stats.totalProjects }}</div>
          <div class="stat-label">Projets réalisés</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.averageRating }}</div>
          <div class="stat-label">Note moyenne</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.clientSatisfaction }}%</div>
          <div class="stat-label">Satisfaction client</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.repeatClients }}%</div>
          <div class="stat-label">Clients récurrents</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  project?: string
  date: string
}

// Données des témoignages
const testimonials = ref<Testimonial[]>([
  {
    id: '1',
    name: 'Marie Dubois',
    role: 'Directrice Marketing',
    company: 'TechCorp',
    content: 'Raouf a transformé notre approche data avec Nina AI. Les résultats ont dépassé nos attentes avec une augmentation de 40% de nos conversions.',
    rating: 5,
    project: 'Nina AI - Assistant Marketing',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'Jean-Pierre Martin',
    role: 'CEO',
    company: 'InnovateLab',
    content: 'Un développeur exceptionnel ! Son expertise en IA nous a permis d\'automatiser 70% de nos processus métier. Collaboration remarquable.',
    rating: 5,
    project: 'Automatisation IA',
    date: '2024-02-20'
  },
  {
    id: '3',
    name: 'Sophie Laurent',
    role: 'CTO',
    company: 'DataFlow',
    content: 'Architecture technique impeccable et livrables de qualité. Raouf maîtrise parfaitement les technologies modernes et les enjeux business.',
    rating: 5,
    project: 'Pipeline Big Data',
    date: '2024-03-10'
  },
  {
    id: '4',
    name: 'Thomas Berger',
    role: 'Product Manager',
    company: 'StartupAI',
    content: 'Accompagnement personnalisé et solutions sur-mesure. Nina AI a révolutionné notre service client avec 95% de satisfaction utilisateur.',
    rating: 5,
    project: 'Chatbot Nina AI',
    date: '2024-04-05'
  },
  {
    id: '5',
    name: 'Amélie Rousseau',
    role: 'Directrice Technique',
    company: 'DigitalNext',
    content: 'Expertise technique de haut niveau et approche méthodique. Le ROI de nos projets IA a été multiplié par 3 grâce à son intervention.',
    rating: 5,
    project: 'Optimisation IA',
    date: '2024-05-12'
  }
])

// Stats
const stats = ref({
  totalProjects: 47,
  averageRating: 4.9,
  clientSatisfaction: 98,
  repeatClients: 85
})

// Refs
const testimonialsSection = ref<HTMLElement>()
const sectionHeader = ref<HTMLElement>()
const carousel = ref<HTMLElement>()
const carouselContainer = ref<HTMLElement>()
const testimonialCards = ref<HTMLElement[]>([])
const statsRef = ref<HTMLElement>()

// State
const activeIndex = ref(0)
const isAnimating = ref(false)
const autoPlayInterval = ref<NodeJS.Timeout>()

// Computed
const prevIndex = computed(() => {
  return activeIndex.value === 0 ? testimonials.value.length - 1 : activeIndex.value - 1
})

const nextIndex = computed(() => {
  return activeIndex.value === testimonials.value.length - 1 ? 0 : activeIndex.value + 1
})

// Méthodes
const getCardStyle = (index: number) => {
  const isActive = index === activeIndex.value
  const isPrev = index === prevIndex.value
  const isNext = index === nextIndex.value
  
  let transform = 'translateX(0) translateZ(0) rotateY(0deg)'
  let opacity = 0.3
  let scale = 0.8
  let zIndex = 1
  
  if (isActive) {
    transform = 'translateX(0) translateZ(100px) rotateY(0deg)'
    opacity = 1
    scale = 1
    zIndex = 10
  } else if (isPrev) {
    transform = 'translateX(-120px) translateZ(0) rotateY(25deg)'
    opacity = 0.7
    scale = 0.9
    zIndex = 5
  } else if (isNext) {
    transform = 'translateX(120px) translateZ(0) rotateY(-25deg)'
    opacity = 0.7
    scale = 0.9
    zIndex = 5
  }
  
  return {
    transform,
    opacity,
    scale,
    zIndex
  }
}

const setActiveCard = (index: number) => {
  if (isAnimating.value || index === activeIndex.value) return
  
  isAnimating.value = true
  activeIndex.value = index
  
  animateCards()
  
  setTimeout(() => {
    isAnimating.value = false
  }, 600)
}

const nextCard = () => {
  const nextIdx = activeIndex.value === testimonials.value.length - 1 ? 0 : activeIndex.value + 1
  setActiveCard(nextIdx)
}

const prevCard = () => {
  const prevIdx = activeIndex.value === 0 ? testimonials.value.length - 1 : activeIndex.value - 1
  setActiveCard(prevIdx)
}

const animateCards = () => {
  testimonialCards.value.forEach((card, index) => {
    if (!card) return
    
    const style = getCardStyle(index)
    
    gsap.to(card, {
      ...style,
      duration: 0.6,
      ease: 'power2.out',
      transformOrigin: 'center center'
    })
  })
}

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextCard()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long'
  })
}

// Animations d'entrée
const animateOnScroll = () => {
  if (!testimonialsSection.value) return
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: testimonialsSection.value,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  })
  
  // Header
  if (sectionHeader.value) {
    tl.from(sectionHeader.value, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    })
  }
  
  // Carousel
  if (carousel.value) {
    tl.from(carousel.value, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.4')
  }
  
  // Stats
  if (statsRef.value?.children) {
    tl.from(Array.from(statsRef.value.children), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.6')
  }
}

// Lifecycle
onMounted(() => {
  if (process.client) {
    // Initialiser les animations
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger)
      animateOnScroll()
    })
    
    // Démarrer l'autoplay
    startAutoPlay()
    
    // Pause autoplay au hover
    if (carousel.value) {
      carousel.value.addEventListener('mouseenter', stopAutoPlay)
      carousel.value.addEventListener('mouseleave', startAutoPlay)
    }
    
    // Gestion clavier
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevCard()
      if (e.key === 'ArrowRight') nextCard()
    }
    
    document.addEventListener('keydown', handleKeyDown)
    
    // Nettoyer les event listeners
    onUnmounted(() => {
      stopAutoPlay()
      if (carousel.value) {
        carousel.value.removeEventListener('mouseenter', stopAutoPlay)
        carousel.value.removeEventListener('mouseleave', startAutoPlay)
      }
      document.removeEventListener('keydown', handleKeyDown)
    })
  }
})
</script>

<style scoped>
.testimonials-section {
  padding: var(--space-32) 0;
  background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
  position: relative;
  overflow: hidden;
}

.testimonials-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.section-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: var(--radius-full);
  margin-bottom: var(--space-4);
}

.section-title {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.text-gradient {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Carousel 3D */
.testimonials-carousel {
  position: relative;
  margin-bottom: var(--space-16);
}

.carousel-container {
  position: relative;
  height: 500px;
  perspective: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.testimonial-card {
  position: absolute;
  width: 400px;
  height: 450px;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  cursor: pointer;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.testimonial-card:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.testimonial-card.active {
  cursor: default;
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.testimonial-avatar {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  color: var(--accent-primary);
}

.avatar-ring {
  position: absolute;
  inset: -4px;
  border: 2px solid var(--accent-primary);
  border-radius: 50%;
  background: conic-gradient(from 0deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary));
  animation: rotate 3s linear infinite;
  z-index: -1;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.testimonial-info {
  flex: 1;
}

.testimonial-name {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.testimonial-role {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.testimonial-company {
  font-size: var(--text-sm);
  color: var(--accent-primary);
  font-weight: 500;
}

.testimonial-rating {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.stars {
  display: flex;
  gap: var(--space-1);
}

.stars .icon {
  color: var(--text-tertiary);
  transition: color 0.2s ease;
}

.stars .icon.filled {
  color: #fbbf24;
}

.rating-text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

.testimonial-content {
  flex: 1;
  display: flex;
  align-items: center;
}

.testimonial-content blockquote {
  font-size: var(--text-lg);
  line-height: 1.6;
  color: var(--text-primary);
  font-style: italic;
  position: relative;
  padding: 0 var(--space-4);
}

.quote-icon {
  position: absolute;
  color: var(--accent-primary);
  opacity: 0.3;
  font-size: var(--text-2xl);
}

.quote-icon:first-child {
  top: -10px;
  left: -10px;
}

.quote-icon:last-child {
  bottom: -10px;
  right: -10px;
}

.testimonial-project {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.testimonial-date {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

/* Navigation */
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
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: var(--text-xl);
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

.carousel-indicators {
  display: flex;
  gap: var(--space-2);
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: var(--border-primary);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: var(--accent-primary);
  transform: scale(1.2);
}

.indicator:hover {
  background: var(--accent-secondary);
}

/* Statistiques */
.testimonials-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-8);
  margin-top: var(--space-16);
}

.stat-item {
  text-align: center;
  padding: var(--space-6);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: var(--text-4xl);
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-2);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .testimonials-section {
    padding: var(--space-16) 0;
  }
  
  .section-title {
    font-size: var(--text-3xl);
  }
  
  .carousel-container {
    height: 400px;
  }
  
  .testimonial-card {
    width: 320px;
    height: 380px;
    padding: var(--space-6);
  }
  
  .testimonial-avatar {
    width: 60px;
    height: 60px;
  }
  
  .testimonial-name {
    font-size: var(--text-lg);
  }
  
  .testimonial-content blockquote {
    font-size: var(--text-base);
  }
  
  .testimonials-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }
  
  .stat-number {
    font-size: var(--text-3xl);
  }
}

@media (max-width: 480px) {
  .testimonial-card {
    width: 280px;
    height: 350px;
    padding: var(--space-4);
  }
  
  .carousel-navigation {
    gap: var(--space-4);
  }
  
  .nav-btn {
    width: 40px;
    height: 40px;
  }
  
  .testimonials-stats {
    grid-template-columns: 1fr;
  }
}
</style> 