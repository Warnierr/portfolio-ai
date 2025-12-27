import Link from "next/link";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
                <h2 className="text-xl font-bold text-emerald-400">Kenshu Admin</h2>

                <AdminNav />

                <div className="mt-auto pt-8">
                    <Link href="/" className="text-xs text-zinc-500 hover:text-white">
                        ← Retour au site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
    );
}
