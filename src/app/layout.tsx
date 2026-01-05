import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import PageTransition from "@/components/PageTransition";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import MobileMenu from "@/components/MobileMenu";
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
  title: "Raouf Warnier | Data Engineering & Product Development",
  description:
    "Data Engineering & Product Development. Systèmes data end-to-end : pipelines ETL, plateformes analytics et applications SaaS. Disponible en France et remote.",
  metadataBase: new URL("https://kenshu-dev.vercel.app"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Data Engineering",
    "Data Product Development",
    "Data Engineer freelance",
    "Data Platform",
    "Data Pipelines",
    "ETL Spark Airflow",
    "SaaS Data Products",
    "Freelance Data France",
    "Raouf Warnier",
  ],
  openGraph: {
    title: "Raouf Warnier | Data Engineering & Product Development",
    description:
      "Data Engineering & Product Development. Systèmes data end-to-end : pipelines, plateformes et applications SaaS.",
    url: "https://kenshu-dev.vercel.app",
    siteName: "Raouf Warnier - Data Engineering",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Raouf Warnier - Ingénieur Produit Data",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raouf Warnier | Ingénieur Produit Data",
    description: "Systèmes data end-to-end : pipelines, plateformes et applications SaaS.",
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
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-zinc-300 transition hover:text-white relative"
                  >
                    {item.label}
                    {item.badge && (
                      <span className="absolute -top-1 -right-2 text-[9px] uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
                <a
                  href="/cv-raouf-warnier.pdf"
                  download
                  className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-emerald-300 transition hover:bg-emerald-500/20"
                >
                  <span>📄</span>
                  <span className="text-xs font-medium">CV</span>
                </a>
              </nav>
              <MobileMenu navItems={navItems} />
            </div>
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
              <p>© 2025 — Data Engineering & Product Development</p>
            </div>
          </div>
        </footer>
        
        {/* Schema.org JSON-LD pour SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Raouf Warnier",
              jobTitle: "Data Engineer & Product Developer",
              description: "Data Engineering & Product Development avec 3+ ans d'expérience. Spécialisé en pipelines data, plateformes analytics, DevOps et applications SaaS.",
              url: "https://kenshu-dev.vercel.app",
              email: "contact@kenshu-dev.vercel.app",
              telephone: "+33749416355",
              address: {
                "@type": "PostalAddress",
                addressCountry: "FR",
                addressLocality: "France"
              },
              alumniOf: {
                "@type": "Organization",
                name: "ESIEE Paris",
                sameAs: "https://www.esiee.fr"
              },
              knowsAbout: [
                "Data Engineering",
                "DevOps",
                "Big Data",
                "Apache Spark",
                "Python",
                "Scala",
                "Jenkins",
                "Airflow",
                "Ansible",
                "Cloud Computing"
              ],
              worksFor: [
                {
                  "@type": "Organization",
                  name: "BNP Paribas"
                },
                {
                  "@type": "Organization",
                  name: "Orange"
                },
                {
                  "@type": "Organization",
                  name: "Safran"
                }
              ],
              sameAs: [
                "https://www.linkedin.com/in/raouf-warnier",
                "https://github.com/raouf-warnier"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
