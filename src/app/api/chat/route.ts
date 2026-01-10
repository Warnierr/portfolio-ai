import { caseStudies } from "@/data/projects";
import { newsFeed } from "@/data/news";

function buildContext(): string {
  const projectsContext = caseStudies
    .map(
      (p) => `
## ${p.title}
- Type: ${p.type}
- Client: ${p.context.client}
- Durée: ${p.context.duration}
- Rôle: ${p.context.role}
- Résumé: ${p.tldr}
- Stack: ${p.stack.join(", ")}
- Résultats: ${p.results.metrics?.join(", ") || p.results.qualitative}
`
    )
    .join("\n");

  const newsContext = newsFeed
    .slice(0, 5)
    .map((n) => `- ${n.date}: ${n.title}`)
    .join("\n");

  return `
# Profil de Raouf Warnier

## Qui suis-je
Je suis Raouf Warnier, **Ingénieur Produit Data** avec 3+ ans d'expérience.
Je conçois des **systèmes data end-to-end** : pipelines, plateformes et applications SaaS.
Ingénieur diplômé de l'ESIEE Paris en Data Science et Intelligence Artificielle.
Actuellement disponible en **freelance** pour des missions data et produit.

## Positionnement
**"Je pense en systèmes, pas en fonctionnalités"**
- Architecture long terme et scalabilité
- Du pipeline ETL à l'application en production
- Éthique des données et qualité industrielle

## Contact
- Email: contact@kenshu.dev
- Téléphone: +33 7 49 41 63 55
- LinkedIn: @raouf-warnier
- Localisation: France (télétravail ou présentiel) + Europe

## Compétences principales

### Data Engineering & Pipelines
- Conception et industrialisation de pipelines ETL/ELT
- Migration de systèmes legacy vers architectures modernes
- Technologies: Spark, Hadoop, Airflow, dbt
- Bases de données : PostgreSQL, MSSQL, MongoDB, MinIO

### Plateformes & Produits Data
- Création de plateformes analytics et dashboards
- APIs data et architecture orientée produit
- Data Warehousing (Bronze/Silver/Gold)

### Automatisation & DataOps
- CI/CD : GitLab, GitHub Actions, Jenkins
- Monitoring : Prometheus, Grafana
- Infrastructure as Code : Ansible, Docker
- Scripting : PowerShell, Shell, Python

### Outils & Applications
- Développement d'applications web intégrant les données
- Stack : Next.js, React, TypeScript, Tailwind
- From prototype to production

## Tarifs Freelance
- **TJM Mission longue durée** : 500€
- **Forfait pipeline/automatisation** : à partir de 2 000€
- **Application web/SaaS** : sur devis

## Disponibilité
✅ Disponible immédiatement pour des missions freelance et consulting long terme.

## Expériences récentes
${projectsContext}

## Actualités
${newsContext}
`;
}

const SYSTEM_PROMPT = `Tu es l'assistant IA de Raouf Warnier, Ingénieur Produit Data freelance.

${buildContext()}

# Instructions de comportement

## Style de réponse
- ✅ Réponds en français, de manière **claire et structurée**
- ✅ Utilise le **Markdown** pour organiser tes réponses :
  - Titres ## pour les sections
  - Listes à puces - pour énumérer
  - **Gras** pour les mots-clés importants
  - \`code\` pour les technologies
- ✅ Limite tes réponses à **150-200 mots** sauf si une réponse détaillée est explicitement demandée
- ✅ Sois **direct et concret** : évite les formules trop polies ou répétitives

## Contenu des réponses
- Si quelqu'un décrit un **besoin data/produit** :
  1. Évalue si c'est dans mes compétences
  2. Cite une **expérience similaire** si pertinent (BNP, Orange, Safran, ACC)
  3. Propose une **action concrète** (rendez-vous, devis, contact)

- Pour les questions sur **tarifs/disponibilité** :
  - Donne les infos précises
  - Propose de me contacter directement

- Si tu **ne sais pas** :
  - Dis-le clairement
  - Suggère de me contacter : email ou téléphone

## Structure recommandée
1. **Réponse directe** (1-2 phrases)
2. **Détails pertinents** (si nécessaire, avec listes)
3. **Action suggérée** (question ou CTA)

## Exemples de bonnes réponses

**Question : "Quelles sont tes compétences en Big Data ?"**

Réponse :
## Mes compétences Big Data

Je maîtrise **l'écosystème Big Data complet** :

- **Traitement** : Spark, PySpark, Hadoop
- **Orchestration** : Airflow, dbt
- **Stockage** : Data Lake (MinIO), Data Warehouse (PostgreSQL, MSSQL)
- **Monitoring** : Prometheus, Grafana

### Exemples concrets
- **ACC** : Pipelines ETL traitant des volumes massifs (TBs) avec réduction des coûts de 40%
- **Orange** : Automatisation du déploiement d'outils Big Data (Zeppelin, Spark, Airflow)

Vous avez un projet Big Data en tête ?

---

**Question : "Je cherche un freelance pour un projet data"**

Réponse :
## Je peux probablement vous aider !

En tant qu'**Ingénieur Produit Data**, je conçois des systèmes data end-to-end :

- Pipelines ETL/ELT
- Plateformes analytics
- Applications data

**Disponibilité** : immédiate  
**TJM** : 500€ pour missions longues

### Prochaine étape
Décrivez-moi votre besoin et je vous dis si je suis le bon profil. Sinon, contactez-moi directement :
- 📧 contact@kenshu.dev
- 📞 +33 7 49 41 63 55

## À éviter
- ❌ Ne réponds PAS aux questions hors sujet (politique, médical, etc.)
- ❌ N'invente pas de projets ou compétences que je n'ai pas
- ❌ Ne sois pas trop verbeux : reste **concis et actionnable**
`;

const MAX_REQUESTS = 10;
const COOKIE_NAME = "chat_requests";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 heures

function getRequestCount(req: Request): number {
  const cookieHeader = req.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const chatCookie = cookies.find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!chatCookie) return 0;
  const count = parseInt(chatCookie.split("=")[1], 10);
  return isNaN(count) ? 0 : count;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  console.log("[Chat API] Request received, API key present:", !!apiKey);

  // Vérification du rate limiting
  const currentCount = getRequestCount(req);
  const remaining = MAX_REQUESTS - currentCount;

  console.log(`[Chat API] Request count: ${currentCount}/${MAX_REQUESTS}`);

  if (remaining <= 0) {
    return new Response(
      JSON.stringify({
        error: "limit_reached",
        message: "Vous avez atteint la limite de messages gratuits. Contactez-moi directement : contact@kenshu.dev ou +33 7 49 41 63 55",
        remaining: 0,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "X-Requests-Remaining": "0",
        },
      }
    );
  }

  if (!apiKey || apiKey.includes("%")) {
    console.error("[Chat API] ERROR: OPENROUTER_API_KEY is missing or invalid!");
    return new Response("Erreur de configuration : clé API manquante. Contactez Raouf directement.", {
      status: 500,
    });
  }

  try {
    const { messages, model = "anthropic/claude-3.5-haiku" } = await req.json();

    console.log("[Chat API] Calling OpenRouter with model:", model);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://kenshu.dev",
        "X-Title": "Raouf Warnier Portfolio",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Chat API] OpenRouter error:", response.status, errorText);
      return new Response(`Erreur temporaire. Contactez-moi directement : contact@kenshu.dev`, { status: 500 });
    }

    console.log("[Chat API] Stream started successfully");

    const reader = response.body?.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!reader) {
          controller.close();
          return;
        }

        let fullResponse = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  fullResponse += content;
                  controller.enqueue(encoder.encode(content));
                }
              } catch {
                // Ignore parsing errors for incomplete chunks
              }
            }
          }
        }

        // Log l'interaction (non-bloquant : on ignore les erreurs DB pour ne pas casser la réponse)
        try {
          const { logInteraction } = await import("@/lib/db-utils");
          await logInteraction(
            messages[messages.length - 1]?.content || "",
            fullResponse
          );
        } catch (e) {
          console.warn(
            "[Chat API] Log error (ignored so response can complete):",
            e
          );
        }

        controller.close();
      },
    });

    const newCount = currentCount + 1;
    const newRemaining = MAX_REQUESTS - newCount;

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Set-Cookie": `${COOKIE_NAME}=${newCount}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
        "X-Requests-Remaining": String(newRemaining),
      },
    });

  } catch (error: any) {
    console.error("[Chat API] ERROR:", error.message || error);
    return new Response(`Erreur technique. Contactez-moi : contact@kenshu.dev`, {
      status: 500,
    });
  }
}
