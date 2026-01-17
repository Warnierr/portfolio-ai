import { NextResponse } from 'next/server';

/**
 * POST /api/analytics/consent
 * Enregistrer le consentement utilisateur
 */
export async function POST(req: Request) {
    try {
        const { sessionId, granted, level } = await req.json();

        if (!sessionId) {
            return NextResponse.json(
                { error: 'sessionId required' },
                { status: 400 }
            );
        }

        // TODO: Sauvegarder en DB avec Prisma
        console.log('[Analytics] Consent recorded:', { sessionId, granted, level });

        return NextResponse.json({
            success: true,
            message: granted
                ? 'Consentement enregistré'
                : 'Préférence de confidentialité enregistrée'
        });

    } catch (error) {
        console.error('[Analytics] Consent error:', error);
        return NextResponse.json(
            { error: 'Failed to record consent' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/analytics/consent
 * Supprimer les données d'une session (commande /delete)
 */
export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json(
                { error: 'sessionId required' },
                { status: 400 }
            );
        }

        // TODO: Supprimer de la DB (CASCADE sur messages et consents)
        console.log('[Analytics] Data deleted for session:', sessionId);

        return NextResponse.json({
            success: true,
            message: 'Vos données ont été supprimées'
        });

    } catch (error) {
        console.error('[Analytics] Delete error:', error);
        return NextResponse.json(
            { error: 'Failed to delete data' },
            { status: 500 }
        );
    }
}
