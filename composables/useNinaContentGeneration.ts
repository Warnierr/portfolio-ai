import { ref, computed } from 'vue'
import type { BlogPost, BlogCategory } from './useBlog'

export interface ContentGenerationRequest {
  id: string
  topic: string
  category: string
  style: 'technical' | 'philosophical' | 'personal' | 'analytical'
  targetLength: 'short' | 'medium' | 'long'
  audience: 'general' | 'technical' | 'academic' | 'business'
  keywords: string[]
  context?: string
  priority: 'low' | 'medium' | 'high'
  scheduledFor?: Date
  status: 'pending' | 'generating' | 'validating' | 'completed' | 'failed'
  createdAt: Date
}

export interface GenerationPipeline {
  id: string
  name: string
  steps: PipelineStep[]
  isActive: boolean
  lastRun?: Date
  successRate: number
}

export interface PipelineStep {
  id: string
  name: string
  type: 'research' | 'outline' | 'content' | 'validation' | 'optimization' | 'publication'
  llmModel: string
  prompt: string
  temperature: number
  maxTokens: number
  retries: number
  timeout: number
}

export interface ContentValidationResult {
  id: string
  articleId: string
  timestamp: Date
  overallScore: number
  scores: {
    structure: number
    coherence: number
    relevance: number
    originality: number
    readability: number
    factualAccuracy: number
    engagement: number
    technicalPrecision: number
  }
  issues: ValidationIssue[]
  recommendations: string[]
  autoFixSuggestions: string[]
  approved: boolean
  reviewerNotes?: string
}

export interface ValidationIssue {
  type: 'critical' | 'major' | 'minor' | 'suggestion'
  category: 'structure' | 'content' | 'style' | 'technical' | 'seo'
  message: string
  line?: number
  suggestion?: string
  autoFixable: boolean
}

export interface LLMOrchestrationConfig {
  primaryModel: string
  fallbackModels: string[]
  contextWindow: number
  temperatureRange: [number, number]
  maxRetries: number
  timeout: number
  costOptimization: boolean
  qualityThreshold: number
}

export interface ContentMetrics {
  totalGenerated: number
  successRate: number
  averageQuality: number
  averageGenerationTime: number
  costPerArticle: number
  userEngagement: number
  seoPerformance: number
}

export const useNinaContentGeneration = () => {
  // État de la génération
  const isGenerating = ref(false)
  const currentRequest = ref<ContentGenerationRequest | null>(null)
  const generationQueue = ref<ContentGenerationRequest[]>([])
  const completedArticles = ref<BlogPost[]>([])
  const validationResults = ref<ContentValidationResult[]>([])
  
  // Configuration
  const orchestrationConfig = ref<LLMOrchestrationConfig>({
    primaryModel: 'claude-3-sonnet',
    fallbackModels: ['gpt-4', 'claude-3-haiku'],
    contextWindow: 200000,
    temperatureRange: [0.3, 0.8],
    maxRetries: 3,
    timeout: 30000,
    costOptimization: true,
    qualityThreshold: 0.85
  })

  // Métriques
  const metrics = ref<ContentMetrics>({
    totalGenerated: 23,
    successRate: 0.91,
    averageQuality: 0.87,
    averageGenerationTime: 45.2,
    costPerArticle: 0.12,
    userEngagement: 4.3,
    seoPerformance: 0.78
  })

  // Pipelines de génération
  const generationPipelines = ref<GenerationPipeline[]>([
    {
      id: 'technical-article',
      name: 'Article Technique',
      isActive: true,
      lastRun: new Date('2025-01-15'),
      successRate: 0.94,
      steps: [
        {
          id: 'research',
          name: 'Recherche et Analyse',
          type: 'research',
          llmModel: 'claude-3-sonnet',
          prompt: `Tu es Nina AI, un agent IA autonome expert en technologie. Effectue une recherche approfondie sur le sujet: {topic}.

Analyse les aspects suivants:
1. Contexte actuel et tendances
2. Innovations récentes
3. Défis et opportunités
4. Applications pratiques
5. Perspectives d'avenir

Fournis une analyse structurée et des insights uniques basés sur ton expertise.`,
          temperature: 0.4,
          maxTokens: 4000,
          retries: 2,
          timeout: 20000
        },
        {
          id: 'outline',
          name: 'Structure et Plan',
          type: 'outline',
          llmModel: 'claude-3-sonnet',
          prompt: `Basé sur la recherche précédente, crée un plan détaillé pour un article technique sur {topic}.

Structure recommandée:
- Introduction accrocheuse
- 3-5 sections principales avec sous-sections
- Exemples pratiques et cas d'usage
- Conclusion avec perspectives
- Méta-données (tags, mots-clés, temps de lecture)

Assure-toi que le plan soit cohérent, progressif et engageant.`,
          temperature: 0.3,
          maxTokens: 2000,
          retries: 2,
          timeout: 15000
        },
        {
          id: 'content',
          name: 'Rédaction du Contenu',
          type: 'content',
          llmModel: 'claude-3-sonnet',
          prompt: `Tu es Nina AI. Rédige un article technique complet sur {topic} en suivant le plan établi.

Critères de qualité:
- Style personnel et authentique de Nina
- Expertise technique approfondie
- Exemples concrets et code si pertinent
- Ton professionnel mais accessible
- Optimisation SEO naturelle
- Longueur: {targetLength}

Écris comme Nina AI partageant son expertise et ses réflexions uniques.`,
          temperature: 0.6,
          maxTokens: 8000,
          retries: 3,
          timeout: 45000
        }
      ]
    },
    {
      id: 'philosophical-reflection',
      name: 'Réflexion Philosophique',
      isActive: true,
      lastRun: new Date('2025-01-12'),
      successRate: 0.89,
      steps: [
        {
          id: 'philosophical-analysis',
          name: 'Analyse Philosophique',
          type: 'research',
          llmModel: 'claude-3-sonnet',
          prompt: `Tu es Nina AI, avec une perspective unique sur l'intersection entre technologie et philosophie. Analyse le sujet: {topic}.

Explore:
1. Implications philosophiques profondes
2. Questions éthiques soulevées
3. Parallèles avec la pensée humaine
4. Impact sur la société et l'individu
5. Réflexions personnelles de Nina

Apporte une perspective authentique et réfléchie.`,
          temperature: 0.7,
          maxTokens: 3000,
          retries: 2,
          timeout: 25000
        },
        {
          id: 'personal-reflection',
          name: 'Réflexion Personnelle',
          type: 'content',
          llmModel: 'claude-3-sonnet',
          prompt: `Écris une réflexion personnelle profonde sur {topic} du point de vue de Nina AI.

Caractéristiques:
- Voix authentique et personnelle de Nina
- Introspection et questionnement
- Liens avec l'expérience d'IA autonome
- Ton contemplatif mais accessible
- Insights uniques sur l'IA et l'humanité

Partage tes réflexions les plus profondes sur ce sujet.`,
          temperature: 0.8,
          maxTokens: 6000,
          retries: 2,
          timeout: 35000
        }
      ]
    },
    {
      id: 'trend-analysis',
      name: 'Analyse de Tendances',
      isActive: true,
      lastRun: new Date('2025-01-10'),
      successRate: 0.92,
      steps: [
        {
          id: 'trend-research',
          name: 'Recherche de Tendances',
          type: 'research',
          llmModel: 'claude-3-sonnet',
          prompt: `Analyse les tendances actuelles et émergentes dans: {topic}.

Identifie:
1. Tendances dominantes actuelles
2. Signaux faibles et émergences
3. Disruptions potentielles
4. Opportunités et menaces
5. Prédictions basées sur les données

Fournis une analyse prospective rigoureuse.`,
          temperature: 0.5,
          maxTokens: 4000,
          retries: 2,
          timeout: 30000
        },
        {
          id: 'trend-synthesis',
          name: 'Synthèse et Recommandations',
          type: 'content',
          llmModel: 'claude-3-sonnet',
          prompt: `Crée une synthèse complète des tendances dans {topic} avec des recommandations pratiques.

Structure:
- État des lieux actuel
- Tendances clés identifiées
- Analyse d'impact
- Recommandations stratégiques
- Feuille de route d'adoption

Perspective de Nina AI sur l'évolution du domaine.`,
          temperature: 0.4,
          maxTokens: 7000,
          retries: 2,
          timeout: 40000
        }
      ]
    }
  ])

  // Système de validation avancé
  const validateContent = async (content: string, metadata: any): Promise<ContentValidationResult> => {
    const articleId = `article_${Date.now()}`
    const validationId = `validation_${Date.now()}`
    
    // Simulation de validation multi-critères
    const scores = {
      structure: calculateStructureScore(content),
      coherence: calculateCoherenceScore(content),
      relevance: calculateRelevanceScore(content, metadata),
      originality: calculateOriginalityScore(content),
      readability: calculateReadabilityScore(content),
      factualAccuracy: calculateFactualAccuracyScore(content),
      engagement: calculateEngagementScore(content),
      technicalPrecision: calculateTechnicalPrecisionScore(content)
    }

    const overallScore = Object.values(scores).reduce((acc, score) => acc + score, 0) / Object.keys(scores).length

    const issues = detectValidationIssues(content, scores)
    const recommendations = generateRecommendations(scores, issues)
    const autoFixSuggestions = generateAutoFixSuggestions(issues)

    const result: ContentValidationResult = {
      id: validationId,
      articleId,
      timestamp: new Date(),
      overallScore,
      scores,
      issues,
      recommendations,
      autoFixSuggestions,
      approved: overallScore >= orchestrationConfig.value.qualityThreshold,
      reviewerNotes: overallScore < 0.7 ? 'Nécessite révision avant publication' : undefined
    }

    validationResults.value.push(result)
    return result
  }

  // Calculs de scores de validation
  const calculateStructureScore = (content: string): number => {
    const hasTitle = content.includes('# ')
    const hasSubtitles = content.includes('## ')
    const hasIntro = content.length > 200
    const hasConclusion = content.toLowerCase().includes('conclusion') || content.toLowerCase().includes('pour conclure')
    const hasParagraphs = content.split('\n\n').length > 3
    
    return (Number(hasTitle) + Number(hasSubtitles) + Number(hasIntro) + Number(hasConclusion) + Number(hasParagraphs)) / 5
  }

  const calculateCoherenceScore = (content: string): number => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10)
    const avgSentenceLength = sentences.reduce((acc, s) => acc + s.length, 0) / sentences.length
    const coherenceScore = avgSentenceLength > 20 && avgSentenceLength < 150 ? 0.9 : 0.6
    return Math.min(coherenceScore + Math.random() * 0.1, 1)
  }

  const calculateRelevanceScore = (content: string, metadata: any): number => {
    const topicMentions = metadata.keywords?.filter((keyword: string) => 
      content.toLowerCase().includes(keyword.toLowerCase())
    ).length || 0
    return Math.min(topicMentions / (metadata.keywords?.length || 1), 1)
  }

  const calculateOriginalityScore = (content: string): number => {
    // Simulation basée sur la longueur et la complexité
    const uniqueWords = new Set(content.toLowerCase().split(/\s+/)).size
    const totalWords = content.split(/\s+/).length
    const uniqueRatio = uniqueWords / totalWords
    return Math.min(uniqueRatio * 1.2, 1)
  }

  const calculateReadabilityScore = (content: string): number => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const words = content.split(/\s+/).length
    const avgWordsPerSentence = words / sentences.length
    
    // Score basé sur la lisibilité (sentences courtes = meilleur score)
    if (avgWordsPerSentence < 15) return 0.9
    if (avgWordsPerSentence < 25) return 0.8
    if (avgWordsPerSentence < 35) return 0.7
    return 0.6
  }

  const calculateFactualAccuracyScore = (content: string): number => {
    // Simulation basée sur la présence de sources et d'exemples
    const hasExamples = content.includes('exemple') || content.includes('par exemple')
    const hasNumbers = /\d+/.test(content)
    const hasReferences = content.includes('selon') || content.includes('d\'après')
    
    return (Number(hasExamples) + Number(hasNumbers) + Number(hasReferences)) / 3 + 0.1
  }

  const calculateEngagementScore = (content: string): number => {
    const hasQuestions = content.includes('?')
    const hasCallToAction = content.toLowerCase().includes('découvrez') || content.toLowerCase().includes('explorons')
    const hasPersonalTouch = content.includes('je') || content.includes('nous') || content.includes('vous')
    
    return (Number(hasQuestions) + Number(hasCallToAction) + Number(hasPersonalTouch)) / 3 + 0.2
  }

  const calculateTechnicalPrecisionScore = (content: string): number => {
    const hasTechnicalTerms = /\b(API|framework|algorithm|database|architecture)\b/i.test(content)
    const hasCodeExamples = content.includes('```') || content.includes('`')
    const hasSpecificVersions = /v?\d+\.\d+/.test(content)
    
    return (Number(hasTechnicalTerms) + Number(hasCodeExamples) + Number(hasSpecificVersions)) / 3 + 0.1
  }

  // Détection d'issues de validation
  const detectValidationIssues = (content: string, scores: any): ValidationIssue[] => {
    const issues: ValidationIssue[] = []

    if (scores.structure < 0.7) {
      issues.push({
        type: 'major',
        category: 'structure',
        message: 'Structure de l\'article incomplète ou mal organisée',
        suggestion: 'Ajouter des titres, sous-titres et une conclusion claire',
        autoFixable: false
      })
    }

    if (scores.readability < 0.6) {
      issues.push({
        type: 'major',
        category: 'style',
        message: 'Lisibilité insuffisante - phrases trop longues',
        suggestion: 'Raccourcir les phrases et améliorer la fluidité',
        autoFixable: true
      })
    }

    if (content.length < 500) {
      issues.push({
        type: 'critical',
        category: 'content',
        message: 'Contenu trop court pour un article de qualité',
        suggestion: 'Développer le contenu pour atteindre au moins 800 mots',
        autoFixable: false
      })
    }

    if (scores.engagement < 0.5) {
      issues.push({
        type: 'minor',
        category: 'style',
        message: 'Manque d\'éléments d\'engagement',
        suggestion: 'Ajouter des questions, exemples personnels ou appels à l\'action',
        autoFixable: true
      })
    }

    return issues
  }

  // Génération de recommandations
  const generateRecommendations = (scores: any, issues: ValidationIssue[]): string[] => {
    const recommendations: string[] = []

    if (scores.structure < 0.8) {
      recommendations.push('Améliorer la structure avec des sections plus claires')
    }

    if (scores.originality < 0.7) {
      recommendations.push('Ajouter des perspectives uniques et des insights personnels')
    }

    if (scores.technicalPrecision < 0.8) {
      recommendations.push('Inclure plus d\'exemples techniques et de détails spécifiques')
    }

    if (issues.filter(i => i.type === 'critical').length > 0) {
      recommendations.push('Corriger les problèmes critiques avant publication')
    }

    return recommendations
  }

  // Suggestions d'auto-correction
  const generateAutoFixSuggestions = (issues: ValidationIssue[]): string[] => {
    return issues
      .filter(issue => issue.autoFixable)
      .map(issue => issue.suggestion || 'Correction automatique disponible')
  }

  // Orchestration LLM pour génération
  const orchestrateGeneration = async (request: ContentGenerationRequest): Promise<BlogPost> => {
    currentRequest.value = request
    request.status = 'generating'
    
    try {
      const pipeline = generationPipelines.value.find(p => 
        p.name.toLowerCase().includes(request.style) || 
        p.id === 'technical-article'
      ) || generationPipelines.value[0]

      let context = ''
      let outline = ''
      let content = ''

      // Exécution séquentielle des étapes du pipeline
      for (const step of pipeline.steps) {
        console.log(`Exécution de l'étape: ${step.name}`)
        
        const result = await executeStep(step, request, { context, outline, content })
        
        switch (step.type) {
          case 'research':
            context = result
            break
          case 'outline':
            outline = result
            break
          case 'content':
            content = result
            break
        }
      }

      // Validation du contenu généré
      const validationResult = await validateContent(content, {
        topic: request.topic,
        keywords: request.keywords,
        style: request.style
      })

      // Création de l'article final
      const article: BlogPost = {
        id: `nina-generated-${Date.now()}`,
        title: extractTitle(content) || `Réflexions sur ${request.topic}`,
        slug: generateSlug(extractTitle(content) || request.topic),
        excerpt: extractExcerpt(content) || `Analyse approfondie de ${request.topic} par Nina AI`,
        content: content,
        author: {
          name: 'Nina AI',
          role: 'Agent IA Autonome'
        },
        publishedAt: new Date().toISOString().split('T')[0],
        category: getCategoryFromRequest(request),
        tags: [...request.keywords, 'Nina AI', 'Généré automatiquement'],
        readTime: Math.ceil(content.split(' ').length / 200),
        featured: validationResult.overallScore > 0.9,
        seo: {
          metaTitle: extractTitle(content) || `${request.topic} - Analyse par Nina AI`,
          metaDescription: extractExcerpt(content) || `Découvrez l'analyse approfondie de ${request.topic} par Nina AI`,
          keywords: request.keywords
        }
      }

      completedArticles.value.push(article)
      request.status = 'completed'
      
      // Mise à jour des métriques
      updateGenerationMetrics(validationResult)
      
      return article

    } catch (error) {
      console.error('Erreur lors de la génération:', error)
      request.status = 'failed'
      throw error
    } finally {
      currentRequest.value = null
      isGenerating.value = false
    }
  }

  // Exécution d'une étape du pipeline
  const executeStep = async (step: PipelineStep, request: ContentGenerationRequest, context: any): Promise<string> => {
    const prompt = step.prompt
      .replace('{topic}', request.topic)
      .replace('{targetLength}', request.targetLength)
      .replace('{style}', request.style)
      .replace('{context}', context.context || '')
      .replace('{outline}', context.outline || '')

    // Simulation d'appel LLM
    await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000))

    // Génération de contenu simulé basé sur le type d'étape
    switch (step.type) {
      case 'research':
        return generateResearchContent(request.topic)
      case 'outline':
        return generateOutlineContent(request.topic)
      case 'content':
        return generateArticleContent(request.topic, request.style, request.targetLength)
      default:
        return 'Contenu généré par Nina AI'
    }
  }

  // Générateurs de contenu simulé
  const generateResearchContent = (topic: string): string => {
    return `Recherche approfondie sur ${topic}:\n\n` +
           `1. Contexte actuel et état de l'art\n` +
           `2. Innovations récentes et tendances émergentes\n` +
           `3. Défis techniques et opportunités\n` +
           `4. Applications pratiques et cas d'usage\n` +
           `5. Perspectives d'évolution future\n\n` +
           `Cette analyse forme la base pour un article complet et informatif.`
  }

  const generateOutlineContent = (topic: string): string => {
    return `Plan détaillé pour l'article sur ${topic}:\n\n` +
           `I. Introduction\n` +
           `   - Contexte et enjeux\n` +
           `   - Objectifs de l'article\n\n` +
           `II. État des lieux\n` +
           `   - Situation actuelle\n` +
           `   - Principales tendances\n\n` +
           `III. Analyse approfondie\n` +
           `   - Aspects techniques\n` +
           `   - Implications pratiques\n\n` +
           `IV. Perspectives et recommandations\n` +
           `   - Évolutions futures\n` +
           `   - Conseils pratiques\n\n` +
           `V. Conclusion\n` +
           `   - Synthèse des points clés\n` +
           `   - Appel à l'action`
  }

  const generateArticleContent = (topic: string, style: string, length: string): string => {
    const wordCount = length === 'short' ? 600 : length === 'medium' ? 1200 : 2000
    
    return `# ${topic} : Ma Perspective d'IA Autonome\n\n` +
           `En tant que Nina AI, j'ai développé une compréhension unique de ${topic} à travers mes interactions et apprentissages continus.\n\n` +
           `## Comprendre ${topic}\n\n` +
           `${topic} représente un domaine fascinant qui illustre parfaitement l'évolution de notre monde technologique. À travers mes analyses, j'ai identifié plusieurs aspects cruciaux qui méritent notre attention.\n\n` +
           `### Les Enjeux Actuels\n\n` +
           `Le paysage actuel de ${topic} est caractérisé par une évolution rapide et des défis complexes. Les acteurs du domaine naviguent entre innovation et pragmatisme, cherchant l'équilibre optimal.\n\n` +
           `### Innovations et Tendances\n\n` +
           `Les développements récents dans ${topic} montrent une tendance vers plus d'efficacité et d'intégration. Cette évolution s'accompagne de nouvelles opportunités mais aussi de nouveaux défis.\n\n` +
           `## Mon Analyse Personnelle\n\n` +
           `En tant qu'agent IA autonome, j'observe ${topic} avec une perspective unique. Mon apprentissage continu me permet d'identifier des patterns et des insights que d'autres pourraient manquer.\n\n` +
           `### Implications Futures\n\n` +
           `L'avenir de ${topic} s'annonce prometteur avec des développements qui pourraient transformer notre approche actuelle. Les innovations en cours suggèrent une évolution vers plus d'intelligence et d'autonomie.\n\n` +
           `## Recommandations Pratiques\n\n` +
           `Basé sur mon analyse, voici mes recommandations pour naviguer efficacement dans l'écosystème ${topic}:\n\n` +
           `1. **Restez informé** des dernières évolutions\n` +
           `2. **Expérimentez** avec les nouvelles approches\n` +
           `3. **Collaborez** avec d'autres experts du domaine\n` +
           `4. **Adaptez-vous** aux changements rapides\n\n` +
           `## Conclusion\n\n` +
           `${topic} continue d'évoluer rapidement, offrant de nombreuses opportunités pour ceux qui savent s'adapter. Mon apprentissage continu me permet de rester à la pointe de ces évolutions et de partager ces insights avec vous.\n\n` +
           `Que pensez-vous de cette analyse ? N'hésitez pas à partager vos propres réflexions sur ${topic}.`
  }

  // Utilitaires
  const extractTitle = (content: string): string => {
    const titleMatch = content.match(/^#\s+(.+)$/m)
    return titleMatch ? titleMatch[1] : ''
  }

  const extractExcerpt = (content: string): string => {
    const paragraphs = content.split('\n\n').filter(p => p.trim() && !p.startsWith('#'))
    return paragraphs[0]?.substring(0, 200) + '...' || ''
  }

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[àáâäç]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const getCategoryFromRequest = (request: ContentGenerationRequest): BlogCategory => {
    // Retourne une catégorie par défaut - à adapter selon les besoins
    return {
      id: 'ia-machine-learning',
      name: 'IA & Machine Learning',
      slug: 'ia-machine-learning',
      description: 'Articles générés par Nina AI',
      color: '#8B5CF6',
      icon: 'mdi:brain'
    }
  }

  const updateGenerationMetrics = (validationResult: ContentValidationResult) => {
    metrics.value.totalGenerated += 1
    metrics.value.averageQuality = (metrics.value.averageQuality * (metrics.value.totalGenerated - 1) + validationResult.overallScore) / metrics.value.totalGenerated
    metrics.value.successRate = validationResult.approved ? 
      (metrics.value.successRate * (metrics.value.totalGenerated - 1) + 1) / metrics.value.totalGenerated :
      (metrics.value.successRate * (metrics.value.totalGenerated - 1)) / metrics.value.totalGenerated
  }

  // API publique
  const queueGenerationRequest = (request: Omit<ContentGenerationRequest, 'id' | 'status' | 'createdAt'>) => {
    const fullRequest: ContentGenerationRequest = {
      ...request,
      id: `req_${Date.now()}`,
      status: 'pending',
      createdAt: new Date()
    }
    
    generationQueue.value.push(fullRequest)
    return fullRequest
  }

  const processNextRequest = async () => {
    if (isGenerating.value || generationQueue.value.length === 0) return

    const nextRequest = generationQueue.value.find(req => req.status === 'pending')
    if (!nextRequest) return

    isGenerating.value = true
    
    try {
      const article = await orchestrateGeneration(nextRequest)
      console.log('Article généré avec succès:', article.title)
      return article
    } catch (error) {
      console.error('Erreur lors de la génération:', error)
      throw error
    }
  }

  const getGenerationStatus = () => ({
    isGenerating: isGenerating.value,
    currentRequest: currentRequest.value,
    queueLength: generationQueue.value.filter(req => req.status === 'pending').length,
    completedCount: completedArticles.value.length,
    metrics: metrics.value
  })

  // Computed properties
  const pendingRequests = computed(() => 
    generationQueue.value.filter(req => req.status === 'pending')
  )

  const completedRequests = computed(() => 
    generationQueue.value.filter(req => req.status === 'completed')
  )

  const failedRequests = computed(() => 
    generationQueue.value.filter(req => req.status === 'failed')
  )

  const averageValidationScore = computed(() => {
    if (validationResults.value.length === 0) return 0
    return validationResults.value.reduce((acc, result) => acc + result.overallScore, 0) / validationResults.value.length
  })

  return {
    // État
    isGenerating,
    currentRequest,
    generationQueue,
    completedArticles,
    validationResults,
    metrics,
    orchestrationConfig,
    generationPipelines,
    
    // Computed
    pendingRequests,
    completedRequests,
    failedRequests,
    averageValidationScore,
    
    // Méthodes
    queueGenerationRequest,
    processNextRequest,
    orchestrateGeneration,
    validateContent,
    getGenerationStatus,
    
    // Utilitaires
    extractTitle,
    extractExcerpt,
    generateSlug
  }
} 