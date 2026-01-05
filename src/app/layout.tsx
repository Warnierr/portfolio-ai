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
  title: "Raouf Warnier | Data Engineering - AI Product Builder - DevOps | Freelance",
  description:
    "Expert Data Engineering, AI Product Builder & DevOps Automation. Pipelines Big Data (Spark, Airflow), applications IA, plateformes SaaS. TJM 450€. Disponible immédiatement en France et remote.",
  metadataBase: new URL("https://kenshu-dev.vercel.app"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Raouf Warnier", url: "https://kenshu-dev.vercel.app" }],
  creator: "Raouf Warnier",
  publisher: "Raouf Warnier",
  keywords: [
    // Mots-clés primaires (high volume)
    "Data Engineer freelance",
    "Data Engineering France",
    "Ingénieur Data freelance Paris",
    
    // Spécialités techniques
    "Apache Spark développeur",
    "Airflow ETL expert",
    "Big Data consultant",
    "DevOps Automation",
    "Ansible expert",
    
    // Services & Solutions
    "Pipeline Big Data",
    "Plateforme Data Analytics",
    "Application IA sur-mesure",
    "Migration ETL",
    "Automatisation Data",
    
    // AI & Product
    "AI Product Builder",
    "Développeur IA freelance",
    "SaaS Data Products",
    "Chatbot IA entreprise",
    
    // Longue traîne SEO
    "Data Engineer Spark Scala",
    "Consultant Big Data BNP Paribas Orange Safran",
    "Freelance Data Engineering remote",
    "TJM Data Engineer 450",
    
    // Nom
    "Raouf Warnier",
  ],
  openGraph: {
    title: "Raouf Warnier | Data Engineering - AI Product Builder - DevOps",
    description:
      "Expert Data Engineering, AI & DevOps. Pipelines Big Data, applications IA, plateformes SaaS. TJM 450€. Disponible immédiatement.",
    url: "https://kenshu-dev.vercel.app",
    siteName: "Raouf Warnier - Data Engineering & AI",
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
        
        {/* Schema.org JSON-LD Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Raouf Warnier",
              jobTitle: "Data Engineer, AI Product Builder, DevOps Specialist",
              description: "Expert Data Engineering, AI Product Builder & DevOps Automation avec 3+ ans d'expérience. Spécialisé en pipelines Big Data (Spark, Airflow), applications IA, plateformes SaaS et automatisation.",
              url: "https://kenshu-dev.vercel.app",
              email: "rww.warnier@gmail.com",
              telephone: "+33749416355",
              image: "https://kenshu-dev.vercel.app/og-image.png",
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
                "Artificial Intelligence",
                "Machine Learning",
                "DevOps",
                "Big Data",
                "Apache Spark",
                "Apache Airflow",
                "Python",
                "Scala",
                "Jenkins",
                "Ansible",
                "Docker",
                "Kubernetes",
                "PostgreSQL",
                "MSSQL",
                "Cloud Computing",
                "ETL Development",
                "Data Pipelines",
                "Data Platforms",
                "SaaS Development"
              ],
              hasOccupation: {
                "@type": "Occupation",
                name: "Data Engineer",
                occupationalCategory: "15-1254.00",
                estimatedSalary: {
                  "@type": "MonetaryAmount",
                  currency: "EUR",
                  value: {
                    "@type": "QuantitativeValue",
                    value: 450,
                    unitText: "DAY"
                  }
                }
              },
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
        
        {/* Schema.org JSON-LD ProfessionalService */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "Raouf Warnier - Data Engineering & AI Services",
              description: "Services de Data Engineering, développement d'applications IA et automatisation DevOps. Pipelines Big Data, plateformes analytics, applications SaaS sur-mesure.",
              url: "https://kenshu-dev.vercel.app",
              telephone: "+33749416355",
              email: "rww.warnier@gmail.com",
              priceRange: "450€/jour",
              address: {
                "@type": "PostalAddress",
                addressCountry: "FR"
              },
              areaServed: {
                "@type": "Country",
                name: "France"
              },
              availableLanguage: ["French", "English"],
              serviceType: [
                "Data Engineering",
                "AI Product Development",
                "DevOps Automation",
                "Big Data Consulting",
                "ETL Development",
                "Data Platform Architecture"
              ],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Services Data & IA",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Data Engineering & Pipelines",
                      description: "Conception et industrialisation de pipelines ETL/ELT, migration vers architectures modernes"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI Product Building",
                      description: "Développement d'applications IA sur-mesure, chatbots, assistants intelligents"
                    }
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "DevOps & Automation",
                      description: "CI/CD, monitoring, automatisation des déploiements Big Data"
                    }
                  }
                ]
              }
            })
          }}
        />
      </body>
    </html>
  );
}
