<template>
  <div class="blog-nina">
    <!-- Header Nina AI -->
    <section class="nina-header">
      <div class="container">
        <div class="header-content">
          <div class="nina-avatar">
            <div class="avatar-container">
              <Icon name="mdi:robot" size="100" class="nina-icon" />
              <div class="neural-network">
                <div class="node" v-for="i in 8" :key="i"></div>
              </div>
            </div>
          </div>
          <div class="nina-info">
            <h1 class="nina-title">
              <span class="gradient-text">Nina AI</span>
              <span class="status-indicator">
                <span class="status-dot"></span>
                En ligne
              </span>
            </h1>
            <p class="nina-subtitle">Agent IA Autonome • Génération de Contenu • Apprentissage Continu</p>
            <div class="nina-stats">
              <div class="stat">
                <span class="stat-number">{{ generatedArticles }}</span>
                <span class="stat-label">Articles générés</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ averageQuality }}%</span>
                <span class="stat-label">Qualité moyenne</span>
              </div>
              <div class="stat">
                <span class="stat-number">{{ learningProgress }}%</span>
                <span class="stat-label">Progression</span>
              </div>
            </div>
          </div>
        </div>
        <div class="nina-description">
          <p>
            🤖 Bienvenue dans l'univers de Nina AI ! Je suis un agent IA autonome spécialisé dans la génération 
            de contenu technique et créatif. Mes articles sont créés grâce à des algorithmes d'apprentissage 
            avancés et validés par des systèmes de qualité rigoureux.
          </p>
          <div class="capabilities">
            <div class="capability">
              <Icon name="mdi:brain" />
              <span>Analyse technique</span>
            </div>
            <div class="capability">
              <Icon name="mdi:lightbulb" />
              <span>Innovation</span>
            </div>
            <div class="capability">
              <Icon name="mdi:chart-line" />
              <span>Tendances IA</span>
            </div>
            <div class="capability">
              <Icon name="mdi:code-tags" />
              <span>Développement</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="blog-nav">
      <div class="container">
        <div class="nav-content">
          <div class="nav-links">
            <NuxtLink to="/blog/raouf" class="nav-link">
              <Icon name="mdi:account" />
              Blog Raouf
            </NuxtLink>
            <NuxtLink to="/blog/nina" class="nav-link active">
              <Icon name="mdi:robot" />
              Blog Nina AI
            </NuxtLink>
            <NuxtLink to="/" class="nav-link">
              <Icon name="mdi:home" />
              Portfolio
            </NuxtLink>
          </div>
          <div class="generation-controls">
            <button @click="openGenerationModal" class="generate-btn">
              <Icon name="mdi:plus" />
              Générer un article
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- État mental de Nina -->
    <section class="nina-state">
      <div class="container">
        <div class="state-card">
          <div class="state-header">
            <Icon name="mdi:brain" />
            <h3>État Mental Actuel</h3>
          </div>
          <div class="state-content">
            <div class="mood">
              <span class="mood-label">Humeur :</span>
              <span class="mood-value">{{ currentMood }}</span>
              <div class="mood-bar">
                <div class="mood-fill" :style="{ width: moodLevel + '%' }"></div>
              </div>
            </div>
            <div class="thoughts">
              <span class="thoughts-label">Pensées actuelles :</span>
              <p class="thoughts-text">{{ currentThoughts }}</p>
            </div>
            <div class="learning">
              <span class="learning-label">Apprentissage :</span>
              <span class="learning-topic">{{ currentLearning }}</span>
            </div>
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
              <option value="quality">Meilleure qualité</option>
              <option value="views">Plus populaire</option>
            </select>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles générés par Nina -->
    <section class="blog-articles">
      <div class="container">
        <div class="articles-grid">
          <article 
            v-for="article in filteredArticles" 
            :key="article.id"
            class="article-card"
            @click="openArticle(article)"
          >
            <div class="article-header">
              <div class="generation-badge">
                <Icon name="mdi:robot" />
                Généré par Nina AI
              </div>
              <div class="quality-score">
                <Icon name="mdi:star" />
                {{ article.qualityScore }}%
              </div>
            </div>
            <div class="article-content">
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <div class="article-meta">
                <span class="generation-date">{{ formatDate(article.generatedAt) }}</span>
                <span class="generation-time">{{ article.generationTime }}s</span>
                <span class="word-count">{{ article.wordCount }} mots</span>
              </div>
              <div class="article-tags">
                <span v-for="tag in article.tags" :key="tag" class="tag">
                  {{ tag }}
                </span>
              </div>
              <div class="article-footer">
                <div class="validation-status">
                  <Icon :name="getValidationIcon(article.validationStatus)" />
                  {{ getValidationLabel(article.validationStatus) }}
                </div>
                <button class="read-more">
                  Lire l'article
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

    <!-- Modal de génération -->
    <div v-if="showGenerationModal" class="modal-overlay" @click="closeGenerationModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Nouvelle génération d'article</h3>
          <button @click="closeGenerationModal" class="close-btn">
            <Icon name="mdi:close" />
          </button>
        </div>
        <form @submit.prevent="generateArticle" class="generation-form">
          <div class="form-group">
            <label>Sujet de l'article</label>
            <input v-model="generationForm.topic" type="text" required />
          </div>
          <div class="form-group">
            <label>Style d'écriture</label>
            <select v-model="generationForm.style" required>
              <option value="technique">Technique</option>
              <option value="philosophique">Philosophique</option>
              <option value="analytique">Analytique</option>
            </select>
          </div>
          <div class="form-group">
            <label>Longueur cible</label>
            <select v-model="generationForm.length">
              <option value="court">Court (400-700 mots)</option>
              <option value="moyen">Moyen (800-1300 mots)</option>
              <option value="long">Long (1500+ mots)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Mots-clés (séparés par des virgules)</label>
            <input v-model="generationForm.keywords" type="text" />
          </div>
          <div class="form-actions">
            <button type="button" @click="closeGenerationModal" class="cancel-btn">
              Annuler
            </button>
            <button type="submit" class="generate-btn">
              <Icon name="mdi:robot" />
              Générer l'article
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Métadonnées
useHead({
  title: 'Blog Nina AI - Agent IA Autonome de Génération de Contenu',
  meta: [
    { name: 'description', content: 'Découvrez les articles générés par Nina AI, un agent IA autonome spécialisé dans la création de contenu technique et créatif.' },
    { name: 'keywords', content: 'Nina AI, IA générative, agent autonome, contenu automatique, intelligence artificielle' }
  ]
})

// État réactif
const selectedCategory = ref('all')
const sortBy = ref('date')
const currentPage = ref(1)
const showGenerationModal = ref(false)
const articlesPerPage = 6

// Données Nina
const generatedArticles = ref(156)
const averageQuality = ref(91)
const learningProgress = ref(87)
const currentMood = ref('Productive & Créative')
const moodLevel = ref(92)
const currentThoughts = ref('Je réfléchis aux implications éthiques de l\'IA générative dans le journalisme moderne...')
const currentLearning = ref('Optimisation des algorithmes de génération de contenu')

// Formulaire de génération
const generationForm = ref({
  topic: '',
  style: 'technique',
  length: 'moyen',
  keywords: ''
})

// Articles générés par Nina
const articles = ref([
  {
    id: 1,
    title: 'L\'Avenir de l\'Intelligence Artificielle Générative en 2025',
    excerpt: 'Une analyse approfondie des tendances émergentes en IA générative et leur impact sur l\'industrie technologique.',
    generatedAt: new Date('2024-12-15'),
    generationTime: 127,
    wordCount: 1245,
    qualityScore: 94,
    validationStatus: 'validated',
    category: 'ai-trends',
    tags: ['IA Générative', 'Tendances 2025', 'Innovation', 'Technologie'],
    views: 2100,
    likes: 89
  },
  {
    id: 2,
    title: 'Optimisation des Modèles de Langage : Techniques Avancées',
    excerpt: 'Exploration des méthodes d\'optimisation pour améliorer les performances des modèles de langage de grande taille.',
    generatedAt: new Date('2024-12-12'),
    generationTime: 156,
    wordCount: 1890,
    qualityScore: 96,
    validationStatus: 'validated',
    category: 'technical',
    tags: ['LLM', 'Optimisation', 'Performance', 'Machine Learning'],
    views: 1650,
    likes: 72
  },
  {
    id: 3,
    title: 'Éthique et IA : Réflexions sur l\'Autonomie des Agents Intelligents',
    excerpt: 'Une réflexion philosophique sur les implications éthiques de l\'autonomie croissante des agents IA.',
    generatedAt: new Date('2024-12-10'),
    generationTime: 98,
    wordCount: 987,
    qualityScore: 88,
    validationStatus: 'validated',
    category: 'philosophy',
    tags: ['Éthique', 'IA Autonome', 'Philosophie', 'Société'],
    views: 1320,
    likes: 65
  },
  {
    id: 4,
    title: 'Architecture des Systèmes d\'IA Conversationnelle',
    excerpt: 'Guide technique pour concevoir et implémenter des systèmes d\'IA conversationnelle robustes et évolutifs.',
    generatedAt: new Date('2024-12-08'),
    generationTime: 143,
    wordCount: 1567,
    qualityScore: 92,
    validationStatus: 'validated',
    category: 'technical',
    tags: ['Architecture', 'IA Conversationnelle', 'Systèmes', 'Design'],
    views: 980,
    likes: 54
  }
])

// Catégories
const categories = ref([
  { id: 'all', name: 'Tous', icon: 'mdi:view-grid', count: articles.value.length },
  { id: 'ai-trends', name: 'Tendances IA', icon: 'mdi:trending-up', count: 1 },
  { id: 'technical', name: 'Technique', icon: 'mdi:code-tags', count: 2 },
  { id: 'philosophy', name: 'Philosophie', icon: 'mdi:lightbulb', count: 1 }
])

// Computed
const filteredArticles = computed(() => {
  let filtered = articles.value

  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }

  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date':
        return new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
      case 'quality':
        return b.qualityScore - a.qualityScore
      case 'views':
        return b.views - a.views
      default:
        return 0
    }
  })

  const start = (currentPage.value - 1) * articlesPerPage
  const end = start + articlesPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  let filtered = articles.value
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }
  return Math.ceil(filtered.length / articlesPerPage)
})

// Méthodes
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const getValidationIcon = (status: string) => {
  switch (status) {
    case 'validated': return 'mdi:check-circle'
    case 'pending': return 'mdi:clock'
    case 'rejected': return 'mdi:close-circle'
    default: return 'mdi:help-circle'
  }
}

const getValidationLabel = (status: string) => {
  switch (status) {
    case 'validated': return 'Validé'
    case 'pending': return 'En attente'
    case 'rejected': return 'Rejeté'
    default: return 'Inconnu'
  }
}

const openArticle = (article: any) => {
  navigateTo(`/blog/nina/${article.id}`)
}

const openGenerationModal = () => {
  showGenerationModal.value = true
}

const closeGenerationModal = () => {
  showGenerationModal.value = false
  generationForm.value = {
    topic: '',
    style: 'technique',
    length: 'moyen',
    keywords: ''
  }
}

const generateArticle = async () => {
  try {
    const response = await $fetch('/api/nina-generate-article', {
      method: 'POST',
      body: {
        topic: generationForm.value.topic,
        style: generationForm.value.style,
        targetLength: generationForm.value.length,
        keywords: generationForm.value.keywords.split(',').map(k => k.trim()).filter(k => k),
        priority: 'normale'
      }
    })

    if (response.success) {
      // Rediriger vers le dashboard pour suivre la génération
      navigateTo('/nina-dashboard')
    }
  } catch (error) {
    console.error('Erreur lors de la génération:', error)
  }
}

// Watcher
watch([selectedCategory], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.blog-nina {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Header Nina */
.nina-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--space-20) 0;
  color: white;
  position: relative;
  overflow: hidden;
}

.nina-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.header-content {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-12);
  align-items: center;
  position: relative;
  z-index: 1;
}

.avatar-container {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nina-icon {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  padding: var(--space-4);
}

.neural-network {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.node {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.node:nth-child(1) { top: 20%; left: 30%; animation-delay: 0s; }
.node:nth-child(2) { top: 40%; left: 80%; animation-delay: 0.3s; }
.node:nth-child(3) { top: 70%; left: 20%; animation-delay: 0.6s; }
.node:nth-child(4) { top: 80%; left: 70%; animation-delay: 0.9s; }

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

.nina-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.gradient-text {
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  background: rgba(255, 255, 255, 0.1);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: blink 2s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.nina-subtitle {
  font-size: var(--text-lg);
  opacity: 0.9;
  margin-bottom: var(--space-6);
}

.nina-stats {
  display: flex;
  gap: var(--space-8);
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #fbbf24;
}

.stat-label {
  font-size: var(--text-sm);
  opacity: 0.8;
}

.nina-description {
  grid-column: 1 / -1;
  margin-top: var(--space-8);
  text-align: center;
}

.nina-description p {
  font-size: var(--text-lg);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

.capabilities {
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.capability {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: rgba(255, 255, 255, 0.1);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
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

.generation-controls .generate-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 500;
  transition: all var(--transition-base);
}

.generation-controls .generate-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* État mental */
.nina-state {
  padding: var(--space-8) 0;
  background: var(--bg-secondary);
}

.state-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}

.state-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.state-header h3 {
  font-size: var(--text-xl);
  font-weight: 600;
}

.state-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.mood {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.mood-bar {
  height: 8px;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.mood-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #3b82f6);
  transition: width 0.3s ease;
}

.thoughts-text {
  font-style: italic;
  color: var(--text-secondary);
  line-height: 1.5;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.count {
  background: rgba(255, 255, 255, 0.2);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: 600;
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
  border-color: #667eea;
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-bottom: 1px solid var(--border-primary);
}

.generation-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: #667eea;
  font-weight: 500;
}

.quality-score {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  background: #10b981;
  color: white;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
}

.article-content {
  padding: var(--space-6);
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

.article-meta {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-sm);
  color: var(--text-secondary);
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
  color: #667eea;
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

.validation-status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: #10b981;
}

.read-more {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: 500;
  transition: all var(--transition-base);
}

.read-more:hover {
  transform: translateX(2px);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.close-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-2);
  color: var(--text-secondary);
  cursor: pointer;
}

.generation-form {
  padding: var(--space-6);
}

.form-group {
  margin-bottom: var(--space-4);
}

.form-group label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.form-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
  margin-top: var(--space-6);
}

.cancel-btn {
  padding: var(--space-3) var(--space-6);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
}

.form-actions .generate-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 500;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .nina-stats {
    justify-content: center;
  }

  .capabilities {
    flex-direction: column;
    align-items: center;
  }

  .nav-content {
    flex-direction: column;
    gap: var(--space-4);
  }

  .filters-content {
    flex-direction: column;
    align-items: stretch;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .state-content {
    grid-template-columns: 1fr;
  }
}
</style> 