/**
 * AI Configuration - Multi-Model Failover System
 * Priority: Grok-beta → Llama 3.3 → Gemini → Static Fallback
 */

const MODEL_INFO: Record<string, { name: string; provider: string }> = {
    "x-ai/grok-beta": { name: "Grok Beta", provider: "xAI" },
    "x-ai/grok-2-1212": { name: "Grok 2", provider: "xAI" },
    "meta-llama/llama-3.3-70b-instruct": { name: "Llama 3.3 70B", provider: "Meta" },
    "google/gemini-2.0-flash-exp:free": { name: "Gemini 2.0 Flash", provider: "Google DeepMind" },
    "google/gemini-2.0-flash-lite-preview-02-05:free": { name: "Gemini 2.0 Flash Lite", provider: "Google DeepMind" },
    "meta-llama/llama-3-8b-instruct:free": { name: "Llama 3 8B", provider: "Meta" },
    "mistralai/mistral-7b-instruct:free": { name: "Mistral 7B", provider: "Mistral AI" },
};

// Primary model - Grok Beta (xAI) - Best reasoning capabilities
const PRIMARY_MODEL = "x-ai/grok-beta";

// Backup models in order of preference (tried if primary fails)
const BACKUP_MODELS = [
    "meta-llama/llama-3.3-70b-instruct",           // Strong backup - Llama 3.3
    "google/gemini-2.0-flash-exp:free",            // Free tier backup
    "google/gemini-2.0-flash-lite-preview-02-05:free", // Second free tier
    "meta-llama/llama-3-8b-instruct:free",         // Lightweight free backup
    "mistralai/mistral-7b-instruct:free",          // Last resort free model
];

export const AI_CONFIG = {
    // Primary model (Grok-beta)
    modelId: PRIMARY_MODEL,

    // Backup models (tried in order if primary fails)
    backupModels: BACKUP_MODELS,

    // All models to try (convenience array)
    allModels: [PRIMARY_MODEL, ...BACKUP_MODELS],

    // Display info for primary model
    displayName: MODEL_INFO[PRIMARY_MODEL]?.name || PRIMARY_MODEL,
    provider: MODEL_INFO[PRIMARY_MODEL]?.provider || "AI Provider",

    // Helper to get model info
    getModelInfo: (modelId: string) => MODEL_INFO[modelId] || { name: modelId, provider: "Unknown" },

    // Retry configuration
    retryConfig: {
        maxRetries: 3,           // Max retries per model
        retryDelayMs: 1000,      // Delay between retries
        timeoutMs: 30000,        // Request timeout
    }
};

// Legacy export for backward compatibility
export const CURRENT_MODEL = PRIMARY_MODEL;
export const BACKUP_MODEL = BACKUP_MODELS[0];
