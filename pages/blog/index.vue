<template>
  <div class="blog-page">
    <!-- Hero du blog -->
    <section class="blog-hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            Blog <span class="text-gradient">Technique</span>
          </h1>
          <p class="hero-description">
            Explorez mes réflexions sur l'IA, le développement et les technologies émergentes.
            Partage d'expériences, tutoriels et analyses techniques.
          </p>
          
          <!-- Barre de recherche -->
          <div class="search-bar">
            <div class="search-input-wrapper">
              <Icon name="mdi:magnify" class="search-icon" />
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Rechercher un article, une technologie..."
                class="search-input"
                @input="setSearchQuery(searchQuery)"
              />
              <button 
                v-if="searchQuery" 
                @click="clearSearch"
                class="clear-btn"
              >
                <Icon name="mdi:close" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filtres et navigation -->
    <section class="blog-filters">
      <div class="container">
        <div class="filters-wrapper">
          <!-- Filtres par catégorie -->
          <div class="category-filters">
            <button 
              class="filter-btn"
              :class="{ active: !selectedCategory }"
              @click="setSelectedCategory(null)"
            >
              <Icon name="mdi:all-inclusive" />
              Tous les articles
            </button>
            <button 
              v-for="category in categories" 
              :key="category.id"
              class="filter-btn"
              :class="{ active: selectedCategory === category.id }"
              :style="{ '--category-color': category.color }"
              @click="setSelectedCategory(category.id)"
            >
              <Icon :name="category.icon" />
              {{ category.name }}
            </button>
          </div>

          <!-- Statistiques -->
          <div class="results-info">
            <span class="results-count">
              {{ filteredPosts.length }} article{{ filteredPosts.length > 1 ? 's' : '' }}
              <span v-if="selectedCategory || searchQuery">trouvé{{ filteredPosts.length > 1 ? 's' : '' }}</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Liste des articles -->
    <section class="blog-content">
      <div class="container">
        <div class="blog-layout">
          <!-- Articles principaux -->
          <div class="articles-main">
            <div v-if="filteredPosts.length === 0" class="no-results">
              <Icon name="mdi:file-search-outline" />
              <h3>Aucun article trouvé</h3>
              <p>Essayez de modifier vos critères de recherche ou explorez toutes les catégories.</p>
              <button @click="clearFilters" class="btn btn-primary">
                Voir tous les articles
              </button>
            </div>

            <div v-else class="articles-grid">
              <article 
                v-for="post in filteredPosts" 
                :key="post.id"
                class="blog-article"
                @click="navigateToPost(post)"
              >
                <div class="article-image">
                  <img 
                    v-if="post.image" 
                    :src="post.image" 
                    :alt="post.title"
                    @error="handleImageError"
                  />
                  <div v-else class="image-placeholder">
                    <Icon :name="post.category.icon" />
                  </div>
                  
                  <div class="article-overlay">
                    <div class="category-badge" :style="{ backgroundColor: post.category.color }">
                      <Icon :name="post.category.icon" />
                      {{ post.category.name }}
                    </div>
                    <div v-if="post.featured" class="featured-badge">
                      <Icon name="mdi:star" />
                      En vedette
                    </div>
                  </div>
                </div>
                
                <div class="article-content">
                  <div class="article-meta">
                    <span class="publish-date">{{ formatDate(post.publishedAt) }}</span>
                    <span class="read-time">
                      <Icon name="mdi:clock-outline" />
                      {{ post.readTime }} min
                    </span>
                  </div>
                  
                  <h2 class="article-title">{{ post.title }}</h2>
                  <p class="article-excerpt">{{ post.excerpt }}</p>
                  
                  <div class="article-tags">
                    <span 
                      v-for="tag in post.tags.slice(0, 4)" 
                      :key="tag"
                      class="tag"
                    >
                      {{ tag }}
                    </span>
                  </div>
                  
                  <div class="article-footer">
                    <div class="author-info">
                      <div class="author-avatar">
                        <Icon name="mdi:account-circle" />
                      </div>
                      <div class="author-details">
                        <span class="author-name">{{ post.author.name }}</span>
                        <span class="author-role">{{ post.author.role }}</span>
                      </div>
                    </div>
                    
                    <button class="read-btn">
                      Lire l'article
                      <Icon name="mdi:arrow-right" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <!-- Sidebar -->
          <aside class="blog-sidebar">
            <!-- Catégories populaires -->
            <div class="sidebar-widget">
              <h3 class="widget-title">Catégories</h3>
              <div class="categories-list">
                <button 
                  v-for="category in categories" 
                  :key="category.id"
                  class="category-item"
                  :class="{ active: selectedCategory === category.id }"
                  @click="setSelectedCategory(category.id)"
                >
                  <div class="category-icon" :style="{ backgroundColor: category.color }">
                    <Icon :name="category.icon" />
                  </div>
                  <div class="category-details">
                    <span class="category-name">{{ category.name }}</span>
                    <span class="posts-count">{{ postsByCategory[category.id]?.length || 0 }} articles</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Articles populaires -->
            <div class="sidebar-widget">
              <h3 class="widget-title">Articles populaires</h3>
              <div class="popular-posts">
                <article 
                  v-for="post in featuredPosts.slice(0, 3)" 
                  :key="post.id"
                  class="popular-post"
                  @click="navigateToPost(post)"
                >
                  <div class="post-icon" :style="{ backgroundColor: post.category.color }">
                    <Icon :name="post.category.icon" />
                  </div>
                  <div class="post-info">
                    <h4 class="post-title">{{ post.title }}</h4>
                    <div class="post-meta">
                      <span class="post-date">{{ formatDate(post.publishedAt) }}</span>
                      <span class="post-time">{{ post.readTime }} min</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <!-- Newsletter -->
            <div class="sidebar-widget newsletter-widget">
              <h3 class="widget-title">Newsletter Tech</h3>
              <p class="newsletter-description">
                Recevez mes derniers articles et découvertes technologiques directement dans votre boîte mail.
              </p>
              <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
                <input 
                  v-model="newsletterEmail"
                  type="email" 
                  placeholder="votre@email.com"
                  class="newsletter-input"
                  required
                />
                <button type="submit" class="newsletter-btn">
                  <Icon name="mdi:send" />
                  S'abonner
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useBlog } from '~/composables/useBlog'

// Métadonnées SEO
useHead({
  title: 'Blog Technique - Articles sur l\'IA et le Développement',
  meta: [
    {
      name: 'description',
      content: 'Découvrez mes articles techniques sur l\'intelligence artificielle, le développement web, la data engineering et les technologies émergentes.'
    },
    {
      property: 'og:title',
      content: 'Blog Technique - Raouf'
    },
    {
      property: 'og:description',
      content: 'Articles techniques sur l\'IA, le développement et les technologies modernes.'
    }
  ]
})

// Composables
const { 
  filteredPosts, 
  featuredPosts,
  categories, 
  postsByCategory,
  selectedCategory,
  searchQuery,
  setSelectedCategory,
  setSearchQuery,
  formatDate 
} = useBlog()

// État local
const newsletterEmail = ref('')

// Méthodes
const navigateToPost = (post: any) => {
  console.log('Naviguer vers:', post.slug)
  // await navigateTo(`/blog/${post.slug}`)
}

const clearSearch = () => {
  searchQuery.value = ''
  setSearchQuery('')
}

const clearFilters = () => {
  setSelectedCategory(null)
  setSearchQuery('')
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}

const subscribeNewsletter = () => {
  if (newsletterEmail.value) {
    console.log('Abonnement newsletter:', newsletterEmail.value)
    // Logique d'abonnement newsletter
    newsletterEmail.value = ''
  }
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding-top: 80px; /* Compensation navbar */
}

/* Hero du blog */
.blog-hero {
  padding: var(--space-20) 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-bottom: 1px solid var(--border-primary);
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: var(--space-6);
  font-family: var(--font-heading);
}

.hero-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-10);
}

.search-bar {
  max-width: 500px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: var(--space-4);
  color: var(--text-secondary);
  font-size: 20px;
  z-index: 2;
}

.search-input {
  width: 100%;
  padding: var(--space-4) var(--space-12) var(--space-4) var(--space-12);
  border: 2px solid var(--border-primary);
  border-radius: var(--radius-full);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: var(--text-base);
  transition: all var(--transition-base);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.clear-btn {
  position: absolute;
  right: var(--space-4);
  width: 24px;
  height: 24px;
  border: none;
  background: var(--color-gray-400);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
}

.clear-btn:hover {
  background: var(--color-gray-600);
}

/* Filtres */
.blog-filters {
  padding: var(--space-8) 0;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
  position: sticky;
  top: 80px;
  z-index: 100;
}

.filters-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-6);
}

.category-filters {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  background: var(--bg-primary);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--category-color, var(--accent-primary));
  color: white;
  border-color: var(--category-color, var(--accent-primary));
}

.results-info {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* Contenu du blog */
.blog-content {
  padding: var(--space-16) 0;
}

.blog-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--space-12);
}

.articles-main {
  min-width: 0;
}

.no-results {
  text-align: center;
  padding: var(--space-20);
  color: var(--text-secondary);
}

.no-results svg {
  font-size: 64px;
  margin-bottom: var(--space-6);
  opacity: 0.5;
}

.no-results h3 {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-4);
  color: var(--text-primary);
}

.articles-grid {
  display: grid;
  gap: var(--space-8);
}

.blog-article {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
  cursor: pointer;
}

.blog-article:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-xl);
  border-color: var(--accent-primary);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.blog-article:hover .article-image img {
  transform: scale(1.05);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
}

.article-overlay {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  right: var(--space-3);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.category-badge,
.featured-badge {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
  color: white;
}

.featured-badge {
  background: var(--color-yellow-500);
}

.article-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
}

.article-meta {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.read-time {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.article-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  line-height: 1.4;
}

.article-excerpt {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-6);
  flex-wrap: wrap;
}

.tag {
  padding: var(--space-1) var(--space-3);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: var(--accent-primary);
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.author-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.author-role {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.read-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
}

.read-btn:hover {
  background: var(--accent-secondary);
  transform: translateX(5px);
}

/* Sidebar */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.sidebar-widget {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}

.widget-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.category-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  background: transparent;
  cursor: pointer;
  transition: all var(--transition-base);
  text-align: left;
}

.category-item:hover,
.category-item.active {
  background: var(--bg-primary);
  border-color: var(--border-primary);
}

.category-item .category-icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
}

.category-details {
  display: flex;
  flex-direction: column;
}

.category-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.posts-count {
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.popular-posts {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.popular-post {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-base);
}

.popular-post:hover {
  background: var(--bg-primary);
}

.post-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  flex-shrink: 0;
}

.post-info {
  min-width: 0;
}

.post-title {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.newsletter-widget {
  background: var(--gradient-primary);
  color: white;
  border: none;
}

.newsletter-widget .widget-title {
  color: white;
}

.newsletter-description {
  font-size: var(--text-sm);
  line-height: 1.5;
  margin-bottom: var(--space-6);
  opacity: 0.9;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.newsletter-input {
  padding: var(--space-3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: var(--text-sm);
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.newsletter-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
}

.newsletter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background: white;
  color: var(--accent-primary);
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Responsive */
@media (max-width: 1024px) {
  .blog-layout {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  
  .blog-sidebar {
    order: -1;
  }
}

@media (max-width: 768px) {
  .blog-article {
    grid-template-columns: 1fr;
  }
  
  .article-image {
    height: 150px;
  }
  
  .filters-wrapper {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-4);
  }
  
  .category-filters {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: var(--space-2);
  }
  
  .filter-btn {
    flex-shrink: 0;
  }
}
</style> 