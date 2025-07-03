<template>
  <div class="blog-home">
    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="gradient-text">Blog Personnel</span>
            <br>
            Raouf WARNIER & Nina AI
          </h1>
          <p class="hero-description">
            Découvrez deux univers complémentaires : les réflexions personnelles de Raouf 
            et les analyses générées par Nina AI, mon agent intelligent autonome.
          </p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">{{ totalArticles }}</span>
              <span class="stat-label">Articles publiés</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ totalReads }}</span>
              <span class="stat-label">Lectures totales</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ monthlyGrowth }}%</span>
              <span class="stat-label">Croissance mensuelle</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sections du blog -->
    <section class="blog-sections">
      <div class="container">
        <div class="sections-grid">
          <!-- Section Raouf -->
          <div class="section-card raouf-section">
            <div class="section-header">
              <div class="author-avatar">
                <Icon name="mdi:account-circle" size="60" />
              </div>
              <div class="author-info">
                <h2 class="author-name">Raouf WARNIER</h2>
                <p class="author-role">Développeur Full-Stack</p>
                <div class="author-stats">
                  <span class="stat-item">
                    <Icon name="mdi:post" />
                    {{ raoufStats.articles }} articles
                  </span>
                  <span class="stat-item">
                    <Icon name="mdi:eye" />
                    {{ raoufStats.views.toLocaleString() }} vues
                  </span>
                </div>
              </div>
            </div>
            
            <div class="section-content">
              <p class="section-description">
                Mes réflexions personnelles sur le développement web, l'architecture logicielle, 
                et l'innovation technologique. Retours d'expérience, tutoriels et analyses approfondies.
              </p>
              
              <div class="section-topics">
                <span class="topic">Vue.js & Nuxt</span>
                <span class="topic">Architecture</span>
                <span class="topic">TypeScript</span>
                <span class="topic">Performance</span>
                <span class="topic">Accessibilité</span>
              </div>

              <div class="recent-articles">
                <h4>Articles récents</h4>
                <div class="articles-list">
                  <article 
                    v-for="article in raoufRecentArticles" 
                    :key="article.id"
                    class="article-preview"
                    @click="navigateTo(`/blog/raouf/${article.id}`)"
                  >
                    <h5 class="article-title">{{ article.title }}</h5>
                    <div class="article-meta">
                      <span class="date">{{ formatDate(article.date) }}</span>
                      <span class="read-time">{{ article.readTime }} min</span>
                    </div>
                  </article>
                </div>
              </div>

              <div class="section-actions">
                <NuxtLink to="/blog/raouf" class="section-btn primary">
                  <Icon name="mdi:account" />
                  Voir tous les articles
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Section Nina AI -->
          <div class="section-card nina-section">
            <div class="section-header">
              <div class="author-avatar nina-avatar">
                <Icon name="mdi:robot" size="60" />
                <div class="ai-indicator">
                  <span class="ai-dot"></span>
                </div>
              </div>
              <div class="author-info">
                <h2 class="author-name">Nina AI</h2>
                <p class="author-role">Agent IA Autonome</p>
                <div class="author-stats">
                  <span class="stat-item">
                    <Icon name="mdi:robot" />
                    {{ ninaStats.articles }} articles générés
                  </span>
                  <span class="stat-item">
                    <Icon name="mdi:star" />
                    {{ ninaStats.averageQuality }}% qualité
                  </span>
                </div>
              </div>
            </div>
            
            <div class="section-content">
              <p class="section-description">
                Contenu généré par intelligence artificielle avec validation automatique. 
                Analyses techniques, tendances IA, et réflexions sur l'avenir de la technologie.
              </p>
              
              <div class="section-topics">
                <span class="topic ai-topic">IA Générative</span>
                <span class="topic ai-topic">Machine Learning</span>
                <span class="topic ai-topic">Tendances Tech</span>
                <span class="topic ai-topic">Innovation</span>
                <span class="topic ai-topic">Éthique IA</span>
              </div>

              <div class="recent-articles">
                <h4>Dernières générations</h4>
                <div class="articles-list">
                  <article 
                    v-for="article in ninaRecentArticles" 
                    :key="article.id"
                    class="article-preview nina-preview"
                    @click="navigateTo(`/blog/nina/${article.id}`)"
                  >
                    <h5 class="article-title">{{ article.title }}</h5>
                    <div class="article-meta">
                      <span class="generation-badge">
                        <Icon name="mdi:robot" size="12" />
                        Généré par IA
                      </span>
                      <span class="quality-score">{{ article.qualityScore }}%</span>
                    </div>
                  </article>
                </div>
              </div>

              <div class="section-actions">
                <NuxtLink to="/blog/nina" class="section-btn secondary">
                  <Icon name="mdi:robot" />
                  Voir les articles IA
                </NuxtLink>
                <button @click="openGenerationModal" class="section-btn outline">
                  <Icon name="mdi:plus" />
                  Générer un article
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparaison des approches -->
    <section class="comparison-section">
      <div class="container">
        <h2 class="section-title">Deux Approches Complémentaires</h2>
        <div class="comparison-grid">
          <div class="comparison-item">
            <div class="comparison-header">
              <Icon name="mdi:account" size="40" />
              <h3>Raouf - Humain</h3>
            </div>
            <ul class="comparison-list">
              <li>✨ Expérience personnelle</li>
              <li>🎯 Retours d'expérience réels</li>
              <li>💡 Créativité et intuition</li>
              <li>🔍 Analyse contextuelle</li>
              <li>❤️ Passion et émotion</li>
            </ul>
          </div>
          
          <div class="comparison-item">
            <div class="comparison-header">
              <Icon name="mdi:robot" size="40" />
              <h3>Nina - IA</h3>
            </div>
            <ul class="comparison-list">
              <li>⚡ Génération rapide</li>
              <li>📊 Analyse de données massives</li>
              <li>🎯 Objectivité et précision</li>
              <li>🔄 Mise à jour continue</li>
              <li>🌐 Perspective globale</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2>Restez informé</h2>
          <p>Recevez les derniers articles de Raouf et Nina directement dans votre boîte mail</p>
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
          <div class="newsletter-features">
            <span class="feature">📧 Pas de spam</span>
            <span class="feature">🎯 Contenu de qualité</span>
            <span class="feature">⚡ Désabonnement facile</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de génération -->
    <div v-if="showGenerationModal" class="modal-overlay" @click="closeGenerationModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Générer un article avec Nina AI</h3>
          <button @click="closeGenerationModal" class="close-btn">
            <Icon name="mdi:close" />
          </button>
        </div>
        <div class="modal-body">
          <p>Vous allez être redirigé vers le dashboard Nina AI pour créer un nouvel article.</p>
          <div class="modal-actions">
            <button @click="closeGenerationModal" class="cancel-btn">
              Annuler
            </button>
            <NuxtLink to="/nina-dashboard" class="generate-btn" @click="closeGenerationModal">
              <Icon name="mdi:robot" />
              Accéder au dashboard
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Métadonnées
useHead({
  title: 'Blog - Raouf WARNIER & Nina AI',
  meta: [
    { name: 'description', content: 'Blog personnel de Raouf WARNIER et articles générés par Nina AI. Découvrez deux perspectives complémentaires sur le développement web et l\'IA.' },
    { name: 'keywords', content: 'blog, Raouf WARNIER, Nina AI, développement web, IA générative, articles techniques' }
  ]
})

// État réactif
const email = ref('')
const showGenerationModal = ref(false)

// Statistiques
const totalArticles = ref(42)
const totalReads = ref(15600)
const monthlyGrowth = ref(23)

const raoufStats = ref({
  articles: 28,
  views: 12400
})

const ninaStats = ref({
  articles: 14,
  averageQuality: 91
})

// Articles récents
const raoufRecentArticles = ref([
  {
    id: 1,
    title: 'Architecture Moderne avec Nuxt 3 et TypeScript',
    date: new Date('2024-12-15'),
    readTime: 8
  },
  {
    id: 2,
    title: 'L\'IA Générative au Service du Développement',
    date: new Date('2024-12-10'),
    readTime: 12
  },
  {
    id: 3,
    title: 'Optimisation des Performances avec GSAP',
    date: new Date('2024-12-05'),
    readTime: 10
  }
])

const ninaRecentArticles = ref([
  {
    id: 1,
    title: 'L\'Avenir de l\'IA Générative en 2025',
    qualityScore: 94
  },
  {
    id: 2,
    title: 'Optimisation des Modèles de Langage',
    qualityScore: 96
  },
  {
    id: 3,
    title: 'Éthique et IA Autonome',
    qualityScore: 88
  }
])

// Méthodes
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

const subscribeNewsletter = () => {
  if (email.value) {
    // Logique d'abonnement
    console.log('Abonnement newsletter:', email.value)
    email.value = ''
  }
}

const openGenerationModal = () => {
  showGenerationModal.value = true
}

const closeGenerationModal = () => {
  showGenerationModal.value = false
}
</script>

<style scoped>
.blog-home {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Hero Section */
.blog-hero {
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  padding: var(--space-24) 0;
  color: white;
  text-align: center;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: var(--space-6);
  line-height: 1.1;
}

.gradient-text {
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: var(--text-xl);
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto var(--space-12);
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-12);
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: #fbbf24;
}

.stat-label {
  font-size: var(--text-sm);
  opacity: 0.8;
}

/* Sections */
.blog-sections {
  padding: var(--space-20) 0;
}

.sections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: var(--space-12);
}

.section-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
}

.section-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.raouf-section {
  border-color: var(--accent-primary);
}

.nina-section {
  border-color: #667eea;
}

.section-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.author-avatar {
  position: relative;
  flex-shrink: 0;
}

.nina-avatar {
  color: #667eea;
}

.ai-indicator {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  background: #10b981;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ai-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.author-name {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-1);
}

.author-role {
  color: var(--text-secondary);
  margin-bottom: var(--space-3);
}

.author-stats {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-sm);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--text-secondary);
}

.section-content {
  padding: var(--space-6);
}

.section-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-6);
}

.section-topics {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.topic {
  background: var(--bg-primary);
  color: var(--accent-primary);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
}

.ai-topic {
  color: #667eea;
}

.recent-articles h4 {
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-4);
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.article-preview {
  padding: var(--space-4);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.article-preview:hover {
  background: var(--bg-tertiary);
}

.nina-preview {
  border-left: 3px solid #667eea;
}

.article-title {
  font-size: var(--text-base);
  font-weight: 500;
  margin-bottom: var(--space-2);
  line-height: 1.4;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.generation-badge {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  color: #667eea;
  font-weight: 500;
}

.quality-score {
  background: #10b981;
  color: white;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: 600;
}

.section-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.section-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 500;
  text-decoration: none;
  transition: all var(--transition-base);
  cursor: pointer;
}

.section-btn.primary {
  background: var(--accent-primary);
  color: white;
}

.section-btn.secondary {
  background: #667eea;
  color: white;
}

.section-btn.outline {
  background: transparent;
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
}

.section-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Comparaison */
.comparison-section {
  padding: var(--space-20) 0;
  background: var(--bg-secondary);
}

.section-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--space-12);
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-8);
}

.comparison-item {
  background: var(--bg-primary);
  padding: var(--space-8);
  border-radius: var(--radius-xl);
  text-align: center;
}

.comparison-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.comparison-header h3 {
  font-size: var(--text-xl);
  font-weight: 600;
}

.comparison-list {
  list-style: none;
  padding: 0;
}

.comparison-list li {
  padding: var(--space-2) 0;
  font-size: var(--text-base);
  color: var(--text-secondary);
}

/* Newsletter */
.newsletter-section {
  padding: var(--space-20) 0;
  background: var(--bg-primary);
}

.newsletter-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.newsletter-content h2 {
  font-size: var(--text-3xl);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.newsletter-content p {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}

.newsletter-form {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.newsletter-input {
  flex: 1;
  padding: var(--space-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
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
  cursor: pointer;
  transition: all var(--transition-base);
}

.newsletter-btn:hover {
  background: var(--accent-secondary);
}

.newsletter-features {
  display: flex;
  justify-content: center;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.feature {
  font-size: var(--text-sm);
  color: var(--text-secondary);
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
  max-width: 400px;
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
  cursor: pointer;
}

.modal-body {
  padding: var(--space-6);
}

.modal-actions {
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

.generate-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: #667eea;
  color: white;
  border-radius: var(--radius-lg);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-stats {
    flex-direction: column;
    gap: var(--space-6);
  }

  .sections-grid {
    grid-template-columns: 1fr;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-features {
    flex-direction: column;
    gap: var(--space-2);
  }

  .comparison-grid {
    grid-template-columns: 1fr;
  }

  .author-stats {
    flex-direction: column;
    gap: var(--space-2);
  }

  .section-actions {
    flex-direction: column;
  }
}
</style> 