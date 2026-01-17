import { NextResponse } from 'next/server';

/**
 * POST /api/analytics/session
 * Créer une nouvelle session de chat anonyme
 */
export async function POST(req: Request) {
    try {
        const { profile, referrer, userAgent } = await req.json();

        // Générer un sessionId unique
        const sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        // TODO: Sauvegarder en DB avec Prisma
        // Pour l'instant, retourner juste le sessionId

        console.log('[Analytics] New session:', { sessionId, profile, referrer });

        return NextResponse.json({
            sessionId,
            success: true
        });

    } catch (error) {
        console.error('[Analytics] Session creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create session' },
            { status: 500 }
        );
    }
}

/**
 * PATCH /api/analytics/session
 * Mettre à jour une session (fin, durée)
 */
export async function PATCH(req: Request) {
    try {
        const { sessionId, duration, messageCount } = await req.json();

        // TODO: Update en DB
        console.log('[Analytics] Session updated:', { sessionId, duration, messageCount });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('[Analytics] Session update error:', error);
        return NextResponse.json(
            { error: 'Failed to update session' },
            { status: 500 }
        );
    }
}
