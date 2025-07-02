<template>
  <section id="projects" class="projects-section">
    <div class="container">
      <!-- En-tête de section -->
      <div class="section-header" ref="sectionHeader">
        <span class="section-badge">Portfolio</span>
        <h2 class="section-title">
          Mes <span class="text-gradient">réalisations</span>
        </h2>
        <p class="section-description">
          Découvrez une sélection de projets qui illustrent mon expertise 
          en ingénierie de données, développement et automatisation.
        </p>
      </div>

      <!-- Filtres de projets -->
      <div class="project-filters" ref="projectFilters">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          :class="['filter-btn', { active: activeFilter === filter.id }]"
          @click="setActiveFilter(filter.id)"
        >
          <Icon :name="filter.icon" />
          {{ filter.label }}
        </button>
      </div>

      <!-- Grille de projets -->
      <div class="projects-grid" ref="projectsGrid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          :class="['project-card', `category-${project.category}`]"
          @click="openProjectModal(project)"
        >
          <div class="project-image">
            <div class="project-overlay">
              <div class="project-actions">
                <button class="action-btn" @click.stop="openDemo(project.demo)">
                  <Icon name="mdi:eye" />
                </button>
                <button class="action-btn" @click.stop="openGithub(project.github)">
                  <Icon name="mdi:github" />
                </button>
              </div>
            </div>
            <div class="project-tech-stack">
              <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="tech-badge">
                {{ tech }}
              </span>
            </div>
            <!-- Placeholder pour image -->
            <div class="project-placeholder">
              <Icon :name="project.icon" size="48" />
            </div>
          </div>
          
          <div class="project-content">
            <div class="project-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <div class="project-status" :class="project.status">
                {{ getStatusLabel(project.status) }}
              </div>
            </div>
            
            <p class="project-description">{{ project.description }}</p>
            
            <div class="project-meta">
              <div class="project-date">
                <Icon name="mdi:calendar" />
                {{ project.date }}
              </div>
              <div class="project-impact">
                <Icon name="mdi:trending-up" />
                {{ project.impact }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques des projets -->
      <div class="projects-stats" ref="projectsStats">
        <div class="stat-card">
          <div class="stat-icon">
            <Icon name="mdi:rocket-launch" />
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ projects.length }}</span>
            <span class="stat-label">Projets réalisés</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <Icon name="mdi:code-tags" />
          </div>
          <div class="stat-content">
            <span class="stat-number">{{ uniqueTechnologies.length }}</span>
            <span class="stat-label">Technologies utilisées</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <Icon name="mdi:account-group" />
          </div>
          <div class="stat-content">
            <span class="stat-number">5+</span>
            <span class="stat-label">Équipes collaborées</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <Icon name="mdi:chart-line" />
          </div>
          <div class="stat-content">
            <span class="stat-number">99%</span>
            <span class="stat-label">Taux de réussite</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const sectionHeader = ref()
const projectFilters = ref()
const projectsGrid = ref()
const projectsStats = ref()

const activeFilter = ref('all')

// Filtres de projets
const filters = [
  { id: 'all', label: 'Tous', icon: 'mdi:apps' },
  { id: 'data', label: 'Big Data', icon: 'mdi:database-settings' },
  { id: 'devops', label: 'DevOps', icon: 'mdi:cloud-sync' },
  { id: 'web', label: 'Web Dev', icon: 'mdi:web' },
  { id: 'automation', label: 'Automatisation', icon: 'mdi:robot' }
]

// Projets basés sur l'expérience de Raouf
const projects = [
  {
    id: 1,
    title: 'Pipeline Big Data Automatisé',
    description: 'Architecture complète de traitement de données avec Apache Spark, Airflow et déploiement automatisé sur cluster Hadoop.',
    category: 'data',
    status: 'completed',
    date: '2024',
    impact: '2TB/jour traités',
    technologies: ['Apache Spark', 'Airflow', 'Hadoop', 'Python', 'Docker', 'Ansible'],
    icon: 'mdi:database-arrow-right',
    demo: '#',
    github: '#'
  },
  {
    id: 2,
    title: 'Plateforme DevOps CI/CD',
    description: 'Mise en place d\'une chaîne complète CI/CD avec GitLab, Docker et déploiement automatisé sur environnements multiples.',
    category: 'devops',
    status: 'completed',
    date: '2024',
    impact: '80% temps économisé',
    technologies: ['GitLab CI/CD', 'Docker', 'Ansible', 'Linux', 'Bash', 'Prometheus'],
    icon: 'mdi:source-branch',
    demo: '#',
    github: '#'
  },
  {
    id: 3,
    title: 'Système de Monitoring Intelligent',
    description: 'Solution de surveillance avancée avec Grafana, Prometheus et alertes automatiques pour infrastructure Big Data.',
    category: 'devops',
    status: 'completed',
    date: '2024',
    impact: '99.9% uptime',
    technologies: ['Grafana', 'Prometheus', 'Python', 'InfluxDB', 'Slack API'],
    icon: 'mdi:monitor-dashboard',
    demo: '#',
    github: '#'
  },
  {
    id: 4,
    title: 'Migration PostgreSQL vers Cloud',
    description: 'Migration sécurisée de bases de données critiques vers AWS avec zéro downtime et optimisation des performances.',
    category: 'data',
    status: 'completed',
    date: '2023',
    impact: '50% coûts réduits',
    technologies: ['PostgreSQL', 'AWS RDS', 'Python', 'pgAdmin', 'Terraform'],
    icon: 'mdi:database-export',
    demo: '#',
    github: '#'
  },
  {
    id: 5,
    title: 'API de Gestion de Données',
    description: 'API REST robuste pour la gestion et l\'analyse de données avec authentification JWT et documentation Swagger.',
    category: 'web',
    status: 'completed',
    date: '2023',
    impact: '1000+ requêtes/min',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'JWT', 'Swagger', 'Docker'],
    icon: 'mdi:api',
    demo: '#',
    github: '#'
  },
  {
    id: 6,
    title: 'Automatisation Tests Data Quality',
    description: 'Framework de tests automatisés pour validation de la qualité des données avec rapports détaillés.',
    category: 'automation',
    status: 'completed',
    date: '2023',
    impact: '95% erreurs détectées',
    technologies: ['Python', 'Pytest', 'Pandas', 'Great Expectations', 'Jenkins'],
    icon: 'mdi:test-tube',
    demo: '#',
    github: '#'
  },
  {
    id: 7,
    title: 'Dashboard Analytics Temps Réel',
    description: 'Interface web interactive pour visualisation de métriques business en temps réel avec mise à jour automatique.',
    category: 'web',
    status: 'in-progress',
    date: '2024',
    impact: 'Temps réel',
    technologies: ['Vue.js', 'D3.js', 'WebSocket', 'Python', 'Redis', 'Chart.js'],
    icon: 'mdi:chart-timeline-variant',
    demo: '#',
    github: '#'
  },
  {
    id: 8,
    title: 'Infrastructure as Code',
    description: 'Automatisation complète du provisioning infrastructure avec Terraform et Ansible pour environnements multi-cloud.',
    category: 'devops',
    status: 'completed',
    date: '2024',
    impact: '10min déploiement',
    technologies: ['Terraform', 'Ansible', 'AWS', 'Docker', 'YAML', 'Bash'],
    icon: 'mdi:cloud-braces',
    demo: '#',
    github: '#'
  }
]

// Projets filtrés
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects
  }
  return projects.filter(project => project.category === activeFilter.value)
})

// Technologies uniques
const uniqueTechnologies = computed(() => {
  const techs = new Set()
  projects.forEach(project => {
    project.technologies.forEach(tech => techs.add(tech))
  })
  return Array.from(techs)
})

// Méthodes
const setActiveFilter = (filterId: string) => {
  activeFilter.value = filterId
  animateProjectsGrid()
}

const getStatusLabel = (status: string) => {
  const labels = {
    'completed': 'Terminé',
    'in-progress': 'En cours',
    'planned': 'Planifié'
  }
  return labels[status] || status
}

const openProjectModal = (project: any) => {
  // TODO: Implémenter modal détaillée
  console.log('Ouvrir modal pour:', project.title)
}

const openDemo = (url: string) => {
  if (url && url !== '#') {
    window.open(url, '_blank')
  }
}

const openGithub = (url: string) => {
  if (url && url !== '#') {
    window.open(url, '_blank')
  }
}

const animateProjectsGrid = () => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  $gsap.from('.project-card', {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  })
}

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  // Animation d'entrée
  $gsap.from(sectionHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: sectionHeader.value,
      start: 'top 80%'
    }
  })

  $gsap.from('.filter-btn', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: projectFilters.value,
      start: 'top 80%'
    }
  })

  $gsap.from('.project-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: projectsGrid.value,
      start: 'top 80%'
    }
  })

  $gsap.from('.stat-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: projectsStats.value,
      start: 'top 80%'
    }
  })
})
</script>

<style scoped>
.projects-section {
  padding: var(--space-32) 0;
  background: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-12);
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

/* Filtres */
.project-filters {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-16);
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: var(--text-sm);
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
  transform: translateY(-2px);
}

.filter-btn svg {
  font-size: 18px;
}

/* Grille de projets */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-8);
  margin-bottom: var(--space-20);
}

.project-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--accent-primary);
}

.project-image {
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.project-placeholder {
  color: white;
  opacity: 0.8;
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all var(--transition-base);
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-actions {
  display: flex;
  gap: var(--space-4);
}

.action-btn {
  width: 50px;
  height: 50px;
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--transition-base);
}

.action-btn:hover {
  background: var(--accent-primary);
  color: white;
  transform: scale(1.1);
}

.project-tech-stack {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  display: flex;
  gap: var(--space-2);
}

.tech-badge {
  padding: var(--space-1) var(--space-3);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  color: white;
  font-weight: 500;
}

.project-content {
  padding: var(--space-6);
}

.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-4);
}

.project-title {
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.project-status {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-status.completed {
  background: rgba(34, 197, 94, 0.1);
  color: rgb(34, 197, 94);
}

.project-status.in-progress {
  background: rgba(251, 191, 36, 0.1);
  color: rgb(251, 191, 36);
}

.project-status.planned {
  background: rgba(156, 163, 175, 0.1);
  color: rgb(156, 163, 175);
}

.project-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--text-xs);
  color: var(--text-secondary);
}

.project-date,
.project-impact {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.project-date svg,
.project-impact svg {
  font-size: 14px;
}

/* Statistiques */
.projects-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-6);
}

.stat-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.stat-icon {
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
  font-family: var(--font-heading);
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Responsive */
@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }

  .project-filters {
    flex-direction: column;
    align-items: center;
  }

  .filter-btn {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }

  .projects-stats {
    grid-template-columns: 1fr;
  }

  .project-header {
    flex-direction: column;
    gap: var(--space-2);
  }

  .project-meta {
    flex-direction: column;
    gap: var(--space-2);
    align-items: flex-start;
  }
}
</style> 