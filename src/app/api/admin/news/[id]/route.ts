import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { action } = await req.json();
        const { id } = await params;

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
