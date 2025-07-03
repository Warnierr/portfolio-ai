<template>
  <section id="networking" class="networking-hub">
    <div class="container">
      <!-- Header avec CTA principal -->
      <div class="networking-header" ref="networkingHeader">
        <div class="header-content">
          <h2 class="section-title">
            <span class="gradient-text">Networking Hub</span>
            <span class="subtitle">Connectons-nous et créons ensemble</span>
          </h2>
          <p class="section-description">
            Que ce soit pour discuter d'IA, collaborer sur un projet ou simplement échanger 
            sur l'innovation tech, je suis toujours ouvert aux nouvelles opportunités.
          </p>
        </div>
        
        <!-- Quick Actions -->
        <div class="quick-actions">
          <button @click="openCalendar" class="action-btn primary">
            <Icon name="mdi:calendar-plus" />
            Réserver un créneau
          </button>
          <button @click="startConversation" class="action-btn secondary">
            <Icon name="mdi:message-text" />
            Discuter avec Nina AI
          </button>
          <button @click="downloadVCard" class="action-btn tertiary">
            <Icon name="mdi:card-account-details" />
            Ajouter mes contacts
          </button>
        </div>
      </div>

      <!-- Networking Options Grid -->
      <div class="networking-grid" ref="networkingGrid">
        <!-- Consultation 1-on-1 -->
        <div class="networking-card consultation" @click="bookConsultation">
          <div class="card-icon">
            <Icon name="mdi:account-supervisor" />
          </div>
          <h3>Consultation 1-on-1</h3>
          <p>Session stratégique personnalisée sur vos projets IA ou votre transformation digitale</p>
          <div class="card-details">
            <span class="duration">
              <Icon name="mdi:clock-outline" />
              45 min
            </span>
            <span class="price">Gratuit</span>
          </div>
          <div class="card-benefits">
            <span>✓ Analyse de vos besoins</span>
            <span>✓ Recommandations personnalisées</span>
            <span>✓ Roadmap technique</span>
          </div>
        </div>

        <!-- Workshop/Formation -->
        <div class="networking-card workshop" @click="bookWorkshop">
          <div class="card-icon">
            <Icon name="mdi:school" />
          </div>
          <h3>Workshop IA</h3>
          <p>Formation pratique sur l'implémentation d'agents IA dans votre organisation</p>
          <div class="card-details">
            <span class="duration">
              <Icon name="mdi:clock-outline" />
              2-4h
            </span>
            <span class="price">Sur devis</span>
          </div>
          <div class="card-benefits">
            <span>✓ Formation équipe</span>
            <span>✓ Cas d'usage concrets</span>
            <span>✓ Support post-formation</span>
          </div>
        </div>

        <!-- Collaboration Projet -->
        <div class="networking-card collaboration" @click="proposeCollaboration">
          <div class="card-icon">
            <Icon name="mdi:handshake" />
          </div>
          <h3>Collaboration</h3>
          <p>Partenariat technique ou co-création sur des projets innovants d'IA</p>
          <div class="card-details">
            <span class="duration">
              <Icon name="mdi:infinity" />
              Long terme
            </span>
            <span class="price">Win-Win</span>
          </div>
          <div class="card-benefits">
            <span>✓ Innovation partagée</span>
            <span>✓ Expertise complémentaire</span>
            <span>✓ Réseau étendu</span>
          </div>
        </div>

        <!-- Speaking/Conférence -->
        <div class="networking-card speaking" @click="inviteSpeaking">
          <div class="card-icon">
            <Icon name="mdi:microphone" />
          </div>
          <h3>Speaking</h3>
          <p>Intervention sur l'IA, Nina AI ou l'innovation tech dans vos événements</p>
          <div class="card-details">
            <span class="duration">
              <Icon name="mdi:clock-outline" />
              30-60 min
            </span>
            <span class="price">Négociable</span>
          </div>
          <div class="card-benefits">
            <span>✓ Expertise reconnue</span>
            <span>✓ Contenu sur mesure</span>
            <span>✓ Engagement audience</span>
          </div>
        </div>

        <!-- Mentoring -->
        <div class="networking-card mentoring" @click="requestMentoring">
          <div class="card-icon">
            <Icon name="mdi:account-heart" />
          </div>
          <h3>Mentoring</h3>
          <p>Accompagnement personnalisé pour développeurs et entrepreneurs en IA</p>
          <div class="card-details">
            <span class="duration">
              <Icon name="mdi:clock-outline" />
              Récurrent
            </span>
            <span class="price">Sélectif</span>
          </div>
          <div class="card-benefits">
            <span>✓ Guidance experte</span>
            <span>✓ Réseau professionnel</span>
            <span>✓ Croissance accélérée</span>
          </div>
        </div>

        <!-- Investissement/Advisory -->
        <div class="networking-card advisory" @click="proposeAdvisory">
          <div class="card-icon">
            <Icon name="mdi:chart-line" />
          </div>
          <h3>Advisory IA</h3>
          <p>Conseil stratégique pour startups et scale-ups dans le domaine de l'IA</p>
          <div class="card-details">
            <span class="duration">
              <Icon name="mdi:calendar-month" />
              3-12 mois
            </span>
            <span class="price">Equity/Cash</span>
          </div>
          <div class="card-benefits">
            <span>✓ Vision stratégique</span>
            <span>✓ Réseau investisseurs</span>
            <span>✓ Expertise technique</span>
          </div>
        </div>
      </div>

      <!-- Calendar Integration -->
      <div class="calendar-section" ref="calendarSection" v-show="showCalendar">
        <div class="calendar-container">
          <div class="calendar-header">
            <h3>Réserver un créneau</h3>
            <button @click="closeCalendar" class="close-btn">
              <Icon name="mdi:close" />
            </button>
          </div>
          
          <!-- Calendly Embed ou Custom Calendar -->
          <div class="calendar-embed">
            <iframe 
              src="https://calendly.com/raouf-warnier/consultation"
              width="100%" 
              height="700"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- Contact Form Avancé -->
      <div class="advanced-contact" ref="advancedContact">
        <h3>Démarrons la conversation</h3>
        <form @submit.prevent="submitNetworkingForm" class="networking-form">
          <div class="form-grid">
            <div class="form-group">
              <label for="name">Nom complet *</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required 
                placeholder="Votre nom"
              >
            </div>
            
            <div class="form-group">
              <label for="company">Entreprise</label>
              <input 
                type="text" 
                id="company" 
                v-model="form.company" 
                placeholder="Votre entreprise"
              >
            </div>
            
            <div class="form-group">
              <label for="role">Votre rôle</label>
              <select id="role" v-model="form.role">
                <option value="">Sélectionnez...</option>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="cto">CTO/Tech Lead</option>
                <option value="developer">Développeur</option>
                <option value="investor">Investisseur</option>
                <option value="student">Étudiant</option>
                <option value="recruiter">Recruteur</option>
                <option value="other">Autre</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="interest">Intérêt principal</label>
              <select id="interest" v-model="form.interest">
                <option value="">Sélectionnez...</option>
                <option value="consultation">Consultation IA</option>
                <option value="collaboration">Collaboration projet</option>
                <option value="speaking">Invitation speaking</option>
                <option value="mentoring">Mentoring</option>
                <option value="advisory">Advisory/Conseil</option>
                <option value="hiring">Opportunité emploi</option>
                <option value="networking">Networking</option>
              </select>
            </div>
          </div>
          
          <div class="form-group full-width">
            <label for="message">Votre message *</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              required 
              rows="4"
              placeholder="Parlez-moi de votre projet, vos besoins ou simplement pourquoi vous souhaitez échanger..."
            ></textarea>
          </div>
          
          <div class="form-group full-width">
            <label for="linkedin">Votre LinkedIn (optionnel)</label>
            <input 
              type="url" 
              id="linkedin" 
              v-model="form.linkedin" 
              placeholder="https://linkedin.com/in/votre-profil"
            >
          </div>
          
          <div class="form-actions">
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <Icon name="mdi:send" v-if="!isSubmitting" />
              <Icon name="mdi:loading" class="spinning" v-else />
              {{ isSubmitting ? 'Envoi...' : 'Envoyer ma demande' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Success Stories -->
      <div class="success-stories" ref="successStories">
        <h3>Ils m'ont fait confiance</h3>
        <div class="stories-grid">
          <div class="story-card">
            <div class="story-quote">
              "Raouf m'a aidé à implémenter Nina AI dans notre startup. Résultat : +40% d'engagement client !"
            </div>
            <div class="story-author">
              <img src="/testimonial-1.jpg" alt="Sarah M." class="author-avatar">
              <div class="author-info">
                <span class="author-name">Sarah M.</span>
                <span class="author-role">CEO, TechStartup</span>
              </div>
            </div>
          </div>
          
          <div class="story-card">
            <div class="story-quote">
              "Sa conférence sur l'IA conversationnelle a inspiré toute notre équipe. Vision claire et expertise solide."
            </div>
            <div class="story-author">
              <img src="/testimonial-2.jpg" alt="Marc L." class="author-avatar">
              <div class="author-info">
                <span class="author-name">Marc L.</span>
                <span class="author-role">CTO, Scale-up</span>
              </div>
            </div>
          </div>
          
          <div class="story-card">
            <div class="story-quote">
              "Le mentoring avec Raouf m'a permis de décrocher mon poste d'AI Engineer. Merci pour l'accompagnement !"
            </div>
            <div class="story-author">
              <img src="/testimonial-3.jpg" alt="Alex R." class="author-avatar">
              <div class="author-info">
                <span class="author-name">Alex R.</span>
                <span class="author-role">AI Engineer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface NetworkingForm {
  name: string
  company: string
  role: string
  interest: string
  message: string
  linkedin: string
}

const showCalendar = ref(false)
const isSubmitting = ref(false)

const form = reactive<NetworkingForm>({
  name: '',
  company: '',
  role: '',
  interest: '',
  message: '',
  linkedin: ''
})

// Actions
const openCalendar = () => {
  showCalendar.value = true
  // Track event pour analytics
  trackEvent('calendar_opened', { source: 'networking_hub' })
}

const closeCalendar = () => {
  showCalendar.value = false
}

const startConversation = () => {
  // Trigger Nina AI avec contexte networking
  const ninaEvent = new CustomEvent('nina-start-conversation', {
    detail: { 
      context: 'networking',
      message: 'Je souhaite discuter d\'opportunités de collaboration'
    }
  })
  window.dispatchEvent(ninaEvent)
}

const downloadVCard = () => {
  // Génération vCard dynamique
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:Raouf WARNIER
ORG:Inetum-Orange
TITLE:Ingénieur IA & Data
EMAIL:raouf.warnier@email.com
URL:https://raouf-warnier.dev
NOTE:Créateur de Nina AI - Expert en IA conversationnelle
END:VCARD`

  const blob = new Blob([vCard], { type: 'text/vcard' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'raouf-warnier-contact.vcf'
  a.click()
  URL.revokeObjectURL(url)
  
  trackEvent('vcard_downloaded', { source: 'networking_hub' })
}

// Networking Actions
const bookConsultation = () => {
  form.interest = 'consultation'
  scrollToForm()
}

const bookWorkshop = () => {
  form.interest = 'workshop'
  scrollToForm()
}

const proposeCollaboration = () => {
  form.interest = 'collaboration'
  scrollToForm()
}

const inviteSpeaking = () => {
  form.interest = 'speaking'
  scrollToForm()
}

const requestMentoring = () => {
  form.interest = 'mentoring'
  scrollToForm()
}

const proposeAdvisory = () => {
  form.interest = 'advisory'
  scrollToForm()
}

const scrollToForm = () => {
  const formElement = document.querySelector('.advanced-contact')
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' })
  }
}

const submitNetworkingForm = async () => {
  isSubmitting.value = true
  
  try {
    const response = await $fetch('/api/networking-contact', {
      method: 'POST',
      body: {
        ...form,
        timestamp: new Date().toISOString(),
        source: 'networking_hub'
      }
    }) as { success: boolean, message: string }
    
    if (response.success) {
      // Success notification
      showNotification('Demande envoyée ! Je vous recontacte sous 24h 🚀', 'success')
      
      // Reset form
      Object.keys(form).forEach(key => {
        form[key as keyof NetworkingForm] = ''
      })
      
      // Track conversion
      trackEvent('networking_form_submitted', { 
        interest: form.interest,
        role: form.role 
      })
    }
  } catch (error) {
    showNotification('Erreur lors de l\'envoi. Réessayez ou contactez-moi directement.', 'error')
  } finally {
    isSubmitting.value = false
  }
}

// Analytics tracking
const trackEvent = (eventName: string, data: any) => {
  // Integration avec votre système d'analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', eventName, data)
  }
  
  // Log pour développement
  console.log('📊 Analytics Event:', { eventName, data })
}

const showNotification = (message: string, type: 'success' | 'error') => {
  // Système de notification (à intégrer avec votre composant existant)
  const event = new CustomEvent('show-notification', {
    detail: { message, type }
  })
  window.dispatchEvent(event)
}

// Animations GSAP
onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  // Animation d'entrée
  $gsap.gsap.from('.networking-header', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  })

  $gsap.gsap.from('.networking-card', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.networking-grid',
      start: 'top 80%'
    }
  })

  $gsap.gsap.from('.story-card', {
    scale: 0.9,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    scrollTrigger: {
      trigger: '.success-stories',
      start: 'top 85%'
    }
  })
})
</script>

<style scoped>
.networking-hub {
  padding: var(--space-32) 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(168, 85, 247, 0.02) 100%);
  position: relative;
  overflow: hidden;
}

.networking-hub::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/networking-pattern.svg') center/cover;
  opacity: 0.03;
  pointer-events: none;
}

.networking-header {
  text-align: center;
  margin-bottom: var(--space-20);
}

.header-content .section-title {
  font-size: var(--text-4xl);
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.subtitle {
  display: block;
  font-size: var(--text-xl);
  font-weight: 400;
  color: var(--text-secondary);
  margin-top: var(--space-2);
}

.section-description {
  font-size: var(--text-lg);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto var(--space-12);
  line-height: 1.6;
}

.quick-actions {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 600;
  text-decoration: none;
  transition: all var(--transition-base);
  border: none;
  cursor: pointer;
  font-size: var(--text-base);
}

.action-btn.primary {
  background: var(--gradient-primary);
  color: white;
  box-shadow: var(--shadow-lg);
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.action-btn.secondary {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.action-btn.secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--accent-primary);
}

.action-btn.tertiary {
  background: transparent;
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
}

.action-btn.tertiary:hover {
  background: var(--accent-primary);
  color: white;
}

.networking-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-20);
}

.networking-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  border: 1px solid var(--border-primary);
  transition: all var(--transition-base);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.networking-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.networking-card:hover::before {
  left: 100%;
}

.networking-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: var(--accent-primary);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
  font-size: 28px;
  color: white;
}

.consultation .card-icon { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); }
.workshop .card-icon { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); }
.collaboration .card-icon { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
.speaking .card-icon { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
.mentoring .card-icon { background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); }
.advisory .card-icon { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); }

.networking-card h3 {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.networking-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.card-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  padding: var(--space-3);
  background: rgba(99, 102, 241, 0.05);
  border-radius: var(--radius-md);
}

.duration {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--text-secondary);
  font-size: var(--text-sm);
}

.price {
  font-weight: 600;
  color: var(--accent-primary);
}

.card-benefits {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.card-benefits span {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

.calendar-section {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.calendar-container {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-6);
  border-bottom: 1px solid var(--border-primary);
}

.calendar-header h3 {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
}

.close-btn:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.advanced-contact {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-10);
  margin: var(--space-20) 0;
  border: 1px solid var(--border-primary);
}

.advanced-contact h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  text-align: center;
  margin-bottom: var(--space-8);
  color: var(--text-primary);
}

.networking-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--text-sm);
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

.form-actions {
  text-align: center;
}

.submit-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-8);
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--text-base);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-lg);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.success-stories {
  margin-top: var(--space-20);
}

.success-stories h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  text-align: center;
  margin-bottom: var(--space-12);
  color: var(--text-primary);
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
}

.story-card {
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--border-primary);
  transition: all var(--transition-base);
}

.story-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
}

.story-quote {
  font-style: italic;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
  position: relative;
}

.story-quote::before {
  content: '"';
  font-size: 3rem;
  color: var(--accent-primary);
  position: absolute;
  top: -10px;
  left: -10px;
  opacity: 0.3;
}

.story-author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: var(--text-primary);
}

.author-role {
  font-size: var(--text-sm);
  color: var(--text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .networking-hub {
    padding: var(--space-20) 0;
  }
  
  .networking-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .action-btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .calendar-section {
    padding: var(--space-2);
  }
  
  .calendar-container {
    height: 100%;
  }
}
</style> 