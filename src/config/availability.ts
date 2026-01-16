export type AvailabilityStatus = 'available' | 'soon' | 'unavailable';

// ✏️ Modifier cette variable pour changer le statut de disponibilité
export const CURRENT_AVAILABILITY: AvailabilityStatus = 'soon';

export const AVAILABILITY_CONFIG = {
    available: {
        text: 'Disponible immédiatement',
        dotColor: 'bg-emerald-500',
        textColor: 'text-emerald-500',
        pingColor: 'bg-emerald-400'
    },
    soon: {
        text: 'Bientôt disponible',
        dotColor: 'bg-orange-500',
        textColor: 'text-orange-500',
        pingColor: 'bg-orange-400'
    },
    unavailable: {
        text: 'Pas disponible',
        dotColor: 'bg-red-500',
        textColor: 'text-red-500',
        pingColor: 'bg-red-400'
    }
} as const;
