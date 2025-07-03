<template>
  <div class="nina-articles-page">
    <div class="page-header">
      <h1 class="page-title">
        <Icon name="mdi:robot" class="nina-icon" />
        Nina AI - Générateur d'Articles
      </h1>
      <p class="page-description">
        Découvrez comment Nina génère des articles en citant ses sources et en expliquant son processus de recherche.
      </p>
    </div>

    <!-- Générateur d'Articles -->
    <div class="article-generator">
      <h2 class="generator-title">
        <Icon name="mdi:auto-fix" />
        Générer un Nouvel Article
      </h2>
      
      <div class="generator-form">
        <div class="input-group">
          <label for="topic">Sujet de l'article :</label>
          <input 
            id="topic"
            v-model="newTopic" 
            type="text" 
            placeholder="Ex: Optimisation des performances Vue.js"
            class="topic-input"
            @keyup.enter="generateArticle"
          />
        </div>
        
        <div class="input-group">
          <label for="length">Longueur cible (mots) :</label>
          <select id="length" v-model="targetLength" class="length-select">
            <option value="200">Court (200 mots)</option>
            <option value="400">Moyen (400 mots)</option>
            <option value="600">Long (600 mots)</option>
          </select>
        </div>
        
        <button 
          @click="generateArticle" 
          :disabled="!newTopic || isGenerating"
          class="generate-btn"
        >
          <Icon :name="isGenerating ? 'mdi:loading' : 'mdi:sparkles'" 
                :class="{ 'rotating': isGenerating }" />
          {{ isGenerating ? 'Génération en cours...' : 'Générer l\'Article' }}
        </button>
      </div>

      <div v-if="generationError" class="error-message">
        <Icon name="mdi:alert-circle" />
        {{ generationError }}
      </div>
    </div>

    <!-- Articles Générés -->
    <div class="articles-section" v-if="articles.length > 0">
      <h2 class="section-title">
        <Icon name="mdi:file-document-multiple" />
        Articles Générés ({{ articles.length }})
      </h2>
      
      <div class="articles-list">
        <div 
          v-for="article in articles" 
          :key="article.id"
          class="article-preview"
        >
          <div class="article-preview-header">
            <h3 class="article-title">{{ article.topic }}</h3>
            <div class="article-meta">
              <span class="article-date">
                {{ formatDate(article.generated_at) }}
              </span>
              <span class="article-confidence" :class="getConfidenceClass(article.metadata.confidence_level)">
                {{ article.metadata.confidence_level }}% fiable
              </span>
            </div>
          </div>
          
          <div class="article-stats">
            <div class="stat">
              <Icon name="mdi:text" />
              {{ article.metadata.word_count }} mots
            </div>
            <div class="stat">
              <Icon name="mdi:clock" />
              {{ article.metadata.estimated_reading_time }} min
            </div>
            <div class="stat">
              <Icon name="mdi:source-branch" />
              {{ article.metadata.sources_used.length }} sources
            </div>
          </div>
          
          <button 
            @click="selectedArticle = selectedArticle?.id === article.id ? null : article"
            class="view-article-btn"
          >
            <Icon :name="selectedArticle?.id === article.id ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
            {{ selectedArticle?.id === article.id ? 'Masquer' : 'Voir l\'Article' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Affichage de l'Article Sélectionné -->
    <div v-if="selectedArticle" class="selected-article">
      <NinaArticleViewer :article="selectedArticle" />
    </div>

    <!-- Exemples d'Articles -->
    <div class="examples-section" v-if="articles.length === 0">
      <h2 class="section-title">
        <Icon name="mdi:lightbulb" />
        Exemples de Sujets
      </h2>
      
      <div class="examples-grid">
        <div 
          v-for="example in exampleTopics" 
          :key="example.topic"
          class="example-card"
          @click="newTopic = example.topic"
        >
          <div class="example-header">
            <Icon :name="example.icon" class="example-icon" />
            <h3>{{ example.topic }}</h3>
          </div>
          <p class="example-description">{{ example.description }}</p>
          <div class="example-sources">
            <small>Sources : {{ example.expectedSources.join(', ') }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// Métadonnées de la page
useHead({
  title: 'Nina AI - Générateur d\'Articles | Portfolio Raouf WARNIER',
  meta: [
    { name: 'description', content: 'Découvrez comment Nina AI génère des articles en citant ses sources et processus de recherche' },
    { name: 'keywords', content: 'Nina AI, génération articles, IA, sources, recherche, Vue.js, Nuxt' }
  ]
})

// État réactif
const newTopic = ref('')
const targetLength = ref(300)
const isGenerating = ref(false)
const generationError = ref('')
const articles = ref<any[]>([])
const selectedArticle = ref<any>(null)

// Exemples de sujets
const exampleTopics = [
  {
    topic: "Optimisation des performances Vue.js",
    icon: "mdi:speedometer",
    description: "Techniques et bonnes pratiques pour améliorer les performances d'une application Vue.js",
    expectedSources: ["Expérience", "Documentation", "Mémoire interne"]
  },
  {
    topic: "Intelligence Artificielle et automatisation",
    icon: "mdi:robot",
    description: "Comment l'IA transforme les processus d'automatisation en entreprise",
    expectedSources: ["Expérience", "Recherche web", "Base de connaissances"]
  },
  {
    topic: "Développement Full-Stack moderne",
    icon: "mdi:layers",
    description: "Les technologies et approches actuelles du développement full-stack",
    expectedSources: ["Expérience", "Documentation", "Tendances"]
  },
  {
    topic: "UX/UI Design et accessibilité",
    icon: "mdi:palette",
    description: "Principes de design inclusif et accessible pour le web",
    expectedSources: ["Expérience", "Documentation", "Recherche web"]
  }
]

// Génération d'article
const generateArticle = async () => {
  if (!newTopic.value || isGenerating.value) return

  isGenerating.value = true
  generationError.value = ''

  try {
    const response = await $fetch('/api/nina-generate-small-article', {
      method: 'POST',
      body: {
        topic: newTopic.value,
        targetLength: targetLength.value,
        includeSourcesDetails: true
      }
    })

    if (response.success) {
      articles.value.unshift(response.article)
      selectedArticle.value = response.article
      newTopic.value = ''
      
      // Scroll vers l'article généré
      setTimeout(() => {
        const articleElement = document.querySelector('.selected-article')
        if (articleElement) {
          articleElement.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      generationError.value = 'Erreur lors de la génération de l\'article'
    }
  } catch (error) {
    console.error('Erreur génération article:', error)
    generationError.value = 'Erreur de connexion au serveur'
  } finally {
    isGenerating.value = false
  }
}

// Utilitaires
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getConfidenceClass = (level: number): string => {
  if (level >= 90) return 'confidence-excellent'
  if (level >= 80) return 'confidence-good'
  if (level >= 70) return 'confidence-moderate'
  return 'confidence-low'
}
</script>

<style scoped>
.nina-articles-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  color: white;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.nina-icon {
  font-size: 3rem;
  color: #667eea;
}

.page-description {
  font-size: 1.2rem;
  color: #a0aec0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.article-generator {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  backdrop-filter: blur(10px);
}

.generator-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #81e6d9;
  margin-bottom: 1.5rem;
}

.generator-form {
  display: grid;
  grid-template-columns: 1fr 200px auto;
  gap: 1rem;
  align-items: end;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 0.9rem;
  color: #e2e8f0;
  font-weight: 500;
}

.topic-input, .length-select {
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.topic-input:focus, .length-select:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.1);
}

.generate-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.rotating {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f56565;
  background: rgba(245, 101, 101, 0.1);
  border: 1px solid rgba(245, 101, 101, 0.2);
  border-radius: 10px;
  padding: 1rem;
  margin-top: 1rem;
}

.articles-section {
  margin-bottom: 3rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 2rem;
  color: #fbb6ce;
  margin-bottom: 2rem;
}

.articles-list {
  display: grid;
  gap: 1.5rem;
}

.article-preview {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.article-preview:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.article-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.article-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

.article-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-end;
  font-size: 0.85rem;
}

.article-date {
  color: #a0aec0;
}

.article-confidence {
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.confidence-excellent { 
  background: rgba(72, 187, 120, 0.2);
  color: #48bb78;
}

.confidence-good { 
  background: rgba(56, 178, 172, 0.2);
  color: #38b2ac;
}

.confidence-moderate { 
  background: rgba(237, 137, 54, 0.2);
  color: #ed8936;
}

.confidence-low { 
  background: rgba(245, 101, 101, 0.2);
  color: #f56565;
}

.article-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: #a0aec0;
}

.view-article-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.view-article-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.selected-article {
  margin-bottom: 3rem;
}

.examples-section {
  margin-top: 3rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.example-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.example-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  border-color: #667eea;
}

.example-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.example-icon {
  font-size: 1.5rem;
  color: #667eea;
}

.example-header h3 {
  font-size: 1.1rem;
  color: white;
  margin: 0;
}

.example-description {
  color: #a0aec0;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.example-sources {
  color: #718096;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .nina-articles-page {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .generator-form {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .article-preview-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .article-meta {
    align-items: flex-start;
  }
  
  .article-stats {
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .examples-grid {
    grid-template-columns: 1fr;
  }
}
</style> 