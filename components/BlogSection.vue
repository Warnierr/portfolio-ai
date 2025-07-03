<template>
  <section id="blog" class="blog-section">
    <div class="container">
      <!-- En-tête de section -->
      <div class="section-header" ref="sectionHeader">
        <span class="section-badge">Blog Technique</span>
        <h2 class="section-title">
          Mes derniers
          <span class="text-gradient">articles</span>
        </h2>
        <p class="section-description">
          Découvrez mes réflexions sur l'IA, le développement et les technologies émergentes.
          Partage d'expériences et de connaissances techniques.
        </p>
      </div>

      <!-- Statistiques du blog -->
      <div class="blog-stats" ref="blogStats">
        <div class="stat-item">
          <div class="stat-number">{{ blogStats.totalPosts }}</div>
          <div class="stat-label">Articles publiés</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ blogStats.totalCategories }}</div>
          <div class="stat-label">Catégories</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ blogStats.averageReadTime }}</div>
          <div class="stat-label">Min de lecture</div>
        </div>
      </div>

      <!-- Articles en vedette -->
      <div class="featured-posts" ref="featuredPosts">
        <h3>Articles en vedette</h3>
        <div class="featured-grid">
          <article 
            v-for="post in featuredPosts" 
            :key="post.id"
            class="featured-article"
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
              </div>
            </div>
            
            <div class="article-content">
              <div class="article-meta">
                <span class="publish-date">{{ formatDate(post.publishedAt) }}</span>
                <span class="read-time">{{ post.readTime }} min</span>
              </div>
              
              <h4 class="article-title">{{ post.title }}</h4>
              <p class="article-excerpt">{{ post.excerpt }}</p>
              
              <div class="article-tags">
                <span 
                  v-for="tag in post.tags.slice(0, 3)" 
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
                  <span class="author-name">{{ post.author.name }}</span>
                </div>
                <button class="read-more-btn">
                  Lire l'article
                  <Icon name="mdi:arrow-right" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Articles récents -->
      <div class="recent-posts" ref="recentPosts">
        <h3>Articles récents</h3>
        <div class="recent-grid">
          <article 
            v-for="post in recentPosts" 
            :key="post.id"
            class="recent-article"
            @click="navigateToPost(post)"
          >
            <div class="article-icon" :style="{ backgroundColor: post.category.color }">
              <Icon :name="post.category.icon" />
            </div>
            
            <div class="article-info">
              <div class="article-meta">
                <span class="category">{{ post.category.name }}</span>
                <span class="date">{{ formatDate(post.publishedAt) }}</span>
              </div>
              <h5 class="article-title">{{ post.title }}</h5>
              <p class="article-excerpt">{{ post.excerpt }}</p>
              
              <div class="article-stats">
                <span class="read-time">
                  <Icon name="mdi:clock-outline" />
                  {{ post.readTime }} min
                </span>
                <span class="tags-count">
                  <Icon name="mdi:tag-outline" />
                  {{ post.tags.length }} tags
                </span>
              </div>
            </div>
            
            <button class="article-btn">
              <Icon name="mdi:arrow-right" />
            </button>
          </article>
        </div>
      </div>

      <!-- Catégories -->
      <div class="blog-categories" ref="blogCategories">
        <h3>Explorez par catégorie</h3>
        <div class="categories-grid">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="category-card"
            :style="{ '--category-color': category.color }"
            @click="navigateToCategory(category)"
          >
            <div class="category-icon">
              <Icon :name="category.icon" />
            </div>
            <div class="category-info">
              <h4 class="category-name">{{ category.name }}</h4>
              <p class="category-description">{{ category.description }}</p>
              <span class="posts-count">
                {{ postsByCategory[category.id]?.length || 0 }} articles
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA vers le blog complet -->
      <div class="blog-cta" ref="blogCta">
        <div class="cta-content">
          <h3>Envie de découvrir plus d'articles ?</h3>
          <p>Explorez tous mes articles techniques et mes réflexions sur le blog complet.</p>
          <NuxtLink to="/blog" class="cta-button">
            <Icon name="mdi:book-open" />
            Découvrir le blog
            <Icon name="mdi:arrow-right" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useBlog } from '~/composables/useBlog'
import { usePageTransitions } from '~/composables/usePageTransitions'

// Composables
const { 
  featuredPosts, 
  recentPosts, 
  categories, 
  postsByCategory, 
  blogStats, 
  formatDate 
} = useBlog()

// Refs pour animations
const sectionHeader = ref()
const blogStats = ref()
const featuredPosts = ref()
const recentPosts = ref()
const blogCategories = ref()
const blogCta = ref()

// Navigation
const navigateToPost = (post: any) => {
  // Pour l'instant, on peut juste logger ou naviguer vers une page de détail
  console.log('Naviguer vers:', post.slug)
  // await navigateTo(`/blog/${post.slug}`)
}

const navigateToCategory = (category: any) => {
  console.log('Naviguer vers catégorie:', category.slug)
  // await navigateTo(`/blog/category/${category.slug}`)
}

// Gestion des erreurs d'image
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
}

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  const { staggeredAppear, animateCounter } = usePageTransitions()

  // Animation d'entrée de la section
  $gsap.gsap.from(sectionHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: sectionHeader.value,
      start: 'top 80%'
    }
  })

  // Animation des statistiques
  $gsap.gsap.from('.stat-item', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: blogStats.value,
      start: 'top 80%',
      onEnter: () => {
        // Animer les compteurs
        animateCounter('.stat-number', blogStats.totalPosts)
      }
    }
  })

  // Animation des articles en vedette
  staggeredAppear('.featured-article', {
    direction: 'up',
    stagger: 0.2,
    duration: 0.8
  })

  // Animation des articles récents
  staggeredAppear('.recent-article', {
    direction: 'right',
    stagger: 0.1,
    duration: 0.6
  })

  // Animation des catégories
  staggeredAppear('.category-card', {
    direction: 'up',
    stagger: 0.1,
    duration: 0.7
  })

  // Animation du CTA
  $gsap.gsap.from(blogCta.value, {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: blogCta.value,
      start: 'top 80%'
    }
  })
})
</script>

<style scoped>
.blog-section {
  padding: var(--space-32) 0;
  background: var(--bg-primary);
  position: relative;
}

/* En-tête de section */
.section-header {
  text-align: center;
  margin-bottom: var(--space-20);
}

.section-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--accent-primary);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: var(--space-6);
  font-family: var(--font-heading);
}

.section-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Statistiques du blog */
.blog-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-12);
  margin-bottom: var(--space-20);
  padding: var(--space-8);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-primary);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
  font-family: var(--font-heading);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

/* Articles en vedette */
.featured-posts {
  margin-bottom: var(--space-20);
}

.featured-posts h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-8);
  text-align: center;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-8);
}

.featured-article {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
  cursor: pointer;
}

.featured-article:hover {
  transform: translateY(-5px);
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

.featured-article:hover .article-image img {
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
  top: var(--space-4);
  right: var(--space-4);
}

.category-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
  color: white;
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
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  line-height: 1.4;
}

.article-excerpt {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-tags {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
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
}

.author-info {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  color: white;
}

.author-name {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.read-more-btn {
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

.read-more-btn:hover {
  background: var(--accent-secondary);
  transform: translateX(5px);
}

/* Articles récents */
.recent-posts {
  margin-bottom: var(--space-20);
}

.recent-posts h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-8);
  text-align: center;
}

.recent-grid {
  display: grid;
  gap: var(--space-6);
}

.recent-article {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  cursor: pointer;
}

.recent-article:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.article-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  flex-shrink: 0;
}

.article-info {
  flex: 1;
}

.article-info .article-meta {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-2);
}

.category {
  font-weight: 500;
  color: var(--accent-primary);
}

.date {
  color: var(--text-secondary);
}

.article-info .article-title {
  font-size: var(--text-base);
  margin-bottom: var(--space-2);
}

.article-info .article-excerpt {
  margin-bottom: var(--space-3);
  -webkit-line-clamp: 1;
}

.article-stats {
  display: flex;
  gap: var(--space-4);
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.article-stats span {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.article-btn {
  width: 40px;
  height: 40px;
  border: 2px solid var(--border-primary);
  border-radius: 50%;
  background: var(--bg-primary);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-base);
  flex-shrink: 0;
}

.recent-article:hover .article-btn {
  border-color: var(--accent-primary);
  background: var(--accent-primary);
  color: white;
}

/* Catégories */
.blog-categories {
  margin-bottom: var(--space-20);
}

.blog-categories h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-8);
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.category-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--category-color);
}

.category-icon {
  width: 50px;
  height: 50px;
  background: var(--category-color);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  flex-shrink: 0;
}

.category-name {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.category-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-bottom: var(--space-2);
  line-height: 1.4;
}

.posts-count {
  font-size: var(--text-xs);
  color: var(--category-color);
  font-weight: 500;
}

/* CTA Blog */
.blog-cta {
  text-align: center;
  padding: var(--space-12);
  background: var(--gradient-primary);
  border-radius: var(--radius-2xl);
  color: white;
}

.cta-content h3 {
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.cta-content p {
  font-size: var(--text-lg);
  margin-bottom: var(--space-8);
  opacity: 0.9;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-8);
  background: white;
  color: var(--accent-primary);
  border-radius: var(--radius-lg);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-base);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .featured-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-stats {
    flex-direction: column;
    gap: var(--space-6);
  }
  
  .recent-article {
    flex-direction: column;
    text-align: center;
  }
  
  .article-info .article-meta {
    justify-content: center;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .category-card {
    flex-direction: column;
    text-align: center;
  }
}
</style> 