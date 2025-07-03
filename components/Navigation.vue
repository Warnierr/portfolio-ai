<template>
  <nav class="nav">
    <div class="container nav-container">
      <!-- Logo -->
      <NuxtLink to="/" class="nav-logo">
        <span class="text-gradient">Portfolio</span>
      </NuxtLink>

      <!-- Menu desktop -->
      <ul class="nav-menu hidden md:flex">
        <li><NuxtLink to="/" class="nav-link" :class="{ active: $route.path === '/' }">Accueil</NuxtLink></li>
        <li><NuxtLink to="/#about" class="nav-link" @click="scrollToSection('about')">À propos</NuxtLink></li>
        <li><NuxtLink to="/#projects" class="nav-link" @click="scrollToSection('projects')">Projets</NuxtLink></li>
        <li><NuxtLink to="/#services" class="nav-link" @click="scrollToSection('services')">Services</NuxtLink></li>
        <li><NuxtLink to="/blog" class="nav-link" :class="{ active: $route.path.startsWith('/blog') }">Blog</NuxtLink></li>
        <li><NuxtLink to="/#contact" class="nav-link" @click="scrollToSection('contact')">Contact</NuxtLink></li>
      </ul>

      <!-- Liens sociaux + CTA -->
      <div class="nav-actions hidden md:flex">
        <SocialLinks 
          variant="header" 
          :show-title="false" 
          :show-labels="false" 
          :show-stats="false"
        />
        <NuxtLink to="/#contact" class="btn btn-primary" @click="scrollToSection('contact')">
          Travaillons ensemble
        </NuxtLink>
      </div>

      <!-- Burger menu mobile -->
      <button 
        class="burger-menu md:hidden"
        :class="{ active: isMobileMenuOpen }"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Menu mobile -->
    <div class="mobile-menu" :class="{ active: isMobileMenuOpen }">
      <div class="mobile-menu-content">
        <ul class="mobile-nav-menu">
          <li><NuxtLink to="/" class="mobile-nav-link" @click="closeMobileMenu">Accueil</NuxtLink></li>
          <li><NuxtLink to="/#about" class="mobile-nav-link" @click="scrollToSection('about'); closeMobileMenu()">À propos</NuxtLink></li>
          <li><NuxtLink to="/#projects" class="mobile-nav-link" @click="scrollToSection('projects'); closeMobileMenu()">Projets</NuxtLink></li>
          <li><NuxtLink to="/#services" class="mobile-nav-link" @click="scrollToSection('services'); closeMobileMenu()">Services</NuxtLink></li>
          <li><NuxtLink to="/blog" class="mobile-nav-link" @click="closeMobileMenu">Blog</NuxtLink></li>
          <li><NuxtLink to="/#contact" class="mobile-nav-link" @click="scrollToSection('contact'); closeMobileMenu()">Contact</NuxtLink></li>
        </ul>
        
        <!-- Liens sociaux mobile -->
        <div class="mobile-social">
          <SocialLinks 
            variant="inline" 
            :show-title="false" 
            :show-labels="false" 
            :show-stats="false"
          />
        </div>
        
        <div class="mobile-cta">
          <NuxtLink to="/#contact" class="btn btn-primary" @click="scrollToSection('contact'); closeMobileMenu()">
            Travaillons ensemble
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)
const { $lenis } = useNuxtApp()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const scrollToSection = (sectionId: string) => {
  if ($lenis) {
    $lenis.scrollToElement(`#${sectionId}`, {
      offset: -80,
      duration: 1.5
    })
  }
}

// Fermer le menu mobile lors du clic à l'extérieur
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.nav') && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-fixed);
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: var(--transition-fast);
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
}

.nav-logo {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: var(--space-8);
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition-fast);
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-primary);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-primary);
  transition: var(--transition-fast);
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

/* Actions navigation */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

/* Liens sociaux mobile */
.mobile-social {
  padding: var(--space-4) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin: var(--space-4) 0;
}

/* Burger menu */
.burger-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
}

.burger-menu span {
  width: 25px;
  height: 2px;
  background: var(--text-primary);
  transition: var(--transition-fast);
  transform-origin: center;
}

.burger-menu.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.burger-menu.active span:nth-child(2) {
  opacity: 0;
}

.burger-menu.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Menu mobile */
.mobile-menu {
  position: fixed;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--bg-primary);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  transform: translateY(-100%);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
  z-index: var(--z-dropdown);
}

.mobile-menu.active {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-menu-content {
  padding: var(--space-8) var(--space-6);
}

.mobile-nav-menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav-menu li {
  margin-bottom: var(--space-4);
}

.mobile-nav-link {
  display: block;
  color: var(--text-primary);
  font-size: var(--text-lg);
  font-weight: 500;
  text-decoration: none;
  padding: var(--space-3) 0;
  transition: var(--transition-fast);
}

.mobile-nav-link:hover {
  color: var(--color-primary);
  transform: translateX(10px);
}

.mobile-cta {
  margin-top: var(--space-8);
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-container {
    padding: var(--space-3) var(--space-4);
  }
  
  .nav-logo {
    font-size: var(--text-lg);
  }
}

/* Utilitaires responsive */
.hidden {
  display: none;
}

@media (min-width: 768px) {
  .md\:flex {
    display: flex;
  }
  
  .md\:block {
    display: block;
  }
  
  .md\:hidden {
    display: none;
  }
}
</style> 