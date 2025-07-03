interface CursorState {
  x: number
  y: number
  isVisible: boolean
  isHovering: boolean
  currentType: CursorType
  scale: number
  rotation: number
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

interface CursorConfig {
  size: number
  color: string
  mixBlendMode: string
  animation: string
  trail: boolean
}

export const useInteractiveCursor = () => {
  const cursorElement = ref<HTMLElement>()
  const trailElements = ref<HTMLElement[]>([])
  
  const cursorState = reactive<CursorState>({
    x: 0,
    y: 0,
    isVisible: false,
    isHovering: false,
    currentType: 'default',
    scale: 1,
    rotation: 0
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
      trail: true
    },
    click: {
      size: 60,
      color: 'rgba(16, 185, 129, 0.9)',
      mixBlendMode: 'multiply',
      animation: 'ripple',
      trail: false
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
      trail: true
    },
    nina: {
      size: 35,
      color: 'rgba(34, 197, 94, 0.9)',
      mixBlendMode: 'difference',
      animation: 'glow',
      trail: true
    },
    contact: {
      size: 45,
      color: 'rgba(239, 68, 68, 0.8)',
      mixBlendMode: 'difference',
      animation: 'heartbeat',
      trail: false
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
      trail: true
    }
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

    // Masquer le curseur par défaut
    document.body.style.cursor = 'none'
  }

  // Mettre à jour la position du curseur
  const updateCursorPosition = (x: number, y: number) => {
    cursorState.x = x
    cursorState.y = y

    if (cursorElement.value) {
      cursorElement.value.style.left = `${x}px`
      cursorElement.value.style.top = `${y}px`
    }

    // Mettre à jour la traînée avec un délai
    if (cursorConfigs[cursorState.currentType].trail) {
      trailElements.value.forEach((trail, index) => {
        setTimeout(() => {
          trail.style.left = `${x}px`
          trail.style.top = `${y}px`
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

  const handleMouseDown = () => {
    setCursorType('click')
    cursorState.scale = 0.8
    
    setTimeout(() => {
      cursorState.scale = 1
      setCursorType('default')
    }, 150)
  }

  // Détecter le type d'élément survolé
  const detectElementType = (element: Element): CursorType => {
    // Nina AI
    if (element.closest('.nina-ai-agent') || element.closest('[data-nina]')) {
      return 'nina'
    }

    // Projets
    if (element.closest('.project-card') || element.closest('[data-project]')) {
      return 'project'
    }

    // Contact
    if (element.closest('.contact-section') || element.closest('[data-contact]')) {
      return 'contact'
    }

    // Texte sélectionnable
    if (element.matches('p, h1, h2, h3, h4, h5, h6, span, div[contenteditable]')) {
      return 'text'
    }

    // Éléments interactifs
    if (element.matches('a, button, .btn, [role="button"], input, textarea, select')) {
      return 'hover'
    }

    // Éléments créatifs (canvas, svg, etc.)
    if (element.matches('canvas, svg, .creative-element')) {
      return 'creative'
    }

    return 'default'
  }

  const handleMouseOver = (e: MouseEvent) => {
    const target = e.target as Element
    if (!target) return

    const newType = detectElementType(target)
    setCursorType(newType)
    cursorState.isHovering = newType !== 'default'
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

  return {
    cursorState: readonly(cursorState),
    setCursorType,
    startInteractiveCursor,
    stopInteractiveCursor,
    showCursor,
    hideCursor,
    setCursorLoading
  }
} 