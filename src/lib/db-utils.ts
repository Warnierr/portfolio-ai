import { prisma } from "./prisma";

export async function logInteraction(userMessage: string, aiResponse: string, tokens?: number) {
    try {
        // Analyse simplifiée des thématiques (pourrait être faite par LLM plus tard)
        let theme = "Autre";
        if (userMessage.toLowerCase().includes("tarif") || userMessage.toLowerCase().includes("prix")) theme = "Tarification";
        if (userMessage.toLowerCase().includes("donnée") || userMessage.toLowerCase().includes("rgpd")) theme = "Souveraineté";
        if (userMessage.toLowerCase().includes("immo")) theme = "Immobilier";
        if (userMessage.toLowerCase().includes("compta")) theme = "Comptabilité";

        await prisma.chatLog.create({
            data: {
                userMessage,
                aiResponse,
                theme,
                sentiment: userMessage.length > 50 ? "Détaillé" : "Court",
            },
        });
        console.log("DB_LOG_SAVED");
    } catch (e) {
        console.error("DB_LOG_ERROR:", e);
    }
}

export async function saveLead(data: { name: string; email: string; message: string }) {
    try {
        await prisma.lead.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message,
            },
        });
        console.log("LEAD_SAVED:", data.email);
    } catch (e) {
        console.error("LEAD_SAVE_ERROR:", e);
    }
}

export async function trackVisit(page: string, userAgent?: string, referrer?: string) {
    try {
        await prisma.analytics.create({
            data: {
                page,
                userAgent,
                referrer,
            },
        });
    } catch (e) {
        console.error("ANALYTICS_ERROR:", e);
    }
}
