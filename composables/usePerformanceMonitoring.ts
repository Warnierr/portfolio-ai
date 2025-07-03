interface PerformanceMetrics {
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  fcp: number | null // First Contentful Paint
  ttfb: number | null // Time to First Byte
  loadTime: number | null
  domContentLoaded: number | null
  timestamp: number
}

interface UserInteraction {
  type: string
  target: string
  timestamp: number
  duration?: number
  path: string
}

interface PageView {
  path: string
  timestamp: number
  referrer: string
  userAgent: string
  sessionId: string
}

export const usePerformanceMonitoring = () => {
  const metrics = ref<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    loadTime: null,
    domContentLoaded: null,
    timestamp: Date.now()
  })

  const interactions = ref<UserInteraction[]>([])
  const pageViews = ref<PageView[]>([])
  const sessionId = ref<string>('')

  // Génération d'un ID de session unique
  const generateSessionId = (): string => {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
  }

  // Initialisation du monitoring
  const initializeMonitoring = () => {
    sessionId.value = generateSessionId()
    
    // Observer les Core Web Vitals
    observeWebVitals()
    
    // Observer les interactions utilisateur
    observeUserInteractions()
    
    // Observer les vues de page
    observePageViews()
    
    // Mesurer les performances de navigation
    measureNavigationMetrics()
  }

  // Observer les Core Web Vitals
  const observeWebVitals = () => {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          metrics.value.lcp = lastEntry.startTime
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          entries.forEach((entry: any) => {
            metrics.value.fid = entry.processingStart - entry.startTime
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift (CLS)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
              metrics.value.cls = clsValue
            }
          })
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        // First Contentful Paint (FCP)
        const fcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries()
          entries.forEach((entry: any) => {
            if (entry.name === 'first-contentful-paint') {
              metrics.value.fcp = entry.startTime
            }
          })
        })
        fcpObserver.observe({ entryTypes: ['paint'] })

      } catch (error) {
        console.warn('Performance Observer not fully supported:', error)
      }
    }
  }

  // Mesurer les métriques de navigation
  const measureNavigationMetrics = () => {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[]
      
      if (navigationEntries.length > 0) {
        const navigation = navigationEntries[0]
        
        metrics.value.ttfb = navigation.responseStart - navigation.requestStart
        metrics.value.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
        metrics.value.loadTime = navigation.loadEventEnd - navigation.fetchStart
      }
    }
  }

  // Observer les interactions utilisateur
  const observeUserInteractions = () => {
    const trackInteraction = (type: string, event: Event) => {
      const target = (event.target as Element)?.tagName?.toLowerCase() || 'unknown'
      const interaction: UserInteraction = {
        type,
        target,
        timestamp: Date.now(),
        path: window.location.pathname
      }
      
      interactions.value.push(interaction)
      
      // Limiter le nombre d'interactions stockées
      if (interactions.value.length > 100) {
        interactions.value = interactions.value.slice(-50)
      }
    }

    // Écouter les clics
    document.addEventListener('click', (e) => trackInteraction('click', e))
    
    // Écouter les scrolls (throttled)
    let scrollTimeout: NodeJS.Timeout
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        trackInteraction('scroll', new Event('scroll'))
      }, 100)
    })

    // Écouter les touches clavier
    document.addEventListener('keydown', (e) => trackInteraction('keydown', e))
  }

  // Observer les vues de page
  const observePageViews = () => {
    const trackPageView = () => {
      const pageView: PageView = {
        path: window.location.pathname,
        timestamp: Date.now(),
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        sessionId: sessionId.value
      }
      
      pageViews.value.push(pageView)
    }

    // Vue initiale
    trackPageView()

    // Observer les changements de route (pour SPA)
    if (window.history && window.history.pushState) {
      const originalPushState = window.history.pushState
      window.history.pushState = function(...args) {
        originalPushState.apply(window.history, args)
        setTimeout(trackPageView, 0)
      }

      const originalReplaceState = window.history.replaceState
      window.history.replaceState = function(...args) {
        originalReplaceState.apply(window.history, args)
        setTimeout(trackPageView, 0)
      }

      window.addEventListener('popstate', trackPageView)
    }
  }

  // Calculer le score de performance global
  const getPerformanceScore = computed(() => {
    let score = 100
    
    // LCP scoring (0-2.5s = good, 2.5-4s = needs improvement, >4s = poor)
    if (metrics.value.lcp !== null) {
      if (metrics.value.lcp > 4000) score -= 30
      else if (metrics.value.lcp > 2500) score -= 15
    }

    // FID scoring (0-100ms = good, 100-300ms = needs improvement, >300ms = poor)
    if (metrics.value.fid !== null) {
      if (metrics.value.fid > 300) score -= 25
      else if (metrics.value.fid > 100) score -= 10
    }

    // CLS scoring (0-0.1 = good, 0.1-0.25 = needs improvement, >0.25 = poor)
    if (metrics.value.cls !== null) {
      if (metrics.value.cls > 0.25) score -= 25
      else if (metrics.value.cls > 0.1) score -= 10
    }

    // FCP scoring (0-1.8s = good, 1.8-3s = needs improvement, >3s = poor)
    if (metrics.value.fcp !== null) {
      if (metrics.value.fcp > 3000) score -= 20
      else if (metrics.value.fcp > 1800) score -= 10
    }

    return Math.max(0, score)
  })

  // Obtenir les métriques formatées
  const getFormattedMetrics = computed(() => {
    return {
      lcp: metrics.value.lcp ? `${(metrics.value.lcp / 1000).toFixed(2)}s` : 'N/A',
      fid: metrics.value.fid ? `${metrics.value.fid.toFixed(2)}ms` : 'N/A',
      cls: metrics.value.cls ? metrics.value.cls.toFixed(3) : 'N/A',
      fcp: metrics.value.fcp ? `${(metrics.value.fcp / 1000).toFixed(2)}s` : 'N/A',
      ttfb: metrics.value.ttfb ? `${metrics.value.ttfb.toFixed(2)}ms` : 'N/A',
      loadTime: metrics.value.loadTime ? `${(metrics.value.loadTime / 1000).toFixed(2)}s` : 'N/A',
      score: getPerformanceScore.value
    }
  })

  // Statistiques d'engagement
  const getEngagementStats = computed(() => {
    const now = Date.now()
    const last5Minutes = interactions.value.filter(i => now - i.timestamp < 5 * 60 * 1000)
    
    return {
      totalInteractions: interactions.value.length,
      recentInteractions: last5Minutes.length,
      uniquePages: [...new Set(pageViews.value.map(pv => pv.path))].length,
      sessionDuration: pageViews.value.length > 0 ? 
        now - pageViews.value[0].timestamp : 0,
      averageTimePerPage: pageViews.value.length > 1 ? 
        (now - pageViews.value[0].timestamp) / pageViews.value.length : 0
    }
  })

  // Détecter les problèmes de performance
  const getPerformanceIssues = computed(() => {
    const issues: string[] = []

    if (metrics.value.lcp && metrics.value.lcp > 2500) {
      issues.push('LCP trop élevé - Optimiser le chargement du contenu principal')
    }

    if (metrics.value.fid && metrics.value.fid > 100) {
      issues.push('FID élevé - Réduire le JavaScript bloquant')
    }

    if (metrics.value.cls && metrics.value.cls > 0.1) {
      issues.push('CLS élevé - Stabiliser la mise en page')
    }

    if (metrics.value.loadTime && metrics.value.loadTime > 3000) {
      issues.push('Temps de chargement lent - Optimiser les ressources')
    }

    return issues
  })

  // Envoyer les métriques à un service d'analytics (simulé)
  const sendAnalytics = async () => {
    const data = {
      metrics: metrics.value,
      interactions: interactions.value.slice(-10), // Dernières 10 interactions
      pageViews: pageViews.value,
      engagement: getEngagementStats.value,
      performanceScore: getPerformanceScore.value,
      issues: getPerformanceIssues.value,
      sessionId: sessionId.value,
      timestamp: Date.now()
    }

    try {
      // Simulation d'envoi d'analytics
      console.log('📊 Analytics Data:', data)
      
      // En production, envoyer vers un service comme Google Analytics, Mixpanel, etc.
      // await $fetch('/api/analytics', { method: 'POST', body: data })
      
    } catch (error) {
      console.error('Erreur envoi analytics:', error)
    }
  }

  // Surveillance automatique des performances
  const startPerformanceMonitoring = () => {
    initializeMonitoring()

    // Envoyer les métriques périodiquement
    const analyticsInterval = setInterval(() => {
      sendAnalytics()
    }, 30000) // Toutes les 30 secondes

    // Envoyer les métriques avant de quitter la page
    window.addEventListener('beforeunload', () => {
      clearInterval(analyticsInterval)
      sendAnalytics()
    })

    // Surveiller les changements de visibilité
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        sendAnalytics()
      }
    })
  }

  // Obtenir un rapport complet
  const getPerformanceReport = () => {
    return {
      metrics: getFormattedMetrics.value,
      engagement: getEngagementStats.value,
      issues: getPerformanceIssues.value,
      score: getPerformanceScore.value,
      recommendations: getPerformanceRecommendations()
    }
  }

  // Recommandations d'optimisation
  const getPerformanceRecommendations = () => {
    const recommendations: string[] = []

    if (metrics.value.lcp && metrics.value.lcp > 2500) {
      recommendations.push('🖼️ Optimiser les images et utiliser des formats modernes (WebP, AVIF)')
      recommendations.push('🚀 Implémenter le lazy loading pour les ressources non critiques')
      recommendations.push('📦 Réduire la taille des bundles JavaScript')
    }

    if (metrics.value.fid && metrics.value.fid > 100) {
      recommendations.push('⚡ Diviser le code en chunks plus petits')
      recommendations.push('🔄 Utiliser des Web Workers pour les tâches lourdes')
      recommendations.push('📱 Optimiser l\'hydratation côté client')
    }

    if (metrics.value.cls && metrics.value.cls > 0.1) {
      recommendations.push('📐 Définir des dimensions explicites pour les images et vidéos')
      recommendations.push('🎨 Éviter l\'injection de contenu dynamique au-dessus du contenu existant')
      recommendations.push('🔤 Précharger les polices personnalisées')
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Performances excellentes ! Continuez le bon travail.')
    }

    return recommendations
  }

  return {
    metrics: readonly(metrics),
    interactions: readonly(interactions),
    pageViews: readonly(pageViews),
    sessionId: readonly(sessionId),
    performanceScore: getPerformanceScore,
    formattedMetrics: getFormattedMetrics,
    engagementStats: getEngagementStats,
    performanceIssues: getPerformanceIssues,
    startPerformanceMonitoring,
    getPerformanceReport,
    sendAnalytics
  }
} 