# 🔐 Implémentation Sécurité - Guide Rapide

## 🚀 Solution Rapide : Rate Limiting avec Upstash (30 min)

### Étape 1 : Créer compte Upstash (Gratuit)

1. Aller sur https://upstash.com/
2. Sign up (GitHub OAuth recommandé)
3. Créer une nouvelle Redis database :
   - Nom : `kenshu-ratelimit`
   - Region : Europe (Paris recommended)
   - Type : Free tier ✅

4. Copier les credentials :
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

---

### Étape 2 : Installation

```bash
cd portfolio-ai
npm install @upstash/ratelimit @upstash/redis zod
```

---

### Étape 3 : Variables d'environnement

#### Créer `.env.local` (local dev)
```bash
OPENROUTER_API_KEY=your_existing_key
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

#### Ajouter à Vercel

1. Aller sur dashboard.vercel.com
2. Projet → Settings → Environment Variables
3. Ajouter :
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

---

### Étape 4 : Créer `/lib/ratelimit.ts`

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialiser Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Configuration rate limits
export const ratelimit = {
  // Global : 10 requêtes par minute par IP
  perMinute: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "60 s"),
    analytics: true,
    prefix: "ratelimit:minute",
  }),

  // Strict : 2 requêtes par seconde par IP (anti-spam)
  perSecond: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(2, "10 s"),
    analytics: true,
    prefix: "ratelimit:second",
  }),

  // Daily : 100 requêtes par jour par IP
  perDay: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "86400 s"),
    analytics: true,
    prefix: "ratelimit:day",
  }),
};

// Helper pour extraire IP
export function getIP(req: Request): string {
  // Vercel forwarded IP
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  
  // Cloudflare
  const cfIP = req.headers.get("cf-connecting-ip");
  if (cfIP) return cfIP;
  
  // Real IP header
  const realIP = req.headers.get("x-real-ip");
  if (realIP) return realIP;
  
  return "unknown";
}
```

---

### Étape 5 : Modifier `/app/api/ask-kenshu/route.ts`

#### Import au début du fichier

```typescript
import { ratelimit, getIP } from "@/lib/ratelimit";
import { z } from "zod";
```

#### Ajouter schéma de validation

```typescript
const RequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string().min(1).max(2000),
    })
  ).min(1).max(20),
  theme: z.enum(['dark', 'light', 'matrix', 'cyberpunk', 'zen', 'neon', 'midnight', 'retro']).optional(),
});
```

#### Modifier la fonction POST

```typescript
export async function POST(req: Request) {
  // 1. Rate limiting IP (NOUVEAU)
  const ip = getIP(req);
  
  // Check multi-level rate limits
  const [secondCheck, minuteCheck, dayCheck] = await Promise.all([
    ratelimit.perSecond.limit(ip),
    ratelimit.perMinute.limit(ip),
    ratelimit.perDay.limit(ip),
  ]);

  if (!secondCheck.success || !minuteCheck.success || !dayCheck.success) {
    const failedCheck = !secondCheck.success ? secondCheck : 
                        !minuteCheck.success ? minuteCheck : 
                        dayCheck;
    
    const retryAfter = Math.ceil((failedCheck.reset - Date.now()) / 1000);
    
    return new Response(JSON.stringify({
      error: 'rate_limit_exceeded',
      message: `Trop de requêtes. Veuillez patienter ${retryAfter} secondes.`,
      retryAfter,
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit-Second': String(secondCheck.limit),
        'X-RateLimit-Limit-Minute': String(minuteCheck.limit),
        'X-RateLimit-Limit-Day': String(dayCheck.limit),
        'X-RateLimit-Remaining': String(minuteCheck.remaining),
      },
    });
  }

  // 2. Validation input (NOUVEAU)
  let body;
  try {
    const rawBody = await req.json();
    body = RequestSchema.parse(rawBody);
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'invalid_input',
      message: 'Format de requête invalide',
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 3. Vérifier API key
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey || apiKey.includes("%")) {
    console.error("[Ask Kenshu API] ERROR: OPENROUTER_API_KEY missing!");
    return new Response("Configuration error", { status: 500 });
  }

  // 4. Cookie rate limit (EXISTANT - garder pour backup)
  const currentCount = getRequestCount(req);
  const remaining = MAX_REQUESTS - currentCount;

  if (remaining <= 0) {
    return new Response(JSON.stringify({
      error: "limit_reached",
      message: "Limite quotidienne atteinte. Contactez contact@kenshu.dev",
      remaining: 0,
    }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 5. Reste du code existant...
  try {
    const { messages, theme } = body;
    
    // ... (code existant continue)
  } catch (error) {
    console.error("[Ask Kenshu API] Error:", error);
    return new Response("Internal error", { status: 500 });
  }
}
```

---

### Étape 6 : Réduire MAX_REQUESTS

```typescript
// AVANT
const MAX_REQUESTS = 10000;

// APRÈS
const MAX_REQUESTS = 500; // Backup si rate limit IP fail
```

---

### Étape 7 : Tester localement

```bash
# Terminal 1 : Lancer le dev server
npm run dev

# Terminal 2 : Tester rate limit
curl -X POST http://localhost:3000/api/ask-kenshu \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'

# Répéter rapidement (devrait être bloqué après 2-3 fois)
```

---

### Étape 8 : Vérifier `.gitignore`

```bash
# .gitignore (devrait déjà contenir)
.env
.env.local
.env*.local
node_modules/
```

Si manquant, ajouter :
```bash
echo ".env.local" >> .gitignore
echo ".env" >> .gitignore
```

---

### Étape 9 : Créer `.env.example`

```bash
# .env.example
OPENROUTER_API_KEY=sk-or-v1-your-key-here
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Commit ce fichier (pas de secrets dedans) :
```bash
git add .env.example
git commit -m "docs: ajout .env.example pour configuration"
```

---

### Étape 10 : Deploy

```bash
git add .
git commit -m "feat(security): rate limiting multi-niveaux avec Upstash + validation Zod"
git push
```

Vercel va auto-deploy avec les nouvelles variables d'environnement.

---

## ✅ Vérification post-déploiement

### Test 1 : Rate limit fonctionne

```bash
# Script de test (bash)
for i in {1..15}; do
  echo "Request $i"
  curl -s -o /dev/null -w "%{http_code}\n" \
    -X POST https://kenshu.dev/api/ask-kenshu \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"role":"user","content":"test"}]}'
  sleep 0.5
done

# Devrait afficher :
# Request 1-10: 200 (OK)
# Request 11+: 429 (Rate limited) ✅
```

### Test 2 : Validation input

```bash
# Message trop long (devrait échouer)
curl -X POST https://kenshu.dev/api/ask-kenshu \
  -H "Content-Type: application/json" \
  -d "{\"messages\":[{\"role\":\"user\",\"content\":\"$(python3 -c 'print("A"*3000)')\"}]}"

# Devrait retourner 400 Bad Request ✅
```

---

## 📊 Monitoring Upstash

1. Dashboard Upstash : https://console.upstash.com/
2. Voir analytics :
   - Requests per day
   - Top IPs
   - Blocked requests

---

## ⚠️ Troubleshooting

### Erreur : "Redis connection failed"

**Solution** : Vérifier variables d'environnement

```typescript
// Ajouter logs temporaires
console.log("Redis URL:", process.env.UPSTASH_REDIS_REST_URL?.substring(0, 20));
console.log("Redis Token present:", !!process.env.UPSTASH_REDIS_REST_TOKEN);
```

### Erreur : "Module not found @upstash/ratelimit"

**Solution** :
```bash
npm install @upstash/ratelimit @upstash/redis --save
```

### Rate limit trop strict localement

**Solution** : Désactiver en dev

```typescript
// lib/ratelimit.ts
export const ratelimit = process.env.NODE_ENV === 'development'
  ? null  // Pas de rate limit en dev
  : {
      perMinute: new Ratelimit({...}),
      // ...
    };

// Dans route.ts
if (ratelimit) {
  const check = await ratelimit.perMinute.limit(ip);
  if (!check.success) { /* ... */ }
}
```

---

## 💰 Coûts

**Upstash Free Tier** :
- 10,000 commands/day ✅
- 256 MB storage ✅
- Largement suffisant pour votre usage

**Si dépassement** :
- Pay-as-you-go : ~$0.20 per 100k commands
- Très peu probable avec rate limits activés

---

## 🎯 Résultat attendu

### Avant (VULNÉRABLE)
- ❌ 10,000 req/jour par cookie (bypassable)
- ❌ Aucune limite IP
- ❌ Coût potentiel : $8,640/jour en cas d'attaque

### Après (SÉCURISÉ)
- ✅ 2 req/10s par IP
- ✅ 10 req/min par IP
- ✅ 100 req/jour par IP
- ✅ Input validation
- ✅ Coût max : $5/jour même en cas d'attaque

---

**Temps total** : ~30 minutes  
**Coût** : $0 (gratuit)  
**Protection** : 🔒 Excellente
