import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    return NextResponse.json({
        hasKey: !!apiKey,
        keyPrefix: apiKey ? apiKey.substring(0, 5) : 'none',
        env: process.env.NODE_ENV
    });
}
