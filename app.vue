<template>
  <div id="app">
    <!-- Liens de navigation rapide pour l'accessibilité -->
    <a href="#main-content" class="skip-link">Aller au contenu principal</a>
    <a href="#navigation" class="skip-link">Aller à la navigation</a>
    <a href="#contact" class="skip-link">Aller au contact</a>

    <!-- Préloader -->
    <div v-if="isLoading" class="preloader">
      <div class="preloader-logo">Portfolio</div>
    </div>

    <!-- Le curseur interactif est géré par le composable -->

    <!-- Navigation -->
    <Navigation id="navigation" />

    <!-- Contenu principal -->
    <main id="main-content">
      <NuxtPage />
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

// État du préloader
const isLoading = ref(true)

onMounted(async () => {
  // Simulation du chargement
  setTimeout(() => {
    isLoading.value = false
  }, 2000)

  // Initialiser les composables côté client
  if (process.client) {
    // Démarrer le monitoring des performances
    import('~/composables/usePerformanceMonitoring').then(({ usePerformanceMonitoring }) => {
      const { startPerformanceMonitoring } = usePerformanceMonitoring()
      startPerformanceMonitoring()
    })
    
    // Démarrer le curseur interactif
    import('~/composables/useInteractiveCursor').then(({ useInteractiveCursor }) => {
      const { startInteractiveCursor } = useInteractiveCursor()
      startInteractiveCursor()
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

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
}

/* Utilitaires */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-4);
  }
}

.text-gradient {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.btn-secondary:hover {
  background: var(--bg-primary);
  border-color: var(--accent-primary);
}

/* Animations globales */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--border-secondary);
  border-radius: var(--radius-md);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}

/* Focus visible */
*:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}
</style>
