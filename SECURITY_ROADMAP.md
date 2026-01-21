# 🚀 Roadmap Sécurité - Scaling IA

**Status** : Implémentation Progressive  
**Objectif** : Sécurité robuste avant scaling public

---

## ✅ Phase 1 : SÉCURITÉ DE BASE (FAIT - Sans intervention)

### Implémenté automatiquement

- [x] **Rate limiting IP** (in-memory) : 10 req/min par IP
- [x] **Validation input** (Zod) : Max 2000 caractères, max 20 messages
- [x] **Prompt injection detection** : Patterns suspects bloqués
- [x] **Sanitization** : Nettoyage caractères dangereux
- [x] **MAX_REQUESTS réduit** : 10000 → 500
- [x] **Logs sécurisés** : Pas de données sensibles
- [x] **`.env.example`** créé

### Protection actuelle

**Contre spam/brute force** :
- ✅ 10 requêtes/minute max par IP
- ✅ 500 requêtes/jour max par cookie (backup)
- ✅ Détection automatique prompt injection

**Coût max par jour** : ~$50 (vs $8,640 avant)

**Note** : Système in-memory = reset au redémarrage de Vercel (restart tous les X jours).
Pour production robuste → Upstash (Phase 2).

---

## 🟡 Phase 2 : SÉCURITÉ PRODUCTION (30 min - Quand vous scalerez)

### À faire quand trafic augmente (>100 users/jour)

#### 1. Rate Limiting persistant (Upstash Redis)

**Pourquoi** : In-memory se reset au redéploiement Vercel

**Comment** :
```bash
# 1. Créer compte gratuit : https://upstash.com/
# 2. Créer Redis database (tier gratuit)
# 3. Copier credentials
# 4. Ajouter à Vercel env vars :
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# 5. Installer
npm install @upstash/ratelimit @upstash/redis

# 6. Code déjà documenté dans SECURITY_IMPLEMENTATION.md
```

**Temps** : 15 minutes  
**Coût** : Gratuit (10k requêtes/jour)

---

#### 2. CORS strict

**Pourquoi** : Empêcher sites externes d'appeler votre API

**Comment** :
```typescript
// Créer src/middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const origin = request.headers.get('origin');
  
  const allowedOrigins = [
    'https://kenshu.dev',
    'https://www.kenshu.dev',
  ];
  
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  return response;
}
```

**Temps** : 10 minutes  
**Coût** : Gratuit

---

#### 3. Monitoring & Alertes

**Pourquoi** : Détecter abus rapidement

**Option  A - Vercel Analytics** (Recommandé)
```bash
npm install @vercel/analytics
# Auto-intégration dashboard Vercel
```

**Option B - Sentry** (Plus complet)
```bash
npm install @sentry/nextjs
# Dashboard erreurs + performance
```

**Temps** : 15 minutes  
**Coût** : Gratuit (tier gratuit)

---

## 🟢 Phase 3 : SÉCURITÉ AVANCÉE (2-4h - Optionnel)

### Quand l'app est publique et visible

#### 4. Alertes Email

**Trigger** : >1000 req/heure ou tentatives d'injection

**Service** : Resend (gratuit 100 emails/jour)

```typescript
if (requestsThisHour > 1000) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: 'security@kenshu.dev',
      to: 'contact@kenshu.dev',
      subject: '🚨 High API usage',
      html: `<p>${requestsThisHour} requests this hour</p>`
    })
  });
}
```

---

#### 5. Honeypot anti-bots

**Champ invisible** qui piège les bots

```typescript
// Client
<input name="website" style={{display:'none'}} />

// Server
if (body.website) {
  // = Bot détecté
  return fakeSuccess();
}
```

---

#### 6. Dashboard Usage

**Interface** pour voir :
- Requêtes par heure/jour
- IPs suspicieuses
- Coûts API en temps réel

**Stack** : React + TanStack Query + Upstash Analytics

---

#### 7. Authentification utilisateurs (optionnelle)

**Pour power users** : Login → Plus de requêtes

**Stack** : NextAuth.js + Provider Google/GitHub

---

## 📊 Métriques à surveiller

### Quand vous serez visible

**Dashboard Google Analytics** :
- Sessions/jour
- Bounce rate
- Pages/session

**Logs Vercel** :
- Erreurs 429 (rate limit)
- Erreurs 400 (validation failed)
- Alertes prompt injection

**OpenRouter Dashboard** :
- Coûts par jour
- Requêtes par modèle
- Tokens utilisés

---

## 🎯 Déclencheurs pour passer à la phase suivante

### Phase 1 → Phase 2 (Upstash)

**Quand** :
- ✅ >100 vrais utilisateurs/jour
- ✅ >10 conversations/jour
- ✅ Site référencé Google

**Temps** : 30 min  
**Coût** : $0

---

### Phase 2 → Phase 3 (Advanced)

**Quand** :
- ✅ >500 utilisateurs/jour
- ✅ Coûts API >$5/jour
- ✅ Tentatives d'abus détectées

**Temps** : 2-4h  
**Coût** : $0-10/mois

---

## ⚡ Quick Commands

### Vérifier logs sécurité (Vercel)

```bash
vercel logs --follow
# Chercher : [SECURITY]
```

### Scanner usage API OpenRouter

```bash
# Dashboard : https://openrouter.ai/activity
```

### Tester rate limit

```bash
# 15 requêtes rapides (devrait bloquer après 10)
for i in {1..15}; do
  curl -X POST https://kenshu.dev/api/ask-kenshu \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"role":"user","content":"test"}]}'
  sleep 0.5
done
```

---

## 📋 Checklist Pre-Scaling

Avant de promouvoir votre site publiquement :

### Must-have ✅
- [x] Rate limiting activé
- [x] Input validation
- [x] Prompt injection detection
- [ ] **Upstash Redis** (30 min)
- [ ] **CORS configuré** (10 min)
- [ ] **OG image créée** (30 min - voir GUIDE_OG_IMAGE.md)

### Nice-to-have 🟡
- [ ] Monitoring (Vercel Analytics ou Sentry)
- [ ] Alertes email
- [ ] Dashboard usage
- [ ] Google Search Console configuré

### Advanced 🟢  
- [ ] Honeypot
- [ ] Auth users premium
- [ ] A/B testing prompts IA
- [ ] Multi-language support

---

## 💰 Budget Scaling

### Gratuit (0-1000 users/jour)
- Vercel : Tier gratuit
- Upstash : 10k req/jour gratuit
- Sentry : 5k events/mois gratuit
- Resend : 100 emails/jour gratuit

**Total** : $0/mois ✅

### Payant (1000-10000 users/jour)
- Vercel Pro : $20/mois
- Upstash : ~$5-10/mois
- Sentry : ~$26/mois
- OpenRouter : $50-200/mois (selon usage)

**Total** : ~$100-250/mois

---

## 🎓 Ressources

**Docs officielles** :
- Upstash Rate Limiting : https://upstash.com/docs/oss/sdks/ts/ratelimit/overview
- Vercel Security : https://vercel.com/docs/security
- Zod Validation : https://zod.dev/
- Sentry Next.js : https://docs.sentry.io/platforms/javascript/guides/nextjs/

**Votre documentation** :
- `SECURITY_AUDIT.md` : Analyse technique complète
- `SECURITY_IMPLEMENTATION.md` : Guide étape par étape
- `SECURITY_SUMMARY.md` : Vue d'ensemble

---

## ✅ Status Actuel

**Protection** : 🟢 Bonne (Phase 1 complète)  
**Prêt pour** : Soft launch (petite audience)  
**Avant scaling public** : Implémenter Phase 2  

**Dernière mise à jour** : 2026-01-21

---

**TL;DR** : Vous êtes protégé pour un soft launch. Avant de scaler massivement, passez 30 minutes sur Phase 2 (Upstash + CORS).
