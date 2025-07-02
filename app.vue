<template>
  <div id="app">
    <!-- Préloader -->
    <div v-if="isLoading" class="preloader">
      <div class="preloader-logo">Portfolio</div>
    </div>

    <!-- Curseur personnalisé -->
    <div ref="cursor" class="cursor"></div>

    <!-- Navigation -->
    <Navigation />

    <!-- Contenu principal -->
    <main>
      <NuxtPage />
    </main>

    <!-- Footer -->
    <Footer />
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
const cursor = ref<HTMLElement>()

// Gestion du curseur personnalisé
const handleMouseMove = (e: MouseEvent) => {
  if (cursor.value) {
    cursor.value.style.left = e.clientX + 'px'
    cursor.value.style.top = e.clientY + 'px'
  }
}

const handleMouseEnter = () => {
  if (cursor.value) {
    cursor.value.classList.add('cursor-hover')
  }
}

const handleMouseLeave = () => {
  if (cursor.value) {
    cursor.value.classList.remove('cursor-hover')
  }
}

onMounted(() => {
  // Simulation du chargement
  setTimeout(() => {
    isLoading.value = false
  }, 2000)

  // Événements curseur
  document.addEventListener('mousemove', handleMouseMove)
  
  // Ajouter les événements hover sur les éléments interactifs
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card')
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', handleMouseEnter)
    el.addEventListener('mouseleave', handleMouseLeave)
  })
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card')
  interactiveElements.forEach(el => {
    el.removeEventListener('mouseenter', handleMouseEnter)
    el.removeEventListener('mouseleave', handleMouseLeave)
  })
})
</script>

<style>
/* Styles globaux déjà définis dans main.css */
</style>
