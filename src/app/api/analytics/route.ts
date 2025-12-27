import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
    try {
        const { page, referrer } = await req.json();
        const headersList = await headers();
        const userAgent = headersList.get("user-agent") || undefined;

        await prisma.analytics.create({
            data: {
                page,
                referrer,
                userAgent,
            },
        });

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Fail" }, { status: 500 });
    }
}
