"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminNav() {
    const router = useRouter();

    const handleLogout = () => {
        document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <nav className="mt-8 space-y-2">
            <Link href="/admin" className="block rounded-lg px-4 py-2 hover:bg-white/5">
                Dashboard
            </Link>
            <Link href="/admin/leads" className="block rounded-lg px-4 py-2 hover:bg-white/5">
                Leads
            </Link>
            <Link href="/admin/news" className="block rounded-lg px-4 py-2 hover:bg-white/5">
                News Approval
            </Link>
            <Link href="/admin/chats" className="block rounded-lg px-4 py-2 hover:bg-white/5">
                AI Analytics
            </Link>
            <Link href="/admin/articles" className="block rounded-lg px-4 py-2 hover:bg-white/5">
                Articles
            </Link>
            <button
                onClick={handleLogout}
                className="w-full text-left block rounded-lg px-4 py-2 text-red-400 hover:bg-red-500/10 transition mt-4"
            >
                Déconnexion
            </button>
        </nav>
    );
}
