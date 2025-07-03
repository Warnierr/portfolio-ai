<template>
  <div class="nina-ai-agent" data-nina>
    <!-- Widget flottant -->
    <Transition name="nina-slide">
      <div 
        v-if="isVisible" 
        class="nina-widget"
        :class="{ 'expanded': isExpanded }"
      >
        <!-- Header avec avatar Nina -->
        <div class="nina-header" @click="toggleExpanded">
          <div class="nina-avatar">
            <div class="nina-avatar-inner">
              <span class="nina-icon">🤖</span>
              <div class="nina-pulse" v-if="isThinking"></div>
            </div>
          </div>
          <div class="nina-info">
            <h3 class="nina-name">Nina AI</h3>
            <p class="nina-status">{{ currentStatus }}</p>
          </div>
          <button class="nina-toggle" :class="{ 'rotated': isExpanded }">
            <Icon name="chevron-up" />
          </button>
        </div>

        <!-- Zone de conversation -->
        <div v-if="isExpanded" class="nina-conversation">
          <div class="nina-messages" ref="messagesContainer">
            <div 
              v-for="message in messages" 
              :key="message.id"
              class="nina-message"
              :class="message.type"
            >
              <div class="message-content">
                <div v-if="message.type === 'nina'" class="message-avatar">
                  <span>🤖</span>
                </div>
                <div class="message-text" v-html="message.content"></div>
                <div class="message-time">{{ formatTime(message.timestamp) }}</div>
              </div>
              
              <!-- Actions suggérées -->
              <div v-if="message.actions" class="message-actions">
                <button 
                  v-for="action in message.actions"
                  :key="action.id"
                  @click="executeAction(action)"
                  class="action-button"
                >
                  <Icon :name="action.icon" />
                  {{ action.label }}
                </button>
              </div>
            </div>
            
            <!-- Indicateur de frappe -->
            <div v-if="isThinking" class="nina-typing">
              <div class="typing-avatar">🤖</div>
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          <!-- Zone de saisie -->
          <div class="nina-input-area">
            <div class="input-container">
              <input
                v-model="currentInput"
                @keypress.enter="sendMessage"
                placeholder="Posez-moi une question sur Raouf..."
                class="nina-input"
                :disabled="isThinking"
              />
              <button 
                @click="sendMessage"
                class="send-button"
                :disabled="!currentInput.trim() || isThinking"
              >
                <Icon name="send" />
              </button>
            </div>
            
            <!-- Suggestions rapides -->
            <div v-if="quickSuggestions.length" class="quick-suggestions">
              <button
                v-for="suggestion in quickSuggestions"
                :key="suggestion.id"
                @click="selectSuggestion(suggestion)"
                class="suggestion-chip"
              >
                {{ suggestion.text }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Bouton d'activation -->
    <button 
      v-if="!isVisible"
      @click="showWidget"
      class="nina-trigger"
      :class="{ 'pulse': hasNewMessage }"
    >
      <span class="trigger-icon">🤖</span>
      <span class="trigger-text">Nina AI</span>
      <div v-if="hasNewMessage" class="notification-dot"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useNinaAI } from '~/composables/useNinaAI'
import { useNuxtApp } from 'nuxt/app'

// Types
interface Message {
  id: string
  type: 'user' | 'nina'
  content: string
  timestamp: Date
  actions?: Action[]
}

interface Action {
  id: string
  label: string
  icon: string
  type: 'download' | 'contact' | 'project' | 'link'
  data?: any
}

interface Suggestion {
  id: string
  text: string
  prompt: string
}

// Composables
const { 
  processMessage, 
  generateResponse, 
  analyzeUserIntent,
  getProjectRecommendations,
  generateCV
} = useNinaAI()

const { $gsap } = useNuxtApp()

// État réactif amélioré
const isVisible = ref(false)
const isExpanded = ref(false)
const isThinking = ref(false)
const hasNewMessage = ref(false)
const currentInput = ref('')
const messages = ref<Message[]>([])
const messagesContainer = ref<HTMLElement>()
const conversationHistory = ref<string[]>([])
const userPreferences = ref({
  theme: 'auto',
  language: 'fr',
  notificationsEnabled: true
})

// Statut dynamique
const currentStatus = computed(() => {
  if (isThinking.value) return 'En train de réfléchir...'
  if (messages.value.length === 0) return 'Prêt à discuter !'
  return 'En ligne'
})

// Suggestions rapides contextuelles
const quickSuggestions = ref<Suggestion[]>([
  {
    id: 'projects',
    text: '📊 Projets IA',
    prompt: 'Parle-moi des projets IA de Raouf'
  },
  {
    id: 'skills',
    text: '🛠️ Compétences',
    prompt: 'Quelles sont les compétences techniques de Raouf ?'
  },
  {
    id: 'nina',
    text: '🤖 Nina AI',
    prompt: 'Qu\'est-ce que Nina AI exactement ?'
  },
  {
    id: 'contact',
    text: '📞 Contact',
    prompt: 'Comment contacter Raouf pour un projet ?'
  }
])

// Nouvelles fonctionnalités avancées
const contextualSuggestions = computed(() => {
  const lastMessage = messages.value[messages.value.length - 1]
  if (!lastMessage || lastMessage.type !== 'nina') return []
  
  // Suggestions basées sur le contexte de la dernière réponse
  if (lastMessage.content.includes('projet')) {
    return [
      { id: 'project-details', text: '📋 Plus de détails', prompt: 'Peux-tu me donner plus de détails sur ce projet ?' },
      { id: 'tech-stack', text: '⚙️ Technologies utilisées', prompt: 'Quelles technologies ont été utilisées ?' },
      { id: 'challenges', text: '🎯 Défis rencontrés', prompt: 'Quels ont été les principaux défis ?' }
    ]
  } else if (lastMessage.content.includes('compétence')) {
    return [
      { id: 'experience', text: '📈 Expérience', prompt: 'Quelle est l\'expérience de Raouf dans ce domaine ?' },
      { id: 'certifications', text: '🏆 Certifications', prompt: 'A-t-il des certifications dans ce domaine ?' },
      { id: 'projects-related', text: '🔗 Projets liés', prompt: 'Quels projets utilisent ces compétences ?' }
    ]
  } else if (lastMessage.content.includes('Nina AI')) {
    return [
      { id: 'nina-features', text: '🚀 Fonctionnalités', prompt: 'Quelles sont les fonctionnalités de Nina AI ?' },
      { id: 'nina-tech', text: '🔧 Architecture', prompt: 'Comment Nina AI est-elle construite ?' },
      { id: 'nina-future', text: '🔮 Évolution', prompt: 'Quelles sont les évolutions prévues ?' }
    ]
  }
  
  return quickSuggestions.value
})

// Gestion intelligente des conversations
const analyzeConversationFlow = () => {
  const recentMessages = messages.value.slice(-5)
  const topics = recentMessages.map(m => analyzeUserIntent(m.content))
  
  // Détecter les patterns de questions
  const hasRepeatedQuestions = topics.some((topic, index) => 
    topics.indexOf(topic) !== index
  )
  
  if (hasRepeatedQuestions) {
    return 'repetitive'
  }
  
  const uniqueTopics = [...new Set(topics)]
  if (uniqueTopics.length > 3) {
    return 'exploratory'
  }
  
  return 'focused'
}

// Méthodes
const showWidget = () => {
  isVisible.value = true
  hasNewMessage.value = false
  
  // Message d'accueil personnalisé
  if (messages.value.length === 0) {
    addNinaMessage(
      `Salut ! 👋 Je suis Nina, l'agent IA de Raouf. Je connais tout sur son parcours, ses projets et ses compétences en intelligence artificielle. 
      
      Que veux-tu savoir ?`,
      [
        {
          id: 'cv',
          label: 'Télécharger CV',
          icon: 'download',
          type: 'download'
        },
        {
          id: 'projects',
          label: 'Voir projets',
          icon: 'folder',
          type: 'project'
        }
      ]
    )
  }
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  if (isExpanded.value) {
    nextTick(() => scrollToBottom())
  }
}

const sendMessage = async () => {
  if (!currentInput.value.trim() || isThinking.value) return
  
  const userMessage = currentInput.value.trim()
  const messageId = Date.now().toString()
  
  // Ajouter le message utilisateur
  messages.value.push({
    id: messageId,
    type: 'user',
    content: userMessage,
    timestamp: new Date()
  })
  
  // Sauvegarder dans l'historique
  conversationHistory.value.push(userMessage)
  
  // Vider l'input et déclencher l'animation
  currentInput.value = ''
  isThinking.value = true
  
  // Animation de l'input
  if ($gsap) {
    $gsap.gsap.to('.nina-input', {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  }
  
  // Scroll vers le bas
  await nextTick()
  scrollToBottom()
  
  try {
    // Analyser le contexte de la conversation
    const conversationFlow = analyzeConversationFlow()
    const context = {
      previousMessages: messages.value.slice(-3),
      userHistory: conversationHistory.value,
      conversationFlow
    }
    
         // Analyser l'intention
     const intent = await analyzeUserIntent(userMessage)
     
     // Générer la réponse avec contexte
     const userContext = {
       currentSection: 'chat',
       timeOnSite: Date.now() - (window.performance?.timeOrigin || 0),
       interactions: messages.value.slice(-5),
       referrer: document.referrer || 'direct'
     }
     
     const response = await generateResponse(userMessage, intent, {
       conversationHistory: messages.value,
       userContext
     })
    
    // Simuler un délai de réflexion réaliste
    const thinkingTime = Math.random() * 1000 + 500
    await new Promise(resolve => setTimeout(resolve, thinkingTime))
    
         // Ajouter la réponse de Nina
     const ninaMessage: Message = {
       id: (Date.now() + 1).toString(),
       type: 'nina',
       content: response.content,
       timestamp: new Date()
     }
    
    messages.value.push(ninaMessage)
    
    // Animations de réponse
    if ($gsap) {
      await nextTick()
      $gsap.gsap.from('.nina-message:last-child', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
    
    // Mettre à jour les suggestions
    updateQuickSuggestions()
    
  } catch (error) {
    console.error('Erreur Nina AI:', error)
    
    messages.value.push({
      id: (Date.now() + 1).toString(),
      type: 'nina',
      content: '🤔 Désolée, j\'ai rencontré un petit problème. Pouvez-vous reformuler votre question ?',
      timestamp: new Date()
    })
  } finally {
    isThinking.value = false
    await nextTick()
    scrollToBottom()
  }
}

const addUserMessage = (content: string) => {
  messages.value.push({
    id: generateId(),
    type: 'user',
    content,
    timestamp: new Date()
  })
  nextTick(() => scrollToBottom())
}

const addNinaMessage = (content: string, actions?: Action[]) => {
  messages.value.push({
    id: generateId(),
    type: 'nina',
    content,
    timestamp: new Date(),
    actions
  })
  nextTick(() => scrollToBottom())
}

const executeAction = async (action: Action) => {
  const { $gsap } = useNuxtApp()
  
  // Animation du bouton cliqué
  if ($gsap) {
    $gsap.gsap.to(`[data-action="${action.id}"]`, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  }
  
  switch (action.type) {
    case 'download':
      if (action.id === 'cv') {
        try {
          const cvData = await generateCV()
          const blob = new Blob([cvData], { type: 'application/pdf' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'CV_Raouf_WARNIER_2025.pdf'
          a.click()
          URL.revokeObjectURL(url)
          
          // Message de confirmation
          messages.value.push({
            id: Date.now().toString(),
            type: 'nina',
            content: '✅ CV téléchargé avec succès ! Vous avez maintenant accès à toutes les informations détaillées sur le parcours de Raouf.',
            timestamp: new Date()
          })
        } catch (error) {
          messages.value.push({
            id: Date.now().toString(),
            type: 'nina',
            content: '❌ Désolée, impossible de générer le CV pour le moment. Vous pouvez me contacter directement via le formulaire.',
            timestamp: new Date()
          })
        }
      }
      break
      
    case 'contact':
      // Scroll vers la section contact
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
        
        // Message de confirmation
        messages.value.push({
          id: Date.now().toString(),
          type: 'nina',
          content: '📧 Je vous ai dirigé vers le formulaire de contact. Raouf répond généralement sous 24h !',
          timestamp: new Date()
        })
      }
      break
      
    case 'project':
      // Navigation vers les projets
      const projectsSection = document.getElementById('projects')
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' })
        
        messages.value.push({
          id: Date.now().toString(),
          type: 'nina',
          content: '🚀 Voici tous les projets de Raouf ! N\'hésitez pas à explorer et à me poser des questions spécifiques.',
          timestamp: new Date()
        })
      }
      break
      
    case 'link':
      if (action.data?.url) {
        window.open(action.data.url, '_blank')
        
        messages.value.push({
          id: Date.now().toString(),
          type: 'nina',
          content: `🔗 Lien ouvert ! ${action.data.description || 'Bonne exploration !'}`,
          timestamp: new Date()
        })
      }
      break
  }
  
  await nextTick()
  scrollToBottom()
}

const selectSuggestion = (suggestion: Suggestion) => {
  currentInput.value = suggestion.prompt
  sendMessage()
}

const updateQuickSuggestions = () => {
  const messageCount = messages.value.length
  const userMessages = messages.value.filter(m => m.type === 'user')
  
  // Adapter les suggestions selon l'avancement de la conversation
  if (messageCount < 4) {
    // Début de conversation - suggestions générales
    quickSuggestions.value = [
      { id: 'intro', text: '👋 Présentation', prompt: 'Peux-tu me présenter Raouf en quelques mots ?' },
      { id: 'skills', text: '🛠️ Compétences', prompt: 'Quelles sont ses principales compétences ?' },
      { id: 'projects', text: '📊 Projets', prompt: 'Quels sont ses projets les plus intéressants ?' },
      { id: 'contact', text: '📞 Contact', prompt: 'Comment puis-je le contacter ?' }
    ]
  } else if (messageCount < 8) {
    // Milieu de conversation - suggestions approfondies
    quickSuggestions.value = [
      { id: 'experience', text: '💼 Expérience', prompt: 'Parle-moi de son parcours professionnel' },
      { id: 'nina-details', text: '🤖 Nina AI', prompt: 'Comment fonctionne Nina AI exactement ?' },
      { id: 'collaboration', text: '🤝 Collaboration', prompt: 'Comment puis-je collaborer avec lui ?' },
      { id: 'future', text: '🚀 Projets futurs', prompt: 'Quels sont ses projets à venir ?' }
    ]
  } else {
    // Conversation avancée - suggestions spécialisées
    quickSuggestions.value = [
      { id: 'technical', text: '⚙️ Technique', prompt: 'Peux-tu détailler ses compétences techniques ?' },
      { id: 'achievements', text: '🏆 Réalisations', prompt: 'Quelles sont ses principales réalisations ?' },
      { id: 'methodology', text: '📋 Méthodologie', prompt: 'Quelle est sa méthodologie de travail ?' },
      { id: 'innovation', text: '💡 Innovation', prompt: 'Comment aborde-t-il l\'innovation ?' }
    ]
  }
}

const getCurrentUserContext = () => {
  return {
    currentSection: getCurrentSection(),
    timeOnSite: getTimeOnSite(),
    interactions: getUserInteractions(),
    referrer: document.referrer
  }
}

// Fonction de scroll améliorée
const scrollToBottom = () => {
  const { $gsap } = useNuxtApp()
  if (!messagesContainer.value || !$gsap) return
  
  const container = messagesContainer.value
  const targetScroll = container.scrollHeight - container.clientHeight
  
  $gsap.gsap.to(container, {
    scrollTop: targetScroll,
    duration: 0.5,
    ease: 'power2.out'
  })
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

const downloadFile = (data: Blob, filename: string) => {
  const url = URL.createObjectURL(data)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const getCurrentSection = () => {
  // Détecter la section actuelle
  return 'home'
}

const getTimeOnSite = () => {
  // Calculer le temps passé sur le site
  return Date.now() - performance.timing.navigationStart
}

const getUserInteractions = () => {
  // Analyser les interactions utilisateur
  return []
}

// Message d'accueil intelligent
const generateWelcomeMessage = () => {
  const hour = new Date().getHours()
  let greeting = '👋'
  
  if (hour < 12) greeting = '🌅 Bonjour'
  else if (hour < 18) greeting = '☀️ Bon après-midi'
  else greeting = '🌙 Bonsoir'
  
  const welcomeMessages = [
    `${greeting} ! Je suis Nina AI, l'assistante intelligente de Raouf WARNIER. 🤖`,
    '',
    '💡 Je peux vous renseigner sur :',
    '• Son parcours et ses compétences',
    '• Ses projets IA innovants',
    '• Nina AI (c\'est moi ! 😊)',
    '• Comment le contacter',
    '',
    '🚀 Que souhaitez-vous savoir ?'
  ].join('\n')
  
  return {
    message: welcomeMessages,
    actions: [
      {
        id: 'portfolio-tour',
        label: '🎯 Tour du portfolio',
        icon: 'mdi:compass',
        type: 'link' as const,
        data: { description: 'Découvrir le portfolio complet' }
      },
      {
        id: 'quick-contact',
        label: '📞 Contact rapide',
        icon: 'mdi:message',
        type: 'contact' as const
      }
    ]
  }
}

// Cycle de vie
onMounted(() => {
  // Afficher automatiquement après 3 secondes
  setTimeout(() => {
    hasNewMessage.value = true
  }, 3000)
})
</script>

<style scoped>
.nina-ai-agent {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.nina-widget {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 320px;
  max-height: 500px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nina-widget.expanded {
  max-height: 600px;
}

.nina-header {
  display: flex;
  align-items: center;
  padding: 16px;
  cursor: pointer;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nina-avatar {
  position: relative;
  margin-right: 12px;
}

.nina-avatar-inner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.nina-icon {
  font-size: 20px;
}

.nina-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid #667eea;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.3); opacity: 0; }
}

.nina-info {
  flex: 1;
}

.nina-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}

.nina-status {
  font-size: 12px;
  color: #666;
  margin: 2px 0 0 0;
}

.nina-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: transform 0.3s ease;
}

.nina-toggle.rotated {
  transform: rotate(180deg);
}

.nina-conversation {
  display: flex;
  flex-direction: column;
  height: 400px;
}

.nina-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  scroll-behavior: smooth;
}

.nina-message {
  margin-bottom: 16px;
}

.nina-message.user .message-content {
  flex-direction: row-reverse;
}

.nina-message.user .message-text {
  background: #667eea;
  color: white;
  margin-left: 0;
  margin-right: 8px;
}

.message-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.message-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
}

.message-text {
  background: #f5f5f5;
  padding: 8px 12px;
  border-radius: 12px;
  max-width: 80%;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.4;
}

.message-time {
  font-size: 10px;
  color: #999;
  margin-top: 4px;
}

.message-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.action-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: background 0.2s ease;
}

.action-button:hover {
  background: #5a67d8;
}

.nina-typing {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.7;
}

.typing-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.typing-indicator {
  display: flex;
  gap: 2px;
}

.typing-indicator span {
  width: 4px;
  height: 4px;
  background: #999;
  border-radius: 50%;
  animation: typing 1.5s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
}

.nina-input-area {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 16px;
}

.input-container {
  display: flex;
  gap: 8px;
}

.nina-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
}

.nina-input:focus {
  border-color: #667eea;
}

.send-button {
  background: #667eea;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.send-button:hover:not(:disabled) {
  background: #5a67d8;
}

.send-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.quick-suggestions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.suggestion-chip {
  background: #f0f0f0;
  border: none;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.suggestion-chip:hover {
  background: #e0e0e0;
}

.nina-trigger {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: transform 0.2s ease;
  position: relative;
}

.nina-trigger:hover {
  transform: translateY(-2px);
}

.nina-trigger.pulse {
  animation: pulse-trigger 2s infinite;
}

@keyframes pulse-trigger {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.trigger-icon {
  font-size: 20px;
}

.trigger-text {
  font-weight: 600;
  font-size: 14px;
}

.notification-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background: #ff4757;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* Transitions */
.nina-slide-enter-active,
.nina-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nina-slide-enter-from,
.nina-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .nina-widget {
    background: rgba(30, 30, 30, 0.95);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .nina-name {
    color: white;
  }
  
  .nina-status {
    color: #ccc;
  }
  
  .message-text {
    background: #3a3a3a;
    color: white;
  }
  
  .nina-input {
    background: #3a3a3a;
    border-color: #555;
    color: white;
  }
  
  .suggestion-chip {
    background: #3a3a3a;
    color: white;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .nina-widget {
    width: calc(100vw - 40px);
    max-width: 320px;
  }
  
  .nina-ai-agent {
    left: 20px;
    right: 20px;
    bottom: 20px;
  }
  
  .nina-trigger {
    margin: 0 auto;
  }
}
</style> 