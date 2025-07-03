<template>
  <div class="dashboard-layout">
    <!-- Navigation latérale -->
    <aside class="dashboard-sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <div class="logo-icon">🤖</div>
            <div v-if="!sidebarCollapsed" class="logo-text">
              <span class="logo-main">Nina AI</span>
              <span class="logo-sub">Dashboard</span>
            </div>
          </NuxtLink>
        </div>
        
        <button @click="toggleSidebar" class="sidebar-toggle">
          <Icon :name="sidebarCollapsed ? 'mdi:menu' : 'mdi:menu-open'" />
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <div v-if="!sidebarCollapsed" class="nav-title">Génération</div>
          <ul class="nav-list">
            <li class="nav-item">
              <NuxtLink to="/nina-dashboard" class="nav-link" active-class="active">
                <Icon name="mdi:view-dashboard" />
                <span v-if="!sidebarCollapsed">Dashboard</span>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <a href="#" @click="quickGenerate" class="nav-link">
                <Icon name="mdi:plus-circle" />
                <span v-if="!sidebarCollapsed">Nouveau</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" @click="viewQueue" class="nav-link">
                <Icon name="mdi:format-list-bulleted" />
                <span v-if="!sidebarCollapsed">File d'attente</span>
                <span v-if="!sidebarCollapsed && queueCount > 0" class="badge">{{ queueCount }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <div v-if="!sidebarCollapsed" class="nav-title">Contenu</div>
          <ul class="nav-list">
            <li class="nav-item">
              <NuxtLink to="/blog" class="nav-link">
                <Icon name="mdi:post" />
                <span v-if="!sidebarCollapsed">Blog</span>
              </NuxtLink>
            </li>
            <li class="nav-item">
              <a href="#" @click="viewDrafts" class="nav-link">
                <Icon name="mdi:file-document-edit" />
                <span v-if="!sidebarCollapsed">Brouillons</span>
                <span v-if="!sidebarCollapsed && draftsCount > 0" class="badge">{{ draftsCount }}</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" @click="viewAnalytics" class="nav-link">
                <Icon name="mdi:chart-line" />
                <span v-if="!sidebarCollapsed">Analytics</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="nav-section">
          <div v-if="!sidebarCollapsed" class="nav-title">Nina AI</div>
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#" @click="viewNinaState" class="nav-link">
                <Icon name="mdi:brain" />
                <span v-if="!sidebarCollapsed">État Mental</span>
                <div v-if="!sidebarCollapsed" class="status-indicator" :class="ninaStatus"></div>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" @click="viewLearning" class="nav-link">
                <Icon name="mdi:school" />
                <span v-if="!sidebarCollapsed">Apprentissage</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#" @click="viewSettings" class="nav-link">
                <Icon name="mdi:cog" />
                <span v-if="!sidebarCollapsed">Paramètres</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Nina Status Widget -->
      <div v-if="!sidebarCollapsed" class="nina-widget">
        <div class="nina-avatar">
          <div class="avatar-glow" :class="{ active: ninaStatus === 'active' }"></div>
          <div class="avatar-icon">🤖</div>
        </div>
        <div class="nina-info">
          <div class="nina-name">Nina AI</div>
          <div class="nina-status">{{ ninaStatusText }}</div>
          <div class="nina-activity">{{ currentActivity }}</div>
        </div>
      </div>
    </aside>

    <!-- Contenu principal -->
    <main class="dashboard-main" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <!-- Header principal -->
      <header class="dashboard-header">
        <div class="header-left">
          <button @click="toggleSidebar" class="mobile-menu-toggle">
            <Icon name="mdi:menu" />
          </button>
          
          <div class="header-breadcrumb">
            <slot name="breadcrumb">
              <span class="current-page">Dashboard</span>
            </slot>
          </div>
        </div>

        <div class="header-right">
          <!-- Notifications -->
          <div class="header-item">
            <button @click="toggleNotifications" class="notification-btn" :class="{ active: showNotifications }">
              <Icon name="mdi:bell" />
              <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
            </button>
            
            <div v-if="showNotifications" class="notifications-dropdown">
              <div class="notifications-header">
                <h3>Notifications</h3>
                <button @click="markAllAsRead" class="mark-read-btn">Tout marquer lu</button>
              </div>
              <div class="notifications-list">
                <div v-for="notification in notifications" :key="notification.id" class="notification-item" :class="{ unread: !notification.read }">
                  <div class="notification-icon">{{ notification.icon }}</div>
                  <div class="notification-content">
                    <div class="notification-title">{{ notification.title }}</div>
                    <div class="notification-message">{{ notification.message }}</div>
                    <div class="notification-time">{{ formatTime(notification.timestamp) }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Profil utilisateur -->
          <div class="header-item">
            <div class="user-profile">
              <div class="user-avatar">R</div>
              <div class="user-info">
                <div class="user-name">Raouf</div>
                <div class="user-role">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Zone de contenu -->
      <div class="dashboard-content">
        <slot />
      </div>
    </main>

    <!-- Overlay pour mobile -->
    <div v-if="showMobileOverlay" @click="closeMobileMenu" class="mobile-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// État du layout
const sidebarCollapsed = ref(false)
const showNotifications = ref(false)
const showMobileOverlay = ref(false)

// Données simulées
const queueCount = ref(3)
const draftsCount = ref(7)
const ninaStatus = ref('active')
const currentActivity = ref('Génération d\'article en cours...')
const notificationCount = ref(4)

const notifications = ref([
  {
    id: 1,
    icon: '✅',
    title: 'Article Complété',
    message: 'L\'article "IA et Créativité" a été généré avec succès',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false
  },
  {
    id: 2,
    icon: '🚀',
    title: 'Nouvelle Génération',
    message: 'Génération démarrée pour "Blockchain et Durabilité"',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false
  },
  {
    id: 3,
    icon: '📊',
    title: 'Rapport Hebdomadaire',
    message: '34 articles générés cette semaine (+12%)',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: true
  },
  {
    id: 4,
    icon: '🎯',
    title: 'Objectif Atteint',
    message: 'Qualité moyenne de 91% ce mois',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    read: false
  }
])

// Computed
const ninaStatusText = computed(() => {
  switch (ninaStatus.value) {
    case 'active': return 'Actif'
    case 'generating': return 'Génération'
    case 'learning': return 'Apprentissage'
    case 'idle': return 'En veille'
    default: return 'Inconnu'
  }
})

const unreadNotifications = computed(() => 
  notifications.value.filter(n => !n.read)
)

// Méthodes
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem('dashboard-sidebar-collapsed', String(sidebarCollapsed.value))
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
  notificationCount.value = 0
}

const closeMobileMenu = () => {
  showMobileOverlay.value = false
  sidebarCollapsed.value = true
}

const quickGenerate = () => {
  // Émettre un événement pour ouvrir le modal de génération
  console.log('Quick generate')
}

const viewQueue = () => {
  console.log('View queue')
}

const viewDrafts = () => {
  console.log('View drafts')
}

const viewAnalytics = () => {
  console.log('View analytics')
}

const viewNinaState = () => {
  console.log('View Nina state')
}

const viewLearning = () => {
  console.log('View learning')
}

const viewSettings = () => {
  console.log('View settings')
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  
  if (minutes < 1) return 'À l\'instant'
  if (minutes < 60) return `Il y a ${minutes}min`
  if (minutes < 1440) return `Il y a ${Math.floor(minutes / 60)}h`
  return date.toLocaleDateString('fr-FR')
}

// Gestion du responsive
const handleResize = () => {
  if (window.innerWidth < 1024) {
    sidebarCollapsed.value = true
  }
}

// Lifecycle
onMounted(() => {
  // Restaurer l'état de la sidebar
  const savedState = localStorage.getItem('dashboard-sidebar-collapsed')
  if (savedState !== null) {
    sidebarCollapsed.value = savedState === 'true'
  }

  // Responsive
  handleResize()
  window.addEventListener('resize', handleResize)

  // Simuler les mises à jour en temps réel
  setInterval(() => {
    // Mise à jour de l'activité de Nina
    const activities = [
      'Génération d\'article en cours...',
      'Analyse de tendances...',
      'Validation de contenu...',
      'Apprentissage autonome...',
      'Optimisation des prompts...'
    ]
    currentActivity.value = activities[Math.floor(Math.random() * activities.length)]
  }, 10000)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Fermer les dropdowns au clic extérieur
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.notification-btn') && !target.closest('.notifications-dropdown')) {
    showNotifications.value = false
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
.dashboard-layout {
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%);
  color: white;
  overflow: hidden;
}

/* Sidebar */
.dashboard-sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 100;
}

.dashboard-sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-main {
  font-size: 1.125rem;
  font-weight: 700;
  color: #8b5cf6;
}

.logo-sub {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}

.sidebar-toggle {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.sidebar-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
}

.nav-section {
  margin-bottom: 2rem;
}

.nav-title {
  padding: 0 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.active {
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.2), transparent);
  border-right: 2px solid #8b5cf6;
  color: #8b5cf6;
}

.badge {
  background: linear-gradient(45deg, #ef4444, #dc2626);
  color: white;
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  margin-left: auto;
  font-weight: 600;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-left: auto;
}

.status-indicator.active {
  background: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
}

.status-indicator.generating {
  background: #f59e0b;
  animation: pulse 2s ease-in-out infinite;
}

/* Nina Widget */
.nina-widget {
  padding: 1rem;
  margin: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.nina-avatar {
  position: relative;
  width: 50px;
  height: 50px;
  margin: 0 auto 0.75rem;
}

.avatar-glow {
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 50%;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  opacity: 0.3;
  animation: pulse 3s ease-in-out infinite;
}

.avatar-glow.active {
  opacity: 0.6;
  animation: pulse 1.5s ease-in-out infinite;
}

.avatar-icon {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  z-index: 1;
}

.nina-info {
  text-align: center;
}

.nina-name {
  font-weight: 600;
  color: #8b5cf6;
  margin-bottom: 0.25rem;
}

.nina-status {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.25rem;
}

.nina-activity {
  font-size: 0.625rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.3;
}

/* Main Content */
.dashboard-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
}

.dashboard-main.sidebar-collapsed {
  margin-left: 0;
}

/* Header */
.dashboard-header {
  height: 70px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  backdrop-filter: blur(10px);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.mobile-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.header-breadcrumb {
  color: rgba(255, 255, 255, 0.7);
}

.current-page {
  color: #8b5cf6;
  font-weight: 500;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-item {
  position: relative;
}

/* Notifications */
.notification-btn {
  position: relative;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.notification-btn:hover,
.notification-btn.active {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.notification-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: linear-gradient(45deg, #ef4444, #dc2626);
  color: white;
  font-size: 0.625rem;
  padding: 0.125rem 0.375rem;
  border-radius: 10px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notifications-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 350px;
  background: rgba(26, 26, 46, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  margin-top: 0.5rem;
}

.notifications-header {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notifications-header h3 {
  margin: 0;
  color: white;
  font-size: 1rem;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #8b5cf6;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.mark-read-btn:hover {
  background: rgba(139, 92, 246, 0.1);
}

.notifications-list {
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.notification-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.notification-item.unread {
  background: rgba(139, 92, 246, 0.05);
  border-left: 2px solid #8b5cf6;
}

.notification-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 500;
  color: white;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
}

.notification-message {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  line-height: 1.4;
  margin-bottom: 0.25rem;
}

.notification-time {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.625rem;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.user-profile:hover {
  background: rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(45deg, #8b5cf6, #06b6d4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: white;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 500;
  color: white;
  font-size: 0.875rem;
}

.user-role {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Content */
.dashboard-content {
  flex: 1;
  overflow-y: auto;
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 200;
    transform: translateX(-100%);
  }
  
  .dashboard-sidebar:not(.collapsed) {
    transform: translateX(0);
  }
  
  .dashboard-main {
    margin-left: 0;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .header-breadcrumb {
    display: none;
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    padding: 0 1rem;
  }
  
  .notifications-dropdown {
    width: 300px;
    right: -50px;
  }
  
  .user-info {
    display: none;
  }
}

@media (max-width: 480px) {
  .notifications-dropdown {
    width: 280px;
    right: -100px;
  }
}
</style> 