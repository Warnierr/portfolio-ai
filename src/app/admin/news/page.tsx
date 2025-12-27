import { prisma } from "@/lib/prisma";
import NewsApprovalClient from "@/components/admin/NewsApprovalClient";

export const dynamic = "force-dynamic";

export default async function NewsApprovalPage() {
    const proposals = await prisma.news.findMany({
        where: { status: "PENDING" },
        orderBy: { createdAt: "desc" },
    });

    return <NewsApprovalClient proposals={proposals} />;
}
