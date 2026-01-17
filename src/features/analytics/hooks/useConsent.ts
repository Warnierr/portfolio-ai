'use client';

import { useState, useEffect } from 'react';
import type { ConsentState, ConsentLevel } from '../types';

const STORAGE_KEY = 'kenshu_consent';

/**
 * Hook pour gérer le consentement RGPD
 */
export function useConsent() {
    const [consent, setConsent] = useState<ConsentState>({
        granted: false,
        level: 'none',
        sessionId: ''
    });

    const [isLoading, setIsLoading] = useState(true);

    // Charger le consentement depuis localStorage au montage
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setConsent(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse consent', e);
            }
        }
        setIsLoading(false);
    }, []);

    // Fonction pour demander le consentement
    const requestConsent = async (level: ConsentLevel, sessionId: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/analytics/consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    granted: level !== 'none',
                    level
                })
            });

            if (!response.ok) throw new Error('Failed to record consent');

            const newConsent: ConsentState = {
                granted: level !== 'none',
                level,
                sessionId
            };

            setConsent(newConsent);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsent));

            return true;
        } catch (error) {
            console.error('Consent request failed:', error);
            return false;
        }
    };

    // Fonction pour révoquer le consentement (opt-out)
    const revokeConsent = async () => {
        try {
            // Mettre à jour l'état local
            const revokedConsent: ConsentState = {
                granted: false,
                level: 'none',
                sessionId: consent.sessionId
            };

            setConsent(revokedConsent);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(revokedConsent));

            // Enregistrer en DB
            await fetch('/api/analytics/consent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: consent.sessionId,
                    granted: false,
                    level: 'none'
                })
            });

            return true;
        } catch (error) {
            console.error('Revoke consent failed:', error);
            return false;
        }
    };

    // Fonction pour supprimer toutes les données (/delete)
    const deleteAllData = async () => {
        try {
            const response = await fetch(`/api/analytics/consent?sessionId=${consent.sessionId}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete data');

            // Reset local state
            setConsent({
                granted: false,
                level: 'none',
                sessionId: ''
            });
            localStorage.removeItem(STORAGE_KEY);

            return true;
        } catch (error) {
            console.error('Delete data failed:', error);
            return false;
        }
    };

    return {
        consent,
        isLoading,
        requestConsent,
        revokeConsent,
        deleteAllData
    };
}
