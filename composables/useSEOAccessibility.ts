interface SEOConfig {
  title: string
  description: string
  keywords: string[]
  author: string
  image: string
  url: string
  type: string
  locale: string
}

interface AccessibilityConfig {
  enableKeyboardNavigation: boolean
  enableScreenReader: boolean
  enableHighContrast: boolean
  enableReducedMotion: boolean
  fontSize: 'small' | 'medium' | 'large'
}

export const useSEOAccessibility = () => {
  // Configuration SEO par défaut
  const defaultSEOConfig = {
    title: 'Raouf WARNIER - Ingénieur DevOps & Expert IA | Portfolio',
    description: 'Portfolio de Raouf WARNIER, Ingénieur DevOps chez Inetum-Orange et Expert en Intelligence Artificielle. Spécialisé en Big Data, automatisation et développement d\'agents IA comme Nina AI.',
    keywords: [
      'Raouf WARNIER',
      'Ingénieur DevOps',
      'Expert IA',
      'Intelligence Artificielle',
      'Big Data',
      'Nina AI',
      'Inetum Orange',
      'ESIEE Paris',
      'Data Science',
      'Machine Learning',
      'Python',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'Automatisation',
      'Portfolio'
    ],
    author: 'Raouf WARNIER',
    image: '/images/raouf-warnier-portfolio.jpg',
    url: 'https://raouf-warnier.vercel.app',
    type: 'website',
    locale: 'fr_FR'
  }

  // Configuration d'accessibilité
  const accessibilityConfig = ref({
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    enableHighContrast: false,
    enableReducedMotion: false,
    fontSize: 'medium' as 'small' | 'medium' | 'large'
  })

  // État de l'accessibilité
  const isKeyboardNavigating = ref(false)
  const currentFocusIndex = ref(0)
  const focusableElements = ref<HTMLElement[]>([])

  // Configurer les métadonnées SEO
  const setSEOConfig = (config: Partial<typeof defaultSEOConfig>) => {
    const finalConfig = { ...defaultSEOConfig, ...config }
    
    useHead({
      title: finalConfig.title,
      meta: [
        // Métadonnées de base
        { name: 'description', content: finalConfig.description },
        { name: 'keywords', content: finalConfig.keywords.join(', ') },
        { name: 'author', content: finalConfig.author },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'fr' },
        { name: 'revisit-after', content: '7 days' },
        
        // Open Graph (Facebook, LinkedIn, etc.)
        { property: 'og:title', content: finalConfig.title },
        { property: 'og:description', content: finalConfig.description },
        { property: 'og:image', content: finalConfig.image },
        { property: 'og:url', content: finalConfig.url },
        { property: 'og:type', content: finalConfig.type },
        { property: 'og:locale', content: finalConfig.locale },
        { property: 'og:site_name', content: 'Portfolio Raouf WARNIER' },
        
        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: finalConfig.title },
        { name: 'twitter:description', content: finalConfig.description },
        { name: 'twitter:image', content: finalConfig.image },
        { name: 'twitter:creator', content: '@raouf_warnier' },
        
        // Métadonnées techniques
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#6366f1' },
        { name: 'msapplication-TileColor', content: '#6366f1' }
      ],
      link: [
        // Favicon
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: finalConfig.url },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ],
      script: [
        // Schema.org JSON-LD
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Raouf WARNIER',
            jobTitle: 'Ingénieur DevOps & Expert IA',
            worksFor: {
              '@type': 'Organization',
              name: 'Inetum-Orange'
            },
            alumniOf: {
              '@type': 'EducationalOrganization',
              name: 'ESIEE Paris'
            },
            url: finalConfig.url,
            image: finalConfig.image,
            sameAs: [
              'https://linkedin.com/in/raouf-warnier',
              'https://github.com/raouf-warnier'
            ],
            knowsAbout: [
              'DevOps',
              'Intelligence Artificielle',
              'Big Data',
              'Machine Learning',
              'Data Science',
              'Automatisation',
              'CI/CD'
            ]
          })
        }
      ]
    })
  }

  // Initialiser les éléments focusables pour la navigation clavier
  const initKeyboardNavigation = () => {
    if (!process.client) return

    const selector = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    focusableElements.value = Array.from(document.querySelectorAll(selector)) as HTMLElement[]
    
    // Ajouter les événements clavier
    document.addEventListener('keydown', handleKeyboardNavigation)
    
    // Détecter l'utilisation du clavier
    document.addEventListener('mousedown', () => {
      isKeyboardNavigating.value = false
      document.body.classList.remove('keyboard-navigation')
    })
  }

  // Gérer la navigation au clavier
  const handleKeyboardNavigation = (e: KeyboardEvent) => {
    // Détecter l'utilisation du clavier
    if (e.key === 'Tab') {
      isKeyboardNavigating.value = true
      document.body.classList.add('keyboard-navigation')
    }

    // Raccourcis d'accessibilité
    if (e.altKey) {
      switch (e.key) {
        case '1':
          e.preventDefault()
          scrollToSection('hero')
          break
        case '2':
          e.preventDefault()
          scrollToSection('about')
          break
        case '3':
          e.preventDefault()
          scrollToSection('projects')
          break
        case '4':
          e.preventDefault()
          scrollToSection('services')
          break
        case '5':
          e.preventDefault()
          scrollToSection('contact')
          break
        case 'c':
          e.preventDefault()
          toggleHighContrast()
          break
        case 'm':
          e.preventDefault()
          toggleReducedMotion()
          break
      }
    }
  }

  // Navigation vers les sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      element.focus()
    }
  }

  // Basculer le contraste élevé
  const toggleHighContrast = () => {
    accessibilityConfig.value.enableHighContrast = !accessibilityConfig.value.enableHighContrast
    
    if (accessibilityConfig.value.enableHighContrast) {
      document.body.classList.add('high-contrast')
    } else {
      document.body.classList.remove('high-contrast')
    }
    
    // Sauvegarder la préférence
    localStorage.setItem('high-contrast', accessibilityConfig.value.enableHighContrast.toString())
  }

  // Basculer les animations réduites
  const toggleReducedMotion = () => {
    accessibilityConfig.value.enableReducedMotion = !accessibilityConfig.value.enableReducedMotion
    
    if (accessibilityConfig.value.enableReducedMotion) {
      document.body.classList.add('reduced-motion')
    } else {
      document.body.classList.remove('reduced-motion')
    }
    
    // Sauvegarder la préférence
    localStorage.setItem('reduced-motion', accessibilityConfig.value.enableReducedMotion.toString())
  }

  // Changer la taille de police
  const setFontSize = (size: 'small' | 'medium' | 'large') => {
    accessibilityConfig.value.fontSize = size
    
    document.body.classList.remove('font-small', 'font-medium', 'font-large')
    document.body.classList.add(`font-${size}`)
    
    // Sauvegarder la préférence
    localStorage.setItem('font-size', size)
  }

  // Charger les préférences sauvegardées
  const loadSavedPreferences = () => {
    if (!process.client) return

    // Contraste élevé
    const highContrast = localStorage.getItem('high-contrast')
    if (highContrast === 'true') {
      accessibilityConfig.value.enableHighContrast = true
      document.body.classList.add('high-contrast')
    }

    // Animations réduites
    const reducedMotion = localStorage.getItem('reduced-motion')
    if (reducedMotion === 'true') {
      accessibilityConfig.value.enableReducedMotion = true
      document.body.classList.add('reduced-motion')
    }

    // Taille de police
    const fontSize = localStorage.getItem('font-size') as 'small' | 'medium' | 'large'
    if (fontSize) {
      setFontSize(fontSize)
    }

    // Détecter les préférences système
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      accessibilityConfig.value.enableReducedMotion = true
      document.body.classList.add('reduced-motion')
    }

    if (window.matchMedia('(prefers-contrast: high)').matches) {
      accessibilityConfig.value.enableHighContrast = true
      document.body.classList.add('high-contrast')
    }
  }

  // Ajouter les styles d'accessibilité
  const addAccessibilityStyles = () => {
    if (document.getElementById('accessibility-styles')) return

    const styles = document.createElement('style')
    styles.id = 'accessibility-styles'
    styles.textContent = `
      /* Navigation clavier */
      .keyboard-navigation *:focus {
        outline: 2px solid #6366f1 !important;
        outline-offset: 2px !important;
      }

      /* Contraste élevé */
      .high-contrast {
        filter: contrast(150%) brightness(1.2);
      }

      /* Animations réduites */
      .reduced-motion *,
      .reduced-motion *::before,
      .reduced-motion *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }

      /* Tailles de police */
      .font-small { font-size: 0.875rem; }
      .font-medium { font-size: 1rem; }
      .font-large { font-size: 1.125rem; }

      /* Skip links */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: #6366f1;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
      }

      .skip-link:focus {
        top: 6px;
      }

      /* Respect des préférences système */
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `
    
    document.head.appendChild(styles)
  }

  // Initialiser l'accessibilité
  const initAccessibility = () => {
    if (!process.client) return

    loadSavedPreferences()
    addAccessibilityStyles()
    initKeyboardNavigation()
    
    // Ajouter les attributs alt manquants
    setTimeout(() => {
      const images = document.querySelectorAll('img:not([alt])')
      images.forEach((img, index) => {
        img.setAttribute('alt', `Image ${index + 1} du portfolio de Raouf WARNIER`)
      })
    }, 1000)
  }

  // Nettoyer les événements
  const cleanupAccessibility = () => {
    document.removeEventListener('keydown', handleKeyboardNavigation)
  }

  return {
    accessibilityConfig: readonly(accessibilityConfig),
    isKeyboardNavigating: readonly(isKeyboardNavigating),
    setSEOConfig,
    initAccessibility,
    cleanupAccessibility,
    toggleHighContrast,
    toggleReducedMotion,
    setFontSize,
    scrollToSection
  }
} 