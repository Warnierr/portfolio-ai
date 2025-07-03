<template>
  <section id="contact" class="contact-section" data-contact>
    <div class="container">
      <!-- En-tête de section -->
      <div class="section-header" ref="sectionHeader">
        <span class="section-badge">Contact</span>
        <h2 class="section-title">
          Discutons de votre 
          <span class="text-gradient">projet</span>
        </h2>
        <p class="section-description">
          Que ce soit pour collaborer sur des projets IA innovants, 
          développer des solutions techniques ou simplement échanger 
          sur les dernières avancées technologiques.
        </p>
      </div>

      <div class="contact-content">
        <!-- Formulaire de contact -->
        <div class="contact-form-container" ref="contactForm">
          <div class="form-header">
            <h3>Envoyez-moi un message</h3>
            <p>Je réponds généralement sous 24h</p>
          </div>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name">Nom complet</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name"
                required
                placeholder="Votre nom et prénom"
              >
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email"
                required
                placeholder="votre.email@exemple.com"
              >
            </div>

            <div class="form-group">
              <label for="company">Entreprise / Projet</label>
              <input 
                type="text" 
                id="company" 
                v-model="form.company"
                placeholder="Nom de votre entreprise ou projet (optionnel)"
              >
            </div>

            <div class="form-group">
              <label for="subject">Sujet</label>
              <select id="subject" v-model="form.subject" required>
                <option value="">Sélectionnez un sujet</option>
                <option value="ai-project">Projet IA / Nina AI</option>
                <option value="data-engineering">Ingénierie de données</option>
                <option value="devops">DevOps & Automatisation</option>
                <option value="web-development">Développement web</option>
                <option value="consultation">Consultation technique</option>
                <option value="collaboration">Collaboration</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea 
                id="message" 
                v-model="form.message"
                required
                rows="6"
                placeholder="Décrivez votre projet, vos besoins ou votre idée..."
              ></textarea>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <Icon name="mdi:send" />
              <span v-if="!isSubmitting">Envoyer le message</span>
              <span v-else>Envoi en cours...</span>
            </button>
          </form>

          <!-- Notification -->
          <Transition name="notification">
            <div v-if="notification.show" class="notification" :class="notification.type">
              <div class="notification-content">
                <span class="notification-message">{{ notification.message }}</span>
                <button @click="closeNotification" class="notification-close">
                  <Icon name="mdi:close" />
                </button>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Informations de contact -->
        <div class="contact-info" ref="contactInfo">
          <!-- Contact direct -->
          <div class="contact-card">
            <div class="card-icon">
              <Icon name="mdi:email-outline" />
            </div>
            <h4>Email</h4>
            <p>@raouf-warnier</p>
            <a href="mailto:raouf.warnier@exemple.com" class="contact-link">
              Envoyer un email
            </a>
          </div>

          <!-- Localisation -->
          <div class="contact-card">
            <div class="card-icon">
              <Icon name="mdi:map-marker-outline" />
            </div>
            <h4>Localisation</h4>
            <p>Paris, France</p>
            <p class="availability">Disponible pour missions</p>
          </div>

          <!-- Projets actuels -->
          <div class="contact-card highlight">
            <div class="card-icon">
              <Icon name="mdi:robot-outline" />
            </div>
            <h4>Projet actuel</h4>
            <p><strong>Nina AI</strong></p>
            <p>Agent IA intelligent en développement</p>
            <a href="#" class="contact-link">
              En savoir plus
            </a>
          </div>
        </div>
      </div>

      <!-- Liens sociaux et professionnels -->
      <div class="social-links" ref="socialLinks">
        <h3>Retrouvez-moi sur</h3>
        <div class="links-grid">
          <a href="https://github.com/@raouf-warnier" target="_blank" class="social-link github">
            <Icon name="mdi:github" />
            <div class="link-content">
              <span class="link-title">GitHub</span>
              <span class="link-desc">Mes projets open source</span>
            </div>
          </a>

          <a href="https://linkedin.com/in/@raouf-warnier" target="_blank" class="social-link linkedin">
            <Icon name="mdi:linkedin" />
            <div class="link-content">
              <span class="link-title">LinkedIn</span>
              <span class="link-desc">Réseau professionnel</span>
            </div>
          </a>

          <a href="#" target="_blank" class="social-link ecommerce">
            <Icon name="mdi:shopping-outline" />
            <div class="link-content">
              <span class="link-title">Ma Boutique</span>
              <span class="link-desc">E-commerce en développement</span>
            </div>
          </a>

          <a href="#" target="_blank" class="social-link ai-project">
            <Icon name="mdi:brain" />
            <div class="link-content">
              <span class="link-title">Nina AI</span>
              <span class="link-desc">Agent IA intelligent</span>
            </div>
          </a>

          <a href="#" target="_blank" class="social-link blog">
            <Icon name="mdi:post-outline" />
            <div class="link-content">
              <span class="link-title">Blog Tech</span>
              <span class="link-desc">Articles & réflexions</span>
            </div>
          </a>

          <a href="mailto:raouf.warnier@exemple.com" class="social-link email">
            <Icon name="mdi:email-outline" />
            <div class="link-content">
              <span class="link-title">Email Direct</span>
              <span class="link-desc">Contact rapide</span>
            </div>
          </a>
        </div>
      </div>

      <!-- FAQ rapide -->
      <div class="faq-section" ref="faqSection">
        <h3>Questions fréquentes</h3>
        <div class="faq-grid">
          <div class="faq-item">
            <h4>
              <Icon name="mdi:help-circle-outline" />
              Quels types de projets vous intéressent ?
            </h4>
            <p>
              Principalement les projets liés à l'IA, l'ingénierie de données, 
              et l'automatisation. J'ai un intérêt particulier pour les agents IA 
              et les solutions innovantes.
            </p>
          </div>

          <div class="faq-item">
            <h4>
              <Icon name="mdi:clock-outline" />
              Quel est votre délai de réponse ?
            </h4>
            <p>
              Je réponds généralement sous 24h aux messages. Pour les projets urgents, 
              n'hésitez pas à le mentionner dans votre message.
            </p>
          </div>

          <div class="faq-item">
            <h4>
              <Icon name="mdi:handshake-outline" />
              Êtes-vous disponible pour du freelance ?
            </h4>
            <p>
              Je suis ouvert aux collaborations intéressantes, particulièrement 
              dans le domaine de l'IA. Contactez-moi pour discuter de votre projet.
            </p>
          </div>

          <div class="faq-item">
            <h4>
              <Icon name="mdi:lightbulb-outline" />
              Qu'est-ce que Nina AI ?
            </h4>
            <p>
              Nina AI est un agent intelligent que je développe actuellement. 
              C'est un projet passionnant qui combine plusieurs technologies IA avancées.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

const sectionHeader = ref()
const contactForm = ref()
const contactInfo = ref()
const socialLinks = ref()
const faqSection = ref()

const isSubmitting = ref(false)

// Formulaire réactif
const form = reactive({
  name: '',
  email: '',
  company: '',
  subject: '',
  message: ''
})

// État pour les notifications
const notification = reactive({
  show: false,
  type: 'success' as 'success' | 'error',
  message: ''
})

// Soumission du formulaire
const submitForm = async () => {
  isSubmitting.value = true
  
  try {
    // Utiliser l'API de fallback en développement si nodemailer n'est pas disponible
    const apiEndpoint = process.dev ? '/api/contact-fallback' : '/api/contact'
    
    const response = await $fetch<{ success: boolean; message: string }>(apiEndpoint, {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        company: form.company,
        subject: form.subject,
        message: form.message
      }
    })
    
    if (response.success) {
      // Réinitialiser le formulaire
      Object.assign(form, {
        name: '',
        email: '',
        company: '',
        subject: '',
        message: ''
      })
      
      // Notification de succès
      showNotification('success', '✅ Message envoyé avec succès ! Je vous répondrai sous 24h.')
      
      // Animation de succès
      const { $gsap } = useNuxtApp()
      if ($gsap) {
        $gsap.gsap.to('.contact-form', {
          scale: 1.02,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut'
        })
      }
    }
    
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi:', error)
    
    const errorMessage = error.data?.statusMessage || 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
    showNotification('error', `❌ ${errorMessage}`)
    
  } finally {
    isSubmitting.value = false
  }
}

// Gestion des notifications
const showNotification = (type: 'success' | 'error', message: string) => {
  notification.type = type
  notification.message = message
  notification.show = true
  
  // Masquer automatiquement après 5 secondes
  setTimeout(() => {
    notification.show = false
  }, 5000)
}

const closeNotification = () => {
  notification.show = false
}

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  // Animations d'entrée
  $gsap.gsap.from(sectionHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: sectionHeader.value,
      start: 'top 80%'
    }
  })

  $gsap.gsap.from(contactForm.value, {
    x: -50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: contactForm.value,
      start: 'top 80%'
    }
  })

  $gsap.gsap.from(contactInfo.value, {
    x: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: contactInfo.value,
      start: 'top 80%'
    }
  })

  $gsap.gsap.from('.social-link', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: socialLinks.value,
      start: 'top 80%'
    }
  })

  $gsap.gsap.from('.faq-item', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: faqSection.value,
      start: 'top 80%'
    }
  })
})
</script>

<style scoped>
.contact-section {
  padding: var(--space-32) 0;
  background: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-16);
}

.section-badge {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  color: var(--accent-primary);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin-bottom: var(--space-6);
  font-family: var(--font-heading);
}

.section-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Contact Content */
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  margin-bottom: var(--space-20);
}

/* Formulaire */
.contact-form-container {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
}

.form-header {
  margin-bottom: var(--space-8);
}

.form-header h3 {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.form-header p {
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: var(--text-base);
  transition: all var(--transition-base);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.contact-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  text-align: center;
  transition: all var(--transition-base);
}

.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.contact-card.highlight {
  border-color: var(--accent-primary);
  background: rgba(99, 102, 241, 0.05);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto var(--space-4);
  color: white;
  font-size: 24px;
}

.contact-card h4 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.contact-card p {
  color: var(--text-secondary);
  margin-bottom: var(--space-1);
}

.availability {
  color: var(--accent-primary) !important;
  font-weight: 500;
  font-size: var(--text-sm);
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: var(--text-sm);
  margin-top: var(--space-3);
  transition: all var(--transition-base);
}

.contact-link:hover {
  text-decoration: underline;
}

/* Liens sociaux */
.social-links {
  margin-bottom: var(--space-20);
}

.social-links h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  text-align: center;
  margin-bottom: var(--space-8);
  color: var(--text-primary);
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
}

.social-link {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  text-decoration: none;
  transition: all var(--transition-base);
}

.social-link:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.social-link.github:hover { border-color: #333; }
.social-link.linkedin:hover { border-color: #0077b5; }
.social-link.ecommerce:hover { border-color: #ff6b35; }
.social-link.ai-project:hover { border-color: #8b5cf6; }
.social-link.blog:hover { border-color: #10b981; }
.social-link.email:hover { border-color: var(--accent-primary); }

.social-link svg {
  font-size: 24px;
  color: var(--accent-primary);
  flex-shrink: 0;
}

.link-content {
  display: flex;
  flex-direction: column;
}

.link-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--text-base);
}

.link-desc {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* FAQ */
.faq-section h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  text-align: center;
  margin-bottom: var(--space-8);
  color: var(--text-primary);
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.faq-item {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
}

.faq-item h4 {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.faq-item svg {
  color: var(--accent-primary);
  font-size: 20px;
  flex-shrink: 0;
}

.faq-item p {
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Notification */
.notification {
  position: relative;
  margin-top: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid;
  animation: slideInUp 0.3s ease-out;
}

.notification.success {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  color: #065f46;
}

.notification.error {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #991b1b;
}

.notification-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.notification-message {
  font-weight: 500;
  flex-grow: 1;
}

.notification-close {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
}

.notification-close:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* Animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .links-grid {
    grid-template-columns: 1fr;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style> 