import Lenis from 'lenis'

declare global {
  interface Window {
    gsap: any
  }
}

export default defineNuxtPlugin(() => {
  let lenis: Lenis | null = null

  const initLenis = () => {
    // Configuration Lenis
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Fonction de mise à jour
    function raf(time: number) {
      lenis?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Intégration avec GSAP ScrollTrigger
    if (process.client && window.gsap && window.gsap.ScrollTrigger) {
      lenis.on('scroll', window.gsap.ScrollTrigger.update)
      
      window.gsap.ticker.add((time: number) => {
        lenis?.raf(time * 1000)
      })
      
      window.gsap.ticker.lagSmoothing(0)
    }

    // Ajout de la classe CSS au body
    document.documentElement.classList.add('lenis')
  }

  // Fonctions utilitaires
  const scrollTo = (target: string | number | HTMLElement, options = {}) => {
    if (lenis) {
      lenis.scrollTo(target, options)
    }
  }

  const scrollToTop = (options = {}) => {
    scrollTo(0, options)
  }

  const scrollToElement = (selector: string, options = {}) => {
    const element = document.querySelector(selector) as HTMLElement
    if (element) {
      scrollTo(element, options)
    }
  }

  const stop = () => {
    if (lenis) {
      lenis.stop()
    }
  }

  const start = () => {
    if (lenis) {
      lenis.start()
    }
  }

  const destroy = () => {
    if (lenis) {
      lenis.destroy()
      lenis = null
      document.documentElement.classList.remove('lenis')
    }
  }

  const resize = () => {
    if (lenis) {
      lenis.resize()
    }
  }

  // Gestion des événements de navigation
  const handleRouteChange = () => {
    // Réinitialiser la position de scroll pour les nouvelles pages
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }

  // Initialisation côté client
  if (process.client) {
    // Attendre que le DOM soit prêt
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initLenis)
    } else {
      initLenis()
    }

    // Nettoyage lors de la destruction de l'app
    window.addEventListener('beforeunload', destroy)
  }

  return {
    provide: {
      lenis: {
        instance: lenis,
        scrollTo,
        scrollToTop,
        scrollToElement,
        stop,
        start,
        destroy,
        resize,
        handleRouteChange
      }
    }
  }
}) 