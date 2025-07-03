#!/usr/bin/env node

/**
 * Script de démarrage intelligent pour le Portfolio Raouf WARNIER
 * 
 * Ce script vérifie l'environnement et guide l'utilisateur
 * pour une expérience de développement optimale.
 */

import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

// Couleurs pour les logs
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
}

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  title: (msg) => console.log(`\n${colors.bold}${colors.cyan}🚀 ${msg}${colors.reset}`),
  step: (msg) => console.log(`${colors.magenta}📋 ${msg}${colors.reset}`)
}

console.log(`${colors.bold}${colors.cyan}`)
console.log('=' .repeat(60))
console.log('🎨 PORTFOLIO RAOUF WARNIER - DÉMARRAGE INTELLIGENT')
console.log('=' .repeat(60))
console.log(`${colors.reset}`)

// Vérifications préliminaires
log.title('Vérifications de l\'environnement')

// 1. Vérifier les dépendances
log.step('Vérification des dépendances...')
if (!fs.existsSync('node_modules')) {
  log.warning('node_modules manquant - Installation des dépendances...')
  log.info('Exécutez: npm install')
  process.exit(1)
}
log.success('Dépendances installées')

// 2. Vérifier nodemailer
let nodemailerAvailable = false
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  nodemailerAvailable = !!(packageJson.dependencies?.nodemailer || packageJson.devDependencies?.nodemailer)
} catch (error) {
  log.warning('Erreur lors de la lecture de package.json')
}

if (nodemailerAvailable) {
  log.success('Nodemailer installé - Emails fonctionnels')
} else {
  log.warning('Nodemailer manquant - Mode simulation activé')
  log.info('Pour installer: npm install nodemailer @types/nodemailer')
}

// 3. Vérifier le fichier .env
const envExists = fs.existsSync('.env')
if (envExists) {
  log.success('Fichier .env trouvé')
} else {
  log.warning('Fichier .env manquant')
  log.info('Créez un fichier .env en vous basant sur ENV_SETUP.md')
}

// 4. Résumé de la configuration
log.title('Configuration actuelle')
console.log(`📧 Emails: ${nodemailerAvailable && envExists ? colors.green + 'Fonctionnels' : colors.yellow + 'Mode simulation'}${colors.reset}`)
console.log(`🔧 Variables d'environnement: ${envExists ? colors.green + 'Configurées' : colors.yellow + 'À configurer'}${colors.reset}`)
console.log(`🎯 Mode: ${colors.cyan}Développement${colors.reset}`)

// 5. Fonctionnalités disponibles
log.title('Fonctionnalités disponibles')
log.success('🤖 Nina AI - Agent intelligent')
log.success('📊 Monitoring des performances')
log.success('🎯 Curseur interactif')
log.success('♿ SEO & Accessibilité')
log.success('🗺️ Roadmap interactive')
log.success('📧 Formulaire de contact' + (nodemailerAvailable ? '' : ' (simulation)'))

// 6. Instructions d'utilisation
log.title('Instructions d\'utilisation')
console.log(`${colors.blue}🌐 URL locale:${colors.reset} http://localhost:3000`)
console.log(`${colors.blue}🔧 DevTools:${colors.reset} Shift + Alt + D`)
console.log(`${colors.blue}⌨️  Navigation clavier:${colors.reset} Alt + 1-5 pour les sections`)
console.log(`${colors.blue}♿ Accessibilité:${colors.reset} Alt + C (contraste), Alt + M (animations)`)

// 7. Commandes utiles
log.title('Commandes utiles')
console.log(`${colors.green}npm run test:features${colors.reset} - Tester toutes les fonctionnalités`)
console.log(`${colors.green}npm run build${colors.reset} - Build de production`)
console.log(`${colors.green}npm run preview${colors.reset} - Prévisualiser la production`)

// 8. Conseils pour les tests
if (!envExists) {
  log.title('💡 Pour tester les emails')
  console.log('1. Créez un fichier .env à la racine')
  console.log('2. Ajoutez vos paramètres SMTP (voir ENV_SETUP.md)')
  console.log('3. Redémarrez le serveur')
  console.log('4. Le formulaire de contact enverra de vrais emails')
}

// 9. Démarrage du serveur
log.title('Démarrage du serveur de développement')
console.log(`${colors.yellow}⏳ Lancement en cours...${colors.reset}\n`)

// Lancer Nuxt dev
const nuxtProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
})

// Gérer les signaux pour un arrêt propre
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}⏹️  Arrêt du serveur...${colors.reset}`)
  nuxtProcess.kill('SIGINT')
  process.exit(0)
})

process.on('SIGTERM', () => {
  nuxtProcess.kill('SIGTERM')
  process.exit(0)
})

nuxtProcess.on('exit', (code) => {
  if (code === 0) {
    log.success('Serveur arrêté proprement')
  } else {
    log.error(`Serveur arrêté avec le code ${code}`)
  }
  process.exit(code)
}) 