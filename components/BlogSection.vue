<template>
  <section class="blog-section">
    <div class="container">
      <!-- En-tête de section -->
      <div class="section-header" ref="sectionHeader">
        <span class="section-badge">Blog</span>
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
      <div class="blog-stats" ref="blogStatsRef">
        <div class="stat-item">
          <div class="stat-number">{{ blogStats.totalPosts }}</div>
          <div class="stat-label">Articles</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ blogStats.totalCategories }}</div>
          <div class="stat-label">Catégories</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ blogStats.averageReadTime }}</div>
          <div class="stat-label">Min lecture</div>
        </div>
      </div>

      <!-- Articles en vedette -->
      <div class="featured-posts" ref="featuredPostsRef">
        <h3>Articles en vedette</h3>
        <div class="featured-grid">
          <article 
            v-for="post in blogFeaturedPosts" 
            :key="post.id"
            class="featured-article"
            @click="navigateToPost(post)"
          >
            <div class="article-image" v-if="post.image">
              <img :src="post.image" :alt="post.title" @error="handleImageError">
            </div>
            <div class="article-content">
              <div class="article-meta">
                <span class="category" :style="{ color: post.category.color }">
                  <Icon :name="post.category.icon" />
                  {{ post.category.name }}
                </span>
                <span class="read-time">{{ post.readTime }} min</span>
              </div>
              <h4 class="article-title">{{ post.title }}</h4>
              <p class="article-excerpt">{{ post.excerpt }}</p>
              <div class="article-footer">
                <span class="publish-date">{{ formatDate(post.publishedAt) }}</span>
                <div class="article-tags">
                  <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Articles récents -->
      <div class="recent-posts" ref="recentPostsRef">
        <h3>Articles récents</h3>
        <div class="recent-grid">
          <article 
            v-for="post in blogRecentPosts" 
            :key="post.id"
            class="recent-article"
            @click="navigateToPost(post)"
          >
            <div class="article-content">
              <div class="article-meta">
                <span class="category" :style="{ color: post.category.color }">
                  <Icon :name="post.category.icon" />
                  {{ post.category.name }}
                </span>
                <span class="read-time">{{ post.readTime }} min</span>
              </div>
              <h4 class="article-title">{{ post.title }}</h4>
              <p class="article-excerpt">{{ post.excerpt }}</p>
              <div class="article-footer">
                <span class="publish-date">{{ formatDate(post.publishedAt) }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <!-- Catégories -->
      <div class="categories-section" ref="categoriesRef">
        <h3>Explorez par catégorie</h3>
        <div class="categories-grid">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="category-card"
            @click="navigateToCategory(category)"
            :style="{ '--category-color': category.color }"
          >
            <div class="category-icon">
              <Icon :name="category.icon" />
            </div>
            <h4 class="category-name">{{ category.name }}</h4>
            <p class="category-description">{{ category.description }}</p>
            <div class="category-count">
              {{ postsByCategory[category.id]?.length || 0 }} articles
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="blog-cta" ref="blogCtaRef">
        <h3>Envie d'en savoir plus ?</h3>
        <p>Découvrez tous mes articles et restez informé des dernières tendances tech.</p>
        <NuxtLink to="/blog" class="cta-button">
          Voir tous les articles
          <Icon name="mdi:arrow-right" />
        </NuxtLink>
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
  featuredPosts: blogFeaturedPosts, 
  recentPosts: blogRecentPosts, 
  categories, 
  postsByCategory, 
  blogStats,
  formatDate 
} = useBlog()

// Refs pour animations
const sectionHeader = ref()
const blogStatsRef = ref()
const featuredPostsRef = ref()
const recentPostsRef = ref()
const categoriesRef = ref()
const blogCtaRef = ref()

// Navigation
const navigateToPost = (post: any) => {
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
      trigger: blogStatsRef.value,
      start: 'top 80%',
      onEnter: () => {
        animateCounter('.stat-number', blogStats.value.totalPosts)
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
  $gsap.gsap.from(blogCtaRef.value, {
    scale: 0.9,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: blogCtaRef.value,
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
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: var(--space-6);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.category {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 500;
}

.read-time {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.article-title {
  font-size: var(--text-xl);
  font-weight: 600;
  margin-bottom: var(--space-3);
  line-height: 1.3;
}

.article-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.publish-date {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.article-tags {
  display: flex;
  gap: var(--space-2);
}

.tag {
  padding: var(--space-1) var(--space-2);
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  color: var(--text-secondary);
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-6);
}

.recent-article {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-base);
  cursor: pointer;
}

.recent-article:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

/* Catégories */
.categories-section {
  margin-bottom: var(--space-20);
}

.categories-section h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-8);
  text-align: center;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}

.category-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--category-color);
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--category-color);
  transform: scaleX(0);
  transition: transform var(--transition-base);
}

.category-card:hover::before {
  transform: scaleX(1);
}

.category-icon {
  font-size: 2rem;
  color: var(--category-color);
  margin-bottom: var(--space-4);
}

.category-name {
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.category-description {
  color: var(--text-secondary);
  font-size: var(--text-sm);
  margin-bottom: var(--space-4);
}

.category-count {
  font-size: var(--text-sm);
  color: var(--category-color);
  font-weight: 500;
}

/* CTA */
.blog-cta {
  text-align: center;
  padding: var(--space-16);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-primary);
}

.blog-cta h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-4);
}

.blog-cta p {
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  background: var(--accent-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-lg);
  font-weight: 500;
  transition: all var(--transition-base);
}

.cta-button:hover {
  background: var(--accent-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .blog-stats {
    flex-direction: column;
    gap: var(--space-6);
  }
  
  .featured-grid,
  .recent-grid,
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style> 