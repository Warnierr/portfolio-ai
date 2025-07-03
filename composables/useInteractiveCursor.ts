interface CursorState {
  x: number
  y: number
  isVisible: boolean
  isHovering: boolean
  currentType: CursorType
  scale: number
  rotation: number
  magneticStrength: number
  particlesEnabled: boolean
}

type CursorType = 
  | 'default'
  | 'hover'
  | 'click'
  | 'text'
  | 'project'
  | 'nina'
  | 'contact'
  | 'loading'
  | 'creative'
  | 'magnetic'
  | 'particle'

interface CursorConfig {
  size: number
  color: string
  mixBlendMode: string
  animation: string
  trail: boolean
  magnetic?: boolean
  particles?: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

export const useInteractiveCursor = () => {
  const cursorElement = ref<HTMLElement>()
  const trailElements = ref<HTMLElement[]>([])
  const particles = ref<Particle[]>([])
  const particleCanvas = ref<HTMLCanvasElement>()
  const particleCtx = ref<CanvasRenderingContext2D>()
  
  const cursorState = reactive<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    isHovering: false,
    currentType: 'default',
    scale: 1,
    rotation: 0,
    magneticStrength: 0,
    particlesEnabled: false
  })

  // Configuration des différents types de curseur
  const cursorConfigs: Record<CursorType, CursorConfig> = {
    default: {
      size: 20,
      color: 'rgba(99, 102, 241, 0.8)',
      mixBlendMode: 'difference',
      animation: 'pulse',
      trail: false
    },
    hover: {
      size: 40,
      color: 'rgba(99, 102, 241, 1)',
      mixBlendMode: 'difference',
      animation: 'scale',
      trail: true,
      magnetic: true
    },
    click: {
      size: 60,
      color: 'rgba(16, 185, 129, 0.9)',
      mixBlendMode: 'multiply',
      animation: 'ripple',
      trail: false,
      particles: true
    },
    text: {
      size: 2,
      color: 'rgba(99, 102, 241, 1)',
      mixBlendMode: 'difference',
      animation: 'none',
      trail: false
    },
    project: {
      size: 50,
      color: 'rgba(168, 85, 247, 0.8)',
      mixBlendMode: 'screen',
      animation: 'rotate',
      trail: true,
      magnetic: true,
      particles: true
    },
    nina: {
      size: 35,
      color: 'rgba(34, 197, 94, 0.9)',
      mixBlendMode: 'difference',
      animation: 'glow',
      trail: true,
      magnetic: true,
      particles: true
    },
    contact: {
      size: 45,
      color: 'rgba(239, 68, 68, 0.8)',
      mixBlendMode: 'difference',
      animation: 'heartbeat',
      trail: false,
      magnetic: true
    },
    loading: {
      size: 30,
      color: 'rgba(99, 102, 241, 0.6)',
      mixBlendMode: 'difference',
      animation: 'spin',
      trail: false
    },
    creative: {
      size: 80,
      color: 'linear-gradient(45deg, #667eea, #764ba2)',
      mixBlendMode: 'overlay',
      animation: 'morph',
      trail: true,
      magnetic: true,
      particles: true
    },
    magnetic: {
      size: 30,
      color: 'rgba(99, 102, 241, 0.9)',
      mixBlendMode: 'difference',
      animation: 'pulse',
      trail: true,
      magnetic: true
    },
    particle: {
      size: 25,
      color: 'rgba(168, 85, 247, 0.8)',
      mixBlendMode: 'screen',
      animation: 'glow',
      trail: false,
      particles: true
    }
  }

  // Initialiser le canvas pour les particules
  const initParticleCanvas = () => {
    if (!process.client) return

    const canvas = document.createElement('canvas')
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9997;
    `
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    document.body.appendChild(canvas)
    particleCanvas.value = canvas
    particleCtx.value = canvas.getContext('2d') || undefined

    // Redimensionner le canvas
    window.addEventListener('resize', () => {
      if (particleCanvas.value) {
        particleCanvas.value.width = window.innerWidth
        particleCanvas.value.height = window.innerHeight
      }
    })

    // Démarrer l'animation des particules
    animateParticles()
  }

  // Créer des particules
  const createParticles = (x: number, y: number, count = 8) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count
      const speed = 2 + Math.random() * 3
      
      particles.value.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 60,
        maxLife: 60,
        size: 2 + Math.random() * 3,
        color: `hsla(${Math.random() * 60 + 240}, 70%, 60%, 1)`
      })
    }
  }

  // Animer les particules
  const animateParticles = () => {
    if (!particleCtx.value || !particleCanvas.value) return

    const ctx = particleCtx.value
    ctx.clearRect(0, 0, particleCanvas.value.width, particleCanvas.value.height)

    // Mettre à jour et dessiner les particules
    particles.value = particles.value.filter(particle => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.life--
      particle.vx *= 0.98
      particle.vy *= 0.98

      const alpha = particle.life / particle.maxLife
      ctx.globalAlpha = alpha
      ctx.fillStyle = particle.color
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size * alpha, 0, Math.PI * 2)
      ctx.fill()

      return particle.life > 0
    })

    requestAnimationFrame(animateParticles)
  }

  // Initialiser le curseur
  const initCursor = () => {
    if (!process.client) return

    // Créer l'élément curseur principal
    const cursor = document.createElement('div')
    cursor.className = 'interactive-cursor'
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      background: rgba(99, 102, 241, 0.8);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transform: translate(-50%, -50%);
    `
    
    document.body.appendChild(cursor)
    cursorElement.value = cursor

    // Créer les éléments de traînée
    for (let i = 0; i < 5; i++) {
      const trail = document.createElement('div')
      trail.className = `cursor-trail-${i}`
      trail.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: ${15 - i * 2}px;
        height: ${15 - i * 2}px;
        background: rgba(99, 102, 241, ${0.6 - i * 0.1});
        border-radius: 50%;
        pointer-events: none;
        z-index: ${9998 - i};
        mix-blend-mode: difference;
        transition: all ${0.2 + i * 0.05}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        transform: translate(-50%, -50%);
        opacity: 0;
      `
      
      document.body.appendChild(trail)
      trailElements.value.push(trail)
    }

    // Initialiser le canvas des particules
    initParticleCanvas()

    // Masquer le curseur par défaut
    document.body.style.cursor = 'none'
  }

  // Effet magnétique
  const applyMagneticEffect = (element: Element, x: number, y: number) => {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distance = Math.sqrt(
      Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
    )
    
    const maxDistance = 100
    if (distance < maxDistance) {
      const strength = (maxDistance - distance) / maxDistance
      const pullX = (centerX - x) * strength * 0.3
      const pullY = (centerY - y) * strength * 0.3
      
      return {
        x: x + pullX,
        y: y + pullY,
        strength
      }
    }
    
    return { x, y, strength: 0 }
  }

  // Mettre à jour la position du curseur
  const updateCursorPosition = (x: number, y: number) => {
    let finalX = x
    let finalY = y
    
    // Appliquer l'effet magnétique si activé
    const config = cursorConfigs[cursorState.currentType]
    if (config.magnetic && cursorState.isHovering) {
      const hoveredElement = document.elementFromPoint(x, y)
      if (hoveredElement) {
        const magneticResult = applyMagneticEffect(hoveredElement, x, y)
        finalX = magneticResult.x
        finalY = magneticResult.y
        cursorState.magneticStrength = magneticResult.strength
      }
    }

    cursorState.x = finalX
    cursorState.y = finalY

    if (cursorElement.value) {
      cursorElement.value.style.left = `${finalX}px`
      cursorElement.value.style.top = `${finalY}px`
    }

    // Mettre à jour la traînée avec un délai
    if (config.trail) {
      trailElements.value.forEach((trail, index) => {
        setTimeout(() => {
          trail.style.left = `${finalX}px`
          trail.style.top = `${finalY}px`
          trail.style.opacity = '1'
        }, index * 50)
      })
    } else {
      trailElements.value.forEach(trail => {
        trail.style.opacity = '0'
      })
    }
  }

  // Changer le type de curseur
  const setCursorType = (type: CursorType) => {
    if (cursorState.currentType === type) return

    cursorState.currentType = type
    const config = cursorConfigs[type]

    // Activer/désactiver les particules
    cursorState.particlesEnabled = config.particles || false

    if (cursorElement.value) {
      const cursor = cursorElement.value
      
      // Appliquer la configuration
      cursor.style.width = `${config.size}px`
      cursor.style.height = `${config.size}px`
      cursor.style.background = config.color
      cursor.style.mixBlendMode = config.mixBlendMode

      // Retirer les anciennes classes d'animation
      cursor.className = cursor.className.replace(/cursor-anim-\w+/g, '')
      
      // Ajouter la nouvelle animation
      if (config.animation !== 'none') {
        cursor.classList.add(`cursor-anim-${config.animation}`)
      }

      // Animation de transition
      cursor.style.transform = `translate(-50%, -50%) scale(0.8)`
      setTimeout(() => {
        cursor.style.transform = `translate(-50%, -50%) scale(1)`
      }, 50)
    }
  }

  // Gérer les événements de souris
  const handleMouseMove = (e: MouseEvent) => {
    cursorState.isVisible = true
    updateCursorPosition(e.clientX, e.clientY)
  }

  const handleMouseEnter = () => {
    cursorState.isVisible = true
  }

  const handleMouseLeave = () => {
    cursorState.isVisible = false
  }

  const handleMouseDown = (e: MouseEvent) => {
    setCursorType('click')
    cursorState.scale = 0.8
    
    // Créer des particules au clic
    if (cursorState.particlesEnabled) {
      createParticles(e.clientX, e.clientY, 12)
    }
    
    setTimeout(() => {
      cursorState.scale = 1
      setCursorType('default')
    }, 150)
  }

  // Détecter le type d'élément survolé
  const detectElementType = (element: Element): CursorType => {
    // Nina AI Widget (priorité haute)
    if (element.closest('.nina-ai-widget') || 
        element.closest('.nina-widget-trigger') ||
        element.closest('.nina-widget-container') ||
        element.closest('[data-nina]')) {
      return 'nina'
    }

    // Projets
    if (element.closest('.project-card') || 
        element.closest('[data-project]') ||
        element.closest('.project-image') ||
        element.matches('.project-card, .project-card *')) {
      return 'project'
    }

    // Contact
    if (element.closest('.contact-section') || 
        element.closest('[data-contact]') ||
        element.closest('.contact-form') ||
        element.matches('.contact-section *, .contact-form *')) {
      return 'contact'
    }

    // Services avec effet magnétique
    if (element.closest('.service-card') || element.closest('[data-service]')) {
      return 'magnetic'
    }

    // Éléments créatifs avec particules
    if (element.matches('canvas, svg, .creative-element, [data-creative]')) {
      return 'creative'
    }

    // Texte sélectionnable
    if (element.matches('p, h1, h2, h3, h4, h5, h6, span, div[contenteditable]')) {
      return 'text'
    }

    // Éléments interactifs
    if (element.matches('a, button, .btn, [role="button"], input, textarea, select')) {
      return 'hover'
    }

    return 'default'
  }

  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as Element
    if (!target) return

    const newType = detectElementType(target)
    setCursorType(newType)
    cursorState.isHovering = newType !== 'default'

    // Créer des particules sur les éléments spéciaux
    if (cursorState.particlesEnabled && Math.random() > 0.95) {
      createParticles(e.clientX, e.clientY, 3)
    }
  }

  // Ajouter les styles CSS pour les animations
  const addCursorStyles = () => {
    if (document.getElementById('cursor-styles')) return

    const styles = document.createElement('style')
    styles.id = 'cursor-styles'
    styles.textContent = `
      @keyframes cursor-pulse {
        0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
      }

      @keyframes cursor-scale {
        0% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.2); }
        100% { transform: translate(-50%, -50%) scale(1); }
      }

      @keyframes cursor-ripple {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
      }

      @keyframes cursor-rotate {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @keyframes cursor-glow {
        0%, 100% { 
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
          transform: translate(-50%, -50%) scale(1);
        }
        50% { 
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.8);
          transform: translate(-50%, -50%) scale(1.1);
        }
      }

      @keyframes cursor-heartbeat {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        25% { transform: translate(-50%, -50%) scale(1.1); }
        50% { transform: translate(-50%, -50%) scale(1); }
        75% { transform: translate(-50%, -50%) scale(1.05); }
      }

      @keyframes cursor-spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
      }

      @keyframes cursor-morph {
        0% { 
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        25% { 
          border-radius: 20%;
          transform: translate(-50%, -50%) scale(1.1) rotate(90deg);
        }
        50% { 
          border-radius: 0%;
          transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
        }
        75% { 
          border-radius: 20%;
          transform: translate(-50%, -50%) scale(1.1) rotate(270deg);
        }
        100% { 
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(1) rotate(360deg);
        }
      }

      .cursor-anim-pulse { animation: cursor-pulse 2s infinite; }
      .cursor-anim-scale { animation: cursor-scale 0.6s ease-in-out; }
      .cursor-anim-ripple { animation: cursor-ripple 0.6s ease-out; }
      .cursor-anim-rotate { animation: cursor-rotate 2s linear infinite; }
      .cursor-anim-glow { animation: cursor-glow 1.5s ease-in-out infinite; }
      .cursor-anim-heartbeat { animation: cursor-heartbeat 1.5s ease-in-out infinite; }
      .cursor-anim-spin { animation: cursor-spin 1s linear infinite; }
      .cursor-anim-morph { animation: cursor-morph 3s ease-in-out infinite; }

      /* Masquer le curseur sur mobile */
      @media (hover: none) and (pointer: coarse) {
        .interactive-cursor,
        .cursor-trail-0,
        .cursor-trail-1,
        .cursor-trail-2,
        .cursor-trail-3,
        .cursor-trail-4 {
          display: none !important;
        }
      }
    `
    
    document.head.appendChild(styles)
  }

  // Initialiser le curseur interactif
  const startInteractiveCursor = () => {
    if (!process.client || window.matchMedia('(hover: none)').matches) {
      return // Pas de curseur sur mobile
    }

    addCursorStyles()
    initCursor()

    // Événements de souris
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseover', handleMouseOver)

    // Gérer le changement de visibilité
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cursorState.isVisible = false
      }
    })
  }

  // Nettoyer les événements
  const stopInteractiveCursor = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseenter', handleMouseEnter)
    document.removeEventListener('mouseleave', handleMouseLeave)
    document.removeEventListener('mousedown', handleMouseDown)
    document.removeEventListener('mouseover', handleMouseOver)

    // Retirer les éléments du DOM
    if (cursorElement.value) {
      cursorElement.value.remove()
    }
    
    if (particleCanvas.value) {
      particleCanvas.value.remove()
    }
    
    trailElements.value.forEach(trail => trail.remove())
    trailElements.value = []

    // Restaurer le curseur par défaut
    document.body.style.cursor = 'auto'
  }

  // Méthodes utilitaires
  const showCursor = () => {
    if (cursorElement.value) {
      cursorElement.value.style.opacity = '1'
    }
  }

  const hideCursor = () => {
    if (cursorElement.value) {
      cursorElement.value.style.opacity = '0'
    }
  }

  const setCursorLoading = (loading: boolean) => {
    setCursorType(loading ? 'loading' : 'default')
  }

  // Nouvelle méthode pour créer des particules manuellement
  const triggerParticles = (x?: number, y?: number) => {
    const posX = x || cursorState.x
    const posY = y || cursorState.y
    createParticles(posX, posY, 8)
  }

  return {
    cursorState: readonly(cursorState),
    setCursorType,
    startInteractiveCursor,
    stopInteractiveCursor,
    showCursor,
    hideCursor,
    setCursorLoading,
    triggerParticles
  }
} 