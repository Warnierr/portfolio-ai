import Script from "next/script";

type StructuredDataProps = {
  type: "person" | "article" | "faq" | "breadcrumb";
  data: Record<string, unknown>;
};

export default function StructuredData({ type, data }: StructuredDataProps) {
  const schemas = {
    person: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Raouf Warnier",
      jobTitle: "Data Engineer Freelance",
      description: "Expert Data Engineering, AI Product Builder & DevOps. Pipelines Big Data, applications IA, audit AI Act & RGPD.",
      url: "https://kenshu.dev",
      image: "https://kenshu.dev/og-image.png",
      sameAs: [
        "https://github.com/Warnierr",
        "https://linkedin.com/in/raouf-warnier"
      ],
      email: "contact@kenshu.dev",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Paris",
        addressCountry: "FR"
      },
      knowsAbout: [
        "Data Engineering",
        "Apache Spark",
        "Apache Airflow",
        "Big Data",
        "DevOps",
        "Python",
        "Scala",
        "AI Act",
        "RGPD",
        "DataOps"
      ],
      ...data,
    },
    article: {
      "@context": "https://schema.org",
      "@type": "Article",
      ...data,
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      ...data,
    },
    breadcrumb: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      ...data,
    },
  };

  const schema = schemas[type];

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
}
