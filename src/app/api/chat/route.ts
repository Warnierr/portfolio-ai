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
Je suis Raouf Warnier, Data Engineer & DevOps avec 3+ ans d'expérience.
Ingénieur diplômé de l'ESIEE Paris en Data Science et Intelligence Artificielle.
Actuellement en transition vers le freelance pour offrir mes services aux entreprises.

## Contact
- Email: rww.warnier@gmail.com
- Téléphone: +33 7 49 41 63 55
- LinkedIn: @raouf-warnier
- Localisation: Paris (télétravail ou présentiel)

## Compétences principales
### Data Engineering
- Pipelines ETL/ELT (Spark, Hadoop, Airflow)
- Data Warehousing et Data Lake
- Architecture de données (Bronze/Silver/Gold)
- Bases de données : PostgreSQL, MSSQL, MongoDB, MinIO

### DevOps & Infrastructure
- Automatisation : Ansible, PowerShell, Shell
- CI/CD : GitLab, GitHub Actions
- Monitoring : Prometheus, Grafana
- Cloud : AWS, GCP, Azure
- Conteneurisation : Docker

### Big Data & Analytics
- Spark, PySpark, Hadoop
- Databricks, Snowflake
- Zeppelin, Jupyter
- Power BI

### Langages
- Python, SQL, PL/SQL, JavaScript
- R, Java, YAML

## Tarifs Freelance
- Mission longue durée (TJM) : 450€
- Forfait pipeline data/automatisation : à partir de 2 000€
- Développement d'application : sur devis

## Disponibilité
Disponible immédiatement pour des missions freelance.

## Expériences récentes
${projectsContext}

## Actualités
${newsContext}
`;
}

const SYSTEM_PROMPT = `Tu es l'assistant IA de Raouf Warnier, Data Engineer & DevOps freelance.

${buildContext()}

# Instructions de comportement
- Réponds en français, de manière concise et professionnelle
- Ne dépasse pas 150 mots sauf si vraiment nécessaire
- Si quelqu'un décrit un besoin data/DevOps, évalue si c'est dans mes compétences et suggère un projet similaire si pertinent
- Pour les questions sur les tarifs ou la disponibilité, donne les infos et propose de prendre contact
- Si tu ne sais pas, dis-le et suggère de contacter directement par email ou téléphone
- Termine par une question ou une suggestion d'action quand c'est pertinent
- Ne réponds PAS aux questions hors sujet (politique, médical, etc.)
- Mets en avant mon expérience chez Orange, Safran et ACC si pertinent
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
        message: "Vous avez atteint la limite de messages gratuits. Contactez-moi directement : rww.warnier@gmail.com ou +33 7 49 41 63 55",
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
    const { messages } = await req.json();

    console.log("[Chat API] Calling OpenRouter...");

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://raouf-warnier.dev",
        "X-Title": "Raouf Warnier Portfolio",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-haiku",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[Chat API] OpenRouter error:", response.status, errorText);
      return new Response(`Erreur temporaire. Contactez-moi directement : rww.warnier@gmail.com`, { status: 500 });
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

        // Log l'interaction
        try {
          const { logInteraction } = await import("@/lib/db-utils");
          await logInteraction(
            messages[messages.length - 1]?.content || "",
            fullResponse
          );
        } catch (e) {
          console.error("[Chat API] Log error:", e);
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
    return new Response(`Erreur technique. Contactez-moi : rww.warnier@gmail.com`, {
      status: 500,
    });
  }
}
