export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  image?: string;
  rating: 5;
  content: string;
  project: string;
  date: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-bnp-1",
    name: "Laurent D.",
    role: "Lead Data Engineer",
    company: "BNP Paribas",
    rating: 5,
    content:
      "Raouf a su migrer un pipeline ETL complexe de 15 ans d'ancienneté vers une architecture Spark moderne en 3 mois. Son expertise technique et sa rigueur ont permis une migration sans régression. Un vrai professionnel.",
    project: "Migration ETL Legacy → Spark",
    date: "2024-06-15",
  },
  {
    id: "testimonial-orange-1",
    name: "Sophie M.",
    role: "DevOps Manager",
    company: "Orange",
    rating: 5,
    content:
      "L'automatisation complète du déploiement de notre plateforme Big Data avec Ansible a réduit nos temps de déploiement de 80%. Raouf a livré une solution robuste et documentée qui est encore utilisée aujourd'hui.",
    project: "Automatisation DevOps Big Data",
    date: "2023-11-20",
  },
  {
    id: "testimonial-safran-1",
    name: "Marc B.",
    role: "Head of IoT",
    company: "Safran",
    rating: 5,
    content:
      "La migration de notre plateforme IoT avec plus de 500M de points de données s'est déroulée sans interruption de service. Raouf a coordonné l'ensemble du projet avec une expertise remarquable.",
    project: "Plateforme IoT & Migration Database",
    date: "2023-03-10",
  },
];

/**
 * Génère le Schema.org JSON-LD pour les reviews
 */
export function generateReviewSchema() {
  return testimonials.map((testimonial) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: testimonial.name,
    },
    datePublished: testimonial.date,
    reviewBody: testimonial.content,
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
    },
  }));
}
