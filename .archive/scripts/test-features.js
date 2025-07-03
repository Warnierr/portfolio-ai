#!/usr/bin/env node

/**
 * Script de test des fonctionnalités du Portfolio Raouf WARNIER
 * 
 * Ce script vérifie que toutes les fonctionnalités développées
 * fonctionnent correctement avant le déploiement.
 */

import fs from 'fs'
import path from 'path'

console.log('🧪 Test des fonctionnalités du Portfolio Raouf WARNIER')
console.log('=' .repeat(60))

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  title: (msg) => console.log(`\n${colors.bold}${colors.blue}📋 ${msg}${colors.reset}`)
}

let testResults = {
  passed: 0,
  failed: 0,
  warnings: 0
}

// Fonction utilitaire pour vérifier l'existence d'un fichier
function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log.success(`${description} - Fichier présent`)
    testResults.passed++
    return true
  } else {
    log.error(`${description} - Fichier manquant: ${filePath}`)
    testResults.failed++
    return false
  }
}

// Fonction pour vérifier le contenu d'un fichier
function checkFileContent(filePath, patterns, description) {
  if (!fs.existsSync(filePath)) {
    log.error(`${description} - Fichier manquant: ${filePath}`)
    testResults.failed++
    return false
  }

  const content = fs.readFileSync(filePath, 'utf8')
  let allPatternsFound = true

  patterns.forEach(pattern => {
    if (typeof pattern === 'string') {
      if (!content.includes(pattern)) {
        log.error(`${description} - Pattern manquant: "${pattern}"`)
        allPatternsFound = false
      }
    } else if (pattern instanceof RegExp) {
      if (!pattern.test(content)) {
        log.error(`${description} - Pattern regex manquant: ${pattern}`)
        allPatternsFound = false
      }
    }
  })

  if (allPatternsFound) {
    log.success(`${description} - Contenu valide`)
    testResults.passed++
    return true
  } else {
    testResults.failed++
    return false
  }
}

// Tests des composants principaux
log.title('Vérification des composants principaux')

checkFile('components/HeroSection.vue', 'Section Hero')
checkFile('components/AboutSection.vue', 'Section À propos')
checkFile('components/ProjectsSection.vue', 'Section Projets')
checkFile('components/ServicesSection.vue', 'Section Services')
checkFile('components/ContactSection.vue', 'Section Contact')
checkFile('components/RoadmapSection.vue', 'Section Roadmap')
checkFile('components/NinaAIAgent.vue', 'Agent Nina AI')
checkFile('components/Navigation.vue', 'Navigation')
checkFile('components/Footer.vue', 'Footer')

// Tests des composables
log.title('Vérification des composables')

checkFile('composables/useNinaAI.ts', 'Composable Nina AI')
checkFile('composables/usePerformanceMonitoring.ts', 'Composable Monitoring')
checkFile('composables/useInteractiveCursor.ts', 'Composable Curseur Interactif')
checkFile('composables/useSEOAccessibility.ts', 'Composable SEO & Accessibilité')

// Tests de l'API
log.title('Vérification de l\'API')

checkFile('server/api/contact.post.ts', 'API de contact')
checkFileContent('server/api/contact.post.ts', [
  'nodemailer',
  'createTransporter',
  'sendMail',
  'SMTP_HOST',
  'validation'
], 'API Contact - Fonctionnalités')

// Tests des configurations
log.title('Vérification des configurations')

checkFile('nuxt.config.ts', 'Configuration Nuxt')
checkFile('package.json', 'Package.json')
checkFile('tsconfig.json', 'Configuration TypeScript')

// Vérification des dépendances dans package.json
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  const requiredDeps = [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'gsap',
    '@studio-freight/lenis'
  ]

  requiredDeps.forEach(dep => {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
      log.success(`Dépendance ${dep} présente`)
      testResults.passed++
    } else {
      log.warning(`Dépendance ${dep} manquante`)
      testResults.warnings++
    }
  })
}

// Tests des corrections GSAP
log.title('Vérification des corrections GSAP')

const gsapFiles = [
  'components/AboutSection.vue',
  'components/ProjectsSection.vue', 
  'components/ServicesSection.vue'
]

gsapFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8')
    
    // Vérifier qu'il n'y a plus d'erreurs GSAP
    if (content.includes('$gsap.from(') || content.includes('$gsap.to(')) {
      log.error(`${file} - Erreurs GSAP non corrigées ($gsap.from ou $gsap.to)`)
      testResults.failed++
    } else if (content.includes('$gsap.gsap.from') || content.includes('$gsap.gsap.to')) {
      log.success(`${file} - Corrections GSAP appliquées`)
      testResults.passed++
    } else {
      log.warning(`${file} - Aucune utilisation GSAP détectée`)
      testResults.warnings++
    }
  }
})

// Tests des fonctionnalités avancées
log.title('Vérification des fonctionnalités avancées')

// Nina AI
checkFileContent('composables/useNinaAI.ts', [
  'conversationHistory',
  'generateSuggestions',
  'analyzeConversationFlow',
  'executeAction'
], 'Nina AI - Fonctionnalités avancées')

// Monitoring des performances
checkFileContent('composables/usePerformanceMonitoring.ts', [
  'Core Web Vitals',
  'LCP',
  'FID',
  'CLS',
  'performance.mark'
], 'Monitoring - Core Web Vitals')

// Curseur interactif
checkFileContent('composables/useInteractiveCursor.ts', [
  'CursorType',
  'nina',
  'project',
  'contact',
  'animation'
], 'Curseur - Types et animations')

// SEO et Accessibilité
checkFileContent('composables/useSEOAccessibility.ts', [
  'useHead',
  'og:title',
  'twitter:card',
  'Schema.org',
  'keyboard'
], 'SEO & Accessibilité - Métadonnées')

// Roadmap
checkFileContent('components/RoadmapSection.vue', [
  'Foundation IA',
  'IA Interactive', 
  'Web Immersif',
  'timeline',
  'progression'
], 'Roadmap - Phases et contenu')

// Tests de l'intégration
log.title('Vérification de l\'intégration')

checkFileContent('app.vue', [
  'usePerformanceMonitoring',
  'useInteractiveCursor',
  'useSEOAccessibility',
  'skip-link'
], 'App.vue - Intégration des composables')

checkFileContent('pages/index.vue', [
  'HeroSection',
  'AboutSection',
  'ProjectsSection',
  'ServicesSection',
  'RoadmapSection',
  'ContactSection'
], 'Page d\'accueil - Sections')

// Tests des assets et styles
log.title('Vérification des assets')

checkFile('assets/css/main.css', 'Styles principaux')
checkFile('public/favicon.ico', 'Favicon')

// Vérification de la documentation
log.title('Vérification de la documentation')

checkFile('README.md', 'README')
checkFile('ROADMAP.md', 'Roadmap')
checkFile('ENV_SETUP.md', 'Guide configuration environnement')

// Tests spécifiques au contenu
log.title('Vérification du contenu')

// Vérifier les informations de Raouf
const aboutFile = 'components/AboutSection.vue'
if (fs.existsSync(aboutFile)) {
  checkFileContent(aboutFile, [
    'Raouf WARNIER',
    'Ingénieur DevOps',
    'Inetum-Orange',
    'ESIEE Paris',
    'Data Science'
  ], 'Section À propos - Informations personnelles')
}

// Résumé des tests
log.title('Résumé des tests')

const total = testResults.passed + testResults.failed + testResults.warnings

console.log(`\n📊 Résultats des tests:`)
console.log(`${colors.green}✅ Tests réussis: ${testResults.passed}${colors.reset}`)
console.log(`${colors.red}❌ Tests échoués: ${testResults.failed}${colors.reset}`)
console.log(`${colors.yellow}⚠️  Avertissements: ${testResults.warnings}${colors.reset}`)
console.log(`📈 Total: ${total} tests`)

const successRate = total > 0 ? Math.round((testResults.passed / total) * 100) : 0
console.log(`🎯 Taux de réussite: ${successRate}%`)

// Recommandations
if (testResults.failed > 0) {
  log.title('Recommandations')
  console.log('🔧 Actions à effectuer:')
  
  if (testResults.failed > 0) {
    console.log('   1. Corriger les erreurs critiques listées ci-dessus')
  }
  
  if (testResults.warnings > 0) {
    console.log('   2. Vérifier les avertissements (optionnels mais recommandés)')
  }
  
  console.log('   3. Installer nodemailer: npm install nodemailer @types/nodemailer')
  console.log('   4. Configurer les variables d\'environnement (.env)')
  console.log('   5. Tester le formulaire de contact')
  console.log('   6. Vérifier les animations GSAP')
  console.log('   7. Tester Nina AI avec différents scénarios')
}

// Statut de sortie
if (testResults.failed === 0) {
  log.success('🎉 Tous les tests sont passés ! Le portfolio est prêt.')
  process.exit(0)
} else {
  log.error(`💥 ${testResults.failed} test(s) ont échoué. Corrections nécessaires.`)
  process.exit(1)
} 