import { ref, nextTick } from 'vue'

interface TransitionConfig {
  duration: number
  ease: string
  direction: 'left' | 'right' | 'up' | 'down' | 'fade' | 'scale'
  stagger?: number
  delay?: number
}

interface PageTransition {
  name: string
  enter: TransitionConfig
  leave: TransitionConfig
}

export const usePageTransitions = () => {
  const isTransitioning = ref(false)
  const currentTransition = ref<string>('default')

  // Configurations de transitions prédéfinies
  const transitionConfigs: Record<string, PageTransition> = {
    default: {
      name: 'default',
      enter: {
        duration: 0.8,
        ease: 'power2.out',
        direction: 'fade',
        delay: 0.1
      },
      leave: {
        duration: 0.6,
        ease: 'power2.in',
        direction: 'fade'
      }
    },
    slide: {
      name: 'slide',
      enter: {
        duration: 1,
        ease: 'power3.out',
        direction: 'right',
        stagger: 0.1
      },
      leave: {
        duration: 0.8,
        ease: 'power3.in',
        direction: 'left'
      }
    },
    scale: {
      name: 'scale',
      enter: {
        duration: 0.9,
        ease: 'back.out(1.7)',
        direction: 'scale',
        stagger: 0.05
      },
      leave: {
        duration: 0.7,
        ease: 'back.in(1.7)',
        direction: 'scale'
      }
    },
    creative: {
      name: 'creative',
      enter: {
        duration: 1.2,
        ease: 'elastic.out(1, 0.5)',
        direction: 'up',
        stagger: 0.08,
        delay: 0.2
      },
      leave: {
        duration: 0.8,
        ease: 'power4.in',
        direction: 'down'
      }
    }
  }

  // Animation d'entrée de page
  const animatePageEnter = (elements: string | NodeList | Element[], config?: Partial<TransitionConfig>) => {
    if (!process.client) return Promise.resolve()

    const { $gsap } = useNuxtApp()
    if (!$gsap) return Promise.resolve()

    const transition = transitionConfigs[currentTransition.value]
    const finalConfig = { ...transition.enter, ...config }

    return new Promise<void>((resolve) => {
      isTransitioning.value = true

      // Configuration de base selon la direction
      let fromProps: any = {}
      let toProps: any = {
        duration: finalConfig.duration,
        ease: finalConfig.ease,
        stagger: finalConfig.stagger || 0,
        delay: finalConfig.delay || 0,
        onComplete: () => {
          isTransitioning.value = false
          resolve()
        }
      }

      switch (finalConfig.direction) {
        case 'left':
          fromProps = { x: -100, opacity: 0 }
          toProps = { x: 0, opacity: 1, ...toProps }
          break
        case 'right':
          fromProps = { x: 100, opacity: 0 }
          toProps = { x: 0, opacity: 1, ...toProps }
          break
        case 'up':
          fromProps = { y: 100, opacity: 0 }
          toProps = { y: 0, opacity: 1, ...toProps }
          break
        case 'down':
          fromProps = { y: -100, opacity: 0 }
          toProps = { y: 0, opacity: 1, ...toProps }
          break
        case 'scale':
          fromProps = { scale: 0, opacity: 0 }
          toProps = { scale: 1, opacity: 1, ...toProps }
          break
        case 'fade':
        default:
          fromProps = { opacity: 0 }
          toProps = { opacity: 1, ...toProps }
          break
      }

      $gsap.gsap.fromTo(elements, fromProps, toProps)
    })
  }

  // Animation de sortie de page
  const animatePageLeave = (elements: string | NodeList | Element[], config?: Partial<TransitionConfig>) => {
    if (!process.client) return Promise.resolve()

    const { $gsap } = useNuxtApp()
    if (!$gsap) return Promise.resolve()

    const transition = transitionConfigs[currentTransition.value]
    const finalConfig = { ...transition.leave, ...config }

    return new Promise<void>((resolve) => {
      isTransitioning.value = true

      let toProps: any = {
        duration: finalConfig.duration,
        ease: finalConfig.ease,
        stagger: finalConfig.stagger || 0,
        onComplete: () => {
          isTransitioning.value = false
          resolve()
        }
      }

      switch (finalConfig.direction) {
        case 'left':
          toProps = { x: -100, opacity: 0, ...toProps }
          break
        case 'right':
          toProps = { x: 100, opacity: 0, ...toProps }
          break
        case 'up':
          toProps = { y: -100, opacity: 0, ...toProps }
          break
        case 'down':
          toProps = { y: 100, opacity: 0, ...toProps }
          break
        case 'scale':
          toProps = { scale: 0, opacity: 0, ...toProps }
          break
        case 'fade':
        default:
          toProps = { opacity: 0, ...toProps }
          break
      }

      $gsap.gsap.to(elements, toProps)
    })
  }

  // Animation de sections au scroll
  const animateOnScroll = (selector: string, config?: Partial<TransitionConfig>) => {
    if (!process.client) return

    const { $gsap } = useNuxtApp()
    if (!$gsap || !$gsap.ScrollTrigger) return

    const finalConfig = {
      duration: 1,
      ease: 'power2.out',
      direction: 'up' as const,
      stagger: 0.1,
      ...config
    }

    let fromProps: any = {}
    let toProps: any = {
      duration: finalConfig.duration,
      ease: finalConfig.ease,
      stagger: finalConfig.stagger
    }

    switch (finalConfig.direction) {
      case 'left':
        fromProps = { x: -50, opacity: 0 }
        toProps = { x: 0, opacity: 1, ...toProps }
        break
      case 'right':
        fromProps = { x: 50, opacity: 0 }
        toProps = { x: 0, opacity: 1, ...toProps }
        break
      case 'up':
        fromProps = { y: 50, opacity: 0 }
        toProps = { y: 0, opacity: 1, ...toProps }
        break
      case 'down':
        fromProps = { y: -50, opacity: 0 }
        toProps = { y: 0, opacity: 1, ...toProps }
        break
      case 'scale':
        fromProps = { scale: 0.8, opacity: 0 }
        toProps = { scale: 1, opacity: 1, ...toProps }
        break
      case 'fade':
      default:
        fromProps = { opacity: 0 }
        toProps = { opacity: 1, ...toProps }
        break
    }

    $gsap.gsap.fromTo(selector, fromProps, {
      ...toProps,
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })
  }

  // Animation de révélation de texte
  const animateTextReveal = (selector: string, config?: { 
    splitType?: 'chars' | 'words' | 'lines'
    stagger?: number
    duration?: number 
  }) => {
    if (!process.client) return

    const { $gsap } = useNuxtApp()
    if (!$gsap) return

    const finalConfig = {
      splitType: 'chars' as const,
      stagger: 0.03,
      duration: 0.8,
      ...config
    }

    // Simuler SplitText (version simplifiée)
    const elements = document.querySelectorAll(selector)
    elements.forEach(element => {
      const text = element.textContent || ''
      element.innerHTML = ''

      if (finalConfig.splitType === 'chars') {
        text.split('').forEach(char => {
          const span = document.createElement('span')
          span.textContent = char === ' ' ? '\u00A0' : char
          span.style.display = 'inline-block'
          element.appendChild(span)
        })
      } else if (finalConfig.splitType === 'words') {
        text.split(' ').forEach((word, index) => {
          const span = document.createElement('span')
          span.textContent = word
          span.style.display = 'inline-block'
          if (index < text.split(' ').length - 1) {
            span.style.marginRight = '0.25em'
          }
          element.appendChild(span)
        })
      }

      // Animer les éléments créés
      $gsap.gsap.fromTo(element.children, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: finalConfig.duration,
          stagger: finalConfig.stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }

  // Animation de compteur
  const animateCounter = (selector: string, endValue: number, config?: {
    duration?: number
    startValue?: number
    ease?: string
  }) => {
    if (!process.client) return

    const { $gsap } = useNuxtApp()
    if (!$gsap) return

    const finalConfig = {
      duration: 2,
      startValue: 0,
      ease: 'power2.out',
      ...config
    }

    const element = document.querySelector(selector)
    if (!element) return

    const counter = { value: finalConfig.startValue }

    $gsap.gsap.to(counter, {
      value: endValue,
      duration: finalConfig.duration,
      ease: finalConfig.ease,
      onUpdate: () => {
        element.textContent = Math.round(counter.value).toString()
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
  }

  // Animation de ligne de progression
  const animateProgressBar = (selector: string, percentage: number, config?: {
    duration?: number
    ease?: string
    color?: string
  }) => {
    if (!process.client) return

    const { $gsap } = useNuxtApp()
    if (!$gsap) return

    const finalConfig = {
      duration: 1.5,
      ease: 'power2.out',
      ...config
    }

    $gsap.gsap.fromTo(selector, 
      { width: '0%' },
      {
        width: `${percentage}%`,
        duration: finalConfig.duration,
        ease: finalConfig.ease,
        scrollTrigger: {
          trigger: selector,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Transition de route personnalisée
  const createRouteTransition = (name: string, enterConfig: TransitionConfig, leaveConfig: TransitionConfig) => {
    transitionConfigs[name] = {
      name,
      enter: enterConfig,
      leave: leaveConfig
    }
  }

  // Définir la transition actuelle
  const setTransition = (transitionName: string) => {
    if (transitionConfigs[transitionName]) {
      currentTransition.value = transitionName
    }
  }

  // Animation d'apparition d'éléments avec délai
  const staggeredAppear = (selector: string, config?: {
    stagger?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    duration?: number
  }) => {
    if (!process.client) return

    const { $gsap } = useNuxtApp()
    if (!$gsap) return

    const finalConfig = {
      stagger: 0.1,
      direction: 'up' as const,
      duration: 0.8,
      ...config
    }

    let fromProps: any = { opacity: 0 }
    let toProps: any = { opacity: 1 }

    switch (finalConfig.direction) {
      case 'up':
        fromProps.y = 30
        toProps.y = 0
        break
      case 'down':
        fromProps.y = -30
        toProps.y = 0
        break
      case 'left':
        fromProps.x = -30
        toProps.x = 0
        break
      case 'right':
        fromProps.x = 30
        toProps.x = 0
        break
    }

    $gsap.gsap.fromTo(selector, fromProps, {
      ...toProps,
      duration: finalConfig.duration,
      stagger: finalConfig.stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })
  }

  return {
    isTransitioning: readonly(isTransitioning),
    currentTransition: readonly(currentTransition),
    animatePageEnter,
    animatePageLeave,
    animateOnScroll,
    animateTextReveal,
    animateCounter,
    animateProgressBar,
    createRouteTransition,
    setTransition,
    staggeredAppear
  }
} 