import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Navigation V1 simplifiée (4 liens)
const navItems = [
  { label: "Projets", href: "/projets" },
  { label: "Méthode", href: "/methode" },
  { label: "Contact", href: "/contact" },
];

export const metadata: Metadata = {
  title: "Développeur IA pour TPE & PME",
  description:
    "J'aide les cabinets comptables, avocats, agences immobilières et marketing à intégrer l'IA dans leur quotidien. Automatisation documentaire, assistants métier, tableaux de bord intelligents.",
  metadataBase: new URL("https://portfolio-ai.vercel.app"),
  keywords: [
    "IA pour TPE",
    "automatisation cabinet comptable",
    "assistant IA immobilier",
    "développeur IA freelance",
    "automatisation PME",
  ],
  openGraph: {
    title: "Développeur IA pour TPE & PME",
    description:
      "Automatisation documentaire, assistants métier, tableaux de bord intelligents pour les TPE et PME.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-sm text-white sm:px-6">
            <Link href="/" className="font-semibold tracking-wide">
              Kenshu Dev
            </Link>
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hidden text-zinc-300 transition hover:text-white md:block"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
              >
                Discuter
              </Link>
            </nav>
          </div>
        </header>

        <PageTransition>{children}</PageTransition>

        <footer className="border-t border-white/5 bg-black/30">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <div className="flex flex-col items-center justify-between gap-4 text-sm text-zinc-500 md:flex-row">
              <div className="flex gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <p>© 2024 — Développeur IA indépendant</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
