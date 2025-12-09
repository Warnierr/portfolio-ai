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

const navItems = [
  { label: "Écosystèmes", href: "/ecosystemes" },
  { label: "Projets", href: "/projets" },
  { label: "Lab", href: "/lab" },
  { label: "Stack", href: "/stack" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const metadata: Metadata = {
  title: "Architecte d'écosystèmes IA",
  description:
    "Portfolio vivant d'un builder IA/Data/DevOps : écosystèmes intelligents, automation et design de systèmes.",
  metadataBase: new URL("https://portfolio-ai.local"),
  openGraph: {
    title: "Architecte d'écosystèmes IA",
    description: "Je construis des écosystèmes IA, de l'infrastructure à l'imaginaire.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-sm text-white sm:px-6">
            <Link href="/" className="font-semibold tracking-wide">
              Architecte IA
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-zinc-300 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/agent"
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
            >
              Parler à l’agent
            </Link>
          </div>
        </header>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
