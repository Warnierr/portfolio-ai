<template>
  <div class="homepage">
    <!-- Section Hero -->
    <HeroSection />
    
    <!-- Section À propos -->
    <AboutSection />
    
    <!-- Section Projets -->
    <ProjectsSection />
    
    <!-- Section Services -->
    <ServicesSection />
    
    <!-- Section Témoignages 3D -->
    <TestimonialsCarousel />
    
    <!-- Section Blog -->
    <BlogSection />
    
    <!-- Section Nina Profile -->
    <NinaProfile />
    
    <!-- Section Roadmap -->
    <RoadmapSection />
    
    <!-- Hub Networking -->
    <NetworkingHub />
    
    <!-- Section Contact -->
    <ContactSection />
    
    <!-- Section Liens Sociaux (optionnelle avant footer) -->
    <section class="social-section">
      <div class="container">
        <SocialLinks 
          variant="inline" 
          title="Connectons-nous !" 
          subtitle="Rejoignez-moi sur ces plateformes pour suivre mes derniers projets et découvertes en IA"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Métadonnées SEO améliorées
useHead({
  title: 'Raouf WARNIER - Expert IA & Développeur Full-Stack | Portfolio',
  meta: [
    {
      name: 'description',
      content: 'Portfolio de Raouf WARNIER, expert en Intelligence Artificielle et développeur full-stack. Découvrez Nina AI, mes projets innovants et services en IA, Big Data et automatisation.'
    },
    {
      name: 'keywords',
      content: 'Raouf WARNIER, Nina AI, Intelligence Artificielle, développeur IA, machine learning, big data, automatisation, chatbot, portfolio développeur, consultant IA'
    },
    {
      property: 'og:title',
      content: 'Raouf WARNIER - Expert IA & Développeur Full-Stack'
    },
    {
      property: 'og:description',
      content: 'Expert en Intelligence Artificielle et développeur full-stack passionné. Créateur de Nina AI et spécialiste en solutions IA innovantes.'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:image',
      content: '/og-image.jpg'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'Raouf WARNIER - Expert IA & Développeur Full-Stack'
    },
    {
      name: 'twitter:description',
      content: 'Expert en Intelligence Artificielle et développeur full-stack passionné. Créateur de Nina AI et spécialiste en solutions IA innovantes.'
    },
    {
      name: 'twitter:image',
      content: '/og-image.jpg'
    },
    {
      name: 'author',
      content: 'Raouf WARNIER'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://portfolio-raouf.com'
    }
  ]
})

// Schema.org structuré
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Raouf WARNIER',
        jobTitle: 'Expert en Intelligence Artificielle et Développeur Full-Stack',
        description: 'Expert en Intelligence Artificielle et développeur full-stack passionné. Créateur de Nina AI et spécialiste en solutions IA innovantes.',
        url: 'https://portfolio-raouf.com',
        sameAs: [
          'https://linkedin.com/in/raouf-warnier',
          'https://github.com/RaoufWarnier',
          'https://twitter.com/RaoufWarnier'
        ],
        knowsAbout: [
          'Intelligence Artificielle',
          'Machine Learning',
          'Big Data',
          'Automatisation',
          'Développement Full-Stack',
          'Vue.js',
          'Nuxt.js',
          'Python',
          'JavaScript'
        ],
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Expert en Intelligence Artificielle'
        }
      })
    }
  ]
})
</script>

<style scoped>
.homepage {
  min-height: 100vh;
}

.social-section {
  padding: var(--space-32) 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(168, 85, 247, 0.03) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .social-section {
    padding: var(--space-20) 0;
  }
}
</style> 