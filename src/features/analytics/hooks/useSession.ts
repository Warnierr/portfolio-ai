'use client';

import { useState, useEffect } from 'react';

/**
 * Hook pour tracker une session de chat anonyme
 */
export function useSession() {
    const [sessionId, setSessionId] = useState<string>('');
    const [startTime, setStartTime] = useState<number>(Date.now());

    // Créer une session au montage
    useEffect(() => {
        createSession();
    }, []);

    // Mettre à jour la durée à l'unmount
    useEffect(() => {
        return () => {
            if (sessionId) {
                const duration = Math.floor((Date.now() - startTime) / 1000);
                updateSession(sessionId, duration);
            }
        };
    }, [sessionId, startTime]);

    const createSession = async () => {
        try {
            const response = await fetch('/api/analytics/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    referrer: document.referrer || 'direct',
                    userAgent: navigator.userAgent
                })
            });

            const data = await response.json();
            if (data.sessionId) {
                setSessionId(data.sessionId);
                setStartTime(Date.now());
            }
        } catch (error) {
            console.error('Failed to create session:', error);
        }
    };

    const updateSession = async (sid: string, duration: number, messageCount?: number) => {
        try {
            await fetch('/api/analytics/session', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: sid,
                    duration,
                    messageCount
                })
            });
        } catch (error) {
            console.error('Failed to update session:', error);
        }
    };

    return {
        sessionId,
        updateSession
    };
}
