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
    
    <!-- Section Témoignages -->
    <TestimonialsSection />
    
    <!-- Section Blog -->
    <BlogSection />
    
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
// Métadonnées SEO
useHead({
  title: 'Portfolio - Développeur & Designer Créatif',
  meta: [
    {
      name: 'description',
      content: 'Découvrez le portfolio d\'un développeur créatif spécialisé en développement web moderne, design UI/UX et création d\'expériences utilisateur innovantes.'
    },
    {
      property: 'og:title',
      content: 'Portfolio - Développeur & Designer Créatif'
    },
    {
      property: 'og:description',
      content: 'Développeur passionné créant des expériences web exceptionnelles avec les dernières technologies.'
    },
    {
      property: 'og:type',
      content: 'website'
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