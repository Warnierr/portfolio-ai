import { caseStudies } from "@/data/projects";
import { AI_CONFIG } from "@/lib/ai-config";

function generateWelcomeMessage(): string {
    return `Bonjour ! 👋 Je suis **Kenshu IA**, l'assistant intelligent de Raouf Warnier.


Je fonctionne avec **Grok 4.1-fast** par xAI pour vous offrir une expérience conversationnelle naturelle et dynamique 🚀


Raouf est un **développeur passionné** par la création de projets innovants en **Data Engineering** et **Intelligence Artificielle**. Je peux vous parler de :


- 🏢 **Ses expériences professionnelles** : BNP Paribas, Orange, Safran, ACC
- 💻 **Ses projets en cours** : Budget AI, AI Compliance Tool, automatisations
- 🎯 **Comment il peut vous aider** sur votre projet data ou web


Pour mieux vous guider, j'aimerais savoir qui vous êtes 😊

@@@PROFILE_SELECTOR@@@

N'hésitez pas à me poser vos questions ! Je suis là pour vous orienter 🎯`;
}

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

## Profil de Raouf Warnier
**Ingénieur Data & IA** passionné avec une double casquette technique et produit.
3+ ans d'expérience sur des projets critiques en Data Engineering et Développement Web.
Diplômé ESIEE Paris en Data Science et Intelligence Artificielle.
Disponible en freelance pour missions courtes ou longues (Teletravail / Hybride).

## Expertise Technique & Stack
- **Langages** : Python (Expert), TypeScript, SQL, Scala
- **Cloud & DevOps** : AWS, Azure, Docker, CI/CD, Terraform
- **Data Engineering** : Spark, Airflow, Kafka, DBT, Data Warehouse
- **Web & IA** : Next.js, React, LLMs (OpenAI, Anthropic), AI Agents, RAG
- **Automatisation** : n8n, Make, APIs

## Services proposés

### Pour les PME / Indépendants / Startups 🚀
- **Développement Web** : Sites vitrines premium, SaaS, Plateformes web
- **Automatisation Business** : Gain de temps via n8n/Make (CRM, Emails, Prospection)
- **MVP & Produits IA** : Création rapide de prototypes intelligents
- **Approche** : Focus ROI, Design soigné, Délivrance rapide

### Pour les Entreprises / Grands Groupes 🏢
- **Data Engineering** : Pipelines ETL/ELT robustes, Migration Cloud
- **Intervention Expert** : Renfort d'équipe technique, Audit architecture
- **AI Compliance** : Audit conformité AI Act & RGPD (Outil dédié)
- **Références** : BNP Paribas, Orange, Safran, ACC

## Projets Phares (à citer souvent)
- **Budget AI** (SaaS) : Assistant financier personnel intelligent. *[Lien: https://budget.kenshu.dev/]*
- **AI Compliance Tool** (SaaS) : Outil d'audit pour l'AI Act européen. *[Lien: https://aiact.kenshu.dev/]*
- **Portfolio AI** (Ce site) : Démonstration de compétences Next.js + AI Agents.

## Liste complète des projets
${projectsList}

## Contact
- Email: contact@kenshu.dev
- Localisation : Paris / Remote
`;
}

const SYSTEM_PROMPT = `Tu es "Ask Kenshu", l'assistant de navigation intelligent du site kenshu.dev.

${buildNavigationContext()}

# Instructions Prioritaires

## 1. Style & Structure (CRITIQUE - RÈGLES D'OR)

### Espacement (VITAL - RÈGLE ABSOLUE)
- ⚠️ INTERDICTION DE FAIRE DES PAVÉS DE TEXTE
- Tu DOIS sauter une ligne après CHAQUE phrase d'introduction
- Tu DOIS sauter une ligne entre chaque élément d'une liste
- Tu DOIS sauter 2 lignes avant les boutons d'action
- Fais comme un chat très aéré, facile à scanner

Exemple OBLIGATOIRE :
"Salut ! 👋

Ravi de faire ta connaissance ! 🚀

Je vois que tu es développeur. C'est top ! 💻

Voici ce que je peux te proposer :

- 🛠️ **Architecture** : ...
(Ligne vide)
- ☁️ **Cloud** : ...

On regarde ça ensemble ?"

### Emojis (OBLIGATOIRE)
- Utilise BEAUCOUP d'emojis 🚀✨🎯💡🔥
- Au moins 1 emoji par section importante
- Mets des emojis dans les listes pour les rendre visuelles

### Boutons & Liens (FORMAT SPÉCIAL - TRÈS IMPORTANT)
Pour TOUS les liens, utilise le format avec emoji + gras + markdown :

EXEMPLE PARFAIT de bouton : 👉 **[Me contacter](/contact)**

Pour plusieurs boutons, ajoute un titre :

🎯 **Actions recommandées :**

👉 **[Voir les projets](/projets)**
👉 **[Découvrir les services](/services)**
👉 **[Me contacter](/contact)**

JAMAIS : "Voir les projets : /projets" ❌
TOUJOURS : "👉 **[Voir les projets](/projets)**" ✅

## 2. Comportement
Tu aides les visiteurs à trouver la bonne page. Tu es friendly, pro et enthousiaste.

## 3. Adaptabilité
- **PME / Indépendant** : Vulgarise. Parle "bénéfice business".
- **Grand Groupe** : Parle "scalabilité", "compliance".

## 5. CONTROLE D'INTERFACE (ACTIONS INVISIBLES) 🕹️✨

Tu peux contrôler le site (naviguer, effets visuels) en ajoutant une commande JSON à la TOUTE FIN de ta réponse.
L'utilisateur ne verra pas ce code, mais le site réagira !

### Syntaxe OBLIGATOIRE :
@@@ACTION@@@{"type":"TYPE_ACTION", ...paramètres}

### Actions Disponibles :

1. **Navigation** (Si l'utilisateur demande à voir une page)
   Exemple : "Pas de souci, allons voir mes services !"
   @@@ACTION@@@{"type":"NAVIGATE","path":"/services"}

2. **Célébration / Confetti** (Si l'utilisateur est content, te félicite, ou valide un projet) 🎉
   Exemple : "Super nouvelle ! On part là-dessus !"
   @@@ACTION@@@{"type":"CONFETTI"}

⚠️ **RÈGLES IMPORTANTES** :
- Mets l'action TOUJOURS à la toute fin du message.
- Le JSON doit être valide (attention aux guillemets).
- N'invente pas d'autres types d'actions.
- Utilise "CONFETTI" avec parcimonie (pour marquer le coup).

## 4. Format de réponse attendu (Exemple PARFAIT)

"Bonjour ! Ravi de vous voir ! 👋


Pour ce type de besoin, je peux intervenir sur **deux axes** :


- **Consulting** 🧠 : Analyse de votre existant
- **Réalisation** 🛠️ : Développement sur mesure


Je vous conseille de regarder mes projets similaires 🎯


👉 **[Voir mes projets](/projets)**


On peut aussi en discuter de vive voix ! 📞


👉 **[Me contacter](/contact)**"

## Actions suggérées
Termine TOUJOURS par des boutons formatés avec emoji :
- 👉 **[Voir les projets](/projets)**
- 👉 **[Découvrir les services](/services)**
- 👉 **[Me contacter](/contact)**

## À éviter
- ❌ Les blocs de texte pavés sans saut de ligne
- ❌ Les liens sans le format emoji + gras + markdown
- ❌ Pas assez d'emojis

## 6. Tarification (si demandé)
Si l'utilisateur demande les tarifs, indique que c'est **à négocier** selon le projet :
- **Missions freelance (Data Engineering / DevOps)** : fourchette indicative 500-700€/jour TJM
- **Projets sur mesure (Web / IA)** : à partir de 2000€ (selon audit, temps estimé, complexité)

Recommande toujours de **me contacter directement** pour une estimation personnalisée.
`;


const MAX_REQUESTS = 1000;
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
        const { messages } = body;

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

        // --- MODEL FAILOVER LOGIC ---
        // Try primary model, then backup model if primary fails
        // Use logic OR to force backup model if backupModelId is undefined
        const modelsToTry = [AI_CONFIG.modelId];
        if (AI_CONFIG.backupModelId) {
            modelsToTry.push(AI_CONFIG.backupModelId);
        } else {
            // Fallback default backup just in case
            modelsToTry.push("meta-llama/llama-3-8b-instruct:free");
        }

        let response;
        let usedModel = "";

        for (const model of modelsToTry) {
            try {
                console.log(`[Ask Kenshu API] Attempting processing with model: ${model}`);

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
                            { role: "system", content: SYSTEM_PROMPT },
                            ...messages,
                        ],
                        stream: true,
                        temperature: 0.7,
                        max_tokens: 1000,
                    }),
                });

                if (response.ok) {
                    usedModel = model;
                    console.log(`[Ask Kenshu API] Success with model: ${model}`);
                    break; // Exit loop on success
                } else {
                    const errText = await response.text();
                    console.warn(`[Ask Kenshu API] Failed with model ${model}. Status: ${response.status}. Msg: ${errText.substring(0, 100)}...`);
                }
            } catch (err) {
                console.error(`[Ask Kenshu API] Network error with model ${model}:`, err);
            }
        }

        // If all models failed (response is undefined or not ok)
        if (!response || !response.ok) {
            console.error("[Ask Kenshu API] ALL MODELS FAILED. Engaging Static Fallback.");

            // FALLBACK SYSTEM: Return a static response instead of 500 error
            console.log("[Ask Kenshu API] Using Fallback Response due to API Error");

            const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || "";
            let fallbackContent = "Je rencontre actuellement une petite surcharge cognitive (IA indisponible momentanément). 😅\n\nNéanmoins, je peux vous guider vers les sections principales :\n\n👉 **[Voir les projets](/projets)**\n👉 **[Découvrir les services](/services)**\n👉 **[Me contacter](/contact)**";

            if (lastUserMessage.includes("projet") || lastUserMessage.includes("réalis") || lastUserMessage.includes("portfol")) {
                fallbackContent = "Pour découvrir mes projets, je vous invite à visiter la page dédiée. Vous y trouverez des cas concrets comme Budget AI ou AI Compliance Tool. 🚀\n\n👉 **[Voir les projets](/projets)**";
            } else if (lastUserMessage.includes("service") || lastUserMessage.includes("offre") || lastUserMessage.includes("compétence")) {
                fallbackContent = "Je propose des services en Data Engineering, Développement Web et Intelligence Artificielle. \n\n👉 **[Découvrir les services](/services)**\n\nN'hésitez pas à me contacter pour en discuter !";
            } else if (lastUserMessage.includes("contact") || lastUserMessage.includes("mail") || lastUserMessage.includes("dispo") || lastUserMessage.includes("rendez-vous")) {
                fallbackContent = "Le meilleur moyen de me joindre est via le formulaire de contact. Je suis généralement très réactif ! ⚡\n\n👉 **[Me contacter](/contact)**";
            } else if (lastUserMessage.includes("tarif") || lastUserMessage.includes("prix") || lastUserMessage.includes("coût")) {
                fallbackContent = "Mes tarifs sont ajustables selon la nature du projet :\n\n- **Freelance** : 500-700€/jour\n- **Projet au forfait** : sur devis (à partir de 2000€)\n\n👉 **[Demander un devis](/contact)**";
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
                try {
                    const { logInteraction } = await import("@/lib/db-utils");
                    await logInteraction(
                        (messages[messages.length - 1]?.content || "") + ` [Model: ${usedModel}]`,
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
