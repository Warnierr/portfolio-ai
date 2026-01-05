import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
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
  highlighted?: boolean;
};

const navItems: NavItem[] = [
  { label: "Projets", href: "/projets" },
  { label: "Services", href: "/services" },
  { label: "Méthode", href: "/methode" },
  { label: "Kenshu IA 🤖", href: "/agent" },
  { label: "Contact", href: "/contact", highlighted: true },
];

export const metadata: Metadata = {
  title: "Raouf Warnier | Data Engineering - AI Product Builder - DevOps | Freelance",
  description:
    "Expert Data Engineering, AI Product Builder & DevOps. Pipelines Big Data, applications IA, audit AI Act & RGPD. TJM 450€. Disponible immédiatement en France et remote.",
  metadataBase: new URL("https://kenshu.dev"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Raouf Warnier", url: "https://kenshu.dev" }],
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
    
    // Mots-clés 2026
    "industrialisation IA souveraineté",
    "pipeline data on-premise france",
    "freelance dataops remote europe",
    "chatbot RAG LLM production",
    "optimisation coûts cloud aws azure",
    "n8n automation expert",
    "Modern Data Stack consultant",
    "Data Mesh architecture",
    
    // AI Act & Compliance 2026-2027
    "ai act audit",
    "conformité rgpd freelance",
    "audit ia europe",
    "ai compliance engineer",
    "gpai obligations france",
    "ai act readiness 2026",
    "audit systèmes ia",
    
    // Nom
    "Raouf Warnier",
  ],
  openGraph: {
    title: "Raouf Warnier | Data Engineering - AI Product Builder - DevOps",
    description:
      "Expert Data Engineering, AI & DevOps. Pipelines Big Data, applications IA, plateformes SaaS. TJM 450€. Disponible immédiatement.",
    url: "https://kenshu.dev",
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
    images: ["https://kenshu.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

// Objectifs Core Web Vitals 2026: LCP <2.5s, FID <100ms, CLS <0.1
// Monitoring: @vercel/speed-insights + @vercel/analytics

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ID Google Analytics 4 (remplace par ton vrai ID)
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

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
              url: "https://kenshu.dev",
              email: "rww.warnier@gmail.com",
              telephone: "+33749416355",
              image: "https://kenshu.dev/og-image.png",
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
                "SaaS Development",
                "AI Compliance & RGPD Auditing"
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
              url: "https://kenshu.dev",
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
        
        {/* Schema.org JSON-LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Kenshu Dev",
              url: "https://kenshu.dev",
              logo: "https://kenshu.dev/og-image.png",
              sameAs: [
                "https://www.linkedin.com/in/raouf-warnier",
                "https://github.com/raouf-warnier"
              ],
              founder: {
                "@type": "Person",
                name: "Raouf Warnier"
              },
              description: "Expertise Data Engineering, AI Product Building et DevOps pour entreprises tech et grands comptes"
            })
          }}
        />
        
        {/* Schema.org JSON-LD FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Quel est le TJM d'un Data Engineer freelance en 2026 ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "450€ pour un profil senior avec expertise DataOps/IA et expérience en environnements critiques (Banque, Telecom, Industrie)."
                  }
                },
                {
                  "@type": "Question",
                  name: "Comment réduire les coûts cloud de 75% ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Via souveraineté on-premise avec des outils comme n8n, Python, Airflow et une infrastructure optimisée. L'industrialisation DataOps permet de maîtriser les coûts tout en garantissant fiabilité et scalabilité."
                  }
                },
                {
                  "@type": "Question",
                  name: "Qu'est-ce que l'industrialisation DataOps ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "L'industrialisation DataOps transforme des flux de données instables en pipelines automatisés, fiables et scalables. Cela inclut l'automatisation à 100%, le monitoring, l'alerting et la garantie de qualité des données."
                  }
                },
                {
                  "@type": "Question",
                  name: "Comment industrialiser un agent LLM en production ?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Via une architecture RAG structurée, des pipelines DataOps robustes, du monitoring temps réel et une infrastructure souveraine. 80% des agents LLM échouent sans approche DataOps structurée."
                  }
                }
              ]
            })
          }}
        />
        
        {/* Schema.org JSON-LD SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "AI Compliance Audit Tool",
              applicationCategory: "BusinessApplication",
              description: "Outil d'audit et de conformité pour systèmes d'IA selon AI Act EU et RGPD. Classification des risques, checklists réglementaires et rapports automatisés.",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR"
              },
              author: {
                "@type": "Person",
                name: "Raouf Warnier",
                url: "https://kenshu.dev"
              }
            })
          }}
        />
        
        {/* Schema.org JSON-LD BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Accueil",
                  item: "https://kenshu.dev"
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Méthode",
                  item: "https://kenshu.dev/methode"
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Projets",
                  item: "https://kenshu.dev/projets"
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Services",
                  item: "https://kenshu.dev/services"
                },
                {
                  "@type": "ListItem",
                  position: 5,
                  name: "Contact",
                  item: "https://kenshu.dev/contact"
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
