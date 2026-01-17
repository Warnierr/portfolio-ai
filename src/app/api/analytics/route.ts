import { NextResponse } from "next/server";

// Analytics API - Graceful fallback when DB is not configured
export async function POST(req: Request) {
    try {
        // Log analytics locally (without DB)
        const { page, referrer } = await req.json();

        // In production, this would save to DB
        // For now, just acknowledge the request
        console.log(`[Analytics] Page: ${page}, Referrer: ${referrer}`);

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("[Analytics] Error:", e);
        return NextResponse.json({ success: true }); // Don't fail the client
    }
}

export async function GET() {
    // Return placeholder stats when DB is not configured
    return NextResponse.json({
        totalLeads: 0,
        totalChats: 0,
        totalArticles: 0,
        totalViews: 0,
        avgSessionTime: 0,
        conversionRate: 0,
        topPages: [],
        topEvents: [],
        recentActivity: [],
        message: "Analytics API ready. Configure database for full functionality."
    });
}