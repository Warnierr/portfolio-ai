import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function PATCH(
    req: NextRequest,
    context: RouteContext
) {
    try {
        const { action } = await req.json();
        const { id } = await context.params;

        if (action === "approve") {
            await prisma.news.update({
                where: { id },
                data: { status: "APPROVED", publishedAt: new Date() },
            });
        } else if (action === "reject") {
            await prisma.news.update({
                where: { id },
                data: { status: "REJECTED" },
            });
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Fail" }, { status: 500 });
    }
}
