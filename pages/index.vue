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
    
    <!-- Section Contact -->
    <ContactSection />
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
</style> 