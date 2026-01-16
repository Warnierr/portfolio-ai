"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

type NavItem = {
    label: string;
    href: string;
    badge?: string;
    highlighted?: boolean;
};

const navItems: NavItem[] = [
    { label: "Projets", href: "/projets" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact", highlighted: true },
];

export default function ConditionalHeader() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    // Ne pas afficher le header sur la homepage (elle a sa propre navigation minimaliste)
    if (isHomePage) return null;

    return (
        <header className="sticky top-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm text-white sm:px-6">
                <Link href="/" className="font-semibold tracking-wide">
                    Kenshu Dev
                </Link>
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={
                                    item.highlighted
                                        ? "rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 text-emerald-300 font-medium transition hover:bg-emerald-500/20 hover:border-emerald-500/60 hover:shadow-lg hover:shadow-emerald-500/20"
                                        : "text-zinc-300 transition hover:text-white relative"
                                }
                            >
                                {item.label}
                                {item.badge && (
                                    <span className="absolute -top-1 -right-2 text-[9px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </nav>
                    <MobileMenu navItems={navItems} />
                </div>
            </div>
        </header>
    );
}
