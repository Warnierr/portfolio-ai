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
    },
    {
      id: 'sciences-decouvertes',
      name: 'Sciences & Découvertes',
      slug: 'sciences-decouvertes',
      description: 'Explorations scientifiques et innovations',
      color: '#7C3AED',
      icon: 'mdi:telescope'
    },
    {
      id: 'litterature-philosophie',
      name: 'Littérature & Philosophie',
      slug: 'litterature-philosophie',
      description: 'Réflexions sur les livres et idées',
      color: '#BE185D',
      icon: 'mdi:book-open-variant'
    },
    {
      id: 'lifestyle-productivite',
      name: 'Lifestyle & Productivité',
      slug: 'lifestyle-productivite',
      description: 'Optimisation personnelle et bien-être',
      color: '#059669',
      icon: 'mdi:leaf'
    },
    {
      id: 'projets-experiences',
      name: 'Projets & Expériences',
      slug: 'projets-experiences',
      description: 'Partage d\'expériences et apprentissages',
      color: '#DC2626',
      icon: 'mdi:rocket-launch'
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
    },
    {
      id: 'post-5',
      title: 'L\'art de la vulgarisation scientifique : Rendre l\'IA accessible',
      slug: 'art-vulgarisation-scientifique-ia',
      excerpt: 'Comment expliquer des concepts complexes d\'IA de manière simple et engageante pour tous les publics.',
      content: `
        # L'art de la vulgarisation scientifique

        La vulgarisation scientifique est un art délicat qui consiste à rendre accessible des concepts complexes sans les dénaturer.

        ## Pourquoi vulgariser l'IA ?

        ### Démocratisation des connaissances
        L'IA ne doit pas rester l'apanage d'une élite technique. Chacun mérite de comprendre les technologies qui transforment notre monde.

        ### Lutte contre la désinformation
        Face aux fantasmes et aux peurs, la vulgarisation apporte des faits et une compréhension rationnelle.

        ## Techniques de vulgarisation

        ### 1. L'analogie puissante
        Comparer l'apprentissage automatique à l'apprentissage humain : un enfant qui apprend à reconnaître un chat.

        ### 2. La métaphore visuelle
        Un réseau de neurones comme un réseau de routes avec des intersections.

        ### 3. L'exemple concret
        Expliquer GPT par "c'est comme avoir un assistant qui a lu tous les livres du monde".

        ## Impact sociétal

        La vulgarisation scientifique crée des citoyens éclairés capables de prendre des décisions informées sur l'avenir technologique.
      `,
      author: {
        name: 'Raouf',
        role: 'Ingénieur Data & IA'
      },
      publishedAt: '2025-01-12',
      category: blogCategories[5],
      tags: ['Vulgarisation', 'Sciences', 'Communication', 'IA'],
      readTime: 6,
      featured: false,
      seo: {
        metaTitle: 'L\'art de la vulgarisation scientifique - Rendre l\'IA accessible',
        metaDescription: 'Découvrez comment expliquer des concepts complexes d\'IA de manière simple et engageante pour tous les publics.',
        keywords: ['vulgarisation scientifique', 'communication', 'IA accessible', 'pédagogie']
      }
    },
    {
      id: 'post-6',
      title: 'Réflexions sur "Sapiens" : L\'IA comme nouvelle révolution cognitive',
      slug: 'reflexions-sapiens-ia-revolution-cognitive',
      excerpt: 'Analyse du livre de Yuval Noah Harari et parallèles avec l\'évolution de l\'intelligence artificielle.',
      content: `
        # Réflexions sur "Sapiens"

        Le livre de Yuval Noah Harari nous invite à repenser notre place dans l'histoire. Aujourd'hui, l'IA pourrait représenter une nouvelle révolution cognitive.

        ## Les trois révolutions selon Harari

        ### 1. Révolution cognitive (-70 000 ans)
        L'émergence du langage et de la pensée abstraite. L'humanité développe la capacité de coopérer en grand nombre.

        ### 2. Révolution agricole (-12 000 ans)
        La domestication des plantes et animaux. Naissance des civilisations sédentaires.

        ### 3. Révolution scientifique (-500 ans)
        L'émergence de la méthode scientifique. Explosion des connaissances et du progrès technique.

        ## L'IA : Une quatrième révolution ?

        ### Amplification cognitive
        Comme l'écriture a amplifié notre mémoire, l'IA amplifie notre capacité de traitement et d'analyse.

        ### Nouvelles formes de coopération
        Les algorithmes permettent des formes inédites de coordination à l'échelle planétaire.

        ### Transformation de l'humanité
        L'IA pourrait nous transformer aussi profondément que l'agriculture ou l'écriture.

        ## Questions philosophiques

        - Que signifie être humain dans un monde d'IA ?
        - Comment préserver notre humanité tout en embrassant le progrès ?
        - L'IA nous libère-t-elle ou nous asservit-elle ?

        Ces questions ne sont pas que techniques, elles sont profondément philosophiques et concernent notre avenir collectif.
      `,
      author: {
        name: 'Raouf',
        role: 'Ingénieur Data & IA'
      },
      publishedAt: '2025-01-08',
      category: blogCategories[6],
      tags: ['Philosophie', 'Sapiens', 'IA', 'Réflexion'],
      readTime: 8,
      featured: false,
      seo: {
        metaTitle: 'Réflexions sur Sapiens - L\'IA comme nouvelle révolution cognitive',
        metaDescription: 'Analyse du livre de Yuval Noah Harari et parallèles avec l\'évolution de l\'intelligence artificielle.',
        keywords: ['sapiens', 'harari', 'philosophie', 'IA', 'révolution cognitive']
      }
    },
    {
      id: 'post-7',
      title: 'Ma routine de productivité : Entre Deep Work et IA',
      slug: 'routine-productivite-deep-work-ia',
      excerpt: 'Comment j\'optimise ma productivité en combinant les principes du Deep Work avec les outils d\'IA.',
      content: `
        # Ma routine de productivité

        Après des années d'expérimentation, j'ai développé une routine qui combine les principes du Deep Work avec les outils d'IA modernes.

        ## Principe du Deep Work

        ### Définition
        Le Deep Work, concept de Cal Newport, désigne la capacité à se concentrer sans distraction sur une tâche cognitivement exigeante.

        ### Mes blocs de Deep Work
        - **6h-9h** : Développement et architecture
        - **14h-17h** : Recherche et rédaction
        - **20h-22h** : Veille et apprentissage

        ## Intégration de l'IA

        ### Nina AI comme assistant
        - Génération d'idées lors de brainstorming
        - Révision et amélioration de textes
        - Résumés de documents longs

        ### Outils d'IA quotidiens
        - **Claude** pour l'analyse et la réflexion
        - **GitHub Copilot** pour le développement
        - **Notion AI** pour l'organisation

        ## Routine matinale

        ### 5h30 - Réveil sans téléphone
        - 10 minutes de méditation
        - Lecture de 20 pages
        - Planification de la journée

        ### 6h00 - Deep Work #1
        - Pas de notifications
        - Musique instrumentale
        - Pomodoro 50/10

        ## Équilibre vie/travail

        ### Déconnexion digitale
        - Pas d'écrans après 22h
        - Weekend sans emails pro
        - Marche quotidienne sans podcast

        ### Apprentissage continu
        - 1 livre par semaine
        - 2 articles scientifiques par jour
        - 1 nouvelle compétence par mois

        Cette routine évolue constamment, mais ces principes restent constants : concentration, équilibre, et amélioration continue.
      `,
      author: {
        name: 'Raouf',
        role: 'Ingénieur Data & IA'
      },
      publishedAt: '2025-01-06',
      category: blogCategories[7],
      tags: ['Productivité', 'Deep Work', 'Routine', 'IA'],
      readTime: 7,
      featured: false,
      seo: {
        metaTitle: 'Ma routine de productivité - Entre Deep Work et IA',
        metaDescription: 'Comment j\'optimise ma productivité en combinant les principes du Deep Work avec les outils d\'IA.',
        keywords: ['productivité', 'deep work', 'routine', 'IA', 'optimisation']
      }
    },
    {
      id: 'post-8',
      title: 'Retour d\'expérience : Créer Nina AI de A à Z',
      slug: 'retour-experience-creer-nina-ai',
      excerpt: 'Le parcours complet de développement de Nina AI : défis techniques, décisions d\'architecture et leçons apprises.',
      content: `
        # Créer Nina AI : Retour d'expérience

        Développer un assistant IA conversationnel de A à Z a été un projet fascinant, rempli de défis techniques et de découvertes.

        ## Genèse du projet

        ### L'idée initiale
        Créer un assistant IA personnalisé pour mon portfolio, capable de répondre aux questions sur mes compétences et projets.

        ### Objectifs fixés
        - Interface conversationnelle naturelle
        - Intégration seamless dans le portfolio
        - Capacité à générer des devis automatiques
        - Prise de rendez-vous intelligente

        ## Défis techniques rencontrés

        ### 1. Architecture conversationnelle
        - Gestion des contextes de conversation
        - Maintien de l'état entre les messages
        - Traitement des intentions utilisateur

        ### 2. Interface utilisateur
        - Widget flottant responsive
        - Animations fluides avec GSAP
        - Gestion des états de chargement

        ### 3. Intégration backend
        - API de traitement des messages
        - Connexion avec services externes
        - Gestion des erreurs et fallbacks

        ## Solutions adoptées

        ### Stack technique
        - **Frontend** : Vue 3 + TypeScript + GSAP
        - **Backend** : Nuxt 3 + Nitro
        - **IA** : API Claude + prompts personnalisés
        - **Styling** : CSS moderne + variables

        ### Patterns architecturaux
        - Composables Vue pour la logique métier
        - State management réactif
        - Composants modulaires et réutilisables

        ## Leçons apprises

        ### 1. L'importance du prompt engineering
        La qualité des réponses dépend énormément de la précision des prompts et du contexte fourni.

        ### 2. UX avant tout
        Un chatbot peut être techniquement parfait, mais s'il n'est pas agréable à utiliser, il échoue.

        ### 3. Gestion des erreurs
        Prévoir tous les cas d'échec et fournir des alternatives gracieuses.

        ## Métriques et résultats

        ### Engagement utilisateur
        - Temps moyen de conversation : 3 minutes
        - Taux de complétion des demandes : 85%
        - Satisfaction utilisateur : 4.7/5

        ### Impact business
        - +40% de demandes de devis
        - +25% de prises de rendez-vous
        - -60% de temps de réponse initial

        ## Prochaines étapes

        ### Améliorations prévues
        - Apprentissage continu des conversations
        - Intégration avec plus de services
        - Personnalisation avancée par utilisateur
        - Support multilingue

        Ce projet m'a confirmé que l'IA conversationnelle est un domaine en pleine expansion avec un potentiel énorme pour améliorer l'expérience utilisateur.
      `,
      author: {
        name: 'Raouf',
        role: 'Ingénieur Data & IA'
      },
      publishedAt: '2025-01-03',
      category: blogCategories[8],
      tags: ['Nina AI', 'Projet', 'Développement', 'IA Conversationnelle'],
      readTime: 12,
      featured: true,
      seo: {
        metaTitle: 'Retour d\'expérience : Créer Nina AI de A à Z',
        metaDescription: 'Le parcours complet de développement de Nina AI : défis techniques, décisions d\'architecture et leçons apprises.',
        keywords: ['nina ai', 'développement', 'retour expérience', 'IA conversationnelle']
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