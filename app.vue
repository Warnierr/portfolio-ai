<template>
  <div id="app">
    <!-- Liens de navigation rapide pour l'accessibilité -->
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    <a href="#navigation" class="skip-link">Aller à la navigation</a>
    <a href="#contact" class="skip-link">Aller au contact</a>

    <!-- Préloader -->
    <Transition name="preloader" appear>
      <div v-if="isLoading" class="preloader">
        <div class="preloader-content">
          <div class="preloader-logo">
            <span class="logo-text">Portfolio</span>
            <div class="logo-subtitle">Raouf WARNIER</div>
          </div>
          <div class="preloader-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Curseur interactif -->
    <InteractiveCursor />

    <!-- Transitions de page -->
    <div class="page-transition-overlay" ref="pageTransitionOverlay"></div>

    <!-- Navigation -->
    <Navigation id="navigation" />

    <!-- Contenu principal avec transitions -->
    <main id="main-content" class="main-content">
      <Transition name="page" mode="out-in" appear>
        <NuxtPage />
      </Transition>
    </main>

    <!-- Footer -->
    <Footer />
    
    <!-- Agent Nina AI -->
    <NinaAIAgent />

    <!-- Widget Nina AI -->
    <NinaAIWidget />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

// Métadonnées
useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

// Refs
const pageTransitionOverlay = ref<HTMLElement>()

// État du préloader
const isLoading = ref(true)

// Transitions de page
const animatePageTransition = async (direction: 'in' | 'out' = 'in') => {
  if (!pageTransitionOverlay.value) return

  if (direction === 'out') {
    // Animation de sortie
    gsap.set(pageTransitionOverlay.value, { 
      scaleX: 0, 
      transformOrigin: 'left center',
      backgroundColor: '#6366f1'
    })
    
    await gsap.to(pageTransitionOverlay.value, {
      scaleX: 1,
      duration: 0.6,
      ease: 'power2.inOut'
    })
  } else {
    // Animation d'entrée
    gsap.set(pageTransitionOverlay.value, { 
      scaleX: 1, 
      transformOrigin: 'right center',
      backgroundColor: '#6366f1'
    })
    
    await gsap.to(pageTransitionOverlay.value, {
      scaleX: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      delay: 0.2
    })
  }
}

onMounted(async () => {
  // Animation du préloader
  setTimeout(() => {
    isLoading.value = false
    
    // Animation d'entrée de la page
    setTimeout(() => {
      animatePageTransition('in')
    }, 100)
  }, 2000)

  // Initialiser les composables côté client
  if (process.client) {
    // Démarrer le monitoring des performances
    import('~/composables/usePerformanceMonitoring').then(({ usePerformanceMonitoring }) => {
      const { startPerformanceMonitoring } = usePerformanceMonitoring()
      startPerformanceMonitoring()
    })
    
    // Démarrer l'optimisation des performances
    import('~/composables/usePerformanceOptimization').then(({ usePerformanceOptimization }) => {
      const { initPerformanceOptimization } = usePerformanceOptimization()
      initPerformanceOptimization()
    })
    
    // Initialiser les transitions de page
    import('~/composables/usePageTransitions').then(({ usePageTransitions }) => {
      const { animateOnScroll, staggeredAppear } = usePageTransitions()
      
      // Animer les sections au scroll
      setTimeout(() => {
        animateOnScroll('.section-header', { direction: 'up', stagger: 0.1 })
        animateOnScroll('.project-card', { direction: 'up', stagger: 0.15 })
        animateOnScroll('.service-card', { direction: 'scale', stagger: 0.1 })
        staggeredAppear('.nav-link', { direction: 'down', stagger: 0.05 })
      }, 100)
    })
    
    // Initialiser SEO et accessibilité
    import('~/composables/useSEOAccessibility').then(({ useSEOAccessibility }) => {
      const { setSEOConfig, initAccessibility } = useSEOAccessibility()
      setSEOConfig({}) // Utilise la config par défaut
      initAccessibility()
    })

    // Gestion des transitions de navigation
    const router = useRouter()
    router.beforeEach(async (to, from, next) => {
      if (from.path !== to.path) {
        await animatePageTransition('out')
      }
      next()
    })

    router.afterEach(async () => {
      await animatePageTransition('in')
    })
  }
})

onUnmounted(() => {
  // Le nettoyage est géré par les composables
})
</script>

<style>
/* Variables globales */
:root {
  /* Couleurs */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-tertiary: #94a3b8;
  --accent-primary: #6366f1;
  --accent-secondary: #a855f7;
  --border-primary: #e2e8f0;
  --border-secondary: #cbd5e1;
  
  /* Espacements */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  
  /* Rayons */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
  
  /* Typographie */
  --font-family: 'Inter', system-ui, sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;
  --text-6xl: 3.75rem;
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --bg-secondary: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-tertiary: #94a3b8;
    --border-primary: #334155;
    --border-secondary: #475569;
  }
}

/* Reset et styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family);
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

/* Utilitaires */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Préloader amélioré */
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--bg-primary), var(--bg-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.preloader-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
}

.preloader-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.logo-text {
  font-size: var(--text-4xl);
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: logo-pulse 2s ease-in-out infinite;
}

.logo-subtitle {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@keyframes logo-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.preloader-spinner {
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-top: 2px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-ring:nth-child(2) {
  animation-delay: -0.33s;
  border-top-color: var(--accent-secondary);
}

.spinner-ring:nth-child(3) {
  animation-delay: -0.66s;
  border-top-color: #10b981;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Transitions du préloader */
.preloader-enter-active {
  transition: all 0.8s ease;
}

.preloader-leave-active {
  transition: all 0.8s ease;
}

.preloader-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.preloader-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* Overlay de transition de page */
.page-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--accent-primary);
  z-index: 9999;
  transform: scaleX(0);
  pointer-events: none;
}

/* Transitions de page */
.page-enter-active {
  transition: all 0.6s ease;
}

.page-leave-active {
  transition: all 0.4s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Skip links pour l'accessibilité */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 8px;
  text-decoration: none;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-primary);
  z-index: 10001;
  transition: top 0.3s ease;
}

.skip-link:focus {
  top: 6px;
}

/* Amélioration des interactions */
button, a, input, select, textarea {
  transition: all 0.2s ease;
}

button:hover, a:hover {
  transform: translateY(-1px);
}

button:active, a:active {
  transform: translateY(0);
}

/* Optimisations pour les animations */
.will-change-transform {
  will-change: transform;
}

.will-change-opacity {
  will-change: opacity;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-4);
  }
  
  .logo-text {
    font-size: var(--text-3xl);
  }
  
  .preloader-spinner {
    width: 40px;
    height: 40px;
  }
}
</style>
