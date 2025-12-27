import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Navigation V1 (6 liens)
type NavItem = {
  label: string;
  href: string;
  badge?: string;
};

const navItems: NavItem[] = [
  { label: "Projets", href: "/projets" },
  { label: "Services", href: "/services" },
  { label: "Méthode", href: "/methode" },
  { label: "Ask Raouf", href: "/agent", badge: "IA" },
  { label: "Contact", href: "/contact" },
];

export const metadata: Metadata = {
  title: "Raouf Warnier | Data Engineer & DevOps Freelance",
  description:
    "Data Engineer & DevOps avec 3+ ans d'expérience. Pipelines Big Data (Spark, Airflow), automatisation Ansible, CI/CD et infrastructure cloud. Disponible en freelance.",
  metadataBase: new URL("https://raouf-warnier.dev"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Data Engineer freelance",
    "DevOps freelance",
    "Spark Hadoop",
    "Airflow ETL",
    "Ansible automatisation",
    "Big Data Paris",
    "Raouf Warnier",
  ],
  openGraph: {
    title: "Raouf Warnier | Data Engineer & DevOps Freelance",
    description:
      "Data Engineer & DevOps avec 3+ ans d'expérience. Pipelines Big Data, automatisation et infrastructure cloud.",
    url: "https://raouf-warnier.dev",
    siteName: "Raouf Warnier Portfolio",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Raouf Warnier - Data Engineer & DevOps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raouf Warnier | Data Engineer & DevOps",
    description: "Pipelines Big Data, automatisation Ansible, CI/CD.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <AnalyticsTracker />
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
                  className="hidden text-zinc-300 transition hover:text-white md:block relative"
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
