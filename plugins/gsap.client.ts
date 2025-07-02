import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { SplitText } from 'gsap/SplitText'

export default defineNuxtPlugin(() => {
  // Enregistrement des plugins GSAP
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
  
  // Configuration globale GSAP
  gsap.config({
    force3D: true,
    nullTargetWarn: false
  })

  // Timeline principale pour les animations
  const mainTimeline = gsap.timeline({ paused: true })

  // Fonction d'animation de texte avec effet diagonal
  const animateTextDiagonal = (element: string | Element, options = {}) => {
    const defaults = {
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out',
      yPercent: 100,
      xPercent: -20,
      clipPath: 'inset(0% 100% 0% 0%)'
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element, 
      {
        yPercent: config.yPercent,
        xPercent: config.xPercent,
        clipPath: config.clipPath,
        opacity: 0
      },
      {
        yPercent: 0,
        xPercent: 0,
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: config.duration,
        stagger: config.stagger,
        ease: config.ease
      }
    )
  }

  // Fonction d'animation de fade in avec mouvement
  const animateFadeInUp = (element: string | Element, options = {}) => {
    const defaults = {
      duration: 0.6,
      y: 30,
      opacity: 0,
      ease: 'power2.out',
      delay: 0
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element,
      {
        y: config.y,
        opacity: config.opacity
      },
      {
        y: 0,
        opacity: 1,
        duration: config.duration,
        ease: config.ease,
        delay: config.delay
      }
    )
  }

  // Fonction d'animation de scale avec rotation
  const animateScaleRotate = (element: string | Element, options = {}) => {
    const defaults = {
      duration: 0.5,
      scale: 0.8,
      rotation: -5,
      ease: 'back.out(1.7)'
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element,
      {
        scale: config.scale,
        rotation: config.rotation,
        opacity: 0
      },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: config.duration,
        ease: config.ease
      }
    )
  }

  // Animation de révélation de ligne
  const animateLineReveal = (element: string | Element, options = {}) => {
    const defaults = {
      duration: 1,
      width: 0,
      ease: 'power2.inOut'
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.fromTo(element,
      {
        width: config.width
      },
      {
        width: '100%',
        duration: config.duration,
        ease: config.ease
      }
    )
  }

  // Animation de parallax
  const animateParallax = (element: string | Element, speed = 0.5) => {
    gsap.to(element, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true
      }
    })
  }

  // Animation de rotation continue
  const animateRotate = (element: string | Element, duration = 10) => {
    return gsap.to(element, {
      rotation: 360,
      duration,
      ease: 'none',
      repeat: -1
    })
  }

  // Animation de pulsation
  const animatePulse = (element: string | Element, options = {}) => {
    const defaults = {
      scale: 1.05,
      duration: 2,
      ease: 'power2.inOut'
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.to(element, {
      scale: config.scale,
      duration: config.duration,
      ease: config.ease,
      yoyo: true,
      repeat: -1
    })
  }

  // Animation de morphing de chemin SVG
  const animateMorphPath = (element: string | Element, newPath: string, options = {}) => {
    const defaults = {
      duration: 1,
      ease: 'power2.inOut'
    }
    
    const config = { ...defaults, ...options }
    
    return gsap.to(element, {
      attr: { d: newPath },
      duration: config.duration,
      ease: config.ease
    })
  }

  // Fonction de nettoyage des animations
  const killAllAnimations = () => {
    gsap.killTweensOf('*')
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }

  // Fonction de refresh des ScrollTriggers
  const refreshScrollTriggers = () => {
    ScrollTrigger.refresh()
  }

  // Mise à disposition globale des fonctions
  return {
    provide: {
      gsap: {
        gsap,
        ScrollTrigger,
        TextPlugin,
        mainTimeline,
        animateTextDiagonal,
        animateFadeInUp,
        animateScaleRotate,
        animateLineReveal,
        animateParallax,
        animateRotate,
        animatePulse,
        animateMorphPath,
        killAllAnimations,
        refreshScrollTriggers
      }
    }
  }
}) 