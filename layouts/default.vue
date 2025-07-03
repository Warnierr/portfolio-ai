<template>
  <div class="layout-wrapper">
    <!-- Overlay de transition -->
    <div 
      v-if="isTransitioning" 
      class="page-transition-overlay"
      :class="{ 'active': isTransitioning }"
    >
      <div class="transition-loader">
        <div class="loader-circle"></div>
        <div class="loader-text">Chargement...</div>
      </div>
    </div>

    <!-- Contenu principal avec transition -->
    <Transition
      name="page"
      mode="out-in"
      @enter="onEnter"
      @leave="onLeave"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
    >
      <div :key="$route.path" class="page-content">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePageTransitions } from '~/composables/usePageTransitions'

const route = useRoute()
const { isTransitioning, setTransition, animatePageEnter, animatePageLeave } = usePageTransitions()

// Configuration des transitions selon la route
const routeTransitions: Record<string, string> = {
  '/': 'default',
  '/projects': 'slide',
  '/services': 'scale',
  '/contact': 'creative'
}

// Surveiller les changements de route
watch(() => route.path, (newPath) => {
  const transitionName = routeTransitions[newPath] || 'default'
  setTransition(transitionName)
})

// Gestionnaires de transition
const onBeforeEnter = (el: Element) => {
  // Préparer l'élément pour l'animation d'entrée
  if (el instanceof HTMLElement) {
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
  }
}

const onEnter = async (el: Element) => {
  if (!(el instanceof HTMLElement)) return
  
  // Animation d'entrée de la page
  await animatePageEnter([el], {
    duration: 0.8,
    ease: 'power2.out'
  })
}

const onLeave = async (el: Element) => {
  if (!(el instanceof HTMLElement)) return
  
  // Animation de sortie de la page
  await animatePageLeave([el], {
    duration: 0.6,
    ease: 'power2.in'
  })
}

const onAfterEnter = () => {
  // Déclencher les animations des éléments de la page
  nextTick(() => {
    const { animateOnScroll, staggeredAppear } = usePageTransitions()
    
    // Animer les éléments de la nouvelle page
    setTimeout(() => {
      animateOnScroll('.section-header', { direction: 'up', stagger: 0.1 })
      animateOnScroll('.card', { direction: 'up', stagger: 0.1 })
      staggeredAppear('.btn', { direction: 'up', stagger: 0.05 })
    }, 200)
  })
}
</script>

<style scoped>
.layout-wrapper {
  position: relative;
  min-height: 100vh;
}

.page-transition-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-primary);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.page-transition-overlay.active {
  opacity: 1;
  pointer-events: all;
}

.transition-loader {
  text-align: center;
}

.loader-circle {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(99, 102, 241, 0.2);
  border-top: 3px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto var(--space-4);
}

.loader-text {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.page-content {
  min-height: 100vh;
}

/* Transitions Vue */
.page-enter-active,
.page-leave-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(1.02);
}

/* Animation de fondu pour les sections */
.section-fade-enter-active,
.section-fade-leave-active {
  transition: all 0.6s ease;
}

.section-fade-enter-from,
.section-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Animation de glissement */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* Animation d'échelle */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.scale-enter-from {
  opacity: 0;
  transform: scale(0.8) rotate(-5deg);
}

.scale-leave-to {
  opacity: 0;
  transform: scale(1.1) rotate(5deg);
}

/* Responsive */
@media (max-width: 768px) {
  .page-enter-from,
  .page-leave-to {
    transform: translateY(20px) scale(0.99);
  }
  
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(50px);
  }
}
</style> 