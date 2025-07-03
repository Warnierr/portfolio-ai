import { ref, computed } from 'vue'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar?: string
    role: string
  }
  publishedAt: string
  updatedAt?: string
  category: BlogCategory
  tags: string[]
  readTime: number
  featured: boolean
  image?: string
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
}

export const useBlog = () => {
  const posts = ref<BlogPost[]>([])
  const categories = ref<BlogCategory[]>([])
  const isLoading = ref(false)
  const currentPost = ref<BlogPost | null>(null)
  const selectedCategory = ref<string | null>(null)
  const searchQuery = ref('')

  // Catégories de blog
  const blogCategories: BlogCategory[] = [
    {
      id: 'ia-machine-learning',
      name: 'IA & Machine Learning',
      slug: 'ia-machine-learning',
      description: 'Découvertes et innovations en intelligence artificielle',
      color: '#8B5CF6',
      icon: 'mdi:brain'
    },
    {
      id: 'data-engineering',
      name: 'Data Engineering',
      slug: 'data-engineering',
      description: 'Architecture et pipelines de données',
      color: '#06B6D4',
      icon: 'mdi:database-cog'
    },
    {
      id: 'developpement-web',
      name: 'Développement Web',
      slug: 'developpement-web',
      description: 'Technologies web modernes et frameworks',
      color: '#10B981',
      icon: 'mdi:web'
    },
    {
      id: 'automatisation',
      name: 'Automatisation',
      slug: 'automatisation',
      description: 'Scripts et outils d\'automatisation',
      color: '#F59E0B',
      icon: 'mdi:robot'
    },
    {
      id: 'veille-tech',
      name: 'Veille Technologique',
      slug: 'veille-tech',
      description: 'Tendances et actualités tech',
      color: '#EF4444',
      icon: 'mdi:trending-up'
    }
  ]

  // Articles de blog
  const blogPosts: BlogPost[] = [
    {
      id: 'post-1',
      title: 'L\'avenir de l\'IA générative en 2025 : Tendances et opportunités',
      slug: 'avenir-ia-generative-2025',
      excerpt: 'Analyse des tendances émergentes en IA générative et leurs impacts sur le développement d\'applications modernes.',
      content: `
        # L'avenir de l'IA générative en 2025

        L'intelligence artificielle générative connaît une évolution fulgurante. En 2025, nous assistons à une démocratisation sans précédent de ces technologies.

        ## Les tendances clés

        ### 1. Multimodalité native
        Les modèles deviennent naturellement multimodaux, combinant texte, image, audio et vidéo dans une seule interface unifiée.

        ### 2. Agents autonomes
        Développement d'agents IA capables d'actions complexes et de prise de décision autonome.

        ### 3. Optimisation des coûts
        Réduction drastique des coûts d'inférence grâce aux optimisations hardware et software.

        ## Impact sur le développement

        Ces avancées transforment fondamentalement notre approche du développement d'applications...
      `,
      author: {
        name: 'Raouf',
        role: 'Ingénieur Data & IA'
      },
      publishedAt: '2025-01-15',
      category: blogCategories[0],
      tags: ['IA', 'Tendances', '2025', 'Générative'],
      readTime: 8,
      featured: true,
      image: '/blog/ia-generative-2025.jpg',
      seo: {
        metaTitle: 'L\'avenir de l\'IA générative en 2025 - Tendances et opportunités',
        metaDescription: 'Découvrez les tendances émergentes en IA générative et leurs impacts sur le développement d\'applications en 2025.',
        keywords: ['IA générative', 'tendances 2025', 'intelligence artificielle', 'développement']
      }
    },
    {
      id: 'post-2',
      title: 'Construire un pipeline de données moderne avec Python et Apache Airflow',
      slug: 'pipeline-donnees-python-airflow',
      excerpt: 'Guide complet pour créer des pipelines de données robustes et scalables avec les outils modernes.',
      content: `
        # Pipeline de données moderne

        La construction de pipelines de données efficaces est cruciale pour toute organisation data-driven.

        ## Architecture recommandée

        ### 1. Ingestion
        - Apache Kafka pour le streaming
        - Apache Airflow pour l'orchestration
        - dbt pour les transformations

        ### 2. Stockage
        - Data Lake avec S3/MinIO
        - Data Warehouse avec Snowflake/BigQuery
        - Cache avec Redis

        ## Implémentation pratique

        Voici un exemple d'implémentation avec Airflow...
      `,
      author: {
        name: 'Raouf',
        role: 'Ingénieur Data & IA'
      },
      publishedAt: '2025-01-10',
      category: blogCategories[1],
      tags: ['Python', 'Airflow', 'Data Engineering', 'Pipeline'],
      readTime: 12,
      featured: false,
      seo: {
        metaTitle: 'Pipeline de données avec Python et Airflow - Guide complet',
        metaDescription: 'Apprenez à construire des pipelines de données robustes avec Python, Apache Airflow et les meilleures pratiques.',
        keywords: ['pipeline données', 'python', 'airflow', 'data engineering']
      }
    },
    {
      id: 'post-3',
      title: 'Nuxt 3 et GSAP : Créer des animations web spectaculaires',
      slug: 'nuxt3-gsap-animations-web',
      excerpt: 'Techniques avancées pour intégrer GSAP dans Nuxt 3 et créer des expériences utilisateur immersives.',
      content: `
        # Animations web avec Nuxt 3 et GSAP

        L'animation web moderne nécessite des outils puissants et une intégration soignée.

        ## Configuration Nuxt 3

        ### Installation et setup
        \`\`\`bash
        npm install gsap
        \`\`\`

        ### Plugin configuration
        \`\`\`typescript
        // plugins/gsap.client.ts
        import { gsap } from 'gsap'
        import { ScrollTrigger } from 'gsap/ScrollTrigger'

        export default defineNuxtPlugin(() => {
          gsap.registerPlugin(ScrollTrigger)
          return {
            provide: {
              gsap: {
                gsap,
                ScrollTrigger
              }
            }
          }
        })
        \`\`\`

        ## Techniques d'animation

        ### 1. Animations au scroll
        Créer des animations déclenchées par le scroll...

        ### 2. Transitions de page
        Implémenter des transitions fluides...
      `,
      author: {
        name: 'Raouf',
        role: 'Ingénieur Data & IA'
      },
      publishedAt: '2025-01-05',
      category: blogCategories[2],
      tags: ['Nuxt 3', 'GSAP', 'Animations', 'Vue.js'],
      readTime: 10,
      featured: true,
      seo: {
        metaTitle: 'Nuxt 3 et GSAP - Animations web spectaculaires',
        metaDescription: 'Maîtrisez l\'intégration de GSAP dans Nuxt 3 pour créer des animations web immersives et performantes.',
        keywords: ['nuxt 3', 'gsap', 'animations web', 'vue.js']
      }
    },
    {
      id: 'post-4',
      title: 'Automatisation avec GitHub Actions : CI/CD pour projets modernes',
      slug: 'github-actions-cicd-automatisation',
      excerpt: 'Mise en place de workflows d\'automatisation robustes avec GitHub Actions pour le déploiement continu.',
      content: `
        # Automatisation avec GitHub Actions

        GitHub Actions révolutionne l'approche CI/CD avec sa flexibilité et son intégration native.

        ## Workflow de base

        ### Configuration
        \`\`\`yaml
        name: CI/CD Pipeline
        on:
          push:
            branches: [main]
          pull_request:
            branches: [main]

        jobs:
          test:
            runs-on: ubuntu-latest
            steps:
              - uses: actions/checkout@v3
              - name: Setup Node.js
                uses: actions/setup-node@v3
                with:
                  node-version: '18'
              - run: npm ci
              - run: npm test
        \`\`\`

        ## Stratégies avancées

        ### 1. Matrix builds
        Tester sur plusieurs environnements...

        ### 2. Déploiement conditionnel
        Déployer selon les branches...
      `,
      author: {
        name: 'Raouf',
        role: 'Ingénieur Data & IA'
      },
      publishedAt: '2025-01-01',
      category: blogCategories[3],
      tags: ['GitHub Actions', 'CI/CD', 'Automatisation', 'DevOps'],
      readTime: 15,
      featured: false,
      seo: {
        metaTitle: 'GitHub Actions CI/CD - Automatisation pour projets modernes',
        metaDescription: 'Apprenez à configurer des workflows GitHub Actions robustes pour l\'automatisation et le déploiement continu.',
        keywords: ['github actions', 'ci/cd', 'automatisation', 'devops']
      }
    }
  ]

  // Initialiser les données
  const initializeBlog = () => {
    categories.value = blogCategories
    posts.value = blogPosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }

  // Posts filtrés
  const filteredPosts = computed(() => {
    let filtered = posts.value

    // Filtrer par catégorie
    if (selectedCategory.value) {
      filtered = filtered.filter(post => post.category.id === selectedCategory.value)
    }

    // Filtrer par recherche
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    return filtered
  })

  // Posts en vedette
  const featuredPosts = computed(() => 
    posts.value.filter(post => post.featured)
  )

  // Posts récents
  const recentPosts = computed(() => 
    posts.value.slice(0, 3)
  )

  // Posts par catégorie
  const postsByCategory = computed(() => {
    const grouped: Record<string, BlogPost[]> = {}
    categories.value.forEach(category => {
      grouped[category.id] = posts.value.filter(post => post.category.id === category.id)
    })
    return grouped
  })

  // Statistiques
  const blogStats = computed(() => ({
    totalPosts: posts.value.length,
    totalCategories: categories.value.length,
    averageReadTime: Math.round(
      posts.value.reduce((sum, post) => sum + post.readTime, 0) / posts.value.length
    ),
    featuredCount: featuredPosts.value.length
  }))

  // Méthodes
  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return posts.value.find(post => post.slug === slug)
  }

  const getCategoryBySlug = (slug: string): BlogCategory | undefined => {
    return categories.value.find(category => category.slug === slug)
  }

  const getRelatedPosts = (post: BlogPost, limit = 3): BlogPost[] => {
    return posts.value
      .filter(p => p.id !== post.id && p.category.id === post.category.id)
      .slice(0, limit)
  }

  const setCurrentPost = (post: BlogPost | null) => {
    currentPost.value = post
  }

  const setSelectedCategory = (categoryId: string | null) => {
    selectedCategory.value = categoryId
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getReadingTime = (content: string): number => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  // Initialiser au montage
  if (process.client) {
    initializeBlog()
  }

  return {
    // État
    posts: readonly(posts),
    categories: readonly(categories),
    isLoading: readonly(isLoading),
    currentPost: readonly(currentPost),
    selectedCategory: readonly(selectedCategory),
    searchQuery: readonly(searchQuery),
    
    // Computed
    filteredPosts,
    featuredPosts,
    recentPosts,
    postsByCategory,
    blogStats,
    
    // Méthodes
    initializeBlog,
    getPostBySlug,
    getCategoryBySlug,
    getRelatedPosts,
    setCurrentPost,
    setSelectedCategory,
    setSearchQuery,
    formatDate,
    getReadingTime
  }
} 