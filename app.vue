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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Métadonnées
useHead({
  htmlAttrs: {
    lang: 'fr'
  }
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
/* Styles globaux déjà définis dans main.css */
</style>
