<template>
  <div class="interactive-cursor" v-if="isVisible" ref="cursor">
    <!-- Curseur principal -->
    <div class="cursor-main" ref="cursorMain">
      <div class="cursor-dot" ref="cursorDot"></div>
      <div class="cursor-ring" ref="cursorRing"></div>
    </div>

    <!-- Effets de particules -->
    <div class="cursor-particles" ref="cursorParticles">
      <div 
        v-for="particle in particles" 
        :key="particle.id"
        class="cursor-particle"
        :style="{ 
          left: particle.x + 'px', 
          top: particle.y + 'px',
          backgroundColor: particle.color,
          transform: `scale(${particle.scale})`
        }"
      ></div>
    </div>

    <!-- Curseur de texte -->
    <div class="cursor-text" ref="cursorText" v-if="currentText">
      {{ currentText }}
    </div>

    <!-- Effet de révélation -->
    <div class="cursor-reveal" ref="cursorReveal"></div>

    <!-- Morphing contextuel -->
    <div class="cursor-morph" ref="cursorMorph">
      <Icon v-if="currentIcon" :name="currentIcon" :size="morphSize" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

interface Particle {
  id: number
  x: number
  y: number
  color: string
  scale: number
  life: number
}

interface CursorState {
  type: 'default' | 'hover' | 'click' | 'text' | 'drag' | 'loading'
  element?: HTMLElement
  text?: string
  icon?: string
  color?: string
  size?: number
}

// Refs
const cursor = ref<HTMLElement>()
const cursorMain = ref<HTMLElement>()
const cursorDot = ref<HTMLElement>()
const cursorRing = ref<HTMLElement>()
const cursorParticles = ref<HTMLElement>()
const cursorText = ref<HTMLElement>()
const cursorReveal = ref<HTMLElement>()
const cursorMorph = ref<HTMLElement>()

// State
const isVisible = ref(false)
const currentState = ref<CursorState>({ type: 'default' })
const currentText = ref('')
const currentIcon = ref('')
const morphSize = ref(20)
const particles = ref<Particle[]>([])

// Mouse position
const mouseX = ref(0)
const mouseY = ref(0)
const cursorX = ref(0)
const cursorY = ref(0)

// Animation settings
const cursorSpeed = 0.15
const ringSpeed = 0.08
let particleId = 0

// Détection du type d'élément
const getElementType = (element: HTMLElement): CursorState => {
  // Liens et boutons
  if (element.tagName === 'A' || element.tagName === 'BUTTON' || element.hasAttribute('role') && element.getAttribute('role') === 'button') {
    return {
      type: 'hover',
      element,
      text: element.getAttribute('data-cursor-text') || '',
      icon: element.getAttribute('data-cursor-icon') || 'mdi:cursor-default-click',
      color: element.getAttribute('data-cursor-color') || '#6366f1',
      size: 32
    }
  }

  // Champs de texte
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.isContentEditable) {
    return {
      type: 'text',
      element,
      icon: 'mdi:cursor-text',
      color: '#10b981',
      size: 24
    }
  }

  // Éléments draggables
  if (element.draggable || element.hasAttribute('data-draggable')) {
    return {
      type: 'drag',
      element,
      icon: 'mdi:cursor-move',
      color: '#f59e0b',
      size: 28
    }
  }

  // Éléments avec loader
  if (element.hasAttribute('data-loading')) {
    return {
      type: 'loading',
      element,
      icon: 'mdi:loading',
      color: '#8b5cf6',
      size: 24
    }
  }

  // Éléments interactifs
  if (element.hasAttribute('data-interactive') || element.onclick || element.style.cursor === 'pointer') {
    return {
      type: 'hover',
      element,
      text: element.getAttribute('data-cursor-text') || '',
      icon: element.getAttribute('data-cursor-icon') || 'mdi:cursor-default-click',
      color: element.getAttribute('data-cursor-color') || '#6366f1',
      size: 28
    }
  }

  return { type: 'default' }
}

// Gestion des événements souris
const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY

  // Détection de l'élément sous le curseur
  const element = e.target as HTMLElement
  const newState = getElementType(element)

  if (newState.type !== currentState.value.type || newState.element !== currentState.value.element) {
    updateCursorState(newState)
  }

  // Génération de particules sur mouvement rapide
  const speed = Math.sqrt(e.movementX ** 2 + e.movementY ** 2)
  if (speed > 5 && Math.random() < 0.3) {
    createParticle(e.clientX, e.clientY)
  }
}

const handleMouseDown = () => {
  if (currentState.value.type === 'hover') {
    animateClick()
  }
}

const handleMouseUp = () => {
  if (currentState.value.type === 'hover') {
    animateRelease()
  }
}

const handleMouseEnter = () => {
  isVisible.value = true
  if (cursorMain.value) {
    gsap.to(cursorMain.value, { opacity: 1, duration: 0.3 })
  }
}

const handleMouseLeave = () => {
  isVisible.value = false
  if (cursorMain.value) {
    gsap.to(cursorMain.value, { opacity: 0, duration: 0.3 })
  }
}

// Mise à jour de l'état du curseur
const updateCursorState = (newState: CursorState) => {
  currentState.value = newState
  currentText.value = newState.text || ''
  currentIcon.value = newState.icon || ''
  morphSize.value = newState.size || 20

  // Animations selon le type
  switch (newState.type) {
    case 'hover':
      animateHover(newState)
      break
    case 'text':
      animateText()
      break
    case 'drag':
      animateDrag()
      break
    case 'loading':
      animateLoading()
      break
    default:
      animateDefault()
  }
}

// Animations
const animateDefault = () => {
  if (!cursorDot.value || !cursorRing.value) return

  gsap.to(cursorDot.value, {
    scale: 1,
    backgroundColor: '#ffffff',
    duration: 0.3,
    ease: 'power2.out'
  })

  gsap.to(cursorRing.value, {
    scale: 1,
    borderColor: '#6366f1',
    borderWidth: '2px',
    duration: 0.3,
    ease: 'power2.out'
  })
}

const animateHover = (state: CursorState) => {
  if (!cursorDot.value || !cursorRing.value || !cursorMorph.value) return

  const color = state.color || '#6366f1'

  gsap.to(cursorDot.value, {
    scale: 0.5,
    backgroundColor: color,
    duration: 0.3,
    ease: 'back.out(1.7)'
  })

  gsap.to(cursorRing.value, {
    scale: 2,
    borderColor: color,
    borderWidth: '1px',
    duration: 0.3,
    ease: 'back.out(1.7)'
  })

  gsap.to(cursorMorph.value, {
    scale: 1,
    opacity: 1,
    duration: 0.3,
    ease: 'back.out(1.7)'
  })

  // Effet de révélation
  if (cursorReveal.value) {
    gsap.to(cursorReveal.value, {
      scale: 3,
      opacity: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    })
  }
}

const animateText = () => {
  if (!cursorDot.value || !cursorRing.value) return

  gsap.to(cursorDot.value, {
    scale: 0.3,
    backgroundColor: '#10b981',
    duration: 0.3
  })

  gsap.to(cursorRing.value, {
    scale: 1.5,
    borderColor: '#10b981',
    borderWidth: '1px',
    duration: 0.3
  })
}

const animateDrag = () => {
  if (!cursorDot.value || !cursorRing.value) return

  gsap.to(cursorDot.value, {
    scale: 0.8,
    backgroundColor: '#f59e0b',
    duration: 0.3
  })

  gsap.to(cursorRing.value, {
    scale: 1.8,
    borderColor: '#f59e0b',
    borderWidth: '2px',
    borderStyle: 'dashed',
    duration: 0.3
  })
}

const animateLoading = () => {
  if (!cursorRing.value) return

  gsap.to(cursorRing.value, {
    rotation: 360,
    duration: 1,
    repeat: -1,
    ease: 'linear'
  })
}

const animateClick = () => {
  if (!cursorDot.value || !cursorRing.value) return

  gsap.to(cursorDot.value, {
    scale: 1.2,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  })

  gsap.to(cursorRing.value, {
    scale: 0.8,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  })

  // Explosion de particules
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      createParticle(mouseX.value, mouseY.value, currentState.value.color)
    }, i * 20)
  }
}

const animateRelease = () => {
  // Retour à l'état hover
  updateCursorState(currentState.value)
}

// Gestion des particules
const createParticle = (x: number, y: number, color?: string) => {
  const particle: Particle = {
    id: particleId++,
    x: x + (Math.random() - 0.5) * 20,
    y: y + (Math.random() - 0.5) * 20,
    color: color || '#6366f1',
    scale: Math.random() * 0.5 + 0.5,
    life: 1
  }

  particles.value.push(particle)

  // Animation de la particule
  gsap.to(particle, {
    x: particle.x + (Math.random() - 0.5) * 100,
    y: particle.y + (Math.random() - 0.5) * 100,
    scale: 0,
    life: 0,
    duration: 0.8,
    ease: 'power2.out',
    onComplete: () => {
      const index = particles.value.findIndex(p => p.id === particle.id)
      if (index > -1) {
        particles.value.splice(index, 1)
      }
    }
  })
}

// Animation du curseur
const animateCursor = () => {
  // Smooth following
  cursorX.value += (mouseX.value - cursorX.value) * cursorSpeed
  cursorY.value += (mouseY.value - cursorY.value) * cursorSpeed

  if (cursor.value) {
    cursor.value.style.transform = `translate(${cursorX.value}px, ${cursorY.value}px)`
  }

  // Animation de l'anneau avec délai
  if (cursorRing.value) {
    const ringX = cursorX.value + (mouseX.value - cursorX.value) * ringSpeed
    const ringY = cursorY.value + (mouseY.value - cursorY.value) * ringSpeed
    cursorRing.value.style.transform = `translate(${ringX - cursorX.value}px, ${ringY - cursorY.value}px)`
  }

  requestAnimationFrame(animateCursor)
}

// Lifecycle
onMounted(() => {
  // Vérifier si on est sur un appareil tactile
  if ('ontouchstart' in window) {
    isVisible.value = false
    return
  }

  // Event listeners
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mousedown', handleMouseDown)
  document.addEventListener('mouseup', handleMouseUp)
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('mouseleave', handleMouseLeave)

  // Démarrer l'animation
  nextTick(() => {
    animateCursor()
  })

  // Initialiser le curseur
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mousedown', handleMouseDown)
  document.removeEventListener('mouseup', handleMouseUp)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
})
</script>

<style scoped>
.interactive-cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
}

.cursor-main {
  position: relative;
  width: 0;
  height: 0;
}

.cursor-dot {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 8px;
  height: 8px;
  background: #ffffff;
  border-radius: 50%;
  transform-origin: center;
  transition: background-color 0.3s ease;
}

.cursor-ring {
  position: absolute;
  top: -16px;
  left: -16px;
  width: 32px;
  height: 32px;
  border: 2px solid #6366f1;
  border-radius: 50%;
  transform-origin: center;
  transition: all 0.3s ease;
}

.cursor-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.cursor-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #6366f1;
  transform-origin: center;
}

.cursor-text {
  position: absolute;
  top: -40px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transform: translateY(-100%);
  opacity: 0;
  animation: cursor-text-appear 0.3s ease forwards;
}

@keyframes cursor-text-appear {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cursor-reveal {
  position: absolute;
  top: -50px;
  left: -50px;
  width: 100px;
  height: 100px;
  border: 1px solid #6366f1;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0);
  transform-origin: center;
}

.cursor-morph {
  position: absolute;
  top: -12px;
  left: -12px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6366f1;
  transform: scale(0);
  opacity: 0;
  transform-origin: center;
  transition: all 0.3s ease;
}

/* Masquer le curseur par défaut */
* {
  cursor: none !important;
}

/* Responsive - masquer sur mobile */
@media (max-width: 768px) {
  .interactive-cursor {
    display: none;
  }
  
  * {
    cursor: auto !important;
  }
}

/* Thème sombre */
@media (prefers-color-scheme: dark) {
  .cursor-dot {
    background: #000000;
  }
  
  .interactive-cursor {
    mix-blend-mode: exclusion;
  }
}
</style> 