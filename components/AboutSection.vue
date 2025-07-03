<template>
  <section id="about" class="about-section">
    <div class="container">
      <!-- En-tête de section -->
      <div class="section-header" ref="sectionHeader">
        <span class="section-badge">À propos</span>
        <h2 class="section-title">
          Ingénieur passionné par 
          <span class="text-gradient">l'innovation data</span>
        </h2>
        <p class="section-description">
          Fort de plus de 3 ans d'expérience, je transforme les données en solutions 
          intelligentes et développe des applications web performantes.
        </p>
      </div>

      <div class="about-content">
        <!-- Présentation personnelle -->
        <div class="about-story" ref="aboutStory">
          <div class="story-text">
            <h3>Mon parcours</h3>
            <p>
              Diplômé d'un <strong>Master en Data Science et Intelligence Artificielle</strong> (ESIEE Paris), 
              j'ai développé une expertise solide en ingénierie de données et développement logiciel.
            </p>
            <p>
              Actuellement <strong>Ingénieur DevOps</strong> chez Inetum-Orange Paris, je pilote 
              l'automatisation et le déploiement de solutions Big Data, tout en collaborant 
              étroitement avec les équipes pour optimiser les processus.
            </p>
            <p>
              Ma passion pour l'innovation me pousse constamment à explorer de nouvelles 
              technologies et à créer des solutions qui ont un impact réel.
            </p>
          </div>
          
          <div class="story-highlights">
            <div class="highlight-item">
              <Icon name="mdi:school" />
              <div>
                <h4>Formation</h4>
                <p>Master Data Science & IA<br><span>ESIEE Paris</span></p>
              </div>
            </div>
            <div class="highlight-item">
              <Icon name="mdi:briefcase" />
              <div>
                <h4>Expérience</h4>
                <p>Ingénieur DevOps<br><span>Inetum-Orange Paris</span></p>
              </div>
            </div>
            <div class="highlight-item">
              <Icon name="mdi:map-marker" />
              <div>
                <h4>Localisation</h4>
                <p>Paris, France<br><span>Disponible pour missions</span></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Compétences techniques -->
        <div class="skills-section" ref="skillsSection">
          <h3>Expertise technique</h3>
          
          <div class="skills-categories">
            <!-- Langages de programmation -->
            <div class="skill-category">
              <h4>
                <Icon name="mdi:code-tags" />
                Langages de Programmation
              </h4>
              <div class="skills-grid">
                <div class="skill-item" data-level="90">
                  <div class="skill-info">
                    <span>Python</span>
                    <span class="skill-level">Expert</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress" data-width="90"></div>
                  </div>
                </div>
                <div class="skill-item" data-level="85">
                  <div class="skill-info">
                    <span>SQL</span>
                    <span class="skill-level">Expert</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress" data-width="85"></div>
                  </div>
                </div>
                <div class="skill-item" data-level="80">
                  <div class="skill-info">
                    <span>JavaScript</span>
                    <span class="skill-level">Avancé</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress" data-width="80"></div>
                  </div>
                </div>
                <div class="skill-item" data-level="75">
                  <div class="skill-info">
                    <span>Java</span>
                    <span class="skill-level">Avancé</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress" data-width="75"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Technologies Big Data -->
            <div class="skill-category">
              <h4>
                <Icon name="mdi:database-settings" />
                Big Data & Analytics
              </h4>
              <div class="tech-tags">
                <span class="tech-tag expert">Apache Spark</span>
                <span class="tech-tag expert">Hadoop</span>
                <span class="tech-tag expert">Zeppelin</span>
                <span class="tech-tag expert">Airflow</span>
                <span class="tech-tag advanced">Grafana</span>
                <span class="tech-tag advanced">Prometheus</span>
                <span class="tech-tag advanced">MinIO</span>
              </div>
            </div>

            <!-- Bases de données -->
            <div class="skill-category">
              <h4>
                <Icon name="mdi:database" />
                Bases de Données
              </h4>
              <div class="tech-tags">
                <span class="tech-tag expert">PostgreSQL</span>
                <span class="tech-tag expert">MySQL</span>
                <span class="tech-tag expert">MSSQL</span>
                <span class="tech-tag advanced">MongoDB</span>
                <span class="tech-tag advanced">MariaDB</span>
              </div>
            </div>

            <!-- Cloud & DevOps -->
            <div class="skill-category">
              <h4>
                <Icon name="mdi:cloud" />
                Cloud & DevOps
              </h4>
              <div class="tech-tags">
                <span class="tech-tag expert">Docker</span>
                <span class="tech-tag expert">Ansible</span>
                <span class="tech-tag expert">Linux</span>
                <span class="tech-tag advanced">AWS</span>
                <span class="tech-tag advanced">GitLab CI/CD</span>
                <span class="tech-tag advanced">PowerShell</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Valeurs et approche -->
        <div class="values-section" ref="valuesSection">
          <h3>Ma philosophie de travail</h3>
          <div class="values-grid">
            <div class="value-card">
              <div class="value-icon">
                <Icon name="mdi:lightbulb" />
              </div>
              <h4>Innovation</h4>
              <p>Toujours à la recherche de solutions créatives et de nouvelles technologies pour résoudre les défis complexes.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <Icon name="mdi:account-group" />
              </div>
              <h4>Collaboration</h4>
              <p>Je crois en la force du travail d'équipe et la communication pour créer des solutions exceptionnelles.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <Icon name="mdi:trending-up" />
              </div>
              <h4>Excellence</h4>
              <p>Engagement constant vers la qualité, les bonnes pratiques et l'amélioration continue des processus.</p>
            </div>
            <div class="value-card">
              <div class="value-icon">
                <Icon name="mdi:school" />
              </div>
              <h4>Apprentissage</h4>
              <p>Passion pour l'apprentissage continu et le partage de connaissances avec la communauté tech.</p>
            </div>
          </div>
        </div>

        <!-- Centres d'intérêt -->
        <div class="interests-section" ref="interestsSection">
          <h3>Au-delà du code</h3>
          <div class="interests-list">
            <div class="interest-item">
              <Icon name="mdi:book-open" />
              <span>Lecture & Culture</span>
            </div>
            <div class="interest-item">
              <Icon name="mdi:dumbbell" />
              <span>Sport & MMA</span>
            </div>
            <div class="interest-item">
              <Icon name="mdi:chart-line" />
              <span>Investissement</span>
            </div>
            <div class="interest-item">
              <Icon name="mdi:airplane" />
              <span>Voyages</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const sectionHeader = ref()
const aboutStory = ref()
const skillsSection = ref()
const valuesSection = ref()
const interestsSection = ref()

onMounted(() => {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  // Animation d'entrée au scroll
  $gsap.gsap.from(sectionHeader.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: sectionHeader.value,
      start: 'top 80%',
      end: 'bottom 20%'
    }
  })

  $gsap.gsap.from(aboutStory.value, {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    scrollTrigger: {
      trigger: aboutStory.value,
      start: 'top 80%'
    }
  })

  // Animation des barres de compétences
  $gsap.gsap.from('.skill-item', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: skillsSection.value,
      start: 'top 80%',
      onEnter: animateSkillBars
    }
  })

  // Animation des cartes de valeurs
  $gsap.gsap.from('.value-card', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: valuesSection.value,
      start: 'top 80%'
    }
  })

  // Animation des centres d'intérêt
  $gsap.gsap.from('.interest-item', {
    x: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: interestsSection.value,
      start: 'top 80%'
    }
  })
})

function animateSkillBars() {
  const { $gsap } = useNuxtApp()
  if (!$gsap) return

  document.querySelectorAll('.skill-progress').forEach(bar => {
    const width = bar.getAttribute('data-width')
    $gsap.gsap.to(bar, {
      width: `${width}%`,
      duration: 1.5,
      ease: 'power2.out',
      delay: 0.3
    })
  })
}
</script>

<style scoped>
.about-section {
  padding: var(--space-32) 0;
  background: var(--bg-primary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-20);
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

.about-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-20);
}

/* Histoire personnelle */
.about-story {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-12);
  align-items: start;
}

.story-text h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-6);
  color: var(--text-primary);
}

.story-text p {
  font-size: var(--text-base);
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
}

.story-text strong {
  color: var(--accent-primary);
  font-weight: 600;
}

.story-highlights {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-primary);
}

.highlight-item svg {
  color: var(--accent-primary);
  font-size: 24px;
  flex-shrink: 0;
}

.highlight-item h4 {
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-1);
}

.highlight-item p {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.4;
}

.highlight-item span {
  color: var(--accent-primary);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Compétences */
.skills-section h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-8);
  text-align: center;
}

.skills-categories {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.skill-category {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
}

.skill-category h4 {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-6);
}

.skill-category svg {
  color: var(--accent-primary);
  font-size: 24px;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
}

.skill-item {
  margin-bottom: var(--space-4);
}

.skill-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.skill-info span:first-child {
  font-weight: 500;
  color: var(--text-primary);
}

.skill-level {
  font-size: var(--text-xs);
  color: var(--accent-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.skill-bar {
  height: 6px;
  background: var(--bg-primary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: var(--gradient-primary);
  width: 0%;
  border-radius: var(--radius-full);
  transition: width 1.5s ease-out;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tech-tag {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  transition: all var(--transition-base);
}

.tech-tag.expert {
  background: rgba(34, 197, 94, 0.1);
  color: rgb(34, 197, 94);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.tech-tag.advanced {
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent-primary);
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.tech-tag:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Valeurs */
.values-section h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-8);
  text-align: center;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6);
}

.value-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  text-align: center;
  transition: all var(--transition-base);
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--accent-primary);
}

.value-icon {
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

.value-card h4 {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-3);
}

.value-card p {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Centres d'intérêt */
.interests-section h3 {
  font-size: var(--text-2xl);
  font-weight: 600;
  margin-bottom: var(--space-8);
  text-align: center;
}

.interests-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: center;
}

.interest-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-primary);
  transition: all var(--transition-base);
}

.interest-item:hover {
  background: var(--accent-primary);
  color: white;
  transform: translateY(-2px);
}

.interest-item svg {
  font-size: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .about-story {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .interests-list {
    flex-direction: column;
    align-items: center;
  }

  .interest-item {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
}
</style> 