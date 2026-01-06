import { NextResponse } from "next/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY not configured" },
        { status: 500 }
      );
    }

    const systemPrompt = `Tu es un expert en Data Engineering, DataOps, LLM, DevOps et conformité AI Act. 
Rédige un article technique de blog en français pour le site kenshu.dev.

L'article doit :
- Être structuré avec H2/H3 clairs
- Inclure des exemples concrets
- Être orienté résolution de problèmes
- Faire 1500-2500 mots
- Utiliser un ton professionnel mais accessible
- Inclure une section "Points clés" en fin d'article

Catégories possibles : data-engineering, dataops, llm-ia, devops-plateforme, conformite-ai-act-rgpd, retours-experience

Retourne UNIQUEMENT un JSON valide avec :
{
  "title": "...",
  "slug": "...",
  "excerpt": "...",
  "content": "... (markdown)",
  "category": "...",
  "tags": ["...", "..."],
  "readingTime": 7
}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://kenshu.dev",
        "X-Title": "Kenshu Blog Generator",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      console.error("OpenRouter error:", await response.text());
      return NextResponse.json(
        { error: "Failed to generate article" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content;

    if (!generatedText) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 500 }
      );
    }

    // Extract JSON from markdown code block if present
    let jsonText = generatedText;
    const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    const article = JSON.parse(jsonText);

    return NextResponse.json(article);
  } catch (error) {
    console.error("Generate article error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: (error as Error).message },
      { status: 500 }
    );
  }
}
