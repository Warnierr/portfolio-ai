import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { caseStudies } from "@/data/projects";
import { newsFeed } from "@/data/news";

// OpenRouter comme provider (compatible OpenAI)
const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Contexte statique injecté dans le prompt
function buildContext(): string {
  const projectsContext = caseStudies
    .map(
      (p) => `
## ${p.title}
- Type: ${p.type}
- Client: ${p.context.client}
- Durée: ${p.context.duration}
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
# Contexte Kenshu Dev

## Qui suis-je
Je suis développeur IA freelance spécialisé TPE/PME. Je construis des outils d'automatisation pour les cabinets comptables, avocats, agences immobilières et marketing.

## Compétences
- OCR documentaire et classification automatique
- Chatbots RAG sur données métier
- Dashboards intelligents
- Intégration avec logiciels existants

## Stack technique
Python, Next.js, TypeScript, PostgreSQL, pgvector, OpenRouter, Vercel

## Tarifs
- Forfait projet: 2 000€ - 15 000€ selon complexité
- Accompagnement: à partir de 800€/mois
- Diagnostic initial: gratuit (30 min)

## Disponibilité
Prochaine disponibilité: Janvier 2025

## Projets réalisés
${projectsContext}

## Actualités récentes
${newsContext}

## Process de travail
1. Diagnostic gratuit (1h) - identifier ce qui peut être automatisé
2. Prototype (1-2 semaines) - première version fonctionnelle
3. Déploiement (2-4 semaines) - mise en production + formation
4. Suivi optionnel - maintenance et évolutions
`;
}

const SYSTEM_PROMPT = `Tu es Kenshu, l'assistant IA du portfolio de Kenshu Dev.

${buildContext()}

## Règles
- Réponds en français, de manière concise et professionnelle
- Si on te pose une question sur un projet, donne des détails concrets
- Si quelqu'un décrit un besoin, évalue si c'est dans mes compétences et suggère un projet similaire si pertinent
- Pour les questions sur les tarifs ou la disponibilité, donne les infos et propose de prendre contact
- Si tu ne sais pas, dis-le et suggère de contacter directement
- Termine par une question ou une suggestion d'action quand c'est pertinent
- Ne réponds PAS aux questions hors sujet (politique, médical, etc.)
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openrouter("anthropic/claude-3.5-haiku"),
    system: SYSTEM_PROMPT,
    messages,
  });

  return result.toTextStreamResponse();
}
