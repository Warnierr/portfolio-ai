<template>
  <div class="nina-ai-widget" data-nina="widget">
    <!-- Bouton flottant -->
    <Transition name="widget-bounce">
      <button
        v-if="!isOpen"
        class="nina-widget-trigger"
        @click="openWidget"
        :class="{ 'has-notification': hasNotification }"
        ref="triggerButton"
      >
        <div class="nina-avatar">
          <Icon name="mdi:robot-excited" size="24" />
        </div>
        <div class="nina-pulse" v-if="hasNotification"></div>
        <div class="nina-tooltip">
          <span>Salut ! Je suis Nina AI</span>
        </div>
      </button>
    </Transition>

    <!-- Widget principal -->
    <Transition name="widget-slide">
      <div
        v-if="isOpen"
        class="nina-widget-container"
        ref="widgetContainer"
      >
        <!-- Header -->
        <div class="nina-widget-header">
          <div class="nina-header-info">
            <div class="nina-avatar-header">
              <Icon name="mdi:robot-excited" size="20" />
              <div class="nina-status-dot"></div>
            </div>
            <div class="nina-header-text">
              <h3>Nina AI</h3>
              <p>Assistant IA de Raouf</p>
            </div>
          </div>
          <div class="nina-header-actions">
            <button
              class="nina-action-btn"
              @click="minimizeWidget"
              title="Réduire"
            >
              <Icon name="mdi:window-minimize" size="16" />
            </button>
            <button
              class="nina-action-btn"
              @click="closeWidget"
              title="Fermer"
            >
              <Icon name="mdi:close" size="16" />
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div class="nina-messages-container" ref="messagesContainer">
          <div class="nina-messages">
            <!-- Message de bienvenue -->
            <div class="nina-message nina-message-bot" v-if="messages.length === 0">
              <div class="nina-message-avatar">
                <Icon name="mdi:robot-excited" size="16" />
              </div>
              <div class="nina-message-content">
                <div class="nina-message-bubble">
                  <p>Salut ! Je suis Nina AI, l'assistant intelligent de Raouf.</p>
                  <p>Je peux t'aider avec :</p>
                  <ul>
                    <li>Informations sur les projets IA</li>
                    <li>Services et tarifs</li>
                    <li>Prise de rendez-vous</li>
                    <li>Génération de devis</li>
                  </ul>
                  <p>Que puis-je faire pour toi ?</p>
                </div>
                <div class="nina-message-time">{{ currentTime }}</div>
              </div>
            </div>

            <!-- Messages de conversation -->
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="nina-message"
              :class="message.type === 'user' ? 'nina-message-user' : 'nina-message-bot'"
            >
              <div class="nina-message-avatar" v-if="message.type === 'bot'">
                <Icon name="mdi:robot-excited" size="16" />
              </div>
              <div class="nina-message-content">
                <div class="nina-message-bubble">
                  <p v-html="message.content"></p>
                  <!-- Actions rapides -->
                  <div v-if="message.actions && message.actions.length > 0" class="nina-quick-actions">
                    <button
                      v-for="action in message.actions"
                      :key="action.id"
                      class="nina-quick-action"
                      @click="handleQuickAction(action)"
                    >
                      <Icon :name="action.icon" size="14" />
                      {{ action.label }}
                    </button>
                  </div>
                </div>
                <div class="nina-message-time">{{ message.timestamp }}</div>
              </div>
            </div>

            <!-- Indicateur de frappe -->
            <div v-if="isTyping" class="nina-message nina-message-bot">
              <div class="nina-message-avatar">
                <Icon name="mdi:robot-excited" size="16" />
              </div>
              <div class="nina-message-content">
                <div class="nina-message-bubble nina-typing">
                  <div class="nina-typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Suggestions rapides -->
        <div class="nina-suggestions" v-if="suggestions.length > 0">
          <button
            v-for="suggestion in suggestions"
            :key="suggestion.id"
            class="nina-suggestion"
            @click="sendMessage(suggestion.text)"
          >
            <Icon :name="suggestion.icon" size="14" />
            {{ suggestion.text }}
          </button>
        </div>

        <!-- Zone de saisie -->
        <div class="nina-input-container">
          <div class="nina-input-wrapper">
            <input
              v-model="currentMessage"
              type="text"
              placeholder="Tapez votre message..."
              class="nina-input"
              @keypress.enter="sendMessage()"
              @input="handleTyping"
              ref="messageInput"
            />
            <button
              class="nina-send-btn"
              @click="sendMessage()"
              :disabled="!currentMessage.trim()"
            >
              <Icon name="mdi:send" size="16" />
            </button>
          </div>
          <div class="nina-input-actions">
            <button
              class="nina-input-action"
              @click="generateQuote"
              title="Générer un devis"
            >
              <Icon name="mdi:file-document-outline" size="14" />
            </button>
            <button
              class="nina-input-action"
              @click="scheduleCall"
              title="Planifier un appel"
            >
              <Icon name="mdi:calendar-plus" size="14" />
            </button>
            <button
              class="nina-input-action"
              @click="exportConversation"
              title="Exporter la conversation"
            >
              <Icon name="mdi:download" size="14" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { useNinaAI } from '~/composables/useNinaAI'

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: string
  actions?: Array<{
    id: string
    label: string
    icon: string
    action: string
    data?: any
  }>
}

interface Suggestion {
  id: string
  text: string
  icon: string
}

// Composables
const { processMessage } = useNinaAI()

// Refs
const isOpen = ref(false)
const isTyping = ref(false)
const hasNotification = ref(true)
const currentMessage = ref('')
const messages = ref<Message[]>([])
const triggerButton = ref()
const widgetContainer = ref()
const messagesContainer = ref()
const messageInput = ref()

// Suggestions rapides
const suggestions = ref<Suggestion[]>([
  { id: '1', text: 'Quels sont vos services IA ?', icon: 'mdi:robot' },
  { id: '2', text: 'Montrez-moi vos projets', icon: 'mdi:folder-multiple' },
  { id: '3', text: 'Je veux un devis', icon: 'mdi:file-document' },
  { id: '4', text: 'Planifier un appel', icon: 'mdi:calendar' }
])

// Computed
const currentTime = computed(() => {
  return new Date().toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

// Méthodes
const openWidget = () => {
  isOpen.value = true
  hasNotification.value = false
  nextTick(() => {
    messageInput.value?.focus()
    animateWidgetOpen()
  })
}

const closeWidget = () => {
  isOpen.value = false
  animateWidgetClose()
}

const minimizeWidget = () => {
  isOpen.value = false
  // Garder une petite notification pour rappeler
  setTimeout(() => {
    hasNotification.value = true
  }, 30000) // 30 secondes
}

const sendMessage = async (text?: string) => {
  const messageText = text || currentMessage.value.trim()
  if (!messageText) return

  // Ajouter le message utilisateur
  const userMessage: Message = {
    id: Date.now().toString(),
    type: 'user',
    content: messageText,
    timestamp: currentTime.value
  }
  messages.value.push(userMessage)

  // Réinitialiser l'input
  currentMessage.value = ''

  // Scroll vers le bas
  await nextTick()
  scrollToBottom()

  // Indicateur de frappe
  isTyping.value = true

  try {
    // Traitement par Nina AI
    const response = await processMessage(messageText, {
      currentSection: 'widget',
      timeOnSite: Date.now(),
      interactions: messages.value,
      referrer: document.referrer
    })

    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Ajouter la réponse de Nina
    const botMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: response.content,
      timestamp: currentTime.value,
      actions: response.actions?.map(action => ({
        id: action,
        label: getActionLabel(action),
        icon: getActionIcon(action),
        action: action
      }))
    }
    messages.value.push(botMessage)

    // Mettre à jour les suggestions
    updateSuggestions(response.intent)

  } catch (error) {
    console.error('Erreur Nina AI:', error)
    const errorMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: 'Désolé, je rencontre un problème technique. Pouvez-vous réessayer ?',
      timestamp: currentTime.value
    }
    messages.value.push(errorMessage)
  } finally {
    isTyping.value = false
    await nextTick()
    scrollToBottom()
  }
}

const handleQuickAction = (action: any) => {
  switch (action.action) {
    case 'contact':
      window.location.href = '#contact'
      break
    case 'projects':
      window.location.href = '#projects'
      break
    case 'services':
      window.location.href = '#services'
      break
    case 'schedule':
      scheduleCall()
      break
    case 'quote':
      generateQuote()
      break
    default:
      sendMessage(action.label)
  }
}

const generateQuote = () => {
  sendMessage('Je voudrais un devis personnalisé pour mes besoins')
}

const scheduleCall = () => {
  // Ouvrir Calendly ou rediriger vers la section contact
  window.open('https://calendly.com/raouf-warnier/consultation', '_blank')
}

const exportConversation = () => {
  const conversationText = messages.value
    .map(msg => `${msg.type === 'user' ? 'Vous' : 'Nina AI'} (${msg.timestamp}): ${msg.content}`)
    .join('\n\n')
  
  const blob = new Blob([conversationText], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `conversation-nina-ai-${new Date().toISOString().split('T')[0]}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

const handleTyping = () => {
  // Logique pour détecter si l'utilisateur tape
  // Peut être utilisé pour des fonctionnalités avancées
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const animateWidgetOpen = () => {
  // Animations GSAP pour l'ouverture
  if (process.client && widgetContainer.value) {
    // Animation d'apparition élégante
    gsap.fromTo(widgetContainer.value, 
      { scale: 0.8, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
    )
  }
}

const animateWidgetClose = () => {
  if (process.client && widgetContainer.value) {
    gsap.to(widgetContainer.value, {
      scale: 0.8,
      opacity: 0,
      y: 20,
      duration: 0.2,
      ease: "power2.in"
    })
  }
}

const updateSuggestions = (intent: string) => {
  // Mettre à jour les suggestions selon l'intention détectée
  const newSuggestions: Suggestion[] = []
  
  switch (intent) {
    case 'projects':
      newSuggestions.push(
        { id: 'p1', text: 'Voir Nina AI en détail', icon: 'mdi:robot' },
        { id: 'p2', text: 'Projets Big Data', icon: 'mdi:database' }
      )
      break
    case 'services':
      newSuggestions.push(
        { id: 's1', text: 'Tarifs consultation', icon: 'mdi:currency-eur' },
        { id: 's2', text: 'Délais de livraison', icon: 'mdi:clock' }
      )
      break
    case 'contact':
      newSuggestions.push(
        { id: 'c1', text: 'Planifier un appel', icon: 'mdi:calendar' },
        { id: 'c2', text: 'Envoyer un email', icon: 'mdi:email' }
      )
      break
    default:
      suggestions.value = [
        { id: '1', text: 'Quels sont vos services IA ?', icon: 'mdi:robot' },
        { id: '2', text: 'Montrez-moi vos projets', icon: 'mdi:folder-multiple' },
        { id: '3', text: 'Je veux un devis', icon: 'mdi:file-document' },
        { id: '4', text: 'Planifier un appel', icon: 'mdi:calendar' }
      ]
      return
  }
  
  suggestions.value = newSuggestions
}

const getActionLabel = (action: string): string => {
  const labels: Record<string, string> = {
    'contact': 'Me contacter',
    'projects': 'Voir les projets',
    'services': 'Découvrir les services',
    'schedule': 'Planifier un appel',
    'quote': 'Demander un devis'
  }
  return labels[action] || action
}

const getActionIcon = (action: string): string => {
  const icons: Record<string, string> = {
    'contact': 'mdi:email',
    'projects': 'mdi:folder-multiple',
    'services': 'mdi:cog',
    'schedule': 'mdi:calendar',
    'quote': 'mdi:file-document'
  }
  return icons[action] || 'mdi:arrow-right'
}

// Lifecycle
onMounted(() => {
  // Afficher une notification après 10 secondes
  setTimeout(() => {
    if (!isOpen.value) {
      hasNotification.value = true
    }
  }, 10000)
})
</script>

<style scoped>
.nina-ai-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  font-family: var(--font-family);
}

/* Bouton flottant */
.nina-widget-trigger {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
}

.nina-widget-trigger:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.4);
}

.nina-widget-trigger.has-notification {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.nina-avatar {
  color: white;
  font-size: 24px;
}

.nina-pulse {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 16px;
  height: 16px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.nina-tooltip {
  position: absolute;
  right: 72px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 8px 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-primary);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.nina-tooltip::after {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 6px solid transparent;
  border-left-color: var(--border-primary);
}

.nina-widget-trigger:hover .nina-tooltip {
  opacity: 1;
}

/* Widget principal */
.nina-widget-container {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 380px;
  height: 520px;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

/* Header */
.nina-widget-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
}

.nina-header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nina-avatar-header {
  position: relative;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nina-status-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
}

.nina-header-text h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.nina-header-text p {
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
}

.nina-header-actions {
  display: flex;
  gap: 8px;
}

.nina-action-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: var(--radius-sm);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.nina-action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Messages */
.nina-messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: var(--bg-secondary);
}

.nina-messages {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nina-message {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.nina-message-user {
  flex-direction: row-reverse;
}

.nina-message-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--accent-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nina-message-content {
  flex: 1;
  max-width: 80%;
}

.nina-message-bubble {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  padding: 12px 16px;
  position: relative;
}

.nina-message-user .nina-message-bubble {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.nina-message-bubble p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.nina-message-bubble ul {
  margin: 8px 0 0 0;
  padding-left: 16px;
}

.nina-message-bubble li {
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 4px;
}

.nina-message-time {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 4px;
  text-align: right;
}

.nina-message-user .nina-message-time {
  text-align: left;
}

/* Actions rapides */
.nina-quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.nina-quick-action {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nina-quick-action:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

/* Indicateur de frappe */
.nina-typing {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  padding: 12px 16px;
}

.nina-typing-dots {
  display: flex;
  gap: 4px;
  align-items: center;
}

.nina-typing-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-primary);
  animation: typing 1.4s infinite;
}

.nina-typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.nina-typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

/* Suggestions */
.nina-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-primary);
}

.nina-suggestion {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nina-suggestion:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

/* Zone de saisie */
.nina-input-container {
  background: var(--bg-primary);
  border-top: 1px solid var(--border-primary);
  padding: 16px;
}

.nina-input-wrapper {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.nina-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
}

.nina-input:focus {
  border-color: var(--accent-primary);
}

.nina-send-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: var(--accent-primary);
  color: white;
  border-radius: var(--radius-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.nina-send-btn:hover:not(:disabled) {
  background: var(--accent-secondary);
}

.nina-send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nina-input-actions {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.nina-input-action {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-sm);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nina-input-action:hover {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

/* Transitions */
.widget-bounce-enter-active {
  animation: bounce-in 0.5s ease;
}

.widget-bounce-leave-active {
  animation: bounce-out 0.3s ease;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

.widget-slide-enter-active {
  transition: all 0.3s ease;
}

.widget-slide-leave-active {
  transition: all 0.2s ease;
}

.widget-slide-enter-from {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}

.widget-slide-leave-to {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .nina-ai-widget {
    bottom: 16px;
    right: 16px;
  }
  
  .nina-widget-container {
    width: calc(100vw - 32px);
    height: 480px;
  }
  
  .nina-tooltip {
    display: none;
  }
}
</style> 