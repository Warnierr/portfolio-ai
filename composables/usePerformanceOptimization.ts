import { ref, onMounted, onUnmounted } from 'vue'

interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
}

interface OptimizationConfig {
  enableLazyLoading: boolean
  enableImageOptimization: boolean
  enablePrefetching: boolean
  enableCaching: boolean
  enableCompression: boolean
}

export const usePerformanceOptimization = () => {
  const metrics = ref<Partial<PerformanceMetrics>>({})
  const config = ref<OptimizationConfig>({
    enableLazyLoading: true,
    enableImageOptimization: true,
    enablePrefetching: true,
    enableCaching: true,
    enableCompression: true
  })

  // Lazy Loading pour les images
  const setupLazyLoading = () => {
    if (!config.value.enableLazyLoading) return

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.removeAttribute('data-src')
            imageObserver.unobserve(img)
          }
        }
      })
    })

    // Observer toutes les images avec data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img)
    })
  }

  // Préchargement des ressources critiques
  const setupResourcePrefetching = () => {
    if (!config.value.enablePrefetching) return

    const criticalResources = [
      '/fonts/inter-var.woff2',
      '/images/hero-bg.webp',
      '/images/nina-avatar.webp'
    ]

    criticalResources.forEach(resource => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = resource
      
      if (resource.includes('.woff2')) {
        link.as = 'font'
        link.type = 'font/woff2'
        link.crossOrigin = 'anonymous'
      } else if (resource.includes('.webp')) {
        link.as = 'image'
      }
      
      document.head.appendChild(link)
    })
  }

  // Optimisation des images
  const optimizeImages = () => {
    if (!config.value.enableImageOptimization) return

    const images = document.querySelectorAll('img')
    
    images.forEach(img => {
      // Ajouter loading="lazy" si pas déjà présent
      if (!img.hasAttribute('loading')) {
        img.loading = 'lazy'
      }

      // Optimiser les formats d'image
      if (img.src && !img.src.includes('.webp')) {
        const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/, '.webp')
        
        // Vérifier si la version WebP existe
        fetch(webpSrc, { method: 'HEAD' })
          .then(response => {
            if (response.ok) {
              img.src = webpSrc
            }
          })
          .catch(() => {
            // Ignorer les erreurs, garder l'image originale
          })
      }
    })
  }

  // Mise en cache intelligente
  const setupIntelligentCaching = () => {
    if (!config.value.enableCaching) return

    // Cache des ressources statiques
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker enregistré:', registration)
        })
        .catch(error => {
          console.log('Erreur Service Worker:', error)
        })
    }

    // Cache des données API
    const apiCache = new Map()
    
    const originalFetch = window.fetch
    window.fetch = async (url, options) => {
      const cacheKey = typeof url === 'string' ? url : url.toString()
      
      // Vérifier le cache pour les requêtes GET
      if (!options || options.method === 'GET') {
        if (apiCache.has(cacheKey)) {
          const cached = apiCache.get(cacheKey)
          if (Date.now() - cached.timestamp < 300000) { // 5 minutes
            return Promise.resolve(new Response(JSON.stringify(cached.data)))
          }
        }
      }

      const response = await originalFetch(url, options)
      
      // Mettre en cache les réponses réussies
      if (response.ok && (!options || options.method === 'GET')) {
        const clonedResponse = response.clone()
        clonedResponse.json().then(data => {
          apiCache.set(cacheKey, {
            data,
            timestamp: Date.now()
          })
        }).catch(() => {
          // Ignorer les erreurs de parsing JSON
        })
      }

      return response
    }
  }

  // Compression des ressources
  const setupCompression = () => {
    if (!config.value.enableCompression) return

    // Compression des données localStorage
    const originalSetItem = localStorage.setItem
    localStorage.setItem = (key: string, value: string) => {
      try {
        // Compression simple pour les grandes valeurs
        if (value.length > 1000) {
          const compressed = LZString.compress(value)
          originalSetItem.call(localStorage, key, compressed)
        } else {
          originalSetItem.call(localStorage, key, value)
        }
      } catch (error) {
        console.warn('Erreur compression localStorage:', error)
        originalSetItem.call(localStorage, key, value)
      }
    }

    const originalGetItem = localStorage.getItem
    localStorage.getItem = (key: string) => {
      try {
        const value = originalGetItem.call(localStorage, key)
        if (value && value.startsWith('ᰁ')) { // Marqueur de compression LZString
          return LZString.decompress(value)
        }
        return value
      } catch (error) {
        console.warn('Erreur décompression localStorage:', error)
        return originalGetItem.call(localStorage, key)
      }
    }
  }

  // Mesure des performances
  const measurePerformance = () => {
    if (!('performance' in window)) return

    // Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.value.fcp = entry.startTime
            }
            break
          case 'largest-contentful-paint':
            metrics.value.lcp = entry.startTime
            break
          case 'first-input':
            metrics.value.fid = (entry as any).processingStart - entry.startTime
            break
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.value.cls = (metrics.value.cls || 0) + (entry as any).value
            }
            break
        }
      })
    })

    // Observer les métriques
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (error) {
      console.warn('Erreur observer performance:', error)
    }

    // TTFB
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      metrics.value.ttfb = navigationEntry.responseStart - navigationEntry.requestStart
    }
  }

  // Optimisation automatique
  const autoOptimize = () => {
    // Optimiser selon les conditions réseau
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Réduire la qualité pour les connexions lentes
        config.value.enableImageOptimization = true
        config.value.enableCompression = true
        
        // Réduire les animations
        document.documentElement.style.setProperty('--animation-duration', '0.1s')
      }
    }

    // Optimiser selon la mémoire disponible
    if ('memory' in performance) {
      const memory = (performance as any).memory
      
      if (memory.usedJSHeapSize > memory.totalJSHeapSize * 0.8) {
        // Nettoyer le cache si la mémoire est faible
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              if (name.includes('old-')) {
                caches.delete(name)
              }
            })
          })
        }
      }
    }
  }

  // Initialisation
  const initPerformanceOptimization = () => {
    if (!process.client) return

    setupLazyLoading()
    setupResourcePrefetching()
    optimizeImages()
    setupIntelligentCaching()
    setupCompression()
    measurePerformance()
    autoOptimize()

    // Optimisation continue
    setInterval(autoOptimize, 30000) // Toutes les 30 secondes
  }

  // Rapport de performance
  const getPerformanceReport = () => {
    return {
      metrics: metrics.value,
      config: config.value,
      recommendations: generateRecommendations()
    }
  }

  const generateRecommendations = () => {
    const recommendations = []

    if (metrics.value.lcp && metrics.value.lcp > 2500) {
      recommendations.push('Optimiser le Largest Contentful Paint (LCP)')
    }

    if (metrics.value.fid && metrics.value.fid > 100) {
      recommendations.push('Réduire le First Input Delay (FID)')
    }

    if (metrics.value.cls && metrics.value.cls > 0.1) {
      recommendations.push('Améliorer la stabilité du layout (CLS)')
    }

    if (metrics.value.ttfb && metrics.value.ttfb > 800) {
      recommendations.push('Optimiser le Time to First Byte (TTFB)')
    }

    return recommendations
  }

  return {
    metrics: readonly(metrics),
    config: readonly(config),
    initPerformanceOptimization,
    getPerformanceReport,
    optimizeImages,
    setupLazyLoading
  }
}

// Utilitaire de compression simple (fallback si LZString n'est pas disponible)
const LZString = {
  compress: (str: string) => {
    return 'ᰁ' + btoa(str) // Marqueur + base64 simple
  },
  decompress: (str: string) => {
    return atob(str.slice(1)) // Enlever le marqueur et décoder
  }
} 