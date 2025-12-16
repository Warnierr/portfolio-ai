# Ask Kenshu — Agent IA Roadmap

## Vision

Agent conversationnel qui aide les visiteurs à :
1. Comprendre mes compétences et projets
2. Évaluer si leur projet est réalisable
3. Obtenir des infos (tarifs, dispo, process)
4. Pré-qualifier leur besoin avant contact

---

## V1 — Contexte statique (actuel)

**Status**: ✅ Implémenté

**Architecture**:
```
User → /api/chat → OpenRouter (Claude) → Response
           ↓
    Contexte injecté dans le prompt
    (projects.ts + news.ts + infos statiques)
```

**Stack**:
- Vercel AI SDK (`ai`, `@ai-sdk/openai`)
- OpenRouter (Claude 3.5 Haiku)
- Streaming SSE

**Limites**:
- Contexte limité au prompt (~5000 tokens)
- Pas de mémoire entre sessions
- Pas de recherche sémantique

**Coût estimé**: ~$5/mois (usage modéré)

---

## V2 — RAG léger

**Status**: 🔜 Planifié

**Améliorations**:
- Embeddings pré-générés au build time
- Recherche vectorielle pour trouver le contenu pertinent
- Contexte dynamique basé sur la question

**Architecture**:
```
User → /api/chat → Embedding question
                        ↓
               Recherche vectorielle
               (Upstash Vector ou pgvector)
                        ↓
               Top 5 chunks pertinents
                        ↓
               LLM avec contexte ciblé
```

**Stack additionnelle**:
- Upstash Vector (gratuit, serverless) OU
- Supabase pgvector (gratuit tier)
- Script d'ingestion au build

**Avantages**:
- Supporte plus de contenu (100+ articles)
- Réponses plus précises
- Coût LLM réduit (moins de tokens)

**Coût estimé**: ~$10/mois

---

## V3 — Agent autonome

**Status**: 🔮 Futur

**Améliorations**:
- Mémoire conversationnelle (Redis/Upstash)
- Actions automatiques (envoyer email, créer event Calendly)
- Multi-sources (Notion, GitHub, LinkedIn)
- Analytics (questions fréquentes, taux de conversion)

**Architecture**:
```
User → /api/chat → Agent avec tools
                        ↓
           ┌────────────┴────────────┐
           ↓            ↓            ↓
      RAG Search   Send Email   Book Call
           ↓            ↓            ↓
           └────────────┬────────────┘
                        ↓
                   Response
```

**Stack additionnelle**:
- LangChain ou Vercel AI SDK tools
- Upstash Redis (mémoire)
- Resend (emails)
- Calendly API

**Fonctionnalités**:
- "Envoie-moi un récap par email"
- "Réserve un créneau pour la semaine prochaine"
- "Quels projets similaires à [X] as-tu fait ?"

**Coût estimé**: ~$20-30/mois

---

## Configuration requise

### Variables d'environnement

```bash
# .env.local
OPENROUTER_API_KEY=sk-or-v1-xxxxx
```

### Obtenir une clé OpenRouter

1. Créer un compte sur https://openrouter.ai
2. Aller dans Settings → Keys
3. Créer une nouvelle clé
4. Ajouter du crédit ($5 minimum)

---

## Alternatives à OpenRouter

| Provider | Modèle | Coût/1M tokens | Notes |
|----------|--------|----------------|-------|
| OpenRouter | Claude 3.5 Haiku | $0.25 | Multi-modèles, simple |
| OpenAI | GPT-4o-mini | $0.15 | Rapide, bon marché |
| Anthropic | Claude 3.5 Sonnet | $3.00 | Meilleure qualité |
| Groq | Llama 3.1 70B | $0.59 | Très rapide |

Pour changer de provider, modifier `src/app/api/chat/route.ts`:

```typescript
// OpenAI direct
import { openai } from "@ai-sdk/openai";
const model = openai("gpt-4o-mini");

// Anthropic direct
import { anthropic } from "@ai-sdk/anthropic";
const model = anthropic("claude-3-5-sonnet-20241022");
```

---

## Métriques à suivre (V3)

- Nombre de conversations/jour
- Questions les plus fréquentes
- Taux de conversion (chat → contact)
- Temps de réponse moyen
- Coût par conversation

---

## Ressources

- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenRouter](https://openrouter.ai/docs)
- [Upstash Vector](https://upstash.com/docs/vector)
- [Supabase pgvector](https://supabase.com/docs/guides/ai)
