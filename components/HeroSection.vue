<template>
  <section class="hero-section" ref="heroSection">
    <!-- Arrière-plan WebGL -->
    <div class="webgl-background" ref="webglContainer"></div>
    
    <!-- Particules animées -->
    <div class="particles-container">
      <div 
        v-for="i in 50" 
        :key="i" 
        class="particle"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (Math.random() * 3 + 2) + 's'
        }"
      ></div>
    </div>

    <div class="container hero-content">
      <!-- Badge de statut -->
      <div class="status-badge" ref="statusBadge">
        <div class="status-dot"></div>
        <span>Disponible pour nouvelles opportunités</span>
      </div>

      <!-- Contenu principal -->
      <div class="hero-main">
        <div class="hero-text">
          <h1 class="hero-title" ref="heroTitle">
            <span class="title-line">Raouf</span>
            <span class="title-line diagonal">WARNIER</span>
          </h1>
          
          <div class="hero-subtitle" ref="heroSubtitle">
            <span class="gradient-text">Ingénieur IA & Data</span>
            <span class="subtitle-accent">Créateur de Nina AI</span>
          </div>

          <p class="hero-description" ref="heroDescription">
            Spécialisé en intelligence artificielle et agents intelligents. 
            Je développe Nina AI, un agent conversationnel avancé, et crée 
            des solutions IA innovantes pour transformer les données en intelligence.
          </p>

          <!-- Statistiques -->
          <div class="hero-stats" ref="heroStats">
            <div class="stat-item">
              <span class="stat-number" data-target="3">0</span>
              <span class="stat-label">Ans en IA</span>
            </div>
            <div class="stat-item">
              <span class="stat-number" data-target="1">0</span>
              <span class="stat-label">Agent IA créé</span>
            </div>
            <div class="stat-item">
              <span class="stat-number" data-target="20">0</span>
              <span class="stat-label">Modèles déployés</span>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="hero-actions" ref="heroActions">
            <button class="btn-primary">
              <Icon name="mdi:robot" />
              Découvrir Nina AI
            </button>
            <button class="btn-secondary">
              <Icon name="mdi:brain" />
              Projets IA
            </button>
          </div>
        </div>

        <!-- Image/Avatar -->
        <div class="hero-visual" ref="heroVisual">
          <div class="avatar-container">
            <div class="avatar-bg"></div>
            <div class="avatar-image">
              <Icon name="mdi:account-circle" size="120" />
            </div>
          </div>
          
          <!-- Éléments flottants avec technologies -->
          <div class="floating-elements">
            <div class="floating-element" data-tech="Python">
              <Icon name="mdi:language-python" />
            </div>
            <div class="floating-element" data-tech="TensorFlow">
              <Icon name="mdi:tensorflow" />
            </div>
            <div class="floating-element" data-tech="OpenAI">
              <Icon name="mdi:brain" />
            </div>
            <div class="floating-element" data-tech="LangChain">
              <Icon name="mdi:link-variant" />
            </div>
            <div class="floating-element" data-tech="Docker">
              <Icon name="mdi:docker" />
            </div>
            <div class="floating-element" data-tech="Nina AI">
              <Icon name="mdi:robot-excited" />
            </div>
          </div>
        </div>
      </div>

      <!-- Indicateur de scroll -->
      <div class="scroll-indicator" ref="scrollIndicator">
        <div class="scroll-line"></div>
        <span>Découvrir</span>
        <Icon name="mdi:chevron-down" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const statusBadge = ref()
const heroTitle = ref()
const heroSubtitle = ref()
const heroDescription = ref()
const heroStats = ref()
const heroActions = ref()
const heroVisual = ref()
const scrollIndicator = ref()
const heroSection = ref()
const webglContainer = ref()

onMounted(() => {
  // Initialisation WebGL
  const { $webgl } = useNuxtApp()
  if ($webgl && webglContainer.value && typeof $webgl.createParticleSystem === 'function') {
    try {
      $webgl.createParticleSystem(webglContainer.value)
    } catch (error) {
      console.warn('WebGL non supporté:', error)
    }
  }

  // Animation d'entrée avec GSAP
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  const tl = $gsap.gsap.timeline()

  // Badge de statut
  tl.from(statusBadge.value, {
    y: -50,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.7)'
  })

  // Titre avec effet diagonal
  tl.from('.title-line', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  }, '-=0.3')

  // Sous-titre
  tl.from(heroSubtitle.value, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.5')

  // Description
  tl.from(heroDescription.value, {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.3')

  // Statistiques avec animation des nombres
  tl.from('.stat-item', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    onComplete: animateNumbers
  }, '-=0.3')

  // Boutons d'action
  tl.from('.hero-actions button', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  }, '-=0.2')

  // Visuel avec parallaxe
  tl.from(heroVisual.value, {
    x: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  }, '-=1')

  // Éléments flottants
  tl.from('.floating-element', {
    scale: 0,
    rotation: 180,
    duration: 0.8,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  }, '-=0.5')

  // Indicateur de scroll
  tl.from(scrollIndicator.value, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.3')

  // Animation continue des éléments flottants
  $gsap.gsap.to('.floating-element', {
    y: '-20px',
    duration: 2,
    ease: 'power1.inOut',
    stagger: 0.2,
    repeat: -1,
    yoyo: true
  })

  // Animation de l'indicateur de scroll
  $gsap.gsap.to('.scroll-line', {
    scaleY: 0.5,
    duration: 1.5,
    ease: 'power1.inOut',
    repeat: -1,
    yoyo: true
  })
})

// Animation des nombres
function animateNumbers() {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-target') || '0')
    $gsap.gsap.to(el, {
      duration: 2,
      innerHTML: target,
      ease: 'power2.out',
      snap: { innerHTML: 1 }
    })
  })
}
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.webgl-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: var(--accent-primary);
  border-radius: 50%;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.particle:nth-child(odd) {
  animation-delay: -2s;
  animation-duration: 8s;
}

.particle:nth-child(even) {
  animation-delay: -4s;
  animation-duration: 10s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-content {
  position: relative;
  z-index: 2;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--accent-primary);
  margin-bottom: var(--space-8);
  backdrop-filter: blur(10px);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-primary);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

.hero-main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 0.9;
  margin-bottom: var(--space-6);
  font-family: var(--font-heading);
}

.title-line {
  display: block;
}

.title-line.diagonal {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transform: skew(-5deg);
  display: inline-block;
}

.hero-subtitle {
  font-size: var(--text-xl);
  margin-bottom: var(--space-6);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.gradient-text {
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

.subtitle-accent {
  color: var(--text-secondary);
  font-style: italic;
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-8);
  max-width: 500px;
}

.hero-stats {
  display: flex;
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--accent-primary);
  font-family: var(--font-heading);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-base);
  border: none;
  cursor: pointer;
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
  background: var(--bg-secondary);
  border-color: var(--accent-primary);
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.avatar-bg {
  position: absolute;
  inset: 0;
  background: var(--gradient-primary);
  border-radius: 50%;
  opacity: 0.2;
  animation: rotate 20s linear infinite;
}

.avatar-image {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.floating-elements {
  position: absolute;
  inset: 0;
}

.floating-element {
  position: absolute;
  width: 60px;
  height: 60px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--accent-primary);
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all var(--transition-base);
}

.floating-element:hover {
  transform: scale(1.1);
  background: var(--accent-primary);
  color: white;
}

.floating-element:nth-child(1) { top: 10%; right: 20%; }
.floating-element:nth-child(2) { top: 30%; right: -10%; }
.floating-element:nth-child(3) { bottom: 30%; right: 10%; }
.floating-element:nth-child(4) { bottom: 10%; left: 20%; }
.floating-element:nth-child(5) { top: 20%; left: -10%; }
.floating-element:nth-child(6) { top: 60%; left: 10%; }

.scroll-indicator {
  position: absolute;
  bottom: var(--space-8);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  cursor: pointer;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: var(--accent-primary);
  transform-origin: top;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-main {
    grid-template-columns: 1fr;
    gap: var(--space-8);
    text-align: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .floating-element {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }

  .avatar-container {
    width: 150px;
    height: 150px;
  }
}
</style> 