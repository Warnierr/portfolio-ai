<template>
  <div class="nina-article-viewer">
    <!-- En-tête de l'article -->
    <div class="article-header">
      <div class="article-meta">
        <div class="nina-badge">
          <Icon name="mdi:robot" class="nina-icon" />
          <span>Généré par Nina AI</span>
        </div>
        <div class="article-stats">
          <span class="stat">
            <Icon name="mdi:clock-outline" />
            {{ article.metadata.estimated_reading_time }} min
          </span>
          <span class="stat">
            <Icon name="mdi:text" />
            {{ article.metadata.word_count }} mots
          </span>
          <span class="stat">
            <Icon name="mdi:shield-check" :class="getConfidenceClass(article.metadata.confidence_level)" />
            {{ article.metadata.confidence_level }}% fiable
          </span>
        </div>
      </div>
    </div>

    <!-- Contenu de l'article -->
    <div class="article-content">
      <div class="markdown-content" v-html="renderMarkdown(article.content)"></div>
    </div>

    <!-- Section Sources -->
    <div class="sources-section">
      <h3 class="sources-title">
        <Icon name="mdi:source-branch" />
        Sources Utilisées par Nina
      </h3>
      
      <div class="sources-grid">
        <div 
          v-for="(source, index) in article.metadata.sources_used" 
          :key="source.id"
          class="source-card"
          :class="`source-${source.type}`"
        >
          <div class="source-header">
            <div class="source-type">
              <Icon :name="getSourceIcon(source.type)" />
              <span>{{ getSourceTypeLabel(source.type) }}</span>
            </div>
            <div class="source-reliability">
              <div class="reliability-bar">
                <div 
                  class="reliability-fill" 
                  :style="{ width: `${source.reliability}%` }"
                ></div>
              </div>
              <span>{{ source.reliability }}%</span>
            </div>
          </div>
          
          <div class="source-content">
            <h4 class="source-title">{{ source.title }}</h4>
            <p class="source-snippet" v-if="source.content_snippet">
              {{ source.content_snippet }}
            </p>
            <div class="source-details">
              <span class="source-method">{{ source.access_method }}</span>
              <span class="source-date" v-if="source.date || source.last_verified">
                {{ formatDate(source.date || source.last_verified) }}
              </span>
            </div>
            <a 
              v-if="source.url" 
              :href="source.url" 
              target="_blank" 
              class="source-link"
              rel="noopener noreferrer"
            >
              <Icon name="mdi:open-in-new" />
              Consulter la source
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Processus de Génération -->
    <div class="generation-process" v-if="showProcessDetails">
      <h3 class="process-title">
        <Icon name="mdi:cog" />
        Processus de Génération
      </h3>
      
      <div class="process-steps">
        <div 
          v-for="step in article.metadata.creation_process" 
          :key="step.step"
          class="process-step"
        >
          <div class="step-number">{{ step.step }}</div>
          <div class="step-content">
            <h4>{{ step.action }}</h4>
            <p>{{ step.result }}</p>
            <div class="step-meta">
              <span class="step-duration">{{ step.duration_ms }}ms</span>
              <span class="step-source">{{ step.source_type }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Section Citations -->
    <div class="citations-section">
      <h3 class="citations-title">
        <Icon name="mdi:format-quote-close" />
        Citations
      </h3>
      <ol class="citations-list">
        <li v-for="citation in article.citations" :key="citation" class="citation-item">
          {{ citation }}
        </li>
      </ol>
    </div>

    <!-- Réflexions de Nina -->
    <div class="nina-thoughts" v-if="article.nina_thoughts">
      <h3 class="thoughts-title">
        <Icon name="mdi:thought-bubble" />
        Réflexions de Nina
      </h3>
      <div class="thoughts-content">
        <div class="thought-item">
          <Icon name="mdi:brain" />
          <span>{{ article.nina_thoughts.confidence }}</span>
        </div>
        <div class="thought-item">
          <Icon name="mdi:database-search" />
          <span>{{ article.nina_thoughts.process }}</span>
        </div>
        <div class="thought-item">
          <Icon name="mdi:shield-check" />
          <span>{{ article.nina_thoughts.validation }}</span>
        </div>
        <div class="thought-item">
          <Icon name="mdi:lightbulb" />
          <span>{{ article.nina_thoughts.next_steps }}</span>
        </div>
      </div>
    </div>

    <!-- Bouton pour afficher/masquer les détails -->
    <div class="controls">
      <button 
        @click="showProcessDetails = !showProcessDetails"
        class="toggle-details-btn"
      >
        <Icon :name="showProcessDetails ? 'mdi:chevron-up' : 'mdi:chevron-down'" />
        {{ showProcessDetails ? 'Masquer' : 'Afficher' }} les détails techniques
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Article {
  id: string
  topic: string
  content: string
  metadata: {
    sources_used: any[]
    generation_method: string
    confidence_level: number
    fact_checking_status: string
    creation_process: any[]
    word_count: number
    estimated_reading_time: number
  }
  citations: string[]
  generated_at: string
  nina_thoughts?: {
    confidence: string
    process: string
    validation: string
    next_steps: string
  }
}

const props = defineProps<{
  article: Article
}>()

const showProcessDetails = ref(false)

const renderMarkdown = (content: string): string => {
  // Rendu Markdown simple sans dépendance externe
  return content
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(\d+)\]/g, '<sup class="citation-ref">[$1]</sup>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(.+)$/gm, '<p>$1</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h(\d)><\/p>/g, '</h$1>')
}

const getSourceIcon = (type: string): string => {
  const icons: Record<string, string> = {
    'experience': 'mdi:account-star',
    'internal_memory': 'mdi:brain',
    'documentation': 'mdi:book-open-variant',
    'web_search': 'mdi:web',
    'academic': 'mdi:school',
    'knowledge_base': 'mdi:database'
  }
  return icons[type] || 'mdi:file-document'
}

const getSourceTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'experience': 'Expérience',
    'internal_memory': 'Mémoire Interne',
    'documentation': 'Documentation',
    'web_search': 'Recherche Web',
    'academic': 'Académique',
    'knowledge_base': 'Base de Connaissances'
  }
  return labels[type] || type
}

const getConfidenceClass = (level: number): string => {
  if (level >= 90) return 'confidence-excellent'
  if (level >= 80) return 'confidence-good'
  if (level >= 70) return 'confidence-moderate'
  return 'confidence-low'
}

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.nina-article-viewer {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  color: white;
  font-family: 'Inter', sans-serif;
}

.article-header {
  margin-bottom: 2rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.nina-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
}

.nina-icon {
  font-size: 1.2rem;
}

.article-stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #a0aec0;
}

.confidence-excellent { color: #48bb78; }
.confidence-good { color: #38b2ac; }
.confidence-moderate { color: #ed8936; }
.confidence-low { color: #f56565; }

.article-content {
  margin-bottom: 3rem;
}

.markdown-content {
  line-height: 1.7;
  color: #e2e8f0;
}

.markdown-content :deep(h1) {
  color: #667eea;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.markdown-content :deep(h2) {
  color: #81e6d9;
  font-size: 1.5rem;
  margin: 2rem 0 1rem 0;
  font-weight: 600;
}

.markdown-content :deep(h3) {
  color: #fbb6ce;
  font-size: 1.2rem;
  margin: 1.5rem 0 0.5rem 0;
}

.markdown-content :deep(p) {
  margin-bottom: 1rem;
  color: #e2e8f0;
}

.sources-section {
  margin-bottom: 3rem;
}

.sources-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #81e6d9;
  margin-bottom: 1.5rem;
}

.sources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.source-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.source-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.source-experience {
  border-left: 4px solid #667eea;
}

.source-internal_memory {
  border-left: 4px solid #764ba2;
}

.source-documentation {
  border-left: 4px solid #48bb78;
}

.source-web_search {
  border-left: 4px solid #ed8936;
}

.source-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.source-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #81e6d9;
  font-weight: 600;
}

.source-reliability {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.reliability-bar {
  width: 50px;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.reliability-fill {
  height: 100%;
  background: linear-gradient(90deg, #48bb78 0%, #38b2ac 100%);
  transition: width 0.3s ease;
}

.source-title {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.source-snippet {
  font-size: 0.9rem;
  color: #a0aec0;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.source-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: #718096;
}

.source-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  color: #667eea;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.source-link:hover {
  color: #81e6d9;
}

.generation-process {
  margin-bottom: 3rem;
}

.process-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #fbb6ce;
  margin-bottom: 1.5rem;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.process-step {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.step-number {
  width: 30px;
  height: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.step-content h4 {
  color: white;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.step-content p {
  color: #a0aec0;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.step-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: #718096;
}

.citations-section {
  margin-bottom: 3rem;
}

.citations-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #f6ad55;
  margin-bottom: 1.5rem;
}

.citations-list {
  padding-left: 1.5rem;
}

.citation-item {
  margin-bottom: 0.5rem;
  color: #e2e8f0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.nina-thoughts {
  margin-bottom: 2rem;
}

.thoughts-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  color: #b794f6;
  margin-bottom: 1.5rem;
}

.thoughts-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.thought-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(183, 148, 246, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(183, 148, 246, 0.2);
  font-size: 0.9rem;
  color: #e2e8f0;
}

.controls {
  text-align: center;
}

.toggle-details-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.toggle-details-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .nina-article-viewer {
    padding: 1rem;
  }
  
  .sources-grid {
    grid-template-columns: 1fr;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .thoughts-content {
    grid-template-columns: 1fr;
  }
}
</style> 