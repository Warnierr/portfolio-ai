import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const lead = await prisma.lead.create({
            data: {
                name,
                email,
                message,
                status: "NEW",
            },
        });

        return NextResponse.json({ success: true, id: lead.id });
    } catch (e) {
        console.error("CONTACT_API_ERROR:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
