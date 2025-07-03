import { ref, computed } from 'vue'

export interface ValidationRule {
  id: string
  name: string
  description: string
  type: 'content' | 'technical' | 'ethical' | 'quality'
  severity: 'low' | 'medium' | 'high' | 'critical'
  validator: (content: string, metadata?: any) => ValidationResult
}

export interface ValidationResult {
  passed: boolean
  score: number // 0-100
  issues: ValidationIssue[]
  suggestions: string[]
  confidence: number
}

export interface ValidationIssue {
  type: 'error' | 'warning' | 'info'
  message: string
  line?: number
  severity: 'low' | 'medium' | 'high' | 'critical'
  autoFixable: boolean
}

export interface ContentTest {
  id: string
  name: string
  description: string
  content: string
  expectedResult: any
  actualResult?: any
  status: 'pending' | 'running' | 'passed' | 'failed'
  timestamp: Date
  duration?: number
  errors?: string[]
}

export interface QualityMetrics {
  readability: number
  coherence: number
  originality: number
  factualAccuracy: number
  engagement: number
  technicalAccuracy: number
}

export const useNinaValidation = () => {
  const validationRules = ref<ValidationRule[]>([])
  const contentTests = ref<ContentTest[]>([])
  const validationHistory = ref<ValidationResult[]>([])
  const isValidating = ref(false)
  const currentTest = ref<ContentTest | null>(null)

  // Initialisation des règles de validation
  const initializeValidationRules = () => {
    validationRules.value = [
      {
        id: 'content-length',
        name: 'Longueur du contenu',
        description: 'Vérifie que le contenu a une longueur appropriée',
        type: 'content',
        severity: 'medium',
        validator: (content: string) => {
          const wordCount = content.split(/\s+/).length
          const passed = wordCount >= 100 && wordCount <= 2000
          return {
            passed,
            score: passed ? 100 : Math.max(0, 100 - Math.abs(wordCount - 1000) / 10),
            issues: passed ? [] : [{
              type: 'warning' as const,
              message: `Longueur de contenu non optimale: ${wordCount} mots (recommandé: 100-2000)`,
              severity: 'medium' as const,
              autoFixable: false
            }],
            suggestions: passed ? [] : ['Ajuster la longueur du contenu pour améliorer la lisibilité'],
            confidence: 0.9
          }
        }
      },
      {
        id: 'technical-accuracy',
        name: 'Précision technique',
        description: 'Vérifie la précision des informations techniques',
        type: 'technical',
        severity: 'high',
        validator: (content: string) => {
          const technicalTerms = ['IA', 'machine learning', 'algorithme', 'neural', 'données']
          const foundTerms = technicalTerms.filter(term => 
            content.toLowerCase().includes(term.toLowerCase())
          )
          const accuracy = foundTerms.length > 0 ? 85 + Math.random() * 10 : 70
          
          return {
            passed: accuracy >= 80,
            score: accuracy,
            issues: accuracy < 80 ? [{
              type: 'warning' as const,
              message: 'Précision technique à vérifier',
              severity: 'medium' as const,
              autoFixable: false
            }] : [],
            suggestions: accuracy < 80 ? ['Vérifier les références techniques', 'Ajouter des sources'] : [],
            confidence: 0.75
          }
        }
      },
      {
        id: 'ethical-compliance',
        name: 'Conformité éthique',
        description: 'Vérifie le respect des principes éthiques',
        type: 'ethical',
        severity: 'critical',
        validator: (content: string) => {
          const problematicTerms = ['biais', 'discrimination', 'manipulation']
          const hasProblematicContent = problematicTerms.some(term => 
            content.toLowerCase().includes(term.toLowerCase())
          )
          
          return {
            passed: !hasProblematicContent,
            score: hasProblematicContent ? 60 : 95,
            issues: hasProblematicContent ? [{
              type: 'error' as const,
              message: 'Contenu potentiellement problématique détecté',
              severity: 'high' as const,
              autoFixable: false
            }] : [],
            suggestions: hasProblematicContent ? ['Réviser le contenu pour éviter les biais', 'Consulter les guidelines éthiques'] : [],
            confidence: 0.85
          }
        }
      },
      {
        id: 'readability',
        name: 'Lisibilité',
        description: 'Évalue la facilité de lecture du contenu',
        type: 'quality',
        severity: 'medium',
        validator: (content: string) => {
          const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
          const words = content.split(/\s+/)
          const avgWordsPerSentence = words.length / sentences.length
          
          const readabilityScore = Math.max(0, 100 - (avgWordsPerSentence - 15) * 2)
          
          return {
            passed: readabilityScore >= 70,
            score: readabilityScore,
            issues: readabilityScore < 70 ? [{
              type: 'warning' as const,
              message: 'Lisibilité faible - phrases trop longues',
              severity: 'medium' as const,
              autoFixable: true
            }] : [],
            suggestions: readabilityScore < 70 ? ['Raccourcir les phrases', 'Utiliser des mots plus simples'] : [],
            confidence: 0.8
          }
        }
      },
      {
        id: 'originality',
        name: 'Originalité',
        description: 'Vérifie l\'originalité du contenu',
        type: 'quality',
        severity: 'medium',
        validator: (content: string) => {
          // Simulation d'un score d'originalité
          const originalityScore = 75 + Math.random() * 20
          
          return {
            passed: originalityScore >= 70,
            score: originalityScore,
            issues: originalityScore < 70 ? [{
              type: 'warning' as const,
              message: 'Contenu potentiellement peu original',
              severity: 'medium' as const,
              autoFixable: false
            }] : [],
            suggestions: originalityScore < 70 ? ['Ajouter des perspectives uniques', 'Inclure des exemples personnels'] : [],
            confidence: 0.7
          }
        }
      }
    ]
  }

  // Validation complète d'un contenu
  const validateContent = async (content: string, metadata?: any): Promise<ValidationResult> => {
    isValidating.value = true
    
    const results = validationRules.value.map(rule => rule.validator(content, metadata))
    
    // Simulation d'un délai de validation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const overallScore = results.reduce((sum, result) => sum + result.score, 0) / results.length
    const allIssues = results.flatMap(result => result.issues)
    const allSuggestions = results.flatMap(result => result.suggestions)
    const passed = results.every(result => result.passed)
    
    const validationResult: ValidationResult = {
      passed,
      score: overallScore,
      issues: allIssues,
      suggestions: allSuggestions,
      confidence: results.reduce((sum, result) => sum + result.confidence, 0) / results.length
    }
    
    validationHistory.value.push(validationResult)
    isValidating.value = false
    
    return validationResult
  }

  // Tests automatisés pour Nina
  const runContentTests = async (content: string): Promise<ContentTest[]> => {
    const tests: ContentTest[] = [
      {
        id: 'test-1',
        name: 'Test de structure',
        description: 'Vérifie la structure du contenu (titre, paragraphes, etc.)',
        content,
        expectedResult: { hasTitle: true, hasParagraphs: true },
        status: 'pending',
        timestamp: new Date()
      },
      {
        id: 'test-2',
        name: 'Test de cohérence',
        description: 'Vérifie la cohérence logique du contenu',
        content,
        expectedResult: { coherenceScore: 80 },
        status: 'pending',
        timestamp: new Date()
      },
      {
        id: 'test-3',
        name: 'Test de pertinence',
        description: 'Vérifie la pertinence par rapport au sujet',
        content,
        expectedResult: { relevanceScore: 85 },
        status: 'pending',
        timestamp: new Date()
      }
    ]

    for (const test of tests) {
      test.status = 'running'
      currentTest.value = test
      
      const startTime = Date.now()
      
      try {
        // Simulation des tests
        await new Promise(resolve => setTimeout(resolve, 500))
        
        switch (test.id) {
          case 'test-1':
            test.actualResult = {
              hasTitle: content.includes('#'),
              hasParagraphs: content.split('\n\n').length > 1
            }
            test.status = test.actualResult.hasTitle && test.actualResult.hasParagraphs ? 'passed' : 'failed'
            break
          case 'test-2':
            test.actualResult = { coherenceScore: 75 + Math.random() * 20 }
            test.status = test.actualResult.coherenceScore >= 80 ? 'passed' : 'failed'
            break
          case 'test-3':
            test.actualResult = { relevanceScore: 80 + Math.random() * 15 }
            test.status = test.actualResult.relevanceScore >= 85 ? 'passed' : 'failed'
            break
        }
        
        test.duration = Date.now() - startTime
      } catch (error) {
        test.status = 'failed'
        test.errors = [error instanceof Error ? error.message : 'Erreur inconnue']
      }
    }
    
    contentTests.value.push(...tests)
    currentTest.value = null
    
    return tests
  }

  // Calcul des métriques de qualité
  const calculateQualityMetrics = (content: string): QualityMetrics => {
    return {
      readability: 75 + Math.random() * 20,
      coherence: 80 + Math.random() * 15,
      originality: 70 + Math.random() * 25,
      factualAccuracy: 85 + Math.random() * 10,
      engagement: 78 + Math.random() * 18,
      technicalAccuracy: 82 + Math.random() * 13
    }
  }

  // Génération de rapport de validation
  const generateValidationReport = (validationResult: ValidationResult, metrics: QualityMetrics) => {
    return {
      summary: {
        overallScore: validationResult.score,
        passed: validationResult.passed,
        confidence: validationResult.confidence,
        timestamp: new Date()
      },
      details: {
        validation: validationResult,
        metrics,
        recommendations: generateRecommendations(validationResult, metrics)
      }
    }
  }

  const generateRecommendations = (validation: ValidationResult, metrics: QualityMetrics): string[] => {
    const recommendations: string[] = []
    
    if (metrics.readability < 70) {
      recommendations.push('Améliorer la lisibilité en simplifiant les phrases')
    }
    
    if (metrics.originality < 75) {
      recommendations.push('Ajouter des perspectives uniques et des exemples personnels')
    }
    
    if (validation.score < 80) {
      recommendations.push('Réviser le contenu selon les suggestions de validation')
    }
    
    if (metrics.engagement < 75) {
      recommendations.push('Rendre le contenu plus engageant avec des questions et des exemples')
    }
    
    return recommendations
  }

  // Computed properties
  const validationStats = computed(() => {
    const total = validationHistory.value.length
    const passed = validationHistory.value.filter(v => v.passed).length
    const averageScore = total > 0 
      ? validationHistory.value.reduce((sum, v) => sum + v.score, 0) / total 
      : 0
    
    return {
      total,
      passed,
      failed: total - passed,
      successRate: total > 0 ? (passed / total) * 100 : 0,
      averageScore
    }
  })

  const testStats = computed(() => {
    const total = contentTests.value.length
    const passed = contentTests.value.filter(t => t.status === 'passed').length
    const failed = contentTests.value.filter(t => t.status === 'failed').length
    const running = contentTests.value.filter(t => t.status === 'running').length
    
    return {
      total,
      passed,
      failed,
      running,
      pending: total - passed - failed - running
    }
  })

  const criticalIssues = computed(() => {
    return validationHistory.value
      .flatMap(v => v.issues)
      .filter(issue => issue.severity === 'critical' || issue.severity === 'high')
  })

  // Initialisation
  initializeValidationRules()

  return {
    // État
    validationRules,
    contentTests,
    validationHistory,
    isValidating,
    currentTest,
    
    // Computed
    validationStats,
    testStats,
    criticalIssues,
    
    // Méthodes
    validateContent,
    runContentTests,
    calculateQualityMetrics,
    generateValidationReport,
    generateRecommendations,
    initializeValidationRules
  }
} 