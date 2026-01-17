/**
 * Types pour le système de collecte de données (RGPD 2026)
 */

export type UserProfile =
    | 'recruiter'
    | 'dev'
    | 'founder'
    | 'association'
    | 'curious'
    | null;

export type ConsentLevel =
    | 'none'        // Aucune mémoire
    | 'session'     // Mémoire session uniquement
    | 'persistent'; // Stockage long terme

export type QuestionCategory =
    | 'technical'
    | 'commercial'
    | 'availability'
    | 'general';

export interface ChatSession {
    id: string;
    sessionId: string;
    profile?: UserProfile;
    createdAt: Date;
    endedAt?: Date;
    duration?: number;
    messageCount: number;
    referrer?: string;
    userAgent?: string;
}

export interface ChatMessage {
    id: string;
    sessionId: string;
    role: 'user' | 'assistant';
    content?: string; // NULL si pas de consentement
    category?: QuestionCategory;
    timestamp: Date;
}

export interface ConsentLog {
    id: string;
    sessionId: string;
    granted: boolean;
    level: ConsentLevel;
    timestamp: Date;
}

export interface ConsentState {
    granted: boolean;
    level: ConsentLevel;
    sessionId: string;
}
