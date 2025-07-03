<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- Logo et description -->
        <div class="footer-brand">
          <h3 class="footer-logo text-gradient">Portfolio</h3>
          <p class="footer-description">
            Développeur créatif passionné par la création d'expériences web innovantes et performantes.
          </p>
        </div>

        <!-- Navigation rapide -->
        <div class="footer-nav">
          <h4 class="footer-title">Navigation</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/" class="footer-link">Accueil</NuxtLink></li>
            <li><NuxtLink to="/#about" class="footer-link" @click="scrollToSection('about')">À propos</NuxtLink></li>
            <li><NuxtLink to="/#projects" class="footer-link" @click="scrollToSection('projects')">Projets</NuxtLink></li>
            <li><NuxtLink to="/#services" class="footer-link" @click="scrollToSection('services')">Services</NuxtLink></li>
            <li><NuxtLink to="/#contact" class="footer-link" @click="scrollToSection('contact')">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-services">
          <h4 class="footer-title">Services</h4>
          <ul class="footer-links">
            <li><span class="footer-link">Développement Web</span></li>
            <li><span class="footer-link">Design UI/UX</span></li>
            <li><span class="footer-link">Applications Mobiles</span></li>
            <li><span class="footer-link">E-commerce</span></li>
            <li><span class="footer-link">Consulting</span></li>
          </ul>
        </div>


      </div>

      <!-- Liens sociaux avancés -->
      <div class="footer-social-section">
        <SocialLinks variant="footer" />
      </div>

      <!-- Séparateur -->
      <div class="footer-divider"></div>

      <!-- Copyright -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} Portfolio. Tous droits réservés.
        </p>
        <p class="footer-tech">
          Développé avec ❤️ en utilisant Nuxt.js & GSAP
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { $lenis } = useNuxtApp()

// Année actuelle
const currentYear = new Date().getFullYear()

const scrollToSection = (sectionId: string) => {
  if ($lenis) {
    $lenis.scrollToElement(`#${sectionId}`, {
      offset: -80,
      duration: 1.5
    })
  }
}
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  padding: var(--space-20) 0 var(--space-8);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: var(--space-32);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-12);
  margin-bottom: var(--space-16);
}

.footer-brand {
  max-width: 300px;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.footer-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.footer-title {
  color: var(--text-primary);
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-6);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: var(--space-3);
}

.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary);
  transform: translateX(5px);
}

.footer-social-section {
  margin: var(--space-16) 0;
  padding: var(--space-8);
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-links {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
  color: var(--text-secondary);
  text-decoration: none;
  transition: var(--transition-fast);
}

.social-link:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
}

.footer-shop {
  margin-top: var(--space-4);
}

.footer-shop .btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
}

.footer-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  margin: var(--space-12) 0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.footer-copyright,
.footer-tech {
  color: var(--text-muted);
  font-size: var(--text-sm);
  margin: 0;
}

.footer-tech {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

/* Responsive */
@media (max-width: 768px) {
  .footer {
    padding: var(--space-16) 0 var(--space-6);
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .footer-brand {
    max-width: 100%;
  }
  
  .social-links {
    flex-wrap: wrap;
  }
}
</style> 