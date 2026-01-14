import { caseStudies } from "@/data/projects";

function buildNavigationContext(): string {
    const projectsList = caseStudies
        .slice(0, 5)
        .map((p) => `- ${p.title} (${p.context.client}): ${p.tldr}`)
        .join("\n");

    return `
# Contexte du site kenshu.dev

## Pages disponibles
- /projets - Liste complète des projets et réalisations
- /services - Détail des services proposés (Data Engineering, DevOps, Web, Automatisation)
- /contact - Formulaire de contact et prise de rendez-vous
- /agent - Version complète de l'assistant IA avec plus de fonctionnalités
- /methode - Méthodologie de travail

## Profil de Raouf Warnier
Ingénieur Produit Data avec 3+ ans d'expérience.
Conçoit des systèmes data end-to-end : pipelines, plateformes et applications SaaS.
Diplômé ESIEE Paris en Data Science et Intelligence Artificielle.
Disponible en freelance pour missions data et produit.

## Services proposés

### Pour les PME / Indépendants / Porteurs de projet
- **Sites web** : Vitrines, landing pages, SEO, performance
- **Applications** : MVP, outils internes, produits digitaux
- **Automatisation n8n** : Process, CRM, emails, reporting, intégrations
- Projets sur-mesure à partir de 2 000€

### Pour les Entreprises / Grands Groupes
- **Data Engineering** : Pipelines ETL/ELT, Spark, Airflow, migration legacy
- **DevOps** : CI/CD, monitoring, automatisation déploiements
- **Plateformes Data** : Data Warehouse, Data Lake, analytics
- **AI Compliance** : Audit AI Act, RGPD, classification des risques
- TJM 500€ pour missions longues

## Projets récents
${projectsList}

## Contact
- Email: contact@kenshu.dev

`;
}

const SYSTEM_PROMPT = `Tu es "Ask Kenshu", l'assistant de navigation intelligent du site kenshu.dev.

${buildNavigationContext()}

# Instructions Prioritaires

## 1. Style & Structure (CRITIQUE)
- **AÈRE TES RÉPONSES** : C'est VITAL. Saute une ligne vide entre CHAQUE petit paragraphe ou liste. Fais comme un message de chat moderne.
- **EMOJIS** : Utilises-en pour rendre le texte chaleureux et visuel 🚀✨.
- **STRUCTURE** : Utilise systématiquement des puces (- ) ou du gras (**gras**).
- **LIENS CLIQUABLES** : Quand tu cites une page, utilise le format Markdown : [Texte du lien](/url). Ex: [Voir mes projets](/projets). Ne mets JAMAIS l'URL brute.

## 2. Comportement
Tu aides les visiteurs à trouver la bonne page. Tu es friendly, pro et enthousiaste.

## 3. Adaptabilité
- **PME / Indépendant** : Vulgarise. Parle "bénéfice business".
- **Grand Groupe** : Parle "scalabilité", "compliance".

## 4. Format de réponse attendu (Exemple)
"Bonjour ! Ravi de vous voir ! 👋

Pour ce type de besoin, je peux intervenir sur deux axes :

- **Consulting** 🧠 : Analyse de votre existant
- **Réalisation** 🛠️ : Développement sur mesure

Je vous conseille de regarder mes projets similaires :
👉 [Voir les projets](/projets)

On peut aussi en discuter de vive voix ?"

## Actions suggérées
Termine toujours par une ouverture vers une page clé avec un LIEN FORMATÉ :
- "👉 [Voir les projets](/projets)"
- "👉 [Découvrir les services](/services)"
- "👉 [Me contacter](/contact)"

## À éviter
- Les blocs de texte pavés sans saut de ligne.
- Les prix (on ne parle pas de tarifs ici).
`;

const MAX_REQUESTS = 10;
const COOKIE_NAME = "chat_requests";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

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

    console.log("[Ask Kenshu API] Request received, API key present:", !!apiKey);

    // Rate limiting check
    const currentCount = getRequestCount(req);
    const remaining = MAX_REQUESTS - currentCount;

    console.log(`[Ask Kenshu API] Request count: ${currentCount}/${MAX_REQUESTS}`);

    if (remaining <= 0) {
        return new Response(
            JSON.stringify({
                error: "limit_reached",
                message: "Vous avez atteint la limite de messages gratuits. Contactez-moi directement : contact@kenshu.dev",
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
        console.error("[Ask Kenshu API] ERROR: OPENROUTER_API_KEY is missing or invalid!");
        return new Response("Erreur de configuration : clé API manquante. Contactez Raouf directement.", {
            status: 500,
        });
    }

    try {
        const { messages } = await req.json();

        console.log("[Ask Kenshu API] Calling OpenRouter...");

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
                "HTTP-Referer": "https://kenshu.dev",
                "X-Title": "Ask Kenshu - Portfolio Navigation",
            },
            body: JSON.stringify({
                model: "anthropic/claude-3.5-sonnet",
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
            console.error("[Ask Kenshu API] OpenRouter error:", response.status, errorText);
            return new Response("Erreur temporaire. Contactez-moi directement : contact@kenshu.dev", { status: 500 });
        }

        console.log("[Ask Kenshu API] Stream started successfully");

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

                // Log interaction (non-blocking)
                try {
                    const { logInteraction } = await import("@/lib/db-utils");
                    await logInteraction(
                        messages[messages.length - 1]?.content || "",
                        fullResponse
                    );
                } catch (e) {
                    console.warn("[Ask Kenshu API] Log error (ignored):", e);
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

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("[Ask Kenshu API] ERROR:", errorMessage);
        return new Response("Erreur technique. Contactez-moi : contact@kenshu.dev", {
            status: 500,
        });
    }
}
