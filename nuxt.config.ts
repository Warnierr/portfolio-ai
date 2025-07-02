// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/seo'
  ],

  // Configuration pour les performances et SEO
  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  // Configuration CSS globale
  css: ['~/assets/css/main.css'],

  // Configuration des plugins
  plugins: [
    '~/plugins/gsap.client.ts',
    '~/plugins/lenis.client.ts'
  ],

  // Configuration SEO
  app: {
    head: {
      title: 'Portfolio - Développeur & Designer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio moderne d\'un développeur créatif spécialisé en développement web et design d\'expériences utilisateur innovantes.' },
        { name: 'keywords', content: 'développeur, designer, portfolio, web development, UI/UX, JavaScript, Vue.js, Nuxt.js' },
        { property: 'og:title', content: 'Portfolio - Développeur & Designer' },
        { property: 'og:description', content: 'Découvrez mes projets et services de développement web créatif' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

  // Configuration SEO avancée
  seo: {
    redirectToCanonicalSiteUrl: true
  },

  // Configuration des icônes
  icon: {
    collections: ['mdi']
  }
})