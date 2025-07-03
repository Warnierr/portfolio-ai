<template>
  <div class="blog-raouf">
    <!-- Header de la page -->
    <section class="blog-header">
      <div class="container">
        <div class="header-content">
          <div class="author-info">
            <div class="author-avatar">
              <Icon name="mdi:account-circle" size="80" />
            </div>
            <div class="author-details">
              <h1 class="author-name">Raouf WARNIER</h1>
              <p class="author-title">Développeur Full-Stack & Architecte Solutions</p>
              <div class="author-stats">
                <span class="stat">
                  <Icon name="mdi:post" />
                  {{ articles.length }} articles
                </span>
                <span class="stat">
                  <Icon name="mdi:eye" />
                  {{ totalViews.toLocaleString() }} vues
                </span>
                <span class="stat">
                  <Icon name="mdi:calendar" />
                  Depuis {{ startYear }}
                </span>
              </div>
            </div>
          </div>
          <div class="blog-description">
            <p>
              Bienvenue sur mon blog personnel ! Ici, je partage mes réflexions, 
              expériences et découvertes dans le monde du développement web, 
              de l'intelligence artificielle et de l'innovation technologique.
            </p>
            <div class="specialties">
              <span class="specialty">Vue.js</span>
              <span class="specialty">Nuxt 3</span>
              <span class="specialty">TypeScript</span>
              <span class="specialty">IA Générative</span>
              <span class="specialty">Architecture</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation du blog -->
    <section class="blog-nav">
      <div class="container">
        <div class="nav-content">
          <div class="nav-links">
            <NuxtLink to="/blog/raouf" class="nav-link active">
              <Icon name="mdi:account" />
              Blog Raouf
            </NuxtLink>
            <NuxtLink to="/blog/nina" class="nav-link">
              <Icon name="mdi:robot" />
              Blog Nina AI
            </NuxtLink>
            <NuxtLink to="/" class="nav-link">
              <Icon name="mdi:home" />
              Portfolio
            </NuxtLink>
          </div>
          <div class="search-bar">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Rechercher un article..."
              class="search-input"
            />
            <Icon name="mdi:magnify" class="search-icon" />
          </div>
        </div>
      </div>
    </section>

    <!-- Filtres et catégories -->
    <section class="blog-filters">
      <div class="container">
        <div class="filters-content">
          <div class="categories">
            <button 
              v-for="category in categories" 
              :key="category.id"
              :class="['category-btn', { active: selectedCategory === category.id }]"
              @click="selectedCategory = category.id"
            >
              <Icon :name="category.icon" />
              {{ category.name }}
              <span class="count">{{ category.count }}</span>
            </button>
          </div>
          <div class="sort-options">
            <select v-model="sortBy" class="sort-select">
              <option value="date">Plus récent</option>
              <option value="views">Plus populaire</option>
              <option value="title">Alphabétique</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles du blog -->
    <section class="blog-articles">
      <div class="container">
        <div class="articles-grid">
          <article 
            v-for="article in filteredArticles" 
            :key="article.id"
            class="article-card"
            @click="openArticle(article)"
          >
            <div class="article-image">
              <img :src="article.image" :alt="article.title" />
              <div class="article-overlay">
                <span class="read-time">{{ article.readTime }} min</span>
                <span class="category">{{ getCategoryName(article.category) }}</span>
              </div>
            </div>
            <div class="article-content">
              <div class="article-meta">
                <span class="date">{{ formatDate(article.date) }}</span>
                <span class="views">{{ article.views }} vues</span>
              </div>
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <div class="article-tags">
                <span v-for="tag in article.tags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
              <div class="article-footer">
                <div class="engagement">
                  <span class="likes">
                    <Icon name="mdi:heart" />
                    {{ article.likes }}
                  </span>
                  <span class="comments">
                    <Icon name="mdi:comment" />
                    {{ article.comments }}
                  </span>
                </div>
                <button class="read-more">
                  Lire la suite
                  <Icon name="mdi:arrow-right" />
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button 
            v-if="currentPage > 1" 
            @click="currentPage--"
            class="page-btn"
          >
            <Icon name="mdi:chevron-left" />
            Précédent
          </button>
          <span class="page-info">
            Page {{ currentPage }} sur {{ totalPages }}
          </span>
          <button 
            v-if="currentPage < totalPages" 
            @click="currentPage++"
            class="page-btn"
          >
            Suivant
            <Icon name="mdi:chevron-right" />
          </button>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
      <div class="container">
        <div class="newsletter-content">
          <h3>Restez informé</h3>
          <p>Recevez mes derniers articles directement dans votre boîte mail</p>
          <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Votre adresse email"
              class="newsletter-input"
              required
            />
            <button type="submit" class="newsletter-btn">
              S'abonner
              <Icon name="mdi:send" />
            </button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Métadonnées de la page
useHead({
  title: 'Blog Raouf WARNIER - Développeur Full-Stack & Architecte Solutions',
  meta: [
    { name: 'description', content: 'Blog personnel de Raouf WARNIER. Découvrez mes articles sur le développement web, l\'IA générative et l\'innovation technologique.' },
    { name: 'keywords', content: 'Raouf WARNIER, blog, développement web, Vue.js, Nuxt, TypeScript, IA générative, architecture' },
    { property: 'og:title', content: 'Blog Raouf WARNIER' },
    { property: 'og:description', content: 'Articles sur le développement web et l\'innovation technologique' },
    { property: 'og:type', content: 'website' }
  ]
})

// État réactif
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('date')
const currentPage = ref(1)
const email = ref('')
const articlesPerPage = 6

// Données des articles
const articles = ref([
  {
    id: 1,
    title: 'Construire une Architecture Moderne avec Nuxt 3 et TypeScript',
    excerpt: 'Découvrez comment créer une architecture robuste et scalable avec Nuxt 3, TypeScript et les meilleures pratiques du développement moderne.',
    content: '',
    image: '/blog/nuxt-architecture.jpg',
    category: 'development',
    tags: ['Nuxt 3', 'TypeScript', 'Architecture', 'Vue.js'],
    date: new Date('2024-12-15'),
    readTime: 8,
    views: 1250,
    likes: 45,
    comments: 12,
    author: 'Raouf WARNIER'
  },
  {
    id: 2,
    title: 'L\'IA Générative au Service du Développement Web',
    excerpt: 'Comment j\'ai intégré l\'IA générative dans mes projets pour automatiser la création de contenu et améliorer l\'expérience utilisateur.',
    content: '',
    image: '/blog/ia-generative-dev.jpg',
    category: 'ai',
    tags: ['IA Générative', 'Automatisation', 'Innovation', 'Productivité'],
    date: new Date('2024-12-10'),
    readTime: 12,
    views: 2100,
    likes: 78,
    comments: 23,
    author: 'Raouf WARNIER'
  },
  {
    id: 3,
    title: 'Optimisation des Performances avec GSAP et Lenis',
    excerpt: 'Techniques avancées pour créer des animations fluides et performantes avec GSAP et Lenis dans vos applications web.',
    content: '',
    image: '/blog/gsap-performance.jpg',
    category: 'performance',
    tags: ['GSAP', 'Lenis', 'Animations', 'Performance'],
    date: new Date('2024-12-05'),
    readTime: 10,
    views: 890,
    likes: 34,
    comments: 8,
    author: 'Raouf WARNIER'
  },
  {
    id: 4,
    title: 'Retour d\'Expérience : Migration vers Nuxt 3',
    excerpt: 'Les défis, solutions et bénéfices de la migration d\'un projet Vue 2 vers Nuxt 3. Un guide pratique basé sur mon expérience.',
    content: '',
    image: '/blog/nuxt-migration.jpg',
    category: 'experience',
    tags: ['Nuxt 3', 'Migration', 'Vue.js', 'Retour d\'expérience'],
    date: new Date('2024-11-28'),
    readTime: 15,
    views: 1560,
    likes: 62,
    comments: 18,
    author: 'Raouf WARNIER'
  },
  {
    id: 5,
    title: 'Créer un Agent IA Conversationnel avec Claude AI',
    excerpt: 'Guide complet pour développer un agent IA conversationnel intelligent intégré dans une application web moderne.',
    content: '',
    image: '/blog/claude-ai-agent.jpg',
    category: 'ai',
    tags: ['Claude AI', 'Agent IA', 'Conversation', 'Innovation'],
    date: new Date('2024-11-20'),
    readTime: 18,
    views: 3200,
    likes: 125,
    comments: 35,
    author: 'Raouf WARNIER'
  },
  {
    id: 6,
    title: 'Accessibilité Web : Au-delà des Standards WCAG',
    excerpt: 'Comment créer des expériences web vraiment inclusives en allant au-delà des standards WCAG traditionnels.',
    content: '',
    image: '/blog/accessibility-web.jpg',
    category: 'accessibility',
    tags: ['Accessibilité', 'WCAG', 'Inclusivité', 'UX'],
    date: new Date('2024-11-15'),
    readTime: 12,
    views: 980,
    likes: 41,
    comments: 14,
    author: 'Raouf WARNIER'
  }
])

// Catégories
const categories = ref([
  { id: 'all', name: 'Tous', icon: 'mdi:view-grid', count: articles.value.length },
  { id: 'development', name: 'Développement', icon: 'mdi:code-tags', count: articles.value.filter(a => a.category === 'development').length },
  { id: 'ai', name: 'Intelligence Artificielle', icon: 'mdi:robot', count: articles.value.filter(a => a.category === 'ai').length },
  { id: 'performance', name: 'Performance', icon: 'mdi:speedometer', count: articles.value.filter(a => a.category === 'performance').length },
  { id: 'experience', name: 'Expérience', icon: 'mdi:lightbulb', count: articles.value.filter(a => a.category === 'experience').length },
  { id: 'accessibility', name: 'Accessibilité', icon: 'mdi:human-handsup', count: articles.value.filter(a => a.category === 'accessibility').length }
])

// Computed
const totalViews = computed(() => articles.value.reduce((sum, article) => sum + article.views, 0))
const startYear = computed(() => 2020)

const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filtrage par catégorie
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }

  // Filtrage par recherche
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Tri
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'views':
        return b.views - a.views
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  // Pagination
  const start = (currentPage.value - 1) * articlesPerPage
  const end = start + articlesPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  let filtered = articles.value
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  return Math.ceil(filtered.length / articlesPerPage)
})

// Méthodes
const getCategoryName = (categoryId: string) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : categoryId
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const openArticle = (article: any) => {
  // Redirection vers l'article complet
  navigateTo(`/blog/raouf/${article.id}`)
}

const subscribeNewsletter = () => {
  if (email.value) {
    // Logique d'abonnement à la newsletter
    console.log('Abonnement newsletter:', email.value)
    email.value = ''
    // Afficher un message de succès
  }
}

// Watcher pour réinitialiser la pagination lors du changement de filtre
watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.blog-raouf {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Header */
.blog-header {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  padding: var(--space-20) 0;
  color: white;
}

.header-content {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-12);
  align-items: center;
}

.author-info {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.author-avatar {
  flex-shrink: 0;
}

.author-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--space-2);
}

.author-title {
  font-size: var(--text-lg);
  opacity: 0.9;
  margin-bottom: var(--space-4);
}

.author-stats {
  display: flex;
  gap: var(--space-6);
  font-size: var(--text-sm);
}

.stat {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.blog-description p {
  font-size: var(--text-lg);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

.specialties {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.specialty {
  background: rgba(255, 255, 255, 0.2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
}

/* Navigation */
.blog-nav {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-primary);
  padding: var(--space-4) 0;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: var(--space-6);
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-base);
}

.nav-link:hover,
.nav-link.active {
  background: var(--accent-primary);
  color: white;
}

.search-bar {
  position: relative;
}

.search-input {
  width: 300px;
  padding: var(--space-3) var(--space-4);
  padding-right: var(--space-10);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.search-icon {
  position: absolute;
  right: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

/* Filtres */
.blog-filters {
  background: var(--bg-primary);
  padding: var(--space-6) 0;
  border-bottom: 1px solid var(--border-primary);
}

.filters-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.categories {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.category-btn:hover,
.category-btn.active {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.count {
  background: rgba(255, 255, 255, 0.2);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: 600;
}

.sort-select {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--text-primary);
}

/* Articles */
.blog-articles {
  padding: var(--space-16) 0;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

.article-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--accent-primary);
}

.article-image {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-overlay {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  display: flex;
  gap: var(--space-2);
}

.read-time,
.category {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
}

.article-content {
  padding: var(--space-6);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.article-title {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-4);
  line-height: 1.3;
}

.article-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
}

.tag {
  background: var(--bg-primary);
  color: var(--accent-primary);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.engagement {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.likes,
.comments {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.read-more {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--accent-primary);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-base);
}

.read-more:hover {
  background: var(--accent-secondary);
  transform: translateX(2px);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-8);
}

.page-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.page-btn:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.page-info {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* Newsletter */
.newsletter {
  background: var(--bg-secondary);
  padding: var(--space-16) 0;
  border-top: 1px solid var(--border-primary);
}

.newsletter-content {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.newsletter-content h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-4);
}

.newsletter-content p {
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}

.newsletter-form {
  display: flex;
  gap: var(--space-3);
}

.newsletter-input {
  flex: 1;
  padding: var(--space-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.newsletter-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  background: var(--accent-primary);
  color: white;
  border-radius: var(--radius-lg);
  font-weight: 500;
  transition: all var(--transition-base);
}

.newsletter-btn:hover {
  background: var(--accent-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .nav-content {
    flex-direction: column;
    gap: var(--space-4);
  }

  .search-input {
    width: 100%;
  }

  .filters-content {
    flex-direction: column;
    align-items: stretch;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .author-stats {
    flex-direction: column;
    gap: var(--space-2);
  }
}
</style> 