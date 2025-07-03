<template>
  <div class="social-links" :class="variant">
    <div v-if="showTitle" class="social-title">
      <h3>{{ title }}</h3>
      <p v-if="subtitle">{{ subtitle }}</p>
    </div>
    
    <div class="social-grid">
      <!-- GitHub - Essentiel pour un dev -->
      <a 
        href="https://github.com/raouf-warnier" 
        target="_blank" 
        rel="noopener noreferrer"
        class="social-link github"
        aria-label="GitHub - Projets open source"
      >
        <div class="social-icon">
          <Icon name="mdi:github" />
        </div>
        <div v-if="showLabels" class="social-content">
          <span class="social-label">GitHub</span>
          <span class="social-desc">Projets & Code</span>
        </div>
        <div class="social-stats" v-if="showStats">
          <span>50+ repos</span>
        </div>
      </a>

      <!-- LinkedIn - Réseau professionnel -->
      <a 
        href="https://linkedin.com/in/raouf-warnier" 
        target="_blank" 
        rel="noopener noreferrer"
        class="social-link linkedin"
        aria-label="LinkedIn - Profil professionnel"
      >
        <div class="social-icon">
          <Icon name="mdi:linkedin" />
        </div>
        <div v-if="showLabels" class="social-content">
          <span class="social-label">LinkedIn</span>
          <span class="social-desc">Réseau Pro</span>
        </div>
        <div class="social-stats" v-if="showStats">
          <span>500+ contacts</span>
        </div>
      </a>

      <!-- Hugging Face - IA/ML Community -->
      <a 
        href="https://huggingface.co/raouf-warnier" 
        target="_blank" 
        rel="noopener noreferrer"
        class="social-link huggingface"
        aria-label="Hugging Face - Modèles IA"
      >
        <div class="social-icon">
          <Icon name="mdi:robot-outline" />
        </div>
        <div v-if="showLabels" class="social-content">
          <span class="social-label">Hugging Face</span>
          <span class="social-desc">Modèles IA</span>
        </div>
        <div class="social-stats" v-if="showStats">
          <span>Nina AI</span>
        </div>
      </a>

      <!-- Kaggle - Data Science -->
      <a 
        href="https://kaggle.com/raouwarnier" 
        target="_blank" 
        rel="noopener noreferrer"
        class="social-link kaggle"
        aria-label="Kaggle - Compétitions Data Science"
      >
        <div class="social-icon">
          <Icon name="mdi:chart-line" />
        </div>
        <div v-if="showLabels" class="social-content">
          <span class="social-label">Kaggle</span>
          <span class="social-desc">Data Science</span>
        </div>
        <div class="social-stats" v-if="showStats">
          <span>Expert</span>
        </div>
      </a>

      <!-- Medium/Dev.to - Blog Tech -->
      <a 
        href="https://medium.com/@raouf-warnier" 
        target="_blank" 
        rel="noopener noreferrer"
        class="social-link medium"
        aria-label="Medium - Articles techniques"
      >
        <div class="social-icon">
          <Icon name="mdi:post-outline" />
        </div>
        <div v-if="showLabels" class="social-content">
          <span class="social-label">Medium</span>
          <span class="social-desc">Blog Tech</span>
        </div>
        <div class="social-stats" v-if="showStats">
          <span>Articles IA</span>
        </div>
      </a>

      <!-- Twitter/X - Veille Tech -->
      <a 
        href="https://twitter.com/raouf_warnier" 
        target="_blank" 
        rel="noopener noreferrer"
        class="social-link twitter"
        aria-label="Twitter - Veille technologique"
      >
        <div class="social-icon">
          <Icon name="mdi:twitter" />
        </div>
        <div v-if="showLabels" class="social-content">
          <span class="social-label">Twitter</span>
          <span class="social-desc">Veille Tech</span>
        </div>
        <div class="social-stats" v-if="showStats">
          <span>@raouf_warnier</span>
        </div>
      </a>

      <!-- Email Direct -->
      <a 
        href="mailto:raouf.warnier@exemple.com" 
        class="social-link email"
        aria-label="Email direct"
      >
        <div class="social-icon">
          <Icon name="mdi:email-outline" />
        </div>
        <div v-if="showLabels" class="social-content">
          <span class="social-label">Email</span>
          <span class="social-desc">Contact Direct</span>
        </div>
        <div class="social-stats" v-if="showStats">
          <span>24h response</span>
        </div>
      </a>

      <!-- CV Download -->
      <a 
        href="/cv-raouf-warnier.pdf" 
        download
        class="social-link cv"
        aria-label="Télécharger le CV"
      >
        <div class="social-icon">
          <Icon name="mdi:download" />
        </div>
        <div v-if="showLabels" class="social-content">
          <span class="social-label">CV</span>
          <span class="social-desc">Télécharger</span>
        </div>
        <div class="social-stats" v-if="showStats">
          <span>PDF</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'header' | 'footer' | 'inline'
  showTitle?: boolean
  showLabels?: boolean
  showStats?: boolean
  title?: string
  subtitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'footer',
  showTitle: true,
  showLabels: true,
  showStats: true,
  title: 'Restons connectés',
  subtitle: 'Suivez mon parcours et mes projets sur ces plateformes'
})

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  // Animation d'entrée des liens sociaux
  $gsap.gsap.from('.social-link', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.social-links',
      start: 'top 80%'
    }
  })
})
</script>

<style scoped>
.social-links {
  width: 100%;
}

.social-title {
  text-align: center;
  margin-bottom: var(--space-8);
}

.social-title h3 {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.social-title p {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

/* Variants */
.social-links.header .social-grid {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.social-links.header .social-link {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  transition: all var(--transition-base);
}

.social-links.header .social-link:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.2);
}

.social-links.footer .social-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.social-links.inline .social-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
}

/* Liens sociaux */
.social-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: var(--text-primary);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.social-link:hover::before {
  left: 100%;
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  font-size: 24px;
  flex-shrink: 0;
}

.social-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.social-label {
  font-weight: 600;
  font-size: var(--text-base);
  color: var(--text-primary);
}

.social-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.social-stats {
  font-size: var(--text-xs);
  color: var(--accent-primary);
  font-weight: 500;
  background: rgba(99, 102, 241, 0.1);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

/* Couleurs spécifiques par plateforme */
.social-link.github .social-icon {
  background: linear-gradient(135deg, #333 0%, #24292e 100%);
  color: white;
}

.social-link.linkedin .social-icon {
  background: linear-gradient(135deg, #0077b5 0%, #0066a0 100%);
  color: white;
}

.social-link.huggingface .social-icon {
  background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
  color: white;
}

.social-link.kaggle .social-icon {
  background: linear-gradient(135deg, #20beff 0%, #1a94d6 100%);
  color: white;
}

.social-link.medium .social-icon {
  background: linear-gradient(135deg, #00ab6c 0%, #008a5a 100%);
  color: white;
}

.social-link.twitter .social-icon {
  background: linear-gradient(135deg, #1da1f2 0%, #0d8bd9 100%);
  color: white;
}

.social-link.email .social-icon {
  background: linear-gradient(135deg, #ea4335 0%, #d33b2c 100%);
  color: white;
}

.social-link.cv .social-icon {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
}

/* Responsive */
@media (max-width: 768px) {
  .social-links.footer .social-grid {
    grid-template-columns: 1fr;
  }
  
  .social-links.header .social-grid {
    gap: var(--space-2);
  }
  
  .social-links.header .social-link {
    width: 36px;
    height: 36px;
  }
}

/* Animations hover spéciales */
.social-link.github:hover {
  border-color: #333;
  box-shadow: 0 8px 25px rgba(51, 51, 51, 0.3);
}

.social-link.linkedin:hover {
  border-color: #0077b5;
  box-shadow: 0 8px 25px rgba(0, 119, 181, 0.3);
}

.social-link.huggingface:hover {
  border-color: #ff6b35;
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
}

.social-link.kaggle:hover {
  border-color: #20beff;
  box-shadow: 0 8px 25px rgba(32, 190, 255, 0.3);
}

.social-link.medium:hover {
  border-color: #00ab6c;
  box-shadow: 0 8px 25px rgba(0, 171, 108, 0.3);
}

.social-link.twitter:hover {
  border-color: #1da1f2;
  box-shadow: 0 8px 25px rgba(29, 161, 242, 0.3);
}

.social-link.email:hover {
  border-color: #ea4335;
  box-shadow: 0 8px 25px rgba(234, 67, 53, 0.3);
}

.social-link.cv:hover {
  border-color: #6366f1;
  box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
}
</style> 