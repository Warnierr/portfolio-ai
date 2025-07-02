# 🚀 Guide de Déploiement Portfolio Nuxt 3 - Focus IA

Ce guide présente les meilleures stratégies de déploiement pour votre portfolio Nuxt 3 avec focus IA et Nina AI.

## 📋 Table des matières

- [Options de déploiement](#options-de-déploiement)
- [Stratégies SSO et SEO](#stratégies-sso-et-seo)
- [Déploiement rapide](#déploiement-rapide)
- [Optimisations avancées](#optimisations-avancées)
- [Monitoring et maintenance](#monitoring-et-maintenance)

## 🎯 Options de déploiement

### 1. **Vercel** (Recommandé pour MVP/Startup)

**Avantages :**
- Déploiement en 30 secondes avec `git push`
- CDN global automatique
- SSL automatique
- Preview deployments
- Optimisé pour Nuxt 3

**Configuration :**

```bash
# Installation
npm i -g vercel
vercel

# Configuration automatique détectée
# Nuxt 3 SSR + ISR supporté nativement
```

**Coût :** Gratuit jusqu'à 100GB bandwidth, puis $20/mois

### 2. **Firebase App Hosting** (Google I/O 2024)

**Avantages :**
- Support SSR natif
- Intégration Google Cloud
- Scaling automatique
- Build time ~3 minutes

**Configuration :**

```bash
# Prérequis
npm install -g firebase-tools
firebase login

# Configuration
firebase init hosting
firebase deploy
```

**Coût :** Pay-as-you-use (~$0.15 pour 10k visites)

### 3. **Netlify**

**Avantages :**
- Edge Functions pour SSR
- Forms handling intégré
- Split testing A/B

**Configuration :**

```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = ".output/public"

[[redirects]]
  from = "/*"
  to = "/.netlify/functions/server"
  status = 200
```

### 4. **Cloudflare Pages**

**Avantages :**
- Edge computing global
- Workers pour SSR
- Analytics intégrées

### 5. **Self-hosted (VPS/Serveur dédié)**

**Avantages :**
- Contrôle total
- Coûts prévisibles
- Pas de vendor lock-in

## 🔍 Stratégies SSO et SEO

### Configuration Nuxt optimale

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // Mode de rendu hybride pour performances optimales
  ssr: true,
  
  // Règles de rendu par route
  routeRules: {
    // Page d'accueil : SSG pour performance
    '/': { prerender: true },
    
    // Pages projets : ISR pour mise à jour automatique
    '/projets/**': { isr: 3600 }, // 1 heure
    
    // Section Nina AI : SWR pour données temps réel
    '/nina-ai': { swr: 60 }, // 1 minute
    
    // API routes
    '/api/**': { cors: true, headers: { 'Cache-Control': 's-maxage=60' } },
    
    // Contact : SSR pour formulaires
    '/contact': { ssr: true }
  },

  // SEO Configuration
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  // Modules SEO
  modules: [
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxtjs/sitemap'
  ],

  // Configuration SEO avancée
  site: {
    url: 'https://raouf-warnier.dev',
    name: 'Raouf WARNIER - Ingénieur IA & Data',
    description: 'Portfolio de Raouf WARNIER, créateur de Nina AI et spécialiste en intelligence artificielle',
    defaultLocale: 'fr'
  },

  // Images optimisées
  image: {
    quality: 85,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    }
  },

  // Performance
  experimental: {
    payloadExtraction: false, // Réduit la taille
    inlineSSRStyles: false,   // Améliore FCP
  },

  // Build optimisations
  build: {
    transpile: ['three', 'gsap']
  },

  vite: {
    build: {
      cssCodeSplit: false, // CSS unique pour performance
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'nuxt'],
            three: ['three'],
            gsap: ['gsap']
          }
        }
      }
    }
  }
})
```

### Schema.org pour l'IA

```vue
<!-- pages/index.vue -->
<script setup>
useSchemaOrg([
  {
    '@type': 'Person',
    name: 'Raouf WARNIER',
    jobTitle: 'Ingénieur IA & Data',
    description: 'Créateur de Nina AI, spécialisé en intelligence artificielle',
    url: 'https://raouf-warnier.dev',
    sameAs: [
      'https://linkedin.com/in/raouf-warnier',
      'https://github.com/raouf-warnier'
    ],
    knowsAbout: [
      'Intelligence Artificielle',
      'Machine Learning',
      'Python',
      'Nina AI',
      'Agents Conversationnels'
    ]
  },
  {
    '@type': 'WebSite',
    name: 'Portfolio Raouf WARNIER',
    url: 'https://raouf-warnier.dev',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://raouf-warnier.dev/projets?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
])
</script>
```

## ⚡ Déploiement rapide

### Option 1 : Vercel (2 minutes)

```bash
# 1. Connecter GitHub
git remote add origin https://github.com/username/portfolio

# 2. Push du code
git add .
git commit -m "Portfolio IA ready for deployment"
git push origin main

# 3. Déployer
npx vercel --prod

# 4. Configurer le domaine personnalisé
vercel domains add raouf-warnier.dev
```

### Option 2 : Firebase App Hosting (5 minutes)

```bash
# 1. Initialiser Firebase
firebase init hosting

# 2. Configuration build
# firebase.json
{
  "hosting": {
    "source": ".",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "frameworksBackend": {
      "region": "europe-west1"
    }
  }
}

# 3. Déployer
firebase deploy --only hosting
```

### Option 3 : Self-hosted avec Docker

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./
EXPOSE 3000
CMD ["node", "server/index.mjs"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - portfolio
```

## 🚀 Optimisations avancées

### 1. **Performance Web Vitals**

```typescript
// plugins/performance.client.ts
export default defineNuxtPlugin(() => {
  if (process.client) {
    // Core Web Vitals tracking
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log)
      getFID(console.log)
      getFCP(console.log)
      getLCP(console.log)
      getTTFB(console.log)
    })
  }
})
```

### 2. **Service Worker pour PWA**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@vite-pwa/nuxt'],
  
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
    },
    manifest: {
      name: 'Raouf WARNIER - Portfolio IA',
      short_name: 'Portfolio IA',
      description: 'Portfolio de Raouf WARNIER, créateur de Nina AI',
      theme_color: '#6366f1',
      background_color: '#0a0a0a',
      icons: [
        {
          src: 'icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  }
})
```

### 3. **CDN et Cache Strategy**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    storage: {
      redis: {
        driver: 'redis',
        // Configuration Redis pour cache
      }
    },
    routeRules: {
      // Cache statique long
      '/assets/**': { headers: { 'Cache-Control': 'max-age=31536000' } },
      
      // Cache API court
      '/api/**': { headers: { 'Cache-Control': 'max-age=300' } },
      
      // Pas de cache pour admin
      '/admin/**': { headers: { 'Cache-Control': 'no-cache' } }
    }
  }
})
```

## 📊 Monitoring et maintenance

### 1. **Analytics et suivi**

```vue
<!-- plugins/analytics.client.ts -->
export default defineNuxtPlugin(() => {
  // Google Analytics 4
  useHead({
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID',
        async: true,
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `,
      },
    ],
  })
})
```

### 2. **Error Tracking avec Sentry**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sentry'],
  
  sentry: {
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    config: {
      tracesSampleRate: 1.0,
    },
  }
})
```

### 3. **Health Checks**

```typescript
// server/api/health.get.ts
export default defineEventHandler(async (event) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  }
  
  return health
})
```

## 🔧 Scripts de déploiement

### Deploy script automatisé

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Déploiement Portfolio IA..."

# 1. Tests
echo "📝 Exécution des tests..."
npm run test

# 2. Build
echo "🏗️ Build de production..."
npm run build

# 3. Optimisation images
echo "🖼️ Optimisation des images..."
npm run optimize:images

# 4. Deploy selon l'environnement
if [ "$1" = "prod" ]; then
  echo "🌐 Déploiement en production..."
  vercel --prod
elif [ "$1" = "staging" ]; then
  echo "🧪 Déploiement en staging..."
  vercel
else
  echo "❌ Spécifiez l'environnement: prod ou staging"
  exit 1
fi

echo "✅ Déploiement terminé!"
```

### GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy Portfolio

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm run test
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## 🎯 Recommandations finales

### Pour un MVP/Portfolio personnel :
1. **Vercel** - Déploiement en 30 secondes
2. Configuration SSR + ISR
3. Domaine personnalisé
4. Analytics Google

### Pour une solution d'entreprise :
1. **Firebase App Hosting** ou **AWS Amplify**
2. CI/CD avec GitHub Actions
3. Monitoring Sentry
4. CDN CloudFlare

### Pour un contrôle total :
1. **VPS avec Docker**
2. Nginx reverse proxy
3. SSL Let's Encrypt
4. Redis pour cache

## 📞 Support

En cas de questions sur le déploiement :
- Documentation Nuxt : https://nuxt.com/docs/getting-started/deployment
- GitHub Issues : Créer un ticket avec logs
- Discord Nuxt : Communauté active

---

**Prêt à déployer votre portfolio IA ? Choisissez votre stratégie et lancez-vous ! 🚀** 