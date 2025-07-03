export interface ProjectRecommendation {
  name: string
  description: string
  tech: string[]
  impact: string
  url?: string
}

export interface UserContext {
  currentSection: string
  timeOnSite: number
  interactions: any[]
  referrer: string
}

export interface AIResponse {
  content: string
  intent: string
  confidence: number
  actions?: string[]
}

// Base de connaissances sur Raouf WARNIER
const RAOUF_KNOWLEDGE_BASE = {
  profile: {
    name: "Raouf WARNIER",
    title: "Ingénieur IA & Data",
    company: "Inetum-Orange",
    education: "Master Data Science - ESIEE Paris",
    location: "France",
    experience: "3+ ans en IA/ML",
    specialization: "Intelligence Artificielle, Big Data, Agents Conversationnels"
  },
  
  projects: [
    {
      name: "Nina AI",
      description: "Agent conversationnel intelligent avec NLP avancé",
      tech: ["Python", "OpenAI", "LangChain", "FastAPI"],
      impact: "Automatisation de 80% des interactions client",
      category: "IA Conversationnelle"
    },
    {
      name: "Predictive Analytics Engine",
      description: "Système de prédiction pour l'e-commerce avec ML",
      tech: ["TensorFlow", "Scikit-learn", "Apache Spark"],
      impact: "Augmentation de 25% du taux de conversion",
      category: "Machine Learning"
    },
    {
      name: "Real-time Data Pipeline",
      description: "Pipeline de données temps réel pour analytics",
      tech: ["Apache Kafka", "Python", "Docker", "Kubernetes"],
      impact: "Traitement de 1M+ événements/jour",
      category: "Big Data"
    },
    {
      name: "Computer Vision Classifier",
      description: "Classification d'images avec deep learning",
      tech: ["PyTorch", "OpenCV", "CUDA"],
      impact: "Précision de 94% sur dataset custom",
      category: "Computer Vision"
    },
    {
      name: "NLP Sentiment Analyzer",
      description: "Analyse de sentiment multilingue en temps réel",
      tech: ["Transformers", "BERT", "spaCy"],
      impact: "Analyse de 10K+ avis clients/heure",
      category: "NLP"
    },
    {
      name: "Recommender System",
      description: "Système de recommandation hybride personnalisé",
      tech: ["Collaborative Filtering", "Matrix Factorization"],
      impact: "Amélioration de 30% de l'engagement",
      category: "Recommandation"
    },
    {
      name: "Fraud Detection ML",
      description: "Détection de fraude avec algorithmes ML avancés",
      tech: ["XGBoost", "Isolation Forest", "SHAP"],
      impact: "Réduction de 60% des fraudes détectées",
      category: "Sécurité IA"
    },
    {
      name: "Time Series Forecasting",
      description: "Prédiction de séries temporelles pour la finance",
      tech: ["LSTM", "Prophet", "ARIMA"],
      impact: "Précision de prédiction à 85%",
      category: "Forecasting"
    }
  ],
  
  skills: {
    "Langages": ["Python", "R", "SQL", "JavaScript", "TypeScript"],
    "IA/ML": ["TensorFlow", "PyTorch", "Scikit-learn", "OpenAI", "Hugging Face"],
    "Big Data": ["Apache Spark", "Kafka", "Hadoop", "Elasticsearch"],
    "Cloud": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"],
    "Databases": ["PostgreSQL", "MongoDB", "Redis", "InfluxDB"],
    "Web": ["FastAPI", "Flask", "Node.js", "Vue.js", "Nuxt.js"]
  },
  
  services: [
    {
      name: "Développement d'Agents IA",
      description: "Création d'agents conversationnels intelligents comme Nina AI",
      price: "4500€",
      duration: "4-6 semaines"
    },
    {
      name: "Solutions ML Personnalisées",
      description: "Développement de modèles ML sur mesure pour vos données",
      price: "3500€",
      duration: "3-5 semaines"
    },
    {
      name: "Pipeline Big Data",
      description: "Architecture complète de traitement de données massives",
      price: "5500€",
      duration: "6-8 semaines"
    },
    {
      name: "Audit IA & Stratégie",
      description: "Évaluation et recommandations pour intégrer l'IA",
      price: "1500€",
      duration: "1-2 semaines"
    },
    {
      name: "Formation IA/ML",
      description: "Formation équipes sur les technologies IA modernes",
      price: "2500€",
      duration: "2-3 semaines"
    },
    {
      name: "Optimisation Modèles IA",
      description: "Amélioration performance et déploiement modèles existants",
      price: "2000€",
      duration: "2-4 semaines"
    }
  ],
  
  contact: {
    email: "raouf.warnier@email.com",
    linkedin: "linkedin.com/in/raouf-warnier",
    github: "github.com/raouf-warnier",
    location: "France (Remote possible)",
    availability: "Disponible pour nouveaux projets"
  }
}

export const useNinaAI = () => {
  
  // Analyse de l'intention utilisateur
  const analyzeUserIntent = async (message: string): Promise<string> => {
    const lowerMessage = message.toLowerCase()
    
    // Classification simple des intentions
    if (lowerMessage.includes('projet') || lowerMessage.includes('réalisation')) {
      return 'projects'
    }
    if (lowerMessage.includes('compétence') || lowerMessage.includes('skill') || lowerMessage.includes('technologie')) {
      return 'skills'
    }
    if (lowerMessage.includes('nina') || lowerMessage.includes('agent') || lowerMessage.includes('chatbot')) {
      return 'nina'
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('joindre')) {
      return 'contact'
    }
    if (lowerMessage.includes('networking') || lowerMessage.includes('réseau') || lowerMessage.includes('collaboration') || lowerMessage.includes('partenariat')) {
      return 'networking'
    }
    if (lowerMessage.includes('consultation') || lowerMessage.includes('mentoring') || lowerMessage.includes('conseil')) {
      return 'consultation'
    }
    if (lowerMessage.includes('speaking') || lowerMessage.includes('conférence') || lowerMessage.includes('présentation')) {
      return 'speaking'
    }
    if (lowerMessage.includes('service') || lowerMessage.includes('prix') || lowerMessage.includes('tarif')) {
      return 'services'
    }
    if (lowerMessage.includes('formation') || lowerMessage.includes('éducation') || lowerMessage.includes('diplôme')) {
      return 'education'
    }
    if (lowerMessage.includes('expérience') || lowerMessage.includes('parcours') || lowerMessage.includes('carrière')) {
      return 'experience'
    }
    
    return 'general'
  }
  
  // Génération de réponse intelligente
  const generateResponse = async (
    message: string, 
    intent: string, 
    context: { conversationHistory: any[], userContext: UserContext }
  ): Promise<AIResponse> => {
    
    let response = ""
    let actions: string[] = []
    
    switch (intent) {
      case 'projects':
        response = generateProjectsResponse(message)
        actions = ['view-projects', 'download-cv']
        break
        
      case 'skills':
        response = generateSkillsResponse(message)
        actions = ['download-cv', 'view-projects']
        break
        
      case 'nina':
        response = generateNinaResponse(message)
        actions = ['view-projects', 'contact']
        break
        
      case 'contact':
        response = generateContactResponse(message)
        actions = ['contact-form', 'download-cv']
        break
        
      case 'networking':
        response = generateNetworkingResponse(message)
        actions = ['open-networking-hub', 'book-consultation', 'open-calendar']
        break
        
      case 'consultation':
        response = generateConsultationResponse(message)
        actions = ['book-consultation', 'open-calendar', 'download-cv']
        break
        
      case 'speaking':
        response = generateSpeakingResponse(message)
        actions = ['propose-speaking', 'view-expertise', 'contact-form']
        break
        
      case 'services':
        response = generateServicesResponse(message)
        actions = ['contact-form', 'view-services']
        break
        
      case 'education':
        response = generateEducationResponse(message)
        actions = ['download-cv']
        break
        
      case 'experience':
        response = generateExperienceResponse(message)
        actions = ['download-cv', 'view-projects']
        break
        
      default:
        response = generateGeneralResponse(message, context)
        actions = ['view-projects', 'contact-form']
    }
    
    return {
      content: response,
      intent,
      confidence: 0.85,
      actions
    }
  }
  
  // Générateurs de réponses spécialisées
  const generateProjectsResponse = (message: string): string => {
    const projects = RAOUF_KNOWLEDGE_BASE.projects
    const featuredProjects = projects.slice(0, 3)
    
    let response = "🚀 **Projets IA de Raouf** :\n\n"
    
    featuredProjects.forEach(project => {
      response += `**${project.name}** - ${project.description}\n`
      response += `💡 Impact: ${project.impact}\n`
      response += `🛠️ Tech: ${project.tech.join(', ')}\n\n`
    })
    
    response += `Et ${projects.length - 3} autres projets innovants ! Raouf a une expertise particulière en **${projects[0].category}** avec Nina AI comme projet phare.`
    
    return response
  }
  
  const generateSkillsResponse = (message: string): string => {
    const skills = RAOUF_KNOWLEDGE_BASE.skills
    
    let response = "🛠️ **Compétences techniques de Raouf** :\n\n"
    
    Object.entries(skills).forEach(([category, skillList]) => {
      response += `**${category}** : ${skillList.join(', ')}\n`
    })
    
    response += `\n💪 Avec **${RAOUF_KNOWLEDGE_BASE.profile.experience}**, Raouf maîtrise particulièrement l'écosystème IA moderne et les architectures cloud scalables.`
    
    return response
  }
  
  const generateNinaResponse = (message: string): string => {
    const ninaProject = RAOUF_KNOWLEDGE_BASE.projects[0] // Nina AI
    
    return `🤖 **Nina AI** est le projet phare de Raouf !\n\n` +
           `${ninaProject.description}\n\n` +
           `**Technologies** : ${ninaProject.tech.join(', ')}\n` +
           `**Impact** : ${ninaProject.impact}\n\n` +
           `Nina représente l'expertise de Raouf en IA conversationnelle. C'est un agent intelligent capable de comprendre le contexte, d'apprendre et de s'adapter aux utilisateurs. Un vrai concentré d'innovation ! 🚀`
  }
  
  const generateContactResponse = (message: string): string => {
    const contact = RAOUF_KNOWLEDGE_BASE.contact
    
    return `📞 **Contacter Raouf** :\n\n` +
           `✉️ Email : ${contact.email}\n` +
           `💼 LinkedIn : ${contact.linkedin}\n` +
           `🐙 GitHub : ${contact.github}\n` +
           `📍 Localisation : ${contact.location}\n\n` +
           `${contact.availability} ! Il sera ravi d'échanger sur vos projets IA. 🤝`
  }

  const generateNetworkingResponse = (message: string): string => {
    return `🤝 **Networking avec Raouf** :\n\n` +
           `Raouf est très actif dans l'écosystème IA français ! Il propose plusieurs types d'interactions :\n\n` +
           `🔥 **Consultation gratuite** (45 min) - Analysons ensemble vos besoins IA\n` +
           `🏢 **Collaboration projet** - Partenariats techniques innovants\n` +
           `🎓 **Mentoring** - Accompagnement personnalisé développeurs/entrepreneurs\n` +
           `🎤 **Speaking** - Interventions sur l'IA conversationnelle et Nina AI\n` +
           `💡 **Advisory** - Conseil stratégique pour startups IA\n\n` +
           `Rejoignez son réseau professionnel et découvrons ensemble comment l'IA peut transformer vos projets ! 🚀`
  }

  const generateConsultationResponse = (message: string): string => {
    return `💡 **Consultation IA avec Raouf** :\n\n` +
           `🆓 **Consultation découverte GRATUITE** (45 min)\n\n` +
           `Ce que vous obtiendrez :\n` +
           `✅ Analyse de vos besoins IA spécifiques\n` +
           `✅ Recommandations techniques personnalisées\n` +
           `✅ Roadmap d'implémentation claire\n` +
           `✅ Évaluation ROI et faisabilité\n\n` +
           `Parfait pour :\n` +
           `• Entrepreneurs voulant intégrer l'IA\n` +
           `• CTOs évaluant les opportunités IA\n` +
           `• Équipes cherchant expertise technique\n\n` +
           `Réservez votre créneau maintenant ! 📅`
  }

  const generateSpeakingResponse = (message: string): string => {
    return `🎤 **Raouf Speaker IA** :\n\n` +
           `Raouf intervient régulièrement sur :\n\n` +
           `🔥 **Sujets d'expertise** :\n` +
           `• IA Conversationnelle et Agents Intelligents\n` +
           `• Nina AI : Retour d'expérience concret\n` +
           `• Intégration IA en entreprise\n` +
           `• Futur de l'interaction Human-AI\n` +
           `• Innovation tech et écosystème français\n\n` +
           `📊 **Formats** :\n` +
           `• Keynotes (30-60 min)\n` +
           `• Workshops techniques (2-4h)\n` +
           `• Tables rondes et panels\n` +
           `• Conférences corporate\n\n` +
           `Contactez-le pour enrichir votre événement avec une expertise IA de pointe ! 🌟`
  }
  
  const generateServicesResponse = (message: string): string => {
    const services = RAOUF_KNOWLEDGE_BASE.services.slice(0, 3)
    
    let response = "💼 **Services IA de Raouf** :\n\n"
    
    services.forEach(service => {
      response += `**${service.name}** - ${service.price}\n`
      response += `${service.description}\n`
      response += `⏱️ Durée : ${service.duration}\n\n`
    })
    
    response += "Et bien plus encore ! Raouf propose des solutions sur mesure adaptées à vos besoins spécifiques."
    
    return response
  }
  
  const generateEducationResponse = (message: string): string => {
    const profile = RAOUF_KNOWLEDGE_BASE.profile
    
    return `🎓 **Formation de Raouf** :\n\n` +
           `**${profile.education}**\n` +
           `Spécialisation en ${profile.specialization}\n\n` +
           `Cette formation d'excellence à l'ESIEE Paris lui a donné les bases solides en mathématiques, statistiques et informatique nécessaires pour exceller en IA. 📊`
  }
  
  const generateExperienceResponse = (message: string): string => {
    const profile = RAOUF_KNOWLEDGE_BASE.profile
    
    return `💼 **Expérience de Raouf** :\n\n` +
           `**${profile.title}** chez **${profile.company}**\n` +
           `${profile.experience} dans le domaine\n\n` +
           `Raouf a développé une expertise pointue en IA appliquée, avec un focus sur les solutions pratiques et l'impact business. Son expérience chez Inetum-Orange lui donne une vision entreprise précieuse. 🏢`
  }
  
  const generateGeneralResponse = (message: string, context: any): string => {
    const greetings = [
      "👋 Salut ! Je suis Nina, l'assistant IA de Raouf.",
      "🤖 Hello ! Nina ici, prête à parler de Raouf !",
      "✨ Coucou ! Nina à votre service pour tout savoir sur Raouf !"
    ]
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
    
    return `${randomGreeting}\n\n` +
           `Je peux vous parler de :\n` +
           `🚀 Ses projets IA innovants\n` +
           `🛠️ Ses compétences techniques\n` +
           `💼 Ses services et tarifs\n` +
           `📞 Comment le contacter\n\n` +
           `Que voulez-vous savoir ? 😊`
  }
  
  // Recommandations de projets
  const getProjectRecommendations = async (): Promise<ProjectRecommendation[]> => {
    return RAOUF_KNOWLEDGE_BASE.projects.map(project => ({
      name: project.name,
      description: project.description,
      tech: project.tech,
      impact: project.impact
    }))
  }
  
  // Génération de CV
  const generateCV = async (): Promise<Blob> => {
    // Simulation de génération de CV
    const cvContent = generateCVContent()
    return new Blob([cvContent], { type: 'application/pdf' })
  }
  
  const generateCVContent = (): string => {
    const profile = RAOUF_KNOWLEDGE_BASE.profile
    const skills = RAOUF_KNOWLEDGE_BASE.skills
    const projects = RAOUF_KNOWLEDGE_BASE.projects
    
    let cv = `CV - ${profile.name}\n`
    cv += `${profile.title} | ${profile.company}\n`
    cv += `${profile.education}\n\n`
    
    cv += "COMPÉTENCES TECHNIQUES\n"
    Object.entries(skills).forEach(([category, skillList]) => {
      cv += `${category}: ${skillList.join(', ')}\n`
    })
    
    cv += "\nPROJETS PRINCIPAUX\n"
    projects.slice(0, 5).forEach(project => {
      cv += `${project.name}: ${project.description}\n`
    })
    
    return cv
  }
  
  // Traitement de message (point d'entrée principal)
  const processMessage = async (
    message: string,
    context?: UserContext
  ): Promise<AIResponse> => {
    const intent = await analyzeUserIntent(message)
    const response = await generateResponse(message, intent, {
      conversationHistory: [],
      userContext: context || {
        currentSection: 'home',
        timeOnSite: 0,
        interactions: [],
        referrer: ''
      }
    })
    
    return response
  }
  
  return {
    processMessage,
    generateResponse,
    analyzeUserIntent,
    getProjectRecommendations,
    generateCV,
    RAOUF_KNOWLEDGE_BASE
  }
} 