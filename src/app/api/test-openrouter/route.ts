import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.OPENROUTER_API_KEY;

    console.log("[Test API] Key from env:", apiKey ? apiKey.substring(0, 25) + "..." : "MISSING");

    if (!apiKey) {
        return NextResponse.json({ error: "No API key", envVars: Object.keys(process.env).filter(k => k.includes("OPEN")) });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [{ role: "user", content: "Say hi" }],
            }),
        });

        const data = await response.json();
        console.log("[Test API] Response:", JSON.stringify(data));

        return NextResponse.json({
            status: response.status,
            ok: response.ok,
            data
        });
    } catch (e: any) {
        return NextResponse.json({ error: e.message });
    }
}
