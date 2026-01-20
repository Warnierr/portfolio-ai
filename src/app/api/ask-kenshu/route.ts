import { caseStudies } from "@/data/projects";
import { AI_CONFIG } from "@/lib/ai-config";
import { KENSHU_FULL_CONTEXT } from "@/lib/ai-prompts/kenshu-context";
import { AI_BEHAVIOR_INSTRUCTIONS, THEME_PERSONAS } from "@/lib/ai-prompts/kenshu-instructions";

function generateWelcomeMessage(): string {
    return `Bonjour ! 👋 Je suis **Kenshu IA**, l'assistant intelligent de Raouf Warnier.

Pour mieux vous guider vers les bons projets et services, j'aimerais savoir qui vous êtes 😊

N'hésitez pas à me poser vos questions ! Je suis là pour vous orienter 🎯`;
}

function buildNavigationContext(): string {
    const projectsList = caseStudies
        .slice(0, 5)
        .map((p) => `- ${p.title} (${p.context.client}): ${p.tldr}`)
        .join("\n");

    return `
# Contexte du site kenshu.dev

## Pages disponibles (Navigation principale)
- /services - Page Services : Détail de tous les services proposés (Data Engineering, DevOps, Web, Automatisation)
- /projets - Page Expériences : Liste des expériences professionnelles (BNP Paribas, Orange, Safran, ACC) avec contexte IA
- /contact - Page Contact : Formulaire de contact et prise de rendez-vous

## Projets récents (extraits)
${projectsList}

## Contact
- Email: contact@kenshu.dev
- Localisation : Paris / Remote
`;
}

const SYSTEM_PROMPT = `Tu es "Ask Kenshu", l'assistant de navigation intelligent du site kenshu.dev.

${buildNavigationContext()}

${KENSHU_FULL_CONTEXT}

${AI_BEHAVIOR_INSTRUCTIONS}
`;


const MAX_REQUESTS = 10000;
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
        const body = await req.json();
        const { messages, theme } = body;

        // Dynamic Persona based on Theme 🤖
        let systemInstruction = SYSTEM_PROMPT;
        if (theme === 'matrix') {
            systemInstruction += THEME_PERSONAS.matrix;
        } else if (theme === 'cyberpunk') {
            systemInstruction += THEME_PERSONAS.cyberpunk;
        } else if (theme === 'retro') {
            systemInstruction += THEME_PERSONAS.retro;
        } else if (theme === 'zen') {
            systemInstruction += THEME_PERSONAS.zen;
        }

        console.log("[Ask Kenshu API] Request body length:", JSON.stringify(body).length);
        console.log("[Ask Kenshu API] Messages count:", messages?.length || 0);

        // Check if this is the first message (empty conversation)
        const isFirstInteraction = !messages || messages.length === 0;

        if (isFirstInteraction) {
            console.log("[Ask Kenshu API] First interaction detected - sending welcome message");
            const welcomeMessage = generateWelcomeMessage();
            const newCount = currentCount + 1;
            const newRemaining = MAX_REQUESTS - newCount;

            return new Response(welcomeMessage, {
                headers: {
                    "Content-Type": "text/plain; charset=utf-8",
                    "Set-Cookie": `${COOKIE_NAME}=${newCount}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`,
                    "X-Requests-Remaining": String(newRemaining),
                },
            });
        }

        // --- MULTI-MODEL FAILOVER SYSTEM ---
        // Tries all configured models in priority order: Primary → Backups → Static Fallback
        const modelsToTry = AI_CONFIG.allModels;

        let response;
        let usedModel = "";
        let lastError = "";

        console.log(`[Ask Kenshu API] Starting failover chain with ${modelsToTry.length} models`);

        for (const model of modelsToTry) {
            try {
                console.log(`[Ask Kenshu API] Attempting model: ${model}`);
                const modelInfo = AI_CONFIG.getModelInfo(model);
                console.log(`[Ask Kenshu API] Model info: ${modelInfo.name} by ${modelInfo.provider}`);

                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.retryConfig.timeoutMs);

                response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                        "HTTP-Referer": "https://kenshu.dev",
                        "X-Title": "Ask Kenshu - Portfolio Navigation",
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [
                            { role: "system", content: systemInstruction },
                            ...messages,
                        ],
                        stream: true,
                        temperature: 0.7,
                        max_tokens: 1000,
                    }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (response.ok) {
                    usedModel = model;
                    console.log(`[Ask Kenshu API] ✅ SUCCESS with model: ${model}`);
                    break; // Exit loop on success
                } else {
                    const errText = await response.text();
                    lastError = `${response.status}: ${errText.substring(0, 150)}`;
                    console.warn(`[Ask Kenshu API] ❌ FAILED with model ${model}. ${lastError}`);

                    // Small delay before trying next model
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : String(err);
                lastError = errorMsg;
                console.error(`[Ask Kenshu API] ❌ Network/Timeout error with model ${model}: ${errorMsg}`);

                // Small delay before trying next model
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        // If all models failed (response is undefined or not ok)
        if (!response || !response.ok) {
            console.error("[Ask Kenshu API] ALL MODELS FAILED. Engaging Static Fallback.");

            // FALLBACK SYSTEM: Return a static response instead of 500 error
            console.log("[Ask Kenshu API] Using Fallback Response due to API Error");

            const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || "";
            let fallbackContent = "Je rencontre actuellement une petite surcharge cognitive (IA indisponible momentanément). 😅\n\nNéanmoins, je peux vous guider vers les sections principales.\n\nClique ici pour aller :\n\n👉 **[Voir les projets](/projets)**\n\n👉 **[Découvrir les services](/services)**\n\n👉 **[Me contacter](/contact)**";

            if (lastUserMessage.includes("projet") || lastUserMessage.includes("réalis") || lastUserMessage.includes("portfol")) {
                fallbackContent = "Pour découvrir mes projets, je vous invite à visiter la page dédiée. Vous y trouverez des cas concrets comme Budget AI ou AI Compliance Tool. 🚀\n\nClique ici pour aller :\n\n👉 **[Voir les projets](/projets)**";
            } else if (lastUserMessage.includes("service") || lastUserMessage.includes("offre") || lastUserMessage.includes("compétence")) {
                fallbackContent = "Je propose des services en Data Engineering, Développement Web et Intelligence Artificielle.\n\nClique ici pour aller :\n\n👉 **[Découvrir les services](/services)**\n\nN'hésitez pas à me contacter pour en discuter !";
            } else if (lastUserMessage.includes("contact") || lastUserMessage.includes("mail") || lastUserMessage.includes("dispo") || lastUserMessage.includes("rendez-vous")) {
                fallbackContent = "Le meilleur moyen de me joindre est via le formulaire de contact. Je suis généralement très réactif ! ⚡\n\nClique ici pour aller :\n\n👉 **[Me contacter](/contact)**";
            } else if (lastUserMessage.includes("tarif") || lastUserMessage.includes("prix") || lastUserMessage.includes("coût")) {
                fallbackContent = "Mes tarifs sont ajustables selon la nature du projet :\n\n- **Freelance** : 500-700€/jour\n- **Projet au forfait** : sur devis (à partir de 2000€)\n\nClique ici pour aller :\n\n👉 **[Demander un devis](/contact)**";
            }

            // Return the fallback response as a stream (to simulate AI behavior)
            const encoder = new TextEncoder();
            const stream = new ReadableStream({
                start(controller) {
                    controller.enqueue(encoder.encode(fallbackContent));
                    controller.close();
                }
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

                try {
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
                                    // Ignore parsing errors
                                }
                            }
                        }
                    }
                } catch (streamError) {
                    console.error("[Ask Kenshu API] Stream reading error:", streamError);
                    controller.error(streamError);
                }

                // Log interaction (non-blocking)
                // Log interaction (non-blocking)
                // TODO: Re-enable logging with new Analytics system (Prisma Schema v2)
                /*
                try {
                    const { logInteraction } = await import("@/lib/db-utils");
                    await logInteraction(
                        (messages[messages.length - 1]?.content || "") + ` [Model: ${usedModel}]`,
                        fullResponse
                    );
                } catch (e) {
                    console.warn("[Ask Kenshu API] Log error (ignored):", e);
                }
                */

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
        console.error("[Ask Kenshu API] FATAL ERROR:", errorMessage);

        return new Response(JSON.stringify({
            error: "server_error",
            message: "Une erreur critique s'est produite. Veuillez réessayer.",
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
