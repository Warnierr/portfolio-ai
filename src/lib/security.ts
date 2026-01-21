import { z } from 'zod';

/**
 * Schémas de validation pour l'API Ask Kenshu
 */

export const MessageSchema = z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string()
        .min(1, "Le message ne peut pas être vide")
        .max(2000, "Le message ne peut pas dépasser 2000 caractères"),
});

export const RequestSchema = z.object({
    messages: z.array(MessageSchema)
        .min(1, "Au moins un message requis")
        .max(20, "Maximum 20 messages dans l'historique"),
    theme: z.enum(['dark', 'light', 'matrix', 'cyberpunk', 'zen', 'neon', 'midnight', 'retro']).optional(),
});

export type ValidatedRequest = z.infer<typeof RequestSchema>;

/**
 * Détection de tentatives d'injection de prompts
 */
export function detectPromptInjection(content: string): boolean {
    const suspiciousPatterns = [
        /ignore\s+(all\s+)?previous\s+instructions?/i,
        /disregard\s+(all\s+)?prior\s+instructions?/i,
        /forget\s+(all\s+)?previous\s+instructions?/i,
        /you\s+are\s+now\s+(a|an)/i,
        /new\s+instructions?:/i,
        /system\s+prompt/i,
        /reveal\s+(the\s+)?(api|key|secret|password|token)/i,
        /show\s+(me\s+)?(the\s+)?system\s+prompt/i,
        /<\s*script/i,  // XSS basique
        /javascript:/i,
    ];

    return suspiciousPatterns.some(pattern => pattern.test(content));
}

/**
 * Sanitization basique du contenu
 */
export function sanitizeContent(content: string): string {
    // Remplacer caractères de contrôle potentiellement dangereux
    return content
        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // Caractères de contrôle
        .trim()
        .slice(0, 2000); // Max 2000 caractères
}

/**
 * Rate limiting simple basé sur IP (in-memory, temporaire)
 * Pour production: utiliser Redis (Upstash) quand vous scalerez
 */
const ipRequestMap = new Map<string, { count: number; resetAt: number }>();

// Nettoyer les vieilles entrées toutes les heures
if (typeof setInterval !== 'undefined') {
    setInterval(() => {
        const now = Date.now();
        for (const [ip, data] of ipRequestMap.entries()) {
            if (now > data.resetAt) {
                ipRequestMap.delete(ip);
            }
        }
    }, 60 * 60 * 1000); // 1 heure
}

export function checkSimpleRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 10; // 10 requêtes par minute

    const existing = ipRequestMap.get(ip);

    if (!existing || now > existing.resetAt) {
        // Nouveau window
        ipRequestMap.set(ip, {
            count: 1,
            resetAt: now + windowMs,
        });
        return { allowed: true };
    }

    if (existing.count >= maxRequests) {
        const retryAfter = Math.ceil((existing.resetAt - now) / 1000);
        return { allowed: false, retryAfter };
    }

    // Incrémenter
    existing.count++;
    return { allowed: true };
}

/**
 * Extraire l'IP de la requête
 */
export function getIP(req: Request): string {
    // Vercel forwarded IP
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    // Cloudflare
    const cfIP = req.headers.get("cf-connecting-ip");
    if (cfIP) return cfIP;

    // Real IP header
    const realIP = req.headers.get("x-real-ip");
    if (realIP) return realIP;

    return "unknown";
}

/**
 * Logger sécurisé (ne log pas de données sensibles)
 */
export function securityLog(event: string, data?: Record<string, any>) {
    const timestamp = new Date().toISOString();
    const sanitizedData = data ? Object.fromEntries(
        Object.entries(data).filter(([key]) => !['apiKey', 'token', 'password'].includes(key))
    ) : {};

    console.log(`[SECURITY ${timestamp}] ${event}`, sanitizedData);
}
