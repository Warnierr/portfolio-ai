const MODEL_INFO: Record<string, { name: string; provider: string }> = {
    "google/gemini-2.0-flash-exp:free": { name: "Gemini 2.0 Flash", provider: "Google DeepMind" },
    "x-ai/grok-4.1-fast": { name: "Grok 4.1 Fast", provider: "xAI" },
    "anthropic/claude-3.5-sonnet": { name: "Claude 3.5 Sonnet", provider: "Anthropic" },
};

const CURRENT_MODEL = "google/gemini-2.0-flash-exp:free";

export const AI_CONFIG = {
    modelId: CURRENT_MODEL,
    displayName: MODEL_INFO[CURRENT_MODEL]?.name || CURRENT_MODEL,
    provider: MODEL_INFO[CURRENT_MODEL]?.provider || "AI Provider"
};
